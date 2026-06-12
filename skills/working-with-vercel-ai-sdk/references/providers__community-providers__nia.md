---
source: "https://ai-sdk.dev/providers/community-providers/nia.md"
fetched_at: "2026-06-11T15:39:44.005Z"
sha256: "e68a586ef7082214de9e77196b2566f5272d62972200c427d5b367b1c9ae37db"
---

# Nia

[Nia](https://www.trynia.ai/) by Nozomio Labs is an API for technical, up-to-date context. It lets you index docs, repos, PDFs, and datasets, then search them with AI so your agent gets real answers instead of hallucinations. The [`@nozomioai/nia-ai-sdk`](https://www.npmjs.com/package/@nozomioai/nia-ai-sdk) package integrates Nia with the AI SDK through tools, middleware, and direct streaming helpers.

It is designed for workflows where you want to:

- Call Nia Tracer as a tool for public GitHub and documentation research
- Call Nia Oracle as a tool for grounded research over indexed repositories, docs, PDFs, and datasets
- Call Nia Document Agent as a tool for deep document analysis and structured extraction
- Augment an existing AI SDK model with Nia-backed middleware
- Stream Tracer, Oracle, or Document Agent events directly in your app

Learn more in the [Nia documentation](https://docs.trynia.ai/).

## Setup

The Nia adapter is available in the `@nozomioai/nia-ai-sdk` package. You can install it with:

<Tabs items={["pnpm", "npm", "yarn", "bun"]}>
  <Tab>
    <Snippet text="pnpm add @nozomioai/nia-ai-sdk" dark />
  </Tab>
  <Tab>
    <Snippet text="npm install @nozomioai/nia-ai-sdk" dark />
  </Tab>
  <Tab>
    <Snippet text="yarn add @nozomioai/nia-ai-sdk" dark />
  </Tab>
  <Tab>
    <Snippet text="bun add @nozomioai/nia-ai-sdk" dark />
  </Tab>
</Tabs>

If you want to use Nia middleware with a model provider, install that provider as well. For example:

```bash
pnpm add @ai-sdk/openai
```

Set your Nia API key:

```bash
export NIA_API_KEY=nia_your_api_key
```

You can get your API key from the [Nia dashboard](https://www.trynia.ai/).

## Tool Usage

Nia works well as a set of AI SDK tools that you pass to `generateText` or `streamText`.

### `generateText`

```ts
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createNiaResearchTools } from '@nozomioai/nia-ai-sdk';

const tools = createNiaResearchTools({
  apiKey: process.env.NIA_API_KEY!,
  tracer: {
    defaultRequest: {
      mode: 'tracer-deep',
    },
  },
  oracle: {
    defaultRequest: {
      repositories: ['vercel/ai'],
      dataSources: ['Vercel AI SDK'],
    },
  },
  documentAgent: {
    defaultRequest: {
      sourceId: 'src_abc123',
    },
  },
});

const result = await generateText({
  model: openai('gpt-4.1'),
  prompt:
    'Research how AI SDK middleware works, then summarize the best integration pattern.',
  tools,
});

console.log(result.text);
```

You can pass `false` to any service key to disable it entirely, e.g. `oracle: false` if you only need Tracer. Per-service transport options (such as a separate `apiKey`) override the top-level ones when provided.

The SDK also exports `createTracerTool()`, `createOracleTool()`, and `createDocumentAgentTool()` for when you only need a single tool.

## Middleware Usage

Use middleware when you want Nia to enrich the last user message before your base model runs.

### `withOracleContext`

```ts
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { withOracleContext } from "@nozomioai/nia-ai-sdk";

const model = withOracleContext(openai("gpt-4.1"), {
  apiKey: process.env.NIA_API_KEY!,
  defaultRequest: {
    repositories: ["vercel/ai"],
    dataSources: ["Vercel AI SDK"],
  },
});

const result = await generateText({
  model,
  prompt: "How should I think about AI SDK middleware for retrieval?",
});

console.log(result.text);
```

You can use `withTracerContext()` in the same way for public GitHub research and `withDocumentAgentContext()` when working with indexed PDFs or documents.

For more control, the lower-level `createTracerMiddleware()`, `createOracleMiddleware()`, and `createDocumentAgentMiddleware()` exports return raw `LanguageModelMiddleware` objects you can compose yourself.

## Direct Streaming Helpers

If you want raw Nia job events, use the direct streaming helpers:

- `streamTracer()`
- `streamOracle()`
- `streamOracleSessionChat()`
- `streamDocumentAgent()`

```ts
import { streamTracer } from "@nozomioai/nia-ai-sdk";

const session = await streamTracer(
  {
    apiKey: process.env.NIA_API_KEY!,
  },
  {
    query: "How does generateText stream responses?",
    repositories: ["vercel/ai"],
    mode: "tracer-fast",
  }
);

for await (const event of session.events) {
  console.log(event.event, event.data);
}
```

## Additional Resources

- [Nia package on npm](https://www.npmjs.com/package/@nozomioai/nia-ai-sdk)
- [Nia adapter repository](https://github.com/nozomio-labs/nia-ai-sdk)
- [Nia documentation](https://docs.trynia.ai/)
- [Nia website](https://www.trynia.ai/)


## Navigation

- [Writing a Custom Provider](/providers/community-providers/custom-providers)
- [A2A](/providers/community-providers/a2a)
- [ACP (Agent Client Protocol)](/providers/community-providers/acp)
- [Aihubmix](/providers/community-providers/aihubmix)
- [AI/ML API](/providers/community-providers/aimlapi)
- [Anthropic Vertex](/providers/community-providers/anthropic-vertex-ai)
- [Automatic1111](/providers/community-providers/automatic1111)
- [Azure AI](/providers/community-providers/azure-ai)
- [Browser AI](/providers/community-providers/browser-ai)
- [Claude Code](/providers/community-providers/claude-code)
- [Cloudflare AI Gateway](/providers/community-providers/cloudflare-ai-gateway)
- [Cloudflare Workers AI](/providers/community-providers/cloudflare-workers-ai)
- [Codex CLI](/providers/community-providers/codex-cli)
- [Crosshatch](/providers/community-providers/crosshatch)
- [Dify](/providers/community-providers/dify)
- [Firemoon](/providers/community-providers/firemoon)
- [FriendliAI](/providers/community-providers/friendliai)
- [Gemini CLI](/providers/community-providers/gemini-cli)
- [Helicone](/providers/community-providers/helicone)
- [Inflection AI](/providers/community-providers/inflection-ai)
- [Jina AI](/providers/community-providers/jina-ai)
- [LangDB](/providers/community-providers/langdb)
- [Letta](/providers/community-providers/letta)
- [llama.cpp](/providers/community-providers/llama-cpp)
- [LlamaGate](/providers/community-providers/llamagate)
- [MCP Sampling AI Provider](/providers/community-providers/mcp-sampling)
- [Mem0](/providers/community-providers/mem0)
- [MiniMax](/providers/community-providers/minimax)
- [Mixedbread](/providers/community-providers/mixedbread)
- [Ollama](/providers/community-providers/ollama)
- [OpenCode](/providers/community-providers/opencode-sdk)
- [OpenRouter](/providers/community-providers/openrouter)
- [Portkey](/providers/community-providers/portkey)
- [Qwen](/providers/community-providers/qwen)
- [React Native Apple](/providers/community-providers/react-native-apple)
- [Requesty](/providers/community-providers/requesty)
- [Runpod](/providers/community-providers/runpod)
- [SambaNova](/providers/community-providers/sambanova)
- [SAP AI Core](/providers/community-providers/sap-ai)
- [Sarvam](/providers/community-providers/sarvam)
- [Soniox](/providers/community-providers/soniox)
- [Spark](/providers/community-providers/spark)
- [Supermemory](/providers/community-providers/supermemory)
- [Voyage AI](/providers/community-providers/voyage-ai)
- [Zhipu AI (Z.AI)](/providers/community-providers/zhipu)
- [vectorstores](/providers/community-providers/vectorstores)
- [Codex CLI (App Server)](/providers/community-providers/codex-app-server)
- [Apertis](/providers/community-providers/apertis)
- [OLLM](/providers/community-providers/ollm)
- [Cencori](/providers/community-providers/cencori)
- [Hindsight](/providers/community-providers/hindsight)
- [Nia](/providers/community-providers/nia)
- [ZeroEntropy](/providers/community-providers/zeroentropy)
- [Flowise](/providers/community-providers/flowise)


[Full Sitemap](/sitemap.md)
