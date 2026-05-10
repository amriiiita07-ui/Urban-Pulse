import { pgTable, serial, integer, numeric, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { citizensTable } from "./citizens";
import { zonesTable } from "./zones";

export const experienceScoresTable = pgTable("experience_scores", {
  id: serial("id").primaryKey(),
  citizenId: integer("citizen_id").notNull().references(() => citizensTable.id),
  zoneId: integer("zone_id").notNull().references(() => zonesTable.id),
  score: numeric("score", { precision: 3, scale: 1 }).notNull(),
  sentiment: text("sentiment").notNull(),
  ratedAt: timestamp("rated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertExperienceScoreSchema = createInsertSchema(experienceScoresTable).omit({ id: true });
export type InsertExperienceScore = z.infer<typeof insertExperienceScoreSchema>;
export type ExperienceScore = typeof experienceScoresTable.$inferSelect;
