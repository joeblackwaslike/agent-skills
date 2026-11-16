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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/botid/local-development-behavior.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "38b3f1ea3f6fb4d1c71c1ebc4bc9dbd5c73c76358e1aadf4b6db4550e1b98540"
---

# Local Development Behavior

During local development, BotID behaves differently than in production to facilitate testing and development workflows. In development mode, `checkBotId()` always returns `{ isBot: false }`, allowing all requests to pass through. This ensures your development workflow isn't interrupted by bot protection while building and testing features.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to protect your AI endpoints with Vercel BotID](https://vercel.com/kb/guide/protect-ai-endpoints-with-vercel-botid) — Gate every request to your AI endpoints with Vercel BotID and checkBotId\\(\\) so inference runs only for verified callers
- [Deploying and testing BotID](https://vercel.com/kb/guide/deploying-and-testing-botid) — This guide gives an overview on Vercel BotID and how to deploy and test it in production
- [Vercel BotID is now generally available](https://vercel.com/changelog/vercel-botid-is-now-generally-available)
- [Vercel BotID now leverages Vercel's verified bot directory](https://vercel.com/changelog/vercel-botid-now-leverages-vercels-verified-bot-directory)
- [Why does my Serverless Function work locally but not when deployed?](https://vercel.com/kb/guide/why-does-my-serverless-function-work-locally-but-not-when-deployed) — Learn how to troubleshoot your Serverless Functions.
- [Advanced BotID Configuration](https://vercel.com/docs/botid/advanced-configuration) — Fine-grained control over BotID detection levels and backend domain configuration
- [vercel dev](https://vercel.com/docs/cli/dev) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [Testing Schedules Locally](https://vercel.com/docs/schedules/local-development) — Run static and dynamic schedules on your machine with vercel dev, trigger runs on demand, and learn what differs from pr
- [Add the Vercel Toolbar to local and production environments](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost) — Learn how to use the Vercel Toolbar in production and local environments.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.

Full cross-link map for this page: [/docs/botid/local-development-behavior.graph.md](/docs/botid/local-development-behavior.graph.md)
<!-- /docsgraph:related -->

### Using developmentOptions

If you need to test BotID's different return values in local development, you can use the `developmentOptions.bypass` option:

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
