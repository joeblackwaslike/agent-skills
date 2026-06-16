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
  - /docs/runtime-logs
  - /docs/flags/flags-sdk-reference
summary: Learn how to tag your page views and custom events with feature flags
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/observability/web-analytics.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "5ba76e9db9dd1f6fcf54971743da5c7c7a6a599785c565d628902d56248d9802"
---

# Integrate flags with Vercel Web Analytics

> **🔒 Permissions Required**: Web Analytics integration

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

1. First, report the feature flag value using `reportValue` to make the flag show up in [Runtime Logs](/docs/runtime-logs):

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
