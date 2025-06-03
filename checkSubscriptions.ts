import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();

async function checkSubscriptions() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });

  let hasMore = true;
  let startingAfter: string | undefined = undefined;

  while (hasMore) {
    // Tipagem explícita do retorno
    const subscriptions: Stripe.ApiList<Stripe.Subscription> =
      await stripe.subscriptions.list({
        limit: 100,
        starting_after: startingAfter,
      });

    for (const sub of subscriptions.data) {
      const userId = sub.metadata?.userId;
      if (!userId) {
        console.warn(
          `Assinatura sem userId metadata: ${sub.id} - status: ${sub.status}`,
        );
      } else {
        console.log(`Assinatura ${sub.id} com userId: ${userId}`);
      }
    }

    hasMore = subscriptions.has_more;
    if (hasMore) {
      startingAfter = subscriptions.data[subscriptions.data.length - 1].id;
    }
  }

  console.log("Verificação finalizada.");
}

checkSubscriptions().catch(console.error);
