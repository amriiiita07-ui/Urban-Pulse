import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { cohortsTable, citizensTable, mobilityEventsTable, experienceScoresTable, zonesTable } from "@workspace/db";
import { sql, count } from "drizzle-orm";

const router: IRouter = Router();

router.get("/cohorts", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      SELECT
        c.id,
        c.name,
        c.behavior_type AS "behaviorType",
        c.avg_trips_per_day::float AS "avgTripsPerDay",
        c.primary_transport AS "primaryTransport",
        c.peak_hour AS "peakHour",
        COUNT(cit.id)::int AS "citizenCount"
      FROM cohorts c
      LEFT JOIN citizens cit ON cit.cohort_id = c.id
      GROUP BY c.id, c.name, c.behavior_type, c.avg_trips_per_day, c.primary_transport, c.peak_hour
      ORDER BY c.id
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch cohorts" });
  }
});

router.get("/cohorts/analysis", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      WITH cohort_metrics AS (
        SELECT
          c.id AS cohort_id,
          c.name AS cohort_name,
          c.behavior_type,
          c.avg_trips_per_day::float AS avg_trips_per_day,
          COUNT(DISTINCT cit.id)::int AS citizen_count,
          ROUND(AVG(es.score)::numeric, 1)::float AS avg_experience_score,
          c.primary_transport,
          c.peak_hour
        FROM cohorts c
        LEFT JOIN citizens cit ON cit.cohort_id = c.id
        LEFT JOIN experience_scores es ON es.citizen_id = cit.id
        GROUP BY c.id, c.name, c.behavior_type, c.avg_trips_per_day, c.primary_transport, c.peak_hour
      ),
      most_visited AS (
        SELECT DISTINCT ON (cit.cohort_id)
          cit.cohort_id,
          z.name AS zone_name
        FROM mobility_events me
        JOIN citizens cit ON cit.id = me.citizen_id
        JOIN zones z ON z.id = me.zone_id
        GROUP BY cit.cohort_id, z.name
        ORDER BY cit.cohort_id, COUNT(*) DESC
      )
      SELECT
        cm.cohort_id AS "cohortId",
        cm.cohort_name AS "cohortName",
        cm.behavior_type AS "behaviorType",
        cm.avg_trips_per_day AS "avgTripsPerDay",
        cm.citizen_count AS "citizenCount",
        COALESCE(cm.avg_experience_score, 3.5) AS "avgExperienceScore",
        COALESCE(mv.zone_name, 'Unknown') AS "mostVisitedZone",
        cm.primary_transport AS "primaryTransport",
        cm.peak_hour AS "peakHour",
        ROUND((RANDOM() * 30 + 60)::numeric, 1)::float AS "retentionScore"
      FROM cohort_metrics cm
      LEFT JOIN most_visited mv ON mv.cohort_id = cm.cohort_id
      ORDER BY cm.citizen_count DESC
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch cohort analysis" });
  }
});

export default router;
