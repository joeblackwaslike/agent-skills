---
title: createMCPClient
description: Create a client for connecting to MCP servers
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/create-mcp-client"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/create-mcp-client.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "97dab1b7b941852f03dd829f01d1f6784db83eba05ee6ec1175608ae69dfde00"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Creates a lightweight Model Context Protocol (MCP) client that connects to an MCP server. The client provides:

- **Tools**: Automatic conversion between MCP tools and AI SDK tools
- **Resources**: Methods to list, read, and discover resource templates from MCP servers
- **Prompts**: Methods to list available prompts and retrieve prompt messages
- **Completions**: Methods to request autocompletion suggestions for prompt arguments and resource template variables
- **Elicitation**: Support for handling server requests for additional input during tool execution

It currently does not support accepting notifications from an MCP server.

## Import

```
import { createMCPClient } from "@ai-sdk/mcp"
```

## API Signature

### Parameters

- `config` (`MCPClientConfig`): Configuration for the MCP client.
  - `MCPClientConfig`
    - `transport` (`MCPTransportConfig | MCPTransport`): Configuration for the message transport layer.
      - `MCPTransport`
        - `start` (`() => Promise<void>`): A method that starts the transport
        - `send` (`(message: JSONRPCMessage) => Promise<void>`): A method that sends a message through the transport
        - `close` (`() => Promise<void>`): A method that closes the transport
        - `onclose` (`() => void`): A method that is called when the transport is closed
        - `onerror` (`(error: Error) => void`): A method that is called when the transport encounters an error
        - `onmessage` (`(message: JSONRPCMessage) => void`): A method that is called when the transport receives a message
      - `MCPTransportConfig`
        - `type` (`'sse' | 'http'`): Use Server-Sent Events for communication
        - `url` (`string`): URL of the MCP server
        - `headers?` (`Record<string, string>`): Additional HTTP headers to be sent with requests.
        - `authProvider?` (`OAuthClientProvider`): Optional OAuth provider for authorization to access protected remote MCP servers. Implement \`validateAuthorizationServerURL\` on the provider to allowlist discovered OAuth authorization server URLs before metadata is fetched.
        - `redirect?` (`'follow' | 'error'`): Controls how HTTP redirects are handled for transport requests. Set to 'follow' to allow redirect responses. Defaults to 'error' to reject any redirect response, preventing servers from redirecting requests to unintended hosts.
        - `initialSessionId?` (`string`): Initial legacy MCP session id to send with resumed Streamable HTTP requests after initialization. Pair with initialInitializeResult when using createMCPClient. Only used by the HTTP transport and initialization-based protocol versions.
        - `initialProtocolVersion?` (`string`): Initial legacy MCP protocol version to send before initialize negotiates one. Only used by the HTTP transport.
        - `onSessionIdChange?` (`(sessionId: string | undefined) => void`): Callback invoked when the Streamable HTTP server creates, changes, or clears the MCP session id. Only used by the HTTP transport.
        - `onSessionExpired?` (`(sessionId: string) => void`): Callback invoked when a Streamable HTTP request returns 404 for an existing MCP session id. The transport clears the session id before reporting the underlying HTTP error. Only used by the HTTP transport.
        - `terminateSessionOnClose?` (`boolean`): Whether close() should send DELETE for the current MCP session id. Set to false when the application intends to reattach to the session later. Defaults to true. Only used by the HTTP transport.
        - `fetch?` (`FetchFunction`): Optional custom fetch implementation to use for HTTP requests. Useful for runtimes that need a request-local fetch.
    - `initializationOptions?` (`RequestOptions`): Optional signal and timeout settings that bound transport startup and protocol negotiation. A timeout or abort closes the transport and rejects createMCPClient.
    - `clientName?` (`string`): Client name. Defaults to "ai-sdk-mcp-client".
    - `name?` (`string`): Deprecated. Use \`clientName\` instead. Defaults to "ai-sdk-mcp-client".
    - `version?` (`string`): Client version. Defaults to "1.0.0"
    - `onUncaughtError?` (`(error: unknown) => void`): Handler for uncaught errors
    - `maxRetries?` (`number`): Maximum number of retries for transient MCP tool call failures. Set to 0 to disable retries. Defaults to 0. Retries are opt-in and apply to tools/call requests.
    - `initialInitializeResult?` (`InitializeResult`): Initialize result from a previous legacy MCP session. When provided, the client starts the transport and reuses this metadata without sending a new initialize request.
    - `capabilities?` (`ClientCapabilities`): Optional client capabilities to advertise during legacy initialization or on each stateless modern request. For example, set \{ elicitation: \{} } to enable handling elicitation requests from the server.

### Returns

Returns a Promise that resolves to an `MCPClient` with the following properties and methods:

- `initializeResult` (`InitializeResult`): Connection metadata used by this client. For legacy servers this is the initialize result; for modern servers an equivalent value is derived from protocol discovery.
- `serverInfo` (`Configuration`): Information about the connected MCP server (name, version, optional title), as reported during initialization or protocol discovery.
- `instructions?` (`string`): Optional instructions provided by the server during the initialize handshake. Describes how to use the server and its features. Useful for inclusion in the LLM system prompt.
- `tools` (`async (options?: {
      schemas?: TOOL_SCHEMAS
    }) => Promise<McpToolSet<TOOL_SCHEMAS>>`): Gets the tools available from the MCP server.
  - `options`
    - `schemas?` (`TOOL_SCHEMAS`): Schema definitions for compile-time type checking. When not provided, schemas are inferred from the server. Each tool schema can include inputSchema for typed inputs, and optionally outputSchema for typed outputs when the server returns structuredContent.
  - `TOOL_SCHEMAS`
    - `inputSchema` (`FlexibleSchema`): Zod schema or JSON schema defining the expected input parameters for the tool.
    - `outputSchema?` (`FlexibleSchema`): Zod schema or JSON schema defining the expected output structure. When provided, the client extracts and validates structuredContent from tool results, giving you typed outputs.
- `listTools` (`async (options?: {
      params?: PaginatedRequest['params'];
      options?: RequestOptions;
    }) => Promise<ListToolsResult>`): Lists available tool definitions from the MCP server without converting them to AI SDK tools.
  - `options`
    - `params?` (`PaginatedRequest['params']`): Optional pagination parameters including cursor.
    - `options?` (`RequestOptions`): Optional request options including signal and timeout.
- `callTool` (`async (args: {
      name: string;
      arguments?: Record<string, unknown>;
      options?: RequestOptions;
    }) => Promise<CallToolResult>`): Calls a tool on the MCP server. This is useful for host-mediated calls, such as MCP Apps iframe requests.
  - `args`
    - `name` (`string`): The name of the MCP tool to call.
    - `arguments?` (`Record<string, unknown>`): Arguments to pass to the MCP tool.
    - `options?` (`RequestOptions`): Optional request options including signal and timeout.
- `toolsFromDefinitions` (`(definitions: ListToolsResult, options?: {
      schemas?: TOOL_SCHEMAS
    }) => McpToolSet<TOOL_SCHEMAS>`): Converts existing MCP tool definitions into AI SDK tools without listing tools again.
  - `parameters`
    - `definitions` (`ListToolsResult`): Tool definitions, typically returned by \`listTools\`.
    - `schemas?` (`TOOL_SCHEMAS`): Optional schema definitions for compile-time type checking and typed outputs.
- `listResources` (`async (options?: {
      params?: PaginatedRequest['params'];
      options?: RequestOptions;
    }) => Promise<ListResourcesResult>`): Lists all available resources from the MCP server.
  - `options`
    - `params?` (`PaginatedRequest['params']`): Optional pagination parameters including cursor.
    - `options?` (`RequestOptions`): Optional request options including signal and timeout.
- `readResource` (`async (args: {
      uri: string;
      options?: RequestOptions;
    }) => Promise<ReadResourceResult>`): Reads the contents of a specific resource by URI.
  - `args`
    - `uri` (`string`): The URI of the resource to read.
    - `options?` (`RequestOptions`): Optional request options including signal and timeout.
- `listResourceTemplates` (`async (options?: {
      options?: RequestOptions;
    }) => Promise<ListResourceTemplatesResult>`): Lists all available resource templates from the MCP server.
  - `options`
    - `options?` (`RequestOptions`): Optional request options including signal and timeout.
- `complete` (`async (args: CompleteRequestParams & {
      options?: RequestOptions;
    }) => Promise<CompleteResult>`): Requests autocompletion suggestions for a prompt argument or resource template variable. The server must advertise the completions capability.
  - `args`
    - `ref` (`{ type: 'ref/prompt'; name: string } | { type: 'ref/resource'; uri: string }`): Reference to the prompt or resource template being completed.
    - `argument` (`{ name: string; value: string }`): Argument name and current partial value to complete.
    - `context?` (`{ arguments: Record<string, string> }`): Previously resolved argument values used to provide context for multi-argument prompts or resource templates.
    - `options?` (`RequestOptions`): Optional request options including signal and timeout.
- `experimental_listPrompts` (`async (options?: {
      params?: PaginatedRequest['params'];
      options?: RequestOptions;
    }) => Promise<ListPromptsResult>`): Lists available prompts from the MCP server. This method is experimental and may change in the future.
  - `options`
    - `params?` (`PaginatedRequest['params']`): Optional pagination parameters including cursor.
    - `options?` (`RequestOptions`): Optional request options including signal and timeout.
- `experimental_getPrompt` (`async (args: {
      name: string;
      arguments?: Record<string, unknown>;
      options?: RequestOptions;
    }) => Promise<GetPromptResult>`): Retrieves a prompt by name, optionally passing arguments. This method is experimental and may change in the future.
  - `args`
    - `name` (`string`): Prompt name to retrieve.
    - `arguments?` (`Record<string, unknown>`): Optional arguments to fill into the prompt.
    - `options?` (`RequestOptions`): Optional request options including signal and timeout.
- `onElicitationRequest` (`(
      schema: typeof ElicitationRequestSchema,
      handler: (request: ElicitationRequest) => Promise<ElicitResult> | ElicitResult
    ) => void`): Registers a handler for elicitation requests from the MCP server. The handler receives requests when the server needs additional input during tool execution.
  - `parameters`
    - `schema` (`typeof ElicitationRequestSchema`): The schema to validate requests against. Must be ElicitationRequestSchema.
    - `handler` (`(request: ElicitationRequest) => Promise<ElicitResult> | ElicitResult`): A function that handles the elicitation request. The request contains a message and requestedSchema. The handler must return an object with an action ("accept", "decline", or "cancel") and optionally content when accepting.
- `close` (`() => Promise<void>`): Closes the connection to the MCP server and cleans up resources.

## Example

```typescript
import { createMCPClient } from '@ai-sdk/mcp';
import { generateText } from 'ai';
import { Experimental_StdioMCPTransport } from '@ai-sdk/mcp/mcp-stdio';

let client;

try {
  client = await createMCPClient({
    transport: new Experimental_StdioMCPTransport({
      command: 'node server.js',
    }),
  });

  const tools = await client.tools();

  const response = await generateText({
    model: "anthropic/claude-sonnet-5.5",
    tools,
    messages: [{ role: 'user', content: 'Query the data' }],
  });

  console.log(response);
} catch (error) {
  console.error('Error:', error);
} finally {
  // ensure the client is closed even if an error occurs
  if (client) {
    await client.close();
  }
}
```

## Error Handling

The client throws `MCPClientError` for:

- Client initialization failures
- Protocol version mismatches
- Missing server capabilities
- Connection failures

Import `MCPClientError` from `@ai-sdk/mcp` and use its `isInstance` method to
safely narrow unknown errors:

```typescript
import { createMCPClient, MCPClientError } from '@ai-sdk/mcp';

try {
  await createMCPClient({
    transport: {
      type: 'http',
      url: 'https://your-server.com/mcp',
    },
  });
} catch (error) {
  if (MCPClientError.isInstance(error)) {
    if (error.statusCode === 401 || error.statusCode === 403) {
      // Authentication or authorization must be fixed before retrying.
      throw error;
    }

    // Inspect error.code and error.statusCode according to your application's policy.
  }

  throw error;
}
```

The error exposes the optional `code`, `statusCode`, `url`, and `responseBody`
properties. `code` is the JSON-RPC application error code. `statusCode`, `url`,
and `responseBody` contain HTTP transport context when it is available. They
are `undefined` for failures without an HTTP response, such as network errors,
timeouts, aborted requests, and stdio transport failures.

`MCPClientError` also represents configuration and protocol errors, so its
type or a missing `statusCode` alone does not indicate a retryable failure.
OAuth failures can instead throw the separately exported `UnauthorizedError`
or `MCPClientOAuthError`.

Avoid logging `url` or `responseBody` without redacting sensitive endpoint,
query parameter, or server response data.

For tool execution, errors are propagated as `CallToolError` errors.

For unknown errors, the client exposes an `onUncaughtError` callback that can be used to manually log or handle errors that are not covered by known error types.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)