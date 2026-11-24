---
title: Microfrontends
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/microfrontends
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for microfrontends.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "871f025f74124de5139a7fee3fb4a29245489f35d541a4a60ba2d1bcf42e56a8"
---

# Microfrontends

Inspect how your projects and deployments are configured for microfrontends. You can also list the projects in a microfrontends group to understand which applications belong together.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Microfrontends](https://vercel.com/docs/microfrontends) — Learn how to use microfrontends on Vercel to split apart large applications, improve developer experience and make incre
- [Get microfrontends config for a project](https://vercel.com/docs/rest-api/microfrontends/get-microfrontends-config-for-a-project) — GET /v1/microfrontends/projects/{projectIdOrName}/production-mfe-config — Get the microfrontends config for a project by
- [Get microfrontends config for a deployment](https://vercel.com/docs/rest-api/microfrontends/get-microfrontends-config-for-a-deployment) — GET /v1/microfrontends/{deploymentId}/config — Get the microfrontends config for a deployment.
- [List microfrontends groups](https://vercel.com/docs/rest-api/microfrontends/list-microfrontends-groups) — GET /v1/microfrontends/groups — Get the microfrontends group IDs for a team.
- [vercel microfrontends](https://vercel.com/docs/cli/microfrontends) — Manage microfrontends groups from the CLI. Learn how to create groups, inspect group metadata, add and remove projects,

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/microfrontends.graph.md](/docs/agent-resources/vercel-mcp/tools/microfrontends.graph.md)
<!-- /docsgraph:related -->

## `get_microfrontends_config`

Get microfrontends config for a deployment.

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `deploymentId` | string | Yes      | The unique deployment identifier                            |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_microfrontends_config_for_project`

Get microfrontends config for a project.

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The name or ID of the project                               |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |

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
