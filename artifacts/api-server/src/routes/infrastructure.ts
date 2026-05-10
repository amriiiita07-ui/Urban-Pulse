import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { infrastructureReportsTable, zonesTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/infrastructure-reports", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      SELECT
        ir.id,
        ir.citizen_id AS "citizenId",
        ir.zone_id AS "zoneId",
        z.name AS "zoneName",
        ir.issue_type AS "issueType",
        ir.severity,
        ir.status,
        ir.reported_at::text AS "reportedAt"
      FROM infrastructure_reports ir
      JOIN zones z ON z.id = ir.zone_id
      ORDER BY ir.reported_at DESC
      LIMIT 100
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch infrastructure reports" });
  }
});

router.get("/infrastructure-reports/by-type", async (req, res) => {
  try {
    const rows = await db.execute(sql`
      SELECT
        issue_type AS "issueType",
        COUNT(*)::int AS total,
        SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END)::int AS open,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END)::int AS "inProgress",
        SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END)::int AS resolved,
        ROUND(AVG(
          CASE severity
            WHEN 'low' THEN 1
            WHEN 'medium' THEN 2
            WHEN 'high' THEN 3
            WHEN 'critical' THEN 4
            ELSE 1
          END
        )::numeric, 2)::float AS "avgSeverityScore"
      FROM infrastructure_reports
      GROUP BY issue_type
      ORDER BY total DESC
    `);
    res.json(rows.rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch infra reports by type" });
  }
});

export default router;
