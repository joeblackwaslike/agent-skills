---
title: vercel doctor
product: vercel
url: /docs/cli/doctor
canonical_url: "https://vercel.com/docs/cli/doctor"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli
  - /docs/cli/upgrade
  - /docs/cli/link
  - /docs/cli/global-options
summary: Learn how to check your Vercel CLI setup and fix problems with the vercel doctor CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/doctor.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "f3bdaec33d8d0c20b2ed02f3567c65a3fcb1523b32b96ab78d193b3f039ef38e"
---

# vercel doctor

The `vercel doctor` command checks your [Vercel CLI](/docs/cli) setup and shows the command that fixes each problem it finds. It doesn't need a login or a linked project, and it never prompts, logs in, or links a project. You and your coding agents can run it before debugging an error.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel security](https://vercel.com/docs/cli/security) — Inspect the security posture of your Vercel team from the terminal: run every security check, list findings, and scope t
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel inspect](https://vercel.com/docs/cli/inspect) — Learn how to retrieve information about your Vercel deployments using the vercel inspect CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the

Full cross-link map for this page: [/docs/cli/doctor.graph.md](/docs/cli/doctor.graph.md)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel doctor
```

*Using the \`vercel doctor\` command to check your Vercel CLI setup.*

## Checks

The command runs these checks:

| Check         | What it checks                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------- |
| CLI version   | Whether a newer version of Vercel CLI is available                                                 |
| CLI install   | How Vercel CLI was installed, and whether [`vercel upgrade`](/docs/cli/upgrade) can update it      |
| Login         | Whether you're logged in, and whether your token is valid                                          |
| Team          | Which team commands use, and whether you can access it                                             |
| Project       | Whether the current directory is [linked](/docs/cli/link) to a project that still exists           |
| vercel.json   | Whether the `vercel.json` file in the current directory is valid                                   |
| Vercel status | Whether the [Vercel status page](https://www.vercel-status.com) reports active incidents           |

Each check reports **OK**, **Warning**, **Failed**, or **Skipped**. A check that needs a login or a linked project is skipped and says why. After the results, the command lists next steps with the exact command that fixes each problem.

The command exits with code `0` when the checks run, even if some of them fail.

## Unique options

These are options that only apply to the `vercel doctor` command.

### JSON

The `--json` option prints the results as JSON. Each check includes its `id`, `status`, `message`, and the `next` commands that fix it, and `summary` counts the checks by status:

```bash filename="terminal"
vercel doctor --json
```

*Using the \`vercel doctor\` command with the \`--json\` option to read the
results in a script or coding agent.*

To list only the checks that failed:

```bash filename="terminal"
vercel doctor --json | jq -r '.checks[] | select(.status == "failed") | .id'
```

*Filtering the JSON output for the IDs of failed checks.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel doctor` command:

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
