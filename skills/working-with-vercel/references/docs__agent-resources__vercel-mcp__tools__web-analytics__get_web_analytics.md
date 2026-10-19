---
title: get_web_analytics
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/web-analytics/get_web_analytics
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/get_web_analytics"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/web-analytics
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_web_analytics with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/get_web_analytics.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "e7e8e9eeb6c50cc4c9db6adbcfd67a43c10729adf0a1637899b1f2ce3485897c"
---

# get_web_analytics

Query Web Analytics for a Vercel project. Count mode returns total visitors and pageviews (or custom event count). Aggregate mode groups results over time or by dimensions such as route, requestPath, country, referrerHostname, deviceType, browserName, eventName, `flags/<name>`, or `eventData/<property>`. Web Analytics must be enabled for the project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Query Web Analytics from the Vercel CLI](https://vercel.com/changelog/query-web-analytics-from-the-vercel-cli)
- [aggregate_pageviews](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_pageviews) — Use aggregate_pageviews with Vercel MCP.
- [aggregate_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_events) — Use aggregate_events with Vercel MCP.
- [Query Web Analytics with the API](https://vercel.com/docs/analytics/web-analytics-api) — Learn how Web Analytics concepts map to API queries for custom reports, dashboards, and insights.
- [count_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/count_events) — Use count_events with Vercel MCP.
- [count_pageviews](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/count_pageviews) — Use count_pageviews with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/web-analytics/get_web_analytics.graph.md](/docs/agent-resources/vercel-mcp/tools/web-analytics/get_web_analytics.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type             | Required | Default | Description                                                                                                                                                                                                                                                                         |
| ----------- | ---------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`    | string           | No       | -       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                                                                                           |
| `projectId` | string           | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`.                                                                                                                                                                                       |
| `dataset`   | string           | No       | -       | Data to query: visits for automatically tracked pageviews, or events for custom events sent with track(). Defaults to visits. Allowed values: `"visits"`, `"events"`.                                                                                                               |
| `mode`      | string           | No       | -       | Count returns one total. Aggregate returns rows grouped by one or two by dimensions and requires since, until, and by. Defaults to count. Allowed values: `"count"`, `"aggregate"`.                                                                                                 |
| `since`     | string \| number | No       | -       | Start or end of the date range as a date string, ISO 8601 timestamp, or Unix timestamp in milliseconds. Since and until must be provided together.                                                                                                                                  |
| `until`     | string \| number | No       | -       | Start or end of the date range as a date string, ISO 8601 timestamp, or Unix timestamp in milliseconds. Since and until must be provided together.                                                                                                                                  |
| `by`        | Array\<string> | No       | -       | One or two dimensions for aggregate mode. Time dimensions: hour, day, week, month, year. Other common dimensions: country, deviceType, environment, requestPath, referrerHostname, osName, browserName, route, UTM fields, eventName, flags/\<name>, and eventData/\<property>. |
| `filter`    | string           | No       | -       | OData filter expression, for example requestPath eq '/pricing' and country eq 'US', eventName eq 'signup', or eventData/plan eq 'pro'.                                                                                                                                              |
| `limit`     | integer          | No       | -       | Maximum distinct results in aggregate mode. Remaining values are grouped into Others. Defaults to 10. Minimum: 1. Maximum: 100.                                                                                                                                                     |


---

[View full sitemap](/docs/sitemap)
