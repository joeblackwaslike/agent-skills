---
title: Performing a rolling release deployment
product: vercel
url: /docs/rolling-releases/rolling-release-deployment
canonical_url: "https://vercel.com/docs/rolling-releases/rolling-release-deployment"
last_updated: 2026-02-24
type: how-to
prerequisites:
  - /docs/rolling-releases
related:
  - /docs/cli/project-linking
  - /docs/cli/rolling-release
  - /docs/cli/deploy
  - /docs/cli/logs
  - /docs/rolling-releases
summary: Gradually roll out a production deployment using traffic stages, monitoring, and automated abort.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/rolling-releases/rolling-release-deployment.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "7a77815e280e626a976eb89b8f79a18d8137ce5b37e0745c850e6e29e4372c54"
---

# Performing a rolling release deployment

Use this guide to gradually roll out a new production deployment using rolling releases. You'll configure traffic stages, monitor for errors between stages, and either complete the rolling release or abort if problems arise.

> **💡 Note:** This guide requires a [linked Vercel project](/docs/cli/project-linking). Run
> `vercel link` in your project directory if you haven't already. Rolling
> releases require a Pro or Enterprise plan.

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Use the steps below for context and checks.

```bash filename="terminal"
# 1. Configure rolling release stages
vercel rolling-release configure --cfg '{"enabled":true,"advancementType":"automatic","stages":[{"targetPercentage":10,"duration":5},{"targetPercentage":50,"duration":10},{"targetPercentage":100}]}'

# 2. Deploy to production (triggers rolling release automatically)
vercel deploy --prod

# 3. Start the rolling release
vercel rolling-release start --dpl <deployment-url>

# 4. Monitor the release
vercel rolling-release fetch
vercel logs --environment production --level error --since 5m

# 5. Advance to the next stage (if manual approval is configured)
vercel rolling-release approve --dpl <deployment-url> --currentStageIndex 0

# IF errors spike during the release:
vercel rolling-release abort --dpl <deployment-url>

# 6. Complete the release (100% traffic)
vercel rolling-release complete --dpl <deployment-url>
```

## 1. Configure rolling release stages

Set up the traffic stages for your rolling release. Each stage defines what percentage of traffic goes to the new deployment and how long to wait before advancing:

```bash filename="terminal"
vercel rolling-release configure --cfg '{"enabled":true,"advancementType":"automatic","stages":[{"targetPercentage":10,"duration":5},{"targetPercentage":50,"duration":10},{"targetPercentage":100}]}'
```

This configuration sends 10% of traffic to the new deployment for five minutes, then 50% for 10 minutes, then 100%. Adjust the percentages and durations based on your traffic volume and risk tolerance.

To disable rolling releases later:

```bash filename="terminal"
vercel rolling-release configure --cfg 'disable'
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
vercel rolling-release start --dpl <deployment-url>
```

This starts at the first stage (10% of traffic in the example configuration above).

## 4. Monitor the release

Check the current stage, traffic split, and overall progress:

```bash filename="terminal"
vercel rolling-release fetch
```

While the rolling release is in progress, monitor production logs for errors coming from the new deployment:

```bash filename="terminal"
vercel logs --environment production --level error --since 5m
```

To filter for specific error patterns:

```bash filename="terminal"
vercel logs --environment production --level error --query "TypeError" --since 5m --expand
```

Run these checks periodically between stage transitions. If your stages have automatic durations, the rolling release advances on its own. If you configured manual approval stages, you'll need to explicitly approve each one.

## 5. Advance to the next stage

If your configuration includes stages that require manual approval, advance to the next stage after confirming the current stage is healthy:

```bash filename="terminal"
vercel rolling-release approve --dpl <deployment-url> --currentStageIndex <stage-index>
```

The `--currentStageIndex` flag specifies which stage you're approving. Stage indexes start at 0.

## 6. Complete the rolling release

After all stages pass, complete the rolling release to send 100% of traffic to the new deployment:

```bash filename="terminal"
vercel rolling-release complete --dpl <deployment-url>
```

Verify that production is healthy after the full rolling release:

```bash filename="terminal"
vercel logs --environment production --level error --since 5m
```

## When you need to abort

If you see a spike in errors during any stage, abort the rolling release immediately. This reverts all traffic back to the previous deployment:

```bash filename="terminal"
vercel rolling-release abort --dpl <deployment-url>
```

After aborting, investigate the errors and fix them before attempting another rolling release:

```bash filename="terminal"
vercel logs --environment production --level error --since 30m --expand
```

## Related

- [vercel rolling-release](/docs/cli/rolling-release)
- [vercel deploy](/docs/cli/deploy)
- [vercel logs](/docs/cli/logs)
- [Rolling releases overview](/docs/rolling-releases)
- [Rolling back a production deployment](/docs/deployments/rollback-production-deployment)


---

[View full sitemap](/docs/sitemap)
