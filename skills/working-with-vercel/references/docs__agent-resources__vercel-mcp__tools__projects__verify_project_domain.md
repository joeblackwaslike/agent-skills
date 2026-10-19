---
title: verify_project_domain
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use verify_project_domain with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "3ec2324b4b1b3e68ba836c0f2a115e82e379742ea3306fec40bf3080efcd8e6a"
---

# verify_project_domain

Attempts to verify a project domain with `verified = false` by checking the correctness of the project domain's `verification` challenge.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Verify project domain](https://vercel.com/docs/rest-api/projects/verify-project-domain) — POST /v9/projects/{idOrName}/domains/{domain}/verify — Attempts to verify a project domain with \\`verified = false\\` by
- [add_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain) — Use add_project_domain with Vercel MCP.
- [get_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain) — Use get_project_domain with Vercel MCP.
- [get_domain_contact_verification](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_contact_verification) — Use get_domain_contact_verification with Vercel MCP.
- [get_domain_verification_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record) — Use get_domain_verification_record with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/verify_project_domain.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type    | Required | Description                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------------- |
| `idOrName`    | string  | Yes      | The unique project identifier or the project name           |
| `domain`      | string  | Yes      | The domain name you want to verify                          |
| `teamId`      | string  | No       | Team ID to use for this operation.                          |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | unknown | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)
