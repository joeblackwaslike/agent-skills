---
title: AI SDK with MCP
product: vercel
url: /docs/mcp/integrations/ai-sdk
canonical_url: "https://vercel.com/docs/mcp/integrations/ai-sdk"
last_updated: 2026-09-18
type: how-to
prerequisites:
  - /docs/mcp/integrations
  - /docs/mcp
related:
  - /docs/ai-sdk
  - /docs/mcp
  - /docs/ai-gateway
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
  - /docs/ai-gateway/authentication-and-byok/api-keys
summary: Connect the AI SDK to an MCP server on Vercel, discover its tools, and call them with models served through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/mcp/integrations/ai-sdk.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "7ea54f6bfaba0fd7f874af6f81975d99e0dd146be8582349dcf457daeb727847"
---

# AI SDK with MCP

Use the [AI SDK](/docs/ai-sdk) to call tools from a [Model Context Protocol (MCP)](/docs/mcp) server hosted on Vercel. The `@ai-sdk/mcp` client discovers the server's tools, and [AI Gateway](/docs/ai-gateway) handles model requests.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add MCP Apps to your AI SDK application](https://vercel.com/kb/guide/ai-sdk-mcp-apps) — Build an MCP Apps host with the AI SDK using @ai-sdk/mcp and @ai-sdk/react to filter model-visible tools, read ui:// res
- [Introducing Vercel MCP: Connect Vercel to your AI tools](https://vercel.com/blog/introducing-vercel-mcp-connect-vercel-to-your-ai-tools)
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [How to create a contentful asset on Vercel](https://vercel.com/kb/guide/how-to-create-a-contentful-asset-on-vercel) — This is my wonderful
- [TanStack AI with MCP](https://vercel.com/docs/mcp/integrations/tanstack-ai) — Connect TanStack AI to a Model Context Protocol server on Vercel and call its tools with models served through AI Gatewa
- [Use Vercel](https://vercel.com/docs/agent-resources/vercel-mcp) — Vercel MCP has tools available for searching docs, managing teams, projects, and deployments, and querying Web Analytics
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 400+ models.

Full cross-link map for this page: [/docs/mcp/integrations/ai-sdk.graph.md](/docs/mcp/integrations/ai-sdk.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Before you begin, you need:

- A JavaScript or TypeScript project with Node.js 22 or later. This example uses [AI SDK 7](/docs/ai-gateway/sdks-and-apis/ai-sdk#version-compatibility) and ECMAScript modules (ESM).
- An [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys).
- The `roll_dice` MCP server from [Deploy MCP servers to Vercel](/docs/mcp/deploy-mcp-servers-to-vercel#deploy-an-mcp-server-on-vercel), deployed at a URL your client can reach.

## Install the packages

Install the AI SDK and its MCP client:

**pnpm**

```bash
pnpm i ai @ai-sdk/mcp
```

**yarn**

```bash
yarn add ai @ai-sdk/mcp
```

**npm**

```bash
npm i ai @ai-sdk/mcp
```

**bun**

```bash
bun add ai @ai-sdk/mcp
```

## Configure the connection

Save your AI Gateway API key and deployed MCP endpoint in a `.env` file. Replace `your-project` with your deployment's domain:

```bash filename=".env"
AI_GATEWAY_API_KEY=your_api_key_here
MCP_SERVER_URL=https://your-project.vercel.app/api/mcp
```

If your MCP server requires a bearer token, also set `MCP_SERVER_TOKEN` to a token the server accepts. For OAuth consent and token refresh, follow [Vercel Connect with AI SDK and MCP](/docs/connect/frameworks/ai-sdk-and-mcp).

For a deployment with [Deployment Protection](/docs/deployment-protection), also configure [automation access](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) on the MCP client transport.

## Call an MCP tool

Create an entry file that connects over Streamable HTTP and passes the discovered tools to `generateText`. Run this code on the server or from your terminal to keep credentials private:

**index.mts**

```ts filename="index.mts" framework=all
import { createMCPClient } from '@ai-sdk/mcp';
import { generateText, isStepCount } from 'ai';

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

try {
  const tools = await client.tools();
  const result = await generateText({
    model: 'anthropic/claude-opus-5',
    tools,
    prompt: 'Use roll_dice to roll a six-sided die once.',
    stopWhen: isStepCount(5),
  });

  console.log(result.text);
} finally {
  await client.close();
}
```

**index.mjs**

```js filename="index.mjs" framework=all
import { createMCPClient } from '@ai-sdk/mcp';
import { generateText, isStepCount } from 'ai';

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

try {
  const tools = await client.tools();
  const result = await generateText({
    model: 'anthropic/claude-opus-5',
    tools,
    prompt: 'Use roll_dice to roll a six-sided die once.',
    stopWhen: isStepCount(5),
  });

  console.log(result.text);
} finally {
  await client.close();
}
```

The stop condition allows up to five model steps so the model can call the tool and respond with its result. The `finally` block closes the MCP client after generation succeeds or fails.

Run the TypeScript example with `tsx`, loading credentials from `.env`:

```bash filename="terminal"
pnpm dlx tsx --env-file=.env index.mts
```

For JavaScript, run `node --env-file=.env index.mjs`. Your terminal displays the model's response with a dice result between one and six.

## Frequently asked questions

### Do I need an AI Gateway API key when my AI SDK app runs on Vercel?

No. On Vercel, the AI SDK authenticates to AI Gateway with your project's OIDC token, so deployed code doesn't need `AI_GATEWAY_API_KEY`. A non-empty API key takes priority over OIDC, even if the key is invalid, so remove the key from your project's environment variables to use OIDC. For local development, run `vercel link` and `vercel env pull` to write `VERCEL_OIDC_TOKEN` to `.env.local`. Your MCP server token is a separate credential that you still pass in the transport's `headers`. See [AI Gateway OIDC authentication](/docs/ai-gateway/authentication-and-byok/oidc).

### How do I limit which MCP tools the model can call?

Pass `schemas` to `client.tools()`. The client then loads only the tools you list and types their inputs with your Zod schemas. Add an `outputSchema` to validate a tool's `structuredContent` and get a typed result. Without `schemas`, `client.tools()` loads every tool the server offers and infers input types from the server's schemas at runtime, so your code has no compile-time type checking. See [Using MCP tools](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools#using-mcp-tools) in the AI SDK documentation.

### Can I require approval before the model runs an MCP tool?

Yes. The AI SDK copies each MCP tool's annotations, such as `readOnlyHint` and `destructiveHint`, to the tool call's `toolMetadata.annotations`. Read them in the `toolApproval` option and request user approval for any tool the server doesn't mark as read-only. The client doesn't create an approval policy from annotations automatically. Annotations are hints from the server, so combine them with a tool allowlist and narrowly scoped credentials. See [Tool annotations and approval](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools#tool-annotations-and-approval).

### Can the AI SDK connect to a local stdio MCP server?

Yes, during local development. Import `StdioMCPTransport` from `@ai-sdk/mcp/mcp-stdio` and give it the command that starts the server. A stdio server runs as a subprocess of your application, so it can't serve a production deployment. In production, connect over the HTTP transport, as this guide does. The client also supports SSE for servers that still use it.

### How do I keep an agent's MCP tool calls running after a failure?

Set `maxRetries` on `createMCPClient` to retry `tools/call` requests after transient HTTP or network failures. Retries are off by default, so turn them on only for tools that are safe to repeat. For agents that run for a long time or wait for a person, run the agent loop with `WorkflowAgent` from `@ai-sdk/workflow` on [Vercel Workflows](/docs/workflows). When you mark a tool's `execute` function with `'use step'`, each call becomes a durable step that retries up to three times by default and survives restarts. Workflow steps pass only serializable values, so create and close the MCP client inside the step that calls the tool. See [What is WorkflowAgent?](/kb/guide/what-is-workflowagent).

## Next steps

- Follow [Vercel Connect with AI SDK and MCP](/docs/connect/frameworks/ai-sdk-and-mcp) for a streaming route with user consent and OAuth authentication.
- Configure model requests with [AI SDK and AI Gateway](/docs/ai-gateway/sdks-and-apis/ai-sdk).
- Explore [MCP integrations](/docs/mcp/integrations) for TanStack AI and eve examples.

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
