---
title: Deploying Projects from Vercel CLI
product: vercel
url: /docs/cli/deploying-from-cli
canonical_url: "https://vercel.com/docs/cli/deploying-from-cli"
last_updated: 2026-07-23
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/deploy
  - /docs/deployments/environments
  - /docs/cli/promote
  - /docs/build-output-api
  - /docs/cli/build
summary: Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/deploying-from-cli.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "fdc6c8d95e19a676cf303f9dd30181c71a6a82a93c872c2764d81fefdb6d7db6"
---

# Deploying Projects from Vercel CLI

## Deploying from source


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I set up a staging environment on Vercel?](https://vercel.com/kb/guide/set-up-a-staging-environment-on-vercel?from=related) — Information on how to set up a staging environment on Vercel.
- [Deploy from CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [Project Linking](https://vercel.com/docs/cli/project-linking?from=related) — Learn how to link existing Vercel Projects with Vercel CLI.
- [vercel redeploy](https://vercel.com/docs/cli/redeploy?from=related) — Learn how to redeploy your project using the vercel redeploy CLI command.
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments?from=related) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a

Full cross-link map for this page: [/docs/cli/deploying-from-cli.graph.md](/docs/cli/deploying-from-cli.graph.md)
<!-- /docsgraph:related -->

The `vercel` command is used to [deploy](/docs/cli/deploy) Vercel Projects and can be used from either the root of the Vercel Project directory or by providing a path.

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

You can build Vercel projects locally to inspect the build outputs before they are [deployed](/docs/cli/deploy). This is a great option for producing builds for Vercel that do not share your source code with the platform.

It's also useful for debugging build outputs.

```bash filename="terminal"
vercel build
```

*Using the \`vercel\` command to deploy and write stdout
to a text file.*

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
