---
title: vercel build
product: vercel
url: /docs/cli/build
canonical_url: "https://vercel.com/docs/cli/build"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/build-output-api
  - /docs/deployments/environments
  - /docs/cli/global-options
summary: Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/build.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "0d9302edfa660ecb8125e73c6ff7e2ab3f25780b30c5745b1c0ecf60c409497a"
---

# vercel build

The `vercel build` command can be used to build a Vercel Project locally or in your own CI environment.
Build artifacts are placed into the `.vercel/output` directory according to the
[Build Output API](/docs/build-output-api).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Conditional Build Commands: Environment, Branch, and Custom Workflows](https://vercel.com/kb/guide/dynamic-build-commands?from=related&source_path=%2Fdocs%2Fcli%2Fbuild&source_site=vercel-docs&relationship=related) — Run a different Vercel build command for each environment or Git branch using a shell script, vercel.json, or vercel.ts,
- [Troubleshooting Vercel Cron Jobs](https://vercel.com/kb/guide/troubleshooting-vercel-cron-jobs?from=related&source_path=%2Fdocs%2Fcli%2Fbuild&source_site=vercel-docs&relationship=related) — Learn how to troubleshoot cron jobs that aren't being run or logged when using Vercel Cron Jobs.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related&source_path=%2Fdocs%2Fcli%2Fbuild&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev?from=related&source_path=%2Fdocs%2Fcli%2Fbuild&source_site=vercel-docs&relationship=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related&source_path=%2Fdocs%2Fcli%2Fbuild&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [vercel link](https://vercel.com/docs/cli/link?from=related&source_path=%2Fdocs%2Fcli%2Fbuild&source_site=vercel-docs&relationship=related) — Learn how to link a local directory to a Vercel Project using the vercel link CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fbuild&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/build.graph.md](/docs/cli/build.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fbuild&source_site=vercel-docs&relationship=graph)
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

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel build` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--team`](/docs/cli/global-options#team)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).

## Related guides

- [How can I use the Vercel CLI for custom workflows?](/kb/guide/using-vercel-cli-for-custom-workflows)


---

[View full sitemap](/docs/sitemap)
