---
title: Tokens
product: vercel
url: /docs/connect/concepts/tokens
canonical_url: "https://vercel.com/docs/connect/concepts/tokens"
last_updated: 2026-06-09
type: conceptual
prerequisites:
  - /docs/connect/concepts
  - /docs/connect
related:
  - /docs/connect/ts-sdk-reference
  - /docs/cli/connect
  - /docs/connect/concepts/project-links
  - /docs/connect/concepts/triggers
summary: Short-lived provider credentials issued by Vercel Connect. Each token request specifies a subject, optional installation, scopes, and...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/concepts/tokens.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d64e4e72196697ab6637cf2cb18c49e3d72353a1196de6aa7ee4914f5aee1386"
---

# Tokens

A token is a short-lived credential that Vercel Connect issues against a provider on your behalf. Every token is the result of a single `getToken` call (SDK) or `vercel connect token` invocation (CLI). Tokens are cached in-process and refreshed automatically as they approach expiry.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Give your agents secure access to third-party APIs](https://vercel.com/kb/guide/vercel-connect?from=related) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Discord, Notion, Figma, Snowflake, and Salesforce f
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Authentication](https://vercel.com/docs/connect/concepts/authentication?from=related) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V
- [Get a Connect token](https://vercel.com/docs/rest-api/connect/get-a-connect-token?from=related)
- [Quickstart](https://vercel.com/docs/connect/quickstart?from=related) — Create your first connector in Vercel Connect, install the SDK, and request a runtime provider token from your code.
- [Import Connect tokens](https://vercel.com/docs/rest-api/connect/import-connect-tokens?from=related)
- [Tokens](https://vercel.com/docs/sign-in-with-vercel/tokens?from=related) — Learn how to Sign in with Vercel

Full cross-link map for this page: [/docs/connect/concepts/tokens.graph.md](/docs/connect/concepts/tokens.graph.md)
<!-- /docsgraph:related -->

## Anatomy of a token request

A token request has four parts:

```ts filename="app/lib/post.ts"
import { getToken } from '@vercel/connect';

const token = await getToken('slack/acme-slack', {
  subject: { type: 'app' },
  installationId: 'inst_workspace_xyz',
  scopes: ['chat:write'],
});
```

- **Connector** (`'slack/acme-slack'`): the connector `uid` to request from.
- **Subject** (`{ type: 'app' }` or `{ type: 'user', id: '...' }`): who the token represents. App tokens act as the service. User tokens act as a specific user. See [Subject types](#subject-types).
- **Installation** (`installationId`): which tenant within the connector. Omit for single-tenant connectors; pass `'*'` for a cross-installation token when the connector supports it.
- **Provider options** (`scopes`, `resources`, `authorizationDetails`, `audience`): per-provider request shaping. See [Scoping a token](#scoping-a-token).

## Subject types

| Subject                                          | Acts as                 | Use when                                                                                                                            |
| ------------------------------------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `{ type: 'app' }`                                | Your application or bot | Service-level operations: posting from a bot account, calling a tenant-wide admin API.                                              |
| `{ type: 'user', id: 'user_…' }`                 | A specific user         | Delegated operations: posting as the user, opening a PR with their name on it, querying their data.                                 |
| `{ type: 'jwt-bearer', sub: 'user@example.com' }` | A federated subject     | Federated identity: exchange a trusted external JWT (from your own IDP, workload identity, etc.) for a provider token.              |

For `jwt-bearer`, you can pass optional `iss` and `aud` claims to override the connector's OAuth client id and token endpoint, and `additionalClaims` to carry any extra fields the provider requires. See [SDK Reference](/docs/connect/ts-sdk-reference#types) for the full signature.

## Scoping a token

Vercel Connect forwards three optional fields to the provider so you can narrow what a token can do:

- **`scopes`**: the provider's own scope strings (`chat:write`, `repo:read`, etc.). Required by most OAuth providers.
- **`resources`**: resource indicators, when the provider uses them. Useful for narrowing a token to one channel, one repo, or one record set.
- **`authorizationDetails`**: rich authorization requests, when the provider supports them.

`scopes` and `installationId` are also available through the [`vercel connect`](/docs/cli/connect) CLI. `resources` and `authorizationDetails` are SDK-only.

## Caching and refresh

The SDK keeps an in-process LRU cache (100 entries) keyed by the connector and request parameters. A cached token is reused on subsequent calls until it falls within the `validityBufferMs` window (default 30 seconds), at which point the next `getToken` call fetches a fresh one. You can override the buffer per call.

```ts filename="app/lib/refresh.ts"
const token = await getToken('slack/acme-slack', {
  subject: { type: 'app' },
  validityBufferMs: 60_000,
});
```

Vercel Connect drives the provider's refresh flow automatically using the refresh token stored at install time. Your code never needs to handle refresh.

## Revocation

Revoking a token tells the provider to invalidate it at the source. Whether revocation actually invalidates the token depends on the provider. If the provider exposes a revocation endpoint, Vercel Connect calls it. If not, Vercel Connect marks the token for deletion in its own store, but the underlying provider credential may continue to work until it expires naturally.

You can revoke from the dashboard, from the CLI (`vercel connect token revoke …`), or programmatically through the REST API.

## Errors

Token requests can fail with structured errors:

- `UserAuthorizationRequiredError`: the requested user subject has not yet authorized the connector. Surface a "connect your account" UI.
- `ConnectorInstallationRequiredError`: the connector type supports installations but none matches the request. Surface an install link.
- `NoValidTokenError`: the connector exists but cannot produce a token for this request (for example, the underlying grant was revoked). Treat as a recoverable user-facing state.
- `ClientNotLinkedToProjectError` / `ClientNotEnabledForEnvironmentError`: the calling project isn't linked to this connector, or the project link doesn't include the calling environment. See [Project links](/docs/connect/concepts/project-links).

The SDK exports each error class so you can match on `instanceof`.

## Next steps

- [Project links](/docs/connect/concepts/project-links): How the calling project and environment are authorized to request tokens.
- [SDK Reference](/docs/connect/ts-sdk-reference): Full `ConnectTokenParams` and `ConnectTokenResponse` shapes.
- [Triggers](/docs/connect/concepts/triggers): Tokens are the outbound half of Vercel Connect; triggers are the inbound half.


---

[View full sitemap](/docs/sitemap)
