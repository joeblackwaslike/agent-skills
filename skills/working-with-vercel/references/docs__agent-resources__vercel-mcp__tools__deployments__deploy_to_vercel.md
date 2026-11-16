---
title: deploy_to_vercel
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/deploy_to_vercel
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/deploy_to_vercel"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use deploy_to_vercel with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/deploy_to_vercel.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "7564a1940c2442edea66645de921261f5d7146132ff92d0145bac0fe7b0c43b5"
---

# deploy_to_vercel

Deploy a small, simple project from inline file contents only when the Vercel CLI is unavailable and no usable remote git repository exists, or the user explicitly requests an inline file deployment. Prefer the Vercel CLI for local projects. It reads and uploads files directly without reproducing source as model output. If the intended source is pushed to a repository's production branch, use create\_git\_project. Do not reconstruct medium or large projects, binary assets, or dependency trees in tool arguments. This remote tool cannot read local paths or attachments. Files with actual contents are required. Limits: 300 files, 3 MiB per file, 4 MiB total encoded contents. Creation is asynchronous. Poll get\_deployment until READY, ERROR, or CANCELED before reporting the build outcome.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [create_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment) — Use create_deployment with Vercel MCP.
- [list_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments) — Use list_deployments with Vercel MCP.
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/deploy_to_vercel.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/deploy_to_vercel.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type             | Required | Default | Description                                                                                                                                                                                                                |
| ----------------- | ---------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target`          | string           | Yes      | -       | Required. "preview" for a shareable non-production URL, or "production" to go live. Allowed values: `"preview"`, `"production"`.                                                                                           |
| `name`            | string           | Yes      | -       | Project name. Vercel creates the project if it does not already exist.                                                                                                                                                     |
| `files`           | Array\<object> | Yes      | -       | Required non-empty array of source files with their actual contents. A project name or local path alone cannot deploy. Do not include node\_modules, .git, .env files, or secrets. Vercel installs dependencies and builds. |
| `teamId`          | string           | No       | -       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                                  |
| `projectSettings` | object           | No       | -       | Optional build settings. Omit to let Vercel auto-detect the framework.                                                                                                                                                     |

This workflow is available on root connections that expose `deploy_to_vercel`. Project-scoped connections do not register it. Use `create_deployment` when your scoped connection exposes that tool.

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
