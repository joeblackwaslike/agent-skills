---
title: Text Generation
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/text-generation
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  []
summary: Generate text responses with the OpenAI Responses API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "eb0c7e379427ba5a63bde8f791d4e4772992e9bf176b6808eae9b4c5a9e6999f"
---

# Text Generation

Set your SDK's base URL to AI Gateway and use your API key for authentication:

#### \['cURL'

```bash filename="basic.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-5",
    "input": "What is the capital of France?"
  }'
```

#### 'TypeScript'

```typescript filename="basic.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-sonnet-5',
  input: 'What is the capital of France?',
});

console.log(response.output_text);
```

#### 'Python']

```python filename="basic.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='anthropic/claude-sonnet-5',
    input='What is the capital of France?',
)

print(response.output_text)
```


---

[View full sitemap](/docs/sitemap)
