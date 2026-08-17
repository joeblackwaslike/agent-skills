---
title: Handling Verified Bots
product: vercel
url: /docs/botid/verified-bots
canonical_url: "https://vercel.com/docs/botid/verified-bots"
last_updated: 2026-02-26
type: reference
prerequisites:
  - /docs/botid
related:
  - /docs/bot-management
summary: Information about verified bots and their handling in BotID
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/botid/verified-bots.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "4adcc7a7f6a98051c3e3a967a75a6f724fbcb2abcbf0909ce6e97bd7b1d29134"
---

# Handling Verified Bots

> **💡 Note:** Handling verified bots is available in botid@1.5.0 and above.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to protect your AI endpoints with Vercel BotID](https://vercel.com/kb/guide/protect-ai-endpoints-with-vercel-botid?from=related) — Gate every request to your AI endpoints with Vercel BotID and checkBotId\(\) so inference runs only for verified callers
- [Deploying and testing BotID](https://vercel.com/kb/guide/deploying-and-testing-botid?from=related) — This guide gives an overview on Vercel BotID and how to deploy and test it in production
- [How to protect your AI app from bots](https://vercel.com/kb/guide/how-to-protect-your-ai-app-from-bots?from=related) — Learn how to protect your AI app from bots, scrapers, and abuse using Firewall, BotID, and more.
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Vercel BotID vs Cloudflare Turnstile](https://vercel.com/kb/guide/vercel-botid-vs-cloudflare-turnstile?from=related) — Compare Vercel BotID and Cloudflare Turnstile for bot protection, including detection model, hosting requirements, check
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel?from=related) — Learn how to Sign in with Vercel

Full cross-link map for this page: [/docs/botid/verified-bots.graph.md](/docs/botid/verified-bots.graph.md)
<!-- /docsgraph:related -->

BotID allows you to identify and handle [verified bots](/docs/bot-management#verified-bots) differently from regular bots. This feature enables you to permit certain trusted bots (like AI assistants) to access your application while blocking others.

Vercel maintains a directory of known and verified bots across the web at [bots.fyi](https://bots.fyi)

### Checking for Verified Bots

When using `checkBotId()`, the response includes fields that help you identify verified bots:

```javascript
import { checkBotId } from "botid/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const botResult = await checkBotId();

  const { isBot, verifiedBotName, isVerifiedBot, verifiedBotCategory } = botResult;

  // Check if it's ChatGPT Operator
  const isOperator = isVerifiedBot && verifiedBotName === "chatgpt-operator";

  if (isBot && !isOperator) {
    return Response.json({ error: "Access denied" }, { status: 403 });
  }

  // ... rest of your handler
  return Response.json(botResult);
}
```

### Verified Bot response fields

View our directory of verified bot names and categories [here](/docs/bot-management#verified-bots-directory).

The `checkBotId()` function returns the following fields for verified bots:

- **`isVerifiedBot`**: Boolean indicating whether the bot is verified
- **`verifiedBotName`**: String identifying the specific verified bot
- **`verifiedBotCategory`**: String categorizing the type of verified bot

### Example use cases

Verified bots are useful when you want to:

- Allow AI assistants to interact with your API while blocking other bots
- Provide different responses or functionality for verified bots
- Track usage by specific verified bot services
- Enable AI-powered features while maintaining security


---

[View full sitemap](/docs/sitemap)
