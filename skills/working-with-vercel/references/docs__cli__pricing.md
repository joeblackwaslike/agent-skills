---
title: vercel pricing
product: vercel
url: /docs/cli/pricing
canonical_url: "https://vercel.com/docs/cli/pricing"
last_updated: 2026-10-07
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/pricing
  - /docs/cli/global-options
summary: Look up Hobby, Pro, and Enterprise features from the public Vercel pricing table using the CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/pricing.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "9d8474343b1b839cdde3739736a132758de2b74934e754ba29ab2d00518619ba"
---

# vercel pricing

The `vercel pricing` command reads the public pricing table and lists features grouped by the lowest plan that includes them. Use it to look up feature availability on Hobby, Pro, and Enterprise. See [Pricing](/docs/pricing) for plan and billing details.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel usage](https://vercel.com/docs/cli/usage) — Learn how to view billing usage and costs, for your Vercel account using the vercel usage CLI command.
- [vercel buy](https://vercel.com/docs/cli/buy) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel help](https://vercel.com/docs/cli/help) — Learn how to use the vercel help CLI command to get information about all available Vercel CLI commands.

Full cross-link map for this page: [/docs/cli/pricing.graph.md](/docs/cli/pricing.graph.md)
<!-- /docsgraph:related -->

## Usage

List all features or search for a feature:

```bash filename="terminal"
vercel pricing
vercel pricing "skew protection"
vercel pricing firewall --json
```

*Using \`vercel pricing\` to look up plan features.*

## Arguments

The optional `query` argument filters the pricing table. Multiple words form one search query, so `vercel pricing skew protection` and `vercel pricing "skew protection"` use the same query. The command fetches the public table each time it runs.

## Unique options

### JSON output

Use `--format json` (shorthand `-F json`) or `--json` to return structured JSON:

```bash filename="terminal"
vercel pricing "skew protection" --format json
vercel pricing firewall --json
```

The JSON result includes the query, source URL, feature groups, and a summary of matches. When the CLI can resolve your current team or account, it also includes plan information and feature availability for that plan.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel pricing` command:

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


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
