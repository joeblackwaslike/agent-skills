---
title: Models & Providers
product: vercel
url: /docs/ai-gateway/models-and-providers
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers"
last_updated: 2026-05-11
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/models-and-providers/model-fallbacks
  - /docs/ai-gateway/models-and-providers/provider-timeouts
  - /docs/ai-gateway/models-and-providers/routing-rules
summary: Learn about models and providers for the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "43c61159b5e791b81f9f9f391bb053afbe244c03179e32c1bfdbca2c561753a8"
---

# Models & Providers

The AI Gateway's unified API provides flexibility, allowing you to switch between [different AI models](https://vercel.com/ai-gateway/models) and providers without rewriting parts of your application. This is useful for testing different models or when you want to change the underlying AI provider for cost or performance reasons. You can also configure [provider routing and model fallbacks](/docs/ai-gateway/models-and-providers/provider-options) to ensure high availability and reliability.

> **💡 Note:** To view the list of supported models and providers, check out the [AI Gateway
> models page](https://vercel.com/ai-gateway/models).

### In this section

Configure how AI Gateway selects providers and routes requests, and apply capabilities to any model:

- **Routing and selection**: [Provider options](/docs/ai-gateway/models-and-providers/provider-options), [provider filtering and ordering](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering), [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks), [provider timeouts](/docs/ai-gateway/models-and-providers/provider-timeouts), [routing rules](/docs/ai-gateway/models-and-providers/routing-rules), and [virtual models](/docs/ai-gateway/models-and-providers/virtual-models)
- **Performance and cost**: [Automatic caching](/docs/ai-gateway/models-and-providers/automatic-caching), [service tiers](/docs/ai-gateway/models-and-providers/service-tiers), [uptime and status](/docs/ai-gateway/models-and-providers/uptime), and [metrics](/docs/ai-gateway/models-and-providers/metrics)
- **Model capabilities**: [Reasoning](/docs/ai-gateway/models-and-providers/reasoning) and [web search](/docs/ai-gateway/models-and-providers/web-search)

### What are models and providers?

Models are AI algorithms that process your input data to generate responses, such as [Grok 4.3](/ai-gateway/models/grok-4.3), [GPT-5.5](/ai-gateway/models/gpt-5.5), or [Claude Opus 4.7](/ai-gateway/models/claude-opus-4.7). Providers are the companies or services that host these models, such as xAI, OpenAI, or Anthropic.

In some cases, multiple providers, including the model creator, host the same model. For example, you can use the `xai/grok-4.3` model from xAI or the `openai/gpt-5.5` model from OpenAI, following the format `creator/model-name`.

Different providers may have different specifications for the same model such as different pricing and performance. You can choose the one that best fits your needs.

You can view the list of supported models and providers in three ways:

**Through the AI Gateway dashboard:**

1. Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in your Vercel dashboard
2. Click **Model List** within the AI Gateway tab

**Through the AI Gateway site:**

Visit the [AI Gateway models page](https://vercel.com/ai-gateway/models) to browse all available models, filter by provider, and view pricing details.

**Through the REST API:**

Query the models endpoint directly to get a JSON list of all available models with pricing and capabilities:

```
https://ai-gateway.vercel.sh/v1/models
```

This endpoint requires no authentication and returns detailed information including model IDs, context windows, and pricing. See [Dynamic model discovery](#dynamic-model-discovery) for usage examples.

### Specifying the model

There are two ways to specify the model and provider to use for an AI Gateway request:

- [As part of an AI SDK function call](#as-part-of-an-ai-sdk-function-call)
- [Globally for all requests in your application](#globally-for-all-requests-in-your-application)

#### As part of an AI SDK function call

In the AI SDK, you can specify the model and provider directly in your API calls using either plain strings or the AI Gateway provider. This allows you to switch models or providers for specific requests without affecting the rest of your application.

To use AI Gateway, specify a model and provider via a plain string, for example:

```typescript filename="app/api/chat/route.ts" {6}
import { generateText } from 'ai';
import { NextRequest } from 'next/server';

export async function GET() {
  const result = await generateText({
    model: 'xai/grok-4.3',
    prompt: 'Tell me the history of the San Francisco Mission-style burrito.',
  });
  return Response.json(result);
}
```

You can test different models by changing the `model` parameter and opening your browser to `http://localhost:3000/api/chat`.

You can also use a provider instance. This can be useful if you'd like to create models to use with a [custom provider](https://ai-sdk.dev/docs/ai-sdk-core/provider-management#custom-providers) or if you'd like to use a Gateway provider with the AI SDK [Provider Registry](https://ai-sdk.dev/docs/ai-sdk-core/provider-management#provider-registry).

Install the `@ai-sdk/gateway` package directly as a dependency in your project.

```bash filename="terminal"
pnpm install @ai-sdk/gateway
```

You can change the model by changing the string passed to `gateway()`.

```typescript filename="app/api/chat/route.ts" {2, 7}
import { generateText } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { NextRequest } from 'next/server';

export async function GET() {
  const result = await generateText({
    model: gateway('anthropic/claude-opus-4.7'),
    prompt: 'Tell me the history of the San Francisco Mission-style burrito.',
  });
  return Response.json(result);
}
```

The example above uses the default `gateway` provider instance. You can also create a custom provider instance to use in your application. Creating a custom instance is useful when you need to specify a different environment variable for your API key, or when you need to set a custom base URL (for example, if you're working behind a corporate proxy server).

```typescript filename="app/api/chat/route.ts" {4-7, 11}
import { generateText } from 'ai';
import { createGateway } from '@ai-sdk/gateway';

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY, // the default environment variable for the API key
  baseURL: 'https://ai-gateway.vercel.sh/v1/ai', // the default base URL
});

export async function GET() {
  const result = await generateText({
    model: gateway('anthropic/claude-opus-4.7'),
    prompt: 'Why is the sky blue?',
  });
  return Response.json(result);
}
```

#### Globally for all requests in your application

The Vercel AI Gateway is the default provider for the AI SDK when a model is specified as a string. You can set a different provider as the default by assigning the provider instance to the `globalThis.AI_SDK_DEFAULT_PROVIDER` variable.

This is intended to be done in a file that runs before any other AI SDK calls. In the case of a Next.js application, you can do this in [`instrumentation.ts`](https://nextjs.org/docs/app/guides/instrumentation):

```typescript filename="instrumentation.ts" {1, 5}
import { openai } from '@ai-sdk/openai';

export async function register() {
  // This runs once when the Node.js runtime starts
  globalThis.AI_SDK_DEFAULT_PROVIDER = openai;

  // You can also do other initialization here
  console.log('App initialization complete');
}
```

Then, you can use the `generateText` function without specifying the provider in each call.

```typescript filename="app/api/chat/route.ts" {13}
import { generateText } from 'ai';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get('prompt');

  if (!prompt) {
    return Response.json({ error: 'Prompt is required' }, { status: 400 });
  }

  const result = await generateText({
    model: 'openai/gpt-5.5',
    prompt,
  });

  return Response.json(result);
}
```

### Dynamic model discovery

You can programmatically discover all available models and their pricing through the AI SDK or REST API.

#### Using AI SDK

The `getAvailableModels` function retrieves detailed information about
all models configured for the `gateway` provider, including each model's `id`, `name`, `description`, and `pricing` details.

```typescript filename="app/api/chat/route.ts" {4}
import { gateway } from '@ai-sdk/gateway';
import { generateText } from 'ai';

const availableModels = await gateway.getAvailableModels();

availableModels.models.forEach((model) => {
  console.log(`${model.id}: ${model.name}`);
  if (model.description) {
    console.log(`  Description: ${model.description}`);
  }
  if (model.pricing) {
    console.log(`  Input: $${model.pricing.input}/token`);
    console.log(`  Output: $${model.pricing.output}/token`);

    // Some models have tiered pricing based on context size
    if (model.pricing.inputTiers) {
      console.log('  Input tiers:');
      model.pricing.inputTiers.forEach((tier) => {
        const range =
          tier.max !== undefined ? `${tier.min}-${tier.max}` : `${tier.min}+`;
        console.log(`    ${range} tokens: $${tier.cost}/token`);
      });
    }

    if (model.pricing.cachedInputTokens) {
      console.log(
        `  Cached input (read): $${model.pricing.cachedInputTokens}/token`,
      );
    }
    if (model.pricing.cacheCreationInputTokens) {
      console.log(
        `  Cache creation (write): $${model.pricing.cacheCreationInputTokens}/token`,
      );
    }
  }
});

const { text } = await generateText({
  model: availableModels.models[0].id, // e.g., 'openai/gpt-5.5'
  prompt: 'Hello world',
});
```

#### Using REST API

You can also query the models endpoint directly via REST. The endpoint follows the OpenAI models API format and requires no authentication. See [`GET /v1/models`](/docs/ai-gateway/sdks-and-apis/rest-api#list-models) in the REST API reference for the full request and response shape.

For models served by multiple providers, [`GET /v1/models/{creator}/{model}/endpoints`](/docs/ai-gateway/sdks-and-apis/rest-api#get-model-endpoints) returns per-provider pricing, supported parameters, uptime, throughput, and latency.

#### Filtering models by type

You can filter the available models by their type to separate language models, embedding models, reranking models, image models, and video models:

```typescript filename="app/api/models/route.ts"
// Using AI SDK
import { gateway } from '@ai-sdk/gateway';

const { models } = await gateway.getAvailableModels();
const textModels = models.filter((m) => m.modelType === 'language');
const embeddingModels = models.filter((m) => m.modelType === 'embedding');
const rerankingModels = models.filter((m) => m.modelType === 'reranking');
const imageModels = models.filter((m) => m.modelType === 'image');
const videoModels = models.filter((m) => m.modelType === 'video');
```

```typescript filename="filter-models-rest.ts"
// Using REST API
const response = await fetch('https://ai-gateway.vercel.sh/v1/models');
const { data: models } = await response.json();

const textModels = models.filter((m) => m.type === 'language');
const embeddingModels = models.filter((m) => m.type === 'embedding');
const rerankingModels = models.filter((m) => m.type === 'reranking');
const imageModels = models.filter((m) => m.type === 'image');
const videoModels = models.filter((m) => m.type === 'video');
```


---

[View full sitemap](/docs/sitemap)
