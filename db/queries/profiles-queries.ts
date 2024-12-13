"use server"

import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { profilesTable } from "@/db/schema"

export const getProfileByUserId = async (userId: string) => {
  try {
    const [profile] = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.userId, userId))
    return profile
  } catch (error) {
    console.error("Error getting profile:", error)
    return null
  }
}
