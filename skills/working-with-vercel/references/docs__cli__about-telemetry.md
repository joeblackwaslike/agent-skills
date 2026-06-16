---
title: Telemetry
product: vercel
url: /docs/cli/about-telemetry
canonical_url: "https://vercel.com/docs/cli/about-telemetry"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/telemetry
summary: Vercel CLI collects telemetry data about general usage.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/about-telemetry.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "7c9d999b4f706a20f1384c4f580e90cfc2248f73f50f54e3c539600f4976c855"
---

# Telemetry

> **💡 Note:** Participation in this program is optional, and you may
> [opt-out](#how-do-i-opt-out-of-vercel-cli-telemetry) if you would prefer not
> to share any telemetry information.

## Why is telemetry collected?

Vercel CLI Telemetry collects telemetry to improve Vercel's products and services, including the developer experience, platform performance, and AI features. For full details on how Vercel uses the data it collects, see our [Privacy Notice](https://vercel.com/legal/privacy-policy).

## What is being collected?

Vercel takes privacy and security seriously. Vercel CLI Telemetry tracks general usage information, such as commands and arguments used. This includes:

- Command invoked (`vercel build`, `vercel deploy`, `vercel login`, etc.)
- Version of the Vercel CLI
- General machine information (e.g. number of CPUs, macOS/Windows/Linux, whether or not the command was run within CI)
- Identifiers associated with your account

You can view exactly what is being collected by setting the following environment variable: `VERCEL_TELEMETRY_DEBUG=1`.

When this environment variable is set, data will **not be sent to Vercel**.
The data will only be printed out to the [*stderr* stream](https://en.wikipedia.org/wiki/Standard_streams), prefixed with `[telemetry]`.

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

## How do I opt-out of Vercel CLI telemetry?

You may use the [vercel telemetry](/docs/cli/telemetry) command to manage the telemetry collection status. This sets a global configuration value on your computer.

You may opt-out of telemetry data collection by running `vercel telemetry disable`:

```bash filename="terminal"
vercel telemetry disable
```

You may check the status of telemetry collection at any time by running `vercel telemetry status`:

```bash filename="terminal"
vercel telemetry status
```

You may re-enable telemetry if you'd like to re-join the program by running the following:

```bash filename="terminal"
vercel telemetry enable
```

Alternatively, you may opt-out by setting an environment variable: `VERCEL_TELEMETRY_DISABLED=1`. This will only apply for runs where the environment variable is set and will not change your configured telemetry status.


---

[View full sitemap](/docs/sitemap)
