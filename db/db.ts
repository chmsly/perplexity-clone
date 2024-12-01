import { chatsTable, messagesTable, sourcesTable } from "@/db/schema"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

config({ path: ".env.local" })

console.log("DATABASE_URL:", process.env.DATABASE_URL)

export const schema = {
  chats: chatsTable,
  messages: messagesTable,
  sources: sourcesTable
}

const client = postgres(process.env.DATABASE_URL!, {
  ssl: {
    rejectUnauthorized: false
  }
})

export const db = drizzle(client, { schema })
