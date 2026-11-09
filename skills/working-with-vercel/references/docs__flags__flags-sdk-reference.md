---
title: Flags SDK Reference
product: vercel
url: /docs/flags/flags-sdk-reference
canonical_url: "https://vercel.com/docs/flags/flags-sdk-reference"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/flags
related:
  - /docs/flags/vercel-flags/quickstart
  - /docs/flags/flags-explorer/getting-started
  - /docs/flags/observability
summary: API reference for the Flags SDK for Next.js and SvelteKit.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/flags-sdk-reference.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "4123a18f107a4dbe4574c2261c1b31b996e48745acc0960f4dd3904ddf2786dd"
---

# Flags SDK Reference

The Flags SDK is a free, open-source library that gives you the tools you need to use feature flags in Next.js and SvelteKit applications. It works with any flag provider, custom setups, or no provider at all.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Quickstart](https://flags-sdk.dev/docs/frameworks/sveltekit) — Using the Flags SDK in SvelteKit
- [Vercel Flags is now generally available](https://vercel.com/changelog/vercel-flags-ga)
- [Cost-aware model routing with Vercel AI Gateway](https://vercel.com/kb/guide/cost-aware-model-routing-with-ai-gateway) — Send easy requests to a lower-cost model and escalate only the complex ones to a frontier model through AI Gateway, with
- [Vercel Flags: Platform-native feature flags](https://vercel.com/blog/vercel-flags-platform-native-feature-flags)
- [npm i flags](https://vercel.com/changelog/npm-i-flags)
- [Introducing the Flags Explorer, first-party integrations, and updates to the Flags SDK ](https://vercel.com/blog/introducing-the-flags-explorer-first-party-integrations-and-updates)
- [Flags SDK 3.0](https://vercel.com/changelog/flags-sdk-3-0)
- [Using the Flags SDK with Vercel Flags](https://vercel.com/docs/flags/vercel-flags/sdks/flags-sdk) — Integrate Vercel Flags into your Next.js or SvelteKit application using the Flags SDK.
- [Flags Explorer](https://vercel.com/docs/flags/flags-explorer) — View and override your application's feature flags from the Vercel Toolbar
- [Marketplace](https://vercel.com/docs/flags/marketplace) — Connect your preferred feature flag provider through the Vercel Marketplace for a unified flags experience.
- [Integrate flags with Vercel Web Analytics](https://vercel.com/docs/flags/observability/web-analytics) — Learn how to tag your page views and custom events with feature flags
- [Glossary](https://vercel.com/docs/glossary) — Learn about the terms and concepts used in Vercel's products and documentation.

Full cross-link map for this page: [/docs/flags/flags-sdk-reference.graph.md](/docs/flags/flags-sdk-reference.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This page provides an overview of key concepts and APIs. For complete API documentation, visit [flags-sdk.dev](https://flags-sdk.dev), the official source of truth for the Flags SDK.

## Key features

- **Framework-native**: Built specifically for Next.js (App Router, Pages Router, Middleware) and SvelteKit
- **Provider-agnostic**: Works with any [flag provider](https://flags-sdk.dev/docs/adapters/supported-providers) or [custom adapters](https://flags-sdk.dev/docs/adapters/custom-adapters)
- **Type-safe**: Full TypeScript support with type inference
- **Optimized for performance**: Uses precompute pattern for static generation
- **Integrated**: Works seamlessly with Flags Explorer and Vercel observability features

## Core concepts

### Flag definitions

Flags are defined using the `flag()` function. Each flag has a key and a `decide` function that returns the flag's value:

```ts filename="flags.ts"
import { flag } from 'flags/next';

export const showNewFeature = flag({
  key: 'show-new-feature',
  decide: () => false,
  description: 'Show the new dashboard feature',
});
```

### The decide function

The `decide` function determines a flag's value. It can be sync or async, and can access request context:

```ts filename="flags.ts"
export const experimentalUI = flag({
  key: 'experimental-ui',
  decide: async () => {
    const user = await getCurrentUser();
    return user?.betaAccess === true;
  },
});
```

### Flag options

Flags can have multiple options for A/B testing and experimentation:

```ts filename="flags.ts"
export const theme = flag({
  key: 'theme',
  options: [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'auto', label: 'Auto' },
  ],
  decide: () => 'auto',
});
```

### Precompute for static pages

The precompute pattern generates multiple versions of static pages with different flag values:

```ts filename="flags.ts"
export const layoutVariant = flag({
  key: 'layout-variant',
  options: [
    { value: 'a' },
    { value: 'b' },
  ],
  decide: () => 'a',
});

export const precompute = [layoutVariant];
```

Learn more about [precompute on flags-sdk.dev](https://flags-sdk.dev/docs/core-concepts/precompute).

## Key APIs

### Reading flag values

Call your flag functions to read their values:

```ts
const isEnabled = await showNewFeature();
const currentTheme = await theme();
```

### Reporting values

Report flag values for observability (automatic with SDK):

```ts
import { reportValue } from 'flags';

reportValue('my-flag', true);
```

### Overrides

Flags Explorer stores overrides in the encrypted `vercel-flag-overrides` cookie. The `flag()` function reads this cookie and applies overrides automatically: when an override is present, the `decide` function is not called and the override value is returned instead. No extra code is needed.

To read overrides manually in Next.js App Router, use the following example. `decryptOverrides` uses `FLAGS_SECRET`, which must match the secret used by Flags Explorer:

```ts filename="app/read-overrides.ts" framework=nextjs-app
import { decryptOverrides } from 'flags';
import { cookies } from 'next/headers';

export async function readOverrides() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get('vercel-flag-overrides')?.value;

  if (!cookieValue) {
    return {};
  }

  return (await decryptOverrides(cookieValue)) ?? {};
}
```

```js filename="app/read-overrides.js" framework=nextjs-app
import { decryptOverrides } from 'flags';
import { cookies } from 'next/headers';

export async function readOverrides() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get('vercel-flag-overrides')?.value;

  if (!cookieValue) {
    return {};
  }

  return (await decryptOverrides(cookieValue)) ?? {};
}
```

### Flags Explorer integration

Create a Flags API endpoint for Flags Explorer:

```ts filename="app/.well-known/vercel/flags/route.ts"
import { createFlagsDiscoveryEndpoint, getProviderData } from 'flags/next';
import * as flags from '#/flags';

export const GET = createFlagsDiscoveryEndpoint(async () => {
  return getProviderData(flags);
});
```

## Framework-specific guides

- **Next.js**: [Getting started with Next.js](https://flags-sdk.dev/docs/getting-started/next)
- **SvelteKit**: [Getting started with SvelteKit](https://flags-sdk.dev/docs/getting-started/sveltekit)

## Provider adapters

The Flags SDK works with many providers out of the box:

- [Vercel](https://flags-sdk.dev/docs/providers/vercel)
- [LaunchDarkly](https://flags-sdk.dev/docs/adapters/supported-providers#launchdarkly)
- [Statsig](https://flags-sdk.dev/docs/adapters/supported-providers#statsig)
- [ConfigCat](https://flags-sdk.dev/docs/adapters/supported-providers#configcat)
- [DevCycle](https://flags-sdk.dev/docs/adapters/supported-providers#devcycle)
- [Flipt](https://flags-sdk.dev/docs/adapters/supported-providers#flipt)
- [Custom adapters](https://flags-sdk.dev/docs/adapters/custom-adapters)

## Complete API reference

For the full API documentation, including all functions, types, and advanced patterns, visit:

- [Core API reference](https://flags-sdk.dev/docs/api-reference/core/core)
- [Next.js API reference](https://flags-sdk.dev/docs/api-reference/frameworks/next)
- [SvelteKit API reference](https://flags-sdk.dev/docs/api-reference/frameworks/sveltekit)
- [React components](https://flags-sdk.dev/docs/api-reference/core/react)

## Examples

- [Next.js Feature Flags Example](/templates/next.js/shirt-shop-feature-flags)
- [More examples on flags-sdk.dev](https://flags-sdk.dev/docs/frameworks/next)

## Next steps

- [Get started with the quickstart](/docs/flags/vercel-flags/quickstart)
- [Set up Flags Explorer](/docs/flags/flags-explorer/getting-started)
- [Integrate with observability](/docs/flags/observability)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
