---
title: list_supported_tlds
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains/list_supported_tlds
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_supported_tlds"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/domains
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_supported_tlds with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_supported_tlds.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "a032ff435fe9a17054675dc8ee01704208b98053b1a8847e32e90e1d20170988"
---

# list_supported_tlds

Get supported TLDs.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get supported TLDs](https://vercel.com/docs/rest-api/domains-registrar/get-supported-tlds) — GET /v1/registrar/tlds/supported — Get a list of TLDs supported by Vercel
- [get_tld](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_tld) — Use get_tld with Vercel MCP.
- [Get TLD](https://vercel.com/docs/rest-api/domains-registrar/get-tld) — GET /v1/registrar/tlds/{tld} — Get the metadata for a specific TLD.
- [list_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_domains) — Use list_domains with Vercel MCP.
- [list_teams](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_teams) — Use list_teams with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains/list_supported_tlds.graph.md](/docs/agent-resources/vercel-mcp/tools/domains/list_supported_tlds.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `teamId`  | string | No       | Team ID to use for this operation. |

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
