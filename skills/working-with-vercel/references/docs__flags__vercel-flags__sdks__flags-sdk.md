---
title: Using the Flags SDK with Vercel Flags
product: vercel
url: /docs/flags/vercel-flags/sdks/flags-sdk
canonical_url: "https://vercel.com/docs/flags/vercel-flags/sdks/flags-sdk"
last_updated: 2026-04-15
type: how-to
prerequisites:
  - /docs/flags/vercel-flags/sdks
  - /docs/flags/vercel-flags
related:
  - /docs/flags/flags-sdk-reference
  - /docs/flags/vercel-flags/quickstart
  - /docs/flags/vercel-flags/dashboard/sdk-keys
  - /docs/flags/flags-explorer/reference
  - /docs/flags/vercel-flags/dashboard/drafts
summary: Integrate Vercel Flags into your Next.js or SvelteKit application using the Flags SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/sdks/flags-sdk.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "701dea7ddaa0dcaceb28b4e215cbd4543f829231b2078ece830cb9b8a23e458a"
---

# Using the Flags SDK with Vercel Flags

The [Flags SDK](/docs/flags/flags-sdk-reference) is the recommended way to use Vercel Flags in Next.js and SvelteKit applications. It provides a framework-native experience with full TypeScript support and automatic integration with Flags Explorer.

The [Getting Started guide](/docs/flags/vercel-flags/quickstart) covers installing packages, pulling local OpenID Connect (OIDC) credentials, defining a flag, and evaluating it in a component. This page builds on that and goes deeper into the adapter, Flags Explorer, targeting, and SvelteKit.

## The Vercel adapter

The `@flags-sdk/vercel` package provides the adapter that connects the Flags SDK to your Vercel Flags project. The [Getting Started guide](/docs/flags/vercel-flags/quickstart) uses `vercelAdapter()`, which authenticates with Vercel OIDC by default and initializes lazily on first evaluation.

If you need to connect with a specific [SDK Key](/docs/flags/vercel-flags/dashboard/sdk-keys), for example when working with multiple Vercel Flags projects, use `createVercelAdapter` instead. See [SDK Keys](/docs/flags/vercel-flags/dashboard/sdk-keys#with-the-flags-sdk) for details.

## Declaring options

You can declare the possible values a flag can evaluate to using the `options` array. This works for booleans, strings, numbers, and JSON-serializable objects or arrays:

```ts filename="flags.ts"
import { flag } from 'flags/next';
import { vercelAdapter } from '@flags-sdk/vercel';

export const pricingTier = flag({
  key: 'pricing-tier',
  adapter: vercelAdapter(),
  options: [
    { value: 'standard', label: 'Standard' },
    { value: 'premium', label: 'Premium' },
    { value: 'enterprise', label: 'Enterprise' },
  ],
  description: 'Which pricing tier to show',
});
```

Declaring options serves these purposes:

- [Flags Explorer](/docs/flags/flags-explorer/reference#definitions) displays them as a dropdown, so you can override the flag to any declared value during development.
- When Vercel detects the flag as a [draft](/docs/flags/vercel-flags/dashboard/drafts#how-to-promote-a-draft), the options pre-fill the flag configuration when you promote it to a fully managed Vercel Flag.
- When you use the Flags SDK's precompute function the declared options are serialized more efficiently.

## Flags Explorer integration

The Flags SDK automatically integrates with [Flags Explorer](/docs/flags/flags-explorer/getting-started), allowing you to view and override flags during development.

To enable this, create a discovery endpoint that exposes your flag definitions:

```ts filename="app/.well-known/vercel/flags/route.ts"
import { createFlagsDiscoveryEndpoint } from 'flags/next';
import { getProviderData } from '@flags-sdk/vercel';
import * as flags from '../../../../flags';

export const GET = createFlagsDiscoveryEndpoint(async (request) => {
  return getProviderData(flags);
});
```

`getProviderData` reads the metadata from your flag definitions, including keys, descriptions, and options, and returns it in the format Flags Explorer expects.

## Passing evaluation context

To evaluate targeting rules based on user attributes, provide an `identify` function on your flags. This function returns the context that Vercel Flags uses to match targeting rules configured in the dashboard.

```ts filename="flags.ts"
import { flag, dedupe } from 'flags/next';
import { vercelAdapter } from '@flags-sdk/vercel';

type Entities = {
  user?: { id: string; email: string; plan: string };
  team?: { id: string };
};

const identify = dedupe(async (): Promise<Entities> => {
  const session = await getSession(); // getSession would be implemented by your app
  return {
    user: session?.user
      ? {
          id: session.user.id,
          email: session.user.email,
          plan: session.user.plan,
        }
      : undefined,
  };
});

export const premiumFeature = flag<boolean, Entities>({
  key: 'premium-feature',
  adapter: vercelAdapter(),
  identify,
});
```

The `dedupe` wrapper ensures the context is only computed once per request, even if multiple flags call the same `identify` function.

## SvelteKit

For SvelteKit applications, use `flags/sveltekit` instead of `flags/next`:

```ts filename="src/lib/flags.ts"
import { flag } from 'flags/sveltekit';
import { vercelAdapter } from '@flags-sdk/vercel';

export const showNewFeature = flag({
  key: 'show-new-feature',
  adapter: vercelAdapter(),
});
```

See the [Flags SDK SvelteKit guide](https://flags-sdk.dev/docs/getting-started/sveltekit) for complete setup instructions.

## Next steps

- [Set up Flags Explorer](/docs/flags/flags-explorer/getting-started) for flag overrides during development
- [Configure targeting rules](/docs/flags/vercel-flags/dashboard) in the Vercel Dashboard
- [Learn about entities](/docs/flags/vercel-flags/dashboard/entities) for advanced targeting


---

[View full sitemap](/docs/sitemap)
