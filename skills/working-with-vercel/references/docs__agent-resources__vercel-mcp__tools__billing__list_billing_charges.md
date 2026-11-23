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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/list_billing_charges.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "9bbe5bc885160c5123ef31c6387c8cf8ff1b4aa97c3989d93e6649ee529f5d70"
---

# list_billing_charges

List FOCUS billing charges.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Access billing usage and cost data via API](https://vercel.com/changelog/access-billing-usage-cost-data-api)
- [Vercel Billing CLI is now available](https://vercel.com/changelog/vercel-billing-cli-is-now-available)
- [List FOCUS billing charges](https://vercel.com/docs/rest-api/billing/list-focus-billing-charges) — GET /v1/billing/charges — Returns the billing charge data in FOCUS v1.3 JSONL format for a specified Vercel team, within
- [vercel billing](https://vercel.com/docs/cli/billing) — Learn how to view your billing overview, usage, budgets, and invoices for your Vercel team using the vercel billing CLI
- [get_rolling_release_billing_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_billing_status) — Use get_rolling_release_billing_status with Vercel MCP.
- [vercel billing usage](https://vercel.com/docs/cli/usage) — Learn how to view billing usage and costs, for your Vercel account using the vercel billing usage CLI command.
- [vercel pricing](https://vercel.com/docs/cli/pricing) — Look up Hobby, Pro, and Enterprise features from the public Vercel pricing table using the CLI.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/billing/list_billing_charges.graph.md](/docs/agent-resources/vercel-mcp/tools/billing/list_billing_charges.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                               |
| --------- | ------ | -------- | ------------------------------------------------------------------------- |
| `from`    | string | Yes      | Inclusive start of the date range as an ISO 8601 date-time string in UTC. |
| `to`      | string | Yes      | Exclusive end of the date range as an ISO 8601 date-time string in UTC.   |
| `teamId`  | string | No       | Team ID to use for this operation.                                        |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId.               |

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
