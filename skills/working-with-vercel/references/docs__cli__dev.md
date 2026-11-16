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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/dev.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "37c9cd91a486c8e7f3b36325b94a40ad676058088a31b4218dffa9ce3a20e2fa"
---

# vercel dev

The `vercel dev` command is used to replicate the Vercel deployment environment locally, allowing you to test your [Vercel Functions](/docs/functions) and [Middleware](/docs/routing-middleware) without requiring you to deploy each time a change is made.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to set up local HTTPS for Next.js and other dev servers](https://vercel.com/kb/guide/access-nextjs-localhost-https-certificate-self-signed) — Learn when you need local HTTPS, how to enable it with next dev --experimental-https, and how to clear certificate warni
- [Using xmcp with Next.js](https://vercel.com/kb/guide/using-xmcp-with-nextjs) — Add an MCP server to an existing Next.js app with xmcp. Create typed tools, add authentication, and deploy to Vercel as
- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Introducing `vercel dev`: Serverless, on localhost](https://vercel.com/blog/vercel-dev)
- [vercel build](https://vercel.com/docs/cli/build) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.

Full cross-link map for this page: [/docs/cli/dev.graph.md](/docs/cli/dev.graph.md)
<!-- /docsgraph:related -->

If the [Development Command](/docs/builds/configure-a-build#development-command) is configured in your Project Settings, it will affect the behavior of `vercel dev` for everyone on that team.

> **💡 Note:** Before running `vercel dev`, make sure to install your
> dependencies by running `npm install`.

## When to Use This Command

If you're using a framework and your framework's [Development Command](/docs/builds/configure-a-build#development-command) already provides all the features you need, we do not recommend using `vercel dev`.

For example, [Next.js](/docs/frameworks/full-stack/nextjs)'s Development Command (`next dev`) provides native support for Functions, [redirects](/docs/routing/redirects#implementing-redirects), rewrites, headers and more.

## Usage

```bash filename="terminal"
vercel dev
```

*Using the \`vercel dev\` command from the root of a
Vercel Project directory.*

## Unique Options

These are options that only apply to the `vercel dev` command.

### Listen

The `--listen` option can be used to specify which port `vercel dev` runs on.

```bash filename="terminal"
vercel dev --listen 5005
```

*Using the \`vercel dev\` command with the
\`--listen\` option.*

### Local

To start `vercel dev` in a directory that is not [linked](/docs/cli/project-linking) to a Vercel Project, without setting up a project or logging in, use the `--local` option:

```bash filename="terminal"
vercel dev --local
```

*Using the \`vercel dev\` command with the
\`--local\` option.*

Without a linked project, the CLI does not pull environment variables from Vercel, and your project settings come from your local configuration, such as `vercel.json`.

### Yes

The `--yes` option can be used to skip questions you are asked when setting up a new Vercel Project.
The CLI answers the questions with the current directory for the Vercel Project name and location. The `--yes` option does not choose a team. If you belong to more than one team, also pass the [`--scope` option](/docs/cli/global-options#scope).

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
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).

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
