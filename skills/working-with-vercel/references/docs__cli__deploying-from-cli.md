---
title: Deploying Projects from Vercel CLI
product: vercel
url: /docs/cli/deploying-from-cli
canonical_url: "https://vercel.com/docs/cli/deploying-from-cli"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/deploy
  - /docs/deployments/environments
  - /docs/deployments/claim-deployments
  - /docs/cli/promote
  - /docs/cli/pull
summary: Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/deploying-from-cli.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "e3227857b8441c3195a10acdb8618ef209f2a6cd8d743c567f194e3a611c78c0"
---

# Deploying Projects from Vercel CLI

## Deploying from source

The `vercel` command is used to [deploy](/docs/cli/deploy) Vercel Projects and can be used from either the root of the Vercel Project directory or by providing a path.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Claim Deployments now available for fast and secure deployment transfers](https://vercel.com/changelog/claim-deployments)
- [Migrate from Render to Vercel](https://vercel.com/kb/guide/migrate-render-to-vercel) — Migrate from Render to Vercel: map web services, cron jobs, and containers to their equivalents, and handle what doesn't
- [How to set up a staging environment on Vercel](https://vercel.com/kb/guide/set-up-a-staging-environment-on-vercel) — Set up a staging environment on Vercel with custom environments, staged production deployments, or a branch-based previe
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [How to ship a Koa app on Vercel](https://vercel.com/kb/guide/ship-a-koa-app-on-vercel) — Deploy a Koa app to Vercel with zero configuration. Learn how to ship from the Vercel CLI or Git, and configure response
- [How to ship a NestJS app on Vercel](https://vercel.com/kb/guide/ship-a-nestjs-app-on-vercel) — Deploy a NestJS app to Vercel with zero configuration. Learn how to ship from a template, the Nest CLI, or Git, and conf
- [Enhanced Preview experience](https://vercel.com/blog/making-live-reviews-a-reality-enhanced-preview-experience)
- [Zero Config Deployments](https://vercel.com/blog/zero-config)
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Deploying to Vercel Without Logging In](https://vercel.com/docs/deployments/deploy-without-logging-in) — Deploy to Vercel without an account using Vercel Drop or the CLI, then claim the project to keep it.
- [vercel redeploy](https://vercel.com/docs/cli/redeploy) — Learn how to redeploy your project using the vercel redeploy CLI command.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.

Full cross-link map for this page: [/docs/cli/deploying-from-cli.graph.md](/docs/cli/deploying-from-cli.graph.md)
<!-- /docsgraph:related -->

```bash filename="terminal"
vercel
```

*Deploys the current Vercel project, when run from the Vercel Project root.*

You can alternatively use the [`vercel deploy` command](/docs/cli/deploy) for the same effect, if you want to be more explicit.

```bash filename="terminal"
vercel [path-to-project]
```

*Deploys the Vercel project found at the provided path, when it's a Vercel
Project root.*

When deploying, stdout is always the Deployment URL.

```bash filename="terminal"
vercel > deployment-url.txt
```

*Writes the Deployment URL output from the \`deploy\`
command to a text file.*

> **💡 Note:** The [first deployment](/docs/deployments/environments#first-deployment) of a
> new project is always a production deployment, even when you run `vercel`
> without `--prod`. Later deployments without `--prod` create preview
> deployments.

### Relevant commands

- [deploy](/docs/cli/deploy)

## Deploying without logging in

The `--temporary` flag creates a temporary deployment without logging in. It applies only when Vercel CLI has no credentials. If you're already logged in, `vercel deploy` creates a normal deployment instead. The CLI builds the project locally and deploys it to production.

```bash filename="terminal"
vercel deploy --temporary
```

*Build the project locally and deploy it as a temporary deployment, without
authentication.*

After deploying, Vercel CLI prints a claim URL and how long until the deployment expires. [Claim](/docs/deployments/claim-deployments#claim-a-temporary-deployment) the deployment to keep it live, then run `vercel login` to keep deploying the project.

For details, see [`vercel deploy`](/docs/cli/deploy#temporary).

### Relevant commands

- [deploy](/docs/cli/deploy)

## Deploying a staged production build

By default, when you promote a deployment to production, your domain will point to that deployment. If you want to create a production deployment without assigning it to your domain, for example to avoid sending all of your traffic to it, you can:

1. Turn off the auto-assignment of domains for the current production deployment:

```bash filename="terminal"
vercel --prod --skip-domain
```

2. When you are ready, manually promote the staged deployment to production:

```bash filename="terminal"
vercel promote [deployment-id or url]
```

### Relevant commands

- [promote](/docs/cli/promote)
- [deploy](/docs/cli/deploy)

## Deploying from local build (prebuilt)

To deploy a locally built Next.js app or another Vercel project, run `vercel build` followed by `vercel deploy --prebuilt`. You can build on your computer or in your own CI environment, inspect the output, and upload the build artifacts to Vercel without a remote build of your source code.

First, run [`vercel pull`](/docs/cli/pull) to download the project's settings and environment variables, then build:

```bash filename="terminal"
vercel pull --environment=preview
vercel build
```

*Download preview settings and build the project locally.*

This produces `.vercel/output` in the [Build Output API](/docs/build-output-api) format. You can review the output, then [deploy](/docs/cli/deploy) with:

```bash filename="terminal"
vercel deploy --prebuilt
```

*Deploy the build outputs in \`.vercel/output\` produced
by \`vercel build\`.*

> **💡 Note:** Review the [When not to use
> \--prebuilt](/docs/cli/deploy#when-not-to-use---prebuilt) section to understand
> when you should not use the `--prebuilt` flag.

See more details at [Build Output API](/docs/build-output-api).

### Relevant commands

- [build](/docs/cli/build)
- [deploy](/docs/cli/deploy)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
