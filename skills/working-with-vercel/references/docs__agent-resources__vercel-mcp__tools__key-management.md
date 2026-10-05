---
title: Key Management
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/key-management
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for key management.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "0e2a066695c52eea4137119609b14c5ac8308f10e39dd6b20c6b8bcd6a2f3428"
---

# Key Management

Manage signing keys and issuer policies for your team. You can create and activate keys, sign messages or tokens, and revoke keys that should no longer be used.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Create a signing key](https://vercel.com/docs/rest-api/kms/create-a-signing-key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys — Create a new signing key for a KMS issuer. Depending on the activation mode, the
- [Key Management Service \\(KMS\\)](https://vercel.com/docs/kms?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management&source_site=vercel-docs&relationship=related) — Sign JWTs and messages with Vercel-managed signing keys. Learn about issuers, keys, and policies, and how to sign from V
- [Vercel KMS Authentication](https://vercel.com/docs/kms/concepts/authentication?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management&source_site=vercel-docs&relationship=related) — How Vercel KMS authorizes signing requests with a deployment OIDC token, authorizes management requests with a Vercel ac
- [Activate a signing key](https://vercel.com/docs/rest-api/kms/activate-a-signing-key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys/{keyId}/activate — Activate a pending signing key so the issuer starts signing with
- [Revoke a signing key](https://vercel.com/docs/rest-api/kms/revoke-a-signing-key?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys/{keyId}/revoke — Immediately revoke a signing key that is already scheduled for rev

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fkey-management&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `activate_kms_signing_key`

Activate a signing key.

## Parameters

| Parameter     | Type   | Required | Description                                    |
| ------------- | ------ | -------- | ---------------------------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.                          |
| `keyId`       | string | Yes      | The ID of the pending signing key to activate. |
| `teamId`      | string | No       | Team ID.                                       |
| `slug`        | string | No       | Team slug.                                     |
| `requestBody` | object | No       | Request body for this tool.                    |

## `create_kms_issuer_policy`

Create an issuer policy.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.       |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |

## `create_kms_signing_key`

Create a signing key.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.       |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |

## `get_kms_issuer`

Get an issuer.

## Parameters

| Parameter  | Type   | Required | Description           |
| ---------- | ------ | -------- | --------------------- |
| `issuerId` | string | Yes      | The ID of the issuer. |
| `teamId`   | string | No       | Team ID.              |
| `slug`     | string | No       | Team slug.            |

## `revoke_kms_signing_key`

Revoke a signing key.

## Parameters

| Parameter     | Type    | Required | Description                                                                                        |
| ------------- | ------- | -------- | -------------------------------------------------------------------------------------------------- |
| `issuerId`    | string  | Yes      | The ID of the issuer.                                                                              |
| `keyId`       | string  | Yes      | The ID of the signing key to revoke immediately. The key must already be scheduled for revocation. |
| `teamId`      | string  | No       | Team ID.                                                                                           |
| `slug`        | string  | No       | Team slug.                                                                                         |
| `requestBody` | unknown | No       | Request body for this tool.                                                                        |

## `sign_kms_message`

Sign a message.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.       |
| `requestBody` | object | No       | Request body for this tool. |
| `teamId`      | string | No       | Team ID.                    |

## `sign_kms_token`

Sign a token.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.       |
| `requestBody` | object | No       | Request body for this tool. |
| `teamId`      | string | No       | Team ID.                    |

## `update_kms_issuer`

Update an issuer.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.       |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |

## `update_kms_issuer_policy`

Update an issuer policy.

## Parameters

| Parameter     | Type   | Required | Description                                                |
| ------------- | ------ | -------- | ---------------------------------------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.                                      |
| `kind`        | string | Yes      | The issuer policy kind. Allowed values: `"project-grant"`. |
| `policyKey`   | string | Yes      | The policy identifier.                                     |
| `teamId`      | string | No       | Team ID.                                                   |
| `slug`        | string | No       | Team slug.                                                 |
| `requestBody` | object | No       | Request body for this tool.                                |


---

[View full sitemap](/docs/sitemap)
