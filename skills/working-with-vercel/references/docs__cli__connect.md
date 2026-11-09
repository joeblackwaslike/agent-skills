---
title: vercel connect
product: vercel
url: /docs/cli/connect
canonical_url: "https://vercel.com/docs/cli/connect"
last_updated: 2026-10-02
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/connect
  - /docs/connect/concepts/connectors
  - /docs/connect/concepts/tokens
  - /docs/cli/login
  - /docs/cli/global-options
summary: Learn how to manage Vercel Connect connectors using the vercel connect CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/connect.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "7400e5b93d85c3e039a451de0fa63f5fc298c21d52bd6b08e5f2fcf8d008111e"
---

# vercel connect

The `vercel connect` command manages [Vercel Connect](/docs/connect) connectors. Use it to find services to connect to, create connectors, attach them to projects, request runtime tokens, and remove them.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect) — Authenticate Slack, Microsoft Teams, GitHub, Linear, Discord, Notion, and Telegram adapters with Vercel Connect, using s
- [Discover 1000+ services on Vercel Connect from the CLI](https://vercel.com/changelog/discover-1000-services-on-vercel-connect-from-the-cli)
- [Vercel Connect now supports CLI setup for 100+ connectors](https://vercel.com/changelog/vercel-cli-100-services)
- [Vercel Connect now supports Microsoft Teams](https://vercel.com/changelog/vercel-connect-microsoft-teams)
- [Vercel Connect now supports Linq](https://vercel.com/changelog/vercel-connect-now-supports-linq)
- [Vercel Connect now supports Microsoft](https://vercel.com/changelog/vercel-connect-supports-microsoft)
- [Build Claude Managed Agents with Chat SDK](https://vercel.com/kb/guide/claude-managed-agents-chat-sdk) — Ship a Slack research bot built on Claude Managed Agents and Chat SDK. One persistent session per thread, streamed brief
- [Build a daily digest bot with Chat SDK and Workflow SDK](https://vercel.com/kb/guide/daily-digest-bot-with-chat-sdk-and-workflow-sdk) — Build a daily digest bot that posts a daily digest of GitHub stats to Slack. Learn how to use Vercel Connect to set up S
- [Draft content in your voice from Slack with eve](https://vercel.com/kb/guide/eve-content-agent) — Deploy the eve content agent template, a Slack bot that drafts blog posts, LinkedIn posts, release notes, and newsletter
- [Build an incident response sre agent with eve](https://vercel.com/kb/guide/eve-incident-sre-agent) — sre is an incident response agent for Slack. It investigates production issues using a hypothesis-driven approach and re
- [Manage your Sanity project from Slack with eve](https://vercel.com/kb/guide/eve-sanity-copilot) — A Slack-based Sanity copilot built on eve. It queries and edits content with GROQ, shapes schemas, manages releases, and
- [vercel tokens](https://vercel.com/docs/cli/tokens) — Manage your personal Vercel authentication tokens from the CLI: list, create, and revoke access tokens for use with the

Full cross-link map for this page: [/docs/cli/connect.graph.md](/docs/cli/connect.graph.md)
<!-- /docsgraph:related -->

It supports the following subcommands:

- [`discover`](#vercel-connect-discover): Find services you can create a connector for
- [`create`](#vercel-connect-create): Create a new connector
- [`list`](#vercel-connect-list): List connectors for your team or project
- [`token`](#vercel-connect-token): Get a runtime token from a connector
- [`attach`](#vercel-connect-attach): Attach a project to a connector
- [`detach`](#vercel-connect-detach): Detach a project from a connector
- [`update`](#vercel-connect-update): Update connector branding
- [`delete`](#vercel-connect-delete): Delete a connector
- [`revoke-tokens`](#vercel-connect-revoke-tokens): Revoke tokens issued from a connector
- [`open`](#vercel-connect-open): Open a connector in the Vercel dashboard
- [`categories`](#vercel-connect-categories): List the categories services are grouped into
- [`contacts add`](#vercel-connect-contacts-add): Add a phone contact that a connector may message

Connectors are identified by their ID (for example, `scl_abc123`) or their UID (for example, `slack/my-bot`).

## vercel connect discover

Finds services you can create a connector for. Pass a query to search service names, aliases, keywords, and descriptions.

```bash filename="terminal"
vercel connect discover [query]
```

*List services, optionally filtered by a search query.*

```bash filename="terminal"
vercel connect discover crm
```

*Find services related to CRM.*

Each result shows the service name to pass to [`vercel connect create`](#vercel-connect-create), its display name, the connection methods it supports, and a short description.

The command returns 50 services by default. When more match, the output ends with a command that fetches the next page.

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--category <SLUG>` | | Filter by category. Repeatable. Run `vercel connect categories` for valid slugs. |
| `--connection-method <METHOD>` | | Filter by connection method (for example, `oauth`, `api-key`, `mcp`). Repeatable. |
| `--target <TARGET>` | | Filter by the product a service exposes (for example, `api`, `mcp`). Repeatable. |
| `--supports-triggers` | | Only show services that can forward webhook triggers. |
| `--limit <COUNT>` | `-n` | Number of services to return. Defaults to 50, maximum 500. |
| `--next <CURSOR>` | | Cursor for the next page of results. |
| `--json` | | Output as JSON. |

### Examples

```bash filename="terminal"
vercel connect discover
vercel connect discover crm
vercel connect discover --category ai --category data
vercel connect discover --connection-method mcp
vercel connect discover --supports-triggers
vercel connect discover --limit 100
vercel connect discover --next <cursor>
vercel connect discover --json
```

## vercel connect create

Creates a new connector for a service.

```bash filename="terminal"
vercel connect create <service>
```

*Create a new connector for the given service.*

Pass a service name such as `slack`, `notion`, or `okta`, or the URL of an OAuth or MCP server such as `mcp.linear.app`. Run [`vercel connect discover`](#vercel-connect-discover) to find a service's name.

```bash filename="terminal"
vercel connect create slack --name acme-slack
```

*Create a Slack connector named \`acme-slack\`.*

For a known service, the CLI reads the [connection methods](/docs/connect/concepts/connectors#connection-methods) that Vercel publishes for it and prompts you for what the connector needs, so you can finish setup in the terminal. It opens your browser only when the provider requires you to sign in or install an app.

Depending on the service, the CLI asks you for:

- **Product**: which part of the service to connect to, such as its API or its MCP server. You only see this when a service exposes more than one.
- **Connection method**: how to authenticate, such as `oauth` or `api-key`. Each method shows whether Vercel registers the application with the provider for you (`automatic registration`) or whether you supply your own credentials (`bring your own credentials`).
- **Setup values**: values the method needs to reach your account, such as an Okta domain.
- **Credentials**: a client ID, client secret, or API key, when the method needs them. The CLI masks secret values as you type them.

When a service publishes a single connection method, the CLI asks you to confirm it instead of showing a list. Pass `--yes` to skip that confirmation.

For a service that publishes no connection methods, such as an OAuth server URL that Vercel doesn't recognize, Vercel sets up what it can and opens your browser for the remaining steps.

### Seeing what a service supports

Run `--help` against a service to list its products, its connection methods, the credentials and setup values each method needs, and a runnable example for each:

```bash filename="terminal"
vercel connect create notion --help
```

*Describe how you can connect to Notion.*

### Creating without prompts

To create a connector from a script or in CI, pass your choices as flags. Use `--connection-method` to pick the method, `--target` to pick the product, `--param KEY=VALUE` for setup values, and `--data` for credentials:

```bash filename="terminal"
vercel connect create okta --connection-method custom-server \
  --param domain=acme.okta.com --param auth_server_id=default \
  --name okta --data @credentials.json
```

*Create an Okta connector with no prompts.*

Pass `--data @<path>` to read credentials from a file, or `--data @-` to read them from stdin. Inline `--data` values leak into your shell history and into process listings, so use a file or stdin for anything secret.

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--name <NAME>` | | Name for the connector. |
| `--connection-method <METHOD>` | | How to connect to the service (for example, `oauth`, `api-key`, `mcp`). Omit it to choose interactively. |
| `--target <TARGET>` | | Which of the service's products to connect to (for example, `api`, `mcp`). Only needed when a service exposes more than one. |
| `--param <KEY=VALUE>` | | Value for a setup field on the connection method (for example, `domain=acme.okta.com`). Repeatable. |
| `--data <JSON>` | | JSON object of credentials and configuration for the connector. Pass `@<path>` to read from a file or `@-` to read from stdin. |
| `--connector-type <TYPE>` | | Connector type to create. Only valid with `--data`. By default, Vercel resolves the type from the service. |
| `--triggers` | | Enable webhook trigger forwarding for this connector. |
| `--trigger-event <EVENT>` | | Webhook event to receive. Repeatable. Requires `--triggers`, and replaces the provider's default events. |
| `--trigger-project <PROJECT>` | | Name or ID of the project that receives forwarded webhooks. Defaults to the currently linked project. Requires `--triggers`. |
| `--trigger-path <PATH>` | | Path on the destination project that receives forwarded webhooks. Requires `--triggers`. |
| `--git-branch <BRANCH>` | | Git branch whose Preview deployment receives forwarded webhooks. Without `--git-branch` or `--trigger-environment`, webhooks go to Production. Requires `--triggers`. |
| `--trigger-environment <ENV>` | | Slug of the Custom Environment that receives forwarded webhooks. You can't combine it with `--git-branch`. Requires `--triggers`. |
| `--yes` | `-y` | Skip the confirmation prompt shown when a service has a single connection method. |
| `--icon <PATH>` | | Path to a PNG or JPEG image to use as the connector icon. |
| `--background-color <HEX>` | | Background color for the connector icon (for example, `#1A2B3C`). |
| `--accent-color <HEX>` | | Accent color for the connector icon (for example, `#FF0066`). |
| `--json` | | Output as JSON. |

### Examples

```bash filename="terminal"
vercel connect create slack
vercel connect create notion --help
vercel connect create notion --connection-method mcp --name notion-mcp
vercel connect create notion --target api --connection-method oauth --name notion --data @credentials.json
vercel connect create notion --connection-method api-key --name notion --data @key.json
vercel connect create okta --connection-method custom-server --param domain=acme.okta.com --name okta --data @credentials.json
vercel connect create slack --name my-bot --triggers
vercel connect create slack --name my-bot --triggers --trigger-path /api/slack-events --git-branch staging
vercel connect create mcp.linear.app --name linear-connector
vercel connect create slack --name my-bot --icon ./logo.png --background-color '#1A2B3C'
vercel connect create slack --json
```

## vercel connect list

Lists connectors for your team or project, with optional filtering by type, service, or search text.

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
| `--query <TEXT>` | `-q` | Search connectors by name or UID. |
| `--limit <COUNT>` | `-n` | Number of connectors to return per page. |
| `--next <CURSOR>` | | Cursor for the next page of results. |
| `--json` | | Output as JSON. |

### Examples

```bash filename="terminal"
vercel connect list --all-projects
vercel connect list --type slack
vercel connect list --type oauth --type github
vercel connect list --service mcp.linear.app
vercel connect list --query prod
vercel connect list --limit 10
vercel connect list --json
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
| `--subject <TYPE>` | | Subject type: `user` (default) or `app`. |
| `--installation <ID>` | | Target a specific installation. Only applies with `--subject app`. |
| `--scopes <SCOPES>` | | Scopes for the token request. Comma- or space-separated. Without `--scopes`, the command requests the connector's default scopes. To send the request with no scopes, pass `--no-default-scopes`. |
| `--yes` | `-y` | Allow opening the browser automatically if authorization or installation is required. |
| `--json` | | Output as JSON. Includes `expiresAt`, `installationId`, and other fields. |

### Examples

```bash filename="terminal"
vercel connect token scl_abc123
vercel connect token slack/my-bot
vercel connect token scl_abc123 --subject app
vercel connect token scl_abc123 --subject app --installation inst_1
vercel connect token scl_abc123 --scopes channels:read,chat:write
vercel connect token scl_abc123 --yes
vercel connect token scl_abc123 --json
```

## vercel connect attach

Attaches a Vercel project to a connector for one or more environments, so the project can request tokens from that connector at runtime.

```bash filename="terminal"
vercel connect attach <connector>
```

*Attach the currently linked project to a connector for all built-in environments: Production (\`production\`), Preview (\`preview\`), and Development (\`development\`).*

```bash filename="terminal"
vercel connect attach scl_abc123 -e production -e preview
```

*Attach and restrict to specific environments.*

Passing `--environment` replaces the built-in environment defaults. The example command below enables only the `qa` Custom Environment for a project with no existing trigger destinations to other Custom Environments:

```bash filename="terminal"
vercel connect attach scl_abc123 --environment qa
```

*Attach the connector to the \`qa\` Custom Environment.*

If the project already has trigger destinations that target other Custom Environments, the CLI preserves those environments on the project link.

Use `--triggers` to also register the project as a trigger destination. When registered, the connector forwards verified incoming webhooks to the project. A connector can have up to three trigger destinations.

```bash filename="terminal"
vercel connect attach scl_abc123 --triggers
```

*Attach and register the project as a trigger destination.*

If you do not pass `--git-branch` or `--trigger-environment`, the destination targets Production.

If you omit `--trigger-path`, Vercel derives the receiver path from the connector and project framework. Pass `--trigger-path` to select the receiver path explicitly.

Use `--trigger-environment` to forward incoming webhooks to a Custom Environment:

```bash filename="terminal"
vercel connect attach scl_abc123 --environment qa --triggers \
  --trigger-environment qa --trigger-path /api/slack-events
```

*Allow token requests from \`qa\` and forward webhooks to it.*

The CLI combines the environments passed to `--environment` with the trigger target. For a project with no existing trigger destinations, the example above produces a project link that contains only `qa`. Existing trigger destinations remain registered, and the CLI preserves any Custom Environments they require on the project link. If you omit `--environment`, the CLI links `production`, `preview`, and `development`, adds `qa` because it is the trigger target, and preserves Custom Environments required by existing destinations.

> **💡 Note:** Detaching a project (via `vercel connect detach`) removes the token-access
> link and also removes the project from the connector's trigger
> destinations.

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--project <NAME_OR_ID>` | `-p` | Project name or ID. Defaults to the currently linked project. |
| `--environment <ENV>` | `-e` | Environments to enable by built-in name or Custom Environment slug. Repeatable and comma-separated. Defaults to `production`, `preview`, and `development`. |
| `--triggers` | | Register this project as a trigger destination for incoming webhooks. |
| `--git-branch <BRANCH>` | | Git branch for the trigger destination. Mutually exclusive with `--trigger-environment` and only valid with `--triggers`. |
| `--trigger-environment <ENV>` | | Custom Environment slug for the trigger destination. Mutually exclusive with `--git-branch` and only valid with `--triggers`. |
| `--trigger-path <PATH>` | | Path on the project that receives forwarded webhooks. Only valid with `--triggers`. |
| `--yes` | `-y` | Skip the confirmation prompt. |
| `--json` | | Output as JSON. Requires `--yes`. |

### Examples

```bash filename="terminal"
vercel connect attach scl_abc123
vercel connect attach scl_abc123 -e production -e preview
vercel connect attach scl_abc123 -e qa
vercel connect attach slack/my-bot --project my-app
vercel connect attach scl_abc123 --triggers
vercel connect attach scl_abc123 --triggers --git-branch staging --trigger-path /slack
vercel connect attach scl_abc123 -e qa --triggers --trigger-environment qa --trigger-path /slack
vercel connect attach scl_abc123 --yes --json
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
| `--json` | | Output as JSON. Requires `--yes`. |

### Examples

```bash filename="terminal"
vercel connect detach scl_abc123
vercel connect detach slack/my-bot --project my-app
vercel connect detach scl_abc123 --yes --json
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
| `--json` | | Output as JSON. |

### Examples

```bash filename="terminal"
vercel connect update scl_abc123 --icon ./logo.png
vercel connect update scl_abc123 --background-color '#1A2B3C' --accent-color '#FF0066'
vercel connect update scl_abc123 --icon ./logo.png --json
```

## vercel connect delete

Deletes a connector. By default the command prompts for confirmation.

```bash filename="terminal"
vercel connect delete <connector>
```

*Delete a connector by ID or UID.*

If the connector still has projects attached, the deletion fails unless you pass `--disconnect-all` to detach all projects first.

```bash filename="terminal"
vercel connect delete scl_abc123 --disconnect-all --yes
```

*Detach all projects from a connector and then delete it without prompting.*

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--disconnect-all` | | Disconnect all projects from the connector before deletion. |
| `--yes` | `-y` | Skip the confirmation prompt. |
| `--json` | | Output as JSON. Requires `--yes`. |

### Examples

```bash filename="terminal"
vercel connect delete scl_abc123
vercel connect delete slack/my-bot
vercel connect delete scl_abc123 --disconnect-all
vercel connect delete scl_abc123 --yes
vercel connect delete scl_abc123 --disconnect-all --yes --json
```

## vercel connect revoke-tokens

Revokes tokens that a connector issued. Anyone whose tokens you revoke must authorize the connector again before they can use it. If the provider doesn't support revocation, a revoked token can keep working at the provider until it expires. See [Revocation](/docs/connect/concepts/tokens#revocation).

Pass the ID or UID of the connector:

```bash filename="terminal"
vercel connect revoke-tokens <connector>
```

*Choose which of a connector's tokens to revoke.*

In a terminal, the command asks whether to revoke only your own tokens or every token, and then asks you to confirm. In a script or in CI, pass `--my-tokens` or `--all-tokens` together with `--yes`:

```bash filename="terminal"
vercel connect revoke-tokens scl_abc123 --my-tokens --yes
```

*Revoke your own tokens for a connector without prompts.*

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--my-tokens` | | Revoke only your own tokens for the connector. |
| `--all-tokens` | | Revoke every token for all users and installations. |
| `--yes` | `-y` | Skip the confirmation prompt. Requires `--my-tokens` or `--all-tokens`. |
| `--json` | | Output as JSON. Requires `--yes`. |

### Examples

```bash filename="terminal"
vercel connect revoke-tokens scl_abc123
vercel connect revoke-tokens scl_abc123 --my-tokens
vercel connect revoke-tokens scl_abc123 --all-tokens
vercel connect revoke-tokens scl_abc123 --my-tokens --yes
vercel connect revoke-tokens scl_abc123 --my-tokens --yes --json
```

## vercel connect open

Opens a connector in the Vercel dashboard. With `--json`, prints the dashboard URL instead of opening a browser.

```bash filename="terminal"
vercel connect open <connector>
```

*Open a connector in the Vercel dashboard.*

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--json` | | Output as JSON. |

### Examples

```bash filename="terminal"
vercel connect open scl_abc123
vercel connect open slack/my-bot
vercel connect open scl_abc123 --json
```

## vercel connect categories

Lists the categories services are grouped into, with the number of services in each. Use a category's slug with `vercel connect discover --category`.

```bash filename="terminal"
vercel connect categories
```

*List service categories.*

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--json` | | Output as JSON. |

### Examples

```bash filename="terminal"
vercel connect categories
vercel connect categories --json
```

## vercel connect contacts add

Adds a phone contact that a connector may message. Pass the connector's ID or UID and a phone number in E.164 format, with `+` followed by the country code and number, without spaces, parentheses, or hyphens:

```bash filename="terminal"
vercel connect contacts add linq/support --phone-number +12025550123
```

*Add a phone contact to the \`linq/support\` connector.*

[Log in](/docs/cli/login) or use a [token](/docs/cli/global-options#token) to authenticate. Use `--scope <team-slug>` to select the connector's team. In non-interactive mode, pass `--scope` unless the current directory is linked to a project in that team.

In text output, the command prints `Contact +12025550123 added.` on success followed by any verification instructions. Follow those instructions to complete verification. The command can finish successfully while verification is still pending; it doesn't wait for verification to complete.

Use `--json` to output the verification response instead of the success message. The response can include `status`, `verified`, and `instructions`.

### Options

| Option | Shorthand | Description |
| --- | --- | --- |
| `--phone-number <PHONE>` | | Required. Contact phone number in E.164 format, such as `+12025550123`. |
| `--json` | | Output the verification response as JSON. |

### Examples

```bash filename="terminal"
vercel connect contacts add scl_abc123 --phone-number +12025550123
vercel connect contacts add linq/support --phone-number +12025550123 --scope my-team
vercel connect contacts add scl_abc123 --phone-number +12025550123 --json
```

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel connect` command:

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

## Related

- [Vercel Connect overview](/docs/connect)
- [Quickstart with Vercel Connect](/docs/connect/quickstart)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
