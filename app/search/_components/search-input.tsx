"use client"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { useRef, useState } from "react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSearch: (value: string) => void
  disabled?: boolean
  className?: string
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  disabled,
  className
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "bg-background ring-offset-background focus-within:ring-ring flex h-12 w-full items-center rounded-lg border px-3 focus-within:ring-2 focus-within:ring-offset-2",
        isFocused ? "ring-2 ring-offset-2" : "",
        className
      )}
    >
      <Search className="mr-2 size-5 shrink-0 opacity-50" />
      <input
        ref={inputRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Ask anything..."
        className="placeholder:text-muted-foreground flex-1 border-0 bg-transparent p-0 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </form>
  )
}
