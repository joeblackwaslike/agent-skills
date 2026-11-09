---
title: vercel environments
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
summary: Work with custom environments using the --environment option in Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/target.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "10428646c9907cc3bb4058883be8498aa4bb58b1443de112c39a71162c40f5ac"
---

# vercel environments

The `vercel environments` command lists your Vercel project's environments, including its custom environments. Custom environments are deployment environments beyond the standard production, preview, and development environments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Managing environment variables across environments](https://vercel.com/docs/environment-variables/manage-across-environments) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
- [list_project_custom_environments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/list_project_custom_environments) — Use list_project_custom_environments with Vercel MCP.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [Retrieve custom environments](https://vercel.com/docs/rest-api/environment/retrieve-custom-environments) — GET /v9/projects/{idOrName}/custom-environments — Retrieve custom environments for the project. Must not be named 'Produ
- [Environment Variables](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables) — Vercel MCP tools for environment variables.

Full cross-link map for this page: [/docs/cli/target.graph.md](/docs/cli/target.graph.md)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel environments list
```

*Using \`vercel environments list\` to list all environments for your project.*

## Commands

### list

List the standard environments and all custom environments defined for the current project:

```bash filename="terminal"
vercel environments list
```

*List all environments configured for your project.*

## Using the --environment option

The `--environment` option is available on several commands to specify which environment to target:

```bash filename="terminal"
# Deploy to a custom environment named "staging"
vercel deploy --environment=staging
```

*Deploy your project to a custom environment by specifying
\`--environment=\&lt;environment-name\&gt;\`.*

## Examples

### List all environments

```bash filename="terminal"
vercel environments list
```

### Deploy to a custom environment

```bash filename="terminal"
vercel deploy --environment=staging
```

### Pull environment variables for a custom environment

```bash filename="terminal"
vercel pull --environment=staging
```

### Set and use environment variables for a custom environment

```bash filename="terminal"
vercel env add MY_KEY --environment=staging
vercel env list --environment=staging
```

## Related

- [Custom environments](/docs/deployments/environments#custom-environments)
- [vercel deploy](/docs/cli/deploy)
- [vercel env](/docs/cli/env)

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel environments` command:

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
