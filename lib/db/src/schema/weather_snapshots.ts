import { pgTable, serial, integer, numeric, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { zonesTable } from "./zones";

export const weatherSnapshotsTable = pgTable("weather_snapshots", {
  id: serial("id").primaryKey(),
  zoneId: integer("zone_id").notNull().references(() => zonesTable.id),
  temperature: numeric("temperature", { precision: 5, scale: 2 }).notNull(),
  condition: text("condition").notNull(),
  humidity: integer("humidity").notNull(),
  recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertWeatherSnapshotSchema = createInsertSchema(weatherSnapshotsTable).omit({ id: true });
export type InsertWeatherSnapshot = z.infer<typeof insertWeatherSnapshotSchema>;
export type WeatherSnapshot = typeof weatherSnapshotsTable.$inferSelect;
