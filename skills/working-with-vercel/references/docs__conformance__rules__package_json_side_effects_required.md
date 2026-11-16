---
title: PACKAGE_JSON_PRIVATE_REQUIREDPACKAGE_JSON_SIDE_EFFECTS_REQUIRED
product: vercel
url: /docs/conformance/rules/PACKAGE_JSON_SIDE_EFFECTS_REQUIRED
canonical_url: "https://vercel.com/docs/conformance/rules/PACKAGE_JSON_SIDE_EFFECTS_REQUIRED"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/rules/PACKAGE_JSON_NAME_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_DESCRIPTION_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_PRIVATE_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_TYPE_REQUIRED
summary: Requires that every package.json file has the sideEffects field set to ensure tree-shaking works optimally.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/package_json_side_effects_required.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "3e7c061877d6c44e5b98ed7dfc4427aad975bbf693b4e3ccc04508150f7ecd7d"
---

# PACKAGE_JSON_PRIVATE_REQUIREDPACKAGE_JSON_SIDE_EFFECTS_REQUIRED

> Conformance is available on Enterprise plans

This check ensures that every `package.json` has a `sideEffects` field.
The `sideEffects` field is required for shared packages. This field helps bundlers
make assumptions about packages that improve tree shaking, or pruning
files that aren't used and don't have any global side effects.

See https://webpack.js.org/guides/tree-shaking/ for more information.

## Related Rules

- [PACKAGE\_JSON\_NAME\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_NAME_REQUIRED)
- [PACKAGE\_JSON\_DESCRIPTION\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_DESCRIPTION_REQUIRED)
- [PACKAGE\_JSON\_PRIVATE\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_PRIVATE_REQUIRED)
- [PACKAGE\_JSON\_TYPE\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_TYPE_REQUIRED)

## How to fix

The `sideEffects` field should be set to `false` unless the code in that workspace has
global side effects, in which case it should be set to `true` or an array of glob
patterns for files that do have side effects.

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
