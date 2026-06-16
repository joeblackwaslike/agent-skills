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
source: "https://vercel.com/docs/redis.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "2083cd37240e480e17cf311999b1a6d895cd2e17ae07e9f757c14f51a22afd7e"
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


---

[View full sitemap](/docs/sitemap)
