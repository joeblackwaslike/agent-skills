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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "98a46f56b7fbe9642b52c2b5f57c3a3f988b75829d177bb20a5320b0b6037007"
---

# Microfrontends

Inspect how your projects and deployments are configured for microfrontends. You can also list the projects in a microfrontends group to understand which applications belong together.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Microfrontends support is now in Public Beta](https://vercel.com/changelog/microfrontends-support-is-now-in-public-beta?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends&source_site=vercel-docs&relationship=related)
- [List microfrontends groups](https://vercel.com/docs/rest-api/microfrontends/list-microfrontends-groups?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends&source_site=vercel-docs&relationship=related) — GET /v1/microfrontends/groups — Get the microfrontends group IDs for a team.
- [Microfrontends](https://vercel.com/docs/microfrontends?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends&source_site=vercel-docs&relationship=related) — Learn how to use microfrontends on Vercel to split apart large applications, improve developer experience and make incre
- [Get microfrontends config for a project](https://vercel.com/docs/rest-api/microfrontends/get-microfrontends-config-for-a-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends&source_site=vercel-docs&relationship=related) — GET /v1/microfrontends/projects/{projectIdOrName}/production-mfe-config — Get the microfrontends config for a project by
- [Get microfrontends config for a deployment](https://vercel.com/docs/rest-api/microfrontends/get-microfrontends-config-for-a-deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends&source_site=vercel-docs&relationship=related) — GET /v1/microfrontends/{deploymentId}/config — Get the microfrontends config for a deployment.
- [vercel microfrontends](https://vercel.com/docs/cli/microfrontends?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends&source_site=vercel-docs&relationship=related) — Manage microfrontends groups from the CLI. Learn how to create groups, inspect group metadata, add and remove projects,

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/microfrontends.graph.md](/docs/agent-resources/vercel-mcp/tools/microfrontends.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `get_microfrontends_config`

Get microfrontends config for a deployment.

## Parameters

| Parameter      | Type   | Required | Description                      |
| -------------- | ------ | -------- | -------------------------------- |
| `deploymentId` | string | Yes      | The unique deployment identifier |
| `teamId`       | string | No       | Team ID.                         |
| `slug`         | string | No       | Team slug.                       |

## `get_microfrontends_config_for_project`

Get microfrontends config for a project.

## Parameters

| Parameter         | Type   | Required | Description                   |
| ----------------- | ------ | -------- | ----------------------------- |
| `projectIdOrName` | string | Yes      | The name or ID of the project |
| `teamId`          | string | No       | Team ID.                      |
| `slug`            | string | No       | Team slug.                    |

## `list_microfrontends_group_projects`

List projects in a microfrontends group.

## Parameters

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `groupId` | string | Yes      | The microfrontends group ID. |
| `teamId`  | string | No       | Team ID.                     |
| `slug`    | string | No       | Team slug.                   |


---

[View full sitemap](/docs/sitemap)
