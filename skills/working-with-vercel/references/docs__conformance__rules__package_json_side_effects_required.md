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
source: "https://vercel.com/docs/conformance/rules/package_json_side_effects_required.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "65c37536fa5782845d76ff5e62979aa4afc7b10169fd1181bf86719cd64be5e7"
---

# PACKAGE_JSON_PRIVATE_REQUIREDPACKAGE_JSON_SIDE_EFFECTS_REQUIRED

> **🔒 Permissions Required**: Conformance

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


---

[View full sitemap](/docs/sitemap)
