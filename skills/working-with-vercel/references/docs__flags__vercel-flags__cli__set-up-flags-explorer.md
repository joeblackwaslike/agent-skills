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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/flags/vercel-flags/cli/set-up-flags-explorer.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c95a23d8d46565f3c9f29e39c73e73067513bca1fe0698cbc29a9801236227cd"
---

# Setting up Flags Explorer

The [Flags Explorer](/docs/flags/flags-explorer) adds a panel to the [Vercel Toolbar](/docs/vercel-toolbar) that lets you override flag values on preview deployments. Make sure you've [set up the toolbar](/docs/vercel-toolbar) first. This is a one-time setup per project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Flags](https://flags-sdk.dev/docs/providers/vercel)
- [Flags Explorer redesigned for easier override sharing](https://vercel.com/changelog/flags-explorer-redesigned-for-easier-override-sharing)
- [Flags Explorer is now generally available](https://vercel.com/changelog/flags-explorer-is-now-generally-available)
- [Quickstart](https://flags-sdk.dev/docs/frameworks/sveltekit) — Using the Flags SDK in SvelteKit
- [Using the Flags SDK with Vercel Flags](https://vercel.com/docs/flags/vercel-flags/sdks/flags-sdk) — Integrate Vercel Flags into your Next.js or SvelteKit application using the Flags SDK.
- [Managing flags in the dashboard](https://vercel.com/docs/flags/vercel-flags/dashboard) — Learn how to manage your feature flags using the Vercel Dashboard.
- [CLI Workflows](https://vercel.com/docs/agent-resources/workflows) — End-to-end workflows that show how to compose Vercel CLI commands into complete debugging, deployment, and recovery sess

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
