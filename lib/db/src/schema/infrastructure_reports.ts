import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { citizensTable } from "./citizens";
import { zonesTable } from "./zones";

export const infrastructureReportsTable = pgTable("infrastructure_reports", {
  id: serial("id").primaryKey(),
  citizenId: integer("citizen_id").notNull().references(() => citizensTable.id),
  zoneId: integer("zone_id").notNull().references(() => zonesTable.id),
  issueType: text("issue_type").notNull(),
  severity: text("severity").notNull(),
  status: text("status").notNull().default("open"),
  reportedAt: timestamp("reported_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertInfrastructureReportSchema = createInsertSchema(infrastructureReportsTable).omit({ id: true });
export type InsertInfrastructureReport = z.infer<typeof insertInfrastructureReportSchema>;
export type InfrastructureReport = typeof infrastructureReportsTable.$inferSelect;
