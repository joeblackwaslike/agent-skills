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
  []
summary: "Register Vercel Apps (OAuth) and manage team installations from the CLI: register new apps, list and dismiss installation requests, install apps to a..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/oauth-apps.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ae7f0683de44c6be9921f7099614412dca689efd2624525d177f3882663bc7f2"
---

# vercel oauth-apps

The `vercel oauth-apps` command registers Vercel Apps (OAuth) and manages team installations. Use it to register a new OAuth client, review pending installation requests for your team, install a Vercel App with the right permissions, and uninstall apps you no longer need.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel api](https://vercel.com/docs/cli/api?from=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel teams](https://vercel.com/docs/cli/teams?from=related) — Learn how to list, add, switch, invite, and manage your teams with the vercel teams CLI command.
- [vercel project](https://vercel.com/docs/cli/project?from=related) — Perform the following commands from the terminal for your Vercel Projects: list, add, inspect, update settings, rename,
- [vercel tokens](https://vercel.com/docs/cli/tokens?from=related) — Manage your personal Vercel authentication tokens from the CLI: list, create, and remove access tokens for use with the
- [Manage from Dashboard](https://vercel.com/docs/sign-in-with-vercel/manage-from-dashboard?from=related) — Learn how to manage Sign in with Vercel from the Dashboard

Full cross-link map for this page: [/docs/cli/oauth-apps.graph.md](/docs/cli/oauth-apps.graph.md)
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


---

[View full sitemap](/docs/sitemap)
