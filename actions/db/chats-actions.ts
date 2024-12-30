"use server"

import { db } from "@/db/db"
import { chatsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { ActionState } from "@/types"
import { SelectChat } from "@/db/schema"
import { nanoid } from "nanoid"
import { revalidatePath } from "next/cache"

export async function getChatsAction(userId: string): Promise<ActionState<SelectChat[]>> {
  try {
    const chats = await db.query.chats.findMany({
      where: eq(chatsTable.userId, userId)
    })
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

export async function getChatAction(chatId: string): Promise<ActionState<SelectChat>> {
  try {
    const [chat] = await db
      .select()
      .from(chatsTable)
      .where(eq(chatsTable.id, chatId))

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

export async function createChatAction(
  userId: string,
  name: string
): Promise<ActionState<SelectChat>> {
  try {
    const [chat] = await db
      .insert(chatsTable)
      .values({
        id: nanoid(),
        userId,
        name
      })
      .returning()

    revalidatePath("/search")
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

export async function deleteChatAction(chatId: string): Promise<ActionState<null>> {
  try {
    await db.delete(chatsTable).where(eq(chatsTable.id, chatId))
    revalidatePath("/search")
    return {
      isSuccess: true,
      message: "Chat deleted successfully"
    }
  } catch (error) {
    console.error("Error deleting chat:", error)
    return { isSuccess: false, message: "Failed to delete chat" }
  }
} 