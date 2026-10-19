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
  - /docs/cli/promote
  - /docs/cli/pull
  - /docs/build-output-api
summary: Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/deploying-from-cli.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "a51419536bf43a0cdc70e169a8e5dbe383e8f11808bce959e7682ef789e710e0"
---

# Deploying Projects from Vercel CLI

## Deploying from source

The `vercel` command is used to [deploy](/docs/cli/deploy) Vercel Projects and can be used from either the root of the Vercel Project directory or by providing a path.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Claim Deployments now available for fast and secure deployment transfers](https://vercel.com/changelog/claim-deployments)
- [How to set up a staging environment on Vercel](https://vercel.com/kb/guide/set-up-a-staging-environment-on-vercel) — Set up a staging environment on Vercel with custom environments, staged production deployments, or a branch-based previe
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [How to ship a Koa app on Vercel](https://vercel.com/kb/guide/ship-a-koa-app-on-vercel) — Deploy a Koa app to Vercel with zero configuration. Learn how to ship from the Vercel CLI or Git, and configure response
- [How to ship a NestJS app on Vercel](https://vercel.com/kb/guide/ship-a-nestjs-app-on-vercel) — Deploy a NestJS app to Vercel with zero configuration. Learn how to ship from a template, the Nest CLI, or Git, and conf
- [Enhanced Preview experience](https://vercel.com/blog/making-live-reviews-a-reality-enhanced-preview-experience)
- [Zero Config Deployments](https://vercel.com/blog/zero-config)
- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel) — Learn how to deploy based on tags/releases on Vercel.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [vercel redeploy](https://vercel.com/docs/cli/redeploy) — Learn how to redeploy your project using the vercel redeploy CLI command.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Deploying with Vercel Drop](https://vercel.com/docs/drop) — Vercel Drop lets you deploy a file or folder by dragging it into your browser, with no Git or CLI required.

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
