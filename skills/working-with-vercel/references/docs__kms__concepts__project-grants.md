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
  - /docs/deployments/environments
  - /docs/rest-api
  - /docs/kms/concepts/authentication
summary: How a project grant authorizes a Vercel deployment to sign with a KMS issuer using its OIDC token, scoped to a team, project, and environments.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/kms/concepts/project-grants.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "72bd4d8531bdac228f4d9fcdc8599061a3080757283741ecbfa7572d5f6ac657"
---

# Vercel KMS Project Grants

A project grant is an issuer policy (`project-grant`) that lets a Vercel deployment sign with the issuer using the deployment's [OIDC token](/docs/oidc). It scopes signing to one team, one project, and a set of environments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sign JWTs from your Functions without managing private keys](https://vercel.com/changelog/sign-jwts-from-your-functions-without-managing-private-keys)
- [Vercel KMS Claims](https://vercel.com/docs/kms/concepts/claims) — How a KMS grant sets KMS-owned token claims the caller cannot override, and how an issuer claims schema validates every
- [Key Management](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management) — Vercel MCP tools for key management.
- [vercel kms](https://vercel.com/docs/cli/kms) — Manage Vercel KMS issuers, rotate signing keys, and control which projects can sign tokens from the command line.
- [Vercel KMS Quickstart](https://vercel.com/docs/kms/quickstart) — Create a KMS issuer, sign a JWT from a Vercel Function with @vercel/kms, and verify it against the published JWKS.
- [Create an issuer policy](https://vercel.com/docs/rest-api/kms/create-an-issuer-policy) — POST /v1/kms/issuers/{issuerId}/policies — Attach a policy to a KMS issuer that grants a project's deployments permissio

Full cross-link map for this page: [/docs/kms/concepts/project-grants.graph.md](/docs/kms/concepts/project-grants.graph.md)
<!-- /docsgraph:related -->

## What a project grant authorizes

A project grant confers signing access and nothing more. A deployment whose OIDC token matches the grant can call `signJWT` and `signMessage` for the issuer, but it cannot create or manage an issuer. Provisioning an issuer requires a [Connect grant](/docs/kms/concepts/connect-grants).

## Fields

| Field          | Description                                                                       |
| -------------- | --------------------------------------------------------------------------------- |
| `teamId`       | The team that owns both the issuer and the project.                               |
| `projectId`    | The project whose deployments may sign.                                           |
| `environments` | The deployment environments allowed to sign. Each entry is `production`, `preview`, `development`, or the ID of a [Custom Environment](/docs/deployments/environments#custom-environments), which starts with `env_`. |

To allow a Custom Environment from the dashboard, select it by name under **Environments** when you add or edit the grant. The dashboard saves its ID. To find the ID yourself, call `GET /v9/projects/<project-id-or-name>/custom-environments` in the [REST API](/docs/rest-api). Each environment in the response has an `id`.

## How KMS verifies a project grant

When a deployment signs, KMS verifies its Vercel OIDC token, issued by `https://oidc.vercel.com`, and checks that:

- `owner_id` matches both the issuer's owning team and the grant's `teamId`.
- `project_id` matches the grant's `projectId`.
- `environment` is one of the grant's `environments`. For a deployment to a Custom Environment, KMS checks the `custom_environment_id` claim, which holds the Custom Environment ID, instead of `environment`.

If any check fails, KMS rejects the signing request. Because Vercel mints the OIDC token per deployment, you manage no credentials. See [Authentication](/docs/kms/concepts/authentication) and [OIDC federation](/docs/oidc).

## Scope one grant per project and environment

Create a separate issuer, each with its own project grant, for every project and environment that signs. Scoping this way keeps each issuer's signing surface small, isolates its published JWKS, and lets you rotate or revoke one issuer's keys without affecting the others.

## Related

- [Connect grants](/docs/kms/concepts/connect-grants)
- [Authentication](/docs/kms/concepts/authentication)
- [OIDC federation](/docs/oidc)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
