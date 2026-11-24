---
title: Vercel Commerce and Payments Integrations
product: vercel
url: /docs/integrations/ecommerce
canonical_url: "https://vercel.com/docs/integrations/ecommerce"
last_updated: 2026-03-02
type: conceptual
prerequisites:
  - /docs/integrations
related:
  - /docs/integrations/ecommerce/stripe
summary: Learn how to integrate Vercel with payment processors and ecommerce platforms, including Stripe, Shopify, BigCommerce, and more.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/integrations/ecommerce.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "2fa510a9bceec313281d1dad087824e07d33c32715d5134032403c5ef43cd213"
---

# Vercel Commerce and Payments Integrations

Add commerce and payments to your Vercel projects. Use the Stripe native integration for payment processing, or connect a third-party ecommerce platform from the [Vercel Marketplace](/marketplace/category/commerce).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building Ecommerce Sites with Next.js and Shopify](https://vercel.com/kb/guide/building-ecommerce-sites-with-next-js-and-shopify) — Learn how to integrate Next.js and Shopify together for the fastest storefronts using the Storefront GraphQL API.
- [Stripe is now generally available on the Marketplace and v0](https://vercel.com/changelog/stripe-is-now-generally-available-on-the-marketplace-and-v0)
- [From idea to secure checkout in minutes with Stripe](https://vercel.com/blog/from-idea-to-secure-checkout-in-minutes-with-stripe)
- [Stripe is now available in beta on the Vercel Marketplace](https://vercel.com/changelog/stripe-is-now-available-in-beta-on-the-vercel-marketplace)
- [How to deploy a Next.js online store with Stripe](https://vercel.com/kb/guide/how-to-deploy-a-next-js-online-store-with-stripe) — Learn how to build and deploy a Next.js e-commerce store with Stripe payments on Vercel. This step-by-step guide covers
- [Supercharge your Vercel Projects with Integrations](https://vercel.com/blog/integrations-marketplace)
- [Vercel is now available in Stripe Projects](https://vercel.com/changelog/vercel-is-now-available-in-stripe-projects)
- [Marketplace Vercel API Reference](https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel) — Learn how to call Vercel API endpoints to interact with Vercel resources
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [Vercel CMS Integrations](https://vercel.com/docs/integrations/cms) — Learn how to integrate Vercel with CMS platforms, including Contentful, Sanity, and Sitecore XM Cloud.
- [Integrations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations) — Vercel MCP tools for integrations.
- [Add a Native Integration](https://vercel.com/docs/integrations/install-an-integration/product-integration) — Learn how you can add a product to your Vercel project through a native integration.

Full cross-link map for this page: [/docs/integrations/ecommerce.graph.md](/docs/integrations/ecommerce.graph.md)
<!-- /docsgraph:related -->

## Stripe

- [**Stripe**](/docs/integrations/ecommerce/stripe): Accept payments and manage subscriptions with Vercel-provisioned API keys

## Ecommerce platforms

These third-party integrations are available through the [Vercel Marketplace](/marketplace/category/commerce):

- [**BigCommerce**](https://vercel.com/templates/next.js/nextjs-commerce): Develop and deploy headless ecommerce sites
- [**Saleor**](https://vercel.com/templates/next.js/nextjs-saleor-commerce): A fast, open, and standards-based commerce API
- [**Salesforce Commerce Cloud**](https://vercel.com/templates/next.js/next-js-salesforce-commerce-cloud): A customer-centric commerce platform
- [**Shopify**](https://vercel.com/kb/guide/deploy-headless-shopify-storefront-with-vercel): Headless, composable storefronts
- [**Sitecore OrderCloud**](https://vercel.com/marketplace/ordercloud): API-first B2X commerce
- [**Swell**](https://vercel.com/marketplace/swell): Future-proof headless commerce
- [**Wix**](https://vercel.com/marketplace/wix): Integrate with robust business solutions

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
