---
title: Vercel KMS Key Rotation
product: vercel
url: /docs/kms/concepts/key-rotation
canonical_url: "https://vercel.com/docs/kms/concepts/key-rotation"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/kms/concepts
  - /docs/kms
related:
  - /docs/kms/concepts/authentication
  - /docs/kms/ts-sdk-reference
summary: How Vercel KMS stages a pending signing key, schedules its activation, and retires the previous key so already-issued tokens keep verifying.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/kms/concepts/key-rotation.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "916e2b84fd72608755c4f37908e009647feaadc9f3a4d2d787b8dd97a7eda13f"
---

# Vercel KMS Key Rotation

Rotation replaces an issuer's active signing key without changing the issuer ID or issuer URL, so relying parties keep using the same JWKS endpoint. KMS stages rotation so the JWKS CDN cache has time to invalidate and serve the new public key before that key starts signing, and it sets a `kid` header on every signature so verifiers that refresh the JWKS select the correct key automatically.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to rotate the secrets of your Hypertune integration](https://vercel.com/kb/guide/how-to-reset-the-secrets-of-your-hypertune-integration?from=related) — Rotate Hypertune API keys with zero-downtime.
- [Quickstart](https://vercel.com/docs/kms/quickstart?from=related) — Create a KMS issuer, sign a JWT from a Vercel Function with @vercel/kms, and verify it against the published JWKS.
- [Pricing and Limits](https://vercel.com/docs/kms/pricing?from=related) — How Vercel KMS is billed per signing operation, the platform limits that apply, and how to stop being billed.
- [Activate a signing key](https://vercel.com/docs/rest-api/kms/activate-a-signing-key?from=related)
- [Create a signing key](https://vercel.com/docs/rest-api/kms/create-a-signing-key?from=related)
- [Secrets Rotation](https://vercel.com/docs/integrations/create-integration/secrets-rotation?from=related) — Learn how to implement secrets rotation in your integration to allow users to rotate credentials securely.

Full cross-link map for this page: [/docs/kms/concepts/key-rotation.graph.md](/docs/kms/concepts/key-rotation.graph.md)
<!-- /docsgraph:related -->

## Rotation stages

Rotating an issuer's key moves through three stages:

1. **Stage a pending key**: KMS creates a new signing key and immediately adds its public key to the issuer's published JWKS. The pending key does not sign anything yet, which gives the CDN that serves the JWKS time to invalidate its cache so relying parties fetch the new public key before it is used.
2. **Activate**: the pending key becomes the active signer and KMS starts signing new tokens with it. Activation is `automatic` by default and happens once the JWKS CDN cache has had time to invalidate, or you can set it to `manual` and activate the key yourself when you are ready.
3. **Retire the previous key**: when the new key activates, the previously-active key stops signing but stays in the JWKS for a grace period so already-issued tokens keep verifying. After the grace period elapses, KMS removes the key from the JWKS and prunes it.

An issuer can have at most one pending key at a time.

## Schedule activation

You control when the pending key becomes the active signer:

- **Automatic activation** (default): KMS activates the pending key once the JWKS CDN cache has had time to invalidate, so relying parties have already fetched the new public key.
- **Manual activation**: KMS leaves the key pending until you activate it, which lets you coordinate the switch with your own release.

## Set the grace period

You control the grace period with `revokePreviousAfterHours`, the number of hours after activation that the previous key keeps verifying. It defaults to 1 hour, and you should set it to at least the longest lifetime of the tokens you have signed. Set it to `0` to retire the previous key immediately at activation.

For an external issuer, rotate by staging a new PEM-encoded private key, for example when the upstream provider regenerates the key pair.

## Rotate with the API

Rotation is a management operation, so unlike signing it is authorized with a Vercel access token rather than a deployment OIDC token. See [Authentication](/docs/kms/concepts/authentication) for the difference. Stage a pending key by sending a `POST` to the issuer's `keys` endpoint:

```bash
curl -X POST \
  "https://api.vercel.com/v1/kms/issuers/f47ac10b-58cc-4372-a567-0e02b2c3d479/keys" \
  -H "authorization: Bearer $VERCEL_TOKEN" \
  -H "content-type: application/json" \
  -d '{ "activation": "automatic", "revokePreviousAfterHours": 24 }'
```

The response includes the new key's `keyId` and a `status` of `pending`. When you use `manual` activation, activate the key once its public key has propagated:

```bash
curl -X POST \
  "https://api.vercel.com/v1/kms/issuers/f47ac10b-58cc-4372-a567-0e02b2c3d479/keys/<keyId>/activate" \
  -H "authorization: Bearer $VERCEL_TOKEN" \
  -H "content-type: application/json" \
  -d '{ "revokePreviousAfterHours": 24 }'
```

To rotate an external issuer, include the new key material as an `importKey` (a PEM-encoded private key) when you stage the key.

## Related

- [Authentication](/docs/kms/concepts/authentication)
- [SDK Reference](/docs/kms/ts-sdk-reference)


---

[View full sitemap](/docs/sitemap)
