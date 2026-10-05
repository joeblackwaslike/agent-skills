---
title: Telnyx
description: Telnyx provider for AI SDK 7
url: "https://ai-sdk.dev/providers/community-providers/telnyx"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/community-providers/telnyx.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "d46c6262c76d9911cc8fccc89cef9a4c97d25268ee73e250cda67986e9243e06"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[Telnyx](https://telnyx.com/) provides an AI SDK provider for the [Vercel AI SDK](https://ai-sdk.dev), giving developers access to chat models, embeddings, speech-to-text, and text-to-speech through a single package.

The Telnyx provider is a good fit if you want:

- **One package for multiple AI capabilities**: chat, embeddings, transcription, and speech generation
- **OpenAI-compatible model access**: use Telnyx-hosted models through a familiar API pattern
- **Speech support in the same provider**: combine text and voice workflows in one integration
- **Simple setup**: standard API key configuration with the AI SDK

Learn more in the [Telnyx documentation](https://developers.telnyx.com/docs/inference/getting-started).

## Setup

The `@telnyx/ai-sdk-provider` package (v2.0.0+) supports AI SDK 7 and the Provider V4 specification.

Install it alongside AI SDK 7:

#### pnpm

```
pnpm add @telnyx/ai-sdk-provider ai@^7 zod
```

#### npm

```
npm install @telnyx/ai-sdk-provider ai@^7 zod
```

#### yarn

```
yarn add @telnyx/ai-sdk-provider ai@^7 zod
```

#### bun

```
bun add @telnyx/ai-sdk-provider ai@^7 zod
```

Set your Telnyx API key as an environment variable:

```bash
export TELNYX_API_KEY="your_api_key_here"
```

## Provider Instance

To create a Telnyx provider instance, use the `createTelnyx` function:

```typescript
import { createTelnyx } from '@telnyx/ai-sdk-provider';

const telnyx = createTelnyx({
  apiKey: process.env.TELNYX_API_KEY,
});
```

You can also use the default `telnyx` export when `TELNYX_API_KEY` is set in your environment.

## Examples

### `generateText`

```typescript
import { telnyx } from '@telnyx/ai-sdk-provider';
import { generateText } from 'ai';

const { text } = await generateText({
  model: telnyx('Qwen/Qwen3-235B-A22B'),
  prompt: 'Explain WebRTC in simple terms.',
});

console.log(text);
```

### `embed`

```typescript
import { telnyx } from '@telnyx/ai-sdk-provider';
import { embed } from 'ai';

const { embedding } = await embed({
  model: telnyx.embeddingModel('thenlper/gte-large'),
  value: 'What is WebRTC?',
});

console.log(embedding);
```

### `experimental_transcribe`

```typescript
import { telnyx } from '@telnyx/ai-sdk-provider';
import { experimental_transcribe as transcribe } from 'ai';
import { readFile } from 'node:fs/promises';

const result = await transcribe({
  model: telnyx.transcriptionModel('distil-whisper/distil-large-v2'),
  audio: await readFile('./audio.wav'),
});

console.log(result.text);
```

### `experimental_generateSpeech`

```typescript
import { telnyx } from '@telnyx/ai-sdk-provider';
import { experimental_generateSpeech as generateSpeech } from 'ai';

const { audio } = await generateSpeech({
  model: telnyx.speech('Telnyx.NaturalHD.astra'),
  text: 'Hello from Telnyx!',
  voice: 'Telnyx.NaturalHD.astra',
});

await audio.writeToFile('./speech.mp3');
```

## Additional Resources

- [Telnyx Provider Repository](https://github.com/team-telnyx/ai-sdk-provider)
- [NPM Package](https://www.npmjs.com/package/@telnyx/ai-sdk-provider)
- [Telnyx AI Inference Docs](https://developers.telnyx.com/docs/inference/getting-started)
- [Telnyx Model Catalog](https://developers.telnyx.com/docs/inference/models)
- [Telnyx Speech Docs](https://developers.telnyx.com/docs/tts-stt/overview)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)