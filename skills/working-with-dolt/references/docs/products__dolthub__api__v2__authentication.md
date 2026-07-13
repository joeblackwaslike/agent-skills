---
title: "Authentication"
description: How to authenticate requests to the DoltHub v2 API.
source: "https://www.dolthub.com/docs/products/dolthub/api/v2/authentication.md"
fetched_at: "2026-07-13T06:56:02.638Z"
sha256: "480bbc31123fd185483075ac3a902cde9ff9a9c56c0a3a192e6facf0aa21c085"
---

# Authentication

_API version: v2_

The v2 API supports two credential types. Both use the `Authorization: Bearer <token>` header.

## Personal access tokens

Create a token at [dolthub.com/settings/tokens](https://www.dolthub.com/settings/tokens). Copy it immediately — it is shown only once.

Include the token on every request that requires authentication:

```sh
curl https://www.dolthub.com/api/v2/user \
  -H 'Authorization: Bearer dh_YOUR_TOKEN_HERE'
```

Tokens have no built-in expiry but can be revoked from the settings page at any time.

## OAuth 2.0

The v2 API also accepts OAuth 2.0 access tokens using the authorization-code flow:

- **Authorization URL:** `https://www.dolthub.com/oauth/authorize`
- **Token URL:** `https://www.dolthub.com/oauth/token`

Scope definitions are listed in the spec. If you are building a third-party integration that acts on behalf of a user, OAuth is the recommended approach.

## Which endpoints require authentication

Most write operations and all operations on private databases require authentication. Public databases can be read (SQL queries, list branches, etc.) without a token.

Endpoints that require authentication will return `401 Unauthorized` if no valid credential is supplied, and `403 Forbidden` if the credential is valid but lacks permission.

See [Models → Problem](models#model-problem) for the error response format.
