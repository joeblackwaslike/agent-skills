---
title: Vercel KMS Concepts
product: vercel
url: /docs/kms/concepts
canonical_url: "https://vercel.com/docs/kms/concepts"
last_updated: 2026-08-18
type: conceptual
prerequisites:
  - /docs/kms
related:
  - /docs/kms/quickstart
  - /docs/kms/concepts/key-rotation
  - /docs/kms/concepts/authentication
  - /docs/kms/concepts/project-grants
  - /docs/kms/concepts/connect-grants
summary: Understand how Vercel KMS rotates signing keys and how it authorizes signing, management, and verification.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/kms/concepts.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "1795f6fb65b7a513cb1dce48ef1c023597e44ffe51e9b4ac80be670f100b8de8"
---

# Vercel KMS Concepts

These pages explain the parts of Vercel KMS you configure once and rely on over time. Read them after the [Quickstart](/docs/kms/quickstart), when you need to reason about how keys change and how requests are authorized.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sign JWTs from your Functions without managing private keys](https://vercel.com/changelog/sign-jwts-from-your-functions-without-managing-private-keys?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts&source_site=vercel-docs&relationship=related)
- [Vercel KMS SDK Reference](https://vercel.com/docs/kms/ts-sdk-reference?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts&source_site=vercel-docs&relationship=related) — API reference for @vercel/kms, including signToken, signMessage, region resolution, and signing the KMS API directly wit
- [Vercel Connect Concepts](https://vercel.com/docs/connect/concepts?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts&source_site=vercel-docs&relationship=related) — Understand the core building blocks of Vercel Connect: connectors, installations, tokens, project links, triggers, and a
- [Vercel fundamental concepts](https://vercel.com/docs/fundamentals?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts&source_site=vercel-docs&relationship=related) — Learn about the core concepts of Vercel
- [Vercel KMS Pricing and Limits](https://vercel.com/docs/kms/pricing?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts&source_site=vercel-docs&relationship=related) — How Vercel KMS is billed per signing operation, the platform limits that apply, and how to stop being billed.
- [Create a signing key](https://vercel.com/docs/rest-api/kms/create-a-signing-key?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys — Create a new signing key for a KMS issuer. Depending on the activation mode, the

Full cross-link map for this page: [/docs/kms/concepts.graph.md](/docs/kms/concepts.graph.md?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- **[Key rotation](/docs/kms/concepts/key-rotation)**: How KMS stages a new key, schedules its activation, and retires the previous key while already-issued tokens keep verifying.
- **[Authentication](/docs/kms/concepts/authentication)**: How KMS authorizes signing requests with a deployment OIDC token, authorizes management requests with a Vercel access token, and how relying parties verify signatures against the published JWKS.
- **[Project grants](/docs/kms/concepts/project-grants)**: How a project grant authorizes a Vercel deployment to sign with an issuer, scoped to a project and its environments.
- **[Connect grants](/docs/kms/concepts/connect-grants)**: How a Connect grant lets Vercel Connect provision and sign with an issuer on behalf of your team.
- **[Claims](/docs/kms/concepts/claims)**: How a grant sets KMS-owned token claims the caller cannot override, and how an issuer claims schema validates every token it signs.


---

[View full sitemap](/docs/sitemap)
