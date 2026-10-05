---
title: cosineSimilarity
description: Calculate the cosine similarity between two vectors (API Reference)
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/cosine-similarity"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/cosine-similarity.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "95eca7d66c4ef2ee7bcd30b9d8aa375d2e437452cdbe6faa024aa98e068203b0"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

When you want to compare the similarity of embeddings, standard vector similarity metrics
like cosine similarity are often used.

`cosineSimilarity` calculates the cosine similarity between two vectors.
A high value (close to 1) indicates that the vectors are very similar, while a low value (close to -1) indicates that they are different.

```ts
import { cosineSimilarity, embedMany } from 'ai';

const { embeddings } = await embedMany({
  model: 'openai/text-embedding-3-small',
  values: ['sunny day at the beach', 'rainy afternoon in the city'],
});

console.log(
  `cosine similarity: ${cosineSimilarity(embeddings[0], embeddings[1])}`,
);
```

## Import

```
import { cosineSimilarity } from "ai"
```

## API Signature

### Parameters

- `vector1` (`number[]`): The first vector to compare
- `vector2` (`number[]`): The second vector to compare

### Returns

A number between -1 and 1 representing the cosine similarity between the two vectors.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)