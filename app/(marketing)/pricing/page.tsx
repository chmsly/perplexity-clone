"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

const features = [
  "Unlimited searches",
  "Detailed explanations",
  "Real-time web search",
  "Comprehensive sources",
  "Chat history",
  "Mobile friendly"
]

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-3xl font-bold sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl">
          Get started for free, upgrade when you need to.
        </p>
      </div>

      <div className="grid w-full max-w-4xl gap-8 sm:grid-cols-2">
        <Card className="flex flex-col p-6">
          <h2 className="text-xl font-bold">Free</h2>
          <div className="mt-2">
            <span className="text-3xl font-bold">$0</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <p className="text-muted-foreground mt-2">
            Perfect for trying out the service.
          </p>
          <div className="mt-6 flex flex-1 flex-col gap-4">
            <div className="space-y-2">
              {features.slice(0, 2).map(feature => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary size-4 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link href="/search" className="mt-auto">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </Card>

        <Card className="relative flex flex-col overflow-hidden p-6">
          <div className="bg-primary absolute right-0 top-0 rounded-bl-lg px-3 py-1 text-sm text-white">
            Popular
          </div>
          <h2 className="text-xl font-bold">Pro</h2>
          <div className="mt-2">
            <span className="text-3xl font-bold">$10</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <p className="text-muted-foreground mt-2">
            Perfect for power users who need more.
          </p>
          <div className="mt-6 flex flex-1 flex-col gap-4">
            <div className="space-y-2">
              {features.map(feature => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary size-4 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link
              href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY || ""}
              className="mt-auto"
            >
              <Button className="w-full">Upgrade Now</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
