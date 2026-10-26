---
title: NO_POSTINSTALL_SCRIPT
product: vercel
url: /docs/conformance/rules/NO_POSTINSTALL_SCRIPT
canonical_url: "https://vercel.com/docs/conformance/rules/NO_POSTINSTALL_SCRIPT"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: "Prevent the use of `\"postinstall\"` script in packages."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/no_postinstall_script.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "cfd8c916807530106dfccc395a0596ffef5e1312b3d023b3f4a888be69a51277"
---

# NO_POSTINSTALL_SCRIPT

> Conformance is available on Enterprise plans

> **💡 Note:** This rule is available from version 1.4.0.

Modifying, adding, or updating any dependencies in your application triggers the execution of the `"postinstall"` script. Consequently, incorporating a `"postinstall"` script in your application's package.json leads to increased installation times for all users.

## How to fix

If you hit this issue, you can resolve it by removing the `"postinstall"` script in the `package.json` file.

```JSX filename="package.json" {3}
{
  "scripts": {
    "postinstall": "sleep 360"
  },
}
```


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
