---
title: aggregate_pageviews
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_pageviews
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_pageviews"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/web-analytics
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/analytics
summary: Use aggregate_pageviews with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_pageviews.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "8dfe1d1151a830076ae5838b635732eccecfb3c2b88b948b26c527fff12f8875"
---

# aggregate_pageviews

Aggregates page views.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [aggregate_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_events?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fweb-analytics%2Faggregate_pageviews&source_site=vercel-docs&relationship=related) — Use aggregate_events with Vercel MCP.
- [count_pageviews](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/count_pageviews?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fweb-analytics%2Faggregate_pageviews&source_site=vercel-docs&relationship=related) — Use count_pageviews with Vercel MCP.
- [Aggregates page views](https://vercel.com/docs/rest-api/web-analytics/aggregates-page-views?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fweb-analytics%2Faggregate_pageviews&source_site=vercel-docs&relationship=related) — GET /v1/query/web-analytics/visits/aggregate — Counts pageviews on a project, within the requested date range. Results a
- [count_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/count_events?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fweb-analytics%2Faggregate_pageviews&source_site=vercel-docs&relationship=related) — Use count_events with Vercel MCP.
- [Counts page views](https://vercel.com/docs/rest-api/web-analytics/counts-page-views?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fweb-analytics%2Faggregate_pageviews&source_site=vercel-docs&relationship=related) — GET /v1/query/web-analytics/visits/count — Counts the number of page views on a project \\(production only\\), since Web A

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_pageviews.graph.md](/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_pageviews.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fweb-analytics%2Faggregate_pageviews&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Enable [Web Analytics](/docs/analytics) for your project before querying its data.

## Parameters

| Parameter   | Type                        | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------- | --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `projectId` | string                      | Yes      | The project identifier or the project name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `by`        | Array\<string \| unknown> | Yes      | Up to two dimensions used to break down results. At most one time granularity is allowed: hour, day, week, month, year. Other dimensions: country, deviceType, environment, requestPath, referrerHostname, osName, browserName, route, utmSource, utmMedium, utmCampaign, utmContent, utmTerm. JSON dimensions: flags. Used bare, it breaks down results by key, for example flags returns one group per flag name. With a key, it breaks down results by that key's value, for example flags/beta\_banner. Wrap keys containing characters other than letters, digits, and underscores in single quotes, for example flags/'my-flag'.                                                                                                            |
| `since`     | number \| string            | Yes      | Timestamp in milliseconds, or a valid Date string. Selects data from (including) this date and time. Will be adjusted according to the desired time granularity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `until`     | number \| string            | Yes      | Timestamp in milliseconds, or a valid Date string. Selects data until (including) this date. Will be adjusted according to the desired time granularity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `limit`     | integer                     | No       | Number of distinct results, default to 10. Other results are grouped into "Others" group. Default: `10`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `filter`    | string                      | No       | OData-compliant filter. Encode the value when sending it in a URL. Allows filtering on one or multiple dimensions. By default, filters for production environment only. Supported dimensions: country, deviceType, environment, requestPath, referrerHostname, osName, browserName, route, utmSource, utmMedium, utmCampaign, utmContent, utmTerm. JSON dimensions filtered by key: flags/\<name>, for example flags/beta\_banner eq 'true'. Wrap keys containing characters other than letters, digits, and underscores in single quotes, for example flags/'my-flag' eq 'true'. Supported operations include eq, ne, in, and logical operators and, or, not with parentheses. Functions such as startswith are supported by the OData parser. |
| `teamId`    | string                      | No       | Team ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `slug`      | string                      | No       | Team slug.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |


---

[View full sitemap](/docs/sitemap)
