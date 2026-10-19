---
title: TypeScript SDK Reference
product: vercel
url: /docs/connect/ts-sdk-reference
canonical_url: "https://vercel.com/docs/connect/ts-sdk-reference"
last_updated: 2026-10-08
type: reference
prerequisites:
  - /docs/connect
related:
  - /docs/connect/limits
  - /docs/connect/python-sdk-reference
  - /docs/connect/concepts/authentication
  - /docs/connect/concepts/installations
  - /docs/connect/mcp-events
summary: API reference for @vercel/connect, the TypeScript SDK for requesting runtime tokens from Vercel Connect.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/ts-sdk-reference.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "29cc310ebebcda5cf9d19b6f864e15af84cb657793f096261c562546c5f86348"
---

# TypeScript SDK Reference

`@vercel/connect` is the TypeScript SDK for calling Vercel Connect from your app. It authenticates with your Vercel deployment's OIDC token and exchanges it for provider tokens through the Vercel API. SDK methods that make API requests are subject to [rate limits](/docs/connect/limits).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect) — Authenticate Slack, Microsoft Teams, GitHub, Linear, Discord, Notion, and Telegram adapters with Vercel Connect, using s
- [Vercel Connect now supports Microsoft Teams](https://vercel.com/changelog/vercel-connect-microsoft-teams)
- [Vercel Connect now supports Linq](https://vercel.com/changelog/vercel-connect-now-supports-linq)
- [Vercel Connect now supports Microsoft](https://vercel.com/changelog/vercel-connect-supports-microsoft)
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Build your own Slackbot with Vercel Connect](https://vercel.com/kb/guide/build-a-slack-bot-with-vercel-connect) — Learn how to build your very own Slackbot with Chat SDK and AI SDK. Vercel Connect supplies runtime Slack tokens and for
- [How to build a Slack bot that manages files in Vercel Blob](https://vercel.com/kb/guide/slack-bot-vercel-blob) — Build a Slack bot using Chat SDK, AI SDK, and Files SDK that can list, read, upload, and delete files in Vercel Blob thr
- [The end of credential sprawl for agents](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents)
- [MCP Events](https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-events) — Reference for experimental MCP event methods, the webhook handler, and subscription and storage types.
- [experimental_useRealtime](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-realtime) — API reference for the experimental_useRealtime hook.
- [Connections](https://eve.dev/docs/connections) — Expose external MCP and OpenAPI servers to the model, with connection tokens the model never sees.
- [Observability](https://vercel.com/docs/connect/observability) — Monitor token requests, authorizations, revocations, and trigger deliveries for your connectors.

Full cross-link map for this page: [/docs/connect/ts-sdk-reference.graph.md](/docs/connect/ts-sdk-reference.graph.md)
<!-- /docsgraph:related -->

For Python, see the [Python SDK Reference](/docs/connect/python-sdk-reference).

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

> **💡 Note:** Rate limit: [200 requests per minute per
> team](/docs/connect/limits#read-operations-200-requests-per-minute-per-team).

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

> **💡 Note:** Rate limit: [200 requests per minute per
> team](/docs/connect/limits#read-operations-200-requests-per-minute-per-team).

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

## `getConnectorMetadata`

Returns the connector's stable public metadata and provider-specific configuration. Use it when your app needs connector setup values in addition to a runtime token, such as a Snowflake account identifier.

> **💡 Note:** Rate limit: [200 requests per minute per
> team](/docs/connect/limits#read-operations-200-requests-per-minute-per-team).

```ts filename="signature"
function getConnectorMetadata(
  connector: string,
  options?: ConnectOptions,
): Promise<ConnectorMetadata>;
```

```ts filename="app/lib/snowflake.ts"
import { getConnectorMetadata } from '@vercel/connect';

const connector = await getConnectorMetadata('snowflake/analytics');
const accountIdentifier = connector.vendor.accountIdentifier as string;

console.log(connector.name);
console.log(accountIdentifier);
```

The calling project and environment must be linked to the connector, just as they must be for `getToken`.

## MCP events

Use `@vercel/connect@2.5.2` or later for the experimental MCP event APIs below.
The MCP server must support the webhook events extension. See [MCP Events](/docs/connect/mcp-events) for a
complete subscription and receiver example, including deployment requirements.

Import the direct APIs and delivery verifier from `@vercel/connect/mcp`. Import
the AI SDK adapter from `@vercel/connect/ai-sdk`.

### Shared request parameters

Direct API methods take `(connector, params, options?)`. `connector` is the
connector identifier, such as `oauth/documents`. Build account scope from trusted
application state, not model output or an unverified request body.

| Parameter type                            | Fields                                                                                                                                                                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Experimental_McpEventScope`              | `tokenParams: ConnectTokenParams`. Selects the authorized account and credential constraints.                                                                                                                          |
| `Experimental_McpEventSourceInput`        | Scope plus optional `mcpUrl: string`. Defaults to the connector endpoint. Connect must authorize the URL before sending provider credentials.                                                                          |
| `Experimental_McpSubscriptionLookupInput` | `id: string` and optional `expectedSubject: ConnectTokenParams['subject']`. Account-bound callers should always pass `expectedSubject`; it asserts the stored creation subject rather than requesting new credentials. |

All direct methods accept `Experimental_McpEventOptions` as their optional third
argument:

| Option            | Type          | Behavior                                                                  |
| ----------------- | ------------- | ------------------------------------------------------------------------- |
| `vercelToken`     | `string`      | Overrides the calling workload's Vercel OIDC token.                       |
| `region`          | `string`      | Selects the Connect API region; defaults to `VERCEL_REGION`.              |
| `signal`          | `AbortSignal` | Cancels the request. It does not cancel an already accepted subscription. |
| `timeout`         | `number`      | Request deadline in milliseconds, including credential resolution.        |
| `maxTotalTimeout` | `number`      | Overall deadline in milliseconds. The earlier supplied deadline wins.     |

Non-success API responses use the [Connect error types](#errors).

### `experimental_discoverEvents`

Checks event support for an authorized connection. This does not create a
subscription or retrieve event occurrences.

- **Parameters:** `Experimental_McpEventSourceInput`.
- **Returns:** `Promise<{ status: 'supported' | 'unsupported' | 'unavailable' | 'needs_auth' }>`.

`unsupported` means the server does not support events. `unavailable` means
discovery could not establish support; don't treat it as confirmed lack of support.
`needs_auth` requires account authorization before discovery can complete.

### `experimental_listEventTypes`

Lists event definitions from the authorized server's catalog.

- **Parameters:** `Experimental_McpEventSourceInput` plus optional `cursor: string`.
- **Returns:** `Promise<{ events: Experimental_McpEventDescriptor[]; nextCursor?: string }>`.

Each descriptor includes `name`, optional `description`, `inputSchema`,
`payloadSchema`, and `delivery` modes (`webhook`, `poll`, or `push`). Follow
`nextCursor` until absent. Catalog discovery does not poll for occurrences;
Connect subscriptions use webhook delivery.

### `experimental_subscribe`

Creates a subscription and returns `Promise<Experimental_McpSubscription>`.
The input type is `Experimental_McpSubscribeInput`:

| Field            | Type                      | Required           | Behavior                                                                                     |
| ---------------- | ------------------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| `tokenParams`    | `ConnectTokenParams`      | Yes                | Authorized account and credential constraints.                                               |
| `mcpUrl`         | `string`                  | No                 | Overrides the connector's MCP endpoint, subject to backend validation.                       |
| `name`           | `string`                  | Yes                | Event name from the catalog.                                                                 |
| `arguments`      | `Record<string, unknown>` | Yes                | Arguments matching the event's `inputSchema`.                                                |
| `destination`    | `{ path: string }`        | Yes                | Public receiver path in the calling project/environment, such as `/hooks`.                   |
| `context`        | `Record<string, unknown>` | No                 | Application context included in forwarded deliveries. This is not an authorization boundary. |
| `idempotencyKey` | `string`                  | Yes                | Reuse for retries of the same creation intent. Use a new key for a new subscription.         |
| `ttlMs`          | `number \| null`          | Yes                | Application monitoring duration in milliseconds. Use an integer from `120000` to `31536000000` (two minutes to 365 days), or `null` to monitor until stopped. |

Pass `ttlMs: null` for an indefinite watch. Connect manages provider lease
renewal separately from this application lifetime. Omitting `ttlMs`, supplying an
invalid duration, or passing `expiresAt` throws a `TypeError` before the SDK sends
a request. Responses still include the resolved `expiresAt` deadline.

Creation can return `pending` while upstream registration finishes. Persist the
returned ID and its authorized application binding.

### `experimental_listSubscriptions`

Lists subscriptions for the connector, account, and calling project/environment.
The list is not scoped to a conversation or the subscription's `context`.

- **Parameters:** `Experimental_McpEventScope` plus optional `cursor: string`, `limit: number`, and `status: Experimental_McpSubscriptionStatus`.
- **Returns:** `Promise<{ subscriptions: Experimental_McpSubscription[]; pagination: { next: string | null } }>`.

Pass `pagination.next` as the next request's `cursor`. A `null` value ends
pagination. This differs from event catalog and AI SDK adapter pagination, which
use `nextCursor`.

### `experimental_getSubscription`

Retrieves a subscription by ID after checking access.

- **Parameters:** `Experimental_McpSubscriptionLookupInput`.
- **Returns:** `Promise<Experimental_McpSubscription>`.

Pass `expectedSubject` when looking up a subscription on behalf of an account.
Knowing a subscription ID does not establish ownership.

### `experimental_unsubscribe`

Stops local delivery and attempts provider cleanup.

- **Parameters:** `Experimental_McpSubscriptionLookupInput`.
- **Returns:** `Promise<Experimental_McpSubscription>`.

Pass `expectedSubject` for account-bound calls. A response with `status: 'stopped'`
and `cleanupStatus: 'pending'` means local delivery has stopped but provider
cleanup remains unfinished. Retry unsubscribe to finish cleanup.

### `experimental_unsubscribeAll`

Requests a bulk stop for the connector, subject, and calling project/environment.

- **Parameters:** `Experimental_McpEventScope` plus required `idempotencyKey: string`.
- **Returns:** `Promise<{ accepted: true }>`.

This affects every subscription in that scope, not just one conversation or
receiver path. `accepted: true` acknowledges the request; it does not mean every
provider subscription has finished cleanup.

### `Experimental_McpSubscription`

Direct subscribe, get, and unsubscribe calls return this object. Direct list
calls return an array of these objects.

| Fields                                          | Type / meaning                                                         |
| ----------------------------------------------- | ---------------------------------------------------------------------- |
| `id`, `connectorId`, `projectId`, `environment` | Strings identifying the subscription and its saved scope.              |
| `subject`                                       | `Experimental_McpEventSubject`: an `app` or `user` subject.            |
| `name`, `arguments`                             | Event name and `Record<string, unknown>` arguments.                    |
| `destination`                                   | `{ path: string }`.                                                    |
| `context`                                       | Saved `Record<string, unknown>` application context.                   |
| `status`                                        | `pending`, `active`, `needs_auth`, `stopped`, `expired`, or `failed`.  |
| `expiresAt`                                     | ISO application deadline or `null`.                                    |
| `createdAt`, `updatedAt`                        | Timestamp strings.                                                     |
| `cleanupStatus`                                 | Optional `pending`, `complete`, or `exhausted` provider cleanup state. |
| `stopReason`, `lastError`                       | Optional diagnostic strings.                                           |

See [subscription lifecycle](/docs/connect/mcp-events#inspect-and-stop-subscriptions) for
status handling and cleanup behavior.

### `experimental_connectEventsAdapter`

Returns an `Experimental_ConnectEventsAdapter` for AI SDK's
`experimental_events.adapter`. It is exported from `@vercel/connect/ai-sdk`.
Use `@ai-sdk/mcp@2.0.76` or later with `@vercel/connect@2.5.2` or later so both
packages use the `ttlMs` creation input.

| Option        | Type                 | Required | Behavior                                                                                                |
| ------------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `connector`   | `string`             | Yes      | Connector identifier.                                                                                   |
| `tokenParams` | `ConnectTokenParams` | Yes      | Pass the same resolved parameters as `connectAuthProvider`. Create a separate adapter for each account. |
| `destination` | `{ path: string }`   | Yes      | Registered receiver path.                                                                               |
| `mcpUrl`      | `string`             | No       | Overrides the MCP client's transport URL. Connect must authorize this endpoint.                         |

The returned adapter implements synchronous `createAdapter({ transport })`.
AI SDK supplies `{ type: 'http' | 'sse', url: string }` or `{ type: 'custom' }`.
For custom transports without an explicit `mcpUrl`, Connect uses the connector's
configured endpoint. You don't need to wrap the adapter in another factory.

The bound operations are:

| Operation           | Input                                                                                                                     | Result                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `subscribe`         | `name`, JSON `arguments`, `idempotencyKey`, required `ttlMs: number \| null`, optional JSON `context` and `options`. | `Experimental_ConnectEventsSubscription`.                                           |
| `getSubscription`   | `{ id, options? }`.                                                                                                       | `Experimental_ConnectEventsSubscription`.                                           |
| `listSubscriptions` | Optional `{ cursor?, limit?, status?, options? }`.                                                                        | `{ subscriptions: Experimental_ConnectEventsSubscription[]; nextCursor?: string }`. |
| `unsubscribe`       | `{ id, options? }`.                                                                                                       | `Experimental_ConnectEventsSubscription`.                                           |

The adapter uses the same [subscription lifetime rules](#experimental_subscribe)
as the direct API.

All operations return promises. `Experimental_ConnectEventsSubscription` contains
`id`, `name`, JSON `arguments`, `status`, `expiresAt`, and optional `cleanupStatus`.
The adapter binds account scope and automatically supplies `expectedSubject` for
get and unsubscribe. Its request `options` accept only `signal`, `timeout`, and
`maxTotalTimeout`; they cannot override workload identity or API region.

Event catalog discovery remains an MCP request through the AI SDK client.
Subscription operations use Connect. See the [AI SDK subscription example](/docs/connect/mcp-events#create-a-subscription-with-ai-sdk).

### `experimental_verifyMcpEvent`

Authenticates a forwarded Connect delivery and validates its envelope:

```ts filename="signature"
import type {
  Experimental_McpEventDelivery,
  Experimental_VerifyMcpEventOptions,
} from '@vercel/connect/mcp';

declare function experimental_verifyMcpEvent(
  request: Request,
  options: Experimental_VerifyMcpEventOptions,
): Promise<Experimental_McpEventDelivery>;
```

| Option                | Type     | Behavior                                                                                                            |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `path`                | `string` | Required registered public receiver path, from trusted server configuration.                                        |
| `projectId`           | `string` | Defaults to `VERCEL_PROJECT_ID`. No wildcards.                                                                      |
| `environment`         | `string` | Defaults to `VERCEL_TARGET_ENV`, then `VERCEL_ENV`.                                                                 |
| `customEnvironmentId` | `string` | Required for a Custom Environment; use its stable `env_...` ID.                                                     |
| `ownerId`             | `string` | Additional restriction; defaults to `VERCEL_ORG_ID` when set.                                                       |
| `audience`            | `string` | Optional expected Vercel OIDC audience, normally `https://vercel.com/<team-slug>`.                                  |
| `issuer`              | `string` | Optional expected project OIDC issuer: global or team-specific.                                                     |
| `branch`              | `string` | Preview verification binding; defaults to `VERCEL_GIT_COMMIT_REF`. Subscription creation currently rejects Preview. |

The function consumes the request body. It does not acknowledge delivery,
deduplicate it, or run application work. Durably accept by `deliveryId` before
returning success. Use this verifier for Connect-forwarded envelopes, not AI SDK's
`experimental_createMCPEventWebhook` helper for direct provider webhooks.

`Experimental_McpEventDelivery` includes `version: 1`, `deliveryId`,
`subscriptionId`, `source: { type: 'mcp', connectorId }`, and saved `context`, plus
one of:

- `event`: `eventId`, `name`, `timestamp`, JSON `data`, nullable `cursor`, and optional `_meta`.
- `control.type: 'gap'`: nullable `cursor` and optional `truncated: true`.
- `control.type: 'terminated'`: `error` with numeric `code`, `message`, and optional `data`.

Verification failures throw `Experimental_McpEventVerificationError`:

| `code`                     | Meaning                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------- |
| `invalid_delivery`         | The delivery cannot be authenticated or its envelope/binding is invalid.                |
| `configuration_error`      | Required trusted receiver configuration is missing or invalid.                          |
| `verification_unavailable` | Verification could not complete, for example because signing keys could not be fetched. |

Reject invalid deliveries. Treat configuration and verification availability
failures as retryable receiver failures rather than acknowledging or processing
the event. See the [receiver example](/docs/connect/mcp-events#receive-and-verify-events).

## Types

### `ConnectTokenParams`

| Field                  | Type                                                | Required | Description                                                                                                                                                          |
| ---------------------- | --------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `subject`              | `ConnectTokenSubject` (see below)                   | yes      | Who the token represents. See [Tokens](/docs/connect/concepts/tokens#subject-types).                                                                                 |
| `installationId`       | `string`                                            | no       | Which tenant the token is for. Pass `'*'` for a cross-installation token where the connector supports it. See [Installations](/docs/connect/concepts/installations). |
| `audience`             | `string[]`                                          | no       | Provider audience claim. Used when the provider requires a specific audience in the issued token.                                                                    |
| `scopes`               | `string[]`                                          | no       | Provider scope strings (`chat:write`, `repo:read`, etc.). Pass `['*']` to request the connector's default scopes for the selected subject type.                      |
| `resources`            | `string[]`                                          | no       | Resource indicators that narrow the token to a specific provider resource (channel, repo, record set). **SDK-only.**                                                 |
| `authorizationDetails` | `Array<{ type: string } & Record<string, unknown>>` | no       | Rich authorization requests, when the provider supports them. **SDK-only.**                                                                                          |
| `validityBufferMs`     | `number`                                            | no       | Refresh the token if it expires within this many milliseconds. Defaults to `30000` (30 seconds).                                                                     |

### `ConnectTokenSubject`

A union with four variants:

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
    }
  | { type?: 'token'; token: string };
```

| Variant      | Required fields    | Optional fields                                                                                                                   |
| ------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `app`        | none               | none                                                                                                                              |
| `user`       | `id`               | `issuer` (the OIDC issuer of the user id, when not the default)                                                                   |
| `jwt-bearer` | `sub`              | `iss` (defaults to the connector's OAuth client id), `aud` (defaults to the connector's OAuth token endpoint), `additionalClaims` |
| `token`      | `token` (a string) | `type` (defaults to `'token'` in SDK 2.4.0 and later)                                                                             |

The SDK infers `type: 'token'` for `subject: { token: '...' }` before sending the request. Other variants require their explicit `type`.

### `ConnectTokenResponse`

| Field             | Type                                   | Description                                                                                                                   |
| ----------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `token`           | `string`                               | The access token to send to the provider.                                                                                     |
| `tokenId`         | `string \| undefined`                  | Per-issuance identifier (`stk_…`) for correlating the token with Connect observability and usage data.                        |
| `expiresAt`       | `number`                               | Token expiration as a Unix timestamp in milliseconds.                                                                         |
| `connector.id`    | `string`                               | Opaque internal identifier for the connector.                                                                                 |
| `connector.uid`   | `string`                               | Human-readable connector identifier (the same string you passed as the first arg).                                            |
| `connector.type`  | `string`                               | The connector type (`slack`, `github`, `linear`, `microsoft-entra`, `oauth`, `snowflake`, `salesforce`, `api-key`, `custom`). |
| `name`            | `string \| undefined`                  | Human-readable connector or installation name, when known.                                                                    |
| `installationId`  | `string \| undefined`                  | The installation this token was issued against, when applicable.                                                              |
| `tenantId`        | `string \| undefined`                  | Provider's own tenant identifier (Slack team ID, GitHub org ID, Microsoft tenant GUID).                                       |
| `externalSubject` | `string \| undefined`                  | The subject identifier at the provider (for example, the Slack user ID for a user-subject token).                             |
| `metadata`        | `Record<string, unknown> \| undefined` | Driver-specific metadata stored during OAuth (varies by provider).                                                            |
| `claims`          | `Record<string, unknown> \| undefined` | Allow-listed claims propagated from the upstream provider token.                                                              |

### `ConnectorMetadata`

| Field       | Type                      | Description                                                     |
| ----------- | ------------------------- | --------------------------------------------------------------- |
| `id`        | `string`                  | Opaque internal connector identifier.                           |
| `uid`       | `string`                  | Human-readable connector identifier.                            |
| `name`      | `string`                  | Connector display name.                                         |
| `type`      | `string`                  | Connector type, such as `snowflake` or `oauth`.                 |
| `service`   | `string`                  | Service the connector integrates with.                          |
| `clientUrl` | `string \| undefined`     | Fully qualified service URL, when Vercel Connect can derive it. |
| `createdAt` | `number`                  | Creation time as a Unix timestamp in milliseconds.              |
| `updatedAt` | `number`                  | Last update time as a Unix timestamp in milliseconds.           |
| `vendor`    | `Record<string, unknown>` | Provider-specific public configuration stored on the connector. |

### `ConnectOptions`

| Field          | Type      | Description                                                                                                      |
| -------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| `vercelToken`  | `string`  | Override the OIDC token the SDK reads from the environment. Useful for tests and non-Vercel runtimes.            |
| `forceRefresh` | `boolean` | For `getToken` and `getTokenResponse`, bypass the in-process cache and revalidate the grant with Vercel Connect. |

## `revokeToken`

Revokes the provider grant for a connector subject and clears the SDK's in-process token cache. Provider support for revocation varies; see [Revocation](/docs/connect/concepts/tokens#revocation).

> **💡 Note:** Rate limit: [50 requests per minute per
> team](/docs/connect/limits#write-operations-50-requests-per-minute-per-team)
> (write operation).

```ts filename="app/lib/disconnect.ts"
import { revokeToken } from '@vercel/connect';

await revokeToken('oauth/linear', {
  subject: { type: 'user', id: 'user_123' },
});
```

## `deleteTokenCacheEntry`

Removes one cached token without revoking its provider grant. Pass the same connector and complete request parameters that you used for `getToken` or `getTokenResponse`. The next request for that cache entry fetches a fresh token.

```ts filename="app/lib/retry-token.ts"
import { deleteTokenCacheEntry, getToken } from '@vercel/connect';

const params = {
  subject: { type: 'app' as const },
  scopes: ['chat:write'],
};

let token = await getToken('slack/acme-slack', params);

// If Slack rejects this token with a 401:
deleteTokenCacheEntry('slack/acme-slack', params);
token = await getToken('slack/acme-slack', params);
```

## Caching

The SDK maintains an in-process LRU cache with a maximum of 100 entries, keyed by the connector and the full request params. Cached tokens are reused on subsequent calls until they fall inside the `validityBufferMs` window, at which point the next call fetches a fresh one.

Pass `{ forceRefresh: true }` in `ConnectOptions` to bypass the cache for a request. Use `deleteTokenCacheEntry` when you only need to discard one rejected token while preserving normal caching for future calls.

## Errors

The SDK throws typed error classes you can match on with `instanceof`:

| Error                                 | Cause                                                                                                                              |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `NoValidTokenError`                   | The connector exists but cannot produce a token for this request. The grant may have been revoked at the provider.                 |
| `UserAuthorizationRequiredError`      | The request used a `{ type: 'user' }` subject and that user has not authorized the connector. Surface a "connect your account" UI. |
| `ConnectorInstallationRequiredError`  | The connector type requires an installation and none matches the request. Surface an install link.                                 |
| `ConnectorNotFoundError`              | The team has no connector registered under the given `uid`.                                                                        |
| `ClientNotLinkedToProjectError`       | The calling project is not linked to this connector. See [Project links](/docs/connect/concepts/project-links).                    |
| `ClientNotEnabledForEnvironmentError` | The link exists but does not include the environment the OIDC token was issued for.                                                |

## CLI parity

Most SDK calls have a [`vercel connect`](/docs/cli/connect) CLI equivalent. The CLI supports `--subject`, `--installation-id`, and `--scopes`. The SDK additionally supports `resources` and `authorizationDetails`, which are not exposed through the CLI. The CLI supports `--triggers` on `vercel connect attach`, which has no SDK equivalent.

## Next steps

- [Quickstart](/docs/connect/quickstart): Create a connector and request your first token from TypeScript.
- [Python SDK Reference](/docs/connect/python-sdk-reference): The same API for Python.
- [Tokens](/docs/connect/concepts/tokens): How a token request is shaped and what each field does.
- [Authentication](/docs/connect/concepts/authentication): What the OIDC token carries and how the API checks it.


---

[View full sitemap](/docs/sitemap)
