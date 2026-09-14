---
title: AI Gateway Audio Input
product: vercel
url: /docs/ai-gateway/inputs-and-tools/audio-input
canonical_url: "https://vercel.com/docs/ai-gateway/inputs-and-tools/audio-input"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/inputs-and-tools
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/speech-to-text
  - /docs/ai-gateway/modalities/realtime
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
  - /docs/ai-gateway/sdks-and-apis/ai-sdk-python
summary: Analyze recorded audio with AI Gateway, compare audio input with transcription and realtime voice, and choose a supported API format.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/inputs-and-tools/audio-input.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "e1c7c341033f3c182818c9bbb9e5f8032bb86972a63a66ccf8735128fd97d29c"
---

# AI Gateway Audio Input

Send a recording with a question to a model that can understand audio. Ask for a summary or information from the recording. For a dedicated transcript, use [speech to text](/docs/ai-gateway/modalities/speech-to-text). For a live voice conversation, use [realtime](/docs/ai-gateway/modalities/realtime).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway Video Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/video-input?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Faudio-input&source_site=vercel-docs&relationship=related) — Analyze video clips with AI Gateway using AI SDK 7, Python, Chat Completions, and Responses / OpenResponses.
- [AI Gateway File and PDF Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/file-input?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Faudio-input&source_site=vercel-docs&relationship=related) — Send PDFs and documents to AI Gateway models with examples for each supported SDK and API format.
- [AI Gateway Vision and Image Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/vision?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Faudio-input&source_site=vercel-docs&relationship=related) — Analyze images with AI Gateway using AI SDK 7, the Python beta, Chat Completions, Messages, and Responses APIs.
- [OpenAI Responses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Faudio-input&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [OpenResponses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Faudio-input&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenResponses API through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/inputs-and-tools/audio-input.graph.md](/docs/ai-gateway/inputs-and-tools/audio-input.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools%2Faudio-input&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Before you start

Set `AI_GATEWAY_API_KEY`, install your [SDK or API client](/docs/ai-gateway/sdks-and-apis#api-format-differences), and save a short MP3 recording as `greeting.mp3` in your working directory. These examples use `google/gemini-3.6-flash` and request text output.

Audio support depends on the selected model, provider, and request format. Confirm the accepted encoding, duration, and request-size limits for your route before using longer recordings.

## Ask about a recording

These examples request a summary of the speech in the MP3 file. The SDK examples print the summary; cURL prints the JSON response containing it:

#### AI SDK

#### TypeScript

```typescript filename="audio-input.ts"
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
          text: 'Summarize what the speaker says in one sentence.',
        },
        {
          type: 'file',
          data: readFileSync('greeting.mp3'),
          mediaType: 'audio/mpeg',
        },
      ],
    },
  ],
});

console.log(text);
```

#### Python (beta)

```python filename="audio-input_ai.py"
import asyncio
from pathlib import Path
import ai


async def main():
    model = ai.get_model("google/gemini-3.6-flash")
    messages = [
        ai.user_message(
            "Summarize what the speaker says in one sentence.",
            ai.file_part(Path("greeting.mp3").read_bytes(), media_type="audio/mpeg"),
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

```typescript filename="audio-input-chat.ts"
import { readFileSync } from 'node:fs';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});
const data = readFileSync('greeting.mp3').toString('base64');

const response = await client.chat.completions.create({
  model: 'google/gemini-3.6-flash',
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Summarize what the speaker says in one sentence.',
        },
        {
          type: 'file',
          file: {
            filename: 'greeting.mp3',
            file_data: `data:audio/mpeg;base64,${data}`,
          },
        },
      ],
    },
  ],
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="audio-input_chat.py"
import base64
import os
from pathlib import Path
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)
data = base64.b64encode(Path("greeting.mp3").read_bytes()).decode("ascii")

response = client.chat.completions.create(
    model="google/gemini-3.6-flash",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Summarize what the speaker says in one sentence.",
                },
                {
                    "type": "file",
                    "file": {
                        "filename": "greeting.mp3",
                        "file_data": f"data:audio/mpeg;base64,{data}",
                    },
                },
            ],
        }
    ],
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="audio-input-chat.sh"
FILE_BASE64=$(base64 < greeting.mp3 | tr -d '\n')

printf '{
  "model": "google/gemini-3.6-flash",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Summarize what the speaker says in one sentence."
        },
        {
          "type": "file",
          "file": {
            "filename": "greeting.mp3",
            "file_data": "data:audio/mpeg;base64,%s"
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

```typescript filename="audio-input-responses.ts"
import { readFileSync } from 'node:fs';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});
const data = readFileSync('greeting.mp3').toString('base64');

const response = await client.responses.create({
  model: 'google/gemini-3.6-flash',
  input: [
    {
      role: 'user',
      content: [
        {
          type: 'input_text',
          text: 'Summarize what the speaker says in one sentence.',
        },
        {
          type: 'input_file',
          filename: 'greeting.mp3',
          file_data: `data:audio/mpeg;base64,${data}`,
        },
      ],
    },
  ],
});

console.log(response.output_text);
```

#### Python

```python filename="audio-input_responses.py"
import base64
import os
from pathlib import Path
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)
data = base64.b64encode(Path("greeting.mp3").read_bytes()).decode("ascii")

response = client.responses.create(
    model="google/gemini-3.6-flash",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "Summarize what the speaker says in one sentence.",
                },
                {
                    "type": "input_file",
                    "filename": "greeting.mp3",
                    "file_data": f"data:audio/mpeg;base64,{data}",
                },
            ],
        }
    ],
)

print(response.output_text)
```

#### cURL

```bash filename="audio-input-responses.sh"
FILE_BASE64=$(base64 < greeting.mp3 | tr -d '\n')

printf '{
  "model": "google/gemini-3.6-flash",
  "input": [
    {
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "Summarize what the speaker says in one sentence."
        },
        {
          "type": "input_file",
          "filename": "greeting.mp3",
          "file_data": "data:audio/mpeg;base64,%s"
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
| AI SDK 7 | `file` part with `mediaType: 'audio/mpeg'` | Pass bytes, a data URL, or a supported URL. See [file parts](/docs/ai-gateway/sdks-and-apis/ai-sdk#images-and-file-input). |
| AI SDK for Python (beta) | `ai.file_part(..., media_type="audio/mpeg")` | See [Python file parts](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#images-and-documents). |
| Chat Completions | `file` with `filename` and a `file_data` data URL | AI Gateway maps the file to the Gemini provider. The Chat Completions endpoint rejects `input_audio` parts. Use `file` with a model that accepts audio. |
| Messages API | No audio content part | Use one of the other formats shown here, or [transcribe](/docs/ai-gateway/modalities/speech-to-text) first and send the transcript as text. |
| Responses / OpenResponses | `input_file` with `filename` and a `file_data` data URL | For non-OpenAI models, AI Gateway translates the request through [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses). Native [Responses](/docs/ai-gateway/sdks-and-apis/responses) models have their own input support. |

These examples use AI Gateway's compatible endpoints with a Gemini model. They do not imply that the same file works with every OpenAI model or the direct OpenAI API. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) before changing models or endpoints.

## Handling larger inputs

Inline base64 increases the request size. Check the selected model's context and file-size limits, and keep any [fallback models](/docs/ai-gateway/models-and-providers/model-fallbacks) compatible with the input type. When using a hosted URL, make sure the provider can retrieve it without your application's browser session.

For request details and failures, inspect [AI Gateway logs](/docs/ai-gateway/observability-and-spend/logs). See [Inputs & Tools](/docs/ai-gateway/inputs-and-tools) to choose another capability.


---

[View full sitemap](/docs/sitemap)
