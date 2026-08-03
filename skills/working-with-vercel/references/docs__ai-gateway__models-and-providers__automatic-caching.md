---
title: Automatic Caching
product: vercel
url: /docs/ai-gateway/models-and-providers/automatic-caching
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/automatic-caching"
last_updated: 2026-07-08
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/models-and-providers/model-filtering
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced
summary: Enable automatic prompt caching across providers with AI Gateway to reduce costs and latency.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/automatic-caching.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "74ed3db5fc44705c9970956c2e1826ce2c4911a38377b67195cee77a14a5c972"
---

# Automatic Caching

Some providers like Anthropic and MiniMax require explicit cache control markers to enable prompt caching, while others like OpenAI, Google, and DeepSeek cache automatically (sometimes called "implicit caching"). Use `caching: 'auto'` to let AI Gateway handle this for you. It applies the appropriate caching strategy based on the provider.

> **💡 Note:** **Supported providers:** Automatic caching works with Anthropic (direct,
> Vertex, and Bedrock) and MiniMax.

## How it works

When you set `caching: 'auto'` and the request routes to a provider that requires explicit cache markers, AI Gateway adds `cache_control` breakpoints to your messages. This covers Anthropic and MiniMax, which serves an Anthropic-compatible API and uses the same `cache_control` format. For providers with implicit caching (OpenAI, Google, DeepSeek), no modification is needed and caching works automatically.

For explicit-caching providers, AI Gateway places markers at two positions:

- **On the last message.** Each request writes a cache entry covering the full prompt, and the next request in the conversation reads that entry as a prefix, paying full price only for what it appends. Multi-turn and agentic traffic caches well because of this marker: tool-use loops and agent conversations extend the previous request instead of repeating a static prefix.
- **On the message before the last user message** (falling back to the system message). A request whose tail changed still reads the cache up to this stable prefix.

You can add a third marker with a cache anchor (see below).

**Default behavior**: When `caching` is not set, AI Gateway passes your request through without modification. Providers with implicit caching still cache automatically. For Anthropic, you'll need to set `caching: 'auto'` or manually add cache markers to your messages.

### Cache lifetime

Anthropic cache entries expire after five minutes by default. If your agentic workflow pauses for longer than five minutes, you can request a one-hour lifetime with the `cache_ttl` field on the [Responses API](/docs/ai-gateway/sdks-and-apis/responses):

```typescript
body: JSON.stringify({
  model: 'anthropic/claude-sonnet-5',
  caching: 'auto',
  cache_ttl: '1h',
  input: 'Review this codebase and suggest improvements.',
}),
```

The field accepts `5m` (five minutes) or `1h` (one hour). AI Gateway applies the selected lifetime to every automatic breakpoint, including a breakpoint created by `cache_anchor_items`. The field has no effect unless you also set `caching: 'auto'`.

Anthropic charges different cache-write rates for each lifetime:

| `cache_ttl` value | Lifetime     | Cache write price | Cache read price |
| ----------------- | ------------ | ----------------- | ---------------- |
| Omitted or `5m`   | Five minutes | 1.25× base input  | 0.1× base input  |
| `1h`              | One hour     | 2× base input     | 0.1× base input  |

A one-hour entry costs an additional 0.75× base input to write. One read after the five-minute entry would have expired saves 0.9× base input and repays that premium. Use one hour for long-running agents and conversations that commonly pause for more than five minutes. Keep the five-minute default when requests normally continue within five minutes.

`cache_ttl` is advisory. AI Gateway uses the default lifetime for unsupported values and never rejects the request because of the hint. The response includes an `unsupported` warning in `provider_metadata.gateway.warnings`:

```json
{
  "provider_metadata": {
    "gateway": {
      "warnings": [
        {
          "type": "unsupported",
          "feature": "cache_ttl",
          "details": "Unsupported cache_ttl; the default cache lifetime was used."
        }
      ]
    }
  }
}
```

For streaming requests, the warning appears on the terminal `response.completed` or `response.incomplete` event.

### Cache anchor

The two default markers assume the conversation only grows at the tail. Agentic clients often rewrite the middle of the prompt instead: summarizing older turns, pruning tool output, or compacting history. When that happens, both default markers land after the mutation point and the cache read misses everything.

If your client knows how much of the prompt is stable, it can say so with the `cache_anchor_items` field on the [Responses API](/docs/ai-gateway/sdks-and-apis/responses):

```typescript
body: JSON.stringify({
  model: 'anthropic/claude-sonnet-5',
  caching: 'auto',
  cache_anchor_items: 12,
  input: [
    /* the first 12 input items are byte-stable across future requests */
  ],
}),
```

`cache_anchor_items: N` declares that the first `N` items of `input` will be sent byte-for-byte identically on future requests. AI Gateway places an additional cache marker at that position, so a request that later mutates the prompt *after* the anchor still reads the cache up to it.

The anchor is advisory. Values that can't be used (not a positive integer, past the end of the prompt, or colliding with a marker that's already placed) are ignored, and caching degrades to the two-marker behavior above. An unusable anchor never causes a request to fail.

The anchor only applies when `caching: 'auto'` is set, and like the other markers it only modifies requests to explicit-caching providers.

## Cost tradeoff

On Anthropic, cache writes cost 1.25× the base input rate and cache reads cost 0.1×. The break-even is a single read: one follow-up request that reuses the cached prompt saves 0.9× per token read, more than offsetting the 0.25× write premium. Multi-turn conversations, agents, and tool-use loops re-read everything the previous turn wrote on every turn, so they come out well ahead. For true one-shot requests, where no follow-up ever reads the cache entry, the write premium is a small net cost. If your traffic is strictly one-shot, prefer manual cache markers (or no caching) over `caching: 'auto'`.

> **💡 Note:** To restrict routing to only models that cache automatically (implicit
> caching), use `has: ['implicit-caching']`. See [Model
> Filtering](/docs/ai-gateway/models-and-providers/model-filtering).

## Examples

#### AI SDK

```typescript filename="app/api/chat/route.ts"
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-sonnet-5',
    system: 'You are a helpful assistant with access to a large knowledge base...',
    prompt,
    providerOptions: {
      gateway: {
        caching: 'auto',
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### Chat Completions

#### TypeScript

```typescript filename="auto-caching.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error - providerOptions is a gateway extension
const response = await openai.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'system',
      content: 'You are a helpful assistant with access to a large knowledge base...',
    },
    {
      role: 'user',
      content: 'What is the capital of France?',
    },
  ],
  providerOptions: {
    gateway: {
      caching: 'auto',
    },
  },
});

console.log(response.choices[0].message.content);
```

#### Python

```python filename="auto-caching.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

response = client.chat.completions.create(
    model='anthropic/claude-sonnet-5',
    messages=[
        {
            'role': 'system',
            'content': 'You are a helpful assistant with access to a large knowledge base...'
        },
        {
            'role': 'user',
            'content': 'What is the capital of France?'
        }
    ],
    extra_body={
        'providerOptions': {
            'gateway': {
                'caching': 'auto'
            }
        }
    }
)

print(response.choices[0].message.content)
```

#### OpenAI Responses

```typescript filename="auto-caching.ts"
const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'anthropic/claude-sonnet-5',
    caching: 'auto',
    instructions: 'You are a helpful assistant with access to a large knowledge base...',
    input: [{ type: 'message', role: 'user', content: 'What is the capital of France?' }],
  }),
});
```

#### Anthropic Messages

#### TypeScript

```typescript filename="auto-caching.ts"
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-sonnet-5',
  max_tokens: 2048,
  system: 'You are a helpful assistant with access to a large knowledge base...',
  messages: [
    {
      role: 'user',
      content: 'What is the capital of France?',
    },
  ],
  // @ts-expect-error - providerOptions is a gateway extension
  providerOptions: {
    gateway: {
      caching: 'auto',
    },
  },
});

console.log(message.content[0].type === 'text' ? message.content[0].text : '');
```

#### Python

```python filename="auto-caching.py"
import os
import anthropic

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = anthropic.Anthropic(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh'
)

message = client.messages.create(
    model='anthropic/claude-sonnet-5',
    max_tokens=2048,
    system='You are a helpful assistant with access to a large knowledge base...',
    messages=[
        {
            'role': 'user',
            'content': 'What is the capital of France?'
        }
    ],
    extra_body={
        'providerOptions': {
            'gateway': {
                'caching': 'auto'
            }
        }
    }
)

print(message.content[0].text)
```

## Manual caching

For fine-grained control over what gets cached, you can manually add cache markers instead of using `caching: 'auto'`. This gives you control over exactly which parts of your prompt are cached.

- **Anthropic Messages API**: Add `cache_control: { type: 'ephemeral' }` to specific messages. See the [Anthropic prompt caching docs](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) for details.
- **AI SDK**: Use the `cacheControl` property on messages. See the [AI SDK Anthropic provider docs](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic#cache-control) for details.
- **OpenAI Chat Completions API**: See [prompt caching](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced#prompt-caching) in the advanced guide.

## Provider behavior

| Provider                | Caching type | `caching: 'auto'` effect                          |
| ----------------------- | ------------ | ------------------------------------------------- |
| OpenAI                  | Implicit     | No change needed. Caching happens automatically.  |
| Google                  | Implicit     | No change needed. Caching happens automatically.  |
| DeepSeek                | Implicit     | No change needed. Caching happens automatically.  |
| Anthropic               | Explicit     | Adds [`cache_control` breakpoints](#how-it-works)  |
| Anthropic (via Vertex)  | Explicit     | Adds [`cache_control` breakpoints](#how-it-works)  |
| Anthropic (via Bedrock) | Explicit     | Adds [`cache_control` breakpoints](#how-it-works)  |
| MiniMax                 | Explicit     | Adds [`cache_control` breakpoints](#how-it-works)  |


---

[View full sitemap](/docs/sitemap)
