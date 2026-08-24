---
title: Consent Page
product: vercel
url: /docs/sign-in-with-vercel/consent-page
canonical_url: "https://vercel.com/docs/sign-in-with-vercel/consent-page"
last_updated: 2026-02-26
type: how-to
prerequisites:
  - /docs/sign-in-with-vercel
related:
  - /docs/sign-in-with-vercel/authorization-server-api
summary: Learn how the consent page works when users authorize your app
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sign-in-with-vercel/consent-page.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "e98788c5d0929ce20a03de8b54a285b64baa1df3ae4b9d766fffbf087ee7cb4c"
---

# Consent Page

When users sign in to your application for the first time, Vercel shows them a consent page that displays:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage from Dashboard](https://vercel.com/docs/sign-in-with-vercel/manage-from-dashboard?from=related) — Learn how to manage Sign in with Vercel from the Dashboard
- [Scopes & Permissions](https://vercel.com/docs/sign-in-with-vercel/scopes-and-permissions?from=related) — Learn how to manage scopes and permissions for Sign in with Vercel
- [Troubleshooting](https://vercel.com/docs/sign-in-with-vercel/troubleshooting?from=related) — Learn how to troubleshoot common errors with Sign in with Vercel
- [Concepts](https://vercel.com/docs/kms/concepts?from=related) — Understand how Vercel KMS rotates signing keys and how it authorizes signing, management, and verification.
- [Legal](https://vercel.com/docs/connect/legal?from=related) — Product terms governing your use of Vercel Connect, including Customer Managed Connectors, Vercel Managed Connectors, an

Full cross-link map for this page: [/docs/sign-in-with-vercel/consent-page.graph.md](/docs/sign-in-with-vercel/consent-page.graph.md)
<!-- /docsgraph:related -->

- Your app's name and logo
- The permissions your app requests
- Two actions: **Allow** or **Cancel**

Users review these permissions before deciding whether to authorize your app.

## When users click Allow

When a user clicks **Allow**, Vercel redirects them to your authorization callback URL with a `code` query parameter:

```plaintext
https://example.com/callback?code=abc123...
```

Your application exchanges this code for tokens using the [Token Endpoint](/docs/sign-in-with-vercel/authorization-server-api#token-endpoint).

## When users click Cancel

When a user clicks **Cancel**, Vercel redirects them to your authorization callback URL with error parameters:

```bash
https://example.com/callback?
  error=access_denied&
  error_description=The user canceled the authorization process
```

Your application should handle this error and display an appropriate message to the user.

## Returning users

Users only see the consent page the first time they authorize your app, and if you add new scopes and permissions to your app. On subsequent sign-ins, Vercel redirects them immediately to your callback URL with a new authorization code.

To force users to see the consent page again, include `prompt=consent` in your authorization request. Learn more in the [Authorization Endpoint](/docs/sign-in-with-vercel/authorization-server-api#authorization-endpoint) documentation.


---

[View full sitemap](/docs/sitemap)
