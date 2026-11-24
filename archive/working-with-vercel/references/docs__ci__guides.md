---
title: Vercel CI Guides
product: vercel
url: /docs/ci/guides
canonical_url: "https://vercel.com/docs/ci/guides"
last_updated: 2026-10-28
type: conceptual
prerequisites:
  - /docs/ci
related:
  - /docs/ci/guides/end-to-end-tests
  - /docs/ci/guides/integration-tests
  - /docs/ci/guides/github-comments
  - /docs/ci/configuration
  - /docs/ci/environment-variables
summary: Follow complete examples of common Vercel CI workflows, from end-to-end tests to pull request comments.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ci/guides.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "a59383a144e28d4e2d74fcc8daaaff8a026ca7939ea955b67d2e483048f825a6"
---

# Vercel CI Guides

These guides walk you through complete Vercel CI setups that you can copy into your repository:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel CI is now in beta](https://vercel.com/changelog/vercel-ci-is-now-in-beta)
- [vercel ci](https://vercel.com/docs/cli/ci) — Enable or disable Vercel CI for repositories, inspect runs, search logs, and rerun jobs from the command line.
- [Enable or disable Vercel CI for a connected repository](https://vercel.com/docs/rest-api/vercel-ci/enable-or-disable-vercel-ci-for-a-connected-repository) — PATCH /v1/vercel-ci/repository-settings — Update Repository Settings
- [Get Vercel CI settings for a connected repository](https://vercel.com/docs/rest-api/vercel-ci/get-vercel-ci-settings-for-a-connected-repository) — GET /v1/vercel-ci/repository-settings — Get Repository Settings
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.
- [List Vercel CI branch suggestions for a team](https://vercel.com/docs/rest-api/vercel-ci/list-vercel-ci-branch-suggestions-for-a-team) — GET /v2/vercel-ci/branches — List branches

Full cross-link map for this page: [/docs/ci/guides.graph.md](/docs/ci/guides.graph.md)
<!-- /docsgraph:related -->

- [Migrating from GitHub Actions](/kb/guide/github-actions-to-vercel-ci): Move Turborepo tasks, secrets, and required status checks to Vercel CI.
- [Running end-to-end tests](/docs/ci/guides/end-to-end-tests): Run Playwright tests against the Vercel deployment of every commit.
- [Running integration tests with a database](/docs/ci/guides/integration-tests): Start a Postgres container next to your tests with Turborepo's `with` key.
- [Commenting on pull requests](/docs/ci/guides/github-comments): Post the deployment URL to the pull request for each commit.

Each guide links to the [Configuration](/docs/ci/configuration), [Environment Variables](/docs/ci/environment-variables), and [Images](/docs/ci/image) reference pages for details about the settings it uses.

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
