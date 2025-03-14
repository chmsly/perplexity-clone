"use client"

import { useState } from "react"

export default function BypassSearchPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      console.log("Submitting search:", query)

      const res = await fetch("/api/search/bypass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      })

      console.log("Response status:", res.status)

      const data = await res.json()
      console.log("Response data:", data)

      if (data.success) {
        setResponse(data.data)
      } else {
        setError(data.error || "Search failed")
      }
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
        Bypass Search
      </h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Type your question here..."
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
          {isLoading ? "Searching..." : "Search"}
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
        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "15px"
            }}
          >
            Response:
          </h2>

          {response.messages.map((message: any) => (
            <div
              key={message.id}
              style={{
                backgroundColor:
                  message.role === "user" ? "#e0f2fe" : "#f0fdf4",
                padding: "15px",
                borderRadius: "4px",
                marginBottom: "10px"
              }}
            >
              <p style={{ margin: 0 }}>{message.content}</p>
              <p
                style={{
                  margin: "5px 0 0 0",
                  fontSize: "12px",
                  color: "#6b7280"
                }}
              >
                {message.role}
              </p>
            </div>
          ))}

          {response.sources && response.sources.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}
              >
                Sources:
              </h3>

              <ul style={{ paddingLeft: "20px" }}>
                {response.sources.map((source: any) => (
                  <li key={source.id} style={{ marginBottom: "5px" }}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#0070f3", textDecoration: "underline" }}
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
