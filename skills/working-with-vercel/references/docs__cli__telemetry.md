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
  []
summary: Learn how to manage telemetry collection.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/telemetry.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "7f265dcc818cf5ba0d3b022fbf4b04d9488be3f06f451dbae8eb07cd48ecfc46"
---

# vercel telemetry

The `vercel telemetry` command allows you to enable or disable telemetry collection.

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
