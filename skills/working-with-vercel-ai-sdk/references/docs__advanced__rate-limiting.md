---
title: Rate Limiting
description: Learn how to rate limit your application.
url: "https://ai-sdk.dev/docs/advanced/rate-limiting"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/advanced/rate-limiting.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "20729f5b5a3d049c7a16d5e050fade537751e01eb7d4aa7d1fbc2be5593673e3"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Rate limiting helps you protect your APIs from abuse. It involves setting a
maximum threshold on the number of requests a client can make within a
specified timeframe. This simple technique acts as a gatekeeper,
preventing excessive usage that can degrade service performance and incur
unnecessary costs.

## Rate Limiting with Upstash Redis and Upstash Ratelimit

In this example, you will protect an API endpoint using [Upstash Redis](https://upstash.com/redis) and [Upstash Ratelimit](https://github.com/upstash/ratelimit).

```tsx title='app/api/generate/route.ts'
import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Create Rate limit
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(5, '30s'),
});

export async function POST(req: NextRequest) {
  // call ratelimit with request ip
  const ip = req.ip ?? 'ip';
  const { success, remaining } = await ratelimit.limit(ip);

  // block the request if unsuccessful
  if (!success) {
    return new Response('Ratelimited!', { status: 429 });
  }

  const { messages } = await req.json();

  const result = streamText({
    model: "anthropic/claude-sonnet-5.5",
    messages,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

## Simplify API Protection

With Upstash Redis and Upstash Ratelimit, it is possible to protect your APIs
from such attacks with ease. To learn more about how Ratelimit works and
how it can be configured to your needs, see [Ratelimit Documentation](https://upstash.com/docs/oss/sdks/ts/ratelimit/overview).

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)