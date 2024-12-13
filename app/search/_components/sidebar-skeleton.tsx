"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function SidebarSkeleton() {
  return (
    <div className={`space-y-4} border-r p-4`}>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-10 w-5/6" />
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-10 w-3/4" />
    </div>
  )
}