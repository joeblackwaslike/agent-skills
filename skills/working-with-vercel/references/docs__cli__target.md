---
title: vercel target
product: vercel
url: /docs/cli/target
canonical_url: "https://vercel.com/docs/cli/target"
last_updated: 2026-05-28
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/deployments/environments
  - /docs/cli/deploy
  - /docs/cli/env
  - /docs/cli/global-options
summary: Work with custom environments using the --target flag in Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/target.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "605abbc4853c051ef4b47bbbfbd30d985ffc659ca200daa5e53a9532de14170b"
---

# vercel target

The `vercel target` command (alias: `vercel targets`) manages your Vercel project's targets (custom environments). Targets are custom deployment environments beyond the standard production, preview, and development environments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel build](https://vercel.com/docs/cli/build?from=related&source_path=%2Fdocs%2Fcli%2Ftarget&source_site=vercel-docs&relationship=related) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Ftarget&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel redeploy](https://vercel.com/docs/cli/redeploy?from=related&source_path=%2Fdocs%2Fcli%2Ftarget&source_site=vercel-docs&relationship=related) — Learn how to redeploy your project using the vercel redeploy CLI command.
- [vercel pull](https://vercel.com/docs/cli/pull?from=related&source_path=%2Fdocs%2Fcli%2Ftarget&source_site=vercel-docs&relationship=related) — Learn how to update your local project with remote environment variables using the vercel pull CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev?from=related&source_path=%2Fdocs%2Fcli%2Ftarget&source_site=vercel-docs&relationship=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the

Full cross-link map for this page: [/docs/cli/target.graph.md](/docs/cli/target.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Ftarget&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel target list
```

*Using \`vercel target list\` to list all targets for your project.*

## Commands

### list (ls)

List all targets defined for the current project.

```bash filename="terminal"
vercel target list
vercel target ls
vercel targets ls
```

*List all custom environments configured for your project.*

## Using the --target flag

The `--target` flag is available on several commands to specify which environment to target:

```bash filename="terminal"
# Deploy to a custom environment named "staging"
vercel deploy --target=staging
```

*Deploy your project to a custom environment by specifying
\`--target=\&lt;environment-name\&gt;\`.*

## Examples

### List all targets

```bash filename="terminal"
vercel target list
```

### Deploy to a custom environment

```bash filename="terminal"
vercel deploy --target=staging
```

### Pull environment variables for a custom environment

```bash filename="terminal"
vercel pull --environment=staging
```

### Set and use environment variables for a custom environment

```bash filename="terminal"
vercel env add MY_KEY staging
vercel env ls staging
```

## Related

- [Custom environments](/docs/deployments/environments#custom-environments)
- [vercel deploy](/docs/cli/deploy)
- [vercel env](/docs/cli/env)

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel target` command:

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


---

[View full sitemap](/docs/sitemap)
