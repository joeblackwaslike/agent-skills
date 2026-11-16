---
title: NEXTJS_MISSING_SECURITY_HEADERS
product: vercel
url: /docs/conformance/rules/NEXTJS_MISSING_SECURITY_HEADERS
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_MISSING_SECURITY_HEADERS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Requires that security headers are set correctly for Next.js apps and contain valid directives.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/nextjs_missing_security_headers.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c4c577094456ed5de50800f62c3b046c0a11fc5371720627a14f7f89abeaa07f"
---

# NEXTJS_MISSING_SECURITY_HEADERS

> Conformance is available on Enterprise plans

Security headers are important to set to improve the security of your application.
Security headers can be set for all routes in \[`next.config.js` files]
(https://nextjs.org/docs/advanced-features/security-headers). This
conformance check requires that the security headers are set and use a valid
value.

Required headers:

- Content-Security-Policy
- Strict-Transport-Security
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

## Example

```sh
Conformance errors found!

A Conformance error occurred in test "NEXTJS_MISSING_SECURITY_HEADERS".

The security header "Strict-Transport-Security" is not set correctly. The "includeSubDomains" directive should be used in conjunction with the "preload" directive.

To find out more information and how to fix this error, visit
/docs/conformance/rules/NEXTJS_MISSING_SECURITY_HEADERS.

If this violation should be ignored, add the following entry to
/apps/docs/.allowlists/NEXTJS_MISSING_SECURITY_HEADERS.allowlist.json
and get approval from the appropriate person.

{
  "testName": "NEXTJS_MISSING_SECURITY_HEADERS",
  "reason": "TODO: Add reason why this violation is allowed to be ignored.",
  "location": {
    "workspace": "docs"
  },
  "details": {
    "header": "Strict-Transport-Security"
  }
}
```

## How to fix

Follow the [Next.js security headers documentation](https://nextjs.org/docs/advanced-features/security-headers)
to fix this Conformance test. That document will walk through each of the
headers and also links to further documentation to understand what the headers
do and how to set the best values for your application.

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
