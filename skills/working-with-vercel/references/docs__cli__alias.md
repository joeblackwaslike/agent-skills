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
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "9e826e5c68a0d2ff78ec9c3422023430ee2b6d7297ee61c4ce59892b0a162248"
---

# vercel alias

The `vercel alias` command allows you to apply [custom domains](/docs/domains/working-with-domains/add-a-domain) to your deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Microfrontends routing now applies to vc alias and branch domains](https://vercel.com/changelog/microfrontends-routing-now-applies-to-vc-alias-and-branch-domains?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related)
- [How to alias a preview deployment using the CLI](https://vercel.com/kb/guide/how-to-alias-a-preview-deployment-using-the-cli?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related) — Learn how to automatically alias a Vercel preview deployment.
- [Assign an Alias](https://vercel.com/docs/rest-api/aliases/assign-an-alias?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related) — POST /v2/deployments/{id}/aliases — Creates a new alias for the deployment resolved from the given deployment or alias I
- [Deploying & Redirecting Domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related) — Learn how to deploy your domains and set up domain redirects with this guide.
- [vercel domains](https://vercel.com/docs/cli/domains?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related) — Learn how to buy, sell, transfer, and manage your domains using the vercel domains CLI command.
- [List Deployment Aliases](https://vercel.com/docs/rest-api/aliases/list-deployment-aliases?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related) — GET /v2/deployments/{id}/aliases — Retrieves all Aliases for the Deployment with the given ID. The authenticated user or
- [Delete an Alias](https://vercel.com/docs/rest-api/aliases/delete-an-alias?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=related) — DELETE /v2/aliases/{aliasId} — Delete an Alias with the specified ID.

Full cross-link map for this page: [/docs/cli/alias.graph.md](/docs/cli/alias.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Falias&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

When a new deployment is created (with our [Git Integration](/docs/git), Vercel CLI, or the [REST API](/docs/rest-api)), the platform will automatically apply any [custom domains](/docs/domains/working-with-domains/add-a-domain) configured in the project settings.

Any custom domain that doesn't have a [custom preview branch](/docs/domains/working-with-domains/assign-domain-to-a-git-branch) configured (there can only be one Production Branch and it's [configured separately](/docs/git#production-branch) in the project settings) will be applied to production deployments created through any of the available sources.

Branch-specific domains require a deployment associated with the configured Git branch. Git integrations supply this association automatically. For CLI deployments, check the [Git metadata](/docs/cli/deploy#associate-a-cli-deployment-with-a-git-branch), especially when deploying from CI or a detached checkout.

Use `vercel alias` when you need to assign a domain manually, independently of automatic branch assignment.

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

## Troubleshooting alias conflicts

You might encounter one of these errors:

- `The chosen alias <xyz>.vercel.app is already in use.`
- `To move the domain, remove existing aliases associated with <domain>.`

Check which team owns the alias before changing it. List aliases in each team you can access, using [`vercel switch`](/docs/cli/switch) or an explicit scope:

```bash filename="terminal"
vercel alias ls --scope your_team_slug --limit 100
```

The list shows aliases and their target deployments. The default limit is 20 and the maximum is 100, so an alias missing from this list isn't proof that it's available. Check the owning project's domains and deployments in the dashboard, especially for teams with more aliases than the list limit.

If you own the conflicting alias and intend to detach it, remove the alias in its owning scope:

```bash filename="terminal"
vercel alias rm your-project.vercel.app --scope your_team_slug
```

Review the confirmation prompt. Removing an alias stops that hostname from serving its current deployment; you don't need to delete the deployment to remove its alias. Then retry the assignment or domain move.

If a custom domain belongs to an account you can't access, follow [claiming domain ownership](/docs/domains/working-with-domains/claim-domain-ownership). You can't claim another team's `vercel.app` alias through DNS verification. Choose another alias or [contact support](/help) if a conflict persists after removal or account deletion.


---

[View full sitemap](/docs/sitemap)
