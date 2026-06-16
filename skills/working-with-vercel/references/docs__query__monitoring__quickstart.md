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
  - /docs/observability/monitoring/monitoring-reference
  - /docs/observability/monitoring
summary: "In this quickstart guide, you'll discover how to create and execute a query to visualize the most popular posts on your website."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/query/monitoring/quickstart.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "4dfd10f5a1c7ff9b2a8cd318189d2120a7c9ae7a74f774383d38b1c9d80ac09f"
---

# Monitoring Quickstart

## Prerequisites

- Make sure you upgrade to [Pro](/docs/plans/pro-plan) or [Enterprise](/docs/plans/enterprise) plan.
- Pro and Enterprise teams should [Upgrade to Observability Plus](/docs/observability#enabling-observability-plus) to access Monitoring.

## Create a new query

In the following guide you will learn how to view the most requested posts on your website.

- ### Go to the dashboard
  1. Open [**Observability**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability\&title=Go+to+Observability) in the sidebar from your Vercel [dashboard](/dashboard)
  2. Click the **Create New Query** button to open the query builder
  3. Click the **Edit Query** button to configure your query with clauses

- ### Add Visualize clause
  The [Visualize](/docs/observability/monitoring/monitoring-reference#visualize") clause specifies which field in your query will be calculated. Set the **Visualize** clause to `requests` to monitor the most popular posts on your website.

  Click the **Run Query** button, and the [Monitoring chart](/docs/observability/monitoring#monitoring-chart) will display the total number of requests made.

- ### Add Where clause
  To filter the query data, use the [Where](/docs/observability/monitoring/monitoring-reference#where) clause and specify the conditions you want to match against. You can use a combination of [variables and operators](/docs/observability/monitoring/monitoring-reference#where) to fetch the most requested posts. Add the following query statement to the **Where** clause:
  ```sql filename=Where
  host = 'my-site.com' and like(request_path, '/posts%')
  ```
  This query retrieves data with a host field of `my-site.com` and a `request_path` field that starts with /posts.

  The `%` character can be used as a wildcard to match any sequence of characters after `/posts`, allowing you to capture all `request_path` values that start with that substring.

- ### Add Group By clause
  Define a criteria that groups the data based on the selected attributes. The grouping mechanism is supported through the [Group By](/docs/observability/monitoring/monitoring-reference#group-by) clause.

  Set the Group By clause to `request_path`.

  With **Visualize**, **Where**, and **Group By** fields set, the [Monitoring chart](/docs/observability/monitoring#monitoring-chart) now shows the sum of `requests` that are filtered based on the `request_path`.

- ### Add Limit clause
  To control the number of results returned by the query, use the [**Limit**](/docs/observability/monitoring/monitoring-reference#limit) clause and specify the desired number of results. You can choose from a few options, such as 5, 10, 25, 50, or 100 query results. For this example, set the limit to 5 query results.

- ### Save and Run Query
  Save your query and click the  button to generate the final results. The Monitoring chart will display a comprehensive view of the top 5 most requested posts on your website.


---

[View full sitemap](/docs/sitemap)
