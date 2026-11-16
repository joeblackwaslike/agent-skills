---
title: Deploy MCP servers to Vercel
product: vercel
url: /docs/mcp/deploy-mcp-servers-to-vercel
canonical_url: "https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel"
last_updated: 2026-09-18
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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "63bafd7ab7f8feb68b47edb73574146764b9c3d46f7f5275bd537eb53d25253e"
---

# Deploy MCP servers to Vercel

Deploy your Model Context Protocol (MCP) servers on Vercel to [take advantage of features](/docs/mcp/deploy-mcp-servers-to-vercel#deploy-mcp-servers-efficiently) like [Vercel Functions](/docs/functions), [OAuth](/docs/mcp/deploy-mcp-servers-to-vercel#enabling-authorization), and [efficient scaling](/docs/fluid-compute) for AI applications.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build a ChatGPT Connector \\(MCP server\\)](https://vercel.com/kb/guide/mcp-server-chatgpt-connector) — Build a ChatGPT MCP server with mcp-handler and Fluid compute. Add search, fetch, and OAuth, deploy to Vercel, then vali
- [Introducing Vercel MCP: Connect Vercel to your AI tools](https://vercel.com/blog/introducing-vercel-mcp-connect-vercel-to-your-ai-tools)
- [Using xmcp with Next.js](https://vercel.com/kb/guide/using-xmcp-with-nextjs) — Add an MCP server to an existing Next.js app with xmcp. Create typed tools, add authentication, and deploy to Vercel as
- [Building efficient MCP servers](https://vercel.com/blog/building-efficient-mcp-servers)
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [Model Context Protocol (MCP) explained: An FAQ](https://vercel.com/blog/model-context-protocol-mcp-explained)
- [How to create a contentful asset on Vercel](https://vercel.com/kb/guide/how-to-create-a-contentful-asset-on-vercel) — This is my wonderful
- [How to build an MCP server with Nuxt](https://vercel.com/kb/guide/how-to-build-an-mcp-server-with-nuxt) — Add an MCP server to your Nuxt app with the Nuxt MCP Toolkit. Create tools, resources, and prompt templates that AI assi
- [OAuth support added to MCP Adapter](https://vercel.com/changelog/oauth-support-added-to-mcp-adapter)
- [Use Vercel](https://vercel.com/docs/agent-resources/vercel-mcp) — Vercel MCP has tools available for searching docs, managing teams, projects, and deployments, and querying Web Analytics
- [AI SDK and MCP with Vercel Connect](https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp) — Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.

Full cross-link map for this page: [/docs/mcp/deploy-mcp-servers-to-vercel.graph.md](/docs/mcp/deploy-mcp-servers-to-vercel.graph.md)
<!-- /docsgraph:related -->

- Get started with [deploying MCP servers on Vercel](#deploy-an-mcp-server-on-vercel)
- Learn how to [enable authorization](#enabling-authorization) to secure your MCP server
- [Add your MCP server to an agent](#add-your-mcp-server-to-an-agent) built with AI SDK, eve, or TanStack AI

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

**pnpm**

```bash
pnpm i mcp-handler@2.1.1 @modelcontextprotocol/server@2 zod@4
```

**yarn**

```bash
yarn add mcp-handler@2.1.1 @modelcontextprotocol/server@2 zod@4
```

**npm**

```bash
npm i mcp-handler@2.1.1 @modelcontextprotocol/server@2 zod@4
```

**bun**

```bash
bun add mcp-handler@2.1.1 @modelcontextprotocol/server@2 zod@4
```

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

**pnpm**

```bash
pnpm dlx @modelcontextprotocol/inspector@latest
```

**yarn**

```bash
yarn dlx @modelcontextprotocol/inspector@latest
```

**npm**

```bash
npx @modelcontextprotocol/inspector@latest
```

**bun**

```bash
bunx @modelcontextprotocol/inspector@latest
```

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

## Add your MCP server to an agent

Connect your deployed MCP server to an agent so the model can discover and call its tools. Use the full Streamable HTTP endpoint, such as `https://my-mcp-server.vercel.app/api/mcp`, when configuring the connection.

Choose the integration for your agent framework:

- **[AI SDK](/docs/mcp/integrations/ai-sdk):** Create a client with `createMCPClient` from `@ai-sdk/mcp`, retrieve the server's tools with `client.tools()`, and pass them to your model call. The guide includes a complete example that calls this page's `roll_dice` tool and closes the client when generation finishes.
- **[eve](/docs/mcp/integrations/eve):** Define an MCP connection with `defineMcpClientConnection` under `agent/connections/`, using your server's endpoint and a description of its tools. eve discovers the connection from the filesystem. The guide demonstrates OAuth authentication through Vercel Connect using Linear; configure the connector and credentials for your own server when adapting it.
- **[TanStack AI](/docs/mcp/integrations/tanstack-ai):** Create a client with `@tanstack/ai-mcp` and pass it to `chat()` through `mcp.clients`. TanStack AI discovers and executes the server's tools, and `connection: 'close'` closes the client when the run ends. The guide uses this page's `roll_dice` tool.

If you [enable authorization](#enabling-authorization), configure the agent's MCP connection with credentials your server accepts. Model-provider credentials authenticate model requests separately. For OAuth consent and token management, use [Vercel Connect](/docs/connect).

After connecting, ask the agent to use `roll_dice` to roll a six-sided die. A successful tool call returns a value between one and six.

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

## Frequently asked questions

### How long can an MCP tool call run on Vercel?

Each request to your MCP route runs in a [Vercel Function](/docs/functions), so the function's maximum duration limits each tool call. With [Fluid compute](/docs/fluid-compute), the default is 300 seconds on every plan. Hobby allows up to 300 seconds. Pro and Enterprise allow up to 800 seconds, or 1,800 seconds with the [extended max duration beta](/docs/functions/configuring-functions/duration#extended-max-duration-beta). To raise the limit, export `maxDuration` from `app/api/mcp/route.ts`. For longer jobs, have the tool start a [Vercel Workflow](/docs/workflows) and return the run ID, then add a second tool that reports the run's status.

### How does Vercel bill an MCP server?

Your MCP route uses standard [Vercel Functions pricing](/docs/functions/usage-and-pricing). MCP traffic tends to arrive in short bursts separated by long idle periods. With [Fluid compute](/docs/fluid-compute), one function instance can handle several requests at once. Active CPU billing pauses while your code waits on I/O, such as a model response or a database query, and provisioned memory is billed while the instance runs. If your tools call models through [AI Gateway](/docs/ai-gateway/pricing), you pay the provider's list price for tokens, with no AI Gateway markup.

### Can I use mcp-handler with frameworks other than Next.js?

Yes. `createMcpHandler` returns a Web-standard handler that accepts a `Request` and returns a `Response`, so it doesn't depend on Next.js or Vercel. You can mount it in a Nuxt or Nitro server handler with `fromWebHandler` from `h3`, in a SvelteKit server route, or in a Hono route by passing `c.req.raw`. Frameworks built on Node.js `IncomingMessage` and `ServerResponse`, such as Express, need an adapter that creates a Web `Request`. The `/api/mcp` path is a convention. `mcp-handler` doesn't read the request path, so you can mount it at any route and give clients that route's full URL.

### Can an MCP tool run untrusted or model-generated code?

Yes, if you run that code in [Vercel Sandbox](/docs/sandbox) instead of your function. Each sandbox is a Firecracker microVM with its own filesystem and network, and the default image includes Node.js and Python. A tool can create a sandbox with `@vercel/sandbox`, run a command, and return a short summary to the model instead of the raw output. On Vercel, the Sandbox SDK authenticates with your project's OIDC token, so you don't add another credential. A sandbox times out after 5 minutes by default, and you can extend it to 45 minutes on Hobby or 24 hours on Pro and Enterprise. For a complete example, [build a data analysis MCP server with Sandbox](/kb/guide/large-scale-data-analysis-vercel-sandbox-mcp) that runs DuckDB SQL and Python against large datasets.

### How do I protect an MCP server on Vercel from unauthorized use?

Combine authorization with Vercel's network controls:

- Wrap your handler with `withMcpAuth` and `required: true`, as shown in [Enabling authorization](#enabling-authorization). Requests without a valid token receive `401`, and tokens without a required scope receive `403`.
- Add a [WAF rate limiting rule](/docs/vercel-firewall/vercel-waf/rate-limiting) for your MCP path, or call `checkRateLimit` from `@vercel/firewall` in the route with the [rate limiting SDK](/docs/vercel-firewall/vercel-waf/rate-limiting-sdk).
- Keep [Deployment Protection](/docs/deployment-protection) on preview deployments. To test a protected preview from an MCP client, send your project's [automation bypass secret](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) in the `x-vercel-protection-bypass` header.

## More resources

Learn how to deploy MCP servers on Vercel, connect to them using the AI SDK, and explore curated lists of public MCP servers.

- [Deploy an MCP server with Next.js on Vercel](https://vercel.com/templates/ai/model-context-protocol-mcp-with-next-js)
- [Deploy an MCP server with Vercel Functions](https://vercel.com/templates/other/model-context-protocol-mcp-with-vercel-functions)
- [Build a data-analysis MCP server with Sandbox](/kb/guide/large-scale-data-analysis-vercel-sandbox-mcp): Expose DuckDB SQL and Python tools with `mcp-handler`.
- [Learn about MCP server support on Vercel](https://vercel.com/changelog/mcp-server-support-on-vercel)
- [Use the AI SDK to initialize an MCP client on your MCP host to connect to an MCP server](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#initializing-an-mcp-client)
- [Use the AI SDK to call tools that an MCP server provides](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#using-mcp-tools)
- [Explore the list from MCP servers repository](https://github.com/modelcontextprotocol/servers)
- [Explore the list from awesome MCP servers](https://github.com/punkpeye/awesome-mcp-servers)

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
