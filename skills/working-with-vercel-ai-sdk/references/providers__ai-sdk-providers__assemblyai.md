---
title: AssemblyAI
description: Learn how to use the AssemblyAI provider for the AI SDK.
url: "https://ai-sdk.dev/providers/ai-sdk-providers/assemblyai"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/ai-sdk-providers/assemblyai.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "2746c78c4cbca9ccf4bcd46e335c47f63e5652adbea93d6c02548d5dd312e2a4"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The [AssemblyAI](https://assemblyai.com/) provider contains transcription model support for the AssemblyAI transcription API.

## Setup

The AssemblyAI provider is available in the `@ai-sdk/assemblyai` module. You can install it with

**Packages:** `@ai-sdk/assemblyai`

## Provider Instance

You can import the default provider instance `assemblyai` from `@ai-sdk/assemblyai`:

```ts
import { assemblyai } from '@ai-sdk/assemblyai';
```

If you need a customized setup, you can import `createAssemblyAI` from `@ai-sdk/assemblyai` and create a provider instance with your settings:

```ts
import { createAssemblyAI } from '@ai-sdk/assemblyai';

const assemblyai = createAssemblyAI({
  // custom settings, e.g.
  fetch: customFetch,
});
```

You can use the following optional settings to customize the AssemblyAI provider instance:

- **apiKey** *string*

  API key that is being sent using the `Authorization` header.
  It defaults to the `ASSEMBLYAI_API_KEY` environment variable.

- **headers** *Record\<string,string>*

  Custom headers to include in the requests.

- **fetch** *(input: RequestInfo, init?: RequestInit) => Promise\<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

## Transcription Models

You can create models that call the [AssemblyAI transcription API](https://www.assemblyai.com/docs/getting-started/transcribe-an-audio-file/typescript)
using the `.transcription()` factory method.

The first argument is the model id, e.g. `universal-3-5-pro`.

```ts
const model = assemblyai.transcription('universal-3-5-pro');
```

The `best` model is a **deprecated** legacy model, sent using AssemblyAI's
deprecated `speech_model` request parameter. It still works, but using it emits a
deprecation warning — prefer `universal-3-5-pro`. The older `nano` model has been
removed by AssemblyAI and is no longer available. All newer models are sent using
the [`speech_models`](https://www.assemblyai.com/docs/pre-recorded-audio/select-the-speech-model)
request parameter, which the provider selects automatically based on the model id.

`universal-3-pro` and `universal-2` are fully supported and continue to work, but
using them emits an informational warning (not a deprecation) suggesting
`universal-3-5-pro`, AssemblyAI's latest flagship model.

You can also pass additional provider-specific options using the `providerOptions` argument. For example, supplying the `contentSafety` option will enable content safety filtering.

```ts {7}
import { transcribe } from 'ai';
import { assemblyai } from '@ai-sdk/assemblyai';
import { type AssemblyAITranscriptionModelOptions } from '@ai-sdk/assemblyai';
import { readFile } from 'fs/promises';

const result = await transcribe({
  model: assemblyai.transcription('universal-3-5-pro'),
  audio: await readFile('audio.mp3'),
  providerOptions: {
    assemblyai: {
      contentSafety: true,
    } satisfies AssemblyAITranscriptionModelOptions,
  },
});
```

The following provider options are available:

- **audioEndAt** *number*

  End time of the audio in milliseconds.
  Optional.

- **audioStartFrom** *number*

  Start time of the audio in milliseconds.
  Optional.

- **autoChapters** *boolean*

  Whether to automatically generate chapters for the transcription.
  Optional.

- **autoHighlights** *boolean*

  Whether to automatically generate highlights for the transcription.
  Optional.

- **boostParam** *enum*

  Boost parameter for `wordBoost`.
  Allowed values: `'low'`, `'default'`, `'high'`.
  **Deprecated** — only applies to the deprecated `wordBoost`; use `keytermsPrompt` instead.
  Optional.

- **contentSafety** *boolean*

  Whether to enable content safety filtering.
  Optional.

- **contentSafetyConfidence** *number*

  Confidence threshold for content safety filtering (25-100).
  Optional.

- **customSpelling** *array of objects*

  Custom spelling rules for the transcription.
  Each object has `from` (array of strings) and `to` (string) properties.
  Optional.

- **disfluencies** *boolean*

  Whether to include disfluencies (um, uh, etc.) in the transcription.
  Optional.

- **domain** *string*

  Enable a domain-specific model for specialized terminology.
  Currently supports `'medical-v1'` (Medical Mode).
  Optional.

- **entityDetection** *boolean*

  Whether to detect entities in the transcription.
  Optional.

- **filterProfanity** *boolean*

  Whether to filter profanity in the transcription.
  Optional.

- **formatText** *boolean*

  Whether to format the text in the transcription.
  Optional.

- **iabCategories** *boolean*

  Whether to include IAB categories in the transcription.
  Optional.

- **keytermsPrompt** *array of strings*

  Domain-specific keyterms to boost recognition for (max 6 words per phrase).
  Replaces `wordBoost` for newer models — supported by `universal-3-pro`,
  `universal-3-5-pro`, and `slam-1` (and `universal-2` when enabled).
  Optional.

- **languageCode** *string*

  Language code for the audio.
  Supports numerous ISO-639-1 and ISO-639-3 language codes.
  Optional.

- **languageConfidenceThreshold** *number*

  Confidence threshold for language detection.
  Optional.

- **languageDetection** *boolean*

  Whether to enable language detection.
  Optional.

- **languageDetectionOptions** *object*

  Options for automatic language detection: `expectedLanguages` (array of
  strings), `fallbackLanguage` (string), `codeSwitching` (boolean),
  `codeSwitchingConfidenceThreshold` (number, 0-1).
  Optional.

- **multichannel** *boolean*

  Whether to process multiple audio channels separately.
  Optional.

- **prompt** *string*

  Natural-language context (up to 1,500 words) to steer the model.
  Only supported by `universal-3-pro`, `universal-3-5-pro`, and `slam-1`.
  Optional.

- **punctuate** *boolean*

  Whether to add punctuation to the transcription.
  Optional.

- **redactPii** *boolean*

  Whether to redact personally identifiable information.
  Optional.

- **redactPiiAudio** *boolean*

  Whether to redact PII in the audio file.
  Optional.

- **redactPiiAudioOptions** *object*

  Options for PII-redacted audio: `returnRedactedNoSpeechAudio` (boolean),
  `overrideAudioRedactionMethod` (`'silence'`). Requires `redactPiiAudio`.
  Optional.

- **redactPiiAudioQuality** *enum*

  Quality of the redacted audio file.
  Allowed values: `'mp3'`, `'wav'`.
  Optional.

- **redactPiiPolicies** *array of enums*

  Policies for PII redaction, specifying which types of information to redact.
  Supports numerous types like `'person_name'`, `'phone_number'`, etc.
  Optional.

- **redactPiiReturnUnredacted** *boolean*

  Return the original unredacted transcript alongside the redacted one.
  Requires `redactPii`.
  Optional.

- **redactPiiSub** *enum*

  Substitution method for redacted PII.
  Allowed values: `'entity_name'`, `'hash'`.
  Optional.

- **redactStaticEntities** *object*

  Map of user-defined labels to exact terms to redact, e.g.
  `{ INTERNAL_TOOL: ['Bearclaw'] }`. Applied on top of standard PII redaction.
  Requires `redactPii`.
  Optional.

- **removeAudioTags** *enum*

  Remove inline annotations from rich transcripts.
  Allowed values: `'all'` (all annotations), `'speaker'` (speaker cues only).
  Universal-3 Pro models.
  Optional.

- **sentimentAnalysis** *boolean*

  Whether to perform sentiment analysis on the transcription.
  Optional.

- **speakerLabels** *boolean*

  Whether to label different speakers in the transcription.
  Optional.

- **speakerOptions** *object*

  Options for speaker diarization: `minSpeakersExpected` (number),
  `maxSpeakersExpected` (number).
  Optional.

- **speakersExpected** *number*

  Expected number of speakers in the audio.
  Optional.

- **speechThreshold** *number*

  Threshold for speech detection (0-1).
  Optional.

- **summarization** *boolean*

  Whether to generate a summary of the transcription.
  Optional.

- **summaryModel** *enum*

  Model to use for summarization.
  Allowed values: `'informative'`, `'conversational'`, `'catchy'`.
  Optional.

- **summaryType** *enum*

  Type of summary to generate.
  Allowed values: `'bullets'`, `'bullets_verbose'`, `'gist'`, `'headline'`, `'paragraph'`.
  Optional.

- **temperature** *number*

  Sampling temperature (0-1) controlling randomness.
  Universal-3 Pro models.
  Optional.

- **webhookAuthHeaderName** *string*

  Name of the authentication header for webhook requests.
  Optional.

- **webhookAuthHeaderValue** *string*

  Value of the authentication header for webhook requests.
  Optional.

- **webhookUrl** *string*

  URL to send webhook notifications to.
  Optional.

- **wordBoost** *array of strings*

  List of words to boost in the transcription.
  **Deprecated** — rejected by `universal-3-pro`, `universal-3-5-pro`, and `slam-1`
  (works only on `universal-2`/`best`); use `keytermsPrompt` instead.
  Optional.

### Speaker diarization and audio-intelligence results

The AI SDK's `transcribe` result exposes `text`, `segments`, `language`, and
`durationInSeconds`. AssemblyAI's richer results — speaker diarization and
audio-intelligence features — don't fit that shape, so they are surfaced in two
places:

- **`providerMetadata.assemblyai`** — structured results for the features you
  enabled: `utterances` (speaker-diarized segments, when `speakerLabels` is set),
  `entities`, `sentimentAnalysisResults`, `contentSafetyLabels`,
  `iabCategoriesResult`, and `autoHighlightsResult`.
- **`response.body`** — the complete, raw AssemblyAI transcript response, so any
  field not surfaced above (e.g. `chapters`, word-level `speaker` labels) is
  still available.

Note: timings inside `providerMetadata` and `response.body` (e.g.
`utterances[].start`) are in **milliseconds**, matching the AssemblyAI API —
whereas the top-level `segments` use **seconds**.

```ts
import { transcribe } from 'ai';
import { assemblyai } from '@ai-sdk/assemblyai';
import { readFile } from 'fs/promises';

const result = await transcribe({
  model: assemblyai.transcription('universal-3-5-pro'),
  audio: await readFile('audio.mp3'),
  providerOptions: {
    assemblyai: {
      speakerLabels: true,
      entityDetection: true,
    },
  },
});

const { utterances, entities } = result.providerMetadata?.assemblyai ?? {};
// utterances: [{ speaker: 'A', text: '…', start, end, … }, …]  (start/end in ms)
```

The following AssemblyAI features are **deprecated** by the API and not surfaced
in `providerMetadata` (their output remains on the raw `response.body` if
enabled): Summarization, Auto Chapters, and Custom Topics. Note also that some
features are language-gated (e.g. sentiment analysis is English-centric); see
AssemblyAI's documentation for per-language availability.

### Model Capabilities

| Model               | Transcription | Duration | Segments | Language |
| ------------------- | ------------- | -------- | -------- | -------- |
| `universal-3-5-pro` | ✓             | ✓        | ✓        | ✓        |
| `universal-3-pro`   | ✓             | ✓        | ✓        | ✓        |
| `universal-2`       | ✓             | ✓        | ✓        | ✓        |
| `best`              | ✓             | ✓        | ✓        | ✓        |

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)