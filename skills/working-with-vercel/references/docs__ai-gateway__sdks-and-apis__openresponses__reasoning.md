---
title: Reasoning
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/reasoning
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/reasoning"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs
  - /docs/ai-gateway/sdks-and-apis/openresponses/streaming
summary: Control how much a reasoning model thinks before answering with the OpenResponses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/reasoning.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "c57b7bf1f3bb7d74ace22b435ba4af8efeaa8f958226b9ad19d329d1f07b55ce"
---

# Reasoning

Reasoning models work through a problem before answering. With the [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses), set the `reasoning` object to control how much thinking the model does. AI Gateway translates it to each provider's native reasoning configuration, so the same request shape works across providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Reasoning](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/reasoning?from=related) — Control how much a model thinks before answering with the OpenAI Responses API.
- [Reasoning](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning?from=related) — Control how much a model thinks before answering with the OpenAI Chat Completions API.
- [Reasoning](https://ai-sdk.dev/docs/ai-sdk-core/reasoning?from=related)
- [OpenAI](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/openai?from=related) — Configure reasoning and thinking for OpenAI models with the AI SDK and AI Gateway.
- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related)
- [Extended Thinking](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning?from=related) — Configure how much Claude thinks before answering, using the Anthropic Messages API thinking parameter.
- [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses/reasoning.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses/reasoning.graph.md)
<!-- /docsgraph:related -->

#### \['cURL'

```bash filename="reasoning.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": "A bat and ball cost $1.10. The bat costs $1 more than the ball. How much is the ball?"
      }
    ],
    "reasoning": {
      "effort": "high"
    }
  }'
```

#### 'TypeScript'

```typescript filename="reasoning.ts" {17-19}
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'openai/gpt-5.6-sol',
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'A bat and ball cost $1.10. The bat costs $1 more than the ball. How much is the ball?',
      },
    ],
    reasoning: {
      effort: 'high',
    },
  }),
});

const result = await response.json();
console.log(result.usage.output_tokens_details.reasoning_tokens);
```

#### 'Python']

```python filename="reasoning.py" {19-21}
import os

import requests

api_key = os.environ["AI_GATEWAY_API_KEY"]

response = requests.post(
    "https://ai-gateway.vercel.sh/v1/responses",
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    },
    json={
        "model": "openai/gpt-5.6-sol",
        "input": [
            {
                "type": "message",
                "role": "user",
                "content": "A bat and ball cost $1.10. The bat costs $1 more than the ball. How much is the ball?",
            }
        ],
        "reasoning": {
            "effort": "high",
        },
    },
)

result = response.json()
print(result["usage"]["output_tokens_details"]["reasoning_tokens"])
```

## Effort levels

`reasoning.effort` controls how much the model thinks before answering. Higher effort costs more tokens and takes longer:

| Level | Use it for |
| ----- | ---------- |
| `low` | Simple tasks and latency-sensitive work |
| `medium` | A balance of speed and depth |
| `high` | Complex reasoning, difficult coding, agentic tasks |

Which levels a model accepts varies. See [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) for the per-provider support matrix, including the levels above and below these three that some models add.

## Reasoning summaries

Set `reasoning.summary` to `auto` to ask for a readable summary of the model's thinking alongside the answer:

```json
{
  "reasoning": {
    "effort": "low",
    "summary": "auto"
  }
}
```

## Reading the response

Thinking appears in two places. The `output` array carries a `reasoning` item before the answer message, and `usage` reports how many tokens went to thinking:

```typescript
const result = await response.json();

const reasoning = result.output.find((item) => item.type === 'reasoning');
const message = result.output.find((item) => item.type === 'message');

console.log(result.usage.output_tokens_details.reasoning_tokens);
console.log(message.content[0].text);
```

> **💡 Note:** The raw chain of thought isn't returned. A `reasoning` item may carry an
> `encrypted_content` field rather than readable text, so treat it as an opaque
> value to pass back rather than something to display. Use `summary: "auto"`
> when you want text you can show.

## Next steps

- [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) - Per-provider configuration and the full effort reference
- [Structured outputs](/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs) - Constrain the answer to a schema
- [Streaming](/docs/ai-gateway/sdks-and-apis/openresponses/streaming) - Stream tokens as they're generated


---

[View full sitemap](/docs/sitemap)
