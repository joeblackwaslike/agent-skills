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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "b16c7c381dcc8ec68ab2c4e387f6087a3854bd8747fa673e522138faeedc2c43"
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
