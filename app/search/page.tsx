import { Suspense } from "react"
import ChatArea from "./_components/chat-area"
import ChatAreaSkeleton from "./_components/chat-area-skeleton"

export default function SearchPage() {
  return (
    <Suspense fallback={<ChatAreaSkeleton />}>
      <ChatArea />
    </Suspense>
  )
}
