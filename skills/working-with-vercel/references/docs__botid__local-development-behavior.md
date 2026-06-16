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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "e8254c24259e88b5b4a78464e3f0fb2b3a5eda0329ebf3bf6f2769797415598e"
---

# Local Development Behavior

During local development, BotID behaves differently than in production to facilitate testing and development workflows. In development mode, `checkBotId()` always returns `{ isBot: false }`, allowing all requests to pass through. This ensures your development workflow isn't interrupted by bot protection while building and testing features.

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
