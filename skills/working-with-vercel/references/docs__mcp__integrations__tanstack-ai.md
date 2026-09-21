---
title: TanStack AI with MCP
product: vercel
url: /docs/mcp/integrations/tanstack-ai
canonical_url: "https://vercel.com/docs/mcp/integrations/tanstack-ai"
last_updated: 2026-09-17
type: how-to
prerequisites:
  - /docs/mcp/integrations
  - /docs/mcp
related:
  - /docs/mcp
  - /docs/ai-gateway
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/mcp/deploy-mcp-servers-to-vercel
  - /docs/deployment-protection
summary: Connect TanStack AI to a Model Context Protocol server on Vercel and call its tools with models served through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/mcp/integrations/tanstack-ai.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "79aec5e7d27f941d48ba8c800ec9bf337f416cc8640eda616b4e581877169736"
---

# TanStack AI with MCP

Give [TanStack AI](https://tanstack.com/ai) access to tools from a [Model Context Protocol (MCP)](/docs/mcp) server hosted on Vercel. Use `@tanstack/ai-mcp` to connect to the server and `@tanstack/ai-vercel-gateway` to send model requests through [AI Gateway](/docs/ai-gateway).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [MCP server support on Vercel](https://vercel.com/changelog/mcp-server-support-on-vercel?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Ftanstack-ai&source_site=vercel-docs&relationship=related)
- [Introducing Vercel MCP: Connect Vercel to your AI tools](https://vercel.com/blog/introducing-vercel-mcp-connect-vercel-to-your-ai-tools?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Ftanstack-ai&source_site=vercel-docs&relationship=related)
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [AI SDK with MCP](https://vercel.com/docs/mcp/integrations/ai-sdk?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Connect the AI SDK to an MCP server on Vercel, discover its tools, and call them with models served through AI Gateway.
- [How to build an MCP server with Nuxt](https://vercel.com/kb/guide/how-to-build-an-mcp-server-with-nuxt?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Add an MCP server to your Nuxt app with the Nuxt MCP Toolkit. Create tools, resources, and prompt templates that AI assi

Full cross-link map for this page: [/docs/mcp/integrations/tanstack-ai.graph.md](/docs/mcp/integrations/tanstack-ai.graph.md?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Ftanstack-ai&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

Before you begin, you need:

- A JavaScript or TypeScript project with Node.js 22 or later.
- An [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys).
- The `roll_dice` MCP server from [Deploy MCP servers to Vercel](/docs/mcp/deploy-mcp-servers-to-vercel#deploy-an-mcp-server-on-vercel), deployed at a URL your client can reach.

## Install the packages

Install TanStack AI, its MCP client, and the AI Gateway adapter:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @tanstack/ai @tanstack/ai-mcp @tanstack/ai-vercel-gateway
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @tanstack/ai @tanstack/ai-mcp @tanstack/ai-vercel-gateway
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @tanstack/ai @tanstack/ai-mcp @tanstack/ai-vercel-gateway
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @tanstack/ai @tanstack/ai-mcp @tanstack/ai-vercel-gateway
    ```
  </Code>
</CodeBlock>

## Configure the connection

Save your AI Gateway API key and deployed MCP endpoint in a `.env` file. Replace `your-project` with your deployment's domain:

```bash filename=".env"
AI_GATEWAY_API_KEY=your_api_key_here
MCP_SERVER_URL=https://your-project.vercel.app/api/mcp
```

If you [enabled OAuth authorization](/docs/mcp/deploy-mcp-servers-to-vercel#enabling-authorization), also set `MCP_SERVER_TOKEN` to an access token your MCP server accepts. This token authenticates tool requests to your server; the AI Gateway key authenticates model requests.

For a deployment with [Deployment Protection](/docs/deployment-protection), also configure [automation access](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) on the MCP client transport.

## Call an MCP tool

Create an entry file that connects to the MCP server over Streamable HTTP. Run this code on the server or from your terminal to keep credentials private:

**index.mts**

```ts filename="index.mts" framework=all
import { chat } from '@tanstack/ai';
import { createMCPClient } from '@tanstack/ai-mcp';
import { vercelGatewayText } from '@tanstack/ai-vercel-gateway';

const url = process.env.MCP_SERVER_URL;
if (!url) {
  throw new Error('Set MCP_SERVER_URL in your .env file.');
}

const token = process.env.MCP_SERVER_TOKEN;
const client = await createMCPClient({
  transport: {
    type: 'http',
    url,
    ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  },
});

const stream = chat({
  adapter: vercelGatewayText('anthropic/claude-opus-5'),
  messages: [
    { role: 'user', content: 'Use roll_dice to roll a six-sided die once.' },
  ],
  mcp: { clients: [client], connection: 'close' },
});

for await (const chunk of stream) {
  console.log(chunk);
}
```

**index.mjs**

```js filename="index.mjs" framework=all
import { chat } from '@tanstack/ai';
import { createMCPClient } from '@tanstack/ai-mcp';
import { vercelGatewayText } from '@tanstack/ai-vercel-gateway';

const url = process.env.MCP_SERVER_URL;
if (!url) {
  throw new Error('Set MCP_SERVER_URL in your .env file.');
}

const token = process.env.MCP_SERVER_TOKEN;
const client = await createMCPClient({
  transport: {
    type: 'http',
    url,
    ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  },
});

const stream = chat({
  adapter: vercelGatewayText('anthropic/claude-opus-5'),
  messages: [
    { role: 'user', content: 'Use roll_dice to roll a six-sided die once.' },
  ],
  mcp: { clients: [client], connection: 'close' },
});

for await (const chunk of stream) {
  console.log(chunk);
}
```

When you consume the stream, `chat()` discovers the server's tools and makes them available to the model. TanStack AI executes requested tools through the MCP client and returns their results to the model. With `connection: 'close'`, TanStack AI closes the client when the run finishes, errors, or aborts.

Run the TypeScript example with `tsx`, loading credentials from `.env`:

```bash filename="terminal"
pnpm dlx tsx --env-file=.env index.mts
```

For JavaScript, run `node --env-file=.env index.mjs`. Your terminal displays stream events for the tool call, its result, and the model's response. The dice result varies between one and six.

## Authenticate with Vercel Connect

For OAuth-protected MCP servers, use [Vercel Connect](/docs/connect) to manage provider tokens and user consent. After creating and linking a connector to your project, use `connectMCPTransport` from `@vercel/connect/tanstack-ai` to configure the transport passed to `createMCPClient()`. The transport requests a current token from Connect before each MCP request.

Catch consent challenges with `getConsentChallenge` at the route boundary before streaming starts. After the user grants access, submit a new chat request. AI Gateway continues to authenticate model requests separately.

Follow the [TanStack AI with Vercel Connect guide](/docs/connect/frameworks/tanstack-ai) for a streaming route example, browser consent handling, and HTTP and SSE transport options.

## Next steps

- Use [TanStack AI with AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai) to configure model routing and authentication.
- Follow [TanStack's managed MCP guide](https://tanstack.com/ai/latest/docs/tools/mcp-managed) for server routes, multiple clients, and lazy tool discovery.
- Run coding agents with [TanStack AI and Vercel Sandbox](/docs/sandbox/ecosystem/tanstack-ai).


---

[View full sitemap](/docs/sitemap)
