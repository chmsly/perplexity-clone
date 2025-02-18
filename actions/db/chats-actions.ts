"use server"

import {
  createChat,
  deleteChat,
  getChatById,
  getChatsByUserId,
  updateChat
} from "@/db/queries/chats-queries"
import { chatsTable } from "@/db/schema"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"

export async function createChatAction(
  data: Omit<typeof chatsTable.$inferInsert, "userId">,
  userId: string
): Promise<ActionState<typeof chatsTable.$inferSelect>> {
  try {
    const chat = await createChat({
      ...data,
      userId
    })

    if (!chat) throw new Error("Failed to create chat")

    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Chat created successfully",
      data: chat
    }
  } catch (error) {
    console.error("Error creating chat:", error)
    return { isSuccess: false, message: "Failed to create chat" }
  }
}

export async function getChatByIdAction(
  id: string
): Promise<ActionState<typeof chatsTable.$inferSelect>> {
  try {
    const chat = await getChatById(id)

    if (!chat) throw new Error("Failed to get chat")

    return {
      isSuccess: true,
      message: "Chat retrieved successfully",
      data: chat
    }
  } catch (error) {
    console.error("Error getting chat:", error)
    return { isSuccess: false, message: "Failed to get chat" }
  }
}

export async function getChatsByUserIdAction(
  userId: string
): Promise<ActionState<typeof chatsTable.$inferSelect[]>> {
  try {
    const chats = await getChatsByUserId(userId)

    if (!chats) throw new Error("Failed to get chats")

    return {
      isSuccess: true,
      message: "Chats retrieved successfully",
      data: chats
    }
  } catch (error) {
    console.error("Error getting chats:", error)
    return { isSuccess: false, message: "Failed to get chats" }
  }
}

export async function updateChatAction(
  id: string,
  data: Partial<typeof chatsTable.$inferInsert>
): Promise<ActionState<typeof chatsTable.$inferSelect>> {
  try {
    const chat = await updateChat(id, data)

    if (!chat) throw new Error("Failed to update chat")

    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Chat updated successfully",
      data: chat
    }
  } catch (error) {
    console.error("Error updating chat:", error)
    return { isSuccess: false, message: "Failed to update chat" }
  }
}

export async function deleteChatAction(
  id: string
): Promise<ActionState<typeof chatsTable.$inferSelect>> {
  try {
    const chat = await deleteChat(id)

    if (!chat) throw new Error("Failed to delete chat")

    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Chat deleted successfully",
      data: chat
    }
  } catch (error) {
    console.error("Error deleting chat:", error)
    return { isSuccess: false, message: "Failed to delete chat" }
  }
} 