---
title: AI_InvalidPromptError
description: Learn how to fix AI_InvalidPromptError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-prompt-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-prompt-error.md"
fetched_at: "2026-11-02T12:06:29.726Z"
sha256: "bcae5bcbdd8005b984947301ba22db59eea256aa3df22c65306f2b6b617e7ef4"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when the prompt provided is invalid.

## Potential Causes

### System Messages in `prompt` or `messages`

AI SDK functions reject system messages in the `prompt` or `messages` fields to reduce the risk of prompt injection.
Pass system instructions with the `instructions` option instead:

```typescript
import { generateText } from 'ai';

const result = await generateText({
  // ...
  instructions: 'You are a helpful assistant.',
  messages,
});
```

If the system messages come from a trusted source, you can allow them with `allowSystemInMessages: true`.

### Empty Messages

The `messages` array (or a `prompt` given as an array) must contain at least one message.

### Provider-Specific Prompt Requirements

Some providers throw this error when a prompt can't be expressed for their API,
for example when an assistant prefix message isn't the final message, or when a part combines options the provider doesn't support.
The error message describes the provider requirement that wasn't met.

AI SDK functions do not validate the shape of `ModelMessage` objects at
runtime. If your messages come from an untrusted source, validate them before
passing them to an AI SDK function. See
[`ModelMessage`](/docs/reference/ai-sdk-core/model-message).

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