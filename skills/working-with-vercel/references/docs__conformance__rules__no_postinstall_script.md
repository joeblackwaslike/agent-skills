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
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "59d0318fd51e03a2aef19410707ab6deeecb531f000c8793ec12f166f6dee278"
---

# NO_POSTINSTALL_SCRIPT

> **🔒 Permissions Required**: Conformance

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
