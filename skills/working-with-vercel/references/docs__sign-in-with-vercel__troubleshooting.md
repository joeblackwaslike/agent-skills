---
title: Troubleshooting Sign in with Vercel
product: vercel
url: /docs/sign-in-with-vercel/troubleshooting
canonical_url: "https://vercel.com/docs/sign-in-with-vercel/troubleshooting"
last_updated: 2026-02-26
type: how-to
prerequisites:
  - /docs/sign-in-with-vercel
related:
  - /docs/sign-in-with-vercel/authorization-server-api
  - /docs/sign-in-with-vercel/getting-started
  - /docs/sign-in-with-vercel/manage-from-dashboard
summary: Learn how to troubleshoot common errors with Sign in with Vercel
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sign-in-with-vercel/troubleshooting.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "b174b63ef9efd31050b7a83e1b429b019efd04fa429a23bc41e0c026b7c4d039"
---

# Troubleshooting Sign in with Vercel

When users try to authorize your app, several errors can occur. Common troubleshooting steps include:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The complete guide to authentication on Vercel](https://vercel.com/kb/guide/complete-guide-authentication-vercel?from=related) — Learn how to implement authentication in your Vercel applications. Covers NextAuth/Auth.js setup, environment variable c
- [Why am I unable to login or signup to the Vercel platform?](https://vercel.com/kb/guide/why-can-i-not-signup?from=related) — Information on what to do if you are experiencing issues logging in or signing up to the Vercel platform.
- [Authentication](https://vercel.com/docs/kms/concepts/authentication?from=related) — How Vercel KMS authorizes signing requests with a deployment OIDC token, authorizes management requests with a Vercel ac
- [Tokens](https://vercel.com/docs/sign-in-with-vercel/tokens?from=related) — Learn how to Sign in with Vercel
- [Quickstart](https://vercel.com/docs/kms/quickstart?from=related) — Create a KMS issuer, sign a JWT from a Vercel Function with @vercel/kms, and verify it against the published JWKS.
- [SDK Reference](https://vercel.com/docs/kms/ts-sdk-reference?from=related) — API reference for @vercel/kms, including signToken, signMessage, region resolution, and signing the KMS API directly wit
- [Revoke a signing key](https://vercel.com/docs/rest-api/kms/revoke-a-signing-key?from=related)

Full cross-link map for this page: [/docs/sign-in-with-vercel/troubleshooting.graph.md](/docs/sign-in-with-vercel/troubleshooting.graph.md)
<!-- /docsgraph:related -->

- Checking that all required parameters are included in your requests
- Verifying your app configuration in the dashboard
- Reviewing the [Authorization Server API](/docs/sign-in-with-vercel/authorization-server-api) documentation
- Checking the [Getting Started](/docs/sign-in-with-vercel/getting-started) guide for implementation examples

## Error handling patterns

Vercel handles authorization errors in two ways:

- **Error page**: Shown when critical parameters are missing or invalid
- **Redirect with error**: User redirected to your callback URL with error parameters

When errors redirect to your callback URL, your application must handle them and show users an appropriate message.

## Authorization endpoint errors

These errors occur when users navigate to the authorization endpoint with invalid parameters.

### Missing or invalid client\_id

When the `client_id` parameter is missing or references a non-existent app, Vercel shows an error page.

**Fix**: Verify your `client_id` matches the ID shown in your app's **Manage** page.

### Missing or invalid redirect\_uri

When the `redirect_uri` parameter is missing or doesn't match a registered callback URL, Vercel shows an error page.

**Fix**: Add the redirect URL to your app's **Authorization Callback URLs** in the **Manage** page.

### Missing response\_type

When the `response_type` parameter is missing, Vercel redirects to your callback URL with an error:

```plaintext
https://example.com/api/auth/callback?
  error=invalid_request&
  error_description=Parameter 'response_type'. Required
```

**Fix**: Include `response_type=code` in your authorization request.

### Invalid response\_type

When the `response_type` parameter has an invalid value, Vercel redirects to your callback URL with an error:

```plaintext
https://example.com/api/auth/callback?
  error=invalid_request&
  error_description=Parameter 'response_type'. Invalid enum value. Expected 'code', received 'test'
```

**Fix**: Set `response_type=code`. This is the only supported value.

### Invalid code\_challenge length

When the `code_challenge` parameter is provided but not between 43 and 128 characters, Vercel redirects to your callback URL with an error:

```plaintext
https://example.com/api/auth/callback?
  error=invalid_request&
  error_description=Parameter 'code_challenge'. code_challenge must be at least 43 characters
```

**Fix**: Generate a `code_challenge` that's between 43 and 128 characters long. Follow the [PKCE specification](https://datatracker.ietf.org/doc/html/rfc7636) for proper implementation.

### Invalid code\_challenge\_method

When the `code_challenge_method` parameter has an invalid value, Vercel redirects to your callback URL with an error:

```plaintext
https://example.com/api/auth/callback?
  error=invalid_request&
  error_description=Parameter 'code_challenge_method'. Invalid enum value. Expected 'S256', received 'test'
```

**Fix**: Set `code_challenge_method=S256`. This is the only supported value.

### Invalid prompt parameter

When the `prompt` parameter has an invalid value, Vercel redirects to your callback URL with an error:

```plaintext
https://example.com/api/auth/callback?
  error=invalid_request&
  error_description=Parameter 'prompt'. Invalid enum value. Expected 'consent' | 'login', received 'test'
```

**Fix**: Use only `consent` or `login` for the `prompt` parameter. Leave it out if you don't need to control the authorization behavior.

### Account does not have sign-in access

When an app allows only members of its owning team to sign in, Vercel denies authorization for other accounts. Depending on the authorization flow, Vercel either shows an access denied page or redirects to your callback URL with an `access_denied` error and the original `state` value.

**Fix**: Sign in with a Vercel account that belongs to the app's owning team, or change the app's [Sign-In Access setting](/docs/sign-in-with-vercel/manage-from-dashboard#configure-sign-in-access) to **Anyone with a Vercel account**. Your callback handler should also handle the standard OAuth `access_denied` error.

## Token endpoint client authentication errors

These errors occur when you call the token or revoke endpoint with an invalid JWT client assertion.

### `kid` required for multiple JWKS keys

When you authenticate with `private_key_jwt` without a `kid` header and the JWKS has more than one matching key, Vercel returns an invalid client error.

**Fix**: Set `kid` to the key ID of the public key you signed with. `client_secret_jwt` does not require `kid`. Vercel verifies the HMAC signature against each active client secret.

### Invalid `aud` claim

When the `aud` claim does not match `https://api.vercel.com/login/oauth/token`, Vercel rejects the assertion.

**Fix**: Set `aud` to `https://api.vercel.com/login/oauth/token`, the token endpoint from [OpenID discovery](https://vercel.com/.well-known/openid-configuration).

### Replayed `jti`

When you reuse a `jti` value, Vercel rejects the request as a replay.

**Fix**: Generate a unique `jti` for every token or revoke request.

### JWKS URL unreachable

When Vercel cannot fetch your JWKS URL, client authentication with `private_key_jwt` fails.

**Fix**: Verify the JWKS URL is publicly reachable over HTTPS. Vercel times out JWKS fetches after about 5 seconds.

### JWKS document too large

When your JWKS document exceeds 64 KB, Vercel cannot load it.

**Fix**: Reduce the JWKS document size. The limit is 64 KB.

### No matching public key

When Vercel cannot find a JWKS key for the assertion, verification fails.

**Fix**: Publish the signing public key at your JWKS URL. If the JWKS has more than one key, set `kid` in the assertion header to that key's ID.

### Too many JWKS keys

When your JWKS contains more than 32 keys, Vercel cannot load it.

**Fix**: Keep the JWKS to 32 keys or fewer.


---

[View full sitemap](/docs/sitemap)
