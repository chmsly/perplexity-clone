"use server"

import {
  getProfileByUserId
} from "@/db/queries/profiles-queries"
import { InsertProfile, SelectProfile } from "@/db/schema/profiles-schema"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"
import { db } from "@/db/db"
import { profilesTable } from "@/db/schema"
import { nanoid } from "nanoid"
import { createProfile } from "@/db/queries/profiles-queries"

export async function createProfileAction(
  userId: string
): Promise<ActionState<null>> {
  try {
    await createProfile(userId)
    revalidatePath("/")
    
    return {
      isSuccess: true,
      message: "Profile created successfully"
    }
  } catch (error) {
    console.error("Error creating profile:", error)
    return { isSuccess: false, message: "Failed to create profile" }
  }
}

export async function getProfileByUserIdAction(
  userId: string
): Promise<ActionState<SelectProfile>> {
  try {
    const profile = await getProfileByUserId(userId)
    return {
      isSuccess: true,
      message: "Profile retrieved successfully",
      data: profile
    }
  } catch (error) {
    console.error("Error getting profile by user id", error)
    return { isSuccess: false, message: "Failed to get profile" }
  }
}
