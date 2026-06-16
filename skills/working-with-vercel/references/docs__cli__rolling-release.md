---
title: vercel rolling-release
product: vercel
url: /docs/cli/rolling-release
canonical_url: "https://vercel.com/docs/cli/rolling-release"
last_updated: 2026-05-28
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/rolling-releases
summary: "Learn how to manage your project's rolling releases using the vercel rolling-release CLI command."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/rolling-release.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "580c4a43c435d781500f701fb24d643204674cc773ecaf5d69b9dfb575e99f1d"
---

# vercel rolling-release

The `vercel rolling-release` command (also available as `vercel rr`) is used to manage your project's rolling releases. [Rolling releases](/docs/rolling-releases) allow you to gradually roll out new deployments to a small fraction of your users before promoting them to everyone.

## Usage

```bash filename="terminal"
vercel rolling-release [command]
```

*Using \`vercel rolling-release\` with a specific command
to manage rolling releases.*

## Commands

### configure

Configure rolling release settings for a project.

```bash filename="terminal"
vercel rolling-release configure --enable --advancement-type=manual-approval --stage=10 --stage=50
```

*Using the \`vercel rolling-release configure\` command to
set up a rolling release with manual approval stages of 10%, 50%, and 100%.*

### start

Start a rolling release for a specific deployment.

```bash filename="terminal"
vercel rolling-release start --dpl=dpl_abc
```

*Using the \`vercel rolling-release start\` command to
begin a rolling release for a deployment (where "dpl\_abc" is the deployment ID or URL).*

**Options:**

| Option  | Type    | Required | Description                        |
| ------- | ------- | -------- | ---------------------------------- |
| `--dpl` | String  | Yes      | The deployment ID or URL to target |
| `--yes` | Boolean | No       | Skip confirmation prompt           |

**Examples:**

```bash filename="terminal"
vercel rr start --dpl=dpl_123abc456def
vercel rr start --dpl=https://my-project-abc123.vercel.app
vercel rr start --dpl=dpl_123 --yes
```

### approve

Approve the current stage of an active rolling release.

```bash filename="terminal"
vercel rolling-release approve --dpl=dpl_abc --currentStageIndex=0
```

*Using the \`vercel rolling-release approve\` command to
approve the current stage and advance to the next stage.*

### abort

Abort an active rolling release.

```bash filename="terminal"
vercel rolling-release abort --dpl=dpl_abc
```

*Using the \`vercel rolling-release abort\` command to
stop an active rolling release.*

### complete

Complete an active rolling release, promoting the deployment to 100% of traffic.

```bash filename="terminal"
vercel rolling-release complete --dpl=dpl_abc
```

*Using the \`vercel rolling-release complete\` command to
finish a rolling release and fully promote the deployment.*

### fetch

Fetch details about a rolling release.

```bash filename="terminal"
vercel rolling-release fetch
```

*Using the \`vercel rolling-release fetch\` command to get
information about the current rolling release.*

## Unique Options

These are options that only apply to the `vercel rolling-release` command.

### Enable

The `--enable` option turns on rolling releases for the project. Combine it with `--advancement-type` and one or more `--stage` flags to define how traffic shifts.

```bash filename="terminal"
vercel rolling-release configure --enable --advancement-type=automatic --stage=10,5m
```

*Enable a rolling release that ramps from 10% for 5 minutes and then to 100%.*

### Disable

The `--disable` option turns off rolling releases for the project. Prefer it over the legacy `--cfg='disable'` form, which the CLI still accepts for backwards compatibility.

```bash filename="terminal"
vercel rolling-release configure --disable
```

*Disable rolling releases for the project.*

### Advancement type

The `--advancement-type` option controls how stages advance. It accepts `automatic` or `manual-approval`. Required when `--enable` is set.

```bash filename="terminal"
vercel rolling-release configure --enable --advancement-type=automatic --stage=10,5m
vercel rolling-release configure --enable --advancement-type=manual-approval --stage=10
```

*Use \`automatic\` for time-based advancement, or \`manual-approval\` to require
approval between stages.*

### Stage

The `--stage` option adds a rollout stage. Repeat it to add multiple stages. The format is `PERCENTAGE[,DURATION]`, where `PERCENTAGE` is between 1 and 99 and `DURATION` (only valid with `--advancement-type=automatic`) is a duration like `5m`. A final 100% stage is added automatically.

```bash filename="terminal"
vercel rolling-release configure --enable --advancement-type=automatic --stage=10,5m --stage=50,10m
```

*Configure stages of 10% for 5 minutes, then 50% for 10 minutes, then 100%.*

### Configuration (advanced)

The `--cfg` option accepts a raw JSON configuration string. It takes priority over the other configuration flags and is kept for advanced and backwards-compatible use. Prefer `--enable`, `--disable`, `--advancement-type`, and `--stage` for everyday configuration.

```bash filename="terminal"
vercel rolling-release configure --cfg='{"enabled":true, "advancementType":"automatic", "stages":[{"targetPercentage":10,"duration":5},{"targetPercentage":100}]}'
```

*Using the \`--cfg\` option with raw JSON.*

As a legacy shortcut, `--cfg='disable'` is also accepted and disables rolling releases. Prefer `--disable` for new usage.

```bash filename="terminal"
vercel rolling-release configure --cfg='disable'
```

*Legacy form for disabling rolling releases. Equivalent to \`--disable\`.*

### Deployment

The `--dpl` option specifies the deployment ID or URL for rolling release operations.

```bash filename="terminal"
vercel rolling-release start --dpl=https://example.vercel.app
```

*Using the \`vercel rolling-release start\` command with a
deployment URL.*

### Current Stage Index

The `--currentStageIndex` option specifies the current stage index when approving a rolling release stage.

```bash filename="terminal"
vercel rolling-release approve --currentStageIndex=0 --dpl=dpl_123
```

*Using the \`vercel rolling-release approve\` command with
a specific stage index.*

## Examples

### Configure a rolling release with automatic advancement

```bash filename="terminal"
vercel rolling-release configure --enable --advancement-type=automatic --stage=10,5m
```

This configures a rolling release that starts at 10% traffic, automatically advances after 5 minutes, and then goes to 100%.

### Configure a rolling release with manual approval

```bash filename="terminal"
vercel rolling-release configure --enable --advancement-type=manual-approval --stage=10
```

This configures a rolling release that starts at 10% traffic and requires manual approval to advance to 100%.

### Configure a multi-stage rolling release

```bash filename="terminal"
vercel rolling-release configure --enable --advancement-type=manual-approval --stage=10 --stage=50
```

This configures a rolling release with three stages: 10%, 50%, and 100% traffic, each requiring manual approval.

### Disable rolling releases

```bash filename="terminal"
vercel rolling-release configure --disable
```

This disables rolling releases for the project.


---

[View full sitemap](/docs/sitemap)
