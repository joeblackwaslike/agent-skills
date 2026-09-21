---
title: Deploy MCP servers to Vercel
product: vercel
url: /docs/mcp/deploy-mcp-servers-to-vercel
canonical_url: "https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel"
last_updated: 2026-09-15
type: how-to
prerequisites:
  - /docs/mcp
related:
  - /docs/functions
  - /docs/fluid-compute
  - /docs/fundamentals/what-is-compute
  - /docs/instant-rollback
  - /docs/deployment-protection
summary: Learn how to deploy Model Context Protocol (MCP) servers on Vercel with OAuth authentication and efficient scaling.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "38aa8981f3009c766944121f11e9249adf035a97bbbb1be872c1fb179bed6214"
---

# Deploy MCP servers to Vercel

Deploy your Model Context Protocol (MCP) servers on Vercel to [take advantage of features](/docs/mcp/deploy-mcp-servers-to-vercel#deploy-mcp-servers-efficiently) like [Vercel Functions](/docs/functions), [OAuth](/docs/mcp/deploy-mcp-servers-to-vercel#enabling-authorization), and [efficient scaling](/docs/fluid-compute) for AI applications.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel MCP: Connect Vercel to your AI tools](https://vercel.com/blog/introducing-vercel-mcp-connect-vercel-to-your-ai-tools?from=related&source_path=%2Fdocs%2Fmcp%2Fdeploy-mcp-servers-to-vercel&source_site=vercel-docs&relationship=related)
- [Build a ChatGPT Connector \\(MCP server\\)](https://vercel.com/kb/guide/mcp-server-chatgpt-connector?from=related&source_path=%2Fdocs%2Fmcp%2Fdeploy-mcp-servers-to-vercel&source_site=vercel-docs&relationship=related) — Build a ChatGPT MCP server with mcp-handler and Fluid compute. Add search, fetch, and OAuth, deploy to Vercel, then vali
- [How to build an MCP server with Nuxt](https://vercel.com/kb/guide/how-to-build-an-mcp-server-with-nuxt?from=related&source_path=%2Fdocs%2Fmcp%2Fdeploy-mcp-servers-to-vercel&source_site=vercel-docs&relationship=related) — Add an MCP server to your Nuxt app with the Nuxt MCP Toolkit. Create tools, resources, and prompt templates that AI assi
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express?from=related&source_path=%2Fdocs%2Fmcp%2Fdeploy-mcp-servers-to-vercel&source_site=vercel-docs&relationship=related) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [Building efficient MCP servers](https://vercel.com/blog/building-efficient-mcp-servers?from=related&source_path=%2Fdocs%2Fmcp%2Fdeploy-mcp-servers-to-vercel&source_site=vercel-docs&relationship=related)
- [Model Context Protocol (MCP) explained: An FAQ](https://vercel.com/blog/model-context-protocol-mcp-explained?from=related&source_path=%2Fdocs%2Fmcp%2Fdeploy-mcp-servers-to-vercel&source_site=vercel-docs&relationship=related)
- [Using xmcp with Next.js](https://vercel.com/kb/guide/using-xmcp-with-nextjs?from=related&source_path=%2Fdocs%2Fmcp%2Fdeploy-mcp-servers-to-vercel&source_site=vercel-docs&relationship=related) — Add an MCP server to an existing Next.js app with xmcp. Create typed tools, add authentication, and deploy to Vercel as
- [How to create a contentful asset on Vercel](https://vercel.com/kb/guide/how-to-create-a-contentful-asset-on-vercel?from=related&source_path=%2Fdocs%2Fmcp%2Fdeploy-mcp-servers-to-vercel&source_site=vercel-docs&relationship=related) — This is my wonderful
- [AI SDK and MCP](https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp?from=related&source_path=%2Fdocs%2Fmcp%2Fdeploy-mcp-servers-to-vercel&source_site=vercel-docs&relationship=related) — Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.

Full cross-link map for this page: [/docs/mcp/deploy-mcp-servers-to-vercel.graph.md](/docs/mcp/deploy-mcp-servers-to-vercel.graph.md?from=related&source_path=%2Fdocs%2Fmcp%2Fdeploy-mcp-servers-to-vercel&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- Get started with [deploying MCP servers on Vercel](#deploy-an-mcp-server-on-vercel)
- Learn how to [enable authorization](#enabling-authorization) to secure your MCP server

## Deploy MCP servers efficiently

Vercel provides the following features for production MCP deployments:

- **Optimized cost and performance**: [Vercel Functions](/docs/functions) with [Fluid compute](/docs/fluid-compute) handle MCP servers' irregular usage patterns (long idle times, quick message bursts, heavy AI workloads) through [optimized concurrency](/docs/fundamentals/what-is-compute#optimized-concurrency), [dynamic scaling](/docs/fundamentals/what-is-compute#dynamic-scaling), and [instance sharing](/docs/fundamentals/what-is-compute#compute-instance-sharing). You only pay for compute resources you actually use with minimal idle time.
- [**Instant Rollback**](/docs/instant-rollback): Quickly revert to previous production deployments if issues arise with your MCP server.
- [**Preview deployments with Deployment Protection**](/docs/deployment-protection): Secure your preview MCP servers and test changes safely before production
- [**Vercel Firewall**](/docs/vercel-firewall): Protect your MCP servers from malicious attacks and unauthorized access with multi-layered security
- [**Rolling Releases**](/docs/rolling-releases): Gradually roll out new MCP server deployments to a fraction of users before promoting to everyone

## Deploy an MCP server on Vercel

Use [`mcp-handler`](https://github.com/vercel/mcp-handler) to create an MCP server in an existing Next.js App Router application. You'll need Node.js 20 or later.

Install `mcp-handler` v2, the MCP server SDK v2, and Zod v4:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i mcp-handler@2.1.1 @modelcontextprotocol/server@2 zod@4
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i mcp-handler@2.1.1 @modelcontextprotocol/server@2 zod@4
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i mcp-handler@2.1.1 @modelcontextprotocol/server@2 zod@4
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i mcp-handler@2.1.1 @modelcontextprotocol/server@2 zod@4
    ```
  </Code>
</CodeBlock>

Create a route that exposes a tool for rolling an N-sided die:

**app/api/mcp/route.ts**

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
      return {
        content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }],
      };
    },
  );
});

export { handler as GET, handler as POST };
```

**app/api/mcp/route.js**

```js filename="app/api/mcp/route.js"
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
      return {
        content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }],
      };
    },
  );
});

export { handler as GET, handler as POST };
```

Clients connect to `/api/mcp` using Streamable HTTP. Your framework determines the route, so you don't need to configure a base path in `mcp-handler`.

> **💡 Note:** Version 2 of `mcp-handler` uses `@modelcontextprotocol/server`
> instead of `@modelcontextprotocol/sdk`, changes tool registration, and removes
> legacy HTTP+SSE transport and Redis configuration. Follow the [migration
> guide](https://github.com/vercel/mcp-handler#migrating-from-1x) to update an
> existing server.

### Test the MCP server locally

Start your Next.js development server at `http://localhost:3000` before opening the MCP Inspector.

1. Run the MCP inspector:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @modelcontextprotocol/inspector@latest
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @modelcontextprotocol/inspector@latest
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @modelcontextprotocol/inspector@latest
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @modelcontextprotocol/inspector@latest
    ```
  </Code>
</CodeBlock>

2. Open the inspector interface:
   - Browse to `http://127.0.0.1:6274` where the inspector runs by default
3. Connect to your MCP server:
   - Select **Streamable HTTP** in the drop-down on the left
   - In the **URL** field, use `http://localhost:3000/api/mcp`
   - Expand **Configuration**
   - In the **Proxy Session Token** field, paste the token printed in the terminal where MCP Inspector is running
   - Click **Connect**
4. Test the tools:
   - Click **List Tools** under Tools
   - Click on the `roll_dice` tool
   - Test it through the available options on the right of the tools section

When you deploy your application on Vercel, you will get a URL such as `https://my-mcp-server.vercel.app`.

### Configure an MCP host

Using [Cursor](https://www.cursor.com/), add the URL of your MCP server to the [configuration file](https://docs.cursor.com/context/model-context-protocol#configuring-mcp-servers) in [Streamable HTTP transport format](https://modelcontextprotocol.io/docs/concepts/transports#streamable-http).

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "server-name": {
      "url": "https://my-mcp-server.vercel.app/api/mcp"
    }
  }
}
```

You can now use your MCP roll dice tool in [Cursor's AI chat](https://docs.cursor.com/context/model-context-protocol#using-mcp-in-chat) or any other MCP client.

To call the same tool from your own application, follow the [AI SDK](/docs/mcp/integrations/ai-sdk) or [TanStack AI](/docs/mcp/integrations/tanstack-ai) example. Explore [MCP integrations](/docs/mcp/integrations) for connection and authentication options, including eve.

## Enabling authorization

`mcp-handler` includes helpers for verifying bearer tokens and publishing OAuth protected resource metadata. You provide an authorization server and the logic that validates its tokens. The package does not issue tokens or run an authorization server.

### Secure your server with OAuth

Wrap your MCP handler with `withMcpAuth` and set `required: true` to require a valid token. Return the verified client's identity and scopes from `verifyToken`.

The following example uses a token from the `MCP_DEMO_TOKEN` environment variable for local testing. Set that variable in `.env.local` before starting your development server. For production, replace the comparison with your authorization server's token verification, including issuer, audience, expiration, and granted scopes.

Replace your MCP route with the following code:

**app/api/mcp/route.ts**

```ts filename="app/api/mcp/route.ts"
import type { AuthInfo } from '@modelcontextprotocol/server';
import { createMcpHandler, withMcpAuth } from 'mcp-handler';
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
      return {
        content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }],
      };
    },
  );
});

const verifyToken = async (
  _req: Request,
  bearerToken?: string,
): Promise<AuthInfo | undefined> => {
  if (!bearerToken || bearerToken !== process.env.MCP_DEMO_TOKEN) {
    return undefined;
  }

  return {
    token: bearerToken,
    scopes: ['read:dice'],
    clientId: 'demo-client',
  };
};

const authHandler = withMcpAuth(handler, verifyToken, {
  required: true,
  requiredScopes: ['read:dice'],
  resourceMetadataPath: '/.well-known/oauth-protected-resource',
});

export { authHandler as GET, authHandler as POST };
```

**app/api/mcp/route.js**

```js filename="app/api/mcp/route.js"
import { createMcpHandler, withMcpAuth } from 'mcp-handler';
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
      return {
        content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }],
      };
    },
  );
});

const verifyToken = async (_req, bearerToken) => {
  if (!bearerToken || bearerToken !== process.env.MCP_DEMO_TOKEN) {
    return undefined;
  }

  return {
    token: bearerToken,
    scopes: ['read:dice'],
    clientId: 'demo-client',
  };
};

const authHandler = withMcpAuth(handler, verifyToken, {
  required: true,
  requiredScopes: ['read:dice'],
  resourceMetadataPath: '/.well-known/oauth-protected-resource',
});

export { authHandler as GET, authHandler as POST };
```

With this configuration, requests without a valid token receive `401`. If a verified token lacks a required scope, the handler returns `403`.

### Expose OAuth metadata endpoint

To comply with the MCP specification, your server must expose a [metadata endpoint](https://modelcontextprotocol.io/specification/draft/basic/authorization#authorization-server-discovery) that provides OAuth configuration details.
Among other things, this endpoint allows MCP clients to discover how to authorize with your server, which authorization servers can issue valid tokens,
and what scopes are supported.

#### How to add OAuth metadata endpoint

1. In your `app/` directory, create a `.well-known` folder.
2. Inside this directory, create a subdirectory called `oauth-protected-resource`.
3. In this subdirectory, create a `route.ts` or `route.js` file with the following code.
4. Replace the `https://example-authorization-server-issuer.com` URL with your own [Authorization Server (AS) Issuer URL](https://datatracker.ietf.org/doc/html/rfc9728#name-protected-resource-metadata).
5. Set `resourceUrl` to the public URL of your MCP route, including `/api/mcp`.

**app/.well-known/oauth-protected-resource/route.ts**

```ts filename="app/.well-known/oauth-protected-resource/route.ts"
import {
  protectedResourceHandler,
  metadataCorsOptionsRequestHandler,
} from 'mcp-handler';

const handler = protectedResourceHandler({
  authServerUrls: ['https://example-authorization-server-issuer.com'],
  resourceUrl: 'https://my-mcp-server.vercel.app/api/mcp',
});

const corsHandler = metadataCorsOptionsRequestHandler();

export { handler as GET, corsHandler as OPTIONS };
```

**app/.well-known/oauth-protected-resource/route.js**

```js filename="app/.well-known/oauth-protected-resource/route.js"
import {
  protectedResourceHandler,
  metadataCorsOptionsRequestHandler,
} from 'mcp-handler';

const handler = protectedResourceHandler({
  authServerUrls: ['https://example-authorization-server-issuer.com'],
  resourceUrl: 'https://my-mcp-server.vercel.app/api/mcp',
});

const corsHandler = metadataCorsOptionsRequestHandler();

export { handler as GET, corsHandler as OPTIONS };
```

To view the full list of values available to be returned in the OAuth Protected Resource Metadata JSON, see the protected resource metadata [RFC](https://datatracker.ietf.org/doc/html/rfc9728#name-protected-resource-metadata).

MCP clients that are compliant with the latest version of the MCP spec can now securely connect and invoke tools defined in your MCP server, when provided with a valid OAuth token.

## More resources

Learn how to deploy MCP servers on Vercel, connect to them using the AI SDK, and explore curated lists of public MCP servers.

- [Deploy an MCP server with Next.js on Vercel](https://vercel.com/templates/ai/model-context-protocol-mcp-with-next-js)
- [Deploy an MCP server with Vercel Functions](https://vercel.com/templates/other/model-context-protocol-mcp-with-vercel-functions)
- [Learn about MCP server support on Vercel](https://vercel.com/changelog/mcp-server-support-on-vercel)
- [Use the AI SDK to initialize an MCP client on your MCP host to connect to an MCP server](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#initializing-an-mcp-client)
- [Use the AI SDK to call tools that an MCP server provides](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#using-mcp-tools)
- [Explore the list from MCP servers repository](https://github.com/modelcontextprotocol/servers)
- [Explore the list from awesome MCP servers](https://github.com/punkpeye/awesome-mcp-servers)


---

[View full sitemap](/docs/sitemap)
