---
title: Text to Speech
product: vercel
url: /docs/ai-gateway/modalities/text-to-speech
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/text-to-speech"
last_updated: 2026-07-28
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "6ee2b3dedf6a04edae1fb4c51acfc852145b84d65388869db836d16f3fc127bc"
---

# Text to Speech

Generate spoken audio from text with speech models such as `openai/tts-1` and `openai/tts-1-hd`. Use this for voiceovers, audio versions of written content, or spoken responses in your app.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [generateSpeech](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-speech?from=related)
- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Speech](https://vercel.com/docs/ai-gateway/getting-started/speech?from=related) — Generate speech from text and transcribe audio back to text with AI Gateway.
- [Text Generation](https://vercel.com/docs/ai-gateway/modalities/text-generation?from=related) — Generate and stream text from hundreds of models through AI Gateway, with tool calling and structured output.
- [Getting Started](https://vercel.com/docs/ai-gateway/getting-started?from=related) — Get started with AI Gateway by generating text, images, video, speech, or transcriptions, or by building realtime voice
- [Text Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation?from=related) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [Text](https://vercel.com/docs/ai-gateway/getting-started/text?from=related) — Generate and stream text responses using AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/modalities/text-to-speech.graph.md](/docs/ai-gateway/modalities/text-to-speech.graph.md)
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
