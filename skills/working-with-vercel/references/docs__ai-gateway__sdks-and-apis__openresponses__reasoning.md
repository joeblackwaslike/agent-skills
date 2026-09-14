---
title: OpenResponses Reasoning with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/reasoning
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/reasoning"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs
  - /docs/ai-gateway/sdks-and-apis/openresponses/streaming
summary: Control how much a reasoning model thinks before answering with the OpenResponses API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/reasoning.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "a86f5713009acda760d2c68d7b601abffc7b398abfa53c64294ff2f4a99fc782"
---

# OpenResponses Reasoning with AI Gateway

Reasoning models work through a problem before answering. With the [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses), set the `reasoning` object to control how much thinking the model does. AI Gateway translates it to each provider's native reasoning configuration, so the same request shape works across providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenAI Responses Reasoning with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Freasoning&source_site=vercel-docs&relationship=related) — Control how much a model thinks before answering with the OpenAI Responses API through AI Gateway.
- [OpenAI Chat Completions Reasoning with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Freasoning&source_site=vercel-docs&relationship=related) — Control how much a model thinks before answering with the OpenAI Chat Completions API through AI Gateway.
- [AI Gateway OpenAI Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Freasoning&source_site=vercel-docs&relationship=related) — Configure reasoning and thinking for OpenAI models with the AI SDK and AI Gateway.
- [Anthropic Messages Extended Thinking with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Freasoning&source_site=vercel-docs&relationship=related) — Configure how much Claude thinks before answering, using the Anthropic Messages API thinking parameter through AI Gatewa
- [AI Gateway Amazon Bedrock Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Freasoning&source_site=vercel-docs&relationship=related) — Configure reasoning for models hosted on Amazon Bedrock with the AI SDK and AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses/reasoning.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses/reasoning.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Freasoning&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### TypeScript

```typescript filename="reasoning.ts" {18-20}
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'openai/gpt-6-astra',
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

#### Python

```python filename="reasoning.py" {22-24}
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
        "model": "openai/gpt-6-astra",
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

#### cURL

```bash filename="reasoning.sh" {13-15}
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
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

## Effort levels

Set `reasoning.effort` to request relative reasoning depth. The HTTP schema accepts `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, and `max`. Choose a model-supported value from the `effort` entry in [`GET /v1/models`](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support). The catalog doesn't provide a structured default.

AI Gateway translates shared effort for the serving provider. Some routes map it to token budgets or a smaller set of native levels. In cross-provider translation, `max` can map to `xhigh`; Anthropic adaptive thinking can retain `max`. See [API-format differences](/docs/ai-gateway/models-and-providers/reasoning#reasoning-levels) and [provider-specific options](/docs/ai-gateway/models-and-providers/reasoning#provider-specific-configuration) when exact native control matters.

## Reasoning summaries

Set `reasoning.summary` to `auto` to ask for a readable summary of the model's thinking alongside the answer:

```json {2-5}
{
  "reasoning": {
    "effort": "low",
    "summary": "auto"
  }
}
```

## Reading the response

When the provider reports reasoning, the `output` array can contain a `reasoning` item and `usage` can report reasoning tokens:

```typescript {3}
const result = await response.json();

const reasoning = result.output.find(
  (item: { type: string }) => item.type === 'reasoning',
);
const message = result.output.find(
  (item: { type: string }) => item.type === 'message',
);

console.log(result.usage.output_tokens_details.reasoning_tokens);
for (const block of message.content) {
  if (block.type === 'output_text') console.log(block.text);
}
```

> **💡 Note:** The raw chain of thought isn't returned. A `reasoning` item may carry an
> `encrypted_content` field rather than readable text, so treat it as an opaque
> value to pass back rather than something to display. Use `summary: "auto"`
> to request readable text on models that support summaries. An empty summary
> doesn't prove that reasoning was disabled.

## Next steps

- [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) - Per-provider configuration and the full effort reference
- [Structured outputs](/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs) - Constrain the answer to a schema
- [Streaming](/docs/ai-gateway/sdks-and-apis/openresponses/streaming) - Stream tokens as they're generated


---

[View full sitemap](/docs/sitemap)
