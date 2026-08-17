---
title: vercel dev
product: vercel
url: /docs/cli/dev
canonical_url: "https://vercel.com/docs/cli/dev"
last_updated: 2026-07-15
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "a18f1ed95dacbf28b79f6e11758dccaf96fee653136a56b5eb27566e9747a4e6"
---

# vercel dev

The `vercel dev` command is used to replicate the Vercel deployment environment locally, allowing you to test your [Vercel Functions](/docs/functions) and [Middleware](/docs/routing-middleware) without requiring you to deploy each time a change is made.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using xmcp with Next.js](https://vercel.com/kb/guide/using-xmcp-with-nextjs?from=related) — Add an MCP server to an existing Next.js app with xmcp. Create typed tools, add authentication, and deploy to Vercel as
- [vercel build](https://vercel.com/docs/cli/build?from=related) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Deploy from CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Project Linking](https://vercel.com/docs/cli/project-linking?from=related) — Learn how to link existing Vercel Projects with Vercel CLI.
- [Deploying from CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.

Full cross-link map for this page: [/docs/cli/dev.graph.md](/docs/cli/dev.graph.md)
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


---

[View full sitemap](/docs/sitemap)
