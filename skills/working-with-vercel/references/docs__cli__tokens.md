---
title: vercel tokens
product: vercel
url: /docs/cli/tokens
canonical_url: "https://vercel.com/docs/cli/tokens"
last_updated: 2026-06-09
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: "Manage your personal Vercel authentication tokens from the CLI: list, create, and remove access tokens for use with the Vercel API and Vercel CLI."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/tokens.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "2fbcd90df8c5b13d2aae613533f26fc2b46ff1fa7501e425c27c366b4fd4a285"
---

# vercel tokens

The `vercel tokens` command manages your personal authentication tokens. Tokens authenticate Vercel CLI commands and Vercel REST API requests on your behalf. They are scoped to your user account, and optionally to a single project. Use this command to list existing tokens, create new ones for scripts and CI environments, and revoke tokens you no longer need.

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

### list (ls)

Lists your personal authentication tokens. This is the default subcommand, so `vercel tokens` and `vercel tokens list` are equivalent.

```bash filename="terminal"
vercel tokens
vercel tokens list
vercel tokens ls --format json
```

*List your tokens. Use \`--format json\` for machine-readable output.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-F, --format <FORMAT>` | String | Output format (`json`) |
| `--limit <NUMBER>` | Number | Maximum number of tokens to return (default 20, range 1-100) |

### add (create)

Creates a new personal authentication token with the given name. The plaintext token is printed to stdout; capture it before it scrolls away.

```bash filename="terminal"
vercel tokens add "CI deploy"
```

*Create a new token named \`CI deploy\`. The plaintext value is printed once.*

> **💡 Note:** Creating tokens with this command requires a **classic personal access
> token** with account-level scope. OAuth sessions created by `vercel login`
> cannot mint new tokens, and team-only or project-only tokens (some `vcp_…`
> values) will also be rejected. If you don't already have a classic token,
> create one from the [Account Tokens
> page](/account/tokens) in the dashboard, then set `VERCEL_TOKEN` (or pass
> `--token`) to that value and re-run the command.

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `name` | Yes | Display name for the token (helps you identify it later) |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-F, --format <FORMAT>` | String | Output format (`json`) |
| `--project <PROJECT_ID>` | String | Optional project ID to scope the token to a single project. The CLI forwards this value directly to the API; project names are not resolved. |

### remove (rm, delete)

Removes a personal authentication token by ID. Use `vercel tokens list` first to find the token ID.

```bash filename="terminal"
vercel tokens rm tok_abc123
```

*Revoke the token with ID \`tok\_abc123\`.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `id` | Yes | ID of the token to remove |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

## Examples

### Create a token for CI/CD

```bash filename="terminal"
vercel tokens add "GitHub Actions deploy"
```

*Capture the plaintext value from stdout and set it as \`VERCEL\_TOKEN\` in your
CI environment.*

### Scope a token to a single project

```bash filename="terminal"
vercel tokens add "Preview deploy bot" --project prj_abc123
```

*The resulting token can only act on \`prj\_abc123\`. This narrows blast radius
if the token leaks.*

### List tokens as JSON

```bash filename="terminal"
vercel tokens ls --format json
```

*Useful for scripts that need to inspect or reconcile tokens.*

### Revoke a token

```bash filename="terminal"
vercel tokens rm tok_abc123
```

*Remove a token by ID.*

## Related

- [Account tokens](/account/tokens) (Vercel Dashboard)
- [`--token` global option](/docs/cli/global-options#token)
- [Using Vercel CLI for custom workflows](/kb/guide/using-vercel-cli-for-custom-workflows)


---

[View full sitemap](/docs/sitemap)
