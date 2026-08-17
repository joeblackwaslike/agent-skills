---
title: Reasoning
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/reasoning
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/reasoning"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Control how much a model thinks before answering with the OpenAI Responses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/reasoning.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "5d9622fdaa5856ec747b37ef678dcfd8b8528ad11f85c018757ffdfac4f7c970"
---

# Reasoning

For models that support reasoning, set the `reasoning` parameter to control how much effort the model spends thinking:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Reasoning](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/reasoning?from=related) — Control how much a reasoning model thinks before answering with the OpenResponses API.
- [OpenAI](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/openai?from=related) — Configure reasoning and thinking for OpenAI models with the AI SDK and AI Gateway.
- [Reasoning](https://ai-sdk.dev/docs/ai-sdk-core/reasoning?from=related)
- [Reasoning](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning?from=related) — Control how much a model thinks before answering with the OpenAI Chat Completions API.
- [Amazon Bedrock](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/amazon-bedrock?from=related) — Configure reasoning for models hosted on Amazon Bedrock with the AI SDK and AI Gateway.
- [Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning?from=related) — Enable reasoning and extended thinking across providers with the AI SDK and AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses/reasoning.graph.md](/docs/ai-gateway/sdks-and-apis/responses/reasoning.graph.md)
<!-- /docsgraph:related -->

#### \['cURL'

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

#### 'TypeScript'

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

#### 'Python']

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

The `effort` parameter accepts `none`, `minimal`, `low`, `medium`, `high`, or `xhigh`. AI Gateway maps this to provider-specific reasoning settings.


---

[View full sitemap](/docs/sitemap)
