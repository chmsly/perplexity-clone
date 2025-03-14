"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function DirectSearchPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!query.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      console.log("Submitting direct search:", { query })

      const response = await fetch("/api/search/direct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      })

      console.log("Direct search response status:", response.status)

      const data = await response.json()
      console.log("Direct search result:", data)

      if (data.success) {
        setResult(data.data)
      } else {
        setError(data.error || "Search failed")
      }
    } catch (error) {
      console.error("Error during direct search:", error)
      setError("An error occurred during search")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Direct API Search</h1>

      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ask anything..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !query.trim()}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>

      {error && (
        <div className="mb-4 rounded bg-red-100 p-4 text-red-800">{error}</div>
      )}

      {result && (
        <div className="mt-4">
          <h2 className="mb-2 text-xl font-semibold">Response:</h2>
          <div className="whitespace-pre-wrap rounded bg-gray-100 p-4">
            {result.result}
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <p>Model: {result.model}</p>
            <p>Timestamp: {result.timestamp}</p>
          </div>
        </div>
      )}
    </div>
  )
}
