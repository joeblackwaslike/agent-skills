---
title: Examples
product: vercel
url: /docs/platforms/examples
canonical_url: "https://vercel.com/docs/platforms/examples"
last_updated: 2026-07-07
type: tutorial
prerequisites:
  - /docs/platforms
related:
  - /docs/platforms/examples/multi-tenant-template
  - /docs/platforms/examples/oss-coding-agent
  - /docs/platforms/examples/platform-template
summary: Clone working multi-tenant and multi-project starters to begin your platform build.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/platforms/examples.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "3501a87e5c50b768e83db89eee266339e2800a91708eda596f9d0b739506eb6b"
---

# Examples

Start from a working example instead of a blank project. Each template covers a common platform pattern end to end.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Multi-Project Platforms Concepts](https://vercel.com/docs/platforms/multi-project-platforms/concepts) — Understand projects, deployments, domains, and architecture for multi-project platforms on Vercel.
- [Multi-Tenant Platforms](https://vercel.com/docs/platforms/multi-tenant-platforms) — Serve multiple customers from a single codebase and deployment, routing each tenant by subdomain or custom domain.
- [Multi-Project Platforms](https://vercel.com/docs/platforms/multi-project-platforms) — Give each customer its own Vercel project and deployment, created and managed programmatically with the Vercel SDK.
- [Multi-Project Platforms Quickstart](https://vercel.com/docs/platforms/multi-project-platforms/quickstart) — Programmatically host code for user-generated or AI-generated applications on Vercel.
- [Multi-Tenant Platform Quickstart](https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart) — Build a multi-tenant Next.js app on your computer, then add wildcard and custom domains on Vercel.

Full cross-link map for this page: [/docs/platforms/examples.graph.md](/docs/platforms/examples.graph.md)
<!-- /docsgraph:related -->

**Multi-tenant template**: A multi-tenant Next.js app with subdomain routing and tenant storage. [Learn more →](/docs/platforms/examples/multi-tenant-template)

**OSS coding agent**: An open-source AI coding platform built on multi-project deployments. [Learn more →](/docs/platforms/examples/oss-coding-agent)

**Platform template**: A claimable platform template for deploying apps on behalf of users. [Learn more →](/docs/platforms/examples/platform-template)

## Live demos

Try a deployed example in the browser before you clone anything.

**Multi-tenant preview URLs**: Tenant subdomains served by one deployment, each with its own preview URL prefix. [Learn more →](https://multi-tenant-preview-urls-k6oodlv4w.vercel.rocks/all)

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
