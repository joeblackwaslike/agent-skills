---
title: Deepgram
description: Learn how to set up the Deepgram provider and check AI Gateway availability.
url: "https://ai-sdk.dev/providers/ai-sdk-providers/deepgram"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/ai-sdk-providers/deepgram.md"
fetched_at: "2026-11-09T12:39:36.677Z"
sha256: "7827ed5fcc8cdba27342608c690880b79a61ef6abe1aa1e4ad92a439ed223c0b"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The [Deepgram](https://deepgram.com/) provider contains language model support for the Deepgram transcription and speech generation APIs.
Deepgram models are not currently available through [AI Gateway](https://vercel.com/ai-gateway/models), so the opening example uses `@ai-sdk/deepgram` directly. See [Using AI Gateway](#using-ai-gateway) below for supported alternatives.

```ts
import { generateSpeech } from 'ai';
import { deepgram } from '@ai-sdk/deepgram';
import { writeFile } from 'node:fs/promises';

const { audio } = await generateSpeech({
  model: deepgram.speech('aura-2'),
  text: 'Hello, world!',
  outputFormat: 'mp3',
  voice: 'thalia',
  language: 'en',
});

await writeFile('speech.mp3', audio.uint8Array);
```

## Using AI Gateway

The current [AI Gateway model catalog](https://vercel.com/ai-gateway/models) does not list Deepgram models. Use `@ai-sdk/deepgram` for the APIs on this page. To use other speech models through Gateway, install `ai` and configure a Gateway API key:

```bash
pnpm add ai
```

Set an [AI Gateway API key](https://vercel.com/docs/ai-gateway/getting-started) in your environment:

```bash
export AI_GATEWAY_API_KEY=your_api_key_here
```

Vercel deployments can also use [OIDC authentication](/providers/ai-sdk-providers/ai-gateway#oidc-authentication-vercel-deployments).
See the [Gateway documentation](/providers/ai-sdk-providers/ai-gateway) for supported models and APIs.

## Using `@ai-sdk/deepgram`

For direct access to Deepgram, install `ai` and `@ai-sdk/deepgram`:

```bash
pnpm add ai @ai-sdk/deepgram
```

Set your Deepgram API credential in the `DEEPGRAM_API_KEY` environment variable:

```bash
export DEEPGRAM_API_KEY=your_api_key_here
```

The following sections document the direct `@ai-sdk/deepgram` provider,
including its model factories and settings. Gateway model and feature
availability can differ.

## Provider Instance

You can import the default provider instance `deepgram` from `@ai-sdk/deepgram`:

```ts
import { deepgram } from '@ai-sdk/deepgram';
```

If you need a customized setup, you can import `createDeepgram` from `@ai-sdk/deepgram` and create a provider instance with your settings:

```ts
import { createDeepgram } from '@ai-sdk/deepgram';

const deepgram = createDeepgram({
  // custom settings, e.g.
  fetch: customFetch,
});
```

You can use the following optional settings to customize the Deepgram provider instance:

- **apiKey** *string | PromiseLike\<string> | (() => string | PromiseLike\<string>)*

  Pass a synchronous or asynchronous callback to resolve the key before each
  request. The callback is responsible for caching and refreshing credentials.

  API key that is being sent using the `Authorization` header.
  It defaults to the `DEEPGRAM_API_KEY` environment variable.

- **headers** *Record\<string,string>*

  Custom headers to include in the requests.

- **fetch** *(input: RequestInfo, init?: RequestInit) => Promise\<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

- **webSocket** *WebSocketConstructor*

  Custom WebSocket implementation for streaming transcription. Defaults to the
  global `WebSocket`. Use a header-capable implementation such as `ws` when you
  need to forward custom HTTP headers during the handshake.

## Speech Models

You can create models that call the [Deepgram text-to-speech API](https://developers.deepgram.com/docs/text-to-speech)
using the `.speech()` factory method.

The first argument is the voice family ID: `aura-2` (current generation) or
`aura` (Aura-1). The voice and language are selected with the
`generateSpeech` `voice` and `language` options — the provider composes the
upstream Deepgram model ID as `<family>-<voice>-<language>` (language
defaults to `en`):

```ts
import { generateSpeech } from 'ai';
import { deepgram } from '@ai-sdk/deepgram';

const result = await generateSpeech({
  model: deepgram.speech('aura-2'),
  voice: 'thalia',
  language: 'en',
  text: 'Hello, world!',
});
```

Full voice model IDs (e.g. `deepgram.speech('aura-2-helena-en')`) still pass
through, but the family ID + `voice`/`language` form above is the recommended
path — it matches voice selection in the other speech providers.

You can also pass additional provider-specific options using the `providerOptions` argument:

```ts {7-11}
import { generateSpeech } from 'ai';
import { deepgram, type DeepgramSpeechModelOptions } from '@ai-sdk/deepgram';

const result = await generateSpeech({
  model: deepgram.speech('aura-2'),
  voice: 'helena',
  text: 'Hello, world!',
  providerOptions: {
    deepgram: {
      encoding: 'linear16',
      sampleRate: 24000,
    } satisfies DeepgramSpeechModelOptions,
  },
});
```

The following provider options are available:

- **encoding** *string*

  Encoding type for the audio output.
  Supported values: `'linear16'`, `'mulaw'`, `'alaw'`, `'mp3'`, `'opus'`, `'flac'`, `'aac'`.
  Optional.

- **container** *string*

  Container format for the output audio.
  Supported values: `'wav'`, `'ogg'`, `'none'`.
  Optional.

- **sampleRate** *number*

  Sample rate for the output audio in Hz.
  Supported values depend on the encoding: `8000`, `16000`, `24000`, `32000`, `48000`.
  Optional.

- **bitRate** *number | string*

  Bitrate of the audio in bits per second.
  For `mp3`: `32000` or `48000`.
  For `opus`: `4000` to `650000`.
  For `aac`: `4000` to `192000`.
  Optional.

- **callback** *string*

  Not supported. Deepgram processes requests with a callback URL asynchronously
  and answers with a JSON acknowledgement (`{ "request_id": "..." }`) instead of
  audio, so `generateSpeech` rejects this option with an `InvalidArgumentError`.
  Call the Deepgram REST API directly when you need asynchronous callback
  delivery.

- **callbackMethod** *enum*

  Not supported. Only used together with `callback`, which `generateSpeech`
  rejects. Allowed values: `'POST'`, `'PUT'`. The option is ignored with an
  `unsupported` warning.

- **mipOptOut** *boolean*

  Opts out requests from the Deepgram Model Improvement Program.
  Optional.

- **tag** *string | array of strings*

  Label your requests for identification during usage reporting.
  Optional.

Speech results include Deepgram response details in
`providerMetadata.deepgram`: `modelName` (the resolved upstream model),
`modelUuid`, `additionalModelUuids`, `charCount` (the billed character
count), `breaksApplied`, `pronunciationsApplied`,
`pronunciationWarnings` (when present), and `requestId`.

The `generateSpeech` `speed` option is passed through to Deepgram's `speed`
parameter. Deepgram accepts speeds in the 0.7–1.5 range and rejects
out-of-range values with a 400 error; speed is not supported for all
languages. `instructions` is not supported and is ignored with a warning.

### Model Capabilities

| Family   | Voices (selected via the `voice` option)                                    |
| -------- | --------------------------------------------------------------------------- |
| `aura-2` | 41 English, 17 Spanish, 9 Dutch, 7 German, 10 Italian, 5 Japanese, 2 French |
| `aura`   | 12 English (Aura-1)                                                         |

See the [full voice list](https://developers.deepgram.com/docs/tts-models)
for all voice names and accents.

## Transcription Models

You can create models that call the [Deepgram transcription API](https://developers.deepgram.com/docs/pre-recorded-audio)
using the `.transcription()` factory method.

The first argument is the model id e.g. `nova-3`.

```ts
const model = deepgram.transcription('nova-3');
```

You can also pass additional provider-specific options using the `providerOptions` argument. For example, supplying the `summarize` option will enable summaries for sections of content.

```ts {11-15}
import { transcribe } from 'ai';
import {
  deepgram,
  type DeepgramTranscriptionModelOptions,
} from '@ai-sdk/deepgram';
import { readFile } from 'fs/promises';

const result = await transcribe({
  model: deepgram.transcription('nova-3'),
  audio: await readFile('audio.mp3'),
  providerOptions: {
    deepgram: {
      summarize: 'v2',
    } satisfies DeepgramTranscriptionModelOptions,
  },
});
```

The following provider options are available:

- **language** *string*

  Language code for the audio.
  Supports numerous ISO-639-1 and ISO-639-3 language codes.
  Optional.

- **detectLanguage** *boolean*

  Whether to enable automatic language detection.
  When true, Deepgram will detect the language of the audio.
  Optional.

- **smartFormat** *boolean*

  Whether to apply smart formatting to the transcription.
  Optional.

- **punctuate** *boolean*

  Whether to add punctuation to the transcription.
  Optional.

- **summarize** *enum | boolean*

  Whether to generate a summary of the transcription.
  Allowed values: `'v2'`, `false`.
  Optional.

- **topics** *boolean*

  Whether to detect topics in the transcription.
  Optional.

- **detectEntities** *boolean*

  Whether to detect entities in the transcription.
  Optional.

- **redact** *string | array of strings*

  Specifies what content to redact from the transcription.
  Optional.

- **search** *string*

  Search term to find in the transcription.
  Optional.

- **diarize** *boolean*

  Whether to identify different speakers in the transcription.
  Defaults to `false`. Note that Deepgram bills speaker diarization as a
  per-minute add-on.
  Optional.

- **utterances** *boolean*

  Whether to segment the transcription into utterances.
  Optional.

- **uttSplit** *number*

  Threshold for splitting utterances.
  Optional.

- **fillerWords** *boolean*

  Whether to include filler words (um, uh, etc.) in the transcription.
  Optional.

- **paragraphs** *boolean*

  Whether to format the transcription into paragraphs.
  Optional.

- **intents** *boolean*

  Whether to detect intents in the transcription.
  Optional.

- **sentiment** *boolean*

  Whether to analyze sentiment in the transcription.
  Optional.

- **keyterm** *string*

  Key term to improve recognition accuracy for.
  Optional.

- **replace** *string*

  String to replace redacted content with.
  Optional.

### Model Capabilities

| Model                                                                                              | Transcription | Duration | Segments | Language |
| -------------------------------------------------------------------------------------------------- | ------------- | -------- | -------- | -------- |
| `nova-3` (+ [variants](https://developers.deepgram.com/docs/models-languages-overview#nova-3))     | ✓             | ✓        | ✓        | ✗        |
| `nova-2` (+ [variants](https://developers.deepgram.com/docs/models-languages-overview#nova-2))     | ✓             | ✓        | ✓        | ✗        |
| `nova` (+ [variants](https://developers.deepgram.com/docs/models-languages-overview#nova))         | ✓             | ✓        | ✓        | ✗        |
| `enhanced` (+ [variants](https://developers.deepgram.com/docs/models-languages-overview#enhanced)) | ✓             | ✓        | ✓        | ✗        |
| `base` (+ [variants](https://developers.deepgram.com/docs/models-languages-overview#base))         | ✓             | ✓        | ✓        | ✗        |

## Streaming Transcription

Use `experimental_streamTranscribe` with Nova models to transcribe live audio
through Deepgram's [`/v1/listen` WebSocket API](https://developers.deepgram.com/reference/speech-to-text/listen-streaming):

```ts
import { deepgram } from '@ai-sdk/deepgram';
import { experimental_streamTranscribe as streamTranscribe } from 'ai';

const result = streamTranscribe({
  model: deepgram.transcription('nova-3'),
  audio: audioStream, // ReadableStream<Uint8Array | string>
  inputAudioFormat: { type: 'audio/pcm', rate: 16000 },
  providerOptions: {
    deepgram: {
      language: 'en',
      streaming: { interimResults: true, endpointing: 300 },
    },
  },
});

for await (const part of result.fullStream) {
  if (part.type === 'transcript-partial' || part.type === 'transcript-final') {
    console.log(part.type, part.text);
  }
}

console.log(await result.text);
console.log(await result.segments);
console.log(await result.durationInSeconds);
```

Input chunks contain raw 16-bit little-endian PCM (`audio/pcm`), G.711 μ-law
(`audio/pcmu`), or G.711 A-law (`audio/pcma`). Set `rate` to the actual sample
rate. Strings contain base64-encoded audio. Closing the audio input flushes the
remaining transcript before the result finishes. Idle input connections send
keepalive messages, and cancellation closes the socket and cancels the audio
source.

The provider authenticates with WebSocket subprotocols when using a Deepgram API
key, so native WebSockets work without custom headers. Keep long-lived API keys
on the server. Flux models use a separate `/v2/listen` protocol and are not
supported by this implementation.

To authenticate with a short-lived token, use the Bearer scheme:

```ts
const deepgram = createDeepgram({
  apiKey: temporaryToken,
  headers: { authorization: `Bearer ${temporaryToken}` },
});
```

Live transcription supports `language`, `smartFormat`, `punctuate`, `diarize`,
`fillerWords`, `redact`, `replace`, `search`, and `keyterm`. Batch-only settings
produce warnings. The optional `providerOptions.deepgram.streaming` object
accepts:

- **interimResults** *boolean*: emit revisable partial transcripts (default `false`).
- **endpointing** *number | false*: silence duration in milliseconds before
  finalizing an utterance; `false` disables endpointing.
- **channels** *number*: number of interleaved audio channels (default `1`).
- **multichannel** *boolean*: transcribe each channel independently.
- **vadEvents** *boolean*: include speech-start events when `includeRawChunks` is enabled.
- **utteranceEndMs** *number*: silence duration in milliseconds before an
  utterance-end event; at least `1000`, used with `interimResults`.

Final transcript parts contain channel indices and timing. Aggregate text and
segments combine all channels in chronological order; consume `fullStream` when
you need each segment's channel index. Word timings appear in `result.segments`, and Deepgram's reported duration appears in
`result.durationInSeconds`. Native usage (`{ seconds: duration }`) is forwarded
to the `experimental_onStreamTranscriptionEnd` telemetry callback. The
`providerMetadata.deepgram.speechFinal` flag indicates an utterance boundary.
Enable `includeRawChunks` for complete provider events, including request IDs,
speaker labels, and utterance-end events.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)