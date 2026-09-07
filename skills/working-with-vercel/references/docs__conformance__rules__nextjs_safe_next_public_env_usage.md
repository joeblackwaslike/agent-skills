---
title: NEXTJS_SAFE_NEXT_PUBLIC_ENV_USAGE
product: vercel
url: /docs/conformance/rules/NEXTJS_SAFE_NEXT_PUBLIC_ENV_USAGE
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_SAFE_NEXT_PUBLIC_ENV_USAGE"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Usage process.env.NEXT_PUBLIC_* environment variables must be allowlisted.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_safe_next_public_env_usage.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "7fd3a2a9ebea1749461e4e6f170124cd246f042a29578351bd6f0f2ed55643ad"
---

# NEXTJS_SAFE_NEXT_PUBLIC_ENV_USAGE

> **🔒 Permissions Required**: Conformance

> **💡 Note:** This rule is available from version 1.4.0.

The use of `process.env.NEXT_PUBLIC_*` environment variables may warrant a review from other developers to ensure there are no unintended leakage of environment variables.

When enabled, this rule requires that all usage of `NEXT_PUBLIC_*` must be included in the [allowlist](https://vercel.com/docs/conformance/allowlist).

## Examples

This rule will catch any pages or routes that are using `process.env.NEXT_PUBLIC_*` environment variables.

In the following example, we are using a local variable to initialize our analytics service. As the variable will be visible in the client, a review of the code is required, and the usage should be added to the [allowlist](https://vercel.com/docs/conformance/allowlist).

```tsx filename="app/dashboard/page.tsx" {1}
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID);

function HomePage() {
  return <h1>Hello World</h1>;
}

export default HomePage;
```

## How to fix

If you hit this issue, include the entry in the [Conformance allowlist file](https://vercel.com/docs/conformance/allowlist).


---

[View full sitemap](/docs/sitemap)
