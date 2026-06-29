---
title: Query Web Analytics with the API
product: vercel
url: /docs/analytics/web-analytics-api
canonical_url: "https://vercel.com/docs/analytics/web-analytics-api"
last_updated: 2026-06-25
type: how-to
prerequisites:
  - /docs/analytics
related:
  - /docs/analytics/quickstart
  - /docs/rest-api/web-analytics/aggregates-page-views
  - /docs/analytics/custom-events
  - /docs/rest-api/web-analytics/counts-page-views
  - /docs/rest-api/web-analytics/counts-custom-events
summary: Learn how Web Analytics concepts map to API queries for custom reports, dashboards, and insights.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/analytics/web-analytics-api.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "3fe17b92f20a3d8ea41ad6dde17033107e31b603f08c79a3124d269723da04f1"
---

# Query Web Analytics with the API

Use the Web Analytics API to query page views, visitors, and custom events from your Vercel projects. The API uses the same aggregated data model as the dashboard, so you can build reports, embed metrics, or combine Web Analytics with your own business data.

## Prerequisites

Before querying Web Analytics from the API:

- [Enable Web Analytics](/docs/analytics/quickstart#enable-web-analytics-in-vercel) for the project you want to query.
- Create a Vercel access token. See [REST API authentication](https://vercel.com/docs/rest-api#authentication).
- Find the `projectId` for the project.
- For team projects, find the team's `teamId` or `slug` and include one in each request. For projects owned by your personal account, omit `teamId` and `slug`.

The examples on this page use `$VERCEL_TOKEN`, `prj_1234567890`, and `team_1234567890` as placeholder values. Replace them with your access token, project ID, and team ID. If you prefer a team slug, replace `teamId=team_1234567890` with `slug=your_team_slug_here`.

For complete endpoint parameters and response fields, see the [Web Analytics REST API reference](/docs/rest-api/web-analytics/aggregates-page-views).

## How Web Analytics maps to API queries

Web Analytics API queries start with a dataset. Choose the dataset that matches the type of activity you want to analyze:

| Dataset | What it represents | Metrics | Use for |
| --- | --- | --- | --- |
| Visits | Automatically tracked page views | `pageviews` and `visitors` | Traffic reports, content performance, referrer analysis, and route popularity |
| Events | Custom events sent with [`track()`](/docs/analytics/custom-events) | `count` and `visitors` | Funnels, conversion events, feature adoption, and custom interaction reports |

Each dataset supports two query styles:

| Query style | Endpoints | Use when |
| --- | --- | --- |
| Count | [`visits/count`](/docs/rest-api/web-analytics/counts-page-views), [`events/count`](/docs/rest-api/web-analytics/counts-custom-events) | You need one total, such as the lifetime page views for a blog post or total signups for an event. Count endpoints query production data. |
| Aggregate | [`visits/aggregate`](/docs/rest-api/web-analytics/aggregates-page-views), [`events/aggregate`](/docs/rest-api/web-analytics/aggregates-custom-events) | You need rows grouped by time or dimension, such as daily page views, top countries, or signups by plan. Aggregate endpoints query data within your plan's [reporting window](/docs/analytics/limits-and-pricing#what-is-the-reporting-window). |

## Dimensions, filters, and groups

Dimensions describe the properties you can group or filter by. Common visit dimensions include `requestPath`, `route`, `country`, `referrerHostname`, `deviceType`, `browserName`, and UTM parameters.

Use `requestPath` when you want the exact URL path without query parameters, such as `/blog/my-post`. Use `route` when you want the framework route pattern, such as `/blog/[slug]`, so traffic from many matching URLs rolls up into one row.

Use `by` to group results and `filter` to narrow the dataset before the query runs. Filters use OData syntax, so quote string values and URL-encode the full expression in your request. For example:

```text
requestPath eq '/pricing' and country eq 'US'
```

In a `curl --get` request, pass the same expression with `--data-urlencode`:

```bash
--data-urlencode "filter=requestPath eq '/pricing' and country eq 'US'"
```

You can also query structured dimensions:

- Use `flags/<name>` to group or filter events annotated with a feature flag value.
- Use `eventData/<property>` to group or filter custom events by data sent with `track()`.

If a flag name or event data property contains characters other than letters, digits, and underscores, wrap it in single quotes. For example, use `flags/'beta-banner'` or `eventData/'signup-source'`.

When a grouped query has more distinct values than the requested `limit`, Web Analytics groups the remaining values into `Others`. This keeps top-value reports bounded while still preserving the total count represented by the query.

## Query patterns

Most Web Analytics API queries follow the same pattern: choose the dataset, choose a count or aggregate endpoint, then combine a filter with one or two grouping dimensions.

| Question | Query model |
| --- | --- |
| How many visitors saw a specific page? | Use `visits/count` with a `requestPath` filter. |
| Which routes drove the most page views this week? | Use `visits/aggregate` grouped by `route` for the selected date range. |
| How did traffic to a launch page change each day? | Use `visits/aggregate` grouped by `day` and filtered by `requestPath`. |
| Which countries sent visitors to a page? | Use `visits/aggregate` grouped by `country` and filtered by `requestPath`. |
| Which plan generated the most signups? | Use `events/aggregate` filtered by `eventName` and grouped by `eventData/plan`. |
| Which flag variant received the most traffic? | Use `visits/aggregate` or `events/aggregate` grouped by `flags/<name>`. |

## Count visitors for a page

Use a count query when you need one total for a page, such as a public view counter or an internal content scorecard.

```bash filename="cURL"
curl --get "https://api.vercel.com/v1/query/web-analytics/visits/count" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  --data-urlencode "teamId=team_1234567890" \
  --data-urlencode "projectId=prj_1234567890" \
  --data-urlencode "filter=requestPath eq '/blog/my-post'"
```

The response contains the total `pageviews` and `visitors` that match the filter.

```json filename="Response"
{
  "version": 1,
  "query": {
    "filter": "requestPath eq '/blog/my-post'"
  },
  "data": {
    "pageviews": 1250,
    "visitors": 980
  }
}
```

## Build a daily traffic trend

Use an aggregate query with a time dimension when you need a chart or report over time. This example queries daily traffic for one page.

```bash filename="cURL"
curl --get "https://api.vercel.com/v1/query/web-analytics/visits/aggregate" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  --data-urlencode "teamId=team_1234567890" \
  --data-urlencode "projectId=prj_1234567890" \
  --data-urlencode "since=2024-10-01" \
  --data-urlencode "until=2024-10-07" \
  --data-urlencode "by=day" \
  --data-urlencode "filter=requestPath eq '/blog/my-post'"
```

Each returned row represents one day in the requested range.

```json filename="Response"
{
  "version": 1,
  "query": {
    "since": "2024-10-01",
    "until": "2024-10-07",
    "groupBy": ["day"],
    "filter": "requestPath eq '/blog/my-post'"
  },
  "data": [
    {
      "timestamp": "2024-10-01T00:00:00.000Z",
      "pageviews": 220,
      "visitors": 180
    },
    {
      "timestamp": "2024-10-02T00:00:00.000Z",
      "pageviews": 245,
      "visitors": 201
    }
  ]
}
```

## Find top values inside a segment

Use a dimension group when you want the top values inside a filtered segment. This example finds the top countries for visitors to one page.

```bash filename="cURL"
curl --get "https://api.vercel.com/v1/query/web-analytics/visits/aggregate" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  --data-urlencode "teamId=team_1234567890" \
  --data-urlencode "projectId=prj_1234567890" \
  --data-urlencode "since=2024-10-01" \
  --data-urlencode "until=2024-10-07" \
  --data-urlencode "by=country" \
  --data-urlencode "limit=5" \
  --data-urlencode "filter=requestPath eq '/blog/my-post'"
```

Use the same pattern with dimensions such as `referrerHostname`, `deviceType`, `browserName`, or `utmCampaign`.

```json filename="Response"
{
  "version": 1,
  "query": {
    "since": "2024-10-01",
    "until": "2024-10-07",
    "groupBy": ["country"],
    "filter": "requestPath eq '/blog/my-post'",
    "limit": 5
  },
  "data": [
    {
      "country": "US",
      "pageviews": 640,
      "visitors": 510
    },
    {
      "country": "DE",
      "pageviews": 180,
      "visitors": 150
    }
  ]
}
```

## Analyze custom events by event data

Use custom event queries when you send business events with [`track()`](/docs/analytics/custom-events). This example counts `signup` events by plan.

```bash filename="cURL"
curl --get "https://api.vercel.com/v1/query/web-analytics/events/aggregate" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  --data-urlencode "teamId=team_1234567890" \
  --data-urlencode "projectId=prj_1234567890" \
  --data-urlencode "since=2024-10-01" \
  --data-urlencode "until=2024-10-07" \
  --data-urlencode "by=eventData/plan" \
  --data-urlencode "filter=eventName eq 'signup' and eventData/source eq 'pricing'"
```

This pattern works for any custom data property that you send with the event, such as `eventData/source`, `eventData/location`, or `eventData/product`.

```json filename="Response"
{
  "version": 1,
  "query": {
    "since": "2024-10-01",
    "until": "2024-10-07",
    "groupBy": ["eventData/plan"],
    "filter": "eventName eq 'signup' and eventData/source eq 'pricing'"
  },
  "data": [
    {
      "eventData": "pro",
      "count": 42,
      "visitors": 36
    },
    {
      "eventData": "enterprise",
      "count": 12,
      "visitors": 10
    }
  ]
}
```


---

[View full sitemap](/docs/sitemap)
