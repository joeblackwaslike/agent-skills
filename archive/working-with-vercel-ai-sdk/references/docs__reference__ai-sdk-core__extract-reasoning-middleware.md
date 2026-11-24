---
title: extractReasoningMiddleware
description: Middleware that extracts reasoning sections from generated text using configurable delimiters
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/extract-reasoning-middleware"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/extract-reasoning-middleware.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "1328dce4d2d2a2e51b47067065175092ba7257748917fa71e14c0d94c06c8182"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

`extractReasoningMiddleware` is a middleware function that extracts delimited reasoning sections from generated text and exposes them separately from the main text content. This is particularly useful when you want to separate an AI model's reasoning process from its final output.

```ts
import { extractReasoningMiddleware } from 'ai';

const middleware = extractReasoningMiddleware({
  tagName: 'reasoning',
  separator: '\n',
});
```

For models that emit non-XML delimiters, pass literal `opening` and `closing`
strings. For example, Gemma 4's raw thought-channel output uses a newline in its
opening delimiter:

```ts
const middleware = extractReasoningMiddleware({
  tagName: { opening: '<|channel>thought\n', closing: '<channel|>' },
});
```

Custom delimiters must be non-empty. They are matched literally, including
characters such as `|`, and can span multiple streaming chunks. Empty reasoning
blocks are removed from the answer text as well. Use this middleware when the
server returns these markers in text; providers that already return reasoning
separately do not need it.

## Import

```
import { extractReasoningMiddleware } from "ai"
```

## API Signature

### Parameters

- `tagName` (`string | { opening: string; closing: string }`): An XML tag name without angle brackets (e.g. "think" for \<think> / \</think>), or an object containing non-empty literal opening and closing delimiters.
- `separator?` (`string`): The separator to use between reasoning and text sections. Defaults to "\n"
- `startWithReasoning?` (`boolean`): Starts with reasoning tokens. Set to true when the response always starts with reasoning and the opening delimiter is omitted. Defaults to false.

### Returns

Returns a middleware object that:

- Processes both streaming and non-streaming responses
- Extracts content between the specified delimiters as reasoning
- Removes the delimiters and reasoning from the main text
- Emits reasoning content parts separately from text content parts
- Maintains proper separation between text sections using the specified separator

### Type Parameters

The middleware works with the `LanguageModelV4StreamPart` type for streaming responses.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)