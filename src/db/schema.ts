import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Inbound contact-form submissions (leads from the homepage form).
 * Kept deliberately simple — you own this table and can build follow-up
 * automation on top of it later (your own "Database Reactivation" pitch).
 */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  // "What's this about?" — business name / website / topic.
  subject: varchar("subject", { length: 300 }),
  // "Tell me a bit more" — the actual message.
  message: text("message").notNull(),
  // Light metadata for triage / spam analysis.
  source: varchar("source", { length: 100 }).default("homepage"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
