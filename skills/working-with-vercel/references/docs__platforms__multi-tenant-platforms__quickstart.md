---
title: Quickstart
product: vercel
url: /docs/platforms/multi-tenant-platforms/quickstart
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  - /docs/projects/domains/working-with-nameservers
  - /docs/sdk
summary: Learn about quickstart on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "4b43039b4e80b74bf76c6ca2cc3440f00e2851bc57850e24ab5bd3d58f0db558"
---

# Multi-Tenant Platform Quickstart

Watch the walkthrough on [YouTube](https://www.youtube.com/watch?v=vVYlCnNjEWA).

## Types of domains

This guide walks you through setting up domains for your multi-tenant application. There are two main approaches:

### Wildcard Domains (\*.acme.com)

If you want to offer subdomains like `tenant.acme.com`, you'll need to:

1. Configure wildcard domains for subdomains like `*.acme.com`

### Custom Domains (tenant.com)

If you want to allow tenants to use their own domains, you'll need to:

1. Enable custom domain support for your tenants
2. Add domains programmatically using the Vercel SDK
3. Verify domain ownership with TXT records
4. Configure domain redirects and handle SEO
5. Clean up domains when tenants leave

You can implement either approach or both depending on your needs.

## Wildcard Domain Setup

If you plan on offering subdomains like `*.acme.com`, add a wildcard domain to your Vercel project. This requires using [Vercel's nameservers](/docs/projects/domains/working-with-nameservers) so that Vercel can manage the DNS challenges necessary for generating wildcard SSL certificates.

1. Point your domain to Vercel's nameservers (`ns1.vercel-dns.com` and `ns2.vercel-dns.com`).
2. In your Vercel project settings, add the apex domain (e.g., `acme.com`).
3. Add a wildcard domain: `.acme.com`.

Now, any `tenant.acme.com` you create—whether it's `tenant1.acme.com` or `docs.tenant1.acme.com`—automatically resolves to your Vercel deployment. Vercel issues individual certificates for each subdomain on the fly.

## Custom Domain Setup

The following steps guide you through setting up custom domain support for your tenants. This allows them to use their own domains (e.g., `customacmesite.com`) instead of subdomains.

### Step 1: Enable Custom Domains

You can also give tenants the option to bring their own domain. In that case, you'll want your code to:

1. Provision and assign the tenant's domain to your Vercel project.
2. Verify the domain (to ensure the tenant truly owns it).
3. Automatically generate an SSL certificate.

### Step 2: Add Domains Programmatically

You can add a new domain through the [Vercel SDK](/docs/sdk). For example:

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

### Step 3: Verify Domain Ownership

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

### Step 4: Configure Redirects

#### Redirecting between apex and "www"

Some tenants might want `www.customacmesite.com` to redirect automatically to their apex domain `customacmesite.com`, or the other way around.

1. Add both `customacmesite.com` and `www.customacmesite.com` to your Vercel project.
2. Configure a redirect for `www.customacmesite.com` to the apex domain by setting `redirect: customacmesite.com` through the API or your Vercel dashboard.

This ensures a consistent user experience and prevents issues with duplicate content.

#### Avoiding duplicate content across subdomains

If you offer both `tenant.acme.com` and `customacmesite.com` for the same tenant, you may want to redirect the subdomain to the custom domain (or vice versa) to avoid search engine duplicate content. Alternatively, set a canonical URL in your HTML `<head>` to indicate which domain is the "official" one.

### Step 5: Clean Up Domains

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


---

[View full sitemap](/docs/sitemap)
