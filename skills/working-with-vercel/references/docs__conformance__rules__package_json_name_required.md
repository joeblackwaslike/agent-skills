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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "26978c4291bd3bf97f1742067749eae0db3cdc0e8084c7e9233e818db642b2ea"
---

# PACKAGE_JSON_NAME_REQUIRED

> Conformance is available on Enterprise plans

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
