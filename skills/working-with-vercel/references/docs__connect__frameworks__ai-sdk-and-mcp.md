---
title: AI SDK and MCP with Vercel Connect
product: vercel
url: /docs/connect/frameworks/ai-sdk-and-mcp
canonical_url: "https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp"
last_updated: 2026-10-14
type: tutorial
prerequisites:
  - /docs/connect/frameworks
  - /docs/connect
related:
  - /docs/connect/quickstart
  - /docs/connect/concepts/tokens
  - /docs/connect/mcp-events
  - /docs/ai-gateway
  - /docs/ai-gateway/authentication-and-byok
summary: Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "133ef8ade6cebabb45f903ca6a375a5215ed0f4208f063cfe863c913b02c7dfe"
---

# AI SDK and MCP with Vercel Connect

> Vercel Connect is available on all plans and is subject to the [Vercel Connect terms](/legal/service-terms#connect)

This tutorial connects an AI SDK route to Linear's Model Context Protocol (MCP) server. Vercel Connect supplies short-lived OAuth tokens, while AI SDK discovers and calls the server's tools.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build a Shopify agent with AI SDK and Vercel Connect](https://vercel.com/kb/guide/shopify-agent-ai-sdk-vercel-connect) — Build a Shopify agent with AI SDK and Vercel Connect to search products, check orders, and request approval before chang
- [Build a ChatGPT Connector \\(MCP server\\)](https://vercel.com/kb/guide/mcp-server-chatgpt-connector) — Build a ChatGPT MCP server with mcp-handler and Fluid compute. Add search, fetch, and OAuth, deploy to Vercel, then vali
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga)
- [AI SDK with MCP](https://vercel.com/docs/mcp/integrations/ai-sdk) — Connect the AI SDK to an MCP server on Vercel, discover its tools, and call them with models served through AI Gateway.
- [Auth.js with Vercel Connect](https://vercel.com/docs/connect/frameworks/authjs) — Add a Vercel Connect OAuth provider to Auth.js in a Next.js App Router application.
- [TanStack AI with MCP](https://vercel.com/docs/mcp/integrations/tanstack-ai) — Connect TanStack AI to a Model Context Protocol server on Vercel and call its tools with models served through AI Gatewa
- [Chat SDK with Vercel Connect](https://vercel.com/docs/connect/frameworks/chat-sdk) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, Microsoft Teams, GitHub
- [Deploy MCP servers to Vercel](https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel) — Learn how to deploy Model Context Protocol \\(MCP\\) servers on Vercel with OAuth authentication and efficient scaling.

Full cross-link map for this page: [/docs/connect/frameworks/ai-sdk-and-mcp.graph.md](/docs/connect/frameworks/ai-sdk-and-mcp.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

- A Next.js App Router project
- A Vercel project linked to your local directory
- A Linear connector with the UID `mcp.linear.app/linear`, linked to the project's Development environment
- A stable ID for each signed-in user

Follow the [Vercel Connect quickstart](/docs/connect/quickstart) if you haven't created and linked the connector.

- ### Set up local authentication
  Link your directory and pull a development OpenID Connect (OIDC) token:
  ```bash filename="Terminal"
  vercel link
  vercel env pull
  ```
  The second command writes `VERCEL_OIDC_TOKEN` to `.env.local`. Next.js loads this file during local development. Vercel Connect and AI Gateway read the token automatically.

  The token expires after about 12 hours. Run `vercel env pull` again if local requests start returning authentication errors. Vercel rotates the token automatically after deployment.

- ### Install the packages
  Install Vercel Connect, AI SDK, and the AI SDK MCP client:
  ```bash package-manager
  pnpm add @vercel/connect ai @ai-sdk/mcp
  ```
  You don't need to store a Linear access token. `connectAuthProvider` requests a current token from Vercel Connect whenever the MCP client needs one.

- ### Create a streaming route
  Create a route that connects to Linear's MCP server and passes its tools to `streamText`:
  #### TypeScript
  ```ts filename="app/api/chat/route.ts"
  import { createMCPClient } from '@ai-sdk/mcp';
  import {
    connectAuthProvider,
    ConsentRequiredError,
  } from '@vercel/connect/ai-sdk';
  import { stepCountIs, streamText } from 'ai';

  export const maxDuration = 60;

  export async function POST(request: Request) {
    const { prompt } = await request.json();

    if (typeof prompt !== 'string') {
      return Response.json({ error: 'prompt is required' }, { status: 400 });
    }

    // Replace this demo value with the ID from your authenticated session.
    const userId = 'user_demo_123';
    let mcpClient: Awaited<ReturnType<typeof createMCPClient>> | undefined;

    try {
      mcpClient = await createMCPClient({
        transport: {
          type: 'http',
          url: 'https://mcp.linear.app/mcp',
          authProvider: connectAuthProvider(
            'mcp.linear.app/linear',
            {
              subject: { type: 'user', id: userId },
              scopes: ['read'],
            },
            {
              redirectUrl: new URL('/', request.url).toString(),
            },
          ),
        },
      });

      const tools = await mcpClient.tools();
      const result = await streamText({
        model: 'openai/gpt-5.6-sol',
        tools,
        prompt,
        stopWhen: stepCountIs(5),
        onFinish: async () => {
          await mcpClient?.close();
        },
      });

      return result.toTextStreamResponse();
    } catch (error) {
      await mcpClient?.close();

      if (error instanceof ConsentRequiredError) {
        return Response.redirect(error.url, 303);
      }

      throw error;
    }
  }
  ```
  #### JavaScript
  ```js filename="app/api/chat/route.js"
  import { createMCPClient } from '@ai-sdk/mcp';
  import {
    connectAuthProvider,
    ConsentRequiredError,
  } from '@vercel/connect/ai-sdk';
  import { stepCountIs, streamText } from 'ai';

  export const maxDuration = 60;

  export async function POST(request) {
    const { prompt } = await request.json();

    if (typeof prompt !== 'string') {
      return Response.json({ error: 'prompt is required' }, { status: 400 });
    }

    // Replace this demo value with the ID from your authenticated session.
    const userId = 'user_demo_123';
    let mcpClient;

    try {
      mcpClient = await createMCPClient({
        transport: {
          type: 'http',
          url: 'https://mcp.linear.app/mcp',
          authProvider: connectAuthProvider(
            'mcp.linear.app/linear',
            {
              subject: { type: 'user', id: userId },
              scopes: ['read'],
            },
            {
              redirectUrl: new URL('/', request.url).toString(),
            },
          ),
        },
      });

      const tools = await mcpClient.tools();
      const result = await streamText({
        model: 'openai/gpt-5.6-sol',
        tools,
        prompt,
        stopWhen: stepCountIs(5),
        onFinish: async () => {
          await mcpClient?.close();
        },
      });

      return result.toTextStreamResponse();
    } catch (error) {
      await mcpClient?.close();

      if (error instanceof ConsentRequiredError) {
        return Response.redirect(error.url, 303);
      }

      throw error;
    }
  }
  ```
  The MCP client asks `connectAuthProvider` for a token before each request. If the user hasn't granted access, Vercel Connect creates a consent challenge. The provider throws `ConsentRequiredError`, and the route redirects the browser to `error.url`.

  Catch this error at the route boundary. Don't hold the original request open while the user grants access. After consent, start a new chat turn so the provider can request a token.
  > **💡 Note:** Derive the user subject ID from your authenticated session. Do not accept an
  > arbitrary user ID from the request body.

- ### Test the consent flow
  Start your app, then send a prompt to the route:
  ```bash filename="Terminal"
  pnpm dev
  ```
  In another terminal, make the request:
  ```bash filename="Terminal"
  curl -i -N \
    -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"prompt":"List my assigned Linear issues."}'
  ```
  The first request returns a `303` redirect when `user_demo_123` has no Linear grant. Open the `Location` URL in a browser and approve access. Send the request again to stream the model's response.

## Choose a subject

The subject controls whose provider identity the MCP tools use:

| Subject                        | Use it for                              | Consent behavior                                         |
| ------------------------------ | --------------------------------------- | -------------------------------------------------------- |
| `{ type: 'user', id: userId }` | Actions on behalf of one signed-in user | That user grants OAuth access before the first tool call |
| `{ type: 'app' }`              | Bot, service, or tenant-wide actions    | Uses the connector's app grant without per-user consent  |

For app-level access, change the provider call:

```js
const authProvider = connectAuthProvider('mcp.linear.app/linear', {
  subject: { type: 'app' },
  scopes: ['read'],
});
```

The connector must support an app-level grant, such as OAuth client credentials. See [Tokens](/docs/connect/concepts/tokens) for subject and scope details.

## Customize consent handling

`connectAuthProvider` supports three consent options:

| Option              | Behavior                                                                                                                                                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `redirectUrl`       | Sends the user back to this URL after consent. If you omit it, Connect uses the connector's registered redirect.                                                                                                                                   |
| `onConsentRequired` | Receives the consent challenge so you can show your own UI or persist an out-of-band challenge. Providing this callback suppresses the default `ConsentRequiredError`, so throw your own boundary error if the callback can't finish the response. |
| `deviceCode`        | Set to `true` to request device authorization. When the connector supports it, the challenge includes optional `deviceCode` and `expiresAt` values.                                                                                                |

Both `ConsentRequiredError` and the `onConsentRequired` challenge include `url`, `connector`, `subject`, `request`, and `verifier`. Use `url` for browser consent. For a headless client, set `deviceCode: true` and display the returned `deviceCode` until `expiresAt`.

## Choose an import

Use the AI SDK entry point in an AI SDK app:

```js
import { connectAuthProvider } from '@vercel/connect/ai-sdk';
```

Use the MCP entry point when you plug the same OAuth provider into another MCP-spec client:

```js
import { connectAuthProvider } from '@vercel/connect/mcp';
```

Both paths export the same adapter and consent types. Choose one path for your client. The root `@vercel/connect` entry point doesn't export `connectAuthProvider`.

## Separate OAuth consent from tool approval

OAuth consent and tool approval answer different questions:

| Check         | Question                                                        | Owner                                        |
| ------------- | --------------------------------------------------------------- | -------------------------------------------- |
| OAuth consent | Can this app access the user's Linear account?                  | Vercel Connect through `connectAuthProvider` |
| Tool approval | Can the agent run this specific tool call with these arguments? | AI SDK through `toolApproval`                |

Connect handles account access. It doesn't approve each MCP action. For sensitive tools that create, update, delete, send, or spend, add AI SDK tool approval separately.

Use the exact name returned by your MCP server when you configure [AI SDK tool
approval](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#tool-execution-approval).
Your chat UI must collect the decision and include the approval response in the
next turn.

When designing tool approval, show the reviewer the proposed action and its arguments, and check that their approval still applies before execution. Read [Designing human review for enterprise AI decisions](/i/human-review-enterprise-ai-decisions) for guidance on reviewer authority, changed requests, and recording review outcomes.

## Subscribe to MCP events

For servers that support webhook events, use `experimental_connectEventsAdapter`
from `@vercel/connect/ai-sdk`. Pass it the same token parameters as `connectAuthProvider`;
it reads the MCP URL from the transport. Connect manages subscription storage,
renewal, and upstream webhook verification. Follow the [MCP events guide](/docs/connect/mcp-events)
to create subscriptions and verify deliveries in your application.

## Frequently asked questions

### Do I need to store an OAuth access token for the MCP server?

No. `connectAuthProvider` asks Vercel Connect for a current token whenever the MCP client needs one, and the SDK caches that token in process until it's close to expiring. Vercel Connect stores the user's grant and refreshes the provider token, so your app keeps no Linear access or refresh tokens. See [Caching and refresh](/docs/connect/concepts/tokens#caching-and-refresh).

### Why does my AI SDK route return a `303` redirect?

The signed-in user hasn't granted access to their account yet. `connectAuthProvider` throws `ConsentRequiredError`, and the example route redirects the browser to `error.url`, where the user approves access. After consent, send a new chat request so the provider can fetch a token. For a headless client, set `deviceCode: true` and show the returned device code when the connector supports device authorization. See [Customize consent handling](#customize-consent-handling).

### Does granting OAuth consent approve every MCP tool call?

No. OAuth consent lets your app access the user's account. It doesn't approve individual actions. For tools that create, update, delete, send, or spend, configure [AI SDK tool approval](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#tool-execution-approval) with the tool names your MCP server returns, and have your chat UI collect the decision. See [Separate OAuth consent from tool approval](#separate-oauth-consent-from-tool-approval).

### How does the model request authenticate with AI Gateway?

It uses the same OIDC token as Vercel Connect. The example passes the model string `openai/gpt-5.6-sol` to `streamText`, and AI SDK sends the request through [AI Gateway](/docs/ai-gateway). On Vercel, both authenticate automatically with your project's OIDC token, so you don't add a model provider API key or a Linear token to your environment. Locally, `vercel env pull` supplies the development token for both. See [AI Gateway authentication](/docs/ai-gateway/authentication-and-byok).

### Can I use `connectAuthProvider` with an MCP client other than AI SDK?

Yes. Import it from `@vercel/connect/mcp` instead of `@vercel/connect/ai-sdk`. That entry point returns a standard MCP OAuth client provider that works with other MCP-spec clients, including the MCP TypeScript SDK, `@modelcontextprotocol/sdk`. Both entry points export the same adapter and consent types. For TanStack AI, use [`connectMCPTransport()`](/docs/connect/frameworks/tanstack-ai) instead.

## Next steps

- [Authentication](/docs/connect/concepts/authentication): Learn how deployments and local code authenticate with Vercel Connect.
- [Tokens](/docs/connect/concepts/tokens): Choose subjects, scopes, and installations.
- [TypeScript SDK Reference](/docs/connect/ts-sdk-reference): Review Connect token and authorization APIs.

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
