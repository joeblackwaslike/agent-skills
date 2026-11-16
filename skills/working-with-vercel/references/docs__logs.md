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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/logs.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e982cdf6d448b070214ab7c8827960850e8f003aa1984c10445b0218cbfdf512"
---

# Logs

## Build logs

> Build Logs are available on all plans
>
> Those with the owner, member, developer role can access this feature

When you deploy your website to Vercel, the platform generates build logs that show the deployment progress. The build logs contain information about:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Enhanced Logs to search, inspect, and share runtime logs](https://vercel.com/changelog/enhanced-logs-ui-to-search-inspect-and-share-application-logs)
- [Vercel Function Logs](https://vercel.com/docs/functions/logs) — Use runtime logs to debug and monitor your Vercel Functions.
- [Get logs for a deployment](https://vercel.com/docs/rest-api/logs/get-logs-for-a-deployment) — GET /v1/projects/{projectId}/deployments/{deploymentId}/runtime-logs — Returns a stream of logs for a given deployment.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.
- [get_runtime_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs) — Use get_runtime_logs with Vercel MCP.
- [Retrieves a list of Integration log drains \\(deprecated\\)](https://vercel.com/docs/rest-api/logdrains/retrieves-a-list-of-integration-log-drains-deprecated) — GET /v2/integrations/log-drains — Retrieves a list of all Integration log drains that are defined for the authenticated

Full cross-link map for this page: [/docs/logs.graph.md](/docs/logs.graph.md)
<!-- /docsgraph:related -->

- The version of the build tools
- Warnings or errors encountered during the build process
- Details about the files and dependencies that were installed, compiled, or built during the deployment

Learn more about [Build Logs](/docs/deployments/logs).

## Runtime logs

> Runtime Logs are available on all plans

Runtime logs allow you to search, inspect, and share your team's runtime logs at a project level. You can search runtime logs from the deployments section inside the Vercel dashboard. Retention depends on your plan and whether Observability Plus is enabled; see [Runtime Logs](/docs/logs/runtime#limits) for current limits. For longer log storage, you can use [Log Drains](/docs/drains).

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/observability/log-thumbnail-light.png?lightbox)

Learn more about [Runtime Logs](/docs/logs/runtime).

## Activity logs

Activity Logs provide chronologically organized events on your personal or team account. You get an overview of changes to your environment variables, deployments, and more.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/observability/Activity-Light.png)

Learn more about [Activity Logs](/docs/activity-log).

## Audit logs

> Audit Logs are available on Enterprise plans
>
> Those with the owner and security roles can access this feature

Audit Logs allow owners to track events performed by other team members. The feature helps you verify who accessed what, for what reason, and at what time. You can export up to 90 days of audit logs to a CSV file.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/teams/audit-logs-section-light.png)

Learn more about [Audit Logs](/docs/audit-log).

## Log drains

> Drains are available on Enterprise and Pro plans

Log Drains allow you to export your log data, making it easier to debug and analyze. You can configure Log Drains through the Vercel dashboard or through one of our Log Drains integrations.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/logs/log-drains-light.png)

Learn more about [Log Drains](/docs/drains).

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
