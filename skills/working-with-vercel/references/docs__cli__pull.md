---
title: vercel pull
product: vercel
url: /docs/cli/pull
canonical_url: "https://vercel.com/docs/cli/pull"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/environment-variables
  - /docs/cli/env
  - /docs/deployments/environments
  - /docs/cli/global-options
summary: Learn how to update your local project with remote environment variables using the vercel pull CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/pull.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "43cc4a05f8334b066e9b2d9b211a0b021b8290b029122efa668dc344e5b1b33e"
---

# vercel pull

The `vercel pull` command is used to store [Environment Variables](/docs/environment-variables) and Project Settings in a local cache (under `.vercel/.env.$target.local`) for offline use of `vercel build` and `vercel dev`. **If you aren't using those commands, you don't need to run `vercel pull`**.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [vercel env](https://vercel.com/docs/cli/env) — Learn how to manage your environment variables in your Vercel Projects using the vercel env CLI command.
- [vercel build](https://vercel.com/docs/cli/build) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [Managing environment variables across environments](https://vercel.com/docs/environment-variables/manage-across-environments) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
- [vercel dev](https://vercel.com/docs/cli/dev) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the

Full cross-link map for this page: [/docs/cli/pull.graph.md](/docs/cli/pull.graph.md)
<!-- /docsgraph:related -->

When environment variables or project settings are updated on Vercel, remember to use `vercel pull` again to update your local environment variable and project settings values under `.vercel/`.

> **💡 Note:** To download [Environment Variables](/docs/environment-variables) to a specific
> file (like `.env`), use [`vercel env
>   pull`](/docs/cli/env#exporting-development-environment-variables)  
> instead.

## Usage

```bash filename="terminal"
vercel pull
```

*Using the \`vercel pull\` fetches the latest
"development" Environment Variables and Project Settings from the cloud.*

```bash filename="terminal"
vercel pull --environment=preview
```

*Using the \`vercel pull\` fetches the latest "preview"
Environment Variables and Project Settings from the cloud.*

```bash filename="terminal"
vercel pull --environment=preview --git-branch=feature-branch
```

*Using the \`vercel pull\` fetches the "feature-branch"
Environment Variables and Project Settings from the cloud.*

```bash filename="terminal"
vercel pull --environment=production
```

*Using the \`vercel pull\` fetches the latest "production"
Environment Variables and Project Settings from the cloud.*

## Unique Options

These are options that only apply to the `vercel pull` command.

### Yes

The `--yes` option can be used to skip questions you are asked when setting up a new Vercel Project.
The questions will be answered with the default scope and current directory for the Vercel Project name and location.

```bash filename="terminal"
vercel pull --yes
```

*Using the \`vercel pull\` command with the
\`--yes\` option.*

### environment

Use the `--environment` option to define the environment you want to pull environment variables from. This could be production, preview, or a [custom environment](/docs/deployments/environments#custom-environments).

```bash filename="terminal"
vercel pull --environment=staging
```

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel pull` command:

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
