---
title: Integrate flags with Vercel Web Analytics
product: vercel
url: /docs/flags/observability/web-analytics
canonical_url: "https://vercel.com/docs/flags/observability/web-analytics"
last_updated: 2026-08-11
type: how-to
prerequisites:
  - /docs/flags/observability
  - /docs/flags
related:
  - /docs/flags/flags-explorer/reference
  - /docs/logs/runtime
  - /docs/flags/flags-sdk-reference
summary: Learn how to tag your page views and custom events with feature flags
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/observability/web-analytics.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "c6e15d94dc7da4df9d80685b29ef1cada54389a977ac8d8281f06b9123495e7b"
---

# Integrate flags with Vercel Web Analytics

> Web Analytics integration is available in Beta on all plans

![Feature Flags section in Vercel Web Analytics](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/workflow-collaboration/feature-flags/flags-in-web-analytics-light.png)


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [A/B testing on ecommerce storefronts without hurting Core Web Vitals](https://vercel.com/kb/guide/ecommerce-ab-testing-core-web-vitals) — Client-side A/B tools can worsen LCP and CLS on the pages you're testing. Run ecommerce A/B tests at the edge with Routi
- [Observe your feature flags with the Vercel DX platform](https://vercel.com/changelog/observe-your-feature-flags-with-the-vercel-dx-platform)
- [Introducing the Flags Explorer, first-party integrations, and updates to the Flags SDK ](https://vercel.com/blog/introducing-the-flags-explorer-first-party-integrations-and-updates)
- [Vercel Flags: Platform-native feature flags](https://vercel.com/blog/vercel-flags-platform-native-feature-flags)
- [Vercel Flags is now in public beta](https://vercel.com/changelog/vercel-flags-is-now-in-public-beta)
- [Introducing feature flag management from the Vercel Toolbar](https://vercel.com/blog/toolbar-feature-flags)
- [Vercel Flags is now generally available](https://vercel.com/changelog/vercel-flags-ga)
- [Using the Flags SDK with Vercel Flags](https://vercel.com/docs/flags/vercel-flags/sdks/flags-sdk) — Integrate Vercel Flags into your Next.js or SvelteKit application using the Flags SDK.
- [Running an A/B test](https://vercel.com/docs/flags/vercel-flags/cli/run-ab-test) — Set up an A/B test with a feature flag, track results through Web Analytics, and clean up afterward using the Vercel CLI

Full cross-link map for this page: [/docs/flags/observability/web-analytics.graph.md](/docs/flags/observability/web-analytics.graph.md)
<!-- /docsgraph:related -->

## Client-side tracking

Vercel Web Analytics can look up the values of evaluated feature flags in the DOM. It can then enrich page views and client-side events with these feature flags.

- ### Emit feature flags and connect them to Vercel Web Analytics
  To share your feature flags with Web Analytics you have to emit your feature flag values to the DOM as described in [Supporting Feature Flags](/docs/flags/flags-explorer/reference#values).

  This will automatically annotate all page views and client-side events with your feature flags.

- ### Tracking feature flags in client-side events
  Client-side events in Web Analytics will now automatically respect your flags and attach those to custom events.

  To manually overwrite the tracked flags for a specific `track` event, call:
  ```ts filename="component.ts"
  import { track } from '@vercel/analytics';

  track('My Event', {}, { flags: ['summer-sale'] });
  ```
  If the flag values on the client are encrypted, the entire encrypted string becomes part of the event payload. This can lead to the event getting reported without any flags when the encrypted string exceeds size limits.

## Server-side tracking

To track feature flags in server-side events:

1. First, report the feature flag value using `reportValue` to make the flag show up in [Runtime Logs](/docs/logs/runtime):

   ```ts {1, 8} filename="app/api/test/route.ts"
   import { reportValue } from 'flags';

   export async function GET() {
     reportValue('summer-sale', false);
     return Response.json({ ok: true });
   }
   ```

2. Once reported, any calls to `track` can look up the feature flag while handling a specific request:

   ```ts {1, 10} filename="app/api/test/route.ts"
   import { track } from '@vercel/analytics/server';
   import { reportValue } from 'flags';

   export async function GET() {
     reportValue('summer-sale', false);
     track('My Event', {}, { flags: ['summer-sale'] });

     return Response.json({ ok: true });
   }
   ```

> **💡 Note:** If you are using an implementation of the [Flags SDK](/docs/flags/flags-sdk-reference) you don't need to call
> `reportValue`. The respective implementation will automatically call
> `reportValue` for you.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
