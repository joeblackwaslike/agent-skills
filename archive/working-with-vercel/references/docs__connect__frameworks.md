---
title: Frameworks and Adapters for Vercel Connect
product: vercel
url: /docs/connect/frameworks
canonical_url: "https://vercel.com/docs/connect/frameworks"
last_updated: 2026-09-18
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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/connect/frameworks.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "accb21418cd91c0c03eceeddf7fda2e995862de154f00ec9b5a07a6ef82bc0fe"
---

# Frameworks and Adapters for Vercel Connect

> Vercel Connect is available on all plans and is subject to the [Vercel Connect terms](/legal/service-terms#connect)

Vercel Connect integrations adapt connector tokens, consent, and webhook
verification to the frameworks you already use. Choose an integration based on
the task your application needs to perform.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect now supports TanStack AI](https://vercel.com/changelog/vercel-connect-tanstack-ai)
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga)
- [The end of credential sprawl for agents](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents)
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect) — Authenticate Slack, Microsoft Teams, GitHub, Linear, Discord, Notion, and Telegram adapters with Vercel Connect, using s
- [Build an integrations hub with Nuxt and Vercel Connect](https://vercel.com/kb/guide/nuxt-and-vercel-connect) — Build an Integrations Hub with Nuxt and Vercel Connect. Connect GitHub and Linear over OAuth and mint short-lived tokens
- [Chat SDK with Vercel Connect](https://vercel.com/docs/chat-sdk/integrations/connect) — Use Vercel Connect for Chat SDK platform credentials, verified webhooks, and separate per-user tool access.

Full cross-link map for this page: [/docs/connect/frameworks.graph.md](/docs/connect/frameworks.graph.md)
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

## Frequently asked questions

### Which frameworks and libraries work with Vercel Connect?

Vercel Connect has adapters for AI SDK, Model Context Protocol (MCP) clients, TanStack AI, eve, Chat SDK, Better Auth, and Auth.js. Each adapter is an entry point of the `@vercel/connect` package, such as `@vercel/connect/chat` or `@vercel/connect/authjs`. For code that doesn't use one of these frameworks, call `getToken()` from the root `@vercel/connect` package, or use the Python SDK, `vercel-connect`. See the [TypeScript SDK Reference](/docs/connect/ts-sdk-reference) and [Python SDK Reference](/docs/connect/python-sdk-reference).

### Do I need to install a separate package for each adapter?

No. Install `@vercel/connect` once and import the entry point that matches your framework. The package declares frameworks such as `ai`, `better-auth`, and `eve` as optional peer dependencies, so installing it doesn't add frameworks you don't use. Install the framework packages your application already needs alongside it.

### Should I use Better Auth, Auth.js, or `getToken()`?

Choose based on whether you need to sign users in or call a provider's API. The [Better Auth](/docs/connect/frameworks/better-auth) and [Auth.js](/docs/connect/frameworks/authjs) adapters sign a person into your application through a connector and create an application session. They don't return a token for the provider's API. To call a provider API as your app or on behalf of a user, request a short-lived token with `getToken()`, or use the AI SDK, MCP, TanStack AI, eve, or Chat SDK adapters, which request tokens for you. To require sign-in before a visitor reaches a deployment, use [Vercel Passport](/docs/passport).

### Can one OIDC token authenticate both AI Gateway and Vercel Connect?

Yes. On Vercel, your project's OIDC token authenticates AI SDK requests to [AI Gateway](/docs/ai-gateway) and token requests to Vercel Connect, so an agent can call models and third-party services without stored API keys. Locally, `vercel env pull` writes one development token that both read. AI Gateway uses the token to authorize model requests. Vercel Connect checks it against the connector's [project links](/docs/connect/concepts/project-links) before it issues a provider token. See [AI Gateway OIDC authentication](/docs/ai-gateway/authentication-and-byok/oidc).

### Can I use Vercel Connect outside a Vercel deployment?

Yes. In external CI/CD or on other hosting, `VERCEL_OIDC_TOKEN` isn't available, so pass a Vercel access token to the SDK with the `vercelToken` option. The token's project must be linked to the connector. An access token can request only an app subject or its own user. To request tokens on behalf of other users, run the code on Vercel, where the OIDC token represents the project. See [Access token authentication](/docs/connect/concepts/authentication#access-token).

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
