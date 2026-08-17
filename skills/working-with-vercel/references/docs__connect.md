---
title: Vercel Connect
product: vercel
url: /docs/connect
canonical_url: "https://vercel.com/docs/connect"
last_updated: 2026-07-31
type: conceptual
prerequisites:
  []
related:
  - /docs/connect/quickstart
  - /docs/connect/concepts
  - /docs/connect/concepts/connectors
  - /docs/connect/concepts/tokens
  - /docs/connect/concepts/authentication
summary: Use Vercel Connect to create connectors, authorize provider access, request provider tokens at runtime, and run agent workflows without long-lived...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "156ad21f50ad7d22b7dc357e49b11a04c1ac914fbcbf361ed30d45bbb0bfb4ae"
---

# Vercel Connect

> **🔒 Permissions Required**: Vercel Connect


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Give your agents secure access to third-party APIs](https://vercel.com/kb/guide/vercel-connect?from=related) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Discord, Notion, Figma, Snowflake, and Salesforce f
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Connections](https://eve.dev/docs/connections?from=related) — Expose external MCP and OpenAPI servers to the model, with connection tokens the model never sees.
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk?from=related) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [How to build a browser agent that works behind a login](https://vercel.com/kb/guide/build-a-browser-agent?from=related) — Build a browser agent with eve, Vercel Connect, and KERNEL managed auth that signs a user in through a human-in-the-loop
- [Build your own Slackbot with Vercel Connect](https://vercel.com/kb/guide/build-a-slack-bot-with-vercel-connect?from=related) — Learn how to build your very own Slackbot with Chat SDK and AI SDK. Vercel Connect supplies runtime Slack tokens and for
- [Build a daily digest bot with Chat SDK and Workflow SDK](https://vercel.com/kb/guide/daily-digest-bot-with-chat-sdk-and-workflow-sdk?from=related) — Build a daily digest bot that posts a daily digest of GitHub stats to Slack. Learn how to use Vercel Connect to set up S
- [Environments](https://vercel.com/docs/deployments/environments?from=related) — Environments are for developing locally, testing changes in a pre-production environment, and serving end-users in produ
- [eve](https://vercel.com/docs/eve?from=related) — Learn how to deploy and run durable backend AI agents built with the open-source eve framework on Vercel.
- [Concepts](https://vercel.com/docs/eve/concepts?from=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.

Full cross-link map for this page: [/docs/connect.graph.md](/docs/connect.graph.md)
<!-- /docsgraph:related -->

[Vercel Connect](/connect) lets your agents and services act on third-party APIs on behalf of your users and teams. Instead of storing provider credentials in long-lived environment variables, you register a connector for the provider and request short-lived tokens at runtime, scoped per project and per environment.

Use Vercel Connect to:

- **Call third-party APIs from an agent**: Post to Slack, open GitHub PRs, query Snowflake, or hit any OAuth- or API-key-protected service without bundling provider secrets into your deployment.
- **Act on behalf of your users**: Ask a user to authorize once and obtain a refreshable user token that your agent can use to make calls as that user.
- **Receive provider webhooks**: Verify and forward signed Slack events to project destinations you control.

To create your first connector and request a token, follow the [Quickstart](/docs/connect/quickstart). For the conceptual model, see the [Concepts](/docs/connect/concepts) overview — start with [Connectors](/docs/connect/concepts/connectors), [Tokens](/docs/connect/concepts/tokens), and [Authentication](/docs/connect/concepts/authentication).

## How authentication works

Vercel Connect authenticates in two directions on each token request: from your code to Vercel Connect, and from Vercel Connect to the provider.

### Your code to Vercel Connect

The `@vercel/connect` SDK supports two authentication methods:

- **Vercel OIDC token** (recommended): On Vercel, the SDK uses the [OIDC token](/docs/oidc) that Vercel injects into your deployment automatically. Connect verifies the token and checks it against the connector's project links to confirm the project and environment are allowed to request tokens.
- **Access token**: For external CI/CD or non-Vercel environments where `VERCEL_OIDC_TOKEN` isn't available, pass a [Vercel access token](/docs/rest-api#creating-an-access-token) to the SDK via the `vercelToken` option on `getToken`. Dashboard and CLI calls authenticate the same way, using your active Vercel session.

For the local-development setup that pulls an OIDC token into `.env.local`, follow the [Quickstart](/docs/connect/quickstart).

### Vercel Connect to the provider

Each connector type has its own provider-side flow:

- **Slack** and **GitHub**: Managed app installs, scoped to one workspace or organization per installation.
- **Custom OAuth**: Managed OAuth against the service's URL, on behalf of the installing user (authorization-code flow) or as your service (client-credentials flow).
- **API key**: A credential the connector owner supplies once at create time.

For the full picture, including how token requests are authorized against project links, RBAC for dashboard and CLI calls, the per-connector provider flows, and the error classes thrown on auth failures, see [Concepts: Authentication](/docs/connect/concepts/authentication).

## Connect primitives

- **[Multiple connector types](/docs/connect/concepts/connectors)**: Built-in support for Slack, GitHub, Snowflake, Salesforce, API-key, and Custom OAuth.
- **[Token subject types](/docs/connect/concepts/tokens#subject-types)**: One connector can issue tokens that act as your service (`app`), a specific user (`user`), or a federated identity (`jwt-bearer`).
- **[Installations and multi-tenancy](/docs/connect/concepts/installations)**: One connector serves many tenants, such as Slack workspaces or GitHub organizations.
- **[Fine-grained scoping](/docs/connect/concepts/tokens#scoping-a-token)**: Narrow each token with provider scopes, resource indicators, and rich authorization requests.
- **[Refresh and revocation](/docs/connect/concepts/tokens#caching-and-refresh)**: Tokens refresh automatically; revoke at the provider when supported.
- **[Trigger forwarding](/docs/connect/concepts/triggers)**: Verified webhooks fan out to the project destinations you register on the connector.
- **[Connector branding](/docs/connect/concepts/connectors#branding)**: Per-connector icon, background color, and accent color.

## Observability

Every connector includes an **Observability** tab that logs token requests, authorizations, trigger deliveries, and revocations. Filter events by type, environment, project, or subject, and use stable correlation IDs (`tokenId`, `authorizationId`, `triggerRequestId`) to trace each token across events and match them to your own systems.

To retain events beyond your plan's retention window, forward them to any custom webhook endpoint by adding a [Drain](/docs/drains) (available on Pro and Enterprise plans). See [Observability](/docs/connect/observability) for the full reference.

## Reference

- **[SDK Reference](/docs/connect/ts-sdk-reference)**: API reference for `@vercel/connect`, including `getToken`, `getTokenResponse`, the `ConnectTokenParams` and `ConnectTokenResponse` shapes, and the error classes.
- **[CLI Reference](/docs/cli/connect)**: Manage connectors, project links, and triggers from the terminal with `vercel connect`.

## Available connectors in beta

Vercel Connect supports two operating models, defined in the [Vercel Connect product terms](/docs/connect/legal#1.-definitions). The model determines who registers the OAuth client (or credential) with the Third Party Platform and what setup work falls to you.

### Vercel Managed Connector

Vercel registers the OAuth client with the Third Party Platform and you authorize Vercel's client to access your account or workspace. You do not register an OAuth client or manage client secrets. See [Section 3](/docs/connect/legal#3.-vercel-managed-connector) of the Vercel Connect terms.

- **Slack**: Vercel-developed Slack app, installed per workspace.
- **GitHub**: Vercel-developed GitHub app, installed per organization or user.
- **Snowflake**: Snowflake Partner Connect integration.
- **Salesforce**: Vercel-managed OAuth client against your Salesforce org.

### Customer Managed Connector

You register an OAuth client (or generate an API key) with the Third Party Platform yourself and supply the credentials at create time. Vercel stores them and exchanges tokens on your behalf at runtime. You are responsible for managing those credentials on the provider side.

- **Custom OAuth**: OAuth 2.0 / OIDC against any service URL you provide. Bring your own client ID and client secret. Supports both the authorization-code flow with PKCE (to act on behalf of a user) and the client-credentials flow (to act as your service). After creating the connector, open it in the dashboard, click **Edit**, and select the grant types you want to enable.
- **API key**: Static credential storage for providers that issue long-lived API keys. You supply the key at create time.

For providers that support it, [Vercel Assisted Setup](/docs/connect/legal#4.-vercel-assisted-setup) is a one-off helper action that performs some or all of the OAuth-client registration steps on your behalf when bootstrapping a Customer Managed Connector.

You can create either kind of connector from the dashboard or with [`vercel connect create`](/docs/cli/connect#vercel-connect-create). For a known service, the CLI prompts you for the [connection method](/docs/connect/concepts/connectors#connection-methods) and any credentials the provider needs, and opens your browser only when the provider requires you to sign in or install an app.

The capability matrix for each connector type, including which support [installations](/docs/connect/concepts/installations) and [triggers](/docs/connect/concepts/triggers), is on the [Connectors](/docs/connect/concepts/connectors#connector-types) reference page.

## Pricing

Vercel Connect is billed per token request. Hobby includes 5,000 token requests per month at no extra charge; Pro and Enterprise are $3 per 10,000 token requests. See [Pricing and Limits](/docs/connect/pricing) for the full table, how to stop being billed, and the platform limits that apply during beta.

## When to use Vercel Connect

Use Vercel Connect when you need delegated runtime credentials, when the same provider serves multiple Vercel projects or environments, or when an agent needs to act on behalf of a user. Use a [Vercel Integration](/docs/integrations) instead when you want a marketplace-managed install for a provider-billed product.

## Resources

**Quickstart**: Create your first connector and request a runtime token in four steps. [Learn more →](/docs/connect/quickstart)

**Concepts**: Understand connectors, installations, tokens, project links, triggers, and authentication. [Learn more →](/docs/connect/concepts)

**SDK Reference**: API reference for @vercel/connect: getToken, getTokenResponse, errors, and caching. [Learn more →](/docs/connect/ts-sdk-reference)

**CLI Reference**: Manage connectors, projects, and tokens with the vercel connect command. [Learn more →](/docs/cli/connect)

**Observability**: Monitor token requests, authorizations, triggers, and revocations for each connector. [Learn more →](/docs/connect/observability)

**Pricing and Limits**: Plan pricing, how to stop being billed, and platform limits during beta. [Learn more →](/docs/connect/pricing)


---

[View full sitemap](/docs/sitemap)
