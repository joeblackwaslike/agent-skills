---
title: valibotSchema
description: Helper function for creating Valibot schemas
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/valibot-schema"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/valibot-schema.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "c7396def0a855daf4e0dd9e9f27599fc53c0f58b9129469daae4b366e8f56131"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

`valibotSchema` is a helper function that converts a Valibot schema into a JSON schema object
that is compatible with the AI SDK.
It takes a Valibot schema as input, and returns a typed schema.

You can use it to [generate structured data](/docs/ai-sdk-core/generating-structured-data) and
in [tools](/docs/ai-sdk-core/tools-and-tool-calling).

## Example

```ts
import { valibotSchema } from '@ai-sdk/valibot';
import { object, string, array } from 'valibot';

const recipeSchema = valibotSchema(
  object({
    name: string(),
    ingredients: array(
      object({
        name: string(),
        amount: string(),
      }),
    ),
    steps: array(string()),
  }),
);
```

## Import

```
import { valibotSchema } from "@ai-sdk/valibot"
```

## API Signature

### Parameters

- `valibotSchema` (`GenericSchema<unknown, T>`): The Valibot schema definition.

### Returns

A Schema object that is compatible with the AI SDK, containing both the JSON schema representation and validation functionality.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)