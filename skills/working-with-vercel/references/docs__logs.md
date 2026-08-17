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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "2e90b0b57a84099e5529290a1f2a5b4a4a3b543e64c9ff9d2a3dd6a86c73f447"
---

# Logs

## Build logs


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I store logs on Vercel?](https://vercel.com/kb/guide/how-do-i-store-logs-on-vercel?from=related) — Learn how to store logs on Vercel.
- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions?from=related) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [Logs](https://vercel.com/docs/functions/logs?from=related) — Use runtime logs to debug and monitor your Vercel Functions.
- [vercel logs](https://vercel.com/docs/cli/logs?from=related) — View and filter request logs for your Vercel project, or stream live runtime logs from a deployment.
- [Get logs for a deployment](https://vercel.com/docs/rest-api/logs/get-logs-for-a-deployment?from=related)
- [Drain Audit Logs to Datadog](https://vercel.com/docs/drains/audit-logs-to-datadog?from=related) — Learn how to forward Vercel Audit Log Drain events to Datadog using the Datadog Logs API.
- [Logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs?from=related) — Search, filter, and follow individual AI Gateway requests, inspect provider routing for one request, and export the resu

Full cross-link map for this page: [/docs/logs.graph.md](/docs/logs.graph.md)
<!-- /docsgraph:related -->

> **🔒 Permissions Required**: Build Logs

When you deploy your website to Vercel, the platform generates build logs that show the deployment progress. The build logs contain information about:

- The version of the build tools
- Warnings or errors encountered during the build process
- Details about the files and dependencies that were installed, compiled, or built during the deployment

Learn more about [Build Logs](/docs/deployments/logs).

## Runtime logs

> **🔒 Permissions Required**: Runtime Logs

Runtime logs allow you to search, inspect, and share your team's runtime logs at a project level. You can search runtime logs from the deployments section inside the Vercel dashboard. Retention depends on your plan and whether Observability Plus is enabled; see [Runtime Logs](/docs/logs/runtime#limits) for current limits. For longer log storage, you can use [Log Drains](/docs/drains).

![Image](https://vercel.com/front/docs/observability/log-thumbnail-light.png?lightbox)

Learn more about [Runtime Logs](/docs/logs/runtime).

## Activity logs

Activity Logs provide chronologically organized events on your personal or team account. You get an overview of changes to your environment variables, deployments, and more.

![Image](`/docs-assets/static/docs/concepts/observability/Activity-Light.png`)

Learn more about [Activity Logs](/docs/activity-log).

## Audit logs

> **🔒 Permissions Required**: Audit Logs

Audit Logs allow owners to track events performed by other team members. The feature helps you verify who accessed what, for what reason, and at what time. You can export up to 90 days of audit logs to a CSV file.

![Image](`/docs-assets/static/docs/concepts/teams/audit-logs-section-light.png`)

Learn more about [Audit Logs](/docs/audit-log).

## Log drains

> **🔒 Permissions Required**: Drains

Log Drains allow you to export your log data, making it easier to debug and analyze. You can configure Log Drains through the Vercel dashboard or through one of our Log Drains integrations.

![Image](`/front/docs/logs/log-drains-light.png`)

Learn more about [Log Drains](/docs/drains).


---

[View full sitemap](/docs/sitemap)
