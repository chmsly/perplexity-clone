"use server"

import { db } from "@/db/db"
import { messagesTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { InsertMessage } from "@/db/schema"

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
    return db.query.messages.findMany({
      where: eq(messagesTable.chatId, chatId),
      orderBy: messages => messages.createdAt
    })
  } catch (error) {
    console.error("Error getting messages:", error)
    throw new Error("Failed to get messages")
  }
}
