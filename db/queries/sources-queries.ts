"use server"

import { db } from "@/db/db"
import { sourcesTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export const createSource = async (data: typeof sourcesTable.$inferInsert) => {
  try {
    const [source] = await db.insert(sourcesTable).values(data).returning()
    return source
  } catch (error) {
    console.error("Error creating source:", error)
    return null
  }
}

export const getSourcesByChatId = async (chatId: string) => {
  try {
    return await db.query.sources.findMany({
      where: eq(sourcesTable.chatId, chatId),
      orderBy: (sources, { asc }) => [asc(sources.createdAt)]
    })
  } catch (error) {
    console.error("Error getting sources by chat ID:", error)
    return null
  }
}
