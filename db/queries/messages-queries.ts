"use server"

import { db } from "@/db/db"
import { messagesTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { InsertMessage, SelectMessage } from "@/db/schema/messages-schema"

export async function createMessage(
  message: InsertMessage
): Promise<SelectMessage> {
  try {
    const [newMessage] = await db
      .insert(messagesTable)
      .values(message)
      .returning()

    return newMessage
  } catch (error) {
    console.error("Error creating message:", error)
    throw new Error("Failed to create message")
  }
}

export async function getMessagesByChatId(
  chatId: string
): Promise<SelectMessage[]> {
  try {
    const messages = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.chatId, chatId))
      .orderBy(messagesTable.createdAt)

    return messages
  } catch (error) {
    console.error("Error getting messages by chat id:", error)
    throw new Error("Failed to get messages")
  }
}

export const deleteMessagesByChatId = async (chatId: string) => {
  try {
    return await db
      .delete(messagesTable)
      .where(eq(messagesTable.chatId, chatId))
      .returning()
  } catch (error) {
    console.error("Error deleting messages:", error)
    throw new Error("Failed to delete messages")
  }
}
