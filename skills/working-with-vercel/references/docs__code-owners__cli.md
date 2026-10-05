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
source: "https://vercel.com/docs/code-owners/cli.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "1a37759c0f4a9aba9c3a8a3c244f5de3e9f23aad71c51b644bc3f6468e5cf4bf"
---

# vercel-code-owners

> **Availability**: Conformance is available on Enterprise plans

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
[Getting Started](/docs/code-owners/getting-started#initalizing-code-owners) for more information on
using this command.

### `validate`

The `validate` command checks the syntax for all Code Owners files in the
repository for errors.

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm dlx vercel-code-owners validate
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn dlx vercel-code-owners validate
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npx vercel-code-owners validate
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bunx vercel-code-owners validate
    ```
  </Code>
</CodeBlock>


---

[View full sitemap](/docs/sitemap)
