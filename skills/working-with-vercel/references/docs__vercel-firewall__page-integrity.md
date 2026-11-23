---
title: Page Integrity
product: vercel
url: /docs/vercel-firewall/page-integrity
canonical_url: "https://vercel.com/docs/vercel-firewall/page-integrity"
last_updated: 2026-07-15
type: conceptual
prerequisites:
  - /docs/vercel-firewall
related:
  - /docs/vercel-firewall/priority-projects
  - /docs/vercel-firewall/vercel-waf/custom-rules
summary: Monitor, review, and block the scripts and connections on your pages to meet PCI requirements.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-firewall/page-integrity.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "68023c9f75f3d5a5ba26b7d8e8bc5ac2693a3a819fc37986a7ebec04db22b45c"
---

# Page Integrity

> Page Integrity is available in Beta on Enterprise and Pro plans for [Priority projects](/docs/vercel-firewall/priority-projects).

Page Integrity keeps an inventory of every script that runs on your pages, the third-party network destinations your pages connect to, and the security headers your pages send. New scripts and connections, changes to approved scripts, and changes to security headers appear in the inventory for you to review, and Vercel notifies your team when a new script or connection appears. You can then block scripts and connections that you haven't approved.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Priority Projects now in public beta](https://vercel.com/changelog/priority-projects-now-in-public-beta)
- [How to conduct PCI scans on Vercel: A complete guide to IP safelisting](https://vercel.com/kb/guide/how-to-conduct-pci-scans-on-vercel-guide) — Scan and verify your Vercel deployments for secure, PCI-compliant payment processing.
- [vercel page-integrity](https://vercel.com/docs/cli/page-integrity) — Turn Page Integrity monitoring on and off, check its status, and review the scripts, headers, and connections your pages
- [Content Security Policy](https://vercel.com/docs/cdn-security/security-headers) — Learn how the Content Security Policy \\(CSP\\) offers defense against web vulnerabilities, its key features, and best pra
- [Vercel WAF](https://vercel.com/docs/vercel-firewall/vercel-waf) — Learn how to secure your website with the Vercel Web Application Firewall \\(WAF\\)
- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.
- [Read Firewall Actions by Project](https://vercel.com/docs/rest-api/security/read-firewall-actions-by-project) — GET /v1/security/firewall/events — Retrieve firewall actions for a project Rule names are resolved against the project's

Full cross-link map for this page: [/docs/vercel-firewall/page-integrity.graph.md](/docs/vercel-firewall/page-integrity.graph.md)
<!-- /docsgraph:related -->

Page Integrity uses the browser's built-in [Content Security Policy](https://developer.mozilla.org/docs/Web/HTTP/CSP) (CSP) reporting, so Vercel doesn't add any JavaScript to your pages. It's designed to help you meet PCI DSS 4.0 requirements 6.4.3 (script management) and 11.6.1 (tamper detection).

## How it works

Page Integrity operates in three stages:

1. **Monitor**: Vercel's CDN injects a `Content-Security-Policy-Report-Only` header on a sample of requests to your monitored pages. The browser reports every script it loads back to Vercel, where each one is added to your project's resource inventory and fingerprinted with a content hash that ignores cosmetic changes like whitespace, comments, and minifier renames.
2. **Review**: Page Integrity marks a new script, a structural change to an approved script, or a change to a monitored security response header for review in the resource inventory, so a reviewer can approve or reject it. Each decision is recorded with its business justification.
3. **Block**: Once your inventory is reviewed, you can turn on enforcement to instruct the browser to block any script that is not in your approved list.

Vercel also monitors the security-impacting response headers on your pages (`Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, and `X-Content-Type-Options`) and marks any change from the stored baseline for review in the inventory.

## Getting started

Turn on Page Integrity for a project from the dashboard or the Vercel CLI.

#### Dashboard

1. Select your project from the [Dashboard](/dashboard).
2. Open **Firewall** in the sidebar, then select **Page Integrity**.
3. Select **Configure**.
4. Configure the page paths you want to monitor, such as `/checkout` or `/cart/*`. Only requests that match these paths receive the report-only CSP header.

#### CLI

Run `vercel page-integrity enable` with the paths you want to monitor:

```bash filename="terminal"
vercel page-integrity enable --path "/checkout/:path*"
```

Use `--exact` for an exact path or `--regex` for a regular expression, and repeat a flag to monitor more paths. Only requests that match these paths receive the report-only CSP header. Run `vercel page-integrity status` to check that monitoring is on.

Leave the feature in monitoring mode for at least seven days so it can capture the full range of scripts that load across different traffic patterns, and [review the resource inventory](#review-the-inventory) as scripts and connections arrive.

> **💡 Note:** Page Integrity sets the CSP header on the document response for a monitored
> path, so the header only applies when the browser loads that page with a full
> page navigation. If a user reaches a monitored page through a client-side
> navigation, such as a Next.js `<Link>`, the browser keeps the CSP of the page
> the user started on, and Page Integrity doesn't monitor or block scripts on
> the monitored page. Make sure that links to monitored pages trigger a full
> page load, for example with a standard `<a>` element.

> **💡 Note:** Page Integrity discovers scripts from sampled production traffic, so allow
> time for low-traffic pages to be observed before you assume the inventory is
> complete.

## Review the inventory

Review the resource inventory before you turn on notifications or blocking. Each resource in the inventory has one of the following statuses:

| Status        | Meaning                                                              |
| ------------- | -------------------------------------------------------------------- |
| Needs review  | Page Integrity observed the resource, and no one has reviewed it yet. |
| Approved      | A reviewer approved the resource.                                    |
| Auto-approved | The resource matches a script approval rule.                         |
| Rejected      | A reviewer rejected the resource.                                    |

Review resources from the dashboard, or use the Vercel CLI to find the ones that need review.

#### Dashboard

1. From the **Page Integrity** tab, select a resource with the **Needs review** status.
2. Enter a business justification. Page Integrity requires a justification for every approval and rejection, and records it with the reviewer and the time of the decision.
3. To approve the resource, choose **All environments** or **Pre-production only** under **Approve for**, then select **Approve**. To reject it, select **Reject**.

#### CLI

Run `vercel page-integrity scripts list`, `connections list`, or `headers list` to list the inventory, and `inspect` to see one resource:

```bash filename="terminal"
vercel page-integrity scripts list --status pending
vercel page-integrity scripts inspect https://js.stripe.com/v3/
```

The `pending` status matches **Needs review** in the dashboard. The CLI lists and inspects resources, so approve or reject them from the dashboard.

To review several resources at once, select them in the inventory and review them together. The justification you enter applies to every selected resource.

### Group similar resources

Some resources differ only by a value that changes on every request, such as a cache-busting token in a URL. To review them as one entry, group them:

- **Connection patterns** group connections that differ only by subdomain or path. Page Integrity suggests patterns for common cases, such as cache-busting tokens, domain sharding, and tracking parameters, and you can also write a custom pattern.
- **Script approval rules** group scripts that differ only by their final numeric path segment. Page Integrity approves future scripts that match the rule automatically and gives them the **Auto-approved** status. Host wildcards aren't supported.

### Block scripts from your own domain

Content Security Policy allows every script served from your own domain, so rejecting a same-origin script in the inventory doesn't stop it from loading. To block a same-origin script, deny its path with a [WAF Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules). The review dialog links to **Create Firewall rule** for these scripts.

## Enable notifications

Vercel notifies your team when something on a monitored page changes. Vercel sends a notification when:

- A new script appears
- A page connects to a new third-party network destination

Changes to the content of an approved script, and to monitored security response headers, appear in the inventory for review but don't send notifications.

You can configure notifications once monitoring is on. To choose who receives them:

1. From the **Page Integrity** tab, select **Configure**.
2. Under **Notifications**, toggle **Subscribe Team Owners** to send notifications to every owner on the team.
3. Toggle **Notify Me** to send notifications to your own account.
4. Toggle **Connection Notifications** to get notified about new third-party network connections. Turning this off doesn't affect new script notifications, and new connections still appear in the inventory.
5. Select **Save**.

## Enable blocking

When blocking is enabled, Vercel's CDN builds a `Content-Security-Policy` header from your approved inventory and applies it to monitored pages. The browser blocks any script that is not in the approved list before it can run. Blocking is enforced by the browser engine, so a compromised script on the page cannot disable it.

Before you turn on blocking, your inventory must contain approved or rejected entries.

To enable blocking:

1. From the **Page Integrity** tab, select **Configure**.
2. Review the preview which lists the CSP rule that would be configured. Any resources not on the list will be blocked.
3. Toggle **Enable Blocking**. The enforcement percentage starts at 5 percent.
4. Set **Enforcement Scope** to **Non-Production Environments**. Blocking applies to preview deployments and all custom environments while production remains in report-only mode.
5. Under **When a new resource is detected**, choose **Allow it** to let new resources run until you review them, or **Block it** to block them until you approve them.
6. Test preview and custom-environment traffic, then review the production resource inventory for scripts that still need approval.
7. When production is ready, set **Enforcement Scope** to **All Environments**.
8. Gradually increase the enforcement percentage to 100%.

While blocking is enforced, Vercel returns a `403` response for a monitored page whose security response header you rejected. If **When a new resource is detected** is set to **Block it**, a security response header that isn't in your inventory yet also returns a `403`.

If your origin already sends a `Content-Security-Policy` header, Vercel merges your approved inventory into it:

- Vercel replaces the `script-src` directive with your approved scripts, and the `connect-src` directive with your approved connections. Other directives pass through unchanged.
- Vercel removes `'unsafe-inline'` and `'unsafe-eval'` from `script-src`. To keep them, turn on **Keep unsafe script-src keywords** in the Page Integrity settings.
- If the origin policy uses `'strict-dynamic'`, Vercel doesn't enforce blocking on that page. It sends the policy in report-only mode instead.

### Script nonces

The blocking Content Security Policy header requires that nonces are added to any inline script on the page. Vercel automatically generates a nonce value included in the `Content-Security-Policy` header and provides that value to your application in the `x-nonce` request header. Your application can fetch the value from the request header and then use it anywhere that your application uses an inline script.

If your site runs inline scripts that can't carry the nonce, turn on **Disable nonce injection** in the Page Integrity settings. Vercel then doesn't add a nonce to `script-src` or send the `x-nonce` header.

If using Next.js, follow the nonces documentation in the [Next.js Content Security Policy guide](https://nextjs.org/docs/app/guides/content-security-policy#nonces).

## Pricing

Page Integrity is billed by the number of Page Integrity views. This charge is separate from the cost of the [Priority project](/docs/vercel-firewall/priority-projects).

| Item                  | Rate                                 |
| --------------------- | ------------------------------------ |
| Page Integrity views  | $2.00 per 1,000 Page Integrity views |

How Vercel counts Page Integrity views:

- A Page Integrity view is a page view on a path that Page Integrity monitors. Vercel doesn't bill page views on paths you don't monitor.
- One Page Integrity view covers up to 100 scripts on the page. A page with more scripts counts as one additional view for each additional 100 scripts.

To stop Page Integrity charges, turn off Page Integrity for the project, run `vercel page-integrity disable`, or [downgrade the project from Priority](/docs/vercel-firewall/priority-projects#downgrade-a-project), which turns Page Integrity off.

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
