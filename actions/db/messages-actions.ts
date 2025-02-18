"use server"

import { createMessage, getMessagesByChatId } from "@/db/queries/messages-queries"
import { messagesTable } from "@/db/schema"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"

export async function createMessageAction(
  data: typeof messagesTable.$inferInsert,
  query?: string
): Promise<
  ActionState<{
    messages: typeof messagesTable.$inferSelect[]
    sources: string[]
  }>
> {
  try {
    const message = await createMessage(data)

    if (!message) throw new Error("Failed to create message")

    const messages = await getMessagesByChatId(data.chatId)

    if (!messages) throw new Error("Failed to get messages")

    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Message created successfully",
      data: {
        messages,
        sources: []
      }
    }
  } catch (error) {
    console.error("Error creating message:", error)
    return { isSuccess: false, message: "Failed to create message" }
  }
}

export async function getMessagesByChatIdAction(
  chatId: string
): Promise<ActionState<typeof messagesTable.$inferSelect[]>> {
  try {
    const messages = await getMessagesByChatId(chatId)

    if (!messages) throw new Error("Failed to get messages")

    return {
      isSuccess: true,
      message: "Messages retrieved successfully",
      data: messages
    }
  } catch (error) {
    console.error("Error getting messages:", error)
    return { isSuccess: false, message: "Failed to get messages" }
  }
} 