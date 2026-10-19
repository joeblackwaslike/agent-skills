---
title: AI Gateway Speech to Text
product: vercel
url: /docs/ai-gateway/modalities/speech-to-text
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/speech-to-text"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/realtime
  - /docs/ai-gateway/modalities/text-to-speech
  - /docs/ai-gateway/sdks-and-apis/ai-sdk-python
summary: Transcribe audio files into text with transcription models through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/speech-to-text.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "4c4597413ea6445f37ed04518e67bc462a4803751640a7e3de63cdf2437ee5be"
---

# AI Gateway Speech to Text

Transcribe recorded audio into text with transcription models such as `openai/whisper-1`, `openai/gpt-4o-transcribe`, `google/gemini-3.5-transcribe`, and `microsoft/mai-transcribe-2`. Use this for voice notes, call recordings, podcast transcripts, or any audio file you already have. Browse available models on the [AI Gateway Models page](/ai-gateway/models?modality=audio:transcription).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway now supports streaming transcription](https://vercel.com/changelog/ai-gateway-now-supports-streaming-transcription)
- [Realtime voice, speech, and transcription now supported on AI Gateway](https://vercel.com/changelog/realtime-voice-speech-and-transcription-now-supported-on-ai-gateway)
- [Gemini 3.5 Transcribe now available on AI Gateway](https://vercel.com/changelog/gemini-3-5-transcribe-now-available-on-ai-gateway)
- [ElevenLabs](https://ai-sdk.dev/providers/ai-sdk-providers/elevenlabs) — Learn how to use the ElevenLabs provider for the AI SDK.
- [Build realtime voice agents on AI Gateway](https://vercel.com/blog/realtime-voice-agents-on-ai-gateway)
- [Microsoft AI models are now available on AI Gateway](https://vercel.com/changelog/microsoft-ai-models-are-now-available-on-ai-gateway)
- [transcribe](https://ai-sdk.dev/docs/reference/ai-sdk-core/transcribe) — API Reference for transcribe.
- [experimental_streamTranscribe](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-transcribe) — API Reference for experimental_streamTranscribe.

Full cross-link map for this page: [/docs/ai-gateway/modalities/speech-to-text.graph.md](/docs/ai-gateway/modalities/speech-to-text.graph.md)
<!-- /docsgraph:related -->

For live audio, use [streaming transcription](#streaming-transcription) to get transcript updates as audio arrives. For live, two-way voice, see [Realtime](/docs/ai-gateway/modalities/realtime); to turn text into spoken audio, see [Text to Speech](/docs/ai-gateway/modalities/text-to-speech).

> **💡 Note:** Speech to text is in beta and access is rolling out gradually. Transcription
> models may not appear in the model catalog yet for your team.

## Transcribe with the AI SDK

For SDK options and result types, see [AI SDK transcription](https://ai-sdk.dev/docs/ai-sdk-core/transcription) and [Python transcription](https://ai-python.dev/docs/basics/model-operations#transcribe-audio).

Use `transcribe` with a transcription model from the AI Gateway provider. The audio can be a `Buffer`, `Uint8Array`, base64 string, or `URL`:

#### TypeScript

```typescript filename="transcribe.ts"
import { transcribe } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { readFile } from 'node:fs/promises';

const result = await transcribe({
  model: gateway.transcriptionModel('openai/whisper-1'),
  audio: await readFile('meeting.mp3'),
});

console.log(result.text);
console.log(`Audio duration: ${result.durationInSeconds} seconds`);
```

#### Python (beta)

```python filename="transcribe.py"
import asyncio
import ai
from pathlib import Path

async def main():
    result = await ai.ops.transcribe(
        ai.get_model('openai/whisper-1'),
        Path("meeting.mp3").read_bytes(),
    )
    print(result.value.text)

asyncio.run(main())
```

The result includes:

- `text`: The full transcript.
- `segments`: Timestamped segments of the transcript, when the model provides them.
- `language`: The detected language of the audio.
- `durationInSeconds`: The duration of the input audio.
- `warnings`: Any warnings from the provider, such as unsupported options.

> **💡 Note:** Transcription support requires recent releases of the AI SDK: `ai` 7.0.31 and
> `@ai-sdk/gateway` 4.0.23 or later. Install them with `pnpm add ai@latest @ai-sdk/gateway@latest`.

The Python examples use the [AI SDK for Python beta](/docs/ai-gateway/sdks-and-apis/ai-sdk-python). These audio operations use dedicated AI Gateway endpoints. They are separate from Chat Completions, Messages, and Responses. See the [Python SDK setup](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#installation) for installation requirements.

## Streaming transcription

For live audio, use `experimental_streamTranscribe` to receive transcript updates before the audio stream is complete. AI Gateway connects to the model over a WebSocket and streams results back as the provider produces them.

Pass raw audio as a `ReadableStream` and set `inputAudioFormat` to match the chunks you send:

```typescript filename="stream-transcribe.ts"
import { experimental_streamTranscribe as streamTranscribe } from 'ai';
import { gateway } from '@ai-sdk/gateway';

const result = streamTranscribe({
  model: gateway.transcriptionModel('openai/gpt-realtime-whisper'),
  audio: audioStream, // ReadableStream<Uint8Array | string>
  inputAudioFormat: { type: 'audio/pcm', rate: 24000 },
});

for await (const part of result.fullStream) {
  if (part.type === 'transcript-delta') {
    process.stdout.write(part.delta);
  }

  if (part.type === 'transcript-final') {
    console.log('final:', part.text);
  }
}

console.log(await result.text);
```

Streaming transcription is available for models such as `openai/gpt-realtime-whisper`, `spacexai/grok-stt`, `google/gemini-3.5-transcribe-live`, and `microsoft/mai-transcribe-2-streaming`. To find models that support it, filter the [AI Gateway Models page](/ai-gateway/models?modality=audio:transcription\&features=websockets) by WebSockets. See the AI SDK [streaming transcription docs](https://ai-sdk.dev/docs/ai-sdk-core/transcription#streaming-transcription) for the full API, including stream part types and provider options.

### Stream from the browser

Add a server route that mints a short-lived client secret with `gateway.experimental_transcription.getToken`, so your API key never reaches the client. The token is single use, expires after 60 seconds by default (300 seconds maximum), and only opens streaming transcription connections for the model it was minted for:

```typescript filename="app/api/transcription/token/route.ts"
import { gateway } from '@ai-sdk/gateway';

export async function POST() {
  const { token, url } = await gateway.experimental_transcription.getToken({
    model: 'openai/gpt-realtime-whisper',
  });

  return Response.json({ token, url });
}
```

In the browser, create a gateway provider with the token as the API key and stream as usual:

```typescript filename="transcribe-client.ts"
import { experimental_streamTranscribe as streamTranscribe } from 'ai';
import { createGateway } from '@ai-sdk/gateway';

const { token } = await fetch('/api/transcription/token', {
  method: 'POST',
}).then((res) => res.json());

const gateway = createGateway({ apiKey: token });

const result = streamTranscribe({
  model: gateway.transcriptionModel('openai/gpt-realtime-whisper'),
  audio: microphoneStream, // ReadableStream<Uint8Array | string>
  inputAudioFormat: { type: 'audio/pcm', rate: 24000 },
});
```

## Transcribe with the REST API

You can also call the transcription endpoint directly. Send a `POST` request with the model in the `ai-model-id` header and the audio as a base64-encoded string:

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
      'ai-gateway-protocol-version': '0.0.1',
      'ai-transcription-model-specification-version': '4',
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

#### Python

```python filename="request.py"
import json
import os
import urllib.request
import base64
from pathlib import Path

request = urllib.request.Request(
    'https://ai-gateway.vercel.sh/v4/ai/transcription-model',
    data=json.dumps({'audio': base64.b64encode(Path("meeting.mp3").read_bytes()).decode(), 'mediaType': 'audio/mpeg'}).encode(),
    headers={'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"], 'ai-gateway-protocol-version': '0.0.1', 'ai-transcription-model-specification-version': '4', 'ai-model-id': 'openai/whisper-1', 'Content-Type': 'application/json'},
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="transcribe.sh"
curl -X POST https://ai-gateway.vercel.sh/v4/ai/transcription-model \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "ai-gateway-protocol-version: 0.0.1" \
  -H "ai-transcription-model-specification-version: 4" \
  -H "ai-model-id: openai/whisper-1" \
  -H "Content-Type: application/json" \
  -d "{
    \"audio\": \"$(base64 -i meeting.mp3)\",
    \"mediaType\": \"audio/mpeg\"
  }"
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
import { transcribe } from 'ai';
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

console.log(result.text);
```

AI Gateway serves Microsoft models through Azure, so their options go under `providerOptions.azure`. For example, request word timestamps, speaker labels, and a clean transcript from `microsoft/mai-transcribe-2`:

```typescript filename="transcribe-microsoft.ts" {8-15}
import { transcribe } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { readFile } from 'node:fs/promises';

const result = await transcribe({
  model: gateway.transcriptionModel('microsoft/mai-transcribe-2'),
  audio: await readFile('meeting.mp3'),
  providerOptions: {
    azure: {
      timestamps: 'word',
      transcribeStyle: 'clean',
      diarization: { enabled: true },
      phraseList: { phrases: ['Vercel', 'AI Gateway'] },
    },
  },
});

console.log(result.text);
```

Speaker IDs and word timing are in `result.providerMetadata.azure.phrases`. `microsoft/mai-transcribe-1.5` supports only `locales` and `phraseList`. Both models accept WAV, MP3, FLAC, and Ogg/Opus audio, but not WebM or MP4. For more options, see the [AI SDK Azure transcription documentation](https://ai-sdk.dev/providers/ai-sdk-providers/azure#mai-transcribe).

## Limitations

- Audio for the REST API is sent base64-encoded in a JSON body. Multipart file uploads are not supported.
- The REST API returns the full transcript in a single JSON response. To stream results, use `experimental_streamTranscribe` with the AI SDK.
- Recorded audio and streaming support different model sets. Browse [transcription models](/ai-gateway/models?modality=audio:transcription) and add the [WebSockets filter](/ai-gateway/models?modality=audio:transcription\&features=websockets) to see which models support streaming.
- Microsoft transcription models reject unsupported options, such as `timestamps` on `microsoft/mai-transcribe-1.5`, with a 400 error.


---

[View full sitemap](/docs/sitemap)
