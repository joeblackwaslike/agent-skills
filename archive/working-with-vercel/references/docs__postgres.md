---
title: Postgres on Vercel
product: vercel
url: /docs/postgres
canonical_url: "https://vercel.com/docs/postgres"
last_updated: 2026-01-13
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/install-an-integration/product-integration
  - /docs/environment-variables
summary: Learn how to use Postgres databases through the Vercel Marketplace.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/postgres.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "7667d7c06c700858cd24af5b53e4ad24224ee0efabc2d4276c87ae27b0e6a2e9"
---

# Postgres on Vercel

Vercel lets you connect external Postgres databases through the [Marketplace](/marketplace), allowing you to connect external Postgres databases to your Vercel projects without managing database servers.

> **💡 Note:** Vercel Postgres is no longer available. If you had an existing Vercel Postgres database, we automatically moved it to [Neon](https://vercel.com/marketplace/neon) in December 2024. For new projects, install a [Postgres integration from the Marketplace](/marketplace?category=storage\&search=postgres).

- Explore [Marketplace storage postgres integrations](/marketplace?category=storage\&search=postgres).
- Learn how to [add a Marketplace native integration](/docs/integrations/install-an-integration/product-integration).

## Connecting to the Marketplace

Vercel enables you to use Postgres by integrating with external database providers. By using the Marketplace, you can:

- Select from a [range of Postgres providers](/marketplace?category=storage\&search=postgres), including Neon, Prisma Postgres, Supabase, and AWS Aurora Postgres.
- Provision and configure a Postgres database with minimal setup.
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
