---
title: Multi-Tenant Platform Quickstart
product: vercel
url: /docs/platforms/multi-tenant-platforms/quickstart
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart"
last_updated: 2026-09-15
type: tutorial
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  - /docs/domains/working-with-nameservers
  - /docs/domains/working-with-domains/add-a-domain
  - /docs/platforms/multi-tenant-platforms/configuring-domains
  - /docs/rest-api/sdk
summary: Build a multi-tenant Next.js app on your computer, then add wildcard and custom domains on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "5f5b9ec379bf39b4fbf055a766711e08247d2eb0861473d163315fbe26b248ce"
---

# Multi-Tenant Platform Quickstart

Watch the walkthrough on [YouTube](https://www.youtube.com/watch?v=vVYlCnNjEWA).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing the Vercel Platforms Starter Kit](https://vercel.com/blog/platforms-starter-kit)
- [How can I serve multiple projects under a single domain?](https://vercel.com/kb/guide/how-can-i-serve-multiple-projects-under-a-single-domain) — Learn how to serve multiple Vercel projects from a single domain.
- [Multi-Tenant Platform Concepts](https://vercel.com/docs/platforms/multi-tenant-platforms/concepts) — Understand tenants, domains, routing, and architecture for building multi-tenant applications on Vercel for Platforms.
- [Multi-tenant Reference](https://vercel.com/docs/platforms/multi-tenant-platforms/reference) — Reference for the Vercel domain API, error codes, troubleshooting, and FAQ for multi-tenant platforms.
- [Multi-Project Platforms Quickstart](https://vercel.com/docs/platforms/multi-project-platforms/quickstart) — Programmatically host code for user-generated or AI-generated applications on Vercel.
- [Multi-Tenant Template](https://vercel.com/docs/platforms/examples/multi-tenant-template) — Build SaaS applications that serve multiple domains from a single Next.js codebase.
- [Multi-Project Platforms Reference](https://vercel.com/docs/platforms/multi-project-platforms/reference) — API reference, error codes, troubleshooting, and FAQ for multi-project platforms on Vercel.

Full cross-link map for this page: [/docs/platforms/multi-tenant-platforms/quickstart.graph.md](/docs/platforms/multi-tenant-platforms/quickstart.graph.md)
<!-- /docsgraph:related -->

## Build the app locally

Start by building a Next.js app that serves two tenants, Acme and Globex, on your own computer. You don't need a domain for this part, only Node.js 22 or later. The app uses Next.js 16, which `create-next-app@latest` installs for you.

### Step 1: Create the app

```bash
npx create-next-app@latest my-platform --yes
cd my-platform
```

This command creates the app in a new `my-platform` folder, so you can run it from any folder, even one that already has files in it.

If you already have a Next.js 16 app that uses the App Router, you can skip this step and add the three files from steps 2 to 4 to your app. The files use relative imports, so they need no other setup. If your app uses a `src` folder, put `proxy.ts` and `lib/` in `src`.

### Step 2: List your tenants

Next, add a list of tenants. Create `lib/tenants.ts`. Both the proxy and the tenant page read from this file:

```ts filename="lib/tenants.ts"
// We keep the tenants in a Map to keep this example small. In your platform,
// you'd replace this with a database or Global Config lookup.
// Note that we use a Map instead of a plain object, so that a host such as
// "constructor" doesn't match a built-in object property.
const tenants = new Map([
  ['acme', { name: 'Acme' }],
  ['globex', { name: 'Globex' }],
]);

export function getTenant(name: string) {
  return tenants.get(name) ?? null;
}
```

### Step 3: Route each host to its tenant

Next, create `proxy.ts` in the project root, next to `package.json` (or in `src/` if your app uses a `src` folder). **Proxy** is the Next.js 16 name for Middleware, so on Next.js 15 and earlier, name the file `middleware.ts` and the function `middleware` instead.

The proxy runs before every request and decides where the request goes. It sends the root domain to your own pages, returns a 404 for an unknown tenant, and rewrites a tenant's request to that tenant's page:

```ts filename="proxy.ts"
import { NextRequest, NextResponse } from 'next/server';
import { getTenant } from './lib/tenants';

// This is your platform's own domain, such as yourapp.com.
// We default to localhost:3000 so that the app works locally out of the box.
const ROOT_DOMAIN = process.env.ROOT_DOMAIN ?? 'localhost:3000';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const { pathname } = request.nextUrl;

  // The /sites routes are internal, so we return a 404 when a visitor
  // tries to open them directly.
  if (pathname === '/sites' || pathname.startsWith('/sites/')) {
    return new NextResponse('Not found', { status: 404 });
  }

  // Requests to the root domain go to your own pages, such as your
  // marketing site and dashboard.
  if (host === ROOT_DOMAIN || host === `www.${ROOT_DOMAIN}`) {
    return NextResponse.next();
  }

  // Here we find the tenant name. For acme.yourapp.com, the tenant is "acme".
  // For a custom domain, such as acme.com, we use the full host as the name.
  const suffix = `.${ROOT_DOMAIN}`;
  const tenant = host.endsWith(suffix) ? host.slice(0, -suffix.length) : host;

  // Note that we return the 404 here in the proxy, before any page renders.
  // A page that calls notFound() inside Suspense still responds with status 200.
  if (!getTenant(tenant)) {
    return new NextResponse('Not found', { status: 404 });
  }

  // We clone nextUrl instead of building a new URL, so that the query
  // string, such as ?page=2, stays on the request.
  const url = request.nextUrl.clone();
  url.pathname = `/sites/${tenant}${pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### Step 4: Add the tenant page

The proxy rewrites each tenant's request to `/sites/<tenant>`, so the next step adds the page for that route. Create `app/sites/[tenant]/page.tsx`:

```tsx filename="app/sites/[tenant]/page.tsx"
import { Suspense } from 'react';
import { getTenant } from '../../../lib/tenants';

async function TenantName({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;

  return <h1>Welcome to {getTenant(decodeURIComponent(tenant))?.name}</h1>;
}

// We don't check for an unknown tenant here, since the proxy already
// returned a 404 for those.
// Note that we wrap the content in Suspense, since this page reads params.
// When Cache Components is on, next build fails without it.
export default function TenantPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  return (
    <Suspense>
      <TenantName params={params} />
    </Suspense>
  );
}
```

### Step 5: Run and check it

With the three files in place, run `npm run dev`, then open these addresses in your browser. Chrome and Firefox send every `*.localhost` name to your computer, so these addresses work with no extra setup. In other browsers, add the names to `/etc/hosts` first, for example `127.0.0.1 acme.localhost`.

| Address                        | Expected result                    |
| ------------------------------ | ---------------------------------- |
| `http://localhost:3000`        | Your landing page                  |
| `http://acme.localhost:3000`   | The page shows "Welcome to Acme"   |
| `http://globex.localhost:3000` | The page shows "Welcome to Globex" |
| `http://nope.localhost:3000`   | 404                                |

You can also check from a terminal by sending the host name in a `Host` header. The first command should print `200`, and the second should print `Acme`. Note that we search for `Acme` alone, since React splits the sentence in the HTML as `Welcome to <!-- -->Acme`.

```bash
curl -s -o /dev/null -w "%{http_code}\n" -H "Host: acme.localhost:3000" http://127.0.0.1:3000/
curl -s -H "Host: acme.localhost:3000" http://127.0.0.1:3000/ | grep -o Acme | head -1
```

Note that the proxy compares the full host name, including the port, so use the addresses exactly as above. If you run the app on another port, set `ROOT_DOMAIN` to match, for example `ROOT_DOMAIN=localhost:3001`.

When the app works locally, you're ready to deploy it. First, link the folder to a Vercel project with `npx vercel link` (it asks you to log in first if needed). Then set `ROOT_DOMAIN` to your domain with `npx vercel env add ROOT_DOMAIN production`, and deploy with `npx vercel deploy --prod`.

Note that the deployment's `*.vercel.app` URL returns a 404, since that host is neither your domain nor a tenant. You'll test the app with your own domain after you set up domains in the next section.

## Types of domains

After the app works locally, set up domains for your tenants. There are two main approaches:

### Wildcard Domains (\*.yourapp.com)

If you want to offer subdomains like `tenant.yourapp.com`, you'll need to:

1. Configure wildcard domains for subdomains like `*.yourapp.com`

### Custom Domains (tenant.com)

If you want to allow tenants to use their own domains, you'll need to:

1. Enable custom domain support for your tenants
2. Add domains programmatically using the Vercel SDK
3. Verify domain ownership with TXT records
4. Configure domain redirects and handle SEO
5. Clean up domains when tenants leave

You can implement either approach or both depending on your needs.

## Wildcard Domain Setup

If you plan on offering subdomains like `*.yourapp.com`, add a wildcard domain to your Vercel project. Vercel needs access to DNS challenges to issue and renew wildcard SSL certificates. To configure the domain with [Vercel's nameservers](/docs/domains/working-with-nameservers):

1. Point your domain to Vercel's nameservers (`ns1.vercel-dns.com` and `ns2.vercel-dns.com`).
2. In your Vercel project settings, add the apex domain (e.g., `yourapp.com`).
3. Add a wildcard domain: `*.yourapp.com`.

If you can't change your domain's nameservers, follow [Use wildcard domains with an external DNS provider](/docs/domains/working-with-domains/add-a-domain#use-wildcard-domains-with-an-external-dns-provider) to delegate certificate validation and configure wildcard traffic routing.

Now, any tenant subdomain you create, such as `tenant1.yourapp.com` or `tenant2.yourapp.com`, resolves to your Vercel deployment. Vercel issues one wildcard certificate for `*.yourapp.com` that covers every tenant subdomain at that level, so you don't need a certificate per tenant. A wildcard certificate covers only one subdomain level. To serve a deeper subdomain such as `docs.tenant1.yourapp.com` over HTTPS, add a wildcard domain for that level, such as `*.tenant1.yourapp.com`, which gets its own wildcard certificate.

If tenants can publish content or run code on your subdomains, submit your shared domain to the Public Suffix List so browsers isolate cookies between tenants for improved security. Follow the steps for [protecting tenant subdomains with the Public Suffix List](/docs/platforms/multi-tenant-platforms/configuring-domains#protecting-tenant-subdomains-with-the-public-suffix-list).

## Custom Domain Setup

The following steps guide you through setting up custom domain support for your tenants. This allows them to use their own domains (e.g., `customacmesite.com`) instead of subdomains.

### Step 1: Enable Custom Domains

You can also give tenants the option to bring their own domain. In that case, you'll want your code to:

1. Provision and assign the tenant's domain to your Vercel project.
2. Verify the domain (to ensure the tenant truly owns it).
3. Automatically generate an SSL certificate.

### Step 2: Add Domains Programmatically

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

To serve the tenant's content on that domain, add it to the tenant list in `lib/tenants.ts`, for example `['customacmesite.com', { name: 'Acme' }]`. Once the domain is added, Vercel attempts to issue an SSL certificate automatically. Each custom domain gets its own certificate, separate from your wildcard certificate.

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

// Note that `verified` only proves that the tenant owns the domain. Before you
// tell the tenant that the domain works, we also check that its DNS points to Vercel:
// import { domainsGetDomainConfig } from '@vercel/sdk/funcs/domainsGetDomainConfig.js';
// const { value: config } = await domainsGetDomainConfig(vercel, { domain, teamId: 'team_1234' });
// When config?.misconfigured is false, the domain serves your app.
```

### Step 4: Configure Redirects

#### Redirecting between apex and "www"

Some tenants might want `www.customacmesite.com` to redirect automatically to their apex domain `customacmesite.com`, or the other way around.

1. Add both `customacmesite.com` and `www.customacmesite.com` to your Vercel project.
2. Configure a redirect for `www.customacmesite.com` to the apex domain by setting `redirect: customacmesite.com` through the API or your Vercel dashboard.

This ensures a consistent user experience and prevents issues with duplicate content.

#### Avoiding duplicate content across subdomains

If you offer both `tenant.yourapp.com` and `customacmesite.com` for the same tenant, you may want to redirect the subdomain to the custom domain (or vice versa) to avoid search engine duplicate content. Alternatively, set a canonical URL in your HTML `<head>` to indicate which domain is the "official" one.

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
    teamId: 'team_1234',
    domain: 'customacmesite.com',
  }),
]);
```

The first call disassociates the domain from your project, and the second removes it from your account entirely.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
