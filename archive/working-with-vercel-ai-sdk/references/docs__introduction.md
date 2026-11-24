---
title: AI SDK by Vercel
description: The AI SDK is the TypeScript toolkit for building AI applications and agents with React, Next.js, Vue, Svelte, Node.js, and more.
url: "https://ai-sdk.dev/docs/introduction"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/introduction.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "def734feee9cd7b036e00010ba89d7b7dc314f77ef70f54ecd069d5839781087"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The AI SDK is the TypeScript toolkit designed to help developers build AI-powered applications and agents with React, Next.js, Vue, Svelte, Node.js, and more.

## Why use the AI SDK?

Integrating large language models (LLMs) into applications is complicated and heavily dependent on the specific model provider you use.

The AI SDK standardizes integrating artificial intelligence (AI) models across [supported providers](/docs/foundations/providers-and-models). This enables developers to focus on building great AI applications, not waste time on technical details.

The AI SDK also includes a [harness abstraction](/docs/ai-sdk-harnesses) for using
established agent harnesses such as Claude Code, Codex, and Pi through
`HarnessAgent`. Harnesses are decoupled from model providers, but use compatible
stream and response primitives so AI SDK UI and agent surfaces can consume them
in the same way.

For example, here’s how you can generate text with various models using the AI SDK:

The AI SDK has these primary surfaces:

- **[AI SDK Core](/docs/ai-sdk-core):** A unified API for generating text, structured objects, tool calls, and building agents with LLMs.
- **[AI SDK UI](/docs/ai-sdk-ui):** A set of framework-agnostic hooks for quickly building chat and generative user interfaces.
- **[AI SDK Harnesses](/docs/ai-sdk-harnesses):** A uniform API for running established agent harnesses with `HarnessAgent`.

## Model Providers

The AI SDK supports [multiple model providers](/providers).

## Templates

We've built some [templates](https://vercel.com/templates?type=ai) that include AI SDK integrations for different use cases, providers, and frameworks. You can use these templates to get started with your AI-powered application.

### Starter Kits

### Feature Exploration

### Frameworks

### Generative UI

### Security

## Join our Community

If you have questions about anything related to the AI SDK, you're always welcome to ask our community on [the Vercel Community](https://community.vercel.com/c/ai-sdk/62).

## `llms.txt` (for Cursor, Windsurf, Copilot, Claude etc.)

You can access the entire AI SDK documentation in Markdown format at [ai-sdk.dev/llms.txt](/llms.txt). This can be used to ask any LLM (assuming it has a big enough context window) questions about the AI SDK based on the most up-to-date documentation.

### Example Usage

For instance, to prompt an LLM with questions about the AI SDK:

1. Copy the documentation contents from [ai-sdk.dev/llms.txt](/llms.txt)
2. Use the following prompt format:

```txt
Documentation:
{paste documentation here}
---
Based on the above documentation, answer the following:
{your question}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)