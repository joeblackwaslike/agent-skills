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
  - /docs/mcp/integrations/ai-sdk
  - /docs/mcp/deploy-mcp-servers-to-vercel
  - /docs/agent-resources/vercel-mcp
  - /docs/mcp/integrations
  - /docs/cli/mcp
summary: Learn more about MCP and how you can use it on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/mcp.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "6a7828cd119f1d7865ffb107c49df4ceddd6ff39e002a9df1e41c0d6224d8765"
---

# Model Context Protocol

## Build MCP servers and clients

Deploy Model Context Protocol (MCP) servers on Vercel with mcp-handler, then call their tools from agents built with the AI SDK, eve, or TanStack AI.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel MCP: Connect Vercel to your AI tools](https://vercel.com/blog/introducing-vercel-mcp-connect-vercel-to-your-ai-tools)
- [MCP server support on Vercel](https://vercel.com/changelog/mcp-server-support-on-vercel)
- [Model Context Protocol (MCP) explained: An FAQ](https://vercel.com/blog/model-context-protocol-mcp-explained)
- [Build a ChatGPT Connector \\(MCP server\\)](https://vercel.com/kb/guide/mcp-server-chatgpt-connector) — Build a ChatGPT MCP server with mcp-handler and Fluid compute. Add search, fetch, and OAuth, deploy to Vercel, then vali
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [OAuth support added to MCP Adapter](https://vercel.com/changelog/oauth-support-added-to-mcp-adapter)
- [How to create a contentful asset on Vercel](https://vercel.com/kb/guide/how-to-create-a-contentful-asset-on-vercel) — This is my wonderful
- [The second wave of MCP: Building for LLMs, not developers](https://vercel.com/blog/the-second-wave-of-mcp-building-for-llms-not-developers)
- [Using xmcp with Next.js](https://vercel.com/kb/guide/using-xmcp-with-nextjs) — Add an MCP server to an existing Next.js app with xmcp. Create typed tools, add authentication, and deploy to Vercel as
- [Add MCP Apps to your AI SDK application](https://vercel.com/kb/guide/ai-sdk-mcp-apps) — Build an MCP Apps host with the AI SDK using @ai-sdk/mcp and @ai-sdk/react to filter model-visible tools, read ui:// res
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.
- [Projects overview](https://vercel.com/docs/projects) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.

Full cross-link map for this page: [/docs/mcp.graph.md](/docs/mcp.graph.md)
<!-- /docsgraph:related -->

#### Create a server

```ts filename="app/api/mcp/route.ts"
import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';

const handler = createMcpHandler((server) => {
  server.registerTool(
    'roll_dice',
    {
      description: 'Roll an N-sided die',
      inputSchema: z.object({ sides: z.number().int().min(2) }),
    },
    async ({ sides }) => {
      const value = 1 + Math.floor(Math.random() * sides);
      return { content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }] };
    },
  );
});

export { handler as GET, handler as POST };
```

#### Call tools from an agent

```ts filename="index.mts"
import { createMCPClient } from '@ai-sdk/mcp';
import { generateText, isStepCount } from 'ai';

const client = await createMCPClient({
  transport: { type: 'http', url: 'https://my-mcp-server.vercel.app/api/mcp' },
});

try {
  const { text } = await generateText({
    model: 'anthropic/claude-opus-5',
    tools: await client.tools(),
    prompt: 'Use roll_dice to roll a six-sided die once.',
    stopWhen: isStepCount(5),
  });
  console.log(text);
} finally {
  await client.close();
}
```

[Model Context Protocol](https://modelcontextprotocol.io/) (MCP) is a standard interface that lets large language models (LLMs) communicate with external tools and data sources. It allows developers and tool providers to integrate once and interoperate with any MCP-compatible system.

The **Create a server** example uses [`mcp-handler`](https://github.com/vercel-labs/mcp-handler) to expose a `roll_dice` tool at `/api/mcp`. The **Call tools from an agent** example connects to that route with the [AI SDK](/docs/mcp/integrations/ai-sdk), and the model calls the tool. Replace `https://my-mcp-server.vercel.app` with your deployment's URL.

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

Use [`mcp-handler`](https://github.com/vercel-labs/mcp-handler) to expose your application's tools, resources, and prompts to MCP clients. The package builds on the MCP TypeScript SDK and turns your server definition into a Web-standard HTTP request handler.

You can use `mcp-handler` with Next.js, Nuxt, SvelteKit, Hono, and other frameworks that support Web-standard `Request` and `Response` APIs. Follow the [deployment guide](/docs/mcp/deploy-mcp-servers-to-vercel) to create a tool, test your MCP server, and deploy it on Vercel.

## UI with MCP Apps

[MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview) is an MCP extension that lets a tool return an interactive user interface, such as a chart, form, or dashboard. Hosts that support MCP Apps, such as Claude and ChatGPT, render the app inside the conversation, next to the tool call that produced it.

An MCP App has two parts on your MCP server:

- A tool that sets `_meta.ui.resourceUri` to a `ui://` resource.
- An HTML resource with the `text/html;profile=mcp-app` MIME type. The host renders it in a sandboxed iframe, and the app talks to the host through the `App` class from [`@modelcontextprotocol/ext-apps`](https://github.com/modelcontextprotocol/ext-apps).

To start from working code, deploy the [MCP Apps Next.js Starter](/templates/next.js/mcp-apps-next-js-starter). The template runs its MCP server with `mcp-handler` and uses a Next.js page as the app's UI.

## Frequently asked questions

### What can an MCP server expose to an AI application?

An MCP server can offer three kinds of features. Tools are functions the model calls, such as creating an issue or querying a database. Resources are data, such as file contents or records, that the application attaches to the model's context. Prompts are message templates that users choose, such as a code review prompt. Clients and servers list and use these features by exchanging JSON-RPC 2.0 messages. With `mcp-handler`, you add each feature with `registerTool`, `registerResource`, or `registerPrompt`. See [Server Features](https://modelcontextprotocol.io/specification/latest/server) in the MCP specification.

### Which transport should a remote MCP server use?

Use Streamable HTTP. The MCP specification defines two standard transports. With stdio, the client starts the server as a local subprocess, so it suits servers on your own machine. With Streamable HTTP, the client sends each message as an HTTP POST to one endpoint and receives a JSON response or a server-sent events (SSE) stream for that request, which a deployed function can serve. `mcp-handler` v2 serves Streamable HTTP for clients on the 2026-07-28 specification and for older 2025 clients. It no longer supports the legacy HTTP+SSE transport and doesn't need Redis. If a client only supports stdio, run [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) on that machine to proxy requests to your server's URL.

### Does Vercel have its own MCP server?

Yes. [Vercel MCP](/docs/agent-resources/vercel-mcp) is Vercel's official remote MCP server at `https://mcp.vercel.com`, and it authorizes clients with OAuth. AI tools can use it to search Vercel documentation, manage projects and deployments, analyze deployment logs, and query Web Analytics. Run [`vercel mcp`](/docs/cli/mcp) to set up Claude Code, Claude.ai, Cursor, or VS Code with Copilot. Add `--project` to scope the session to your linked project.

### How do I connect an AI agent to MCP servers?

Choose the integration for your framework. The [AI SDK](/docs/mcp/integrations/ai-sdk) creates a client with `createMCPClient` and passes the server's tools to the model. [TanStack AI](/docs/mcp/integrations/tanstack-ai) accepts MCP clients in `chat()` and discovers their tools for you. [eve](/docs/mcp/integrations/eve) loads each connection from a file in `agent/connections/`. All three can send model requests through [AI Gateway](/docs/ai-gateway). AI Gateway charges no markup on tokens, and you switch models by changing a model ID such as `anthropic/claude-opus-5`. On Vercel, eve also runs each session on [Vercel Workflows](/docs/workflows), so a conversation that waits for a tool result or an approval resumes after interruptions.

### How do I give an agent access to an MCP server that requires sign-in?

MCP authorization builds on OAuth 2.1. A protected MCP server verifies access tokens and publishes [Protected Resource Metadata](https://datatracker.ietf.org/doc/html/rfc9728) that tells clients which authorization server issues them. To protect a server you deploy, use `withMcpAuth` and `protectedResourceHandler` from `mcp-handler`, as shown in [Enabling authorization](/docs/mcp/deploy-mcp-servers-to-vercel#enabling-authorization). To call a third-party server such as Linear, use [Vercel Connect](/docs/connect). Connect asks each user for consent and gives your code short-lived tokens, so no provider secret lives in your environment variables. Treat tool descriptions and annotations from servers you don't control as untrusted, and require approval before tools that change data.

## More resources

Learn more about Model Context Protocol and explore available MCP servers.

- [Deploy your own MCP servers on Vercel](/docs/mcp/deploy-mcp-servers-to-vercel)
- [Build an MCP App with the MCP Apps Next.js Starter](/templates/next.js/mcp-apps-next-js-starter)
- [Explore MCP integrations for eve, AI SDK, and TanStack AI](/docs/mcp/integrations)
- [Authorize access to OAuth-protected MCP servers with Vercel Connect](/docs/connect/frameworks/ai-sdk-and-mcp)
- [Use the AI SDK to initialize an MCP client on your MCP host to connect to an MCP server](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools#initializing-an-mcp-client)
- [Use the AI SDK to call tools that an MCP server provides](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools#using-mcp-tools)
- [Use Vercel's MCP server](/docs/agent-resources/vercel-mcp)
- [Explore the list from MCP servers repository](https://github.com/modelcontextprotocol/servers)

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
