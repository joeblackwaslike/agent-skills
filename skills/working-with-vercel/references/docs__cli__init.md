---
title: vercel init
product: vercel
url: /docs/cli/init
canonical_url: "https://vercel.com/docs/cli/init"
last_updated: 2026-05-28
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/frameworks
  - /docs/cli/global-options
summary: Learn how to initialize Vercel supported framework examples locally using the vercel init CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/init.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "e02a7c61f5f6315cc5134661f36ef7d5b17d1240ae81a1c9d66632ea0ac82c0f"
---

# vercel init

The `vercel init` command is used to initialize [Vercel supported framework](/docs/frameworks) examples locally from the examples found in the [Vercel examples repository](https://github.com/vercel/vercel/tree/main/examples).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to ship an Elysia app on Vercel](https://vercel.com/kb/guide/ship-a-elysia-app-on-vercel?from=related&source_path=%2Fdocs%2Fcli%2Finit&source_site=vercel-docs&relationship=related) — Deploy a Elysia app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and co
- [How to ship an Express app on Vercel](https://vercel.com/kb/guide/ship-a-express-app-on-vercel?from=related&source_path=%2Fdocs%2Fcli%2Finit&source_site=vercel-docs&relationship=related) — Deploy an Express app to Vercel with zero configuration. Configure response streaming, middleware, cron jobs, the Bun ru
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related&source_path=%2Fdocs%2Fcli%2Finit&source_site=vercel-docs&relationship=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel?from=related&source_path=%2Fdocs%2Fcli%2Finit&source_site=vercel-docs&relationship=related) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel?from=related&source_path=%2Fdocs%2Fcli%2Finit&source_site=vercel-docs&relationship=related) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [vercel dev](https://vercel.com/docs/cli/dev?from=related&source_path=%2Fdocs%2Fcli%2Finit&source_site=vercel-docs&relationship=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [vercel build](https://vercel.com/docs/cli/build?from=related&source_path=%2Fdocs%2Fcli%2Finit&source_site=vercel-docs&relationship=related) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel link](https://vercel.com/docs/cli/link?from=related&source_path=%2Fdocs%2Fcli%2Finit&source_site=vercel-docs&relationship=related) — Learn how to link a local directory to a Vercel Project using the vercel link CLI command.
- [vercel install](https://vercel.com/docs/cli/install?from=related&source_path=%2Fdocs%2Fcli%2Finit&source_site=vercel-docs&relationship=related) — Learn how to install marketplace native integrations and provision resources with the vercel install CLI command.
- [vercel login](https://vercel.com/docs/cli/login?from=related&source_path=%2Fdocs%2Fcli%2Finit&source_site=vercel-docs&relationship=related) — Learn how to login into your Vercel account using the vercel login CLI command.

Full cross-link map for this page: [/docs/cli/init.graph.md](/docs/cli/init.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Finit&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel init
```

*Using the \`vercel init\` command to initialize a Vercel
supported framework example locally. You will be prompted with a list of
supported frameworks to choose from.*

## Extended Usage

```bash filename="terminal"
vercel init [framework-name]
```

*Using the \`vercel init\` command to initialize a
specific framework example from the Vercel examples
repository locally.*

```bash filename="terminal"
vercel init [framework-name] [new-local-directory-name]
```

*Using the \`vercel init\` command to initialize a
specific Vercel framework example locally and rename the directory.*

## Unique Options

These are options that only apply to the `vercel init` command.

### Force

The `--force` option, shorthand `-f`, is used to forcibly replace an existing local directory.

```bash filename="terminal"
vercel init --force
```

*Using the \`vercel init\` command with the
\`--force\` option.*

```bash filename="terminal"
vercel init gatsby my-project-directory --force
```

*Using the \`vercel init\` command with the
\`--force\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel init` command:

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
