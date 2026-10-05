---
title: ZeroEntropy
description: Learn how to use the ZeroEntropy community provider.
url: "https://ai-sdk.dev/providers/community-providers/zeroentropy"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/community-providers/zeroentropy.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "79645db7b7bb510b2ecb597ef714c18db7c3ff9dd617e0341e85123e0c9720ab"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[zeroentropy-ai/zeroentropy-ai-provider](https://github.com/zeroentropy-ai/zeroentropy-ai-provider) is a community provider that uses [ZeroEntropy](https://zeroentropy.dev) to provide text embedding and reranking support for the AI SDK.

## Setup

The ZeroEntropy provider is available in the `zeroentropy-ai-provider` module. You can install it with:

**Packages:** `zeroentropy-ai-provider`

## Provider Instance

You can import the default provider instance `zeroentropy` from `zeroentropy-ai-provider`:

```ts
import { zeroentropy } from 'zeroentropy-ai-provider';
```

If you need a customized setup, you can import `createZeroEntropy` from `zeroentropy-ai-provider` and create a provider instance with your settings:

```ts
import { createZeroEntropy } from 'zeroentropy-ai-provider';

const zeroentropy = createZeroEntropy({
  apiKey: process.env.ZEROENTROPY_API_KEY ?? '',
});
```

You can use the following optional settings to customize the ZeroEntropy provider instance:

- **baseURL** *string*

  The base URL of the ZeroEntropy API. The default prefix is `https://api.zeroentropy.dev/v1`.

- **apiKey** *string*

  API key that is being sent using the `Authorization` header. It defaults to the `ZEROENTROPY_API_KEY` environment variable. Obtain your API key from the [ZeroEntropy Dashboard](https://dashboard.zeroentropy.dev).

- **headers** *Record\<string,string>*

  Custom headers to include in the requests.

- **fetch** *(input: RequestInfo, init?: RequestInit) => Promise\<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation. Defaults to the global `fetch` function. You can use it as a middleware to intercept requests, or to provide a custom fetch implementation for e.g. testing.

## Text Embedding Models

You can create models that call the [ZeroEntropy embeddings API](https://docs.zeroentropy.dev) using the `.textEmbeddingModel()` factory method.

```ts
import { zeroentropy } from 'zeroentropy-ai-provider';

const embeddingModel = zeroentropy.textEmbeddingModel('zembed-1');
```

You can use ZeroEntropy embedding models to generate embeddings with the `embed` or `embedMany` function:

```ts
import { zeroentropy } from 'zeroentropy-ai-provider';
import { embed, embedMany } from 'ai';

// Single embedding
const { embedding } = await embed({
  model: zeroentropy.textEmbeddingModel('zembed-1'),
  value: 'sunny day at the beach',
});

// Batch embeddings
const { embeddings } = await embedMany({
  model: zeroentropy.textEmbeddingModel('zembed-1'),
  values: ['first document', 'second document'],
});
```

ZeroEntropy embedding models support additional provider options that can be passed via `providerOptions.zeroentropy`:

```ts
import { zeroentropy } from 'zeroentropy-ai-provider';
import { embed } from 'ai';

const { embedding } = await embed({
  model: zeroentropy.textEmbeddingModel('zembed-1'),
  value: 'sunny day at the beach',
  providerOptions: {
    zeroentropy: {
      inputType: 'document',
      dimensions: 1280,
    },
  },
});
```

The following provider options are available:

- **inputType** *'query' | 'document'*

  Whether the input is a search query or a document to index. Use `'query'` for retrieval queries and `'document'` for content being indexed. Defaults to `'document'`.

- **dimensions** *2560 | 1280 | 640 | 320 | 160 | 80 | 40*

  Output vector dimensions. Defaults to `2560`. Supports Matryoshka representations for flexible dimensionality reduction.

- **latency** *'fast' | 'slow'*

  `'fast'` for sub-second latency; `'slow'` for higher throughput limits.

### Model Capabilities

| Model      | Default Dimensions | Context Length | Description                                                  |
| ---------- | ------------------ | -------------- | ------------------------------------------------------------ |
| `zembed-1` | 2560               | 8192           | Multilingual embedding model, supports Matryoshka dimensions |

## Reranking Models

You can create models that call the [ZeroEntropy reranking API](https://docs.zeroentropy.dev) using the `.rerankingModel()` factory method.

```ts
import { zeroentropy } from 'zeroentropy-ai-provider';
import { rerank } from 'ai';

const result = await rerank({
  model: zeroentropy.rerankingModel('zerank-2'),
  query: 'talk about rain',
  documents: ['sunny day at the beach', 'rainy day in the city'],
  topN: 2,
});
```

ZeroEntropy reranking models support additional provider options that can be passed via `providerOptions.zeroentropy`:

```ts
import { zeroentropy } from 'zeroentropy-ai-provider';
import { rerank } from 'ai';

const result = await rerank({
  model: zeroentropy.rerankingModel('zerank-2'),
  query: 'talk about rain',
  documents: ['sunny day at the beach', 'rainy day in the city'],
  topN: 2,
  providerOptions: {
    zeroentropy: {
      latency: 'fast',
    },
  },
});
```

The following provider option is available:

- **latency** *'fast' | 'slow'*

  `'fast'` for sub-second latency; `'slow'` for higher throughput limits.

### Model Capabilities

| Model            | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `zerank-2`       | Flagship state-of-the-art cross-encoder reranker       |
| `zerank-2-nano`  | Compact `zerank-2` variant for lower-latency use cases |
| `zerank-1`       | Previous generation reranker                           |
| `zerank-1-small` | Lightweight reranker for lower-latency use cases       |

Please see the [ZeroEntropy docs](https://docs.zeroentropy.dev) for the full
list of available models and options.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)