---
title: Output
description: API Reference for Output.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/output"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/output.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "eb8c7be9a15f48d5d3db7035077fcc85b5c0561649c844f45f7d44d1b3383564"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The `Output` object provides output specifications for structured data generation with [`generateText`](/docs/reference/ai-sdk-core/generate-text) and [`streamText`](/docs/reference/ai-sdk-core/stream-text). It allows you to specify the expected shape of the generated data and handles validation automatically.

```ts
import { generateText, Output } from 'ai';
import { z } from 'zod';

const { output } = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  output: Output.object({
    schema: z.object({
      name: z.string(),
      age: z.number(),
    }),
  }),
  prompt: 'Generate a user profile.',
});
```

## Import

```
import { Output } from "ai"
```

## Output Types

### `Output.text()`

Output specification for plain text generation. This is the default behavior when no `output` is specified.

```ts
import { generateText, Output } from 'ai';

const { output } = await generateText({
  model: yourModel,
  output: Output.text(),
  prompt: 'Tell me a joke.',
});
// output is a string
```

#### Parameters

No parameters required.

#### Returns

An `Output<string, string>` specification that generates plain text without schema validation.

***

<span id="output-object" />

### `Output.object()`

Output specification for typed object generation using schemas. The output is validated against the provided schema to ensure type safety.

```ts
import { generateText, Output } from 'ai';
import { z } from 'zod';

const { output } = await generateText({
  model: yourModel,
  output: Output.object({
    schema: z.object({
      name: z.string(),
      age: z.number().nullable(),
      labels: z.array(z.string()),
    }),
  }),
  prompt: 'Generate information for a test user.',
});
// output matches the schema type
```

#### Parameters

- `schema` (`FlexibleSchema<OBJECT>`): The schema that defines the structure of the object to generate. Supports Zod schemas, Standard JSON schemas, and custom JSON schemas.
- `name?` (`string`): Optional name of the output that should be generated. Used by some providers for additional LLM guidance, e.g. via tool or schema name.
- `description?` (`string`): Optional description of the output that should be generated. Used by some providers for additional LLM guidance, e.g. via tool or schema description.

#### Returns

An `Output<OBJECT, DeepPartial<OBJECT>>` specification where:

- Complete output is fully validated against the schema
- Partial output (during streaming) is a deep partial version of the schema type

Partial outputs streamed via `streamText` cannot be validated against your
provided schema, as incomplete data may not yet conform to the expected
structure.

***

### `Output.array()`

Output specification for generating arrays of typed elements. Each element is validated against the provided element schema.

```ts
import { generateText, Output } from 'ai';
import { z } from 'zod';

const { output } = await generateText({
  model: yourModel,
  output: Output.array({
    element: z.object({
      location: z.string(),
      temperature: z.number(),
      condition: z.string(),
    }),
    minItems: 2,
    maxItems: 2,
  }),
  prompt: 'List the weather for San Francisco and Paris.',
});
// output is an array of weather objects
```

#### Parameters

- `element` (`FlexibleSchema<ELEMENT>`): The schema that defines the structure of each array element. Supports Zod schemas, Valibot schemas, or JSON schemas.
- `minItems?` (`number`): The minimum number of elements to generate. Must be a non-negative integer.
- `maxItems?` (`number`): The maximum number of elements to generate. Must be a non-negative integer and greater than or equal to minItems.
- `name?` (`string`): Optional name of the output that should be generated. Used by some providers for additional LLM guidance, e.g. via tool or schema name.
- `description?` (`string`): Optional description of the output that should be generated. Used by some providers for additional LLM guidance, e.g. via tool or schema description.

#### Returns

An `Output<Array<ELEMENT>, Array<ELEMENT>>` specification where:

- Complete output is an array with all elements validated
- Complete output is validated against `minItems` and `maxItems`
- Partial output contains only fully validated elements (incomplete elements are excluded)

Set `minItems` and `maxItems` to the same value to require an exact number of
elements. The bounds are included in the provider-facing schema when the
provider supports them. The AI SDK also validates the completed output, so
providers that ignore these schema keywords cannot return an out-of-bounds
result.

#### Streaming with `elementStream`

When using `streamText` with `Output.array()`, you can iterate over elements as they are generated using `elementStream`:

```ts
import { streamText, Output } from 'ai';
import { z } from 'zod';

const { elementStream } = streamText({
  model: yourModel,
  output: Output.array({
    element: z.object({
      name: z.string(),
      class: z.string(),
      description: z.string(),
    }),
  }),
  prompt: 'Generate 3 hero descriptions for a fantasy role playing game.',
});

for await (const hero of elementStream) {
  console.log(hero); // Each hero is complete and validated
}
```

Each element emitted by `elementStream` is complete and validated against your
element schema, ensuring type safety for each item as it is generated. If the
model generates more than `maxItems`, `elementStream` errors before emitting
the first excess element. Provider generation is not aborted automatically,
and the final `output` promise also rejects.

***

### `Output.choice()`

Output specification for selecting from a predefined set of string options. Useful for classification tasks or fixed-enum answers.

```ts
import { generateText, Output } from 'ai';

const { output } = await generateText({
  model: yourModel,
  output: Output.choice({
    options: ['sunny', 'rainy', 'snowy'] as const,
  }),
  prompt: 'Is the weather sunny, rainy, or snowy today?',
});
// output is 'sunny' | 'rainy' | 'snowy'
```

#### Parameters

- `options` (`Array<CHOICE>`): An array of string options that the model can choose from. The output will be exactly one of these values.
- `name?` (`string`): Optional name of the output that should be generated. Used by some providers for additional LLM guidance, e.g. via tool or schema name.
- `description?` (`string`): Optional description of the output that should be generated. Used by some providers for additional LLM guidance, e.g. via tool or schema description.

#### Returns

An `Output<CHOICE, CHOICE>` specification where:

- Complete output is validated to be exactly one of the provided options

***

### `Output.json()`

Output specification for unstructured JSON generation. Use this when you want to generate arbitrary JSON without enforcing a specific schema.

```ts
import { generateText, Output } from 'ai';

const { output } = await generateText({
  model: yourModel,
  output: Output.json(),
  prompt:
    'For each city, return the current temperature and weather condition as a JSON object.',
});
// output is any valid JSON value
```

#### Parameters

- `name?` (`string`): Optional name of the output that should be generated. Used by some providers for additional LLM guidance, e.g. via tool or schema name.
- `description?` (`string`): Optional description of the output that should be generated. Used by some providers for additional LLM guidance, e.g. via tool or schema description.

#### Returns

An `Output<JSONValue, JSONValue>` specification that:

- Validates that the output is valid JSON
- Does not enforce any specific structure

With `Output.json()`, the AI SDK only checks that the response is valid JSON;
it doesn't validate the structure or types of the values. If you need schema
validation, use `Output.object()` or `Output.array()` instead.

## Error Handling

When `generateText` with structured output cannot generate a valid object, it throws a [`NoObjectGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-object-generated-error).

```ts
import { generateText, Output, NoObjectGeneratedError } from 'ai';

try {
  await generateText({
    model: yourModel,
    output: Output.object({ schema }),
    prompt: 'Generate a user profile.',
  });
} catch (error) {
  if (NoObjectGeneratedError.isInstance(error)) {
    console.log('NoObjectGeneratedError');
    console.log('Cause:', error.cause);
    console.log('Text:', error.text);
    console.log('Response:', error.response);
    console.log('Usage:', error.usage);
  }
}
```

## See also

- [Generating Structured Data](/docs/ai-sdk-core/generating-structured-data)
- [`generateText()`](/docs/reference/ai-sdk-core/generate-text)
- [`streamText()`](/docs/reference/ai-sdk-core/stream-text)
- [`zod-schema`](/docs/reference/ai-sdk-core/zod-schema)
- [`json-schema`](/docs/reference/ai-sdk-core/json-schema)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)