---
title: Model Context Protocol
product: vercel
url: /docs/mcp
canonical_url: "https://vercel.com/docs/mcp"
last_updated: 2026-06-16
type: integration
prerequisites:
  []
related:
  - /docs/mcp/deploy-mcp-servers-to-vercel
  - /docs/agent-resources/vercel-mcp
summary: Learn more about MCP and how you can use it on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/mcp.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1a853f942f894b9f4f9bdf0091a30d6df8e3c347ae51f78d8dbe586c320bfa02"
---

# Model Context Protocol

[Model Context Protocol](https://modelcontextprotocol.io/) (MCP) is a standard interface that lets large language models (LLMs) communicate with external tools and data sources. It allows developers and tool providers to integrate once and interoperate with any MCP-compatible system.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to create a contentful asset on Vercel](https://vercel.com/kb/guide/how-to-create-a-contentful-asset-on-vercel?from=related) — This is my wonderful
- [Make your documentation readable by AI agents](https://vercel.com/kb/guide/make-your-documentation-readable-by-ai-agents?from=related) — Serve markdown to AI agents using content negotiation, .md endpoints, agent auto-detection, llms.txt,   sitemap.md, and
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express?from=related) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [Build a ChatGPT Connector \(MCP server\)](https://vercel.com/kb/guide/mcp-server-chatgpt-connector?from=related) — Create an MCP server to bring your tools and data to ChatGPT
- [How to build an MCP server with Nuxt](https://vercel.com/kb/guide/how-to-build-an-mcp-server-with-nuxt?from=related) — Add an MCP server to your Nuxt app with the Nuxt MCP Toolkit. Create tools, resources, and prompt templates that AI assi
- [MCP Connections](https://eve.dev/docs/connections/mcp?from=related) — Connect an eve agent to a remote MCP server, authorize it with Vercel Connect or static credentials, and control which t
- [Next.js MCP Server](https://nextjs.org/docs/app/guides/mcp?from=related) — Learn how to use Next.js MCP support to allow coding agents access to your application state
- [Model Context Protocol (MCP)](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools?from=related)
- [ACP (Agent Client Protocol)](https://ai-sdk.dev/providers/community-providers/acp?from=related)
- [MCP](https://eve.dev/docs/channels/mcp?from=related) — Publish an eve agent as a durable MCP invocation service with route authentication and OAuth discovery.
- [vercel mcp](https://vercel.com/docs/cli/mcp?from=related) — Set up Model Context Protocol \(MCP\) usage with a Vercel project using the vercel mcp CLI command.
- [xmcp](https://vercel.com/docs/frameworks/backend/xmcp?from=related) — Build MCP-compatible backends with xmcp and deploy to Vercel. Learn the project structure, tool format, middleware, and

Full cross-link map for this page: [/docs/mcp.graph.md](/docs/mcp.graph.md)
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
- [Use the AI SDK to initialize an MCP client on your MCP host to connect to an MCP server](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#initializing-an-mcp-client)
- [Use the AI SDK to call tools that an MCP server provides](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#using-mcp-tools)
- [Use Vercel's MCP server](/docs/agent-resources/vercel-mcp)
- [Explore the list from MCP servers repository](https://github.com/modelcontextprotocol/servers)


---

[View full sitemap](/docs/sitemap)
