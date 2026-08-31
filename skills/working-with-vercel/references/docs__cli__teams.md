---
title: vercel teams
product: vercel
url: /docs/cli/teams
canonical_url: "https://vercel.com/docs/cli/teams"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/accounts
  - /docs/rbac/managing-team-members
summary: Learn how to list, add, switch, invite, and manage your teams with the vercel teams CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/teams.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "c9a989b648d6c6c87090ee8d175447250782b75a10fe9d68e9ca9df7476a1fc2"
---

# vercel teams

The `vercel teams` command manages [Teams](/docs/accounts#creating-a-team): list teams you belong to, create a new team, switch between teams, invite [Team Members](/docs/rbac/managing-team-members), inspect SAML/SSO configuration, list members, and check team join-request status.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List team members](https://vercel.com/docs/rest-api/teams/list-team-members?from=related&source_path=%2Fdocs%2Fcli%2Fteams&source_site=vercel-docs&relationship=related) — GET /v3/teams/{teamId}/members — Get a paginated list of team members for the provided team.
- [List all teams](https://vercel.com/docs/rest-api/teams/list-all-teams?from=related&source_path=%2Fdocs%2Fcli%2Fteams&source_site=vercel-docs&relationship=related) — GET /v2/teams — Get a paginated list of all the Teams the authenticated User is a member of.
- [vercel switch](https://vercel.com/docs/cli/switch?from=related&source_path=%2Fdocs%2Fcli%2Fteams&source_site=vercel-docs&relationship=related) — Learn how to switch between different team scopes using the vercel switch CLI command.
- [Join a team](https://vercel.com/docs/rest-api/teams/join-a-team?from=related&source_path=%2Fdocs%2Fcli%2Fteams&source_site=vercel-docs&relationship=related) — POST /v1/teams/{teamId}/members/teams/join — Join a team with a provided invite code or team ID.
- [Invite a user](https://vercel.com/docs/rest-api/teams/invite-a-user?from=related&source_path=%2Fdocs%2Fcli%2Fteams&source_site=vercel-docs&relationship=related) — POST /v2/teams/{teamId}/members — Invite a user to join the team specified in the URL. The authenticated user needs to b

Full cross-link map for this page: [/docs/cli/teams.graph.md](/docs/cli/teams.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fteams&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

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
