---
title: Passport token claims
product: vercel
url: /docs/passport/token-claims
canonical_url: "https://vercel.com/docs/passport/token-claims"
last_updated: 2026-07-20
type: reference
prerequisites:
  - /docs/passport
related:
  - /docs/passport/verify-identity
summary: Review the standard, deployment, and visitor identity claims in a Passport token.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/passport/token-claims.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "8caadee57fe26032621a508bcf2e29118be1cd78156619da0717c97cd544773e"
---

# Passport token claims

Passport issues a signed JSON Web Token (JWT) after a visitor authenticates. The token combines standard OpenID Connect claims, Vercel deployment context, and identity claims returned through the Connect application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Passport is now generally available](https://vercel.com/changelog/vercel-passport-generally-available)
- [Protect internal apps with Vercel Passport and your identity provider](https://vercel.com/kb/guide/vercel-passport) — Vercel Passport protects internal apps behind your own identity provider, such as Okta or Microsoft Entra ID. Learn how
- [Use Vercel Passport with Node.js and Python backends](https://vercel.com/kb/guide/vercel-passport-backend-frameworks) — Secure internal apps and verify a visitor's identity with Vercel Passport in your backend, with examples for Express, Ho
- [Identify users and control access in Next.js with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-nextjs) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in Next.js, then personalize pages, restri
- [Personalize and lock down a Nuxt app with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-nuxt) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in Nuxt server routes, then personalize pa
- [Build user-aware TanStack Start apps with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-tanstack-start) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in TanStack Start server functions, then p
- [Vercel Passport is now in Public Beta](https://vercel.com/changelog/vercel-passport-is-now-in-public-beta)
- [OIDC Federation Reference](https://vercel.com/docs/oidc/reference) — Review helper libraries to help you connect with your backend and understand the structure of an OIDC token.
- [Tokens](https://vercel.com/docs/sign-in-with-vercel/tokens) — Learn how to Sign in with Vercel
- [Set up Passport with an identity provider](https://vercel.com/docs/passport/set-up-identity-provider) — Configure Passport with Okta, Microsoft Entra ID, or another OpenID Connect provider.
- [Vercel KMS Claims](https://vercel.com/docs/kms/concepts/claims) — How a KMS grant sets KMS-owned token claims the caller cannot override, and how an issuer claims schema validates every

Full cross-link map for this page: [/docs/passport/token-claims.graph.md](/docs/passport/token-claims.graph.md)
<!-- /docsgraph:related -->

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
