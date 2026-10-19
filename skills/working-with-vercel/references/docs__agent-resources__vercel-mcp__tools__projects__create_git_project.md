---
title: create_git_project
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/create_git_project
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_git_project"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_git_project with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_git_project.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "f2ab8343c059f1a9219d7aded8a5081f96f12e198033ad9449a1a5e34a5edcc6"
---

# create_git_project

Create or reuse a Vercel project linked to an accessible Git repository. By default, it creates a preview deployment from the repository's production branch.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.
- [deploy_to_vercel](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/deploy_to_vercel) — Use deploy_to_vercel with Vercel MCP.
- [create_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment) — Use create_deployment with Vercel MCP.
- [Deploying Git Repositories with Vercel](https://vercel.com/docs/git) — Vercel automatically deploys supported Git repositories on every branch push and when changes merge into the production
- [get_git_deployment_context](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_git_deployment_context) — Use get_git_deployment_context with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/create_git_project.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/create_git_project.graph.md)
<!-- /docsgraph:related -->

| Parameter       | Type    | Required | Default | Description                                                                                                                                                                                                                                                                                 |
| --------------- | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `repo`          | string  | Yes      | -       | Repository as "owner/name", or a repository URL such as https://github.com/owner/name or https://origin.cursor.com/owner/name.                                                                                                                                                              |
| `teamId`        | string  | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                                                                                                   |
| `provider`      | string  | No       | -       | Git provider to link. Inferred from recognized repository URLs. Otherwise defaults to "github". Use "cursor-origin" for Cursor-hosted repositories at origin.cursor.com. Ignored when the project already exists. Allowed values: `"github"`, `"gitlab"`, `"bitbucket"`, `"cursor-origin"`. |
| `projectName`   | string  | No       | -       | Vercel project to create or reuse. Defaults to the lowercased repository name.                                                                                                                                                                                                              |
| `rootDirectory` | string  | No       | -       | Root-relative directory to build in a monorepo. Only applied when creating the project.                                                                                                                                                                                                     |
| `deploy`        | boolean | No       | `true`  | Whether to create a preview deployment from the linked repository's production branch. Defaults to true. Set false only when the user explicitly requests link-only behavior.                                                                                                               |

**Sample prompt:** "Create a Vercel project for my team's GitHub repository and deploy a preview"


---

[View full sitemap](/docs/sitemap)
