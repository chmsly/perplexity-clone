"use server"

import { createChat, deleteChat, updateChat } from "@/db/queries/chats-queries"
import { InsertChat, SelectChat } from "@/db/schema"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"

export async function createChatAction(
  data: Omit<InsertChat, "userId">,
  userId: string
): Promise<ActionState<SelectChat>> {
  try {
    const chat = await createChat({ ...data, userId })
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Chat created successfully",
      data: chat
    }
  } catch (error) {
    console.error("Error in createChatAction:", error)
    return {
      isSuccess: false,
      message: "Failed to create chat"
    }
  }
}

export async function updateChatAction(
  id: string,
  data: Partial<InsertChat>
): Promise<ActionState<SelectChat>> {
  try {
    const chat = await updateChat(id, data)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Chat updated successfully",
      data: chat
    }
  } catch (error) {
    console.error("Error in updateChatAction:", error)
    return {
      isSuccess: false,
      message: "Failed to update chat"
    }
  }
}

export async function deleteChatAction(
  id: string
): Promise<ActionState<SelectChat>> {
  try {
    const chat = await deleteChat(id)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Chat deleted successfully",
      data: chat
    }
  } catch (error) {
    console.error("Error in deleteChatAction:", error)
    return {
      isSuccess: false,
      message: "Failed to delete chat"
    }
  }
} 