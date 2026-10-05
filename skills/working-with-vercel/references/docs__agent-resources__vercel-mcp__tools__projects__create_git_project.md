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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "25019fe0631a6c6152fdef4d5e68decd9b9eaaa9ee8f424a79d9002d48fa7103"
---

# create_git_project

Create or reuse a Vercel project linked to an accessible Git repository. By default, it creates a preview deployment from the repository's production branch.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fcreate_git_project&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.
- [get_git_deployment_context](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_git_deployment_context?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fcreate_git_project&source_site=vercel-docs&relationship=related) — Use get_git_deployment_context with Vercel MCP.
- [create_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fcreate_git_project&source_site=vercel-docs&relationship=related) — Use create_deployment with Vercel MCP.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fcreate_git_project&source_site=vercel-docs&relationship=related) — Use get_project with Vercel MCP.
- [Git settings](https://vercel.com/docs/project-configuration/git-settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fcreate_git_project&source_site=vercel-docs&relationship=related) — Use the project settings to manage the Git connection, enable Git LFS, and create deploy hooks.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/create_git_project.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/create_git_project.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fcreate_git_project&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter       | Type    | Required | Default         | Description                                                                |
| --------------- | ------- | -------- | --------------- | -------------------------------------------------------------------------- |
| `repo`          | string  | Yes      | -               | Repository as `owner/name` or a repository URL                             |
| `teamId`        | string  | Yes      | -               | Team ID, or team slug for this tool                                        |
| `provider`      | string  | No       | Inferred        | Git provider; defaults to GitHub when the URL does not identify a provider |
| `projectName`   | string  | No       | Repository name | Project to create or reuse                                                 |
| `rootDirectory` | string  | No       | -               | Directory to build in a monorepo; applies to new projects                  |
| `deploy`        | boolean | No       | `true`          | Create a preview deployment; set `false` to link only                      |

**Sample prompt:** "Create a Vercel project for my team's GitHub repository and deploy a preview"


---

[View full sitemap](/docs/sitemap)
