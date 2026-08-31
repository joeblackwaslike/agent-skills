---
title: Installations
product: vercel
url: /docs/connect/concepts/installations
canonical_url: "https://vercel.com/docs/connect/concepts/installations"
last_updated: 2026-08-19
type: conceptual
prerequisites:
  - /docs/connect/concepts
  - /docs/connect
related:
  - /docs/connect/concepts/connectors
  - /docs/connect/concepts/tokens
  - /docs/connect/ts-sdk-reference
summary: Installations let one connector serve many tenants. One Slack connector, for example, can serve many Slack workspaces, each with its own grant.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/concepts/installations.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "ff5f336386062c565d9aba432065109968597ac8bed11f0fed4f37581f9b6b6d"
---

# Installations

A single connector represents your **integration** with a provider. An **installation** represents a single tenant within that integration, where a tenant is an account on the provider's side: one Slack workspace, one GitHub organization, one Microsoft Entra directory, one Salesforce org. One connector can have many installations, each with its own authorization grant.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Connect](https://vercel.com/kb/guide/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Finstallations&source_site=vercel-docs&relationship=related) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Microsoft, Discord, Snowflake, and Salesforce from
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Finstallations&source_site=vercel-docs&relationship=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Introducing Vercel Connect](https://vercel.com/blog/introducing-vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Finstallations&source_site=vercel-docs&relationship=related)
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Finstallations&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Authentication](https://vercel.com/docs/connect/concepts/authentication?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Finstallations&source_site=vercel-docs&relationship=related) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V
- [Quickstart](https://vercel.com/docs/connect/quickstart?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Finstallations&source_site=vercel-docs&relationship=related) — Create your first connector in Vercel Connect, install the SDK, and request a runtime provider token from your code.
- [Chat SDK](https://vercel.com/docs/connect/frameworks/chat-sdk?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Finstallations&source_site=vercel-docs&relationship=related) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, GitHub, Linear, Notion,
- [Update Installation](https://vercel.com/docs/rest-api/marketplace/update-installation?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Finstallations&source_site=vercel-docs&relationship=related) — PATCH /v1/installations/{integrationConfigurationId} — This endpoint updates an integration installation.

Full cross-link map for this page: [/docs/connect/concepts/installations.graph.md](/docs/connect/concepts/installations.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Finstallations&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Not every connector type supports installations. Snowflake, Salesforce, API Key, and Custom OAuth connectors reach exactly one account, so there's nothing to install and no `installationId` to pass. Slack, GitHub, and Linear can each serve any number of tenants: one Slack connector can hold an installation for every workspace your app is added to. For Microsoft, an installation is a tenant that granted the connector's Entra app admin consent.

Updating a connector's permissions doesn't change tokens already granted. New delegated scopes reach a user only after they authorize again. New application permissions need a fresh installation.

## The install flow

A user installs a connector by running an install flow specific to the provider. For Slack, that's the standard Slack workspace install. For GitHub, it's a GitHub app installation. For Microsoft, it's tenant-wide admin consent from a tenant administrator. The flow ends with the user redirected back to your application, and Vercel Connect records the installation against the connector.

Each installation has a stable `installationId` that you pass to `getToken` to scope a token request to that tenant:

```ts filename="app/lib/post.ts"
import { getToken } from '@vercel/connect';

const token = await getToken('slack/acme-slack', {
  subject: { type: 'app' },
  installationId: 'inst_workspace_xyz',
  scopes: ['chat:write'],
});
```

If you omit `installationId`, Vercel Connect uses the default installation for the connector (when the type supports a default). If no default is set, the token request fails with `ConnectorInstallationRequiredError`.

## Cross-installation tokens

For connector types that support it, pass `installationId: '*'` to request a token that's valid across all installations of the connector. This is useful for service-level operations that aren't bound to a single tenant, like listing webhooks across every workspace your app is installed in.

Cross-installation tokens are subject to the connector's capability matrix. Most provider APIs scope credentials to a single tenant, so `'*'` only works where the provider exposes a tenant-spanning credential.

## Lifecycle

Installations are added when a user completes the install flow and removed when a user uninstalls (from the provider side) or when an admin deletes the installation in the Vercel dashboard. Removing an installation revokes its tokens.

## Errors

If your code calls `getToken` for a connector type that requires an installation but no installation exists (or the requested `installationId` doesn't match), the SDK throws `ConnectorInstallationRequiredError`. Treat this as a recoverable user-facing state: surface a "connect your workspace" UI rather than a 500.

## Next steps

- [Connectors](/docs/connect/concepts/connectors): The parent record that an installation belongs to.
- [Tokens](/docs/connect/concepts/tokens): How a token request is scoped (subject, installation, scopes, resources).
- [SDK Reference](/docs/connect/ts-sdk-reference): `getToken` parameters and errors.


---

[View full sitemap](/docs/sitemap)
