import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  return (
    <div className="flex h-[calc(100vh-56px)] flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Simple, transparent pricing</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Get started for free, upgrade when you need to
        </p>
      </div>

      <div className="grid w-full max-w-4xl gap-8 p-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-lg border p-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Free</h2>
            <p className="text-muted-foreground">
              Perfect for trying out the platform
            </p>
          </div>
          <div>
            <span className="text-4xl font-bold">$0</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <ul className="flex flex-col gap-2">
            <li>5 searches per day</li>
            <li>Basic search capabilities</li>
            <li>Standard response time</li>
          </ul>
          <Link className="mt-auto" href="/signup">
            <Button className="w-full" variant="outline">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="relative flex flex-col gap-4 rounded-lg border border-blue-600 p-6">
          <div className="absolute -top-3 right-4 rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
            Popular
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Pro</h2>
            <p className="text-muted-foreground">
              Perfect for power users and professionals
            </p>
          </div>
          <div>
            <span className="text-4xl font-bold">$10</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <ul className="flex flex-col gap-2">
            <li>Unlimited searches</li>
            <li>Advanced search capabilities</li>
            <li>Faster response time</li>
            <li>Priority support</li>
          </ul>
          <Link className="mt-auto" href="/signup">
            <Button className="w-full">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
