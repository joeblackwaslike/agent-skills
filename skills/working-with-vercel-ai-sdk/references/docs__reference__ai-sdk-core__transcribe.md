---
title: transcribe
description: API Reference for transcribe.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/transcribe"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/transcribe.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "0210d4d31a582ca6c46f60244ba02b47f3061f4c09b86eb53ca3c09b5b327984"
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
- `audio` (`DataContent (string | Uint8Array | ArrayBuffer | Buffer) | URL`): The audio file to generate the transcript from.
- `providerOptions?` (`Record<string, JSONObject>`): Additional provider-specific options.
- `maxRetries?` (`number`): Maximum number of retries. Default: 2.
- `abortSignal?` (`AbortSignal`): An optional abort signal to cancel the call.
- `headers?` (`Record<string, string>`): Additional HTTP headers for the request.
- `telemetry?` (`TelemetryOptions`): Telemetry configuration. Supports functionId, recordInputs, recordOutputs, isEnabled, and per-call integrations.
- `download?` (`(options: { url: URL; abortSignal?: AbortSignal }) => Promise<{ data: Uint8Array; mediaType: string | undefined }>`): Custom download function for fetching audio from URLs. Use \`createDownload()\` from \`ai\` to create a download function with custom size limits, e.g. \`createDownload(\{ maxBytes: 50 \* 1024 \* 1024 })\`. Default: built-in download with 2 GiB limit.

### Returns

- `text` (`string`): The complete transcribed text from the audio input.
- `segments` (`Array<{ text: string; startSecond: number; endSecond: number }>`): An array of transcript segments, each containing a portion of the transcribed text along with its start and end times in seconds.
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