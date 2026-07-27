---
title: Token Claims
product: vercel
url: /docs/passport/token-claims
canonical_url: "https://vercel.com/docs/passport/token-claims"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/passport
related:
  - /docs/passport/verify-identity
summary: Learn about token claims on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/passport/token-claims.md"
fetched_at: "2026-07-27T07:38:10.222Z"
sha256: "70b331e3bace171af754514b3f009ab5450c3afdcdf4f33cea0a0adb3cab442c"
---

# Passport token claims

Passport issues a signed JSON Web Token (JWT) after a visitor authenticates. The token combines standard OpenID Connect claims, Vercel deployment context, and identity claims returned through the Connect application.

Claims marked optional only appear when the identity provider or Connect application supplies them. Applications must validate the token before trusting any claim.

## Standard claims

| Claim | Required | Description |
| --- | --- | --- |
| `iss` | Yes | Passport issuer. Team-scoped tokens use `https://passport.vercel.com/[TEAM_SLUG]`. Use `iss` with `sub` when storing a visitor identifier. |
| `sub` | Yes | Stable Passport principal within its issuer and Connector application. Treat it as opaque and do not parse it. |
| `aud` | Yes | Audience for the Vercel owner, source project, and environment that minted the token. |
| `iat` | Yes | Unix timestamp when Passport issued the token. |
| `nbf` | Yes | Unix timestamp before which the token is not valid. |
| `exp` | Yes | Unix timestamp after which the token is not valid. |

## Passport and deployment claims

| Claim | Required | Description |
| --- | --- | --- |
| `typ` | Yes | Token type. Passport tokens use `passport`. |
| `owner` | Yes | Vercel team slug. |
| `owner_id` | Optional | Vercel team ID. |
| `project` | Optional | Name of the Vercel project that minted the token. |
| `project_id` | Optional | ID of the Vercel project that minted the token. |
| `environment` | Optional | Vercel environment that minted the token, such as `production` or `preview`. |
| `scope` | Optional | Host-specific scope for the Passport session. Do not treat this as the list of OAuth scopes requested from the identity provider. |
| `plan` | Optional | Vercel plan recorded when Passport issued the token. |
| `sid` | Optional | Passport session identifier. Do not use it as the visitor identifier. |

## Visitor identity claims

| Claim | Required | Description |
| --- | --- | --- |
| `connector_id` | Yes | ID of the Connect application used to authenticate the visitor. |
| `external_sub` | Yes | Subject returned by the identity provider. It is Connector-specific metadata and is not globally unique. |
| `external_iss` | Optional | Issuer reported for the external identity. |
| `email` | Optional | Visitor email returned by the identity provider. |
| `email_verified` | Optional | Whether the identity provider reports the email as verified. |
| `name` | Optional | Visitor name returned by the identity provider. |
| `tenant_id` | Optional | Tenant identifier returned by supported providers. |
| `installation_id` | Optional | Installation identifier returned by supported providers. |

The token can also include allowlisted claims forwarded by Connect, such as `groups`. Their names and value shapes depend on the identity provider. Validate their presence and type before using them for authorization.

## Choose a visitor identifier

Use `sub` as the visitor identifier when your application accepts tokens from one Passport issuer. When it accepts more than one issuer, store `iss` and `sub` together.

Do not use `email`, `name`, `sid`, or `external_sub` alone as a global identifier. These values can change, can be absent, or can overlap across identity providers and Connector applications.

## Verify claims before use

Reading or decoding a JWT does not verify it. Before trusting these claims, verify the signature, issuer, audience, validity period, `typ`, project, and environment. See [Verify forwarded Passport tokens](/docs/passport/verify-identity).


---

[View full sitemap](/docs/sitemap)
