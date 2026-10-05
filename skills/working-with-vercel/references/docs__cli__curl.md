---
title: vercel curl
product: vercel
url: /docs/cli/curl
canonical_url: "https://vercel.com/docs/cli/curl"
last_updated: 2026-10-02
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/deployment-protection
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
  - /docs/cli
  - /docs/cli/traces
  - /docs/cli/global-options
summary: Learn how to make HTTP requests to your Vercel deployments with automatic deployment protection bypass using the vercel curl CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/curl.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "73fa7aac033e48f8473bd2789a0dc1950048a24f811458b272ed883a7f501288"
---

# vercel curl

The `vercel curl` command works like `curl`, but automatically handles deployment protection bypass tokens for you. When your project has [Deployment Protection](/docs/deployment-protection) enabled, this command lets you test protected deployments without manually managing bypass secrets.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Trace any Vercel request from the CLI](https://vercel.com/changelog/trace-any-vercel-request-from-the-cli?from=related&source_path=%2Fdocs%2Fcli%2Fcurl&source_site=vercel-docs&relationship=related)
- [Use native curl syntax with Vercel CLI](https://vercel.com/changelog/use-native-curl-syntax-with-vercel-cli?from=related&source_path=%2Fdocs%2Fcli%2Fcurl&source_site=vercel-docs&relationship=related)
- [vercel httpstat](https://vercel.com/docs/cli/httpstat?from=related&source_path=%2Fdocs%2Fcli%2Fcurl&source_site=vercel-docs&relationship=related) — Learn how to visualize HTTP request timing statistics for your Vercel deployments using the vercel httpstat CLI command.
- [vercel api](https://vercel.com/docs/cli/api?from=related&source_path=%2Fdocs%2Fcli%2Fcurl&source_site=vercel-docs&relationship=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fcurl&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel rolling-release](https://vercel.com/docs/cli/rolling-release?from=related&source_path=%2Fdocs%2Fcli%2Fcurl&source_site=vercel-docs&relationship=related) — Learn how to manage your project's rolling releases using the vercel rolling-release CLI command.
- [vercel deploy-hooks](https://vercel.com/docs/cli/deploy-hooks?from=related&source_path=%2Fdocs%2Fcli%2Fcurl&source_site=vercel-docs&relationship=related) — Manage Deploy Hooks for Git-triggered builds from the Vercel CLI: list, create, and remove deploy hook URLs that trigger

Full cross-link map for this page: [/docs/cli/curl.graph.md](/docs/cli/curl.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fcurl&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

The command runs the system `curl` command with the same arguments you provide, but adds an [`x-vercel-protection-bypass`](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation#using-protection-bypass-for-automation) header with a valid token. This makes it simple to test API endpoints, check responses, or debug issues on protected deployments.

> **💡 Note:** This command is available in Vercel CLI v48.8.0 and later. If you're using an older version, see [Updating Vercel CLI](/docs/cli#updating-vercel-cli).

## Usage

```bash filename="terminal"
vercel curl [url|path]
```

*Using the \`vercel curl\` command to make an HTTP request to a deployment.*

The argument can be any of the following:

- A full URL, such as `https://my-app-abc123.vercel.app/api/hello`.
- A bare hostname, such as `my-app-abc123.vercel.app/api/hello`. The CLI adds `https://` automatically.
- An API path, with or without a leading slash, such as `/api/hello` or `api/hello`. Relative paths target the linked project's latest production deployment.

## Examples

### Basic request

Make a GET request to your production deployment:

```bash filename="terminal"
vercel curl /api/hello
```

*Making a GET request to the \`/api/hello\` endpoint on your production deployment.*

### Request a protected deployment by URL

Pass a full URL to request a protected deployment directly. The CLI resolves the owning project from the URL to source the protection bypass token, so no linked project is required:

```bash filename="terminal"
vercel curl https://my-app-abc123.vercel.app/api/hello
```

*Requesting a protected deployment by its full URL.*

### POST request with data

Pass curl flags directly to send a POST request with JSON data:

```bash filename="terminal"
vercel curl /api/users -X POST -H "Content-Type: application/json" -d '{"name":"John"}'
```

*Making a POST request with JSON data to create a new user. Any flag that is not a \`vercel curl\` option is passed through to \`curl\`.*

When a curl flag collides with one of `vercel curl`'s own options, use the `--` separator and place the curl flag after it. For example, curl has its own `--json` flag, which also belongs to `vercel curl`, so pass curl's version after `--`:

```bash filename="terminal"
vercel curl /api/users -- --json '{"name":"John"}'
```

*Using the \`--\` separator so curl's own \`--json\` flag is passed through instead of being read as a \`vercel curl\` option.*

### Request specific deployment

Test a specific deployment by its URL:

```bash filename="terminal"
vercel curl /api/status --deployment https://my-app-abc123.vercel.app
```

*Making a request to a specific deployment instead of the production
deployment.*

### Verbose output

Pass curl's `-v` flag directly to see detailed request information:

```bash filename="terminal"
vercel curl /api/data -v
```

*Using curl's \`-v\` flag for verbose output, which shows headers and connection details.*

### Capture a request trace

Capture a session trace for the request and print the trace request ID:

```bash filename="terminal"
vercel curl --trace /api/hello
```

*Using the \`--trace\` option to capture a request trace.*

After the request completes, the command prints a `vercel traces get` command you can run to inspect the trace. See [`vercel traces`](/docs/cli/traces) for details.

## How it works

When you run `vercel curl`:

1. The CLI finds your linked project (or you can specify one with [`--project`](/docs/cli/global-options#project))
2. It gets the latest production deployment URL (or uses the deployment you specified)
3. It retrieves or generates a deployment protection bypass token
4. It runs the system `curl` command with the bypass token in the `x-vercel-protection-bypass` header

When you pass a full URL or bare hostname, the CLI resolves the deployment's owning project from the URL to source the protection bypass token, so a linked project is not required.

The CLI selects the bypass token in the following priority order:

1. The `--protection-bypass` flag
2. The `VERCEL_AUTOMATION_BYPASS_SECRET` environment variable
3. An existing or newly created automation bypass token from the project's settings

Any flag you pass that is not one of `vercel curl`'s own options is passed through to the underlying `curl`, so you don't need the `--` separator for most curl flags. Use `--` only when a curl flag collides with a `vercel curl` option: `--deployment`, `--protection-bypass`, `--yes`, `--trace`, `--json`, `--help`, or `--url`. Everything after `--` is always passed to `curl`.

The command requires `curl` to be installed on your system.

## Unique options

These are options that only apply to the `vercel curl` command. When a curl flag collides with one of these option names, place it after the `--` separator so it is passed through to `curl`.

### Deployment

The `--deployment` option lets you specify a deployment ID or URL to request instead of using the production deployment.

```bash filename="terminal"
vercel curl /api/hello --deployment https://my-app-abc123.vercel.app
```

*Using the \`--deployment\` option to target a specific deployment.*

### Protection bypass

The `--protection-bypass` option lets you provide your own deployment protection bypass secret instead of automatically generating one. This is useful when you already have a bypass secret configured.

```bash filename="terminal"
vercel curl /api/hello --protection-bypass your-secret-here
```

*Using the \`--protection-bypass\` option with a manual secret.*

You can also use the [`VERCEL_AUTOMATION_BYPASS_SECRET`](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation#using-protection-bypass-for-automation) environment variable:

```bash filename="terminal"
export VERCEL_AUTOMATION_BYPASS_SECRET=your-secret-here
vercel curl /api/hello
```

*Setting the bypass secret as an environment variable.*

### Yes

The `--yes` option, shorthand `-y`, skips the confirmation prompt when linking is required. Use it in non-interactive environments like CI, or run [`vercel link`](/docs/cli/link) ahead of time to link your project and avoid the prompt entirely.

```bash filename="terminal"
vercel curl /api/hello --yes
```

*Skipping the link confirmation prompt with \`--yes\`.*

### Trace

The `--trace` option captures a [request trace](/docs/cli/traces) for the request and prints the trace request ID once the response completes. When targeting a production deployment, the command prompts for confirmation unless `--yes` is set.

```bash filename="terminal"
vercel curl --trace /api/hello
```

*Using the \`--trace\` option to capture a request trace.*

### JSON

The `--json` option only applies with `--trace`. Instead of streaming the response body to stdout, the command captures it and emits a JSON envelope with the response body and request ID:

```bash filename="terminal"
vercel curl --trace --json /api/hello
```

```json filename="stdout"
{
  "response": "...",
  "requestId": "abc-123"
}
```

*Using the \`--json\` option with \`--trace\` to emit a JSON envelope.*

## Troubleshooting

### curl command not found

Make sure `curl` is installed on your system:

```bash filename="terminal"
# macOS (using Homebrew)
brew install curl

# Ubuntu/Debian
sudo apt-get install curl

# Windows (using Chocolatey)
choco install curl
```

*Installing curl on different operating systems.*

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

The following [global options](/docs/cli/global-options) can be passed when using the `vercel curl` command:

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
- [vercel deploy](/docs/cli/deploy)
- [vercel inspect](/docs/cli/inspect)


---

[View full sitemap](/docs/sitemap)
