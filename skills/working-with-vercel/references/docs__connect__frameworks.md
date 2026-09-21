---
title: Frameworks and Adapters
product: vercel
url: /docs/connect/frameworks
canonical_url: "https://vercel.com/docs/connect/frameworks"
last_updated: 2026-08-28
type: conceptual
prerequisites:
  - /docs/connect
related:
  - /docs/connect/frameworks/ai-sdk-and-mcp
  - /docs/connect/frameworks/tanstack-ai
  - /docs/connect/frameworks/eve
  - /docs/connect/frameworks/chat-sdk
  - /docs/connect/frameworks/better-auth
summary: Use Vercel Connect with AI SDK, TanStack AI, MCP clients, eve, Chat SDK, Better Auth, and Auth.js.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/frameworks.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "cd040474efa95493cc1feb25923238675101c50ddaf8f315e9a9705c929bf674"
---

# Frameworks and Adapters

> **🔒 Permissions Required**: Vercel Connect

Vercel Connect integrations adapt connector tokens, consent, and webhook
verification to the frameworks you already use. Choose an integration based on
the task your application needs to perform.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks&source_site=vercel-docs&relationship=related) — Authenticate Slack, Microsoft Teams, GitHub, Linear, Discord, Notion, and Telegram adapters with Vercel Connect — short-
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks&source_site=vercel-docs&relationship=related)
- [Authentication](https://vercel.com/docs/connect/concepts/authentication?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks&source_site=vercel-docs&relationship=related) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V
- [AI Gateway Framework Integrations](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks&source_site=vercel-docs&relationship=related) — Connect LangChain, LiteLLM, LlamaIndex, Mastra, Pydantic AI, TanStack AI, and other frameworks to Vercel AI Gateway with
- [Vercel Connect Concepts](https://vercel.com/docs/connect/concepts?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks&source_site=vercel-docs&relationship=related) — Understand the core building blocks of Vercel Connect: connectors, installations, tokens, project links, triggers, and a
- [MCP Integrations](https://vercel.com/docs/mcp/integrations?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks&source_site=vercel-docs&relationship=related) — Connect AI SDK, TanStack AI, and eve applications to MCP servers to discover and call tools.

Full cross-link map for this page: [/docs/connect/frameworks.graph.md](/docs/connect/frameworks.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Choose an integration

| Integration | Package | Use it to |
| --- | --- | --- |
| [AI SDK and MCP](/docs/connect/frameworks/ai-sdk-and-mcp) | `@vercel/connect/ai-sdk` or `@vercel/connect/mcp` | Authenticate an MCP client, request user consent, and pass MCP tools to an AI SDK model |
| [TanStack AI](/docs/connect/frameworks/tanstack-ai)         | `@vercel/connect/tanstack-ai`                      | Authenticate MCP transports, handle user consent, and pass MCP clients to TanStack AI          |
| [eve](/docs/connect/frameworks/eve) | `@vercel/connect/eve` | Authorize eve connections, supply channel credentials, and verify Connect OAuth gateway tokens |
| [Chat SDK](/docs/connect/frameworks/chat-sdk) | `@vercel/connect/chat` | Supply adapter credentials and verify trigger-forwarded webhooks |
| [Better Auth](/docs/connect/frameworks/better-auth) | `@vercel/connect/betterauth` | Sign users into an application through Connect with Better Auth |
| [Auth.js](/docs/connect/frameworks/authjs) | `@vercel/connect/authjs` | Add a Connect OAuth provider to Auth.js |

AI SDK and framework-agnostic MCP clients use the same
`connectAuthProvider()` implementation. Import it from the entry point that
matches your client. For TanStack AI, use
[`connectMCPTransport()`](/docs/connect/frameworks/tanstack-ai)
to build the transport configuration with a Connect auth provider.

## Use the root SDK directly

Use the root `@vercel/connect` package when you need a provider token without a
framework adapter. Its APIs let you:

- Request app, user, federated, or exchanged tokens with `getToken()` and
  `getTokenResponse()`
- Start an interactive authorization flow with `startAuthorization()`
- Select installations, scopes, audiences, resources, and authorization
  details

Follow the [Quickstart](/docs/connect/quickstart) to create and link a connector.
See [Tokens](/docs/connect/concepts/tokens) to choose a subject and scopes, and
use the [SDK Reference](/docs/connect/ts-sdk-reference) for the root API.

## Prepare your project

Every integration authenticates the calling project through Vercel OpenID
Connect (OIDC). Link your local directory and pull a development token:

```bash filename="terminal"
vercel link
vercel env pull
```

Vercel provides `VERCEL_OIDC_TOKEN` automatically after deployment. Your
connector must also have a [project link](/docs/connect/concepts/project-links)
for each environment that requests credentials.


---

[View full sitemap](/docs/sitemap)
