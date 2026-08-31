---
title: Vercel KMS SDK Reference
product: vercel
url: /docs/kms/ts-sdk-reference
canonical_url: "https://vercel.com/docs/kms/ts-sdk-reference"
last_updated: 2026-08-18
type: reference
prerequisites:
  - /docs/kms
related:
  - /docs/oidc
  - /docs/kms/quickstart
  - /docs/kms/concepts/authentication
summary: API reference for @vercel/kms, including signToken, signMessage, region resolution, and signing the KMS API directly without the SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/kms/ts-sdk-reference.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "322f299258701274e50850850faad117d35789e8d0d0ed7adb2ee036ab798919"
---

# Vercel KMS SDK Reference

The `@vercel/kms` package wraps the KMS signing API and fetches the function's [OIDC token](/docs/oidc) through [`@vercel/oidc`](/docs/oidc), so you sign without managing credentials.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sign JWTs from your Functions without managing private keys](https://vercel.com/changelog/sign-jwts-from-your-functions-without-managing-private-keys?from=related&source_path=%2Fdocs%2Fkms%2Fts-sdk-reference&source_site=vercel-docs&relationship=related)
- [Sign a token](https://vercel.com/docs/rest-api/kms/sign-a-token?from=related&source_path=%2Fdocs%2Fkms%2Fts-sdk-reference&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/sign/token — Sign a JWT with a KMS issuer's active signing key. Authenticate the request
- [Sign a message](https://vercel.com/docs/rest-api/kms/sign-a-message?from=related&source_path=%2Fdocs%2Fkms%2Fts-sdk-reference&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/sign/message — Sign a raw message with a KMS issuer's active signing key. Authenticate t
- [Create a signing key](https://vercel.com/docs/rest-api/kms/create-a-signing-key?from=related&source_path=%2Fdocs%2Fkms%2Fts-sdk-reference&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys — Create a new signing key for a KMS issuer. Depending on the activation mode, the
- [Vercel KMS Concepts](https://vercel.com/docs/kms/concepts?from=related&source_path=%2Fdocs%2Fkms%2Fts-sdk-reference&source_site=vercel-docs&relationship=related) — Understand how Vercel KMS rotates signing keys and how it authorizes signing, management, and verification.
- [Activate a signing key](https://vercel.com/docs/rest-api/kms/activate-a-signing-key?from=related&source_path=%2Fdocs%2Fkms%2Fts-sdk-reference&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys/{keyId}/activate — Activate a pending signing key so the issuer starts signing with

Full cross-link map for this page: [/docs/kms/ts-sdk-reference.graph.md](/docs/kms/ts-sdk-reference.graph.md?from=related&source_path=%2Fdocs%2Fkms%2Fts-sdk-reference&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **⚠️ Warning:** `signToken` and `signMessage` resolve the function's OIDC token at call time,
> which requires an active request context. Call them inside a [route
> handler](https://nextjs.org/docs/app/getting-started/route-handlers) or Server
> Component, not at the module top level, where no request context exists.

## Installation

```bash package-manager
pnpm i @vercel/kms
```

## signToken

Signs a JWT for an issuer and resolves to the compact JWT string. KMS sets the `iat`, `nbf`, and `exp` claims.

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

| Parameter  | Type                     | Required | Description                                                                       |
| ---------- | ------------------------ | -------- | --------------------------------------------------------------------------------- |
| `issuerId` | `string`                 | Yes      | The ID of the issuer to sign with.                                                |
| `claims`   | `Record<string, unknown>` | No       | Custom claims to include in the token payload.                                    |
| `ttl`      | `number`                 | No       | Token lifetime in seconds. Defaults to 300 seconds.                               |
| `region`   | `string`                 | No       | The KMS region to call. See [Region resolution](#region-resolution).             |

## signMessage

Signs an arbitrary message and resolves to a JOSE Flattened JWS. Pass the message as a `string` (treated as UTF-8) or a `Uint8Array` of raw bytes; `@vercel/kms` base64-encodes it before sending. Message signing is rejected when the issuer's policy defines `tokenClaims`.

```ts filename="app/api/sign-message/route.ts"
import { signMessage } from '@vercel/kms';

export async function GET() {
  // A string is signed as UTF-8 bytes. To sign raw bytes, pass a Uint8Array,
  // for example: message: new Uint8Array([1, 2, 3]).
  const signature = await signMessage({
    issuerId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    message: 'hello world',
  });

  return Response.json({ signature });
}
```

| Parameter  | Type                     | Required | Description                                                            |
| ---------- | ------------------------ | -------- | ---------------------------------------------------------------------- |
| `issuerId` | `string`                 | Yes      | The ID of the issuer to sign with.                                     |
| `message`  | `string \| Uint8Array`   | Yes      | The message to sign. A string is signed as UTF-8 bytes.                |
| `region`   | `string`                 | No       | The KMS region to call. See [Region resolution](#region-resolution).  |

## Region resolution

The client calls the regional KMS host. It reads the region from the `region` option, then the `VERCEL_REGION` environment variable, and produces `https://api-<region>.vercel.com/v1`. When no region is available, it falls back to the global `https://api.vercel.com/v1` host.

## Call the signing API directly

You do not need the SDK to sign. Send an authenticated `POST` to the KMS signing endpoints with any HTTP client. Both endpoints authorize the request with a Vercel OIDC token in the `Authorization: Bearer <token>` header. Inside a Vercel Function, read the deployment's OIDC token with [`@vercel/oidc`](/docs/oidc):

```ts filename="app/api/sign/route.ts"
import { getVercelOidcToken } from '@vercel/oidc';

const issuerId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

export async function GET() {
  const oidcToken = await getVercelOidcToken();
  const region = process.env.VERCEL_REGION;
  const baseUrl = region
    ? `https://api-${region}.vercel.com/v1`
    : 'https://api.vercel.com/v1';

  const response = await fetch(
    `${baseUrl}/kms/issuers/${issuerId}/sign/token`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${oidcToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        claims: { sub: 'user_123', scope: 'read:data' },
        ttl: 300, // seconds, defaults to 300
      }),
    },
  );

  const { token } = await response.json();
  return Response.json({ token });
}
```

The token endpoint returns `{ "token": "<compact JWT>" }`.

To sign a message, `POST` to `/kms/issuers/<issuerId>/sign/message` with a base64-encoded `message`. The endpoint returns `{ "signature": <JOSE Flattened JWS> }`:

```bash
curl -X POST \
  "https://api.vercel.com/v1/kms/issuers/f47ac10b-58cc-4372-a567-0e02b2c3d479/sign/message" \
  -H "authorization: Bearer $VERCEL_OIDC_TOKEN" \
  -H "content-type: application/json" \
  -d "{\"message\": \"$(printf 'hello world' | base64)\"}"
```

## Related

- [Quickstart](/docs/kms/quickstart)
- [Authentication](/docs/kms/concepts/authentication)
- [`@vercel/kms` on npm](https://www.npmjs.com/package/@vercel/kms)


---

[View full sitemap](/docs/sitemap)
