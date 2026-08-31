---
title: Security
product: vercel
url: /docs/vercel-blob/security
canonical_url: "https://vercel.com/docs/vercel-blob/security"
last_updated: 2026-08-03
type: conceptual
prerequisites:
  - /docs/vercel-blob
related:
  - /docs/vercel-blob/private-storage
  - /docs/functions
  - /docs/vercel-firewall
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall/vercel-waf/custom-rules
summary: Learn how your Vercel Blob store is secured
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-blob/security.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "1b531cf049019c7e6b3f4b167561ad46ce2aab266d098e6dfc741814494db4f7"
---

# Security

> **🔒 Permissions Required**: Vercel Blob


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel WAF for Blob is now generally available](https://vercel.com/changelog/vercel-waf-for-blob-is-now-generally-available?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fsecurity&source_site=vercel-docs&relationship=related)
- [Vercel WAF for Blob is now in beta](https://vercel.com/changelog/vercel-waf-for-blob-is-now-in-beta?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fsecurity&source_site=vercel-docs&relationship=related)
- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fsecurity&source_site=vercel-docs&relationship=related) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [Vercel Private Blob is now generally available](https://vercel.com/changelog/vercel-private-blob-is-now-generally-available?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fsecurity&source_site=vercel-docs&relationship=related)
- [Vercel security overview](https://vercel.com/docs/security?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fsecurity&source_site=vercel-docs&relationship=related) — Vercel provides built-in and customizable features to ensure that your site is secure.
- [Public Storage](https://vercel.com/docs/vercel-blob/public-storage?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fsecurity&source_site=vercel-docs&relationship=related) — Learn how to use public Vercel Blob storage to serve files accessible to anyone with the URL
- [CDN security](https://vercel.com/docs/cdn-security?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fsecurity&source_site=vercel-docs&relationship=related) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fsecurity&source_site=vercel-docs&relationship=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Encryption and TLS](https://vercel.com/docs/cdn-security/encryption?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fsecurity&source_site=vercel-docs&relationship=related) — Learn how Vercel encrypts data in transit and at rest.

Full cross-link map for this page: [/docs/vercel-blob/security.graph.md](/docs/vercel-blob/security.graph.md?from=related&source_path=%2Fdocs%2Fvercel-blob%2Fsecurity&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Private storage

For files that require authentication, use [private storage](/docs/vercel-blob/private-storage). Private Blob stores require authentication for all read and write operations. When your code runs on Vercel, the SDK uses OpenID Connect (OIDC) by default. OIDC is preferred over the long-lived `BLOB_READ_WRITE_TOKEN` because its tokens rotate automatically. Use `BLOB_READ_WRITE_TOKEN` when code runs outside Vercel or for client uploads. Files in private Blob stores cannot be accessed via public URLs. You deliver them to your users through [Vercel Functions](/docs/functions) where you implement your own authentication logic.

## Public storage security

Vercel Blob URLs, although publicly accessible, are unique and hard to guess when you use the `addRandomSuffix: true` option. They consist of a unique store id, a pathname, and a unique random blob id generated when the blob is created.

> **💡 Note:** This is similar to [Share a file
> publicly](https://support.google.com/drive/answer/2494822?hl=en\&co=GENIE.Platform%3DDesktop#zippy=%2Cshare-a-file-publicly)
> in Google Docs. You should ensure that the URLs are only shared to authorized
> users

Headers that enhance security by preventing unauthorized downloads, blocking external content from being embedded, and protecting against malicious file type manipulation, are enforced on each blob. They are:

- `content-security-policy`: `default-src "none"`
- `x-frame-options`: `DENY`
- `x-content-type-options`: `nosniff`
- `content-disposition`: `attachment/inline; filename="filename.extension"`

### Encryption

All files stored on Vercel Blob are secured using AES-256 encryption. This encryption process is applied at rest and is transparent, ensuring that files are encrypted before being saved to the disk and decrypted upon retrieval.

### Firewall and WAF integration

Vercel Blob is protected by Vercel's [platform-wide firewall](/docs/vercel-firewall#platform-wide-firewall) which provides DDoS mitigation and blocks abnormal or suspicious levels of incoming requests.

You can also protect a store with your own [Vercel WAF](/docs/vercel-firewall/vercel-waf) rules, such as [custom rules](/docs/vercel-firewall/vercel-waf/custom-rules), [IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking), and [rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting). To enable it:

1. Open [your Blob store](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fstores%2Fblob%2F%5Bstore%5D%2Fsettings\&title=Go+to+your+Blob+store) in the dashboard and select the **Settings** tab.
2. In the **Firewall** section, select **Protect your store**, then **Enable firewall**.

This connects your store to `vercel-blob-default-project`, a Vercel-managed project that holds the firewall rules for your team's Blob stores. The project is team-wide, so other stores that enable firewall protection reuse it and share its rules. After enabling, Vercel redirects you to the project's firewall page where you create your rules. To update them later, return to the store's **Settings** tab and select **Configure firewall**.

> **⚠️ Warning:** The **Challenge** action serves a JavaScript challenge that only a web
> browser can solve, so requests from the [Blob
> SDK](/docs/vercel-blob/using-blob-sdk) and other server-side code fail with a
> 429 response. Only use **Challenge** in rules that never match your
> application's SDK traffic.

The [OWASP core ruleset](/docs/vercel-firewall/vercel-waf/managed-rulesets#configure-owasp-core-ruleset) is not supported for Blob stores.


---

[View full sitemap](/docs/sitemap)
