---
title: Fish Audio
description: Learn how to use the Fish Audio provider for the AI SDK.
url: "https://ai-sdk.dev/providers/ai-sdk-providers/fish-audio"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/ai-sdk-providers/fish-audio.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "237c78f593315fafc14b20a20abf595e3fc8adb30063a9cf03dbd28698c65b7b"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The [Fish Audio](https://fish.audio/) provider contains speech generation (S1 and
S2 models) and speech-to-text transcription support.

## Setup

The Fish Audio provider is available in the `@ai-sdk/fish-audio` module. You can install it with

#### pnpm

```
pnpm add @ai-sdk/fish-audio
```

#### npm

```
npm install @ai-sdk/fish-audio
```

#### yarn

```
yarn add @ai-sdk/fish-audio
```

#### bun

```
bun add @ai-sdk/fish-audio
```

## Provider Instance

You can import the default provider instance `fishAudio` from `@ai-sdk/fish-audio`:

```ts
import { fishAudio } from '@ai-sdk/fish-audio';
```

If you need a customized setup, you can import `createFishAudio` from `@ai-sdk/fish-audio` and create a provider instance with your settings:

```ts
import { createFishAudio } from '@ai-sdk/fish-audio';

const fishAudio = createFishAudio({
  // custom settings, e.g.
  fetch: customFetch,
});
```

You can use the following optional settings to customize the Fish Audio provider instance:

- **apiKey** *string*

  API key that is being sent using the `Authorization` header.
  It defaults to the `FISH_AUDIO_API_KEY` environment variable.

- **baseURL** *string*

  Base URL for the API calls.
  Defaults to `https://api.fish.audio`.

- **headers** *Record\<string,string>*

  Custom headers to include in the requests.

- **fetch** *(input: RequestInfo, init?: RequestInit) => Promise\<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

## Speech Models

You can create models that call the [Fish Audio text-to-speech API](https://docs.fish.audio/api-reference/endpoint/openapi-v1/text-to-speech)
using the `.speech()` factory method.

```ts
import { fishAudio } from '@ai-sdk/fish-audio';
import { generateSpeech } from 'ai';

const { audio } = await generateSpeech({
  model: fishAudio.speech('s1'),
  text: 'Hello from Fish Audio!',
});
```

The `voice` option selects a Fish Audio voice model ID (`reference_id`), either
from the [Fish Audio voice library](https://fish.audio/) or one of your own
uploaded models. Omit it to use the default voice.

```ts
const { audio } = await generateSpeech({
  model: fishAudio.speech('s1'),
  text: 'Hello from Fish Audio!',
  voice: '933563129e564b19a115bedd57b7406a',
  outputFormat: 'opus',
  speed: 1.1,
});
```

Voice listing is not part of the AI SDK speech model specification, so browse
voices with the [Fish Audio list-models
endpoint](https://docs.fish.audio/api-reference/endpoint/openapi-v1/list-models)
directly:

```ts
const response = await fetch(
  'https://api.fish.audio/model?page_size=20&sort_by=task_count',
  { headers: { Authorization: `Bearer ${process.env.FISH_AUDIO_API_KEY}` } },
);
const { items } = await response.json();
// Each item's `_id` is a value you can pass as `voice`.
```

Add `self=true` to list only your own uploaded models, or `language=en` / `tag=narration` to filter.

### Provider Options

The following provider options are available:

- **referenceId** *string | array of strings*

  Voice model ID(s). A single ID selects one speaker; an array enables
  multi-speaker dialogue (S2-Pro models). Takes precedence over the top-level
  `voice` option.
  Optional.

- **sampleRate** *number*

  Output sample rate in Hz. Falls back to the format default when unset
  (44100 Hz for `wav`/`pcm`/`mp3`, 48000 Hz for `opus`).
  Optional.

- **mp3Bitrate** *64 | 128 | 192*

  Bitrate in kbps for `mp3` output. Ignored for other formats.
  Optional.

- **opusBitrate** *-1000 | 24000 | 32000 | 48000 | 64000*

  Bitrate in bps for `opus` output, where `-1000` selects automatic. Ignored for
  other formats.
  Optional.

- **latency** *'low' | 'normal' | 'balanced'*

  Latency/quality tradeoff. `normal` gives the best quality, `balanced` reduces
  latency, and `low` is the fastest.
  Optional.

- **volume** *number*

  Volume offset in dB. Negative values are quieter.
  Optional.

- **normalizeLoudness** *boolean*

  Loudness normalization. Supported by the S2 family (`s2-pro` and
  `s2.1-pro`). Fish Audio accepts it on `s1` but ignores it, so the provider
  drops it and emits a warning in that case.
  Optional.

- **temperature** *number*

  Governs expressiveness (0 to 1). Higher values are more varied.
  Optional.

- **topP** *number*

  Controls diversity via nucleus sampling (0 to 1).
  Optional.

- **chunkLength** *number*

  Text segment size for processing (100 to 300).
  Optional.

- **minChunkLength** *number*

  Minimum characters before splitting into a new chunk (0 to 100).
  Optional.

- **normalize** *boolean*

  Text normalization for English and Chinese. Helps stability with numbers.
  Optional.

- **maxNewTokens** *number*

  Maximum audio tokens to generate per text chunk.
  Optional.

- **repetitionPenalty** *number*

  Values above 1.0 discourage repeated audio patterns.
  Optional.

- **conditionOnPreviousChunks** *boolean*

  Reuse prior audio as context for voice consistency across chunks.
  Optional.

- **earlyStopThreshold** *number*

  Early-stop threshold used in batch processing (0 to 1).
  Optional.

- **features** *array of strings*

  Request-scoped flags passed through to the inference backend, e.g.
  `['quality-guard']`.
  Optional.

### Multi-Speaker Dialogue

S2-Pro models support multi-speaker dialogue. Pass an array of voice model IDs
via `referenceId` and mark turns in the text with `<|speaker:N|>`, where `N`
indexes into that array.

```ts
const { audio } = await generateSpeech({
  model: fishAudio.speech('s2-pro'),
  text: '<|speaker:0|>Hello!<|speaker:1|>Hi there!',
  providerOptions: {
    fishAudio: {
      referenceId: [
        '933563129e564b19a115bedd57b7406a',
        'bf322df2096a46f18c579d0baa36f41d',
      ],
    },
  },
});
```

### Output Formats

Fish Audio supports the `wav`, `pcm`, `mp3`, and `opus` output formats. Any other
value falls back to `mp3` and produces a warning.

Fish Audio infers the language from the input text and the selected voice, and
has no language parameter. The `language` and `instructions` options are not
supported and produce warnings.

### Model Capabilities

| Model           | Multi-Speaker | Notes                                                                     |
| --------------- | ------------- | ------------------------------------------------------------------------- |
| `s1`            |               | Ignores `normalizeLoudness`                                               |
| `s2-pro`        | ✓             | Supports `normalizeLoudness`                                              |
| `s2.1-pro`      | ✓             | Recommended default; supports `normalizeLoudness`                         |
| `s2.1-pro-free` |               | Free developer tier; no time-to-first-audio or data-processing guarantees |

Streaming text-to-speech (Fish Audio's TTS-live WebSocket and timestamped
streaming endpoints) is not currently supported, and neither is inline
zero-shot voice cloning via `references`, which requires a MessagePack request
body. Upload reference audio to Fish Audio and pass its `reference_id` via
`voice` or `referenceId` instead.

## Transcription Models

You can create models that call the [Fish Audio speech-to-text API](https://docs.fish.audio/api-reference/endpoint/openapi-v1/speech-to-text)
using the `.transcription()` factory method.

```ts
import { fishAudio } from '@ai-sdk/fish-audio';
import { transcribe } from 'ai';
import { readFile } from 'node:fs/promises';

const result = await transcribe({
  model: fishAudio.transcription(),
  audio: await readFile('audio.mp3'),
});
```

The Fish Audio speech-to-text endpoint currently exposes no model selector and
serves a single model, so the model ID is optional and defaults to
`'transcribe-1'`. It is a routing label and is not sent to the API. Fish Audio
expects to add more ASR models and to select them with the `model` HTTP header,
matching the text-to-speech endpoint.

### Provider Options

The following provider options are available:

- **language** *string*

  Language of the audio. A hint only: Fish Audio passes it to the model, but
  auto-detection is authoritative and overrides it, so it changes neither the
  transcript nor the reported language.
  Optional.

- **ignoreTimestamps** *boolean*

  Whether to skip precise timestamps. Mirrors the Fish Audio
  `ignore_timestamps` parameter, whose API default is `true`. This provider
  defaults it to `false` so that `segments` is populated. Fish Audio documents
  an added latency cost for audio shorter than 30 seconds; set this to `true` to
  trade segments for that latency.
  Optional.

```ts
const result = await transcribe({
  model: fishAudio.transcription(),
  audio: await readFile('audio.mp3'),
  providerOptions: {
    fishAudio: {
      language: 'en',
      ignoreTimestamps: false,
    },
  },
});
```

`result.language` reports the detected language as an ISO-639-1 code (e.g. `en`).
It is always a two-letter code, never a locale such as `en-US`, and is
`undefined` when Fish Audio detects no language.

The human-readable language name (e.g. `English`) is available as provider
metadata:

```ts
console.log(result.language); // 'en'
console.log(result.providerMetadata?.fishAudio?.language); // 'English'
```

The provider metadata `language` is a display name intended for presentation.
Its exact form is not guaranteed, so avoid matching or branching on it — use
`result.language` for anything programmatic.

Setting `ignoreTimestamps` to `true` makes Fish Audio return an empty
`segments` array. The provider therefore requests timestamps by default.

### Model Capabilities

| Model          | Transcription | Duration | Segments | Language |
| -------------- | ------------- | -------- | -------- | -------- |
| `transcribe-1` | ✓             | ✓        | ✓        | ✓        |

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)