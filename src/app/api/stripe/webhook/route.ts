import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Stripe secret key not found");
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    throw new Error("Stripe signature not found");
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid":
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice & {
        subscription?: string;
      };

      let subscriptionId = invoice.subscription as string | null;
      const customerId = invoice.customer as string;

      let userId: string | undefined;

      if (!subscriptionId && invoice.lines?.data?.length) {
        subscriptionId =
          invoice.lines.data[0]?.parent?.subscription_item_details
            ?.subscription || null;
      }
      if (subscriptionId) {
        try {
          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId);
          userId = subscription.metadata?.userId;

          if (!userId && subscription.items?.data?.length) {
            userId = subscription.items.data[0]?.metadata?.userId;
          }
        } catch (err) {
          console.warn("⚠️ Erro ao buscar subscription:", err);
        }
      }
      if (!userId && invoice.lines?.data?.length) {
        userId = invoice.lines.data[0]?.metadata?.userId;
      }
      if (!userId || !customerId || !subscriptionId) {
        console.warn("❌ Dados faltando: userId, customerId ou subscriptionId");
        break;
      }
      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: subscriptionId,
          stripeCustomerId: customerId,
          plan: "essential",
        })
        .where(eq(usersTable.id, userId));
      break;
    }
    case "customer.subscription.deleted": {
      if (!event.data.object.id) {
        throw new Error("Subscription ID not found");
      }
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );
      if (!subscription) {
        throw new Error("Subscription not found");
      }
      const userId = subscription.metadata.userId;
      if (!userId) {
        throw new Error("User ID not found");
      }
      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: null,
          stripeCustomerId: null,
          plan: null,
        })
        .where(eq(usersTable.id, userId));
    }
  }
  return NextResponse.json({
    received: true,
  });
};
