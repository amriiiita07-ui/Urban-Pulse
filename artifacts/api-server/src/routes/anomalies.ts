import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { anomaliesTable, zonesTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/anomalies", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      SELECT
        a.id,
        a.zone_id AS "zoneId",
        z.name AS "zoneName",
        a.anomaly_type AS "anomalyType",
        a.severity,
        a.description,
        a.risk_score::float AS "riskScore",
        a.resolved,
        a.detected_at::text AS "detectedAt"
      FROM anomalies a
      JOIN zones z ON z.id = a.zone_id
      ORDER BY a.detected_at DESC
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch anomalies" });
  }
});

export default router;
