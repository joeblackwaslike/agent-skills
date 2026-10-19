---
title: Provider tokens in Vercel Connect
product: vercel
url: /docs/connect/concepts/tokens
canonical_url: "https://vercel.com/docs/connect/concepts/tokens"
last_updated: 2026-08-20
type: conceptual
prerequisites:
  - /docs/connect/concepts
  - /docs/connect
related:
  - /docs/connect/ts-sdk-reference
  - /docs/connect/python-sdk-reference
  - /docs/cli/connect
  - /docs/connect/concepts/project-links
  - /docs/connect/concepts/triggers
summary: Short-lived provider credentials issued by Vercel Connect. Each token request specifies a subject, optional installation, scopes, and...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/concepts/tokens.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "005451563f714417b128dfcaf2d45432a231bfdcbb684f95253f6eb17fdbf34b"
---

# Provider tokens in Vercel Connect

A token is a short-lived credential that Vercel Connect issues against a provider on your behalf. Every token is the result of a single SDK token request or `vercel connect token` invocation (CLI). Tokens are cached in-process and refreshed automatically as they approach expiry.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Connect](https://vercel.com/kb/guide/vercel-connect) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Microsoft, Discord, Snowflake, and Salesforce from
- [Vercel Connect adds 100+ preset connectors](https://vercel.com/changelog/vercel-connect-preset-connectors)
- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [Introducing Vercel Connect](https://vercel.com/blog/introducing-vercel-connect)
- [The end of credential sprawl for agents](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents)
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect) — Authenticate Slack, Microsoft Teams, GitHub, Linear, Discord, Notion, and Telegram adapters with Vercel Connect, using s
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga)
- [Concepts](https://vercel.com/docs/eve/concepts) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Chat SDK with Vercel Connect](https://vercel.com/docs/connect/frameworks/chat-sdk) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, Microsoft Teams, GitHub
- [Auth.js with Vercel Connect](https://vercel.com/docs/connect/frameworks/authjs) — Add a Vercel Connect OAuth provider to Auth.js in a Next.js App Router application.
- [Frameworks and Adapters for Vercel Connect](https://vercel.com/docs/connect/frameworks) — Use Vercel Connect with AI SDK, TanStack AI, MCP clients, eve, Chat SDK, Better Auth, and Auth.js.

Full cross-link map for this page: [/docs/connect/concepts/tokens.graph.md](/docs/connect/concepts/tokens.graph.md)
<!-- /docsgraph:related -->

## Anatomy of a token request

A token request has four parts:

**app/lib/post.ts**

```ts filename="app/lib/post.ts"
import { getToken } from '@vercel/connect';

const token = await getToken('slack/acme-slack', {
  subject: { type: 'app' },
  installationId: 'inst_workspace_xyz',
  scopes: ['chat:write'],
});
```

**main.py**

```py filename="main.py"
from vercel import connect
from vercel.connect import ConnectAppTokenSubject

token = await connect.get_token(
    'slack/acme-slack',
    subject=ConnectAppTokenSubject(),
    installation_id='inst_workspace_xyz',
    scopes=['chat:write'],
)
```

- **Connector** (`'slack/acme-slack'`): the connector `uid` to request from.
- **Subject**: who the token represents. App tokens act as the service. User tokens act as a specific user. See [Subject types](#subject-types).
- **Installation** (`installationId` or `installation_id`): which tenant within the connector. Omit for single-tenant connectors; pass `'*'` for a cross-installation token when the connector supports it.
- **Provider options** (`scopes`, `resources`, authorization details, and `audience`): per-provider request shaping. See [Scoping a token](#scoping-a-token).

## Subject types

| Subject                                          | Acts as                 | Use when                                                                                                                            |
| ------------------------------------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `{ type: 'app' }`                                | Your application or bot | Service-level operations: posting from a bot account, calling a tenant-wide admin API.                                              |
| `{ type: 'user', id: 'user_…' }`                 | A specific user         | Delegated operations: posting as the user, opening a PR with their name on it, querying their data.                                 |
| `{ type: 'jwt-bearer', sub: 'user@example.com' }` | A federated subject     | Federated identity: exchange a trusted external JWT (from your own IDP, workload identity, etc.) for a provider token.              |
| `{ token: 'your_subject_token_here' }` | The subject represented by an existing token | Exchange an existing subject token for a provider token. |

For `jwt-bearer`, you can pass optional `iss` and `aud` claims to override the connector's OAuth client id and token endpoint, and `additionalClaims` or `additional_claims` to carry any extra fields the provider requires. See the [TypeScript SDK Reference](/docs/connect/ts-sdk-reference#types) or the [Python SDK Reference](/docs/connect/python-sdk-reference#subject-types) for the full signature.

For a token exchange subject, pass `{ token: '...' }` or `{ type: 'token', token: '...' }`. The `token` field must be a string. In `@vercel/connect` 2.4.0 and later, the SDK infers `type: 'token'` when you omit it. Other subject types still require `type`.

In Python, each subject type is its own model, so there's no `type` field to set:

| TypeScript subject                     | Python model                              |
| -------------------------------------- | ----------------------------------------- |
| `{ type: 'app' }`                      | `ConnectAppTokenSubject()`                |
| `{ type: 'user', id: '...' }`          | `ConnectUserTokenSubject(id='...')`       |
| `{ type: 'jwt-bearer', sub: '...' }`   | `ConnectJwtBearerTokenSubject(sub='...')` |
| `{ token: '...' }`                     | `ConnectTokenExchangeSubject(token='...')` |

## Scoping a token

Vercel Connect forwards three optional fields to the provider so you can narrow what a token can do:

- **`scopes`**: the provider's own scope strings (`chat:write`, `repo:read`, etc.). Pass `['*']` to request the connector's default scopes for the selected subject type.
- **`resources`**: resource indicators, when the provider uses them. Useful for narrowing a token to one channel, one repo, or one record set.
- **Authorization details** (`authorizationDetails` or `authorization_details`): rich authorization requests, when the provider supports them.

`scopes` and the installation are also available through the [`vercel connect`](/docs/cli/connect) CLI. `resources` and authorization details are SDK-only.

## Caching and refresh

The SDK keeps an in-process LRU cache (100 entries) keyed by the connector and request parameters. A cached token is reused on subsequent calls until it falls within the validity buffer (default 30 seconds), at which point the next token request fetches a fresh one. You can override the buffer per call with `validityBufferMs` in TypeScript or `ConnectOptions(validity_buffer=...)` in Python:

**app/lib/refresh.ts**

```ts filename="app/lib/refresh.ts"
const token = await getToken('slack/acme-slack', {
  subject: { type: 'app' },
  validityBufferMs: 60_000,
});
```

**main.py**

```py filename="main.py"
from datetime import timedelta

from vercel import connect
from vercel.connect import ConnectAppTokenSubject, ConnectOptions

token = await connect.get_token(
    'slack/acme-slack',
    subject=ConnectAppTokenSubject(),
    options=ConnectOptions(validity_buffer=timedelta(seconds=60)),
)
```

Vercel Connect drives the provider's refresh flow automatically using the refresh token stored at install time. Your code never needs to handle refresh.

To bypass the in-process cache and revalidate the grant with Vercel Connect, force a refresh:

**app/lib/revalidate.ts**

```ts filename="app/lib/revalidate.ts"
const token = await getToken(
  'slack/acme-slack',
  { subject: { type: 'app' } },
  { forceRefresh: true },
);
```

**main.py**

```py filename="main.py"
token = await connect.get_token(
    'slack/acme-slack',
    subject=ConnectAppTokenSubject(),
    options=ConnectOptions(force_refresh=True),
)
```

If a provider rejects a cached token, evict it and retry instead of forcing a refresh on every call. Call [`deleteTokenCacheEntry`](/docs/connect/ts-sdk-reference#deletetokencacheentry) with the same connector and request parameters, or [`delete_token_cache_entry()`](/docs/connect/python-sdk-reference#delete_token_cache_entry) with the connector and subject. The next token request fetches a fresh token.

## Revocation

Revoking a token tells the provider to invalidate it at the source. Whether revocation actually invalidates the token depends on the provider. If the provider exposes a revocation endpoint, Vercel Connect calls it. If not, Vercel Connect marks the token for deletion in its own store, but the underlying provider credential may continue to work until it expires naturally.

You can revoke from the dashboard, from the CLI (`vercel connect token revoke …`), with the SDK's [`revokeToken`](/docs/connect/ts-sdk-reference#revoketoken) or [`revoke_token()`](/docs/connect/python-sdk-reference#revoke_token) function, or through the REST API.

## Errors

Token requests can fail with structured errors:

- `UserAuthorizationRequiredError`: the requested user subject has not yet authorized the connector. Surface a "connect your account" UI.
- `ConnectorInstallationRequiredError`: the connector type supports installations but none matches the request. Surface an install link.
- `NoValidTokenError`: the connector exists but cannot produce a token for this request (for example, the underlying grant was revoked). Treat as a recoverable user-facing state.
- `ClientNotLinkedToProjectError` / `ClientNotEnabledForEnvironmentError` (`ConnectApiError` in Python): the calling project isn't linked to this connector, or the project link doesn't include the calling environment. See [Project links](/docs/connect/concepts/project-links).

Each SDK exports its error classes, so you can match on `instanceof` in TypeScript or `except` in Python. See the [TypeScript](/docs/connect/ts-sdk-reference#errors) and [Python](/docs/connect/python-sdk-reference#errors) error lists for details.

## Next steps

- [Project links](/docs/connect/concepts/project-links): How the calling project and environment are authorized to request tokens.
- [TypeScript SDK Reference](/docs/connect/ts-sdk-reference): Full `ConnectTokenParams` and `ConnectTokenResponse` shapes.
- [Python SDK Reference](/docs/connect/python-sdk-reference): The same API for Python.
- [Triggers](/docs/connect/concepts/triggers): Tokens are the outbound half of Vercel Connect; triggers are the inbound half.


---

[View full sitemap](/docs/sitemap)
