"use server"

import { db } from "@/db/db"
import { InsertMessage, messagesTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export const createMessage = async (data: InsertMessage) => {
  try {
    const [newMessage] = await db.insert(messagesTable).values(data).returning()
    return newMessage
  } catch (error) {
    console.error("Error creating message:", error)
    throw new Error("Failed to create message")
  }
}

export const getMessagesByChatId = async (chatId: string) => {
  try {
    return await db.query.messages.findMany({
      where: eq(messagesTable.chatId, chatId),
      orderBy: (messages, { asc }) => [asc(messages.createdAt)]
    })
  } catch (error) {
    console.error("Error getting messages:", error)
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
