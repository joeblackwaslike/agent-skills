---
title: get_project_deployment_protection
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_project_deployment_protection with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "a0a3ea706a833f7ee17a73400ddd751c6b1d3ae475263717701acb4aceab2e0f"
---

# get_project_deployment_protection

Get the effective password protection, Vercel Authentication, and Trusted IP settings for a Vercel project. Password values are never returned.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_project_deployment_protection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_deployment_protection) — Use update_project_deployment_protection with Vercel MCP.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project) — Use get_project with Vercel MCP.
- [update_project_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass) — Use update_project_protection_bypass with Vercel MCP.
- [Password Protection](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection) — Require visitors to enter a password before they can view your deployments.
- [get_microfrontends_config_for_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project) — Use get_microfrontends_config_for_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Default | Description                                                                                   |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`. |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                     |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
