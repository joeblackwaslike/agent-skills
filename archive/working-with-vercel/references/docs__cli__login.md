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
  - /docs/accounts/access-tokens
summary: Learn how to login into your Vercel account using the vercel login CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/login.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "4c33f9abe26cabb0f0777aa6a97fde91c8993c8c92f64bee5687b9ea39850d02"
---

# vercel login

The `vercel login` command allows you to login to your Vercel account through Vercel CLI.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [New Vercel CLI login flow](https://vercel.com/changelog/new-vercel-cli-login-flow)
- [Introducing eve 1.0](https://vercel.com/blog/eve-is-now-generally-available)
- [vercel logout](https://vercel.com/docs/cli/logout) — Learn how to logout from your Vercel account using the vercel logout CLI command.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [vercel inspect](https://vercel.com/docs/cli/inspect) — Learn how to retrieve information about your Vercel deployments using the vercel inspect CLI command.
- [vercel tokens](https://vercel.com/docs/cli/tokens) — Manage your personal Vercel authentication tokens from the CLI: list, create, and revoke access tokens for use with the

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

## Why Vercel CLI asks you to log in again

Vercel CLI sends a token with every command. When Vercel no longer accepts that token, the command stops with an authentication error. A token stops working when it expires or when it's deleted from your [Account Tokens page](/account/tokens).

The error message tells you where the rejected token came from:

| Token source                                           | Error message                                                                                          | Fix                                                                                                                                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The session stored by `vercel login`                   | ``The specified token is not valid. Use `vercel login` to generate a new token.``                      | Run `vercel login` again.                                                                                                                                          |
| The [`--token` option](/docs/cli/global-options#token) | ``The token provided via the `--token` option is not valid. Please provide a valid token.``            | Create a new [access token](/docs/accounts/access-tokens#create-an-access-token) and pass it instead.                                                              |
| The `VERCEL_TOKEN` environment variable                | `The token provided via VERCEL_TOKEN environment variable is not valid. Please provide a valid token.` | Create a new [access token](/docs/accounts/access-tokens#create-an-access-token) and update the variable where it's stored, such as your CI/CD provider's secrets. |

On your own machine, `vercel login` starts a new session, and your next command uses it. In a CI/CD environment, nobody can complete the login prompt, so [authenticate with a token](/docs/cli#using-in-a-ci/cd-environment) and replace it before it expires. Run [`vercel whoami`](/docs/cli/whoami) to confirm which account the CLI is authenticated as.

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
