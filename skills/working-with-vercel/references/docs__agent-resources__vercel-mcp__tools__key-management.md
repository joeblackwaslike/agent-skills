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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "4c15a60bdc918a86615540c43f53ed93ba1e6d1e06fbee74aba4eda5964a93cf"
---

# Key Management

Create and list issuers with server-generated signing keys. Manage issuer policies, activate keys, and revoke keys. MCP does not import private keys or sign messages and tokens.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Create a signing key](https://vercel.com/docs/rest-api/kms/create-a-signing-key) — POST /v1/kms/issuers/{issuerId}/keys — Create a new signing key for a KMS issuer. Depending on the activation mode, the
- [Key Management Service \\(KMS\\)](https://vercel.com/docs/kms) — Sign JWTs and messages with Vercel-managed signing keys. Learn about issuers, keys, and policies, and how to sign from V
- [Create an issuer](https://vercel.com/docs/rest-api/kms/create-an-issuer) — POST /v1/kms/issuers — Create a new KMS issuer for the authenticated team. An issuer owns the asymmetric signing keys th
- [Create an issuer policy](https://vercel.com/docs/rest-api/kms/create-an-issuer-policy) — POST /v1/kms/issuers/{issuerId}/policies — Attach a policy to a KMS issuer that grants a project's deployments permissio
- [Activate a signing key](https://vercel.com/docs/rest-api/kms/activate-a-signing-key) — POST /v1/kms/issuers/{issuerId}/keys/{keyId}/activate — Activate a pending signing key so the issuer starts signing with

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/key-management.graph.md](/docs/agent-resources/vercel-mcp/tools/key-management.graph.md)
<!-- /docsgraph:related -->

## `activate_kms_signing_key`

Activate a signing key.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.                                       |
| `keyId`       | string | Yes      | The ID of the pending signing key to activate.              |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `create_kms_issuer`

Create a KMS issuer with server-generated signing keys for your team. Configure its name, signing algorithm, claims schema, and initial policy. MCP does not accept private-key imports.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

Set `requestBody.name` when creating an issuer. You can also supply
`algorithm`, `claimsSchema`, and an initial `policy` inside `requestBody`.
The API generates the signing key. Do not send a PEM key or either import field.

## `create_kms_issuer_policy`

Create an issuer policy.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.                                       |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `create_kms_signing_key`

Create a signing key.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.                                       |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `get_kms_issuer`

Get an issuer.

## Parameters

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `issuerId` | string | Yes      | The ID of the issuer.                                       |
| `teamId`   | string | No       | Team ID to use for this operation.                          |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_kms_issuers`

Retrieve the list of KMS issuers that belong to the authenticated team. The results are paginated.

## Parameters

| Parameter | Type    | Required | Description                                                    |
| --------- | ------- | -------- | -------------------------------------------------------------- |
| `limit`   | integer | No       | Maximum number of issuers to return. Minimum: 1. Maximum: 100. |
| `next`    | string  | No       | Continuation cursor to retrieve the next page of results.      |
| `teamId`  | string  | No       | Team ID to use for this operation.                             |
| `slug`    | string  | No       | Team slug to use for this operation. Use instead of teamId.    |

## `revoke_kms_signing_key`

Revoke a signing key.

## Parameters

| Parameter     | Type    | Required | Description                                                                                        |
| ------------- | ------- | -------- | -------------------------------------------------------------------------------------------------- |
| `issuerId`    | string  | Yes      | The ID of the issuer.                                                                              |
| `keyId`       | string  | Yes      | The ID of the signing key to revoke immediately. The key must already be scheduled for revocation. |
| `teamId`      | string  | No       | Team ID to use for this operation.                                                                 |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId.                                        |
| `requestBody` | unknown | No       | Request body for this tool.                                                                        |

## `update_kms_issuer`

Update an issuer.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.                                       |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `update_kms_issuer_policy`

Update an issuer policy.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `issuerId`    | string | Yes      | The ID of the issuer.                                       |
| `kind`        | string | Yes      | The issuer policy kind. Value: `"project-grant"`.           |
| `policyKey`   | string | Yes      | The policy identifier.                                      |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
