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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/get_bypass_ip.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "532794877414c42d76763c193217b3dcbae07b3f23b14e0dbc7c4cfafd30b0b4"
---

# get_bypass_ip

Read System Bypass.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Read System Bypass](https://vercel.com/docs/rest-api/security/read-system-bypass) — GET /v1/security/firewall/bypass — Retrieve the system bypass rules configured for the specified project
- [Get conditional firewall bypasses](https://vercel.com/docs/rest-api/security/get-conditional-firewall-bypasses) — GET /v1/security/firewall/bypass/rules — Retrieve conditional firewall bypass rules for a project.
- [update_project_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass) — Use update_project_protection_bypass with Vercel MCP.
- [Create conditional firewall bypass](https://vercel.com/docs/rest-api/security/create-conditional-firewall-bypass) — POST /v1/security/firewall/bypass/rules — Create a conditional firewall bypass rule for a project domain.
- [Remove System Bypass Rule](https://vercel.com/docs/rest-api/security/remove-system-bypass-rule) — DELETE /v1/security/firewall/bypass — Remove system bypass rules

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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
