---
title: Vercel KMS Authentication
product: vercel
url: /docs/kms/concepts/authentication
canonical_url: "https://vercel.com/docs/kms/concepts/authentication"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/kms/concepts
  - /docs/kms
related:
  - /docs/oidc
  - /docs/kms/ts-sdk-reference
  - /docs/kms/concepts/key-rotation
  - /docs/rest-api
  - /docs/kms/concepts/project-grants
summary: How Vercel KMS authorizes signing requests with a deployment OIDC token, authorizes management requests with a Vercel access token, and how relying...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/kms/concepts/authentication.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "334d2d3fd0053e6bc0be2ae9e0ee5905558c64361eb1043d8e78b5e7e9dfd599"
---

# Vercel KMS Authentication

KMS authorizes requests differently depending on what you are doing. Signing is authorized with a short-lived deployment OIDC token, management operations are authorized with a Vercel access token, and relying parties verify signatures against the issuer's published JWKS without authenticating at all.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Quickstart](https://vercel.com/docs/kms/quickstart?from=related) — Create a KMS issuer, sign a JWT from a Vercel Function with @vercel/kms, and verify it against the published JWKS.
- [Sign a token](https://vercel.com/docs/rest-api/kms/sign-a-token?from=related)
- [Create a signing key](https://vercel.com/docs/rest-api/kms/create-a-signing-key?from=related)
- [Create an issuer policy](https://vercel.com/docs/rest-api/kms/create-an-issuer-policy?from=related)
- [Pricing and Limits](https://vercel.com/docs/kms/pricing?from=related) — How Vercel KMS is billed per signing operation, the platform limits that apply, and how to stop being billed.

Full cross-link map for this page: [/docs/kms/concepts/authentication.graph.md](/docs/kms/concepts/authentication.graph.md)
<!-- /docsgraph:related -->

## Authorize signing with an OIDC token

Signing requests are authorized with a Vercel OIDC token in the `Authorization: Bearer <token>` header. Inside a Vercel Function, the deployment's OIDC token is used automatically, so you do not manage any credentials yourself. To learn more about the token, see [OIDC federation](/docs/oidc).

The [`@vercel/kms`](/docs/kms/ts-sdk-reference) SDK resolves the function's OIDC token for you through [`@vercel/oidc`](/docs/oidc). Because the token is resolved at call time, call `signToken` and `signMessage` inside an active request context, not at the module top level.

## Authorize management with an access token

Management operations, such as staging or activating a key during [rotation](/docs/kms/concepts/key-rotation), are authorized with a [Vercel access token](/docs/rest-api#creating-an-access-token) rather than a deployment OIDC token. Pass it in the `Authorization: Bearer <token>` header:

```bash
curl -X POST \
  "https://api.vercel.com/v1/kms/issuers/f47ac10b-58cc-4372-a567-0e02b2c3d479/keys" \
  -H "authorization: Bearer $VERCEL_TOKEN" \
  -H "content-type: application/json" \
  -d '{ "activation": "automatic" }'
```

## Policies

A policy is the rule that authorizes signing for an issuer. KMS supports two policy kinds:

- **[Project grant](/docs/kms/concepts/project-grants)** (`project-grant`): lets a Vercel deployment sign with its OIDC token, scoped to a project and its environments. It confers signing access only, never provisioning.
- **[Connect grant](/docs/kms/concepts/connect-grants)** (`connex-grant`): lets [Vercel Connect](/docs/connect) provision and sign with the issuer on behalf of your team, identified by a Connect client ID.

A policy can also define KMS-owned `tokenClaims`, and an issuer can define a claims schema that validates every token it signs. See [Claims](/docs/kms/concepts/claims).

## Verify a signed token

Relying parties verify signatures against the issuer's public keys without authenticating. Every issuer publishes its public keys so verification needs no contact with Vercel:

- Issuer URL: `https://kms.vercel.com/<issuerId>`
- JWKS: `https://kms.vercel.com/<issuerId>/jwks.json`
- OpenID configuration: `https://kms.vercel.com/<issuerId>/.well-known/openid-configuration`

KMS sets the JWT `kid` header on each signature, so a verifier picks the right key from the JWKS automatically. This example uses [`jose`](https://www.npmjs.com/package/jose):

```ts filename="verify.ts"
import { createRemoteJWKSet, jwtVerify } from 'jose';

const issuer = 'https://kms.vercel.com/f47ac10b-58cc-4372-a567-0e02b2c3d479';
const jwks = createRemoteJWKSet(new URL(`${issuer}/jwks.json`));

const { payload } = await jwtVerify(token, jwks, { issuer });
```

## Related

- [Key rotation](/docs/kms/concepts/key-rotation)
- [OIDC federation](/docs/oidc)


---

[View full sitemap](/docs/sitemap)
