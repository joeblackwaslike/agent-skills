---
title: AI SDK with MCP
product: vercel
url: /docs/mcp/integrations/ai-sdk
canonical_url: "https://vercel.com/docs/mcp/integrations/ai-sdk"
last_updated: 2026-09-15
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
source: "https://vercel.com/docs/mcp/integrations/ai-sdk.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "aa78274134dba96c8795942c205dd890c7755641a3cc969ad3d37c53bc615ac3"
---

# AI SDK with MCP

Use the [AI SDK](/docs/ai-sdk) to call tools from a [Model Context Protocol (MCP)](/docs/mcp) server hosted on Vercel. The `@ai-sdk/mcp` client discovers the server's tools, and [AI Gateway](/docs/ai-gateway) handles model requests.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [MCP server support on Vercel](https://vercel.com/changelog/mcp-server-support-on-vercel?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Fai-sdk&source_site=vercel-docs&relationship=related) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [Introducing Vercel MCP: Connect Vercel to your AI tools](https://vercel.com/blog/introducing-vercel-mcp-connect-vercel-to-your-ai-tools?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [How to build an MCP server with Nuxt](https://vercel.com/kb/guide/how-to-build-an-mcp-server-with-nuxt?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Fai-sdk&source_site=vercel-docs&relationship=related) — Add an MCP server to your Nuxt app with the Nuxt MCP Toolkit. Create tools, resources, and prompt templates that AI assi
- [Model Context Protocol (MCP) explained: An FAQ](https://vercel.com/blog/model-context-protocol-mcp-explained?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Fai-sdk&source_site=vercel-docs&relationship=related)
- [Using xmcp with Next.js](https://vercel.com/kb/guide/using-xmcp-with-nextjs?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Fai-sdk&source_site=vercel-docs&relationship=related) — Add an MCP server to an existing Next.js app with xmcp. Create typed tools, add authentication, and deploy to Vercel as
- [Add MCP Apps to your AI SDK application](https://vercel.com/kb/guide/ai-sdk-mcp-apps?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Fai-sdk&source_site=vercel-docs&relationship=related) — Build an MCP Apps host with the AI SDK using @ai-sdk/mcp and @ai-sdk/react to filter model-visible tools, read ui:// res

Full cross-link map for this page: [/docs/mcp/integrations/ai-sdk.graph.md](/docs/mcp/integrations/ai-sdk.graph.md?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations%2Fai-sdk&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

Before you begin, you need:

- A JavaScript or TypeScript project with Node.js 22 or later. This example uses [AI SDK 7](/docs/ai-gateway/sdks-and-apis/ai-sdk#version-compatibility) and ECMAScript modules (ESM).
- An [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys).
- The `roll_dice` MCP server from [Deploy MCP servers to Vercel](/docs/mcp/deploy-mcp-servers-to-vercel#deploy-an-mcp-server-on-vercel), deployed at a URL your client can reach.

## Install the packages

Install the AI SDK and its MCP client:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i ai @ai-sdk/mcp
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i ai @ai-sdk/mcp
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i ai @ai-sdk/mcp
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i ai @ai-sdk/mcp
    ```
  </Code>
</CodeBlock>

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

## Next steps

- Follow [Vercel Connect with AI SDK and MCP](/docs/connect/frameworks/ai-sdk-and-mcp) for a streaming route with user consent and OAuth authentication.
- Configure model requests with [AI SDK and AI Gateway](/docs/ai-gateway/sdks-and-apis/ai-sdk).
- Explore [MCP integrations](/docs/mcp/integrations) for TanStack AI and eve examples.


---

[View full sitemap](/docs/sitemap)
