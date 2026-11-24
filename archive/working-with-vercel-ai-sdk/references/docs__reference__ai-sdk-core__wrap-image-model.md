---
title: wrapImageModel
description: Function for wrapping an image model with middleware (API Reference)
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/wrap-image-model"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/wrap-image-model.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "f7f63d1ab4b9e591d73b82b70854e6b59d135401e0a316162c5f046ca068c369"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The `wrapImageModel` function provides a way to enhance the behavior of image models
by wrapping them with middleware.

```ts
import { generateImage, wrapImageModel } from 'ai';
import { openai } from '@ai-sdk/openai';

const model = wrapImageModel({
  model: openai.image('gpt-image-2.5-sunburst'),
  middleware: yourImageModelMiddleware,
});

const { image } = await generateImage({
  model,
  prompt: 'Santa Claus driving a Cadillac',
});
```

## Import

```
import { wrapImageModel } from "ai"
```

## API Signature

### Parameters

- `model` (`ImageModelV4`): The original ImageModelV4 instance to be wrapped.
- `middleware` (`ImageModelV4Middleware | ImageModelV4Middleware[]`): The middleware to be applied to the image model. When multiple middlewares are provided, the first middleware will transform the input first, and the last middleware will be wrapped directly around the model.
- `modelId` (`string`): Optional custom model ID to override the original model's ID.
- `providerId` (`string`): Optional custom provider ID to override the original model's provider.

### Returns

A new `ImageModelV4` instance with middleware applied. The wrapped model
preserves the original model's `supportsFileInputs` and `supportsMaskInputs`
capabilities by default. Middleware can override them with
`overrideSupportsFileInputs` and `overrideSupportsMaskInputs`. Returning
`undefined` from an override intentionally marks that capability as unknown.

```ts
const model = wrapImageModel({
  model: originalModel,
  middleware: {
    specificationVersion: 'v4',
    overrideSupportsFileInputs: () => true,
    overrideSupportsMaskInputs: () => false,
  },
});
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)