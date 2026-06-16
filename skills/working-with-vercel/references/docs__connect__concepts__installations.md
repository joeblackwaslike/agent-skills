---
title: Installations
product: vercel
url: /docs/connect/concepts/installations
canonical_url: "https://vercel.com/docs/connect/concepts/installations"
last_updated: 2026-06-03
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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "11d53420d1dfa09a9f2d93cff2148f1320b9a5a16df0a156d3853f93b24340bb"
---

# Installations

A single connector represents your **integration** with a provider. An **installation** represents a single tenant within that integration: one Slack workspace, one GitHub organization, one Salesforce org. One connector can have many installations, each with its own authorization grant.

Not every connector type supports installations. Snowflake, Salesforce, API Key, and Custom OAuth connectors are single-tenant: they have one (implicit) installation. Slack and GitHub are multi-tenant and support an unbounded set of installations.

## The install flow

A user installs a connector by running an install flow specific to the provider. For Slack, that's the standard Slack workspace install. For GitHub, it's a GitHub app installation. The flow ends with the user redirected back to your application, and Vercel Connect records the installation against the connector.

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
