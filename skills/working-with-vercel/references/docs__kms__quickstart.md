---
title: Vercel KMS Quickstart
product: vercel
url: /docs/kms/quickstart
canonical_url: "https://vercel.com/docs/kms/quickstart"
last_updated: 2026-08-18
type: tutorial
prerequisites:
  - /docs/kms
related:
  - /docs/functions
  - /docs/kms/ts-sdk-reference
  - /docs/oidc
  - /docs/kms/concepts/authentication
  - /docs/kms/concepts/key-rotation
summary: Create a KMS issuer, sign a JWT from a Vercel Function with @vercel/kms, and verify it against the published JWKS.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/kms/quickstart.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "ec74b25a6a7e5b2274fcccb3d2bc588789300ff1888f7a4778904bcc1b62be2a"
---

# Vercel KMS Quickstart

Sign a JWT from a Vercel Function with a Vercel-managed key, then verify it against the issuer's published JWKS. This takes four steps and no private key material in your deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sign JWTs from your Functions without managing private keys](https://vercel.com/changelog/sign-jwts-from-your-functions-without-managing-private-keys?from=related&source_path=%2Fdocs%2Fkms%2Fquickstart&source_site=vercel-docs&relationship=related)
- [Vercel KMS Concepts](https://vercel.com/docs/kms/concepts?from=related&source_path=%2Fdocs%2Fkms%2Fquickstart&source_site=vercel-docs&relationship=related) — Understand how Vercel KMS rotates signing keys and how it authorizes signing, management, and verification.
- [Sign a token](https://vercel.com/docs/rest-api/kms/sign-a-token?from=related&source_path=%2Fdocs%2Fkms%2Fquickstart&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/sign/token — Sign a JWT with a KMS issuer's active signing key. Authenticate the request
- [Create a signing key](https://vercel.com/docs/rest-api/kms/create-a-signing-key?from=related&source_path=%2Fdocs%2Fkms%2Fquickstart&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys — Create a new signing key for a KMS issuer. Depending on the activation mode, the
- [Vercel KMS Pricing and Limits](https://vercel.com/docs/kms/pricing?from=related&source_path=%2Fdocs%2Fkms%2Fquickstart&source_site=vercel-docs&relationship=related) — How Vercel KMS is billed per signing operation, the platform limits that apply, and how to stop being billed.
- [Vercel KMS Project Grants](https://vercel.com/docs/kms/concepts/project-grants?from=related&source_path=%2Fdocs%2Fkms%2Fquickstart&source_site=vercel-docs&relationship=related) — How a project grant authorizes a Vercel deployment to sign with a KMS issuer using its OIDC token, scoped to a team, pro

Full cross-link map for this page: [/docs/kms/quickstart.graph.md](/docs/kms/quickstart.graph.md?from=related&source_path=%2Fdocs%2Fkms%2Fquickstart&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

- A Vercel project deployed as, or containing, a [Vercel Function](/docs/functions).
- The [`@vercel/kms`](/docs/kms/ts-sdk-reference) package installed in your project.

## Sign and verify your first token

- #### Create a signing issuer
  In the Vercel dashboard, open your team's **Key Management** settings and create an issuer. KMS generates a signing key for the issuer using the default `RS512` algorithm.

  Copy the issuer's ID. You reference it whenever you sign, and it forms the public issuer URL at `https://kms.vercel.com/<issuerId>`.

- #### Install the SDK
  Install [`@vercel/kms`](/docs/kms/ts-sdk-reference) in your project:
  ```bash package-manager
  pnpm i @vercel/kms
  ```

- #### Sign a token from a Vercel Function
  Call `signToken` inside a route handler. Inside a Vercel Function, the deployment's [OIDC token](/docs/oidc) authorizes the request automatically, so you pass no credentials:
  > **⚠️ Warning:** `signToken` resolves the function's OIDC token at call time, which requires an
  > active request context. Call it inside a [route
  > handler](https://nextjs.org/docs/app/getting-started/route-handlers) or Server
  > Component, not at the module top level.
  ```ts filename="app/api/sign/route.ts"
  import { signToken } from '@vercel/kms';

  export async function GET() {
    const token = await signToken({
      issuerId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      claims: { sub: 'user_123', scope: 'read:data' },
      ttl: 300, // seconds
    });

    return Response.json({ token });
  }
  ```
  KMS sets the `iat`, `nbf`, and `exp` claims, and `ttl` defaults to 300 seconds.

- #### Verify the token
  A relying party verifies the token against the issuer's JWKS. This example uses [`jose`](https://www.npmjs.com/package/jose):
  ```ts filename="verify.ts"
  import { createRemoteJWKSet, jwtVerify } from 'jose';

  const issuer = 'https://kms.vercel.com/f47ac10b-58cc-4372-a567-0e02b2c3d479';
  const jwks = createRemoteJWKSet(new URL(`${issuer}/jwks.json`));

  const { payload } = await jwtVerify(token, jwks, { issuer });
  ```

## Next steps

- [SDK Reference](/docs/kms/ts-sdk-reference): sign messages, set the region, or call the signing API directly.
- [Authentication](/docs/kms/concepts/authentication): how signing and management requests are authorized.
- [Key rotation](/docs/kms/concepts/key-rotation): rotate signing keys without breaking verification.


---

[View full sitemap](/docs/sitemap)
