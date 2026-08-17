---
title: Accessing Build Logs
product: vercel
url: /docs/deployments/logs
canonical_url: "https://vercel.com/docs/deployments/logs"
last_updated: 2026-06-03
type: how-to
prerequisites:
  - /docs/deployments
related:
  - /docs/deployments
  - /docs/builds/configure-a-build
  - /docs/environment-variables/sensitive-environment-variables
  - /docs/activity-log
  - /docs/rbac/managing-team-members
summary: "Learn how to use Vercel's build logs to monitor the progress of building or running your deployment, and check for possible errors or build failures."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployments/logs.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "df9d27f175483e11c31faa8466254202508e7117316c1c5269a8303378a25f34"
---

# Accessing Build Logs

When you deploy your website to Vercel, the platform generates build logs that show the deployment progress. The build logs contain information about:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I resolve a 'module not found' error?](https://vercel.com/kb/guide/how-do-i-resolve-a-module-not-found-error?from=related) — Information on resolving a 'module not found' error.
- [How to debug 404 errors](https://vercel.com/kb/guide/how-to-debug-404-errors?from=related) — Learn the systematic steps to identify and resolve 404 issues.
- [Logs](https://vercel.com/docs/logs?from=related) — Use logs to find information on deployment builds, function executions, and more.
- [Builds](https://vercel.com/docs/builds?from=related) — Understand how the build step works when creating a Vercel Deployment.
- [Troubleshoot Build Errors](https://vercel.com/docs/deployments/troubleshoot-a-build?from=related) — Learn how to resolve common scenarios you may encounter during the Build step, including build errors that cancel a depl
- [Get logs for a deployment](https://vercel.com/docs/rest-api/logs/get-logs-for-a-deployment?from=related)
- [Build Features](https://vercel.com/docs/builds/build-features?from=related) — Learn how to customize your deployments using Vercel's build features.

Full cross-link map for this page: [/docs/deployments/logs.graph.md](/docs/deployments/logs.graph.md)
<!-- /docsgraph:related -->

- The version of the build tools
- Warnings or errors encountered during the build process
- Details about the files and dependencies that were installed, compiled, or built during the deployment

Build logs are particularly useful for debugging issues that may arise during deployment. If a deployment fails, these can help you identify the root cause of the issue.

To access build logs, click the **Build Logs** button from the production deployment tile in the projects overview page.

![Image](`/docs-assets/static/docs/concepts/deployments/logs/buttons-light.png`)

## How build logs work?

Build logs are generated at build time for all [Deployments](/docs/deployments). The logs are similar to your framework's [Build Command](/docs/builds/configure-a-build#build-command) output, with a few minor additions from the Vercel build system. Once a build is complete, no new logs will be recorded.

In addition to the list of build actions, you can also find errors or warnings. These are highlighted with different colors, such as yellow for warnings and red for errors. This color coding makes it flexible to investigate why your build failed and which part of your website is affected. Build logs are stored indefinitely for each deployment.

If a [sensitive environment variable](/docs/environment-variables/sensitive-environment-variables) value is 32 characters or longer and appears in build logs, Vercel replaces the value with `[REDACTED]`. Vercel always redacts the `VERCEL_AUTOMATION_BYPASS_SECRET` and `VERCEL_OIDC_TOKEN` system environment variables from build logs, regardless of value length. When Vercel redacts a sensitive environment variable value, Vercel records an [Activity Log](/docs/activity-log) event for each masked environment variable key.

> **💡 Note:** Build logs will automatically be truncated, if the total size reaches over
> 4MB.

### Link to build logs

If you click on the timestamp to the left of the log entry, you get a link to that log entry. This will highlight the selected log and append the line number to the URL as an anchor (`#L6`). You can then share this link with other team members to point them to a specific line in the log.

You can select multiple lines by holding the `Shift` key and clicking the timestamps. This will create a link for the content between the first and last lines (`#L6-L9`).

The log link is only accessible to [team members](/docs/rbac/managing-team-members). Anyone who is not a member or has a valid Vercel account cannot access this link.

![Image](`/docs-assets/static/docs/concepts/deployments/logs/log-link-light.png`)

> **💡 Note:** The link to build logs feature works for logs that are up to 2000 lines long.

## Save logs

You can use [Drains](/docs/drains) to export, store, and analyze your build logs. Log Drains configuration can be accessed through the Vercel dashboard or through one of our [Logging integrations](/integrations#logging).


---

[View full sitemap](/docs/sitemap)
