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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "e02cb9dd607946f7e2ba04fc7e08ff787dfadbd6f9c5c79179b768dc0de6fbca"
---

# Vercel KMS Connect Grants

A Connect grant is an issuer policy (`connex-grant`) that lets [Vercel Connect](/docs/connect) sign with the issuer on behalf of your team. Unlike a [project grant](/docs/kms/concepts/project-grants), which only signs, a Connect grant also lets Connect provision the issuer.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga)
- [Vercel Connect](https://v0.app/docs/vercel-connect) — Connect your v0 apps and agents to third-party services – no API keys required.
- [Key Management](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management) — Vercel MCP tools for key management.
- [Vercel KMS Claims](https://vercel.com/docs/kms/concepts/claims) — How a KMS grant sets KMS-owned token claims the caller cannot override, and how an issuer claims schema validates every
- [Vercel Connect Concepts](https://vercel.com/docs/connect/concepts) — Understand the core building blocks of Vercel Connect: connectors, installations, tokens, project links, triggers, and a
- [Authentication in Vercel Connect](https://vercel.com/docs/connect/concepts/authentication) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V
- [Frameworks and Adapters for Vercel Connect](https://vercel.com/docs/connect/frameworks) — Use Vercel Connect with AI SDK, TanStack AI, MCP clients, eve, Chat SDK, Better Auth, and Auth.js.

Full cross-link map for this page: [/docs/kms/concepts/connect-grants.graph.md](/docs/kms/concepts/connect-grants.graph.md)
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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
