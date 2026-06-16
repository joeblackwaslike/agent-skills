---
title: Vercel Connect Concepts
product: vercel
url: /docs/connect/concepts
canonical_url: "https://vercel.com/docs/connect/concepts"
last_updated: 2026-06-03
type: conceptual
prerequisites:
  - /docs/connect
related:
  - /docs/connect/concepts/connectors
  - /docs/connect/concepts/installations
  - /docs/connect/concepts/tokens
  - /docs/connect/concepts/project-links
  - /docs/connect/concepts/triggers
summary: "Understand the core building blocks of Vercel Connect: connectors, installations, tokens, project links, triggers, and authentication."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/concepts.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "47247c1f1707d5ac85442c7b35cbcbd913da4d12a53592616eb90e92d500c72c"
---

# Vercel Connect Concepts

Vercel Connect is built around six primitives. Read these in order if you want a top-down picture; jump to a single page if you're debugging a specific behavior.

- [Connectors](/docs/connect/concepts/connectors): The team-owned record that represents one third-party service (Slack, GitHub, Snowflake, Salesforce, an API-key service, or a Custom OAuth provider).
- [Installations](/docs/connect/concepts/installations): How one connector serves many tenants. One Slack connector, for example, can serve many workspaces.
- [Tokens](/docs/connect/concepts/tokens): The short-lived credentials your code requests from Vercel Connect. Covers subject types, scopes, `resources`, `authorizationDetails`, refresh, and revocation.
- [Project links](/docs/connect/concepts/project-links): How a connector is bound to one or more Vercel projects and which environments can request tokens.
- [Triggers](/docs/connect/concepts/triggers): Incoming webhooks from third-party services, verified by Vercel Connect and forwarded to your projects.
- [Authentication](/docs/connect/concepts/authentication): The two auth axes, namely who is calling Vercel Connect and how Vercel Connect proves identity to the provider.

## How the pieces fit together

A team creates a **connector** for a provider. That connector accepts **installations** from individual tenants (workspaces, organizations). The team **links** the connector to one or more Vercel **projects**, scoped to specific environments. At runtime, a deployment in a linked project requests a **token** from Vercel Connect; the token represents an authorized identity at the provider and is scoped by the parameters of the request. Some providers also push **triggers** (webhooks) back into Vercel Connect, which forwards them to the connector's registered destinations.

## Next steps

- [Quickstart](/docs/connect/quickstart): Build the four pieces end to end in under ten minutes.
- [SDK Reference](/docs/connect/ts-sdk-reference): API reference for `@vercel/connect`.
- [CLI Reference](/docs/cli/connect): API reference for `vercel connect`.


---

[View full sitemap](/docs/sitemap)
