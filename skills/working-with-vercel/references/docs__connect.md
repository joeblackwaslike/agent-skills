---
title: Vercel Connect
product: vercel
url: /docs/connect
canonical_url: "https://vercel.com/docs/connect"
last_updated: 2026-06-22
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
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "6699c145fa7cc1643ba110a00ae95168f034980579325635c973d79b3a989ac7"
---

# Vercel Connect

> **🔒 Permissions Required**: Vercel Connect

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
- **Custom OAuth**: Managed OAuth against the service's URL, on behalf of the installing user.
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

- **Custom OAuth**: OAuth 2.0 / OIDC authorization-code flow with PKCE against any service URL you provide. Bring your own client ID and client secret.
- **API key**: Static credential storage for providers that issue long-lived API keys. You supply the key at create time.

For providers that support it, [Vercel Assisted Setup](/docs/connect/legal#4.-vercel-assisted-setup) is a one-off helper action that performs some or all of the OAuth-client registration steps on your behalf when bootstrapping a Customer Managed Connector.

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

**Pricing and Limits**: Plan pricing, how to stop being billed, and platform limits during beta. [Learn more →](/docs/connect/pricing)


---

[View full sitemap](/docs/sitemap)
