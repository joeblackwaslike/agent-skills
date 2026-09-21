---
source: "https://ai-sdk.dev/docs/ai-sdk-core/tool-search.md"
fetched_at: "2026-09-21T09:43:58.833Z"
sha256: "84f365deaee6f31d22861e6b21d7951116b587500368ac56874fcfea82ccf182"
---

# Tool Search

`toolSearch()` lets a model find the tools it needs without loading every tool's
definition into its initial context. Register tools with `deferLoading: true`;
search matches their names and descriptions and makes them available on the
**next model step**.

Use it with `generateText`, `streamText`, `ToolLoopAgent`, or `WorkflowAgent` from
`@ai-sdk/workflow`. The factory takes no arguments; the model supplies a search
query. `WorkflowAgent` supports direct tool calling; the other APIs also support
cache-preserving code mode.

## Direct Tool Calling

The model initially sees only `search`. After searching, matching definitions are
added to the provider's tool list and the model calls those tools directly. This
changes the tool definitions and can invalidate the cached prompt prefix.

```ts
import { generateText, isStepCount, tool, toolSearch } from 'ai';
import { z } from 'zod/v4';

const weather = tool({
  deferLoading: true,
  description: 'Get the weather forecast for a city.',
  inputSchema: z.object({ city: z.string() }),
  execute: async ({ city }) => ({ city, forecast: 'Rain tomorrow.' }),
});

const result = await generateText({
  model: __MODEL__,
  tools: { search: toolSearch(), weather },
  stopWhen: isStepCount(5),
  prompt: 'Will it rain in Bangalore tomorrow?',
});
```

## Code Mode

With [code mode](/docs/ai-sdk-core/code-mode), the model searches and calls tools
through generated code. Set `toolDiscovery: 'conversation'` to announce discovered
definitions in user messages while keeping the provider-visible code tool
unchanged. **This preserves the tool-definition cache as tools are discovered.**
Actual prompt-cache reuse depends on the provider.

Using the `weather` tool defined above:

```ts
import { experimental_codeModeTool as codeModeTool } from '@ai-sdk/code-mode';

const result = await generateText({
  model: __MODEL__,
  tools: {
    code: codeModeTool({ toolDiscovery: 'conversation' }),
    search: toolSearch(),
    weather,
  },
  experimental_toolCallers: {
    search: ['code'],
    weather: ['code'],
  },
  stopWhen: isStepCount(5),
  prompt: 'Will it rain in Bangalore tomorrow?',
});
```

The model first runs `tools.search({ query: 'weather forecast' })`. On the next
step, it receives the updated capability catalog and can call
`tools.weather({ city: 'Bangalore' })`.

In both modes, search loads up to five matches, respects `activeTools` and caller
routing, and keeps discovered tools available for the rest of the generation.
MCP client tools work too: add `deferLoading: true` to the tools returned by
`client.tools()`.

See the [`toolSearch()` reference](/docs/reference/ai-sdk-core/tool-search) for
input, output, and matching details.


## Navigation

- [Overview](/docs/ai-sdk-core/overview)
- [Generating Text](/docs/ai-sdk-core/generating-text)
- [Generating Structured Data](/docs/ai-sdk-core/generating-structured-data)
- [Tool Calling](/docs/ai-sdk-core/tools-and-tool-calling)
- [Model Context Protocol (MCP)](/docs/ai-sdk-core/mcp-tools)
- [MCP Apps](/docs/ai-sdk-core/mcp-apps)
- [Runtime and Tool Context](/docs/ai-sdk-core/runtime-and-tool-context)
- [Code Mode](/docs/ai-sdk-core/code-mode)
- [Tool Search](/docs/ai-sdk-core/tool-search)
- [Prompt Engineering](/docs/ai-sdk-core/prompt-engineering)
- [Settings](/docs/ai-sdk-core/settings)
- [Reasoning](/docs/ai-sdk-core/reasoning)
- [Embeddings](/docs/ai-sdk-core/embeddings)
- [Reranking](/docs/ai-sdk-core/reranking)
- [Evaluation](/docs/ai-sdk-core/evaluation)
- [Image Generation](/docs/ai-sdk-core/image-generation)
- [Realtime](/docs/ai-sdk-core/realtime)
- [Transcription](/docs/ai-sdk-core/transcription)
- [Translation](/docs/ai-sdk-core/translation)
- [Speech](/docs/ai-sdk-core/speech)
- [Video Generation](/docs/ai-sdk-core/video-generation)
- [File Uploads](/docs/ai-sdk-core/file-uploads)
- [Language Model Middleware](/docs/ai-sdk-core/middleware)
- [Skill Uploads](/docs/ai-sdk-core/skill-uploads)
- [Batch](/docs/ai-sdk-core/batch)
- [Provider & Model Management](/docs/ai-sdk-core/provider-management)
- [Error Handling](/docs/ai-sdk-core/error-handling)
- [Testing](/docs/ai-sdk-core/testing)
- [Telemetry](/docs/ai-sdk-core/telemetry)
- [DevTools](/docs/ai-sdk-core/devtools)
- [Lifecycle Callbacks](/docs/ai-sdk-core/lifecycle-callbacks)


[Full Sitemap](/sitemap.md)
