---
title: Rev.ai
description: Learn how to set up the Rev.ai provider and check AI Gateway availability.
url: "https://ai-sdk.dev/providers/ai-sdk-providers/revai"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/ai-sdk-providers/revai.md"
fetched_at: "2026-10-26T09:52:56.075Z"
sha256: "1560b46177a812752adcfb73d80c22f2029f3d36bc23fcb6e5b161d7a87ad847"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The [Rev.ai](https://www.rev.ai/) provider contains language model support for the Rev.ai transcription API.
Rev.ai models are not currently available through [AI Gateway](https://vercel.com/ai-gateway/models), so the opening example uses `@ai-sdk/revai` directly. See [Using AI Gateway](#using-ai-gateway) below for supported alternatives.

```ts
import { transcribe } from 'ai';
import { revai } from '@ai-sdk/revai';
import { readFile } from 'node:fs/promises';

const { text } = await transcribe({
  model: revai.transcription('machine'),
  audio: await readFile('audio.mp3'),
});

console.log(text);
```

The example transcribes an `audio.mp3` file from your project.

## Using AI Gateway

The current [AI Gateway model catalog](https://vercel.com/ai-gateway/models) does not list Rev.ai models. Use `@ai-sdk/revai` for the APIs on this page. To use other transcription models through Gateway, install `ai` and configure a Gateway API key:

```bash
pnpm add ai
```

Set an [AI Gateway API key](https://vercel.com/docs/ai-gateway/getting-started) in your environment:

```bash
export AI_GATEWAY_API_KEY=your_api_key_here
```

Vercel deployments can also use [OIDC authentication](/providers/ai-sdk-providers/ai-gateway#oidc-authentication-vercel-deployments).
See the [Gateway documentation](/providers/ai-sdk-providers/ai-gateway) for supported models and APIs.

## Using `@ai-sdk/revai`

For direct access to Rev.ai, install `ai` and `@ai-sdk/revai`:

```bash
pnpm add ai @ai-sdk/revai
```

Set your Rev.ai API credential in the `REVAI_API_KEY` environment variable:

```bash
export REVAI_API_KEY=your_api_key_here
```

The following sections document the direct `@ai-sdk/revai` provider, including
its model factories and settings. Gateway model and feature availability can
differ.

## Provider Instance

You can import the default provider instance `revai` from `@ai-sdk/revai`:

```ts
import { revai } from '@ai-sdk/revai';
```

If you need a customized setup, you can import `createRevai` from `@ai-sdk/revai` and create a provider instance with your settings:

```ts
import { createRevai } from '@ai-sdk/revai';

const revai = createRevai({
  // custom settings, e.g.
  fetch: customFetch,
});
```

You can use the following optional settings to customize the Rev.ai provider instance:

- **apiKey** *string*

  API key that is being sent using the `Authorization` header.
  It defaults to the `REVAI_API_KEY` environment variable.

- **headers** *Record\<string,string>*

  Custom headers to include in the requests.

- **fetch** *(input: RequestInfo, init?: RequestInit) => Promise\<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

## Transcription Models

You can create models that call the [Rev.ai transcription API](https://www.rev.ai/docs/api/transcription)
using the `.transcription()` factory method.

The first argument is the model id e.g. `machine`.

```ts
const model = revai.transcription('machine');
```

You can also pass additional provider-specific options using the `providerOptions` argument. For example, supplying the input language in ISO-639-1 (e.g. `en`) format can sometimes improve transcription performance if known beforehand.

```ts {7}
import { transcribe } from 'ai';
import { revai } from '@ai-sdk/revai';
import { type RevaiTranscriptionModelOptions } from '@ai-sdk/revai';
import { readFile } from 'fs/promises';

const result = await transcribe({
  model: revai.transcription('machine'),
  audio: await readFile('audio.mp3'),
  providerOptions: {
    revai: { language: 'en' } satisfies RevaiTranscriptionModelOptions,
  },
});
```

The following provider options are available:

- **metadata** *string*

  Optional metadata string to associate with the transcription job.

- **notification\_config** *object*

  Configuration for webhook notifications when job is complete.

  - **url** *string* - URL to send the notification to.
  - **auth\_headers** *object* - Optional authorization headers for the notification request.
    - **Authorization** *string* - Authorization header value.

- **delete\_after\_seconds** *integer*

  Number of seconds after which the job will be automatically deleted.

- **verbatim** *boolean*

  Whether to include filler words and false starts in the transcription.

- **rush** *boolean*

  \[HIPAA Unsupported] Whether to prioritize the job for faster processing. Only available for human transcriber option.

- **test\_mode** *boolean*

  Whether to run the job in test mode. Default is `false`.

- **segments\_to\_transcribe** *Array*

  Specific segments of the audio to transcribe.

  - **start** *number* - Start time of the segment in seconds.
  - **end** *number* - End time of the segment in seconds.

- **speaker\_names** *Array*

  Names to assign to speakers in the transcription.

  - **display\_name** *string* - Display name for the speaker.

- **skip\_diarization** *boolean*

  Whether to skip speaker diarization. Default is `false`.

- **skip\_postprocessing** *boolean*

  Whether to skip post-processing steps. Only available for English and Spanish languages. Default is `false`.

- **skip\_punctuation** *boolean*

  Whether to skip adding punctuation to the transcription. Default is `false`.

- **remove\_disfluencies** *boolean*

  Whether to remove disfluencies (um, uh, etc.) from the transcription. Default is `false`.

- **remove\_atmospherics** *boolean*

  Whether to remove atmospheric sounds (like `<laugh>`, `<affirmative>`) from the transcription. Default is `false`.

- **filter\_profanity** *boolean*

  Whether to filter profanity from the transcription by replacing characters with asterisks except for the first and last. Default is `false`.

- **speaker\_channels\_count** *integer*

  Number of speaker channels in the audio. Only available for English, Spanish and French languages.

- **speakers\_count** *integer*

  Expected number of speakers in the audio. Only available for English, Spanish and French languages.

- **diarization\_type** *string*

  Type of diarization to use. Possible values: "standard" (default), "premium".

- **custom\_vocabulary\_id** *string*

  ID of a custom vocabulary to use for the transcription, submitted through the Custom Vocabularies API.

- **custom\_vocabularies** *Array*

  Custom vocabularies to use for the transcription.

- **strict\_custom\_vocabulary** *boolean*

  Whether to strictly enforce custom vocabulary.

- **summarization\_config** *object*

  Configuration for generating a summary of the transcription.

  - **model** *string* - Model to use for summarization. Possible values: "standard" (default), "premium".
  - **type** *string* - Format of the summary. Possible values: "paragraph" (default), "bullets".
  - **prompt** *string* - Custom prompt for the summarization (mutually exclusive with type).

- **translation\_config** *object*

  Configuration for translating the transcription.

  - **target\_languages** *Array* - Target languages for translation. Each item is an object with:
    - **language** *string* - Language code. Possible values: "en", "en-us", "en-gb", "ar", "pt", "pt-br", "pt-pt", "fr", "fr-ca", "es", "es-es", "es-la", "it", "ja", "ko", "de", "ru".
  - **model** *string* - Model to use for translation. Possible values: "standard" (default), "premium".

- **language** *string*

  Language of the audio content, provided as an ISO 639-1 language code, with some exceptions such as region-qualified codes (for example "en-us"). Default is "en".

- **forced\_alignment** *boolean*

  Whether to perform forced alignment, which provides improved accuracy for per-word timestamps.
  Default is `false`.

  Currently supported languages:

  - English (en, en-us, en-gb)
  - French (fr)
  - Italian (it)
  - German (de)
  - Spanish (es)

  Note: This option is not available in low-cost environments.

### Model Capabilities

| Model      | Transcription | Duration | Segments | Language |
| ---------- | ------------- | -------- | -------- | -------- |
| `machine`  | ✓             | ✓        | ✓        | ✓        |
| `low_cost` | ✓             | ✓        | ✓        | ✓        |
| `fusion`   | ✓             | ✓        | ✓        | ✓        |

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)