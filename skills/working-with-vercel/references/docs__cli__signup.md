---
title: vercel signup
product: vercel
url: /docs/cli/signup
canonical_url: "https://vercel.com/docs/cli/signup"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/login
  - /docs/cli/whoami
  - /docs/cli/global-options
summary: Learn how to create a new Vercel account using the vercel signup CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/signup.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "7bf2915291f35d853f8e522d30cc5f86d5892a0f5eec1d6d59c81f9dea14be3c"
---

# vercel signup

The `vercel signup` command allows you to create a new Vercel account through Vercel CLI. Once sign-up is complete, you are signed in to Vercel CLI with the new account.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel logout](https://vercel.com/docs/cli/logout) — Learn how to logout from your Vercel account using the vercel logout CLI command.
- [Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel) — Learn how to Sign in with Vercel
- [vercel dev](https://vercel.com/docs/cli/dev) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel help](https://vercel.com/docs/cli/help) — Learn how to use the vercel help CLI command to get information about all available Vercel CLI commands.

Full cross-link map for this page: [/docs/cli/signup.graph.md](/docs/cli/signup.graph.md)
<!-- /docsgraph:related -->

If you already have a Vercel account, use [`vercel login`](/docs/cli/login) instead.

## Usage

```bash filename="terminal"
vercel signup
```

*Using the \`vercel signup\` command to create a new Vercel account.*

The command asks for your email address, then opens the sign-up page in your browser, where you create the account with that email address.

Run [`vercel whoami`](/docs/cli/whoami) to confirm the account you are signed in as.

## Unique options

These are options that only apply to the `vercel signup` command.

### Email

The `--email` option sets the email address for the new account, so the command doesn't ask for it. It's required when Vercel CLI can't prompt you, for example when a coding agent runs the command:

```bash filename="terminal"
vercel signup --email user@example.com
```

*Using the \`vercel signup\` command with the \`--email\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel signup` command:

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
