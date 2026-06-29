---
title: Connectors
product: vercel
url: /docs/connect/concepts/connectors
canonical_url: "https://vercel.com/docs/connect/concepts/connectors"
last_updated: 2026-06-09
type: conceptual
prerequisites:
  - /docs/connect/concepts
  - /docs/connect
related:
  - /docs/cli/connect
  - /docs/connect/concepts/installations
  - /docs/connect/concepts/project-links
  - /docs/connect/quickstart
summary: A connector is the team-owned record that represents one third-party service. Its type determines which capabilities are available.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/concepts/connectors.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "ea73701bedaa609b448dbfa8e8c29089e282122e2be9fd83a8d8a1755c426ee9"
---

# Connectors

A **connector** is the team-owned record that represents one third-party service inside Vercel Connect. Each connector has a type that determines how Vercel Connect authenticates to the provider and which capabilities (installations, triggers, revocation) are available.

## Identifiers

Each connector has four identifiers:

- **`uid`**: a stable, human-readable string that you choose at create time and use everywhere else (in `getToken`, in CLI commands, in the dashboard URL). Example: `slack/acme-slack` or `oauth/linear`.
- **`id`**: an opaque internal identifier that Vercel Connect uses in API responses. You rarely use it directly.
- **`type`**: the connector type. Determines the auth flow and the available capabilities (`slack`, `github`, `oauth`, `snowflake`, `salesforce`, `api-key`, `custom`).
- **`service`**: the specific provider the connector targets. For built-in types this matches the type (`slack`, `github`). For typed-but-generic connectors like Custom OAuth, this is the service URL or name. Example: `type: 'oauth'`, `service: 'mcp.linear.app'`.

When you call `getToken('slack/acme-slack', ...)`, the string `slack/acme-slack` is the connector's `uid`.

## Connector types

| Type         | Auth model                                                                              | Multi-tenant installations | Triggers |
| ------------ | --------------------------------------------------------------------------------------- | -------------------------- | -------- |
| Slack        | Slack app install (per workspace)                                                       | yes                        | yes      |
| GitHub       | GitHub app install (per org or user)                                                    | yes                        | no       |
| Snowflake    | Snowflake Partner Connect JWT                                                           | no                         | no       |
| Salesforce   | Managed OAuth flow                                                                      | no                         | no       |
| API Key      | Static credential supplied at create time                                               | no                         | no       |
| Custom OAuth | OAuth 2.0 / OIDC authorization-code flow with PKCE against any URL-identified service   | no                         | no       |

The capability matrix above is the current beta set and may change. Connector types may be added or removed without notice. New types are added behind feature flags; check the dashboard for what's available to your team.

## Branding

A connector carries a name, an icon, and accent and background colors. Slack propagates the icon to the workspace. Other providers may display branding on their login and consent screens, or only inside the Vercel dashboard.

## Lifecycle

Connectors are created, updated, and deleted by team members through the dashboard or the [`vercel connect`](/docs/cli/connect) CLI. A connector has no time-to-live: unless you delete it, it lives indefinitely. Deletion is soft by default; a deleted connector cannot serve new token requests, and you can permanently remove it with `vercel connect remove --disconnect-all`.

## Next steps

- [Installations](/docs/connect/concepts/installations): How one connector serves many tenants.
- [Project links](/docs/connect/concepts/project-links): How a connector is bound to projects and environments.
- [Quickstart](/docs/connect/quickstart): Create your first connector end to end.


---

[View full sitemap](/docs/sitemap)
