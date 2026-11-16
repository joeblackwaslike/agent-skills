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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_git_project.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c188ab40903a826fcf857479afdcd82b8f0513d30c1da882c9e89c6889a580c7"
---

# create_git_project

Create or reuse a Vercel project linked to an accessible Git repository. By default, it creates a preview deployment from the repository's production branch.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.
- [Deploying Git Repositories with Vercel](https://vercel.com/docs/git) — Vercel automatically deploys supported Git repositories on every branch push and when changes merge into the production
- [vercel git](https://vercel.com/docs/cli/git) — Learn how to manage your Git provider connections using the vercel git CLI command.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project) — Use get_project with Vercel MCP.
- [Deploying GitLab Projects with Vercel](https://vercel.com/docs/git/vercel-for-gitlab) — ​Vercel for GitLab automatically deploys your GitLab projects with Vercel, providing Preview Deployment URLs, and automa

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
