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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "0cfb9737d41120283b9659425d516698e9bcb8762db9c275e221ebf3794a5890"
---

# use_vercel_cli

This tool is available through the `https://mcp.vercel.com/cli/mcp` connection.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel help](https://vercel.com/docs/cli/help) — Learn how to use the vercel help CLI command to get information about all available Vercel CLI commands.
- [vercel login](https://vercel.com/docs/cli/login) — Learn how to login into your Vercel account using the vercel login CLI command.
- [vercel mcp](https://vercel.com/docs/cli/mcp) — Set up Model Context Protocol \\(MCP\\) usage with a Vercel project using the vercel mcp CLI command.
- [vercel setup](https://vercel.com/docs/cli/setup) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code and Codex, and connect your
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli.graph.md](/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli.graph.md)
<!-- /docsgraph:related -->

Instructs the LLM to use Vercel CLI commands with --help flag for information.

| Parameter | Type   | Required | Default | Description                                 |
| --------- | ------ | -------- | ------- | ------------------------------------------- |
| `command` | string | No       | -       | Specific Vercel CLI command to run.         |
| `action`  | string | Yes      | -       | What you want to accomplish with Vercel CLI |

**Sample prompt:** "Help me deploy this project using Vercel CLI"


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
