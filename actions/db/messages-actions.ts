"use server"

import { createMessage, getMessagesByChatId } from "@/db/queries/messages-queries"
import { InsertMessage, SelectMessage } from "@/db/schema"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"

interface MessageResponse {
  messages: SelectMessage[]
  sources: string[]
}

export async function createMessageAction(
  data: InsertMessage
): Promise<ActionState<MessageResponse>> {
  try {
    // Create the user's message
    const userMessage = await createMessage(data)

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Create AI response
    const aiMessage = await createMessage({
      chatId: data.chatId,
      content: "This is a simulated AI response. Replace with actual AI integration.",
      role: "assistant"
    })

    // Get all messages for the chat
    const messages = await getMessagesByChatId(data.chatId)

    // Simulate sources
    const sources = [
      "https://example.com/source1",
      "https://example.com/source2"
    ]

    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Messages created successfully",
      data: {
        messages,
        sources
      }
    }
  } catch (error) {
    console.error("Error in createMessageAction:", error)
    return {
      isSuccess: false,
      message: "Failed to create message"
    }
  }
}

export async function getMessagesByChatIdAction(
  chatId: string
): Promise<ActionState<SelectMessage[]>> {
  try {
    const messages = await getMessagesByChatId(chatId)
    return {
      isSuccess: true,
      message: "Messages retrieved successfully",
      data: messages
    }
  } catch (error) {
    console.error("Error in getMessagesByChatIdAction:", error)
    return {
      isSuccess: false,
      message: "Failed to get messages"
    }
  }
} 