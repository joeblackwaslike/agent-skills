---
title: Model Context Protocol
product: vercel
url: /docs/mcp
canonical_url: "https://vercel.com/docs/mcp"
last_updated: 2026-09-18
type: integration
prerequisites:
  []
related:
  - /docs/mcp/deploy-mcp-servers-to-vercel
  - /docs/agent-resources/vercel-mcp
  - /docs/mcp/integrations
  - /docs/connect/frameworks/ai-sdk-and-mcp
summary: Learn more about MCP and how you can use it on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/mcp.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "46d3b07e7a03b0766d99056cb8a24d194190aa8e7d658da18a97366e7fd57ce9"
---

# Model Context Protocol

[Model Context Protocol](https://modelcontextprotocol.io/) (MCP) is a standard interface that lets large language models (LLMs) communicate with external tools and data sources. It allows developers and tool providers to integrate once and interoperate with any MCP-compatible system.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [MCP server support on Vercel](https://vercel.com/changelog/mcp-server-support-on-vercel)
- [OAuth support added to MCP Adapter](https://vercel.com/changelog/oauth-support-added-to-mcp-adapter)
- [How to create a contentful asset on Vercel](https://vercel.com/kb/guide/how-to-create-a-contentful-asset-on-vercel) — This is my wonderful
- [Build a ChatGPT Connector \\(MCP server\\)](https://vercel.com/kb/guide/mcp-server-chatgpt-connector) — Build a ChatGPT MCP server with mcp-handler and Fluid compute. Add search, fetch, and OAuth, deploy to Vercel, then vali
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [Introducing Vercel MCP: Connect Vercel to your AI tools](https://vercel.com/blog/introducing-vercel-mcp-connect-vercel-to-your-ai-tools)
- [The second wave of MCP: Building for LLMs, not developers](https://vercel.com/blog/the-second-wave-of-mcp-building-for-llms-not-developers)
- [Model Context Protocol (MCP) explained: An FAQ](https://vercel.com/blog/model-context-protocol-mcp-explained)
- [MCP Server](https://v0.app/docs/api/v1/adapters/mcp-server) — The v0 MCP (Model Context Protocol) server allows you to integrate v0's capabilities directly into your IDE, providing s
- [Building efficient MCP servers](https://vercel.com/blog/building-efficient-mcp-servers)
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.
- [Projects overview](https://vercel.com/docs/projects) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.

Full cross-link map for this page: [/docs/mcp.graph.md](/docs/mcp.graph.md)
<!-- /docsgraph:related -->

- [Get started with deploying MCP servers on Vercel](/docs/mcp/deploy-mcp-servers-to-vercel)
- Try out [Vercel's MCP server](/docs/agent-resources/vercel-mcp)
- [Connect eve, AI SDK, or TanStack AI to MCP servers](/docs/mcp/integrations)

## Connecting LLMs to external systems

LLMs don't have access to real-time or external data by default. To provide relevant context, such as current financial data, pricing, or user-specific data, developers must connect LLMs to external systems.

Each tool or service has its own API, schema, and authentication. Managing these differences becomes difficult and error-prone as the number of integrations grows.

## Standardizing LLM interaction with MCP

MCP standardizes the way LLMs interact with tools and data sources. Developers implement a single integration with MCP, and use it to manage communication with any compatible service.

Tool and data providers only need to expose an MCP interface once. After that, their system can be accessed by any MCP-enabled application.

MCP is like the USB-C standard: instead of needing different connectors for every device, you use one port to handle many types of connections.

## MCP servers, hosts and clients

MCP uses a client-server architecture for the AI model to external system communication. The user connects to the AI application, referred to as the MCP host, such as IDEs like Cursor, AI chat apps like ChatGPT or AI agents. To connect to external services, the host creates one connection, referred to as the MCP client, to one external service, referred to as the MCP server. Therefore, to connect to multiple MCP servers, one host needs to open and manage multiple MCP clients.

## Build an MCP server with mcp-handler

Use [`mcp-handler`](https://github.com/vercel/mcp-handler) to expose your application's tools, resources, and prompts to MCP clients. The package builds on the MCP TypeScript SDK and turns your server definition into a Web-standard HTTP request handler.

You can use `mcp-handler` with Next.js, Nuxt, SvelteKit, Hono, and other frameworks that support Web-standard `Request` and `Response` APIs. Follow the [deployment guide](/docs/mcp/deploy-mcp-servers-to-vercel) to create a tool, test your MCP server, and deploy it on Vercel.

## More resources

Learn more about Model Context Protocol and explore available MCP servers.

- [Deploy your own MCP servers on Vercel](/docs/mcp/deploy-mcp-servers-to-vercel)
- [Explore MCP integrations for eve, AI SDK, and TanStack AI](/docs/mcp/integrations)
- [Authorize access to OAuth-protected MCP servers with Vercel Connect](/docs/connect/frameworks/ai-sdk-and-mcp)
- [Use the AI SDK to initialize an MCP client on your MCP host to connect to an MCP server](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#initializing-an-mcp-client)
- [Use the AI SDK to call tools that an MCP server provides](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#using-mcp-tools)
- [Use Vercel's MCP server](/docs/agent-resources/vercel-mcp)
- [Explore the list from MCP servers repository](https://github.com/modelcontextprotocol/servers)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
