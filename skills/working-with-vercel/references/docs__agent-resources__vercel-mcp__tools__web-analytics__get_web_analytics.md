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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "035eb800afb33745fd923e60fb975971600af0937b8ceadb4ad30f883ba216e6"
---

# get_web_analytics

Query Web Analytics for a Vercel project. Count mode returns total visitors and pageviews (or custom event count). Aggregate mode groups results over time or by dimensions such as route, requestPath, country, referrerHostname, deviceType, browserName, eventName, `flags/<name>`, or `eventData/<property>`. Web Analytics must be enabled for the project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [aggregate_pageviews](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_pageviews) — Use aggregate_pageviews with Vercel MCP.
- [aggregate_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_events) — Use aggregate_events with Vercel MCP.
- [Query Web Analytics with the API](https://vercel.com/docs/analytics/web-analytics-api) — Learn how Web Analytics concepts map to API queries for custom reports, dashboards, and insights.
- [Using Web Analytics](https://vercel.com/docs/analytics/using-web-analytics) — Learn how to use Vercel's Web Analytics to understand how visitors are using your website.
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
