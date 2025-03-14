"use client"

import { useState, useEffect } from "react"

export default function DbDebugPage() {
  const [status, setStatus] = useState("Loading...")
  const [error, setError] = useState<string | null>(null)
  const [dbUrl, setDbUrl] = useState<string | null>(null)

  useEffect(() => {
    async function checkDb() {
      try {
        const res = await fetch("/api/test-db")
        const data = await res.json()

        setStatus(data.status)
        if (data.message) {
          setError(data.message)
        }
      } catch (err) {
        setStatus("Error")
        setError(err.message)
      }
    }

    async function getDbInfo() {
      try {
        const res = await fetch("/api/db-info")
        const data = await res.json()

        if (data.dbUrl) {
          // Mask the password for security
          setDbUrl(data.dbUrl.replace(/:([^:@]+)@/, ":****@"))
        }
      } catch (err) {
        console.error("Failed to get DB info:", err)
      }
    }

    checkDb()
    getDbInfo()
  }, [])

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Database Connection Debug
      </h1>

      <div
        style={{
          backgroundColor: status === "connected" ? "#d1fae5" : "#fee2e2",
          padding: "20px",
          borderRadius: "4px",
          marginBottom: "20px"
        }}
      >
        <h2
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Connection Status: {status}
        </h2>

        {error && (
          <div style={{ marginTop: "10px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>Error:</h3>
            <p style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
              {error}
            </p>
          </div>
        )}
      </div>

      {dbUrl && (
        <div
          style={{
            backgroundColor: "#f3f4f6",
            padding: "20px",
            borderRadius: "4px"
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px"
            }}
          >
            Database URL:
          </h2>
          <p style={{ fontFamily: "monospace", wordBreak: "break-all" }}>
            {dbUrl}
          </p>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <h2
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Troubleshooting Steps:
        </h2>
        <ol style={{ paddingLeft: "20px" }}>
          <li style={{ marginBottom: "10px" }}>
            Check if your DATABASE_URL in .env.local is correct
          </li>
          <li style={{ marginBottom: "10px" }}>
            Make sure your database server is running and accessible
          </li>
          <li style={{ marginBottom: "10px" }}>
            Verify that the database user has the necessary permissions
          </li>
          <li style={{ marginBottom: "10px" }}>
            Check if the database tables exist
          </li>
          <li style={{ marginBottom: "10px" }}>
            Try restarting your development server
          </li>
        </ol>
      </div>
    </div>
  )
}
