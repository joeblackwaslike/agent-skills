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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/list_contract_commitments.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c67019e903fbec5c0267217cc4a0286340b0d7e0013780e468b3a8d94624b099"
---

# list_contract_commitments

List FOCUS contract commitments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List FOCUS contract commitments](https://vercel.com/docs/rest-api/billing/list-focus-contract-commitments) — GET /v1/billing/contract-commitments — Returns commitment allocations per contract period in FOCUS v1.3 JSONL format for
- [vercel contract](https://vercel.com/docs/cli/contract) — Learn how to view contract commitment information for your Vercel account using the vercel contract CLI command.
- [list_billing_charges](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/list_billing_charges) — Use list_billing_charges with Vercel MCP.
- [list_event_types](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_event_types) — Use list_event_types with Vercel MCP.
- [get_rolling_release_billing_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_billing_status) — Use get_rolling_release_billing_status with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing/list_contract_commitments.graph.md](/docs/agent-resources/vercel-mcp/tools/billing/list_contract_commitments.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
