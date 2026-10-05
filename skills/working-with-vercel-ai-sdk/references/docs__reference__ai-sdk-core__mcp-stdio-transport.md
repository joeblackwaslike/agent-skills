---
title: Experimental_StdioMCPTransport
description: Create a transport for Model Context Protocol (MCP) clients to communicate with MCP servers using standard input and output streams
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-stdio-transport"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-stdio-transport.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "73b2d59758c98e1b4495b992e01d99aac9642228b1c2ab155f64dd84de3b19bb"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Creates a transport for Model Context Protocol (MCP) clients to communicate with MCP servers using standard input and output streams. This transport is only supported in Node.js environments.

This feature is experimental and may change or be removed in the future.

## Import

```
import { Experimental_StdioMCPTransport } from "@ai-sdk/mcp/mcp-stdio"
```

## API Signature

### Parameters

- `config` (`StdioConfig`): Configuration for the MCP client.
  - `StdioConfig`
    - `command` (`string`): The command to run the MCP server.
    - `args?` (`string[]`): The arguments to pass to the MCP server.
    - `env?` (`Record<string, string>`): The environment variables to set for the MCP server.
    - `stderr?` (`IOType | Stream | number`): The stream to write the MCP server's stderr to.
    - `cwd?` (`string`): The current working directory for the MCP server.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)