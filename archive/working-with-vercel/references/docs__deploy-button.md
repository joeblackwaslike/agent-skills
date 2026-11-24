---
title: Working with the Deploy Button
product: vercel
url: /docs/deploy-button
canonical_url: "https://vercel.com/docs/deploy-button"
last_updated: 2025-03-12
type: conceptual
prerequisites:
  []
related:
  []
summary: Deploy public Git projects with the Deploy Button, and set up new projects with Vercel and GitHub, GitLab, or Bitbucket
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/deploy-button.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "a64b1855307b48d92ce160baafa08b24b9d5865a367f0b114450331026516fb0"
---

# Working with the Deploy Button

The Deploy Button allows users to deploy a new project through the Vercel Project creation flow, while cloning the source Git repository to GitHub, GitLab, or Bitbucket.

You can [create your Deploy Button with the generator below](#generate-your-own).

The Vercel Project creation flow allows users to deploy a Git repository, create a project with Vercel, and clone the source repository into their GitHub, GitLab, or Bitbucket account.

## Snippets

With the Vercel Project creation flow, you can add various URL query parameters to control the experience a user will have, depending on the requirements of your project.

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
