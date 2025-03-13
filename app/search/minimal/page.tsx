"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function MinimalSearchPage() {
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
      console.log("Submitting search:", { query })

      const response = await fetch("/api/search/minimal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      })

      console.log("Search response status:", response.status)

      const data = await response.json()
      console.log("Search result:", data)

      setResult(data)
    } catch (error) {
      console.error("Error during search:", error)
      setError("An error occurred during search")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Minimal Search</h1>

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
          <h2 className="mb-2 text-xl font-semibold">Raw Response:</h2>
          <pre className="max-h-[500px] overflow-auto rounded bg-gray-100 p-4">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
