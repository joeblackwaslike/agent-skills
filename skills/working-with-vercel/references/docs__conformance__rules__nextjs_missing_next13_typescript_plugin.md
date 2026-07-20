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
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "132715b92ba81ec1afaec747caf34d2c2f681b59f3f16233167f167f54cf436d"
---

# NEXTJS_MISSING_NEXT13_TYPESCRIPT_PLUGIN

> **🔒 Permissions Required**: Conformance

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
