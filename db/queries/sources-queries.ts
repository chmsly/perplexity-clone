"use server"

import { db } from "@/db/db"
import { sourcesTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { InsertSource, SelectSource } from "@/db/schema/sources-schema"

export async function createSource(
  source: InsertSource
): Promise<SelectSource> {
  try {
    const [newSource] = await db.insert(sourcesTable).values(source).returning()

    return newSource
  } catch (error) {
    console.error("Error creating source:", error)
    throw new Error("Failed to create source")
  }
}

export async function getSourcesByChatId(
  chatId: string
): Promise<SelectSource[]> {
  try {
    const sources = await db
      .select()
      .from(sourcesTable)
      .where(eq(sourcesTable.chatId, chatId))
      .orderBy(sourcesTable.createdAt)

    return sources
  } catch (error) {
    console.error("Error getting sources by chat id:", error)
    throw new Error("Failed to get sources")
  }
}
