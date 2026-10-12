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
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "4b85f979c64f430c6a39ff5d5287d80aa72e154cc6bb1068e8273e79f9f150ae"
---

# vercel signup

The `vercel signup` command allows you to create a new Vercel account through Vercel CLI. Once sign-up is complete, you are signed in to Vercel CLI with the new account.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel logout](https://vercel.com/docs/cli/logout?from=related&source_path=%2Fdocs%2Fcli%2Fsignup&source_site=vercel-docs&relationship=related) — Learn how to logout from your Vercel account using the vercel logout CLI command.
- [vercel setup](https://vercel.com/docs/cli/setup?from=related&source_path=%2Fdocs%2Fcli%2Fsignup&source_site=vercel-docs&relationship=related) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code and Codex, and connect your
- [vercel dev](https://vercel.com/docs/cli/dev?from=related&source_path=%2Fdocs%2Fcli%2Fsignup&source_site=vercel-docs&relationship=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [vercel build](https://vercel.com/docs/cli/build?from=related&source_path=%2Fdocs%2Fcli%2Fsignup&source_site=vercel-docs&relationship=related) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel init](https://vercel.com/docs/cli/init?from=related&source_path=%2Fdocs%2Fcli%2Fsignup&source_site=vercel-docs&relationship=related) — Learn how to initialize Vercel supported framework examples locally using the vercel init CLI command.

Full cross-link map for this page: [/docs/cli/signup.graph.md](/docs/cli/signup.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fsignup&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

If you already have a Vercel account, use [`vercel login`](/docs/cli/login) instead.

## Usage

```bash filename="terminal"
vercel signup
```

*Using the \`vercel signup\` command to create a new Vercel account.*

Run [`vercel whoami`](/docs/cli/whoami) to confirm the account you are signed in as.

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
- [`--team`](/docs/cli/global-options#team)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)
