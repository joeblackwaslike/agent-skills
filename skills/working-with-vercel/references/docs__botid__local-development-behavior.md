---
title: Local Development Behavior
product: vercel
url: /docs/botid/local-development-behavior
canonical_url: "https://vercel.com/docs/botid/local-development-behavior"
last_updated: 2026-02-26
type: reference
prerequisites:
  - /docs/botid
related:
  []
summary: How BotID behaves in local development environments and testing options
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/botid/local-development-behavior.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "5d036af066de74387963e359a8754b103e4ce745b42c0f6b859496b11d8311a5"
---

# Local Development Behavior

During local development, BotID behaves differently than in production to facilitate testing and development workflows. In development mode, `checkBotId()` always returns `{ isBot: false }`, allowing all requests to pass through. This ensures your development workflow isn't interrupted by bot protection while building and testing features.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to protect your AI endpoints with Vercel BotID](https://vercel.com/kb/guide/protect-ai-endpoints-with-vercel-botid?from=related) — Gate every request to your AI endpoints with Vercel BotID and checkBotId\(\) so inference runs only for verified callers
- [Deploying and testing BotID](https://vercel.com/kb/guide/deploying-and-testing-botid?from=related) — This guide gives an overview on Vercel BotID and how to deploy and test it in production
- [How to test a Slack bot with your Vercel preview deployment](https://vercel.com/kb/guide/test-slack-bot-with-vercel-preview-deployment?from=related) — Learn how to build and test a Slack bot using Vercel preview deployments. This guide covers setting up your Slack app, c
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Vercel BotID vs Cloudflare Turnstile](https://vercel.com/kb/guide/vercel-botid-vs-cloudflare-turnstile?from=related) — Compare Vercel BotID and Cloudflare Turnstile for bot protection, including detection model, hosting requirements, check
- [Advanced BotID Configuration](https://vercel.com/docs/botid/advanced-configuration?from=related) — Fine-grained control over BotID detection levels and backend domain configuration
- [vercel dev](https://vercel.com/docs/cli/dev?from=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [Add to Environments](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost?from=related) — Learn how to use the Vercel Toolbar in production and local environments.
- [Local Development](https://vercel.com/docs/microfrontends/local-development?from=related) — Learn about local development on Vercel.

Full cross-link map for this page: [/docs/botid/local-development-behavior.graph.md](/docs/botid/local-development-behavior.graph.md)
<!-- /docsgraph:related -->

### Using developmentOptions

If you need to test BotID's different return values in local development, you can use the `developmentBypass` option:

```ts filename="app/api/sensitive/route.ts"
import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const verification = await checkBotId({
    developmentOptions: {
      bypass: 'BAD-BOT', // default: 'HUMAN'
    },
  });

  if (verification.isBot) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  // Your protected logic here
}
```

> **💡 Note:** The `developmentOptions` option only works in development mode and is ignored
> in production. In production, BotID always performs real bot detection.

This allows you to:

- Test your bot handling logic without deploying to production
- Verify error messages and fallback behaviors
- Ensure your application correctly handles both human and bot traffic


---

[View full sitemap](/docs/sitemap)
