---
title: DNS Table
product: vercel
url: /docs/platforms/platform-elements/blocks/dns-table
canonical_url: "https://vercel.com/docs/platforms/platform-elements/blocks/dns-table"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/platform-elements/blocks
  - /docs/platforms/platform-elements
related:
  - /docs/platforms/platform-elements/blocks/custom-domain
  - /docs/platforms/platform-elements/actions/add-custom-domain
  - /docs/platforms/multi-tenant-platforms/configuring-domains
summary: Learn about dns table on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/platform-elements/blocks/dns-table.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "5d5acdaef0d4fb050c2882c8b052c31b6e19687aa7b6227bdd275f072db6c6c6"
---

# DNS Table

## Overview

The DNS Table block provides a clean, user-friendly interface for displaying DNS records that users need to configure. It's designed for platforms that guide users through domain configuration, offering one-click copying of values and clear visual organization. This component is essential for domain management interfaces in platforms like Mintlify and Hashnode.

## Installation

Install the `dns-table` block into your project using the Platform Elements installer.

## Features

- **One-click copying**: Each DNS value has a copy button with visual confirmation
- **All record types**: Supports A, AAAA, CNAME, MX, NS, SOA, PTR, SRV, TXT, and CAA records
- **Responsive design**: Table adapts gracefully to different screen sizes
- **Monospace formatting**: DNS values displayed in monospace font for clarity
- **TTL support**: Optional TTL values with "Auto" as default
- **Empty state handling**: Clean message when no records are present
- **Accessibility**: Full keyboard navigation and screen reader support

## Usage

### Basic example

```tsx filename="dns-table.tsx"
import { DNSTable } from '@/components/blocks/dns-table';

const records = [
  {
    type: 'CNAME',
    name: 'docs',
    value: 'cname.vercel-dns.com',
    ttl: '3600',
  },
  {
    type: 'TXT',
    name: '_vercel',
    value: 'vc-domain-verify=abc123def456...',
  },
];

export default function DNSConfiguration() {
  return <DNSTable records={records} />;
}
```

### With Custom Domain component

```tsx filename="dns-table.tsx"
import { DNSTable } from '@/components/blocks/dns-table';
import { CustomDomain } from '@/components/blocks/custom-domain';

export default function DomainSettings() {
  // The CustomDomain component internally uses DNSTable
  // to display required DNS records
  return <CustomDomain defaultDomain="example.com" />;
}
```

## Props

### DNSTable props

| Prop          | Type          | Required | Default | Description                                        |
| ------------- | ------------- | -------- | ------- | -------------------------------------------------- |
| `records`     | `DNSRecord[]` | Yes      |         | Array of DNS records to display                    |
| `copyTimeout` | `number`      | No       | `2000`  | Duration to show copy confirmation in milliseconds |

### DNSRecord type

```ts
type DNSRecord = {
  type:
    | 'A'
    | 'AAAA'
    | 'CNAME'
    | 'MX'
    | 'NS'
    | 'SOA'
    | 'PTR'
    | 'SRV'
    | 'TXT'
    | 'CAA';
  name: string;
  value: string;
  ttl?: string;
};
```

### Record type descriptions

- **A**: Maps domain to IPv4 address (e.g., 192.0.2.1)
- **AAAA**: Maps domain to IPv6 address (e.g., 2001:db8::1)
- **CNAME**: Creates alias to another domain
- **MX**: Specifies mail servers for domain
- **NS**: Identifies authoritative nameservers
- **SOA**: Contains zone administrative information
- **PTR**: Reverse DNS lookup (IP to domain)
- **SRV**: Specifies service locations (port/host)
- **TXT**: Stores text data (verification, SPF, etc.)
- **CAA**: Controls SSL certificate authorities

## Advanced examples

### Domain verification flow

```tsx filename="dns-table.tsx"
import { DNSTable } from '@/components/blocks/dns-table';
import { useState } from 'react';

export function DomainVerification({ domain }) {
  const [verificationRecord] = useState({
    type: 'TXT',
    name: `_vercel.${domain}`,
    value: `vc-domain-verify=${generateVerificationCode()}`,
  });

  return (
    <div className="space-y-4">
      <h3>Add this TXT record to verify ownership:</h3>
      <DNSTable records={[verificationRecord]} />
      <Button onClick={checkVerification}>Check Verification</Button>
    </div>
  );
}
```

### Multiple record types

```tsx
import { DNSTable } from '@/components/blocks/dns-table';

const complexDNSSetup = [
  // Root domain A records
  {
    type: 'A',
    name: '@',
    value: '76.76.21.21',
  },
  // Subdomain CNAME
  {
    type: 'CNAME',
    name: 'www',
    value: 'cname.vercel-dns.com',
  },
  // Mail configuration
  {
    type: 'MX',
    name: '@',
    value: '10 mail.example.com',
    ttl: '3600',
  },
  // SPF record for email
  {
    type: 'TXT',
    name: '@',
    value: 'v=spf1 include:_spf.example.com ~all',
  },
];

export default function CompleteDNSSetup() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Required DNS Records</CardTitle>
        <CardDescription>
          Add all these records to complete your setup
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DNSTable records={complexDNSSetup} />
      </CardContent>
    </Card>
  );
}
```

## Subcomponents

### DNSCopyButton

The copy button component used for each DNS value:

```tsx filename="dns-table.tsx"
import { DNSCopyButton } from '@/components/blocks/dns-table';

<DNSCopyButton
  text="76.76.21.21"
  copyTimeout={3000} // Optional: customize confirmation duration
/>;
```

## Styling

The component uses Tailwind classes and can be customized through your theme configuration:

```css
/* Customize table appearance */
.dns-table {
  @apply border-2 border-primary;
}

/* Customize copy button */
.dns-copy-button {
  @apply hover:bg-primary/10;
}
```

## Best practices

- **Value validation**: Validate DNS values before displaying to prevent copy errors
- **Record grouping**: Group related records together (e.g., all A records)
- **Clear instructions**: Provide context about where users should add these records
- **Progress tracking**: Consider showing which records have been configured
- **Help links**: Include links to DNS provider documentation when possible

## Integration with DNS providers

```tsx filename="dns-table.tsx"
// Example: Provider-specific instructions
const DNSInstructions = ({ provider, records }) => {
  const getProviderInstructions = (provider) => {
    switch (provider) {
      case 'cloudflare':
        return 'Log in to Cloudflare and navigate to DNS settings';
      case 'godaddy':
        return 'Access your GoDaddy DNS Management panel';
      default:
        return 'Add these records in your DNS provider';
    }
  };

  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription>{getProviderInstructions(provider)}</AlertDescription>
      </Alert>
      <DNSTable records={records} />
    </div>
  );
};
```

## Related

- [Custom Domain block](/docs/platforms/platform-elements/blocks/custom-domain)
- [Add Custom Domain action](/docs/platforms/platform-elements/actions/add-custom-domain)
- [Configuring domains for multi-tenant platforms](/docs/platforms/multi-tenant-platforms/configuring-domains)


---

[View full sitemap](/docs/sitemap)
