---
title: Authentication
product: vercel
url: /docs/connect/concepts/authentication
canonical_url: "https://vercel.com/docs/connect/concepts/authentication"
last_updated: 2026-06-09
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
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "128d32ede9cafc81ba058df15062b4a369ce8f62294947eae84823b998148e43"
---

# Authentication

Vercel Connect sits between your code and a provider. Each token request has two legs that both have to authenticate: the caller calling Vercel Connect, and Vercel Connect calling the provider. Understanding both is the fastest way to debug "why did this token request fail."

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

That depends entirely on the connector type:

| Connector type | Flow                                                                                  |
| -------------- | ------------------------------------------------------------------------------------- |
| Slack          | Standard Slack app install per workspace; tokens issued by Slack                      |
| GitHub         | GitHub app install per organization or user; tokens issued by GitHub                  |
| Snowflake      | Snowflake Partner Connect JWT exchange                                                |
| Salesforce     | Managed OAuth flow brokered by Vercel                                                 |
| API Key        | Static credential supplied at create time; Vercel Connect attaches it                 |
| Custom OAuth   | OAuth 2.0 / OIDC authorization-code flow with PKCE against the configured service URL |

For OAuth-based connectors, Vercel Connect drives the full authorization-code flow including refresh, and stores the refresh token on Vercel's infrastructure. Your code never sees the refresh token directly; you only ever receive short-lived access tokens through `getToken`.

## Troubleshooting auth failures

The Connect API surfaces auth failures as typed errors on the SDK side. The most common cases:

| Error class                                  | Cause                                                                                                 | Fix                                                                                                                            |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `ClientNotLinkedToProjectError`              | The connector exists, but there's no [project link](/docs/connect/concepts/project-links) for the calling project. | Attach the connector in the dashboard or run `vercel connect attach`.                                                          |
| `ClientNotEnabledForEnvironmentError`        | The link exists, but the requesting environment isn't on its `environments` list.                     | Add the environment to the link (`vercel connect attach --environments`) or use a separate connector for that environment.     |
| `ConnectorInstallationRequiredError`         | No [installation](/docs/connect/concepts/installations) has consented for the requested tenant yet.   | Walk the user through the install flow, or pass an `installationId` that already exists.                                       |
| `UserAuthorizationRequiredError`             | A `user` subject was requested but that user hasn't authorized the connector.                         | Trigger the user-consent flow for that user, then retry.                                                                       |
| `ConnectorNotFoundError`                     | No Connect client is registered for the connector UID under this team.                                | Create the connector (`vercel connect`) before requesting a token.                                                             |

See the [SDK Reference](/docs/connect/ts-sdk-reference#errors) for the full error class list.

## Recommendations

- **One connector per environment** for sensitive integrations. Production has its own connector and its own grant; preview and development each have their own. A token compromised in one environment cannot be replayed against another.
- **Scope every token request.** Pass `scopes`, `resources`, or `authorizationDetails` to narrow what a token can do; don't request a tenant-wide token when you need to read one channel.
- **Prefer OIDC over access tokens.** OIDC tokens are short-lived, project-bound, and rotated automatically. Reserve `vercelToken` for environments where OIDC isn't an option.
- **Refresh `vercel env pull` regularly during local development.** The OIDC token expires after about 12 hours. If `getToken` starts failing with auth errors after a long break, pull a fresh token before debugging further.

## Next steps

- [Project links](/docs/connect/concepts/project-links): How the OIDC token is checked.
- [Tokens](/docs/connect/concepts/tokens): How a token request is shaped.
- [SDK Reference](/docs/connect/ts-sdk-reference): `ConnectOptions.vercelToken` and the error classes thrown on auth failures.


---

[View full sitemap](/docs/sitemap)
