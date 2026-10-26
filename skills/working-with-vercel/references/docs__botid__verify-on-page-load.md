---
title: Verify Visitors on Page Load
product: vercel
url: /docs/botid/verify-on-page-load
canonical_url: "https://vercel.com/docs/botid/verify-on-page-load"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/botid
related:
  - /docs/botid/get-started
  - /docs/botid/advanced-configuration
  - /docs/environment-variables
  - /docs/botid/local-development-behavior
summary: Run BotID on page load and reuse the result with a short-lived, server-signed verification cookie.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/botid/verify-on-page-load.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "663a87df369492086dd390d3eb2f31edbbb5a98803a8bd89a5b9204b43f3d7e3"
---

# Verify Visitors on Page Load

Verify a browser with BotID on page load, then issue a signed **verification cookie** from your server. Later requests can validate the cookie instead of running another BotID check until the cookie expires.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploying and testing BotID](https://vercel.com/kb/guide/deploying-and-testing-botid) — This guide gives an overview on Vercel BotID and how to deploy and test it in production
- [How to protect your AI endpoints with Vercel BotID](https://vercel.com/kb/guide/protect-ai-endpoints-with-vercel-botid) — Gate every request to your AI endpoints with Vercel BotID and checkBotId\\(\\) so inference runs only for verified callers
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Vercel BotID vs Cloudflare Turnstile](https://vercel.com/kb/guide/vercel-botid-vs-cloudflare-turnstile) — Compare Vercel BotID and Cloudflare Turnstile for bot protection, including detection model, hosting requirements, check
- [Application authentication on Vercel](https://vercel.com/kb/guide/application-authentication-on-vercel) — Secure application authentication on Vercel across layers: proxy checks, the Data Access Layer, PPR-safe rendering, and
- [Handling Verified Bots](https://vercel.com/docs/botid/verified-bots) — Information about verified bots and their handling in BotID
- [Troubleshooting Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel/troubleshooting) — Learn how to troubleshoot common errors with Sign in with Vercel
- [Automated & Agent Access](https://vercel.com/docs/deployment-protection/automated-agent-access) — Grant AI agents, CI/CD pipelines, MCP servers, and testing tools access to Vercel deployments that have Deployment Prote

Full cross-link map for this page: [/docs/botid/verify-on-page-load.graph.md](/docs/botid/verify-on-page-load.graph.md)
<!-- /docsgraph:related -->

Use this pattern when your application can accept an earlier verification for several requests, such as loading content after an initial visit. Continue calling `checkBotId()` on individual sensitive actions, such as checkout, when you need a fresh verdict for each request.

## How the verification cookie works

1. After the page loads, the browser sends a BotID-protected `POST` request to `/api/verify`.
2. The server calls `checkBotId()` and signs a cookie when the result identifies a human request and reports `bypassed: false`.
3. The browser automatically includes the cookie with later same-origin requests. Each endpoint verifies the signature and expiry before returning protected data.
4. When the cookie expires, the browser must complete another BotID verification. Reading the cookie doesn't extend its lifetime.

BotID runs automatically without asking the visitor to complete a CAPTCHA or take another action. A bypassed result means BotID skipped verification, for example because of a WAF bypass rule or the default local development behavior. This example issues a cookie only after verification runs successfully.

The cookie records a previous check. It doesn't detect changes in browser behavior after that check. Treat the cookie as a bearer credential: anyone who obtains a valid cookie can reuse it until it expires. Keep authentication, authorization, rate limits, and protection against cross-site request forgery (CSRF) in place. For authenticated applications, bind the signed claims to the current server-validated session and reject a session mismatch.

The first HTML response arrives before verification runs. Keep protected data out of that response and serve it only from endpoints that validate the cookie.

## Set up the signing secret

The following example uses Next.js App Router 15.3 or later on Vercel over HTTPS. First, complete the [BotID client and server setup](/docs/botid/get-started). The examples explicitly use Basic on both the client and server. To use Deep Analysis, change both `checkLevel` values to `deepAnalysis`. Review [route-by-route configuration](/docs/botid/advanced-configuration#route-by-route-configuration).

Install `jose` to sign and verify JSON Web Tokens (JWTs):

**pnpm**

```bash
pnpm i jose
```

**yarn**

```bash
yarn add jose
```

**npm**

```bash
npm i jose
```

**bun**

```bash
bun add jose
```

Generate a dedicated signing secret:

```bash
openssl rand -hex 32
```

The command prints a 64-character hexadecimal string. Store the value in a server-only `BOTID_COOKIE_SECRET` [environment variable](/docs/environment-variables), with a separate secret for each application and environment. Redeploy after adding the variable. Never prefix the variable with `NEXT_PUBLIC_` or include the secret in client code.

## Protect the verification request

Register `/api/verify` before sending the page-load request. Merge this entry into your existing client configuration:

```ts filename="instrumentation-client.ts"
import { initBotId } from 'botid/client/core';

initBotId({
  protect: [
    {
      path: '/api/verify',
      method: 'POST',
      advancedOptions: { checkLevel: 'basic' },
    },
  ],
});
```

```js filename="instrumentation-client.js"
import { initBotId } from 'botid/client/core';

initBotId({
  protect: [
    {
      path: '/api/verify',
      method: 'POST',
      advancedOptions: { checkLevel: 'basic' },
    },
  ],
});
```

The later `/api/content` request uses the verification cookie, so this example doesn't register that endpoint with BotID.

## Reuse verification with a signed cookie

Create a server-side helper that signs a five-minute JWT and validates its algorithm, issuer, audience, purpose, and expiration on every use:

```ts filename="lib/botid-cookie.ts"
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const cookieName = '__Host-botid-verification';
const lifetime = 5 * 60;

function signingKey() {
  const secret = process.env.BOTID_COOKIE_SECRET;
  if (!secret || !/^[a-f0-9]{64}$/i.test(secret)) {
    throw new Error('Set BOTID_COOKIE_SECRET to 32 random bytes in hex');
  }
  return Buffer.from(secret, 'hex');
}

export async function hasVerificationCookie() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return false;

  const key = signingKey();
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
      issuer: 'your-app',
      audience: 'botid-verification',
      requiredClaims: ['iat', 'exp'],
      maxTokenAge: '5m',
    });
    return payload.purpose === 'botid-verification';
  } catch {
    return false;
  }
}

export async function issueVerificationCookie() {
  const token = await new SignJWT({ purpose: 'botid-verification' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer('your-app')
    .setAudience('botid-verification')
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(signingKey());

  (await cookies()).set(cookieName, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: lifetime,
  });
}
```

```js filename="lib/botid-cookie.js"
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const cookieName = '__Host-botid-verification';
const lifetime = 5 * 60;

function signingKey() {
  const secret = process.env.BOTID_COOKIE_SECRET;
  if (!secret || !/^[a-f0-9]{64}$/i.test(secret)) {
    throw new Error('Set BOTID_COOKIE_SECRET to 32 random bytes in hex');
  }
  return Buffer.from(secret, 'hex');
}

export async function hasVerificationCookie() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return false;

  const key = signingKey();
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
      issuer: 'your-app',
      audience: 'botid-verification',
      requiredClaims: ['iat', 'exp'],
      maxTokenAge: '5m',
    });
    return payload.purpose === 'botid-verification';
  } catch {
    return false;
  }
}

export async function issueVerificationCookie() {
  const token = await new SignJWT({ purpose: 'botid-verification' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer('your-app')
    .setAudience('botid-verification')
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(signingKey());

  (await cookies()).set(cookieName, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: lifetime,
  });
}
```

The `__Host-` prefix requires HTTPS, `Path=/`, and no `Domain` attribute. `HttpOnly` prevents client-side JavaScript from reading the cookie, and `SameSite=Strict` restricts cross-site sending. The cookie contains only your application's signed assertion, never a raw BotID challenge or token.

## Issue the cookie after verification succeeds

Create a same-origin `POST` endpoint. An existing valid cookie skips another check without renewing the expiry. Otherwise, call `checkBotId()` before issuing the cookie:

```ts filename="app/api/verify/route.ts"
import { checkBotId } from 'botid/server';
import {
  hasVerificationCookie,
  issueVerificationCookie,
} from '../../../lib/botid-cookie';

export const runtime = 'nodejs';
const headers = { 'Cache-Control': 'private, no-store' };

export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) {
    return new Response('Forbidden', { status: 403, headers });
  }

  try {
    if (await hasVerificationCookie()) {
      return new Response(null, { status: 204, headers });
    }

    const result = await checkBotId({
      advancedOptions: { checkLevel: 'basic' },
    });
    if (
      !result.isHuman ||
      result.isBot ||
      result.isVerifiedBot ||
      result.bypassed
    ) {
      return new Response('Verification failed', { status: 403, headers });
    }

    await issueVerificationCookie();
    return new Response(null, { status: 204, headers });
  } catch {
    return new Response('Verification unavailable', { status: 503, headers });
  }
}
```

```js filename="app/api/verify/route.js"
import { checkBotId } from 'botid/server';
import {
  hasVerificationCookie,
  issueVerificationCookie,
} from '../../../lib/botid-cookie';

export const runtime = 'nodejs';
const headers = { 'Cache-Control': 'private, no-store' };

export async function POST(request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) {
    return new Response('Forbidden', { status: 403, headers });
  }

  try {
    if (await hasVerificationCookie()) {
      return new Response(null, { status: 204, headers });
    }

    const result = await checkBotId({
      advancedOptions: { checkLevel: 'basic' },
    });
    if (
      !result.isHuman ||
      result.isBot ||
      result.isVerifiedBot ||
      result.bypassed
    ) {
      return new Response('Verification failed', { status: 403, headers });
    }

    await issueVerificationCookie();
    return new Response(null, { status: 204, headers });
  } catch {
    return new Response('Verification unavailable', { status: 503, headers });
  }
}
```

This example rejects bots, verified bots, bypassed results, and verification errors. Choose an explicit policy for verified bots and WAF bypass rules rather than issuing a human verification cookie for those results.

## Validate the cookie on later requests

Check the signature and expiration on every endpoint that relies on the earlier verification. Checking whether the cookie exists is insufficient:

```ts filename="app/api/content/route.ts"
import { hasVerificationCookie } from '../../../lib/botid-cookie';

export const runtime = 'nodejs';
const headers = { 'Cache-Control': 'private, no-store' };

export async function GET() {
  if (!(await hasVerificationCookie())) {
    return Response.json(
      { error: 'Verify again before continuing' },
      { status: 401, headers },
    );
  }

  return Response.json({ message: 'Protected content' }, { headers });
}
```

```js filename="app/api/content/route.js"
import { hasVerificationCookie } from '../../../lib/botid-cookie';

export const runtime = 'nodejs';
const headers = { 'Cache-Control': 'private, no-store' };

export async function GET() {
  if (!(await hasVerificationCookie())) {
    return Response.json(
      { error: 'Verify again before continuing' },
      { status: 401, headers },
    );
  }

  return Response.json({ message: 'Protected content' }, { headers });
}
```

Keep these responses private and uncached. For state-changing endpoints, also validate the request origin or use your application's CSRF protection before performing the action.

## Start verification when the page loads

Send the verification request from a Client Component after it mounts. Wait for success before enabling interactions that depend on the cookie. The server remains responsible for enforcing verification on every protected endpoint:

```tsx filename="app/page.tsx"
'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [status, setStatus] = useState('Verifying...');
  const [content, setContent] = useState('');

  useEffect(() => {
    let active = true;
    async function verify() {
      try {
        const response = await fetch('/api/verify', {
          method: 'POST',
          credentials: 'same-origin',
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('Verification failed');
        if (active) setStatus('Verified');
      } catch {
        if (active) setStatus('Verification failed. Reload to try again.');
      }
    }
    void verify();
    return () => {
      active = false;
    };
  }, []);

  async function loadContent() {
    try {
      const response = await fetch('/api/content', {
        credentials: 'same-origin',
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Request failed');
      setContent(JSON.stringify(await response.json()));
    } catch {
      setStatus('Verification expired or request failed. Reload to try again.');
    }
  }

  return (
    <main>
      <p role="status">{status}</p>
      <button disabled={status !== 'Verified'} onClick={loadContent}>
        Load protected content
      </button>
      <pre>{content}</pre>
    </main>
  );
}
```

```jsx filename="app/page.jsx"
'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [status, setStatus] = useState('Verifying...');
  const [content, setContent] = useState('');

  useEffect(() => {
    let active = true;
    async function verify() {
      try {
        const response = await fetch('/api/verify', {
          method: 'POST',
          credentials: 'same-origin',
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('Verification failed');
        if (active) setStatus('Verified');
      } catch {
        if (active) setStatus('Verification failed. Reload to try again.');
      }
    }
    void verify();
    return () => {
      active = false;
    };
  }, []);

  async function loadContent() {
    try {
      const response = await fetch('/api/content', {
        credentials: 'same-origin',
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Request failed');
      setContent(JSON.stringify(await response.json()));
    } catch {
      setStatus('Verification expired or request failed. Reload to try again.');
    }
  }

  return (
    <main>
      <p role="status">{status}</p>
      <button disabled={status !== 'Verified'} onClick={loadContent}>
        Load protected content
      </button>
      <pre>{content}</pre>
    </main>
  );
}
```

On the first visit, the page shows **Verifying...**, then **Verified** after `/api/verify` returns `204` and sets the cookie. Selecting **Load protected content** returns `{"message":"Protected content"}`. Reloading with a valid cookie returns `204` without another server-side BotID check.

## Test expiry and failure behavior

Verify the pattern on a Vercel deployment over HTTPS:

- Remove the cookie, reload, and confirm `/api/verify` sets an `HttpOnly`, `Secure` cookie after verification.
- Change the cookie value and request `/api/content`. Expect `401` and no protected data.
- Wait five minutes and request `/api/content` again. Expect `401`, then reload to verify again.
- Confirm a failed or bypassed BotID check never issues a cookie, and a failed verification keeps the button disabled.

Default [local development behavior](/docs/botid/local-development-behavior) bypasses BotID, so this example deliberately refuses to issue a cookie for that result. To simulate the success path during development, use `developmentOptions: { bypass: 'HUMAN' }` on the verification endpoint and serve over HTTPS. Remove that override for production.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
