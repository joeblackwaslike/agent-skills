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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "ab5d0792ff4dde30bc3c56e0e437d17c0ac2ae427077022dde118d9e0f4b268e"
---

# Handling Verified Bots

> **💡 Note:** Handling verified bots is available in botid@1.5.0 and above.

BotID allows you to identify and handle [verified bots](/docs/bot-management#verified-bots) differently from regular bots. This feature enables you to permit certain trusted bots (like AI assistants) to access your application while blocking others.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel BotID now leverages Vercel's verified bot directory](https://vercel.com/changelog/vercel-botid-now-leverages-vercels-verified-bot-directory)
- [How to build a Shopify MCP agent on Vercel](https://vercel.com/kb/guide/build-a-shopify-mcp-agent-on-vercel) — Build a Shopify MCP agent on Vercel with AI SDK 7. Connect to Shopify's UCP MCP servers, update carts safely, and hand t
- [How to protect your AI endpoints with Vercel BotID](https://vercel.com/kb/guide/protect-ai-endpoints-with-vercel-botid) — Gate every request to your AI endpoints with Vercel BotID and checkBotId\\(\\) so inference runs only for verified callers
- [Deploying and testing BotID](https://vercel.com/kb/guide/deploying-and-testing-botid) — This guide gives an overview on Vercel BotID and how to deploy and test it in production
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Vercel BotID is now generally available](https://vercel.com/changelog/vercel-botid-is-now-generally-available)
- [Vercel's bot verification now supports Web Bot Auth](https://vercel.com/changelog/vercels-bot-verification-now-supports-web-bot-auth)
- [View & query bot verification data in Vercel Observability](https://vercel.com/changelog/view-and-query-bot-verification-data-in-vercel-observability)
- [Vercel BotID now  available for all frameworks](https://vercel.com/changelog/botid-now-available-for-all-frameworks)

Full cross-link map for this page: [/docs/botid/verified-bots.graph.md](/docs/botid/verified-bots.graph.md)
<!-- /docsgraph:related -->

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
