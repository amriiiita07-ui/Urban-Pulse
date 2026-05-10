import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { mobilityEventsTable, zonesTable, experienceScoresTable, infrastructureReportsTable, cityEventsTable, anomaliesTable, cohortsTable, citizensTable } from "@workspace/db";
import { sql, count, avg, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/dashboard/summary", async (req, res) => {
  try {
    const [citizenCount] = await db.select({ total: count() }).from(citizensTable);
    const [zoneCount] = await db.select({ total: count() }).from(zonesTable);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [mobilityToday] = await db
      .select({ total: count() })
      .from(mobilityEventsTable)
      .where(sql`${mobilityEventsTable.timestamp} >= ${today}`);

    const [avgExp] = await db.select({ avg: avg(experienceScoresTable.score) }).from(experienceScoresTable);

    const [activeIssues] = await db
      .select({ total: count() })
      .from(infrastructureReportsTable)
      .where(sql`${infrastructureReportsTable.status} != 'resolved'`);

    const [upcomingEvents] = await db
      .select({ total: count() })
      .from(cityEventsTable)
      .where(sql`${cityEventsTable.startsAt} >= NOW()`);

    const [crowdingAlerts] = await db
      .select({ total: count() })
      .from(mobilityEventsTable)
      .where(sql`${mobilityEventsTable.crowdingLevel} = 'high' AND ${mobilityEventsTable.timestamp} >= NOW() - INTERVAL '24 hours'`);

    const topMode = await db
      .select({ mode: mobilityEventsTable.transportMode, cnt: count() })
      .from(mobilityEventsTable)
      .groupBy(mobilityEventsTable.transportMode)
      .orderBy(desc(count()))
      .limit(1);

    res.json({
      totalCitizens: citizenCount?.total ?? 0,
      totalZones: zoneCount?.total ?? 0,
      mobilityEventsToday: mobilityToday?.total ?? 0,
      avgExperienceScore: Number(Number(avgExp?.avg ?? 0).toFixed(1)),
      activeInfraIssues: activeIssues?.total ?? 0,
      upcomingCityEvents: upcomingEvents?.total ?? 0,
      crowdingAlerts: crowdingAlerts?.total ?? 0,
      transportModeSplit: topMode[0]?.mode ?? "mixed",
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch dashboard summary" });
  }
});

router.get("/dashboard/mobility-trends", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      SELECT
        DATE(timestamp)::text AS date,
        EXTRACT(HOUR FROM timestamp)::int AS hour,
        transport_mode AS "transportMode",
        COUNT(*)::int AS "eventCount",
        ROUND(AVG(duration_mins)::numeric, 1)::float AS "avgDuration"
      FROM mobility_events
      WHERE timestamp >= NOW() - INTERVAL '7 days'
      GROUP BY DATE(timestamp), EXTRACT(HOUR FROM timestamp), transport_mode
      ORDER BY date ASC, hour ASC
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch mobility trends" });
  }
});

router.get("/dashboard/top-zones", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      SELECT
        z.id AS "zoneId",
        z.name AS "zoneName",
        z.zone_type AS "zoneType",
        z.district,
        COUNT(me.id)::int AS "activityCount",
        ROUND(AVG(es.score)::numeric, 1)::float AS "avgExperienceScore",
        RANK() OVER (ORDER BY COUNT(me.id) DESC)::int AS rank
      FROM zones z
      LEFT JOIN mobility_events me ON me.zone_id = z.id
      LEFT JOIN experience_scores es ON es.zone_id = z.id
      GROUP BY z.id, z.name, z.zone_type, z.district
      ORDER BY "activityCount" DESC
      LIMIT 8
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch top zones" });
  }
});

router.get("/dashboard/transport-split", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      SELECT
        transport_mode AS "transportMode",
        COUNT(*)::int AS count,
        ROUND((COUNT(*) * 100.0 / SUM(COUNT(*)) OVER ())::numeric, 1)::float AS percentage
      FROM mobility_events
      GROUP BY transport_mode
      ORDER BY count DESC
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch transport split" });
  }
});

router.get("/dashboard/anomalies-summary", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      SELECT
        a.id,
        z.name AS "zoneName",
        a.anomaly_type AS "anomalyType",
        a.severity,
        a.detected_at::text AS "detectedAt",
        a.description
      FROM anomalies a
      JOIN zones z ON z.id = a.zone_id
      WHERE a.resolved = false
      ORDER BY a.detected_at DESC
      LIMIT 5
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch anomalies summary" });
  }
});

export default router;
