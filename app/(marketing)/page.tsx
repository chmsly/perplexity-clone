import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-3xl font-bold sm:text-5xl">
          Your AI Research Assistant
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl">
          Experience lightning-fast answers and insights, powered by advanced AI
          technology.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link href="/search">
          <Button size="lg">Try for Free</Button>
        </Link>
        <Link href="/pricing">
          <Button variant="outline" size="lg">
            View Pricing
          </Button>
        </Link>
      </div>
    </div>
  )
}
