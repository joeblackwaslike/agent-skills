---
title: Vercel KMS Project Grants
product: vercel
url: /docs/kms/concepts/project-grants
canonical_url: "https://vercel.com/docs/kms/concepts/project-grants"
last_updated: 2026-08-18
type: conceptual
prerequisites:
  - /docs/kms/concepts
  - /docs/kms
related:
  - /docs/oidc
  - /docs/kms/concepts/connect-grants
  - /docs/kms/concepts/authentication
summary: How a project grant authorizes a Vercel deployment to sign with a KMS issuer using its OIDC token, scoped to a team, project, and environments.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/kms/concepts/project-grants.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "466c5ff2acafb83b452ef139a377f346978a2ae77c729fefb92d232193d02d84"
---

# Vercel KMS Project Grants

A project grant is an issuer policy (`project-grant`) that lets a Vercel deployment sign with the issuer using the deployment's [OIDC token](/docs/oidc). It scopes signing to one team, one project, and a set of environments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sign JWTs from your Functions without managing private keys](https://vercel.com/changelog/sign-jwts-from-your-functions-without-managing-private-keys?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fproject-grants&source_site=vercel-docs&relationship=related)
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fproject-grants&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Vercel KMS Claims](https://vercel.com/docs/kms/concepts/claims?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fproject-grants&source_site=vercel-docs&relationship=related) — How a KMS grant sets KMS-owned token claims the caller cannot override, and how an issuer claims schema validates every
- [Vercel KMS Quickstart](https://vercel.com/docs/kms/quickstart?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fproject-grants&source_site=vercel-docs&relationship=related) — Create a KMS issuer, sign a JWT from a Vercel Function with @vercel/kms, and verify it against the published JWKS.
- [Create an issuer policy](https://vercel.com/docs/rest-api/kms/create-an-issuer-policy?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fproject-grants&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/policies — Attach a policy to a KMS issuer that grants a project's deployments permissio
- [Vercel KMS SDK Reference](https://vercel.com/docs/kms/ts-sdk-reference?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fproject-grants&source_site=vercel-docs&relationship=related) — API reference for @vercel/kms, including signToken, signMessage, region resolution, and signing the KMS API directly wit

Full cross-link map for this page: [/docs/kms/concepts/project-grants.graph.md](/docs/kms/concepts/project-grants.graph.md?from=related&source_path=%2Fdocs%2Fkms%2Fconcepts%2Fproject-grants&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## What a project grant authorizes

A project grant confers signing access and nothing more. A deployment whose OIDC token matches the grant can call `signToken` and `signMessage` for the issuer, but it cannot create or manage an issuer. Provisioning an issuer requires a [Connect grant](/docs/kms/concepts/connect-grants).

## Fields

| Field          | Description                                                                       |
| -------------- | --------------------------------------------------------------------------------- |
| `teamId`       | The team that owns both the issuer and the project.                               |
| `projectId`    | The project whose deployments may sign.                                           |
| `environments` | The deployment environments allowed to sign, for example `production`, `preview`. |

## How KMS verifies a project grant

When a deployment signs, KMS verifies its Vercel OIDC token, issued by `https://oidc.vercel.com`, and checks that:

- `owner_id` matches both the issuer's owning team and the grant's `teamId`.
- `project_id` matches the grant's `projectId`.
- `environment` is one of the grant's `environments`.

If any check fails, KMS rejects the signing request. Because Vercel mints the OIDC token per deployment, you manage no credentials. See [Authentication](/docs/kms/concepts/authentication) and [OIDC federation](/docs/oidc).

## Scope one grant per project and environment

Create a separate issuer, each with its own project grant, for every project and environment that signs. Scoping this way keeps each issuer's signing surface small, isolates its published JWKS, and lets you rotate or revoke one issuer's keys without affecting the others.

## Related

- [Connect grants](/docs/kms/concepts/connect-grants)
- [Authentication](/docs/kms/concepts/authentication)
- [OIDC federation](/docs/oidc)


---

[View full sitemap](/docs/sitemap)
