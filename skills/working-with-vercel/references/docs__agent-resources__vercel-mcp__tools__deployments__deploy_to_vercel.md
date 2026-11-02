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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/deploy_to_vercel.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "3f5f60c884785d56b59c72b72f1358e2ea192ad6a6f407a80b5eee74bde26952"
---

# deploy_to_vercel

Deploy a small, simple project from inline file contents only when the Vercel CLI is unavailable and no usable remote git repository exists, or the user explicitly requests an inline file deployment. Prefer the Vercel CLI for local projects. It reads and uploads files directly without reproducing source as model output. If the intended source is pushed to a repository's production branch, use create\_git\_project. Do not reconstruct medium or large projects, binary assets, or dependency trees in tool arguments. This remote tool cannot read local paths or attachments. Files with actual contents are required. Limits: 300 files, 3 MiB per file, 4 MiB total encoded contents. Creation is asynchronous. Poll get\_deployment until READY, ERROR, or CANCELED before reporting the build outcome.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment) — Use create_deployment with Vercel MCP.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [open_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/open_deployments) — Use open_deployments with Vercel MCP.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
