---
source: "https://ai-sdk.dev/providers/ai-sdk-providers/quiverai.md"
fetched_at: "2026-06-11T15:39:44.005Z"
sha256: "30b6eb94a5c5ebf225e98a0f24bebb0533b175064fce75e0271e8e46b4f52b8a"
---

# QuiverAI Provider

[QuiverAI](https://quiver.ai/) generates SVG documents directly from text prompts and can also vectorize raster images into clean SVGs. The QuiverAI provider for the AI SDK exposes both operations through `generateImage`.

## Setup

The QuiverAI provider is available via the `@ai-sdk/quiverai` module. You can install it with

<Tabs items={['pnpm', 'npm', 'yarn', 'bun']}>
  <Tab>
    <Snippet text="pnpm add @ai-sdk/quiverai" dark />
  </Tab>
  <Tab>
    <Snippet text="npm install @ai-sdk/quiverai" dark />
  </Tab>
  <Tab>
    <Snippet text="yarn add @ai-sdk/quiverai" dark />
  </Tab>

  <Tab>
    <Snippet text="bun add @ai-sdk/quiverai" dark />
  </Tab>
</Tabs>

## Provider Instance

You can import the default provider instance `quiverai` from `@ai-sdk/quiverai`:

```ts
import { quiverai } from '@ai-sdk/quiverai';
```

If you need a customized setup, you can import `createQuiverAI` and create a provider instance with your settings:

```ts
import { createQuiverAI } from '@ai-sdk/quiverai';

const quiverai = createQuiverAI({
  apiKey: 'your-api-key', // optional, defaults to QUIVERAI_API_KEY environment variable
  baseURL: 'custom-url', // optional, defaults to QUIVERAI_BASE_URL or https://api.quiver.ai/v1
  headers: {
    /* custom headers */
  }, // optional
});
```

You can use the following optional settings to customize the QuiverAI provider instance:

- **baseURL** _string_

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://api.quiver.ai/v1`. It also reads `QUIVERAI_BASE_URL` from the environment.

- **apiKey** _string_

  API key that is sent as a `Bearer` token in the `Authorization` header.
  It defaults to the `QUIVERAI_API_KEY` environment variable.

- **headers** _Record&lt;string,string&gt;_

  Custom headers to include in the requests.

- **fetch** _(input: RequestInfo, init?: RequestInit) => Promise&lt;Response&gt;_

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

## Image Models

You can create QuiverAI image models using the `.image()` factory method.
For more on image generation with the AI SDK see [generateImage()](/docs/reference/ai-sdk-core/generate-image).

### Basic Usage

```ts
import { quiverai } from '@ai-sdk/quiverai';
import { generateImage } from 'ai';
import fs from 'fs';

const { image } = await generateImage({
  model: quiverai.image('arrow-1.1'),
  prompt: 'A logo for the next AI Design startup',
});

const filename = `image-${Date.now()}.svg`;
fs.writeFileSync(filename, image.uint8Array);
console.log(`Saved SVG to ${filename}`);
```

QuiverAI returns SVG documents. The generated SVG bytes are available through `result.image.uint8Array` (or `result.images` when generating multiple).

### Model Capabilities

QuiverAI exposes three Arrow models:

| Model           | Description                                                                      |
| --------------- | -------------------------------------------------------------------------------- |
| `arrow-1`       | Base text-to-SVG model. Accepts up to 4 reference images.                        |
| `arrow-1.1`     | Improved text-to-SVG model. Accepts up to 4 reference images.                    |
| `arrow-1.1-max` | Higher quality variant with extended context. Accepts up to 16 reference images. |

### Provider Options

You can fine-tune the request using `providerOptions.quiverai`:

```ts
import { quiverai, type QuiverAIImageModelOptions } from '@ai-sdk/quiverai';
import { generateImage } from 'ai';

await generateImage({
  model: quiverai.image('arrow-1.1'),
  prompt: 'A geometric unicorn icon',
  providerOptions: {
    quiverai: {
      instructions: 'Use a flat monochrome style with clean geometry.',
      temperature: 0.4,
      topP: 0.95,
      maxOutputTokens: 4096,
    } satisfies QuiverAIImageModelOptions,
  },
});
```

Supported options:

- **operation** _'generate' | 'vectorize'_

  Choose between text-to-SVG generation (`generate`, default) and image-to-SVG vectorization (`vectorize`).

- **instructions** _string_

  Extra style guidance for prompt-based generation.

- **temperature** _number_ (0-2)

  Sampling temperature.

- **topP** _number_ (0-1)

  Nucleus sampling top-p value.

- **presencePenalty** _number_ (-2 to 2)

  Presence penalty.

- **maxOutputTokens** _number_ (1-131072)

  Maximum number of output tokens.

- **autoCrop** _boolean_

  When vectorizing, automatically crop the input image. Only used with `operation: 'vectorize'`.

- **targetSize** _number_ (128-4096)

  When vectorizing, target canvas size in pixels. Only used with `operation: 'vectorize'`.

### Reference Images

Pass reference images through `prompt.images`:

```ts
await generateImage({
  model: quiverai.image('arrow-1.1'),
  prompt: {
    text: 'A geometric unicorn icon',
    images: ['https://example.com/reference-1.png'],
  },
});
```

`arrow-1` and `arrow-1.1` accept up to 4 reference images. `arrow-1.1-max` accepts up to 16.

### Vectorizing a Raster Image

Set `operation` to `vectorize` and pass a single image in `prompt.images`:

```ts
import { quiverai, type QuiverAIImageModelOptions } from '@ai-sdk/quiverai';
import { generateImage } from 'ai';
import fs from 'fs';

const { image } = await generateImage({
  model: quiverai.image('arrow-1.1'),
  prompt: {
    images: [fs.readFileSync('./logo.png')],
  },
  providerOptions: {
    quiverai: {
      operation: 'vectorize',
      autoCrop: true,
      targetSize: 1024,
    } satisfies QuiverAIImageModelOptions,
  },
});

fs.writeFileSync('logo.svg', image.uint8Array);
```


## Navigation

- [AI Gateway](/providers/ai-sdk-providers/ai-gateway)
- [xAI Grok](/providers/ai-sdk-providers/xai)
- [Vercel](/providers/ai-sdk-providers/vercel)
- [OpenAI](/providers/ai-sdk-providers/openai)
- [Azure OpenAI](/providers/ai-sdk-providers/azure)
- [Anthropic](/providers/ai-sdk-providers/anthropic)
- [Open Responses](/providers/ai-sdk-providers/open-responses)
- [Claude Platform on AWS](/providers/ai-sdk-providers/anthropic-aws)
- [Amazon Bedrock](/providers/ai-sdk-providers/amazon-bedrock)
- [Groq](/providers/ai-sdk-providers/groq)
- [Fal](/providers/ai-sdk-providers/fal)
- [AssemblyAI](/providers/ai-sdk-providers/assemblyai)
- [DeepInfra](/providers/ai-sdk-providers/deepinfra)
- [Deepgram](/providers/ai-sdk-providers/deepgram)
- [Black Forest Labs](/providers/ai-sdk-providers/black-forest-labs)
- [Gladia](/providers/ai-sdk-providers/gladia)
- [LMNT](/providers/ai-sdk-providers/lmnt)
- [Google Generative AI](/providers/ai-sdk-providers/google-generative-ai)
- [Hume](/providers/ai-sdk-providers/hume)
- [Google Vertex AI](/providers/ai-sdk-providers/google-vertex)
- [Rev.ai](/providers/ai-sdk-providers/revai)
- [Baseten](/providers/ai-sdk-providers/baseten)
- [Hugging Face](/providers/ai-sdk-providers/huggingface)
- [QuiverAI](/providers/ai-sdk-providers/quiverai)
- [Mistral AI](/providers/ai-sdk-providers/mistral)
- [Together.ai](/providers/ai-sdk-providers/togetherai)
- [Cohere](/providers/ai-sdk-providers/cohere)
- [Fireworks](/providers/ai-sdk-providers/fireworks)
- [Voyage AI](/providers/ai-sdk-providers/voyage)
- [DeepSeek](/providers/ai-sdk-providers/deepseek)
- [Moonshot AI](/providers/ai-sdk-providers/moonshotai)
- [Alibaba](/providers/ai-sdk-providers/alibaba)
- [Cerebras](/providers/ai-sdk-providers/cerebras)
- [Replicate](/providers/ai-sdk-providers/replicate)
- [Prodia](/providers/ai-sdk-providers/prodia)
- [Perplexity](/providers/ai-sdk-providers/perplexity)
- [Luma](/providers/ai-sdk-providers/luma)
- [ByteDance](/providers/ai-sdk-providers/bytedance)
- [Kling AI](/providers/ai-sdk-providers/klingai)
- [ElevenLabs](/providers/ai-sdk-providers/elevenlabs)


[Full Sitemap](/sitemap.md)
