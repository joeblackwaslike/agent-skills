---
title: Sandbox firewall
product: vercel
url: /docs/sandbox/concepts/firewall
canonical_url: "https://vercel.com/docs/sandbox/concepts/firewall"
last_updated: 2026-08-25
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/glossary
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/functions
  - /docs/functions/functions-api-reference
  - /docs/sandbox/concepts
summary: Define network policies on sandboxes, preventing data exfiltration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/firewall.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "adb3ac261a5631c8715c477089500d9b3cc601bbcb1e0a065dfd361692b25df0"
---

# Sandbox firewall

Network firewall allows users to restrict egress traffic from their sandbox. It is a critical tool to prevent data exfiltration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [A sandbox without a network boundary is only half a sandbox](https://vercel.com/blog/a-sandbox-without-a-network-boundary-is-only-half-a-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related)
- [Security Model](https://eve.dev/docs/concepts/security-model?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related) — eve's trust boundaries, where secrets live, how credentials reach hosts, and what fails closed by default.
- [Full Sandbox egress firewall now available on Hobby plan](https://vercel.com/changelog/full-sandbox-egress-firewall-now-available-on-hobby-plan?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related)
- [How to run a multi-step research agent on Vercel](https://vercel.com/kb/guide/how-to-run-a-multi-step-research-agent-on-vercel?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related) — An end-to-end architecture for production research agents on Vercel using Sandbox, Workflows, and AI Gateway with isolat
- [How v0 authenticates to Snowflake without exposing the user's OAuth token](https://vercel.com/blog/how-v0-authenticates-to-snowflake-without-exposing-the-users-oauth-token?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related)
- [Advanced egress firewall filtering for Vercel Sandbox](https://vercel.com/changelog/advanced-egress-firewall-filtering-for-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related)
- [Vercel Sandbox firewall now supports request proxying and filtering](https://vercel.com/changelog/vercel-sandbox-firewall-now-supports-request-proxying-and-filtering?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related)
- [Safely inject credentials in HTTP headers with Vercel Sandbox](https://vercel.com/changelog/safely-inject-credentials-in-http-headers-with-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related)
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \\(VCR
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Update network policy](https://vercel.com/docs/rest-api/sandboxes/update-network-policy?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related) — POST /v2/sandboxes/sessions/{sessionId}/network-policy — Replaces the network access policy of a running session. Use th
- [Get a named sandbox](https://vercel.com/docs/rest-api/sandboxes/get-a-named-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related) — GET /v2/sandboxes/{name} — Retrieves a named sandbox by name, including its current sandbox and routes. If the sandbox i

Full cross-link map for this page: [/docs/sandbox/concepts/firewall.graph.md](/docs/sandbox/concepts/firewall.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## When to use network firewall

- **Protect user data**: Allow untrusted code to touch user-data without a risk of it getting exfiltrated.
- **Avoid malware injection**: Constrain package sources, or S3 buckets to access.
- **Dynamic policies for multi-step work**: Start with Internet access, get required data, lock access and start untrusted process.
- **Protect your credentials**: Untrusted code running within the sandbox cannot be trusted with credentials, but needs to authenticate to external services (e.g. AI Gateway).
- **Proxying requests**: Forward requests to a proxy you control, for logging, debugging, or transformation purposes.

## Network policies

Sandboxes can use three distinct modes, which can be updated at runtime, without restarting the process.

### `allow-all`

Default policy. This gives the sandbox unrestricted access to the public Internet.

Have the ability to install software packages, download dependencies and pull any data from external sources with the enhanced security model of sandboxes.

### `deny-all`

Most restrictive policy. Denies all outbound network access, including DNS.

This is useful to reduce the chance of data exfiltration when running untrusted code or an agent on private data.

### User-defined

User-defined policies deny traffic by default and let you allow specific destinations. You can define:

- **Allowed domains**: Allow traffic by domain (for example, `api.example.com` or `*.example.com`), including services that use virtual hosting, such as Amazon S3. A domain can also use [credentials brokering](#credentials-brokering) through `transform` or [requests proxying](#requests-proxying) through `forwardURL`. A rule can define either `transform` or `forwardURL`. A domain allowlist constrains which hostname a connection negotiates, not which virtual host the request ultimately reaches; see [HTTP and HTTPS](#http-and-https).
- **Allowed address ranges**: Allow traffic by CIDR range (for example, `10.0.0.0/8`). Use address ranges for non-encrypted traffic or private network access through Secure Compute. Address range rules do not enforce per-domain rules.
- **Denied address ranges**: Block traffic to specific CIDR ranges (for example, `172.16.0.0/12`). Denied ranges take precedence over allowed domains and address ranges, but only remove access that an allow rule already granted.

A domain wildcard must replace an entire DNS label. You can place wildcard labels anywhere in a domain pattern. Partial-label wildcards such as `api*.example.com` are not supported.

Domain patterns match as follows:

| Pattern | Matches | Does not match |
| --- | --- | --- |
| `example.com` | `example.com` | `www.example.com` |
| `*.example.com` | `www.example.com`, `www.api.example.com` | `example.com` |
| `www.*.com` | `www.example.com` | `example.com`, `www.api.example.com` |
| `*` | Any domain | None |

The following behaviors determine the effective scope of a user-defined policy.

A leading wildcard such as `*.example.com` matches subdomains at any depth, but it does not match the apex domain. Add `example.com` separately if the sandbox needs access to both the apex domain and its subdomains.

A user-defined policy with no allowed domains or CIDR ranges behaves as `deny-all` and blocks all outbound traffic, including DNS.

Empty policies such as `{}`, `{ allow: {} }`, and `{ subnets: {} }` also behave as `deny-all`. Policies that contain only `subnets.deny` behave the same way, rather than creating an allow-all policy with exceptions. Use the explicit `deny-all` mode when you intend to block all traffic.

When a policy has allow rules, domain and address range rules apply independently. Domain rules do not narrow the IP addresses allowed by `subnets.allow`. Code can reach any IP in an allowed range by using a literal IP address or a custom DNS resolver. This traffic bypasses SNI filtering, [credentials brokering](#credentials-brokering), and [requests proxying](#requests-proxying).

A broad range such as `0.0.0.0/0` or `::/0` grants access to the entire Internet regardless of domain rules. Use domain rules for per-domain enforcement. Use `subnets.allow` with exact ranges when you need raw IP access.

`subnets.allow` also leaves the sandbox's default DNS resolver unrestricted. A policy with allowed address ranges and no allowed domains can resolve any hostname, even when its ranges include only private networks. Code can use those lookups to send data over DNS. Use domain rules to restrict DNS resolution, or use `deny-all` to block DNS entirely.

## Supported protocols

Domain-based rules identify traffic by the hostname negotiated during the TLS handshake. The following protocols are supported when filtering by domain.

### HTTP and HTTPS

HTTPS traffic is matched using the [SNI (Server Name Indication)](/docs/glossary#sni-server-name-indication) extension sent at the start of the TLS handshake. Plain-text HTTP cannot be filtered by domain, and must be allowed by [IP range](#user-defined) instead.

Domain matching reads the hostname from the SNI extension, which travels unencrypted at the start of the handshake. For an ordinary allowed domain the firewall matches this hostname and forwards the connection without terminating TLS, so it never decrypts the request and never inspects the HTTP `Host` header inside the encrypted connection. TLS is terminated only for domains with `transform` or `forwardURL` rules; see [TLS termination](#tls-termination).

Because matching happens on the SNI alone, a client inside the sandbox can send an allowlisted hostname as the SNI while sending a different hostname in the HTTP `Host` header, a technique known as domain fronting. When the destination server or CDN accepts requests whose `Host` header differs from the SNI, the request can reach a different virtual host behind the same infrastructure than the one you allowed. Many providers reject mismatched requests, but the firewall does not prevent the mismatch by default. Traffic still only flows to endpoints that serve the allowlisted SNI; a domain allowlist constrains which hostname a connection negotiates, not which application behind that endpoint ultimately serves the request.

When this matters for your threat model, prefer allowlisting narrow, single-purpose hostnames whose infrastructure does not host other origins. To enforce policy on the request itself, use [credentials brokering](#credentials-brokering) through `transform` or [requests proxying](#requests-proxying) through `forwardURL`, optionally with restrictive [matchers](#matchers). For these rules the firewall terminates TLS, so it can inspect and rewrite the request. You can also route traffic through your own proxy that enforces `Host`-level rules.

A `transform` rule can force the HTTP `Host` header to the allowed domain. Because the firewall terminates TLS for domains with transformation rules, the header is rewritten before the request leaves the sandbox, so every request that reaches the destination carries the hostname you allowed regardless of the `Host` header the client sent:

### Postgres

Postgres connections to hosted databases are supported when the database host is added to a sandbox's allowed domains. Because the Postgres wire protocol negotiates TLS after the TCP connection is established, the firewall handles this handshake explicitly and applies the domain policy before forwarding the connection.

The following limitations apply when allowing Postgres traffic:

- TLS is required. Clients must connect with `sslmode=require` or stricter. Plain-text Postgres cannot be filtered by domain, and must be allowed by [IP range](#user-defined) instead.
- GSSAPI-encrypted connections are not supported. Clients using `gssencmode=prefer` will fall back to TLS automatically. `gssencmode=require` will not connect.
- `sslmode=prefer` will not downgrade. If the database does not support TLS, the connection will fail rather than fall back to plain-text.
- [Credentials brokering](#credentials-brokering) and other request transformations are not supported on Postgres connections. Transformation rules on a domain are ignored when the domain is reached over Postgres.

## Credentials brokering

Commands running in the sandbox often require authentication with external services, for instance code repositories or AI services. Providing API keys to those commands would risk abuse or exfiltration.
On the other hand, allowing access to a domain can allow data exfiltration if not restricting the permissions or sessions attached to it.

Credentials brokering allows the injection of credentials on egressing traffic, while ensuring those secrets never enter the sandbox scope, preventing exfiltration. Each rule can define a set of [matchers](/docs/sandbox/concepts/firewall#matchers) on the path, method, query parameters, and headers. When defined, only requests matching the specified dimensions are transformed. Brokering relies on the client sending an [SNI (Server Name Indication)](/docs/glossary#sni-server-name-indication). When a policy combines a catch-all (`*`) rule with per-domain transforms, connections without a detectable domain pass through unmodified. Examples of these connections are TLS without SNI or non-TLS protocols such as SSH. Use a restrictive allowlist without a catch-all if you need domain-less traffic to be denied.

## Requests proxying

Requests proxying allows forwarding traffic toward specific domains to a proxy you control, for logging, debugging, or transformation purposes. This is useful when you want to allow access to a domain while ensuring control over the requests and responses.

The `forwardURL` field must be a URL pointing to an HTTP/1.1-capable server and must not include a query string or fragment. Each rule can define a set of [matchers](/docs/sandbox/concepts/firewall#matchers) on the path, method, query parameters, and headers. When defined, only requests matching the specified dimensions will be forwarded.

Like brokering, forwarding is SNI-dependent. Under a catch-all (`*`) policy, domain-less traffic passes through unforwarded. Use a restrictive allowlist without a catch-all to deny it.

The `forwardURL` receives the original request as-is, with the addition of the following headers:

- `vercel-forwarded-host`: The original request's SNI
- `vercel-forwarded-scheme`: The original request's scheme
- `vercel-forwarded-port`: The original request's port
- `vercel-forwarded-path`: The original request's path
- `vercel-sandbox-oidc-token`: A Vercel-issued OIDC token that the proxy can use to authenticate the request.

  The OIDC token's audience (`aud`) is the configured `forwardURL`. The proxy should verify the token signature, issuer, expiry, and that `aud` exactly matches its expected `forwardURL`; this prevents accepting tokens minted for another forwarding endpoint. The token contains the following additional claims about the sandbox that the request originated from:

  - `team_id`: The [ID of the Vercel team](https://vercel.com/docs/accounts#find-your-team-id) the sandbox belongs to.
  - `project_id`: The [ID of the Vercel project](https://vercel.com/docs/project-configuration/general-settings#project-id) the sandbox belongs to.
  - `sandbox_id`: The sandbox's ID.
  - `sandbox_name`: The sandbox's name, when using [persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes).

We recommend using the `defineSandboxProxy` helper from `@vercel/sandbox/proxy` to setup a proxy with automatic OIDC validation and extracted metadata.

Implement the proxy server yourself, or use the TypeScript-only `defineSandboxProxy` helper inside a [Vercel Function](/docs/functions) or a [fetch Web Standard](/docs/functions/functions-api-reference#fetch-web-standard) compatible server:

```ts
import { defineSandboxProxy } from '@vercel/sandbox/proxy';

const proxy = defineSandboxProxy(async (request, { teamId, projectId, sandboxId, sandboxName }) => {
  // Perform additional validation, logging, or transformation here.
  return await fetch(request);
})

// Per-method Web Handler in Next.js or Vercel Function:
export const GET = proxy;
export const POST = proxy;

// fetch Web Handler in Vercel Function, handles all methods:
export default {
  fetch: proxy
}
```

## Matchers

Matchers allow transformation or forwarding rules to be applied to requests that satisfy every specified dimension. When multiple injection rules target the same domain, they are evaluated in order and the first match wins; a rule without `match` matches any request and shadows later rules for the same domain.

Matchers choose which requests get transformed or forwarded for a given allowed domain. When you set `match`, every dimension you include must match the request for the rule to apply. When multiple rules target the same domain, they are evaluated in order and the first match wins; a rule without `match` matches any request and shadows later rules for the same domain.

The following dimensions are supported:

- `path`: Matches on the request path. Comparison is case-sensitive.
- `method`: HTTP methods to match. Any single match succeeds (OR semantics).
- `queryString`: Query-string entry matchers. Multiple entries are ANDed. Query parameter names and values are both compared case-sensitively (RFC 3986). When a request has multiple values for the same key, any matching value satisfies the matcher.
- `headers`: Header matchers. Multiple entries are ANDed. Header names are compared case-insensitively (RFC 9110); header values are compared case-sensitively. When a request has multiple values for the same header, any matching value satisfies the matcher.

Matcher supports exact, prefix, or regex matching:

- `exact`: Match the value exactly. Case-sensitive for paths, header values, and methods; case-insensitive for domains and header keys.
- `startsWith`: Match values that start with the given prefix.
- `regex`: Match values against an RE2 regular expression. Anchor with ^ or $ as needed.

## TLS termination

In order to apply transformation and forwarding rules within requests, the firewall needs to terminate TLS connections. Only connections targeting domains with defined transformation rules are terminated in the proxy.

A unique, per-sandbox CA is added to the system certificates. Standard environment variables are configured automatically to ensure compatibility with most clients. If your application uses a custom CA bundle, configure it to trust the mounted certificate. See [Proxy CA certificates](/docs/sandbox/concepts#proxy-ca-certificates).

## Sandbox creation

Policies can be defined on sandboxes on creation, ensuring they will never run without them.

## Live updates

Policies can be updated on running sandboxes, allowing for incremental restrictions.

For instance start by installing needed packages, downloading data, and then run untrusted code on it.
Without live updates the entire run would have to get Internet access (creating exfiltration risk), or multiple steps and sandboxes would be needed.


---

[View full sitemap](/docs/sitemap)
