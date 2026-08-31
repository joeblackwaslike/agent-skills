---
title: Key Management Service (KMS)
product: vercel
url: /docs/kms
canonical_url: "https://vercel.com/docs/kms"
last_updated: 2026-08-18
type: conceptual
prerequisites:
  []
related:
  - /docs/kms/quickstart
  - /docs/kms/concepts/key-rotation
  - /docs/kms/concepts/authentication
  - /docs/kms/ts-sdk-reference
  - /docs/oidc
summary: Sign JWTs and messages with Vercel-managed signing keys. Learn about issuers, keys, and policies, and how to sign from Vercel Functions with...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/kms.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "6b069c8d94ea2c35ed81f14dd7629c310d0b5e2ca467033ce474be5058e125ee"
---

# Key Management Service (KMS)

> **🔒 Permissions Required**: Key Management Service


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sign JWTs from your Functions without managing private keys](https://vercel.com/changelog/sign-jwts-from-your-functions-without-managing-private-keys?from=related&source_path=%2Fdocs%2Fkms&source_site=vercel-docs&relationship=related)
- [Create a signing key](https://vercel.com/docs/rest-api/kms/create-a-signing-key?from=related&source_path=%2Fdocs%2Fkms&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys — Create a new signing key for a KMS issuer. Depending on the activation mode, the
- [Sign a token](https://vercel.com/docs/rest-api/kms/sign-a-token?from=related&source_path=%2Fdocs%2Fkms&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/sign/token — Sign a JWT with a KMS issuer's active signing key. Authenticate the request
- [Activate a signing key](https://vercel.com/docs/rest-api/kms/activate-a-signing-key?from=related&source_path=%2Fdocs%2Fkms&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys/{keyId}/activate — Activate a pending signing key so the issuer starts signing with
- [Revoke a signing key](https://vercel.com/docs/rest-api/kms/revoke-a-signing-key?from=related&source_path=%2Fdocs%2Fkms&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys/{keyId}/revoke — Immediately revoke a signing key that is already scheduled for rev
- [Sign a message](https://vercel.com/docs/rest-api/kms/sign-a-message?from=related&source_path=%2Fdocs%2Fkms&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/sign/message — Sign a raw message with a KMS issuer's active signing key. Authenticate t

Full cross-link map for this page: [/docs/kms.graph.md](/docs/kms.graph.md?from=related&source_path=%2Fdocs%2Fkms&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Vercel Key Management Service (KMS) gives you managed signing keys that live on Vercel. You sign JWTs and messages by calling the KMS signing API from your Vercel Functions, and Vercel publishes the matching public keys so any relying party can verify the result. Your private keys never leave Vercel, so you avoid storing signing material in environment variables.

To sign your first token, follow the [Quickstart](/docs/kms/quickstart). For the conceptual model, see [Key rotation](/docs/kms/concepts/key-rotation) and [Authentication](/docs/kms/concepts/authentication).

## How signing and verification work

Every signing request runs through two managed pieces:

- **Signing**: Your code calls the KMS signing API through the [`@vercel/kms`](/docs/kms/ts-sdk-reference) SDK. Inside a Vercel Function, the deployment's [OIDC token](/docs/oidc) authorizes the request automatically, so you manage no credentials.
- **Verification**: Vercel publishes each issuer's public keys as a JWKS at a stable URL. A relying party fetches the JWKS and verifies the signature without contacting Vercel. KMS sets the JWT `kid` header on each signature, so a verifier selects the right key automatically.

## KMS primitives

- **Issuer**: A team-owned signing identity with a stable ID, a public issuer URL, and one or more signing keys. You reference an issuer by its ID when you sign.
- **Signing keys**: The key material an issuer signs with. KMS supports `RS256`, `RS384`, `RS512`, the `PS*` and `ES*` families, and `EdDSA`, and defaults to `RS512`. KMS does not support symmetric (`HS*`) keys.
- **Key origin**: KMS can generate the key for you (a `vercel`-origin issuer), or you can import an existing PEM private key (an `external`-origin issuer). Import a key when the other side generates the key pair and keeps your public key, such as a GitHub App.
- **Policies**: Rules that authorize signing. The deployment-OIDC policy (`project-grant`) lets a deployment sign when its OIDC token matches the granted project and environments. See [Authentication](/docs/kms/concepts/authentication).
- **Certificates**: An issuer can expose a self-signed X.509 certificate for its active signing key, for workloads that require a PEM certificate rather than a JWKS lookup.
- **Key rotation**: You rotate keys with a grace period so older tokens still verify while clients pick up the new key. See [Key rotation](/docs/kms/concepts/key-rotation).

## Public discovery and verification

Every issuer publishes its public keys so relying parties can verify signatures:

- Issuer URL: `https://kms.vercel.com/<issuerId>`
- JWKS: `https://kms.vercel.com/<issuerId>/jwks.json`
- OpenID configuration: `https://kms.vercel.com/<issuerId>/.well-known/openid-configuration`

## Best practices

Create a separate issuer for each project and each environment, for example distinct issuers for `production`, `preview`, and `development`, instead of sharing one issuer across projects or environments. Scoping issuers this way:

- Keeps each issuer's signing policy limited to the smallest surface.
- Isolates each published JWKS, so a relying party can trust one project and environment at a time.
- Limits blast radius, and lets you rotate or revoke one issuer's keys without affecting the others.

This also pairs naturally with the deployment-OIDC `project-grant` policy, which is already scoped to a project and its environments.

## When to use KMS

Use KMS when you need to sign JWTs or messages from a Vercel Function without storing a private key in your deployment, when relying parties need to verify those signatures against a published JWKS, or when you want to rotate signing keys without changing the issuer that verifiers trust.

## Pricing

KMS is billed per signing operation, with no per-key or per-issuer charge. For the full rate table, limits, and how to stop being billed, see [Pricing and Limits](/docs/kms/pricing).

## Resources

- **[Quickstart](/docs/kms/quickstart)**: Sign and verify your first token from a Vercel Function.
- **[Key rotation](/docs/kms/concepts/key-rotation)**: Stage, schedule, and retire signing keys without downtime.
- **[Authentication](/docs/kms/concepts/authentication)**: How signing and management requests are authorized, and how relying parties verify.
- **[SDK Reference](/docs/kms/ts-sdk-reference)**: API reference for `@vercel/kms`, including `signToken` and `signMessage`.
- **[Pricing and Limits](/docs/kms/pricing)**: Rates, platform limits, and how to stop being billed.

## Related

- [OIDC federation](/docs/oidc)
- [Vercel Connect](/docs/connect)
- [Vercel Functions](/docs/functions)
- [`@vercel/kms` on npm](https://www.npmjs.com/package/@vercel/kms)


---

[View full sitemap](/docs/sitemap)
