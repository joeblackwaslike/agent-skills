---
title: git_namespaces
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/git_namespaces
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/git_namespaces"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use git_namespaces with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/git_namespaces.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "be873739f34c1cf4f8e3731899d9694bda4896628b83c18578f0d26754190d72"
---

# git_namespaces

Lists git namespaces for a supported provider. Supported providers are `github`, `gitlab` and `bitbucket`. If the provider is not provided, it will try to obtain it from the user that authenticated the request.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List git namespaces by provider](https://vercel.com/docs/rest-api/integrations/list-git-namespaces-by-provider) — GET /v1/integrations/git-namespaces — Lists git namespaces for a supported provider. Supported providers are \\`github\\`,
- [search_repo](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/search_repo) — Use search_repo with Vercel MCP.
- [List git repositories linked to namespace by provider](https://vercel.com/docs/rest-api/integrations/list-git-repositories-linked-to-namespace-by-provider) — GET /v1/integrations/search-repo — Lists git repositories linked to a namespace \\`id\\` for a supported provider. A speci
- [vercel git](https://vercel.com/docs/cli/git) — Learn how to manage your Git provider connections using the vercel git CLI command.
- [get_git_deployment_context](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_git_deployment_context) — Use get_git_deployment_context with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/git_namespaces.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/git_namespaces.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter        | Type    | Required | Description                                                                                        |
| ---------------- | ------- | -------- | -------------------------------------------------------------------------------------------------- |
| `host`           | string  | No       | The custom Git host if using a custom Git provider, like GitHub Enterprise Server                  |
| `provider`       | string  | No       | Allowed values: `"github"`, `"github-limited"`, `"github-custom-host"`, `"gitlab"`, `"bitbucket"`. |
| `viewerMetadata` | boolean | No       | When true, includes the viewer object for each namespace.                                          |


---

[View full sitemap](/docs/sitemap)
