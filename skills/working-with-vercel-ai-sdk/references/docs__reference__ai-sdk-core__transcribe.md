---
title: transcribe
description: API Reference for transcribe.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/transcribe"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/transcribe.md"
fetched_at: "2026-11-09T12:39:36.677Z"
sha256: "7e5fe37a6b7339178e8b415f2a27e66f4361dca72507e8f4e0149a6a9e4031c4"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Generates a transcript from an audio file.

```ts
import { transcribe } from 'ai';
import { openai } from '@ai-sdk/openai';
import { readFile } from 'fs/promises';

const { text: transcript } = await transcribe({
  model: openai.transcription('gpt-4o-transcribe'),
  audio: await readFile('audio.mp3'),
});

console.log(transcript);
```

## Import

```
import { transcribe } from "ai"
```

## API Signature

### Parameters

- `model` (`TranscriptionModelV4`): The transcription model to use.
- `audio` (`DataContent (string | Uint8Array | ArrayBuffer | Buffer) | URL`): The audio file to generate the transcript from. HTTP(S) URLs are sent directly to models with native URL support unless a custom download function is supplied; other models download the audio locally.
- `timestampGranularities?` (`Array<'word' | 'segment'>`): Word and segment timings to request. Supported by the OpenAI, Azure Speech, Vertex Gemini, and xAI adapters. Explicit provider options take precedence; these adapters warn about unavailable requested timings. AI Gateway warns that it does not forward this option; use provider options or a direct provider model. Omit this option to keep provider defaults. An empty array requests no additional timing detail; it does not suppress timings returned by default.
- `providerOptions?` (`Record<string, JSONObject>`): Additional provider-specific options.
- `maxRetries?` (`number`): Maximum number of retries. Default: 2.
- `abortSignal?` (`AbortSignal`): An optional abort signal to cancel the call.
- `headers?` (`Record<string, string>`): Additional HTTP headers for the request.
- `telemetry?` (`TelemetryOptions`): Telemetry configuration. Supports functionId, recordInputs, recordOutputs, isEnabled, and per-call integrations.
- `download?` (`(options: { url: URL; abortSignal?: AbortSignal }) => Promise<{ data: Uint8Array; mediaType: string | undefined }>`): Custom download function for fetching audio from URLs. Supplying this option forces local downloading even for models with native URL support. Use \`createDownload()\` from \`ai\` to create a download function with custom size limits, e.g. \`createDownload(\{ maxBytes: 50 \* 1024 \* 1024 })\`. Default: native URL transcription when supported, otherwise built-in download with 2 GiB limit.

### Returns

- `text` (`string`): The complete transcribed text from the audio input.
- `segments` (`Array<{ text: string; startSecond: number; endSecond: number }>`): An array of transcript segments, each containing a portion of the transcribed text along with its start and end times in seconds.
- `words?` (`Array<{ text: string; startSecond: number; endSecond: number }>`): Word-level timings when the adapter exposes them, including timings returned by default. Undefined when unavailable. Existing segments behavior is preserved: some providers also put word timings in segments.
- `language` (`string | undefined`): The language of the transcript in ISO-639-1 format e.g. "en" for English.
- `durationInSeconds` (`number | undefined`): The duration of the transcript in seconds.
- `warnings` (`Warning[]`): Warnings from the model provider (e.g. unsupported settings).
- `providerMetadata?` (`Record<string, JSONObject>`): Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider.
- `responses` (`Array<TranscriptionModelResponseMetadata>`): Response metadata from the provider. There may be multiple responses if we made multiple calls to the model.
  - `TranscriptionModelResponseMetadata`
    - `timestamp` (`Date`): Timestamp for the start of the generated response.
    - `modelId` (`string`): The ID of the response model that was used to generate the response.
    - `headers?` (`Record<string, string>`): Response headers.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)