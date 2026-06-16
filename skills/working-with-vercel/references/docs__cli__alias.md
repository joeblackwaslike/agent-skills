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
  - /docs/projects/custom-domains
  - /docs/git
  - /docs/rest-api
  - /docs/domains/working-with-domains/assign-domain-to-a-git-branch
  - /docs/cli/deploy
summary: Learn how to apply custom domain aliases to your Vercel deployments using the vercel alias CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/alias.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "8c9989c0a9374a64ece275db6754a52666bcc61d2ef076363be44898acda1ee7"
---

# vercel alias

The `vercel alias` command allows you to apply [custom domains](/docs/projects/custom-domains) to your deployments.

When a new deployment is created (with our [Git Integration](/docs/git), Vercel CLI, or the [REST API](/docs/rest-api)), the platform will automatically apply any [custom domains](/docs/projects/custom-domains) configured in the project settings.

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
