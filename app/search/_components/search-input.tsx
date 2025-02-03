"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ForwardedRef, forwardRef } from "react"

interface SearchInputProps {
  onSearch: (query: string) => void
  className?: string
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
}

export const SearchInput = forwardRef(function SearchInput(
  { onSearch, className, disabled, value, onChange }: SearchInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value?.trim()) {
      onSearch(value)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <Input
          ref={ref}
          className="pr-10"
          type="text"
          placeholder="Ask me anything..."
          value={value}
          onChange={e => onChange?.(e.target.value)}
          disabled={disabled}
        />

        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-full"
          disabled={disabled}
        >
          <Search className="size-4" />
        </Button>
      </div>
    </form>
  )
})
