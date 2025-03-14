"use server"

import { db } from "@/db/db"
import { chatsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { InsertChat, SelectChat } from "@/db/schema/chats-schema"

export async function createChat(
  chat: InsertChat
): Promise<SelectChat | undefined> {
  try {
    const [newChat] = await db.insert(chatsTable).values(chat).returning()

    return newChat
  } catch (error) {
    console.error("Database error in createChat:", error)
    return undefined
  }
}

export async function getChatById(id: string): Promise<SelectChat | undefined> {
  try {
    const [chat] = await db
      .select()
      .from(chatsTable)
      .where(eq(chatsTable.id, id))

    return chat
  } catch (error) {
    console.error("Database error in getChatById:", error)
    return undefined
  }
}

export async function getChatsByUserId(userId: string): Promise<SelectChat[]> {
  try {
    console.log("Getting chats for user:", userId)

    // Use a simpler query to test the database connection
    const chats = await db
      .select()
      .from(chatsTable)
      .where(eq(chatsTable.userId, userId))

    console.log("Found chats:", chats.length)
    return chats
  } catch (error) {
    console.error("Database error in getChatsByUserId:", error)
    // Return an empty array instead of throwing an error
    return []
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
