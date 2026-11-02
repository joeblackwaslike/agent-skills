---
title: vercel organizations
product: vercel
url: /docs/cli/organizations
canonical_url: "https://vercel.com/docs/cli/organizations"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/organizations
  - /docs/cli/teams
  - /docs/cli/global-options
summary: Create and manage organizations and their child teams with the vercel organizations CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/organizations.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "be05bad2da1245c7452ee9f318065bdff1925d00704a6632de89107f537d8f70"
---

# vercel organizations

Use the `vercel organizations` command to create and manage [organizations](/docs/organizations) from the terminal. An organization groups several Vercel teams under one billing team, and the billing team pays for every team in the organization.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel domains](https://vercel.com/docs/cli/domains) — Learn how to buy, sell, transfer, and manage your domains using the vercel domains CLI command.
- [vercel budgets](https://vercel.com/docs/cli/budgets) — View and manage your team's on-demand spend budget from the Vercel CLI.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [Create or Add Team to Organization](https://vercel.com/docs/rest-api/organizations/create-or-add-team-to-organization) — POST /v1/organizations/{organizationId}/teams — Create a new team under an organization, or add an existing team. \\`mode

Full cross-link map for this page: [/docs/cli/organizations.graph.md](/docs/cli/organizations.graph.md)
<!-- /docsgraph:related -->

> Organizations are available in Private Beta to Enterprise plans with Flexible Commitment (Flex) billing. Contact your account team to request access.

`vercel organization` is an alias for the same command. The command is available in `vercel@65.2.0` and later.

## Usage

```bash filename="terminal"
vercel organizations list
vercel organizations inspect acme
vercel organizations teams list acme
```

*Listing your organizations, showing the \`acme\` organization, and listing its
teams*

The `vercel organizations` command supports these subcommands:

- [`list`](#vercel-organizations-list): List the organizations you can view
- [`inspect`](#vercel-organizations-inspect): Show the details of an organization
- [`create`](#vercel-organizations-create): Create an organization from an existing team
- [`update`](#vercel-organizations-update): Change the slug of an organization
- [`teams list`](#vercel-organizations-teams-list): List the teams in an organization
- [`teams create`](#vercel-organizations-teams-create): Create a child team in an organization
- [`teams add`](#vercel-organizations-teams-add): Add an existing team to an organization

## Select an organization

Every subcommand except `list` and `create` acts on one organization. Pass the organization ID, which starts with `org_`, or the organization slug as the first argument. A slug matches the organizations that `vercel organizations list` shows. For any other organization, pass its ID.

```bash filename="terminal"
vercel organizations inspect org_aBcD1234EfGh5678IjKl9012
vercel organizations inspect acme
```

*Selecting an organization by ID or by slug*

When you omit the organization, the command uses the organization of the active team. Select the active team with the global `--scope` option. The billing team and every child team select the same organization.

```bash filename="terminal"
vercel --scope acme-web organizations inspect
```

*Selecting the organization of the \`acme-web\` team*

## vercel organizations list

Use `vercel organizations list` to list the organizations you can view. The `ls` alias runs the same command.

```bash filename="terminal"
vercel organizations list
```

*Listing the organizations you can view*

The command prints a table with the ID, slug, billing team, and number of teams of each organization.

When more organizations exist than `--limit` allows, the command prints the `vercel organizations list --next` command that shows the next page.

### Options

| Option    | Required | Description                                                                               |
| --------- | -------- | ----------------------------------------------------------------------------------------- |
| `--limit` | No       | Shorthand `-n`. The number of organizations to return, between 1 and 100. Defaults to 20. |
| `--next`  | No       | Show the next page of results. Pass the cursor from the previous page.                    |
| `--json`  | No       | Print the organizations and the next-page cursor as JSON.                                 |

## vercel organizations inspect

Use `vercel organizations inspect` to show the details of an organization, including its billing team and its number of teams.

```bash filename="terminal"
vercel organizations inspect acme
```

*Showing the details of the \`acme\` organization*

### Options

| Option   | Required | Description                     |
| -------- | -------- | ------------------------------- |
| `--json` | No       | Print the organization as JSON. |

## vercel organizations create

Use `vercel organizations create` to create an organization from the active team. The active team becomes the billing team of the organization, and you become the owner of the organization. The billing team must be an Enterprise team with Flexible Commitment (Flex) billing.

```bash filename="terminal"
vercel --scope acme organizations create --slug acme --name "Acme Inc"
```

*Creating the \`acme\` organization from the \`acme\` team*

The organization exists when the command returns. Vercel then moves the projects of the billing team to the organization in the background.

### Options

| Option   | Required | Description                                                                                                                 |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `--slug` | Yes      | The slug of the organization: 1 to 48 lowercase letters, numbers, or hyphens, beginning and ending with a letter or number. |
| `--name` | No       | The display name of the organization. If you omit it, Vercel generates one from the slug.                                   |
| `--json` | No       | Print the new organization as JSON.                                                                                         |

## vercel organizations update

Use `vercel organizations update` to change the slug of an organization.

```bash filename="terminal"
vercel organizations update org_aBcD1234EfGh5678IjKl9012 --slug acme-corp
```

*Changing the slug of an organization to \`acme-corp\`*

### Options

| Option   | Required | Description                                                                                                                     |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `--slug` | Yes      | The new slug of the organization: 1 to 48 lowercase letters, numbers, or hyphens, beginning and ending with a letter or number. |
| `--json` | No       | Print the updated organization as JSON.                                                                                         |

## vercel organizations teams list

Use `vercel organizations teams list` to list the teams in an organization, including the billing team. The `teams` subcommand also has the `team` alias, and `list` has the `ls` alias.

```bash filename="terminal"
$ vercel organizations teams list acme
ID                     Slug       Name       Billing Plan
team_aBcD1234EfGh5678  acme       Acme Inc   -
team_UvWx9012YzAb3456  acme-web   Acme Web   platform
team_CdEf3456GhIj7890  acme-docs  Acme Docs  enterprise
```

*Listing the teams in the \`acme\` organization*

The **Billing Plan** column shows how Vercel bills each child team. The billing team has no billing plan in the organization, so its column shows `-`.

### Options

| Option    | Required | Description                                                                       |
| --------- | -------- | --------------------------------------------------------------------------------- |
| `--limit` | No       | Shorthand `-n`. The number of teams to return, between 1 and 100. Defaults to 20. |
| `--next`  | No       | Show the next page of results. Pass the cursor from the previous page.            |
| `--json`  | No       | Print the teams and the next-page cursor as JSON.                                 |

## vercel organizations teams create

Use `vercel organizations teams create` to create a new child team in an organization. You become an owner of the new team, and the billing team of the organization pays for its usage.

Before the command creates the team, it shows the team, its billing plan, and the billing change, then asks you to confirm.

```bash filename="terminal"
vercel organizations teams create acme --slug acme-web --name "Acme Web"
```

*Creating the \`acme-web\` child team in the \`acme\` organization*

The `--billing-plan` option sets how Vercel bills the new team:

- `platform`: The default. Vercel adds the team's usage to the organization at the end of the team's billing cycle. Use it for a team for each tenant of a multi-tenant platform.
- `enterprise`: The team draws down the Flex commitment of the organization in real time. Use it for an internal team that needs Enterprise features.

For more detail, see [Choosing a billing plan for a child team](/docs/organizations#choosing-a-billing-plan-for-a-child-team).

To run the command in CI, from an AI agent, or with `--json`, pass `--yes` after a person approves the billing change.

```bash filename="terminal"
vercel organizations teams create acme --slug acme-docs --name "Acme Docs" --billing-plan enterprise --yes
```

*Creating an \`enterprise\` child team without a confirmation prompt*

### Options

| Option           | Required | Description                                                                                                             |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `--slug`         | Yes      | The slug of the new team: 1 to 48 lowercase letters, numbers, or hyphens, beginning and ending with a letter or number. |
| `--name`         | Yes      | The display name of the new team.                                                                                       |
| `--billing-plan` | No       | The billing plan of the new team: `platform` or `enterprise`. Defaults to `platform`.                                   |
| `--yes`          | No       | Shorthand `-y`. Confirm the billing change without a prompt.                                                            |
| `--json`         | No       | Print the new organization team as JSON.                                                                                |

## vercel organizations teams add

Use `vercel organizations teams add` to move an existing team into an organization. Select the team with `--child-team` and its team ID or slug. You must be an owner of the team that you add. After the move, the billing team of the organization pays for the team's usage.

Before the command adds the team, it shows the team, its billing plan, and the billing change, then asks you to confirm.

```bash filename="terminal"
vercel organizations teams add acme --child-team acme-web
```

*Adding the existing \`acme-web\` team to the \`acme\` organization*

If you omit `--billing-plan`, Vercel derives the billing plan from the team's current plan. To add a team that is already on the Enterprise plan, contact your account team. For the rules that decide which teams you can add, see [Adding an existing team to an organization](/docs/organizations#adding-an-existing-team-to-an-organization).

The team joins the organization when the command returns. Vercel then moves the team's projects to the organization in the background. To run the command in CI, from an AI agent, or with `--json`, pass `--yes` after a person approves the billing change.

### Options

| Option           | Required | Description                                                                                                        |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `--child-team`   | Yes      | The team ID or slug of the existing team to add.                                                                   |
| `--billing-plan` | No       | The billing plan of the team: `platform` or `enterprise`. Defaults to a plan derived from the team's current plan. |
| `--yes`          | No       | Shorthand `-y`. Confirm the billing change without a prompt.                                                       |
| `--json`         | No       | Print the organization team as JSON.                                                                               |

## Use the command in scripts

With `--json`, each subcommand prints one JSON document to stdout. The document holds the result under the name of the resource, such as `organization`, `organizations`, `team`, or `teams`. A list also includes `pagination.next`, the cursor for the next page or `null` on the last page. A change also includes `outcome`, which is `created`, `updated`, or `added`.

```bash filename="terminal"
$ vercel organizations inspect acme --json
{
  "organization": {
    "organizationId": "org_aBcD1234EfGh5678IjKl9012",
    "slug": "acme",
    "name": "Acme Inc",
    "avatar": null,
    "teamId": "team_aBcD1234EfGh5678",
    "teamCount": 3,
    "createdAt": "2026-06-01T12:00:00.000Z",
    "updatedAt": "2026-06-01T12:00:00.000Z"
  }
}
```

*Printing an organization as JSON*

In the `organization` object, `teamId` is the ID of the billing team.

Without `--json`, the `create`, `update`, `teams create`, and `teams add` subcommands print the slug of the changed organization or team to stdout when stdout isn't a terminal. Use this output to pass the slug to the next command.

```bash filename="terminal"
team=$(vercel organizations teams create acme --slug acme-web --name "Acme Web" --yes)
vercel --scope "$team" project ls
```

*Creating a child team and listing its projects in a script*

## Related resources

- [Organizations](/docs/organizations)
- [Choosing a billing plan for a child team](/docs/organizations#choosing-a-billing-plan-for-a-child-team)
- [`vercel teams`](/docs/cli/teams)

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel organizations` command:

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
