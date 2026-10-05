---
title: NEAR AI Cloud
description: Use the NEAR AI Cloud OpenAI compatible API with the AI SDK.
url: "https://ai-sdk.dev/providers/openai-compatible-providers/nearai"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/openai-compatible-providers/nearai.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "3a5e41aa157cb0c18c76ce26209a5c214a622c304971e9a20c98aa66ce0b2ec7"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[NEAR AI Cloud](https://cloud.near.ai) provides TEE-backed inference through an OpenAI-compatible API. You can use it with the AI SDK through the `@ai-sdk/openai-compatible` module.

## Setup

The NEAR AI Cloud provider is available via the `@ai-sdk/openai-compatible` module as it is compatible with the OpenAI API. You can install it with:

**Packages:** `@ai-sdk/openai-compatible`

## Provider Instance

To use NEAR AI Cloud, you can create a custom provider instance with the `createOpenAICompatible` function from `@ai-sdk/openai-compatible`:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const nearai = createOpenAICompatible({
  name: 'nearai',
  baseURL: 'https://cloud-api.near.ai/v1',
  apiKey: process.env.NEARAI_API_KEY,
  transformRequestBody: body => {
    const { reasoning_effort, ...rest } = body;
    return rest;
  },
});
```

You can create an API key in [NEAR AI Cloud](https://cloud.near.ai). Make sure
to set the `NEARAI_API_KEY` environment variable with your API key.

## Language Models

You can create NEAR AI Cloud models using a provider instance. The first argument is the model ID from the [public model catalog](https://cloud-api.near.ai/v1/model/list), e.g. `zai-org/GLM-5.1-FP8`.

```ts
const model = nearai('zai-org/GLM-5.1-FP8');
```

### Example

You can use NEAR AI Cloud language models to generate text with the `generateText` function:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText } from 'ai';

const nearai = createOpenAICompatible({
  name: 'nearai',
  baseURL: 'https://cloud-api.near.ai/v1',
  apiKey: process.env.NEARAI_API_KEY,
  transformRequestBody: body => {
    const { reasoning_effort, ...rest } = body;
    return rest;
  },
});

const { text } = await generateText({
  model: nearai('zai-org/GLM-5.1-FP8'),
  prompt: 'Tell me about yourself in one sentence.',
});

console.log(text);
```

NEAR AI Cloud language models can also generate text in a streaming fashion with the `streamText` function:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';

const nearai = createOpenAICompatible({
  name: 'nearai',
  baseURL: 'https://cloud-api.near.ai/v1',
  apiKey: process.env.NEARAI_API_KEY,
  transformRequestBody: body => {
    const { reasoning_effort, ...rest } = body;
    return rest;
  },
});

const result = streamText({
  model: nearai('zai-org/GLM-5.1-FP8'),
  prompt: 'Write a short haiku about private inference.',
});

for await (const message of result.textStream) {
  console.log(message);
}
```

You can use any supported `modelId` from the NEAR AI Cloud model catalog. Model metadata includes context length, modalities, and whether TEE attestation is supported for that model.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)