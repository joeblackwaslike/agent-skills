---
title: Sarvam
description: Learn how to use the Sarvam AI provider for the AI SDK.
url: "https://ai-sdk.dev/providers/community-providers/sarvam"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/community-providers/sarvam.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "7e190e1413bb689fc2491d1efb0021945d9d2ed55db872cd9b596752da15d2b1"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The Sarvam AI Provider is a library developed to integrate with the AI SDK. This library brings Speech to Text (STT) capabilities to your applications, allowing for seamless interaction with audio and text data.

## Setup

The Sarvam provider is available in the `sarvam-ai-provider` module. You can install it with:

```bash
pnpm add sarvam-ai-provider
```

## Provider Instance

First, get your **Sarvam API Key** from the [Sarvam Dashboard](https://dashboard.sarvam.ai/auth/signin).

Then initialize `Sarvam` in your application:

```ts
import { createSarvam } from 'sarvam-ai-provider';

const sarvam = createSarvam({
  headers: {
    'api-subscription-key': 'YOUR_API_KEY',
  },
});
```

The `api-subscription-key` needs to be passed in headers. Consider using
`YOUR_API_KEY` as environment variables for security.

- Transcribe speech to text

```ts
import { transcribe } from 'ai';
import { readFile } from 'fs/promises';

await transcribe({
  model: sarvam.transcription('saarika:v2'),
  audio: await readFile('./src/transcript-test.mp3'),
  providerOptions: {
    sarvam: {
      language_code: 'en-IN',
    },
  },
});
```

## Features

### Changing parameters

- Change language\_code

```ts
providerOptions: {
    sarvam: {
      language_code: 'en-IN',
    },
  },
```

`language_code` specifies the language of the input audio and is required for
accurate transcription. • It is mandatory for the `saarika:v1` model (this
model does not support `unknown`). • It is optional for the `saarika:v2`
model. • Use `unknown` when the language is not known; in that case, the API
will auto‑detect it. Available options: `unknown`, `hi-IN`, `bn-IN`, `kn-IN`,
`ml-IN`, `mr-IN`, `od-IN`, `pa-IN`, `ta-IN`, `te-IN`, `en-IN`, `gu-IN`.

- with\_timestamps?

```ts
providerOptions: {
  sarvam: {
    with_timestamps: true,
  },
},
```

`with_timestamps` specifies whether to include start/end timestamps for each
word/token. • Type: boolean • When true, each word/token will include
start/end timestamps. • Default: false

- with\_diarization?

```ts
providerOptions: {
  sarvam: {
    with_diarization: true,
  },
},
```

`with_diarization` enables speaker diarization (Beta). • Type: boolean • When
true, enables speaker diarization. • Default: false

- num\_speakers?

```ts
providerOptions: {
  sarvam: {
    with_diarization: true,
    num_speakers: 2,
  },
},
```

`num_speakers` sets the number of distinct speakers to detect (only when
`with_diarization` is true). • Type: number | null • Number of distinct
speakers to detect. • Default: null

## References

- [Sarvam API Docs](https://docs.sarvam.ai/api-reference-docs/endpoints/speech-to-text)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)