---
source: "https://ai-sdk.dev/providers/openai-compatible-providers/heroku.md"
fetched_at: "2026-06-11T15:39:44.005Z"
sha256: "e62d6a3cb6b170f886bd45160986fc22ce25c29e1e23843213e58c7d2383d29c"
---

# Heroku Provider

[Heroku](https://heroku.com/) is a cloud platform that allows you to deploy and run applications, including AI models with OpenAI API compatibility.
You can deploy models that are OpenAI API compatible and use them with the AI SDK.

## Setup

The Heroku provider is available via the `@ai-sdk/openai-compatible` module as it is compatible with the OpenAI API.
You can install it with

<Tabs items={['pnpm', 'npm', 'yarn']}>
  <Tab>
    <Snippet text="pnpm add @ai-sdk/openai-compatible" dark />
  </Tab>
  <Tab>
    <Snippet text="npm install @ai-sdk/openai-compatible" dark />
  </Tab>
  <Tab>
    <Snippet text="yarn add @ai-sdk/openai-compatible" dark />
  </Tab>
</Tabs>

### Heroku Setup

1. Create a test app in Heroku:

```bash
heroku create
```

2. Inference using claude-3-5-haiku:

```bash
heroku ai:models:create -a $APP_NAME claude-3-5-haiku
```

3. Export Variables:

```bash
export INFERENCE_KEY=$(heroku config:get INFERENCE_KEY -a $APP_NAME)
export INFERENCE_MODEL_ID=$(heroku config:get INFERENCE_MODEL_ID -a $APP_NAME)
export INFERENCE_URL=$(heroku config:get INFERENCE_URL -a $APP_NAME)
```

## Provider Instance

To use Heroku, you can create a custom provider instance with the `createOpenAICompatible` function from `@ai-sdk/openai-compatible`:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const heroku = createOpenAICompatible({
  name: 'heroku',
  baseURL: process.env.INFERENCE_URL + '/v1',
  apiKey: process.env.INFERENCE_KEY,
});
```

Be sure to have your `INFERENCE_KEY`, `INFERENCE_MODEL_ID`, and `INFERENCE_URL` set in your environment variables.

## Language Models

You can create Heroku models using a provider instance.
The first argument is the served model name, e.g. `claude-3-5-haiku`.

```ts
const model = heroku('claude-3-5-haiku');
```

### Example

You can use Heroku language models to generate text with the `generateText` function:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText } from 'ai';

const heroku = createOpenAICompatible({
  name: 'heroku',
  baseURL: process.env.INFERENCE_URL + '/v1',
  apiKey: process.env.INFERENCE_KEY,
});

const { text } = await generateText({
  model: heroku('claude-3-5-haiku'),
  prompt: 'Tell me about yourself in one sentence',
});

console.log(text);
```

Heroku language models are also able to generate text in a streaming fashion with the `streamText` function:

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';

const heroku = createOpenAICompatible({
  name: 'heroku',
  baseURL: process.env.INFERENCE_URL + '/v1',
  apiKey: process.env.INFERENCE_KEY,
});

const result = streamText({
  model: heroku('claude-3-5-haiku'),
  prompt: 'Tell me about yourself in one sentence',
});

for await (const message of result.textStream) {
  console.log(message);
}
```

Heroku language models also support structured data generation with [`Output`](/docs/reference/ai-sdk-core/output).


## Navigation

- [Writing a Custom Provider](/providers/openai-compatible-providers/custom-providers)
- [LM Studio](/providers/openai-compatible-providers/lmstudio)
- [NVIDIA NIM](/providers/openai-compatible-providers/nim)
- [Clarifai](/providers/openai-compatible-providers/clarifai)
- [Heroku](/providers/openai-compatible-providers/heroku)
- [NEAR AI Cloud](/providers/openai-compatible-providers/nearai)


[Full Sitemap](/sitemap.md)
