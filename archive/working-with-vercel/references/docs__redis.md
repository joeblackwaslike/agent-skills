---
title: Redis on Vercel
product: vercel
url: /docs/redis
canonical_url: "https://vercel.com/docs/redis"
last_updated: 2026-01-13
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/install-an-integration/product-integration
  - /docs/environment-variables
summary: Learn how to use Redis stores through the Vercel Marketplace.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/redis.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "3414873c09c741f9cc040deb09965fbdcc782feede56fa3840e4eff3bcdb7969"
---

# Redis on Vercel

Vercel lets you connect external Redis databases through the [Marketplace](/marketplace), allowing you to integrate high-performance caching and real-time data storage into your Vercel projects without managing Redis servers.

> **💡 Note:** Vercel KV is no longer available. If you had an existing Vercel KV store, we automatically moved it to [Upstash Redis](https://vercel.com/marketplace/upstash) in December 2024. For new projects, install a [Redis integration from the Marketplace](/marketplace?category=storage\&search=redis).

- Explore [Marketplace storage redis integrations](/marketplace?category=storage\&search=redis).
- Learn how to [add a Marketplace native integration](/docs/integrations/install-an-integration/product-integration).

## Connecting to the Marketplace

Vercel enables you to use Redis by integrating with external database providers. By using the Marketplace, you can:

- Select a [Redis provider](/marketplace?category=storage\&search=redis)
- Provision and configure a Redis database with minimal setup.
- Have credentials and [environment variables](/docs/environment-variables) injected into your Vercel project.

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
