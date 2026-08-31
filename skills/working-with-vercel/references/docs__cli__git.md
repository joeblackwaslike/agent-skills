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
summary: Learn how to manage your Git provider connections using the vercel git CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/git.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "df0ffb9cef9f8936f3407f0eae2cb53604bb6eda88b2194fdaceb3f9cc228e26"
---

# vercel git

The `vercel git` command is used to manage a Git provider repository for a Vercel Project,
enabling deployments to Vercel through Git.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Git settings](https://vercel.com/docs/project-configuration/git-settings?from=related&source_path=%2Fdocs%2Fcli%2Fgit&source_site=vercel-docs&relationship=related) — Use the project settings to manage the Git connection, enable Git LFS, and create deploy hooks.
- [vercel link](https://vercel.com/docs/cli/link?from=related&source_path=%2Fdocs%2Fcli%2Fgit&source_site=vercel-docs&relationship=related) — Learn how to link a local directory to a Vercel Project using the vercel link CLI command.
- [Git Configuration](https://vercel.com/docs/project-configuration/git-configuration?from=related&source_path=%2Fdocs%2Fcli%2Fgit&source_site=vercel-docs&relationship=related) — Learn how to configure Git for your project through vercel.json or vercel.ts.
- [vercel build](https://vercel.com/docs/cli/build?from=related&source_path=%2Fdocs%2Fcli%2Fgit&source_site=vercel-docs&relationship=related) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev?from=related&source_path=%2Fdocs%2Fcli%2Fgit&source_site=vercel-docs&relationship=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the

Full cross-link map for this page: [/docs/cli/git.graph.md](/docs/cli/git.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fgit&source_site=vercel-docs&relationship=graph)
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

```bash filename="terminal"
vercel git disconnect
```

*Using the \`vercel git\` command to disconnect a
connected Git provider repository from a Vercel Project.*

## Unique Options

These are options that only apply to the `vercel git` command.

### Yes

The `--yes` option can be used to skip connect confirmation.

```bash filename="terminal"
vercel git connect --yes
```

*Using the \`vercel git connect\` command with the
\`--yes\` option.*


---

[View full sitemap](/docs/sitemap)
