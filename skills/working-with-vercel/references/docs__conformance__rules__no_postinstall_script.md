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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/no_postinstall_script.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "3b5aa6b182362eb1bc0e8f19524c0c3f93fff449c3db8d77e01553ce53880b3c"
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
