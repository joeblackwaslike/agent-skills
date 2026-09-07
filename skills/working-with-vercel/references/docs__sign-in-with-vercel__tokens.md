---
title: Tokens
product: vercel
url: /docs/sign-in-with-vercel/tokens
canonical_url: "https://vercel.com/docs/sign-in-with-vercel/tokens"
last_updated: 2026-03-30
type: how-to
prerequisites:
  - /docs/sign-in-with-vercel
related:
  - /docs/sign-in-with-vercel/authorization-server-api
  - /docs/sign-in-with-vercel/manage-from-dashboard
summary: Learn how to Sign in with Vercel
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sign-in-with-vercel/tokens.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "3c664387fba8661cf06c4ddd14e13d539382ce5481cb7e6226b46ecf105a437b"
---

# Tokens

There are three tokens your application will work with when using Sign in with Vercel:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing new token formats and secret scanning](https://vercel.com/changelog/new-token-formats-and-secret-scanning?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Ftokens&source_site=vercel-docs&relationship=related)
- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Ftokens&source_site=vercel-docs&relationship=related) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [How do I use a Vercel API Access Token?](https://vercel.com/kb/guide/how-do-i-use-a-vercel-api-access-token?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Ftokens&source_site=vercel-docs&relationship=related) — An Access Token is required in order to use the Vercel API. Tokens can be created and managed at the level of your accou
- [OIDC Federation Reference](https://vercel.com/docs/oidc/reference?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Ftokens&source_site=vercel-docs&relationship=related) — Review helper libraries to help you connect with your backend and understand the structure of an OIDC token.
- [List Auth Tokens](https://vercel.com/docs/rest-api/authentication/list-auth-tokens?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Ftokens&source_site=vercel-docs&relationship=related) — GET /v6/user/tokens — Retrieve a list of the current User's authentication tokens.
- [Tokens](https://vercel.com/docs/connect/concepts/tokens?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Ftokens&source_site=vercel-docs&relationship=related) — Short-lived provider credentials issued by Vercel Connect. Each token request specifies a subject, optional installation
- [Access tokens](https://vercel.com/docs/accounts/access-tokens?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Ftokens&source_site=vercel-docs&relationship=related) — Create and scope Vercel access tokens to your full account, a team, or a single project, then use them to authenticate A
- [Sign a token](https://vercel.com/docs/rest-api/kms/sign-a-token?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Ftokens&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/sign/token — Sign a JWT with a KMS issuer's active signing key. Authenticate the request

Full cross-link map for this page: [/docs/sign-in-with-vercel/tokens.graph.md](/docs/sign-in-with-vercel/tokens.graph.md?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Ftokens&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- [ID Token](#id-token)
- [Access Token](#access-token)
- [Refresh Token](#refresh-token)

## ID Token

The ID Token is a signed JWT that contains information about the user who is signing in. When using ID Token claims, your application should both decode the token and verify its signature against the [public JWKS endpoint](https://vercel.com/.well-known/jwks) to ensure authenticity. The ID Token does not give access to Vercel resources, it only proves the user's identity.

```json filename="ID Token payload example"
{
  "iss": "https://vercel.com",
  "sub": "345e869043f1e55f8bdc837c",
  "aud": "cl_be6c3c8b9f340d4a20feefab2862a49a",
  "exp": 1519948800,
  "iat": 1519945200,
  "nbf": 1519945200,
  "jti": "50e67781-c8b6-4391-98d1-89d755bb095a",
  "name": "Timmy Triangle",
  "preferred_username": "timmy-triangle",
  "picture": "https://api.vercel.com/www/avatar/00159aa4c88348dedc91a456b457d1baa48df6d",
  "email": "user@example.com",
  "nonce": "a4a522fa63f9cea6eeb1"
}
```

The code below shows how to decode and validate an ID token using the [jose](https://www.npmjs.com/package/jose) library:

```ts
import { jwtVerify, createRemoteJWKSet } from 'jose';

const jwkSet = createRemoteJWKSet(
  new URL('https://vercel.com/.well-known/jwks'),
);

async function decodeIdToken(idToken: string) {
  const { payload } = await jwtVerify(idToken, jwkSet, {
    issuer: 'https://vercel.com',
    audience: [process.env.NEXT_PUBLIC_VERCEL_APP_CLIENT_ID],
  });

  return payload;
}
```

### JWT claims in ID Tokens

Vercel's IdP generates OpenID Connect tokens that contain various JWT claims depending on the requested scopes:

| Claim   | Type   | Description                                                       | Example                                  |
| ------- | ------ | ----------------------------------------------------------------- | ---------------------------------------- |
| `iss`   | string | **Issuer** - The server that issued the token                     | `"https://vercel.com"`                   |
| `sub`   | string | **Subject** - Unique identifier for the authenticated user        | `"345e869043f1e55f8bdc837c"`             |
| `aud`   | string | **Audience** - The ID of the Vercel application                   | `"cl_be6c3c8b9f340d4a20feefab2862a49a"`  |
| `exp`   | number | **Expiration time** - Unix timestamp when the token expires       | `1519948800`                             |
| `iat`   | number | **Issued at** - Unix timestamp when the token was issued          | `1519945200`                             |
| `nbf`   | number | **Not before** - Unix timestamp before which the token is invalid | `1519945200`                             |
| `jti`   | string | **JWT ID** - Unique identifier for this specific token            | `"50e67781-c8b6-4391-98d1-89d755bb095a"` |
| `nonce` | string | Cryptographic nonce for replay protection                         | `"a4a522fa63f9cea6eeb1"`                 |

### Scope dependent claims

Depending on the scopes requested the following claims will be included in the ID Token:

| Scope     | Claims               | Description                                                 | Example                                          |
| --------- | -------------------- | ----------------------------------------------------------- | ------------------------------------------------ |
| `profile` | `name`               | The user's full display name                                | `"Timmy Triangle"`                               |
| `profile` | `preferred_username` | The user's username on Vercel                               | `"timmy-triangle"`                               |
| `profile` | `picture`            | URL to the user's avatar image (only if user has an avatar) | `"https://api.vercel.com/www/avatar/avatar-42…"` |
| `email`   | `email`              | The user's email address                                    | `"user@example.com"`                             |

## Access Token

The Access Token grants your application permission to access specific resources on Vercel on behalf of the user trying to sign in. It is used to authenticate requests to Vercel's REST API. Access Tokens use an opaque format that ensures they are not readable by humans, are secure, and have server side validation to ensure they are not tampered with.

```plaintext filename="Access Token example"
vca_BQuu9ChDu3n6Pfh6YQnCshpoYkWDSFKogLqmBtQ0tC8NAA5rXt340sjz
```

Access Tokens are valid for one hour. Refresh Tokens can be exchanged to receive new Access Tokens when they expire. Refresh Tokens are valid for 30 days. When you exchange a Refresh Token for an Access Token, you also receive a new Refresh Token.

When using the Access Token in your application code to fetch the user's data, it must be included in the `Authorization` header as a Bearer token.

```ts filename="Fetching the users data with the Access Token"
const result = await fetch('https://api.vercel.com/v2/user', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## Refresh Token

Refresh Tokens allow your application to get a new Access Token without asking the user to sign in again. The token lasts for 30 days and rotates each time it's used. When the Access Token expires or is about to expire, a Refresh Token can be exchanged for a new Access and Refresh token pair.

Each Refresh Token is single use and automatically rotated on exchange, invalidating the previous token.

Refresh Tokens use an opaque format that ensures they are not readable by humans, are secure, and have server side validation to ensure they are not tampered with.

```plaintext filename="Refresh Token example"
vcr_BQuu9ChDu3n6Pfh6YQnCshpoYkWDSFKogLqmBtQ0tC8NAA5rXt340sjz
```

## Securing your tokens

Access and Refresh Tokens are sensitive credentials and should be stored securely. Never expose them to the client side of your application.

- They can be stored in cookies with the `HttpOnly`, `Secure` and `SameSite=Strict` attributes
- They can be stored in a database with encryption
- Revoke tokens immediately if you suspect they have been compromised, either by calling the [Revoke Token Endpoint](/docs/sign-in-with-vercel/authorization-server-api#revoke-token-endpoint) or by invalidating all tokens for your application from the [dashboard](/dashboard). See [manage Sign in with Vercel from the dashboard](/docs/sign-in-with-vercel/manage-from-dashboard) for more information.


---

[View full sitemap](/docs/sitemap)
