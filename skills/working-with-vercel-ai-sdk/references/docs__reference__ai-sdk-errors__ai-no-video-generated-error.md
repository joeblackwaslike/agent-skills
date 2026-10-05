---
title: AI_NoVideoGeneratedError
description: Learn how to fix AI_NoVideoGeneratedError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-video-generated-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-video-generated-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "f1e60ad5e896a6560a218e61b213565602464842ddafd0c7267f026a9644010f"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when the AI provider fails to generate a video.
It can arise due to the following reasons:

- The model failed to generate a response.
- The model generated an invalid response.

## Properties

- `message`: The error message (optional, defaults to `'No video generated.'`).
- `responses`: Metadata about the video model responses, including timestamp, model, and headers (optional).
- `cause`: The cause of the error. You can use this for more detailed error handling (optional).

## Checking for this Error

You can check if an error is an instance of `AI_NoVideoGeneratedError` using:

```typescript
import {
  experimental_generateVideo as generateVideo,
  NoVideoGeneratedError,
} from 'ai';

try {
  await generateVideo({ model, prompt });
} catch (error) {
  if (NoVideoGeneratedError.isInstance(error)) {
    console.log('NoVideoGeneratedError');
    console.log('Cause:', error.cause);
    console.log('Responses:', error.responses);
  }
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)