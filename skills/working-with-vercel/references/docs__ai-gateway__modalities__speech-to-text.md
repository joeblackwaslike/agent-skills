---
title: Speech to Text
product: vercel
url: /docs/ai-gateway/modalities/speech-to-text
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/speech-to-text"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/realtime
  - /docs/ai-gateway/modalities/text-to-speech
summary: Learn about speech to text on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/speech-to-text.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "391837d16b008b432b5653e2d94b16d0e170c77e3fa5d101aa9d211c441cfa71"
---

# Speech to Text

Transcribe recorded audio into text with transcription models such as `openai/whisper-1` and `openai/gpt-4o-transcribe`. Use this for voice notes, call recordings, podcast transcripts, or any audio file you already have.

Use this for audio you already have. For live, two-way voice, see [Realtime](/docs/ai-gateway/modalities/realtime); to turn text into spoken audio, see [Text to Speech](/docs/ai-gateway/modalities/text-to-speech).

> **💡 Note:** Speech to text is in beta and access is rolling out gradually. Transcription
> models may not appear in the model catalog yet for your team.

## Transcribe with the AI SDK

Use `experimental_transcribe` with a transcription model from the AI Gateway provider. The audio can be a `Buffer`, `Uint8Array`, base64 string, or `URL`:

```typescript filename="transcribe.ts"
import { experimental_transcribe as transcribe } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { readFile } from 'node:fs/promises';

const result = await transcribe({
  model: gateway.transcriptionModel('openai/whisper-1'),
  audio: await readFile('meeting.mp3'),
});

console.log(result.text);
console.log(`Audio duration: ${result.durationInSeconds} seconds`);
```

The result includes:

- `text`: The full transcript.
- `segments`: Timestamped segments of the transcript, when the model provides them.
- `language`: The detected language of the audio.
- `durationInSeconds`: The duration of the input audio.
- `warnings`: Any warnings from the provider, such as unsupported options.

> **💡 Note:** Transcription support in the AI Gateway provider is available on the canary
> releases of the AI SDK. Install them with `pnpm add ai@canary
>   @ai-sdk/gateway@canary`.

## Transcribe with the REST API

You can also call the transcription endpoint directly. Send a `POST` request with the model in the `ai-model-id` header and the audio as a base64-encoded string:

#### cURL

```bash filename="transcribe.sh"
curl -X POST https://ai-gateway.vercel.sh/v4/ai/transcription-model \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "ai-model-id: openai/whisper-1" \
  -H "Content-Type: application/json" \
  -d "{
    \"audio\": \"$(base64 -i meeting.mp3)\",
    \"mediaType\": \"audio/mpeg\"
  }"
```

#### TypeScript

```typescript filename="transcribe-rest.ts"
import { readFile } from 'node:fs/promises';

const audio = await readFile('meeting.mp3');

const response = await fetch(
  'https://ai-gateway.vercel.sh/v4/ai/transcription-model',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      'ai-model-id': 'openai/whisper-1',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      audio: audio.toString('base64'),
      mediaType: 'audio/mpeg',
    }),
  },
);

const result = await response.json();
console.log(result.text);
```

The response is a JSON object:

```json filename="response.json"
{
  "text": "Welcome to the meeting. Let's get started.",
  "segments": [],
  "language": "en",
  "durationInSeconds": 4.2,
  "warnings": []
}
```

## Provider options

Pass provider-specific options through `providerOptions`. For example, request word-level timestamps from OpenAI models:

```typescript filename="transcribe-options.ts" {8-12}
import { experimental_transcribe as transcribe } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { readFile } from 'node:fs/promises';

const result = await transcribe({
  model: gateway.transcriptionModel('openai/whisper-1'),
  audio: await readFile('meeting.mp3'),
  providerOptions: {
    openai: {
      timestampGranularities: ['word'],
    },
  },
});
```

## Limitations

- Audio is sent base64-encoded in a JSON body. Multipart file uploads are not supported.
- Responses are not streamed. The full transcript returns in a single JSON response.
- Speech to text supports OpenAI transcription models only.


---

[View full sitemap](/docs/sitemap)
