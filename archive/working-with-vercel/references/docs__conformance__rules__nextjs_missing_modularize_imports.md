---
title: NEXTJS_MISSING_MODULARIZE_IMPORTS
product: vercel
url: /docs/conformance/rules/NEXTJS_MISSING_MODULARIZE_IMPORTS
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_MISSING_MODULARIZE_IMPORTS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/changelog
  - /docs/conformance/customize
summary: modularizeImports can improve dev compilation speed for packages that use barrel files.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/nextjs_missing_modularize_imports.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "35051e4a95d57201fa67642e295e486494d6c2726341a17b7f6c8e63b1602d26"
---

# NEXTJS_MISSING_MODULARIZE_IMPORTS

> Conformance is available on Enterprise plans

> **💡 Note:** This rule has been deprecated as of version [1.10.0](/docs/conformance/changelog#1.10.0) and will be removed in 1.10.0.

`modularizeImports` is a feature of Next 13 that can reduce dev compilation times
when importing packages that are exported as barrel files. Barrel files are
convenient ways to export code from a package from a single file to make it
straightforward to import any of the code from the package. However, since they export a
lot of code from the same file, importing these packages can cause tools to do
a lot of additional work analyzing files that are unused in the application.

## How to fix

To fix this, you can add a `modularizeImports` config to `next.config.js` for
the package that uses barrel files. For example:

```js filename="next.config.js"
modularizeImports: {
  lodash: {
    transform: 'lodash/{{member}}';
  }
}
```

The exact format of the transform may differ by package, so double check how
the package uses barrel files first.

See the [Next.js docs](https://nextjs.org/docs/architecture/nextjs-compiler#modularize-imports) for
more information.

## Custom configuration

You can also specify required `modularizeImports` config for your own packages.

In your `conformance.config.jsonc` file, add:

```js filename="conformance.config.jsonc"
NEXTJS_MISSING_MODULARIZE_IMPORTS: {
  requiredModularizeImports: [
    {
      moduleDependency: 'your-package-name',
      requiredConfig: {
        transform: 'your-package-name/{{member}}',
      },
    },
  ];
}
```

This will require that any workspace in your monorepo that uses the
`your-package-name` package must use the provided `modularizeImports` config
in their `next.config.js` file.

See [Customizing Conformance](/docs/conformance/customize) for more information.

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
