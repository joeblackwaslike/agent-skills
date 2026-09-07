---
title: vercel dev
product: vercel
url: /docs/cli/dev
canonical_url: "https://vercel.com/docs/cli/dev"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/functions
  - /docs/routing-middleware
  - /docs/builds/configure-a-build
  - /docs/frameworks/full-stack/nextjs
  - /docs/routing/redirects
summary: Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the vercel dev CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/dev.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "ca9eaff328d547f4b133d601fcc7470cc627795f9c8996a8e21f54ca7d0dd130"
---

# vercel dev

The `vercel dev` command is used to replicate the Vercel deployment environment locally, allowing you to test your [Vercel Functions](/docs/functions) and [Middleware](/docs/routing-middleware) without requiring you to deploy each time a change is made.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using xmcp with Next.js](https://vercel.com/kb/guide/using-xmcp-with-nextjs?from=related&source_path=%2Fdocs%2Fcli%2Fdev&source_site=vercel-docs&relationship=related) — Add an MCP server to an existing Next.js app with xmcp. Create typed tools, add authentication, and deploy to Vercel as
- [vercel build](https://vercel.com/docs/cli/build?from=related&source_path=%2Fdocs%2Fcli%2Fdev&source_site=vercel-docs&relationship=related) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related&source_path=%2Fdocs%2Fcli%2Fdev&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fdev&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel env](https://vercel.com/docs/cli/env?from=related&source_path=%2Fdocs%2Fcli%2Fdev&source_site=vercel-docs&relationship=related) — Learn how to manage your environment variables in your Vercel Projects using the vercel env CLI command.
- [vercel link](https://vercel.com/docs/cli/link?from=related&source_path=%2Fdocs%2Fcli%2Fdev&source_site=vercel-docs&relationship=related) — Learn how to link a local directory to a Vercel Project using the vercel link CLI command.

Full cross-link map for this page: [/docs/cli/dev.graph.md](/docs/cli/dev.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fdev&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

If the [Development Command](/docs/builds/configure-a-build#development-command) is configured in your Project Settings, it will affect the behavior of `vercel dev` for everyone on that team.

> **💡 Note:** Before running `vercel dev`, make sure to install your
> dependencies by running `npm install`.

## When to Use This Command

If you're using a framework and your framework's [Development Command](/docs/builds/configure-a-build#development-command) already provides all the features you need, we do not recommend using `vercel dev`.

For example, [Next.js](/docs/frameworks/full-stack/nextjs)'s Development Command (`next dev`) provides native support for Functions, [redirects](/docs/routing/redirects#configuration-redirects), rewrites, headers and more.

## Usage

```bash filename="terminal"
vercel dev
```

*Using the \`vercel dev\` command from the root of a
Vercel Project directory.*

## Unique Options

These are options that only apply to the `vercel dev` command.

### Listen

The `--listen` option, shorthand `-l`, can be used to specify which port `vercel dev` runs on.

```bash filename="terminal"
vercel dev --listen 5005
```

*Using the \`vercel dev\` command with the
\`--listen\` option.*

### Yes

The `--yes` option can be used to skip questions you are asked when setting up a new Vercel Project.
The questions will be answered with the default scope and current directory for the Vercel Project name and location.

```bash filename="terminal"
vercel dev --yes
```

*Using the \`vercel dev\` command with the
\`--yes\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel dev` command:

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
