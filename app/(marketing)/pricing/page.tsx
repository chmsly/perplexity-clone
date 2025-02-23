import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Simple, transparent pricing</h1>
        <p className="text-muted-foreground mt-2">
          Get started for free, upgrade when you need to
        </p>
      </div>

      <div className="grid w-full max-w-4xl gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-between rounded-lg border p-8">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Free</h2>
            <p className="text-muted-foreground">
              Perfect for trying out the service
            </p>
            <div className="text-3xl font-bold">$0</div>
          </div>
          <ul className="my-8 space-y-2">
            <li>✓ 5 searches per day</li>
            <li>✓ Basic search capabilities</li>
            <li>✓ Standard support</li>
          </ul>
          <Link href="/search" className="w-full">
            <Button className="w-full" size="lg">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="relative flex flex-col justify-between rounded-lg border border-blue-500 p-8">
          <div className="absolute -top-3 right-4 rounded-full bg-blue-500 px-3 py-1 text-sm text-white">
            Popular
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Pro</h2>
            <p className="text-muted-foreground">
              For power users who need more
            </p>
            <div className="text-3xl font-bold">$10</div>
            <div className="text-muted-foreground text-sm">per month</div>
          </div>
          <ul className="my-8 space-y-2">
            <li>✓ Unlimited searches</li>
            <li>✓ Advanced search capabilities</li>
            <li>✓ Priority support</li>
            <li>✓ Early access to new features</li>
          </ul>
          <Link
            href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY || "#"}
            className="w-full"
          >
            <Button className="w-full" size="lg">
              Upgrade Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
