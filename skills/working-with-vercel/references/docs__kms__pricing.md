---
title: Vercel KMS Pricing and Limits
product: vercel
url: /docs/kms/pricing
canonical_url: "https://vercel.com/docs/kms/pricing"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/kms
related:
  - /docs/kms/concepts/key-rotation
  - /docs/kms/ts-sdk-reference
summary: How Vercel KMS is billed per signing operation, the platform limits that apply, and how to stop being billed.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/kms/pricing.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "10770e55883d4781b601c45e8272e4dded976d6fbc11302c9765c4f6d3b1ab8c"
---

# Vercel KMS Pricing and Limits

KMS is billed per signing operation. A signing operation is a single `signToken` or `signMessage` call, and its rate depends on the key's algorithm. There is no per-key or per-issuer charge.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Authentication](https://vercel.com/docs/kms/concepts/authentication?from=related) — How Vercel KMS authorizes signing requests with a deployment OIDC token, authorizes management requests with a Vercel ac
- [Concepts](https://vercel.com/docs/kms/concepts?from=related) — Understand how Vercel KMS rotates signing keys and how it authorizes signing, management, and verification.
- [Pricing and Limits](https://vercel.com/docs/connect/pricing?from=related) — How Vercel Connect is billed across plans, how to stop being billed, and the platform limits that apply during beta.
- [Quickstart](https://vercel.com/docs/kms/quickstart?from=related) — Create a KMS issuer, sign a JWT from a Vercel Function with @vercel/kms, and verify it against the published JWKS.
- [Pricing and Limits](https://vercel.com/docs/queues/pricing?from=related) — Understand how Vercel Queues billing works, what's included, and which service limits apply.

Full cross-link map for this page: [/docs/kms/pricing.graph.md](/docs/kms/pricing.graph.md)
<!-- /docsgraph:related -->

## Pricing

Signing operations are grouped into two algorithm tiers:

- **Standard** algorithms: `RS256` and `PS256`.
- **Advanced** algorithms: every other supported algorithm, including `RS384`, `RS512`, `PS384`, `PS512`, the `ES*` family, and `EdDSA`.

| Operation                                          | Price                       |
| -------------------------------------------------- | --------------------------- |
| Standard signing operations (`RS256`, `PS256`)     | $0.03 per 10,000 operations |
| Advanced signing operations (all other algorithms) | $0.15 per 10,000 operations |

The Hobby plan includes 5,000 signing operations per month at no charge. Pro and Enterprise teams are billed at the rates above.

## Limits

- An issuer can have at most one pending key at a time during [rotation](/docs/kms/concepts/key-rotation).
- KMS supports `RS256`, `RS384`, `RS512`, the `PS*` and `ES*` families, and `EdDSA`, and defaults to `RS512`.
- KMS does not support symmetric (`HS*`) keys.

## How to stop being billed

You stop per-operation charges when you stop calling `signToken` and `signMessage`. To remove an issuer entirely, delete it in the dashboard. A deleted issuer no longer publishes a JWKS, so relying parties can no longer verify tokens it signed.

## Related

- [Key rotation](/docs/kms/concepts/key-rotation)
- [SDK Reference](/docs/kms/ts-sdk-reference)


---

[View full sitemap](/docs/sitemap)
