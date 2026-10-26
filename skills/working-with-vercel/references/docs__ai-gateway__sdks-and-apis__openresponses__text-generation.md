---
title: OpenResponses Text Generation with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/text-generation
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
summary: Generate text responses using the OpenResponses API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "030b6a66f6f1b3561018e9a191af5672dc70b0ff6f7d39b9e176038dd9f3b0e6"
---

# OpenResponses Text Generation with AI Gateway

Use the [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) to generate text responses from AI models. The `input` array contains message objects with a `role` (user or assistant) and `content` field. The model processes the input and returns a response with the generated text.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenResponses API now supported on Vercel AI Gateway](https://vercel.com/changelog/openresponses-api-now-supported-on-vercel-ai-gateway)
- [OpenAI Responses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [AI Gateway supports OpenAI's Responses API](https://vercel.com/changelog/ai-gateway-supports-openais-responses-api)
- [OpenAI Responses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses) — Use the OpenAI Responses API with AI Gateway to generate text, call tools, stream tokens, and more across any supported
- [OpenResponses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/images) — Send images and PDF documents for analysis using the OpenResponses API through AI Gateway.
- [AI Gateway Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text) — Generate and stream text responses using AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses/text-generation.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses/text-generation.graph.md)
<!-- /docsgraph:related -->

#### TypeScript

```typescript filename="generate.ts"
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
        content: 'Why do developers prefer dark mode?',
      },
    ],
  }),
});

const result = await response.json();
```

#### Python

```python filename="generate.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='openai/gpt-6-astra',
    input=[
        {
            'type': 'message',
            'role': 'user',
            'content': 'Why do developers prefer dark mode?',
        },
    ],
)

message = next(item for item in response.output if item.type == 'message')
for block in message.content:
    if block.type == "output_text":
        print(block.text)
```

#### cURL

```bash filename="text-generation.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": "Why do developers prefer dark mode?"
      }
    ]
  }'
```

## Response format

The response includes the generated text in the `output` array, along with token usage information.

```json
{
  "id": "resp_abc123",
  "object": "response",
  "model": "openai/gpt-6-astra",
  "output": [
    {
      "type": "message",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "Habit and aesthetics reinforce the preference, but ergonomics and contrast are the primary drivers."
        }
      ]
    }
  ],
  "usage": {
    "input_tokens": 14,
    "output_tokens": 18
  }
}
```


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
