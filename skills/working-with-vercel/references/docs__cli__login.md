---
title: vercel login
product: vercel
url: /docs/cli/login
canonical_url: "https://vercel.com/docs/cli/login"
last_updated: 2026-11-14
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/deploy
  - /docs/deployments/deploy-without-logging-in
  - /docs/cli/signup
  - /docs/cli/global-options
summary: Learn how to login into your Vercel account using the vercel login CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/login.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "28788cdcb329487e8c11d65af23b8e065c250905ed054afd0463f982348ce254"
---

# vercel login

The `vercel login` command allows you to login to your Vercel account through Vercel CLI.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [New Vercel CLI login flow](https://vercel.com/changelog/new-vercel-cli-login-flow)
- [vercel logout](https://vercel.com/docs/cli/logout) — Learn how to logout from your Vercel account using the vercel logout CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [vercel inspect](https://vercel.com/docs/cli/inspect) — Learn how to retrieve information about your Vercel deployments using the vercel inspect CLI command.
- [vercel whoami](https://vercel.com/docs/cli/whoami) — Learn how to display the username of the currently logged in user with the vercel whoami CLI command.
- [vercel open](https://vercel.com/docs/cli/open) — Learn how to open your current project in the Vercel Dashboard using the vercel open CLI command.

Full cross-link map for this page: [/docs/cli/login.graph.md](/docs/cli/login.graph.md)
<!-- /docsgraph:related -->

You don't need an account or a login to deploy. Run [`vercel deploy --temporary`](/docs/cli/deploy#temporary) to get a live URL, then claim the project later. See [Deploying without logging in](/docs/deployments/deploy-without-logging-in).

If you don't have a Vercel account yet, use [`vercel signup`](/docs/cli/signup) to create one.

## Usage

```bash filename="terminal"
vercel login
```

*Using the \`vercel login\` command to login to a Vercel account.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel login` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).

## Related guides

- [Why is Vercel CLI asking me to log in?](/kb/guide/why-is-vercel-cli-asking-me-to-log-in)

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
