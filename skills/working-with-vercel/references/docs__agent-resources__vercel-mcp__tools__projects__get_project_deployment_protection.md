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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "73eeac7c6a7aa14c2c6446a211f72b3b26e9861b172ed00c18073ea3390e324d"
---

# get_project_deployment_protection

Get the effective password protection, Vercel Authentication, and Trusted IP settings for a Vercel project. Password values are never returned.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_project_deployment_protection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_deployment_protection) — Use update_project_deployment_protection with Vercel MCP.
- [Methods to Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project) — Use get_project with Vercel MCP.
- [update_project_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass) — Use update_project_protection_bypass with Vercel MCP.
- [Usage & Pricing for Deployment Protection](https://vercel.com/docs/deployment-protection/usage-and-pricing) — Compare Deployment Protection feature availability and pricing across Hobby, Pro, and Enterprise plans.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Default | Description                                                                                   |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`. |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                     |

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
