---
title: Gladia
description: Learn how to set up the Gladia provider and check AI Gateway availability.
url: "https://ai-sdk.dev/providers/ai-sdk-providers/gladia"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/ai-sdk-providers/gladia.md"
fetched_at: "2026-11-09T12:39:36.677Z"
sha256: "2504f0e8ecf73110c8669fc98f23d3e8fa9a5807daff543f688796ae9b2ced20"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The [Gladia](https://gladia.io/) provider contains language model support for the Gladia transcription API.
Gladia models are not currently available through [AI Gateway](https://vercel.com/ai-gateway/models), so the opening example uses `@ai-sdk/gladia` directly. See [Using AI Gateway](#using-ai-gateway) below for supported alternatives.

```ts
import { transcribe } from 'ai';
import { gladia } from '@ai-sdk/gladia';
import { readFile } from 'node:fs/promises';

const { text } = await transcribe({
  model: gladia.transcription(),
  audio: await readFile('audio.mp3'),
});

console.log(text);
```

The example transcribes an `audio.mp3` file from your project.

## Using AI Gateway

The current [AI Gateway model catalog](https://vercel.com/ai-gateway/models) does not list Gladia models. Use `@ai-sdk/gladia` for the APIs on this page. To use other transcription models through Gateway, install `ai` and configure a Gateway API key:

```bash
pnpm add ai
```

Set an [AI Gateway API key](https://vercel.com/docs/ai-gateway/getting-started) in your environment:

```bash
export AI_GATEWAY_API_KEY=your_api_key_here
```

Vercel deployments can also use [OIDC authentication](/providers/ai-sdk-providers/ai-gateway#oidc-authentication-vercel-deployments).
See the [Gateway documentation](/providers/ai-sdk-providers/ai-gateway) for supported models and APIs.

## Using `@ai-sdk/gladia`

For direct access to Gladia, install `ai` and `@ai-sdk/gladia`:

```bash
pnpm add ai @ai-sdk/gladia
```

Set your Gladia API credential in the `GLADIA_API_KEY` environment variable:

```bash
export GLADIA_API_KEY=your_api_key_here
```

The following sections document the direct `@ai-sdk/gladia` provider,
including its model factories and settings. Gateway model and feature
availability can differ.

## Provider Instance

You can import the default provider instance `gladia` from `@ai-sdk/gladia`:

```ts
import { gladia } from '@ai-sdk/gladia';
```

If you need a customized setup, you can import `createGladia` from `@ai-sdk/gladia` and create a provider instance with your settings:

```ts
import { createGladia } from '@ai-sdk/gladia';

const gladia = createGladia({
  // custom settings, e.g.
  fetch: customFetch,
});
```

You can use the following optional settings to customize the Gladia provider instance:

- **apiKey** *string | PromiseLike\<string> | (() => string | PromiseLike\<string>)*

  Pass a synchronous or asynchronous callback to resolve the key before each
  request. The callback is responsible for caching and refreshing credentials.

  API key that is being sent using the `x-gladia-key` header.
  It defaults to the `GLADIA_API_KEY` environment variable.

- **headers** *Record\<string,string>*

  Custom headers to include in the requests.

- **fetch** *(input: RequestInfo, init?: RequestInit) => Promise\<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

- **pollIntervalMs** *number*

  Interval in milliseconds between transcription job status checks. Defaults to
  `1000` (1 second). Can be overridden per call with
  `providerOptions.gladia.pollIntervalMs`.

- **pollTimeoutMs** *number*

  Maximum time in milliseconds to wait for an asynchronous transcription job to
  finish before throwing a `TranscriptionJobPollingTimedOut` error. Defaults to
  `600000` (10 minutes). Raise it when you transcribe long audio files or enable
  audio intelligence add-ons that make a job take longer. Can be overridden per
  call with `providerOptions.gladia.pollTimeoutMs`.

## Transcription Models

You can create models that call the [Gladia transcription API](https://docs.gladia.io/chapters/pre-recorded-stt/getting-started)
using the `.transcription()` factory method.

```ts
const model = gladia.transcription();
```

You can optionally select the transcription model by passing its id to the
factory method. If you omit it, the Gladia API uses its default model
(`solaria-1`).

```ts
const model = gladia.transcription('solaria-3');
```

Examples of supported models include:

- **solaria-1** (default) — Gladia's generalist model with the broadest language
  coverage (100+ languages). Supports code switching and multi-language
  configuration, and is available for both pre-recorded and live transcription.
- **solaria-3** — Gladia's latest model, tuned for the highest accuracy on
  European real-world audio. **Pre-recorded (async) only** — not available for
  live transcription. Supports a **single language** chosen from English,
  French, German, Spanish, or Italian: pass exactly one language in
  `languageConfig` and do not enable `codeSwitching`.

Both models support all of Gladia's audio intelligence add-ons. Choose
`solaria-3` when transcribing one of its five supported European languages and
accuracy matters most; otherwise use the default `solaria-1` for the widest
language coverage, code switching, or live transcription.

You can also pass additional provider-specific options using the `providerOptions` argument. For example, supplying the `summarization` option will enable summaries for sections of content.

```ts {7}
import { transcribe } from 'ai';
import { gladia } from '@ai-sdk/gladia';
import { type GladiaTranscriptionModelOptions } from '@ai-sdk/gladia';
import { readFile } from 'fs/promises';

const result = await transcribe({
  model: gladia.transcription(),
  audio: await readFile('audio.mp3'),
  providerOptions: {
    gladia: {
      summarization: true,
    } satisfies GladiaTranscriptionModelOptions,
  },
});
```

The following provider options are available:

- **customVocabulary** *boolean | (string | object)\[]*

  Custom vocabulary to improve transcription accuracy. The array form is
  deprecated; use `true` with `customVocabularyConfig.vocabulary` instead.
  Invalid array entries are ignored with a warning. An explicit vocabulary
  configuration overrides the legacy array with a warning.
  Optional.

- **customVocabularyConfig** *object*

  Configuration for custom vocabulary.
  Optional.

  - **vocabulary** *Array\<string | \{ value: string, intensity?: number, pronunciations?: string\[], language?: string }>*
  - **defaultIntensity** *number*

- **languageConfig** *object*

  Language configuration for transcription.
  Optional.

  - **languages** *string\[]* — If one language is set, it is used for transcription. Otherwise, language is auto-detected.
  - **codeSwitching** *boolean* — If true, language is auto-detected on each utterance.

  When provided, this configuration overrides all legacy language options.

- **callback** *boolean*

  Enable callback when transcription is complete.
  Optional.

- **callbackConfig** *object*

  Configuration for callback.
  Optional.

  - **url** *string*
  - **method** *'POST' | 'PUT'*

- **subtitles** *boolean*

  Generate subtitles from the transcription.
  Optional.

- **subtitlesConfig** *object*

  Configuration for subtitles.
  Optional.

  - **formats** *Array\<'srt' | 'vtt'>*
  - **minimumDuration** *number*
  - **maximumDuration** *number*
  - **maximumCharactersPerRow** *number*
  - **maximumRowsPerCaption** *number*
  - **style** *'default' | 'compliance'*

- **diarization** *boolean*

  Enable speaker diarization.
  Optional.

- **diarizationConfig** *object*

  Configuration for diarization.
  Optional.

  - **numberOfSpeakers** *number*
  - **minSpeakers** *number*
  - **maxSpeakers** *number*

- **translation** *boolean*

  Enable translation of the transcription.
  Optional.

- **translationConfig** *object*

  Configuration for translation.
  Optional.

  - **targetLanguages** *string\[]*
  - **model** *'base' | 'batch' | 'enhanced'*
  - **matchOriginalUtterances** *boolean*
  - **lipsync** *boolean*
  - **contextAdaptation** *boolean*
  - **context** *string*
  - **informal** *boolean*

- **summarization** *boolean*

  Enable summarization of the transcription.
  Optional.

- **summarizationConfig** *object*

  Configuration for summarization.
  Optional.

  - **type** *'general' | 'bullet\_points' | 'concise'*

- **namedEntityRecognition** *boolean*

  Enable named entity recognition.
  Optional.

- **customSpelling** *boolean*

  Enable custom spelling.
  Optional.

- **customSpellingConfig** *object*

  Configuration for custom spelling.
  Optional.

  - **spellingDictionary** *Record\<string, string\[]>*

- **sentimentAnalysis** *boolean*

  Enable sentiment analysis.
  Optional.

- **audioToLlm** *boolean*

  Enable audio to LLM processing.
  Optional.

- **audioToLlmConfig** *object*

  Configuration for audio to LLM.
  Optional.

  - **prompts** *string\[]*
  - **model** *string*

- **piiRedaction** *boolean*

  Enable PII redaction.
  Optional.

- **piiRedactionConfig** *object*

  Configuration for PII redaction.
  Optional.

  - **entityTypes** *string\[]*
  - **processedTextType** *'MARKER' | 'MASK'*

  This configuration requires `piiRedaction: true`; otherwise the SDK emits a
  warning. A non-empty `entityTypes` list limits redaction to the listed types
  and replaces the default coverage. Omit it or use an empty list for the
  provider's default coverage. See [Gladia's PII documentation](https://docs.gladia.io/chapters/audio-intelligence/pii-redaction)
  for entity types and presets.

- **customMetadata** *Record\<string, any>*

  Custom metadata to include with the request.
  Optional.

- **sentences** *boolean*

  Enable sentence detection.
  Optional.

- **punctuationEnhanced** *boolean*

  Enable enhanced punctuation.
  Optional.

- **pollIntervalMs** *number*

  Interval in milliseconds between transcription job status checks for this
  call. Overrides the provider-level `pollIntervalMs` setting. Defaults to
  `1000` (1 second).
  Optional.

- **pollTimeoutMs** *number*

  Maximum time in milliseconds to wait for the transcription job to finish for
  this call. Overrides the provider-level `pollTimeoutMs` setting. Defaults to
  `600000` (10 minutes).
  Optional.

These polling options control the SDK's polling loop and are not sent to the
Gladia API.

### Deprecated Options

Legacy options remain accepted. The SDK emits `deprecated` warnings when
translating these options to the current request shape:

| Legacy option                   | Replacement and behavior                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| `language`                      | `languageConfig.languages: [language]`                                                      |
| `detectLanguage`                | An empty `languageConfig.languages` enables detection when no fixed language is configured. |
| `enableCodeSwitching`           | `languageConfig.codeSwitching`                                                              |
| `codeSwitchingConfig.languages` | `languageConfig.languages`; used only when legacy `enableCodeSwitching` is `true`.          |
| `customVocabulary` array        | `customVocabulary: true` and `customVocabularyConfig.vocabulary`                            |

An explicit `languageConfig`, including `{}`, overrides all legacy language
fields. When legacy code switching is enabled, its candidate languages take
precedence over a legacy fixed `language`. A legacy configuration object alone
does not enable code switching.

The following options are no longer supported by the Gladia v2 pre-recorded API
and are omitted with an `unsupported` warning: `contextPrompt`, `moderation`,
`chapterization`, `nameConsistency`, `structuredDataExtraction`,
`structuredDataExtractionConfig`, `displayMode`, and `diarizationConfig.enhanced`.

The standard `transcriptionModel(id)` provider alias, used by model registries,
also forwards the selected identifier to Gladia. The `default` identifier omits
`model` so Gladia chooses its default; other identifiers are validated by the
provider service.

### Provider Metadata

Gladia's audio intelligence add-ons return their results next to the
transcription. The AI SDK exposes the parsed Gladia response on
`result.providerMetadata.gladia`, so the outputs remain accessible when you
enable an option:

```ts {11-12}
const result = await transcribe({
  model: gladia.transcription(),
  audio: await readFile('audio.mp3'),
  providerOptions: {
    gladia: {
      summarization: true,
    },
  },
});

const gladiaResult = result.providerMetadata.gladia.result as
  | { summarization?: { results?: string | null } }
  | undefined;
console.log(gladiaResult?.summarization?.results);
```

The following values are available under `providerMetadata.gladia`:

- **status** *'done'* — Job status. Metadata is only returned for completed
  jobs; a failed job throws instead. See the error behavior below.
- **result.metadata** — `audio_duration`, `number_of_distinct_channels`,
  `billing_time`, and `transcription_time`.
- **result.transcription** — `full_transcript`, `languages`, and `utterances`,
  plus `sentences` and `subtitles` when the matching option is enabled.
- **result.translation** — Translations when `translation` is enabled.
- **result.summarization** — Summary when `summarization` is enabled.
- **result.named\_entity\_recognition** — Detected entities when
  `namedEntityRecognition` is enabled.
- **result.sentiment\_analysis** — Sentiment per segment when `sentimentAnalysis`
  is enabled.
- **result.audio\_to\_llm** — LLM responses when `audioToLlm` is enabled.
- **result.sentences** — Sentence results when `sentences` is enabled. Gladia
  deprecated this location; the same content is also available in
  `result.transcription.sentences`.

Each add-on reports `success`, `is_empty`, `exec_time`, and `error` alongside its
`results`; check them before reading the results. Add-on payloads are passed
through as Gladia returns them. When Gladia reports `status: 'error'`,
`transcribe` throws an error whose message and `cause` contain Gladia's
`error_code`, the HTTP status code (400–599) of the failed request. In returned
metadata `error_code` is always `null`.

### Model Capabilities

| Model     | Transcription | Duration | Segments | Language |
| --------- | ------------- | -------- | -------- | -------- |
| `Default` | ✓             | ✓        | ✓        | ✓        |

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)