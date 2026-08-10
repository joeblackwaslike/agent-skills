---
title: NO_CORS_HEADERS
product: vercel
url: /docs/conformance/rules/NO_CORS_HEADERS
canonical_url: "https://vercel.com/docs/conformance/rules/NO_CORS_HEADERS"
last_updated: 2026-07-15
type: conceptual
prerequisites:
  []
related:
  []
summary: Warns when CORS header (or header-like) configuration is detected, requiring that configuration to be allowlisted.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/no_cors_headers.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "ac9bc3e68a445cb65aad636f2a5ec6a63aa6edf4dd8b9cd0c473b314f8005cc0"
---

# NO_CORS_HEADERS

> **🔒 Permissions Required**: Conformance

Misconfiguring CORS ([Cross Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS))
headers can introduce security risks, potentially exposing private and/or
secure information such as API keys and user data.

> **💡 Note:** This rule is not meant to block usage of CORS. Instead, it is designed to flag
> potentially risky configuration for review by the appropriate engineer(s) or
> team(s).

For more information around the risks associated with CORS, including testing
for potential vulnerabilities, see:

- [OWASP: HTML5 Security Cheat Sheet - Cross Origin Resource Sharing](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#cross-origin-resource-sharing)
- [OWASP: Web Security Testing Guide - Testing Cross Origin Resource Sharing](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side_Testing/07-Testing_Cross_Origin_Resource_Sharing)
- [OWASP: CORS OriginHeaderScrutiny](https://owasp.org/www-community/attacks/CORS_OriginHeaderScrutiny)

## Examples

The examples below are common approaches to settings CORS headers in JavaScript
applications. All of these examples will be caught by this rule.

```ts
response.headers.set('Access-Control-Allow-Origin', '*');

const headers = {
  'Access-Control-Allow-Credentials': true,
};

const options = {
  headers: [
    {
      key: 'Access-Control-Max-Age',
      value: 600,
    },
  ],
};

const headers = new Headers();
headers.append('Access-Control-Allow-Methods', '*');
```

Additionally, this rule will catch partial matches, such as a template literal.
In this example, the rule will match the `"Access-Control-"` part of the
template literal.

```ts
const headers = new Headers();
headers.append(`Access-Control-${HEADER_TYPE}`, '*');
```

## How to fix

Engineers should reach out to the appropriate engineer(s) or team(s) for a
security review of the configuration.

When requesting a review, please provide as much information as possible around
the proposed CORS configuration. Where applicable, include information around
alternative approaches, and why this approach is preferable.

As there are many ways to configure CORS headers in applications, this rule
will match any string that looks like a possible CORS header. We've tried to
mitigate the risk of false-positives, but if they occur they will need to be
added to the allowlists.


---

[View full sitemap](/docs/sitemap)
