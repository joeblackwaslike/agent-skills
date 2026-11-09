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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "c0234d1fa7a10f9db48e622d60a67e397875b691078f3a9b8128b652c9383b1f"
---

# import-claude-design-from-url

Import a self-contained HTML bundle from Claude Design and deploy it to Vercel. The bundle must use a public HTTPS `claudeusercontent.com` URL and include all images, fonts, and styles.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy from Claude Design to Vercel](https://vercel.com/changelog/claude-design-and-vercel)
- [Deploy a Claude Design project to Vercel](https://vercel.com/kb/guide/claude-design) — Publish a Claude Design project to Vercel for a live production URL with the Vercel connector, or by exporting a .zip to
- [web_fetch_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url) — Use web_fetch_vercel_url with Vercel MCP.
- [get_access_to_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url) — Use get_access_to_vercel_url with Vercel MCP.
- [deploy_to_vercel](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/deploy_to_vercel) — Use deploy_to_vercel with Vercel MCP.
- [use_vercel_cli](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli) — Use use_vercel_cli with Vercel MCP.
- [Getting Started](https://vercel.com/docs/routing/redirects/bulk-redirects/getting-started) — Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/import-claude-design-from-url.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/import-claude-design-from-url.graph.md)
<!-- /docsgraph:related -->

| Parameter                  | Type   | Required | Default | Description                                                                                   |
| -------------------------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `url`                      | string | Yes      | -       | Public HTTPS URL to the design file. Valid for ~1 hour. Fetched server-side.                  |
| `title`                    | string | No       | -       | Suggested title for the imported design.                                                      |
| `claude_design_project_id` | string | No       | -       | Stable Claude Design project identifier. Reuse it to update the same imported Vercel project. |

**Sample prompt:** "Import this Claude Design into Vercel: https://claudeusercontent.com/example"


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
