---
title: Draft Flags
product: vercel
url: /docs/flags/vercel-flags/dashboard/drafts
canonical_url: "https://vercel.com/docs/flags/vercel-flags/dashboard/drafts"
last_updated: 2026-02-26
type: how-to
prerequisites:
  - /docs/flags/vercel-flags/dashboard
  - /docs/flags/vercel-flags
related:
  - /docs/flags/flags-explorer/getting-started
  - /docs/flags/vercel-flags/dashboard/archive
  - /docs/flags/vercel-flags/dashboard/feature-flag
  - /docs/flags/vercel-flags/sdks/flags-sdk
summary: Learn how draft flags work and how to promote them to Vercel Flags.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/dashboard/drafts.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d53f8bdf86e345f837ab063eafddde7ebee82c1c94135c287c4b39934e691b69"
---

# Draft Flags

Drafts are flags that Vercel detects in your code but haven't been created in the dashboard yet. They let you define flags in code first, then configure them in the dashboard when you're ready.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments?from=related) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [Getting Started](https://vercel.com/docs/flags/vercel-flags/quickstart?from=related) — Create your first feature flag and evaluate it in your application using the Flags SDK, OpenFeature, or the core library
- [Flags SDK](https://vercel.com/docs/flags/flags-sdk-reference?from=related) — API reference for the Flags SDK for Next.js and SvelteKit.
- [Set Up Flags Explorer](https://vercel.com/docs/flags/vercel-flags/cli/set-up-flags-explorer?from=related) — Add the Flags Explorer to the Vercel Toolbar so you can override flag values on preview deployments without affecting ot
- [Roll Out a Feature](https://vercel.com/docs/flags/vercel-flags/cli/roll-out-feature?from=related) — Create a feature flag, wire it into your application with the Flags SDK, and start a staged rollout using the Vercel CLI
- [Core](https://vercel.com/docs/flags/vercel-flags/sdks/core?from=related) — Use the Vercel Flags core evaluation library directly for custom setups.

Full cross-link map for this page: [/docs/flags/vercel-flags/dashboard/drafts.graph.md](/docs/flags/vercel-flags/dashboard/drafts.graph.md)
<!-- /docsgraph:related -->

## How drafts work

When you deploy your application, Vercel queries your [Flags Discovery Endpoint](/docs/flags/flags-explorer/getting-started#creating-the-flags-discovery-endpoint) to detect flags defined in code. If a flag has its provider set to Vercel but doesn't exist in the dashboard, it appears as a draft.

This happens automatically when:

1. You define a flag in code using the Flags SDK with `vercelAdapter()`
2. Your application exposes a Flags Discovery Endpoint
3. You deploy to production

## Draft behavior

When a flag is in draft state, Vercel knows it exists but doesn't control its value yet. Your application evaluates the flag using the `defaultValue` you defined in code. No targeting rules, segments, or environment-specific configuration apply until you create a Vercel Flag from the draft.

This lets you ship code with new flags before deciding how to configure them. For example, you might deploy a flag with `defaultValue: false` to keep the feature hidden, then promote and configure targeting rules when you're ready to roll out.

```ts filename="flags.ts"
export const newCheckout = flag({
  key: 'new-checkout',
  adapter: vercelAdapter(),
  defaultValue: false, // Used while the flag is a draft
  description: 'Enable the new checkout flow',
  options: [
    { value: true, label: 'Enabled' },
    { value: false, label: 'Disabled' },
  ],
});
```

The `description` and `options` you define here will pre-fill the dashboard when you promote the draft.

## Keeping code and dashboard in sync

Vercel compares the flags in your code against the flags in the dashboard whenever a new production deployment goes live. It uses the [Flags Discovery Endpoint](/docs/flags/flags-explorer/getting-started#creating-the-flags-discovery-endpoint) to detect which flags your code defines, then highlights any mismatches:

- **Drafts**: Flags that exist in your production deployment's code but have not been created in the dashboard appear as drafts. You can promote a draft to turn it into a fully managed Vercel Flag with targeting rules and environment configuration.
- **Unreferenced**: Flags that exist in the dashboard but are not found in your latest production deployment are marked with an **Unreferenced** badge in the flag list and flag details page. This helps you identify flags that may be safe to [archive](/docs/flags/vercel-flags/dashboard/archive).
- **Referenced archived flags**: If an archived flag is still present in your production deployment, the archive shows a **Referenced** badge so you know the code still depends on it. This can indicate a potential misconfiguration since archived flags are neither served nor evaluated, so your application will fall back to the default value defined in code.

## How to promote a draft

To start managing a flag through the dashboard:

1. Open **Flags** in your project
2. Go to the **Drafts** section
3. Click on the draft you want to promote
4. Click **Create Flag**

When you promote a draft, Vercel pre-fills the flag configuration with information from your code:

- **Description**: From the `description` property in your flag definition
- **Options/Variants**: From the `options` array in your flag definition
- **Type**: Inferred from your default value or options

After promotion, the flag is managed by the dashboard and you can configure environments, add targeting rules, and track changes.

## Flags Discovery Endpoint

Vercel detects drafts through your application's Flags Discovery Endpoint, typically located at `/.well-known/vercel/flags`. This endpoint returns metadata about your flags, including:

- Flag keys
- Descriptions
- Available options
- Provider information

If you're using the Flags SDK, use `getProviderData` to generate this information automatically:

```ts filename="app/.well-known/vercel/flags/route.ts"
import { createFlagsDiscoveryEndpoint, verifyAccess } from 'flags/next';
import { getProviderData } from '@flags-sdk/vercel';
import * as flags from '../../../../flags';

export const GET = createFlagsDiscoveryEndpoint(async () => {
  return getProviderData(flags);
});
```

## Next steps

- [Configure your flags](/docs/flags/vercel-flags/dashboard/feature-flag)
- [Learn about the Flags SDK](/docs/flags/vercel-flags/sdks/flags-sdk)


---

[View full sitemap](/docs/sitemap)
