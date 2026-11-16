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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/get_web_analytics.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "5444af576280a1eec6530b25da834a7cb089a43aaf4060028ec2a32dd1313de5"
---

# get_web_analytics

Query Web Analytics for a Vercel project. Count mode returns total visitors and pageviews (or custom event count). Aggregate mode groups results over time or by dimensions such as route, requestPath, country, referrerHostname, deviceType, browserName, eventName, `flags/<name>`, or `eventData/<property>`. Web Analytics must be enabled for the project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Web Analytics](https://vercel.com/docs/analytics/using-web-analytics) — Learn how to use Vercel's Web Analytics to understand how visitors are using your website.
- [aggregate_pageviews](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_pageviews) — Use aggregate_pageviews with Vercel MCP.
- [Query Web Analytics with the API](https://vercel.com/docs/analytics/web-analytics-api) — Learn how Web Analytics concepts map to API queries for custom reports, dashboards, and insights.
- [aggregate_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/web-analytics/aggregate_events) — Use aggregate_events with Vercel MCP.
- [Counts page views](https://vercel.com/docs/rest-api/web-analytics/counts-page-views) — GET /v1/query/web-analytics/visits/count — Counts the number of page views on a project \\(production only\\), since Web A

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
