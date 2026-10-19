---
title: Logs
product: vercel
url: /docs/logs
canonical_url: "https://vercel.com/docs/logs"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/deployments/logs
  - /docs/logs/runtime
  - /docs/drains
  - /docs/activity-log
  - /docs/audit-log
summary: Use logs to find information on deployment builds, function executions, and more.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/logs.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "efcb33e6350defdd4e0d602d7a7cff1628822d103ee3f1b437f2758fdd8feab3"
---

# Logs

## Build logs

> **Availability**: Build Logs are available on all plans

When you deploy your website to Vercel, the platform generates build logs that show the deployment progress. The build logs contain information about:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Enhanced Logs to search, inspect, and share runtime logs](https://vercel.com/changelog/enhanced-logs-ui-to-search-inspect-and-share-application-logs)
- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [Vercel Function Logs](https://vercel.com/docs/functions/logs) — Use runtime logs to debug and monitor your Vercel Functions.
- [Get logs for a deployment](https://vercel.com/docs/rest-api/logs/get-logs-for-a-deployment) — GET /v1/projects/{projectId}/deployments/{deploymentId}/runtime-logs — Returns a stream of logs for a given deployment.
- [Drain Audit Logs to Datadog](https://vercel.com/docs/drains/audit-logs-to-datadog) — Learn how to forward Vercel Audit Log Drain events to Datadog using the Datadog Logs API.
- [Using Drains](https://vercel.com/docs/drains/using-drains) — Learn how to configure drains to forward observability data to custom HTTP endpoints, dedicated Audit Log destinations,
- [Retrieves a Configurable Log Drain \\(deprecated\\)](https://vercel.com/docs/rest-api/logdrains/retrieves-a-configurable-log-drain-deprecated) — GET /v1/log-drains/{id} — Retrieves a Configurable Log Drain. This endpoint must be called with a team AccessToken \\(int

Full cross-link map for this page: [/docs/logs.graph.md](/docs/logs.graph.md)
<!-- /docsgraph:related -->

- The version of the build tools
- Warnings or errors encountered during the build process
- Details about the files and dependencies that were installed, compiled, or built during the deployment

Learn more about [Build Logs](/docs/deployments/logs).

## Runtime logs

> **Availability**: Runtime Logs are available on all plans

Runtime logs allow you to search, inspect, and share your team's runtime logs at a project level. You can search runtime logs from the deployments section inside the Vercel dashboard. Retention depends on your plan and whether Observability Plus is enabled; see [Runtime Logs](/docs/logs/runtime#limits) for current limits. For longer log storage, you can use [Log Drains](/docs/drains).

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/observability/log-thumbnail-light.png?lightbox)

Learn more about [Runtime Logs](/docs/logs/runtime).

## Activity logs

Activity Logs provide chronologically organized events on your personal or team account. You get an overview of changes to your environment variables, deployments, and more.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/observability/Activity-Light.png)

Learn more about [Activity Logs](/docs/activity-log).

## Audit logs

> **Availability**: Audit Logs are available on Enterprise plans

Audit Logs allow owners to track events performed by other team members. The feature helps you verify who accessed what, for what reason, and at what time. You can export up to 90 days of audit logs to a CSV file.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/teams/audit-logs-section-light.png)

Learn more about [Audit Logs](/docs/audit-log).

## Log drains

> **Availability**: Drains are available on Enterprise and Pro plans

Log Drains allow you to export your log data, making it easier to debug and analyze. You can configure Log Drains through the Vercel dashboard or through one of our Log Drains integrations.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/logs/log-drains-light.png)

Learn more about [Log Drains](/docs/drains).


---

[View full sitemap](/docs/sitemap)
