---
title: generateImage
description: API Reference for generateImage.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-image"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-image.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "1585394b3d3e88258f65058186673222da2d922e0eb3771ea8d6b7905b52adac"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Generates images based on a given prompt using an image model.

It is ideal for use cases where you need to generate images programmatically,
such as creating visual content or generating images for data augmentation.

```ts
import { generateImage } from 'ai';

const { images } = await generateImage({
  model: "openai/gpt-image-2.5-sunburst",
  prompt: 'A futuristic cityscape at sunset',
  n: 3,
  size: '1024x1024',
});

console.log(images);
```

## Import

```
import { generateImage } from "ai"
```

## API Signature

### Parameters

- `model` (`ImageModelV4`): The image model to use.
- `prompt` (`string | GenerateImagePrompt`): The input prompt to generate the image from.
  - `object`
    - `images` (`Array<DataContent>`): an image item can be one of: base64-encoded string, a \`Uint8Array\`, an \`ArrayBuffer\`, or a \`Buffer\`.
    - `text` (`string`): The text prompt.
    - `mask` (`DataContent`): base64-encoded string, a \`Uint8Array\`, an \`ArrayBuffer\`, or a \`Buffer\`.
- `n?` (`number`): Number of images to generate.
- `size?` (`string`): Size of the images to generate. Format: \`\{width}x\{height}\`.
- `aspectRatio?` (`string`): Aspect ratio of the images to generate. Format: \`\{width}:\{height}\`.
- `seed?` (`number`): Seed for the image generation.
- `providerOptions?` (`ProviderOptions`): Additional provider-specific options.
- `maxImagesPerCall?` (`number`): Maximum number of images to generate per API call. When n exceeds this value, multiple API calls will be made.
- `maxRetries?` (`number`): Maximum number of retries per image model call, including retries after unclassified empty responses. Empty responses marked as not retryable by the provider are not retried. Default: 2.
- `abortSignal?` (`AbortSignal`): An optional abort signal to cancel the call.
- `headers?` (`Record<string, string>`): Additional HTTP headers for the request.

### Returns

- `image` (`GeneratedFile`): The first image that was generated.
  - `GeneratedFile`
    - `base64` (`string`): Image as a base64 encoded string.
    - `uint8Array` (`Uint8Array`): Image as a Uint8Array.
    - `mediaType` (`string`): The IANA media type of the image.
- `images` (`Array<GeneratedFile>`): All images that were generated.
  - `GeneratedFile`
    - `base64` (`string`): Image as a base64 encoded string.
    - `uint8Array` (`Uint8Array`): Image as a Uint8Array.
    - `mediaType` (`string`): The IANA media type of the image.
- `warnings` (`Warning[]`): Warnings from the model provider (e.g. unsupported settings).
- `usage` (`ImageModelUsage`): The usage statistics for the image generation.
  - `ImageModelUsage`
    - `imagesGenerated` (`number`): The total number of images generated.
- `providerMetadata?` (`ImageModelProviderMetadata`): Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. An \`images\` key is always present in the metadata and is an array with the same length as the top level \`images\` key. Details depend on the provider.
- `responses` (`Array<ImageModelResponseMetadata>`): Response metadata from the provider. There may be multiple responses if we made multiple calls to the model.
  - `ImageModelResponseMetadata`
    - `timestamp` (`Date`): Timestamp for the start of the generated response.
    - `modelId` (`string`): The ID of the response model that was used to generate the response.
    - `headers?` (`Record<string, string>`): Response headers.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)