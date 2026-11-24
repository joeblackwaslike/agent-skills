---
title: vercel-code-owners
product: vercel
url: /docs/code-owners/cli
canonical_url: "https://vercel.com/docs/code-owners/cli"
last_updated: 2025-11-19
type: conceptual
prerequisites:
  []
related:
  - /docs/cli
  - /docs/cli/login
  - /docs/code-owners/getting-started
summary: Learn how to use Code Owners with the CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/code-owners/cli.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "292e3a60dcece842764058739121d5fd6e3fabde714f8217f9c5201d190d5fa5"
---

# vercel-code-owners

> Conformance is available on Enterprise plans

The `vercel-code-owners` command provides functionality to initialize and validate
Code Owners in your repository.

## Using the CLI

The Code Owners CLI is separate to the [Vercel CLI](/docs/cli). However you
**must** ensure that the Vercel CLI is
[installed](/docs/cli#installing-vercel-cli) and that you are [logged
in](/docs/cli/login) to use the Code Owners CLI.

## Sub-commands

The following sub-commands are available for this CLI.

### `init`

The `init` command sets up code owners files in the repository. See
[Getting Started](/docs/code-owners/getting-started#initializing-code-owners) for more information on
using this command.

### `validate`

The `validate` command checks the syntax for all Code Owners files in the
repository for errors.

**pnpm**

```bash
pnpm dlx vercel-code-owners validate
```

**yarn**

```bash
yarn dlx vercel-code-owners validate
```

**npm**

```bash
npx vercel-code-owners validate
```

**bun**

```bash
bunx vercel-code-owners validate
```

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
