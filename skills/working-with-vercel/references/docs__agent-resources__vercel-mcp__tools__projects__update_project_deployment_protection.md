---
title: update_project_deployment_protection
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/update_project_deployment_protection
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_deployment_protection"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_project_deployment_protection with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_deployment_protection.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "91dda23cce5a481a7b93849c439e7d64f4a9afc0b7abe6ebd45dd61fd988ac17"
---

# update_project_deployment_protection

Partially update password protection, Vercel Authentication, and Trusted IPs for a Vercel project. Can replace passwords or IP allowlists, restrict access, or disable protection and expose deployments. Omitted settings are preserved. Availability depends on the Vercel team plan and caller permissions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_project_deployment_protection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection) — Use get_project_deployment_protection with Vercel MCP.
- [update_project_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass) — Use update_project_protection_bypass with Vercel MCP.
- [Password Protection](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection) — Require visitors to enter a password before they can view your deployments.
- [Methods to Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Deployment Protection on Vercel](https://vercel.com/docs/deployment-protection) — Learn how to control access to your Vercel project's preview and production URLs with Deployment Protection. Configure p

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/update_project_deployment_protection.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/update_project_deployment_protection.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter            | Type   | Required | Default | Description                                                                                   |
| -------------------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `projectId`          | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`. |
| `teamId`             | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                     |
| `passwordProtection` | object | No       | -       | Enable or disable password protection. Omit to preserve the current setting.                  |
| `ssoProtection`      | object | No       | -       | Enable or disable Vercel Authentication. Omit to preserve the current setting.                |
| `trustedIps`         | object | No       | -       | Enable or disable Trusted IPs. Omit to preserve the current setting.                          |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
