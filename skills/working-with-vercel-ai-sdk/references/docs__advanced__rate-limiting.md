---
source: "https://ai-sdk.dev/docs/advanced/rate-limiting.md"
fetched_at: "2026-08-17T04:48:04.925Z"
sha256: "4843a3c69522d75a2ed7b5943d181d19920f17f1e7fd4d874d5ee3a4bfd8d4fc"
---

# Rate Limiting

Rate limiting helps you protect your APIs from abuse. It involves setting a
maximum threshold on the number of requests a client can make within a
specified timeframe. This simple technique acts as a gatekeeper,
preventing excessive usage that can degrade service performance and incur
unnecessary costs.

## Rate Limiting with Upstash Redis and Upstash Ratelimit

In this example, you will protect an API endpoint using [Upstash Redis](https://upstash.com/redis) and [Upstash Ratelimit](https://github.com/upstash/ratelimit).

```tsx filename='app/api/generate/route.ts'
import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
__PROVIDER_IMPORT__;
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
    model: __MODEL__,
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


## Navigation

- [Prompt Engineering](/docs/advanced/prompt-engineering)
- [Stopping Streams](/docs/advanced/stopping-streams)
- [Backpressure](/docs/advanced/backpressure)
- [Caching](/docs/advanced/caching)
- [Multiple Streamables](/docs/advanced/multiple-streamables)
- [Rate Limiting](/docs/advanced/rate-limiting)
- [Rendering UI with Language Models](/docs/advanced/rendering-ui-with-language-models)
- [Language Models as Routers](/docs/advanced/model-as-router)
- [Multistep Interfaces](/docs/advanced/multistep-interfaces)
- [Sequential Generations](/docs/advanced/sequential-generations)
- [Vercel Deployment Guide](/docs/advanced/vercel-deployment-guide)
- [Secure URL Fetching](/docs/advanced/secure-url-fetching)


[Full Sitemap](/sitemap.md)
