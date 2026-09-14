---
title: AI Gateway Text to Speech
product: vercel
url: /docs/ai-gateway/modalities/text-to-speech
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/text-to-speech"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/realtime
  - /docs/ai-gateway/modalities/speech-to-text
  - /docs/ai-gateway/sdks-and-apis/ai-sdk-python
summary: Generate spoken audio from text with speech models through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/text-to-speech.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "be32809c3b99084789faa5b25db1096c359334c2d887962ca39fc24de4e5dc85"
---

# AI Gateway Text to Speech

Generate spoken audio from text with speech models such as `openai/tts-1` and `openai/tts-1-hd`. Use this for voiceovers, audio versions of written content, or spoken responses in your app.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Realtime voice, speech, and transcription now supported on AI Gateway](https://vercel.com/changelog/realtime-voice-speech-and-transcription-now-supported-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related)
- [Build realtime voice agents on AI Gateway](https://vercel.com/blog/realtime-voice-agents-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related)
- [AI Gateway Speech Quickstart: Transcription and TTS](https://vercel.com/docs/ai-gateway/getting-started/speech?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related) — Generate speech and transcribe it using AI Gateway.
- [AI Gateway Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related) — Generate and stream text responses using AI Gateway.
- [OpenAI Responses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [OpenResponses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related) — Generate text responses using the OpenResponses API through AI Gateway.
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/modalities/text-to-speech.graph.md](/docs/ai-gateway/modalities/text-to-speech.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Use this to turn text into spoken audio. For live, two-way voice, see [Realtime](/docs/ai-gateway/modalities/realtime); to transcribe recorded audio, see [Speech to Text](/docs/ai-gateway/modalities/speech-to-text).

> **💡 Note:** Text to speech is in beta and access is rolling out gradually. Speech models
> may not appear in the model catalog yet for your team.

## Generate speech with the AI SDK

For SDK options and result types, see [AI SDK speech](https://ai-sdk.dev/docs/ai-sdk-core/speech) and [Python speech](https://ai-python.dev/docs/basics/model-operations#generate-speech).

Use `generateSpeech` with a speech model from the AI Gateway provider:

#### TypeScript

```typescript filename="generate-speech.ts"
import { generateSpeech } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { writeFile } from 'node:fs/promises';

const result = await generateSpeech({
  model: gateway.speechModel('openai/tts-1'),
  text: 'Hello! Thanks for trying out AI Gateway.',
  voice: 'alloy',
  outputFormat: 'mp3',
});

await writeFile('greeting.mp3', result.audio.uint8Array);

console.log("Saved greeting.mp3");
```

#### Python (beta)

```python filename="generate-speech.py"
import asyncio
import ai
import base64
from pathlib import Path

async def main():
    result = await ai.ops.generate_audio(
        ai.get_model('openai/tts-1'),
        'Hello! Thanks for trying out AI Gateway.',
        params=ai.ops.AudioParams(voice="alloy", output_format="mp3"),
    )
    audio = result.value[0]
    data = audio.data if isinstance(audio.data, bytes) else base64.b64decode(audio.data)
    Path("greeting.mp3").write_bytes(data)
    print("Saved greeting.mp3")

asyncio.run(main())
```

> **💡 Note:** Speech support ships in the stable AI SDK releases. Install it with `pnpm add
>   ai @ai-sdk/gateway`.

The Python examples use the [AI SDK for Python beta](/docs/ai-gateway/sdks-and-apis/ai-sdk-python). These audio operations use dedicated AI Gateway endpoints. They are separate from Chat Completions, Messages, and Responses. See the [Python SDK setup](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#installation) for installation requirements.

## Request options

| Option         | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| `text`         | The text to convert to speech. Required.                                 |
| `voice`        | The voice to use, such as `alloy`. Available voices depend on the model. |
| `outputFormat` | The audio format, such as `mp3` or `wav`.                                |
| `instructions` | Directions for how the model should speak, such as tone or pacing.      |
| `speed`        | Playback speed. Defaults to 1.                                           |
| `language`     | The language of the input text.                                          |

Support for each option varies by model. Unsupported options are reported in `warnings` on the result instead of failing the request.

## Generate speech with the REST API

You can also call the speech endpoint directly. Send a `POST` request with the model in the `ai-model-id` header. The response contains the audio as a base64-encoded string:

#### TypeScript

```typescript filename="generate-speech-rest.ts"
import { writeFile } from 'node:fs/promises';

const response = await fetch(
  'https://ai-gateway.vercel.sh/v4/ai/speech-model',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      'ai-gateway-protocol-version': '0.0.1',
      'ai-speech-model-specification-version': '4',
      'ai-model-id': 'openai/tts-1',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: 'Hello! Thanks for trying out AI Gateway.',
      voice: 'alloy',
      outputFormat: 'mp3',
    }),
  },
);

const result = await response.json();
await writeFile('greeting.mp3', Buffer.from(result.audio, 'base64'));

console.log("Saved greeting.mp3");
```

#### Python

```python filename="request.py"
import json
import os
import urllib.request

request = urllib.request.Request(
    'https://ai-gateway.vercel.sh/v4/ai/speech-model',
    data=json.dumps({'text': 'Hello! Thanks for trying out AI Gateway.', 'voice': 'alloy', 'outputFormat': 'mp3'}).encode(),
    headers={'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"], 'ai-gateway-protocol-version': '0.0.1', 'ai-speech-model-specification-version': '4', 'ai-model-id': 'openai/tts-1', 'Content-Type': 'application/json'},
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="generate-speech.sh"
set -euo pipefail

curl --fail-with-body -X POST https://ai-gateway.vercel.sh/v4/ai/speech-model \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "ai-gateway-protocol-version: 0.0.1" \
  -H "ai-speech-model-specification-version: 4" \
  -H "ai-model-id: openai/tts-1" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello! Thanks for trying out AI Gateway.",
    "voice": "alloy",
    "outputFormat": "mp3"
  }' | jq -r '.audio' | base64 -d > greeting.mp3

if [ -s greeting.mp3 ]; then echo "Saved greeting.mp3"; else exit 1; fi
```

The response is a JSON object with the base64-encoded audio:

```json filename="response.json"
{
  "audio": "SUQzBAAAAAAA...",
  "warnings": []
}
```

## Limitations

- Audio returns base64-encoded in a JSON response. Streaming audio output is not supported.
- Text to speech supports OpenAI speech models only.


---

[View full sitemap](/docs/sitemap)
