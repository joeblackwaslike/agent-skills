---
title: search_repo
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/integrations/search_repo
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/search_repo"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/integrations
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use search_repo with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/search_repo.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "13d5f78b9b5b992c3400e9719a460b8feb296e3bb75ce8b81c6fa768edf13a15"
---

# search_repo

List git repositories linked to namespace by provider.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List git repositories linked to namespace by provider](https://vercel.com/docs/rest-api/integrations/list-git-repositories-linked-to-namespace-by-provider) — GET /v1/integrations/search-repo — Lists git repositories linked to a namespace \\`id\\` for a supported provider. A speci
- [list_vercel_ci_invocations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocations) — Use list_vercel_ci_invocations with Vercel MCP.
- [artifact_query](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/artifact_query) — Use artifact_query with Vercel MCP.
- [git_namespaces](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/git_namespaces) — Use git_namespaces with Vercel MCP.
- [List git namespaces by provider](https://vercel.com/docs/rest-api/integrations/list-git-namespaces-by-provider) — GET /v1/integrations/git-namespaces — Lists git namespaces for a supported provider. Supported providers are \\`github\\`,

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/integrations/search_repo.graph.md](/docs/agent-resources/vercel-mcp/tools/integrations/search_repo.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter        | Type                     | Required | Description                                                                                                           |
| ---------------- | ------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `query`          | string                   | No       | -                                                                                                                     |
| `namespaceId`    | string \| number \| null | No       | -                                                                                                                     |
| `provider`       | string                   | No       | Allowed values: `"github"`, `"github-limited"`, `"github-custom-host"`, `"gitlab"`, `"bitbucket"`, `"cursor-origin"`. |
| `installationId` | string                   | No       | -                                                                                                                     |
| `host`           | string                   | No       | The custom Git host if using a custom Git provider, like GitHub Enterprise Server                                     |
| `teamId`         | string                   | No       | Team ID to use for this operation.                                                                                    |
| `slug`           | string                   | No       | Team slug to use for this operation. Use instead of teamId.                                                           |


---

[View full sitemap](/docs/sitemap)
