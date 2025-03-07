import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "@/db/schema"

// Create a connection pool with more robust error handling
const connectionString = process.env.DATABASE_URL || ""

// Configure connection with retries and better error handling
const client = postgres(connectionString, {
  max: 10, // Maximum number of connections
  idle_timeout: 20, // Max seconds a client can be idle
  connect_timeout: 10, // Max seconds to wait for connection
  prepare: false, // Disable prepared statements for better compatibility
  onnotice: () => {}, // Silence notices
  onparameter: () => {}, // Silence parameter notifications
  debug: process.env.NODE_ENV === "development", // Enable debug in development
  ssl: { rejectUnauthorized: false } // Accept self-signed certificates
})

// Log connection status
console.log("Initializing database connection...")

// Create db instance with schema
export const db = drizzle(client, { schema })

// Export a function to test the connection
export async function testConnection() {
  try {
    await client`SELECT 1`
    console.log("Database connection successful")
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}
