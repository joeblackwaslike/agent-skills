---
title: get_bypass_ip
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/firewall/get_bypass_ip
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/get_bypass_ip"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/firewall
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_bypass_ip with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/get_bypass_ip.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "e47018f604b744111ca6707284db005dbaa36cdec99f95740f6c414a45e1bd28"
---

# get_bypass_ip

Read System Bypass.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Read System Bypass](https://vercel.com/docs/rest-api/security/read-system-bypass) — GET /v1/security/firewall/bypass — Retrieve the system bypass rules configured for the specified project
- [update_project_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass) — Use update_project_protection_bypass with Vercel MCP.
- [Get conditional firewall bypasses](https://vercel.com/docs/rest-api/security/get-conditional-firewall-bypasses) — GET /v1/security/firewall/bypass/rules — Retrieve conditional firewall bypass rules for a project.
- [get_project_deployment_protection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection) — Use get_project_deployment_protection with Vercel MCP.
- [patch_url_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/patch_url_protection_bypass) — Use patch_url_protection_bypass with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/firewall/get_bypass_ip.graph.md](/docs/agent-resources/vercel-mcp/tools/firewall/get_bypass_ip.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type    | Required | Description                                                  |
| -------------- | ------- | -------- | ------------------------------------------------------------ |
| `projectId`    | string  | Yes      | The project ID.                                              |
| `limit`        | number  | No       | Maximum: 256.                                                |
| `sourceIp`     | string  | No       | Filter by source IP                                          |
| `domain`       | string  | No       | Filter by domain                                             |
| `projectScope` | boolean | No       | Filter by project scoped rules                               |
| `offset`       | string  | No       | Used for pagination. Retrieves results after the provided id |
| `teamId`       | string  | No       | Team ID to use for this operation.                           |
| `slug`         | string  | No       | Team slug to use for this operation. Use instead of teamId.  |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
