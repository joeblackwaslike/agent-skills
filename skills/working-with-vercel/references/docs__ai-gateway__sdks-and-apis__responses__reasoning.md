---
title: OpenAI Responses Reasoning with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/reasoning
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/reasoning"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/models-and-providers/reasoning
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis/openresponses
summary: Control how much a model thinks before answering with the OpenAI Responses API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/reasoning.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "f9e2ac92f903bc546a142f824c19dd01a4258490b8890960df6adbd215596ca3"
---

# OpenAI Responses Reasoning with AI Gateway

For models that support reasoning, set the `reasoning` parameter to control how much effort the model spends thinking:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenResponses Reasoning with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Freasoning&source_site=vercel-docs&relationship=related) — Control how much a reasoning model thinks before answering with the OpenResponses API through AI Gateway.
- [AI Gateway OpenAI Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Freasoning&source_site=vercel-docs&relationship=related) — Configure reasoning and thinking for OpenAI models with the AI SDK and AI Gateway.
- [AI Gateway supports OpenAI's Responses API](https://vercel.com/changelog/ai-gateway-supports-openais-responses-api?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Freasoning&source_site=vercel-docs&relationship=related)
- [OpenAI Chat Completions Reasoning with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Freasoning&source_site=vercel-docs&relationship=related) — Control how much a model thinks before answering with the OpenAI Chat Completions API through AI Gateway.
- [AI Gateway Amazon Bedrock Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Freasoning&source_site=vercel-docs&relationship=related) — Configure reasoning for models hosted on Amazon Bedrock with the AI SDK and AI Gateway.
- [Anthropic Messages Extended Thinking with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Freasoning&source_site=vercel-docs&relationship=related) — Configure how much Claude thinks before answering, using the Anthropic Messages API thinking parameter through AI Gatewa

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses/reasoning.graph.md](/docs/ai-gateway/sdks-and-apis/responses/reasoning.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Freasoning&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### TypeScript

```typescript filename="reasoning.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-sonnet-5',
  input: 'Explain the Monty Hall problem step by step.',
  reasoning: {
    effort: 'high',
  },
  max_output_tokens: 2048,
});

console.log(response.output_text);
```

#### Python

```python filename="reasoning.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='anthropic/claude-sonnet-5',
    input='Explain the Monty Hall problem step by step.',
    reasoning={
        'effort': 'high',
    },
    max_output_tokens=2048,
)

print(response.output_text)
```

#### cURL

```bash filename="reasoning.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-5",
    "input": "Explain the Monty Hall problem step by step.",
    "reasoning": {
      "effort": "high"
    },
    "max_output_tokens": 2048
  }'
```

Use [catalog discovery](/docs/ai-gateway/models-and-providers/reasoning#discover-model-reasoning-support) to find the selected model's `reasoning_options`. The HTTP request schema accepts `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, and `max`, but each model supports its own subset. Don't infer defaults from a model family.

OpenAI models can use [native Responses routing](/docs/ai-gateway/sdks-and-apis/responses); other models use [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses). Cross-provider translation can map effort to a different native level or a token budget. AI SDK 7's shorthand doesn't accept `max`; see the [format mapping](/docs/ai-gateway/models-and-providers/reasoning#reasoning-levels).

To inspect reasoning, check returned usage and reasoning items where available. A successful answer or an echoed `reasoning.effort` value alone doesn't prove the provider applied that exact level.


---

[View full sitemap](/docs/sitemap)
