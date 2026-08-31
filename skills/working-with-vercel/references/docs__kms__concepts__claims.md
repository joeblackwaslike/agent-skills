---
title: Vercel KMS Claims
product: vercel
url: /docs/kms/concepts/claims
canonical_url: "https://vercel.com/docs/kms/concepts/claims"
last_updated: 2026-08-18
type: conceptual
prerequisites:
  - /docs/kms/concepts
  - /docs/kms
related:
  - /docs/kms/concepts/project-grants
  - /docs/kms/concepts/connect-grants
  - /docs/kms/ts-sdk-reference
summary: How a KMS grant sets KMS-owned token claims the caller cannot override, and how an issuer claims schema validates every token it signs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/kms/concepts/claims.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "e8ca1d6ad3c572b448619385b35cb9c38e800071216490617926c2a439008c29"
---

# Vercel KMS Claims

KMS lets you control the claims in every token an issuer signs. A grant's claim policy sets KMS-owned claims that the caller cannot override, and an issuer's claims schema validates the final claim set before signing.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sign JWTs from your Functions without managing private keys](https://vercel.com/changelog/sign-jwts-from-your-functions-without-managing-private-keys?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fclaims&source_site=vercel-docs&relationship=related)
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fclaims&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Vercel KMS Authentication](https://vercel.com/docs/kms/concepts/authentication?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fclaims&source_site=vercel-docs&relationship=related) — How Vercel KMS authorizes signing requests with a deployment OIDC token, authorizes management requests with a Vercel ac
- [Vercel KMS Quickstart](https://vercel.com/docs/kms/quickstart?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fclaims&source_site=vercel-docs&relationship=related) — Create a KMS issuer, sign a JWT from a Vercel Function with @vercel/kms, and verify it against the published JWKS.
- [OIDC Federation Reference](https://vercel.com/docs/oidc/reference?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fclaims&source_site=vercel-docs&relationship=related) — Review helper libraries to help you connect with your backend and understand the structure of an OIDC token.
- [Sign a token](https://vercel.com/docs/rest-api/kms/sign-a-token?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fclaims&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/sign/token — Sign a JWT with a KMS issuer's active signing key. Authenticate the request

Full cross-link map for this page: [/docs/kms/concepts/claims.graph.md](/docs/kms/concepts/claims.graph.md?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fclaims&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Claim policies

A grant policy, whether a [project grant](/docs/kms/concepts/project-grants) or a [Connect grant](/docs/kms/concepts/connect-grants), can define `tokenClaims`: a fixed set of claims KMS always applies to tokens signed under that grant. When you call `signToken`, KMS layers the grant's `tokenClaims` over your `claims`, and the grant's values win on conflict. Use this to pin a claim, such as a tenant or role, that the caller must not be able to change.

## Claims schema

An issuer can define a claims schema, a [JSON Schema](https://json-schema.org/) (draft-07) that every token the issuer signs must satisfy. You set it when you create or update the issuer. Before signing, KMS validates the resolved claims against the schema and rejects any token whose claims do not conform.

```json filename="claims-schema.json"
{
  "type": "object",
  "required": ["sub", "role"],
  "properties": {
    "role": { "enum": ["reader", "admin"] }
  }
}
```

### Protected claims

A claim the schema names, under `properties` or `required` (including the `allOf`, `anyOf`, `oneOf`, `if`, `then`, `else`, and `not` keywords), is protected. KMS drops any caller-supplied value for a protected claim before merging, so a protected claim can only come from the matched grant's `tokenClaims`. If the schema requires a protected claim that no grant supplies, signing fails validation. This guarantees a protected claim's value comes from the grant, not the caller. In the example above, `sub` and `role` are protected, so `role` must be supplied by the grant.

### Schema constraints

KMS validates and compiles a claims schema when you set it, and rejects an invalid schema with a `400` response. A schema is bounded so it stays cheap to run on the signing path:

| Constraint            | Limit           |
| --------------------- | --------------- |
| Maximum size          | 16 KB           |
| Maximum nesting depth  | 12              |

Regex- and format-based keywords (`pattern`, `patternProperties`, `format`) and schema references (`$ref`, `$recursiveRef`, `$dynamicRef`) are not allowed.

### Reserved time claims

KMS sets the `iat`, `nbf`, and `exp` claims during signing. They are not part of schema validation, so you do not need to declare them in your claims schema.

## Message signing is disabled

When a grant defines `tokenClaims`, or an issuer defines a claims schema, KMS disables raw message signing for that issuer and you must use `signToken`. A raw message could carry a hand-crafted payload that bypasses the claim policy or schema, so KMS denies it by default.

## Related

- [Project grants](/docs/kms/concepts/project-grants)
- [Connect grants](/docs/kms/concepts/connect-grants)
- [SDK Reference](/docs/kms/ts-sdk-reference)


---

[View full sitemap](/docs/sitemap)
