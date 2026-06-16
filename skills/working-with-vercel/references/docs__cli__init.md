---
title: vercel init
product: vercel
url: /docs/cli/init
canonical_url: "https://vercel.com/docs/cli/init"
last_updated: 2026-05-28
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/frameworks
summary: Learn how to initialize Vercel supported framework examples locally using the vercel init CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/init.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "fa5b16c119ad5c817718458dae9b74394b78a215063d5a6d4ed83e98feebb932"
---

# vercel init

The `vercel init` command is used to initialize [Vercel supported framework](/docs/frameworks) examples locally from the examples found in the [Vercel examples repository](https://github.com/vercel/vercel/tree/main/examples).

## Usage

```bash filename="terminal"
vercel init
```

*Using the \`vercel init\` command to initialize a Vercel
supported framework example locally. You will be prompted with a list of
supported frameworks to choose from.*

## Extended Usage

```bash filename="terminal"
vercel init [framework-name]
```

*Using the \`vercel init\` command to initialize a
specific framework example from the Vercel examples
repository locally.*

```bash filename="terminal"
vercel init [framework-name] [new-local-directory-name]
```

*Using the \`vercel init\` command to initialize a
specific Vercel framework example locally and rename the directory.*

## Unique Options

These are options that only apply to the `vercel init` command.

### Force

The `--force` option, shorthand `-f`, is used to forcibly replace an existing local directory.

```bash filename="terminal"
vercel init --force
```

*Using the \`vercel init\` command with the
\`--force\` option.*

```bash filename="terminal"
vercel init gatsby my-project-directory --force
```

*Using the \`vercel init\` command with the
\`--force\` option.*


---

[View full sitemap](/docs/sitemap)
