---
title: vercel connect
product: vercel
url: /docs/cli/connect
canonical_url: "https://vercel.com/docs/cli/connect"
last_updated: 2026-06-09
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/connect
  - /docs/connect/quickstart
summary: Learn how to manage Vercel Connect connectors using the vercel connect CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/connect.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "1b1957734e4868466d8398ec73aee36c50a6394d35369ad151b92521a0e47a56"
---

# vercel connect

> **⚠️ Warning:** The `vercel connect` command is currently in beta. Features and behavior may
> change.

The `vercel connect` command manages [Vercel Connect](/docs/connect) connectors. Use it to create connectors, attach them to projects, request runtime tokens, and remove them.

It supports the following subcommands:

- [`create`](#vercel-connect-create): Create a new connector
- [`list`](#vercel-connect-list): List connectors for your team or project
- [`token`](#vercel-connect-token): Get a runtime token from a connector
- [`attach`](#vercel-connect-attach): Attach a project to a connector
- [`detach`](#vercel-connect-detach): Detach a project from a connector
- [`update`](#vercel-connect-update): Update connector branding
- [`remove`](#vercel-connect-remove): Delete a connector
- [`open`](#vercel-connect-open): Open a connector in the Vercel dashboard

Connectors are identified by their ID (for example, `scl_abc123`) or their UID (for example, `slack/my-bot`).

## vercel connect create

Creates a new connector for a service.

```bash filename="terminal"
vercel connect create <service>
```

*Create a new connector for the given service.*

Pass a service name such as `slack` or `github`, or a service URL such as `mcp.linear.app`. Vercel attempts to set up the connection automatically, and opens your browser for any steps that require manual inputs.

```bash filename="terminal"
vercel connect create slack --name acme-slack
```

*Create a Slack connector named \`acme-slack\`.*

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--name <NAME>` | `-n` | Name for the connector. |
| `--triggers` | | Enable webhook trigger forwarding for this connector. |
| `--icon <PATH>` | | Path to a PNG or JPEG image to use as the connector icon. |
| `--background-color <HEX>` | | Background color for the connector icon (for example, `#1A2B3C`). |
| `--accent-color <HEX>` | | Accent color for the connector icon (for example, `#FF0066`). |
| `--format <FORMAT>` | `-F` | Specify the output format (`json`). |

### Examples

```bash filename="terminal"
vercel connect create slack
vercel connect create slack --name my-bot --triggers
vercel connect create github --name acme-github
vercel connect create mcp.linear.app --name linear-connector
vercel connect create slack --name my-bot --icon ./logo.png --background-color '#1A2B3C'
vercel connect create slack --format=json
```

## vercel connect list

Lists connectors for your team or project, with optional filtering by type, service, or search text. Also available as `vercel connect ls`.

```bash filename="terminal"
vercel connect list
```

*List connectors linked to the current project.*

By default, only connectors linked to the currently linked project are shown. Use `--all-projects` to list every connector in the team.

```bash filename="terminal"
vercel connect list --all-projects
```

*List every connector in the team regardless of project link.*

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--all-projects` | | List every connector in the team, regardless of project link. |
| `--type <TYPE>` | | Filter by connector type (`slack`, `github`, `oauth`, `custom`). Repeatable. |
| `--service <NAME>` | | Filter by service name (for example, `slack`, `mcp.linear.app`). Repeatable. |
| `--search <TEXT>` | | Search connectors by name or UID. |
| `--limit <COUNT>` | | Number of connectors to return per page. |
| `--next <CURSOR>` | | Cursor for the next page of results. |
| `--format <FORMAT>` | `-F` | Specify the output format (`json`). |

### Examples

```bash filename="terminal"
vercel connect list --all-projects
vercel connect list --type slack
vercel connect list --type oauth --type github
vercel connect list --service mcp.linear.app
vercel connect list --search prod
vercel connect list --limit 10
vercel connect list --format=json
```

## vercel connect token

Requests a runtime token from a connector. Plain output is the raw token value, suitable for `TOKEN=$(vercel connect token ...)`.

```bash filename="terminal"
vercel connect token <connector>
```

*Get a user token for the given connector.*

By default the command requests a user token (acting on behalf of you). Use `--subject app` to request an app token using the connector's default installation.

```bash filename="terminal"
vercel connect token slack/my-bot --subject app
```

*Get an app token using the connector's default installation.*

If authorization or installation is required and the session is interactive, the CLI opens your browser and polls for the result. Pass `--yes` to allow this in non-interactive contexts.

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--subject <TYPE>` | `-s` | Subject type: `user` (default) or `app`. |
| `--installation-id <ID>` | | Target a specific installation. Only applies with `--subject app`. |
| `--scopes <SCOPES>` | | Scopes for the token request. Comma- or space-separated. |
| `--yes` | `-y` | Allow opening the browser automatically if authorization or installation is required. |
| `--format <FORMAT>` | `-F` | Specify the output format (`json`). JSON output includes `expiresAt`, `installationId`, and other fields. |

### Examples

```bash filename="terminal"
vercel connect token scl_abc123
vercel connect token slack/my-bot
vercel connect token scl_abc123 --subject app
vercel connect token scl_abc123 --subject app --installation-id inst_1
vercel connect token scl_abc123 --scopes channels:read,chat:write
vercel connect token scl_abc123 --yes
vercel connect token scl_abc123 --format=json
```

## vercel connect attach

Attaches a Vercel project to a connector for one or more environments, so the project can request tokens from that connector at runtime.

```bash filename="terminal"
vercel connect attach <connector>
```

*Attach the currently linked project to a connector for all environments.*

```bash filename="terminal"
vercel connect attach scl_abc123 -e production -e preview
```

*Attach and restrict to specific environments.*

Use `--triggers` to also register the project as a trigger destination. When registered, the connector forwards verified incoming webhooks to the project. A connector can have up to three trigger destinations.

```bash filename="terminal"
vercel connect attach scl_abc123 --triggers
```

*Attach and register the project as a trigger destination.*

> **💡 Note:** Detaching a project (via `vercel connect detach`) removes the token-access
> link but does not remove the project from the connector's trigger
> destinations. Manage trigger destinations separately.

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--project <NAME_OR_ID>` | `-p` | Project name or ID. Defaults to the currently linked project. |
| `--environment <ENV>` | `-e` | Environments to enable: `production`, `preview`, `development`. Repeatable and comma-separated. Defaults to all environments. |
| `--triggers` | | Register this project as a trigger destination for incoming webhooks. |
| `--trigger-branch <BRANCH>` | | Git branch for the trigger destination. Defaults to production. Only valid with `--triggers`. |
| `--trigger-path <PATH>` | | Path on the project that receives forwarded webhooks. Defaults to `/{service}`. Only valid with `--triggers`. |
| `--yes` | `-y` | Skip the confirmation prompt. |
| `--format <FORMAT>` | `-F` | Specify the output format (`json`). |

### Examples

```bash filename="terminal"
vercel connect attach scl_abc123
vercel connect attach scl_abc123 -e production -e preview
vercel connect attach slack/my-bot --project my-app
vercel connect attach scl_abc123 --triggers
vercel connect attach scl_abc123 --triggers --trigger-branch staging --trigger-path /slack
vercel connect attach scl_abc123 --yes --format=json
```

## vercel connect detach

Detaches a Vercel project from a connector. The project can no longer request tokens from that connector.

```bash filename="terminal"
vercel connect detach <connector>
```

*Detach the currently linked project from a connector.*

```bash filename="terminal"
vercel connect detach slack/my-bot --project my-app
```

*Detach a specific project by name.*

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--project <NAME_OR_ID>` | `-p` | Project name or ID. Defaults to the currently linked project. |
| `--yes` | `-y` | Skip the confirmation prompt. |
| `--format <FORMAT>` | `-F` | Specify the output format (`json`). |

### Examples

```bash filename="terminal"
vercel connect detach scl_abc123
vercel connect detach slack/my-bot --project my-app
vercel connect detach scl_abc123 --yes --format=json
```

## vercel connect update

Updates connector branding: icon and colors.

```bash filename="terminal"
vercel connect update <connector>
```

*Update branding for the given connector.*

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--icon <PATH>` | | Path to a PNG or JPEG image to use as the connector icon. |
| `--background-color <HEX>` | | Background color for the connector icon (for example, `#1A2B3C`). |
| `--accent-color <HEX>` | | Accent color for the connector icon (for example, `#FF0066`). |
| `--format <FORMAT>` | `-F` | Specify the output format (`json`). |

### Examples

```bash filename="terminal"
vercel connect update scl_abc123 --icon ./logo.png
vercel connect update scl_abc123 --background-color '#1A2B3C' --accent-color '#FF0066'
vercel connect update scl_abc123 --icon ./logo.png --format=json
```

## vercel connect remove

Deletes a connector. By default the command prompts for confirmation. Also available as `vercel connect rm`.

```bash filename="terminal"
vercel connect remove <connector>
```

*Delete a connector by ID or UID.*

If the connector still has projects attached, the deletion fails unless you pass `--disconnect-all` to detach all projects first.

```bash filename="terminal"
vercel connect remove scl_abc123 --disconnect-all --yes
```

*Detach all projects from a connector and then delete it without prompting.*

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--disconnect-all` | `-a` | Disconnect all projects from the connector before deletion. |
| `--yes` | `-y` | Skip the confirmation prompt. |
| `--format <FORMAT>` | `-F` | Specify the output format (`json`). |

### Examples

```bash filename="terminal"
vercel connect remove scl_abc123
vercel connect remove slack/my-bot
vercel connect remove scl_abc123 --disconnect-all
vercel connect remove scl_abc123 --yes
vercel connect remove scl_abc123 --disconnect-all --yes --format=json
```

## vercel connect open

Opens a connector in the Vercel dashboard. With `--format=json`, prints the dashboard URL instead of opening a browser.

```bash filename="terminal"
vercel connect open <connector>
```

*Open a connector in the Vercel dashboard.*

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--format <FORMAT>` | `-F` | Specify the output format (`json`). |

### Examples

```bash filename="terminal"
vercel connect open scl_abc123
vercel connect open slack/my-bot
vercel connect open scl_abc123 --format=json
```

## Related

- [Vercel Connect overview](/docs/connect)
- [Quickstart with Vercel Connect](/docs/connect/quickstart)


---

[View full sitemap](/docs/sitemap)
