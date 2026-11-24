---
title: PACKAGE_JSON_PRIVATE_REQUIRED
product: vercel
url: /docs/conformance/rules/PACKAGE_JSON_PRIVATE_REQUIRED
canonical_url: "https://vercel.com/docs/conformance/rules/PACKAGE_JSON_PRIVATE_REQUIRED"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/rules/PACKAGE_JSON_NAME_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_DESCRIPTION_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_TYPE_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_SIDE_EFFECTS_REQUIRED
summary: Requires that every package.json file has the private field set to prevent accidental publishing to npm.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/package_json_private_required.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "617d2916cd3122e485356ba5c875a1258e627453bed6128fd317c08a59cb807a"
---

# PACKAGE_JSON_PRIVATE_REQUIRED

> Conformance is available on Enterprise plans

This check ensures that every `package.json` has the `private` field set to true or false.
This field ensures that the workspace is not accidentally published to npm. In a monorepo,
this should be the default to prevent packages from being accidentally published and can be explicitly set to
`false` to indicate that the package can be published.

## Related Rules

- [PACKAGE\_JSON\_NAME\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_NAME_REQUIRED)
- [PACKAGE\_JSON\_DESCRIPTION\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_DESCRIPTION_REQUIRED)
- [PACKAGE\_JSON\_TYPE\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_TYPE_REQUIRED)
- [PACKAGE\_JSON\_SIDE\_EFFECTS\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_SIDE_EFFECTS_REQUIRED)

## How to fix

Packages should set `private` to `true` unless the package is
intended to be published in which case it can be explicitly set to `false`.

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
