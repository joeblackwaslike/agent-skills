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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "f3b2f656c9f5bb4cf31c686a8eaf97c1fb315737e6e3dfd1c7e422b2d566765e"
---

# Local Development Behavior

During local development, BotID behaves differently than in production to facilitate testing and development workflows. In development mode, `checkBotId()` always returns `{ isBot: false }`, allowing all requests to pass through. This ensures your development workflow isn't interrupted by bot protection while building and testing features.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to protect your AI endpoints with Vercel BotID](https://vercel.com/kb/guide/protect-ai-endpoints-with-vercel-botid?from=related&source_path=%2Fdocs%2Fbotid%2Flocal-development-behavior&source_site=vercel-docs&relationship=related) — Gate every request to your AI endpoints with Vercel BotID and checkBotId\\(\\) so inference runs only for verified callers
- [Deploying and testing BotID](https://vercel.com/kb/guide/deploying-and-testing-botid?from=related&source_path=%2Fdocs%2Fbotid%2Flocal-development-behavior&source_site=vercel-docs&relationship=related) — This guide gives an overview on Vercel BotID and how to deploy and test it in production
- [​Introducing BotID, invisible bot filtering for critical routes](https://vercel.com/blog/introducing-botid?from=related&source_path=%2Fdocs%2Fbotid%2Flocal-development-behavior&source_site=vercel-docs&relationship=related)
- [Vercel BotID now leverages Vercel's verified bot directory](https://vercel.com/changelog/vercel-botid-now-leverages-vercels-verified-bot-directory?from=related&source_path=%2Fdocs%2Fbotid%2Flocal-development-behavior&source_site=vercel-docs&relationship=related)
- [How to test a Slack bot with your Vercel preview deployment](https://vercel.com/kb/guide/test-slack-bot-with-vercel-preview-deployment?from=related&source_path=%2Fdocs%2Fbotid%2Flocal-development-behavior&source_site=vercel-docs&relationship=related) — Learn how to build and test a Slack bot using Vercel preview deployments. This guide covers setting up your Slack app, c
- [Vercel BotID now  available for all frameworks](https://vercel.com/changelog/botid-now-available-for-all-frameworks?from=related&source_path=%2Fdocs%2Fbotid%2Flocal-development-behavior&source_site=vercel-docs&relationship=related)
- [Vercel BotID is now generally available](https://vercel.com/changelog/vercel-botid-is-now-generally-available?from=related&source_path=%2Fdocs%2Fbotid%2Flocal-development-behavior&source_site=vercel-docs&relationship=related)
- [vercel dev](https://vercel.com/docs/cli/dev?from=related&source_path=%2Fdocs%2Fbotid%2Flocal-development-behavior&source_site=vercel-docs&relationship=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [Add the Vercel Toolbar to local and production environments](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost?from=related&source_path=%2Fdocs%2Fbotid%2Flocal-development-behavior&source_site=vercel-docs&relationship=related) — Learn how to use the Vercel Toolbar in production and local environments.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fbotid%2Flocal-development-behavior&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/botid/local-development-behavior.graph.md](/docs/botid/local-development-behavior.graph.md?from=related&source_path=%2Fdocs%2Fbotid%2Flocal-development-behavior&source_site=vercel-docs&relationship=graph)
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
