---
title: createIdGenerator
description: Create a customizable unique identifier generator (API Reference)
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/create-id-generator"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/create-id-generator.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "760d238c52379db7f0e837541ac932650d09b253d1951d038255163c63907889"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Creates a customizable ID generator function. You can configure the alphabet, prefix, separator, and default size of the generated IDs.

```ts
import { createIdGenerator } from 'ai';

const generateCustomId = createIdGenerator({
  prefix: 'user',
  separator: '_',
});

const id = generateCustomId(); // Example: "user_1a2b3c4d5e6f7g8h"
```

## Import

```
import { createIdGenerator } from "ai"
```

## API Signature

### Parameters

- `options` (`object`): Optional configuration object with the following properties:
- `options.alphabet` (`string`): The characters to use for generating the random part of the ID. Defaults to alphanumeric characters (0-9, A-Z, a-z).
- `options.prefix` (`string`): A string to prepend to all generated IDs. Defaults to none.
- `options.separator` (`string`): The character(s) to use between the prefix and the random part. Defaults to "-".
- `options.size` (`number`): The default length of the random part of the ID. Defaults to 16.

### Returns

Returns a function that generates IDs based on the configured options.

### Notes

- The generator uses non-secure random generation and should not be used for security-critical purposes.
- The separator character must not be part of the alphabet to ensure reliable prefix checking.

## Example

```ts
// Create a custom ID generator for user IDs
const generateUserId = createIdGenerator({
  prefix: 'user',
  separator: '_',
  size: 8,
});

// Generate IDs
const id1 = generateUserId(); // e.g., "user_1a2b3c4d"
```

## See also

- [`generateId()`](/docs/reference/ai-sdk-core/generate-id)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)