---
title: jsonSchema
description: Helper function for creating JSON schemas
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/json-schema"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/json-schema.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "83df1161bd332abc917f426d44948b76f58153bc531583e70580c2319f6d8109"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

`jsonSchema` is a helper function that creates a JSON schema object that is compatible with the AI SDK.
It takes the JSON schema and an optional validation function as inputs, and can be typed.

You can use it to [generate structured data](/docs/ai-sdk-core/generating-structured-data) and in [tools](/docs/ai-sdk-core/tools-and-tool-calling).

`jsonSchema` is an alternative to using Zod schemas that provides you with flexibility in dynamic situations
(e.g. when using OpenAPI definitions) or for using other validation libraries.

```ts
import { jsonSchema } from 'ai';

const mySchema = jsonSchema<{
  recipe: {
    name: string;
    ingredients: { name: string; amount: string }[];
    steps: string[];
  };
}>({
  type: 'object',
  properties: {
    recipe: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        ingredients: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              amount: { type: 'string' },
            },
            required: ['name', 'amount'],
          },
        },
        steps: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      required: ['name', 'ingredients', 'steps'],
    },
  },
  required: ['recipe'],
});
```

## Import

```
import { jsonSchema } from "ai"
```

## API Signature

### Parameters

- `schema` (`JSONSchema7`): The JSON schema definition.
- `options` (`SchemaOptions`): Additional options for the JSON schema.
  - `SchemaOptions`
    - `validate?` (`(value: unknown) => { success: true; value: OBJECT } | { success: false; error: Error };`): A function that validates the value against the JSON schema. If the value is valid, the function should return an object with a \`success\` property set to \`true\` and a \`value\` property set to the validated value. If the value is invalid, the function should return an object with a \`success\` property set to \`false\` and an \`error\` property set to the error.

### Returns

A JSON schema object that is compatible with the AI SDK.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)