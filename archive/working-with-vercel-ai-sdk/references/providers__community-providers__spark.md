---
title: Spark
description: Learn how to use the Spark provider for the AI SDK.
url: "https://ai-sdk.dev/providers/community-providers/spark"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/community-providers/spark.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "d8d35cedc4c9139d0142e34638b4bfd5ad3b4959ff0726c8cb3b327646d45763"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This community provider is not yet compatible with AI SDK 5. Please wait for
the provider to be updated or consider using an [AI SDK 5 compatible
provider](/providers/ai-sdk-providers).

The **[Spark provider](https://github.com/klren0312/spark-ai-provider)** contains language model support for the Spark API, giving you access to models like lite, generalv3, pro-128k, generalv3.5, max-32k and 4.0Ultra.

## Setup

The Spark provider is available in the `spark-ai-provider` module. You can install it with

```bash
npm i spark-ai-provider
```

## Provider Instance

You can import `createSparkProvider` from `spark-ai-provider` to create a provider instance:

```ts
import { createSparkProvider } from 'spark-ai-provider';
```

## Example

```ts
import { createSparkProvider } from './index.mjs';
import { generateText } from 'ai';
const spark = createSparkProvider({
  apiKey: '',
});
const { text } = await generateText({
  model: spark('lite'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Spark provider documentation](https://github.com/klren0312/spark-ai-provider)** for more information.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)