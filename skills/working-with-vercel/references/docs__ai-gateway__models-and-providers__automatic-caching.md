---
title: AI Gateway Automatic Prompt Caching
product: vercel
url: /docs/ai-gateway/models-and-providers/automatic-caching
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/automatic-caching"
last_updated: 2026-09-11
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/models-and-providers/model-filtering
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced
summary: Enable automatic prompt caching and provider-side cache affinity with AI Gateway to reduce costs and latency.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/automatic-caching.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "8a9d220cd30077dd228e9d3deca8976c010350465f72abf01333532eab038c67"
---

# AI Gateway Automatic Prompt Caching

Some providers like Anthropic and MiniMax require explicit cache control markers to enable prompt caching, while others like OpenAI, Google, and DeepSeek cache automatically (sometimes called "implicit caching"). Use `caching: 'auto'` to let AI Gateway handle this for you. It applies the appropriate caching strategy based on the provider.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Cost-aware model routing through AI Gateway](https://vercel.com/kb/guide/cost-aware-model-routing-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fautomatic-caching&source_site=vercel-docs&relationship=related) — Route easy requests to a cheap model and escalate only hard ones to a frontier model through one AI Gateway endpoint, wi
- [Dynamic Prompt Caching](https://ai-sdk.dev/cookbook/node/dynamic-prompt-caching?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fautomatic-caching&source_site=vercel-docs&relationship=related)
- [Caching](https://ai-sdk.dev/docs/advanced/caching?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fautomatic-caching&source_site=vercel-docs&relationship=related)
- [Local Caching Middleware](https://ai-sdk.dev/cookbook/node/local-caching-middleware?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fautomatic-caching&source_site=vercel-docs&relationship=related)
- [Amazon Bedrock](https://ai-sdk.dev/providers/ai-sdk-providers/amazon-bedrock?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fautomatic-caching&source_site=vercel-docs&relationship=related)
- [Anthropic Messages Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fautomatic-caching&source_site=vercel-docs&relationship=related) — Advanced Anthropic API features including web search, provider timeouts, and automatic caching through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/automatic-caching.graph.md](/docs/ai-gateway/models-and-providers/automatic-caching.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fautomatic-caching&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** **Supported providers:** Automatic caching works with Anthropic (direct,
> Vertex, and Bedrock), MiniMax, and Alibaba.

## How it works

When you set `caching: 'auto'` and the request routes to a provider that requires explicit cache markers, AI Gateway adds `cache_control` breakpoints to your messages. This covers Anthropic, MiniMax, and Alibaba. AI Gateway uses the cache markers expected by each provider. For providers with implicit caching (OpenAI, Google, DeepSeek), no modification is needed and caching works automatically.

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

## Improve cache hits with cache affinity

Send the same `x-session-affinity` header with related requests so AI Gateway can forward it to the selected provider. Providers that support session affinity can use the value to preserve prompt-cache locality.

Use an opaque, stable value for each conversation, agent run, or related workflow. Don't include personal data in the value or reuse one value across unrelated sessions. The header does not affect your [routing configuration](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering) or which provider AI Gateway selects, and it does not guarantee a cache hit.

### Add cache affinity with AI SDK

Pass `x-session-affinity` to each AI SDK call with the `headers` option:

```typescript filename="generate-text.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'deepseek/deepseek-v4-flash-0731',
  prompt: 'Hello world',
  headers: {
    'x-session-affinity': 'session_123',
  },
});
```

### Add cache affinity to compatibility API requests

AI Gateway forwards `x-session-affinity` through its OpenAI-compatible, Anthropic-compatible, and OpenResponses API formats. Set it as a default SDK client header or include it directly in each HTTP request:

#### Chat Completions

```typescript filename="chat-completions.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
  defaultHeaders: {
    'x-session-affinity': 'session_123',
  },
});

const response = await openai.chat.completions.create({
  model: 'deepseek/deepseek-v4-flash-0731',
  messages: [{ role: 'user', content: 'Hello world' }],
});
```

#### OpenAI Responses

```typescript filename="responses.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
  defaultHeaders: {
    'x-session-affinity': 'session_123',
  },
});

const response = await openai.responses.create({
  model: 'deepseek/deepseek-v4-flash-0731',
  input: 'Hello world',
});
```

#### Anthropic Messages

```typescript filename="messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
  defaultHeaders: {
    'x-session-affinity': 'session_123',
  },
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-sonnet-5',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello world' }],
});
```

#### OpenResponses

```typescript filename="openresponses.ts"
const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
    'x-session-affinity': 'session_123',
  },
  body: JSON.stringify({
    model: 'deepseek/deepseek-v4-flash-0731',
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'Hello world',
      },
    ],
  }),
});
```

## Cost tradeoff

On Anthropic, cache writes cost 1.25× the base input rate and cache reads cost 0.1×. The break-even is a single read: one follow-up request that reuses the cached prompt saves 0.9× per token read, more than offsetting the 0.25× write premium. Multi-turn conversations, agents, and tool-use loops re-read everything the previous turn wrote on every turn, so they come out well ahead. For true one-shot requests, where no follow-up ever reads the cache entry, the write premium is a small net cost. If your traffic is strictly one-shot, prefer manual cache markers (or no caching) over `caching: 'auto'`.

> **💡 Note:** To restrict routing to only models that cache automatically (implicit
> caching), use `has: ['implicit-caching']`. See [Model
> Filtering](/docs/ai-gateway/models-and-providers/model-filtering).

## Examples

Use a stable system prompt long enough to meet the model's cache threshold. For a self-contained test, create a synthetic reference file:

```bash filename="Terminal"
awk 'BEGIN { for (i = 1; i <= 400; i++) print "Deployment check " i ": Production deployments require two approving reviewers and all automated checks to pass before release." }' > deployment-runbook.txt
```

The AI SDK does not return a separate cache-hit boolean. A positive cache-read token count confirms that the provider read part of the prompt from cache. A zero count can mean a cache miss, an ineligible prompt, or unavailable provider usage details.

The AI SDK examples below send the same request twice. The second request can read the cached prefix. Provider thresholds and retention windows vary; see [Anthropic prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching). For other API formats, run the example twice without changing the input. The cURL examples use `jq` to read the file into JSON.

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

```typescript filename="automatic-caching.ts"
import { readFileSync } from 'node:fs';
import { generateText } from 'ai';

const system = readFileSync('deployment-runbook.txt', 'utf8');

async function sendRequest() {
  return generateText({
    model: 'anthropic/claude-sonnet-5',
    system,
    prompt: 'What is required before a production deployment?',
    providerOptions: {
      gateway: {
        caching: 'auto',
      },
    },
  });
}

await sendRequest();
const second = await sendRequest();
const cacheReadTokens =
  second.usage.inputTokenDetails.cacheReadTokens ?? 0;

console.log(second.text);
console.log('Cache read tokens:', cacheReadTokens);
console.log('Cache hit:', cacheReadTokens > 0);
```

#### Python (beta)

```python filename="automatic-caching_ai.py"
from pathlib import Path
import asyncio
import ai

async def main():
    system = Path("deployment-runbook.txt").read_text()
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.system_message(system), ai.user_message("What is required before a production deployment?")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"caching": "auto"}}}
    )
    async def send_request(print_text=False):
        async with ai.stream(model, messages, params=params) as stream:
            async for event in stream:
                if print_text and isinstance(event, ai.events.TextDelta):
                    print(event.chunk, end="", flush=True)
        return stream.usage.cache_read_tokens or 0

    await send_request()
    cache_read_tokens = await send_request(print_text=True)
    print()
    print("Cache read tokens:", cache_read_tokens)
    print("Cache hit:", cache_read_tokens > 0)

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="automatic-caching-chat.ts"
import { readFileSync } from 'node:fs';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const system = readFileSync('deployment-runbook.txt', 'utf8');

const response = await client.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'system',
      content: system,
    },
    {
      role: 'user',
      content: 'What is required before a production deployment?',
    },
  ],
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    providerOptions: {
      gateway: {
        caching: 'auto',
      },
    },
  },
});

console.log(response.choices[0]?.message.content);
console.log(
  'Cache read tokens:',
  response.usage?.prompt_tokens_details?.cached_tokens ?? 0,
);
```

#### Python

```python filename="automatic-caching_chat.py"
from pathlib import Path
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

system = Path("deployment-runbook.txt").read_text()

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "system", "content": system}, {"role": "user", "content": "What is required before a production deployment?"}],
    extra_body={"providerOptions": {"gateway": {"caching": "auto"}}},
)

print(response.choices[0].message.content)
print("Cache read tokens:", response.usage.prompt_tokens_details.cached_tokens or 0)
```

#### cURL

```bash filename="automatic-caching-chat.sh"
jq -n --rawfile system deployment-runbook.txt '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [{"role":"system","content":$system},{"role":"user","content":"What is required before a production deployment?"}],
  "providerOptions": {"gateway": {"caching": "auto"}}
}' | curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  --data-binary @-
```

#### Messages API

#### TypeScript

```typescript filename="automatic-caching-messages.ts"
import { readFileSync } from 'node:fs';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const system = readFileSync('deployment-runbook.txt', 'utf8');

const response = await client.messages.create({
  model: 'anthropic/claude-sonnet-5',
  system,
  messages: [
    {
      role: 'user',
      content: 'What is required before a production deployment?',
    },
  ],
  max_tokens: 1024,
  ...{
    providerOptions: {
      gateway: {
        caching: 'auto',
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
console.log('Cache read tokens:', response.usage.cache_read_input_tokens ?? 0);
```

#### Python

```python filename="automatic-caching_messages.py"
from pathlib import Path
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

system = Path("deployment-runbook.txt").read_text()

response = client.messages.create(
    model="anthropic/claude-sonnet-5",
    system=system,
    messages=[{"role": "user", "content": "What is required before a production deployment?"}],
    max_tokens=1024,
    extra_body={"providerOptions": {"gateway": {"caching": "auto"}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
print("Cache read tokens:", response.usage.cache_read_input_tokens or 0)
```

#### cURL

```bash filename="automatic-caching-messages.sh"
jq -n --rawfile system deployment-runbook.txt '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [{"role":"user","content":"What is required before a production deployment?"}], "system": $system, "max_tokens": 1024,
  "providerOptions": {"gateway": {"caching": "auto"}}
}' | curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  --data-binary @-
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="automatic-caching-responses.ts"
import { readFileSync } from 'node:fs';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const system = readFileSync('deployment-runbook.txt', 'utf8');

const response = await client.responses.create({
  model: 'anthropic/claude-sonnet-5',
  instructions: system,
  input: 'What is required before a production deployment?',
  ...{
    providerOptions: {
      gateway: {
        caching: 'auto',
      },
    },
  },
});

console.log(response.output_text);
console.log(
  'Cache read tokens:',
  response.usage?.input_tokens_details.cached_tokens ?? 0,
);
```

#### Python

```python filename="automatic-caching_responses.py"
from pathlib import Path
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

system = Path("deployment-runbook.txt").read_text()

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    instructions=system,
    input="What is required before a production deployment?",
    extra_body={"providerOptions": {"gateway": {"caching": "auto"}}},
)

print(response.output_text)
print("Cache read tokens:", response.usage.input_tokens_details.cached_tokens or 0)
```

#### cURL

```bash filename="automatic-caching-responses.sh"
jq -n --rawfile system deployment-runbook.txt '{
  "model": "anthropic/claude-sonnet-5",
  "input": "What is required before a production deployment?", "instructions": $system,
  "providerOptions": {"gateway": {"caching": "auto"}}
}' | curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  --data-binary @-
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
| Alibaba | Explicit | Adds [cache markers](#how-it-works) |


---

[View full sitemap](/docs/sitemap)
