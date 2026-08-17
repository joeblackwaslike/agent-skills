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
source: "https://vercel.com/docs/botid/advanced-configuration.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "e39b76858175f31dfec2d04cd179c699f578ba93aaa4a8b26afccfd7998c3dbc"
---

# Advanced BotID Configuration

## Route-by-Route configuration


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to protect your AI endpoints with Vercel BotID](https://vercel.com/kb/guide/protect-ai-endpoints-with-vercel-botid?from=related) — Gate every request to your AI endpoints with Vercel BotID and checkBotId\(\) so inference runs only for verified callers
- [Deploying and testing BotID](https://vercel.com/kb/guide/deploying-and-testing-botid?from=related) — This guide gives an overview on Vercel BotID and how to deploy and test it in production
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Vercel BotID vs Cloudflare Turnstile](https://vercel.com/kb/guide/vercel-botid-vs-cloudflare-turnstile?from=related) — Compare Vercel BotID and Cloudflare Turnstile for bot protection, including detection model, hosting requirements, check
- [How to protect your AI app from bots](https://vercel.com/kb/guide/how-to-protect-your-ai-app-from-bots?from=related) — Learn how to protect your AI app from bots, scrapers, and abuse using Firewall, BotID, and more.
- [Get Started with BotID](https://vercel.com/docs/botid/get-started?from=related) — Step-by-step guide to setting up BotID protection in your Vercel project
- [Attack Mode](https://vercel.com/docs/vercel-firewall/attack-mode?from=related) — Learn how to use Attack Mode to help control who has access to your site when it's under attack.
- [Automated & Agent Access](https://vercel.com/docs/deployment-protection/automated-agent-access?from=related) — Grant AI agents, CI/CD pipelines, MCP servers, and testing tools access to Vercel deployments that have Deployment Prote
- [Connect your API](https://vercel.com/docs/oidc/api?from=related) — Learn how to configure your own API to trust Vercel's OpenID Connect \(OIDC\) Identity Provider \(IdP\)

Full cross-link map for this page: [/docs/botid/advanced-configuration.graph.md](/docs/botid/advanced-configuration.graph.md)
<!-- /docsgraph:related -->

When you need fine-grained control over BotID's detection levels, you can specify `advancedOptions` to choose between basic and deep analysis modes on a per-route basis. **This configuration takes precedence over the project-level BotID settings in your Vercel dashboard.**

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


---

[View full sitemap](/docs/sitemap)
