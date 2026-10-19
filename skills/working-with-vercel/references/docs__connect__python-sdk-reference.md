---
title: Python SDK Reference
product: vercel
url: /docs/connect/python-sdk-reference
canonical_url: "https://vercel.com/docs/connect/python-sdk-reference"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/connect
related:
  - /docs/connect/limits
  - /docs/connect/ts-sdk-reference
  - /docs/connect/quickstart
  - /docs/connect/concepts/authentication
  - /docs/connect/concepts/installations
summary: API reference for vercel-connect, the Python SDK for requesting runtime tokens from Vercel Connect.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/python-sdk-reference.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "c95203c0f0a106bdafe370fe85408e6096aa82cf29a53411ba463ae7ac13645d"
---

# Python SDK Reference

`vercel-connect` is the Python SDK for calling Vercel Connect from your app. It authenticates with your Vercel deployment's OIDC token and exchanges it for short-lived provider tokens through the Vercel API. Your project never stores provider secrets: Vercel Connect owns OAuth client registration, proof key for code exchange (PKCE), state, refresh, and revocation server-side. SDK functions that make API requests are subject to [rate limits](/docs/connect/limits).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Python on Vercel is now generally available](https://vercel.com/changelog/python-on-vercel-is-now-generally-available)
- [Python on Vercel is now generally available](https://vercel.com/blog/python-on-vercel-is-now-generally-available)
- [The Complete Guide to Vercel Connect](https://vercel.com/kb/guide/vercel-connect) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Microsoft, Discord, Snowflake, and Salesforce from
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect) — Authenticate Slack, Microsoft Teams, GitHub, Linear, Discord, Notion, and Telegram adapters with Vercel Connect, using s
- [The end of credential sprawl for agents](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents)
- [Introducing Vercel Connect](https://vercel.com/blog/introducing-vercel-connect)
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga)
- [Chat SDK with Vercel Connect](https://vercel.com/docs/connect/frameworks/chat-sdk) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, Microsoft Teams, GitHub
- [Auth.js with Vercel Connect](https://vercel.com/docs/connect/frameworks/authjs) — Add a Vercel Connect OAuth provider to Auth.js in a Next.js App Router application.

Full cross-link map for this page: [/docs/connect/python-sdk-reference.graph.md](/docs/connect/python-sdk-reference.graph.md)
<!-- /docsgraph:related -->

For TypeScript, see the [TypeScript SDK Reference](/docs/connect/ts-sdk-reference).

## Install

Install the SDK. It requires Python 3.10 or later:

```bash filename="Terminal"
uv add vercel-connect
```

If you use pip, run `pip install vercel-connect` instead.

The SDK exposes an asynchronous API at `vercel.connect` and a synchronous mirror at [`vercel.connect.sync`](#synchronous-api). The examples on this page use the asynchronous API:

```py filename="main.py"
from vercel import connect
```

Every function and type on this page is also importable directly, for example `from vercel.connect import get_token`. For brevity, examples use top-level `await`. In a script, put the code inside an `async` function and run it with `asyncio.run()`, as the [Quickstart](/docs/connect/quickstart) does.

## Authentication

In a Vercel deployment, the SDK reads `VERCEL_OIDC_TOKEN` automatically. For local development, run `vercel link` followed by `vercel env pull` to download a development token into `.env.local`. The SDK reads the token from the process environment and doesn't load `.env.local` itself, so load it with a package such as `python-dotenv`:

```py filename="main.py"
from dotenv import load_dotenv

load_dotenv('.env.local')
```

The token is short-lived; re-run `vercel env pull` if you see authentication errors. When the SDK can't find a token, it raises `ConnectCredentialsError`.

To override the token explicitly, pass `ConnectOptions(vercel_token=...)`. `vercel_token` accepts a string or a callable that returns one at call time. Prefer the callable for long-lived processes, because a captured token string goes stale:

```py filename="main.py"
import os

from vercel import connect
from vercel.connect import ConnectAppTokenSubject, ConnectOptions

token = await connect.get_token(
    'slack/acme-slack',
    subject=ConnectAppTokenSubject(),
    options=ConnectOptions(vercel_token=lambda: os.environ['MY_VERCEL_TOKEN']),
)
```

See [Authentication](/docs/connect/concepts/authentication) for the full caller-to-Vercel-Connect story.

## `get_token()`

Returns the access token string. Use it when you only need the token to put in an `Authorization` header.

> **💡 Note:** Rate limit: [200 requests per minute per team](/docs/connect/limits#read-operations-200-requests-per-minute-per-team).

| Parameter               | Type                                                          | Description                                                                                                                          |
| ----------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `connector`             | `str`                                                         | Connector UID (`slack/acme-slack`) or ID (`scl_...`).                                                                                |
| `subject`               | [`ConnectTokenSubject`](#subject-types)                       | Whose authority the token carries. Required.                                                                                         |
| `scopes`                | `list[str]`                                                   | Provider scope strings. Omit to use the connector's defaults for this subject type.                                                 |
| `installation_id`       | `str`                                                         | Which installation the token is for, when the connector has several. See [Installations](/docs/connect/concepts/installations).       |
| `audience`              | `list[str]`                                                   | Provider audience claim, when the provider requires one.                                                                             |
| `resources`             | `list[str]`                                                   | Resource indicators ([RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707)) that narrow the token to a specific provider resource. |
| `authorization_details` | `Sequence[ConnectAuthorizationDetail]`                        | Rich authorization requests ([RFC 9396](https://datatracker.ietf.org/doc/html/rfc9396)). See [Authorization details](#authorization-details). |
| `options`               | [`ConnectOptions`](#connectoptions)                           | Per-call overrides, such as an explicit token or a cache bypass.                                                                    |

String containers such as `scopes` accept any list, tuple, or set of strings. A bare string raises `ConnectValidationError` instead of being split into characters, so pass `['chat:write']`, not `'chat:write'`.

Minimal example:

```py filename="main.py"
import httpx

from vercel import connect
from vercel.connect import ConnectAppTokenSubject

token = await connect.get_token(
    'slack/acme-slack',
    subject=ConnectAppTokenSubject(),
    scopes=['chat:write'],
)

async with httpx.AsyncClient() as client:
    await client.post(
        'https://slack.com/api/chat.postMessage',
        headers={'Authorization': f'Bearer {token}'},
        json={'channel': 'C123', 'text': 'hello'},
    )
```

This omits `installation_id` and falls back to the connector's default installation, which is the predominant case (a private app installed in a single workspace). Pass `installation_id` explicitly only for multi-tenant connectors where you need to address a specific installation.

`get_token()` raises a [typed error](#errors) when it can't issue a token. The most common is `UserAuthorizationRequiredError`, which means the user hasn't consented yet. Call [`start_authorization()`](#start_authorization) and send them to the returned URL.

## `get_token_response()`

Returns the full response: the token, its expiry, the connector identity, and provider metadata. Takes the same parameters as `get_token()`. Use it when your app needs more than the raw string, for example to log the per-issuance `token_id`, display the connected workspace name, or decide whether to surface a re-authorize button.

> **💡 Note:** Rate limit: [200 requests per minute per team](/docs/connect/limits#read-operations-200-requests-per-minute-per-team).

```py filename="signature"
async def get_token_response(
    connector: str,
    *,
    subject: ConnectTokenSubject,
    # ...same keyword arguments as get_token()
) -> ConnectTokenResponse: ...
```

Minimal example:

```py filename="main.py"
from vercel import connect
from vercel.connect import ConnectAppTokenSubject

response = await connect.get_token_response(
    'slack/acme-slack',
    subject=ConnectAppTokenSubject(),
)

print(response.connector.uid)
print(response.tenant_id)
print(response.expires_at.isoformat())
```

## `get_connector_metadata()`

Returns the connector's identity and provider-specific public configuration. Use it when your app needs connector setup values in addition to a runtime token, such as a Snowflake account identifier, instead of hardcoding them. The server redacts provider secrets.

> **💡 Note:** Rate limit: [200 requests per minute per team](/docs/connect/limits#read-operations-200-requests-per-minute-per-team).

```py filename="signature"
async def get_connector_metadata(
    connector: str,
    *,
    options: ConnectOptions | None = None,
) -> ConnectorMetadata: ...
```

```py filename="main.py"
from vercel import connect

connector = await connect.get_connector_metadata('snowflake/analytics')
account_identifier = connector.vendor['accountIdentifier']

print(connector.name)
print(account_identifier)
```

The calling project and environment must be linked to the connector, just as they must be for `get_token()`.

## `start_authorization()`

Starts an end-user consent flow and returns a URL to send the user to. Vercel Connect owns the OAuth client, PKCE, state, and the callback handshake, so you don't implement any of it.

```py filename="signature"
async def start_authorization(
    connector: str,
    *,
    subject: ConnectTokenSubject,
    scopes: StringContainer | None = None,
    installation_id: str | None = None,
    return_url: str | None = None,
    webhook: str | None = None,
    device_code: bool | None = None,
    expires_in: DurationInput | None = None,
    options: ConnectOptions | None = None,
) -> ConnectAuthorizationResponse: ...
```

| Parameter         | Type                         | Description                                                                                                  |
| ----------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `subject`         | `ConnectTokenSubject`        | The subject to authorize, usually a `ConnectUserTokenSubject`.                                               |
| `scopes`          | `list[str]`                  | Requested scopes. Omit for the connector's defaults.                                                        |
| `installation_id` | `str`                        | Target one installation.                                                                                     |
| `return_url`      | `str`                        | Where Vercel Connect redirects after consent. Must use `https://`, or `http://` on `localhost` or `127.0.0.1`. |
| `webhook`         | `str`                        | An `https://` URL to notify.                                                                                 |
| `device_code`     | `bool`                       | Return a device code instead of redirecting. Use for CLIs and headless processes.                            |
| `expires_in`      | `int`, `float`, or `timedelta` | How long the authorization request stays valid. Numbers are seconds.                                       |

`start_authorization()` raises `ConnectValidationError` before making a request if `return_url` or `webhook` isn't an allowed URL.

### Web apps

Pass `return_url` and redirect the user to the returned `url`. After they consent, Vercel Connect redirects back to `return_url`, and your next `get_token()` call for that user succeeds:

```py filename="main.py"
from vercel import connect
from vercel.connect import (
    ConnectUserTokenSubject,
    UserAuthorizationRequiredError,
)

subject = ConnectUserTokenSubject(id=user_id)

try:
    token = await connect.get_token('oauth/linear', subject=subject)
except UserAuthorizationRequiredError:
    authorization = await connect.start_authorization(
        'oauth/linear',
        subject=subject,
        return_url='https://example.com/settings/integrations',
    )
    # In a web app, redirect the user to authorization.url.
```

### CLIs and headless processes

A CLI or background process has nowhere to redirect to. Pass `device_code=True` instead: Vercel Connect returns a short code that the user approves in a browser. Nothing is delivered back to your process, so poll `get_token()` with `force_refresh=True` until it succeeds. Each outcome is its own error class:

```py filename="main.py"
import asyncio

from vercel import connect
from vercel.connect import (
    AuthorizationDeniedError,
    AuthorizationExpiredError,
    AuthorizationPendingError,
    ConnectOptions,
    ConnectUserTokenSubject,
)

subject = ConnectUserTokenSubject(id=user_id)

authorization = await connect.start_authorization(
    'oauth/linear',
    subject=subject,
    device_code=True,
)
print(f'Enter {authorization.device_code} at {authorization.url}')

while True:
    try:
        token = await connect.get_token(
            'oauth/linear',
            subject=subject,
            options=ConnectOptions(force_refresh=True),
        )
        break
    except AuthorizationPendingError:
        await asyncio.sleep(5)
    except (AuthorizationDeniedError, AuthorizationExpiredError):
        raise  # Terminal: start a new authorization to try again.
```

`force_refresh=True` makes each poll reach the server; without it, the SDK could return a cached result. The provider's `slow_down` response also raises `AuthorizationPendingError`, so a fixed interval stays correct.

Set `VERCEL_CONNECT_INTERACTIVE_AUTH_MODE=detached` to make device-code the default for every `start_authorization()` call. If that discards a `return_url` you supplied, the SDK emits a warning.

## `revoke_token()`

Revokes the provider grant for a connector subject and drops its cached tokens. This removes the stored authorization server-side, not only the local cache entry. Use it when a user disconnects an integration or you offboard a tenant. Provider support for revocation varies; see [Revocation](/docs/connect/concepts/tokens#revocation).

> **💡 Note:** Rate limit: [50 requests per minute per team](/docs/connect/limits#write-operations-50-requests-per-minute-per-team) (write operation).

```py filename="main.py"
from vercel import connect
from vercel.connect import ConnectUserTokenSubject

await connect.revoke_token(
    'oauth/linear',
    subject=ConnectUserTokenSubject(id='user_123'),
)
```

Pass `installation_id` to restrict revocation to one installation.

## `verify_connect_webhook()`

Verifies an inbound request that Vercel Connect forwarded from a [trigger](/docs/connect/concepts/triggers). Vercel Connect attaches a Vercel OIDC token as the `Authorization` bearer on every forwarded request, so you verify one token instead of implementing each provider's signature scheme.

```py filename="signature"
async def verify_connect_webhook(
    headers: Mapping[str, str] | Any,
    *,
    project_id: str | None = None,
    environment: str | None = None,
    owner_id: str | None = None,
    audience: str | Sequence[str] | None = None,
) -> ConnectWebhookClaims: ...
```

| Parameter     | Type                   | Description                                                                                                                    |
| ------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `headers`     | `Mapping[str, str]`    | The inbound request headers, or any request object with a `headers` mapping (FastAPI, Starlette, Django, httpx). The SDK only reads `Authorization`. |
| `project_id`  | `str`                  | Expected project. Defaults to `VERCEL_PROJECT_ID`.                                                                             |
| `environment` | `str`                  | Expected environment. Defaults to `VERCEL_TARGET_ENV`, then `VERCEL_ENV`.                                                     |
| `owner_id`    | `str`                  | Expected team owner. Checked only when supplied.                                                                               |
| `audience`    | `str` or `list[str]`   | Expected audience.                                                                                                             |

```py filename="main.py"
from fastapi import FastAPI, HTTPException, Request
from vercel.connect import (
    ConnectWebhookVerificationError,
    verify_connect_webhook,
)

app = FastAPI()


@app.post('/api/slack-events')
async def slack_events(request: Request):
    try:
        claims = await verify_connect_webhook(request)
    except ConnectWebhookVerificationError:
        raise HTTPException(status_code=401)

    event = await request.json()
    # Handle the verified event.
    return {'ok': True}
```

Verification pins the issuer to Vercel's OIDC service (`https://oidc.vercel.com` or the team-scoped `https://oidc.vercel.com/<team>`), allows only RS256 signatures, and resolves the signing key from Vercel's JWKS. It accepts any valid Vercel OIDC token for this project and environment; it isn't pinned to a specific connector or deployment.

Verification fails closed. If the SDK can't determine the expected project or environment from the arguments or the environment variables, it rejects every request with `ConnectWebhookVerificationError`.

### `create_connect_webhook_verifier()`

Returns a reusable async verifier bound to a set of expectations. It takes the same keyword arguments as `verify_connect_webhook()`:

```py filename="main.py"
from vercel.connect import create_connect_webhook_verifier

verify = create_connect_webhook_verifier(environment='preview')

claims = await verify(request.headers)
```

## Caching

The SDK keeps an in-process LRU cache of up to 100 tokens per SDK session. A cached token is reused until it falls inside the validity buffer (30 seconds by default) before expiry, at which point the next call fetches a fresh one. Vercel Connect drives the provider's refresh flow server-side, so your code never handles refresh tokens.

Use [`ConnectOptions`](#connectoptions) to control caching for a single call:

- `force_refresh=True`: bypass the cache and revalidate the grant with Vercel Connect. Use it to detect a grant revoked elsewhere and to poll a device-code authorization.
- `no_cache=True`: neither read from nor write to the cache.
- `validity_buffer`: treat a cached token as stale this long before its expiry, in seconds or as a `timedelta`.

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

### `delete_token_cache_entry()`

Drops cached tokens for one connector, subject, and optional installation without revoking the provider grant. The SDK evicts by identity, so you don't need to reconstruct the original scopes or other request parameters. If a provider rejects a token with a `401`, evict it and retry once; that's cheaper than forcing a refresh on every call:

```py filename="main.py"
from vercel import connect
from vercel.connect import ConnectAppTokenSubject

subject = ConnectAppTokenSubject()

token = await connect.get_token('slack/acme-slack', subject=subject)

# If Slack rejects this token with a 401:
connect.delete_token_cache_entry('slack/acme-slack', subject=subject)
token = await connect.get_token('slack/acme-slack', subject=subject)
```

`delete_token_cache_entry()` is synchronous because it doesn't make a request.

### `clear_token_cache()`

Drops every cached token for the active SDK session:

```py filename="main.py"
from vercel import connect

connect.clear_token_cache()
```

## Synchronous API

`vercel.connect.sync` mirrors every function and type on this page with the same names and arguments, without `await`:

```py filename="main.py"
from vercel.connect.sync import ConnectAppTokenSubject, get_token

token = get_token('slack/acme-slack', subject=ConnectAppTokenSubject())
```

The synchronous functions are safe to call from inside a running event loop, but they block the loop for the duration of the request, so prefer the async API in async code. A few rules apply:

- Don't mix modes in one session. Calling a sync function inside an `async with session(...)` block, or the reverse, raises `VercelSessionError`.
- A `vercel_token` callable that returns an awaitable only works with the async API. Pass a plain synchronous callable to `vercel.connect.sync`.
- `create_connect_webhook_verifier()` from `vercel.connect.sync` returns a synchronous verifier.

## Configuration

To change service-level settings, such as the API base URL, request timeout, default validity buffer, or cache size, open a session with `ConnectServiceOptions`:

```py filename="main.py"
from datetime import timedelta

from vercel.api import session
from vercel.connect import (
    ConnectAppTokenSubject,
    ConnectServiceOptions,
    get_token,
)

async with session(
    service_options=[
        ConnectServiceOptions(
            timeout=timedelta(seconds=10),
            token_cache_size=500,
        )
    ]
):
    token = await get_token('slack/acme-slack', subject=ConnectAppTokenSubject())
```

Calls outside a session use a default session with the default settings. For synchronous code, use a plain `with session(...)` block with `vercel.connect.sync`.

## Types

Every type is a frozen [Pydantic](https://docs.pydantic.dev) model. You construct it by keyword, it's validated on construction, and it can't be changed afterward. A misspelled field or invalid value raises `ConnectValidationError` instead of Pydantic's own error.

### Subject types

A subject is one of four models. Subjects are typed values rather than plain dictionaries because most of them carry their own fields. See [Subject types](/docs/connect/concepts/tokens#subject-types) for when to use each:

| Model                          | Acts as                                      | Required fields | Optional fields                                                                                                               |
| ------------------------------ | -------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `ConnectAppTokenSubject`       | Your application or bot                      | none            | none                                                                                                                          |
| `ConnectUserTokenSubject`      | A specific user                              | `id`            | `issuer` (the OIDC issuer of the user ID, when not the default)                                                              |
| `ConnectJwtBearerTokenSubject` | A user asserted by your app (RFC 7523)       | `sub`           | `iss` (defaults to the connector's OAuth client ID), `aud` (defaults to the connector's OAuth token endpoint), `additional_claims` |
| `ConnectTokenExchangeSubject`  | The subject represented by an existing token | `token`         | none                                                                                                                          |

```py filename="main.py"
from vercel.connect import (
    ConnectAppTokenSubject,
    ConnectJwtBearerTokenSubject,
    ConnectTokenExchangeSubject,
    ConnectUserTokenSubject,
)

ConnectAppTokenSubject()
ConnectUserTokenSubject(id='user_123')
ConnectJwtBearerTokenSubject(sub='user@example.com', additional_claims={'tenant': 'acme'})
ConnectTokenExchangeSubject(token=subject_token)
```

`ConnectTokenSubject` is the union of all four.

### Authorization details

Pass `authorization_details` as a list of these models:

- `ConnectGitHubAppInstallationAuthorizationDetail`: a GitHub App installation request with optional `org`, `permissions`, and `repositories`.
- `ConnectCustomAuthorizationDetail`: any other authorization type. Set `type` and put the remaining fields in `details`.

```py filename="main.py"
from vercel import connect
from vercel.connect import (
    ConnectAppTokenSubject,
    ConnectGitHubAppInstallationAuthorizationDetail,
)

token = await connect.get_token(
    'github/acme-github',
    subject=ConnectAppTokenSubject(),
    authorization_details=[
        ConnectGitHubAppInstallationAuthorizationDetail(
            permissions=['contents:read'],
            repositories=['acme/api'],
        )
    ],
)
```

### `ConnectTokenResponse`

| Field              | Type                         | Description                                                                                             |
| ------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| `token`            | `str`                        | The access token to send to the provider.                                                               |
| `token_id`         | `str \| None`                | Per-issuance identifier (`stk_…`) for correlating the token with Connect observability and usage data. |
| `expires_at`       | `datetime`                   | Token expiration time.                                                                                  |
| `connector`        | `ConnectorRef`               | The connector that issued the token. See [`ConnectorRef`](#connectorref).                               |
| `name`             | `str \| None`                | Human-readable connector or installation name, when known.                                             |
| `installation_id`  | `str \| None`                | The installation this token was issued against, when applicable.                                       |
| `tenant_id`        | `str \| None`                | Provider's own tenant identifier (Slack team ID, GitHub org ID, Microsoft tenant GUID).                |
| `external_subject` | `str \| None`                | The subject identifier at the provider, for example the Slack user ID for a user-subject token.        |
| `metadata`         | `Mapping[str, Any] \| None`  | Driver-specific metadata stored during OAuth (varies by provider).                                     |
| `claims`           | `Mapping[str, Any] \| None`  | Allow-listed claims propagated from the upstream provider token.                                       |

### `ConnectorRef`

| Field          | Type          | Description                                                                         |
| -------------- | ------------- | ----------------------------------------------------------------------------------- |
| `id`           | `str`         | Opaque internal identifier for the connector.                                       |
| `uid`          | `str`         | Human-readable connector identifier.                                                |
| `type`         | `str`         | The connector type, such as `slack`, `github`, `oauth`, or `api-key`.               |
| `name`         | `str \| None` | Connector display name.                                                             |
| `service`      | `str \| None` | Service the connector integrates with.                                              |
| `service_name` | `str \| None` | Display name of the service.                                                        |

### `ConnectAuthorizationResponse`

| Field         | Type                    | Description                                                                                  |
| ------------- | ----------------------- | -------------------------------------------------------------------------------------------- |
| `url`         | `str`                   | The consent URL to send the user to.                                                         |
| `request`     | `str`                   | Opaque request identifier, returned for parity with the TypeScript SDK.                      |
| `verifier`    | `str`                   | Opaque verifier, returned for parity with the TypeScript SDK.                                |
| `device_code` | `str \| None`           | The code the user enters, when you passed `device_code=True`.                                |
| `expires_at`  | `datetime \| None`      | When the authorization request expires.                                                      |
| `connector`   | `ConnectorRef \| None`  | The connector being authorized.                                                              |

### `ConnectorMetadata`

| Field        | Type                  | Description                                                                                    |
| ------------ | --------------------- | ---------------------------------------------------------------------------------------------- |
| `id`         | `str`                 | Opaque internal connector identifier.                                                          |
| `uid`        | `str`                 | Human-readable connector identifier.                                                           |
| `type`       | `str`                 | Connector type, such as `snowflake` or `oauth`.                                                |
| `name`       | `str \| None`         | Connector display name.                                                                        |
| `service`    | `str \| None`         | Service the connector integrates with.                                                         |
| `client_url` | `str \| None`         | Fully qualified service URL, when Vercel Connect can derive it.                                 |
| `created_at` | `datetime \| None`    | Creation time.                                                                                 |
| `updated_at` | `datetime \| None`    | Last update time.                                                                              |
| `vendor`     | `Mapping[str, Any]`   | Provider-specific public configuration stored on the connector.                                |
| `extra`      | `Mapping[str, Any]`   | Any other fields the API returns, preserved as-is.                                             |

### `ConnectWebhookClaims`

| Field         | Type                 | Description                                         |
| ------------- | -------------------- | --------------------------------------------------- |
| `issuer`      | `str`                | The token issuer.                                   |
| `subject`     | `str`                | The token subject.                                  |
| `project_id`  | `str \| None`        | The project the token was issued for.               |
| `environment` | `str \| None`        | The environment the token was issued for.           |
| `owner_id`    | `str \| None`        | The team that owns the project.                     |
| `audience`    | `list[str]`          | The token audiences.                                |
| `issued_at`   | `datetime \| None`   | When the token was issued.                          |
| `expires_at`  | `datetime \| None`   | When the token expires.                             |
| `claims`      | `Mapping[str, Any]`  | Every claim on the verified token.                  |

### `ConnectOptions`

| Field            | Type                                | Default | Description                                                                                                  |
| ---------------- | ----------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `vercel_token`   | `str` or a callable returning one   | `None`  | Override the OIDC token the SDK reads from the environment. Useful for tests and non-Vercel runtimes.        |
| `force_refresh`  | `bool`                              | `False` | Bypass the local cache and revalidate the grant with Vercel Connect.                                         |
| `no_cache`       | `bool`                              | `False` | Neither read from nor write to the local cache.                                                              |
| `validity_buffer`| `int`, `float`, or `timedelta`      | `None`  | Treat a cached token as stale this long before expiry. Numbers are seconds. Client-side only.                |

### `ConnectServiceOptions`

| Field                 | Type        | Default                  | Description                                            |
| --------------------- | ----------- | ------------------------ | ------------------------------------------------------ |
| `base_url`            | `str`       | `https://api.vercel.com` | Vercel API base URL.                                   |
| `timeout`             | `timedelta` | 60 seconds               | Request timeout. Must be greater than zero.            |
| `validity_buffer`     | `timedelta` | 30 seconds               | Default validity buffer for cached tokens.             |
| `token_cache_size`    | `int`       | `100`                    | Maximum number of cached tokens. Must be at least one. |

## Errors

Every error inherits from `ConnectError`. Errors returned by the Connect API inherit from `ConnectApiError`, and the SDK picks the class from the server's error code, so you can match on the class instead of parsing messages:

| Error                                 | Cause                                                                                                                                          |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `UserAuthorizationRequiredError`      | The request used a `ConnectUserTokenSubject` and that user hasn't authorized the connector. Call `start_authorization()`.                       |
| `ConnectorInstallationRequiredError`  | The connector isn't installed for the target tenant. An operator must install it from the dashboard or CLI.                                    |
| `NoValidTokenError`                   | A grant existed, but Vercel Connect can't issue a usable token. The subject must authorize again.                                              |
| `InvalidGrantError`                   | The provider rejected the stored grant, typically because the user revoked access or it expired. The subject must authorize again.            |
| `AuthorizationPendingError`           | A device-code authorization is still waiting on the user. Keep polling.                                                                        |
| `AuthorizationDeniedError`            | The user refused the authorization request. Stop polling.                                                                                      |
| `AuthorizationExpiredError`           | The device code expired before the user consented. Stop polling and start a new authorization.                                                 |
| `ConnectNotFoundError`                | The connector, installation, or token doesn't exist. Usually a wrong connector UID.                                                            |
| `ConnectApiError`                     | Any other Connect API failure, such as a project that isn't [linked](/docs/connect/concepts/project-links) to the connector.                   |
| `ConnectCredentialsError`             | The SDK couldn't resolve a Vercel OIDC token. Run `vercel env pull` or pass `ConnectOptions(vercel_token=...)`.                                |
| `ConnectValidationError`              | An argument was rejected before any request. Also a `ValueError`.                                                                              |
| `ConnectResponseError`                | A successful Connect API response was malformed.                                                                                               |
| `ConnectWebhookVerificationError`     | An inbound trigger request couldn't be verified.                                                                                               |

`ConnectApiError` and its subclasses expose these attributes for logging and debugging:

| Attribute     | Description                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------- |
| `status_code` | HTTP status code.                                                                                 |
| `code`        | Server-supplied error code, when present.                                                         |
| `request_id`  | The `x-vercel-id` response header, for correlating a failure with Vercel-side observability.      |
| `vendor`      | The provider's own error payload, when Vercel Connect forwards one.                               |
| `data`        | The parsed error body, when it was JSON.                                                          |
| `response`    | The raw HTTP response.                                                                            |

## CLI parity

Most SDK calls have a [`vercel connect`](/docs/cli/connect) CLI equivalent. The CLI supports `--subject`, `--installation-id`, and `--scopes`. The SDK additionally supports `resources` and `authorization_details`, which the CLI doesn't expose. The CLI supports `--triggers` on `vercel connect attach`, which has no SDK equivalent.

## Next steps

- [Quickstart](/docs/connect/quickstart): Create a connector and request your first token from Python.
- [TypeScript SDK Reference](/docs/connect/ts-sdk-reference): The same API for TypeScript and JavaScript.
- [Tokens](/docs/connect/concepts/tokens): How a token request is shaped and what each field does.
- [Authentication](/docs/connect/concepts/authentication): What the OIDC token carries and how the API checks it.


---

[View full sitemap](/docs/sitemap)
