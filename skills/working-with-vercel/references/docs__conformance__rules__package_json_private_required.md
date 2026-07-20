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
source: "https://vercel.com/docs/conformance/rules/package_json_private_required.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "b0dd7a663142f9023dc93505f3b92995c910d4c3717ff1d09b59585f00d13a23"
---

# PACKAGE_JSON_PRIVATE_REQUIRED

> **🔒 Permissions Required**: Conformance

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


---

[View full sitemap](/docs/sitemap)
