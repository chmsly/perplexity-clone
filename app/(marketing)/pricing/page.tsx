import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-3xl font-bold sm:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl">
          Choose the plan that's right for you
        </p>
      </div>

      <div className="grid w-full max-w-4xl gap-8 pt-8 sm:grid-cols-2">
        <div className="flex flex-col gap-8 rounded-lg border p-8">
          <div>
            <h2 className="text-lg font-bold">Free</h2>
            <p className="text-muted-foreground">
              Basic features for casual users
            </p>
          </div>

          <div>
            <div className="text-4xl font-bold">$0</div>
            <p className="text-muted-foreground">Free forever</p>
          </div>

          <ul className="flex-1 space-y-4 text-left">
            <li>✓ 10 searches per day</li>
            <li>✓ Basic search capabilities</li>
            <li>✓ Standard response time</li>
          </ul>

          <Link href="/signup">
            <Button className="w-full" size="lg">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="relative flex flex-col gap-8 rounded-lg border p-8">
          <div className="bg-primary text-primary-foreground absolute -top-5 right-5 rounded-full px-3 py-1 text-sm">
            Popular
          </div>

          <div>
            <h2 className="text-lg font-bold">Pro</h2>
            <p className="text-muted-foreground">
              Advanced features for power users
            </p>
          </div>

          <div>
            <div className="text-4xl font-bold">$10</div>
            <p className="text-muted-foreground">per month</p>
          </div>

          <ul className="flex-1 space-y-4 text-left">
            <li>✓ Unlimited searches</li>
            <li>✓ Advanced search capabilities</li>
            <li>✓ Priority response time</li>
            <li>✓ Premium support</li>
          </ul>

          <Link href="/signup">
            <Button className="w-full" size="lg">
              Upgrade Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
