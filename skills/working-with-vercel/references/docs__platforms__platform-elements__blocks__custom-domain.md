---
title: Custom Domain
product: vercel
url: /docs/platforms/platform-elements/blocks/custom-domain
canonical_url: "https://vercel.com/docs/platforms/platform-elements/blocks/custom-domain"
last_updated: 2026-06-26
type: reference
prerequisites:
  - /docs/platforms/platform-elements/blocks
  - /docs/platforms/platform-elements
related:
  - /docs/platforms/platform-elements/blocks/dns-table
  - /docs/platforms/platform-elements/actions/add-custom-domain
  - /docs/platforms/multi-tenant-platforms/configuring-domains
summary: A complete domain management interface with DNS verification and real-time status tracking.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/platform-elements/blocks/custom-domain.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "de4403420b498b0a00c45be547ed492a6c9c451a9f3e62fad313ba33e285b845"
---

# Custom Domain

## Overview


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I add a custom domain to my Vercel project?](https://vercel.com/kb/guide/how-do-i-add-a-custom-domain-to-my-vercel-project?from=related) — Learn how to add a custom domain to your Vercel project.
- [Set Up Custom Domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Adding a Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain?from=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Reference](https://vercel.com/docs/platforms/multi-tenant-platforms/reference?from=related) — Reference for the Vercel domain API, error codes, troubleshooting, and FAQ for multi-tenant platforms.
- [Domains](https://vercel.com/docs/domains?from=related) — Learn the fundamentals of how domains, DNS, and nameservers work on Vercel.
- [Working with Domains](https://vercel.com/docs/domains/working-with-domains?from=related) — Learn how domains work and the options Vercel provides for managing them.

Full cross-link map for this page: [/docs/platforms/platform-elements/blocks/custom-domain.graph.md](/docs/platforms/platform-elements/blocks/custom-domain.graph.md)
<!-- /docsgraph:related -->

The Custom Domain block provides a comprehensive solution for platforms that need to offer custom domain functionality to their users. It handles the entire domain configuration flow including DNS verification, real-time status updates, and clear configuration instructions. This is essential for platforms like Mintlify and Hashnode that allow users to serve content from their own domains.

## Installation

Install the `custom-domain` block into your project using the Platform Elements installer.

## Features

- **Real-time DNS verification**: Automatically checks domain configuration every 20 seconds
- **Smart DNS record detection**: Determines whether TXT verification, CNAME, or A records are needed
- **Visual status indicators**: Clear icons show pending, invalid, or successful configuration
- **One-click copying**: Users can easily copy DNS values with confirmation feedback
- **Responsive DNS table**: Clean presentation of required DNS records
- **Automatic domain validation**: Validates domain format and converts to lowercase

## Usage

```tsx filename="custom-domain.tsx"
import { CustomDomain } from '@/components/blocks/custom-domain';

export default function DomainSettings() {
  return <CustomDomain defaultDomain="docs.example.com" />;
}
```

## Server actions

The component relies on two server actions that you need to implement:

### `addDomain(domain: string)`

Adds a domain to your Vercel project:

```ts filename="vercel.ts"
import { vercel } from '@/lib/vercel';

export async function addDomain(domain: string) {
  const response = await vercel.projects.addProjectDomain({
    idOrName: process.env.PROJECT_ID,
    requestBody: {
      name: domain,
      redirect: null,
      gitBranch: null,
    },
  });
  return response;
}
```

### `getDomainStatus(domain: string)`

Checks the current DNS configuration status:

```ts filename="vercel.ts"
export async function getDomainStatus(domain: string) {
  const response = await vercel.domains.getDomainConfig({
    domain,
  });

  return {
    status: response.verified
      ? 'Valid Configuration'
      : response.verification
        ? 'Pending Verification'
        : 'Invalid Configuration',
    dnsRecordsToSet: response.verification?.dns || response.dns,
  };
}
```

## Props

| Prop            | Type     | Required | Description                      |
| --------------- | -------- | -------- | -------------------------------- |
| `defaultDomain` | `string` | No       | Optional pre-filled domain value |

## Subcomponents

### DomainConfiguration

Handles the DNS record display and refresh logic:

```tsx filename="custom-domain.tsx"
<DomainConfiguration domain="example.com" className="custom-class" />
```

### DomainStatusIcon

Shows visual status of domain configuration:

```tsx filename="custom-domain.tsx"
<DomainStatusIcon domain="example.com" />
```

### InlineSnippet

Styled inline code display for domain values:

```tsx filename="custom-domain.tsx"
<InlineSnippet>_vercel.example.com</InlineSnippet>
```

## DNS record types

The component supports all common DNS record types:

- **TXT**: Domain ownership verification
- **CNAME**: Subdomain pointing
- **A**: IPv4 address mapping
- **AAAA**: IPv6 address mapping
- **MX**: Mail server configuration
- **NS**: Nameserver delegation

## Integration example

```tsx filename="app/settings/domains/page.tsx"
// app/settings/domains/page.tsx
import { CustomDomain } from '@/components/blocks/custom-domain';
import { getCurrentUserDomain } from '@/lib/db';

export default async function DomainsPage() {
  const currentDomain = await getCurrentUserDomain();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Domain Settings</h1>
      <CustomDomain defaultDomain={currentDomain} />
    </div>
  );
}
```

## Best practices

- **Rate limiting**: Implement rate limiting on domain addition to prevent abuse
- **Domain validation**: Validate domain ownership before allowing configuration
- **Error handling**: Provide clear error messages for invalid domains
- **SSL certificates**: Vercel automatically provisions SSL certificates once configured
- **Monitoring**: Track domain configuration success rates and common issues

## Related

- [DNS Table block](/docs/platforms/platform-elements/blocks/dns-table)
- [Add Custom Domain action](/docs/platforms/platform-elements/actions/add-custom-domain)
- [Configuring domains for multi-tenant platforms](/docs/platforms/multi-tenant-platforms/configuring-domains)


---

[View full sitemap](/docs/sitemap)
