---
title: generateId
description: Generate a unique identifier (API Reference)
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-id"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-id.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "8df1f21e6b0b87da9d5ffc5afe28d50566dc8a012249cdb4db0ef773aae444c7"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Generates a unique identifier.

This is the same id generator used by the AI SDK.

```ts
import { generateId } from 'ai';

const id = generateId();
```

## Import

```
import { generateId } from "ai"
```

## API Signature

### Returns

A string representing the generated ID.

## See also

- [`createIdGenerator()`](/docs/reference/ai-sdk-core/create-id-generator)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)