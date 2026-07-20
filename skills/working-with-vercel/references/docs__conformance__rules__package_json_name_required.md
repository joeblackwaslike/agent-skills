---
title: PACKAGE_JSON_NAME_REQUIRED
product: vercel
url: /docs/conformance/rules/PACKAGE_JSON_NAME_REQUIRED
canonical_url: "https://vercel.com/docs/conformance/rules/PACKAGE_JSON_NAME_REQUIRED"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/rules/PACKAGE_JSON_DESCRIPTION_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_PRIVATE_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_TYPE_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_SIDE_EFFECTS_REQUIRED
summary: Requires that every package.json file has the name field set to ensure each workspace has a unique identifier.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/package_json_name_required.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "d081e24e2805b8b1ec094bfc13d08dd426a58368560b88aba6c07d5c80251907"
---

# PACKAGE_JSON_NAME_REQUIRED

> **🔒 Permissions Required**: Conformance

This check ensures that every `package.json` has a `name` field. This field is important because
it used to identify the workspace in the monorepo.

See the [Node.js docs](https://nodejs.org/api/packages.html#name) for more information.

## Related Rules

- [PACKAGE\_JSON\_DESCRIPTION\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_DESCRIPTION_REQUIRED)
- [PACKAGE\_JSON\_PRIVATE\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_PRIVATE_REQUIRED)
- [PACKAGE\_JSON\_TYPE\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_TYPE_REQUIRED)
- [PACKAGE\_JSON\_SIDE\_EFFECTS\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_SIDE_EFFECTS_REQUIRED)

## How to fix

Add the `name` field to the `package.json` file that contains a unique name for
this package. The name should be understandable by someone viewing or using the
package as to what it does.


---

[View full sitemap](/docs/sitemap)
