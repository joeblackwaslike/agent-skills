---
title: vercel alias
product: vercel
url: /docs/cli/alias
canonical_url: "https://vercel.com/docs/cli/alias"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/domains/working-with-domains/add-a-domain
  - /docs/git
  - /docs/rest-api
  - /docs/domains/working-with-domains/assign-domain-to-a-git-branch
  - /docs/cli/deploy
summary: Learn how to apply custom domain aliases to your Vercel deployments using the vercel alias CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/alias.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "0882ce4661103865d785ce2da42c1d615715fe1e72953c075d31d0b17ecd50e7"
---

# vercel alias

The `vercel alias` command allows you to apply [custom domains](/docs/domains/working-with-domains/add-a-domain) to your deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Microfrontends routing now applies to vc alias and branch domains](https://vercel.com/changelog/microfrontends-routing-now-applies-to-vc-alias-and-branch-domains?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related)
- [How to alias a preview deployment using the CLI](https://vercel.com/kb/guide/how-to-alias-a-preview-deployment-using-the-cli?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related) — Learn how to automatically alias a Vercel preview deployment.
- [Assign an Alias](https://vercel.com/docs/rest-api/aliases/assign-an-alias?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related) — POST /v2/deployments/{id}/aliases — Creates a new alias for the deployment resolved from the given deployment or alias I
- [vercel domains](https://vercel.com/docs/cli/domains?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related) — Learn how to buy, sell, transfer, and manage your domains using the vercel domains CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [Deploying & Redirecting Domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related) — Learn how to deploy your domains and set up domain redirects with this guide.
- [Get an Alias](https://vercel.com/docs/rest-api/aliases/get-an-alias?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related) — GET /v4/aliases/{idOrAlias} — Retrieves an Alias for the given host name or alias ID.

Full cross-link map for this page: [/docs/cli/alias.graph.md](/docs/cli/alias.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

When a new deployment is created (with our [Git Integration](/docs/git), Vercel CLI, or the [REST API](/docs/rest-api)), the platform will automatically apply any [custom domains](/docs/domains/working-with-domains/add-a-domain) configured in the project settings.

Any custom domain that doesn't have a [custom preview branch](/docs/domains/working-with-domains/assign-domain-to-a-git-branch) configured (there can only be one Production Branch and it's [configured separately](/docs/git#production-branch) in the project settings) will be applied to production deployments created through any of the available sources.

Custom domains that do have a custom preview branch configured, however, only get applied when using the [Git Integration](/docs/git).

If you're not using the [Git Integration](/docs/git), `vercel alias` is a great solution if you still need to apply custom domains based on Git branches, or other heuristics.

## Preferred production commands

The `vercel alias` command is not the recommended way to promote production deployments to specific domains. Instead, you can use the following commands:

- [`vercel --prod --skip-domain`](/docs/cli/deploy#prod): Use to skip custom domain assignment when deploying to production and creating a staged deployment
- [`vercel promote [deployment-id or url]`](/docs/cli/promote): Use to promote your staged deployment to your custom domains
- [`vercel rollback [deployment-id or url]`](/docs/cli/rollback): Use to alias an earlier production deployment to your custom domains

## Usage

In general, the command allows for assigning custom domains to any deployment.

Make sure to **not** include the HTTP protocol (e.g. `https://`) for the `[custom-domain]` parameter.

```bash filename="terminal"
vercel alias set [deployment-url] [custom-domain]
```

*Using the \`vercel alias\` command to assign a custom
domain to a deployment.*

```bash filename="terminal"
vercel alias rm [custom-domain]
```

*Using the \`vercel alias\` command to remove a custom
domain from a deployment.*

```bash filename="terminal"
vercel alias ls
```

*Using the \`vercel alias\` command to list custom domains
that were assigned to deployments.*

## Unique options

These are options that only apply to the `vercel alias` command.

### Yes

The `--yes` option can be used to bypass the confirmation prompt when removing an alias.

```bash filename="terminal"
vercel alias rm [custom-domain] --yes
```

*Using the \`vercel alias rm\` command with the
\`--yes\` option.*

### Limit

The `--limit` option can be used to specify the maximum number of aliases returned when using `ls`. The default value is `20` and the maximum is `100`.

```bash filename="terminal"
vercel alias ls --limit 100
```

*Using the \`vercel alias ls\` command with the
\`--limit\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel alias` command:

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

- [How do I resolve alias related errors on Vercel?](/kb/guide/how-to-resolve-alias-errors-on-vercel)


---

[View full sitemap](/docs/sitemap)
