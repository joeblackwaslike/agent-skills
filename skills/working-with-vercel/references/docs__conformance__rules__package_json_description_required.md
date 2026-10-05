---
title: PACKAGE_JSON_DESCRIPTION_REQUIRED
product: vercel
url: /docs/conformance/rules/PACKAGE_JSON_DESCRIPTION_REQUIRED
canonical_url: "https://vercel.com/docs/conformance/rules/PACKAGE_JSON_DESCRIPTION_REQUIRED"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/rules/PACKAGE_JSON_NAME_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_PRIVATE_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_TYPE_REQUIRED
  - /docs/conformance/rules/PACKAGE_JSON_SIDE_EFFECTS_REQUIRED
summary: Requires that every package.json file has the description field set.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/package_json_description_required.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "92411ec57441d6af4baf78c2a6e841c75cc6069bccd73c8d2d6dd44788c507f4"
---

# PACKAGE_JSON_DESCRIPTION_REQUIRED

> **Availability**: Conformance is available on Enterprise plans

This check ensures that every `package.json` has a `description` field.
This field is used to describe the workspace's purpose within the monorepo.

See the [Node.js docs](https://nodejs.org/api/packages.html#description) for more information.

## Related Rules

- [PACKAGE\_JSON\_NAME\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_NAME_REQUIRED)
- [PACKAGE\_JSON\_PRIVATE\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_PRIVATE_REQUIRED)
- [PACKAGE\_JSON\_TYPE\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_TYPE_REQUIRED)
- [PACKAGE\_JSON\_SIDE\_EFFECTS\_REQUIRED](/docs/conformance/rules/PACKAGE_JSON_SIDE_EFFECTS_REQUIRED)

## How to fix

Add the `description` field to the `package.json` file that explains
what the package does and when it should be used.


---

[View full sitemap](/docs/sitemap)
