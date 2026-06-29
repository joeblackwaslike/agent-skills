---
title: vercel teams
product: vercel
url: /docs/cli/teams
canonical_url: "https://vercel.com/docs/cli/teams"
last_updated: 2026-06-06
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/accounts/create-a-team
  - /docs/rbac/managing-team-members
summary: Learn how to list, add, switch, invite, and manage your teams with the vercel teams CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/teams.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "e232f92567fad88aa4376ae5f2509db8bf3433cffb21607fac8451b160f98154"
---

# vercel teams

The `vercel teams` command manages [Teams](/docs/accounts/create-a-team): list teams you belong to, create a new team, switch between teams, invite [Team Members](/docs/rbac/managing-team-members), inspect SAML/SSO configuration, list members, and check team join-request status.

`vercel team` is an alias for the same command, and `vercel switch` is a top-level alias for `vercel teams switch`.

> **💡 Note:** You can manage Teams with further options and greater control from the Vercel
> Dashboard.

## Usage

```bash filename="terminal"
vercel teams list
```

*Using the \`vercel teams\` command to list all teams you're a member of.*

## Subcommands

### `list`

Aliases: `ls`.

List all teams you're a member of.

```bash filename="terminal"
vercel teams list [options]
```

#### Options

| Option       | Description                                                                          |
| ------------ | ------------------------------------------------------------------------------------ |
| `-N, --next` | Show the next page of results. Pass the timestamp (ms since the UNIX epoch) cursor. |
| `--format`   | Output format. Supports `json`.                                                      |

#### Examples

Paginate results (the value is the cursor in milliseconds since the UNIX epoch):

```bash filename="terminal"
vercel teams ls --next 1584722256178
```

### `add`

Aliases: `create`.

Create a new team. The interactive flow prompts for slug and display name; in non-interactive mode you must pass both `--slug` and `--name`.

```bash filename="terminal"
vercel teams add [options]
```

#### Options

| Option   | Description                                                                                          |
| -------- | ---------------------------------------------------------------------------------------------------- |
| `--slug` | Team URL slug (for example, `acme` for `vercel.com/acme`). Required in non-interactive mode.         |
| `--name` | Display name for the team. Required in non-interactive mode.                                         |

#### Examples

Create a team interactively:

```bash filename="terminal"
vercel teams add
```

Create a team non-interactively:

```bash filename="terminal"
vercel teams add --slug acme --name "Acme Corp"
```

### `invite`

Invite one or more new members to the current team. In non-interactive mode you must pass at least one email address.

```bash filename="terminal"
vercel teams invite [email...]
```

#### Examples

Invite interactively:

```bash filename="terminal"
vercel teams invite
```

Invite multiple members (required form in non-interactive mode):

```bash filename="terminal"
vercel teams invite abc@vercel.com xyz@vercel.com
```

### `switch`

Aliases: `change`.

Switch your CLI context to a different team. If the slug is omitted, the command is interactive. Available as the top-level alias `vercel switch`.

`switch` does not accept the global `--token` flag; use the global `--scope` flag if you need to override scope for a single command.

```bash filename="terminal"
vercel teams switch [slug]
```

#### Examples

Switch to a team by slug (if your team's URL is `vercel.com/name`, then `name` is the slug):

```bash filename="terminal"
vercel teams switch acme
```

Switch interactively:

```bash filename="terminal"
vercel teams switch
```

### `request`

Aliases: `access-request`.

Show the join-request status for the current team. Defaults to the authenticated user; pass a user ID to check another user's request.

```bash filename="terminal"
vercel teams request [userId] [options]
```

#### Options

| Option     | Description                     |
| ---------- | ------------------------------- |
| `--format` | Output format. Supports `json`. |

#### Examples

Status for your pending request:

```bash filename="terminal"
vercel teams request
```

Status for another user ID:

```bash filename="terminal"
vercel teams request user_abc123
```

### `sso`

Show the SAML/SSO configuration for the currently scoped team.

```bash filename="terminal"
vercel teams sso [options]
```

#### Options

| Option     | Description                     |
| ---------- | ------------------------------- |
| `--format` | Output format. Supports `json`. |

#### Examples

Human-readable SAML summary:

```bash filename="terminal"
vercel teams sso
```

JSON output:

```bash filename="terminal"
vercel teams sso --format json
```

### `members`

Aliases: `member`.

List members for the currently scoped team.

```bash filename="terminal"
vercel teams members [options]
```

#### Options

| Option       | Description                                                                          |
| ------------ | ------------------------------------------------------------------------------------ |
| `-N, --next` | Show the next page of results. Pass the timestamp (ms since the UNIX epoch) cursor. |
| `--format`   | Output format. Supports `json`.                                                      |

#### Examples

```bash filename="terminal"
# List team members
vercel teams members

# List team members as JSON
vercel teams members --format json

# Paginate results
vercel teams members --next 1584722256178
```


---

[View full sitemap](/docs/sitemap)
