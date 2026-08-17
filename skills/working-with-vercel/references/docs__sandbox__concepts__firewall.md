---
title: Sandbox firewall
product: vercel
url: /docs/sandbox/concepts/firewall
canonical_url: "https://vercel.com/docs/sandbox/concepts/firewall"
last_updated: 2026-08-04
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/glossary
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/concepts
summary: Define network policies on sandboxes, preventing data exfiltration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/firewall.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "bb05f972c63cd5fe2792e73b63364ab92ac7cb1826102212166cf1d8eaca006d"
---

# Sandbox firewall

Network firewall allows users to restrict egress traffic from their sandbox. It is a critical tool to prevent data exfiltration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Security Model](https://eve.dev/docs/concepts/security-model?from=related) — eve's trust boundaries, where secrets live, how credentials reach hosts, and what fails closed by default.
- [How to run a multi-step research agent on Vercel](https://vercel.com/kb/guide/how-to-run-a-multi-step-research-agent-on-vercel?from=related) — An end-to-end architecture for production research agents on Vercel using Sandbox, Workflows, and AI Gateway with isolat
- [Sandbox](https://eve.dev/docs/sandbox?from=related) — The agent's isolated bash environment, including built-in file tools, a seeded /workspace, backends, lifecycle, and netw
- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox?from=related) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox?from=related) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \(VCR
- [Running OpenClaw in Vercel Sandbox](https://vercel.com/kb/guide/running-openclaw-in-vercel-sandbox?from=related) — This guide walks you through setting up OpenClaw inside a Vercel Sandbox and configuring the WhatsApp channel.
- [Update network policy](https://vercel.com/docs/rest-api/sandboxes/update-network-policy?from=related)
- [Firewall](https://vercel.com/docs/vercel-firewall?from=related) — Learn how Vercel Firewall helps protect your applications and websites from malicious attacks and unauthorized access.
- [Get a named sandbox](https://vercel.com/docs/rest-api/sandboxes/get-a-named-sandbox?from=related)
- [Delete a sandbox](https://vercel.com/docs/rest-api/sandboxes/delete-a-sandbox?from=related)
- [List sandboxes](https://vercel.com/docs/rest-api/sandboxes/list-sandboxes?from=related)

Full cross-link map for this page: [/docs/sandbox/concepts/firewall.graph.md](/docs/sandbox/concepts/firewall.graph.md)
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

Most specific policy, denying all traffic by default, while allowing users to get fine-grain control on their sandbox setup. Users can define:

- a list of domains to allow traffic to. Domain-based policies are easy to use and maintain fine-grain access control for services like S3 (per bucket) or behind virtual hosting (as Vercel). Wildcard support (`*`) allows easier management for complex websites. Each domain can have specific rules attached to it, such as [credentials brokering](/docs/sandbox/concepts/firewall#credentials-brokering) via the `transform` field or [requests proxying](/docs/sandbox/concepts/firewall#requests-proxying) via the `forwardURL` field. Only one of these feature can be defined per rule.
- a list of address ranges to allow traffic to. Those ranges will not enforce per-domain rules, supporting non-encrypted traffic. This is recommended when using secure-compute to connect to your private network securely.
- a list of address ranges to deny traffic to. Those range will take precedence to block traffic. This is useful when using secure-compute, allowing Internet access to be granted while blocking internal network.

Address ranges and domains are enforced independently, so combining them does not compose the way it appears to. Because allowed ranges are not filtered by your domain rules, a domain allowlist alongside `subnets.allow` only controls the default resolver's DNS lookups. It does not restrict which IPs the sandbox can connect to within the allowed ranges. Code in the sandbox can reach any IP in an allowed range by connecting to a literal IP address or by using a custom DNS resolver, and that traffic bypasses SNI filtering, [credentials brokering](#credentials-brokering), and [requests proxying](#requests-proxying). A broad range such as `0.0.0.0/0` or `::/0` therefore grants access to the entire Internet regardless of the domain allowlist. Use a domain allowlist when you need per-domain enforcement, or use `subnets.allow` scoped to the exact hosts you trust when you need raw IP access, rather than relying on both together.

`subnets.allow` also does not restrict DNS. The sandbox's default resolver keeps resolving arbitrary domain names no matter which ranges you allow, even under a policy that lists only private ranges with no public resolver. Only domain rules constrain what the default resolver will resolve, so a policy with allowed ranges but no `allow` domains leaves DNS open. Code in the sandbox can then resolve any hostname and use those lookups to send data out over DNS. Define an `allow` domain list to restrict DNS, or use `deny-all` to block it entirely.

## Supported protocols

Domain-based rules identify traffic by the hostname negotiated during the TLS handshake. The following protocols are supported when filtering by domain.

### HTTP and HTTPS

HTTPS traffic is matched using the [SNI (Server Name Indication)](/docs/glossary#sni-server-name-indication) extension sent at the start of the TLS handshake. Plain-text HTTP cannot be filtered by domain, and must be allowed by [IP range](#user-defined) instead.

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
