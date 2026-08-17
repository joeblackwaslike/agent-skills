---
title: Monitoring Quickstart
product: vercel
url: /docs/query/monitoring/quickstart
canonical_url: "https://vercel.com/docs/query/monitoring/quickstart"
last_updated: 2026-03-20
type: tutorial
prerequisites:
  - /docs/query/monitoring
  - /docs/query
related:
  - /docs/plans/pro-plan
  - /docs/plans/enterprise
  - /docs/observability
  - /docs/query/monitoring/monitoring-reference
  - /docs/query/monitoring
summary: "In this quickstart guide, you'll discover how to create and execute a query to visualize the most popular posts on your website."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/query/monitoring/quickstart.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "358d6b0ec03ee02da27c7bd33d98dbc606b15581b18370bddd6df1b01442a0e6"
---

# Monitoring Quickstart

## Prerequisites


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Web Analytics API](https://vercel.com/docs/analytics/web-analytics-api?from=related) — Learn how Web Analytics concepts map to API queries for custom reports, dashboards, and insights.
- [Using with CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli?from=related) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Using with CLI](https://vercel.com/docs/speed-insights/accessing-metrics-with-vercel-cli?from=related) — Use the Vercel CLI to query Speed Insights metrics from your terminal.
- [Getting Started](https://vercel.com/docs/analytics/quickstart?from=related) — Vercel Web Analytics provides you detailed insights into your website's visitors. This quickstart guide will help you ge
- [Notebooks](https://vercel.com/docs/notebooks?from=related) — Learn more about Notebooks and how they allow you to organize and save your queries.

Full cross-link map for this page: [/docs/query/monitoring/quickstart.graph.md](/docs/query/monitoring/quickstart.graph.md)
<!-- /docsgraph:related -->

- Make sure you upgrade to [Pro](/docs/plans/pro-plan) or [Enterprise](/docs/plans/enterprise) plan.
- Pro and Enterprise teams should [Upgrade to Observability Plus](/docs/observability#enabling-observability-plus) to access Monitoring.

## Create a new query

In the following guide you will learn how to view the most requested posts on your website.

- ### Go to the dashboard
  1. Open [**Observability**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability\&title=Go+to+Observability) in the sidebar from your Vercel [dashboard](/dashboard)
  2. Click the **Create New Query** button to open the query builder
  3. Click the **Edit Query** button to configure your query with clauses

- ### Add Visualize clause
  The [Visualize](/docs/query/monitoring/monitoring-reference#visualize") clause specifies which field in your query will be calculated. Set the **Visualize** clause to `requests` to monitor the most popular posts on your website.

  Click the **Run Query** button, and the [Monitoring chart](/docs/query/monitoring#monitoring-chart) will display the total number of requests made.

- ### Add Where clause
  To filter the query data, use the [Where](/docs/query/monitoring/monitoring-reference#where) clause and specify the conditions you want to match against. You can use a combination of [variables and operators](/docs/query/monitoring/monitoring-reference#where) to fetch the most requested posts. Add the following query statement to the **Where** clause:
  ```sql filename=Where
  host = 'my-site.com' and like(request_path, '/posts%')
  ```
  This query retrieves data with a host field of `my-site.com` and a `request_path` field that starts with /posts.

  The `%` character can be used as a wildcard to match any sequence of characters after `/posts`, allowing you to capture all `request_path` values that start with that substring.

- ### Add Group By clause
  Define a criteria that groups the data based on the selected attributes. The grouping mechanism is supported through the [Group By](/docs/query/monitoring/monitoring-reference#group-by) clause.

  Set the Group By clause to `request_path`.

  With **Visualize**, **Where**, and **Group By** fields set, the [Monitoring chart](/docs/query/monitoring#monitoring-chart) now shows the sum of `requests` that are filtered based on the `request_path`.

- ### Add Limit clause
  To control the number of results returned by the query, use the [**Limit**](/docs/query/monitoring/monitoring-reference#limit) clause and specify the desired number of results. You can choose from a few options, such as 5, 10, 25, 50, or 100 query results. For this example, set the limit to 5 query results.

- ### Save and Run Query
  Save your query and click the  button to generate the final results. The Monitoring chart will display a comprehensive view of the top 5 most requested posts on your website.


---

[View full sitemap](/docs/sitemap)
