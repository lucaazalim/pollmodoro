import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const poll = sqliteTable("polls", {
  id: text("id").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  pollType: text("poll_type").notNull().default("multiple_choice"),
  allowMultipleOptions: integer("allow_multiple_options", { mode: "boolean" })
    .notNull()
    .default(false),
  closeAt: integer("close_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const pollOptions = sqliteTable("poll_options", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  optionText: text("option_text").notNull(),
  // Kept in sync with `votes` on every insert so reading results never has to
  // count the votes table, which Cloudflare bills as one row read per vote.
  votesCount: integer("votes_count").notNull().default(0),
});

export const votes = sqliteTable("votes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  pollOptionId: integer("poll_option_id")
    .notNull()
    .references(() => pollOptions.id, { onDelete: "cascade" }),
  votedAt: integer("voted_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  voterIp: text("voter_ip").notNull(),
});

export const votesRelations = relations(votes, ({ one }) => ({
  pollOption: one(pollOptions, {
    fields: [votes.pollOptionId],
    references: [pollOptions.id],
  }),
}));
