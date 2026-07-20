---
title: NEXTJS_SAFE_URL_IMPORTS
product: vercel
url: /docs/conformance/rules/NEXTJS_SAFE_URL_IMPORTS
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_SAFE_URL_IMPORTS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/customize
summary: Prevent unsafe URL Imports from being added to Next.js applications.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_safe_url_imports.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "273e77766e35542e98e96dea9f948b58aa3f9f567fc3add757060388e9195e04"
---

# NEXTJS_SAFE_URL_IMPORTS

> **🔒 Permissions Required**: Conformance

URL imports are an experimental feature that allows you to import modules directly
from external servers (instead of from the local disk). When you opt-in, and
supply URL prefixes inside `next.config.js`, like so:

```js filename="next.config.js"
module.exports = {
  experimental: {
    urlImports: ['https://example.com/assets/', 'https://cdn.skypack.dev'],
  },
};
```

If any of the URLs have not been added to the safe import comformance configuration,
then this will cause this rule to fail.

## How to fix

Engineers should reach out to the appropriate engineer(s) or team(s) for a
security review of the URL import configuration.

When requesting a review, please provide as much information as possible around
the proposed URL being added, and if there any security implications for using
the URL.

If this URL is deemed safe for general use, it can be added to the list of approved URL imports. This can be done by following the [Customizing Conformance](/docs/conformance/customize#configuring-a-conformance-rule) docs to add the URL to your `conformance.config.jsonc` file:

```json filename="conformance.config.jsonc"
"NEXTJS_SAFE_URL_IMPORTS": {
  urlImports: [theUrlToAdd],
}
```


---

[View full sitemap](/docs/sitemap)
