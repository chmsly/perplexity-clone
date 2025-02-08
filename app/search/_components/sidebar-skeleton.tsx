"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface SidebarSkeletonProps {
  className?: string
}

export default function SidebarSkeleton({ className }: SidebarSkeletonProps) {
  return (
    <div className={cn("bg-secondary flex flex-col", className)}>
      <div className="flex items-center justify-between p-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>

      <div className="flex-1 space-y-4 p-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  )
}
