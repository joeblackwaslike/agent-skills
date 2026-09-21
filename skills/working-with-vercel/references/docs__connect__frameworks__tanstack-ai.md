---
title: TanStack AI
product: vercel
url: /docs/connect/frameworks/tanstack-ai
canonical_url: "https://vercel.com/docs/connect/frameworks/tanstack-ai"
last_updated: 2018-10-20
type: tutorial
prerequisites:
  - /docs/connect/frameworks
  - /docs/connect
related:
  - /docs/ai-gateway
  - /docs/connect/quickstart
  - /docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai
  - /docs/connect/concepts/authentication
  - /docs/connect/concepts/tokens
summary: Connect a TanStack AI app to OAuth-protected MCP servers with Vercel Connect, handle user consent, and manage MCP clients.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/frameworks/tanstack-ai.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "9d64300929091f605bdde98ae74510190bd4647f53077cf5949bb24e3a2fdc69"
---

# TanStack AI

> **🔒 Permissions Required**: Vercel Connect

Connect a TanStack AI chat route to Linear's Model Context Protocol (MCP) server. Vercel Connect supplies OAuth tokens and handles account consent, while TanStack AI discovers and calls the server's tools using a model served through [AI Gateway](/docs/ai-gateway).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [AI SDK and MCP](https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.
- [AI SDK with MCP](https://vercel.com/docs/mcp/integrations/ai-sdk?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Connect the AI SDK to an MCP server on Vercel, discover its tools, and call them with models served through AI Gateway.
- [AI Gateway Ecosystem and Integrations](https://vercel.com/docs/ai-gateway/ecosystem?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Connect frameworks, coding tools, and billing integrations to AI Gateway. Configure app attribution and explore integrat
- [Deploy MCP servers to Vercel](https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Learn how to deploy Model Context Protocol \\(MCP\\) servers on Vercel with OAuth authentication and efficient scaling.
- [AI SDK](https://vercel.com/docs/ai-sdk?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Build TypeScript agents and AI applications with a unified API for models, tools, structured output, and streaming.

Full cross-link map for this page: [/docs/connect/frameworks/tanstack-ai.graph.md](/docs/connect/frameworks/tanstack-ai.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Ftanstack-ai&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

- A Next.js App Router project for the route example below
- A Vercel project linked to your local directory
- A Linear connector with the UID `oauth/linear`, linked to the project's Development environment
- A stable ID for each signed-in user

Follow the [Vercel Connect quickstart](/docs/connect/quickstart) to create and link the connector. The Connect adapter also works in other server frameworks that support TanStack AI.

- ### Set up local authentication
  Link your directory and pull a development OpenID Connect (OIDC) token:
  ```bash filename="Terminal"
  vercel link
  vercel env pull
  ```
  The second command writes `VERCEL_OIDC_TOKEN` to `.env.local`. Next.js loads this file during local development. Vercel Connect and the TanStack AI Gateway adapter read the token automatically. Run `vercel env pull` again when the development token expires. Vercel provides and rotates the token automatically after deployment.

  AI Gateway authenticates model requests, while Vercel Connect authenticates requests to Linear. If you set `AI_GATEWAY_API_KEY`, the AI Gateway adapter uses that key instead of the OIDC token. See [TanStack AI with AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai) for authentication options. When deploying, link the connector to the deployment environment.

- ### Install the packages
  Install Vercel Connect, TanStack AI, its MCP client, and the AI Gateway adapter:
  ```bash package-manager
  pnpm add @vercel/connect @tanstack/ai @tanstack/ai-mcp @tanstack/ai-vercel-gateway
  ```
  These packages provide the imports used below. You don't need `@ai-sdk/mcp` to use `@vercel/connect/tanstack-ai`.

- ### Create a streaming route
  Use `connectMCPTransport` to attach Connect authentication to the MCP transport. Pass the connected client to `chat()` through `mcp.clients`:

  **app/api/chat/route.ts**
  ```ts filename="app/api/chat/route.ts" framework=all
  import { chat, toServerSentEventsResponse } from '@tanstack/ai';
  import { createMCPClient, type MCPClient } from '@tanstack/ai-mcp';
  import { vercelGatewayText } from '@tanstack/ai-vercel-gateway';
  import {
    connectMCPTransport,
    getConsentChallenge,
  } from '@vercel/connect/tanstack-ai';

  export const maxDuration = 60;

  export async function POST(request: Request) {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return Response.json({ error: 'messages must be an array' }, { status: 400 });
    }

    // Replace this demo value with the ID from your authenticated session.
    const userId = 'user_demo_123';
    let mcpClient: MCPClient | undefined;

    try {
      const adapter = vercelGatewayText('anthropic/claude-opus-5');

      mcpClient = await createMCPClient({
        transport: connectMCPTransport(
          { type: 'http', url: 'https://mcp.linear.app/mcp' },
          'oauth/linear',
          {
            subject: { type: 'user', id: userId },
            scopes: ['read'],
          },
          {
            redirectUrl: new URL('/', request.url).toString(),
          },
        ),
      });

      const stream = chat({
        adapter,
        messages,
        mcp: { clients: [mcpClient] },
      });

      return toServerSentEventsResponse(stream);
    } catch (error) {
      await mcpClient?.close();

      const challenge = getConsentChallenge(error);
      if (challenge) {
        return Response.redirect(challenge.url, 303);
      }

      throw error;
    }
  }
  ```
  **app/api/chat/route.js**
  ```js filename="app/api/chat/route.js" framework=all
  import { chat, toServerSentEventsResponse } from '@tanstack/ai';
  import { createMCPClient } from '@tanstack/ai-mcp';
  import { vercelGatewayText } from '@tanstack/ai-vercel-gateway';
  import {
    connectMCPTransport,
    getConsentChallenge,
  } from '@vercel/connect/tanstack-ai';

  export const maxDuration = 60;

  export async function POST(request) {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return Response.json({ error: 'messages must be an array' }, { status: 400 });
    }

    // Replace this demo value with the ID from your authenticated session.
    const userId = 'user_demo_123';
    let mcpClient;

    try {
      const adapter = vercelGatewayText('anthropic/claude-opus-5');

      mcpClient = await createMCPClient({
        transport: connectMCPTransport(
          { type: 'http', url: 'https://mcp.linear.app/mcp' },
          'oauth/linear',
          {
            subject: { type: 'user', id: userId },
            scopes: ['read'],
          },
          {
            redirectUrl: new URL('/', request.url).toString(),
          },
        ),
      });

      const stream = chat({
        adapter,
        messages,
        mcp: { clients: [mcpClient] },
      });

      return toServerSentEventsResponse(stream);
    } catch (error) {
      await mcpClient?.close();

      const challenge = getConsentChallenge(error);
      if (challenge) {
        return Response.redirect(challenge.url, 303);
      }

      throw error;
    }
  }
  ```
  The transport requests a current token from Connect before each MCP request. You don't need to store a Linear token or copy one into an `Authorization` header.

  TanStack AI's [managed MCP integration](https://tanstack.com/ai/latest/docs/tools/mcp-managed) discovers tools when the stream is consumed and closes the client when the run ends, including on error or abort. Keep the client open until streaming finishes. The `catch` block closes it if route setup fails before returning the stream.
  > **💡 Note:** Derive the user subject ID from your authenticated session. Do not accept an
  > arbitrary user ID from the request body. Keep MCP clients and Connect token
  > requests on the server.

- ### Test the consent flow
  Start your app:
  ```bash filename="Terminal"
  pnpm dev
  ```
  In another terminal, send a chat message:
  ```bash filename="Terminal"
  curl -i -N \
    -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"messages":[{"role":"user","content":"List my assigned Linear issues."}]}'
  ```
  If `user_demo_123` hasn't granted Linear access, the route returns a `303` response. Open the `Location` URL in a browser and approve access. Connect returns you to the route's configured `redirectUrl`. Send the chat request again to receive the model's response as server-sent events.

## Handle consent before streaming

For Streamable HTTP, `connectMCPTransport` defaults to eager consent. When Connect reports a missing grant, the provider throws `ConsentRequiredError` during `createMCPClient()`, before the chat stream starts.

TanStack wraps connection failures in `MCPConnectionError`. Use `getConsentChallenge(error)` to find a consent challenge through the error's `cause` chain. A direct `instanceof ConsentRequiredError` check on the outer error can miss the challenge.

Handle consent at the route boundary and start a new chat turn after the user grants access. Tool discovery happens during streaming, so later discovery errors surface in the stream. A route-level `catch` can't turn those errors into a redirect after the response starts.

### Handle consent in a chat UI

A `fetch()` request doesn't navigate the browser when the server returns a redirect. For a chat UI, replace the redirect in the route with a JSON response that your client handles before reading the event stream:

```ts
if (challenge) {
  return Response.json({ consentUrl: challenge.url }, { status: 409 });
}
```

Have your client show a **Connect Linear** link or navigate to `consentUrl`. Preserve the conversation and submit a new request after consent. Send only the consent URL to the client; keep the challenge's `request`, `verifier`, and tokens on the server.

### Customize consent options

Pass consent options as the fourth argument to `connectMCPTransport`:

| Option | Behavior |
| --- | --- |
| `redirectUrl` | Returns the user to this URL after consent. If omitted, Connect uses the connector's registered redirect. |
| `consent` | Defaults to `'eager'` for HTTP and `'transport'` for SSE. Keep these defaults for the corresponding transport. |
| `onConsentRequired` | Receives the consent challenge. In eager mode, the provider still throws after calling this callback so the unauthenticated MCP request stops. |

## Choose an MCP transport

`connectMCPTransport` accepts a transport config with `type`, `url`, and optional `headers` and `fetch` properties:

| Transport | `type` | Default consent mode |
| --- | --- | --- |
| Streamable HTTP | `'http'` | `'eager'`: raises a missing-grant challenge during connection setup |
| Server-sent events (SSE) | `'sse'` | `'transport'`: raises the challenge through the transport's OAuth flow |

Use Streamable HTTP when the server supports it. For an SSE server, use `type: 'sse'` and the server's SSE endpoint. Don't force eager consent on SSE: its EventSource transport can treat a consent error as a network failure and repeatedly reconnect.

The helper prevents MCP requests from following HTTP redirects by default. If your trusted MCP endpoint requires redirects, pass `{ redirect: 'follow' }` in the fourth argument. A custom `fetch` is wrapped rather than replaced.

For a hand-built transport, `@vercel/connect/tanstack-ai` also exports `connectAuthProvider`. Its consent mode defaults to `'transport'`; use `'eager'` only with Streamable HTTP. Prefer `connectMCPTransport` to apply both the transport-specific consent default and redirect handling.

## Connect multiple MCP servers

Use `createMCPClients` from `@tanstack/ai-mcp` to create a pool. Configure each entry with its own `connectMCPTransport` call, connector UID, and MCP URL, then pass the pool in `mcp.clients`. TanStack prefixes tool names with the pool's configuration keys.

Create clients and pools inside each request when using per-user subjects. A shared pool retains its subject and can cause requests from different users to act through the same account. Keep the default `connection: 'close'` lifecycle for this pattern.

For a long-lived provider with an explicit `vercelToken`, supply a callback that returns the current token instead of capturing an OIDC token string. See [Authentication](/docs/connect/concepts/authentication) for deployment credentials and [Tokens](/docs/connect/concepts/tokens) for subjects and scopes.

## Separate OAuth consent from tool approval

Connect's OAuth consent grants access to a provider account. TanStack AI's `needsApproval` setting on tool definitions controls whether a user must approve a specific action.

For tools that create, update, delete, send, or spend, configure [TanStack AI tool approval](https://tanstack.com/ai/latest/docs/tools/tool-approval) separately. Granting Linear access doesn't approve every tool call. The Connect adapter doesn't turn OAuth consent into a TanStack interrupt automatically.

## Next steps

- [TanStack AI with MCP](/docs/mcp/integrations/tanstack-ai): Call tools from an MCP server hosted on Vercel.
- [TanStack AI with AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai): Configure model routing and authentication.
- [TanStack AI with Vercel Sandbox](/docs/sandbox/ecosystem/tanstack-ai): Run coding agents in isolated sandboxes.
- [TanStack AI MCP tools](https://tanstack.com/ai/latest/docs/tools/mcp): Configure MCP tools, transports, and clients.
- [Tokens](/docs/connect/concepts/tokens): Choose subjects, scopes, and installations.
- [TypeScript SDK Reference](/docs/connect/ts-sdk-reference): Review Connect token and authorization APIs.


---

[View full sitemap](/docs/sitemap)
