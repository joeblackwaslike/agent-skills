---
title: GMI Cloud
description: Learn how to use GMI Cloud with AI Gateway and the direct provider.
url: "https://ai-sdk.dev/providers/ai-sdk-providers/gmicloud"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/ai-sdk-providers/gmicloud.md"
fetched_at: "2026-10-26T09:52:56.075Z"
sha256: "e39cf8fe3675e5b844311b7038c309b97c7748e8151bffbdc589596fd687ac44"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The [GMI Cloud](https://www.gmicloud.ai) provider offers access to open-weight language models through GMI Cloud's GPU inference platform, over an OpenAI-compatible API.
Start with [AI Gateway](/providers/ai-sdk-providers/ai-gateway) for models in its catalog (recommended), or use `@ai-sdk/gmicloud` to connect directly to GMI Cloud.

```ts provider="gmicloud" model="deepseek/deepseek-v4-flash-0731"
import { generateText } from 'ai';

const { text } = await generateText({
  model: "deepseek/deepseek-v4-flash-0731",
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  providerOptions: {
    gateway: {
      order: ['gmicloud'],
    },
  },
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

The example sets `providerOptions.gateway.order` to `['gmicloud']`. This sends the request to GMI Cloud first, then falls back to other available providers of the same model if GMI Cloud is unavailable or the request fails. `order` sets a preference; it does not restrict fallback to GMI Cloud. See [provider ordering](https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering).

The dropdown lists models served by GMI Cloud through Gateway with a corresponding direct-provider example. Provider availability depends on the model and your team's [Provider Allowlist](https://vercel.com/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering).

## Using `@ai-sdk/gmicloud`

For direct access to GMI Cloud, install `ai` and `@ai-sdk/gmicloud`:

```bash
pnpm add ai @ai-sdk/gmicloud
```

Set your GMI Cloud API credential in the `GMI_CLOUD_APIKEY` environment variable:

```bash
export GMI_CLOUD_APIKEY=your_api_key_here
```

AI Gateway does not expose every API in `@ai-sdk/gmicloud`. Use the direct provider for provider-specific APIs or custom connection settings.

The following sections document the direct `@ai-sdk/gmicloud` provider,
including its model factories and settings. Gateway model and feature
availability can differ.

API keys can be obtained from the [GMI Cloud console](https://console.gmicloud.ai).

## Provider Instance

You can import the default provider instance `gmicloud` from `@ai-sdk/gmicloud`:

```ts
import { gmicloud } from '@ai-sdk/gmicloud';
```

For custom configuration, you can import `createGmicloud` and create a provider instance with your settings:

```ts
import { createGmicloud } from '@ai-sdk/gmicloud';

const gmicloud = createGmicloud({
  apiKey: process.env.GMI_CLOUD_APIKEY ?? '',
});
```

You can use the following optional settings to customize the GMI Cloud provider instance:

- **baseURL** *string*

  Use a different URL prefix for API calls.
  The default prefix is `https://api.gmi-serving.com/v1`.

- **apiKey** *string*

  API key that is being sent using the `Authorization` header. It defaults to
  the `GMI_CLOUD_APIKEY` environment variable.

- **headers** *Record\<string,string>*

  Custom headers to include in the requests.

- **fetch** *FetchFunction*

  Custom fetch implementation.

## Language Models

```ts
import { gmicloud } from '@ai-sdk/gmicloud';
import { generateText } from 'ai';

const { text } = await generateText({
  model: gmicloud('deepseek-ai/DeepSeek-V4-Flash-0731'),
  prompt: 'What is the capital of France?',
});
```

GMI Cloud serves an evolving catalog of open-weight models, so model ids are typed as `string`. Embedding and image models are not supported.

## Error diagnostics

GMI Cloud's edge reports a generic banner in `error.message` on rejections and nests the backend engine's diagnostic in `error.details`. This provider unwraps the nested diagnostic, so `AI_APICallError.message` carries the engine's reason (e.g. `The request is invalid: Invalid max_tokens value, the valid range of max_tokens is [1, 393216].`) instead of `Backend request failed with status 400`.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)