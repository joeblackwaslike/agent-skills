---
title: NEXTJS_NO_TURBO_CACHE
product: vercel
url: /docs/conformance/rules/NEXTJS_NO_TURBO_CACHE
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_NO_TURBO_CACHE"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Prevent Turborepo from caching the Next.js .next/cache folder to prevent an oversized cache.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_no_turbo_cache.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "c2fd068af9143e537424ecd54a4dbda80f69e3027a06a7da878c988983257f7c"
---

# NEXTJS_NO_TURBO_CACHE

> **Availability**: Conformance is available on Enterprise plans

This rule prevents the `.next/cache` folder from being added to the Turborepo cache.
This is important because including the `.next/cache` folder in the Turborepo cache can cause
the cache to grow to an excessive size. Vercel also already includes this cache in the build
container cache.

## Examples

The following `turbo.json` config will be caught by this rule for Next.js apps:

```json filename="turbo.json" {5}
{
  "extends": ["//"],
  "pipeline": {
    "build": {
      "outputs": [".next/**"]
    }
  }
}
```

## How to fix

To fix, add `"!.next/cache/**"` to the list of outputs for the task.

```json filename="turbo.json" {5}
{
  "extends": ["//"],
  "pipeline": {
    "build": {
      "outputs": [".next/**", "!.next/cache/**"]
    }
  }
}
```


---

[View full sitemap](/docs/sitemap)
