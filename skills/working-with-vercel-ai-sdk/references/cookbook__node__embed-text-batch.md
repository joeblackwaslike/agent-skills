---
title: Embed Text in Batch
description: Learn how to embed multiple text using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/embed-text-batch"
docs_index: /llms.txt
tags:
  - node
  - embedding
source: "https://ai-sdk.dev/cookbook/node/embed-text-batch.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "5389b9a04adb481de3243aed9a723ea8b7bc2854777a9132bc88c5425045d967"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

When working with large datasets or multiple pieces of text, processing embeddings one at a time can be inefficient. Batch embedding allows you to convert multiple text inputs into embeddings simultaneously, significantly improving performance and reducing API calls. This is particularly useful when processing documents, chat messages, or any collection of text that needs to be vectorized.

This example shows how to embed multiple text inputs in a single operation using the AI SDK. For single text embedding, see our [Embed Text](/cookbook/node/embed-text) example, or for a practical application, check out our [RAG example](/cookbook/node/retrieval-augmented-generation) which demonstrates how batch embeddings can be used in a document retrieval system.

```ts
import { embedMany } from 'ai';
import 'dotenv/config';

async function main() {
  const { embeddings, usage } = await embedMany({
    model: 'openai/text-embedding-3-small',
    values: [
      'sunny day at the beach',
      'rainy afternoon in the city',
      'snowy night in the mountains',
    ],
  });

  console.log(embeddings);
  console.log(usage);
}

main().catch(console.error);
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)