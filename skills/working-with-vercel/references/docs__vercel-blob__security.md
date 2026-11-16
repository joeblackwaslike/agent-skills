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
  - /docs/vercel-blob/python-sdk-reference
  - /docs/vercel-blob/using-blob-sdk
  - /docs/cdn-security/security-headers
summary: Learn how your Vercel Blob store is secured
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-blob/security.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "dd0fa0f1400dd225599c442344363fd66a4f27d136c53b0af595b40a064f3d0d"
---

# Security

> Vercel Blob is available on all plans
>
> Those with the owner, member, developer role can access this feature

## Private storage

For files that require authentication, use [private storage](/docs/vercel-blob/private-storage). Private Blob stores require authentication for all read and write operations. When your code runs on Vercel, the SDK uses OpenID Connect (OIDC) by default. OIDC is preferred over the long-lived `BLOB_READ_WRITE_TOKEN` because its tokens rotate automatically. Use `BLOB_READ_WRITE_TOKEN` when code runs outside Vercel or for client uploads. Files in private Blob stores cannot be accessed via public URLs. You deliver them to your users through [Vercel Functions](/docs/functions) where you implement your own authentication logic.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [Vercel WAF for Blob is now generally available](https://vercel.com/changelog/vercel-waf-for-blob-is-now-generally-available)
- [Vercel WAF for Blob is now in beta](https://vercel.com/changelog/vercel-waf-for-blob-is-now-in-beta)
- [Vercel Blob now supports OIDC authentication](https://vercel.com/changelog/vercel-blob-now-supports-oidc-authentication)
- [Vercel Private Blob is now generally available](https://vercel.com/changelog/vercel-private-blob-is-now-generally-available)
- [Vercel Blob is now generally available: Cost-efficient, durable storage](https://vercel.com/blog/vercel-blob-now-generally-available)
- [Private storage for Vercel Blob, now available in public beta](https://vercel.com/changelog/private-storage-for-vercel-blob-now-available-in-public-beta)
- [Build with Vercel Blob on Next.js](https://vercel.com/kb/guide/vercel-blob-nextjs) — Deploy the Vercel Blob Next.js Starter and learn how client uploads store images securely in a private Blob store.
- [Public Storage](https://vercel.com/docs/vercel-blob/public-storage) — Learn how to use public Vercel Blob storage to serve files accessible to anyone with the URL
- [Vercel Storage overview](https://vercel.com/docs/storage) — Store files with Vercel Blob, runtime configuration with Global Config, and application data with Marketplace databases.
- [Create a Blob store](https://vercel.com/docs/rest-api/storage/create-a-blob-store) — POST /storage/stores/blob — Create a Blob store

Full cross-link map for this page: [/docs/vercel-blob/security.graph.md](/docs/vercel-blob/security.graph.md)
<!-- /docsgraph:related -->

## Migrate from a read-write token to OIDC

Projects connected to a store with only `BLOB_READ_WRITE_TOKEN` authenticate with a static token. A read-write token never expires, so if it leaks through a `.env.local` file, CI logs, or a shared secret, anyone who has it can read and write your store until you rotate it. OIDC replaces it with short-lived tokens that Vercel issues and rotates automatically, so there is no long-lived secret to leak.

On your store's **Projects** tab, connections that still use the read-write token show an **Enable OIDC Recommended** badge next to `BLOB_READ_WRITE_TOKEN`. The migration has two steps: upgrade each connected project to OIDC, then revoke the read-write token once no code depends on it.

### Upgrade each connected project

1. Update `@vercel/blob` to `2.4.0` or later in the project. For Python, see [Authentication](/docs/vercel-blob/python-sdk-reference#authentication) in the Python SDK reference.
2. Open [your Blob store](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fstores%2Fblob%2F%5Bstore%5D%2Fprojects\&title=Go+to+your+Blob+store) in the dashboard and select the **Projects** tab.
3. On the project's row, select the **Enable OIDC Recommended** badge, or open the row's menu and select **Upgrade to OIDC**.
4. Check the detected SDK version and select **Upgrade**. Vercel adds `BLOB_STORE_ID` and `BLOB_WEBHOOK_PUBLIC_KEY` to the project. `BLOB_READ_WRITE_TOKEN` stays in place, so nothing breaks yet.
5. Redeploy the project. Existing deployments keep using the read-write token until you redeploy.
6. For local development, run `vercel env pull` to add `BLOB_STORE_ID` and `VERCEL_OIDC_TOKEN` to `.env.local`.

If the dashboard doesn't find `@vercel/blob` `2.4.0` or later in the project's dependencies, it shows a warning instead. Update the SDK, redeploy, and try again. If you've confirmed the project uses an SDK version that supports OIDC, select **Upgrade Anyway**.

**You don't need to change code that calls the SDK without a `token` option.** The SDK uses OIDC whenever `BLOB_STORE_ID` and the OIDC token are present. Code that passes `token: process.env.BLOB_READ_WRITE_TOKEN` explicitly keeps using the read-write token, because an explicit `token` always wins over OIDC. Remove the option before you revoke the token. See the [credential resolution order](/docs/vercel-blob/using-blob-sdk#resolution-order).

If the connection uses a custom environment variable prefix, the new variables use that prefix too, such as `MY_PREFIX_STORE_ID`. The SDK only reads `BLOB_STORE_ID` automatically, so replace `token: process.env.MY_PREFIX_READ_WRITE_TOKEN` with `storeId: process.env.MY_PREFIX_STORE_ID` in each SDK call.

### Revoke the read-write token

When every connected project uses OIDC, the **Projects** tab shows a banner that recommends revoking the read-write token. Before you revoke it, redeploy each project and confirm that nothing outside Vercel, such as a CI job or another host, still uses the token.

1. On the store's **Projects** tab, select **Revoke Token** in the banner.
2. Select **Revoke Token** to confirm.

Revoking removes `BLOB_READ_WRITE_TOKEN` from every connected project.

> **💡 Note:** Any code still using the read-write token stops working immediately. This
> includes deployments you haven't redeployed since the upgrade, local
> `.env.local` files, and code that runs outside Vercel, such as CI jobs or
> other hosts.

> **⚠️ Warning:** [`handleUpload`](/docs/vercel-blob/using-blob-sdk#handleupload) needs the
> read-write token to sign client tokens for browser uploads. Switch to
> [`handleUploadPresigned`](/docs/vercel-blob/using-blob-sdk#handleuploadpresigned),
> which works with OIDC, before you revoke the token.

To undo a revoke, open the store's **Settings** tab and select **Restore Token** under **Restore Read-Write Token**. Vercel reactivates the token and adds `BLOB_READ_WRITE_TOKEN` back to projects that have `BLOB_STORE_ID`.

## Public storage security

Vercel Blob URLs, although publicly accessible, are unique and hard to guess when you add a random suffix to the pathname at upload time. They consist of a unique store id, a pathname, and a unique random blob id generated when the blob is created.

> **💡 Note:** This is similar to [Share a file
> publicly](https://support.google.com/drive/answer/2494822?hl=en\&co=GENIE.Platform%3DDesktop#zippy=%2Cshare-a-file-publicly)
> in Google Docs. You should ensure that the URLs are only shared to authorized
> users

Headers that enhance security by preventing unauthorized downloads, blocking a blob from loading external content, and protecting against malicious file type manipulation, are enforced on each blob. They are:

- [`content-security-policy`](/docs/cdn-security/security-headers): `default-src 'none'; media-src 'self'; style-src 'unsafe-inline'; img-src 'self'`
- `x-content-type-options`: `nosniff`
- `content-disposition`: `inline; filename="filename.extension"` or `attachment; filename="filename.extension"`

### Encryption

All files stored on Vercel Blob are secured using AES-256 encryption. This encryption process is applied at rest and is transparent, ensuring that files are encrypted before being saved to the disk and decrypted upon retrieval.

### Firewall and WAF integration

Vercel Blob is protected by Vercel's [platform-wide firewall](/docs/vercel-firewall#platform-wide-firewall) which provides DDoS mitigation and blocks abnormal or suspicious levels of incoming requests.

You can also protect a store with your own [Vercel WAF](/docs/vercel-firewall/vercel-waf) rules, such as [custom rules](/docs/vercel-firewall/vercel-waf/custom-rules), [IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking), and [rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting). To enable it:

1. Open [your Blob store](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fstores%2Fblob%2F%5Bstore%5D%2Fsettings\&title=Go+to+your+Blob+store) in the dashboard and select the **Settings** tab.
2. In the **Firewall** section, select **Protect your store**, then **Enable firewall**.

This connects your store to `vercel-blob-default-project`, a Vercel-managed project that holds the firewall rules for your team's Blob stores. The project is team-wide, so other stores that enable firewall protection reuse it and share its rules. After enabling, Vercel redirects you to the project's firewall page where you create your rules. To update them later, return to the store's **Settings** tab and select **Configure firewall**.

> **⚠️ Warning:** The **Challenge** action serves a JavaScript challenge that only a web
> browser can solve, so requests from the Blob SDKs ([JS](/docs/vercel-blob/using-blob-sdk) and
> [Python](/docs/vercel-blob/python-sdk-reference)) and other server-side code fail with a
> 429 response. Only use **Challenge** in rules that never match your
> application's SDK traffic.

The [OWASP core ruleset](/docs/vercel-firewall/vercel-waf/managed-rulesets#configure-owasp-core-ruleset) is not supported for Blob stores.

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
