---
title: vercel build
product: vercel
url: /docs/cli/build
canonical_url: "https://vercel.com/docs/cli/build"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/build-output-api
  - /docs/deployments/environments
summary: Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/build.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "cb92db3794c55ba7e404fb3e7dd8fd0c05401254e3e8bb921dfe42b26a17dbc5"
---

# vercel build

The `vercel build` command can be used to build a Vercel Project locally or in your own CI environment.
Build artifacts are placed into the `.vercel/output` directory according to the
[Build Output API](/docs/build-output-api).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Troubleshooting Vercel Cron Jobs](https://vercel.com/kb/guide/troubleshooting-vercel-cron-jobs?from=related) — Learn how to troubleshoot cron jobs that aren't being run or logged when using Vercel Cron Jobs.
- [Can I deploy a locally built Next.js app to Vercel?](https://vercel.com/kb/guide/deploying-locally-built-nextjs?from=related) — Learn how to deploy a locally built Next.js application to Vercel.
- [Deploying from CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Build System](https://vercel.com/docs/fundamentals/builds?from=related) — Learn how Vercel transforms your source code into optimized assets ready to serve globally.
- [vercel dev](https://vercel.com/docs/cli/dev?from=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [Deploy from CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related) — Set up and deploy a Vercel project using the CLI, from linking to production.

Full cross-link map for this page: [/docs/cli/build.graph.md](/docs/cli/build.graph.md)
<!-- /docsgraph:related -->

When used in conjunction with the `vercel deploy --prebuilt` command, this allows a Vercel Deployment
to be created *without* sharing the Vercel Project's source code with Vercel.

This command can also be helpful in debugging a Vercel Project by receiving error messages for a failed
build locally, or by inspecting the resulting build artifacts to get a better understanding of
how Vercel will create the Deployment.

It is recommended to run the `vercel pull` command before invoking `vercel build` to ensure that
you have the most recent Project Settings and Environment Variables stored locally.

## Usage

```bash filename="terminal"
vercel build
```

*Using the \`vercel build\` command to build a Vercel
Project.*

## Unique Options

These are options that only apply to the `vercel build` command.

### Production

The `--prod` option can be specified when you want to build the Vercel Project using Production Environment Variables. By default, the Preview Environment Variables will be used.

```bash filename="terminal"
vercel build --prod
```

*Using the \`vercel build\` command with the
\`--prod\` option.*

### Yes

The `--yes` option can be used to bypass the confirmation prompt and automatically pull environment variables and Project Settings if not found locally.

```bash filename="terminal"
vercel build --yes
```

*Using the \`vercel build\` command with the
\`--yes\` option.*

### target

Use the `--target` option to define the environment you want to build against. This could be production, preview, or a [custom environment](/docs/deployments/environments#custom-environments).

```bash filename="terminal"
vercel build --target=staging
```

### Output

The `--output` option specifies a custom directory where the build artifacts will be written to, instead of the default `.vercel/output` directory.

```bash filename="terminal"
vercel build --output ./custom-output
```

*Using the \`vercel build\` command with the
\`--output\` option to specify a custom output directory.*

## Related guides

- [How can I use the Vercel CLI for custom workflows?](/kb/guide/using-vercel-cli-for-custom-workflows)


---

[View full sitemap](/docs/sitemap)
