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
  - /docs/flags/flags-explorer/reference
  - /docs/flags/flags-explorer/getting-started
summary: Add the Flags Explorer to the Vercel Toolbar so you can override flag values on preview deployments without affecting other users.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/flags/vercel-flags/cli/set-up-flags-explorer.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "c5b59c5141544d23bff0e3af27c5d47753e367169fdb2c384cc0132f165fe891"
---

# Setting up Flags Explorer

The [Flags Explorer](/docs/flags/flags-explorer) adds a panel to the [Vercel Toolbar](/docs/vercel-toolbar) that lets you override flag values on preview deployments. Make sure you've [set up the toolbar](/docs/vercel-toolbar) first. This is a one-time setup per project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Flags](https://flags-sdk.dev/docs/providers/vercel)
- [Flags Explorer redesigned for easier override sharing](https://vercel.com/changelog/flags-explorer-redesigned-for-easier-override-sharing)
- [Quickstart](https://flags-sdk.dev/docs/frameworks/sveltekit) — Using the Flags SDK in SvelteKit
- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
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

With `flags` version 4.5.0 or later, this endpoint answers requests that Vercel signs for your project, so you don't need a `FLAGS_SECRET` environment variable. Run `vercel env pull` so the endpoint can verify requests locally. If your project has a `FLAGS_SECRET`, the endpoint also accepts requests authenticated with that secret. See [when you need a `FLAGS_SECRET`](/docs/flags/flags-explorer/reference#flags_secret-environment-variable).

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
