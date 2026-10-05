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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "9f691aafeb00c54a6b0dc447c53c08dd6938dd8e05dd5fa4d4b72165ee72442f"
---

# search_repo

List git repositories linked to namespace by provider.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List git repositories linked to namespace by provider](https://vercel.com/docs/rest-api/integrations/list-git-repositories-linked-to-namespace-by-provider?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fsearch_repo&source_site=vercel-docs&relationship=related) — GET /v1/integrations/search-repo — Lists git repositories linked to a namespace \\`id\\` for a supported provider. A speci
- [artifact_query](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/artifact_query?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fsearch_repo&source_site=vercel-docs&relationship=related) — Use artifact_query with Vercel MCP.
- [List git namespaces by provider](https://vercel.com/docs/rest-api/integrations/list-git-namespaces-by-provider?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fsearch_repo&source_site=vercel-docs&relationship=related) — GET /v1/integrations/git-namespaces — Lists git namespaces for a supported provider. Supported providers are \\`github\\`,
- [list_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fsearch_repo&source_site=vercel-docs&relationship=related) — Use list_projects with Vercel MCP.
- [create_git_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_git_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fsearch_repo&source_site=vercel-docs&relationship=related) — Use create_git_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/integrations/search_repo.graph.md](/docs/agent-resources/vercel-mcp/tools/integrations/search_repo.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fsearch_repo&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter        | Type                     | Required | Description                                                                                                           |
| ---------------- | ------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `query`          | string                   | No       | -                                                                                                                     |
| `namespaceId`    | string \| number \| null | No       | -                                                                                                                     |
| `provider`       | string                   | No       | Allowed values: `"github"`, `"github-limited"`, `"github-custom-host"`, `"gitlab"`, `"bitbucket"`, `"cursor-origin"`. |
| `installationId` | string                   | No       | -                                                                                                                     |
| `host`           | string                   | No       | The custom Git host if using a custom Git provider, like GitHub Enterprise Server                                     |
| `teamId`         | string                   | No       | Team ID.                                                                                                              |
| `slug`           | string                   | No       | Team slug.                                                                                                            |


---

[View full sitemap](/docs/sitemap)
