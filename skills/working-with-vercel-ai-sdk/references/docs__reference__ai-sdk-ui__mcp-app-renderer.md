---
title: experimental_MCPAppRenderer
description: "API reference for rendering MCP Apps with @ai-sdk/react."
url: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/mcp-app-renderer"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/mcp-app-renderer.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "8b6aa1e56fca64745b201052e6ab1b52757f8f82102f535bd1f7cc99c5782533"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

`experimental_MCPAppRenderer` is experimental and may change in a future
release.

`experimental_MCPAppRenderer` renders an MCP App for an AI SDK tool UI part. It detects MCP App metadata on the tool part, loads the app resource, renders the app in a sandbox proxy iframe, and bridges MCP Apps JSON-RPC messages between the iframe and your host application.

For tool parts without MCP App metadata, the component renders the `fallback`.

## Import

```
import { experimental_MCPAppRenderer as MCPAppRenderer } from "@ai-sdk/react"
```

## Example

```tsx
'use client';

import {
  experimental_MCPAppRenderer as MCPAppRenderer,
  type MCPAppBridgeHandlers,
  type MCPAppMetadata,
  type MCPAppResource,
  type MCPAppSandboxConfig,
} from '@ai-sdk/react';
import { isToolUIPart } from 'ai';

const sandbox = {
  url: '/mcp-app-sandbox',
  className: 'h-80 w-full rounded-lg border',
  style: { border: 0 },
} satisfies MCPAppSandboxConfig;

async function loadResource(app: MCPAppMetadata): Promise<MCPAppResource> {
  const response = await fetch('/api/mcp-app-host/read-resource', {
    method: 'POST',
    body: JSON.stringify({ uri: app.resourceUri }),
  });

  if (!response.ok) {
    throw new Error('Failed to load MCP App resource');
  }

  return response.json();
}

const handlers: MCPAppBridgeHandlers = {
  callTool: params =>
    fetch('/api/mcp-app-host/call-tool', {
      method: 'POST',
      body: JSON.stringify(params),
    }).then(response => response.json()),
  openLink: ({ url }) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    return {};
  },
};

export function MessagePart({ part }: { part: unknown }) {
  if (!isToolUIPart(part)) {
    return null;
  }

  return (
    <MCPAppRenderer
      part={part}
      loadResource={loadResource}
      handlers={handlers}
      sandbox={sandbox}
      fallback={null}
    />
  );
}
```

## Props

- `part` (`ToolUIPart<UITools> | DynamicToolUIPart`): The AI SDK tool UI part. The renderer looks for MCP App metadata in \`part.toolMetadata.mcp.app\`.
- `sandbox` (`MCPAppSandboxConfig`): Configuration for the outer sandbox proxy iframe used to host the app.
- `resource?` (`MCPAppResource`): A preloaded MCP App resource. Provide either \`resource\` or \`loadResource\`.
- `loadResource?` (`(app: MCPAppMetadata) => Promise<MCPAppResource>`): Loads the MCP App resource for the app metadata found on the tool part.
- `handlers?` (`MCPAppBridgeHandlers`): Callbacks used to handle iframe requests such as \`tools/call\`, \`resources/read\`, \`ui/open-link\`, and display mode changes.
- `hostInfo?` (`{ name: string; version: string }`): Host identity returned to the app during the \`ui/initialize\` handshake.
- `hostContext?` (`MCPAppHostContext`): Host context sent to the app, such as theme, display mode, and available display modes.
- `fallback?` (`ReactNode`): Rendered while the resource is loading, when loading fails, or when the tool part is not an MCP App.

## Sandbox Config

- `url` (`string | URL`): The URL of the sandbox proxy iframe. The proxy receives app HTML from the host and creates the inner app iframe.
- `title?` (`string`): Accessible iframe title.
- `className?` (`string`): Class name applied to the outer iframe.
- `style?` (`CSSProperties`): Inline styles applied to the outer iframe.
- `targetOrigin?` (`string`): Target origin used for \`postMessage\`. Defaults to \`\*\`; set this to your sandbox origin in production.
- `outerSandbox?` (`string`): Sandbox attribute for the outer proxy iframe. Defaults to \`allow-scripts allow-same-origin allow-forms\`.
- `innerSandbox?` (`string`): Sandbox attribute sent to the proxy for the inner app iframe. Defaults to \`allow-scripts allow-forms\`.

## Bridge Handlers

`experimental_MCPAppRenderer` uses these handlers to respond to iframe requests. In production, server-backed handlers should validate authorization and MCP Apps tool visibility before calling the MCP server.

- `allowedTools?` (`string[]`): Optional client-side allowlist checked before forwarding \`tools/call\` requests.
- `callTool?` (`(params: MCPAppToolCallParams) => Promise<unknown> | unknown`): Handles app-initiated \`tools/call\` requests.
- `readResource?` (`(params: { uri: string }) => Promise<unknown> | unknown`): Handles app-initiated \`resources/read\` requests.
- `listResources?` (`(params?: unknown) => Promise<unknown> | unknown`): Handles app-initiated \`resources/list\` requests.
- `openLink?` (`(params: { url: string }) => Promise<unknown> | unknown`): Handles app-initiated \`ui/open-link\` requests.
- `sendMessage?` (`(params: unknown) => Promise<unknown> | unknown`): Handles app-initiated \`ui/message\` requests.
- `updateModelContext?` (`(params: unknown) => Promise<unknown> | unknown`): Handles app-initiated \`ui/update-model-context\` requests.
- `requestDisplayMode?` (`(params: { mode: 'inline' | 'fullscreen' | 'pip' }) => Promise<{ mode: MCPAppDisplayMode }> | { mode: MCPAppDisplayMode }`): Handles app-initiated \`ui/request-display-mode\` requests.
- `onSizeChange?` (`(params: { width?: number; height?: number }) => void`): Called when the app sends a size change notification.
- `onInitialized?` (`() => void`): Called after the app sends \`ui/notifications/initialized\`.
- `onRequestTeardown?` (`(params: unknown) => void`): Called when the app requests teardown.
- `onLog?` (`(params: unknown) => void`): Called when the app sends a log notification.
- `onError?` (`(error: Error) => void`): Called when a supported iframe request fails while being handled.

## See Also

- [MCP Apps guide](/docs/ai-sdk-core/mcp-apps)
- [MCP Apps helpers](/docs/reference/ai-sdk-core/mcp-apps)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)