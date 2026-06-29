---
title: SDKs
product: vercel
url: /docs/flags/vercel-flags/sdks
canonical_url: "https://vercel.com/docs/flags/vercel-flags/sdks"
last_updated: 2026-06-08
type: conceptual
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  - /docs/flags/vercel-flags/dashboard/sdk-keys
  - /docs/flags/vercel-flags/sdks/flags-sdk
  - /docs/flags/vercel-flags/sdks/openfeature
  - /docs/flags/vercel-flags/sdks/core
summary: Learn how to integrate Vercel Flags into your application using the Flags SDK, OpenFeature, or the core library.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/sdks.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "85d410ae3f7d03072cb75db9b5ccbab49b5f31b2cae6672e39988c726b2368ec"
---

# SDKs

There are multiple ways to use Vercel Flags, depending on your framework and how much control you need.

## Integration options

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
