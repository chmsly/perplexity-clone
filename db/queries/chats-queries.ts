"use server"

import { db } from "@/db/db"
import { chatsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { InsertChat, SelectChat } from "@/db/schema/chats-schema"

export async function createChat(chat: InsertChat): Promise<SelectChat> {
  try {
    const [newChat] = await db.insert(chatsTable).values(chat).returning()

    return newChat
  } catch (error) {
    console.error("Error creating chat:", error)
    throw new Error("Failed to create chat")
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
    console.error("Error getting chat by id:", error)
    throw new Error("Failed to get chat")
  }
}

export async function getChatsByUserId(userId: string): Promise<SelectChat[]> {
  try {
    const chats = await db
      .select()
      .from(chatsTable)
      .where(eq(chatsTable.userId, userId))
      .orderBy(chatsTable.createdAt)

    return chats
  } catch (error) {
    console.error("Error getting chats by user id:", error)
    throw new Error("Failed to get chats")
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
