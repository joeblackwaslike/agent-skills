---
title: AI SDK and MCP
product: vercel
url: /docs/connect/frameworks/ai-sdk-and-mcp
canonical_url: "https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp"
last_updated: 2026-08-28
type: tutorial
prerequisites:
  - /docs/connect/frameworks
  - /docs/connect
related:
  - /docs/connect/quickstart
  - /docs/connect/concepts/tokens
  - /docs/connect/concepts/authentication
  - /docs/connect/ts-sdk-reference
summary: Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "5649c682d59d324eab366cb4a386e4cceecca0ede968246baaf48e201810e1c7"
---

# AI SDK and MCP

> **🔒 Permissions Required**: Vercel Connect

This tutorial connects an AI SDK route to Linear's Model Context Protocol (MCP) server. Vercel Connect supplies short-lived OAuth tokens, while AI SDK discovers and calls the server's tools.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fai-sdk-and-mcp&source_site=vercel-docs&relationship=related)
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fai-sdk-and-mcp&source_site=vercel-docs&relationship=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [eve](https://vercel.com/docs/connect/frameworks/eve?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fai-sdk-and-mcp&source_site=vercel-docs&relationship=related) — Use Vercel Connect to configure eve channel credentials, authorize MCP client connections, and authenticate inbound Conn
- [Auth.js](https://vercel.com/docs/connect/frameworks/authjs?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fai-sdk-and-mcp&source_site=vercel-docs&relationship=related) — Add a Vercel Connect OAuth provider to Auth.js in a Next.js App Router application.
- [Chat SDK](https://vercel.com/docs/connect/frameworks/chat-sdk?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fai-sdk-and-mcp&source_site=vercel-docs&relationship=related) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, GitHub, Linear, Notion,
- [AI SDK](https://vercel.com/docs/ai-sdk?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fai-sdk-and-mcp&source_site=vercel-docs&relationship=related) — Build TypeScript agents and AI applications with a unified API for models, tools, structured output, and streaming.
- [Use Vercel](https://vercel.com/docs/agent-resources/vercel-mcp?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fai-sdk-and-mcp&source_site=vercel-docs&relationship=related) — Vercel MCP has tools available for searching docs, managing teams, projects, and deployments, and querying Web Analytics

Full cross-link map for this page: [/docs/connect/frameworks/ai-sdk-and-mcp.graph.md](/docs/connect/frameworks/ai-sdk-and-mcp.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fai-sdk-and-mcp&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

- A Next.js App Router project
- A Vercel project linked to your local directory
- A Linear connector with the UID `oauth/linear`, linked to the project's Development environment
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
            'oauth/linear',
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
            'oauth/linear',
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

| Subject | Use it for | Consent behavior |
| --- | --- | --- |
| `{ type: 'user', id: userId }` | Actions on behalf of one signed-in user | That user grants OAuth access before the first tool call |
| `{ type: 'app' }` | Bot, service, or tenant-wide actions | Uses the connector's app grant without per-user consent |

For app-level access, change the provider call:

```js
const authProvider = connectAuthProvider('oauth/linear', {
  subject: { type: 'app' },
  scopes: ['read'],
});
```

The connector must support an app-level grant, such as OAuth client credentials. See [Tokens](/docs/connect/concepts/tokens) for subject and scope details.

## Customize consent handling

`connectAuthProvider` supports three consent options:

| Option | Behavior |
| --- | --- |
| `redirectUrl` | Sends the user back to this URL after consent. If you omit it, Connect uses the connector's registered redirect. |
| `onConsentRequired` | Receives the consent challenge so you can show your own UI or persist an out-of-band challenge. Providing this callback suppresses the default `ConsentRequiredError`, so throw your own boundary error if the callback can't finish the response. |
| `deviceCode` | Set to `true` to request device authorization. When the connector supports it, the challenge includes optional `deviceCode` and `expiresAt` values. |

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

| Check | Question | Owner |
| --- | --- | --- |
| OAuth consent | Can this app access the user's Linear account? | Vercel Connect through `connectAuthProvider` |
| Tool approval | Can the agent run this specific tool call with these arguments? | AI SDK through `toolApproval` |

Connect handles account access. It doesn't approve each MCP action. For sensitive tools that create, update, delete, send, or spend, add AI SDK tool approval separately.

Use the exact name returned by your MCP server when you configure [AI SDK tool
approval](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#tool-approval).
Your chat UI must collect the decision and include the approval response in the
next turn.

## Next steps

- [Authentication](/docs/connect/concepts/authentication): Learn how deployments and local code authenticate with Vercel Connect.
- [Tokens](/docs/connect/concepts/tokens): Choose subjects, scopes, and installations.
- [TypeScript SDK Reference](/docs/connect/ts-sdk-reference): Review Connect token and authorization APIs.


---

[View full sitemap](/docs/sitemap)
