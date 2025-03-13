import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { messagesTable } from "./messages-schema"
import { chatsTable } from "./chats-schema"

export const sourcesTable = pgTable("sources", {
  id: uuid("id").primaryKey(),
  messageId: uuid("message_id").references(() => messagesTable.id, {
    onDelete: "cascade"
  }),
  chatId: uuid("chat_id").references(() => chatsTable.id, {
    onDelete: "cascade"
  }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertSource = typeof sourcesTable.$inferInsert
export type SelectSource = typeof sourcesTable.$inferSelect
