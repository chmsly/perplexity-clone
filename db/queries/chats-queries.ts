"use server"

import { db } from "@/db/db"
import { chatsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export const createChat = async (data: typeof chatsTable.$inferInsert) => {
  try {
    const [chat] = await db.insert(chatsTable).values(data).returning()
    return chat
  } catch (error) {
    console.error("Error creating chat:", error)
    return null
  }
}

export const getChatsByUserId = async (userId: string) => {
  try {
    return await db.query.chats.findMany({
      where: eq(chatsTable.userId, userId),
      orderBy: (chats, { desc }) => [desc(chats.createdAt)]
    })
  } catch (error) {
    console.error("Error getting chats by user ID:", error)
    return null
  }
}

export const getChatById = async (id: string) => {
  try {
    const [chat] = await db
      .select()
      .from(chatsTable)
      .where(eq(chatsTable.id, id))
    return chat
  } catch (error) {
    console.error("Error getting chat by ID:", error)
    return null
  }
}

export const updateChat = async (
  id: string,
  data: Partial<typeof chatsTable.$inferInsert>
) => {
  try {
    const [chat] = await db
      .update(chatsTable)
      .set(data)
      .where(eq(chatsTable.id, id))
      .returning()
    return chat
  } catch (error) {
    console.error("Error updating chat:", error)
    return null
  }
}

export const deleteChat = async (id: string) => {
  try {
    const [chat] = await db
      .delete(chatsTable)
      .where(eq(chatsTable.id, id))
      .returning()
    return chat
  } catch (error) {
    console.error("Error deleting chat:", error)
    return null
  }
}
