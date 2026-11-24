---
title: "AI Gateway Caching: Prompt Caching and Response Caching"
product: vercel
url: /docs/ai-gateway/models-and-providers/automatic-caching
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/automatic-caching"
last_updated: 2026-09-11
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/session-affinity
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis/rest-api
  - /docs/ai-gateway/models-and-providers/model-filtering
  - /docs/ai-gateway/sdks-and-apis
summary: Reduce cost and latency with AI Gateway caching. Enable automatic prompt caching across providers with one option, and cache full responses in your...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/models-and-providers/automatic-caching.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "91fa09c785eee0feb41a2027115742466890fcfd6460dd47ae6067b274eb93f5"
---

# AI Gateway Caching: Prompt Caching and Response Caching

Use prompt caching with AI Gateway to lower the cost of requests that repeat part of an earlier prompt. To reuse a full response, cache it in your application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway logs now show session affinity](https://vercel.com/changelog/ai-gateway-logs-now-show-session-affinity)
- [Ember-1 from Fireworks now available on AI Gateway](https://vercel.com/changelog/ember-1-from-fireworks-now-available-on-ai-gateway)
- [GPT-6.1 Terra now available on AI Gateway](https://vercel.com/changelog/gpt-6-1-terra-now-available-on-ai-gateway)
- [Cost-aware model routing with Vercel AI Gateway](https://vercel.com/kb/guide/cost-aware-model-routing-with-ai-gateway) — Send easy requests to a lower-cost model and escalate only the complex ones to a frontier model through AI Gateway, with
- [Dynamic Prompt Caching](https://ai-sdk.dev/cookbook/node/dynamic-prompt-caching) — Learn how to reduce API costs by implementing dynamic prompt caching for Anthropic models using cache control directives
- [How to control AI provider data handling with AI Gateway](https://vercel.com/kb/guide/control-ai-provider-data) — Prevent AI providers from training on your prompts, enforce zero data retention, and restrict providers and models with
- [Agent configuration (agent.ts)](https://eve.dev/docs/agent-config) — Configure an eve agent's model, reasoning effort, compaction, limits, and runtime behavior in agent.ts.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/automatic-caching.graph.md](/docs/ai-gateway/models-and-providers/automatic-caching.graph.md)
<!-- /docsgraph:related -->

| Caching type     | What it does                                                                                                                                                                                                         | How to use it                                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prompt caching   | The provider stores a repeated prompt prefix, such as a system prompt, a document, or earlier conversation turns. Requests that reuse the prefix pay the provider's reduced cache-read rate for those input tokens. Some providers charge more than the base input rate to write a cache entry. See [Cost tradeoff](#cost-tradeoff). | Set `caching: 'auto'`. AI Gateway applies the right strategy for each provider. See [How it works](#how-it-works).                                                         |
| Response caching | Your application stores a full response and returns it for an identical request without calling the model.                                                                                                           | AI Gateway doesn't store prompts or responses, so the cache lives in your application. See [Cache responses in your application](#cache-responses-in-your-application). |

Prompt caching applies when requests share a prefix, even when the rest of the prompt differs, as long as the prefix meets the provider's minimum length and the cache entry hasn't expired. That covers multi-turn chat, agents, and repeated questions about the same document. Response caching applies only when the entire request repeats.

Some providers like Anthropic and MiniMax require explicit cache control markers to enable prompt caching, while others like OpenAI, Google, and DeepSeek cache automatically (sometimes called "implicit caching"). Use `caching: 'auto'` to let AI Gateway handle this for you. It applies the appropriate caching strategy based on the provider.

To keep each conversation on the provider that already holds its cache, see [Session affinity](/docs/ai-gateway/models-and-providers/session-affinity).

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

The field accepts `5m` (five minutes) or `1h` (one hour). AI Gateway applies the selected lifetime to every automatic breakpoint, including a breakpoint created by `cache_anchor_items`. The field has no effect unless you also set `caching: 'auto'` at the top level of the same request, as in the example above. AI Gateway ignores `cache_ttl` when you set caching only through `providerOptions.gateway.caching`.

Anthropic charges a higher cache-write rate for the one-hour lifetime than for the five-minute default, and the cache-read rate is the same for both. Cache rates vary by model. For a model's current cache-read and cache-write prices, open the model in the [AI Gateway models list](/ai-gateway/models), or read `pricing.input_cache_read` and `pricing.input_cache_write` from the [`GET /v1/models` endpoint](/docs/ai-gateway/sdks-and-apis/rest-api#list-models).

Use one hour for long-running agents and conversations that commonly pause for more than five minutes. Keep the five-minute default when requests normally continue within five minutes.

`cache_ttl` is advisory. AI Gateway uses the default lifetime for unsupported values and never rejects the request because of the hint. The response includes an `unsupported` warning in `provider_metadata.gateway.warnings`:

```json
{
  "provider_metadata": {
    "gateway": {
      "warnings": [
        {
          "type": "unsupported",
          "feature": "cache_ttl",
          "details": "Unsupported cache_ttl; the hint was ignored."
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

The anchor only applies when you set `caching: 'auto'` at the top level of the same request. AI Gateway ignores the anchor when you set caching only through `providerOptions.gateway.caching`. Like the other markers, the anchor only modifies requests to explicit-caching providers.

## Improve cache hits with session affinity

Send the same `x-session-affinity` header with related requests so AI Gateway can forward it to the selected provider. Providers that support session affinity can use the value to preserve prompt-cache locality.

Use an opaque, stable value for each conversation, agent run, or related workflow. Don't include personal data in the value or reuse one value across unrelated sessions. AI Gateway also uses the header to keep a conversation on the provider that holds its cache. For how that works, including how it interacts with your routing settings, see [Session affinity](/docs/ai-gateway/models-and-providers/session-affinity). The header doesn't guarantee a cache hit.

### Add the header with the AI SDK

Pass `x-session-affinity` to each AI SDK call with the `headers` option:

```typescript filename="generate-text.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'deepseek/deepseek-v4-flash-0731',
  prompt: 'Hello world',
  headers: {
    'x-session-affinity': 'sess_8f3KQ2vXr9mT',
  },
});
```

### Add the header to compatibility API requests

AI Gateway forwards `x-session-affinity` through its OpenAI-compatible, Anthropic-compatible, and OpenResponses API formats. Set it as a default SDK client header or include it directly in each HTTP request:

#### Chat Completions

```typescript filename="chat-completions.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
  defaultHeaders: {
    'x-session-affinity': 'sess_8f3KQ2vXr9mT',
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
    'x-session-affinity': 'sess_8f3KQ2vXr9mT',
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
    'x-session-affinity': 'sess_8f3KQ2vXr9mT',
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
    'x-session-affinity': 'sess_8f3KQ2vXr9mT',
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

On Anthropic, a cache write costs more than the base input rate and a cache read costs a fraction of it. Cache rates vary by model, so check a model's cache-read and cache-write prices in the [AI Gateway models list](/ai-gateway/models) or in the `pricing` object from the [`GET /v1/models` endpoint](/docs/ai-gateway/sdks-and-apis/rest-api#list-models).

The break-even is a single read, because one follow-up request that reuses the cached prompt saves more per token than the write premium costs. Multi-turn conversations, agents, and tool-use loops re-read everything the previous turn wrote on every turn, so they come out well ahead. For true one-shot requests, where no follow-up ever reads the cache entry, the write premium is a small net cost. If your traffic is strictly one-shot, prefer manual cache markers (or no caching) over `caching: 'auto'`.

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

## Caching in virtual models

Pin `caching: 'auto'` on a [virtual model](/docs/ai-gateway/models-and-providers/virtual-models) to cache repeated prompt prefixes for its traffic, or set it to `@default` to drop the request's choice and apply the system default.

## Cache responses in your application

AI Gateway doesn't cache responses. AI Gateway [doesn't retain prompt or response content](/docs/ai-gateway/faq#does-vercel-train-on-my-prompts-or-store-my-data) after a request completes, so there's no stored response to return. To skip the model call when a request repeats, store the response in your application and key it on the model and the full request. A request served from your cache doesn't reach AI Gateway, so it uses no tokens and doesn't appear in [Logs](/docs/ai-gateway/observability-and-spend/logs).

These examples keep responses in memory and send the same request twice. The second call returns the stored response, so both lines print the same text. In production, use a shared store such as Redis and set an expiry for how long a response stays valid.

#### AI SDK

```typescript filename="response-cache.ts"
import {
  gateway,
  generateText,
  wrapLanguageModel,
  type LanguageModelMiddleware,
} from 'ai';

const cache = new Map<string, unknown>();

const cacheMiddleware: LanguageModelMiddleware = {
  specificationVersion: 'v4',
  wrapGenerate: async ({ doGenerate, params, model }) => {
    const key = JSON.stringify({ modelId: model.modelId, params });
    if (!cache.has(key)) cache.set(key, await doGenerate());
    return cache.get(key) as Awaited<ReturnType<typeof doGenerate>>;
  },
};

const model = wrapLanguageModel({
  model: gateway('anthropic/claude-sonnet-5'),
  middleware: cacheMiddleware,
});

const prompt = 'Describe a red bicycle in one sentence.';
const first = await generateText({ model, prompt });
const second = await generateText({ model, prompt });

console.log(first.text);
console.log(second.text);
```

This middleware caches `generateText` calls. To cache streamed responses too, add `wrapStream` as shown in the [AI SDK caching guide](https://ai-sdk.dev/docs/advanced/caching).

#### Python

```python filename="response_cache.py"
import hashlib
import json
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)
cache = {}


def cached_completion(**request):
    key = hashlib.sha256(json.dumps(request, sort_keys=True).encode()).hexdigest()
    if key not in cache:
        response = client.chat.completions.create(**request)
        cache[key] = response.choices[0].message.content
    return cache[key]


request = {
    "model": "anthropic/claude-sonnet-5",
    "messages": [{"role": "user", "content": "Describe a red bicycle in one sentence."}],
}

print(cached_completion(**request))
print(cached_completion(**request))
```

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
