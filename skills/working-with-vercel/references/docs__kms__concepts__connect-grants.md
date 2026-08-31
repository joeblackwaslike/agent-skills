---
title: Vercel KMS Connect Grants
product: vercel
url: /docs/kms/concepts/connect-grants
canonical_url: "https://vercel.com/docs/kms/concepts/connect-grants"
last_updated: 2026-08-18
type: conceptual
prerequisites:
  - /docs/kms/concepts
  - /docs/kms
related:
  - /docs/connect
  - /docs/kms/concepts/project-grants
  - /docs/kms/concepts/authentication
summary: How a Connect grant lets Vercel Connect provision and sign with a KMS issuer on behalf of your team, identified by a Connect client ID.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/kms/concepts/connect-grants.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "461bad37948f0337541b2cc3cd3896bdba3213fa1923b1296cb4cb6e3dda7021"
---

# Vercel KMS Connect Grants

A Connect grant is an issuer policy (`connex-grant`) that lets [Vercel Connect](/docs/connect) sign with the issuer on behalf of your team. Unlike a [project grant](/docs/kms/concepts/project-grants), which only signs, a Connect grant also lets Connect provision the issuer.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect](https://v0.app/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fconnect-grants&source_site=vercel-docs&relationship=related) — Connect your v0 apps and agents to third-party services – no API keys required.
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fconnect-grants&source_site=vercel-docs&relationship=related)
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fconnect-grants&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Vercel KMS Claims](https://vercel.com/docs/kms/concepts/claims?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fconnect-grants&source_site=vercel-docs&relationship=related) — How a KMS grant sets KMS-owned token claims the caller cannot override, and how an issuer claims schema validates every
- [For Service Providers](https://vercel.com/docs/connect/providers?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fconnect-grants&source_site=vercel-docs&relationship=related) — What your service needs to declare so Vercel Connect can discover, register, and authorize against it using standard OAu
- [Vercel Connect Concepts](https://vercel.com/docs/connect/concepts?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fconnect-grants&source_site=vercel-docs&relationship=related) — Understand the core building blocks of Vercel Connect: connectors, installations, tokens, project links, triggers, and a
- [Vercel KMS Quickstart](https://vercel.com/docs/kms/quickstart?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fconnect-grants&source_site=vercel-docs&relationship=related) — Create a KMS issuer, sign a JWT from a Vercel Function with @vercel/kms, and verify it against the published JWKS.

Full cross-link map for this page: [/docs/kms/concepts/connect-grants.graph.md](/docs/kms/concepts/connect-grants.graph.md?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fconnect-grants&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## What a Connect grant authorizes

A Connect grant is identified by a Vercel Connect client ID. A request that presents a valid Connect token for that client ID can both create the issuer and sign with it, so Connect can manage signing for your team without a deployment OIDC token.

Vercel Connect creates and manages Connect grants. You do not create or manage them directly; they exist on issuers that Connect provisions on your behalf.

## Fields

| Field      | Description                                                        |
| ---------- | ----------------------------------------------------------------- |
| `clientId` | The Vercel Connect client that may provision and sign with the issuer. |

## How KMS verifies a Connect grant

KMS verifies a token issued by Vercel Connect, `https://connect.vercel.com`, and checks that:

- the token's client ID matches the grant's `clientId`.
- the token's team matches the issuer's owning team.
- the token's audience matches the issuer URL (`https://kms.vercel.com/<issuerId>`) when signing, or the KMS host (`https://kms.vercel.com`) when provisioning a new issuer.

If any check fails, KMS rejects the request.

## Related

- [Vercel Connect](/docs/connect)
- [Project grants](/docs/kms/concepts/project-grants)
- [Authentication](/docs/kms/concepts/authentication)


---

[View full sitemap](/docs/sitemap)
