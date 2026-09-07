---
title: Text to Speech
product: vercel
url: /docs/ai-gateway/modalities/text-to-speech
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/text-to-speech"
last_updated: 2026-08-07
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/realtime
  - /docs/ai-gateway/modalities/speech-to-text
summary: Generate spoken audio from text with speech models through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/text-to-speech.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "4f7a532771b066a22ef5739ec1523eefb7efb8a2de8eb8b9e64ed8506b9fbf2a"
---

# Text to Speech

Generate spoken audio from text with speech models such as `openai/tts-1` and `openai/tts-1-hd`. Use this for voiceovers, audio versions of written content, or spoken responses in your app.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Realtime voice, speech, and transcription now supported on AI Gateway](https://vercel.com/changelog/realtime-voice-speech-and-transcription-now-supported-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related)
- [Build realtime voice agents on AI Gateway](https://vercel.com/blog/realtime-voice-agents-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related)
- [xAI Grok audio models now available on Vercel AI Gateway](https://vercel.com/changelog/xai-grok-audio-models-now-available-on-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related)
- [generateSpeech](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-speech?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related)
- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Speech to Text and Text to Speech Quickstart](https://vercel.com/docs/ai-gateway/getting-started/speech?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related) — Generate speech from text and transcribe audio back to text with AI Gateway.
- [Text Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related) — Generate and stream text responses using AI Gateway.
- [Text Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related) — Generate text responses using the OpenResponses API.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/ai-gateway/modalities/text-to-speech.graph.md](/docs/ai-gateway/modalities/text-to-speech.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Ftext-to-speech&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Use this to turn text into spoken audio. For live, two-way voice, see [Realtime](/docs/ai-gateway/modalities/realtime); to transcribe recorded audio, see [Speech to Text](/docs/ai-gateway/modalities/speech-to-text).

> **💡 Note:** Text to speech is in beta and access is rolling out gradually. Speech models
> may not appear in the model catalog yet for your team.

## Generate speech with the AI SDK

Use `experimental_generateSpeech` with a speech model from the AI Gateway provider:

```typescript filename="generate-speech.ts"
import { experimental_generateSpeech as generateSpeech } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { writeFile } from 'node:fs/promises';

const result = await generateSpeech({
  model: gateway.speechModel('openai/tts-1'),
  text: 'Hello! Thanks for trying out AI Gateway.',
  voice: 'alloy',
  outputFormat: 'mp3',
});

await writeFile('greeting.mp3', result.audio.uint8Array);
```

> **💡 Note:** Speech support ships in the stable AI SDK releases. Install it with `pnpm add
>   ai @ai-sdk/gateway`.

### Request options

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

#### cURL

```bash filename="generate-speech.sh"
curl -X POST https://ai-gateway.vercel.sh/v4/ai/speech-model \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "ai-model-id: openai/tts-1" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello! Thanks for trying out AI Gateway.",
    "voice": "alloy",
    "outputFormat": "mp3"
  }' | jq -r '.audio' | base64 -d > greeting.mp3
```

#### TypeScript

```typescript filename="generate-speech-rest.ts"
import { writeFile } from 'node:fs/promises';

const response = await fetch(
  'https://ai-gateway.vercel.sh/v4/ai/speech-model',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
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
