---
title: list_billing_charges
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/billing/list_billing_charges
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/list_billing_charges"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/billing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_billing_charges with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/list_billing_charges.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "34889f2f60c587cff126c7eaf2b64c974245af2ac05e90a5d4d8eccc564301fe"
---

# list_billing_charges

List FOCUS billing charges.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Access billing usage and cost data via API](https://vercel.com/changelog/access-billing-usage-cost-data-api?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Flist_billing_charges&source_site=vercel-docs&relationship=related)
- [List FOCUS billing charges](https://vercel.com/docs/rest-api/billing/list-focus-billing-charges?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Flist_billing_charges&source_site=vercel-docs&relationship=related) — GET /v1/billing/charges — Returns the billing charge data in FOCUS v1.3 JSONL format for a specified Vercel team, within
- [list_contract_commitments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/list_contract_commitments?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Flist_billing_charges&source_site=vercel-docs&relationship=related) — Use list_contract_commitments with Vercel MCP.
- [get_rolling_release_billing_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_billing_status?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Flist_billing_charges&source_site=vercel-docs&relationship=related) — Use get_rolling_release_billing_status with Vercel MCP.
- [list_integration_billing_plans](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_billing_plans?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Flist_billing_charges&source_site=vercel-docs&relationship=related) — Use list_integration_billing_plans with Vercel MCP.
- [vercel usage](https://vercel.com/docs/cli/usage?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Flist_billing_charges&source_site=vercel-docs&relationship=related) — Learn how to view billing usage and costs, for your Vercel account using the vercel usage CLI command.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing/list_billing_charges.graph.md](/docs/agent-resources/vercel-mcp/tools/billing/list_billing_charges.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fbilling%2Flist_billing_charges&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                               |
| --------- | ------ | -------- | ------------------------------------------------------------------------- |
| `from`    | string | Yes      | Inclusive start of the date range as an ISO 8601 date-time string in UTC. |
| `to`      | string | Yes      | Exclusive end of the date range as an ISO 8601 date-time string in UTC.   |
| `teamId`  | string | No       | Team ID.                                                                  |
| `slug`    | string | No       | Team slug.                                                                |


---

[View full sitemap](/docs/sitemap)
