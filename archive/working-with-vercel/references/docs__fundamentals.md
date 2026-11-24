---
title: Vercel fundamental concepts
product: vercel
url: /docs/fundamentals
canonical_url: "https://vercel.com/docs/fundamentals"
last_updated: 2026-06-17
type: conceptual
prerequisites:
  []
related:
  - /docs/fundamentals/infrastructure
  - /docs/fundamentals/builds
  - /docs/fundamentals/what-is-compute
summary: Learn about the core concepts of Vercel
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/fundamentals.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "384cad8b3e115acff03a607fa1337e2e8505c04d35c014bac8cbc393554700af"
---

# Vercel fundamental concepts

The articles below explain core concepts that shape how Vercel works:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect Concepts](https://vercel.com/docs/connect/concepts) — Understand the core building blocks of Vercel Connect: connectors, installations, tokens, project links, triggers, and a
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.
- [How Vercel CDN Works](https://vercel.com/docs/how-vercel-cdn-works) — Learn how Vercel's CDN processes requests through routing, caching, and compute layers to deliver your content with low
- [Vercel KMS Concepts](https://vercel.com/docs/kms/concepts) — Understand how Vercel KMS rotates signing keys and how it authorizes signing, management, and verification.
- [Vercel security overview](https://vercel.com/docs/security) — Vercel provides built-in and customizable features to ensure that your site is secure.

Full cross-link map for this page: [/docs/fundamentals.graph.md](/docs/fundamentals.graph.md)
<!-- /docsgraph:related -->

**Request Lifecycle**: Learn how requests flow through Vercel's global network, from user to response. Covers global load balancing, security layers, caching, and compute. [Learn more →](/docs/fundamentals/infrastructure)

**Build System**: Learn how Vercel transforms your source code into optimized assets. Covers framework detection, build environments, and caching. [Learn more →](/docs/fundamentals/builds)

**What is Compute?**: Understand how Vercel manages building, rendering, and on-demand tasks. Covers servers, serverless, and Fluid compute. [Learn more →](/docs/fundamentals/what-is-compute)

## Plan your application

Explore [reference architectures](/kb/architecture) to choose a stack and work through application design decisions. Each stack brings together documentation, guides, templates, and courses for building on Vercel.

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
