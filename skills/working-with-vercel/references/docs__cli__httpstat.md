---
title: vercel httpstat
product: vercel
url: /docs/cli/httpstat
canonical_url: "https://vercel.com/docs/cli/httpstat"
last_updated: 2026-08-21
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/deployment-protection
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
  - /docs/cli
  - /docs/cli/global-options
  - /docs/cli/curl
summary: Learn how to visualize HTTP request timing statistics for your Vercel deployments using the vercel httpstat CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/httpstat.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "ddafd56b5d5ecf24cd88f6b5297ee1a57e1449ea8b4d13717790deb27adfb85b"
---

# vercel httpstat

> **💡 Note:** The `vercel httpstat` command is currently in beta. Features and behavior may change.

The `vercel httpstat` command works like `httpstat`, but automatically handles deployment protection bypass tokens for you. It provides visualization of HTTP timing statistics, showing how long each phase of an HTTP request takes. When your project has [Deployment Protection](/docs/deployment-protection) enabled, this command lets you test protected deployments without manually managing bypass secrets.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fhttpstat&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel api](https://vercel.com/docs/cli/api?from=related&source_path=%2Fdocs%2Fcli%2Fhttpstat&source_site=vercel-docs&relationship=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel logs](https://vercel.com/docs/cli/logs?from=related&source_path=%2Fdocs%2Fcli%2Fhttpstat&source_site=vercel-docs&relationship=related) — View and filter request logs for your Vercel project, or stream live runtime logs from a deployment.
- [vercel security](https://vercel.com/docs/cli/security?from=related&source_path=%2Fdocs%2Fcli%2Fhttpstat&source_site=vercel-docs&relationship=related) — Inspect the security posture of your Vercel team from the terminal: run every security check, list findings, and scope t
- [vercel metrics](https://vercel.com/docs/cli/metrics?from=related&source_path=%2Fdocs%2Fcli%2Fhttpstat&source_site=vercel-docs&relationship=related) — List and query observability metrics, and inspect available dimensions and aggregations using the Vercel CLI.

Full cross-link map for this page: [/docs/cli/httpstat.graph.md](/docs/cli/httpstat.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fhttpstat&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

The command runs the `httpstat` tool with the same arguments you provide, but adds an [`x-vercel-protection-bypass`](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation#using-protection-bypass-for-automation) header with a valid token. This makes it simple to measure response times, analyze performance bottlenecks, or debug latency issues on protected deployments.

> **💡 Note:** This command is available in Vercel CLI v48.9.0 and later. If you're using an older version, see [Updating Vercel CLI](/docs/cli#updating-vercel-cli).

## Usage

```bash filename="terminal"
vercel httpstat [path]
```

*Using the \`vercel httpstat\` command to visualize HTTP timing statistics for a deployment.*

## Examples

### Basic timing analysis

Get timing statistics for your production deployment:

```bash filename="terminal"
vercel httpstat /api/hello
```

*Getting timing statistics for the \`/api/hello\` endpoint on your production deployment.*

### POST request timing

Analyze timing for a POST request with JSON data. Use the `--` separator to pass flags through to the underlying `httpstat`:

```bash filename="terminal"
vercel httpstat /api/users -- -X POST -H "Content-Type: application/json" -d '{"name":"John"}'
```

*Measuring timing statistics for a POST request that creates a new user. The
\`--\` separator passes everything after it to \`httpstat\`.*

### Specific deployment timing

Test timing for a specific deployment by its URL:

```bash filename="terminal"
vercel httpstat /api/status --deployment https://my-app-abc123.vercel.app
```

*Analyzing timing for a specific deployment instead of the production
deployment.*

### Multiple requests

Run multiple requests to get average timing statistics by passing flags after `--`:

```bash filename="terminal"
vercel httpstat /api/data -- -n 10
```

*Running 10 requests to get more reliable timing data.*

## How it works

When you run `vercel httpstat`:

1. The CLI finds your linked project (or you can specify one with [`--project`](/docs/cli/global-options#project))
2. It gets the latest production deployment URL (or uses the deployment you specified)
3. It retrieves or generates a deployment protection bypass token
4. It runs the `httpstat` tool with the bypass token in the `x-vercel-protection-bypass` header
5. The tool displays a visual breakdown of request timing phases: DNS lookup, TCP connection, TLS handshake, server processing, and content transfer

The command requires `httpstat` to be installed on your system.

## Unique options

These are options that only apply to the `vercel httpstat` command. To pass flags through to the underlying `httpstat` command, place them after the `--` separator.

### Deployment

The `--deployment` option lets you specify a deployment ID or URL to request instead of using the production deployment.

```bash filename="terminal"
vercel httpstat /api/hello --deployment https://my-app-abc123.vercel.app
```

*Using the \`--deployment\` option to target a specific deployment.*

### Protection bypass

The `--protection-bypass` option lets you provide your own deployment protection bypass secret instead of automatically generating one. This is useful when you already have a bypass secret configured.

```bash filename="terminal"
vercel httpstat /api/hello --protection-bypass your-secret-here
```

*Using the \`--protection-bypass\` option with a manual secret.*

You can also use the [`VERCEL_AUTOMATION_BYPASS_SECRET`](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation#using-protection-bypass-for-automation) environment variable:

```bash filename="terminal"
export VERCEL_AUTOMATION_BYPASS_SECRET=your-secret-here
vercel httpstat /api/hello
```

*Setting the bypass secret as an environment variable.*

### Yes

The `--yes` option, shorthand `-y`, skips the confirmation prompt when linking is required. Use it in non-interactive environments like CI.

```bash filename="terminal"
vercel httpstat /api/hello --yes
```

*Skipping the link confirmation prompt with \`--yes\`.*

## Understanding the output

The `httpstat` tool displays timing information in a visual format:

- **DNS Lookup**: Time to resolve the domain name
- **TCP Connection**: Time to establish a TCP connection
- **TLS Handshake**: Time to complete the SSL/TLS handshake (for HTTPS)
- **Server Processing**: Time for the server to generate the response
- **Content Transfer**: Time to download the response body

Each phase is color-coded and displayed with its duration in milliseconds, helping you identify which part of the request is taking the most time.

## Troubleshooting

### httpstat command not found

Make sure `httpstat` is installed on your system:

```bash filename="terminal"
# Install with pip (Python)
pip install httpstat

# Or install with Homebrew (macOS)
brew install httpstat
```

*Installing httpstat on different systems.*

### No deployment found for the project

Make sure you're in a directory with a linked Vercel project and that the project has at least one deployment:

```bash filename="terminal"
# Link your project
vercel link

# Deploy your project
vercel deploy
```

*Linking your project and creating a deployment.*

### Failed to get deployment protection bypass token

If automatic token creation fails, you can create a bypass secret manually in the Vercel Dashboard:

1. Go to your project's **Settings** → **Deployment Protection**
2. Find "Protection Bypass for Automation"
3. Click "Create" or "Generate" to create a new secret
4. Copy the generated secret
5. Use it with the `--protection-bypass` flag or [`VERCEL_AUTOMATION_BYPASS_SECRET`](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation#using-protection-bypass-for-automation) environment variable

### No deployment found for ID

When using `--deployment`, verify that:

- The deployment ID or URL is correct
- The deployment belongs to your linked project
- The deployment hasn't been deleted

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel httpstat` command:

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

## Related

- [Deployment Protection](/docs/deployment-protection)
- [vercel curl](/docs/cli/curl)
- [vercel deploy](/docs/cli/deploy)
- [vercel inspect](/docs/cli/inspect)


---

[View full sitemap](/docs/sitemap)
