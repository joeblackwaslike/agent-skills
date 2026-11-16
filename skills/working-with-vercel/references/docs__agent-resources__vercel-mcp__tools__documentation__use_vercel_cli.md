---
title: use_vercel_cli
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/documentation
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use use_vercel_cli with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "dd043b4f1e98d8c0f3a2a3787b9d99cbf23688b4e620da4d0c1aa94290a6522e"
---

# use_vercel_cli

This tool is available through the `https://mcp.vercel.com/cli/mcp` connection.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel help](https://vercel.com/docs/cli/help) — Learn how to use the vercel help CLI command to get information about all available Vercel CLI commands.
- [search_vercel_documentation](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/search_vercel_documentation) — Use search_vercel_documentation with Vercel MCP.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel login](https://vercel.com/docs/cli/login) — Learn how to login into your Vercel account using the vercel login CLI command.
- [vercel setup](https://vercel.com/docs/cli/setup) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code, Codex, and OpenCode, and co

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli.graph.md](/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli.graph.md)
<!-- /docsgraph:related -->

Instructs the LLM to use Vercel CLI commands with --help flag for information.

| Parameter | Type   | Required | Default | Description                                 |
| --------- | ------ | -------- | ------- | ------------------------------------------- |
| `command` | string | No       | -       | Specific Vercel CLI command to run.         |
| `action`  | string | Yes      | -       | What you want to accomplish with Vercel CLI |

**Sample prompt:** "Help me deploy this project using Vercel CLI"

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
