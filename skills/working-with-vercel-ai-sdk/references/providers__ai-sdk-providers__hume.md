---
title: Hume
description: Learn how to use the Hume provider for the AI SDK.
url: "https://ai-sdk.dev/providers/ai-sdk-providers/hume"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/ai-sdk-providers/hume.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "9ef1a96f1d8487ef8ffc43c7e94153617fb8615530aeeb1f3d187534f4a6a535"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The [Hume](https://hume.ai/) provider contains support for the Hume text-to-speech (TTS) API.

## Setup

The Hume provider is available in the `@ai-sdk/hume` module. You can install it with

```bash
pnpm add @ai-sdk/hume
```

## Provider Instance

You can import the default provider instance `hume` from `@ai-sdk/hume`:

```ts
import { hume } from '@ai-sdk/hume';
```

If you need a customized setup, you can import `createHume` from `@ai-sdk/hume` and create a provider instance with your settings:

```ts
import { createHume } from '@ai-sdk/hume';

const hume = createHume({
  // custom settings, e.g.
  fetch: customFetch,
});
```

You can use the following optional settings to customize the Hume provider instance:

- **apiKey** *string*

  API key that is being sent using the `X-Hume-Api-Key` header.
  It defaults to the `HUME_API_KEY` environment variable.

- **headers** *Record\<string,string>*

  Custom headers to include in the requests.

- **fetch** *(input: RequestInfo, init?: RequestInit) => Promise\<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

## Speech Models

You can create models that call the [Hume speech API](https://dev.hume.ai/docs/text-to-speech-tts/overview)
using the `.speech()` factory method.

```ts
const model = hume.speech();
```

You can pass standard speech generation options like `voice`, `speed`, `instructions`, and `outputFormat`:

```ts
import { generateSpeech } from 'ai';
import { hume } from '@ai-sdk/hume';

const result = await generateSpeech({
  model: hume.speech(),
  text: 'Hello, world!',
  voice: 'd8ab67c6-953d-4bd8-9370-8fa53a0f1453',
  speed: 1.0,
  instructions: 'Speak in a friendly, conversational tone.',
  outputFormat: 'mp3',
});
```

### Supported Parameters

- **text** *string* (required)

  The text to convert to speech.

- **voice** *string*

  The voice ID to use for the generated audio.
  Defaults to `'d8ab67c6-953d-4bd8-9370-8fa53a0f1453'`.

- **speed** *number*

  Speech rate multiplier.

- **instructions** *string*

  Description or instructions for how the text should be spoken.

- **outputFormat** *string*

  The audio format to generate. Supported values: `'mp3'`, `'pcm'`, `'wav'`.
  Defaults to `'mp3'`.

The `language` parameter is not supported by Hume speech models and will be
ignored with a warning.

### Provider Options

You can pass additional provider-specific options using the `providerOptions` argument:

```ts
import { generateSpeech } from 'ai';
import { hume } from '@ai-sdk/hume';
import { type HumeSpeechModelOptions } from '@ai-sdk/hume';

const result = await generateSpeech({
  model: hume.speech(),
  text: 'Hello, world!',
  providerOptions: {
    hume: {
      context: {
        generationId: 'previous-generation-id',
      },
    } satisfies HumeSpeechModelOptions,
  },
});
```

The following provider options are available:

- **context** *object*

  Context for the speech synthesis request. Can be either:

  - `{ generationId: string }` - ID of a previously generated speech synthesis to use as context.
  - `{ utterances: Utterance[] }` - An array of utterance objects for context, where each utterance has:
    - `text` *string* (required) - The text content.
    - `description` *string* - Instructions for how the text should be spoken.
    - `speed` *number* - Speech rate multiplier.
    - `trailingSilence` *number* - Duration of silence to add after the utterance in seconds.
    - `voice` *object* - Voice configuration, either `{ id: string, provider?: 'HUME_AI' | 'CUSTOM_VOICE' }` or `{ name: string, provider?: 'HUME_AI' | 'CUSTOM_VOICE' }`.

### Model Capabilities

| Model     | Instructions | Speed | Output Formats |
| --------- | ------------ | ----- | -------------- |
| `default` | ✓            | ✓     | mp3, pcm, wav  |

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)