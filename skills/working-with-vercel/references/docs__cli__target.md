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
  []
summary: Work with custom environments using the --target flag in Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/target.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "857fad427118d55f68483ef66bf46f19e6b2ce96ac7661669f834b3b5d5832a8"
---

# vercel target

The `vercel target` command (alias: `vercel targets`) manages your Vercel project's targets (custom environments). Targets are custom deployment environments beyond the standard production, preview, and development environments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel build](https://vercel.com/docs/cli/build?from=related) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Manage Across Environments](https://vercel.com/docs/environment-variables/manage-across-environments?from=related) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
- [vercel redeploy](https://vercel.com/docs/cli/redeploy?from=related) — Learn how to redeploy your project using the vercel redeploy CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/target.graph.md](/docs/cli/target.graph.md)
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

-
-
-


---

[View full sitemap](/docs/sitemap)
