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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "e76f16261b93261fee80f50fee846cbe527c596bab3cfe11d7bf5b8725537404"
---

# import-claude-design-from-url

Import a self-contained HTML bundle from Claude Design and deploy it to Vercel. The bundle must use a public HTTPS `claudeusercontent.com` URL and include all images, fonts, and styles.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy a Claude Design project to Vercel](https://vercel.com/kb/guide/claude-design) — Publish a Claude Design project to Vercel for a live production URL with the Vercel connector, or by exporting a .zip to
- [Deploy from Claude Design to Vercel](https://vercel.com/changelog/claude-design-and-vercel)
- [Deploy a Google Stitch design with Vercel Drop](https://vercel.com/kb/guide/google-stitch-vercel-drop) — Download the HTML from your Google Stitch screens and deploy them to production with Vercel Drop, with no Git or CLI req
- [web_fetch_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url) — Use web_fetch_vercel_url with Vercel MCP.
- [get_access_to_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url) — Use get_access_to_vercel_url with Vercel MCP.
- [deploy_to_vercel](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/deploy_to_vercel) — Use deploy_to_vercel with Vercel MCP.
- [Linking Projects with Vercel CLI](https://vercel.com/docs/cli/project-linking) — Learn how to link existing Vercel Projects with Vercel CLI.
- [vercel agent](https://vercel.com/docs/cli/agent) — Generate an AGENTS.md file with Vercel deployment best practices using the vercel agent CLI command.

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
