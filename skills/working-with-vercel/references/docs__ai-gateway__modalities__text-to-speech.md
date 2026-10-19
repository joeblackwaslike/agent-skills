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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "e873318f419ccdf126433a2ee068428560a5930c22fd0bfc11242146b5c268ab"
---

# AI Gateway Text to Speech

Generate spoken audio from text with Google, Microsoft, and OpenAI speech models. Use this for voiceovers, audio versions of written content, or spoken responses in your app.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Gemini 3.8 text-to-speech models now available on AI Gateway](https://vercel.com/changelog/gemini-3-8-text-to-speech-models-now-available-on-ai-gateway)
- [Realtime voice, speech, and transcription now supported on AI Gateway](https://vercel.com/changelog/realtime-voice-speech-and-transcription-now-supported-on-ai-gateway)
- [generateSpeech](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-speech) — API Reference for generateSpeech.
- [Build realtime voice agents on AI Gateway](https://vercel.com/blog/realtime-voice-agents-on-ai-gateway)
- [Microsoft AI models are now available on AI Gateway](https://vercel.com/changelog/microsoft-ai-models-are-now-available-on-ai-gateway)
- [AI Gateway Audio Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/audio-input) — Analyze recorded audio with AI Gateway, compare audio input with transcription and realtime voice, and choose a supporte
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 400+ models.

Full cross-link map for this page: [/docs/ai-gateway/modalities/text-to-speech.graph.md](/docs/ai-gateway/modalities/text-to-speech.graph.md)
<!-- /docsgraph:related -->

Use this to turn text into spoken audio. For live, two-way voice, see [Realtime](/docs/ai-gateway/modalities/realtime); to transcribe recorded audio, see [Speech to Text](/docs/ai-gateway/modalities/speech-to-text).

> **💡 Note:** Text to speech is in beta and access is rolling out gradually. Speech models
> may not appear in the model catalog yet for your team.

## Supported models

| Provider | Model ID |
| --- | --- |
| Google | `google/gemini-3.8-flash-lite-tts` |
| Google | `google/gemini-3.8-flash-tts` |
| Microsoft | `microsoft/mai-voice-2` |
| Microsoft | `microsoft/mai-voice-2-flash` |
| Microsoft | `microsoft/mai-voice-2.1` |
| Microsoft | `microsoft/mai-voice-2.1-flash` |
| OpenAI | `openai/tts-1` |
| OpenAI | `openai/tts-1-hd` |

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

### Generate speech with Google

Use either `google/gemini-3.8-flash-lite-tts` or `google/gemini-3.8-flash-tts` with `gateway.speechModel()`. Both support single-voice narration and two-speaker dialogue.

Choose a prebuilt voice such as `Kore`, `Puck`, `Zephyr`, or `Charon`. Voice names are case-sensitive, and the default is `Kore`. Set `instructions` to control delivery without changing the spoken text:

```typescript filename="generate-google-speech.ts"
import { generateSpeech } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { writeFile } from 'node:fs/promises';

const result = await generateSpeech({
  model: gateway.speechModel('google/gemini-3.8-flash-lite-tts'),
  text: 'Welcome to the audio edition.',
  voice: 'Kore',
  instructions: 'Warm, relaxed, and speaking slowly',
  outputFormat: 'wav',
});

await writeFile('greeting.wav', result.audio.uint8Array);

console.log('Saved greeting.wav');
```

```javascript filename="generate-google-speech.js"
import { generateSpeech } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { writeFile } from 'node:fs/promises';

const result = await generateSpeech({
  model: gateway.speechModel('google/gemini-3.8-flash-lite-tts'),
  text: 'Welcome to the audio edition.',
  voice: 'Kore',
  instructions: 'Warm, relaxed, and speaking slowly',
  outputFormat: 'wav',
});

await writeFile('greeting.wav', result.audio.uint8Array);

console.log('Saved greeting.wav');
```

Google returns WAV audio by default. Save `result.audio.uint8Array` directly as it already includes the WAV header. Gemini 3.8 also supports `pcm`, `mulaw`, and `alaw` through `outputFormat`.

### Generate dialogue with Google

For two-speaker dialogue, configure voices and structured `turns` under `providerOptions.google`. Set `text` to an empty string because `turns` supplies the transcript. Each turn's `speechMetadata.speaker` must match a configured speaker:

```typescript filename="generate-google-dialogue.ts"
import { generateSpeech } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { writeFile } from 'node:fs/promises';

const result = await generateSpeech({
  model: gateway.speechModel('google/gemini-3.8-flash-tts'),
  text: '',
  outputFormat: 'wav',
  providerOptions: {
    google: {
      multiSpeakerVoiceConfig: {
        speakerVoiceConfigs: [
          {
            speaker: 'Host',
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          {
            speaker: 'Guest',
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
          },
        ],
      },
      turns: [
        {
          text: 'What are we exploring today?',
          speechMetadata: { speaker: 'Host', style: 'curious' },
        },
        {
          text: 'How to turn text into spoken audio.',
          speechMetadata: { speaker: 'Guest', style: 'cheerful' },
        },
      ],
    },
  },
});

await writeFile('dialogue.wav', result.audio.uint8Array);

console.log('Saved dialogue.wav');
```

```javascript filename="generate-google-dialogue.js"
import { generateSpeech } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { writeFile } from 'node:fs/promises';

const result = await generateSpeech({
  model: gateway.speechModel('google/gemini-3.8-flash-tts'),
  text: '',
  outputFormat: 'wav',
  providerOptions: {
    google: {
      multiSpeakerVoiceConfig: {
        speakerVoiceConfigs: [
          {
            speaker: 'Host',
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          {
            speaker: 'Guest',
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
          },
        ],
      },
      turns: [
        {
          text: 'What are we exploring today?',
          speechMetadata: { speaker: 'Host', style: 'curious' },
        },
        {
          text: 'How to turn text into spoken audio.',
          speechMetadata: { speaker: 'Guest', style: 'cheerful' },
        },
      ],
    },
  },
});

await writeFile('dialogue.wav', result.audio.uint8Array);

console.log('Saved dialogue.wav');
```

A turn's `speechMetadata.style` overrides `instructions`. Turns without a style inherit `instructions`. For more options, see the [AI SDK Google speech documentation](https://ai-sdk.dev/providers/ai-sdk-providers/google#speech-models).

### Generate speech with Microsoft

Use `microsoft/mai-voice-2.1` or `microsoft/mai-voice-2` for high-fidelity, long-form narration, and `microsoft/mai-voice-2.1-flash` or `microsoft/mai-voice-2-flash` for low-latency voice agents. All four models use `gateway.speechModel()` and share the same voices and options.

Choose a prebuilt voice such as `en-US-Harper`, `de-DE-Mia`, or `es-MX-Valeria`. Each voice name includes its locale, which sets the spoken language, and the default is `en-US-Harper`. Set `providerOptions.azure.style` to control delivery, and `styleDegree` to set its intensity:

```typescript filename="generate-microsoft-speech.ts"
import { generateSpeech } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { writeFile } from 'node:fs/promises';

const result = await generateSpeech({
  model: gateway.speechModel('microsoft/mai-voice-2-flash'),
  text: 'Thanks for calling! Your order shipped this morning.',
  voice: 'en-US-Ethan',
  outputFormat: 'mp3',
  providerOptions: {
    azure: { style: 'excited', styleDegree: 1.5 },
  },
});

await writeFile('order-update.mp3', result.audio.uint8Array);

console.log('Saved order-update.mp3');
```

```javascript filename="generate-microsoft-speech.js"
import { generateSpeech } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { writeFile } from 'node:fs/promises';

const result = await generateSpeech({
  model: gateway.speechModel('microsoft/mai-voice-2-flash'),
  text: 'Thanks for calling! Your order shipped this morning.',
  voice: 'en-US-Ethan',
  outputFormat: 'mp3',
  providerOptions: {
    azure: { style: 'excited', styleDegree: 1.5 },
  },
});

await writeFile('order-update.mp3', result.audio.uint8Array);

console.log('Saved order-update.mp3');
```

Microsoft returns MP3 audio by default. MAI-Voice also supports `wav`, `pcm`, and `opus` through `outputFormat`. When you omit `voice`, `language` picks a default voice for that language, such as `de-DE-Mia` for `de`. For more options, see the [AI SDK Azure speech documentation](https://ai-sdk.dev/providers/ai-sdk-providers/azure#mai-voice).

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
- Google speech models don't support `speed` or `language`. Set pacing through `instructions` since the model detects the language from the text.
- Microsoft speech models don't support `instructions`. Set the delivery with `providerOptions.azure.style` instead.
- Microsoft speech models reject unknown voices and unsupported styles.


---

[View full sitemap](/docs/sitemap)
