"use server"

import { db } from "@/db/db"
import { sourcesTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { InsertSource } from "@/db/schema"

export const createSource = async (data: InsertSource) => {
  try {
    const [newSource] = await db.insert(sourcesTable).values(data).returning()
    return newSource
  } catch (error) {
    console.error("Error creating source:", error)
    throw new Error("Failed to create source")
  }
}

export const getSourcesByChatId = async (chatId: string) => {
  try {
    return db.query.sources.findMany({
      where: eq(sourcesTable.chatId, chatId),
      orderBy: sources => sources.createdAt
    })
  } catch (error) {
    console.error("Error getting sources:", error)
    throw new Error("Failed to get sources")
  }
}
