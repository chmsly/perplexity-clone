"use client"

import { useState } from "react"
import { useAuth } from "@clerk/nextjs"

export default function WorkingSearchPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [sources, setSources] = useState<any[]>([])
  const { userId, isLoaded, isSignedIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)

    try {
      console.log("Submitting search:", query)

      // Add user message immediately
      const userMessage = {
        id: `user-${Date.now()}`,
        content: query,
        role: "user",
        createdAt: new Date().toISOString()
      }

      setMessages(prev => [...prev, userMessage])

      // Call the bypass API
      const response = await fetch("/api/search/bypass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      })

      const result = await response.json()
      console.log("Search result:", result)

      if (result.success && result.data) {
        // Get the assistant message and sources
        const assistantMessage = result.data.messages.find(
          (m: any) => m.role === "assistant"
        )
        const newSources = result.data.sources || []

        if (assistantMessage) {
          setMessages(prev => [...prev, assistantMessage])
          setSources(prev => [...prev, ...newSources])
        }

        setQuery("") // Clear input
      } else {
        // Add error message
        const errorMessage = {
          id: `error-${Date.now()}`,
          content: "Sorry, there was an error processing your request.",
          role: "assistant",
          createdAt: new Date().toISOString()
        }

        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      console.error("Error:", error)

      // Add error message
      const errorMessage = {
        id: `error-${Date.now()}`,
        content: "Sorry, there was an error processing your request.",
        role: "assistant",
        createdAt: new Date().toISOString()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state
  if (!isLoaded) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        Loading...
      </div>
    )
  }

  // Not signed in
  if (!isSignedIn) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "20px"
        }}
      >
        <p style={{ marginBottom: "20px", textAlign: "center" }}>
          Please sign in to use the search feature
        </p>
        <a
          href="/login"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            borderRadius: "4px",
            textDecoration: "none"
          }}
        >
          Sign In
        </a>
      </div>
    )
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh"
      }}
    >
      <header
        style={{
          padding: "20px",
          borderBottom: "1px solid #e5e7eb"
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
          Perplexity Clone
        </h1>
      </header>

      <main
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto"
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
            {messages.map(message => {
              const messageSources = sources.filter(
                source => source.messageId === message.id
              )

              return (
                <div
                  key={message.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
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
                    <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                      {message.content}
                    </p>
                  </div>

                  {message.role === "assistant" &&
                    messageSources.length > 0 && (
                      <div style={{ marginTop: "10px", marginLeft: "16px" }}>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#6b7280",
                            marginBottom: "5px"
                          }}
                        >
                          Sources:
                        </p>
                        <ul style={{ paddingLeft: "20px", margin: 0 }}>
                          {messageSources.map(source => (
                            <li key={source.id} style={{ fontSize: "14px" }}>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "#0070f3",
                                  textDecoration: "none"
                                }}
                              >
                                {source.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              )
            })}
          </div>
        )}
      </main>

      <footer
        style={{
          padding: "20px",
          borderTop: "1px solid #e5e7eb"
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
            disabled={isLoading}
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
            disabled={isLoading || !query.trim()}
            style={{
              padding: "10px 16px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: isLoading || !query.trim() ? "not-allowed" : "pointer",
              opacity: isLoading || !query.trim() ? 0.7 : 1
            }}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </footer>
    </div>
  )
}
