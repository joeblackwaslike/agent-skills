---
title: generateSpeech
description: API Reference for generateSpeech.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-speech"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-speech.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "efb846a58a9a13517306c5a3116d6c51e86bb79fbd1803d7b0ba5f5e9d40d0cf"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Generates speech audio from text.

```ts
import { generateSpeech } from 'ai';
import { openai } from '@ai-sdk/openai';

const { audio } = await generateSpeech({
  model: openai.speech('gpt-4o-mini-tts'),
  text: 'Hello from the AI SDK!',
  voice: 'alloy',
});

console.log(audio);
```

## Examples

### OpenAI

```ts
import { generateSpeech } from 'ai';
import { openai } from '@ai-sdk/openai';

const { audio } = await generateSpeech({
  model: openai.speech('gpt-4o-mini-tts'),
  text: 'Hello from the AI SDK!',
  voice: 'alloy',
});
```

### ElevenLabs

```ts
import { generateSpeech } from 'ai';
import { elevenLabs } from '@ai-sdk/elevenlabs';

const { audio } = await generateSpeech({
  model: elevenLabs.speech('eleven_multilingual_v2'),
  text: 'Hello from the AI SDK!',
  voice: 'your-voice-id', // Required: get this from your ElevenLabs account
});
```

## Import

```
import { generateSpeech } from "ai"
```

## API Signature

### Parameters

- `model` (`SpeechModelV4`): The speech model to use.
- `text` (`string`): The text to generate the speech from.
- `voice?` (`string`): The voice to use for the speech.
- `outputFormat?` (`string`): The output format to use for the speech, such as "mp3", "wav", or headerless "audio/l16", "audio/mulaw", and "audio/alaw". Supported formats and defaults vary by provider and model.
- `instructions?` (`string`): Instructions for the speech generation.
- `speed?` (`number`): The speed of the speech generation.
- `language?` (`string`): The language for speech generation. This should be an ISO 639-1 language code (e.g. "en", "es", "fr") or "auto" for automatic language detection. Provider support varies.
- `providerOptions?` (`Record<string, JSONObject>`): Additional provider-specific options.
- `maxRetries?` (`number`): Maximum number of retries. Default: 2.
- `abortSignal?` (`AbortSignal`): An optional abort signal to cancel the call.
- `headers?` (`Record<string, string>`): Additional HTTP headers for the request.
- `telemetry?` (`TelemetryOptions`): Telemetry configuration. Supports functionId, recordInputs, recordOutputs, isEnabled, and per-call integrations.

### Returns

- `audio` (`GeneratedAudioFile`): The generated audio.
  - `GeneratedAudioFile`
    - `base64` (`string`): Audio as a base64 encoded string.
    - `uint8Array` (`Uint8Array`): Audio as a Uint8Array.
    - `mediaType` (`string`): Media type of the audio (e.g. "audio/mpeg").
    - `format` (`string`): Format of the audio (e.g. "mp3").
- `warnings` (`Warning[]`): Warnings from the model provider (e.g. unsupported settings).
- `providerMetadata?` (`Record<string, JSONObject>`): Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider.
- `responses` (`Array<SpeechModelResponseMetadata>`): Response metadata from the provider. There may be multiple responses if we made multiple calls to the model.
  - `SpeechModelResponseMetadata`
    - `timestamp` (`Date`): Timestamp for the start of the generated response.
    - `modelId` (`string`): The ID of the response model that was used to generate the response.
    - `body?` (`unknown`): Optional response body.
    - `headers?` (`Record<string, string>`): Response headers.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)