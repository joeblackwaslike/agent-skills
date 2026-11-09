---
title: vercel tokens
product: vercel
url: /docs/cli/tokens
canonical_url: "https://vercel.com/docs/cli/tokens"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/accounts/access-tokens
  - /docs/cli/global-options
summary: "Manage your personal Vercel authentication tokens from the CLI: list, create, and revoke access tokens for use with the Vercel API and Vercel CLI."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/tokens.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "bcbfdc52357a80288bd1fcd7835f60050900eb65b4c16bfc374332278af0ef4e"
---

# vercel tokens

The `vercel tokens` command manages your personal authentication tokens. Tokens authenticate Vercel CLI commands and Vercel REST API requests on your behalf. They are scoped to your user account, and optionally to a single project. Use this command to list existing tokens, create new ones for scripts and CI environments, and revoke tokens you no longer need.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Why is Vercel CLI asking me to log in? ](https://vercel.com/kb/guide/why-is-vercel-cli-asking-me-to-log-in) — Information on why you may be getting prompted to log in to Vercel CLI.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel kms](https://vercel.com/docs/cli/kms) — Manage Vercel KMS issuers, rotate signing keys, and control which projects can sign tokens from the command line.
- [List Auth Tokens](https://vercel.com/docs/rest-api/authentication/list-auth-tokens) — GET /v6/user/tokens — Retrieve a list of the current User's authentication tokens.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel global-config](https://vercel.com/docs/cli/global-config) — Manage Global Config stores from the Vercel CLI: list, create, inspect, update, delete, and manage items, read tokens, a

Full cross-link map for this page: [/docs/cli/tokens.graph.md](/docs/cli/tokens.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Treat tokens as secrets. The CLI shows the plaintext value of a newly created
> token only once. Store it in a secret manager or environment variable; never
> commit it to source control.

## Usage

```bash filename="terminal"
vercel tokens [subcommand]
```

*Using the \`vercel tokens\` command to manage personal authentication tokens.
When called without a subcommand, \`vercel tokens\` runs \`list\`.*

## Commands

### list

Lists your personal authentication tokens. This is the default subcommand, so `vercel tokens` and `vercel tokens list` are equivalent.

```bash filename="terminal"
vercel tokens
vercel tokens list
vercel tokens list --json
```

*List your tokens. Use \`--json\` for machine-readable output.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--json` | Boolean | Output as JSON |
| `--limit <NUMBER>` | Number | Maximum number of tokens to return (default 20, range 1-100) |
| `--next <CURSOR>` | String | Show the next page of results, using the cursor from the previous page. When more tokens exist, the output ends with the command for the next page. With `--json`, the cursor is in `pagination.next`. |

### create

Creates a new personal authentication token with the given name. The command prints the plaintext token once, so copy it before it scrolls away. To capture the token in a script, pass `--json` and read the `bearerToken` field.

```bash filename="terminal"
vercel tokens create "CI deploy"
```

*Create a new token named \`CI deploy\`. The plaintext value is printed once.*

> **💡 Note:** Creating tokens with this command requires a **classic personal access
> token**. OAuth sessions created by `vercel login` cannot mint new tokens,
> and project-scoped tokens (some `vcp_…` values) will also be rejected. If
> you don't already have a classic token, create one from the [Account Tokens
> page](/account/tokens) in the dashboard, then set `VERCEL_TOKEN` (or pass
> `--token`) to that value and re-run the command.

The [scope](/docs/accounts/access-tokens#token-scoping-levels) that the classic token needs depends on whether you pass `--project`:

| To create | Authenticate the CLI with |
| --- | --- |
| A full-account token (no `--project`) | A token with the **Full Account** scope. The command rejects a team-scoped token. |
| A project-scoped token (`--project`) | A token scoped to the team that owns the project. The command rejects a **Full Account** token. |

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `name` | Yes | Display name for the token (helps you identify it later) |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--json` | Boolean | Output as JSON |
| `--project <PROJECT_ID>` | String | Optional project ID to scope the token to a single project. The CLI forwards this value directly to the API; project names are not resolved. |

### revoke

Revokes a personal authentication token by ID. Use `vercel tokens list` first to find the token ID.

```bash filename="terminal"
vercel tokens revoke tok_abc123
```

*Revoke the token with ID \`tok\_abc123\`.*

In a terminal, the command asks you to confirm, because anything that uses the token stops working. To skip the prompt, for example in a script, pass `--yes`. With `--json`, the command revokes the token without asking.

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `id` | Yes | ID of the token to revoke |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--json` | Boolean | Output as JSON |
| `-y, --yes` | Boolean | Skip the confirmation prompt |

## Examples

### Create a token for CI/CD

```bash filename="terminal"
vercel tokens create "GitHub Actions deploy"
```

*Copy the plaintext value from the output and set it as \`VERCEL\_TOKEN\` in your
CI environment.*

### Scope a token to a single project

Authenticate the CLI with a token that is scoped to the team that owns the project (see [`create`](#create)), then pass the project ID:

```bash filename="terminal"
vercel tokens create "Preview deploy bot" --project prj_abc123
```

*The resulting token can only act on \`prj\_abc123\`. This narrows blast radius
if the token leaks.*

### List tokens as JSON

```bash filename="terminal"
vercel tokens list --json
```

*Useful for scripts that need to inspect or reconcile tokens.*

### Revoke a token

```bash filename="terminal"
vercel tokens revoke tok_abc123
```

*Revoke a token by ID.*

## Related

- [Account tokens](/account/tokens) (Vercel Dashboard)
- [`--token` global option](/docs/cli/global-options#token)
- [Using Vercel CLI for custom workflows](/kb/guide/using-vercel-cli-for-custom-workflows)

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel tokens` command:

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
