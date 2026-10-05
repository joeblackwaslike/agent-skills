---
title: import-claude-design-from-url
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/import-claude-design-from-url
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/import-claude-design-from-url"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use import-claude-design-from-url with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/import-claude-design-from-url.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "fc346a9aa2026aa9750e2c42dd853bbf7c8595e41d99cdad97451c3f47755392"
---

# import-claude-design-from-url

Import a self-contained HTML bundle from Claude Design and deploy it to Vercel. The bundle must use a public HTTPS `claudeusercontent.com` URL and include all images, fonts, and styles.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy a Claude Design project to Vercel](https://vercel.com/kb/guide/claude-design?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fimport-claude-design-from-url&source_site=vercel-docs&relationship=related) — Publish a Claude Design project to Vercel for a live production URL with the Vercel connector, or by exporting a .zip to
- [Deploy from Claude Design to Vercel](https://vercel.com/changelog/claude-design-and-vercel?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fimport-claude-design-from-url&source_site=vercel-docs&relationship=related)
- [Deploy a Google Stitch design with Vercel Drop](https://vercel.com/kb/guide/google-stitch-vercel-drop?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fimport-claude-design-from-url&source_site=vercel-docs&relationship=related) — Download the HTML from your Google Stitch screens and deploy them to production with Vercel Drop, with no Git or CLI req
- [web_fetch_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fimport-claude-design-from-url&source_site=vercel-docs&relationship=related) — Use web_fetch_vercel_url with Vercel MCP.
- [get_access_to_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fimport-claude-design-from-url&source_site=vercel-docs&relationship=related) — Use get_access_to_vercel_url with Vercel MCP.
- [Documentation and CLI](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fimport-claude-design-from-url&source_site=vercel-docs&relationship=related) — Vercel MCP tools for documentation and cli.
- [Linking Projects with Vercel CLI](https://vercel.com/docs/cli/project-linking?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fimport-claude-design-from-url&source_site=vercel-docs&relationship=related) — Learn how to link existing Vercel Projects with Vercel CLI.
- [vercel agent](https://vercel.com/docs/cli/agent?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fimport-claude-design-from-url&source_site=vercel-docs&relationship=related) — Generate an AGENTS.md file with Vercel deployment best practices using the vercel agent CLI command.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/import-claude-design-from-url.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/import-claude-design-from-url.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fimport-claude-design-from-url&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter                  | Type   | Required | Default | Description                                                                                  |
| -------------------------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------- |
| `url`                      | string | Yes      | -       | Public HTTPS URL to the Claude Design file. The URL is valid for approximately 1 hour        |
| `title`                    | string | No       | -       | Suggested title for the imported design                                                      |
| `claude_design_project_id` | string | No       | -       | Stable Claude Design project identifier. Reuse it to update the same imported Vercel project |

**Sample prompt:** "Import this Claude Design into Vercel: https://claudeusercontent.com/example"


---

[View full sitemap](/docs/sitemap)
