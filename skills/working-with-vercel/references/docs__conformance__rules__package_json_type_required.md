---
title: PACKAGE_JSON_TYPE_REQUIRED
product: vercel
url: /docs/conformance/rules/PACKAGE_JSON_TYPE_REQUIRED
canonical_url: "https://vercel.com/docs/conformance/rules/PACKAGE_JSON_TYPE_REQUIRED"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/rules/PACKAGE_JSON_NAME_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_DESCRIPTION_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_PRIVATE_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_SIDE_EFFECTS_REQUIRED
summary: Requires that every package.json file has the type field set to encourage using ES Modules since commonjs is the default.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/package_json_type_required.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "e5cc7181c02df12351b9b7d186c0a71e0cb72d59327d9d771c3a1baf7894e354"
---

# PACKAGE_JSON_TYPE_REQUIRED

> **🔒 Permissions Required**: Conformance

This check ensures that every `package.json` has a `type` field. This field determines
how files within the workspace are treated by default. Files are treated as
[CommonJS](https://nodejs.org/api/modules.html) by default. However, the new recommendation
is to use [ES Modules](https://nodejs.org/api/esm.html).

This field is required so that packages explicitly choose which module format to use,
preferring ES Modules when possible.

See the [Node.js docs](https://nodejs.org/api/packages.html#type) for more information.

## Related Rules

- [PACKAGE\_JSON\_NAME\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_NAME_REQUIRED)
- [PACKAGE\_JSON\_DESCRIPTION\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_DESCRIPTION_REQUIRED)
- [PACKAGE\_JSON\_PRIVATE\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_PRIVATE_REQUIRED)
- [PACKAGE\_JSON\_SIDE\_EFFECTS\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_SIDE_EFFECTS_REQUIRED)

## How to fix

The `type` field should be set to `module` when possible, although there are still situations
where `commonjs` has to be used.


---

[View full sitemap](/docs/sitemap)
