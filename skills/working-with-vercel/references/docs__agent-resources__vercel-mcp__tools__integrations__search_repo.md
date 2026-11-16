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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/search_repo.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c8b23d7ab7ba1ba6c61bfe152f6146bd4caa86b69d896b2fbbea588b4510470b"
---

# search_repo

List git repositories linked to namespace by provider.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List git repositories linked to namespace by provider](https://vercel.com/docs/rest-api/integrations/list-git-repositories-linked-to-namespace-by-provider) — GET /v1/integrations/search-repo — Lists git repositories linked to a namespace \\`id\\` for a supported provider. A speci
- [list_vercel_ci_invocations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocations) — Use list_vercel_ci_invocations with Vercel MCP.
- [search_vercel_documentation](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/search_vercel_documentation) — Use search_vercel_documentation with Vercel MCP.
- [Enable or disable Vercel CI for a connected repository](https://vercel.com/docs/rest-api/vercel-ci/enable-or-disable-vercel-ci-for-a-connected-repository) — PATCH /v1/vercel-ci/repository-settings — Update Repository Settings
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
