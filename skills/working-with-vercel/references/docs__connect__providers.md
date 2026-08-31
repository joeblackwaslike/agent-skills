---
title: For Service Providers
product: vercel
url: /docs/connect/providers
canonical_url: "https://vercel.com/docs/connect/providers"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/connect
related:
  - /docs/connect/concepts/connectors
  - /docs/connect/concepts/tokens
  - /docs/cli/connect
  - /docs/connect/concepts/authentication
summary: What your service needs to declare so Vercel Connect can discover, register, and authorize against it using standard OAuth.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/providers.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "72983e753ae665cfeb635b616d84fcad57975db217af40086d95f29fc73ef0b5"
---

# For Service Providers

If you are a service owner, this page covers what your service needs to support so Vercel Connect can discover, register, and authorize against it using standard OAuth. It applies to any OAuth-protected API, authorization server, or Model Context Protocol (MCP) server.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fproviders&source_site=vercel-docs&relationship=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga?from=related&source_path=%2Fdocs%2Fconnect%2Fproviders&source_site=vercel-docs&relationship=related)
- [The end of credential sprawl for agents](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents?from=related&source_path=%2Fdocs%2Fconnect%2Fproviders&source_site=vercel-docs&relationship=related)
- [Vercel Connect](https://v0.app/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fproviders&source_site=vercel-docs&relationship=related) — Connect your v0 apps and agents to third-party services – no API keys required.
- [SDK Reference](https://vercel.com/docs/connect/ts-sdk-reference?from=related&source_path=%2Fdocs%2Fconnect%2Fproviders&source_site=vercel-docs&relationship=related) — API reference for @vercel/connect, the TypeScript SDK for requesting runtime tokens from Vercel Connect.
- [Vercel Connect Concepts](https://vercel.com/docs/connect/concepts?from=related&source_path=%2Fdocs%2Fconnect%2Fproviders&source_site=vercel-docs&relationship=related) — Understand the core building blocks of Vercel Connect: connectors, installations, tokens, project links, triggers, and a
- [Auth.js](https://vercel.com/docs/connect/frameworks/authjs?from=related&source_path=%2Fdocs%2Fconnect%2Fproviders&source_site=vercel-docs&relationship=related) — Add a Vercel Connect OAuth provider to Auth.js in a Next.js App Router application.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fconnect%2Fproviders&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/connect/providers.graph.md](/docs/connect/providers.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fproviders&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## How a connection to your service works

A Vercel team creates a [connector](/docs/connect/concepts/connectors) that points at your service, by name or by URL. Vercel Connect then:

1. Reads your OAuth and OpenID Connect discovery documents to find your endpoints and capabilities.
2. Creates an OAuth client by registering it with dynamic client registration (DCR) or by publishing a client ID metadata document (CIMD), or connects one using the credentials your user provides.
3. Runs your authorization or token flow, then stores and refreshes the tokens.
4. Hands short-lived tokens to your user's code at runtime.

How much your users configure by hand depends on what your service supports:

| Capability        | Supported by your service                                                        | Not Supported                                                                          |
| ----------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Publishes discovery documents | Users enter a URL and Vercel Connect fills in your endpoints | Users enter each endpoint by hand                        |
| Supports DCR or CIMD          | Vercel Connect creates the OAuth client for them                  | Users register an application with you, add Connect's callback URL, then copy the client ID and secret         |
| Declares its capabilities     | Capabilities show up on the connector automatically               | Users configure capabilities by hand, based on what your service documents         |

## What to support

| Tier                        | What it covers                                                                              | What your users get                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Required](#required)       | Discovery documents, accurate grant types, the redirect URL, token lifetimes                | They can connect using an OAuth client they registered with you       |
| [Recommended](#recommended) | DCR or CIMD, client updates, PKCE, refresh tokens                                           | Vercel Connect can create your OAuth client for them                  |
| [Optional](#optional)       | Protected resource metadata, revocation, scopes, resource indicators, authorization details | Finer-grained tokens, and more capabilities in the Vercel dashboard   |

## Required

### Publish your discovery documents

Publish authorization server metadata under [RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414), an [OpenID Connect discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) document, or both. Everything else on this page is a field in one of them.

Vercel Connect checks the standard well-known locations. If your server URL has a path, such as `https://auth.example.com/tenant1`, it also checks the path-suffixed form from RFC 8414 Section 3.1, so multi-tenant servers work either way. Serve the documents as `application/json`.

If you serve both documents, Vercel Connect fills gaps in the OAuth one from the OpenID Connect one. Both need to declare the same `issuer` and `token_endpoint`.

Vercel Connect reads these fields:

| Field                                              | What it controls                                                                        |
| -------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `issuer`                                           | Identifies your authorization server                                                    |
| `authorization_endpoint`                           | User tokens, together with `token_endpoint`                                             |
| `token_endpoint`                                   | Every flow. Required                                                                    |
| `grant_types_supported`                            | Which [subject types](/docs/connect/concepts/tokens#subject-types) the connector offers |
| `token_endpoint_auth_methods_supported`            | How Vercel Connect authenticates the client, and whether it can register one            |
| `token_endpoint_auth_signing_alg_values_supported` | The signing algorithm for `private_key_jwt`                                             |
| `registration_endpoint`                            | [Dynamic client registration](#let-vercel-connect-create-the-oauth-client)              |
| `client_id_metadata_document_supported`            | [Client ID metadata documents](#let-vercel-connect-create-the-oauth-client)             |
| `code_challenge_methods_supported`                 | [PKCE](#support-pkce)                                                                   |
| `revocation_endpoint`                              | [Token revocation](#token-revocation)                                                   |
| `scopes_supported`                                 | The [scopes offered](#publish-your-scopes) to your users                                |
| `authorization_details_types_supported`            | [Rich authorization requests](#resource-indicators-and-rich-authorization-requests)     |
| `jwks_uri`                                         | Your public keys                                                                        |
| `userinfo_endpoint`                                | User identity lookups                                                                   |

### Declare your grant types

Vercel Connect reads `grant_types_supported` to work out what a connector can do. Each grant maps to a token subject type:

| Grant type                                    | Subject type | What your users get                                                    |
| --------------------------------------------- | ------------ | ---------------------------------------------------------------------- |
| `authorization_code`                          | `user`       | A token that acts as a signed-in user, after that user authorizes once |
| `client_credentials`                          | `app`        | A token that acts as the application itself                           |
| `refresh_token`                               | -            | Automatic renewal of the two above                                     |
| `urn:ietf:params:oauth:grant-type:jwt-bearer` | `jwt-bearer` | A token exchanged from a federated identity assertion                  |

A grant you leave out never shows up as a capability.

### Accept the redirect URL

Vercel Connect uses this redirect URL: `https://connect.vercel.com/callback`

Accept it through DCR or CIMD, or let your users configure it themselves when they register an application. It needs an exact match, so no wildcard support is required.

### Return `expires_in`

[RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749#section-5.1) makes `expires_in` optional. However, without it, Vercel Connect infers a lifetime, and your API can end up receiving requests with expired tokens.

## Recommended

### Let Vercel Connect create the OAuth client

Vercel Connect supports two standard ways to create a client, so users don't register an application at all. It detects both from your discovery documents.

**Dynamic client registration ([RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591)).** Declare a `registration_endpoint`. Vercel Connect authenticates the client with `client_secret_basic`, `client_secret_post`, `none`, or `private_key_jwt`. If your `token_endpoint_auth_methods_supported` doesn't include one of these, Vercel Connect won't perform DCR.

**[Client ID metadata documents](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-client-id-metadata-document).** Declare `client_id_metadata_document_supported: true`. Vercel Connect uses CIMD when you support `private_key_jwt`, or when you support public clients and declare `S256` in `code_challenge_methods_supported`. Your server reads the client metadata from a URL Vercel hosts, so there's no registration call, and an edit to a connector reaches you the next time you read it.

Either way, Vercel Connect sends this client metadata:

| Field                        | Value                                                      |
| ---------------------------- | ---------------------------------------------------------- |
| `client_name`                | The name your user gave the connector                      |
| `token_endpoint_auth_method` | A method from your `token_endpoint_auth_methods_supported` |
| `grant_types`                | The grants your user enabled on the connector              |
| `redirect_uris`              | The Vercel Connect callback URL                            |
| `jwks_uri`                   | A key set, only for `private_key_jwt`                      |
| `logo_uri`                   | The connector icon, only when your user set one            |

For `private_key_jwt`, Vercel Connect signs client assertions with a per-connector key and publishes the public key at `jwks_uri`. Fetch the key set from there instead of asking for a static upload, so key rotation doesn't break existing connectors. Vercel Connect uses `RS256` unless your `token_endpoint_auth_signing_alg_values_supported` names another supported algorithm.

### Keep the client in sync

Support [RFC 7592](https://datatracker.ietf.org/doc/html/rfc7592) and return `registration_access_token` and `registration_client_uri` from registration. Vercel Connect uses it to keep a DCR-created client in sync when your user renames a connector, changes its icon, or enables another grant type.

CIMD needs nothing here. You read the metadata document, so it's already current.

### Support PKCE

Declare `S256` in `code_challenge_methods_supported`. When declared, Vercel Connect uses Proof Key for Code Exchange (PKCE) in authorization flows per [RFC 9700](https://datatracker.ietf.org/doc/html/rfc9700). It's also one of the two paths to CIMD for public clients.

### Issue refresh tokens

Declare `refresh_token` in `grant_types_supported` and issue refresh tokens on the authorization code flow. Without them, every expiry sends your user through an authorization prompt again. If you rotate refresh tokens, return the new one in every refresh response.

## Optional

### Protected resource metadata

If your service is an MCP server, or any other protected resource in front of a separate authorization server, publish [RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728) protected resource metadata with a non-empty `authorization_servers` array. Your users can then point Vercel Connect at the resource URL they already know, instead of looking up an authorization server URL.

### Token revocation

Declare a `revocation_endpoint` per [RFC 7009](https://datatracker.ietf.org/doc/html/rfc7009). Vercel Connect then offers revocation in the dashboard, the CLI, and the SDK, and calls your endpoint when your user revokes a token.

Vercel Connect also revokes the tokens it holds when your user removes an installation or deletes a connector, and calls your `revocation_endpoint` if you declare one. Without one, revoking only removes Vercel's stored copy, and your side treats the token as live until it expires.

### Publish your scopes

List every scope a client can request in `scopes_supported`. Vercel Connect offers this set to your users when they configure your OAuth client in the Vercel dashboard or CLI.

If you serve OpenID Connect, include `openid`, plus `profile` and `email` where you support them. Vercel Connect shows those separately from your API scopes.

### Resource indicators and rich authorization requests

Two specifications let your users ask for narrower tokens. Vercel Connect passes both through:

- [RFC 8707 Resource Indicators](https://datatracker.ietf.org/doc/html/rfc8707): accept the `resource` parameter, so a token only works against the API your user named.
- [RFC 9396 Rich Authorization Requests](https://datatracker.ietf.org/doc/html/rfc9396): declare your types in `authorization_details_types_supported`, and Vercel Connect offers them on the connector.

### Accept a logo

Accept `logo_uri` in client metadata, so your consent screen shows the application your user is authorizing instead of a placeholder.

## Verify your service

Check what Vercel Connect can see about your service in two steps.

First, review your discovery document:

```bash filename="terminal"
curl -sS https://auth.example.com/.well-known/oauth-authorization-server | jq '{
  issuer,
  authorization_endpoint,
  token_endpoint,
  registration_endpoint,
  revocation_endpoint,
  grant_types_supported,
  token_endpoint_auth_methods_supported,
  code_challenge_methods_supported,
  client_id_metadata_document_supported,
  scopes_supported
}'
```

*Fetch your discovery document and check the fields Vercel Connect reads.*

Then create a connector against your own service with the [Vercel CLI](/docs/cli/connect#vercel-connect-create):

```bash filename="terminal"
vercel connect create auth.example.com
```

*Create a connector by URL and read the connection methods offered.*

The CLI discovers your well-known endpoints and will automatically register the client if you support DCR/CIMD.

### Common problems

| Symptom                                                              | Cause                                                                                                    |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Vercel Connect can't find your discovery document for a URL with a path | Metadata is only at the origin. Add the path-suffixed form from RFC 8414 Section 3.1                      |
| Vercel Connect skips a document that exists                          | The document isn't served as `application/json` nor form-encoded.                                                         |
| Your users enter a client ID and secret even though you support DCR  | `token_endpoint_auth_methods_supported` names no method Vercel Connect can use for registration           |
| Your API receives requests with expired tokens                       | Token responses omit `expires_in`, so Vercel Connect infers the lifetime                                 |
| Your users re-authorize more often than expected                     | `grant_types_supported` omits `refresh_token`, or rotation returns no new refresh token                   |
| A capability you support never appears in Vercel                     | It isn't in your discovery documents. Vercel Connect reads capabilities from them rather than probing     |

## Next steps

- [Connectors](/docs/connect/concepts/connectors): the record your users work with when they connect to your service.
- [Tokens](/docs/connect/concepts/tokens): subject types, scopes, refresh, and revocation as your users see them.
- [Authentication](/docs/connect/concepts/authentication): how Vercel Connect proves identity in both directions.


---

[View full sitemap](/docs/sitemap)
