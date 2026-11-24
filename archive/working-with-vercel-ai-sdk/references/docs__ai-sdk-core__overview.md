---
title: Overview
description: An overview of AI SDK Core.
url: "https://ai-sdk.dev/docs/ai-sdk-core/overview"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/ai-sdk-core/overview.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "fe45e52cc37fe20d4e878464cd023a3a898b215b819b22d24eae31f3bd0e9127"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Large Language Models (LLMs) are advanced programs that can understand, create, and engage with human language on a large scale.
They are trained on vast amounts of written material to recognize patterns in language and predict what might come next in a given piece of text.

AI SDK Core **simplifies working with LLMs by offering a standardized way of integrating them into your app** - so you can focus on building great AI applications for your users, not waste time on technical details.

For example, here’s how you can generate text with various models using the AI SDK:

## AI SDK Core Functions

AI SDK Core has various functions designed for [text generation](./generating-text), [structured data generation](./generating-structured-data), and [tool usage](./tools-and-tool-calling).
These functions take a standardized approach to setting up [prompts](/docs/foundations/prompts) and [settings](./settings), making it easier to work with different models.

- [`generateText`](/docs/ai-sdk-core/generating-text): Generates text and [tool calls](./tools-and-tool-calling).
  This function is ideal for non-interactive use cases such as automation tasks where you need to write text (e.g. drafting email or summarizing web pages) and for agents that use tools.
- [`streamText`](/docs/ai-sdk-core/generating-text): Stream text and tool calls.
  You can use the `streamText` function for interactive use cases such as [chat bots](/docs/ai-sdk-ui/chatbot) and [content streaming](/docs/ai-sdk-ui/completion).

Both `generateText` and `streamText` support [structured output](/docs/ai-sdk-core/generating-structured-data) via the `output` property (e.g. `Output.object()`, `Output.array()`), allowing you to generate typed, schema-validated data for information extraction, synthetic data generation, classification tasks, and [streaming generated UIs](/docs/ai-sdk-ui/object-generation).

## API Reference

Please check out the [AI SDK Core API Reference](/docs/reference/ai-sdk-core) for more details on each function.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)