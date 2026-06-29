---
title: Reference
product: vercel
url: /docs/platforms/multi-tenant-platforms/reference
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/reference"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  - /docs/platforms/platform-elements/blocks/custom-domain
  - /docs/platforms/platform-elements/actions/add-custom-domain
  - /docs/rest-api/reference/endpoints/domains/add-an-existing-domain-to-the-vercel-platform
  - /docs/rest-api/reference/endpoints/domains/get-information-for-a-single-domain
  - /docs/rest-api/reference/endpoints/domains/get-a-domains-configuration
summary: Learn about reference on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/reference.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "a3cc0cacae712e10f30f0afbd8726fe2e8cbc7739dc06b1f18d3fb516dc8606c"
---

# Multi-tenant Reference

## Custom blocks

Start with our Custom [Blocks](/docs/platforms/platform-elements/blocks/custom-domain) and [Actions](/docs/platforms/platform-elements/actions/add-custom-domain) that speed up your usage of the Vercel API.

## Domain API reference

### Add domain

Add a domain to your Vercel project programmatically using the [create or transfer domain API](/docs/rest-api/reference/endpoints/domains/add-an-existing-domain-to-the-vercel-platform).

**SDK**:

```ts filename="add-domain.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.domains.createOrTransferDomain({
    teamId: 'team_1a2b3c4d5e6f7g8h9i0j1k2l',
    slug: 'my-team-url-slug',
    requestBody: {
      name: 'example.com',
      method: 'add',
      token: 'fdhfr820ad#@FAdlj$$',
    },
  });

  console.log(result);
}

run();
```

### Get domain status

Check domain configuration and verification status using the [check domain API](/docs/rest-api/reference/endpoints/domains/get-information-for-a-single-domain).

**SDK**:

```ts filename="get-domain-status.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.domains.getDomain({
    domain: 'example.com',
    teamId: 'team_1a2b3c4d5e6f7g8h9i0j1k2l',
    slug: 'my-team-url-slug',
  });

  console.log(result);
}

run();
```

### Verify domain

Trigger domain ownership verification using the [domain configuration API](/docs/rest-api/reference/endpoints/domains/get-a-domains-configuration).

**SDK**:

```ts filename="verify-domain.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.domains.getDomainConfig({
    domain: 'example.com',
    teamId: 'team_1a2b3c4d5e6f7g8h9i0j1k2l',
    slug: 'my-team-url-slug',
  });

  console.log(result);
}

run();
```

### Remove domain

Remove a domain from your project using the [remove domain API](/docs/rest-api/reference/endpoints/domains/remove-a-domain-by-name).

**SDK**:

```ts filename="remove-domain.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.domains.deleteDomain({
    domain: 'example.com',
    teamId: 'team_1a2b3c4d5e6f7g8h9i0j1k2l',
    slug: 'my-team-url-slug',
  });

  console.log(result);
}

run();
```

### List domains

Get all domains for a project using the [list domains API](/docs/rest-api/reference/endpoints/domains/list-all-the-domains).

**REST API**:

```ts filename="list-domains.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.domains.getDomains({
    limit: 20,
    since: 1609499532000,
    until: 1612264332000,
    teamId: 'team_1a2b3c4d5e6f7g8h9i0j1k2l',
    slug: 'my-team-url-slug',
  });

  console.log(result);
}

run();
```

### Error codes

| Code                    | Description                       | Solution                                |
| ----------------------- | --------------------------------- | --------------------------------------- |
| `domain_already_in_use` | Domain is used by another project | Verify domain ownership with TXT record |
| `invalid_domain`        | Domain format is invalid          | Check domain spelling and format        |
| `forbidden`             | Insufficient permissions          | Check API token permissions             |
| `rate_limit_exceeded`   | Too many requests                 | Wait and retry with exponential backoff |

## Troubleshooting

### DNS Propagation Delays

**Problem**: Domain not resolving after adding to project.

**Solution**:

- DNS changes take 24 to 48 hours to propagate globally
- Use [WhatsMyDNS](https://www.whatsmydns.net/) to check propagation
- Verify nameservers are set correctly
- Clear your local DNS cache: `sudo dscacheutil -flushcache` (macOS)

### Domain Verification Failures

**Problem**: Domain verification failing with TXT record added.

**Solution**:

- Wait 5 to 10 minutes after adding TXT record
- Verify TXT record is set correctly: `dig TXT _vercel.tenant1.com`
- Ensure no trailing dots in TXT value
- Check for duplicate TXT records
- Try verification again via SDK

### Wildcard Domain Not Working

**Problem**: Subdomains not routing to your application.

**Solution**:

- Verify nameservers point to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`
- Confirm wildcard domain (`.yourapp.com`) is added to project
- Wait for DNS propagation (up to 48 hours)
- Check wildcard certificate status in project settings
- Ensure apex domain is also added to project

### SSL Certificate Not Issued

**Problem**: Domain shows "Certificate Error" in browser.

**Solution**:

- Complete domain verification first
- Wait 5 to 10 minutes for certificate issuance
- Check domain status in Vercel dashboard
- Ensure no CAA records blocking Let's Encrypt
- Verify domain is not on SSL blacklist

### Preview URL Not Resolving

**Problem**: Preview deployment URLs not working with custom domains.

**Solution**:

- Preview URLs with custom domains require Enterprise plan
- Use subdomain-based preview URLs: `branch-name---project.vercel.app`
- Contact sales to upgrade for multi-tenant preview URLs
- Keep branch names under 63 characters (DNS label limit)

### SEO Duplicate Content

**Problem**: Same content served on multiple domains.

**Solution**:

- Set canonical URLs pointing to primary domain
- Redirect subdomain to custom domain (or vice versa)
- Use consistent domain in sitemaps
- Configure 301 redirects in middleware

```tsx filename="app/layout.tsx"
// app/layout.tsx
export async function generateMetadata() {
  return {
    alternates: {
      canonical: 'https://primary-domain.com',
    },
  };
}
```

## FAQ

### What's the difference between Multi-Tenant and Multi-Project?

**Multi-Tenant**: Single codebase serving multiple tenants with their own domains. All tenants share the same deployment.

**Multi-Project**: Multiple projects, each with unique code and isolated deployments. Each tenant has their own Vercel project.

Use Multi-Tenant when all tenants need the same functionality but different content. Use Multi-Project when tenants need custom code.

### How many domains can I add per project?

- **Hobby**: 50 domains
- **Pro**: Unlimited (soft limit: 100,000)
- **Enterprise**: Unlimited (soft limit: 1,000,000)

Soft limits can be increased by [contacting support](/help).

### How do I get unlimited domains?

Upgrade to the Pro plan for unlimited custom domains. [View pricing](/pricing).

### What are multi-tenant preview URLs?

Multi-tenant preview URLs let you test changes for specific tenants before deploying to production. They follow the format: `tenant1---project-git-branch.vercel.app`.

This feature is **Enterprise only**. Contact your sales representative to enable it.

### How is pricing calculated?

Multi-tenant applications are priced based on:

- **Team plan**: Hobby, Pro, or Enterprise
- **Usage**: Bandwidth, function invocations, build minutes
- **Domains**: No additional cost for domains (within plan limits)

See [pricing documentation](/pricing) for details.

### What security features are available?

All Vercel applications include:

- **Firewall**: DDoS protection and rate limiting
- **WAF**: Web Application Firewall
- **SSL certificates**: Automatic HTTPS for all domains
- **Edge network**: Global CDN with low latency

### How can I monitor domain operations?

- **Vercel Dashboard**: View domain status and SSL certificates
- **API**: Query domain status programmatically
- **Webhooks**: Get notified of domain events (Enterprise)
- **Logs**: View domain resolution and errors

### How do I handle DNS propagation delays?

DNS changes take 24 to 48 hours to propagate. Use [WhatsMyDNS](https://www.whatsmydns.net/) to monitor propagation across global nameservers.

### Why isn't my SSL certificate being issued?

SSL certificates require domain verification. Add the TXT record provided by Vercel, wait 5 to 10 minutes, then trigger verification via the SDK or dashboard.

### How do I handle SEO with multiple domains?

Set canonical URLs to indicate the primary domain for each page. This prevents duplicate content issues.


---

[View full sitemap](/docs/sitemap)
