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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "9027a01887530b5df1563d75fe8daab51149133664fc9b4bcbd5de7f7a4a0e2e"
---

# Text Generation

Set your SDK's base URL to AI Gateway and use your API key for authentication:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Text Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation?from=related) — Generate text responses using the OpenResponses API.
- [Text](https://vercel.com/docs/ai-gateway/getting-started/text?from=related) — Generate and stream text responses using AI Gateway.
- [Text Generation](https://vercel.com/docs/ai-gateway/modalities/text-generation?from=related) — Generate and stream text from hundreds of models through AI Gateway, with tool calling and structured output.
- [Text to Speech](https://vercel.com/docs/ai-gateway/modalities/text-to-speech?from=related) — Generate spoken audio from text with speech models through Vercel AI Gateway.
- [Getting Started](https://vercel.com/docs/ai-gateway/getting-started?from=related) — Get started with AI Gateway by generating text, images, video, speech, or transcriptions, or by building realtime voice

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses/text-generation.graph.md](/docs/ai-gateway/sdks-and-apis/responses/text-generation.graph.md)
<!-- /docsgraph:related -->

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
