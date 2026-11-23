---
title: Promoting a preview deployment to production
product: vercel
url: /docs/deployments/promote-preview-to-production
canonical_url: "https://vercel.com/docs/deployments/promote-preview-to-production"
last_updated: 2026-05-28
type: how-to
prerequisites:
  - /docs/deployments
related:
  - /docs/cli/project-linking
  - /docs/environment-variables
  - /docs/deployments/rollback-production-deployment
  - /docs/cli/promote
  - /docs/cli/inspect
summary: Test a preview deployment and promote it to production using the CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/deployments/promote-preview-to-production.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "fffd0c1b50cd8632f6c6dca3dfc2795e18902310a562d764558c530e05281f03"
---

# Promoting a preview deployment to production

Use this guide to verify a preview deployment and promote it to production. You'll find the right deployment, test it, and promote it to serve production traffic.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Preview deployments for retail campaign review](https://vercel.com/kb/guide/preview-deployments-retail-campaign-review) — Use preview deployments so merchandising, brand, and engineering review a retail campaign on one live URL before launch.
- [Promoting Deployments](https://vercel.com/docs/deployments/promoting-a-deployment) — Learn how to promote deployments to production on Vercel.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Performing a rolling release deployment](https://vercel.com/docs/rolling-releases/rolling-release-deployment) — Gradually roll out a production deployment using traffic stages, monitoring, and automated abort.
- [Environments](https://vercel.com/docs/deployments/environments) — Environments are for developing locally, testing changes in a pre-production environment, and serving end-users in produ

Full cross-link map for this page: [/docs/deployments/promote-preview-to-production.graph.md](/docs/deployments/promote-preview-to-production.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This guide requires a [linked Vercel project](/docs/cli/project-linking). Run
> `vercel link` in your project directory if you haven't already.

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Use the steps below for context and checks.

```bash filename="terminal"
# 1. Find preview deployments
vercel list --status READY

# 2. Inspect the target deployment
vercel inspect <deployment-url>

# 3. Test the preview deployment
vercel curl /api/health --deployment <deployment-url>
vercel httpstat / --deployment <deployment-url>

# 4. Check for errors
vercel logs --deployment <deployment-url> --query 'level:error' --limit 50

# 5. Promote to production (--yes skips confirmation prompt)
vercel promote <deployment-url> --yes
vercel list --environment production

# 6. Verify production
vercel logs --environment production --query 'level:error' --since 5m
vercel httpstat /
```

## 1. Find the preview deployment

List recent deployments that have finished building and are ready to serve traffic:

```bash filename="terminal"
vercel list --status READY
```

This shows all READY deployments with their age, URL, environment, build duration, and creator. Find the preview deployment you want to promote.

To filter by a specific environment:

```bash filename="terminal"
vercel list --environment preview
```

## 2. Inspect the deployment

Confirm that the deployment built successfully and check its metadata:

```bash filename="terminal"
vercel inspect <deployment-url>
```

This shows the deployment ID, target environment, status, URL, creation time, and build duration. Verify that it is the deployment you expect to promote.

To check the build logs for any warnings:

```bash filename="terminal"
vercel inspect <deployment-url> --logs
```

## 3. Test the preview deployment

Use `vercel curl` to send requests to the preview deployment. This automatically handles deployment protection, so you can test protected preview deployments:

```bash filename="terminal"
vercel curl /api/health --deployment <deployment-url>
```

Check the response status and body. For critical routes, test multiple endpoints:

```bash filename="terminal"
vercel curl / --deployment <deployment-url>
vercel curl /api/users --deployment <deployment-url>
```

To check response timing and verify there are no performance regressions:

```bash filename="terminal"
vercel httpstat / --deployment <deployment-url>
```

## 4. Check for errors

Review the deployment's logs for any errors that occurred during testing or from other traffic:

```bash filename="terminal"
vercel logs --deployment <deployment-url> --query 'level:error' --limit 50
```

The `vercel logs` command prints full error messages and stack traces by default.

If the output is clean, the deployment is safe to promote.

## 5. Promote to production

Promote the preview deployment to production. This triggers a new production build using the same source code:

```bash filename="terminal"
vercel promote <deployment-url>
```

> **💡 Note:** Promoting a preview deployment to production triggers a complete rebuild with
> production [environment variables](/docs/environment-variables). If you have
> different variables set for preview and production, the production values will
> be used in the new build.

For non-interactive environments (CI/CD or automation), add `--yes` to skip the confirmation prompt:

```bash filename="terminal"
vercel promote <deployment-url> --yes
```

Check the status of the new production deployment:

```bash filename="terminal"
vercel list --environment production
```

The new production deployment is the first row in the list. Wait until its status is Ready.

When you promote a preview deployment, the CLI creates the new production deployment and exits. It does not wait for the build to complete. The `--timeout` option applies only when you promote a deployment that was built for the production environment. In that case, the CLI waits up to three minutes by default for the promotion to complete. To change the timeout:

```bash filename="terminal"
vercel promote <deployment-url> --timeout 5m
```

## 6. Verify production

After the promotion completes, confirm that production is serving traffic correctly:

```bash filename="terminal"
vercel logs --environment production --query 'level:error' --since 5m
```

Check that the production domain responds with the expected content:

```bash filename="terminal"
vercel httpstat /
```

## When the promotion causes issues

If you discover a problem after promoting, roll back by pointing production at a previous deployment:

```bash filename="terminal"
vercel rollback <previous-deployment-url-or-id>
```

This restores the deployment you specify. See [Rolling back a production deployment](/docs/deployments/rollback-production-deployment) for a full recovery workflow.

## Related

- [vercel promote](/docs/cli/promote)
- [vercel inspect](/docs/cli/inspect)
- [vercel curl](/docs/cli/curl)
- [vercel logs](/docs/cli/logs)
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
