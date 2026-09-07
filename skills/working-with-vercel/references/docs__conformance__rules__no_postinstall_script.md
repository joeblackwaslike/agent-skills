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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "9dc30330c780b33e27f137c703c30e0be1ec540676f3c74bae433b545a0b2fd0"
---

# NO_POSTINSTALL_SCRIPT

> **🔒 Permissions Required**: Conformance

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
