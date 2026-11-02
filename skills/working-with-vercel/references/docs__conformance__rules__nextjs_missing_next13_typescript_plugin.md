---
title: NEXTJS_MISSING_NEXT13_TYPESCRIPT_PLUGIN
product: vercel
url: /docs/conformance/rules/NEXTJS_MISSING_NEXT13_TYPESCRIPT_PLUGIN
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_MISSING_NEXT13_TYPESCRIPT_PLUGIN"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: "Applications using Next 13 should use the \"next\" TypeScript plugin."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_missing_next13_typescript_plugin.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "80ec45617bf91a8b8383e1ecd41604305702a4c1d55089a032c6404660de5202"
---

# NEXTJS_MISSING_NEXT13_TYPESCRIPT_PLUGIN

> Conformance is available on Enterprise plans

Next 13 introduced a TypeScript plugin to provide richer information for
Next.js applications using TypeScript. See the [Next.js docs](https://nextjs.org/docs/app/building-your-application/configuring/typescript#using-the-typescript-plugin) for more information.

## How to fix

Add the following to `plugins` in the `compilerOptions` of your `tsconfig.json`
file.

```json filename="tsconfig.json"
  "compilerOptions": {
    "plugins": [{ "name": "next" }]
  }
```


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
