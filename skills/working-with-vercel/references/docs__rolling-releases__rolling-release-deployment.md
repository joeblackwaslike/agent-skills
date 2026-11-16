---
title: Performing a rolling release deployment
product: vercel
url: /docs/rolling-releases/rolling-release-deployment
canonical_url: "https://vercel.com/docs/rolling-releases/rolling-release-deployment"
last_updated: 2026-06-30
type: how-to
prerequisites:
  - /docs/rolling-releases
related:
  - /docs/cli/project-linking
  - /docs/project-configuration/project-settings
  - /docs/rolling-releases
  - /docs/cli/rolling-release
  - /docs/cli/deploy
summary: Gradually roll out a production deployment using traffic stages, monitoring, and automated abort.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/rolling-releases/rolling-release-deployment.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "4e47916eb90329a7cc26613128e6968ef1bce9e0c44c35628d0061aedbdd16e4"
---

# Performing a rolling release deployment

Use this guide to gradually roll out a new production deployment using rolling releases. You'll configure traffic stages, monitor for errors between stages, and either complete the rolling release or abort if problems arise.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to gradually roll out new versions of your backend](https://vercel.com/kb/guide/how-to-gradually-roll-out-new-versions-of-your-backend) — Incrementally release updates to your backend to minimize impact of mistakes.
- [Rolling Releases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases) — Vercel MCP tools for rolling releases.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Complete the rolling release for the project](https://vercel.com/docs/rest-api/rolling-release/complete-the-rolling-release-for-the-project) — POST /v1/projects/{idOrName}/rolling-release/complete — Force-complete a Rolling Release. The canary deployment will beg
- [Start a rolling release for the project](https://vercel.com/docs/rest-api/rolling-release/start-a-rolling-release-for-the-project) — POST /v1/projects/{idOrName}/rolling-release/start — Start a rolling release for a deployment. If a rolling release is a

Full cross-link map for this page: [/docs/rolling-releases/rolling-release-deployment.graph.md](/docs/rolling-releases/rolling-release-deployment.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This guide requires a [linked Vercel project](/docs/cli/project-linking). Run
> `vercel link` in your project directory if you haven't already. Rolling
> releases require a Pro or Enterprise plan.

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Use the steps below for context and checks.

```bash filename="terminal"
# 1. Configure rolling release stages
vercel rolling-release update --cfg '{"enabled":true,"advancementType":"automatic","stages":[{"targetPercentage":10,"duration":5},{"targetPercentage":50,"duration":10},{"targetPercentage":100}]}'

# 2. Deploy to production (starts the rolling release automatically if the project auto-assigns custom domains)
vercel deploy --prod

# 3. Start the rolling release (idempotent if step 2 already started it)
vercel rolling-release start --deployment <deployment-url>

# 4. Monitor the release
vercel rolling-release inspect
vercel logs --environment production --query 'level:error' --since 5m

# 5. Advance to the next stage (if manual approval is configured)
vercel rolling-release approve --deployment <deployment-url> --currentStageIndex 0

# IF errors spike during the release (pass the previous production deployment, not the new one).
# The first command in step 4 lists that deployment as currentDeployment:
vercel rolling-release abort --deployment <previous-production-deployment-url>

# 6. Complete the release (100% traffic)
vercel rolling-release complete --deployment <deployment-url>
```

## 1. Configure rolling release stages

Set up the traffic stages for your rolling release. Each stage defines what percentage of traffic goes to the new deployment and how long to wait before advancing:

```bash filename="terminal"
vercel rolling-release update --cfg '{"enabled":true,"advancementType":"automatic","stages":[{"targetPercentage":10,"duration":5},{"targetPercentage":50,"duration":10},{"targetPercentage":100}]}'
```

This configuration sends 10% of traffic to the new deployment for five minutes, then 50% for 10 minutes, then 100%. Adjust the percentages and durations based on your traffic volume and risk tolerance.

To disable rolling releases later:

```bash filename="terminal"
vercel rolling-release update --no-enable
```

## 2. Deploy to production

Create a new production deployment. With rolling releases configured, the deployment won't immediately receive all traffic:

```bash filename="terminal"
vercel deploy --prod
```

Save the deployment URL from the output for use in the following steps.

## 3. Start the rolling release

Begin the rolling release to start shifting traffic to the new deployment:

```bash filename="terminal"
vercel rolling-release start --deployment <deployment-url>
```

This starts at the first stage (10% of traffic in the example configuration above). The start command is idempotent. If your project [auto-assigns custom domains](/docs/project-configuration/project-settings#custom-domains), the production deployment already started the rolling release, and this command returns its current state. See [Starting and completing via the API](/docs/rolling-releases#starting-and-completing-via-the-api).

To send 100% of traffic to the canary, run [`vercel rolling-release complete`](/docs/cli/rolling-release#complete). See [Starting and completing via the API](/docs/rolling-releases#starting-and-completing-via-the-api).

## 4. Monitor the release

Check the current stage, traffic split, and overall progress:

```bash filename="terminal"
vercel rolling-release inspect
```

While the rolling release is in progress, monitor production logs for errors coming from the new deployment:

```bash filename="terminal"
vercel logs --environment production --query 'level:error' --since 5m
```

To filter for specific error patterns:

```bash filename="terminal"
vercel logs --environment production --query 'level:error AND TypeError' --since 5m
```

Run these checks periodically between stage transitions. If your stages have automatic durations, the rolling release advances on its own. If you configured manual approval stages, you'll need to explicitly approve each one.

## 5. Advance to the next stage

If your configuration includes stages that require manual approval, advance to the next stage after confirming the current stage is healthy:

```bash filename="terminal"
vercel rolling-release approve --deployment <deployment-url> --currentStageIndex <stage-index>
```

The `--currentStageIndex` flag specifies which stage you're approving. Stage indexes start at 0.

## 6. Complete the rolling release

After all stages pass, complete the rolling release to send 100% of traffic to the new deployment:

```bash filename="terminal"
vercel rolling-release complete --deployment <deployment-url>
```

Verify that production is healthy after the full rolling release:

```bash filename="terminal"
vercel logs --environment production --query 'level:error' --since 5m
```

## When you need to abort

If you see a spike in errors during any stage, abort the rolling release immediately. Aborting reverts all traffic back to the previous production deployment, so the abort command takes that deployment, not the new deployment that you saved in step 2. To find it, check the progress of the rolling release again, as in step 4. The output lists the previous production deployment as `currentDeployment` and the new deployment as `canaryDeployment`. Copy the `url` of `currentDeployment` into the abort command:

```bash filename="terminal"
vercel rolling-release abort --deployment <previous-production-deployment-url>
```

After aborting, investigate the errors and fix them before attempting another rolling release:

```bash filename="terminal"
vercel logs --environment production --query 'level:error' --since 30m
```

## Related

- [vercel rolling-release](/docs/cli/rolling-release)
- [vercel deploy](/docs/cli/deploy)
- [vercel logs](/docs/cli/logs)
- [Rolling releases overview](/docs/rolling-releases)
- [Rolling back a production deployment](/docs/deployments/rollback-production-deployment)

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
