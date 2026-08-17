---
title: Stripe Integration
product: vercel
url: /docs/integrations/ecommerce/stripe
canonical_url: "https://vercel.com/docs/integrations/ecommerce/stripe"
last_updated: 2026-03-02
type: tutorial
prerequisites:
  - /docs/integrations/ecommerce
  - /docs/integrations
related:
  []
summary: Connect your Stripe account to Vercel and accept payments in your applications.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/ecommerce/stripe.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "c255251f7b6c80066c428b4d5d041817ba713bebb24b4c7c315b6308dd39f143"
---

# Stripe Integration

Connect your [Stripe](https://docs.stripe.com/) account to Vercel to accept payments and manage subscriptions in your app. The integration provisions your API keys as environment variables and supports Stripe sandbox and live modes. Test payment flows in Stripe sandbox, then deploy to production without manual key management.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to deploy a Next.js online store with Stripe](https://vercel.com/kb/guide/how-to-deploy-a-next-js-online-store-with-stripe?from=related) — Learn how to build and deploy a Next.js e-commerce store with Stripe payments on Vercel. This step-by-step guide covers
- [Getting started with Next.js, TypeScript, and Stripe Checkout](https://vercel.com/kb/guide/getting-started-with-nextjs-typescript-stripe?from=related) — Add payments functionality to your Next.js applications with Stripe and deploy to Vercel.
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Create and Deploy a Crystallize E-commerce Site with Vercel](https://vercel.com/kb/guide/deploying-crystallize-with-vercel?from=related) — How to launch an e-commerce site using Next.js and Crystallize on Vercel in minutes.
- [Build commission-free iOS checkouts with Vercel and Paddle](https://vercel.com/kb/guide/build-commission-free-ios-checkouts-with-vercel-and-paddle?from=related) — A new ruling allows iOS apps to use external checkouts. Learn how to deploy a secure, high-performance external checkout
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration?from=related) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [Marketplace Vercel API](https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel?from=related) — Learn about marketplace vercel api on Vercel.
- [Add a Native Integration](https://vercel.com/docs/integrations/install-an-integration/product-integration?from=related) — Learn how you can add a product to your Vercel project through a native integration.
- [Marketplace](https://vercel.com/docs/marketplace-storage?from=related) — Connect Postgres, Redis, NoSQL, and other storage solutions through the Vercel Marketplace. Run SQL queries, edit data,
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.

Full cross-link map for this page: [/docs/integrations/ecommerce/stripe.graph.md](/docs/integrations/ecommerce/stripe.graph.md)
<!-- /docsgraph:related -->

## How it works

This marketplace integration connects your Vercel project to Stripe. When you install it, Vercel:

- Creates a Stripe sandbox or connects your existing Stripe account
- Provisions your Stripe API keys as environment variables
- Updates environment variables when you connect a live account

You don't need to copy API keys by hand or manage variables across environments, which reduces the risk of exposing credentials.

## Use cases

Use this integration when you need to:

- Accept one-time payments for products and services
- Manage recurring billing for SaaS applications
- Process payments between buyers and sellers on a marketplace
- Sell downloadable content, courses, or media

## Get started

Start in Stripe sandbox mode, build and test your payment flows, then connect your live Stripe account when you're ready.

### Set up in Stripe sandbox mode

- ### Create the integration
  Go to the [Stripe integration page](https://vercel.com/marketplace/stripe) in the Vercel Marketplace and create the integration in Stripe sandbox mode.
  1. Click **Install** or click the drop-down and select **Install New Stripe Sandbox**
  2. Click **Continue** on Sandbox installation plan
  3. Update the **Resource name** if needed and click **Create**

- ### Connect your project to the integration
  Vercel provisions a Stripe sandbox and takes you to the integration settings page, where you can see the Stripe sandbox account API keys as environment variables.

  Click **Projects**, then **Connect Project** to connect your project to the integration.

- ### Build your store
  Go back to the **Getting Started** link and follow the instructions with code snippets to build your store with Next.js.

  You can also deploy the [Next.js + Stripe starter template](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnextjs-stripe-template\&project-name=nextjs-stripe-template\&repository-name=nextjs-stripe-template\&demo-title=Stripe+%26+Next.js+Starter+Template\&demo-description=A+template+for+building+full-stack+Stripe+applications+using+Next.js+and+Vercel\&demo-url=https%3A%2F%2Fnextjs-stripe-template.vercel.sh%2F\&demo-image=https%3A%2F%2Fimages.stripeassets.com%2Ffzn2n1nzq965%2F4vVgZi0ZMoEzOhkcv7EVwK%2F74a13565998b4c56003c5ddc5aae43ce%2Ffavicon.png%3Fw%3D180%26h%3D180\&products=%5B%7B%22integrationSlug%22%3A%22stripe%22%2C%22productSlug%22%3A%22stripe%22%2C%22protocol%22%3A%22other%22%2C%22type%22%3A%22integration%22%7D%5D), which creates the integration and connects it to your project automatically.

  Use [test card numbers](https://stripe.com/docs/testing) to simulate successful and failed payments and verify your integration works end to end.

### Go live

Once your store works in Stripe sandbox mode, connect your live Stripe account:

- ### Connect your Stripe account
  1. Go to the [Stripe installation page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fintegrations%2Fstripe\&title=Go+to+Stripe+Installation+Page).
  2. Click the **Install** drop-down and select **Import Existing Stripe Account**.
  3. Click **Continue to Stripe** and follow the steps to connect your existing Stripe account.
  4. Click **Done** to proceed to the newly linked Stripe account page. From there, you can connect projects and manage environment variables.

- ### Live keys
  The imported Stripe account's keys are already configured in Vercel. You can rotate them if needed on the **Settings** page of your Stripe resource in the Vercel Marketplace.

- ### Redeploy your app
  Redeploy your application so it picks up the new live keys. Your project can now accept real payments.

## Security

When using the Stripe integration:

### Use keys correctly

Stripe provides two types of API keys:

- **Secret keys** (`STRIPE_SECRET_KEY`): Never expose these in client-side code or commit them to version control. Use them only in server-side code (for example, API routes or Server Actions).
- **Publishable keys** (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`): Safe in client-side code. They identify your account but cannot perform sensitive operations.

### Server-side operations

Create checkout sessions, payment intents, handle webhooks, and process refunds on the server. In client-side code, only:

- Initialize Stripe Elements for collecting payment information
- Submit payment details to your server
- Display payment status to users

## Next steps

After connecting Stripe to your project, try these resources:

- [Stripe documentation](https://stripe.com/docs): Official Stripe API reference


---

[View full sitemap](/docs/sitemap)
