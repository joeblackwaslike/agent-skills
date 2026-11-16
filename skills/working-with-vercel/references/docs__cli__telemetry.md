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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/telemetry.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "b845c182a0d58bbdcd0d1b2978abf4961b0a70e5f2cbf40f74fbc6e8a1f6d756"
---

# vercel telemetry

The `vercel telemetry` command allows you to enable or disable telemetry collection.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Telemetry](https://vercel.com/docs/cli/about-telemetry) — Vercel CLI collects telemetry data about general usage.
- [Telemetry](https://turborepo.dev/docs/telemetry) — Understand what anonymous telemetry data Turborepo collects and how to opt out.
- [CLI Telemetry](https://eve.dev/docs/reference/telemetry) — Learn what eve CLI telemetry collects and how to control it.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [Accessing Metrics with Vercel CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.

Full cross-link map for this page: [/docs/cli/telemetry.graph.md](/docs/cli/telemetry.graph.md)
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

`vercel telemetry enable` and `vercel telemetry disable` save your choice on your computer. To turn telemetry off for specific runs, for example in CI, set the `VERCEL_TELEMETRY_DISABLED=1` environment variable. It applies only to runs where the variable is set and does not change your saved choice.

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
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).

## Why is telemetry collected?

Vercel CLI Telemetry provides an accurate gauge of Vercel CLI feature usage, pain points, and customization across all users. This data enables tailoring the Vercel CLI to your needs, supports its continued growth and relevance, and optimal developer experience, as well as verifies if improvements are enhancing the baseline performance of all applications.

## What is being collected?

Vercel takes privacy and security seriously. Vercel CLI Telemetry tracks general usage information, such as commands and arguments used. This includes:

- Command invoked (`vercel build`, `vercel deploy`, `vercel login`, etc.)
- Version of the Vercel CLI
- General machine information (e.g. number of CPUs, macOS/Windows/Linux, whether or not the command was run within CI)
- Identifiers associated with your account

**This list is regularly audited to ensure its accuracy.**

You can view exactly what is being collected by setting the following environment variable: `VERCEL_TELEMETRY_DEBUG=1`.

When this environment variable is set, data will **not be sent to Vercel**. The data will only be printed out to the [*stderr* stream](https://en.wikipedia.org/wiki/Standard_streams), after a `['telemetry']: Flushing Events` line.

An example telemetry event looks like this:

```json
{
  "id": "cf9022fd-e4b3-4f67-bda2-f02dba5b2e40",
  "eventTime": 1728421688109,
  "key": "subcommand:list",
  "value": "list",
  "sessionId": "e29b9b32-3edd-4599-92d2-f6886af005f6",
  "invocationId": "0b6c1f3a-7d42-4e9b-8a15-3c9d2e7f4b60",
  "teamId": "team_9Cdf9AE0j9ef09FaSdEU0f0s",
  "userId": "Uf8Kd02LmQ6pRt3VxZ7b1Nc5",
  "projectId": "prj_4Kd8Fs2Lm6Qp0Rt3Vx7Zb1Nc5Hg9"
}
```

## What about sensitive data?

Vercel CLI Telemetry **does not** collect any metrics which may contain sensitive data, including, but not limited to: environment variables, file paths, contents of files, logs, or serialized JavaScript errors.

For more information about Vercel's privacy practices, please see our [**Privacy Notice**](https://vercel.com/legal/privacy-policy) and if you have any questions, feel free to reach out to <privacy@vercel.com>.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
