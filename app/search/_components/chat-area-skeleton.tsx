"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { SearchInput } from "./search-input"

export default function ChatAreaSkeleton() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start gap-4">
            <Skeleton className="size-6 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <SearchInput
          className="mx-auto w-full"
          onSearch={() => {}}
          disabled
          value=""
        />
      </div>
    </div>
  )
}
