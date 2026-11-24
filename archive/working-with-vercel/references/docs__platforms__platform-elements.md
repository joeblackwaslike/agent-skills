---
title: Platform Elements
product: vercel
url: /docs/platforms/platform-elements
canonical_url: "https://vercel.com/docs/platforms/platform-elements"
last_updated: 2026-06-26
type: reference
prerequisites:
  - /docs/platforms
related:
  - /docs/platforms/platform-elements/actions
  - /docs/platforms/platform-elements/blocks
summary: Prebuilt server actions and UI blocks you can install to speed up common platform tasks.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/platforms/platform-elements.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "7dfcc82e0192c7615ddccd13b1ec055d52cc598a2a284e3a92ea724cff67fefb"
---

# Platform Elements

Platform Elements are prebuilt building blocks for platforms. Actions are server-side functions for tasks like adding a domain, and Blocks are UI components such as a claim-deployment flow. Install them into your app to avoid building these flows from scratch.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Platform Elements](https://vercel.com/changelog/introducing-platform-elements)
- [Introducing Vercel for Platforms](https://vercel.com/changelog/introducing-vercel-for-platforms)
- [Platform Template](https://vercel.com/docs/platforms/examples/platform-template) — Build an AI app builder on Vercel with sandboxes, AI Gateway, deployments, and project transfers.
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.
- [Vercel fundamental concepts](https://vercel.com/docs/fundamentals) — Learn about the core concepts of Vercel
- [Features](https://vercel.com/docs/build-output-api/features) — Learn how to implement common Vercel platform features through the Build Output API.
- [Multi-Tenant Platforms](https://vercel.com/docs/platforms/multi-tenant-platforms) — Serve multiple customers from a single codebase and deployment, routing each tenant by subdomain or custom domain.

Full cross-link map for this page: [/docs/platforms/platform-elements.graph.md](/docs/platforms/platform-elements.graph.md)
<!-- /docsgraph:related -->

**Actions**: Server actions for programmatic tasks like adding domains and deploying files. [Learn more →](/docs/platforms/platform-elements/actions)

**Blocks**: UI components for claiming deployments, managing domains, and reporting abuse. [Learn more →](/docs/platforms/platform-elements/blocks)

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
