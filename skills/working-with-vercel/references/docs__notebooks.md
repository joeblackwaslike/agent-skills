---
title: Notebooks
product: vercel
url: /docs/notebooks
canonical_url: "https://vercel.com/docs/notebooks"
last_updated: 2026-02-27
type: how-to
prerequisites:
  []
related:
  - /docs/observability/observability-plus
summary: Learn more about Notebooks and how they allow you to organize and save your queries.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/notebooks.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "41c3991dc2fe7e3287839a4d1c8a29f2cde6732cacf2bbc149e841fbd0b9087d"
---

# Notebooks

> Notebooks are available on Enterprise and Pro plans

**Notebooks** allow you to collect and manage multiple queries related to your application's metrics and performance data.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Create and share queries with notebooks in Vercel Observability](https://vercel.com/changelog/create-and-share-queries-with-notebooks-in-vercel-observability)
- [Query and visualize workflow data in Vercel Observability](https://vercel.com/changelog/query-and-visualize-workflow-data-in-vercel-observability)
- [Run and share custom queries in Observability Plus](https://vercel.com/changelog/run-and-share-custom-queries-in-observability-plus)
- [Query](https://vercel.com/docs/query) — Query and visualize your Vercel usage, traffic, and more in observability.
- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.
- [Monitoring Quickstart](https://vercel.com/docs/query/monitoring/quickstart) — In this quickstart guide, you'll discover how to create and execute a query to visualize the most popular posts on your
- [Observability](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability) — Vercel MCP tools for observability.
- [Observability Insights](https://vercel.com/docs/observability/insights) — List of available data sources that you can view and monitor with Observability on Vercel.

Full cross-link map for this page: [/docs/notebooks.graph.md](/docs/notebooks.graph.md)
<!-- /docsgraph:related -->

Within a single notebook, you can store multiple queries that examine different aspects of your system - each with its own specific filters, time ranges, and data aggregations.
You can build comprehensive dashboards or analysis workflows by grouping related queries together.

> **💡 Note:** You need to enable [Observability
> Plus](/docs/observability/observability-plus) to use Notebooks since you need
> run queries.

## Using and managing notebooks

You can use notebooks to organize and save your queries. Each notebook is a collection of queries that you can keep personal or share with your team.

### Create a notebook

1. From [**Observability**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fobservability\&title=Go+to+Observability) in your dashboard sidebar, click **Notebooks** from the left navigation of the Observability Overview page
2. Edit the notebook name by clicking the pencil icon on the top left of the default title which uses your username and created date and time.

### Add a query to a notebook

1. From the **Notebooks** page, click the **Create Notebook** button or select an existing **Notebook**
2. Click the + icon to open the query builder and build your query
3. Edit the query name by clicking the pencil icon on the top left of the default query title
4. Select the most appropriate view for your query: line chart, volume chart, table or big number
5. Once you're happy with your query results, save it by clicking **Save Query**
6. Your query is now available in your notebook

### Delete a query

1. From the **Notebooks** page, select an existing **Notebook**
2. Click the three-dot menu on the top-right corner of a query, and select **Delete**. This action is permanent and cannot be undone.

### Delete a notebook

1. From the **Notebooks** page, select the **Notebook** you'd like to delete from the list
2. Click the three-dot menu on the top-right corner of the notebook, and select **Delete notebook**. This action is permanent and cannot be undone.

## Notebook types and access

You can create 2 types of notebooks.

- Personal Notebooks: Only the creator and owner can view them.
- Team Notebooks: All team members can view them and they share ownership.

When created, notebooks are personal by default. You can use the **Share** button to turn them to Team Notebooks for collaboration. When shared, all team members have full access to modify, add, or remove content within the notebook.

As a Notebook owner, you have complete control over your notebook. You can add new queries, edit existing ones, remove individual queries, or delete the entire notebook if it's no longer needed.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
