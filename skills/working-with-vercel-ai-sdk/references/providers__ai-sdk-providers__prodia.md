---
title: Prodia
description: Learn how to use Prodia with AI Gateway and the direct provider.
url: "https://ai-sdk.dev/providers/ai-sdk-providers/prodia"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/ai-sdk-providers/prodia.md"
fetched_at: "2026-10-26T09:52:56.075Z"
sha256: "ca80b640fcf5ca7b57ef81ec0cbeb26abb67ed9e97a254df9455e42da737a796"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[Prodia](https://prodia.com/) is a fast inference platform for generative AI, offering high-speed image generation with FLUX and Stable Diffusion models.
You can use Prodia models through [AI Gateway](/providers/ai-sdk-providers/ai-gateway) (recommended) or connect directly with `@ai-sdk/prodia`.

```ts provider="prodia" model="prodia/flux-fast-schnell"
import { generateImage } from 'ai';

const { image } = await generateImage({
  model: "prodia/flux-fast-schnell",
  prompt: 'A sunlit mountain village in watercolor.',
});

console.log(image.base64);
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

## Using `@ai-sdk/prodia`

For direct access to Prodia, install `ai` and `@ai-sdk/prodia`:

```bash
pnpm add ai @ai-sdk/prodia
```

Set your Prodia API credential in the `PRODIA_TOKEN` environment variable:

```bash
export PRODIA_TOKEN=your_api_key_here
```

AI Gateway does not expose every API in `@ai-sdk/prodia`. Use the direct provider for provider-specific APIs or custom connection settings.

The following sections document the direct `@ai-sdk/prodia` provider,
including its model factories and settings. Gateway model and feature
availability can differ.

## Provider Instance

You can import the default provider instance `prodia` from `@ai-sdk/prodia`:

```ts
import { prodia } from '@ai-sdk/prodia';
```

If you need a customized setup, you can import `createProdia` and create a provider instance with your settings:

```ts
import { createProdia } from '@ai-sdk/prodia';

const prodia = createProdia({
  apiKey: 'your-api-key', // optional, defaults to PRODIA_TOKEN environment variable
  baseURL: 'custom-url', // optional
  headers: {
    /* custom headers */
  }, // optional
});
```

You can use the following optional settings to customize the Prodia provider instance:

- **baseURL** *string*

  Use a different URL prefix for API calls.
  The default prefix is `https://inference.prodia.com/v2`.

- **apiKey** *string*

  API key that is being sent using the `Authorization` header as a Bearer token.
  It defaults to the `PRODIA_TOKEN` environment variable.

- **headers** *Record\<string,string>*

  Custom headers to include in the requests.

- **fetch** *(input: RequestInfo, init?: RequestInit) => Promise\<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

## Image Models

You can create Prodia image models using the `.image()` factory method.
For more on image generation with the AI SDK see [generateImage()](/docs/reference/ai-sdk-core/generate-image).

### Basic Usage

```ts
import { writeFileSync } from 'node:fs';
import { prodia } from '@ai-sdk/prodia';
import { generateImage } from 'ai';

const { image } = await generateImage({
  model: prodia.image('inference.flux-fast.schnell.txt2img.v2'),
  prompt: 'A cat wearing an intricate robe',
});

const filename = `image-${Date.now()}.png`;
writeFileSync(filename, image.uint8Array);
console.log(`Image saved to ${filename}`);
```

### Model Capabilities

Prodia offers fast inference for various image generation models. Here are the supported model types:

| Model                                    | Description                                          |
| ---------------------------------------- | ---------------------------------------------------- |
| `inference.flux-fast.schnell.txt2img.v2` | Fast FLUX Schnell model for text-to-image generation |
| `inference.flux.schnell.txt2img.v2`      | FLUX Schnell model for text-to-image generation      |

Prodia supports additional model IDs. Check the [Prodia
documentation](https://docs.prodia.com/) for the full list of available
models.

### Image Size

You can specify the image size using the `size` parameter in `WIDTHxHEIGHT` format:

```ts
import { prodia } from '@ai-sdk/prodia';
import { generateImage } from 'ai';

const { image } = await generateImage({
  model: prodia.image('inference.flux-fast.schnell.txt2img.v2'),
  prompt: 'A serene mountain landscape at sunset',
  size: '1024x768',
});
```

### Provider Options

Prodia image models support additional options through the `providerOptions.prodia` object:

```ts
import { prodia, type ProdiaImageModelOptions } from '@ai-sdk/prodia';
import { generateImage } from 'ai';

const { image } = await generateImage({
  model: prodia.image('inference.flux-fast.schnell.txt2img.v2'),
  prompt: 'A cat wearing an intricate robe',
  providerOptions: {
    prodia: {
      width: 1024,
      height: 768,
      steps: 4,
      stylePreset: 'cinematic',
    } satisfies ProdiaImageModelOptions,
  },
});
```

The following provider options are supported:

- **width** *number* - Output width in pixels (256–1920). When set, this overrides any width derived from `size`.
- **height** *number* - Output height in pixels (256–1920). When set, this overrides any height derived from `size`.
- **steps** *number* - Number of computational iterations (1–4). More steps typically produce higher quality results.
- **stylePreset** *string* - Apply a visual theme to the output image. Supported presets: `3d-model`, `analog-film`, `anime`, `cinematic`, `comic-book`, `digital-art`, `enhance`, `fantasy-art`, `isometric`, `line-art`, `low-poly`, `neon-punk`, `origami`, `photographic`, `pixel-art`, `texture`, `craft-clay`.
- **loras** *string\[]* - Augment the output with up to 3 LoRA models.
- **progressive** *boolean* - When using JPEG output, return a progressive JPEG.

### Seed

You can use the `seed` parameter to get reproducible results:

```ts
import { prodia } from '@ai-sdk/prodia';
import { generateImage } from 'ai';

const { image } = await generateImage({
  model: prodia.image('inference.flux-fast.schnell.txt2img.v2'),
  prompt: 'A serene mountain landscape at sunset',
  seed: 12345,
});
```

### Provider Metadata

The `generateImage` response includes provider-specific metadata in `providerMetadata.prodia.images[]`. Each image object may contain the following properties:

- **jobId** *string* - The unique identifier for the generation job.
- **seed** *number* - The seed used for generation. Useful for reproducing results.
- **elapsed** *number* - Generation time in seconds.
- **iterationsPerSecond** *number* - Processing speed metric.
- **createdAt** *string* - Timestamp when the job was created.
- **updatedAt** *string* - Timestamp when the job was last updated.

```ts
import { prodia } from '@ai-sdk/prodia';
import { generateImage } from 'ai';

const { image, providerMetadata } = await generateImage({
  model: prodia.image('inference.flux-fast.schnell.txt2img.v2'),
  prompt: 'A serene mountain landscape at sunset',
});

// Access provider metadata
const metadata = providerMetadata?.prodia?.images?.[0];
console.log('Job ID:', metadata?.jobId);
console.log('Seed:', metadata?.seed);
console.log('Elapsed:', metadata?.elapsed);
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)