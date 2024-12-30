import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MarketingPage() {
  return (
    <div className="flex h-[calc(100vh-56px)] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold">
        Get instant answers with AI-powered search
      </h1>
      <p className="text-muted-foreground max-w-2xl text-lg">
        Experience a new way to search the web. Our AI-powered search engine
        provides concise, accurate answers while citing sources in real-time.
      </p>
      <div className="flex gap-4">
        <Link href="/signup">
          <Button size="lg">Get Started</Button>
        </Link>
        <Link href="/pricing">
          <Button size="lg" variant="outline">
            View Pricing
          </Button>
        </Link>
      </div>
    </div>
  )
}
