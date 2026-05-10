import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { zonesTable } from "./zones";

export const cityEventsTable = pgTable("city_events", {
  id: serial("id").primaryKey(),
  zoneId: integer("zone_id").notNull().references(() => zonesTable.id),
  name: text("name").notNull(),
  eventType: text("event_type").notNull(),
  expectedAttendance: integer("expected_attendance").notNull(),
  mobilityImpact: text("mobility_impact").notNull().default("low"),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
});

export const insertCityEventSchema = createInsertSchema(cityEventsTable).omit({ id: true });
export type InsertCityEvent = z.infer<typeof insertCityEventSchema>;
export type CityEvent = typeof cityEventsTable.$inferSelect;
