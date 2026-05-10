import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { experienceScoresTable, zonesTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/experience-scores", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      SELECT
        es.id,
        es.citizen_id AS "citizenId",
        es.zone_id AS "zoneId",
        z.name AS "zoneName",
        es.score::float AS score,
        es.sentiment,
        es.rated_at::text AS "ratedAt"
      FROM experience_scores es
      JOIN zones z ON z.id = es.zone_id
      ORDER BY es.rated_at DESC
      LIMIT 100
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch experience scores" });
  }
});

router.get("/experience-scores/by-zone", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      WITH zone_scores AS (
        SELECT
          z.id AS zone_id,
          z.name AS zone_name,
          z.zone_type,
          ROUND(AVG(es.score)::numeric, 2)::float AS avg_score,
          COUNT(es.id)::int AS total_ratings,
          ROUND((SUM(CASE WHEN es.sentiment = 'positive' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(*), 0))::numeric, 1)::float AS positive_ratio,
          LAG(ROUND(AVG(es.score)::numeric, 2)) OVER (PARTITION BY z.id ORDER BY DATE_TRUNC('week', es.rated_at)) AS prev_avg
        FROM zones z
        LEFT JOIN experience_scores es ON es.zone_id = z.id
        GROUP BY z.id, z.name, z.zone_type, DATE_TRUNC('week', es.rated_at)
      )
      SELECT DISTINCT ON (zone_id)
        zone_id AS "zoneId",
        zone_name AS "zoneName",
        zone_type AS "zoneType",
        COALESCE(avg_score, 0) AS "avgScore",
        COALESCE(total_ratings, 0) AS "totalRatings",
        COALESCE(positive_ratio, 0) AS "positiveRatio",
        CASE
          WHEN avg_score > COALESCE(prev_avg, avg_score) THEN 'up'
          WHEN avg_score < COALESCE(prev_avg, avg_score) THEN 'down'
          ELSE 'stable'
        END AS trend
      FROM zone_scores
      ORDER BY zone_id, total_ratings DESC
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch experience by zone" });
  }
});

export default router;
