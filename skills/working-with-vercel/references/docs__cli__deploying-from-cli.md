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
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "d2c6a00010612b2751876d292b762f53cc7cbf1f26bd69258c34b7abcfd5d1ba"
---

# Deploying Projects from Vercel CLI

## Deploying from source

The `vercel` command is used to [deploy](/docs/cli/deploy) Vercel Projects and can be used from either the root of the Vercel Project directory or by providing a path.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Claim Deployments now available for fast and secure deployment transfers](https://vercel.com/changelog/claim-deployments?from=related&source_path=%2Fdocs%2Fcli%2Fdeploying-from-cli&source_site=vercel-docs&relationship=related)
- [How to set up a staging environment on Vercel](https://vercel.com/kb/guide/set-up-a-staging-environment-on-vercel?from=related&source_path=%2Fdocs%2Fcli%2Fdeploying-from-cli&source_site=vercel-docs&relationship=related) — Set up a staging environment on Vercel with custom environments, staged production deployments, or a branch-based previe
- [Enhanced Preview experience](https://vercel.com/blog/making-live-reviews-a-reality-enhanced-preview-experience?from=related&source_path=%2Fdocs%2Fcli%2Fdeploying-from-cli&source_site=vercel-docs&relationship=related)
- [Zero Config Deployments](https://vercel.com/blog/zero-config?from=related&source_path=%2Fdocs%2Fcli%2Fdeploying-from-cli&source_site=vercel-docs&relationship=related)
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related&source_path=%2Fdocs%2Fcli%2Fdeploying-from-cli&source_site=vercel-docs&relationship=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Deploying to Vercel](https://vercel.com/docs/deployments?from=related&source_path=%2Fdocs%2Fcli%2Fdeploying-from-cli&source_site=vercel-docs&relationship=related) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fcli%2Fdeploying-from-cli&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [vercel redeploy](https://vercel.com/docs/cli/redeploy?from=related&source_path=%2Fdocs%2Fcli%2Fdeploying-from-cli&source_site=vercel-docs&relationship=related) — Learn how to redeploy your project using the vercel redeploy CLI command.
- [vercel deploy-hooks](https://vercel.com/docs/cli/deploy-hooks?from=related&source_path=%2Fdocs%2Fcli%2Fdeploying-from-cli&source_site=vercel-docs&relationship=related) — Manage Deploy Hooks for Git-triggered builds from the Vercel CLI: list, create, and remove deploy hook URLs that trigger

Full cross-link map for this page: [/docs/cli/deploying-from-cli.graph.md](/docs/cli/deploying-from-cli.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fdeploying-from-cli&source_site=vercel-docs&relationship=graph)
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
