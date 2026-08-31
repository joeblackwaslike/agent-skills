---
title: Vercel Connect Concepts
product: vercel
url: /docs/connect/concepts
canonical_url: "https://vercel.com/docs/connect/concepts"
last_updated: 2026-08-20
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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "382977c490613af127c372fcf85409a94a5260466b029230c2e0ea2004dcf2a3"
---

# Vercel Connect Concepts

Vercel Connect is built around six primitives. Read these in order if you want a top-down picture; jump to a single page if you're debugging a specific behavior.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a GitHub agent with eve and GitHub Tools](https://vercel.com/kb/guide/github-agent-eve?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts&source_site=vercel-docs&relationship=related) — Build a GitHub agent with eve, GitHub Tools, and Vercel Connect. Register AI-callable GitHub tools, gate writes behind d
- [Build an integrations hub with Nuxt and Vercel Connect](https://vercel.com/kb/guide/nuxt-and-vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts&source_site=vercel-docs&relationship=related) — Build an Integrations Hub with Nuxt and Vercel Connect. Connect GitHub and Linear over OAuth and mint short-lived tokens
- [Vercel Connect](https://v0.app/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts&source_site=vercel-docs&relationship=related) — Connect your v0 apps and agents to third-party services – no API keys required.
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts&source_site=vercel-docs&relationship=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [For Service Providers](https://vercel.com/docs/connect/providers?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts&source_site=vercel-docs&relationship=related) — What your service needs to declare so Vercel Connect can discover, register, and authorize against it using standard OAu
- [Vercel KMS Concepts](https://vercel.com/docs/kms/concepts?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts&source_site=vercel-docs&relationship=related) — Understand how Vercel KMS rotates signing keys and how it authorizes signing, management, and verification.
- [Vercel fundamental concepts](https://vercel.com/docs/fundamentals?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts&source_site=vercel-docs&relationship=related) — Learn about the core concepts of Vercel
- [Frameworks and Adapters](https://vercel.com/docs/connect/frameworks?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts&source_site=vercel-docs&relationship=related) — Use Vercel Connect with AI SDK, MCP clients, eve, Chat SDK, Better Auth, and Auth.js.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/connect/concepts.graph.md](/docs/connect/concepts.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- [Connectors](/docs/connect/concepts/connectors): The team-owned record that represents one third-party service. Browse the [connector catalog](/connect/browse) to see the available services.
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
