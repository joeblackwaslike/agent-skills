---
title: AI Gateway File and PDF Input
product: vercel
url: /docs/ai-gateway/inputs-and-tools/file-input
canonical_url: "https://vercel.com/docs/ai-gateway/inputs-and-tools/file-input"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/inputs-and-tools
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/inputs-and-tools/vision
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
  - /docs/ai-gateway/sdks-and-apis/ai-sdk-python
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/images
summary: Send PDFs and documents to AI Gateway models with examples for each supported SDK and API format.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/inputs-and-tools/file-input.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "40a581db1a021e313f9f5d4e52f233caf101ff13e1b11e8aef6b4c7f0a0a77da"
---

# AI Gateway File and PDF Input

Send a document with a question to summarize its contents or extract information. These examples send a PDF directly in the request. For photos and screenshots, see [vision](/docs/ai-gateway/inputs-and-tools/vision).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway Video Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/video-input?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Ffile-input&source_site=vercel-docs&relationship=related) — Analyze video clips with AI Gateway using AI SDK 7, Python, Chat Completions, and Responses / OpenResponses.
- [AI Gateway Audio Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/audio-input?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Ffile-input&source_site=vercel-docs&relationship=related) — Analyze recorded audio with AI Gateway, compare audio input with transcription and realtime voice, and choose a supporte
- [OpenAI Responses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Ffile-input&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [OpenResponses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Ffile-input&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenResponses API through AI Gateway.
- [Python with AI Gateway: OpenAI and Anthropic SDKs](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Ffile-input&source_site=vercel-docs&relationship=related) — Use AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.

Full cross-link map for this page: [/docs/ai-gateway/inputs-and-tools/file-input.graph.md](/docs/ai-gateway/inputs-and-tools/file-input.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Ffile-input&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Before you start

Set `AI_GATEWAY_API_KEY`, install your [SDK or API client](/docs/ai-gateway/sdks-and-apis#api-format-differences), and save a PDF as `document.pdf` in your working directory. Use a model that supports PDF input.

File support depends on the model and provider. A `file` part does not make every document format compatible. Extract text from unsupported office documents before sending it as a text part. For scanned pages, choose a model that can also interpret the page images.

## Summarize a PDF

These examples send the PDF bytes and request a summary. The SDK examples print the summary; cURL prints the JSON response containing it:

#### AI SDK

#### TypeScript

```typescript filename="file-input.ts"
import { readFileSync } from 'node:fs';
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Summarize this document in one sentence.' },
        {
          type: 'file',
          data: readFileSync('document.pdf'),
          mediaType: 'application/pdf',
        },
      ],
    },
  ],
});

console.log(text);
```

#### Python (beta)

```python filename="file-input_ai.py"
import asyncio
from pathlib import Path
import ai


async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [
        ai.user_message(
            "Summarize this document in one sentence.",
            ai.file_part(
                Path("document.pdf").read_bytes(), media_type="application/pdf"
            ),
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

```typescript filename="file-input-chat.ts"
import { readFileSync } from 'node:fs';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});
const data = readFileSync('document.pdf').toString('base64');

const response = await client.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Summarize this document in one sentence.',
        },
        {
          type: 'file',
          file: {
            filename: 'document.pdf',
            file_data: `data:application/pdf;base64,${data}`,
          },
        },
      ],
    },
  ],
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="file-input_chat.py"
import base64
import os
from pathlib import Path
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)
data = base64.b64encode(Path("document.pdf").read_bytes()).decode("ascii")

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Summarize this document in one sentence."},
                {
                    "type": "file",
                    "file": {
                        "filename": "document.pdf",
                        "file_data": f"data:application/pdf;base64,{data}",
                    },
                },
            ],
        }
    ],
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="file-input-chat.sh"
FILE_BASE64=$(base64 < document.pdf | tr -d '\n')

printf '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Summarize this document in one sentence."
        },
        {
          "type": "file",
          "file": {
            "filename": "document.pdf",
            "file_data": "data:application/pdf;base64,%s"
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

```typescript filename="file-input-messages.ts"
import { readFileSync } from 'node:fs';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});
const data = readFileSync('document.pdf').toString('base64');

const response = await client.messages.create({
  model: 'anthropic/claude-sonnet-5',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Summarize this document in one sentence.',
        },
        {
          type: 'document',
          source: {
            type: 'base64',
            media_type: 'application/pdf',
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

```python filename="file-input_messages.py"
import base64
import os
from pathlib import Path
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)
data = base64.b64encode(Path("document.pdf").read_bytes()).decode("ascii")

response = client.messages.create(
    model="anthropic/claude-sonnet-5",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Summarize this document in one sentence."},
                {
                    "type": "document",
                    "source": {
                        "type": "base64",
                        "media_type": "application/pdf",
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

```bash filename="file-input-messages.sh"
FILE_BASE64=$(base64 < document.pdf | tr -d '\n')

printf '{
  "model": "anthropic/claude-sonnet-5",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Summarize this document in one sentence."
        },
        {
          "type": "document",
          "source": {
            "type": "base64",
            "media_type": "application/pdf",
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

```typescript filename="file-input-responses.ts"
import { readFileSync } from 'node:fs';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});
const data = readFileSync('document.pdf').toString('base64');

const response = await client.responses.create({
  model: 'anthropic/claude-sonnet-5',
  input: [
    {
      role: 'user',
      content: [
        {
          type: 'input_text',
          text: 'Summarize this document in one sentence.',
        },
        {
          type: 'input_file',
          filename: 'document.pdf',
          file_data: `data:application/pdf;base64,${data}`,
        },
      ],
    },
  ],
});

console.log(response.output_text);
```

#### Python

```python filename="file-input_responses.py"
import base64
import os
from pathlib import Path
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)
data = base64.b64encode(Path("document.pdf").read_bytes()).decode("ascii")

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "Summarize this document in one sentence.",
                },
                {
                    "type": "input_file",
                    "filename": "document.pdf",
                    "file_data": f"data:application/pdf;base64,{data}",
                },
            ],
        }
    ],
)

print(response.output_text)
```

#### cURL

```bash filename="file-input-responses.sh"
FILE_BASE64=$(base64 < document.pdf | tr -d '\n')

printf '{
  "model": "anthropic/claude-sonnet-5",
  "input": [
    {
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "Summarize this document in one sentence."
        },
        {
          "type": "input_file",
          "filename": "document.pdf",
          "file_data": "data:application/pdf;base64,%s"
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
| AI SDK 7 | `file` part with `mediaType: 'application/pdf'` | Pass bytes, a data URL, or a supported URL. See [file parts](/docs/ai-gateway/sdks-and-apis/ai-sdk#images-and-file-input). |
| AI SDK for Python (beta) | `ai.file_part(..., media_type="application/pdf")` | See [Python file parts](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#images-and-documents). |
| Chat Completions | `file` with `filename` and a `file_data` data URL | AI Gateway maps the file to the selected provider. See [file requests](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images#pdf-attachments). |
| Messages API | `document` with a base64 PDF `source` | See [Messages documents](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images). |
| Responses / OpenResponses | `input_file` with `filename` and a `file_data` data URL | For non-OpenAI models, AI Gateway translates the request through [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses). Native [Responses](/docs/ai-gateway/sdks-and-apis/responses) models have their own input support. |

## Handling larger inputs

Inline base64 increases the request size. Check the selected model's context and file-size limits, and keep any [fallback models](/docs/ai-gateway/models-and-providers/model-fallbacks) compatible with the input type. When using a hosted URL, make sure the provider can retrieve it without your application's browser session.

For request details and failures, inspect [AI Gateway logs](/docs/ai-gateway/observability-and-spend/logs). See [Inputs & Tools](/docs/ai-gateway/inputs-and-tools) to choose another capability.


---

[View full sitemap](/docs/sitemap)
