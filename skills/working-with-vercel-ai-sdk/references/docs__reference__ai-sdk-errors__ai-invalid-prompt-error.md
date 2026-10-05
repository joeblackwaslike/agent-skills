---
title: AI_InvalidPromptError
description: Learn how to fix AI_InvalidPromptError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-prompt-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-prompt-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "e8327169e966af78986ec7d2aa228a50bae76be8281786d7f93cac6b444a21e3"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when the prompt provided is invalid.

## Potential Causes

### UI Messages

You are passing a `UIMessage[]` as messages into e.g. `streamText`.

You need to first convert them to a `ModelMessage[]` using `convertToModelMessages()`.

```typescript
import { type UIMessage, generateText, convertToModelMessages } from 'ai';

const messages: UIMessage[] = [
  /* ... */
];

const result = await generateText({
  // ...
  messages: await convertToModelMessages(messages),
});
```

## Properties

- `prompt`: The invalid prompt value
- `message`: The error message (required in constructor)
- `cause`: The cause of the error (optional)

## Checking for this Error

You can check if an error is an instance of `AI_InvalidPromptError` using:

```typescript
import { InvalidPromptError } from 'ai';

if (InvalidPromptError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)