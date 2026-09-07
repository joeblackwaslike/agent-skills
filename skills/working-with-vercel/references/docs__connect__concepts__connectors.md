---
title: Connectors
product: vercel
url: /docs/connect/concepts/connectors
canonical_url: "https://vercel.com/docs/connect/concepts/connectors"
last_updated: 2026-08-28
type: conceptual
prerequisites:
  - /docs/connect/concepts
  - /docs/connect
related:
  - /docs/connect
  - /docs/connect/legal
  - /docs/cli/connect
  - /docs/connect/concepts/installations
  - /docs/connect/concepts/project-links
summary: A connector is the team-owned record that represents one third-party service. Its type determines which capabilities are available.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/concepts/connectors.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "d8422ce5c93a7df17dd79359764203cc073e5d686e78921d1306474c3d331964"
---

# Connectors

A **connector** is the team-owned record that represents one third-party service inside Vercel Connect. Each connector has a type that determines how Vercel Connect authenticates to the provider and which capabilities (installations, triggers, revocation) are available.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect now supports Linq](https://vercel.com/changelog/vercel-connect-now-supports-linq?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fconnectors&source_site=vercel-docs&relationship=related)
- [Vercel Connect adds 100+ preset connectors](https://vercel.com/changelog/vercel-connect-preset-connectors?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fconnectors&source_site=vercel-docs&relationship=related)
- [Vercel Connect now supports Microsoft](https://vercel.com/changelog/vercel-connect-supports-microsoft?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fconnectors&source_site=vercel-docs&relationship=related)
- [Vercel Connect](https://v0.app/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fconnectors&source_site=vercel-docs&relationship=related) — Connect your v0 apps and agents to third-party services – no API keys required.
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fconnectors&source_site=vercel-docs&relationship=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fconnectors&source_site=vercel-docs&relationship=related)
- [Get a connector project connection](https://vercel.com/docs/rest-api/connect/get-a-connector-project-connection?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fconnectors&source_site=vercel-docs&relationship=related) — GET /v1/connect/connectors/{connector}/projects/{projectId} — Get the configuration that connects a connector to a proje
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fconnectors&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [List connectors for a project](https://vercel.com/docs/rest-api/connect/list-connectors-for-a-project?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fconnectors&source_site=vercel-docs&relationship=related) — GET /v2/connect/projects/{projectId}/connectors — List the connectors connected to a project and the environments where
- [Delete a connector](https://vercel.com/docs/rest-api/connect/delete-a-connector?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fconnectors&source_site=vercel-docs&relationship=related) — DELETE /v1/connect/connectors/{connector} — Delete a connector, its project connections, and its installation records.
- [List connectors](https://vercel.com/docs/rest-api/connect/list-connectors?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fconnectors&source_site=vercel-docs&relationship=related) — GET /v2/connect/connectors — List connectors that belong to a team.

Full cross-link map for this page: [/docs/connect/concepts/connectors.graph.md](/docs/connect/concepts/connectors.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fconnectors&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Identifiers

Each connector has four identifiers:

- **`uid`**: a stable, human-readable string that you choose at create time and use everywhere else (in `getToken`, in CLI commands, in the dashboard URL). Example: `slack/acme-slack` or `oauth/linear`.
- **`id`**: an opaque internal identifier that Vercel Connect uses in API responses. You rarely use it directly.
- **`service`**: the third-party service the connector reaches, independent of `type`. For most services this is a name, such as `slack` or `microsoft`. Custom OAuth connectors identify the service by its URL instead, such as `mcp.linear.app`.
- **`type`**: how Vercel Connect authenticates to that service. Determines the auth flow and the available capabilities. Examples: `slack`, `github`, `microsoft-entra`, `oauth`, `api-key`.

When you call `getToken('slack/acme-slack', ...)`, the string `slack/acme-slack` is the connector's `uid`.

## Available connectors

[Browse the connector catalog](/connect/browse) for current services and connection methods. Each connector page includes authentication options, trigger support, and setup instructions.

## Setting up a custom OAuth connector

For [Vercel Managed Connectors](/docs/connect#connector-ownership-models), Vercel registers the OAuth app. For other providers, create a **Custom OAuth** connector. Vercel can help with the following setup tasks:

- **Discover endpoints from a URL**: Enter a server URL, such as `mcp.linear.app`, and Vercel reads the provider's published OAuth metadata to fill in the authorization and token endpoints.
- **Bring your own client**: Add the client ID and client secret from the OAuth app you registered with the provider.
- **Let Vercel register the client**: When a provider supports automatic client registration, [Vercel Assisted Setup](/docs/connect/legal#4.-vercel-assisted-setup) creates the OAuth client for you, so you don't need to register an app or manage a client secret.

## Connection methods

Vercel already knows how to connect to many services. When you create a connector, search for the service by name. For a **known service**, Vercel fills in what it knows and you only supply what is specific to your account:

- **OAuth**: Vercel fills in the authorization and token endpoints and the provider's default scopes. You add your client ID and secret, or let [Vercel Assisted Setup](/docs/connect/legal#4.-vercel-assisted-setup) register the client where the provider supports it.
- **API key**: Vercel links you to where the provider issues keys. Generate the key there, then paste it into the connector when you create it.

A known service publishes one or more **connection methods**: the distinct ways you can connect to it. When a service publishes several, they differ in who registers the application (Vercel, through [Vercel Assisted Setup](/docs/connect/legal#4.-vercel-assisted-setup), or you) and in which product you connect to, such as a REST API or an MCP server.

Known services work in the dashboard and from the CLI. Running [`vercel connect create <service>`](/docs/cli/connect#vercel-connect-create) prompts you for the product, the connection method, and the credentials that method needs, so you can create a connector without leaving the terminal. Run `vercel connect create <service> --help` to see what a service supports.

## Branding

A connector carries a name, an icon, and accent and background colors. Slack propagates the icon to the workspace. Other providers may display branding on their login and consent screens, or only inside the Vercel dashboard.

## Lifecycle

Connectors are created, updated, and deleted by team members through the dashboard or the [`vercel connect`](/docs/cli/connect) CLI. A connector has no time-to-live: unless you delete it, it lives indefinitely. Deletion is soft by default; a deleted connector cannot serve new token requests, and you can permanently remove it with `vercel connect remove --disconnect-all`.

## Next steps

- [Installations](/docs/connect/concepts/installations): How one connector serves many tenants.
- [Project links](/docs/connect/concepts/project-links): How a connector is bound to projects and environments.
- [Quickstart](/docs/connect/quickstart): Create your first connector end to end.
- [For Service Providers](/docs/connect/providers): What a service needs to support for Vercel to discover and register a client automatically. Read this if you own a service you want Vercel teams to connect to.


---

[View full sitemap](/docs/sitemap)
