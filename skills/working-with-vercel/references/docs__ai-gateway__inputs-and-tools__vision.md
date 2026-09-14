---
title: AI Gateway Vision and Image Input
product: vercel
url: /docs/ai-gateway/inputs-and-tools/vision
canonical_url: "https://vercel.com/docs/ai-gateway/inputs-and-tools/vision"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/inputs-and-tools
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/image-generation
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
  - /docs/ai-gateway/sdks-and-apis/ai-sdk-python
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/images
summary: Analyze images with AI Gateway using AI SDK 7, the Python beta, Chat Completions, Messages, and Responses APIs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/inputs-and-tools/vision.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "778ebe9cc24360c30d2f7f4f55cf5df0b0882a50d4066feeef3215d4d82e117b"
---

# AI Gateway Vision and Image Input

Send an image and a question to a vision-capable model to describe a scene, read a chart, or inspect a screenshot. To create or edit images, see [image generation](/docs/ai-gateway/modalities/image-generation).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway File and PDF Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/file-input?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Fvision&source_site=vercel-docs&relationship=related) — Send PDFs and documents to AI Gateway models with examples for each supported SDK and API format.
- [AI Gateway Video Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/video-input?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Fvision&source_site=vercel-docs&relationship=related) — Analyze video clips with AI Gateway using AI SDK 7, Python, Chat Completions, and Responses / OpenResponses.
- [AI Gateway Audio Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/audio-input?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Fvision&source_site=vercel-docs&relationship=related) — Analyze recorded audio with AI Gateway, compare audio input with transcription and realtime voice, and choose a supporte
- [AI Gateway Chat Completions Image Generation Reference](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Fvision&source_site=vercel-docs&relationship=related) — Generate images using AI models that support multimodal output through the Chat Completions API through AI Gateway.
- [Python with AI Gateway: OpenAI and Anthropic SDKs](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Fvision&source_site=vercel-docs&relationship=related) — Use AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.

Full cross-link map for this page: [/docs/ai-gateway/inputs-and-tools/vision.graph.md](/docs/ai-gateway/inputs-and-tools/vision.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Fvision&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Before you start

Set `AI_GATEWAY_API_KEY` and install your [SDK or API client](/docs/ai-gateway/sdks-and-apis#api-format-differences). These examples use AI SDK 7 and the independent Python beta. Save a PNG as `image.png` in your working directory.

Choose a model that supports image input. Check its accepted image types, resolution, and image-count limits before sending a request. A text-only fallback cannot process the same image message.

## Analyze an image

These examples request a description of the local image. The SDK examples print the description; cURL prints the JSON response containing it:

#### AI SDK

#### TypeScript

```typescript filename="vision.ts"
import { readFileSync } from 'node:fs';
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Describe the image in one sentence.' },
        {
          type: 'file',
          data: readFileSync('image.png'),
          mediaType: 'image/png',
        },
      ],
    },
  ],
});

console.log(text);
```

#### Python (beta)

```python filename="vision_ai.py"
import asyncio
from pathlib import Path
import ai


async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [
        ai.user_message(
            "Describe the image in one sentence.",
            ai.file_part(Path("image.png").read_bytes(), media_type="image/png"),
        )
    ]
    async with ai.stream(model, messages) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()


asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="vision-chat.ts"
import { readFileSync } from 'node:fs';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});
const data = readFileSync('image.png').toString('base64');

const response = await client.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Describe the image in one sentence.',
        },
        {
          type: 'image_url',
          image_url: {
            url: `data:image/png;base64,${data}`,
          },
        },
      ],
    },
  ],
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="vision_chat.py"
import base64
import os
from pathlib import Path
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)
data = base64.b64encode(Path("image.png").read_bytes()).decode("ascii")

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Describe the image in one sentence."},
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:image/png;base64,{data}"},
                },
            ],
        }
    ],
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="vision-chat.sh"
FILE_BASE64=$(base64 < image.png | tr -d '\n')

printf '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Describe the image in one sentence."
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/png;base64,%s"
          }
        }
      ]
    }
  ]
}' "$FILE_BASE64" | \
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  --data-binary @-
```

#### Messages API

#### TypeScript

```typescript filename="vision-messages.ts"
import { readFileSync } from 'node:fs';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});
const data = readFileSync('image.png').toString('base64');

const response = await client.messages.create({
  model: 'anthropic/claude-sonnet-5',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Describe the image in one sentence.',
        },
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/png',
            data: data,
          },
        },
      ],
    },
  ],
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="vision_messages.py"
import base64
import os
from pathlib import Path
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)
data = base64.b64encode(Path("image.png").read_bytes()).decode("ascii")

response = client.messages.create(
    model="anthropic/claude-sonnet-5",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Describe the image in one sentence."},
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/png",
                        "data": data,
                    },
                },
            ],
        }
    ],
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="vision-messages.sh"
FILE_BASE64=$(base64 < image.png | tr -d '\n')

printf '{
  "model": "anthropic/claude-sonnet-5",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Describe the image in one sentence."
        },
        {
          "type": "image",
          "source": {
            "type": "base64",
            "media_type": "image/png",
            "data": "%s"
          }
        }
      ]
    }
  ]
}' "$FILE_BASE64" | \
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  --data-binary @-
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="vision-responses.ts"
import { readFileSync } from 'node:fs';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});
const data = readFileSync('image.png').toString('base64');

const response = await client.responses.create({
  model: 'anthropic/claude-sonnet-5',
  input: [
    {
      role: 'user',
      content: [
        {
          type: 'input_text',
          text: 'Describe the image in one sentence.',
        },
        {
          type: 'input_image',
          detail: 'auto',
          image_url: `data:image/png;base64,${data}`,
        },
      ],
    },
  ],
});

console.log(response.output_text);
```

#### Python

```python filename="vision_responses.py"
import base64
import os
from pathlib import Path
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)
data = base64.b64encode(Path("image.png").read_bytes()).decode("ascii")

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input=[
        {
            "role": "user",
            "content": [
                {"type": "input_text", "text": "Describe the image in one sentence."},
                {
                    "type": "input_image",
                    "detail": "auto",
                    "image_url": f"data:image/png;base64,{data}",
                },
            ],
        }
    ],
)

print(response.output_text)
```

#### cURL

```bash filename="vision-responses.sh"
FILE_BASE64=$(base64 < image.png | tr -d '\n')

printf '{
  "model": "anthropic/claude-sonnet-5",
  "input": [
    {
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "Describe the image in one sentence."
        },
        {
          "type": "input_image",
          "detail": "auto",
          "image_url": "data:image/png;base64,%s"
        }
      ]
    }
  ]
}' "$FILE_BASE64" | \
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  --data-binary @-
```

## API format differences

See the AI SDK [file-part guide](https://ai-sdk.dev/docs/foundations/prompts#file-parts) and Python beta [multimodal-message guide](https://ai-python.dev/docs/basics/messages-and-events#add-files-and-multimodal-input) for constructing SDK messages. The table below compares those messages with the HTTP formats.

| Format | Input representation | Details |
| --- | --- | --- |
| AI SDK 7 | `file` part with an `image/*` `mediaType` | The older `image` part is deprecated in SDK 7. See [version compatibility](/docs/ai-gateway/sdks-and-apis/ai-sdk#version-compatibility). |
| AI SDK for Python (beta) | `ai.file_part(..., media_type="image/png")` | Use the independent [Python beta SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk-python). |
| Chat Completions | `image_url` content part | Send an HTTPS URL or data URL. See [image requests](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images). |
| Messages API | `image` content part with `source` | The base64 source carries an explicit `media_type`. See [Messages images](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images). |
| Responses / OpenResponses | `input_image` with `image_url` | See [Responses images](/docs/ai-gateway/sdks-and-apis/responses/images) and [OpenResponses images](/docs/ai-gateway/sdks-and-apis/openresponses/images) for detail controls. |

## Handling larger inputs

Inline base64 increases the request size. Check the selected model's context and file-size limits, and keep any [fallback models](/docs/ai-gateway/models-and-providers/model-fallbacks) compatible with the input type. When using a hosted URL, make sure the provider can retrieve it without your application's browser session.

For request details and failures, inspect [AI Gateway logs](/docs/ai-gateway/observability-and-spend/logs). See [Inputs & Tools](/docs/ai-gateway/inputs-and-tools) to choose another capability.


---

[View full sitemap](/docs/sitemap)
