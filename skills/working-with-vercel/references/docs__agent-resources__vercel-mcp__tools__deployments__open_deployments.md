---
title: open_deployments
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/open_deployments
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/open_deployments"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use open_deployments with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/open_deployments.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "dd75948307daaa8545b8b86565ec8ce8f1a8e740dddb8dfd66584396ffe48861"
---

# open_deployments

Show deployments in a live card with expandable build logs. In clients without app support, receive the deployment state, preview URL, and commit as text. Track the latest deployment for a branch or commit until the build finishes.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments) — Use list_deployments with Vercel MCP.
- [deploy_to_vercel](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/deploy_to_vercel) — Use deploy_to_vercel with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment) — Use get_deployment with Vercel MCP.
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [create_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment) — Use create_deployment with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/open_deployments.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/open_deployments.graph.md)
<!-- /docsgraph:related -->

This tool appears when your connection enables deployment cards. Pass a project ID or name, a repository URL, or a commit SHA. `teamId` can be omitted when the project identifies its team. Use `branch` and `sha` to track the source you just pushed. For repositories linked to multiple projects, select a project in the card. Calling the tool again refreshes the card.

The `view` parameter only accepts `"preview"`. `target` filters production or preview deployments. A missing deployment is a separate state from a successful build.

**Sample prompt:** "Show the deployment for the branch and commit I just pushed."

## Parameters

| Parameter   | Type   | Required | Description                                                                                                                                                                                                                                 |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `view`      | string | No       | The deployment card view. Value: `"preview"`.                                                                                                                                                                                               |
| `teamId`    | string | No       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                                                   |
| `projectId` | string | No       | The project ID or name. Read projectId from .vercel/project.json when the repository has one. Without it, pass repo for a preview instead of guessing, or use a project name the user gave. Required unless a preview call has repo or sha. |
| `branch`    | string | No       | The git branch name.                                                                                                                                                                                                                        |
| `sha`       | string | No       | The full git commit SHA.                                                                                                                                                                                                                    |
| `repo`      | string | No       | Preview only. The git remote URL or owner/name (git remote get-url origin). Finds the linked project when projectId is unknown, even before the deployment exists.                                                                          |
| `target`    | string | No       | Only consider deployments for this environment. Allowed values: `"production"`, `"preview"`.                                                                                                                                                |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
