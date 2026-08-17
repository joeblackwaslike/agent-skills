---
title: Setting up Flags Explorer
product: vercel
url: /docs/flags/vercel-flags/cli/set-up-flags-explorer
canonical_url: "https://vercel.com/docs/flags/vercel-flags/cli/set-up-flags-explorer"
last_updated: 2026-02-24
type: how-to
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  - /docs/flags/flags-explorer
  - /docs/vercel-toolbar
  - /docs/flags/flags-explorer/getting-started
summary: Add the Flags Explorer to the Vercel Toolbar so you can override flag values on preview deployments without affecting other users.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/cli/set-up-flags-explorer.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d269e3b3ed5a33f385b770a026adddb97e4f71a7636a71a315e3387a8489e778"
---

# Setting up Flags Explorer

The [Flags Explorer](/docs/flags/flags-explorer) adds a panel to the [Vercel Toolbar](/docs/vercel-toolbar) that lets you override flag values on preview deployments. Make sure you've [set up the toolbar](/docs/vercel-toolbar) first. This is a one-time setup per project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments?from=related) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [Flags SDK](https://vercel.com/docs/flags/vercel-flags/sdks/flags-sdk?from=related) — Integrate Vercel Flags into your Next.js or SvelteKit application using the Flags SDK.
- [Getting Started](https://vercel.com/docs/flags/vercel-flags/quickstart?from=related) — Create your first feature flag and evaluate it in your application using the Flags SDK, OpenFeature, or the core library
- [Dashboard](https://vercel.com/docs/flags/vercel-flags/dashboard?from=related) — Learn how to manage your feature flags using the Vercel Dashboard.
- [Flags SDK](https://vercel.com/docs/flags/flags-sdk-reference?from=related) — API reference for the Flags SDK for Next.js and SvelteKit.
- [Feature Flag](https://vercel.com/docs/flags/vercel-flags/dashboard/feature-flag?from=related) — Learn how to configure individual feature flags in the Vercel Dashboard.

Full cross-link map for this page: [/docs/flags/vercel-flags/cli/set-up-flags-explorer.graph.md](/docs/flags/vercel-flags/cli/set-up-flags-explorer.graph.md)
<!-- /docsgraph:related -->

## 1. Create a Flags Discovery Endpoint

The Flags Explorer reads flag metadata from a well-known API route:

```ts filename="app/.well-known/vercel/flags/route.ts"
import { createFlagsDiscoveryEndpoint, getProviderData } from 'flags/next';
import * as flags from '../../../../flags';

export const GET = createFlagsDiscoveryEndpoint(async () => {
  return getProviderData(flags);
});
```

This endpoint uses the `FLAGS_SECRET` environment variable to authenticate requests. Make sure you've pulled it with `vercel env pull`.

## 2. Deploy to preview

```bash filename="terminal"
vercel deploy
```

## 3. Use the toolbar

Visit the preview URL. The Flags Explorer panel appears in the Vercel Toolbar. Toggle any flag to override its value for your session without affecting other users.

See [Flags Explorer](/docs/flags/flags-explorer/getting-started) for the full setup guide, including how to share overrides with teammates via URL.


---

[View full sitemap](/docs/sitemap)
