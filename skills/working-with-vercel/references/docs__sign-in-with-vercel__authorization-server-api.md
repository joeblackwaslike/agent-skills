---
title: Authorization Server API
product: vercel
url: /docs/sign-in-with-vercel/authorization-server-api
canonical_url: "https://vercel.com/docs/sign-in-with-vercel/authorization-server-api"
last_updated: 2026-03-30
type: how-to
prerequisites:
  - /docs/sign-in-with-vercel
related:
  - /docs/sign-in-with-vercel/scopes-and-permissions
  - /docs/sign-in-with-vercel/tokens
  - /docs/sign-in-with-vercel/manage-from-dashboard
  - /docs/functions
  - /docs/kms
summary: Learn how to use the Authorization Server API
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sign-in-with-vercel/authorization-server-api.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "56f7d01fc11faa3ae5643c4b32f5fc3730164fc713b3ad71edab786fd4b41801"
---

# Authorization Server API

The Authorization Server API exposes a set of endpoints which are used by your application for obtaining, refreshing, revoking, and introspecting tokens, as well querying user info:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Authentication](https://eve.dev/docs/guides/auth-and-route-protection?from=related) — Secure your agent's HTTP routes with an ordered auth walk, verifier helpers, and connection OAuth via Vercel Connect.
- [Getting Started](https://vercel.com/docs/sign-in-with-vercel/getting-started?from=related) — Learn how to get started with Sign in with Vercel
- [Authentication](https://vercel.com/docs/kms/concepts/authentication?from=related) — How Vercel KMS authorizes signing requests with a deployment OIDC token, authorizes management requests with a Vercel ac
- [Quickstart](https://vercel.com/docs/kms/quickstart?from=related) — Create a KMS issuer, sign a JWT from a Vercel Function with @vercel/kms, and verify it against the published JWKS.
- [OIDC Reference](https://vercel.com/docs/oidc/reference?from=related) — Review helper libraries to help you connect with your backend and understand the structure of an OIDC token.
- [Sign a token](https://vercel.com/docs/rest-api/kms/sign-a-token?from=related)

Full cross-link map for this page: [/docs/sign-in-with-vercel/authorization-server-api.graph.md](/docs/sign-in-with-vercel/authorization-server-api.graph.md)
<!-- /docsgraph:related -->

| Endpoint                     | URL                                                 |
| ---------------------------- | --------------------------------------------------- |
| Authorization Endpoint       | https://vercel.com/oauth/authorize                  |
| Token Endpoint               | https://api.vercel.com/login/oauth/token            |
| Revoke Token Endpoint        | https://api.vercel.com/login/oauth/token/revoke     |
| Token Introspection Endpoint | https://api.vercel.com/login/oauth/token/introspect |
| User Info Endpoint           | https://api.vercel.com/login/oauth/userinfo         |

These endpoints and other features of the authorization server are advertised at the following well-known URL:

```
https://vercel.com/.well-known/openid-configuration
```

## Authorization Endpoint

When the user clicks your Sign in with Vercel button, your application should redirect the user to the Authorization Endpoint (`https://vercel.com/oauth/authorize`) with the required parameters.

If the user is not logged in, Vercel will show a login screen and then the consent page to grant or deny the requested [permissions](/docs/sign-in-with-vercel/scopes-and-permissions). If they have already authorized the app, they will be redirected immediately. After approval, Vercel redirects the user back to your application's `redirect_uri` with a short lived `code` in the `code` query parameter.

The Authorization Endpoint supports the following parameters:

| Parameter               | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client_id`             | **Yes**  | The ID of the App, located in the **Manage** page of the App.                                                                                                                                                                                                                                                                                                                                               |
| `scope`                 | **No**   | A space-separated list of [scopes](/docs/sign-in-with-vercel/scopes-and-permissions) you're requesting: `openid`, `email`, `profile`, and `offline_access`. If you pass scopes that aren't configured in your app's **Manage** settings, they're filtered out. If you don't pass `scope`, all scopes configured in your app are included by default.                                                        |
| `redirect_uri`          | **Yes**  | The URL used to redirect users back to the application after granting authorization, located in the **Manage** page of the App under **Authorization Callback URLs**.                                                                                                                                                                                                                                       |
| `response_type`         | **Yes**  | Must be `code`.                                                                                                                                                                                                                                                                                                                                                                                             |
| `response_mode`         | **No**   | Specifies how the authorization response is delivered. Defaults to `query` (redirect with query parameters). Use `web_message.opener` for popup-based flows where the authorization response is sent via `postMessage` to the parent window instead of redirecting. For a full example of popup-based authentication, see the [reference app](https://github.com/vercel/sign-in-with-vercel-reference-app). |
| `nonce`                 | No       | A random string generated by the application that is used to protect against replay attacks. The same value will be attached as a claim in the ID Token.                                                                                                                                                                                                                                                    |
| `state`                 | No       | A random string generated by the application that is used to protect against [CSRF](# "What is CSRF?") attacks.                      |
| `code_challenge`        | **Yes**  | A random string generated by the application for additional protection, based on the [PKCE specification](https://datatracker.ietf.org/doc/html/rfc7636).                                                                                                                                                                                                                                                   |
| `code_challenge_method` | **Yes**  | Must be `S256`.                                                                                                                                                                                                                                                                                                                                                                                             |

In your application create an API Route that saves the `state`, `nonce` and `code_verifier` in cookies and redirects the user to the Authorization Endpoint with the required parameters.

After Vercel redirects the user back to your application's `redirect_uri` with a `code`, your application should call the [Token Endpoint](#token-endpoint) to exchange the `code` for tokens.

```ts {54} filename="app/api/auth/authorize/route.ts"
import crypto from 'node:crypto';
import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

function generateSecureRandomString(length: number) {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(randomBytes, (byte) => charset[byte % charset.length]).join(
    '',
  );
}

export async function GET(req: NextRequest) {
  const state = generateSecureRandomString(43);
  const nonce = generateSecureRandomString(43);
  const code_verifier = crypto.randomBytes(43).toString('hex');
  const code_challenge = crypto
    .createHash('sha256')
    .update(code_verifier)
    .digest('base64url');
  const cookieStore = await cookies();

  cookieStore.set('oauth_state', state, {
    maxAge: 10 * 60, // 10 minutes
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  });
  cookieStore.set('oauth_nonce', nonce, {
    maxAge: 10 * 60, // 10 minutes
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  });
  cookieStore.set('oauth_code_verifier', code_verifier, {
    maxAge: 10 * 60, // 10 minutes
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  });

  const queryParams = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_VERCEL_APP_CLIENT_ID as string,
    redirect_uri: `${req.nextUrl.origin}/api/auth/callback`,
    state,
    nonce,
    code_challenge,
    code_challenge_method: 'S256',
    response_type: 'code',
    scope: 'openid email profile offline_access',
  });

  const authorizationUrl = `https://vercel.com/oauth/authorize?${queryParams.toString()}`;
  return NextResponse.redirect(authorizationUrl);
}
```

## Token Endpoint

The Token Endpoint is used to exchange the `code` returned from the Authorization Endpoint, or a Refresh Token for a new [Access Token](/docs/sign-in-with-vercel/tokens#access-token) and [Refresh Token](/docs/sign-in-with-vercel/tokens#refresh-token) pair.

| Parameter       | Required     | Description                                                                                                                                                                                                                                                                                                      |
| --------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `grant_type`    | **Yes**      | Either `authorization_code` or `refresh_token`.- If the user signs in from the application then `authorization_code` should be used.- If the user is already signed in but the [Access Token](/docs/sign-in-with-vercel/tokens#access-token) has expired, then `refresh_token` should be used.         |
| `client_id`     | **Yes**      | The ID of the App located in the [**Manage**](/docs/sign-in-with-vercel/manage-from-dashboard) page.                                                                                                                                                                                                             |
| `client_secret`         | **Optional** | The client secret generated in the [**Manage**](/docs/sign-in-with-vercel/manage-from-dashboard) page. Omit this parameter if client authentication is set to `none`, or if you authenticate with a [JWT assertion](#authenticate-with-a-jwt-assertion) using `client_assertion` and `client_assertion_type`. |
| `client_assertion`      | No           | Required when authenticating with a JWT assertion instead of `client_secret`. A signed JWT that proves the client's identity.                                                                                                                                                                                    |
| `client_assertion_type` | No           | Required when using `client_assertion`. Must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.                                                                                                                                                                                                        |
| `code`                  | No           | If `grant_type` is `authorization_code` then this parameter is required. The value is obtained during the [Authorization Endpoint](#authorization-endpoint) flow.                                                                                                                                                |
| `code_verifier` | No           | If `grant_type` is `authorization_code` then this parameter is required. It should be the code verifier bound to the `code_challenge` from the authorization request.                                                                                                                                            |
| `redirect_uri`  | No           | If `grant_type` is `authorization_code` then this parameter is required. It should be the same value used in the [Authorization Endpoint](#authorization-endpoint).                                                                                                                                              |
| `refresh_token` | No           | If `grant_type` is `refresh_token` then this parameter is required. This is the Refresh Token which will be used to obtain a new pair of Access and Refresh tokens.                                                                                                                                              |

The example below shows how to exchange the `code` for tokens in Next.js, validating the `state` and `nonce` before setting the authentication cookies.

```ts {91} filename="app/api/auth/callback/route.ts"
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

interface TokenData {
  access_token: string;
  token_type: string;
  id_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code) {
      throw new Error('Authorization code is required');
    }

    const storedState = request.cookies.get('oauth_state')?.value;
    const storedNonce = request.cookies.get('oauth_nonce')?.value;
    const codeVerifier = request.cookies.get('oauth_code_verifier')?.value;

    if (!validate(state, storedState)) {
      throw new Error('State mismatch');
    }

    const tokenData = await exchangeCodeForToken(
      code,
      codeVerifier,
      request.nextUrl.origin,
    );
    const decodedNonce = decodeNonce(tokenData.id_token);

    if (!validate(decodedNonce, storedNonce)) {
      throw new Error('Nonce mismatch');
    }

    await setAuthCookies(tokenData);

    const cookieStore = await cookies();

    // Clear the state, nonce, and oauth_code_verifier cookies
    cookieStore.set('oauth_state', '', { maxAge: 0 });
    cookieStore.set('oauth_nonce', '', { maxAge: 0 });
    cookieStore.set('oauth_code_verifier', '', { maxAge: 0 });

    // Redirect the user to the profile page, your application may have a different page
    return Response.redirect(new URL('/profile', request.url));
  } catch (error) {
    console.error('OAuth callback error:', error);
    // Redirect the user to the error page, your application may have a different page
    return Response.redirect(new URL('/auth/error', request.url));
  }
}

function validate(
  value: string | null,
  storedValue: string | undefined,
): boolean {
  if (!value || !storedValue) {
    return false;
  }
  return value === storedValue;
}

function decodeNonce(idToken: string): string {
  const payload = idToken.split('.')[1];
  const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
  const nonceMatch = decodedPayload.match(/"nonce":"([^"]+)"/);
  return nonceMatch ? nonceMatch[1] : '';
}

async function exchangeCodeForToken(
  code: string,
  code_verifier: string | undefined,
  requestOrigin: string,
): Promise<TokenData> {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_VERCEL_APP_CLIENT_ID as string,
    client_secret: process.env.VERCEL_APP_CLIENT_SECRET as string,
    code: code,
    code_verifier: code_verifier || '',
    redirect_uri: `${requestOrigin}/api/auth/callback`,
  });

  const response = await fetch('https://api.vercel.com/login/oauth/token', {
    method: 'POST',
    body: params,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to exchange code for token: ${JSON.stringify(errorData)}`,
    );
  }

  return await response.json();
}

async function setAuthCookies(tokenData: TokenData) {
  const cookieStore = await cookies();

  cookieStore.set('access_token', tokenData.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: tokenData.expires_in,
  });

  cookieStore.set('refresh_token', tokenData.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
```

The expected response from the Token Endpoint is a JSON object with the following properties:

```json filename="Token Endpoint response example"
{
  "access_token": "vca_...",
  "token_type": "Bearer",
  "id_token": "...", // The ID Token is a JWT
  "expires_in": 3600,
  "scope": "openid email profile offline_access", // The scopes that were granted to the application
  "refresh_token": "vcr_..." // Present if offline_access scope is requested
}
```

### Authenticate with a JWT assertion

You can authenticate to the Token Endpoint and [Revoke Token Endpoint](#revoke-token-endpoint) with a JWT client assertion instead of sending a `client_secret`. This follows [RFC 7523](https://datatracker.ietf.org/doc/html/rfc7523).

Send `client_assertion` and `client_assertion_type` in the request body. Omit `client_secret` when you use a JWT assertion. Both `client_secret_jwt` and `private_key_jwt` use `client_assertion_type` set to `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. Vercel selects the method from the assertion `alg`. The example above uses `client_secret_post`; the tables below describe JWT assertion authentication.

The assertion JWT header must include `alg`. Include `kid` for `private_key_jwt` when your JWKS has more than one key.

| Header | Required | Description |
| ------ | -------- | ----------- |
| `alg`  | **Yes**  | Signing algorithm. Use HS256, HS384, or HS512 for `client_secret_jwt` (signed with your client secret). Use any other algorithm (for example, RS256 or ES256) for `private_key_jwt` (signed with your private key). The `none` algorithm is not supported. |
| `kid`  | Conditional | Not required for `client_secret_jwt`. Vercel verifies the HMAC assertion against each active client secret. For `private_key_jwt`, include `kid` when your [JWKS URL](/docs/sign-in-with-vercel/manage-from-dashboard#choose-your-client-authentication-method) publishes more than one key. A JWKS with a single matching key does not require `kid`. |

The assertion JWT must include these claims:

| Claim | Required | Description |
| ----- | -------- | ----------- |
| `iss` | **Yes**  | Your app's client ID. Must match `sub`. |
| `sub` | **Yes**  | Your app's client ID. Must match `client_id` in the request body. |
| `aud` | **Yes**  | Must be `https://api.vercel.com/login/oauth/token`, the token endpoint from [OpenID discovery](https://vercel.com/.well-known/openid-configuration). |
| `jti` | **Yes**  | A unique identifier for this assertion. Vercel rejects replayed `jti` values. |
| `exp` | **Yes**  | Expiration time. Must be in the future and no more than 60 seconds from now. |

The following example signs the assertion with a local private key and exchanges an authorization code. It sets `kid` so Vercel can select the key if your JWKS publishes more than one:

```ts filename="exchange-code-with-private-key-jwt.ts"
import * as jose from 'jose';

const CLIENT_ID = 'your_client_id_here';
const TOKEN_ENDPOINT = 'https://api.vercel.com/login/oauth/token';

async function createClientAssertion(privateKey: jose.KeyLike): Promise<string> {
  return new jose.SignJWT({})
    .setProtectedHeader({ alg: 'RS256', kid: 'your_key_id_here' })
    .setIssuer(CLIENT_ID)
    .setSubject(CLIENT_ID)
    .setAudience(TOKEN_ENDPOINT)
    .setJti(crypto.randomUUID())
    .setExpirationTime('60s')
    .sign(privateKey);
}

export async function exchangeCodeForToken(
  code: string,
  codeVerifier: string,
  redirectUri: string,
  privateKey: jose.KeyLike,
): Promise<Response> {
  const clientAssertion = await createClientAssertion(privateKey);

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    client_assertion_type:
      'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion: clientAssertion,
    code,
    code_verifier: codeVerifier,
    redirect_uri: redirectUri,
  });

  return fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    body: params,
  });
}
```

### Sign the assertion with Vercel KMS

If your app runs as a [Vercel Function](/docs/functions), [Vercel KMS](/docs/kms) can sign the client assertion without storing a private key in your deployment. Create an issuer, attach a [project grant](/docs/kms/concepts/project-grants) so the deployment can sign, then set your app's **JWKS URL** to `https://kms.vercel.com/<issuerId>/jwks.json`.

KMS sets `kid`, `nbf`, and `exp`. Pass `iss` and `sub` as your client ID so they override the default KMS issuer URL. Set `ttl` to `60` so the assertion expires after 60 seconds.

> **💡 Note:** Call `signToken` inside a route handler. It resolves the function's
> [OIDC token](/docs/oidc) at call time and cannot run at the module top level.

```ts filename="app/api/auth/callback/route.ts"
import { signToken } from '@vercel/kms';
import type { NextRequest } from 'next/server';

const CLIENT_ID = 'your_client_id_here';
const ISSUER_ID = 'your_kms_issuer_id_here';
const TOKEN_ENDPOINT = 'https://api.vercel.com/login/oauth/token';

async function createClientAssertion(): Promise<string> {
  return signToken({
    issuerId: ISSUER_ID,
    claims: {
      iss: CLIENT_ID,
      sub: CLIENT_ID,
      aud: TOKEN_ENDPOINT,
      jti: crypto.randomUUID(),
    },
    ttl: 60,
  });
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const codeVerifier = request.cookies.get('oauth_code_verifier')?.value;

  if (!code || !codeVerifier) {
    return Response.json(
      { error: 'Missing authorization code or code verifier' },
      { status: 400 },
    );
  }

  const clientAssertion = await createClientAssertion();

  const tokenResponse = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_assertion_type:
        'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: clientAssertion,
      code,
      code_verifier: codeVerifier,
      redirect_uri: `${url.origin}/api/auth/callback`,
    }),
  });

  return Response.json(await tokenResponse.json(), {
    status: tokenResponse.status,
  });
}
```

The [Revoke Token Endpoint](#revoke-token-endpoint) accepts the same `client_assertion` and `client_assertion_type` parameters.

## Revoke Token Endpoint

Both the Access and Refresh Token can be revoked before expiration if needed. If the Access Token is revoked, the Refresh Token is also revoked. The example below shows how to revoke the Access Token in Next.js.

```ts {14} filename="app/api/auth/signout/route.ts"
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return Response.json({ error: 'No access token found' }, { status: 401 });
  }

  const credentials = `${process.env.NEXT_PUBLIC_VERCEL_APP_CLIENT_ID}:${process.env.VERCEL_APP_CLIENT_SECRET}`;

  const response = await fetch(
    'https://api.vercel.com/login/oauth/token/revoke',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(credentials).toString('base64')}`,
      },
      body: new URLSearchParams({
        token: accessToken,
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error revoking token:', errorData);
    return Response.json(
      { error: 'Failed to revoke access token' },
      { status: response.status },
    );
  }

  cookieStore.set('access_token', '', { maxAge: 0 });
  cookieStore.set('refresh_token', '', { maxAge: 0 });

  return Response.json({}, { status: response.status });
}
```

## Token Introspection Endpoint

The token introspection endpoint validates an Access Token or Refresh Token and returns metadata about its state. Use this endpoint to check if a token is active before making API requests.

| Parameter | Required | Description                                                   |
| --------- | -------- | ------------------------------------------------------------- |
| `token`   | **Yes**  | The token to validate (either Access Token or Refresh Token). |

The endpoint returns a JSON response with token metadata:

```json filename="Token Introspection response"
{
  "active": true,
  "client_id": "cl_p4M3ExwwNx2qfEMWQHZfoajUbbYiTR4i",
  "token_type": "bearer",
  "exp": 1757367451,
  "iat": 1757363851,
  "sub": "XLrCnEgbKhsyfbiNR7E849p",
  "iss": "https://vercel.com",
  "jti": "6cd20f0f-0ce2-408b-a21b-63445bccb69a",
  "session_id": "44c44cd9-6b1a-4a16-9296-cc9aea3f1800"
}
```

The example below shows how to validate a token in Next.js:

```ts {26} filename="app/api/validate-token/route.ts"
import { cookies } from 'next/headers';

interface IntrospectionResponse {
  active: boolean;
  aud?: string;
  client_id?: string;
  token_type?: 'bearer';
  exp?: number;
  iat?: number;
  sub?: string;
  iss?: string;
  jti?: string;
  session_id?: string;
}

export async function GET(): Promise<Response> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      return Response.json({ error: 'No access token found' }, { status: 401 });
    }

    const introspectResponse = await fetch(
      'https://api.vercel.com/login/oauth/token/introspect',
      {
        method: 'POST',
        body: new URLSearchParams({ token }),
      },
    );

    if (!introspectResponse.ok) {
      return Response.json(
        { error: 'Failed to introspect token' },
        { status: 500 },
      );
    }

    const introspectionData: IntrospectionResponse =
      await introspectResponse.json();

    if (!introspectionData.active) {
      return Response.json({ error: 'Token is not active' }, { status: 401 });
    }

    return Response.json({
      message: 'Token is valid',
      tokenInfo: introspectionData,
    });
  } catch (error) {
    console.error('Token validation error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

## User Info Endpoint

The user info endpoint returns the consented OpenID claims about the signed-in user. You must authenticate to this endpoint by including an access token as a bearer token in the Authorization header.

The endpoint returns a JSON response with consented OpenID claims:

```json filename="User Info Endpoint response"
{
  "sub": "345e869043f1e55f8bdc837c",
  "email": "user@example.com",
  "email_verified": true,
  "name": "Timmy Triangle",
  "preferred_username": "timmy-triangle",
  "picture": "https://api.vercel.com/www/avatar/avatar-42…"
}
```

The example below shows how to request user info in Next.js:

```ts {23} filename="app/api/user-info/route.ts"
import { cookies } from 'next/headers';

interface UserInfoResponse {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  preferred_username?: string;
  picture?: string;
}

export async function GET(): Promise<Response> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
      return Response.json({ error: 'No access token found' }, { status: 401 });
    }

    const userInfoResponse = await fetch(
      // User Info
      'https://api.vercel.com/login/oauth/userinfo',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!userInfoResponse.ok) {
      return Response.json(
        { error: 'Failed to fetch user info' },
        { status: 500 },
      );
    }

    const userInfoData: UserInfoResponse = await userInfoResponse.json();

    return Response.json({
      userInfo: userInfoData,
    });
  } catch (error) {
    console.error('Error fetching user info:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```


---

[View full sitemap](/docs/sitemap)
