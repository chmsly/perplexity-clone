"use client"

import { useState } from "react"

export default function SimpleSearchPage() {
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<any[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      content: query,
      role: "user"
    }

    // Create AI response
    const aiMessage = {
      id: `ai-${Date.now()}`,
      content: `This is a simulated response to: "${query}". No API call is being made.`,
      role: "assistant"
    }

    // Update messages
    setMessages([...messages, userMessage, aiMessage])

    // Clear input
    setQuery("")
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <header
        style={{
          padding: "20px",
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: "#f9fafb"
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
          Simple Search
        </h1>
      </header>

      <main
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#ffffff"
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center"
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px"
              }}
            >
              Ask anything
            </h2>
            <p style={{ color: "#6b7280" }}>
              Start by typing your question below
            </p>
          </div>
        ) : (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {messages.map(message => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent:
                    message.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: "20px"
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    backgroundColor:
                      message.role === "user" ? "#0070f3" : "#f3f4f6",
                    color: message.role === "user" ? "white" : "black"
                  }}
                >
                  <p style={{ margin: 0 }}>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer
        style={{
          padding: "20px",
          borderTop: "1px solid #e5e7eb",
          backgroundColor: "#f9fafb"
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            maxWidth: "800px",
            margin: "0 auto",
            gap: "10px"
          }}
        >
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ask anything..."
            style={{
              flex: 1,
              padding: "10px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
          <button
            type="submit"
            disabled={!query.trim()}
            style={{
              padding: "10px 16px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: !query.trim() ? "not-allowed" : "pointer",
              opacity: !query.trim() ? 0.7 : 1
            }}
          >
            Search
          </button>
        </form>
      </footer>
    </div>
  )
}
