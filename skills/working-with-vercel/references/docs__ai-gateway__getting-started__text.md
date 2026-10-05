---
title: AI Gateway Text Generation Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/text
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/text"
last_updated: 2026-09-21
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
summary: Generate and stream text responses using AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/text.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "67fe12820af37cb9de8dd6ea85e3a5bc2e9280c3e4a4ebc16cb0dd064c720224"
---

# AI Gateway Text Generation Quickstart

Stream a text response through AI Gateway.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Generate Text with Chat Prompt](https://ai-sdk.dev/cookbook/node/generate-text-with-chat-prompt?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Learn how to generate text with chat prompt using the AI SDK and Node
- [Generate Text with Chat Prompt](https://ai-sdk.dev/cookbook/next/generate-text-with-chat-prompt?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Learn how to generate text with chat prompt using the AI SDK and Next.js
- [Generate Text](https://ai-sdk.dev/cookbook/next/generate-text?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Learn how to generate text using the AI SDK and Next.js.
- [Generate Text](https://ai-sdk.dev/cookbook/node/generate-text?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Learn how to generate text using the AI SDK and Node
- [OpenAI Responses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [AI Gateway Speech Quickstart: Transcription and TTS](https://vercel.com/docs/ai-gateway/getting-started/speech?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Generate speech and transcribe it using AI Gateway.
- [AI Gateway](https://vercel.com/docs/agent-resources/vercel-mcp/tools/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Vercel MCP tools for ai gateway.

Full cross-link map for this page: [/docs/ai-gateway/getting-started/text.graph.md](/docs/ai-gateway/getting-started/text.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Generate your first text response

### Use a coding agent

Paste this prompt into a coding agent with terminal access:

**Agent prompt**

```text
AI_GATEWAY_TEXT_GENERATION_PROMPT
```

### Run the Node.js example

Use [Node.js 22.18 or later](https://nodejs.org/) and a team with available [AI Gateway Credits](/docs/ai-gateway/pricing). Export `AI_GATEWAY_API_KEY` in your current shell. If you need a key, open the [Create API Key dialog](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys%3FshowCreateKeyModal%3Dtrue\&title=AI+Gateway+API+Keys).

```bash filename="Terminal"
export AI_GATEWAY_API_KEY="your_ai_gateway_api_key"
```

Install the AI SDK:

```bash filename="Terminal"
pnpm add ai@latest
```

Create `index.mts`:

```typescript filename="index.mts"
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-6-astra',
  prompt: 'Invent a new holiday and describe its traditions.',
});

for await (const textPart of result.textStream) {
  process.stdout.write(textPart);
}

console.log();
```

Run the script:

```bash filename="Terminal"
node index.mts
```

## Next steps

- Use AI Gateway with the [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk), [OpenAI Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [OpenAI Responses](/docs/ai-gateway/sdks-and-apis/responses), [Anthropic Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api), or [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses)
- Add [tools and structured output](/docs/ai-gateway/modalities/text-generation)
- Configure [provider routing and fallbacks](/docs/ai-gateway/models-and-providers/provider-options)


---

[View full sitemap](/docs/sitemap)
