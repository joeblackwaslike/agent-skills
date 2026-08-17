---
title: Integrate flags with Vercel Web Analytics
product: vercel
url: /docs/flags/observability/web-analytics
canonical_url: "https://vercel.com/docs/flags/observability/web-analytics"
last_updated: 2026-04-15
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ac7e04b2889a3ac02603fecffe74aff96b0f6b8e59fbb9e753eeca4077ebb0a0"
---

# Integrate flags with Vercel Web Analytics

> **🔒 Permissions Required**: Web Analytics integration


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Flags](https://vercel.com/docs/flags/vercel-flags?from=related) — Use Vercel as your feature flag provider to create and manage flags, define targeting rules, and run experiments directl
- [Dashboard](https://vercel.com/docs/flags/vercel-flags/dashboard?from=related) — Learn how to manage your feature flags using the Vercel Dashboard.
- [Getting Started](https://vercel.com/docs/flags/vercel-flags/quickstart?from=related) — Create your first feature flag and evaluate it in your application using the Flags SDK, OpenFeature, or the core library
- [Flags SDK](https://vercel.com/docs/flags/vercel-flags/sdks/flags-sdk?from=related) — Integrate Vercel Flags into your Next.js or SvelteKit application using the Flags SDK.
- [Getting Started](https://vercel.com/docs/flags/flags-explorer/getting-started?from=related) — Learn how to set up the Flags Explorer so you can see and override your application's feature flags

Full cross-link map for this page: [/docs/flags/observability/web-analytics.graph.md](/docs/flags/observability/web-analytics.graph.md)
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
