import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const features = [
  "Lightning-fast answers",
  "Detailed explanations",
  "Real-time web search",
  "Comprehensive sources",
  "Chat history",
  "Mobile friendly"
]

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-8 text-center md:py-16">
      <div className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-3xl font-bold sm:text-5xl">
          Your AI Research Assistant
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl">
          Experience lightning-fast answers and insights, powered by advanced AI
          technology.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {features.map(feature => (
          <div
            key={feature}
            className="text-muted-foreground flex items-center gap-2 text-sm sm:text-base"
          >
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link href="/search">
          <Button size="lg">
            Try for Free
            <ArrowRight className="ml-2 size-4" />
          </Button>
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
