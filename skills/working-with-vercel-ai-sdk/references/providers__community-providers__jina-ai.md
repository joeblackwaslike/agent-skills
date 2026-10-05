---
title: Jina AI
description: Learn how to use the Jina AI provider.
url: "https://ai-sdk.dev/providers/community-providers/jina-ai"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/community-providers/jina-ai.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "4ce7db890af40d797c8d70bd00d6a9b216686fb9592f7e357bb6132740163c81"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[patelvivekdev/jina-ai-provider](https://github.com/patelvivekdev/jina-ai-provider) is a community provider that uses [Jina AI](https://jina.ai) to provide text and multimodal embedding support for the AI SDK.

## Setup

The Jina provider is available in the `jina-ai-provider` module. You can install it with

**Packages:** `jina-ai-provider`

## Provider Instance

You can import the default provider instance `jina` from `jina-ai-provider`:

```ts
import { jina } from 'jina-ai-provider';
```

If you need a customized setup, you can import `createJina` from `jina-ai-provider` and create a provider instance with your settings:

```ts
import { createJina } from 'jina-ai-provider';

const customJina = createJina({
  // custom settings
});
```

You can use the following optional settings to customize the Jina provider instance:

- **baseURL** *string*

  The base URL of the Jina API.
  The default prefix is `https://api.jina.ai/v1`.

- **apiKey** *string*

  API key that is being sent using the `Authorization` header.
  It defaults to the `JINA_API_KEY` environment variable.

- **headers** *Record\<string,string>*

  Custom headers to include in the requests.

- **fetch** *(input: RequestInfo, init?: RequestInit) => Promise\<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

## Text Embedding Models

You can create models that call the Jina text embeddings API using the `.embeddingModel()` factory method.

```ts
import { jina } from 'jina-ai-provider';

const embeddingModel = jina.embeddingModel('jina-embeddings-v3');
```

You can use Jina embedding models to generate embeddings with the `embed` or `embedMany` function:

```ts
import { jina } from 'jina-ai-provider';
import { embedMany } from 'ai';

const embeddingModel = jina.embeddingModel('jina-embeddings-v3');

export const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = value.split('\n');

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
    providerOptions: {
      jina: {
        inputType: 'retrieval.passage',
      },
    },
  });

  return embeddings.map((embedding, index) => ({
    content: chunks[index]!,
    embedding,
  }));
};
```

## Multimodal Embedding

You can create models that call the Jina multimodal (text + image) embeddings API using the `.multiModalEmbeddingModel()` factory method.

```ts
import { jina, type MultimodalEmbeddingInput } from 'jina-ai-provider';
import { embedMany } from 'ai';

const multimodalModel = jina.multiModalEmbeddingModel('jina-clip-v2');

export const generateMultimodalEmbeddings = async () => {
  const values: MultimodalEmbeddingInput[] = [
    { text: 'A beautiful sunset over the beach' },
    { image: 'https://i.ibb.co/r5w8hG8/beach2.jpg' },
  ];

  const { embeddings } = await embedMany<MultimodalEmbeddingInput>({
    model: multimodalModel,
    values,
  });

  return embeddings.map((embedding, index) => ({
    content: values[index]!,
    embedding,
  }));
};
```

Use the `MultimodalEmbeddingInput` type to ensure type safety when using multimodal embeddings.
You can pass Base64 encoded images to the `image` property in the Data URL format
`data:[mediatype];base64,<data>`.

## Provider Options

Pass Jina embedding options via `providerOptions.jina`. The following options are supported:

- **inputType** *'text-matching' | 'retrieval.query' | 'retrieval.passage' | 'separation' | 'classification'*

  Intended downstream application to help the model produce better embeddings. Defaults to `'retrieval.passage'`.

  - `'retrieval.query'`: input is a search query.
  - `'retrieval.passage'`: input is a document/passage.
  - `'text-matching'`: for semantic textual similarity tasks.
  - `'classification'`: for classification tasks.
  - `'separation'`: for clustering tasks.

- **outputDimension** *number*

  Number of dimensions for the output embeddings. See model documentation for valid ranges.

  - `jina-embeddings-v3`: min 32, max 1024.
  - `jina-clip-v2`: min 64, max 1024.
  - `jina-clip-v1`: fixed 768.

- **embeddingType** *'float' | 'binary' | 'ubinary' | 'base64'*

  Data type for the returned embeddings.

- **normalized** *boolean*

  Whether to L2-normalize embeddings. Defaults to `true`.

- **truncate** *boolean*

  Whether to truncate inputs beyond the model context limit instead of erroring. Defaults to `false`.

- **lateChunking** *boolean*

  Split long inputs into 1024-token chunks automatically. Only for text embedding models.

## Model Capabilities

| Model                | Context Length (tokens) | Embedding Dimension | Modalities    |
| -------------------- | ----------------------- | ------------------- | ------------- |
| `jina-embeddings-v3` | 8,192                   | 1024                | Text          |
| `jina-clip-v2`       | 8,192                   | 1024                | Text + Images |
| `jina-clip-v1`       | 8,192                   | 768                 | Text + Images |

## Supported Input Formats

### Text Embeddings

- Array of strings, for example: `const strings = ['text1', 'text2']`

### Multimodal Embeddings

- Text objects: `const text = [{ text: 'Your text here' }]`
- Image objects: `const image = [{ image: 'https://example.com/image.jpg' }]` or Base64 data URLs
- Mixed arrays: `const mixed = [{ text: 'object text' }, { image: 'image-url' }, { image: 'data:image/jpeg;base64,...' }]`

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)