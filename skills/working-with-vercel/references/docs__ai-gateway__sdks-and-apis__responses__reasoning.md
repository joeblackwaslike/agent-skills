---
title: Reasoning
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/reasoning
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/reasoning"
last_updated: 2026-07-27
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Control how much a model thinks before answering with the OpenAI Responses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/reasoning.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "ef940bbc0532299356708c851e295642d401cd514db09a637cb4dc9bba6abb04"
---

# Reasoning

For models that support reasoning, set the `reasoning` parameter to control how much effort the model spends thinking:

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
