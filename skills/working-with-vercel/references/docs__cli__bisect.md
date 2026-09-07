---
title: vercel bisect
product: vercel
url: /docs/cli/bisect
canonical_url: "https://vercel.com/docs/cli/bisect"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Learn how to perform a binary search on your deployments to help surface issues using the vercel bisect CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/bisect.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "b463fc57e99064bc2bba7936b9b1987ace22c39b0674a62448edaf42731290f9"
---

# vercel bisect

The `vercel bisect` command can be used to perform a [binary search](https://wikipedia.org/wiki/Binary_search_algorithm "What is a binary search?") upon a set of deployments in a Vercel Project for the purpose of determining when a bug was introduced.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fbisect&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related&source_path=%2Fdocs%2Fcli%2Fbisect&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel inspect](https://vercel.com/docs/cli/inspect?from=related&source_path=%2Fdocs%2Fcli%2Fbisect&source_site=vercel-docs&relationship=related) — Learn how to retrieve information about your Vercel deployments using the vercel inspect CLI command.
- [vercel curl](https://vercel.com/docs/cli/curl?from=related&source_path=%2Fdocs%2Fcli%2Fbisect&source_site=vercel-docs&relationship=related) — Learn how to make HTTP requests to your Vercel deployments with automatic deployment protection bypass using the vercel
- [vercel remove](https://vercel.com/docs/cli/remove?from=related&source_path=%2Fdocs%2Fcli%2Fbisect&source_site=vercel-docs&relationship=related) — Learn how to remove a deployment using the vercel remove CLI command.

Full cross-link map for this page: [/docs/cli/bisect.graph.md](/docs/cli/bisect.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fbisect&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

This is similar to [git bisect](https://git-scm.com/docs/git-bisect "What is a git bisect?") but faster because you don't need to wait to rebuild each commit, as long as there is a corresponding Deployment. The command works by specifing both a *bad* Deployment and a *good* Deployment. Then, `vercel bisect` will retrieve all the deployments in between, and step by them one by one. At each step, you will perform your check and specify whether or not the issue you are investigating is present in the Deployment for that step.

Note that if an alias URL is used for either the *good* or *bad* deployment, then the URL will be resolved to the current target of the alias URL. So if your Project is currently in promote/rollback state, then the alias URL may not be the newest chronological Deployment.

> **💡 Note:** The good and bad deployments provided to `vercel bisect` must be
> **production** deployments.

## Usage

```bash filename="terminal"
vercel bisect
```

*Using the \`vercel bisect\` command will initiate an
interactive prompt where you specify a good deployment, followed by a bad
deployment and step through the deployments in between to find the first bad
deployment.*

## Unique Options

These are options that only apply to the `vercel bisect` command.

### Good

The `--good` option, shorthand `-g`, can be used to specify the initial "good" deployment from the command line. When this option is present, the prompt will be skipped at the beginning of the bisect session. A production alias URL may be specified for convenience.

```bash filename="terminal"
vercel bisect --good https://example.com
```

*Using the \`vercel bisect\` command with the
\`--good\` option.*

### Bad

The `--bad` option, shorthand `-b`, can be used to specify the "bad" deployment from the command line. When this option is present, the prompt will be skipped at the beginning of the bisect session. A production alias URL may be specified for convenience.

```bash filename="terminal"
vercel bisect --bad https://example-s93n1nfa.vercel.app
```

*Using the \`vercel bisect\` command with the
\`--bad\` option.*

### Path

The `--path` option, shorthand `-p`, can be used to specify a subpath of the deployment where the issue occurs. The subpath will be appended to each URL during the bisect session.

```bash filename="terminal"
vercel bisect --path /blog/first-post
```

*Using the \`vercel bisect\` command with the
\`--path\` option.*

### Open

The `--open` option, shorthand `-o`, will attempt to automatically open each deployment URL in your browser window for convenience.

```bash filename="terminal"
vercel bisect --open
```

*Using the \`vercel bisect\` command with the
\`--open\` option.*

### Run

The `--run` option, shorthand `-r`, provides the ability for the bisect session to be automated using a shell script or command that will be invoked for each deployment URL. The shell script can run an automated test (for example, using the `curl` command to check the exit code) which the bisect command will use to determine whether each URL is good (exit code 0), bad (exit code non-0), or should be skipped (exit code 125).

```bash filename="terminal"
vercel bisect --run ./test.sh
```

*Using the \`vercel bisect\` command with the
\`--run\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel bisect` command:

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

## Related guides

- [How to determine which Vercel Deployment introduced an issue?](/kb/guide/how-to-determine-which-vercel-deployment-introduced-an-issue)


---

[View full sitemap](/docs/sitemap)
