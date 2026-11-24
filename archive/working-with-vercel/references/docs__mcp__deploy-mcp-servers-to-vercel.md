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
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "c2f6b41b351954374448b2573c817e9bd2150e3a9ddbe71df07820636fa23990"
---

# Deploy MCP servers to Vercel

Deploy your Model Context Protocol (MCP) servers on Vercel to [take advantage of features](/docs/mcp/deploy-mcp-servers-to-vercel#deploy-mcp-servers-efficiently) like [Vercel Functions](/docs/functions), [OAuth](/docs/mcp/deploy-mcp-servers-to-vercel#enabling-authorization), and [efficient scaling](/docs/fluid-compute) for AI applications.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build a ChatGPT Connector \\(MCP server\\)](https://vercel.com/kb/guide/mcp-server-chatgpt-connector) — Build a ChatGPT MCP server with mcp-handler and Fluid compute. Add search, fetch, and OAuth, deploy to Vercel, then vali
- [Introducing Vercel MCP: Connect Vercel to your AI tools](https://vercel.com/blog/introducing-vercel-mcp-connect-vercel-to-your-ai-tools)
- [Model Context Protocol (MCP) explained: An FAQ](https://vercel.com/blog/model-context-protocol-mcp-explained)
- [Using xmcp with Next.js](https://vercel.com/kb/guide/using-xmcp-with-nextjs) — Add an MCP server to an existing Next.js app with xmcp. Create typed tools, add authentication, and deploy to Vercel as
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [Building efficient MCP servers](https://vercel.com/blog/building-efficient-mcp-servers)
- [How to create a contentful asset on Vercel](https://vercel.com/kb/guide/how-to-create-a-contentful-asset-on-vercel) — This is my wonderful
- [Add MCP Apps to your AI SDK application](https://vercel.com/kb/guide/ai-sdk-mcp-apps) — Build an MCP Apps host with the AI SDK using @ai-sdk/mcp and @ai-sdk/react to filter model-visible tools, read ui:// res
- [Use Vercel](https://vercel.com/docs/agent-resources/vercel-mcp) — Vercel MCP has tools available for searching docs, managing teams, projects, and deployments, and querying Web Analytics

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

Use [`mcp-handler`](https://github.com/vercel-labs/mcp-handler) to create an MCP server in an existing Next.js App Router application. You'll need Node.js 22 or later.

Install `mcp-handler` v2, the MCP server SDK v2, and Zod v4:

**pnpm**

```bash
pnpm i mcp-handler@2 @modelcontextprotocol/server@2 zod@4
```

**yarn**

```bash
yarn add mcp-handler@2 @modelcontextprotocol/server@2 zod@4
```

**npm**

```bash
npm i mcp-handler@2 @modelcontextprotocol/server@2 zod@4
```

**bun**

```bash
bun add mcp-handler@2 @modelcontextprotocol/server@2 zod@4
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
> guide](https://github.com/vercel-labs/mcp-handler#migrating-from-1x) to update an
> existing server.

### Test the MCP server locally

Start your Next.js development server at `http://localhost:3000`, then run the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) with your server's URL:

**pnpm**

```bash
pnpm dlx @modelcontextprotocol/inspector@latest --server-url http://localhost:3000/api/mcp --transport http
```

**yarn**

```bash
yarn dlx @modelcontextprotocol/inspector@latest --server-url http://localhost:3000/api/mcp --transport http
```

**npm**

```bash
npx @modelcontextprotocol/inspector@latest --server-url http://localhost:3000/api/mcp --transport http
```

**bun**

```bash
bunx @modelcontextprotocol/inspector@latest --server-url http://localhost:3000/api/mcp --transport http
```

The Inspector opens in your browser. If it doesn't, open the URL printed in your terminal, which includes a session token.

1. Under **Servers**, turn on the switch for `localhost:3000` to connect.
2. Select **Tools** at the top of the page, then select `roll_dice`.
3. Enter a value for `sides`, such as `6`, and select **Execute Tool**. The result shows the number you rolled.

To check the server from a script or CI job instead, use the Inspector's CLI mode:

```bash filename="terminal"
npx @modelcontextprotocol/inspector@latest --cli http://localhost:3000/api/mcp --transport http --method tools/list
```

When you deploy your application on Vercel, you'll get a URL such as `https://my-mcp-server.vercel.app`.

### Configure an MCP host

Add your deployed server's full URL, such as `https://my-mcp-server.vercel.app/api/mcp`, to an MCP host. Claude and ChatGPT connect from their own infrastructure, so use your deployment's URL rather than `localhost`.

- **Claude**: In the [Connectors directory](https://claude.ai/customize/connectors), select **Add**, then **Add custom connector**. Enter a name and your server's URL, then select **Continue**. On Team and Enterprise plans, an Owner adds custom connectors for the organization. See [Add a connector that isn't in the directory](https://claude.com/docs/connectors/custom/add-unlisted#add-a-connector-by-url).
- **ChatGPT**: In [ChatGPT Plugins](https://chatgpt.com/plugins), select the plus button, then **Add custom MCP server**. Enter a name, a description, and your server's URL, configure authentication, then select **Create as a plugin**. See [Connect and test your plugin](https://developers.openai.com/plugins/deploy/connect-chatgpt).
- **Cursor**: Add your server's URL to `.cursor/mcp.json`, as described in [Cursor's MCP documentation](https://cursor.com/docs/mcp):

```json filename=".cursor/mcp.json"
{
  "mcpServers": {
    "server-name": {
      "url": "https://my-mcp-server.vercel.app/api/mcp"
    }
  }
}
```

You can now ask the host to roll a die with your `roll_dice` tool.

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

MCP clients also need a way to register with your authorization server. The [MCP specification](https://modelcontextprotocol.io/specification/latest/basic/authorization/client-registration) recommends Client ID Metadata Documents, with Dynamic Client Registration as a fallback, so check that your authorization server supports at least one of them.

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

To comply with the MCP specification, your server must expose a [metadata endpoint](https://modelcontextprotocol.io/specification/latest/basic/authorization/authorization-server-discovery) that provides OAuth configuration details.
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

- [Deploy an MCP server with Next.js on Vercel](/templates/next.js/model-context-protocol-mcp-with-next-js)
- [Build MCP Apps with Next.js](/templates/next.js/mcp-apps-next-js-starter): Render interactive UI in Claude, ChatGPT, and other MCP hosts.
- [Build a data-analysis MCP server with Sandbox](/kb/guide/large-scale-data-analysis-vercel-sandbox-mcp): Expose DuckDB SQL and Python tools with `mcp-handler`.
- [Learn about MCP server support on Vercel](/changelog/mcp-server-support-on-vercel)
- [Use the AI SDK to initialize an MCP client on your MCP host to connect to an MCP server](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools#initializing-an-mcp-client)
- [Use the AI SDK to call tools that an MCP server provides](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools#using-mcp-tools)
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
