---
title: vercel telemetry
product: vercel
url: /docs/cli/telemetry
canonical_url: "https://vercel.com/docs/cli/telemetry"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Learn how to manage telemetry collection.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/telemetry.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "1b5a47c8fd6121dff0abee1bf854be56d07c0680e25071e0600ee680366274ef"
---

# vercel telemetry

The `vercel telemetry` command allows you to enable or disable telemetry collection.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Telemetry](https://vercel.com/docs/cli/about-telemetry?from=related&source_path=%2Fdocs%2Fcli%2Ftelemetry&source_site=vercel-docs&relationship=related) — Vercel CLI collects telemetry data about general usage.
- [Telemetry](https://turborepo.dev/docs/telemetry?from=related&source_path=%2Fdocs%2Fcli%2Ftelemetry&source_site=vercel-docs&relationship=related) — Understand what anonymous telemetry data Turborepo collects and how to opt out.
- [CLI Telemetry](https://eve.dev/docs/reference/telemetry?from=related&source_path=%2Fdocs%2Fcli%2Ftelemetry&source_site=vercel-docs&relationship=related) — Learn what eve CLI telemetry collects and how to control it.
- [telemetry](https://turborepo.dev/docs/reference/telemetry?from=related&source_path=%2Fdocs%2Fcli%2Ftelemetry&source_site=vercel-docs&relationship=related) — Reference for the `turbo telemetry` command that manages anonymous usage data collection.
- [vercel metrics](https://vercel.com/docs/cli/metrics?from=related&source_path=%2Fdocs%2Fcli%2Ftelemetry&source_site=vercel-docs&relationship=related) — List and query observability metrics, and inspect available dimensions and aggregations using the Vercel CLI.
- [vercel inspect](https://vercel.com/docs/cli/inspect?from=related&source_path=%2Fdocs%2Fcli%2Ftelemetry&source_site=vercel-docs&relationship=related) — Learn how to retrieve information about your Vercel deployments using the vercel inspect CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Ftelemetry&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel usage](https://vercel.com/docs/cli/usage?from=related&source_path=%2Fdocs%2Fcli%2Ftelemetry&source_site=vercel-docs&relationship=related) — Learn how to view billing usage and costs, for your Vercel account using the vercel usage CLI command.

Full cross-link map for this page: [/docs/cli/telemetry.graph.md](/docs/cli/telemetry.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Ftelemetry&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel telemetry status
```

*Using the \`vercel telemetry status\` command to show
whether telemetry collection is enabled or disabled.*

```bash filename="terminal"
vercel telemetry enable
```

*Using the \`vercel telemetry enable\` command to enable
telemetry collection.*

```bash filename="terminal"
vercel telemetry disable
```

*Using the \`vercel telemetry disable\` command to disable
telemetry collection.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel telemetry` command:

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

## Why is telemetry collected?

Vercel CLI Telemetry provides an accurate gauge of Vercel CLI feature usage, pain points, and customization across all users. This data enables tailoring the Vercel CLI to your needs, supports its continued growth and relevance, and optimal developer experience, as well as verifies if improvements are enhancing the baseline performance of all applications.

## What is being collected?

Vercel takes privacy and security seriously. Vercel CLI Telemetry tracks general usage information, such as commands and arguments used. Specifically, the following are tracked:

- Command invoked (`vercel build`, `vercel deploy`, `vercel login`, etc.)
- Version of the Vercel CLI
- General machine information (e.g. number of CPUs, macOS/Windows/Linux, whether or not the command was run within CI)

**This list is regularly audited to ensure its accuracy.**

You can view exactly what is being collected by setting the following environment variable: `VERCEL_TELEMETRY_DEBUG=1`.

When this environment variable is set, data will **not be sent to Vercel**. The data will only be printed out to the [*stderr* stream](https://en.wikipedia.org/wiki/Standard_streams), prefixed with `[telemetry]`.

An example telemetry event looks like this:

```json
{
  "id": "cf9022fd-e4b3-4f67-bda2-f02dba5b2e40",
  "eventTime": 1728421688109,
  "key": "subcommand:ls",
  "value": "ls",
  "teamId": "team_9Cdf9AE0j9ef09FaSdEU0f0s",
  "sessionId": "e29b9b32-3edd-4599-92d2-f6886af005f6"
}
```

## What about sensitive data?

Vercel CLI Telemetry **does not** collect any metrics which may contain sensitive data, including, but not limited to: environment variables, file paths, contents of files, logs, or serialized JavaScript errors.

For more information about Vercel's privacy practices, please see our [**Privacy Notice**](https://vercel.com/legal/privacy-policy) and if you have any questions, feel free to reach out to <privacy@vercel.com>.


---

[View full sitemap](/docs/sitemap)
