---
title: Deploying a project from the CLI
product: vercel
url: /docs/projects/deploy-from-cli
canonical_url: "https://vercel.com/docs/projects/deploy-from-cli"
last_updated: 2026-09-11
type: how-to
prerequisites:
  - /docs/projects
related:
  - /docs/deployments/environments
  - /docs/domains/set-up-custom-domain
  - /docs/cli/link
  - /docs/cli/env
  - /docs/cli/deploy
summary: Set up and deploy a Vercel project using the CLI, from linking to production.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/projects/deploy-from-cli.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "302c68a1f1488f31ac75dfd24fc617d50c1e23cd0d36173812928b24b7e7ebb6"
---

# Deploying a project from the CLI

Use this guide to set up and deploy a Vercel project entirely from the CLI. You'll link your local project, pull environment variables, test locally, deploy a preview, and go live with a custom domain.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel) — Learn how to deploy based on tags/releases on Vercel.
- [How can I use CircleCI with Vercel?](https://vercel.com/kb/guide/how-can-i-use-circleci-with-vercel) — Learn how to use CircleCI to deploy to Vercel with custom CI/CD.
- [How can I use the Vercel CLI for custom workflows?](https://vercel.com/kb/guide/using-vercel-cli-for-custom-workflows) — You can use the Vercel CLI to deploy any application, including custom git providers and restricted source code.
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Promoting a preview deployment to production](https://vercel.com/docs/deployments/promote-preview-to-production) — Test a preview deployment and promote it to production using the CLI.
- [Performing a rolling release deployment](https://vercel.com/docs/rolling-releases/rolling-release-deployment) — Gradually roll out a production deployment using traffic stages, monitoring, and automated abort.

Full cross-link map for this page: [/docs/projects/deploy-from-cli.graph.md](/docs/projects/deploy-from-cli.graph.md)
<!-- /docsgraph:related -->

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Use the steps below for context and checks.

```bash filename="terminal"
# 1. Link your local directory to a Vercel project
vercel link

# 2. Pull environment variables for local development
vercel env pull .env.local

# 3. Develop locally (use your framework's dev command, or vercel dev)
vercel env run -- npm run dev

# 4. Deploy a preview
vercel deploy

# 5. Verify the preview
vercel curl / --deployment <preview-url>
vercel logs --deployment <preview-deployment-id> --level error

# 6. Deploy to production
vercel deploy --prod

# 7. Add a custom domain (if needed; one arg when run from the linked project)
vercel domains add example.com
# Replace my-site with your project name
vercel domains verify example.com --project my-site
# Apply the recommended records at your DNS provider, then verify again
vercel domains verify example.com --project my-site

# 8. Confirm production is live
vercel curl / --deployment <production-url>
vercel logs --environment production --level error --since 5m
```

> Install the [Vercel plugin](/docs/agent-resources/vercel-plugin?from=docs-callout\&source_path=%2Fdocs%2Fprojects%2Fdeploy-from-cli) to run this deployment workflow with your coding agent.
>
> ```bash
> npx plugins add vercel/vercel-plugin
> ```

## 1. Link your project

Connect your local directory to an existing Vercel project. If the project doesn't exist yet on Vercel, this command creates it:

```bash filename="terminal"
vercel link
```

This creates a `.vercel` directory in your project with the project and org configuration. The command is interactive and will prompt you to select your team and project.

For CI/CD or non-interactive environments, use the `--yes` flag:

```bash filename="terminal"
vercel link --yes
```

## 2. Pull environment variables

Download your project's environment variables so you can use them during local development:

```bash filename="terminal"
vercel env pull .env.local
```

This writes development environment variables to `.env.local`. If you need environment variables for a different target:

```bash filename="terminal"
vercel env pull --environment=preview
```

> **💡 Note:** If you're using `vercel dev` or `vercel build`, use `vercel pull` instead.
> These commands read from the `.vercel/` directory rather than `.env` files.

To list all configured environment variables without downloading them:

```bash filename="terminal"
vercel env ls
```

## 3. Develop locally

Start your local development server. If your framework has its own dev command (like `next dev` or `vite dev`), use that directly since it provides native support for your framework's features.

If you need to test Vercel-specific features like Vercel Functions or Middleware locally:

```bash filename="terminal"
vercel dev
```

You can also run your framework's dev command with Vercel environment variables injected:

```bash filename="terminal"
vercel env run -- npm run dev
```

This fetches environment variables from your linked project and passes them to your dev command without writing them to a file.

## 4. Deploy a preview

When you're ready to test your changes in a production-like environment, create a preview deployment:

```bash filename="terminal"
vercel deploy
```

This outputs a deployment URL. For an existing project that already has a production deployment, this creates a preview deployment and uses your preview environment variables.

> **💡 Note:** If this is the [first
> deployment](/docs/deployments/environments#first-deployment) of a new project,
> Vercel creates a production deployment even without `--prod`. After that,
> `vercel deploy` creates preview deployments.

If you want to see the build logs while deploying:

```bash filename="terminal"
vercel deploy --logs
```

## 5. Verify the preview

Test the preview deployment to make sure everything works. Use `vercel curl` to hit specific routes through deployment protection:

```bash filename="terminal"
vercel curl / --deployment <preview-url>
```

Check for errors in the preview deployment's logs:

```bash filename="terminal"
vercel logs --deployment <preview-deployment-id> --level error
```

## 6. Deploy to production

Once the preview looks good, deploy to production:

```bash filename="terminal"
vercel deploy --prod
```

This builds and deploys your project to the production environment, and the deployment gets assigned to your production domain automatically.

## 7. Add a custom domain

If you haven't configured a custom domain yet, add one. From a linked project, `vercel domains add` takes a single argument (the domain). Pass a project name as a second argument only when running outside of a linked directory:

```bash filename="terminal"
vercel domains add example.com
```

To see all domains currently configured:

```bash filename="terminal"
vercel domains ls
```

After adding a domain, check its DNS configuration and any recommended changes. Replace `my-site` with your project name to get project-scoped DNS recommendations:

```bash filename="terminal"
vercel domains verify example.com --project my-site
```

Apply the recommended records at your DNS provider, then run verification again. You can also find the exact values in your project's **Settings** → **Domains**. For the full procedure, see [Setting up a custom domain](/docs/domains/set-up-custom-domain). Vercel automatically provisions an SSL certificate after DNS verification succeeds.

## 8. Confirm production is live

Verify your production deployment is serving traffic correctly:

```bash filename="terminal"
vercel curl / --deployment <production-url>
```

Check production logs for any unexpected errors:

```bash filename="terminal"
vercel logs --environment production --level error --since 5m
```

## Ongoing workflow

After the initial setup, your day-to-day workflow simplifies to:

1. Make changes locally
2. Deploy a preview: `vercel deploy`
3. Verify the preview
4. Ship to production: `vercel deploy --prod`

If you connect a Git repository, Vercel also creates preview deployments automatically for every push and pull request.

## Related

- [vercel link](/docs/cli/link)
- [vercel env](/docs/cli/env)
- [vercel deploy](/docs/cli/deploy)
- [vercel domains](/docs/cli/domains)
- [Vercel CLI overview](/docs/cli)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
