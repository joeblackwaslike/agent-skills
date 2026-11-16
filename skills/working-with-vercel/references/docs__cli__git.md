---
title: vercel git
product: vercel
url: /docs/cli/git
canonical_url: "https://vercel.com/docs/cli/git"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/git
  - /docs/cli/global-options
summary: Learn how to manage your Git provider connections using the vercel git CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/git.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "4c2c4f998542d35d1073dffee81429ca5b57f815a5b93ddc78c53bd79414078e"
---

# vercel git

The `vercel git` command is used to manage a Git provider repository for a Vercel Project,
enabling deployments to Vercel through Git.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Git settings](https://vercel.com/docs/project-configuration/git-settings) — Use the project settings to manage the Git connection, enable Git LFS, and create deploy hooks.
- [Git Configuration](https://vercel.com/docs/project-configuration/git-configuration) — Learn how to configure Git for your project through vercel.json or vercel.ts.
- [vercel ci](https://vercel.com/docs/cli/ci) — Enable or disable Vercel CI for repositories, inspect runs, search logs, and rerun jobs from the command line.
- [vercel link](https://vercel.com/docs/cli/link) — Learn how to link a local directory to a Vercel Project using the vercel link CLI command.
- [Deploying GitLab Projects with Vercel](https://vercel.com/docs/git/vercel-for-gitlab) — ​Vercel for GitLab automatically deploys your GitLab projects with Vercel, providing Preview Deployment URLs, and automa

Full cross-link map for this page: [/docs/cli/git.graph.md](/docs/cli/git.graph.md)
<!-- /docsgraph:related -->

When run, Vercel CLI searches for a local `.git` config file containing at least one remote URL.
If found, you can connect it to the Vercel Project linked to your directory.

[Learn more about using Git with Vercel](/docs/git).

## Usage

```bash filename="terminal"
vercel git connect
```

*Using the \`vercel git\` command to connect a Git
provider repository from your local Git config to a Vercel Project.*

To connect a repository that isn't in your local Git config, or to connect from a directory that isn't a Git repository, pass the repository URL:

```bash filename="terminal"
vercel git connect https://github.com/user/repo.git
```

*Using the \`vercel git connect\` command with the URL of a Git provider
repository.*

```bash filename="terminal"
vercel git disconnect
```

*Using the \`vercel git\` command to disconnect a
connected Git provider repository from a Vercel Project.*

## Unique Options

These are options that only apply to the `vercel git` command.

### Yes

The `--yes` option skips the confirmation prompts of `vercel git connect` and `vercel git disconnect`. For example, Vercel CLI asks before it replaces a repository that's already connected to the project, and before it disconnects a repository. To make the change without a prompt, add `--yes`:

```bash filename="terminal"
vercel git connect --yes
```

*Using the \`vercel git connect\` command with the
\`--yes\` option.*

### Project

The `--project` option selects the Vercel Project by name or ID. Without it, `vercel git` uses the project linked to your current directory. Pass `--project` to manage the Git connection of a different project, or to run the command from a directory that isn't linked:

```bash filename="terminal"
vercel git connect --project my-project
```

*Using the \`vercel git connect\` command with the
\`--project\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel git` command:

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
