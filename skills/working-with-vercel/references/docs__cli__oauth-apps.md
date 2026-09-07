---
title: vercel oauth-apps
product: vercel
url: /docs/cli/oauth-apps
canonical_url: "https://vercel.com/docs/cli/oauth-apps"
last_updated: 2026-06-09
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: "Register Vercel Apps (OAuth) and manage team installations from the CLI: register new apps, list and dismiss installation requests, install apps to a..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/oauth-apps.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "f68800c16e86f0ea97a6017c60ebffe28a4bb7563de73b9c0fd74ea4f6e33884"
---

# vercel oauth-apps

The `vercel oauth-apps` command registers Vercel Apps (OAuth) and manages team installations. Use it to register a new OAuth client, review pending installation requests for your team, install a Vercel App with the right permissions, and uninstall apps you no longer need.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel api](https://vercel.com/docs/cli/api?from=related&source_path=%2Fdocs%2Fcli%2Foauth-apps&source_site=vercel-docs&relationship=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel teams](https://vercel.com/docs/cli/teams?from=related&source_path=%2Fdocs%2Fcli%2Foauth-apps&source_site=vercel-docs&relationship=related) — Learn how to list, add, switch, invite, and manage your teams with the vercel teams CLI command.
- [vercel tokens](https://vercel.com/docs/cli/tokens?from=related&source_path=%2Fdocs%2Fcli%2Foauth-apps&source_site=vercel-docs&relationship=related) — Manage your personal Vercel authentication tokens from the CLI: list, create, and remove access tokens for use with the
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Foauth-apps&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel buy](https://vercel.com/docs/cli/buy?from=related&source_path=%2Fdocs%2Fcli%2Foauth-apps&source_site=vercel-docs&relationship=related) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.

Full cross-link map for this page: [/docs/cli/oauth-apps.graph.md](/docs/cli/oauth-apps.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Foauth-apps&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** These subcommands act on team-scoped resources. Make sure your current scope
> is the correct team before running mutations, or pass `--scope <team>`.

## Usage

```bash filename="terminal"
vercel oauth-apps [subcommand]
```

*Using the \`vercel oauth-apps\` command to manage Vercel Apps (OAuth) and team
installations.*

## Commands

### list-requests (requests)

Lists pending Vercel App installation requests for the current team.

```bash filename="terminal"
vercel oauth-apps list-requests
vercel oauth-apps list-requests --format json
```

*List pending installation requests. Use \`--format json\` for scripting.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

### register (create)

Registers a new Vercel App for the current team. The response includes a `clientId` you'll need when calling `install`.

```bash filename="terminal"
vercel oauth-apps register --name "My App" --slug my-app --redirect-uri https://app.example.com/oauth/callback
```

*Register a new Vercel App with a display name, slug, and one or more
allowed redirect URIs.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--name <NAME>` | String | Display name of the app (required) |
| `--slug <SLUG>` | String | URL-safe unique identifier (required) |
| `--redirect-uri <URL>` | String\[] | Allowed OAuth redirect URI (repeatable) |
| `--description <TEXT>` | String | Optional description shown to users |
| `-F, --format <FORMAT>` | String | Output format (`json`, includes `clientId`) |

### install (add)

Installs a Vercel App to the current team using the app's OAuth client ID. Grants the listed permissions and optionally restricts the install to a subset of projects.

```bash filename="terminal"
vercel oauth-apps install --client-id cl_abc --permission read:project --permission read:deployment
```

*Install an app with explicit permission scopes.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--client-id <ID>` | String | OAuth client ID of the Vercel App (required) |
| `--permission <SCOPE>` | String\[] | Permission scope to grant (required, repeatable). Pass at least one; example: `--permission read:project` |
| `--projects <IDS>` | String | Comma-separated project IDs, or `*` for all projects (optional) |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

### dismiss

Dismisses a pending app installation request by its client ID.

```bash filename="terminal"
vercel oauth-apps dismiss cl_abc123 --yes
```

*Decline a pending installation request. Use \`--yes\` to skip the confirmation
prompt.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `appId` | Yes | Client ID of the app whose installation request you want to dismiss |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-F, --format <FORMAT>` | String | Output format (`json`) |
| `-y, --yes` | Boolean | Skip the confirmation prompt |

### remove (rm, uninstall)

Uninstalls a Vercel App from the current team by its installation ID.

```bash filename="terminal"
vercel oauth-apps remove inst_abc123 --yes
```

*Uninstall an app from the team.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `installationId` | Yes | ID of the installation to remove |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-F, --format <FORMAT>` | String | Output format (`json`) |
| `-y, --yes` | Boolean | Skip the confirmation prompt |

## Examples

### Register an app, then install it scoped to specific projects

```bash filename="terminal"
vercel oauth-apps register --name "My App" --slug my-app --redirect-uri https://app.example.com/oauth/callback --format json
vercel oauth-apps install --client-id cl_xyz --permission read:project --projects prj_a,prj_b
```

*Capture the \`clientId\` from the register response, then install the app with
scoped permissions and a project allowlist.*

### Dismiss a pending installation request

```bash filename="terminal"
vercel oauth-apps list-requests
vercel oauth-apps dismiss cl_abc123 --yes
```

*List pending requests, then dismiss the unwanted one by ID.*

### Uninstall an app

```bash filename="terminal"
vercel oauth-apps remove inst_abc123 --yes
```

*Remove an installation by its installation ID.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel oauth-apps` command:

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
