---
source: "https://ai-sdk.dev/providers/openai-compatible-providers/nearai.md"
fetched_at: "2026-06-11T15:39:44.005Z"
sha256: "5de0f92a236c2ab51891f18f804dadf02a398d3dcf6d97a40ba4fc6a2dd53fbd"
---

# NEAR AI Cloud Provider

[NEAR AI Cloud](https://cloud.near.ai) provides TEE-backed inference through an OpenAI-compatible API. You can use it with the AI SDK through the `@ai-sdk/openai-compatible` module.

## Setup

The NEAR AI Cloud provider is available via the `@ai-sdk/openai-compatible` module as it is compatible with the OpenAI API. You can install it with:

<Tabs items={['pnpm', 'npm', 'yarn', 'bun']}>
  <Tab>
    <Snippet text="pnpm add @ai-sdk/openai-compatible" dark />
  </Tab>
  <Tab>
    <Snippet text="npm install @ai-sdk/openai-compatible" dark />
  </Tab>
  <Tab>
    <Snippet text="yarn add @ai-sdk/openai-compatible" dark />
  </Tab>
  <Tab>
    <Snippet text="bun add @ai-sdk/openai-compatible" dark />
  </Tab>
</Tabs>

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

<Note>
  You can create an API key in [NEAR AI Cloud](https://cloud.near.ai). Make sure
  to set the `NEARAI_API_KEY` environment variable with your API key.
</Note>

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


## Navigation

- [Writing a Custom Provider](/providers/openai-compatible-providers/custom-providers)
- [LM Studio](/providers/openai-compatible-providers/lmstudio)
- [NVIDIA NIM](/providers/openai-compatible-providers/nim)
- [Clarifai](/providers/openai-compatible-providers/clarifai)
- [Heroku](/providers/openai-compatible-providers/heroku)
- [NEAR AI Cloud](/providers/openai-compatible-providers/nearai)


[Full Sitemap](/sitemap.md)
