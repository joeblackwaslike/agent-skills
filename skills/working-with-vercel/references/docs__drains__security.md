---
title: Drains Security
product: vercel
url: /docs/drains/security
canonical_url: "https://vercel.com/docs/drains/security"
last_updated: 2026-07-29
type: how-to
prerequisites:
  - /docs/drains
related:
  - /docs/headers/request-headers
  - /docs/drains/using-drains
  - /docs/drains
  - /docs/drains/reference/logs
summary: Learn how to secure your Drains endpoints with authentication and signature verification.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drains/security.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d769a73558413a3a341dac2d2386cda2f011e45f1c0183ab5e487ef7ac441262"
---

# Drains Security

All Drains support transport-level encryption using HTTPS protocol.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Create a new Drain](https://vercel.com/docs/rest-api/drains/create-a-new-drain?from=related)
- [Update an existing Drain](https://vercel.com/docs/rest-api/drains/update-an-existing-drain?from=related)
- [Find a Drain by id](https://vercel.com/docs/rest-api/drains/find-a-drain-by-id?from=related)
- [Drain Audit Logs to S3](https://vercel.com/docs/drains/audit-logs-to-s3?from=related) — Learn how to configure AWS IAM and Amazon S3 so Vercel can write Audit Log Drain events to your S3 bucket.
- [Traces](https://vercel.com/docs/drains/reference/traces?from=related) — Learn about Trace Drains - OpenTelemetry-compliant distributed tracing data formats and configuration.

Full cross-link map for this page: [/docs/drains/security.graph.md](/docs/drains/security.graph.md)
<!-- /docsgraph:related -->

When your server starts receiving payloads, a third party could send data to your server if it knows the URL. Therefore, you should verify the request is coming from Vercel.

## Secure Drains

Vercel sends an `x-vercel-signature` header with each drain, which is a hash of the payload body created using your Drain signature secret. You can find or update this secret by clicking **Edit** in the Drains list.

To verify the request is coming from Vercel, you can generate the hash and compare it with the header value as shown below:

```js filename="server.js" framework=nextjs-app
import crypto from 'crypto';

export async function POST(request) {
  // Store the signature secret in environment variables
  const signatureSecret = '<Drain signature secret>';

  const rawBody = await request.text();
  const rawBodyBuffer = Buffer.from(rawBody, 'utf-8');
  const bodySignature = sha1(rawBodyBuffer, signatureSecret);

  if (bodySignature !== request.headers.get('x-vercel-signature')) {
    return Response.json(
      {
        code: 'invalid_signature',
        error: "signature didn't match",
      },
      { status: 403 },
    );
  }

  console.log(rawBody);

  return Response.json({ success: true });
}

function sha1(data, secret) {
  return crypto.createHmac('sha1', secret).update(data).digest('hex');
}
```

```ts filename="server.ts" framework=nextjs-app
import crypto from 'crypto';

export async function POST(request: Request) {
  // Store the signature secret in environment variables
  const signatureSecret = '<Drain signature secret>';

  const rawBody = await request.text();
  const rawBodyBuffer = Buffer.from(rawBody, 'utf-8');
  const bodySignature = sha1(rawBodyBuffer, signatureSecret);

  if (bodySignature !== request.headers.get('x-vercel-signature')) {
    return Response.json(
      {
        code: 'invalid_signature',
        error: "signature didn't match",
      },
      { status: 403 },
    );
  }

  console.log(rawBody);

  return Response.json({ success: true });
}

function sha1(data: Buffer, secret: string): string {
  return crypto.createHmac('sha1', secret).update(data).digest('hex');
}
```

```js filename="server.js" framework=nextjs
import crypto from 'crypto';
import getRawBody from 'raw-body';

export default async function handler(
  request,
  response,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  // Store the signature secret in environment variables
  const signatureSecret = '<Drain signature secret>';

  const rawBody = await getRawBody(request);
  const bodySignature = sha1(rawBody, signatureSecret);

  if (bodySignature !== request.headers['x-vercel-signature']) {
    return response.status(403).json({
      code: 'invalid_signature',
      error: "signature didn't match",
    });
  }

  console.log(rawBody);

  response.status(200).json({ success: true });
}

function sha1(data: Buffer, secret: string): string {
  return crypto.createHmac('sha1', secret).update(data).digest('hex');
}

export const config = {
  api: {
    bodyParser: false,
  },
};
```

```ts filename="server.ts" framework=nextjs
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import getRawBody from 'raw-body';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  // Store the signature secret in environment variables
  const signatureSecret = '<Drain signature secret>';

  const rawBody = await getRawBody(request);
  const bodySignature = sha1(rawBody, signatureSecret);

  if (bodySignature !== request.headers['x-vercel-signature']) {
    return response.status(403).json({
      code: 'invalid_signature',
      error: "signature didn't match",
    });
  }

  console.log(rawBody);

  response.status(200).json({ success: true });
}

async function sha1(data: Buffer, secret: string): string {
  return crypto.createHmac('sha1', secret).update(data).digest('hex');
}

export const config = {
  api: {
    bodyParser: false,
  },
};
```

```js filename="server.js" framework=other
import crypto from 'crypto';
import getRawBody from 'raw-body';

export default async function handler(
  request,
  response,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  // Store the signature secret in environment variables
  const signatureSecret = '<Drain signature secret>';

  const rawBody = await getRawBody(request);
  const bodySignature = sha1(rawBody, signatureSecret);

  if (bodySignature !== request.headers['x-vercel-signature']) {
    return response.status(403).json({
      code: 'invalid_signature',
      error: "signature didn't match",
    });
  }

  console.log(rawBody);

  response.status(200).json({ success: true });
}

function sha1(data: Buffer, secret: string): string {
  return crypto.createHmac('sha1', secret).update(data).digest('hex');
}

export const config = {
  api: {
    bodyParser: false,
  },
};
```

```ts filename="server.ts" framework=other
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import getRawBody from 'raw-body';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  // Store the signature secret in environment variables
  const signatureSecret = '<Drain signature secret>';

  const rawBody = await getRawBody(request);
  const bodySignature = sha1(rawBody, signatureSecret);

  if (bodySignature !== request.headers['x-vercel-signature']) {
    return response.status(403).json({
      code: 'invalid_signature',
      error: "signature didn't match",
    });
  }

  console.log(rawBody);

  response.status(200).json({ success: true });
}

function sha1(data: Buffer, secret: string): string {
  return crypto.createHmac('sha1', secret).update(data).digest('hex');
}

export const config = {
  api: {
    bodyParser: false,
  },
};
```

> **💡 Note:** For enhanced security against timing attacks, use constant-time comparison when verifying the `x-vercel-signature` header. See [x-vercel-signature in Request Headers](/docs/headers/request-headers#x-vercel-signature).

For additional authentication or identification purposes, you can also add custom headers when [configuring the Drain destination](/docs/drains/using-drains#custom-headers-optional)

## IP Address Visibility

> **🔒 Permissions Required**: Managing IP address visibility

Drains can include public IP addresses in the data, which may be considered personal information under certain data protection laws. To hide IP addresses in your drains:

1. Go to the Vercel [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and ensure your team is selected in the team switcher
2. Open **Settings** in the sidebar and navigate to [**Security & Privacy**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity\&title=Go+to+Security+settings)
3. Under **IP Address Visibility**, toggle the switch off so the text reads **IP addresses are hidden in your Drains**

This setting is applied team-wide across all projects and drains.

## User Agent

Vercel sends a `user-agent` header with each drain request with the value as `'VercelDrain/1.0 (+https://vercel.com/docs/drains)'`.

## More resources

For more information on Drains security and how to use them, check out the following resources:

- [Drains overview](/docs/drains)
- [Configure Drains](/docs/drains/using-drains)
- [Log Drains reference](/docs/drains/reference/logs)


---

[View full sitemap](/docs/sitemap)
