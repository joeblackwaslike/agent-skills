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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "b259b41f084897315c762bdadb5de2a590190af9275c03856996ea6f25210259"
---

# Consent Page

When users sign in to your application for the first time, Vercel shows them a consent page that displays:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Sign in with Vercel from the Dashboard](https://vercel.com/docs/sign-in-with-vercel/manage-from-dashboard?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fconsent-page&source_site=vercel-docs&relationship=related) — Learn how to manage Sign in with Vercel from the Dashboard
- [Scopes and Permissions](https://vercel.com/docs/sign-in-with-vercel/scopes-and-permissions?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fconsent-page&source_site=vercel-docs&relationship=related) — Learn how to manage scopes and permissions for Sign in with Vercel
- [AI SDK and MCP](https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fconsent-page&source_site=vercel-docs&relationship=related) — Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.
- [Troubleshooting Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel/troubleshooting?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fconsent-page&source_site=vercel-docs&relationship=related) — Learn how to troubleshoot common errors with Sign in with Vercel
- [Vercel Connect product terms](https://vercel.com/docs/connect/legal?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fconsent-page&source_site=vercel-docs&relationship=related) — Product terms governing your use of Vercel Connect, including Customer Managed Connectors, Vercel Managed Connectors, an

Full cross-link map for this page: [/docs/sign-in-with-vercel/consent-page.graph.md](/docs/sign-in-with-vercel/consent-page.graph.md?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fconsent-page&source_site=vercel-docs&relationship=graph)
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
