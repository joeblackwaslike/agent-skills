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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "691b343be4538a38eabe03399b69a6c3c727c67bb01ba9e2acdd084833a44fcb"
---

# Vercel KMS Quickstart

Sign a JWT from a Vercel Function with a Vercel-managed key, then verify it against the issuer's published JWKS. This takes four steps and no private key material in your deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sign JWTs from your Functions without managing private keys](https://vercel.com/changelog/sign-jwts-from-your-functions-without-managing-private-keys)
- [Vercel KMS Concepts](https://vercel.com/docs/kms/concepts) — Understand how Vercel KMS rotates signing keys and how it authorizes signing, management, and verification.
- [Key Management](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management) — Vercel MCP tools for key management.
- [Sign a token](https://vercel.com/docs/rest-api/kms/sign-a-token) — POST /v1/kms/issuers/{issuerId}/sign/token — Sign a JWT with a KMS issuer's active signing key. Authenticate the request
- [Create a signing key](https://vercel.com/docs/rest-api/kms/create-a-signing-key) — POST /v1/kms/issuers/{issuerId}/keys — Create a new signing key for a KMS issuer. Depending on the activation mode, the
- [Sign a message](https://vercel.com/docs/rest-api/kms/sign-a-message) — POST /v1/kms/issuers/{issuerId}/sign/message — Sign a raw message with a KMS issuer's active signing key. Authenticate t

Full cross-link map for this page: [/docs/kms/quickstart.graph.md](/docs/kms/quickstart.graph.md)
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
  Call `signJWT` inside a route handler. Inside a Vercel Function, the deployment's [OIDC token](/docs/oidc) authorizes the request automatically, so you pass no credentials:
  > **⚠️ Warning:** `signJWT` resolves the function's OIDC token at call time, which requires an
  > active request context. Call it inside a [route
  > handler](https://nextjs.org/docs/app/getting-started/route-handlers) or Server
  > Component, not at the module top level.
  ```ts filename="app/api/sign/route.ts"
  import { signJWT } from '@vercel/kms';

  export async function GET() {
    const { token } = await signJWT({
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
