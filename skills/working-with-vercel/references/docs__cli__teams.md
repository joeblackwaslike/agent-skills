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
  - /docs/cli/global-options
summary: Learn how to list, create, switch, invite, and manage your teams with the vercel teams CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/teams.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "9dd9f83484ecee3f5cf138cafd5828db9e8a0676aac76327f2085d182e31443f"
---

# vercel teams

The `vercel teams` command manages [Teams](/docs/accounts#creating-a-team): list teams you belong to, create a new team, switch between teams, invite [Team Members](/docs/rbac/managing-team-members), inspect SAML/SSO configuration, list or remove members, and check team join-request status.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel organizations](https://vercel.com/docs/cli/organizations) — Create and manage organizations and their child teams with the vercel organizations CLI command.
- [vercel switch](https://vercel.com/docs/cli/switch) — Learn how to switch between different team scopes using the vercel switch CLI command.
- [List team members](https://vercel.com/docs/rest-api/teams/list-team-members) — GET /v3/teams/{teamId}/members — Get a paginated list of team members for the provided team.
- [List Organization Teams](https://vercel.com/docs/rest-api/organizations/list-organization-teams) — GET /v1/organizations/{organizationId}/teams — List up to 100 teams in an organization, each enriched with the team's sl
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.

Full cross-link map for this page: [/docs/cli/teams.graph.md](/docs/cli/teams.graph.md)
<!-- /docsgraph:related -->

`vercel switch` is a top-level alias for `vercel teams switch`.

> **💡 Note:** You can manage Teams with further options and greater control from the Vercel
> Dashboard.

## Usage

```bash filename="terminal"
vercel teams list
```

*Using the \`vercel teams\` command to list all teams you're a member of.*

## Subcommands

### `list`

List all teams you're a member of.

```bash filename="terminal"
vercel teams list [options]
```

#### Options

| Option    | Description                                                                    |
| --------- | ------------------------------------------------------------------------------ |
| `--next`  | Show the next page of results. Pass the cursor that the previous page prints.  |
| `--limit` | Number of teams to return per page. The default is 20, and the maximum is 100. |
| `--json`  | Output the result as JSON.                                                     |

#### Examples

Show the next page, using the cursor that the previous page prints:

```bash filename="terminal"
vercel teams list --next 1584722256178
```

### `create`

Create a new team. The interactive flow prompts for slug and display name; in non-interactive mode you must pass both `--slug` and `--name`.

```bash filename="terminal"
vercel teams create [options]
```

#### Options

| Option   | Description                                                                                          |
| -------- | ---------------------------------------------------------------------------------------------------- |
| `--slug` | Team URL slug (for example, `acme` for `vercel.com/acme`). Required in non-interactive mode.         |
| `--name` | Display name for the team. Required in non-interactive mode.                                         |

#### Examples

Create a team interactively:

```bash filename="terminal"
vercel teams create
```

Create a team non-interactively:

```bash filename="terminal"
vercel teams create --slug acme --name "Acme Corp"
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

Show the join-request status for the current team. Defaults to the authenticated user; pass a user ID to check another user's request.

```bash filename="terminal"
vercel teams request [userId] [options]
```

#### Options

| Option   | Description                |
| -------- | -------------------------- |
| `--json` | Output the result as JSON. |

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

| Option   | Description                |
| -------- | -------------------------- |
| `--json` | Output the result as JSON. |

#### Examples

Human-readable SAML summary:

```bash filename="terminal"
vercel teams sso
```

JSON output:

```bash filename="terminal"
vercel teams sso --json
```

### `members`

List the members of the currently scoped team, or remove a member from it. To invite a member, use [`invite`](#invite).

```bash filename="terminal"
vercel teams members [options]
vercel teams members remove <member>
```

To remove a member, pass their email, username, or user ID. The command shows the team and the member, then asks you to confirm. No option skips this prompt, so run the command in an interactive terminal. If the team's invoices go to that member, the command first asks you for a new invoice recipient.

#### Options

| Option    | Description                                                                      |
| --------- | -------------------------------------------------------------------------------- |
| `--next`  | Show the next page of results. Pass the cursor that the previous page prints.    |
| `--limit` | Number of members to return per page. The default is 20, and the maximum is 100. |
| `--json`  | Output the result as JSON.                                                       |

#### Examples

```bash filename="terminal"
# List team members
vercel teams members

# List team members as JSON
vercel teams members --json

# Paginate results
vercel teams members --next 1584722256178

# Remove a member
vercel teams members remove user@example.com
```

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel teams` command:

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
