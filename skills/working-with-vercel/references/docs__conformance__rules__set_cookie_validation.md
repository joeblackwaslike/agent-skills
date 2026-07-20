---
title: SET_COOKIE_VALIDATION
product: vercel
url: /docs/conformance/rules/SET_COOKIE_VALIDATION
canonical_url: "https://vercel.com/docs/conformance/rules/SET_COOKIE_VALIDATION"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Prevents usage of cookies that do not conform to the allowed cookie policy.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/set_cookie_validation.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "13236fd932ec6b74660a60eb5f3971abac399af6cc70af089623c8844bda308c"
---

# SET_COOKIE_VALIDATION

> **🔒 Permissions Required**: Conformance

It's a good practice to enforce a cookie policy across a workspace to ensure only
certain cookies are allowed to be set.

## How to fix

Engineers should reach out to the appropriate engineer(s) or team(s) for a
review of the defined cookie and request the cookie name be added to the
allowed cookie policy list. This can be set in the `conformance.config.jsonc` configuration
file as follows:

```json filename="conformance.config.jsonc"
"SET_COOKIE_VALIDATION": {
  "cookieAllowList": ["some-cookie-name"]
}
```


---

[View full sitemap](/docs/sitemap)
