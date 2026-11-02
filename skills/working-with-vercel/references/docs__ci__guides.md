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
source: "https://vercel.com/docs/ci/guides.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "40c76e7cc85f445dadabbc2f794e2be31f76e4d460b837d91925ce5ecf15b84c"
---

# Vercel CI Guides

These guides walk you through complete Vercel CI setups that you can copy into your repository:

- [Migrating from GitHub Actions](/kb/guide/github-actions-to-vercel-ci): Move Turborepo tasks, secrets, and required status checks to Vercel CI.
- [Running end-to-end tests](/docs/ci/guides/end-to-end-tests): Run Playwright tests against the Vercel deployment of every commit.
- [Running integration tests with a database](/docs/ci/guides/integration-tests): Start a Postgres container next to your tests with Turborepo's `with` key.
- [Commenting on pull requests](/docs/ci/guides/github-comments): Post the deployment URL to the pull request for each commit.

Each guide links to the [Configuration](/docs/ci/configuration), [Environment Variables](/docs/ci/environment-variables), and [Images](/docs/ci/image) reference pages for details about the settings it uses.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
