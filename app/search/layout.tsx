import { Suspense } from "react"
import Sidebar from "./_components/sidebar"

export default async function SearchLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
