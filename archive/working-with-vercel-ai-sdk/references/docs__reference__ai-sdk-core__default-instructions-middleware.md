---
title: defaultInstructionsMiddleware
description: Middleware that applies default instructions to language model calls
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/default-instructions-middleware"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/default-instructions-middleware.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "10d730661df8abefca6e7946c63f9c2218f49fe67039b328a5406526824f2e22"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

`defaultInstructionsMiddleware` applies default instructions to language model
calls that do not already contain a system message. This is useful for
configuring reusable model behavior while allowing call-level `instructions` to
take precedence.

## Import

```
import { defaultInstructionsMiddleware } from "ai"
```

## API Signature

```ts
function defaultInstructionsMiddleware(options: {
  instructions: Instructions;
}): LanguageModelMiddleware;
```

### Parameters

- `instructions` (`string | SystemModelMessage | Array<SystemModelMessage>`): Default instructions to prepend when a call does not already contain a system message.

### Returns

Returns a
[LanguageModelMiddleware](/docs/ai-sdk-core/middleware) that:

- Prepends the configured instructions to calls without a system message.
- Preserves instruction-level `providerOptions`.
- Leaves calls containing any system message unchanged, so call-level
  instructions take precedence.
- Applies to both non-streaming and streaming language model calls.

## Usage Example

```ts
import {
  defaultInstructionsMiddleware,
  generateText,
  wrapLanguageModel,
} from 'ai';

const model = wrapLanguageModel({
  model: "anthropic/claude-sonnet-5.5",
  middleware: defaultInstructionsMiddleware({
    instructions: 'You are a concise technical assistant.',
  }),
});

const defaultResult = await generateText({
  model,
  prompt: 'Explain HTTP caching.',
});

const overriddenResult = await generateText({
  model,
  instructions: 'Explain concepts for a complete beginner.',
  prompt: 'Explain HTTP caching.',
});
```

You can attach provider options to default instructions by using a
`SystemModelMessage`:

```ts
const model = wrapLanguageModel({
  model: "anthropic/claude-sonnet-5.5",
  middleware: defaultInstructionsMiddleware({
    instructions: {
      role: 'system',
      content: 'You are a concise technical assistant.',
      providerOptions: {
        anthropic: {
          cacheControl: { type: 'ephemeral' },
        },
      },
    },
  }),
});
```

This middleware provides defaults, not enforced instructions. Any system
message in the normalized prompt suppresses the defaults. Only use
`allowSystemInMessages` with trusted message histories, because an untrusted
system message could override the configured defaults.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)