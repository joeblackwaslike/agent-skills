---
title: aggregate_events
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_events
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_events"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/web-analytics
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/analytics
summary: Use aggregate_events with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_events.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "271a789795d84d19279e2af3b2e8007682cd5c1ff3cf45c4ca3bb5ea4c3589e2"
---

# aggregate_events

Aggregates custom events.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [aggregate_pageviews](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_pageviews) — Use aggregate_pageviews with Vercel MCP.
- [count_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/count_events) — Use count_events with Vercel MCP.
- [Aggregates custom events](https://vercel.com/docs/rest-api/web-analytics/aggregates-custom-events) — GET /v1/query/web-analytics/events/aggregate — Counts custom events on a project, within the requested date range. Resul
- [get_web_analytics](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/get_web_analytics) — Use get_web_analytics with Vercel MCP.
- [list_user_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_user_events) — Use list_user_events with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_events.graph.md](/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_events.graph.md)
<!-- /docsgraph:related -->

Enable [Web Analytics](/docs/analytics) for your project before querying its data.

## Parameters

| Parameter   | Type                                 | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------- | ------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId` | string                               | Yes      | The project identifier or the project name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `by`        | Array\<string & string \| unknown> | Yes      | Up to two dimensions used to break down results. At most one time granularity is allowed: hour, day, week, month, year. Other dimensions: country, deviceType, environment, requestPath, referrerHostname, osName, browserName, route, utmSource, utmMedium, utmCampaign, utmContent, utmTerm, eventName. JSON dimensions: flags, eventData. Used bare, they break down results by key, for example flags returns one group per flag name. With a key, they break down results by that key's value, for example eventData/plan. Wrap keys containing characters other than letters, digits, and underscores in single quotes, for example flags/'my-flag'.                                                                                                                       |
| `since`     | number \| string                     | Yes      | Timestamp in milliseconds, or a valid Date string. Selects data from (including) this date and time. Will be adjusted according to the desired time granularity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `until`     | number \| string                     | Yes      | Timestamp in milliseconds, or a valid Date string. Selects data until (including) this date. Will be adjusted according to the desired time granularity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `limit`     | integer                              | No       | Number of distinct results, Other results are grouped into "Others" group. Minimum: 1. Maximum: 100. Default: `10`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `filter`    | string                               | No       | OData-compliant filter. Encode the value when sending it in a URL. Allows filtering on one or multiple dimensions. By default, filters for production environment only. Supported dimensions: country, deviceType, environment, requestPath, referrerHostname, osName, browserName, route, utmSource, utmMedium, utmCampaign, utmContent, utmTerm, eventName. JSON dimensions filtered by key: flags/\<name>, eventData/\<property>, for example eventData/plan eq 'pro'. Wrap keys containing characters other than letters, digits, and underscores in single quotes, for example flags/'my-flag' eq 'true'. Supported operations include eq, ne, in, and logical operators and, or, not with parentheses. Functions such as startswith are supported by the OData parser. |
| `teamId`    | string                               | No       | Team ID to use for this operation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `slug`      | string                               | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
