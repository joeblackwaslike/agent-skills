---
title: Using OpenFeature with Vercel Flags
product: vercel
url: /docs/flags/vercel-flags/sdks/openfeature
canonical_url: "https://vercel.com/docs/flags/vercel-flags/sdks/openfeature"
last_updated: 2026-06-24
type: how-to
prerequisites:
  - /docs/flags/vercel-flags/sdks
  - /docs/flags/vercel-flags
related:
  - /docs/flags/vercel-flags/quickstart
  - /docs/flags/vercel-flags/dashboard/entities
  - /docs/flags/vercel-flags/sdks/flags-sdk
summary: Use the vendor-neutral OpenFeature API with Vercel Flags as your provider.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/sdks/openfeature.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "2e65422a40d5f3ff98e1c2a3ec1e1603480529c5266655a95f0a597fc60c4fcf"
---

# Using OpenFeature with Vercel Flags

[OpenFeature](https://openfeature.dev/) is a vendor-neutral, open standard for feature flags. Vercel Flags provides an OpenFeature provider so you can use the standard OpenFeature API while Vercel manages your flags.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Vercel Flags are evaluated](https://vercel.com/kb/guide/how-vercel-flags-are-evaluated?from=related) — Learn how Vercel Flags determines a flag’s value across environments using evaluation context, targeting, rules, and fal
- [How to use Vercel Flags across projects](https://vercel.com/kb/guide/how-to-use-vercel-flags-across-projects?from=related) — Evaluate flags across projects using a source project SDK Key in the consumer project via a custom adapter
- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments?from=related) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [Core](https://vercel.com/docs/flags/vercel-flags/sdks/core?from=related) — Use the Vercel Flags core evaluation library directly for custom setups.
- [Flags SDK](https://vercel.com/docs/flags/flags-sdk-reference?from=related) — API reference for the Flags SDK for Next.js and SvelteKit.
- [Getting Started](https://vercel.com/docs/flags/flags-explorer/getting-started?from=related) — Learn how to set up the Flags Explorer so you can see and override your application's feature flags
- [Web Analytics](https://vercel.com/docs/flags/observability/web-analytics?from=related) — Learn how to tag your page views and custom events with feature flags
- [Flags Explorer](https://vercel.com/docs/flags/flags-explorer?from=related) — View and override your application's feature flags from the Vercel Toolbar

Full cross-link map for this page: [/docs/flags/vercel-flags/sdks/openfeature.graph.md](/docs/flags/vercel-flags/sdks/openfeature.graph.md)
<!-- /docsgraph:related -->

The [Getting Started guide](/docs/flags/vercel-flags/quickstart) covers creating a flag in the dashboard, pulling local OpenID Connect (OIDC) credentials, and evaluating a flag with OpenFeature. This page goes deeper into initialization options, typed evaluation methods, context passing, and debugging.

## Setup

OpenFeature requires you to register a provider before you can evaluate flags. The `flagsClient` used below authenticates with Vercel OIDC by default. In a real application you'll want to do this once and reuse the client everywhere. Create a helper that handles initialization with retry logic:

```ts filename="lib/openfeature.ts"
import { OpenFeature } from '@openfeature/server-sdk';
import { flagsClient } from '@vercel/flags-core';
import { VercelProvider } from '@vercel/flags-core/openfeature';

let initPromise: Promise<void> | null = null;
let initialized = false;
const vercelProvider = new VercelProvider(flagsClient);

async function initialize() {
  try {
    await OpenFeature.setProviderAndWait(vercelProvider);
    initialized = true;
  } catch (error) {
    console.error('Failed to initialize provider:', error);
    initPromise = null; // allow retry on next request
  }
}

export async function getOpenFeatureClient() {
  if (initialized) return OpenFeature.getClient();
  if (!initPromise) initPromise = initialize();
  await initPromise;
  return OpenFeature.getClient();
}
```

This ensures the provider is only initialized once. Concurrent callers share the same in-flight promise, and after the first successful initialization the function returns synchronously. If initialization fails, the next call retries.

You can then call `getOpenFeatureClient()` from any server component or route handler:

```tsx filename="app/page.tsx"
import { getOpenFeatureClient } from '../lib/openfeature';

export default async function Page() {
  const client = await getOpenFeatureClient();
  const showBanner = await client.getBooleanValue('marketing-banner', false);

  return <div>{showBanner ? 'Sale live now!' : 'Welcome'}</div>;
}
```

## Evaluating flags

The OpenFeature client provides typed methods for different flag types:

### Boolean flags

```ts
const showFeature = await client.getBooleanValue('show-new-feature', false);
```

### String flags

```ts
const theme = await client.getStringValue('theme', 'light');
```

### Number flags

```ts
const maxItems = await client.getNumberValue('max-items-per-page', 10);
```

### Object flags

```ts
const config = await client.getObjectValue('feature-config', {
  enabled: false,
  variant: 'control',
});
```

The second argument is always the default value, returned when evaluation fails or no rules match.

## Passing evaluation context

To evaluate targeting rules based on user attributes, pass a context as the third argument:

```ts
const context = {
  targetingKey: 'user-123',
  email: 'user@example.com',
  plan: 'premium',
};

const showFeature = await client.getBooleanValue(
  'premium-feature',
  false,
  context,
);
```

The context properties should match the [entities](/docs/flags/vercel-flags/dashboard/entities) you've defined in the Vercel Dashboard.

## Getting evaluation details

For debugging or logging, use the detail methods to see why a particular value was returned:

```ts
const details = await client.getBooleanDetails('show-new-feature', false);

console.log({
  value: details.value,
  reason: details.reason,
  errorCode: details.errorCode,
  errorMessage: details.errorMessage,
});
```

The `reason` field tells you how the value was determined:

- `TARGETING_MATCH`: A targeting rule matched
- `DEFAULT`: No rules matched, using the default value
- `STATIC`: The flag is paused or disabled
- `ERROR`: An error occurred during evaluation

## Example: Next.js API route

A complete example using the `getOpenFeatureClient` helper with evaluation context:

```ts filename="app/api/feature/route.ts"
import { getOpenFeatureClient } from '../../lib/openfeature';

export async function GET(request: Request) {
  const client = await getOpenFeatureClient();
  const userId = request.headers.get('x-user-id');

  const showNewCheckout = await client.getBooleanValue(
    'new-checkout-flow',
    false,
    { user: userId ? { id: userId } : undefined },
  );

  return Response.json({ showNewCheckout });
}
```

## Limitations

- **Server-side only**: The `VercelProvider` runs on the server. Use the Flags SDK for client-side evaluation.
- **Flags Explorer**: OpenFeature doesn't respect Flags Explorer overrides out of the box. If you need Flags Explorer, expose the available flags through the Flags Discovery endpoint and respect the override cookie set by Flags Explorer manually.
- **No precompute**: The Flags SDK's precompute pattern for static pages is not available with OpenFeature.

## Next steps

- [Learn about the Flags SDK](/docs/flags/vercel-flags/sdks/flags-sdk) for framework-native integration
- [Configure entities](/docs/flags/vercel-flags/dashboard/entities) for targeting rules
- Visit [OpenFeature documentation](https://openfeature.dev/docs/reference/intro) for more about the OpenFeature ecosystem


---

[View full sitemap](/docs/sitemap)
