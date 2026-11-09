---
title: Debugging production 500 errors
product: vercel
url: /docs/observability/debug-production-errors
canonical_url: "https://vercel.com/docs/observability/debug-production-errors"
last_updated: 2026-05-28
type: how-to
prerequisites:
  - /docs/observability
related:
  - /docs/logs/runtime
  - /docs/observability/observability-plus
  - /docs/cli/logs
  - /docs/cli/inspect
  - /docs/cli/curl
summary: Find, fix, and verify production 500 errors using the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/observability/debug-production-errors.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "a71b008838afa79628a80088ec347bd5b4ce4ac98bd73497b3d1742a7558cf11"
---

# Debugging production 500 errors

Use this guide to debug production 500 errors. You'll identify the problem, trace it to a root cause, and deploy a verified fix.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to determine which Vercel Deployment introduced an issue?](https://vercel.com/kb/guide/how-to-determine-which-vercel-deployment-introduced-an-issue) — Process to quickly determine when a deployment issue was introduced using the Vercel CLI
- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel) — Learn how to deploy based on tags/releases on Vercel.
- [Troubleshooting Build Error: "Build step did not complete within the maximum of 45 minutes"](https://vercel.com/kb/guide/troubleshooting-build-error-build-step-did-not-complete-within-45-minutes) — Learn common reasons Vercel builds hit the 45-minute limit and how to reduce build times so your deployments stay fast a
- [Rolling back a production deployment](https://vercel.com/docs/deployments/rollback-production-deployment) — Recover from a bad production deployment by rolling back, investigating the root cause, and redeploying a fix.
- [Debugging slow Vercel Functions](https://vercel.com/docs/functions/debug-slow-functions) — Diagnose and fix slow Vercel Functions using CLI tools, logs, and timing analysis.
- [Performing a rolling release deployment](https://vercel.com/docs/rolling-releases/rolling-release-deployment) — Gradually roll out a production deployment using traffic stages, monitoring, and automated abort.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Diagnosing and fixing cache issues](https://vercel.com/docs/caching/cdn-cache/debug-cache-issues) — Diagnose stale content and fix CDN cache, data cache, and build cache issues using the CLI.

Full cross-link map for this page: [/docs/observability/debug-production-errors.graph.md](/docs/observability/debug-production-errors.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This guide requires a linked Vercel project. Run `vercel link` in your
> project directory if you haven't already.

> **💡 Note:** How far back `vercel logs` can query depends on your plan. A runtime log
> window older than your [runtime log retention](/docs/logs/runtime#limits)
> fails with a retention error. A `vercel logs requests` window older than your
> plan's [Observability data
> retention](/docs/observability/observability-plus#limitations) fails with a
> 402 error that lists the qualifying entitlements. Use a later `--since`. To
> query older request records, enable Observability Plus or another listed
> entitlement.

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Use the steps below for context and checks.

```bash filename="terminal"
# 1. Find 500 errors in production
vercel logs requests --environment production --query 'httpStatus >= 500 AND httpStatus < 600' --since 1h

# 2. Get structured data to filter programmatically
vercel logs requests --environment production --query 'httpStatus:500' --json --since 1h \
  | jq 'select(.type == "request") | .data | {requestPath, requestId, timestamp}'

# Read the runtime error messages
vercel logs --environment production --query 'level:error' --since 1h

# 3. Narrow the time range once you know when errors started
vercel logs requests --environment production --query 'httpStatus:500' --since 2h --until 1h

# 4. Identify the failing deployment
vercel list --environment production
vercel inspect <deployment-url>
vercel inspect <deployment-url> --logs    # build logs

# 5. Correlate with source code
git log --oneline -10
git show <commit-sha> --stat

# 6. Fix locally, then deploy a preview
vercel deploy

# 7. Verify the fix against the preview
vercel curl /api/failing-route --deployment <preview-url>
vercel logs --deployment <preview-deployment-id> --query 'level:error'

# 8. Ship to production
vercel deploy --prod

# 9. Confirm the fix
vercel logs requests --environment production --query 'httpStatus:500' --since 5m

# IF you cannot identify the failing deployment from logs:
vercel bisect --good <good-deployment-url> --bad <bad-deployment-url> --path /api/failing-route

# IF errors are severe and you need to restore service before debugging:
vercel rollback <previous-deployment-url-or-id>
vercel rollback status
```

## 1. Find the 500 errors

Start by pulling production server errors from the last hour. HTTP status codes live on CDN request records, so use `vercel logs requests` and filter with a [`--query` expression](/docs/cli/logs#query). The `httpStatus >= 500 AND httpStatus < 600` query catches all server errors, not just 500s:

```bash filename="terminal"
vercel logs requests --environment production --query 'httpStatus >= 500 AND httpStatus < 600' --since 1h
```

If the output is noisy, narrow it down to a specific status code:

```bash filename="terminal"
vercel logs requests --environment production --query 'httpStatus:500' --since 1h
```

At this point, check whether the errors are concentrated on one route or spread across many.

## 2. Get structured log data

Switch to JSON output so you can filter and search programmatically. Pipe through `jq` to extract the fields you need:

```bash filename="terminal"
vercel logs requests --environment production --query 'httpStatus:500' --json --since 1h \
  | jq 'select(.type == "request") | .data | {requestPath, requestId, timestamp}'
```

Request records don't include log messages. To read the error messages, query runtime logs at the `error` level:

```bash filename="terminal"
vercel logs --environment production --query 'level:error' --since 1h
```

This query returns every runtime error in the window, not only the errors behind the 500s. To read the logs for one failing request, copy its `requestId` from the request records and run the `requestId` query in step 3.

If you spot a recurring error message, search for it directly:

```bash filename="terminal"
vercel logs --environment production --query 'Cannot read properties of undefined' --since 1h
```

The `vercel logs` command prints full runtime messages by default.

## 3. Narrow the time range

Once you identify when the errors started, use `--since` and `--until` to zoom into that window. This reduces noise and helps you spot the exact trigger:

```bash filename="terminal"
vercel logs requests --environment production --query 'httpStatus:500' --since 2h --until 1h
```

If you have a specific request ID from an error report or alert, pull the runtime logs for that request. The lookup uses the query's time window. When the request is older than 30 minutes, widen the window with `--since`:

```bash filename="terminal"
vercel logs --query 'requestId:"<request-id>"' --since 2h
```

## 4. Identify the failing deployment

Check which deployment is currently serving production traffic. If errors started recently, compare the current deployment against earlier ones:

```bash filename="terminal"
vercel list --environment production
```

To see full details about the current production deployment, including the git commit that triggered it:

```bash filename="terminal"
vercel inspect <deployment-url>
```

If you need the build logs to check for warnings or errors during the build:

```bash filename="terminal"
vercel inspect <deployment-url> --logs
```

## 5. Correlate with the source code

At this point, you know the failing route, the error message, and which deployment introduced the problem. Use the git commit from `vercel inspect` to find the relevant code change:

```bash filename="terminal"
git log --oneline -10
git show <commit-sha> --stat
```

Read the source code for the failing route and identify the bug. Common causes of 500 errors include:

- Unhandled null or undefined values from API responses
- Missing environment variables
- Database connection failures
- Type mismatches after a dependency update

## 6. Fix and deploy a preview

After making the fix locally, deploy a preview to test it without affecting production:

```bash filename="terminal"
vercel deploy
```

This outputs a preview URL. Save it for the next step.

## 7. Verify the fix

Test the specific route that was failing using `vercel curl`, which automatically handles deployment protection:

```bash filename="terminal"
vercel curl /api/failing-route --deployment <preview-url>
```

Check the response status and body. If you need timing details to confirm the fix didn't introduce latency:

```bash filename="terminal"
vercel httpstat /api/failing-route --deployment <preview-url>
```

Check the preview deployment's logs to confirm no new errors:

```bash filename="terminal"
vercel logs --deployment <preview-deployment-id> --query 'level:error'
```

## 8. Ship to production

Once the preview passes verification, deploy to production:

```bash filename="terminal"
vercel deploy --prod
```

## 9. Confirm the fix in production

After the production deployment completes, verify that the errors have stopped:

```bash filename="terminal"
vercel logs requests --environment production --query 'httpStatus:500' --since 5m
```

If no requests match, the fix is working.

## When you can't find the cause

If the error started between two deployments and you can't pinpoint the change, use `vercel bisect` to binary-search through your deployment history:

```bash filename="terminal"
vercel bisect --good <good-deployment-url> --bad <bad-deployment-url> --path /api/failing-route
```

This steps through deployments between the good and bad ones, letting you identify exactly which deployment introduced the regression.

## When you need to restore service immediately

If the errors are severe and you need to restore service while you investigate, roll back to a previous production deployment. Pass the URL or deployment ID you want to roll back to:

```bash filename="terminal"
vercel rollback <previous-deployment-url-or-id>
```

This points production traffic to the deployment you specify. You can then debug at your own pace and deploy the fix when it's ready.

To check the rollback status:

```bash filename="terminal"
vercel rollback status
```

## Related

- [vercel logs](/docs/cli/logs)
- [vercel inspect](/docs/cli/inspect)
- [vercel curl](/docs/cli/curl)
- [vercel bisect](/docs/cli/bisect)
- [vercel rollback](/docs/cli/rollback)
- [Observability](/docs/observability)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
