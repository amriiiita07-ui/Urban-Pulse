import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { zonesTable, mobilityEventsTable, experienceScoresTable } from "@workspace/db";
import { sql, eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/zones", async (req, res) => {
  try {
    const zones = await db.select().from(zonesTable);
    res.json(zones.map(z => ({
      ...z,
      lat: Number(z.lat),
      lng: Number(z.lng),
      createdAt: z.createdAt.toISOString(),
    })));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch zones" });
  }
});

router.get("/zones/heatmap", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      SELECT
        z.id AS "zoneId",
        z.name AS "zoneName",
        z.lat::float AS lat,
        z.lng::float AS lng,
        COUNT(me.id)::int AS "activityCount",
        ROUND((COUNT(me.id)::numeric / NULLIF((SELECT MAX(cnt) FROM (SELECT COUNT(*) AS cnt FROM mobility_events GROUP BY zone_id) sub), 0) * 100)::numeric, 1)::float AS intensity
      FROM zones z
      LEFT JOIN mobility_events me ON me.zone_id = z.id
      GROUP BY z.id, z.name, z.lat, z.lng
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch heatmap data" });
  }
});

router.get("/zones/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    const [zone] = await db.select().from(zonesTable).where(eq(zonesTable.id, id));
    if (!zone) {
      res.status(404).json({ error: "Zone not found" });
      return;
    }
    res.json({ ...zone, lat: Number(zone.lat), lng: Number(zone.lng), createdAt: zone.createdAt.toISOString() });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch zone" });
  }
});

export default router;
