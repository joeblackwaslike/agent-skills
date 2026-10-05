---
title: Generate Object
description: Learn how to generate structured data using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/generate-object"
docs_index: /llms.txt
tags:
  - node
  - structured data
source: "https://ai-sdk.dev/cookbook/node/generate-object.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "554e83750d7c7348861a09219e595f71ac72c5424a94aac82158ea1a3982c771"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Earlier functions like `generateText` and `streamText` gave us the ability to generate unstructured text. However, if you want to generate structured data like JSON, you can provide an `Output` that describes the structure of your desired object to `generateText`.

The `Output.object` function requires you to provide a schema using [zod](https://zod.dev), a library for defining schemas for JavaScript objects. By using zod, you can also use it to validate the generated object and ensure that it conforms to the specified structure.

```ts title='index.ts'
import { generateText, Output } from 'ai';
import { z } from 'zod';

const result = await generateText({
  model: 'openai/gpt-6-astra',
  output: Output.object({
    schema: z.object({
      recipe: z.object({
        name: z.string(),
        ingredients: z.array(
          z.object({
            name: z.string(),
            amount: z.string(),
          }),
        ),
        steps: z.array(z.string()),
      }),
    }),
  }),
  prompt: 'Generate a lasagna recipe.',
});

console.log(JSON.stringify(result.output.recipe, null, 2));
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)