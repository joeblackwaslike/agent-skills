---
title: Python SDK Reference
product: vercel
url: /docs/passport/python-sdk-reference
canonical_url: "https://vercel.com/docs/passport/python-sdk-reference"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/passport
related:
  - /docs/passport
  - /docs/passport/read-identity
  - /docs/passport/forward-identity
  - /docs/passport/token-claims
  - /docs/passport/verify-identity
summary: Read and verify Vercel Passport identities in Python with asynchronous and synchronous helpers, typed identity models, and local development fixtures.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/passport/python-sdk-reference.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "bddb04711d6a2f1ad55fcc861622202623bf6a4c463305e1deec8c71ddc53dd3"
---

# Python SDK Reference

`vercel-passport` reads and verifies [Vercel Passport](/docs/passport) visitor identities in server-side Python code. Use it to read the current request, require an identity with a token, or verify a token forwarded from another application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Passport is now generally available](https://vercel.com/changelog/vercel-passport-generally-available)
- [Protect internal apps with Vercel Passport and your identity provider](https://vercel.com/kb/guide/vercel-passport) — Vercel Passport protects internal apps behind your own identity provider, such as Okta or Microsoft Entra ID. Learn how
- [Identify users and control access in Next.js with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-nextjs) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in Next.js, then personalize pages, restri
- [Use Vercel Passport with Node.js and Python backends](https://vercel.com/kb/guide/vercel-passport-backend-frameworks) — Secure internal apps and verify a visitor's identity with Vercel Passport in your backend, with examples for Express, Ho
- [Using Vercel Passport with Microsoft Entra ID](https://vercel.com/kb/guide/vercel-passport-microsoft-entra-id) — Configure Microsoft Entra ID and Vercel Passport to protect a Next.js app, limit access to assigned users, and read veri
- [Vercel Passport is now in Public Beta](https://vercel.com/changelog/vercel-passport-is-now-in-public-beta)
- [Set up Passport with an identity provider](https://vercel.com/docs/passport/set-up-identity-provider) — Configure Passport with Okta, Microsoft Entra ID, or another OpenID Connect provider.
- [Chat SDK with Vercel Passport](https://vercel.com/docs/chat-sdk/integrations/passport) — Use a verified Vercel Passport identity to store and retrieve per-user conversation history in a Chat SDK bot.
- [OIDC Federation Reference](https://vercel.com/docs/oidc/reference) — Review helper libraries to help you connect with your backend and understand the structure of an OIDC token.

Full cross-link map for this page: [/docs/passport/python-sdk-reference.graph.md](/docs/passport/python-sdk-reference.graph.md)
<!-- /docsgraph:related -->

## Install

The SDK requires Python 3.10 or later:

```bash filename="Terminal"
uv add vercel-passport
```

If you use pip, run `pip install vercel-passport` instead.

Import asynchronous helpers from `vercel.passport`. For synchronous applications, import the same names from [`vercel.passport.sync`](#synchronous-api).

## Choose an identity helper

| Function | Returns | Use it to |
| --- | --- | --- |
| `get_identity()` | `PassportIdentity` or `None` | Read the current visitor, allowing no identity or a local development fixture. |
| `require_identity()` | `PassportIdentity` | Read an identity that has a token, raising when the identity or token is missing. |
| `verify_identity(source)` | `PassportIdentity` | Always verify a token supplied by another application, with no development fallback. |

All three helpers verify tokens read from request headers or cookies. `get_identity()` and `require_identity()` also support explicit debugging tokens whose verification depends on the `verify` option. See [Token resolution](#token-resolution).

## `get_identity()`

Returns the current visitor's identity, or `None` when no token or local identity is available. Invalid tokens raise an error rather than returning `None`.

With no `request` argument, the helper reads the current request headers recorded by the Vercel Python runtime. You can also pass a header mapping or a request object with a `headers` mapping, such as a FastAPI, Starlette, Django, Flask, or httpx request.

For example, read a visitor in a FastAPI route:

```py filename="main.py"
from fastapi import FastAPI, HTTPException, Request
from vercel.passport import PassportIdentityError, get_identity

app = FastAPI()


@app.get('/api/me')
async def me(request: Request):
    try:
        identity = await get_identity(request, cookies=request.cookies)
    except PassportIdentityError:
        raise HTTPException(status_code=401, detail='Unauthorized') from None

    if identity is None:
        raise HTTPException(status_code=401, detail='Unauthorized')

    return {
        'issuer': identity.payload['iss'],
        'subject': identity.subject,
        'email': identity.email,
    }
```

Use `identity.subject` as the visitor identifier for a single Passport issuer. If you accept multiple issuers, store `identity.payload['iss']` with the subject. Treat profile fields such as `email` and `name` as optional. Your application must still [authorize each visitor's actions](/docs/passport/read-identity#apply-application-level-authorization).

### Parameters

All parameters after `request` are keyword-only. `require_identity()` accepts the same parameters.

| Parameter | Type | Default and behavior |
| --- | --- | --- |
| `request` | `object` or `None` | Defaults to `None`, which reads the runtime request context. Accepts a header mapping or an object exposing one as `headers`. |
| `token` | `str` or `None` | Explicit token. Takes precedence over request headers and cookies. Intended for debugging; use `verify=True` to verify it. |
| `cookies` | `Mapping[str, str]` or `None` | Explicit cookies, such as `request.cookies`. For each cookie, the SDK checks this mapping before the `Cookie` header. |
| `verify` | `bool` | Defaults to `False`. Controls verification only for `token` and `VERCEL_PASSPORT_TOKEN`; request tokens are always verified. |
| `allow_unverified` | `bool` or `None` | Defaults to allowing unverified debugging tokens only in local development. `False` rejects them. `True` explicitly permits them even on deployments; it doesn't skip verification of request tokens. |
| `project_id` | `str` or `None` | Expected source project ID. Defaults to `VERCEL_PROJECT_ID`. |
| `environment` | `str` or `None` | Expected source environment. Defaults to `VERCEL_TARGET_ENV`, then `VERCEL_ENV`. |
| `owner_id` | `str` or `None` | Expected source team ID. Checked only when supplied. |
| `audience` | `str`, `Sequence[str]`, or `None` | Expected audience or accepted audiences. Checked only when supplied. |

### Token resolution

`get_identity()` and `require_identity()` use the first available token in this order:

1. The `token` argument.
2. The `x-vercel-oidc-passport-token` header.
3. The `_vercel_passport` cookie.
4. The `VERCEL_PASSPORT_TOKEN` environment variable.

The SDK reassembles chunked Passport cookies and checks their checksum before verification. A missing chunk or invalid checksum raises `PassportIdentityError`. A valid higher-priority header takes precedence over a malformed cookie.

These two helpers don't read `Authorization: Bearer`. Use [`verify_identity()`](#verify_identity) for forwarded bearer tokens.

If no token is available, the helpers resolve [local identities](#local-development). `get_identity()` can return these fixtures; `require_identity()` rejects them because they have no token.

## `require_identity()`

Resolves identity with the same arguments and precedence as `get_identity()`, but raises `PassportIdentityError` when no identity exists or the identity has no token. The returned identity's `token` is set, which lets you [forward it to a backend you operate](/docs/passport/forward-identity).

For example, build an authorization header for a server-to-server request:

```py filename="identity.py"
from vercel.passport import require_identity


async def backend_headers(request: object) -> dict[str, str]:
    identity = await require_identity(request, verify=True)
    return {'Authorization': f'Bearer {identity.token}'}
```

`require_identity()` requires a token, not unconditional verification. An explicit debugging token can still produce `verified=False` when `verify=False` and unverified tokens are allowed. Use `verify=True` or `verify_identity()` when accepting an explicit token as proof of identity.

## `verify_identity()`

Always verifies a supplied token and returns a `PassportIdentity` with `verified=True`. It never uses runtime request context, debugging environment variables, or development identities.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `source` | `str`, `object`, or `None` | Required argument. A token string, header mapping, or request object with a `headers` mapping. `None` can be used with explicit `cookies`; it doesn't read runtime headers. |
| `cookies` | `Mapping[str, str]` or `None` | Explicit cookies, checked before the `Cookie` header. |
| `project_id` | `str` or `None` | Expected source project ID. Defaults to `VERCEL_PROJECT_ID`. |
| `environment` | `str` or `None` | Expected source environment. Defaults to `VERCEL_TARGET_ENV`, then `VERCEL_ENV`. |
| `owner_id` | `str` or `None` | Expected source team ID. Checked only when supplied. |
| `audience` | `str`, `Sequence[str]`, or `None` | Expected audience or accepted audiences. Checked only when supplied. |

For a request or header mapping, the helper checks `Authorization: Bearer` first, then `x-vercel-oidc-passport-token`, then `_vercel_passport`. Header names are case-insensitive. A missing or malformed token raises an error.

A receiving backend must validate the **source** project and environment that minted the token. For example:

```py filename="main.py"
from fastapi import FastAPI, HTTPException, Request
from vercel.passport import PassportIdentityError, verify_identity

app = FastAPI()


@app.post('/api/orders')
async def orders(request: Request):
    try:
        identity = await verify_identity(
            request,
            owner_id='team_your_team_id_here',
            project_id='prj_your_project_id_here',
            environment='production',
        )
    except PassportIdentityError:
        raise HTTPException(status_code=401, detail='Unauthorized') from None

    return {'subject': identity.subject, 'email': identity.email}
```

### Verification rules

Verification accepts only RS256 signatures using Vercel's signing keys. It checks the Passport issuer family, including `https://passport.vercel.com` and owner-scoped issuers under it. A regular Vercel OpenID Connect (OIDC) token doesn't satisfy the required Passport claims.

The expected project and environment must both resolve from arguments or environment variables. If either is missing, verification fails. Both use exact equality: `'*'` is a literal value, and lists of projects or environments aren't supported. `owner_id` and `audience` add checks only when you provide them; the SDK doesn't infer an audience from the project.

The verifier requires `exp` and checks time claims with a fixed 60-second clock-skew allowance, including `nbf` and `iat` when present. See [Passport token claims](/docs/passport/token-claims) for the token schema.

## Identity models

### `PassportIdentity`

The returned identity exposes these fields:

| Field | Type | Description |
| --- | --- | --- |
| `subject` | `str` | Passport visitor identifier from `sub`. Treat it as opaque. |
| `external_subject` | `str` | Visitor identifier at the upstream identity provider, from `external_sub`. |
| `connector_id` | `str` | Passport Connector ID. |
| `owner` | `PassportOwner` | Source team, with `slug: str` and optional `id: str`. |
| `project` | `PassportProject` or `None` | Source project, with `id: str` and optional `name: str`. Present only when the claims contain a project ID; every verified token has one. |
| `environment` | `str` or `None` | Source deployment environment. |
| `external_issuer` | `str` or `None` | Upstream identity provider issuer, from `external_iss`. |
| `email`, `name` | `str` or `None` | Optional profile fields returned by the identity provider. |
| `token` | `str` or `None` | Encoded token. Local fixtures have no token. |
| `token_source` | `TokenSource` | `'header'`, `'cookie'`, or `'local'`. Explicit token strings and environment tokens use `'local'`, even after verification. |
| `verified` | `bool` | Whether the SDK verified the token's signature and claims. |
| `payload` | `dict[str, Any]` | All claims, including additional claims without dedicated fields. |

`PassportIdentity`, `PassportOwner`, and `PassportProject` are frozen Pydantic models. Use `identity.model_dump()` or `identity.model_dump_json()` to serialize an identity. Both exclude `token`; the representation also excludes `token` and `payload`. Serialized claims can still include profile data, so return only fields your client needs.

The model fields cannot be reassigned, but `payload` is a mutable deep copy of the original claims. Mutating it doesn't update the derived identity fields or rerun verification. Constructing a `PassportIdentity` yourself validates its shape; it doesn't cryptographically verify a token. Use the helpers for verification.

### Constants and type aliases

| Export | Value or type |
| --- | --- |
| `PASSPORT_HEADER_NAME` | `'x-vercel-oidc-passport-token'` |
| `PASSPORT_COOKIE_NAME` | `'_vercel_passport'` |
| `PassportClaims` | `Mapping[str, Any]` |
| `TokenSource` | `Literal['header', 'cookie', 'local']` |

## Local development

Without a Passport token or an explicit local fixture, `get_identity()` returns `None`. Unlike the JavaScript helper, the Python SDK doesn't synthesize a test visitor by default.

### `local_identity()`

Use this context manager to supply an identity for local requests without a token. It accepts a `PassportDevelopmentIdentity` or a mapping of full Passport claims. The same synchronous `with` block works inside async functions:

```py filename="local_identity.py"
import asyncio

from vercel.passport import PassportDevelopmentIdentity, get_identity, local_identity


async def main():
    fixture = PassportDevelopmentIdentity(owner='acme', external_subject='user_dev')
    with local_identity(fixture):
        identity = await get_identity({})
        assert identity is not None
        print(identity.external_subject)
        print(identity.verified)


asyncio.run(main())
```

This local example prints `user_dev` and `False`. On leaving the block, the previous context identity is restored. Tasks started inside the block inherit the identity, as do threads started with `anyio.to_thread` or `asyncio.to_thread`. Plain `threading.Thread` instances don't inherit it.

### Environment-based fixtures

When no token is available, local identity resolution checks:

1. The current `local_identity()` context.
2. Full claims supplied as JSON in `VERCEL_PASSPORT_IDENTITY`.
3. A synthesized `PassportDevelopmentIdentity` when `VERCEL_PASSPORT_DEV=1` or `true`.

Enable the synthesized fixture in your local process environment:

```bash filename="Terminal"
export VERCEL_PASSPORT_DEV=1
```

The SDK emits `PassportDevelopmentIdentityWarning` once per process when it uses a synthesized identity. All local fixtures have `verified=False`, `token=None`, and `token_source='local'`. `require_identity()` rejects them.

Local fixtures are disabled when `VERCEL_ENV` is set to anything other than `development`, or when `VERCEL=1` without `VERCEL_ENV=development`. Setting the fixture's own `environment` field doesn't override this restriction. The SDK reads process environment variables; it doesn't load `.env.local` itself.

### `PassportDevelopmentIdentity`

Unset constructor fields read the environment variables below, then use their defaults. Explicit constructor values take precedence. Passing `None` clears an optional field even when its environment variable is set.

| Field | Environment variable | Default |
| --- | --- | --- |
| `owner` | `VERCEL_PASSPORT_DEV_OWNER` | `'local'` |
| `owner_id` | `VERCEL_PASSPORT_DEV_OWNER_ID` | `None` |
| `connector_id` | `VERCEL_PASSPORT_DEV_CONNECTOR_ID` | `'local'` |
| `external_subject` | `VERCEL_PASSPORT_DEV_EXTERNAL_SUB` | `'test-user'` |
| `external_issuer` | `VERCEL_PASSPORT_DEV_EXTERNAL_ISS` | `None` |
| `environment` | `VERCEL_PASSPORT_DEV_ENVIRONMENT` | `'development'` |
| `project` | `VERCEL_PASSPORT_DEV_PROJECT` | `'local'` |
| `project_id` | `VERCEL_PASSPORT_DEV_PROJECT_ID`, then `VERCEL_PROJECT_ID` | `None` |
| `issuer` | `VERCEL_PASSPORT_DEV_ISSUER` | `https://passport.vercel.com/{owner}` |
| `audience` | `VERCEL_PASSPORT_DEV_AUDIENCE` | `https://vercel.com/{owner}/{project}/{environment}` |

`to_claims()` returns the fixture as Passport claims, with `email='test-user@passport.local'` and `name='Test User'`. To customize profile or additional claims, update this claims mapping and pass it to `local_identity()`.

### Debugging with an explicit token

The `token` argument and `VERCEL_PASSPORT_TOKEN` support local debugging. By default, the SDK decodes these tokens without verifying them in local development. Outside local development, it rejects them unless you set `verify=True` or explicitly allow unverified tokens.

For authentication, use `verify_identity()` or pass `verify=True`. The `allow_unverified` option applies only to explicit debugging tokens and never disables verification of request headers or cookies.

## Synchronous API

`vercel.passport.sync` exposes the same functions, models, constants, and arguments. Call its helpers without `await`:

```py filename="identity.py"
from vercel.passport.sync import get_identity


def visitor_subject(request: object) -> str | None:
    identity = get_identity(request)
    return identity.subject if identity is not None else None
```

The synchronous helpers can block while fetching signing keys on a cold cache. Use the asynchronous API in async routes to avoid blocking the event loop.

## Errors and warnings

| Type | Meaning |
| --- | --- |
| `PassportError` | Base exception for Passport operations. |
| `PassportIdentityError` | Missing required identity or token, malformed token or claims, invalid chunked cookie, or disallowed unverified token. |
| `PassportVerificationError` | Signature or claim verification failed, or required project/environment expectations couldn't resolve. Subclass of `PassportIdentityError`. |
| `PassportValidationError` | Invalid model fields, unknown constructor arguments, or an attempt to change frozen fields. Also a `ValueError`. |
| `PassportDevelopmentIdentityWarning` | Warning emitted once per process when the SDK uses a synthesized development identity. |

Catch `PassportIdentityError` to handle both identity and verification failures. Invalid request objects or unsupported `local_identity()` argument types raise `TypeError`. Don't return token contents or verification error details to unauthenticated clients.

## Related resources

- [Read Passport identity](/docs/passport/read-identity)
- [Verify forwarded Passport tokens](/docs/passport/verify-identity)
- [Forward Passport identity](/docs/passport/forward-identity)
- [Passport token claims](/docs/passport/token-claims)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
