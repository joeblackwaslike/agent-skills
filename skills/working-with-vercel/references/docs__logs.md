---
title: Logs
product: vercel
url: /docs/logs
canonical_url: "https://vercel.com/docs/logs"
last_updated: 2026-02-23
type: conceptual
prerequisites:
  []
related:
  - /docs/deployments/logs
  - /docs/drains
  - /docs/logs/runtime
  - /docs/observability/activity-log
  - /docs/observability/audit-log
summary: Use logs to find information on deployment builds, function executions, and more.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/logs.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "c2d307b8d7c70fa79c518c8307051ab59f1e36ba8ebcd1ccf1afb7a5f3c676ff"
---

# Logs

## Build logs

> **🔒 Permissions Required**: Build Logs

When you deploy your website to Vercel, the platform generates build logs that show the deployment progress. The build logs contain information about:

- The version of the build tools
- Warnings or errors encountered during the build process
- Details about the files and dependencies that were installed, compiled, or built during the deployment

Learn more about [Build Logs](/docs/deployments/logs).

## Runtime logs

> **🔒 Permissions Required**: Runtime Logs

Runtime logs allow you to search, inspect, and share your team's runtime logs at a project level. You can search runtime logs from the deployments section inside the Vercel dashboard. Your log data is retained for 3 days. For longer log storage, you can use [Log Drains](/docs/drains).

![Image](https://vercel.com/front/docs/observability/log-thumbnail-light.png?lightbox)

Learn more about [Runtime Logs](/docs/logs/runtime).

## Activity logs

Activity Logs provide chronologically organized events on your personal or team account. You get an overview of changes to your environment variables, deployments, and more.

![Image](`/docs-assets/static/docs/concepts/observability/Activity-Light.png`)

Learn more about [Activity Logs](/docs/observability/activity-log).

## Audit logs

> **🔒 Permissions Required**: Audit Logs

Audit Logs allow owners to track events performed by other team members. The feature helps you verify who accessed what, for what reason, and at what time. You can export up to 90 days of audit logs to a CSV file.

![Image](`/docs-assets/static/docs/concepts/teams/audit-logs-section-light.png`)

Learn more about [Audit Logs](/docs/observability/audit-log).

## Log drains

> **🔒 Permissions Required**: Drains

Log Drains allow you to export your log data, making it easier to debug and analyze. You can configure Log Drains through the Vercel dashboard or through one of our Log Drains integrations.

![Image](`/front/docs/logs/log-drains-light.png`)

Learn more about [Log Drains](/docs/drains).


---

[View full sitemap](/docs/sitemap)
