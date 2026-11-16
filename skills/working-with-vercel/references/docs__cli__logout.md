---
title: vercel logout
product: vercel
url: /docs/cli/logout
canonical_url: "https://vercel.com/docs/cli/logout"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Learn how to logout from your Vercel account using the vercel logout CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/logout.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "40f25d449be874cef9e7bf94558a80d3ec542a43d142493c5bd5ade26cd16131"
---

# vercel logout

The `vercel logout` command allows you to logout of your Vercel account through Vercel CLI.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel login](https://vercel.com/docs/cli/login) — Learn how to login into your Vercel account using the vercel login CLI command.
- [vercel whoami](https://vercel.com/docs/cli/whoami) — Learn how to display the username of the currently logged in user with the vercel whoami CLI command.
- [vercel signup](https://vercel.com/docs/cli/signup) — Learn how to create a new Vercel account using the vercel signup CLI command.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel inspect](https://vercel.com/docs/cli/inspect) — Learn how to retrieve information about your Vercel deployments using the vercel inspect CLI command.

Full cross-link map for this page: [/docs/cli/logout.graph.md](/docs/cli/logout.graph.md)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel logout
```

*Using the \`vercel logout\` command to logout of a Vercel
account.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel logout` command:

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
