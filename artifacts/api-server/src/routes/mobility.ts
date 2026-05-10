import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { mobilityEventsTable, zonesTable } from "@workspace/db";
import { sql, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/mobility-events", async (req, res) => {
  try {
    const limit = Math.min(parseInt(String(req.query.limit ?? "50"), 10), 200);
    const zoneId = req.query.zoneId ? parseInt(String(req.query.zoneId), 10) : null;

    const rows = await db.execute(sql`
      SELECT
        me.id,
        me.citizen_id AS "citizenId",
        me.zone_id AS "zoneId",
        z.name AS "zoneName",
        me.transport_mode AS "transportMode",
        me.duration_mins AS "durationMins",
        me.crowding_level AS "crowdingLevel",
        me.timestamp::text AS timestamp
      FROM mobility_events me
      JOIN zones z ON z.id = me.zone_id
      ${zoneId ? sql`WHERE me.zone_id = ${zoneId}` : sql``}
      ORDER BY me.timestamp DESC
      LIMIT ${limit}
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch mobility events" });
  }
});

router.get("/mobility-events/crowding-forecast", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      WITH hourly_stats AS (
        SELECT
          zone_id,
          EXTRACT(HOUR FROM timestamp)::int AS hour,
          AVG(
            CASE crowding_level
              WHEN 'low' THEN 1
              WHEN 'medium' THEN 2
              WHEN 'high' THEN 3
              ELSE 2
            END
          )::float AS historical_avg
        FROM mobility_events
        GROUP BY zone_id, EXTRACT(HOUR FROM timestamp)
      )
      SELECT
        z.id AS "zoneId",
        z.name AS "zoneName",
        hs.hour,
        ROUND((hs.historical_avg * (0.9 + RANDOM() * 0.2))::numeric, 2)::float AS "forecastedCrowding",
        ROUND(hs.historical_avg::numeric, 2)::float AS "historicalAvg",
        CASE
          WHEN hs.historical_avg >= 2.5 THEN 'high'
          WHEN hs.historical_avg >= 1.5 THEN 'medium'
          ELSE 'low'
        END AS "riskLevel"
      FROM hourly_stats hs
      JOIN zones z ON z.id = hs.zone_id
      ORDER BY "zoneId", hour
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch crowding forecast" });
  }
});

export default router;
