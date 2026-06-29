---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-apps.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "ca2707e4c68693e3332c17a9891be405a251bbb8f394ea4b3abd0142439f1c7d"
---

# MCP Apps

The MCP Apps helpers in `@ai-sdk/mcp` help an MCP host advertise UI support, keep model-visible and app-visible tools separate, and read `ui://` HTML resources for rendering.

## Import

<Snippet
  text={`import {
  MCP_APP_MIME_TYPE,
  mcpAppClientCapabilities,
  readMCPAppResource,
  splitMCPAppTools,
} from "@ai-sdk/mcp"`}
  prompt={false}
/>

## `MCP_APP_MIME_TYPE`

The MIME type for HTML resources that should be rendered as MCP Apps.

```ts
const MCP_APP_MIME_TYPE = 'text/html;profile=mcp-app';
```

## `mcpAppClientCapabilities`

Client capabilities to pass to [`createMCPClient`](/docs/reference/ai-sdk-core/create-mcp-client) when your host supports MCP Apps.

```ts
import { createMCPClient, mcpAppClientCapabilities } from '@ai-sdk/mcp';

const client = await createMCPClient({
  transport: {
    type: 'http',
    url: 'https://example.com/mcp',
  },
  capabilities: mcpAppClientCapabilities,
});
```

The advertised capability is:

```json
{
  "extensions": {
    "io.modelcontextprotocol/ui": {
      "mimeTypes": ["text/html;profile=mcp-app"]
    }
  }
}
```

## `splitMCPAppTools()`

Splits MCP tool definitions into model-visible tools and app-visible tools.

Tools without MCP Apps visibility metadata remain model-visible. Tools whose `_meta.ui.visibility` includes `"app"` are returned in `appVisible`.

```ts
const definitions = await client.listTools();
const { modelVisible, appVisible } = splitMCPAppTools(definitions);

const tools = client.toolsFromDefinitions(modelVisible);
```

### Parameters

<PropertiesTable
  content={[
    {
      name: 'definitions',
      type: 'ListToolsResult',
      description: 'The tool definitions returned by `client.listTools()`.',
    },
  ]}
/>

### Returns

<PropertiesTable
  content={[
    {
      name: 'modelVisible',
      type: 'ListToolsResult',
      description:
        'Tool definitions that can be exposed to the language model.',
    },
    {
      name: 'appVisible',
      type: 'ListToolsResult',
      description:
        'Tool definitions that can be called by an MCP App through the host bridge.',
    },
  ]}
/>

## `readMCPAppResource()`

Reads a `ui://` resource from an MCP server and normalizes it into HTML plus rendering metadata.

```ts
const resource = await readMCPAppResource({
  client,
  uri: 'ui://example/dashboard',
});
```

The helper validates that the URI starts with `ui://`, requires the `text/html;profile=mcp-app` MIME type, and supports resource contents returned as either text or base64 blob data.

### Parameters

<PropertiesTable
  content={[
    {
      name: 'client',
      type: "Pick<MCPClient, 'readResource'>",
      description: 'The MCP client used to read the resource.',
    },
    {
      name: 'uri',
      type: 'string',
      description: 'The `ui://` resource URI to read.',
    },
    {
      name: 'options',
      type: 'RequestOptions',
      isOptional: true,
      description:
        'Optional request options, such as an abort signal or timeout.',
    },
  ]}
/>

### Returns

Returns a `Promise<MCPAppResource>`.

<PropertiesTable
  content={[
    {
      name: 'uri',
      type: 'string',
      description: 'The `ui://` resource URI.',
    },
    {
      name: 'mimeType',
      type: "'text/html;profile=mcp-app'",
      description: 'The MCP Apps HTML MIME type.',
    },
    {
      name: 'html',
      type: 'string',
      description: 'The app HTML to render in a sandboxed iframe.',
    },
    {
      name: 'meta',
      type: 'MCPAppResourceMeta',
      isOptional: true,
      description:
        'Rendering metadata from resource `_meta.ui`, such as CSP, permissions, and `prefersBorder`.',
    },
  ]}
/>

## See Also

<ExampleLinks
  examples={[
    {
      title: 'MCP Apps guide',
      link: '/docs/ai-sdk-core/mcp-apps',
    },
    {
      title: 'createMCPClient',
      link: '/docs/reference/ai-sdk-core/create-mcp-client',
    },
  ]}
/>


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
