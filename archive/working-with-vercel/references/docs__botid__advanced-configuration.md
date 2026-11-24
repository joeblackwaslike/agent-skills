---
title: Advanced BotID Configuration
product: vercel
url: /docs/botid/advanced-configuration
canonical_url: "https://vercel.com/docs/botid/advanced-configuration"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/botid
related:
  []
summary: Fine-grained control over BotID detection levels and backend domain configuration
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/botid/advanced-configuration.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "7a72f59a4bd0b29ed33553f5efab549bffe9a0caf225c026ef07a06c90ace1c4"
---

# Advanced BotID Configuration

## Route-by-Route configuration

When you need fine-grained control over BotID's detection levels, you can specify `advancedOptions` to choose between basic and deep analysis modes on a per-route basis. **This configuration takes precedence over the project-level BotID settings in your Vercel dashboard.**


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to protect your AI endpoints with Vercel BotID](https://vercel.com/kb/guide/protect-ai-endpoints-with-vercel-botid) — Gate every request to your AI endpoints with Vercel BotID and checkBotId\\(\\) so inference runs only for verified callers
- [Deploying and testing BotID](https://vercel.com/kb/guide/deploying-and-testing-botid) — This guide gives an overview on Vercel BotID and how to deploy and test it in production
- [​Introducing BotID, invisible bot filtering for critical routes](https://vercel.com/blog/introducing-botid)
- [Vercel BotID is now generally available](https://vercel.com/changelog/vercel-botid-is-now-generally-available)
- [Vercel BotID now leverages Vercel's verified bot directory](https://vercel.com/changelog/vercel-botid-now-leverages-vercels-verified-bot-directory)
- [Vercel BotID now  available for all frameworks](https://vercel.com/changelog/botid-now-available-for-all-frameworks)
- [How to use Vercel’s Bot Management features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Advanced Configuration](https://vercel.com/docs/functions/configuring-functions/advanced-configuration) — Learn how to add utility files to the /api directory, and bundle Vercel Functions.

Full cross-link map for this page: [/docs/botid/advanced-configuration.graph.md](/docs/botid/advanced-configuration.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** **Important**: The `checkLevel` in both client and server configurations must
> be identical for each protected route. A mismatch between client and server
> configurations will cause BotID verification to fail, potentially blocking
> legitimate traffic or allowing bots through. This feature is available in
> `botid@1.4.5` and above

### Client-side configuration

In your client-side protection setup, you can specify the check level for each protected path:

```ts
initBotId({
  protect: [
    {
      path: '/api/checkout',
      method: 'POST',
      advancedOptions: {
        checkLevel: 'deepAnalysis', // or 'basic'
      },
    },
    {
      path: '/api/contact',
      method: 'POST',
      advancedOptions: {
        checkLevel: 'basic',
      },
    },
  ],
});
```

### Server-side configuration

In your server-side endpoint that uses `checkBotId()`, ensure it matches the client-side configuration.

```ts
export async function POST(request: NextRequest) {
  const verification = await checkBotId({
    advancedOptions: {
      checkLevel: 'deepAnalysis', // Must match client-side config
    },
  });

  if (verification.isBot) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  // Your protected logic here
}
```

## Separate backend domains

By default, BotID validates that requests come from the same host that serves the BotID challenge. However, if your application architecture separates your frontend and backend domains (e.g., your app is served from `vercel.com` but your API is on `api.vercel.com` or `vercel-api.com`), you'll need to configure `extraAllowedHosts`.

The `extraAllowedHosts` parameter in `checkBotId()` allows you to specify a list of frontend domains that are permitted to send requests to your backend:

```ts filename="app/api/backend/route.ts"
export async function POST(request: NextRequest) {
  const verification = await checkBotId({
    advancedOptions: {
      extraAllowedHosts: ['vercel.com', 'app.vercel.com'],
    },
  });

  if (verification.isBot) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  // Your protected logic here
}
```

> **💡 Note:** Only add trusted domains to `extraAllowedHosts`. Each domain in this list can
> send requests that will be validated by BotID, so ensure these are domains you
> control.

### When to use `extraAllowedHosts`

Use this configuration when:

- Your frontend is hosted on a different domain than your API (e.g., `myapp.com` → `api.myapp.com`)
- You have multiple frontend applications that need to access the same protected backend
- Your architecture uses a separate subdomain for API endpoints

### Example with advanced options

You can combine `extraAllowedHosts` with other advanced options:

```ts filename="app/api/backend-advanced/route.ts"
const verification = await checkBotId({
  advancedOptions: {
    checkLevel: 'deepAnalysis',
    extraAllowedHosts: ['app.example.com', 'dashboard.example.com'],
  },
});
```

## Next.js Pages Router configuration

When using [Pages Router API handlers](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) in development, pass request headers to `checkBotId()`:

```ts filename="pages/api/endpoint.ts"
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkBotId } from 'botid/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await checkBotId({
    advancedOptions: {
      headers: req.headers,
    },
  });

  if (result.isBot) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Your protected logic here
  res.status(200).json({ success: true });
}
```

> **💡 Note:** Pages Router requires explicit headers in development. In production, headers
> are extracted automatically.

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
