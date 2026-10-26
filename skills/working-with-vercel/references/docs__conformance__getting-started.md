---
title: Getting Started with Conformance
product: vercel
url: /docs/conformance/getting-started
canonical_url: "https://vercel.com/docs/conformance/getting-started"
last_updated: 2026-07-15
type: tutorial
prerequisites:
  []
related:
  - /docs/private-registry
  - /docs/cli
  - /docs/cli/login
  - /docs/conformance/allowlist
  - /docs/code-owners/getting-started
summary: Learn how to set up Conformance for your codebase.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/getting-started.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "a4edeca61594594a594d9e83cb36758e3bb94d347caaaf27c24310f8105c91fc"
---

# Getting Started with Conformance

> Conformance is available on Enterprise plans

To [set up Conformance](#setting-up-conformance-in-your-repository) in your repository, you must:

- Set up [Vercel's private npm registry](/docs/private-registry) to install the necessary packages
- [Install and initialize](/docs/conformance/getting-started#setting-up-conformance-in-your-repository) Conformance in your repository

If you've already set up Code Owners, you may have already completed some of these steps.

**Agent prompt**

```text
Help me set up Conformance for this project. First, make sure the Vercel CLI is installed (`npm i -g vercel`). If I'm using Claude Code or Cursor, install the Vercel Plugin (`npx plugins add vercel/vercel-plugin`). For other agents, install Vercel Skills (`npx skills add vercel-labs/agent-skills`). Then: 1. Run `vercel link` to connect the project. 2. Enable conformance by adding the conformance configuration to the project. Set up rules to enforce code quality and best practices across the codebase.
```

## Prerequisites

### Get access to Conformance

To enable Conformance for your Enterprise team, you'll need to request access through your Vercel account administrator.

### Setting up Vercel's private npm registry

Vercel distributes packages with the `@vercel-private` scope through our private npm registry, and requires that each user using the package authenticates through a Vercel account.

To use the private npm registry, you'll need to follow the documentation to:

- [Set up your local environment](/docs/private-registry#setting-up-your-local-environment) – This should be completed by the team owner, but each member of your team will need to log in
- [Set up Vercel](/docs/private-registry#setting-up-vercel) – This should be completed by the team owner
- [Optionally, set up Conformance for use with CI](/docs/private-registry#setting-up-your-ci-provider) – This should be completed by the team owner

## Setting up Conformance in your repository

This section guides you through setting up Conformance for your repository.

- ### Set up the Vercel CLI
  The Conformance CLI is separate to the [Vercel CLI](/docs/cli), however it
  uses the Vercel CLI for authentication.

  Before continuing, please ensure that the Vercel CLI is [installed](/docs/cli#installing-vercel-cli)
  and that you are [logged in](/docs/cli/login).

- ### Initialize Conformance
  Use the CLI to automatically initialize Conformance in your project. Start by running this command in your repository's root:

  **pnpm**
  ```bash
  pnpm --package=@vercel-private/conformance dlx vercel-conformance init
  ```
  **yarn**
  ```bash
  yarn --package=@vercel-private/conformance dlx vercel-conformance init
  ```
  **npm**
  ```bash
  npx --package=@vercel-private/conformance -- vercel-conformance init
  ```
  **bun**
  ```bash
  bunx --package=@vercel-private/conformance vercel-conformance init
  ```
  > **💡 Note:** `yarn dlx` only works with Yarn version 2 or newer, for Yarn v1 use <br />
  > `yarn -DW add @vercel-private/conformance && yarn vercel-conformance init`
  After running, check the installation success by executing:

  **pnpm**
  ```bash
  pnpm conformance
  ```
  **yarn**
  ```bash
  yarn conformance
  ```
  **npm**
  ```bash
  npx conformance
  ```
  **bun**
  ```bash
  bunx conformance
  ```

- ### Review the generated changes
  The Conformance `init` command creates the following changes:
  - First, it installs the CLI package in your root `package.json` and every workspace `package.json`, if your monorepo uses workspaces.
  - It also adds a `conformance` script to the `scripts` field of every
    `package.json`. This script runs Conformance.
  - It adds any existing Conformance errors to allowlists, letting you start using Conformance without immediate fixes and allowing you to gradually resolve these allowlist entries over time. Learn more about Conformance Allowlists in the [documentation](/docs/conformance/allowlist).
  Once you've reviewed these, open a pull request with the changes and merge it.

- ### Add owners for allowlist files
  \*\* This step assumes you have [set up Code Owners](/docs/code-owners/getting-started).\*\*

  Conformance allows specific individuals to review modifications to allowlist files.
  Add a `.vercel.approvers` file at your repository's root:
  ```text copy filename=".vercel.approvers"
  **/*.allowlist.json @org/team:required
  ```
  Now, changes to allowlist files need a review from someone on
  `@org/team` before merging.

  Learn more about [wildcard syntax](/docs/code-owners/code-approvers#globstar-pattern)
  and [`:required` syntax](/docs/code-owners/code-approvers#required) from Code Owners.

- ### Add Conformance to your CI system
  You can integrate Conformance in your CI to avoid merging errors into your code. To learn more, see [Setting up your CI provider](/docs/private-registry#setting-up-your-ci-provider).

## More resources

- [Code Owners](/docs/code-owners)
- [Conformance](/docs/conformance)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
