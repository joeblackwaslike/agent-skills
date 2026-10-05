---
title: QVAC
description: Learn how to use the QVAC provider.
url: "https://ai-sdk.dev/providers/community-providers/qvac"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/community-providers/qvac.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "31ce191aef1177c0e4be33c510889aa3a474ce31f92884e35d8ae1b03af79377"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[QVAC](https://qvac.tether.io) is an open-source, cross-platform runtime for local-first, peer-to-peer AI — LLMs, embeddings, transcription, translation, speech, and image generation, all running on the user's own hardware.

[`@qvac/ai-sdk-provider`](https://www.npmjs.com/package/@qvac/ai-sdk-provider) is a branded wrapper around [`@ai-sdk/openai-compatible`](https://www.npmjs.com/package/@ai-sdk/openai-compatible) that points at a local `qvac serve openai` HTTP server and re-exports QVAC's typed model metadata.

This provider talks to a local OpenAI-compatible server. Install
[`@qvac/cli`](https://www.npmjs.com/package/@qvac/cli) and start it with `qvac
    serve openai` before using the provider.

## Setup

The QVAC provider is available in the `@qvac/ai-sdk-provider` module. You can install it with:

#### pnpm

```
pnpm add @qvac/ai-sdk-provider ai @ai-sdk/openai-compatible
```

#### npm

```
npm install @qvac/ai-sdk-provider ai @ai-sdk/openai-compatible
```

#### yarn

```
yarn add @qvac/ai-sdk-provider ai @ai-sdk/openai-compatible
```

#### bun

```
bun add @qvac/ai-sdk-provider ai @ai-sdk/openai-compatible
```

`ai` and `@ai-sdk/openai-compatible` are peer dependencies — install them alongside.

## Provider Instance

Import `createQvac` from `@qvac/ai-sdk-provider` and create a provider instance pointing at your running `qvac serve openai`:

```ts
import { createQvac } from '@qvac/ai-sdk-provider';

const qvac = createQvac({
  baseURL: 'http://127.0.0.1:11434/v1', // match your `qvac serve` port
  apiKey: 'qvac', // anything non-empty; serve does not validate
});
```

## Language Models

You can create models by passing a `qvac serve` alias to the provider instance:

```ts
import { createQvac } from '@qvac/ai-sdk-provider';
import { generateText } from 'ai';

const qvac = createQvac({
  baseURL: 'http://127.0.0.1:11434/v1',
  apiKey: 'qvac',
});

const { text } = await generateText({
  model: qvac('qwen3.5-0.8b'),
  prompt: 'Write a haiku about local-first AI.',
});

console.log(text);
```

## Additional Resources

- [QVAC](https://qvac.tether.io)
- [npm Package](https://www.npmjs.com/package/@qvac/ai-sdk-provider)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)