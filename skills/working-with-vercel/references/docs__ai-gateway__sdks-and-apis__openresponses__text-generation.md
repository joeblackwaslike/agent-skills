---
title: Text Generation
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/text-generation
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation"
last_updated: 2026-05-11
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
summary: Generate text responses using the OpenResponses API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "3be77d7ef336848d8bc6d01061b6b4554454a84e78206cbba6277282980a04a4"
---

# Text Generation

Use the [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) to generate text responses from AI models. The `input` array contains message objects with a `role` (user or assistant) and `content` field. The model processes the input and returns a response with the generated text.

#### \['TypeScript'

```typescript filename="generate.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'openai/gpt-5.5',
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
    model='openai/gpt-5.5',
    input=[
        {
            'type': 'message',
            'role': 'user',
            'content': 'Why do developers prefer dark mode?',
        },
    ],
)

print(response.output[0].content[0].text)
```

## Response format

The response includes the generated text in the `output` array, along with token usage information.

```json
{
  "id": "resp_abc123",
  "object": "response",
  "model": "openai/gpt-5.5",
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
