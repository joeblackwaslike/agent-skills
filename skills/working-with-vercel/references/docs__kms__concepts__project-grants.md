---
title: Vercel KMS Project Grants
product: vercel
url: /docs/kms/concepts/project-grants
canonical_url: "https://vercel.com/docs/kms/concepts/project-grants"
last_updated: 2018-10-20
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
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "fd673554daf1cb81aef6b52ef1ed492c273cfbc41efed7016add07c5db663841"
---

# Vercel KMS Project Grants

A project grant is an issuer policy (`project-grant`) that lets a Vercel deployment sign with the issuer using the deployment's [OIDC token](/docs/oidc). It scopes signing to one team, one project, and a set of environments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Claims](https://vercel.com/docs/kms/concepts/claims?from=related) — How a KMS grant sets KMS-owned token claims the caller cannot override, and how an issuer claims schema validates every
- [Quickstart](https://vercel.com/docs/kms/quickstart?from=related) — Create a KMS issuer, sign a JWT from a Vercel Function with @vercel/kms, and verify it against the published JWKS.
- [Create an issuer policy](https://vercel.com/docs/rest-api/kms/create-an-issuer-policy?from=related)
- [SDK Reference](https://vercel.com/docs/kms/ts-sdk-reference?from=related) — API reference for @vercel/kms, including signToken, signMessage, region resolution, and signing the KMS API directly wit
- [Update an issuer policy](https://vercel.com/docs/rest-api/kms/update-an-issuer-policy?from=related)

Full cross-link map for this page: [/docs/kms/concepts/project-grants.graph.md](/docs/kms/concepts/project-grants.graph.md)
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
