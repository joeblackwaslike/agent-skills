---
title: list_contract_commitments
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/billing/list_contract_commitments
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/list_contract_commitments"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/billing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_contract_commitments with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/list_contract_commitments.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "1814f2cbcb8f8dad90a4818847033eb752592a77f6115808f12c4ef258189f96"
---

# list_contract_commitments

List FOCUS contract commitments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List FOCUS contract commitments](https://vercel.com/docs/rest-api/billing/list-focus-contract-commitments) — GET /v1/billing/contract-commitments — Returns commitment allocations per contract period in FOCUS v1.3 JSONL format for
- [vercel billing contract](https://vercel.com/docs/cli/contract) — Learn how to view contract commitment information for your Vercel account using the vercel billing contract CLI command.
- [list_billing_charges](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/list_billing_charges) — Use list_billing_charges with Vercel MCP.
- [list_vercel_ci_invocations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocations) — Use list_vercel_ci_invocations with Vercel MCP.
- [Integrations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations) — Vercel MCP tools for integrations.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing/list_contract_commitments.graph.md](/docs/agent-resources/vercel-mcp/tools/billing/list_contract_commitments.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

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
