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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/nextjs_safe_url_imports.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "cc97efc93d21f20f2f90c3ee7cbeaf322f19e7c99bc6c9907df1c62dc7f343cc"
---

# NEXTJS_SAFE_URL_IMPORTS

> Conformance is available on Enterprise plans

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

If any of the URLs have not been added to the safe import conformance configuration,
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
