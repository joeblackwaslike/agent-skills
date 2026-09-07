---
title: Model Context Protocol
product: vercel
url: /docs/mcp
canonical_url: "https://vercel.com/docs/mcp"
last_updated: 2026-08-28
type: integration
prerequisites:
  []
related:
  - /docs/mcp/deploy-mcp-servers-to-vercel
  - /docs/agent-resources/vercel-mcp
  - /docs/connect/frameworks/ai-sdk-and-mcp
summary: Learn more about MCP and how you can use it on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/mcp.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "f6094db14c2231511be1d5caaae2ac29a45b0328c07f066632100eed9b4113c8"
---

# Model Context Protocol

[Model Context Protocol](https://modelcontextprotocol.io/) (MCP) is a standard interface that lets large language models (LLMs) communicate with external tools and data sources. It allows developers and tool providers to integrate once and interoperate with any MCP-compatible system.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OAuth support added to MCP Adapter](https://vercel.com/changelog/oauth-support-added-to-mcp-adapter?from=related&source_path=%2Fdocs%2Fmcp&source_site=vercel-docs&relationship=related)
- [How to create a contentful asset on Vercel](https://vercel.com/kb/guide/how-to-create-a-contentful-asset-on-vercel?from=related&source_path=%2Fdocs%2Fmcp&source_site=vercel-docs&relationship=related) — This is my wonderful
- [Make your documentation readable by AI agents](https://vercel.com/kb/guide/make-your-documentation-readable-by-ai-agents?from=related&source_path=%2Fdocs%2Fmcp&source_site=vercel-docs&relationship=related) — Serve markdown to AI agents using content negotiation, .md endpoints, agent auto-detection, llms.txt,   sitemap.md, and
- [Build a ChatGPT Connector \\(MCP server\\)](https://vercel.com/kb/guide/mcp-server-chatgpt-connector?from=related&source_path=%2Fdocs%2Fmcp&source_site=vercel-docs&relationship=related) — Build a ChatGPT MCP server with mcp-handler and Fluid compute. Add search, fetch, and OAuth, deploy to Vercel, then vali
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express?from=related&source_path=%2Fdocs%2Fmcp&source_site=vercel-docs&relationship=related) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [Introducing Vercel MCP: Connect Vercel to your AI tools](https://vercel.com/blog/introducing-vercel-mcp-connect-vercel-to-your-ai-tools?from=related&source_path=%2Fdocs%2Fmcp&source_site=vercel-docs&relationship=related)
- [The second wave of MCP: Building for LLMs, not developers](https://vercel.com/blog/the-second-wave-of-mcp-building-for-llms-not-developers?from=related&source_path=%2Fdocs%2Fmcp&source_site=vercel-docs&relationship=related)
- [MCP server support on Vercel](https://vercel.com/changelog/mcp-server-support-on-vercel?from=related&source_path=%2Fdocs%2Fmcp&source_site=vercel-docs&relationship=related)
- [Model Context Protocol (MCP) explained: An FAQ](https://vercel.com/blog/model-context-protocol-mcp-explained?from=related&source_path=%2Fdocs%2Fmcp&source_site=vercel-docs&relationship=related)
- [MCP Server](https://v0.app/docs/api/v1/adapters/mcp-server?from=related&source_path=%2Fdocs%2Fmcp&source_site=vercel-docs&relationship=related) — The v0 MCP (Model Context Protocol) server allows you to integrate v0's capabilities directly into your IDE, providing s
- [Vercel MCP now in Public Beta](https://vercel.com/changelog/vercels-mcp?from=related&source_path=%2Fdocs%2Fmcp&source_site=vercel-docs&relationship=related)
- [Building efficient MCP servers](https://vercel.com/blog/building-efficient-mcp-servers?from=related&source_path=%2Fdocs%2Fmcp&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/mcp.graph.md](/docs/mcp.graph.md?from=related&source_path=%2Fdocs%2Fmcp&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- [Get started with deploying MCP servers on Vercel](/docs/mcp/deploy-mcp-servers-to-vercel)
- Try out [Vercel's MCP server](/docs/agent-resources/vercel-mcp)

## Connecting LLMs to external systems

LLMs don't have access to real-time or external data by default. To provide relevant context—such as current financial data, pricing, or user-specific data—developers must connect LLMs to external systems.

Each tool or service has its own API, schema, and authentication. Managing these differences becomes difficult and error-prone as the number of integrations grows.

## Standardizing LLM interaction with MCP

MCP standardizes the way LLMs interact with tools and data sources. Developers implement a single integration with MCP, and use it to manage communication with any compatible service.

Tool and data providers only need to expose an MCP interface once. After that, their system can be accessed by any MCP-enabled application.

MCP is like the USB-C standard: instead of needing different connectors for every device, you use one port to handle many types of connections.

## MCP servers, hosts and clients

MCP uses a client-server architecture for the AI model to external system communication. The user connects to the AI application, referred to as the MCP host, such as IDEs like Cursor, AI chat apps like ChatGPT or AI agents. To connect to external services, the host creates one connection, referred to as the MCP client, to one external service, referred to as the MCP server. Therefore, to connect to multiple MCP servers, one host needs to open and manage multiple MCP clients.

## More resources

Learn more about Model Context Protocol and explore available MCP servers.

- [Deploy your own MCP servers on Vercel](/docs/mcp/deploy-mcp-servers-to-vercel)
- [Authorize access to OAuth-protected MCP servers with Vercel Connect](/docs/connect/frameworks/ai-sdk-and-mcp)
- [Use the AI SDK to initialize an MCP client on your MCP host to connect to an MCP server](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#initializing-an-mcp-client)
- [Use the AI SDK to call tools that an MCP server provides](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#using-mcp-tools)
- [Use Vercel's MCP server](/docs/agent-resources/vercel-mcp)
- [Explore the list from MCP servers repository](https://github.com/modelcontextprotocol/servers)


---

[View full sitemap](/docs/sitemap)
