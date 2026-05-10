import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { cohortsTable } from "./cohorts";

export const citizensTable = pgTable("citizens", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ageGroup: text("age_group").notNull(),
  cohortId: integer("cohort_id").references(() => cohortsTable.id),
  registeredAt: timestamp("registered_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCitizenSchema = createInsertSchema(citizensTable).omit({ id: true, registeredAt: true });
export type InsertCitizen = z.infer<typeof insertCitizenSchema>;
export type Citizen = typeof citizensTable.$inferSelect;
