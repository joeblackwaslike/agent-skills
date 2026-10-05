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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "333d7b8b2e247a6bbf8924544237814a828022a63766e21dd52d7faece64f4df"
---

# NEXTJS_MISSING_NEXT13_TYPESCRIPT_PLUGIN

> **Availability**: Conformance is available on Enterprise plans

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
