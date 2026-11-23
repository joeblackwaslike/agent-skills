---
title: TanStack AI with MCP
product: vercel
url: /docs/mcp/integrations/tanstack-ai
canonical_url: "https://vercel.com/docs/mcp/integrations/tanstack-ai"
last_updated: 2026-09-18
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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/mcp/integrations/tanstack-ai.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "de843535f2ae8d625aefa1ec39d1c52996df5a0de825cd206189ca08a6765119"
---

# TanStack AI with MCP

Give [TanStack AI](https://tanstack.com/ai) access to tools from a [Model Context Protocol (MCP)](/docs/mcp) server hosted on Vercel. Use `@tanstack/ai-mcp` to connect to the server and `@tanstack/ai-vercel-gateway` to send model requests through [AI Gateway](/docs/ai-gateway).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add MCP Apps to your AI SDK application](https://vercel.com/kb/guide/ai-sdk-mcp-apps) — Build an MCP Apps host with the AI SDK using @ai-sdk/mcp and @ai-sdk/react to filter model-visible tools, read ui:// res
- [Build a ChatGPT Connector \\(MCP server\\)](https://vercel.com/kb/guide/mcp-server-chatgpt-connector) — Build a ChatGPT MCP server with mcp-handler and Fluid compute. Add search, fetch, and OAuth, deploy to Vercel, then vali
- [Using xmcp with Next.js](https://vercel.com/kb/guide/using-xmcp-with-nextjs) — Add an MCP server to an existing Next.js app with xmcp. Create typed tools, add authentication, and deploy to Vercel as
- [Vercel Connect now supports TanStack AI](https://vercel.com/changelog/vercel-connect-tanstack-ai)
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [Use Vercel](https://vercel.com/docs/agent-resources/vercel-mcp) — Vercel MCP has tools available for searching docs, managing teams, projects, and deployments, and querying Web Analytics
- [Chat SDK with TanStack Start](https://vercel.com/docs/chat-sdk/frameworks/tanstack-start) — Add a Chat SDK bot to TanStack Start, receive Slack events through Vercel Connect, and deploy on Vercel.

Full cross-link map for this page: [/docs/mcp/integrations/tanstack-ai.graph.md](/docs/mcp/integrations/tanstack-ai.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Before you begin, you need:

- A JavaScript or TypeScript project with Node.js 22 or later.
- An [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys).
- The `roll_dice` MCP server from [Deploy MCP servers to Vercel](/docs/mcp/deploy-mcp-servers-to-vercel#deploy-an-mcp-server-on-vercel), deployed at a URL your client can reach.

## Install the packages

Install TanStack AI, its MCP client, and the AI Gateway adapter:

**pnpm**

```bash
pnpm i @tanstack/ai @tanstack/ai-mcp @tanstack/ai-vercel-gateway
```

**yarn**

```bash
yarn add @tanstack/ai @tanstack/ai-mcp @tanstack/ai-vercel-gateway
```

**npm**

```bash
npm i @tanstack/ai @tanstack/ai-mcp @tanstack/ai-vercel-gateway
```

**bun**

```bash
bun add @tanstack/ai @tanstack/ai-mcp @tanstack/ai-vercel-gateway
```

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

## Frequently asked questions

### Do I need to close the MCP client in TanStack AI?

Not with the default setting. With `connection: 'close'`, `chat()` closes each client when the run succeeds, fails, or aborts. On a busy route, create the clients once at module level and pass `connection: 'keep-alive'` so later requests reuse the same connections. `chat()` never closes keep-alive clients, so your code owns them. With [Fluid compute](/docs/fluid-compute), Vercel reuses function instances across invocations, so one module-level client can serve several requests.

### Can TanStack AI use tools from several MCP servers in one chat?

Yes. Pass any mix of clients and `createMCPClients` pools in `mcp.clients`. A pool adds each server's config key as a prefix to its tool names, such as `github_` and `linear_`, so names from different servers don't collide. If two sources expose the same tool name without a prefix, the run fails with `MCPDuplicateToolNameError`, so set `prefix` on one of the clients. By default, a discovery failure on any server fails the run. To skip that server and continue, handle the error in `onDiscoveryError`.

### How do I limit which MCP tools the model can call?

Set `toolFilter` on the client. Pass a function such as `(tool) => tool.annotations?.readOnlyHint === true`, or a list of tool names. A list is strict, so discovery fails if the server has no tool with a listed name. Set `needsApproval` to pause for a person before matching tools run, such as every tool that isn't read-only. Annotations come from the server, so trust them only as far as you trust the server. See [Limit which tools the model gets](https://tanstack.com/ai/latest/docs/tools/mcp-managed#limit-which-tools-the-model-gets).

### How do I reduce prompt size when an MCP server has many tools?

Pass `lazyTools: true` in the `mcp` option of `chat()`. TanStack AI registers every tool but sends a tool's schema only when the model asks for it, so prompts for servers with dozens of tools stay smaller. Smaller prompts use fewer input tokens on each AI Gateway request. To remove tools entirely, combine this with `toolFilter`. See [Lazy tool discovery](https://tanstack.com/ai/latest/docs/tools/mcp-managed#lazy-tool-discovery).

### How does TanStack AI authenticate model requests to AI Gateway?

`vercelGatewayText` reads `AI_GATEWAY_API_KEY`. When that variable is absent, it uses `VERCEL_OIDC_TOKEN`. For local development, you can run `vercel link` and `vercel env pull` to write a development OIDC token to `.env.local` instead of creating an API key. To use another model, change the model ID passed to `vercelGatewayText`, such as `anthropic/claude-opus-5`. Your MCP token authenticates tool requests separately. To give the agent an isolated place to run code, see [TanStack AI and Vercel Sandbox](/docs/sandbox/ecosystem/tanstack-ai).

## Next steps

- Use [TanStack AI with AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai) to configure model routing and authentication.
- Follow [TanStack's managed MCP guide](https://tanstack.com/ai/latest/docs/tools/mcp-managed) for server routes, multiple clients, and lazy tool discovery.
- Run coding agents with [TanStack AI and Vercel Sandbox](/docs/sandbox/ecosystem/tanstack-ai).

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
