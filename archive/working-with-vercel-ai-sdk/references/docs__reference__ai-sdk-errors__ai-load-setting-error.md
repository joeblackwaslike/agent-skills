---
title: AI_LoadSettingError
description: Learn how to fix AI_LoadSettingError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-load-setting-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-load-setting-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "8056faa988d61daa9f38bc7ea39eb5efac05975ac4e23b6563a918f4e36c1764"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when a setting is not loaded successfully.

## Properties

- `message`: The error message

## Checking for this Error

You can check if an error is an instance of `AI_LoadSettingError` using:

```typescript
import { LoadSettingError } from 'ai';

if (LoadSettingError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)