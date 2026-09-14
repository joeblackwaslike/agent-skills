---
title: AI Gateway Text Generation Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/text
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/text"
last_updated: 2026-09-08
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
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "64315b0c40db12fab496b5727f21509ac0a41b1456e2e9582a90101489c5870d"
---

# AI Gateway Text Generation Quickstart

Stream a text response through AI Gateway.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Streaming responses from LLMs](https://vercel.com/kb/guide/streaming-from-llm?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Learn how to use the AI SDK to stream LLM responses.
- [Get started with GPT-5](https://ai-sdk.dev/cookbook/guides/gpt-5?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related)
- [AI Gateway Speech Quickstart: Transcription and TTS](https://vercel.com/docs/ai-gateway/getting-started/speech?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Generate speech and transcribe it using AI Gateway.
- [OpenAI Responses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [Video Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/video?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Generate a video from a text prompt using AI Gateway.
- [OpenResponses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Generate text responses using the OpenResponses API through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/getting-started/text.graph.md](/docs/ai-gateway/getting-started/text.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Generate your first text response

### Use a coding agent

Paste this prompt into a coding agent with terminal access:

**Agent prompt**

```text
Add streaming text generation through AI Gateway in the current environment. Use the AI Gateway skill for this task. If it is unavailable, run npx skills add vercel/vercel-plugin --skill ai-gateway, then find and read its SKILL.md before continuing. Reuse the environment's language, framework, package manager, and AI client when possible, and add only required dependencies. Read AI_GATEWAY_API_KEY from the environment. If it is missing, run npx vercel@latest whoami and pause for login if needed. Determine the team, then run npx vercel@latest --scope <team-slug> ai-gateway api-keys create --name <descriptive-name>. Capture stdout directly into AI_GATEWAY_API_KEY for the request or existing ignored secret storage, and never expose the value. Use openai/gpt-6-astra, stream the generated text, run the result, and report the output.
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
