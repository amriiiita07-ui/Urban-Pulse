import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { citizensTable } from "./citizens";
import { zonesTable } from "./zones";

export const mobilityEventsTable = pgTable("mobility_events", {
  id: serial("id").primaryKey(),
  citizenId: integer("citizen_id").notNull().references(() => citizensTable.id),
  zoneId: integer("zone_id").notNull().references(() => zonesTable.id),
  transportMode: text("transport_mode").notNull(),
  durationMins: integer("duration_mins").notNull(),
  crowdingLevel: text("crowding_level").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
});

export const insertMobilityEventSchema = createInsertSchema(mobilityEventsTable).omit({ id: true });
export type InsertMobilityEvent = z.infer<typeof insertMobilityEventSchema>;
export type MobilityEvent = typeof mobilityEventsTable.$inferSelect;
