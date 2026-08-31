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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "d86f3458d8c3a5174a8955a1a92aba6637665ea40b386ad457ccd8816d47604f"
---

# Integrate flags with Vercel Web Analytics

> **🔒 Permissions Required**: Web Analytics integration


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Flags: Platform-native feature flags](https://vercel.com/blog/vercel-flags-platform-native-feature-flags?from=related&source_path=%2Fdocs%2Fflags%2Fobservability%2Fweb-analytics&source_site=vercel-docs&relationship=related)
- [Vercel Flags](https://flags-sdk.dev/docs/providers/vercel?from=related&source_path=%2Fdocs%2Fflags%2Fobservability%2Fweb-analytics&source_site=vercel-docs&relationship=related)
- [Introducing the Flags Explorer, first-party integrations, and updates to the Flags SDK ](https://vercel.com/blog/introducing-the-flags-explorer-first-party-integrations-and-updates?from=related&source_path=%2Fdocs%2Fflags%2Fobservability%2Fweb-analytics&source_site=vercel-docs&relationship=related)
- [Introducing feature flag management from the Vercel Toolbar](https://vercel.com/blog/toolbar-feature-flags?from=related&source_path=%2Fdocs%2Fflags%2Fobservability%2Fweb-analytics&source_site=vercel-docs&relationship=related)
- [Shipping safer and smarter: Integrating feature flags deeper in the Vercel workflow](https://vercel.com/blog/feature-flags?from=related&source_path=%2Fdocs%2Fflags%2Fobservability%2Fweb-analytics&source_site=vercel-docs&relationship=related)
- [Observe your feature flags with the Vercel DX platform](https://vercel.com/changelog/observe-your-feature-flags-with-the-vercel-dx-platform?from=related&source_path=%2Fdocs%2Fflags%2Fobservability%2Fweb-analytics&source_site=vercel-docs&relationship=related)
- [Vercel Flags is now generally available](https://vercel.com/changelog/vercel-flags-ga?from=related&source_path=%2Fdocs%2Fflags%2Fobservability%2Fweb-analytics&source_site=vercel-docs&relationship=related)
- [Using the Flags SDK with Vercel Flags](https://vercel.com/docs/flags/vercel-flags/sdks/flags-sdk?from=related&source_path=%2Fdocs%2Fflags%2Fobservability%2Fweb-analytics&source_site=vercel-docs&relationship=related) — Integrate Vercel Flags into your Next.js or SvelteKit application using the Flags SDK.
- [Running an A/B test](https://vercel.com/docs/flags/vercel-flags/cli/run-ab-test?from=related&source_path=%2Fdocs%2Fflags%2Fobservability%2Fweb-analytics&source_site=vercel-docs&relationship=related) — Set up an A/B test with a feature flag, track results through Web Analytics, and clean up afterward using the Vercel CLI
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fflags%2Fobservability%2Fweb-analytics&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/flags/observability/web-analytics.graph.md](/docs/flags/observability/web-analytics.graph.md?from=related&source_path=%2Fdocs%2Fflags%2Fobservability%2Fweb-analytics&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

![Image](`/docs-assets/static/docs/workflow-collaboration/feature-flags/flags-in-web-analytics-light.png`)

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
