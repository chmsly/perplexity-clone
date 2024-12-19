"use server"

import { db } from "@/db/db"
import { chatsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { ActionState } from "@/types"
import { SelectChat } from "@/db/schema"

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