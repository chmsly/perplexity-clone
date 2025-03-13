"use client"

import { useState } from "react"

export default function StandaloneSearchPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!query.trim()) return

    setIsLoading(true)

    // Simulate API call with a timeout
    setTimeout(() => {
      setResult(`This is a simulated response to your query: ${query}`)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        Standalone Search
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
      >
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ask anything..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          style={{
            padding: "8px 16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading || !query.trim() ? "not-allowed" : "pointer",
            opacity: isLoading || !query.trim() ? 0.7 : 1
          }}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "16px" }}>
          <h2
            style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}
          >
            Response:
          </h2>
          <div
            style={{
              backgroundColor: "#f3f4f6",
              padding: "16px",
              borderRadius: "4px",
              whiteSpace: "pre-wrap"
            }}
          >
            {result}
          </div>
        </div>
      )}
    </div>
  )
}
