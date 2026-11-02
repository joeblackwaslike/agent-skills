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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "c014f8bcfd202f633315ba2993030a05a82a9b64ca73def5344bb01bf9146b4d"
---

# SET_COOKIE_VALIDATION

> Conformance is available on Enterprise plans

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
