---
title: Mixedbread
description: Learn how to use the Mixedbread provider.
url: "https://ai-sdk.dev/providers/community-providers/mixedbread"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/community-providers/mixedbread.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "c60ba2dcdcbd4ccf4ce70d2fede5d25d380c18051d044fa425b9dcc71dafabc8"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[patelvivekdev/mixedbread-ai-provider](https://github.com/patelvivekdev/mixedbread-ai-provider) is a community provider that uses [Mixedbread](https://www.mixedbread.ai/) to provide Embedding support for the AI SDK.

## Setup

The Mixedbread provider is available in the `mixedbread-ai-provider` module. You can install it with

**Packages:** `mixedbread-ai-provider`

## Provider Instance

You can import the default provider instance `mixedbread` from `mixedbread-ai-provider`:

```ts
import { mixedbread } from 'mixedbread-ai-provider';
```

If you need a customized setup, you can import `createMixedbread` from `mixedbread-ai-provider` and create a provider instance with your settings:

```ts
import { createMixedbread } from 'mixedbread-ai-provider';

const mixedbread = createMixedbread({
  // custom settings
});
```

You can use the following optional settings to customize the Mixedbread provider instance:

- **baseURL** *string*

  The base URL of the Mixedbread API. The default prefix is `https://api.mixedbread.com/v1`.

- **apiKey** *string*

  API key that is being sent using the `Authorization` header. It defaults to the `MIXEDBREAD_API_KEY` environment variable.

- **headers** *Record\<string,string>*

  Custom headers to include in the requests.

- **fetch** *(input: RequestInfo, init?: RequestInit) => Promise\<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation. Defaults to the global `fetch` function. You can use it as a middleware to intercept requests, or to provide a custom fetch implementation for e.g. testing.

## Text Embedding Models

You can create models that call the [Mixedbread embeddings API](https://www.mixedbread.com/api-reference/endpoints/embeddings)
using the `.embeddingModel()` factory method.

```ts
import { mixedbread } from 'mixedbread-ai-provider';

const embeddingModel = mixedbread.embeddingModel(
  'mixedbread-ai/mxbai-embed-large-v1',
);
```

You can use Mixedbread embedding models to generate embeddings with the `embed` function:

```ts
import { mixedbread } from 'mixedbread-ai-provider';
import { embed } from 'ai';

const { embedding } = await embed({
  model: mixedbread.embeddingModel('mixedbread-ai/mxbai-embed-large-v1'),
  value: 'sunny day at the beach',
});
```

Mixedbread embedding models support additional provider options that can be passed via `providerOptions.mixedbread`:

```ts
import { mixedbread } from 'mixedbread-ai-provider';
import { embed } from 'ai';

const { embedding } = await embed({
  model: mixedbread.embeddingModel('mixedbread-ai/mxbai-embed-large-v1'),
  value: 'sunny day at the beach',
  providerOptions: {
    mixedbread: {
      prompt: 'Generate embeddings for text',
      normalized: true,
      dimensions: 512,
      encodingFormat: 'float16',
    },
  },
});
```

The following provider options are available:

- **prompt** *string*

  An optional prompt to provide context to the model. Refer to the model's documentation for more information. A string between 1 and 256 characters.

- **normalized** *boolean*

  Option to normalize the embeddings.

- **dimensions** *number*

  The desired number of dimensions in the output vectors. Defaults to the model's maximum. A number between 1 and the model's maximum output dimensions. Only applicable for Matryoshka-based models.

- **encodingFormat** *'float' | 'float16' | 'binary' | 'ubinary' | 'int8' | 'uint8' | 'base64'*

### Model Capabilities

| Model                             | Context Length | Dimension | Custom Dimensions |
| --------------------------------- | -------------- | --------- | ----------------- |
| `mxbai-embed-large-v1`            | 512            | 1024      | ✓                 |
| `mxbai-embed-2d-large-v1`         | 512            | 1024      | ✓                 |
| `deepset-mxbai-embed-de-large-v1` | 512            | 1024      | ✓                 |
| `mxbai-embed-xsmall-v1`           | 4096           | 384       | ✗                 |

The table above lists popular models. Please see the [Mixedbread
docs](https://www.mixedbread.com/docs/models/embedding) for a full list of
available models.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)