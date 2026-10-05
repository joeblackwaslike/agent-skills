---
title: MCP Apps
description: "API reference for MCP Apps helpers in @ai-sdk/mcp."
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-apps"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-apps.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "ad28b056f93ac14958d379231d0c422b39c2dced895c9aa5ba69a1e3d81cf086"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The MCP Apps helpers in `@ai-sdk/mcp` help an MCP host advertise UI support, keep model-visible and app-visible tools separate, and read `ui://` HTML resources for rendering.

## Import

```
import {
MCP_APP_MIME_TYPE,
mcpAppClientCapabilities,
readMCPAppResource,
splitMCPAppTools,
} from "@ai-sdk/mcp"
```

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

- `definitions` (`ListToolsResult`): The tool definitions returned by \`client.listTools()\`.

### Returns

- `modelVisible` (`ListToolsResult`): Tool definitions that can be exposed to the language model.
- `appVisible` (`ListToolsResult`): Tool definitions that can be called by an MCP App through the host bridge.

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

- `client` (`Pick<MCPClient, 'readResource'>`): The MCP client used to read the resource.
- `uri` (`string`): The \`ui://\` resource URI to read.
- `options?` (`RequestOptions`): Optional request options, such as an abort signal or timeout.

### Returns

Returns a `Promise<MCPAppResource>`.

- `uri` (`string`): The \`ui://\` resource URI.
- `mimeType` (`'text/html;profile=mcp-app'`): The MCP Apps HTML MIME type.
- `html` (`string`): The app HTML to render in a sandboxed iframe.
- `meta?` (`MCPAppResourceMeta`): Rendering metadata from resource \`\_meta.ui\`, such as CSP, permissions, and \`prefersBorder\`.

## See Also

- [MCP Apps guide](/docs/ai-sdk-core/mcp-apps)
- [createMCPClient](/docs/reference/ai-sdk-core/create-mcp-client)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)