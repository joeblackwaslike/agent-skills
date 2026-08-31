---
title: Authentication
product: vercel
url: /docs/connect/concepts/authentication
canonical_url: "https://vercel.com/docs/connect/concepts/authentication"
last_updated: 2026-08-20
type: conceptual
prerequisites:
  - /docs/connect/concepts
  - /docs/connect
related:
  - /docs/oidc
  - /docs/connect/concepts/project-links
  - /docs/rest-api
  - /docs/connect/ts-sdk-reference
  - /docs/connect/concepts/installations
summary: "Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and Vercel Connect calling the..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/concepts/authentication.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "e80d21847acbe380941fe9d78a1340661bca9e6648a0b55da7540a88e5326fc1"
---

# Authentication

Vercel Connect sits between your code and a provider. Each token request has two legs that both have to authenticate: the caller calling Vercel Connect, and Vercel Connect calling the provider. Understanding both is the fastest way to debug "why did this token request fail."


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Connect](https://vercel.com/kb/guide/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Microsoft, Discord, Snowflake, and Salesforce from
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [The end of credential sprawl for agents](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related)
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related)
- [Introducing Vercel Connect](https://vercel.com/blog/introducing-vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related)
- [For Service Providers](https://vercel.com/docs/connect/providers?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — What your service needs to declare so Vercel Connect can discover, register, and authorize against it using standard OAu
- [Auth.js](https://vercel.com/docs/connect/frameworks/authjs?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Add a Vercel Connect OAuth provider to Auth.js in a Next.js App Router application.
- [Connectors](https://vercel.com/docs/connect/concepts/connectors?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — A connector is the team-owned record that represents one third-party service. Its type determines which capabilities are
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [AI SDK and MCP](https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.

Full cross-link map for this page: [/docs/connect/concepts/authentication.graph.md](/docs/connect/concepts/authentication.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Caller to Vercel Connect

How does Vercel Connect know who's calling? The `@vercel/connect` SDK supports two authentication methods, plus a separate path for dashboard and CLI users.

### Vercel OIDC token (recommended)

A running Vercel deployment authenticates with its [OIDC token](/docs/oidc). The token's claims identify the team, project, and environment the deployment belongs to. Vercel Connect checks those claims against the [project links](/docs/connect/concepts/project-links) on the requested connector. If there's no link for the calling project, or the link doesn't include the calling environment, the request is rejected with `ClientNotLinkedToProjectError` or `ClientNotEnabledForEnvironmentError`.

On Vercel, the SDK reads `VERCEL_OIDC_TOKEN` from the environment automatically. For local development, run `vercel link` followed by `vercel env pull` to download a development token into `.env.local`. The token expires after about 12 hours; re-run `vercel env pull` if you see authentication errors.

### Access token

For external CI/CD or non-Vercel environments where `VERCEL_OIDC_TOKEN` isn't available, pass a [Vercel access token](/docs/rest-api#creating-an-access-token) directly to the SDK via `options.vercelToken`:

```ts filename="app/lib/explicit-token.ts"
import { getToken } from '@vercel/connect';

const token = await getToken(
  'slack/acme-slack',
  { subject: { type: 'app' } },
  { vercelToken: process.env.VERCEL_TOKEN },
);
```

The token's team and project scope determine which connectors it can request from, in the same way an OIDC token's claims would. Make sure the project on the token is linked to the connector you're calling.

### Dashboard and CLI users

Dashboard requests and `vercel connect` CLI requests authenticate with your Vercel session token. RBAC roles on the team determine what you can do: viewing a connector, mutating it, attaching it to a project, and revoking tokens are all separately permissioned.

### Choosing an authentication method

| Where your code runs                                  | Use                                |
| ----------------------------------------------------- | ---------------------------------- |
| Vercel deployment (production, preview, development)  | OIDC token (automatic)             |
| Local development with `vercel link`                  | OIDC token via `vercel env pull`   |
| External CI/CD (GitHub Actions, CircleCI, and so on)  | Access token via `vercelToken`     |
| Non-Vercel hosting                                    | Access token via `vercelToken`     |

### What's on the wire

Every token request is a `POST` to `https://api.vercel.com/v1/connect/token/:connector` with a Bearer header and a JSON body that mirrors [`ConnectTokenParams`](/docs/connect/ts-sdk-reference#connecttokenparams). The connector `uid` is a single URL-encoded path segment, so a `uid` like `slack/acme-slack` becomes `slack%2Facme-slack` on the wire:

```http
POST /v1/connect/token/slack%2Facme-slack HTTP/1.1
Host: api.vercel.com
Authorization: Bearer <OIDC token | access token>
Content-Type: application/json

{
  "subject": { "type": "user", "id": "user_123" },
  "installationId": "inst_abc",
  "scopes": ["chat:write"]
}
```

The Connect API treats both token types the same for project-link enforcement, RBAC, and the per-connector provider flow. One important difference: an access token can only request subjects it represents (`{ type: 'app' }`, or its own user). Requesting `{ type: 'user', id: '<someone_else>' }` for a different user requires an OIDC token, which represents the project rather than any single user.

## Vercel Connect to the provider

Once Vercel Connect has authorized the caller, how does it prove identity to the provider?

That depends on the connector type or connection method:

| Connector type or method | Flow |
| --- | --- |
| Slack | Standard Slack app install per workspace; tokens issued by Slack |
| Discord | Discord bot token or OAuth 2.0 user authorization; tokens issued by Discord |
| GitHub | GitHub app install per organization or user; tokens issued by GitHub |
| Linear | Linear app install per workspace; tokens issued by Linear |
| Microsoft | Microsoft Entra app registered in your tenant; Entra issues delegated or app-only tokens |
| Photon | Photon project credentials supplied at create time; Vercel Connect attaches them |
| Snowflake | Snowflake Partner Connect OAuth or Workload Identity Federation |
| Salesforce | Managed OAuth flow brokered by Vercel |
| MCP | OAuth / OIDC discovered from the MCP server's metadata |
| API key | Static credential supplied at create time; Vercel Connect attaches it |
| Custom OAuth | OAuth / OIDC against the configured service URL; authorization-code flow with PKCE and/or client-credentials flow |

[Browse all connectors](/connect/browse) to see the authentication options and setup instructions available for each service.

For OAuth-based connectors, Vercel Connect drives the full authorization-code flow including refresh, and stores the refresh token on Vercel's infrastructure. Your code never sees the refresh token directly; you only ever receive short-lived access tokens through `getToken`.

Custom OAuth connectors also support the **client-credentials** grant, where Vercel Connect authenticates as your service (rather than on behalf of a user) and exchanges the client ID and secret directly for an access token. After creating the connector, open it in the dashboard, click **Edit**, and select which grant types to enable. Use the authorization-code flow for `user` subjects and the client-credentials flow for `app` subjects.

## Troubleshooting auth failures

The Connect API surfaces auth failures as typed errors on the SDK side. The most common cases:

| Error class                                  | Cause                                                                                                 | Fix                                                                                                                            |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `ClientNotLinkedToProjectError`              | The connector exists, but there's no [project link](/docs/connect/concepts/project-links) for the calling project. | Attach the connector in the dashboard or run `vercel connect attach`.                                                          |
| `ClientNotEnabledForEnvironmentError`        | The link exists, but the requesting environment isn't on its `environments` list.                     | Add the environment to the link (`vercel connect attach <connector> --environment <environment>`) or use a separate connector for that environment. |
| `ConnectorInstallationRequiredError`         | No [installation](/docs/connect/concepts/installations) has consented for the requested tenant yet.   | Walk the user through the install flow, or pass an `installationId` that already exists.                                       |
| `UserAuthorizationRequiredError`             | A `user` subject was requested but that user hasn't authorized the connector.                         | Trigger the user-consent flow for that user, then retry.                                                                       |
| `ConnectorNotFoundError`                     | No Connect client is registered for the connector UID under this team.                                | Create the connector (`vercel connect`) before requesting a token.                                                             |

See the [SDK Reference](/docs/connect/ts-sdk-reference#errors) for the full error class list.

## Recommendations

- **Use separate connectors when environments need provider-level isolation.** A project link controls which deployments can request tokens from a connector; it does not assign a provider [installation](/docs/connect/concepts/installations) to each environment. For example, if Production and a `qa` Custom Environment are enabled on the same Slack connector, code in either environment can request a token for the connector's default Slack workspace installation or for an explicit `installationId`. To prevent either environment from reaching the other's provider installations, create and install a connector for each environment, then link each environment only to its own connector.
- **Scope every token request.** Pass `scopes`, `resources`, or `authorizationDetails` to narrow what a token can do; don't request a tenant-wide token when you need to read one channel.
- **Prefer OIDC over access tokens.** OIDC tokens are short-lived, project-bound, and rotated automatically. Reserve `vercelToken` for environments where OIDC isn't an option.
- **Refresh `vercel env pull` regularly during local development.** The OIDC token expires after about 12 hours. If `getToken` starts failing with auth errors after a long break, pull a fresh token before debugging further.

## Next steps

- [Project links](/docs/connect/concepts/project-links): How the OIDC token is checked.
- [Tokens](/docs/connect/concepts/tokens): How a token request is shaped.
- [SDK Reference](/docs/connect/ts-sdk-reference): `ConnectOptions.vercelToken` and the error classes thrown on auth failures.


---

[View full sitemap](/docs/sitemap)
