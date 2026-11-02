---
title: StdioMCPTransport
description: Create a transport for Model Context Protocol (MCP) clients to communicate with MCP servers using standard input and output streams
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-stdio-transport"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-stdio-transport.md"
fetched_at: "2026-11-02T12:06:29.726Z"
sha256: "829c0a6493751b743f42f05a64d62865636609c35c857e5b4e2a275618aebfdb"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Creates a transport for Model Context Protocol (MCP) clients to communicate with MCP servers using standard input and output streams. This transport is only supported in Node.js environments.

`Experimental_StdioMCPTransport` is a deprecated alias of `StdioMCPTransport`.

## Import

```
import { StdioMCPTransport } from "@ai-sdk/mcp/mcp-stdio"
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