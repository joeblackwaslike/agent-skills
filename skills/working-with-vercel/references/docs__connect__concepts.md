---
title: Vercel Connect Concepts
product: vercel
url: /docs/connect/concepts
canonical_url: "https://vercel.com/docs/connect/concepts"
last_updated: 2026-06-09
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "316879e321e9e15bb36d7b28d45afad350846e49e1ab70b955714ffb5debb26f"
---

# Vercel Connect Concepts

Vercel Connect is built around six primitives. Read these in order if you want a top-down picture; jump to a single page if you're debugging a specific behavior.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a GitHub agent with eve and GitHub Tools](https://vercel.com/kb/guide/github-agent-eve?from=related) — Build a GitHub agent with eve, GitHub Tools, and Vercel Connect. Register AI-callable GitHub tools, gate writes behind d
- [Build an integrations hub with Nuxt and Vercel Connect](https://vercel.com/kb/guide/nuxt-and-vercel-connect?from=related) — Build an Integrations Hub with Nuxt and Vercel Connect. Connect GitHub and Linear over OAuth and mint short-lived tokens
- [Give your agents secure access to third-party APIs](https://vercel.com/kb/guide/vercel-connect?from=related) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Discord, Notion, Figma, Snowflake, and Salesforce f
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Fundamental Concepts](https://vercel.com/docs/fundamentals?from=related) — Learn about the core concepts of Vercel
- [Legal](https://vercel.com/docs/connect/legal?from=related) — Product terms governing your use of Vercel Connect, including Customer Managed Connectors, Vercel Managed Connectors, an

Full cross-link map for this page: [/docs/connect/concepts.graph.md](/docs/connect/concepts.graph.md)
<!-- /docsgraph:related -->

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
