---
title: AI Gateway Framework Integrations
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations"
last_updated: 2026-09-14
type: conceptual
prerequisites:
  - /docs/ai-gateway/ecosystem
  - /docs/ai-gateway
related:
  - /docs/ai-gateway
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-sdk
summary: Connect Flue, LangChain, LiteLLM, LlamaIndex, Mastra, Pydantic AI, TanStack AI, and other frameworks to Vercel AI Gateway with native adapters, the...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e4b93992e8102206b52e0d4106f5e527423f834670efe3774da3c706f6c98808"
---

# AI Gateway Framework Integrations

The Vercel [AI Gateway](/docs/ai-gateway) integrates with popular community AI frameworks and tools,
enabling you to build powerful AI applications while
using the Gateway's features like [cost tracking](/docs/ai-gateway/observability-and-spend/observability) and [unified API access](/docs/ai-gateway/models-and-providers).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build with AI on Vercel](https://vercel.com/docs/agent-resources/integrations-for-models) — Integrate powerful AI services and models seamlessly into your Vercel projects.
- [Vercel & OpenAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/openai) — Integrate your Vercel project with OpenAI's powerful suite of models.
- [Vercel Integrations](https://vercel.com/docs/integrations) — Learn how to extend Vercel's capabilities by integrating with your preferred providers for AI, databases, headless conte
- [Go with AI Gateway: OpenAI and Anthropic SDKs](https://vercel.com/docs/ai-gateway/sdks-and-apis/go) — Use AI Gateway from any Go application with the OpenAI or Anthropic Go SDKs, including model fallbacks, cost tracking, a
- [Frameworks and Adapters for Vercel Connect](https://vercel.com/docs/connect/frameworks) — Use Vercel Connect with AI SDK, TanStack AI, MCP clients, eve, Chat SDK, Better Auth, and Auth.js.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations.graph.md](/docs/ai-gateway/ecosystem/framework-integrations.graph.md)
<!-- /docsgraph:related -->

### Integration overview

You can integrate the AI Gateway with popular frameworks in several ways:

- **OpenAI Chat Completions**: Use the AI Gateway's [Chat Completions API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions)
- **Native Support**: Direct integration through plugins or official support
- **AI SDK Integration**: Use the [AI SDK](/docs/ai-sdk) to access [AI Gateway](/docs/ai-gateway) capabilities directly

### Supported frameworks

The following below list is a non-exhaustive list of frameworks that currently support AI Gateway integration:

- [Flue](/docs/ai-gateway/ecosystem/framework-integrations/flue)
- [LangChain](/docs/ai-gateway/ecosystem/framework-integrations/langchain)
- [LangFuse](/docs/ai-gateway/ecosystem/framework-integrations/langfuse)
- [LiteLLM](/docs/ai-gateway/ecosystem/framework-integrations/litellm)
- [LlamaIndex](/docs/ai-gateway/ecosystem/framework-integrations/llamaindex)
- [Mastra](/docs/ai-gateway/ecosystem/framework-integrations/mastra)
- [Pydantic AI](/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai)
- [TanStack AI](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai)
- [WordPress](/docs/ai-gateway/ecosystem/framework-integrations/wordpress)
- [Xcode](/docs/ai-gateway/ecosystem/framework-integrations/xcode)

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
