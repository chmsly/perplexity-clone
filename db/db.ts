import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "@/db/schema"

// Get the database connection string from environment variables
const connectionString = process.env.DATABASE_URL

// Log the connection string (with password masked for security)
console.log(
  "Database connection string:",
  connectionString?.replace(/:([^:@]+)@/, ":****@")
)

// Configure connection with better error handling
const client = postgres(connectionString || "", {
  max: 1, // Use a single connection for simplicity
  idle_timeout: 10, // Shorter timeout for development
  connect_timeout: 10,
  ssl: { rejectUnauthorized: false }, // Accept self-signed certificates
  debug: true // Enable debug mode to see queries
})

// Create db instance with schema
export const db = drizzle(client, { schema })

// Export a function to test the connection
export async function testConnection() {
  try {
    console.log("Testing database connection...")
    const result = await client`SELECT 1 AS test`
    console.log("Database connection test result:", result)
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}
