---
title: NEXTJS_MISSING_OPTIMIZE_PACKAGE_IMPORTS
product: vercel
url: /docs/conformance/rules/NEXTJS_MISSING_OPTIMIZE_PACKAGE_IMPORTS
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_MISSING_OPTIMIZE_PACKAGE_IMPORTS"
last_updated: 2025-09-24
type: conceptual
prerequisites:
  []
related:
  []
summary: optimizePackageImports improves compilation speed for packages that use barrel files or export many modules.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_missing_optimize_package_imports.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "b36511adb496c71c14be01bc6fc7b8d680d0a314e7d230b914f98eaf5139fd82"
---

# NEXTJS_MISSING_OPTIMIZE_PACKAGE_IMPORTS

> **🔒 Permissions Required**: Conformance

[`optimizePackageImports`](https://nextjs.org/docs/pages/api-reference/next-config-js/optimizePackageImports)
is a feature added in Next 13.5 that improves compilation speed when importing packages that use barrel
exports and export many named exports. This replaces the [`modularizeImports`](https://nextjs.org/docs/architecture/nextjs-compiler#modularize-imports)
configuration option as it optimizes many of the most popular open source libraries automatically.

Barrel files make the process of exporting code from a package convenient by allowing all the code to be exported from a single file. This makes it easier to import any part of the package into your application. However, since they export a lot of code from the same file, importing these packages can cause tools to do additional work analyzing files that are unused in the application.

For further reading, see:

- [How we optimized package imports in Next.js](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
- [`optimizePackageImports`](https://nextjs.org/docs/pages/api-reference/next-config-js/optimizePackageImports)

> **💡 Note:** As of Next.js 14.2.3, this configuration option is still experimental. Check
> the Next.js documentation for the latest information here:
> [`optimizePackageImports`](https://nextjs.org/docs/pages/api-reference/next-config-js/optimizePackageImports).

## How to fix

To fix this, you can add a `modularizeImports` config to `next.config.js` for
the package that uses barrel files. For example:

```js filename="next.config.js"
experimental: {
  optimizePackageImports: ['@vercel/geistcn/components'];
}
```


---

[View full sitemap](/docs/sitemap)
