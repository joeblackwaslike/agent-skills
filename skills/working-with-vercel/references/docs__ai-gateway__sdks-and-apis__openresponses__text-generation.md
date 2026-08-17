---
title: Text Generation
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/text-generation
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
summary: Generate text responses using the OpenResponses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "63d8f915611ccfaea28768a36b17fca90eddd133e4ae1d544a27100b3cbf3ab4"
---

# Text Generation

Use the [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) to generate text responses from AI models. The `input` array contains message objects with a `role` (user or assistant) and `content` field. The model processes the input and returns a response with the generated text.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Text Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation?from=related) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [Text Generation](https://vercel.com/docs/ai-gateway/modalities/text-generation?from=related) — Generate and stream text from hundreds of models through AI Gateway, with tool calling and structured output.
- [Text](https://vercel.com/docs/ai-gateway/getting-started/text?from=related) — Generate and stream text responses using AI Gateway.
- [OpenAI Responses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses?from=related) — Use the OpenAI Responses API with AI Gateway to generate text, call tools, stream tokens, and more across any supported
- [Images](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/images?from=related) — Send images and PDF documents for analysis using the OpenResponses API.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses/text-generation.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses/text-generation.graph.md)
<!-- /docsgraph:related -->

#### \['cURL'

```bash filename="text-generation.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": "Why do developers prefer dark mode?"
      }
    ]
  }'
```

#### 'TypeScript'

```typescript filename="generate.ts"
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
        content: 'Why do developers prefer dark mode?',
      },
    ],
  }),
});

const result = await response.json();
```

#### 'Python']

```python filename="generate.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='openai/gpt-5.6-sol',
    input=[
        {
            'type': 'message',
            'role': 'user',
            'content': 'Why do developers prefer dark mode?',
        },
    ],
)

message = next(item for item in response.output if item.type == 'message')
print(message.content[0].text)
```

## Response format

The response includes the generated text in the `output` array, along with token usage information.

```json
{
  "id": "resp_abc123",
  "object": "response",
  "model": "openai/gpt-5.6-sol",
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
