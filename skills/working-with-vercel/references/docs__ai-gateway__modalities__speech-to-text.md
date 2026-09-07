---
title: Speech to Text
product: vercel
url: /docs/ai-gateway/modalities/speech-to-text
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/speech-to-text"
last_updated: 2026-08-27
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/realtime
  - /docs/ai-gateway/modalities/text-to-speech
summary: Transcribe audio files into text with transcription models through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/speech-to-text.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "8e71c1e99895ef42f959b2c358726f30b3d1564a1b672dd205562b9f0ead578d"
---

# Speech to Text

Transcribe recorded audio into text with transcription models such as `openai/whisper-1`, `openai/gpt-4o-transcribe`, and `google/gemini-3.5-transcribe`. Use this for voice notes, call recordings, podcast transcripts, or any audio file you already have. Browse available models on the [AI Gateway Models page](/ai-gateway/models?modality=audio:transcription).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway now supports streaming transcription](https://vercel.com/changelog/ai-gateway-now-supports-streaming-transcription?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fspeech-to-text&source_site=vercel-docs&relationship=related)
- [Realtime voice, speech, and transcription now supported on AI Gateway](https://vercel.com/changelog/realtime-voice-speech-and-transcription-now-supported-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fspeech-to-text&source_site=vercel-docs&relationship=related)
- [Gemini 3.5 Transcribe now available on AI Gateway](https://vercel.com/changelog/gemini-3-5-transcribe-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fspeech-to-text&source_site=vercel-docs&relationship=related)
- [Build realtime voice agents on AI Gateway](https://vercel.com/blog/realtime-voice-agents-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fspeech-to-text&source_site=vercel-docs&relationship=related)
- [ElevenLabs](https://ai-sdk.dev/providers/ai-sdk-providers/elevenlabs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fspeech-to-text&source_site=vercel-docs&relationship=related)
- [Cartesia](https://ai-sdk.dev/providers/ai-sdk-providers/cartesia?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fspeech-to-text&source_site=vercel-docs&relationship=related)
- [experimental_streamTranscribe](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-transcribe?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fspeech-to-text&source_site=vercel-docs&relationship=related)
- [xAI Grok audio models now available on Vercel AI Gateway](https://vercel.com/changelog/xai-grok-audio-models-now-available-on-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fspeech-to-text&source_site=vercel-docs&relationship=related)
- [Speech to Text and Text to Speech Quickstart](https://vercel.com/docs/ai-gateway/getting-started/speech?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fspeech-to-text&source_site=vercel-docs&relationship=related) — Generate speech from text and transcribe audio back to text with AI Gateway.
- [Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fspeech-to-text&source_site=vercel-docs&relationship=related) — Generate and stream text responses using AI Gateway.
- [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fspeech-to-text&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fspeech-to-text&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/ai-gateway/modalities/speech-to-text.graph.md](/docs/ai-gateway/modalities/speech-to-text.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fspeech-to-text&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

For live audio, use [streaming transcription](#streaming-transcription) to get transcript updates as audio arrives. For live, two-way voice, see [Realtime](/docs/ai-gateway/modalities/realtime); to turn text into spoken audio, see [Text to Speech](/docs/ai-gateway/modalities/text-to-speech).

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

> **💡 Note:** Transcription support requires recent releases of the AI SDK: `ai` 7.0.31 and
> `@ai-sdk/gateway` 4.0.23 or later. Install them with `pnpm add ai@latest @ai-sdk/gateway@latest`.

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

Streaming transcription is available for models such as `openai/gpt-realtime-whisper`, `spacexai/grok-stt`, and `google/gemini-3.5-transcribe-live`. To find models that support it, filter the [AI Gateway Models page](/ai-gateway/models?modality=audio:transcription\&features=websockets) by WebSockets. See the AI SDK [streaming transcription docs](https://ai-sdk.dev/docs/ai-sdk-core/transcription#streaming-transcription) for the full API, including stream part types and provider options.

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

- Audio for the REST API is sent base64-encoded in a JSON body. Multipart file uploads are not supported.
- The REST API returns the full transcript in a single JSON response. To stream results, use `experimental_streamTranscribe` with the AI SDK.
- Recorded audio and streaming support different model sets. Browse [transcription models](/ai-gateway/models?modality=audio:transcription) and add the [WebSockets filter](/ai-gateway/models?modality=audio:transcription\&features=websockets) to see which models support streaming.


---

[View full sitemap](/docs/sitemap)
