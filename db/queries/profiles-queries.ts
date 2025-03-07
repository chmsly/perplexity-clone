"use server"

import { db } from "@/db/db"
import { eq } from "drizzle-orm"
import { profilesTable } from "@/db/schema"
import { nanoid } from "nanoid"

export const getProfileByUserId = async (userId: string) => {
  try {
    // First check if the profile exists
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

// Add a more robust createProfile function
export const createProfile = async (userId: string) => {
  try {
    // First check if profile already exists to avoid duplicates
    const existingProfile = await getProfileByUserId(userId)

    if (existingProfile) {
      return existingProfile
    }

    // Create new profile if it doesn't exist
    const [newProfile] = await db
      .insert(profilesTable)
      .values({
        id: nanoid(),
        userId,
        membership: "free"
      })
      .returning()

    return newProfile
  } catch (error) {
    console.error("Error creating profile:", error)
    throw new Error("Failed to create profile")
  }
}
