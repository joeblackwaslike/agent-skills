---
title: Deploying a project from the CLI
product: vercel
url: /docs/projects/deploy-from-cli
canonical_url: "https://vercel.com/docs/projects/deploy-from-cli"
last_updated: 2026-11-14
type: how-to
prerequisites:
  - /docs/projects
related:
  - /docs/cli/deploy
  - /docs/deployments/deploy-without-logging-in
  - /docs/deployments/environments
  - /docs/domains/set-up-custom-domain
  - /docs/cli/link
summary: Set up and deploy a Vercel project using the CLI, from linking to production.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/projects/deploy-from-cli.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "704a3df982f086e1bad489b7fae2d87f3176b9e5216b044a5d9a450bbcef2a1c"
---

# Deploying a project from the CLI

Use this guide to set up and deploy a Vercel project entirely from the CLI. You'll link your local project, pull environment variables, test locally, deploy a preview, and go live with a custom domain.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel) — Learn how to deploy based on tags/releases on Vercel.
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Rolling back a production deployment](https://vercel.com/docs/deployments/rollback-production-deployment) — Recover from a bad production deployment by rolling back, investigating the root cause, and redeploying a fix.
- [Environments](https://vercel.com/docs/deployments/environments) — Environments are for developing locally, testing changes in a pre-production environment, and serving end-users in produ

Full cross-link map for this page: [/docs/projects/deploy-from-cli.graph.md](/docs/projects/deploy-from-cli.graph.md)
<!-- /docsgraph:related -->

If you don't have a Vercel account or login yet, run [`vercel deploy --temporary`](/docs/cli/deploy#temporary) to get a live URL first, then claim the project to keep it. See [Deploying without logging in](/docs/deployments/deploy-without-logging-in).

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
vercel logs --deployment <preview-deployment-id> --query 'level:error'

# 6. Deploy to production
vercel deploy --prod

# 7. Add a custom domain (if needed; replace my-site with your project name)
vercel domains add example.com my-site
vercel domains verify example.com --project my-site
# Apply the recommended records at your DNS provider, then verify again
vercel domains verify example.com --project my-site

# 8. Confirm production is live
vercel curl / --deployment <production-url>
vercel logs --environment production --query 'level:error' --since 5m
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

> **💡 Note:** If you're using `vercel build`, use `vercel pull` instead. `vercel build`
> reads from the `.vercel/` directory rather than `.env` files. If you're using
> `vercel dev`, you don't need to pull. `vercel dev` downloads your Development
> environment variables automatically.

To list all configured environment variables without downloading them:

```bash filename="terminal"
vercel env list
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
vercel logs --deployment <preview-deployment-id> --query 'level:error'
```

## 6. Deploy to production

Once the preview looks good, deploy to production:

```bash filename="terminal"
vercel deploy --prod
```

This builds and deploys your project to the production environment, and the deployment gets assigned to your production domain automatically.

## 7. Add a custom domain

If you haven't configured a custom domain yet, add one. If you omit the project name, `vercel domains add` adds an apex domain to your team without assigning it to a project, and returns an error for a subdomain. To assign the domain to your project, pass the project name as the second argument:

```bash filename="terminal"
vercel domains add example.com my-site
```

To see all domains currently configured:

```bash filename="terminal"
vercel domains list
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
vercel logs --environment production --query 'level:error' --since 5m
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
