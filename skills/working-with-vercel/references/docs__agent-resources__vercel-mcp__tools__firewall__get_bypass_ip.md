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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "a277274bf8450a5e4faf37d98a50d38de3157c390f08d4ee0a3baa8693091c94"
---

# get_bypass_ip

Read System Bypass.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Firewall now supports bypassing system mitigations for specific IPs](https://vercel.com/changelog/vercel-firewall-now-supports-bypassing-system-mitigations-for-specific-ips?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_bypass_ip&source_site=vercel-docs&relationship=related)
- [Read System Bypass](https://vercel.com/docs/rest-api/security/read-system-bypass?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_bypass_ip&source_site=vercel-docs&relationship=related) — GET /v1/security/firewall/bypass — Retrieve the system bypass rules configured for the specified project
- [update_project_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_bypass_ip&source_site=vercel-docs&relationship=related) — Use update_project_protection_bypass with Vercel MCP.
- [WAF System Bypass Rules](https://vercel.com/docs/vercel-firewall/vercel-waf/system-bypass-rules?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_bypass_ip&source_site=vercel-docs&relationship=related) — Learn how to configure IP-based system bypass rules with the Vercel Web Application Firewall \\(WAF\\).
- [patch_url_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/patch_url_protection_bypass?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_bypass_ip&source_site=vercel-docs&relationship=related) — Use patch_url_protection_bypass with Vercel MCP.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_bypass_ip&source_site=vercel-docs&relationship=related) — Use get_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/firewall/get_bypass_ip.graph.md](/docs/agent-resources/vercel-mcp/tools/firewall/get_bypass_ip.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_bypass_ip&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type    | Required | Description                                                  |
| -------------- | ------- | -------- | ------------------------------------------------------------ |
| `projectId`    | string  | Yes      | The project ID.                                              |
| `limit`        | number  | No       | -                                                            |
| `sourceIp`     | string  | No       | Filter by source IP                                          |
| `domain`       | string  | No       | Filter by domain                                             |
| `projectScope` | boolean | No       | Filter by project scoped rules                               |
| `offset`       | string  | No       | Used for pagination. Retrieves results after the provided id |
| `teamId`       | string  | No       | Team ID.                                                     |
| `slug`         | string  | No       | Team slug.                                                   |


---

[View full sitemap](/docs/sitemap)
