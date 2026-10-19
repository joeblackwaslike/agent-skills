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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "bebf8f100c20c6232f97decece092460fa10a99f3bc055e94e46f29d9cfba2eb"
---

# Microfrontends

Inspect how your projects and deployments are configured for microfrontends. You can also list the projects in a microfrontends group to understand which applications belong together.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Microfrontends support is now in Public Beta](https://vercel.com/changelog/microfrontends-support-is-now-in-public-beta)
- [Microfrontends now generally available](https://vercel.com/changelog/microfrontends-now-generally-available)
- [Microfrontends](https://vercel.com/docs/microfrontends) — Learn how to use microfrontends on Vercel to split apart large applications, improve developer experience and make incre
- [Get microfrontends config for a deployment](https://vercel.com/docs/rest-api/microfrontends/get-microfrontends-config-for-a-deployment) — GET /v1/microfrontends/{deploymentId}/config — Get the microfrontends config for a deployment.
- [Get microfrontends config for a project](https://vercel.com/docs/rest-api/microfrontends/get-microfrontends-config-for-a-project) — GET /v1/microfrontends/projects/{projectIdOrName}/production-mfe-config — Get the microfrontends config for a project by
- [List microfrontends groups](https://vercel.com/docs/rest-api/microfrontends/list-microfrontends-groups) — GET /v1/microfrontends/groups — Get the microfrontends group IDs for a team.
- [Getting started with microfrontends](https://vercel.com/docs/microfrontends/quickstart) — Learn how to get started with microfrontends on Vercel.

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


---

[View full sitemap](/docs/sitemap)
