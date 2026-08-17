---
title: SDK Reference
product: vercel
url: /docs/connect/ts-sdk-reference
canonical_url: "https://vercel.com/docs/connect/ts-sdk-reference"
last_updated: 2026-06-09
type: reference
prerequisites:
  - /docs/connect
related:
  - /docs/connect/concepts/authentication
  - /docs/connect/concepts/installations
  - /docs/connect/concepts/tokens
  - /docs/connect/concepts/project-links
  - /docs/cli/connect
summary: API reference for @vercel/connect, the TypeScript SDK for requesting runtime tokens from Vercel Connect.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/ts-sdk-reference.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "8e5b66f6e77f3c658e4f9b1ef7700585d51ed8571ac621644bd55216a14bceb0"
---

# SDK Reference

`@vercel/connect` is the TypeScript SDK for calling Vercel Connect from your app. It authenticates with your Vercel deployment's OIDC token and exchanges it for provider tokens through the Vercel API.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Build your own Slackbot with Vercel Connect](https://vercel.com/kb/guide/build-a-slack-bot-with-vercel-connect?from=related) — Learn how to build your very own Slackbot with Chat SDK and AI SDK. Vercel Connect supplies runtime Slack tokens and for
- [Build a GitHub agent with Vercel Connect](https://vercel.com/kb/guide/github-agent-vercel-connect?from=related) — Build a GitHub agent that helps your team work through issues and PRs. Chat SDK handles the interactivity and AI SDK run
- [Build a Linear agent with Vercel Connect](https://vercel.com/kb/guide/linear-agent-vercel-connect?from=related) — Build a native Linear Agent that helps your team manage issues. Mention it on any issue and it responds in real time, po
- [Build an integrations hub with Nuxt and Vercel Connect](https://vercel.com/kb/guide/nuxt-and-vercel-connect?from=related) — Build an Integrations Hub with Nuxt and Vercel Connect. Connect GitHub and Linear over OAuth and mint short-lived tokens
- [How to build a Slack bot that manages files in Vercel Blob](https://vercel.com/kb/guide/slack-bot-vercel-blob?from=related) — Build a Slack bot using Chat SDK, AI SDK, and Files SDK that can list, read, upload, and delete files in Vercel Blob thr
- [Connectors](https://vercel.com/docs/connect/concepts/connectors?from=related) — A connector is the team-owned record that represents one third-party service. Its type determines which capabilities are
- [Observability](https://vercel.com/docs/connect/observability?from=related) — Learn about observability on Vercel.
- [OIDC Reference](https://vercel.com/docs/oidc/reference?from=related) — Review helper libraries to help you connect with your backend and understand the structure of an OIDC token.
- [API Reference](https://vercel.com/docs/functions/functions-api-reference?from=related) — Learn about available APIs when working with Vercel Functions.

Full cross-link map for this page: [/docs/connect/ts-sdk-reference.graph.md](/docs/connect/ts-sdk-reference.graph.md)
<!-- /docsgraph:related -->

## Install

```bash filename="terminal"
pnpm add @vercel/connect
```

The SDK has one runtime dependency, `@vercel/oidc`, which reads `VERCEL_OIDC_TOKEN` from the environment.

## Authentication

In a Vercel deployment, the SDK reads `VERCEL_OIDC_TOKEN` automatically. For local development, run `vercel link` followed by `vercel env pull` to download a development token into `.env.local`. The token is short-lived; re-run `vercel env pull` if you see authentication errors.

To override the token explicitly, pass `options.vercelToken`:

```ts filename="app/lib/explicit-token.ts"
import { getToken } from '@vercel/connect';

const token = await getToken(
  'slack/acme-slack',
  { subject: { type: 'app' } },
  { vercelToken: process.env.MY_VERCEL_TOKEN },
);
```

See [Authentication](/docs/connect/concepts/authentication) for the full caller-to-Vercel-Connect story.

## `getToken`

Returns the access token string. Use when you just need the token to put in an `Authorization` header.

```ts filename="signature"
function getToken(
  connector: string,
  params: ConnectTokenParams,
  options?: ConnectOptions,
): Promise<string>;
```

Minimal example:

```ts filename="app/lib/post-to-slack.ts"
import { getToken } from '@vercel/connect';

const token = await getToken('slack/acme-slack', {
  subject: { type: 'app' },
  scopes: ['chat:write'],
});

await fetch('https://slack.com/api/chat.postMessage', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ channel: 'C123', text: 'hello' }),
});
```

This omits `installationId` and falls back to the connector's default installation, which is the predominant case (a private app installed in a single workspace). Pass `installationId` explicitly only for multi-tenant connectors where you need to address a specific installation. See [Installations](/docs/connect/concepts/installations).

## `getTokenResponse`

Returns the full response: the token, its expiry, the connector identity, and provider metadata. Use when your app needs more than the raw string, for example to display the connected workspace name or to decide whether to surface a re-authorize button.

```ts filename="signature"
function getTokenResponse(
  connector: string,
  params: ConnectTokenParams,
  options?: ConnectOptions,
): Promise<ConnectTokenResponse>;
```

Minimal example:

```ts filename="app/lib/inspect-token.ts"
import { getTokenResponse } from '@vercel/connect';

const response = await getTokenResponse('slack/acme-slack', {
  subject: { type: 'app' },
});

console.log(response.connector.uid);
console.log(response.tenantId);
console.log(new Date(response.expiresAt).toISOString());
```

## Types

### `ConnectTokenParams`

| Field                  | Type                                                                 | Required | Description                                                                                                                                                                       |
| ---------------------- | -------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `subject`              | `ConnectTokenSubject` (see below)                                    | yes      | Who the token represents. See [Tokens](/docs/connect/concepts/tokens#subject-types).                                                                                              |
| `installationId`       | `string`                                                             | no       | Which tenant the token is for. Pass `'*'` for a cross-installation token where the connector supports it. See [Installations](/docs/connect/concepts/installations).               |
| `audience`             | `string[]`                                                           | no       | Provider audience claim. Used when the provider requires a specific audience in the issued token.                                                                                |
| `scopes`               | `string[]`                                                           | no       | Provider scope strings (`chat:write`, `repo:read`, etc.).                                                                                                                        |
| `resources`            | `string[]`                                                           | no       | Resource indicators that narrow the token to a specific provider resource (channel, repo, record set). **SDK-only.**                                                              |
| `authorizationDetails` | `Array<{ type: string } & Record<string, unknown>>`                  | no       | Rich authorization requests, when the provider supports them. **SDK-only.**                                                                                                       |
| `validityBufferMs`     | `number`                                                             | no       | Refresh the token if it expires within this many milliseconds. Defaults to `30000` (30 seconds).                                                                                  |

### `ConnectTokenSubject`

A discriminated union with three variants:

```ts filename="@vercel/connect"
type ConnectTokenSubject =
  | { type: 'app' }
  | { type: 'user'; id: string; issuer?: string }
  | {
      type: 'jwt-bearer';
      sub: string;
      iss?: string;
      aud?: string;
      additionalClaims?: Record<string, unknown>;
    };
```

| Variant      | Required fields | Optional fields                                                                                                          |
| ------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `app`        | none            | none                                                                                                                     |
| `user`       | `id`            | `issuer` (the OIDC issuer of the user id, when not the default)                                                          |
| `jwt-bearer` | `sub`           | `iss` (defaults to the connector's OAuth client id), `aud` (defaults to the connector's OAuth token endpoint), `additionalClaims` |

### `ConnectTokenResponse`

| Field             | Type                                                  | Description                                                                                          |
| ----------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `token`           | `string`                                              | The access token to send to the provider.                                                            |
| `expiresAt`       | `number`                                              | Token expiration as a Unix timestamp in milliseconds.                                                |
| `connector.id`    | `string`                                              | Opaque internal identifier for the connector.                                                        |
| `connector.uid`   | `string`                                              | Human-readable connector identifier (the same string you passed as the first arg).                   |
| `connector.type`  | `string`                                              | The connector type (`slack`, `github`, `oauth`, `snowflake`, `salesforce`, `api-key`, `custom`).     |
| `name`            | `string \| undefined`                                 | Human-readable connector or installation name, when known.                                           |
| `installationId`  | `string \| undefined`                                 | The installation this token was issued against, when applicable.                                     |
| `tenantId`        | `string \| undefined`                                 | Provider's own tenant identifier (Slack team ID, GitHub org ID).                                     |
| `externalSubject` | `string \| undefined`                                 | The subject identifier at the provider (for example, the Slack user ID for a user-subject token).    |
| `metadata`        | `Record<string, unknown> \| undefined`                | Driver-specific metadata stored during OAuth (varies by provider).                                   |

### `ConnectOptions`

| Field         | Type     | Description                                                                                                  |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `vercelToken` | `string` | Override the OIDC token the SDK reads from the environment. Useful for tests and for non-Vercel runtimes.    |

## Caching

The SDK maintains an in-process LRU cache with a maximum of 100 entries, keyed by the connector and the full request params. Cached tokens are reused on subsequent calls until they fall inside the `validityBufferMs` window, at which point the next call fetches a fresh one.

There's no public API for bypassing the cache on a single call. To force a refresh, change one of the params. For example, set `validityBufferMs` to a value larger than the token's remaining lifetime.

## Errors

The SDK throws typed error classes you can match on with `instanceof`:

| Error                                  | Cause                                                                                                                                              |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NoValidTokenError`                    | The connector exists but cannot produce a token for this request. The grant may have been revoked at the provider.                                |
| `UserAuthorizationRequiredError`       | The request used a `{ type: 'user' }` subject and that user has not authorized the connector. Surface a "connect your account" UI.                |
| `ConnectorInstallationRequiredError`   | The connector type requires an installation and none matches the request. Surface an install link.                                                  |
| `ConnectorNotFoundError`               | The team has no connector registered under the given `uid`.                                                                                       |
| `ClientNotLinkedToProjectError`        | The calling project is not linked to this connector. See [Project links](/docs/connect/concepts/project-links).                                    |
| `ClientNotEnabledForEnvironmentError`  | The link exists but does not include the environment the OIDC token was issued for.                                                                |

## CLI parity

Most SDK calls have a [`vercel connect`](/docs/cli/connect) CLI equivalent. The CLI supports `--subject`, `--installation-id`, and `--scopes`. The SDK additionally supports `resources` and `authorizationDetails`, which are not exposed through the CLI. The CLI supports `--triggers` on `vercel connect attach`, which has no SDK equivalent.

## Next steps

- [Quickstart](/docs/connect/quickstart): Wire `getToken` into a working integration in four steps.
- [Tokens](/docs/connect/concepts/tokens): How a token request is shaped and what each field does.
- [Authentication](/docs/connect/concepts/authentication): What the OIDC token carries and how the API checks it.


---

[View full sitemap](/docs/sitemap)
