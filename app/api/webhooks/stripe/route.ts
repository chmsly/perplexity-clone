import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { db } from "@/db/db"
import { profilesTable } from "@/db/schema"
import { eq } from "drizzle-orm"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16"
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    return new NextResponse("Webhook error", { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 })
    }

    await db
      .update(profilesTable)
      .set({
        membership: "pro"
      })
      .where(eq(profilesTable.userId, session.metadata.userId))
  }

  if (event.type === "customer.subscription.deleted") {
    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 })
    }

    await db
      .update(profilesTable)
      .set({
        membership: "free"
      })
      .where(eq(profilesTable.userId, session.metadata.userId))
  }

  return new NextResponse(null, { status: 200 })
}
