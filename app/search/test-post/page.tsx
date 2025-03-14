"use client"

import { useState, useEffect } from "react"

export default function TestPostPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [testResponse, setTestResponse] = useState<any>(null)

  // Test the GET endpoint on page load
  useEffect(() => {
    async function testGet() {
      try {
        const res = await fetch("/api/test")
        const data = await res.json()
        setTestResponse(data)
      } catch (err) {
        console.error("Error testing GET:", err)
      }
    }

    testGet()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      console.log("Submitting test POST:", query)

      const res = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      })

      console.log("Response status:", res.status)

      const data = await res.json()
      console.log("Response data:", data)

      setResponse(data)
    } catch (err) {
      console.error("Error:", err)
      setError("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Test POST Request
      </h1>

      {testResponse && (
        <div
          style={{
            backgroundColor: "#f0fdf4",
            padding: "15px",
            borderRadius: "4px",
            marginBottom: "20px"
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px"
            }}
          >
            GET Test Result:
          </h2>
          <pre style={{ margin: 0 }}>
            {JSON.stringify(testResponse, null, 2)}
          </pre>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Type anything here..."
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading || !query.trim() ? 0.7 : 1
          }}
        >
          {isLoading ? "Sending..." : "Send POST Request"}
        </button>
      </form>

      {error && (
        <div
          style={{
            backgroundColor: "#fee2e2",
            padding: "15px",
            borderRadius: "4px",
            marginBottom: "20px",
            color: "#b91c1c"
          }}
        >
          {error}
        </div>
      )}

      {response && (
        <div
          style={{
            backgroundColor: "#e0f2fe",
            padding: "15px",
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
            POST Response:
          </h2>
          <pre style={{ margin: 0 }}>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
