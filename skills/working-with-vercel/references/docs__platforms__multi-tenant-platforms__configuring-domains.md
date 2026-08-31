---
title: Configuring Custom Domains
product: vercel
url: /docs/platforms/multi-tenant-platforms/configuring-domains
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/configuring-domains"
last_updated: 2026-08-25
type: how-to
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  - /docs/domains/working-with-nameservers
  - /docs/rest-api/sdk
summary: Add, verify, redirect, and remove wildcard and custom domains for a multi-tenant application using the Vercel SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/configuring-domains.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "4908759eab96cffadc4372c35773395f153e3bb3a3d02c495ffdc4cd69c6666a"
---

# Configuring Custom Domains

## Using wildcard domains


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build a multi-tenant app with Next.js and Vercel](https://vercel.com/kb/guide/nextjs-multi-tenant-application?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fconfiguring-domains&source_site=vercel-docs&relationship=related) — Create a Next.js application with multi-tenancy and custom domain support on Vercel.
- [How do I add a custom domain to my Vercel project?](https://vercel.com/kb/guide/how-do-i-add-a-custom-domain-to-my-vercel-project?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fconfiguring-domains&source_site=vercel-docs&relationship=related) — Learn how to add a custom domain to your Vercel project.
- [Can I use my domain on Vercel with A records?](https://vercel.com/kb/guide/a-record-and-caa-with-vercel?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fconfiguring-domains&source_site=vercel-docs&relationship=related) — Point your apex domain to Vercel with an A record \\(76.76.21.21 or your domain card's value\\), pair it with a www CNAME,
- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fconfiguring-domains&source_site=vercel-docs&relationship=related) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [Multi-tenant Reference](https://vercel.com/docs/platforms/multi-tenant-platforms/reference?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fconfiguring-domains&source_site=vercel-docs&relationship=related) — Reference for the Vercel domain API, error codes, troubleshooting, and FAQ for multi-tenant platforms.
- [Multi-Tenant Platform Quickstart](https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fconfiguring-domains&source_site=vercel-docs&relationship=related) — Set up wildcard domains, custom domains, domain verification, and redirects for a multi-tenant application on Vercel.
- [Troubleshooting domains](https://vercel.com/docs/domains/troubleshooting?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fconfiguring-domains&source_site=vercel-docs&relationship=related) — Learn about common reasons for domain misconfigurations and how to troubleshoot your domain on Vercel.
- [Working with domains](https://vercel.com/docs/domains/working-with-domains?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fconfiguring-domains&source_site=vercel-docs&relationship=related) — Learn how domains work and the options Vercel provides for managing them.
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fconfiguring-domains&source_site=vercel-docs&relationship=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.

Full cross-link map for this page: [/docs/platforms/multi-tenant-platforms/configuring-domains.graph.md](/docs/platforms/multi-tenant-platforms/configuring-domains.graph.md?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-tenant-platforms%2Fconfiguring-domains&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

If you plan on offering subdomains like `*.acme.com`, add a wildcard domain to your Vercel project. This requires using [Vercel's nameservers](/docs/domains/working-with-nameservers) so that Vercel can manage the DNS challenges necessary for generating wildcard SSL certificates.

1. Point your domain to Vercel's nameservers (`ns1.vercel-dns.com` and `ns2.vercel-dns.com`).
2. In your Vercel project settings, add the apex domain (e.g., `acme.com`).
3. Add a wildcard domain: `.acme.com`.

Now, any `tenant.acme.com` you create—whether it's `tenant1.acme.com` or `docs.tenant1.acme.com`—automatically resolves to your Vercel deployment. Vercel issues individual certificates for each subdomain on the fly.

### Protecting tenant subdomains with the Public Suffix List

If tenants can publish content or run code on your subdomains, submit your shared domain to the [Public Suffix List](https://publicsuffix.org/learn/) (PSL). The PSL is a public list of domains, such as `vercel.app`, whose subdomains belong to different owners. Browsers read the list and treat each subdomain of a listed domain as its own site.

Without a PSL entry, browsers treat `tenant1.acme.com` and `tenant2.acme.com` as part of the same site. This affects how browsers scope cookies and apply `SameSite` rules.

For example, `tenant1.acme.com` can set a cookie with `Domain=acme.com`. The browser then sends that cookie to `tenant2.acme.com`, `app.acme.com`, and the apex domain. This can add unwanted cookies to requests for another tenant or your dashboard.

Submit the domain that sits directly above each tenant name:

- For `<tenant>.acme.com`, submit `acme.com`
- For `<tenant>.sites.acme.com`, submit `sites.acme.com`

After receiving the PSL update, browsers treat each tenant subdomain as a separate site. Browsers also block tenant attempts to set cookies for the shared domain. You don't need to submit custom domains that tenants own.

#### Submitting your suffix

The PSL's private section covers domains that give subdomains to parties that do not trust each other. Adding an entry changes existing cookie and sign-in behavior.

Before you submit, test parent-scoped cookies, cross-subdomain sign-in, and code that identifies a site from its hostname. Then follow these steps:

1. Confirm that your service meets the [PSL private-domain criteria](https://github.com/publicsuffix/list/wiki/Guidelines). Only an authorized representative of the domain owner can submit the change.
2. Add the exact shared suffix to the `PRIVATE DOMAINS` section with the required company header and sort order.
3. Open a pull request with your service details, example domains, and expected site boundaries in the required template.
4. Create a permanent `_psl.<suffix>` DNS `TXT` record that contains the pull request URL.
5. Respond to the maintainers' review.
6. Wait for browsers and other clients to receive the updated list after the maintainers merge the change.

The PSL maintainers do not guarantee a review time. After a change is merged, each browser receives the update on its own schedule.

#### Protecting your platform during rollout

PSL review and browser updates can take time. Use these controls until browsers recognize your shared domain:

- Put your dashboard and authentication service under a different apex domain when possible. For example, use `app.acme.net` for tenants under `*.acme.com`.
- Prefix sensitive cookie names with [`__Host-`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#cookie_prefixes).
- Set `Secure`, `HttpOnly`, and `Path=/` on session cookies. Omit the `Domain` attribute.
- Validate the `Origin` header or use a cross-site request forgery token for requests that change data.

A cookie without a `Domain` attribute is only sent to the host that set it. For example, set a session cookie with this response header:

```http
Set-Cookie: __Host-session=your_session_value_here; Secure; HttpOnly; Path=/; SameSite=Lax
```

Browsers that support `__Host-` reject prefixed cookies with a `Domain` attribute or a path other than `/`. This prevents a sibling tenant from setting `__Host-session` for your host.

The `__Host-` prefix does not change `SameSite` behavior, so keep the `Origin` or cross-site request forgery token checks. These controls add protection but do not replace a PSL entry.

## Offering custom domains

You can also give tenants the option to bring their own domain. In that case, you'll want your code to:

1. Provision and assign the tenant's domain to your Vercel project.
2. Verify the domain (to ensure the tenant truly owns it).
3. Automatically generate an SSL certificate.

## Adding a domain programmatically

You can add a new domain through the [Vercel SDK](/docs/rest-api/sdk). For example:

```ts filename="add-domain.ts"
import { VercelCore as Vercel } from '@vercel/sdk/core.js';
import { projectsAddProjectDomain } from '@vercel/sdk/funcs/projectsAddProjectDomain.js';

const vercel = new Vercel({
  bearerToken: process.env.VERCEL_TOKEN,
});

// The 'idOrName' is your project name in Vercel, for example: 'multi-tenant-app'
await projectsAddProjectDomain(vercel, {
  idOrName: 'my-multi-tenant-app',
  teamId: 'team_1234',
  requestBody: {
    // The tenant's custom domain
    name: 'customacmesite.com',
  },
});
```

Once the domain is added, Vercel attempts to issue an SSL certificate automatically.

## Verifying domain ownership

If the domain is already in use on Vercel, the user needs to set a TXT record to prove ownership of it.

You can check the verification status and trigger manual verification:

```ts filename="verify-domain.ts"
import { VercelCore as Vercel } from '@vercel/sdk/core.js';
import { projectsGetProjectDomain } from '@vercel/sdk/funcs/projectsGetProjectDomain.js';
import { projectsVerifyProjectDomain } from '@vercel/sdk/funcs/projectsVerifyProjectDomain.js';

const vercel = new Vercel({
  bearerToken: process.env.VERCEL_TOKEN,
});

const domain = 'customacmesite.com';

const [domainResponse, verifyResponse] = await Promise.all([
  projectsGetProjectDomain(vercel, {
    idOrName: 'my-multi-tenant-app',
    teamId: 'team_1234',
    domain,
  }),
  projectsVerifyProjectDomain(vercel, {
    idOrName: 'my-multi-tenant-app',
    teamId: 'team_1234',
    domain,
  }),
]);

const { value: result } = verifyResponse;

if (!result?.verified) {
  console.log(`Domain verification required for ${domain}.`);
  // You can prompt the tenant to add a TXT record or switch nameservers.
}
```

## Handling redirects and apex domains

### Redirecting between apex and "www"

Some tenants might want `www.customacmesite.com` to redirect automatically to their apex domain `customacmesite.com`, or the other way around.

1. Add both `customacmesite.com` and `www.customacmesite.com` to your Vercel project.
2. Configure a redirect for `www.customacmesite.com` to the apex domain by setting `redirect: customacmesite.com` through the API or your Vercel dashboard.

This ensures a consistent user experience and prevents issues with duplicate content.

### Avoiding duplicate content across subdomains

If you offer both `tenant.acme.com` and `customacmesite.com` for the same tenant, you may want to redirect the subdomain to the custom domain (or vice versa) to avoid search engine duplicate content. Alternatively, set a canonical URL in your HTML `<head>` to indicate which domain is the "official" one.

## Deleting or removing domains

If a tenant cancels or no longer needs their custom domain, you can remove it from your Vercel account using the SDK:

```ts filename="remove-domain.ts"
import { VercelCore as Vercel } from '@vercel/sdk/core.js';
import { projectsRemoveProjectDomain } from '@vercel/sdk/funcs/projectsRemoveProjectDomain.js';
import { domainsDeleteDomain } from '@vercel/sdk/funcs/domainsDeleteDomain.js';

const vercel = new Vercel({
  bearerToken: process.env.VERCEL_TOKEN,
});

await Promise.all([
  projectsRemoveProjectDomain(vercel, {
    idOrName: 'my-multi-tenant-app',
    teamId: 'team_1234',
    domain: 'customacmesite.com',
  }),
  domainsDeleteDomain(vercel, {
    domain: 'customacmesite.com',
  }),
]);
```

The first call disassociates the domain from your project, and the second removes it from your account entirely.

## Troubleshooting common issues

Here are a few common issues you might run into and how to solve them:

### DNS propagation delays

After pointing your nameservers to Vercel or adding CNAME records, changes can take 24–48 hours to propagate. Use [WhatsMyDNS](https://www.whatsmydns.net/) to confirm updates worldwide.

### Forgetting to verify domain ownership

If you add a tenant's domain but never verify it (e.g., by adding a `TXT` record or using Vercel nameservers), SSL certificates won't be issued. Always check the domain's status in your Vercel project or with the SDK.

### Wildcard domain requires Vercel nameservers

If you try to add `.acme.com` without pointing to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`, wildcard SSL won't work. Make sure the apex domain's nameservers are correctly set.

### Exceeding subdomain length for preview URLs

Each DNS label has a [63-character limit](/kb/guide/why-is-my-vercel-deployment-url-being-shortened#rfc-1035). If you have a very long branch name plus a tenant subdomain, the fully generated preview URL might fail to resolve. Keep branch names concise.

### Duplicate content SEO issues

If the same site is served from both subdomain and custom domain, consider using [canonical](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#alternates) tags or auto-redirecting to the primary domain.

### Misspelled domain

A small typo can block domain verification or routing, so double-check your domain spelling.


---

[View full sitemap](/docs/sitemap)
