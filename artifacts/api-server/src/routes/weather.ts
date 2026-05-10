import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/weather/impact", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      WITH weather_mobility AS (
        SELECT
          DATE(ws.recorded_at) AS date,
          ws.condition,
          ROUND(AVG(ws.temperature)::numeric, 1)::float AS avg_temperature,
          ROUND(AVG(ws.humidity)::numeric, 1)::float AS avg_humidity,
          COUNT(DISTINCT me.id)::int AS mobility_count,
          ROUND(AVG(me.duration_mins)::numeric, 1)::float AS avg_duration,
          MODE() WITHIN GROUP (ORDER BY me.transport_mode) AS dominant_transport
        FROM weather_snapshots ws
        LEFT JOIN mobility_events me ON DATE(me.timestamp) = DATE(ws.recorded_at)
        GROUP BY DATE(ws.recorded_at), ws.condition
      )
      SELECT
        date::text AS date,
        condition,
        avg_temperature AS "avgTemperature",
        avg_humidity AS "avgHumidity",
        COALESCE(mobility_count, 0) AS "mobilityCount",
        COALESCE(avg_duration, 0) AS "avgDuration",
        COALESCE(dominant_transport, 'mixed') AS "dominantTransport"
      FROM weather_mobility
      ORDER BY date DESC
      LIMIT 30
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch weather impact" });
  }
});

export default router;
