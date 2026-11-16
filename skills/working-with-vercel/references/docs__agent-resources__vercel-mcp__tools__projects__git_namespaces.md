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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/git_namespaces.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "7b824ee45f4e2379ffddaf977fc2d3dd03d698c87fbb1dac6d67ed59d30253b8"
---

# git_namespaces

Lists git namespaces for a supported provider. Supported providers are `github`, `gitlab` and `bitbucket`. If the provider is not provided, it will try to obtain it from the user that authenticated the request.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List git namespaces by provider](https://vercel.com/docs/rest-api/integrations/list-git-namespaces-by-provider) — GET /v1/integrations/git-namespaces — Lists git namespaces for a supported provider. Supported providers are \\`github\\`,
- [Multiple Git namespaces per Personal Account and Team](https://vercel.com/changelog/multiple-git-namespaces-per-personal-account-and-team)
- [List git repositories linked to namespace by provider](https://vercel.com/docs/rest-api/integrations/list-git-repositories-linked-to-namespace-by-provider) — GET /v1/integrations/search-repo — Lists git repositories linked to a namespace \\`id\\` for a supported provider. A speci
- [search_repo](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/search_repo) — Use search_repo with Vercel MCP.
- [vercel git](https://vercel.com/docs/cli/git) — Learn how to manage your Git provider connections using the vercel git CLI command.
- [Git Configuration](https://vercel.com/docs/project-configuration/git-configuration) — Learn how to configure Git for your project through vercel.json or vercel.ts.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/git_namespaces.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/git_namespaces.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter        | Type    | Required | Description                                                                                        |
| ---------------- | ------- | -------- | -------------------------------------------------------------------------------------------------- |
| `host`           | string  | No       | The custom Git host if using a custom Git provider, like GitHub Enterprise Server                  |
| `provider`       | string  | No       | Allowed values: `"github"`, `"github-limited"`, `"github-custom-host"`, `"gitlab"`, `"bitbucket"`. |
| `viewerMetadata` | boolean | No       | When true, includes the viewer object for each namespace.                                          |

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
