import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { cityEventsTable, zonesTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/city-events", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      SELECT
        ce.id,
        ce.zone_id AS "zoneId",
        z.name AS "zoneName",
        ce.name,
        ce.event_type AS "eventType",
        ce.expected_attendance AS "expectedAttendance",
        ce.mobility_impact AS "mobilityImpact",
        ce.starts_at::text AS "startsAt",
        ce.ends_at::text AS "endsAt"
      FROM city_events ce
      JOIN zones z ON z.id = ce.zone_id
      ORDER BY ce.starts_at DESC
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch city events" });
  }
});

export default router;
