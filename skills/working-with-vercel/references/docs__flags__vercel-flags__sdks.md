---
title: SDKs
product: vercel
url: /docs/flags/vercel-flags/sdks
canonical_url: "https://vercel.com/docs/flags/vercel-flags/sdks"
last_updated: 2026-06-24
type: conceptual
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  - /docs/flags/vercel-flags/sdks/flags-sdk
  - /docs/flags/vercel-flags/sdks/openfeature
  - /docs/flags/vercel-flags/sdks/core
  - /docs/flags/vercel-flags/dashboard/sdk-keys
summary: Learn how to integrate Vercel Flags into your application using the Flags SDK, OpenFeature, or the core library.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/sdks.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "c64fa964cd98169d52ce8640fbc62113ab3a3409706d08528958fe8aa199066d"
---

# SDKs

There are multiple ways to use Vercel Flags, depending on your framework and how much control you need.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use Vercel Flags across projects](https://vercel.com/kb/guide/how-to-use-vercel-flags-across-projects?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fsdks&source_site=vercel-docs&relationship=related) — Evaluate flags across projects using a source project SDK Key in the consumer project via a custom adapter
- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fsdks&source_site=vercel-docs&relationship=related) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [Vercel Flags](https://flags-sdk.dev/docs/providers/vercel?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fsdks&source_site=vercel-docs&relationship=related)
- [Quickstart](https://flags-sdk.dev/docs/frameworks/next?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fsdks&source_site=vercel-docs&relationship=related) — Learn how to start using the Flags SDK in your Next.js project.
- [Quickstart](https://flags-sdk.dev/docs/frameworks/sveltekit?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fsdks&source_site=vercel-docs&relationship=related) — Using the Flags SDK in SvelteKit
- [Flags SDK Reference](https://vercel.com/docs/flags/flags-sdk-reference?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fsdks&source_site=vercel-docs&relationship=related) — API reference for the Flags SDK for Next.js and SvelteKit.
- [Getting started with Flags Explorer](https://vercel.com/docs/flags/flags-explorer/getting-started?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fsdks&source_site=vercel-docs&relationship=related) — Learn how to set up the Flags Explorer so you can see and override your application's feature flags
- [Segments](https://vercel.com/docs/flags/vercel-flags/dashboard/segments?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fsdks&source_site=vercel-docs&relationship=related) — Create reusable user segments for targeting feature flags.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fsdks&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/flags/vercel-flags/sdks.graph.md](/docs/flags/vercel-flags/sdks.graph.md?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fsdks&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Integration options

**Flags SDK** [→](/docs/flags/vercel-flags/sdks/flags-sdk)

The recommended approach for Next.js and SvelteKit applications. Framework-native with full TypeScript support and automatic Flags Explorer integration.

**OpenFeature** [→](/docs/flags/vercel-flags/sdks/openfeature)

Use the vendor-neutral OpenFeature standard with Vercel Flags as the provider. Ideal if you want portability across flag providers.

**Core Library** [→](/docs/flags/vercel-flags/sdks/core)

Direct access to the evaluation engine for custom setups, non-framework environments, or when you need full control.

## Comparison

| Feature                   | Flags SDK          | OpenFeature          | Core Library  |
| ------------------------- | ------------------ | -------------------- | ------------- |
| Framework support         | Next.js, SvelteKit | Any                  | Any           |
| TypeScript                | Full inference     | Standard types       | Full types    |
| Flags Explorer            | Automatic          | Manual setup         | Manual setup  |
| Precompute (static pages) | Yes                | No                   | No            |
| Best for                  | Most applications  | Provider portability | Custom setups |

## Which should you use?

**Use the Flags SDK** if you're building with Next.js or SvelteKit. It provides the best developer experience with automatic integration for Flags Explorer, precompute for static pages, and framework-specific optimizations.

**Use OpenFeature** if you need a vendor-neutral API that allows switching between flag providers without code changes, or if you're already using OpenFeature in your stack.

**Use the Core Library** if you're working outside of supported frameworks, building custom tooling, or need direct access to the evaluation engine.

## How the SDKs relate to each other

The Flags SDK and OpenFeature are both provider-agnostic. They don't evaluate flags themselves, but instead delegate to a provider. The `@vercel/flags-core` library is that provider for Vercel Flags.

The difference between the Flags SDK and OpenFeature is scope. The Flags SDK is designed for specific frameworks like Next.js and SvelteKit, so it can offer deeper integrations like Flags Explorer and precomputation. OpenFeature is a broader standard that works across languages and frameworks, but leaves those framework-specific capabilities to you.

Both have adapters that connect them to `@vercel/flags-core`: `@flags-sdk/vercel` for the Flags SDK, and `@vercel/flags-core/openfeature` for OpenFeature.

## Authentication and environment variables

All integration methods authenticate with Vercel OpenID Connect (OIDC) by default. Vercel deployments receive the OIDC token automatically. For local development, run `vercel link` and `vercel env pull` so the SDK can authenticate with the linked project.

For manual credentials, such as reading flags from another project or running outside Vercel, create an [SDK Key](/docs/flags/vercel-flags/dashboard/sdk-keys) and store it in an environment variable such as `FLAGS`.

Set the separate `FLAGS_SECRET` environment variable when you use Flags Explorer for secure overrides.

## Next steps

- [Get started with the Flags SDK](/docs/flags/vercel-flags/sdks/flags-sdk)
- [Learn about OpenFeature integration](/docs/flags/vercel-flags/sdks/openfeature)
- [Use the core library directly](/docs/flags/vercel-flags/sdks/core)


---

[View full sitemap](/docs/sitemap)
