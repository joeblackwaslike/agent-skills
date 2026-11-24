---
title: count_pageviews
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/web-analytics/count_pageviews
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/count_pageviews"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/web-analytics
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/analytics
summary: Use count_pageviews with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/count_pageviews.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "dc0523009eac1387f90b4659a496a49373353540042e717384fe99c7bcaadae6"
---

# count_pageviews

Counts page views.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [aggregate_pageviews](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_pageviews) — Use aggregate_pageviews with Vercel MCP.
- [count_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/count_events) — Use count_events with Vercel MCP.
- [Counts page views](https://vercel.com/docs/rest-api/web-analytics/counts-page-views) — GET /v1/query/web-analytics/visits/count — Counts the number of page views on a project \\(production only\\), since Web A
- [get_web_analytics](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/get_web_analytics) — Use get_web_analytics with Vercel MCP.
- [Counts custom events](https://vercel.com/docs/rest-api/web-analytics/counts-custom-events) — GET /v1/query/web-analytics/events/count — Counts the number of custom events on a project \\(production only\\), since We

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/web-analytics/count_pageviews.graph.md](/docs/agent-resources/vercel-mcp/tools/web-analytics/count_pageviews.graph.md)
<!-- /docsgraph:related -->

Enable [Web Analytics](/docs/analytics) for your project before querying its data.

## Parameters

| Parameter   | Type             | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId` | string           | Yes      | The project identifier or the project name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `since`     | number \| string | No       | Timestamp in milliseconds, or a valid Date string. Selects data from (including) this date and time. Will be adjusted according to the desired time granularity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `until`     | number \| string | No       | Timestamp in milliseconds, or a valid Date string. Selects data until (including) this date. Will be adjusted according to the desired time granularity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `filter`    | string           | No       | OData-compliant filter. Encode the value when sending it in a URL. Allows filtering on one or multiple dimensions. Supported dimensions: country, deviceType, environment, requestPath, referrerHostname, osName, browserName, route, utmSource, utmMedium, utmCampaign, utmContent, utmTerm. JSON dimensions filtered by key: flags/\<name>, for example flags/beta\_banner eq 'true'. Wrap keys containing characters other than letters, digits, and underscores in single quotes, for example flags/'my-flag' eq 'true'. Supported operations include eq, ne, in, and logical operators and, or, not with parentheses. Functions such as startswith are supported by the OData parser. |
| `teamId`    | string           | No       | Team ID to use for this operation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `slug`      | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

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
