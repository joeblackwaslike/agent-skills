---
title: AI Gateway Video Input
product: vercel
url: /docs/ai-gateway/inputs-and-tools/video-input
canonical_url: "https://vercel.com/docs/ai-gateway/inputs-and-tools/video-input"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/inputs-and-tools
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
  - /docs/ai-gateway/sdks-and-apis/ai-sdk-python
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/images
summary: Analyze video clips with AI Gateway using AI SDK 7, Python, Chat Completions, and Responses / OpenResponses.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/inputs-and-tools/video-input.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "126351cee14d8d39fc11a1994cb6567b16e36281dea6856ddbcf90f47896c653"
---

# AI Gateway Video Input

Send a video clip and a question to a video-capable model to summarize events or inspect a sequence of actions. To create or edit a video, see [video generation](/docs/ai-gateway/modalities/video-generation).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway Audio Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/audio-input?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Fvideo-input&source_site=vercel-docs&relationship=related) — Analyze recorded audio with AI Gateway, compare audio input with transcription and realtime voice, and choose a supporte
- [AI Gateway File and PDF Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/file-input?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Fvideo-input&source_site=vercel-docs&relationship=related) — Send PDFs and documents to AI Gateway models with examples for each supported SDK and API format.
- [OpenAI Responses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Fvideo-input&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [OpenResponses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Fvideo-input&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenResponses API through AI Gateway.
- [AI Gateway Chat Completions Image Generation Reference](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Fvideo-input&source_site=vercel-docs&relationship=related) — Generate images using AI models that support multimodal output through the Chat Completions API through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/inputs-and-tools/video-input.graph.md](/docs/ai-gateway/inputs-and-tools/video-input.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Fvideo-input&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Before you start

Set `AI_GATEWAY_API_KEY`, install your [SDK or API client](/docs/ai-gateway/sdks-and-apis#api-format-differences), and save a short MP4 clip as `boat.mp4` in your working directory. These examples use `google/gemini-3.6-flash` and request text output.

Video support, sampling, duration limits, and audio-track handling depend on the model and provider. Start with a short clip and check the selected model's limits before sending a longer recording.

## Analyze a video

These examples send the MP4 bytes and request a description of the clip. The SDK examples print the description; cURL prints the JSON response containing it:

#### AI SDK

#### TypeScript

```typescript filename="video-input.ts"
import { readFileSync } from 'node:fs';
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'google/gemini-3.6-flash',
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Describe what happens in this video in one sentence.',
        },
        {
          type: 'file',
          data: readFileSync('boat.mp4'),
          mediaType: 'video/mp4',
        },
      ],
    },
  ],
});

console.log(text);
```

#### Python (beta)

```python filename="video-input_ai.py"
import asyncio
from pathlib import Path
import ai


async def main():
    model = ai.get_model("google/gemini-3.6-flash")
    messages = [
        ai.user_message(
            "Describe what happens in this video in one sentence.",
            ai.file_part(Path("boat.mp4").read_bytes(), media_type="video/mp4"),
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

```typescript filename="video-input-chat.ts"
import { readFileSync } from 'node:fs';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});
const data = readFileSync('boat.mp4').toString('base64');

const response = await client.chat.completions.create({
  model: 'google/gemini-3.6-flash',
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Describe what happens in this video in one sentence.',
        },
        {
          type: 'file',
          file: {
            filename: 'boat.mp4',
            file_data: `data:video/mp4;base64,${data}`,
          },
        },
      ],
    },
  ],
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="video-input_chat.py"
import base64
import os
from pathlib import Path
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)
data = base64.b64encode(Path("boat.mp4").read_bytes()).decode("ascii")

response = client.chat.completions.create(
    model="google/gemini-3.6-flash",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Describe what happens in this video in one sentence.",
                },
                {
                    "type": "file",
                    "file": {
                        "filename": "boat.mp4",
                        "file_data": f"data:video/mp4;base64,{data}",
                    },
                },
            ],
        }
    ],
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="video-input-chat.sh"
FILE_BASE64=$(base64 < boat.mp4 | tr -d '\n')

printf '{
  "model": "google/gemini-3.6-flash",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Describe what happens in this video in one sentence."
        },
        {
          "type": "file",
          "file": {
            "filename": "boat.mp4",
            "file_data": "data:video/mp4;base64,%s"
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

#### Responses / OpenResponses

#### TypeScript

```typescript filename="video-input-responses.ts"
import { readFileSync } from 'node:fs';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});
const data = readFileSync('boat.mp4').toString('base64');

const response = await client.responses.create({
  model: 'google/gemini-3.6-flash',
  input: [
    {
      role: 'user',
      content: [
        {
          type: 'input_text',
          text: 'Describe what happens in this video in one sentence.',
        },
        {
          type: 'input_file',
          filename: 'boat.mp4',
          file_data: `data:video/mp4;base64,${data}`,
        },
      ],
    },
  ],
});

console.log(response.output_text);
```

#### Python

```python filename="video-input_responses.py"
import base64
import os
from pathlib import Path
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)
data = base64.b64encode(Path("boat.mp4").read_bytes()).decode("ascii")

response = client.responses.create(
    model="google/gemini-3.6-flash",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "Describe what happens in this video in one sentence.",
                },
                {
                    "type": "input_file",
                    "filename": "boat.mp4",
                    "file_data": f"data:video/mp4;base64,{data}",
                },
            ],
        }
    ],
)

print(response.output_text)
```

#### cURL

```bash filename="video-input-responses.sh"
FILE_BASE64=$(base64 < boat.mp4 | tr -d '\n')

printf '{
  "model": "google/gemini-3.6-flash",
  "input": [
    {
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "Describe what happens in this video in one sentence."
        },
        {
          "type": "input_file",
          "filename": "boat.mp4",
          "file_data": "data:video/mp4;base64,%s"
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
| AI SDK 7 | `file` part with `mediaType: 'video/mp4'` | Pass bytes, a data URL, or a supported URL. See [file parts](/docs/ai-gateway/sdks-and-apis/ai-sdk#images-and-file-input). |
| AI SDK for Python (beta) | `ai.file_part(..., media_type="video/mp4")` | See [Python file parts](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#images-and-documents). |
| Chat Completions | `file` with `filename` and a `file_data` data URL | AI Gateway maps the file to the selected provider. See [file requests](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images#pdf-attachments). |
| Messages API | No video content part | Use another format shown here. For an image-only model, extract selected frames and send them with [vision](/docs/ai-gateway/inputs-and-tools/vision); frame images do not preserve audio or motion. |
| Responses / OpenResponses | `input_file` with `filename` and a `file_data` data URL; OpenResponses also accepts `input_video` with `video_url` | For non-OpenAI models, AI Gateway translates the request through [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses). Native [Responses](/docs/ai-gateway/sdks-and-apis/responses) models have their own input support. |

These examples use AI Gateway's compatible endpoints with a Gemini model. They do not imply that the same file works with every OpenAI model or the direct OpenAI API. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) before changing models or endpoints.

## Handling larger inputs

Inline base64 increases the request size. Check the selected model's context and file-size limits, and keep any [fallback models](/docs/ai-gateway/models-and-providers/model-fallbacks) compatible with the input type. When using a hosted URL, make sure the provider can retrieve it without your application's browser session.

For request details and failures, inspect [AI Gateway logs](/docs/ai-gateway/observability-and-spend/logs). See [Inputs & Tools](/docs/ai-gateway/inputs-and-tools) to choose another capability.


---

[View full sitemap](/docs/sitemap)
