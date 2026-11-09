---
title: vercel rolling-release
product: vercel
url: /docs/cli/rolling-release
canonical_url: "https://vercel.com/docs/cli/rolling-release"
last_updated: 2026-06-30
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/rolling-releases
  - /docs/cli/global-options
summary: "Learn how to manage your project's rolling releases using the vercel rolling-release CLI command."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/rolling-release.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "a928ad6bd6c7f0daa076ea297acd5d1c8581e44edaadd6c5742fb4eefed9bed9"
---

# vercel rolling-release

Use the `vercel rolling-release` command to manage your project's rolling releases. [Rolling releases](/docs/rolling-releases) allow you to gradually roll out new deployments to a small fraction of your users before promoting them to everyone.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Performing a rolling release deployment](https://vercel.com/docs/rolling-releases/rolling-release-deployment) — Gradually roll out a production deployment using traffic stages, monitoring, and automated abort.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Rolling Releases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases) — Vercel MCP tools for rolling releases.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [Update the rolling release settings for the project](https://vercel.com/docs/rest-api/rolling-release/update-the-rolling-release-settings-for-the-project) — PATCH /v1/projects/{idOrName}/rolling-release/config — Update \\(or disable\\) Rolling Releases for a project. When disabl

Full cross-link map for this page: [/docs/cli/rolling-release.graph.md](/docs/cli/rolling-release.graph.md)
<!-- /docsgraph:related -->

Vercel offers Rolling Releases on Pro and Enterprise. Pro teams can use Rolling Releases for one project. See [Rolling Releases](/docs/rolling-releases) for limits and setup details.

## Usage

```bash filename="terminal"
vercel rolling-release [command]
```

*Using \`vercel rolling-release\` with a specific command
to manage rolling releases.*

## Commands

### update

Update rolling release settings for a project.

```bash filename="terminal"
vercel rolling-release update --enable --advancement-type=manual-approval --stage=10 --stage=50
```

*Using the \`vercel rolling-release update\` command to
set up a rolling release with manual approval stages of 10%, 50%, and 100%.*

### start

Start a rolling release for a specific deployment. This command calls `POST /v1/projects/{idOrName}/rolling-release/start`. The start endpoint is idempotent. See [Starting and completing via the API](/docs/rolling-releases#starting-and-completing-via-the-api).

```bash filename="terminal"
vercel rolling-release start --deployment=dpl_abc
```

*Using the \`vercel rolling-release start\` command to
begin a rolling release for a deployment (where "dpl\_abc" is the deployment ID or URL).*

**Options:**

| Option         | Type    | Required | Description                        |
| -------------- | ------- | -------- | ---------------------------------- |
| `--deployment` | String  | Yes      | The deployment ID or URL to target |
| `--yes`        | Boolean | No       | Skip confirmation prompt           |

**Examples:**

```bash filename="terminal"
vercel rolling-release start --deployment=dpl_123abc456def
vercel rolling-release start --deployment=https://my-project-abc123.vercel.app
vercel rolling-release start --deployment=dpl_123 --yes
```

### approve

Approve the current stage of an active rolling release.

```bash filename="terminal"
vercel rolling-release approve --deployment=dpl_abc --currentStageIndex=0
```

*Using the \`vercel rolling-release approve\` command to
approve the current stage and advance to the next stage.*

### abort

Abort an active rolling release. This command rolls back to the deployment that you pass to `--deployment`. Pass the ID or URL of the previous production deployment, not the deployment that is rolling out:

```bash filename="terminal"
vercel rolling-release abort --deployment=dpl_previous
```

*Using the \`vercel rolling-release abort\` command to
stop an active rolling release.*

### complete

Complete an active rolling release, promoting the deployment to 100% of traffic. This command calls `POST /v1/projects/{idOrName}/rolling-release/complete`. See [Starting and completing via the API](/docs/rolling-releases#starting-and-completing-via-the-api) for CI/CD usage.

```bash filename="terminal"
vercel rolling-release complete --deployment=dpl_abc
```

*Using the \`vercel rolling-release complete\` command to
finish a rolling release and fully promote the deployment.*

### inspect

Inspect details about a rolling release.

`fetch` remains a supported alias, but prints a deprecation warning. Use `inspect` for new commands.

```bash filename="terminal"
vercel rolling-release inspect
```

*Using the \`vercel rolling-release inspect\` command to get
information about the current rolling release.*

## Unique Options

These are options that only apply to the `vercel rolling-release` command.

### Project

The `--project` option sets which project to manage, by name or ID. Without it, `vercel rolling-release` uses the project linked to your current directory. Pass `--project` to manage a different project, or to run a subcommand from a directory that isn't linked. Every subcommand accepts it, for example `inspect`:

```bash filename="terminal"
vercel rolling-release inspect --project my-app
```

*Using the \`vercel rolling-release inspect\` command with a project name.*

### Enable

The `--enable` option turns on rolling releases for the project. Combine it with `--advancement-type` and one or more `--stage` flags to define how traffic shifts.

```bash filename="terminal"
vercel rolling-release update --enable --advancement-type=automatic --stage=10,5m
```

*Enable a rolling release that ramps from 10% for 5 minutes and then to 100%.*

To turn rolling releases off for the project, use `--no-enable`:

```bash filename="terminal"
vercel rolling-release update --no-enable
```

*Disable rolling releases for the project.*

### Advancement type

The `--advancement-type` option controls how stages advance. It accepts `automatic` or `manual-approval`. Required when `--enable` is set.

```bash filename="terminal"
vercel rolling-release update --enable --advancement-type=automatic --stage=10,5m
vercel rolling-release update --enable --advancement-type=manual-approval --stage=10
```

*Use \`automatic\` for time-based advancement, or \`manual-approval\` to require
approval between stages.*

### Stage

The `--stage` option adds a release stage. Repeat it to add multiple stages. The format is `PERCENTAGE[,DURATION]`, where `PERCENTAGE` is between 1 and 99 and `DURATION` (required with `--advancement-type=automatic`, not allowed with `--advancement-type=manual-approval`) is a duration like `5m`. A final 100% stage is added automatically.

```bash filename="terminal"
vercel rolling-release update --enable --advancement-type=automatic --stage=10,5m --stage=50,10m
```

*Configure stages of 10% for 5 minutes, then 50% for 10 minutes, then 100%.*

### Configuration (advanced)

The `--cfg` option accepts a raw JSON configuration string. It takes priority over the other configuration flags and is kept for advanced and backwards-compatible use. Prefer `--enable`, `--no-enable`, `--advancement-type`, and `--stage` for everyday configuration.

```bash filename="terminal"
vercel rolling-release update --cfg='{"enabled":true, "advancementType":"automatic", "stages":[{"targetPercentage":10,"duration":5},{"targetPercentage":100}]}'
```

*Using the \`--cfg\` option with raw JSON.*

As a legacy shortcut, `--cfg='disable'` is also accepted and disables rolling releases. Prefer `--no-enable` for new usage.

```bash filename="terminal"
vercel rolling-release update --cfg='disable'
```

*Legacy form for disabling rolling releases. Equivalent to \`--no-enable\`.*

### Deployment

The `--deployment` option specifies the deployment ID or URL for rolling release operations.

```bash filename="terminal"
vercel rolling-release start --deployment=https://example.vercel.app
```

*Using the \`vercel rolling-release start\` command with a
deployment URL.*

### Current Stage Index

The `--currentStageIndex` option specifies the current stage index when approving a rolling release stage.

```bash filename="terminal"
vercel rolling-release approve --currentStageIndex=0 --deployment=dpl_123
```

*Using the \`vercel rolling-release approve\` command with
a specific stage index.*

## Examples

### Configure a rolling release with automatic advancement

```bash filename="terminal"
vercel rolling-release update --enable --advancement-type=automatic --stage=10,5m
```

This configures a rolling release that starts at 10% traffic, automatically advances after 5 minutes, and then goes to 100%.

### Configure a rolling release with manual approval

```bash filename="terminal"
vercel rolling-release update --enable --advancement-type=manual-approval --stage=10
```

This configures a rolling release that starts at 10% traffic and requires manual approval to advance to 100%.

### Configure a multi-stage rolling release

```bash filename="terminal"
vercel rolling-release update --enable --advancement-type=manual-approval --stage=10 --stage=50
```

This configures a rolling release with three stages: 10%, 50%, and 100% traffic, each requiring manual approval.

### Disable rolling releases

```bash filename="terminal"
vercel rolling-release update --no-enable
```

This disables rolling releases for the project.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel rolling-release` command:

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
