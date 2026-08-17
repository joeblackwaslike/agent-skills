---
title: vercel alias
product: vercel
url: /docs/cli/alias
canonical_url: "https://vercel.com/docs/cli/alias"
last_updated: 2026-03-17
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "79d7e35057eab9f428510f7ba968f9a8ab30b2736129c8048334ce0aac70b9b8"
---

# vercel alias

The `vercel alias` command allows you to apply [custom domains](/docs/domains/working-with-domains/add-a-domain) to your deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to alias a preview deployment using the CLI](https://vercel.com/kb/guide/how-to-alias-a-preview-deployment-using-the-cli?from=related) — Learn how to automatically alias a Vercel preview deployment.
- [Why do my Vercel deployments have multiple domains?](https://vercel.com/kb/guide/why-do-my-vercel-deployments-have-multiple-domains?from=related) — Learn about why Vercel auto generates URLs for your deployments.
- [Assign an Alias](https://vercel.com/docs/rest-api/aliases/assign-an-alias?from=related)
- [vercel domains](https://vercel.com/docs/cli/domains?from=related) — Learn how to buy, sell, transfer, and manage your domains using the vercel domains CLI command.
- [Deploying & Redirecting Domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting?from=related) — Learn how to deploy your domains and set up domain redirects with this guide.
- [Get an Alias](https://vercel.com/docs/rest-api/aliases/get-an-alias?from=related)
- [List aliases](https://vercel.com/docs/rest-api/aliases/list-aliases?from=related)

Full cross-link map for this page: [/docs/cli/alias.graph.md](/docs/cli/alias.graph.md)
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

## Related guides

- [How do I resolve alias related errors on Vercel?](/kb/guide/how-to-resolve-alias-errors-on-vercel)


---

[View full sitemap](/docs/sitemap)
