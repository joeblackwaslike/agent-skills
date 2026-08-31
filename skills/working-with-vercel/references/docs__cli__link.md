---
title: vercel link
product: vercel
url: /docs/cli/link
canonical_url: "https://vercel.com/docs/cli/link"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/projects
  - /docs/git
  - /docs/cli/global-options
summary: Learn how to link a local directory to a Vercel Project using the vercel link CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/link.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "e6d9980f03b88f3862ca189f9cba0163694633722f9a8c156f47850dba6ee241"
---

# vercel link

The `vercel link` command links your local directory to a [Vercel Project](/docs/projects).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Faster, predictable project linking in the Vercel CLI](https://vercel.com/changelog/faster-predictable-project-linking-in-the-vercel-cli?from=related&source_path=%2Fdocs%2Fcli%2Flink&source_site=vercel-docs&relationship=related)
- [Preserve local environment variables when linking with the Vercel CLI](https://vercel.com/changelog/preserve-local-environment-variables-when-linking-with-the-vercel-cli?from=related&source_path=%2Fdocs%2Fcli%2Flink&source_site=vercel-docs&relationship=related)
- [Linking Projects with Vercel CLI](https://vercel.com/docs/cli/project-linking?from=related&source_path=%2Fdocs%2Fcli%2Flink&source_site=vercel-docs&relationship=related) — Learn how to link existing Vercel Projects with Vercel CLI.
- [vercel open](https://vercel.com/docs/cli/open?from=related&source_path=%2Fdocs%2Fcli%2Flink&source_site=vercel-docs&relationship=related) — Learn how to open your current project in the Vercel Dashboard using the vercel open CLI command.
- [vercel build](https://vercel.com/docs/cli/build?from=related&source_path=%2Fdocs%2Fcli%2Flink&source_site=vercel-docs&relationship=related) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel git](https://vercel.com/docs/cli/git?from=related&source_path=%2Fdocs%2Fcli%2Flink&source_site=vercel-docs&relationship=related) — Learn how to manage your Git provider connections using the vercel git CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev?from=related&source_path=%2Fdocs%2Fcli%2Flink&source_site=vercel-docs&relationship=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the

Full cross-link map for this page: [/docs/cli/link.graph.md](/docs/cli/link.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Flink&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel link
```

*Using the \`vercel link\` command to link the current
directory to a Vercel Project.*

## Extended Usage

```bash filename="terminal"
vercel link [path-to-directory]
```

*Using the \`vercel link\` command and supplying a path to
the local directory of the Vercel Project.*

## Unique Options

These are options that only apply to the `vercel link` command.

### Repo&#x20;

The `--repo` option can be used to link all projects in your repository to their respective Vercel projects in one command. This command requires that your Vercel projects are using the [Git integration](/docs/git).

```bash filename="terminal"
vercel link --repo
```

*Using the \`vercel link\` command with the \`--repo\` option.*

### Yes

The `--yes` option can be used to skip questions you are asked when setting up a new Vercel Project.
The questions will be answered with the default scope and current directory for the Vercel Project name and location.

```bash filename="terminal"
vercel link --yes
```

*Using the \`vercel link\` command with the
\`--yes\` option.*

### Project

The `--project` option specifies a project name or ID. In non-interactive usage, `--project` allows you to set a project that does not match the name of the current working directory.

```bash filename="terminal"
vercel link --yes --project foo
```

*Using the \`vercel link\` command with the
\`--project\` option.*

You can also set the `VERCEL_PROJECT_ID` environment variable instead of using the `--project` flag. If both are provided, the `--project` flag takes precedence. See [CLI Global Options](/docs/cli/global-options#project) for the full precedence order when specifying a project.


---

[View full sitemap](/docs/sitemap)
