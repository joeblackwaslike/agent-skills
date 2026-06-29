---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/get-realtime-tool-definitions.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "b3cfcca326a6235bab157aad43b311d946c94ba77eeab1396dfb06298ece4b6c"
---

# `experimental_getRealtimeToolDefinitions()`

<Note type="warning">
  `experimental_getRealtimeToolDefinitions` is part of the experimental realtime
  API.
</Note>

Converts an AI SDK `ToolSet` into provider-neutral realtime tool definitions
that can be passed to a realtime session setup request.

Use it in the server-side setup endpoint that creates a short-lived realtime
provider token.

```ts
import { openai } from '@ai-sdk/openai';
import { experimental_getRealtimeToolDefinitions, tool } from 'ai';
import { z } from 'zod';

const tools = {
  getWeather: tool({
    description: 'Get the current weather for a city',
    inputSchema: z.object({
      city: z.string(),
    }),
  }),
};

const toolDefinitions = await experimental_getRealtimeToolDefinitions({
  tools,
});

const token = await openai.experimental_realtime.getToken({
  model: 'gpt-realtime',
  sessionConfig: {
    tools: toolDefinitions,
  },
});
```

## Import

<Snippet
  text={`import { experimental_getRealtimeToolDefinitions } from "ai"`}
  prompt={false}
/>

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'options',
      type: 'Object',
      description: 'The options for converting tools.',
      properties: [
        {
          type: 'Object',
          parameters: [
            {
              name: 'tools',
              type: 'ToolSet',
              description:
                'The AI SDK tools to expose to the realtime model. Function and dynamic tools are converted to realtime function definitions. Provider tools are skipped.',
            },
            {
              name: 'toolsContext',
              type: 'InferToolSetContext<TOOLS>',
              isOptional: true,
              description:
                'Per-tool context used when resolving dynamic tool descriptions.',
            },
          ],
        },
      ],
    },
  ]}
/>

### Returns

A `Promise<Experimental_RealtimeToolDefinition[]>`.

Each returned definition contains:

<PropertiesTable
  content={[
    {
      name: 'type',
      type: "'function'",
      description: 'The realtime tool definition type.',
    },
    {
      name: 'name',
      type: 'string',
      description: 'The tool name from the input ToolSet.',
    },
    {
      name: 'description',
      type: 'string | undefined',
      description: 'The tool description sent to the realtime model.',
    },
    {
      name: 'parameters',
      type: 'JSONSchema7',
      description:
        'The JSON schema converted from the tool inputSchema. The realtime model uses this schema to generate tool call arguments.',
    },
  ]}
/>

## Notes

- Tool execution is not handled by `experimental_getRealtimeToolDefinitions`. Use
  [`experimental_useRealtime`](/docs/reference/ai-sdk-ui/use-realtime)
  `onToolCall` and `addToolOutput` to execute tools and return results.
- Provider tools are skipped because realtime providers expect regular function
  definitions in the session config.
- Dynamic tool descriptions are resolved with the matching value from
  `toolsContext` before the definitions are returned.


## Navigation

- [generateText](/docs/reference/ai-sdk-core/generate-text)
- [streamText](/docs/reference/ai-sdk-core/stream-text)
- [embed](/docs/reference/ai-sdk-core/embed)
- [embedMany](/docs/reference/ai-sdk-core/embed-many)
- [rerank](/docs/reference/ai-sdk-core/rerank)
- [generateImage](/docs/reference/ai-sdk-core/generate-image)
- [transcribe](/docs/reference/ai-sdk-core/transcribe)
- [generateSpeech](/docs/reference/ai-sdk-core/generate-speech)
- [experimental_generateVideo](/docs/reference/ai-sdk-core/generate-video)
- [uploadFile](/docs/reference/ai-sdk-core/upload-file)
- [uploadSkill](/docs/reference/ai-sdk-core/upload-skill)
- [Agent (Interface)](/docs/reference/ai-sdk-core/agent)
- [ToolLoopAgent](/docs/reference/ai-sdk-core/tool-loop-agent)
- [createAgentUIStream](/docs/reference/ai-sdk-core/create-agent-ui-stream)
- [createAgentUIStreamResponse](/docs/reference/ai-sdk-core/create-agent-ui-stream-response)
- [pipeAgentUIStreamToResponse](/docs/reference/ai-sdk-core/pipe-agent-ui-stream-to-response)
- [tool](/docs/reference/ai-sdk-core/tool)
- [dynamicTool](/docs/reference/ai-sdk-core/dynamic-tool)
- [createMCPClient](/docs/reference/ai-sdk-core/create-mcp-client)
- [experimental_getRealtimeToolDefinitions](/docs/reference/ai-sdk-core/get-realtime-tool-definitions)
- [MCP Apps](/docs/reference/ai-sdk-core/mcp-apps)
- [Experimental_StdioMCPTransport](/docs/reference/ai-sdk-core/mcp-stdio-transport)
- [jsonSchema](/docs/reference/ai-sdk-core/json-schema)
- [zodSchema](/docs/reference/ai-sdk-core/zod-schema)
- [valibotSchema](/docs/reference/ai-sdk-core/valibot-schema)
- [Output](/docs/reference/ai-sdk-core/output)
- [filterActiveTools](/docs/reference/ai-sdk-core/filter-active-tools)
- [ModelMessage](/docs/reference/ai-sdk-core/model-message)
- [UIMessage](/docs/reference/ai-sdk-core/ui-message)
- [validateUIMessages](/docs/reference/ai-sdk-core/validate-ui-messages)
- [safeValidateUIMessages](/docs/reference/ai-sdk-core/safe-validate-ui-messages)
- [Experimental_SandboxSession](/docs/reference/ai-sdk-core/sandbox)
- [createProviderRegistry](/docs/reference/ai-sdk-core/provider-registry)
- [customProvider](/docs/reference/ai-sdk-core/custom-provider)
- [cosineSimilarity](/docs/reference/ai-sdk-core/cosine-similarity)
- [wrapLanguageModel](/docs/reference/ai-sdk-core/wrap-language-model)
- [wrapImageModel](/docs/reference/ai-sdk-core/wrap-image-model)
- [LanguageModelV4Middleware](/docs/reference/ai-sdk-core/language-model-v2-middleware)
- [extractReasoningMiddleware](/docs/reference/ai-sdk-core/extract-reasoning-middleware)
- [simulateStreamingMiddleware](/docs/reference/ai-sdk-core/simulate-streaming-middleware)
- [defaultSettingsMiddleware](/docs/reference/ai-sdk-core/default-settings-middleware)
- [addToolInputExamplesMiddleware](/docs/reference/ai-sdk-core/add-tool-input-examples-middleware)
- [extractJsonMiddleware](/docs/reference/ai-sdk-core/extract-json-middleware)
- [isStepCount](/docs/reference/ai-sdk-core/is-step-count)
- [hasToolCall](/docs/reference/ai-sdk-core/has-tool-call)
- [isLoopFinished](/docs/reference/ai-sdk-core/loop-finished)
- [simulateReadableStream](/docs/reference/ai-sdk-core/simulate-readable-stream)
- [smoothStream](/docs/reference/ai-sdk-core/smooth-stream)
- [generateId](/docs/reference/ai-sdk-core/generate-id)
- [createIdGenerator](/docs/reference/ai-sdk-core/create-id-generator)
- [DefaultGeneratedFile](/docs/reference/ai-sdk-core/default-generated-file)


[Full Sitemap](/sitemap.md)
