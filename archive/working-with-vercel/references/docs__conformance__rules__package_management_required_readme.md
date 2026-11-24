---
title: PACKAGE_MANAGEMENT_REQUIRED_README
product: vercel
url: /docs/conformance/rules/PACKAGE_MANAGEMENT_REQUIRED_README
canonical_url: "https://vercel.com/docs/conformance/rules/PACKAGE_MANAGEMENT_REQUIRED_README"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Every workspace is required to have a README.md file in the root of the workspace.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/package_management_required_readme.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "17866b62d93b9d0936a39e99f9f17b85028fcecab2331cd5e424fef96ac3b2f6"
---

# PACKAGE_MANAGEMENT_REQUIRED_README

> Conformance is available on Enterprise plans

A `README.md` file helps orient readers to the purpose of a workspace and
instructions how to use it, which makes it straightforward for people browsing the code
to understand its purpose, whether they should use it, and how to make changes
to the code.

## How to fix

Add a `README.md` file in the workspace directory. This file can contain a
description of the package, and any instructions for developers or users to
build or use the package.

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
