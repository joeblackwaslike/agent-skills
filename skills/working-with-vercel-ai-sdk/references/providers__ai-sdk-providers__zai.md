---
title: Z.AI
description: Learn how to use Z.AI with AI Gateway and the direct provider.
url: "https://ai-sdk.dev/providers/ai-sdk-providers/zai"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/ai-sdk-providers/zai.md"
fetched_at: "2026-10-26T09:52:56.075Z"
sha256: "f0c81bb6856b068763df50f0e38b9b247d0a2c8f32ce645c18a2b7055c663a69"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The [Z.AI](https://z.ai/) provider gives you access to GLM language and vision models through the Z.AI API.
You can use Z.AI models through [AI Gateway](/providers/ai-sdk-providers/ai-gateway) (recommended) or connect directly with `@ai-sdk/zai`.

```ts provider="zai" model="zai/glm-5.3"
import { generateText } from 'ai';

const { text } = await generateText({
  model: "zai/glm-5.3",
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});

console.log(text);
```

## Using AI Gateway

The AI SDK uses AI Gateway by default for model strings. Gateway provides access to models across providers through a single API key, with usage and cost tracking. Install `ai`:

```bash
pnpm add ai
```

Set an [AI Gateway API key](https://vercel.com/docs/ai-gateway/getting-started) in your environment:

```bash
export AI_GATEWAY_API_KEY=your_api_key_here
```

Vercel deployments can also use [OIDC authentication](/providers/ai-sdk-providers/ai-gateway#oidc-authentication-vercel-deployments).
See the [AI Gateway provider documentation](/providers/ai-sdk-providers/ai-gateway) for configuration and the [model catalog](https://vercel.com/ai-gateway/models) for available models.

Gateway feature and provider-option support depends on the model and the provider serving the request. See [Gateway provider options](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options).

## Using `@ai-sdk/zai`

For direct access to Z.AI, install `ai` and `@ai-sdk/zai`:

```bash
pnpm add ai @ai-sdk/zai
```

Set your Z.AI API credential in the `ZAI_API_KEY` environment variable:

```bash
export ZAI_API_KEY=your_api_key_here
```

AI Gateway does not expose every API in `@ai-sdk/zai`. Use the direct provider for provider-specific APIs or custom connection settings.

The following sections document the direct `@ai-sdk/zai` provider, including
its model factories and settings. Gateway model and feature availability can
differ.

API keys can be created in the [Z.AI API key console](https://z.ai/manage-apikey/apikey-list).

## Provider Instance

Import the default provider instance `zai` from `@ai-sdk/zai`:

```ts
import { zai } from '@ai-sdk/zai';
```

For custom configuration, use `createZai`:

```ts
import { createZai } from '@ai-sdk/zai';

const zai = createZai({
  apiKey: process.env.ZAI_API_KEY,
  baseURL: 'https://api.z.ai/api/paas/v4',
});
```

The provider accepts these optional settings:

- **apiKey** *string*

  API key sent in the `Authorization` header. It defaults to the `ZAI_API_KEY` environment variable.

- **baseURL** *string*

  URL prefix for API requests. It defaults to `https://api.z.ai/api/paas/v4`.

- **headers** *Record\<string, string>*

  Additional request headers.

- **fetch** *FetchFunction*

  Custom fetch implementation, for example to intercept requests in middleware.

## Language Models

Create a language model by passing its model id to the provider:

```ts
import { zai } from '@ai-sdk/zai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: zai('glm-5.3'),
  prompt: 'Explain quantum entanglement in simple terms.',
});
```

Current model families include GLM 5, GLM 4.7, GLM 4.6, GLM 4.5, and the GLM vision models. Model availability changes over time; see the [Z.AI model documentation](https://docs.z.ai/guides/llm) for the current catalog.

The provider supports:

- text generation and streaming
- reasoning output and reasoning history
- function calling, including incremental tool-call streaming
- JSON object output
- URL-based image and video inputs on compatible vision models

## Provider Options

Z.AI-specific options can be passed through `providerOptions.zai`:

```ts
import { zai } from '@ai-sdk/zai';
import { generateText } from 'ai';

const result = await generateText({
  model: zai('glm-5.3'),
  prompt: 'Compare two approaches to implementing a rate limiter.',
  providerOptions: {
    zai: {
      thinking: { type: 'enabled', clearThinking: true },
      reasoningEffort: 'high',
      requestId: 'request-123456',
      userId: 'user-123456',
    },
  },
});
```

The following options are available:

- **doSample** *boolean*

  Enables sampling. When disabled, `temperature` and `topP` do not take effect.

- **thinking** *object*

  Controls thinking with `type: 'enabled' | 'disabled'`. Set `clearThinking` to `false` to retain reasoning from previous assistant messages.

- **reasoningEffort** *'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | 'max'*

  Controls reasoning effort on supported models.

- **toolStream** *boolean*

  Enables incremental function-call argument streaming on supported models.

- **requestId** *string*

  A caller-provided request id between 6 and 64 characters.

- **userId** *string*

  A non-sensitive end-user id between 6 and 128 characters.

## Streaming Tool Calls

Enable `toolStream` when you want supported GLM models to stream function-call arguments incrementally:

```ts
import { zai } from '@ai-sdk/zai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

const result = streamText({
  model: zai('glm-5.3'),
  prompt: 'What is the weather in San Francisco?',
  tools: {
    weather: tool({
      description: 'Get the weather for a city',
      inputSchema: z.object({ city: z.string() }),
    }),
  },
  providerOptions: {
    zai: { toolStream: true },
  },
});

for await (const part of result.fullStream) {
  console.log(part);
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)