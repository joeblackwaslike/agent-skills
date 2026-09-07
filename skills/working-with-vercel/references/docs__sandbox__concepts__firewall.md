---
title: Sandbox firewall
product: vercel
url: /docs/sandbox/concepts/firewall
canonical_url: "https://vercel.com/docs/sandbox/concepts/firewall"
last_updated: 2026-08-31
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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "469aaad7b7fff66e5ca917e7a3e64a5913d7061057ed2e20fc8a9c4f8237a429"
---

# Sandbox firewall

Network firewall allows users to restrict egress traffic from their sandbox. It is a critical tool to prevent data exfiltration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Security Model](https://eve.dev/docs/concepts/security-model?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related) — eve's trust boundaries, where secrets live, how credentials reach hosts, and what fails closed by default.
- [Full Sandbox egress firewall now available on Hobby plan](https://vercel.com/changelog/full-sandbox-egress-firewall-now-available-on-hobby-plan?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related)
- [How to run a multi-step research agent on Vercel](https://vercel.com/kb/guide/how-to-run-a-multi-step-research-agent-on-vercel?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related) — An end-to-end architecture for production research agents on Vercel using Sandbox, Workflows, and AI Gateway with isolat
- [A sandbox without a network boundary is only half a sandbox](https://vercel.com/blog/a-sandbox-without-a-network-boundary-is-only-half-a-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related)
- [How v0 authenticates to Snowflake without exposing the user's OAuth token](https://vercel.com/blog/how-v0-authenticates-to-snowflake-without-exposing-the-users-oauth-token?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related)
- [Vercel Sandbox firewall now supports request proxying and filtering](https://vercel.com/changelog/vercel-sandbox-firewall-now-supports-request-proxying-and-filtering?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related)
- [Advanced egress firewall filtering for Vercel Sandbox](https://vercel.com/changelog/advanced-egress-firewall-filtering-for-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related)
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Safely inject credentials in HTTP headers with Vercel Sandbox](https://vercel.com/changelog/safely-inject-credentials-in-http-headers-with-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related)
- [Protect Sensitive Routes with Vercel WAF: Challenge and Deny Rule Recipes](https://vercel.com/kb/guide/suspicious-traffic-in-specific-countries?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related) — Use Vercel WAF custom rules to block or challenge unwanted traffic by country, ASN, IP address, user agent, path, or coo
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \\(VCR
- [Update network policy](https://vercel.com/docs/rest-api/sandboxes/update-network-policy?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Ffirewall&source_site=vercel-docs&relationship=related) — POST /v2/sandboxes/sessions/{sessionId}/network-policy — Replaces the network access policy of a running session. Use th

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

- **Allowed domains**: Allow traffic by domain (for example, `api.example.com` or `*.example.com`), including services that use virtual hosting, such as Amazon S3. A domain allowlist constrains which hostname a connection negotiates, not which virtual host the request ultimately reaches; see [HTTP and HTTPS](#http-and-https).
- **Allowed address ranges**: Allow traffic by CIDR range (for example, `10.0.0.0/8`). Use address ranges for non-encrypted traffic or private network access through Secure Compute. Address range rules do not enforce per-domain rules.
- **Denied address ranges**: Block traffic to specific CIDR ranges (for example, `172.16.0.0/12`). Denied ranges take precedence over allowed domains and address ranges, but only remove access that an allow rule already granted.

The firewall makes two separate decisions:

1. **Access**: the three lists above decide whether traffic gets through at all.
2. **Handling**: rules on an allowed domain decide what happens to the requests they match, either [credentials brokering](#credentials-brokering) through `transform` or [requests proxying](#requests-proxying) through `forwardURL`. A rule defines one or the other.

A rule never changes whether a request is allowed.

A domain wildcard must replace an entire DNS label. You can place wildcard labels anywhere in a domain pattern. Partial-label wildcards such as `api*.example.com` are not supported.

Domain patterns match as follows:

| Pattern | Matches | Does not match |
| --- | --- | --- |
| `example.com` | `example.com` | `www.example.com` |
| `*.example.com` | `www.example.com`, `www.api.example.com` | `example.com` |
| `www.*.com` | `www.example.com` | `example.com`, `www.api.example.com` |
| `*` | Any domain | None |

The following behaviors determine the effective scope of a user-defined policy:

- **Leading wildcards don't match the apex domain**: `*.example.com` matches subdomains at any depth, but not `example.com` itself. Add `example.com` separately if the sandbox needs both.
- **An empty policy behaves as `deny-all`**: a policy with no allowed domains or CIDR ranges blocks all outbound traffic, including DNS. This includes `{}`, `{ allow: {} }`, `{ subnets: {} }`, and policies that contain only `subnets.deny`, which blocks everything rather than creating an allow-all policy with exceptions. Use the explicit `deny-all` mode when you intend to block all traffic.
- **Domain and address range rules apply independently**: domain rules do not narrow the IP addresses allowed by `subnets.allow`. Code can reach any IP in an allowed range by using a literal IP address or a custom DNS resolver, and this traffic bypasses SNI filtering, [credentials brokering](#credentials-brokering), and [requests proxying](#requests-proxying).
- **Broad ranges override domain scoping**: `0.0.0.0/0` or `::/0` grants access to the entire Internet regardless of domain rules. Use domain rules for per-domain enforcement, and `subnets.allow` with exact ranges when you need raw IP access.
- **`subnets.allow` leaves DNS unrestricted**: a policy with allowed address ranges and no allowed domains can resolve any hostname, even when its ranges include only private networks, and code can use those lookups to send data over DNS. Use domain rules to restrict DNS resolution, or `deny-all` to block DNS entirely.

## Supported protocols

Domain-based rules identify traffic by the hostname negotiated during the TLS handshake. The following protocols are supported when filtering by domain.

### HTTP and HTTPS

HTTPS traffic is matched using the [SNI (Server Name Indication)](/docs/glossary#sni-server-name-indication) extension sent at the start of the TLS handshake. Plain-text HTTP cannot be filtered by domain, and must be allowed by [IP range](#user-defined) instead.

Domain matching reads the hostname from the SNI extension, which travels unencrypted at the start of the handshake. For an ordinary allowed domain the firewall matches this hostname and forwards the connection without terminating TLS, so it never decrypts the request and never inspects the HTTP `Host` header inside the encrypted connection. TLS is terminated only for domains with `transform` or `forwardURL` rules; see [TLS termination](#tls-termination).

Because matching happens on the SNI alone, a client inside the sandbox can send an allowlisted hostname as the SNI while sending a different hostname in the HTTP `Host` header, a technique known as domain fronting. When the destination server or CDN accepts requests whose `Host` header differs from the SNI, the request can reach a different virtual host behind the same infrastructure than the one you allowed. Many providers reject mismatched requests, but the firewall does not prevent the mismatch by default. Traffic still only flows to endpoints that serve the allowlisted SNI; a domain allowlist constrains which hostname a connection negotiates, not which application behind that endpoint ultimately serves the request.

When this matters for your threat model, prefer allowlisting narrow, single-purpose hostnames whose infrastructure does not host other origins. To enforce policy on the request itself, use [credentials brokering](#credentials-brokering) through `transform` or [requests proxying](#requests-proxying) through `forwardURL`. For these rules the firewall terminates TLS, so it can inspect and rewrite the request. Leave `match` off a rule you rely on as a safeguard: [matchers](#matchers) narrow which requests a rule touches, and requests it skips pass through unchanged. You can also route traffic through your own proxy that enforces `Host`-level rules.

A `transform` rule can force the HTTP `Host` header to the allowed domain. Because the firewall terminates TLS for domains with transformation rules, the header is rewritten before the request leaves the sandbox, so every request that reaches the destination carries the hostname you allowed regardless of the `Host` header the client sent:

**TypeScript**

```ts
import { Sandbox } from '@vercel/sandbox';

// Pin the Host header on all requests to the allowed domain.
const sandbox = await Sandbox.create({
  networkPolicy: {
    allow: {
      "api.example.com": [{
        transform: [{ headers: { "Host": "api.example.com" } }],
      }],
    },
  },
});
```

**Python**

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import (
    NetworkPolicy,
    NetworkPolicyRule,
    NetworkPolicyTransform,
)


async def main() -> None:
    # Pin the Host header on all requests to the allowed domain.
    box = await sandbox.create_sandbox(
        network_policy=NetworkPolicy.custom(
            allow={
                "api.example.com": [
                    NetworkPolicyRule(
                        transform=[
                            NetworkPolicyTransform(
                                headers={"Host": "api.example.com"}
                            )
                        ]
                    )
                ]
            }
        )
    )
    print(box.name)


asyncio.run(main())
```

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

Credentials brokering injects credentials into egressing traffic. The secrets never enter the sandbox, so code running inside it cannot exfiltrate them.

Each rule can define [matchers](#matchers) on the path, method, query parameters, and headers. When defined, only matching requests are transformed. A request that matches no rule still reaches the domain: it is sent unchanged, without the injected credential. Matchers select requests for transformation. They never block a request.

Brokering relies on the client sending an [SNI (Server Name Indication)](/docs/glossary#sni-server-name-indication). When a policy combines a catch-all (`*`) rule with per-domain transforms, connections without a detectable domain pass through unmodified. Examples are TLS without SNI, or non-TLS protocols such as SSH. Use a restrictive allowlist without a catch-all if you need domain-less traffic to be denied.

**TypeScript**

```ts
import { Sandbox } from '@vercel/sandbox';

// Sandbox has access to everything, with credential brokering for two specific domains.
const sandbox = await Sandbox.create({
  networkPolicy: {
    allow: {
      "ai-gateway.vercel.sh": [{
        transform: [{ headers: { "Authorization": `Bearer ${process.env.AI_GATEWAY_TOKEN}` } }],
      }],
      "*.github.com": [{
        transform: [{ headers: { "Authorization": `Bearer ${process.env.GITHUB_TOKEN}` } }],
      }],
      // Allow traffic to all other domains. If unset only defined ones are reachable.
      "*": []
    }
  }
});

// Sandbox no longer has Internet or secure-compute access.
// Credential brokering is deactivated.
await sandbox.update({ networkPolicy: 'deny-all' });

// Reallow traffic only to ai-gateway, and use the same key.
await sandbox.update({
  networkPolicy: {
    allow: {
      "ai-gateway.vercel.sh": [{
        transform: [{ headers: { "Authorization": `Bearer ${process.env.AI_GATEWAY_TOKEN}` } }],
      }],
    },
  },
});
```

**Python**

```python filename="main.py"
import asyncio
import os

from vercel import sandbox
from vercel.sandbox import (
    NetworkPolicy,
    NetworkPolicyRule,
    NetworkPolicyTransform,
)


def policy_for(domain: str, token: str) -> NetworkPolicy:
    return NetworkPolicy.custom(
        allow={
            domain: [
                NetworkPolicyRule(
                    transform=[
                        NetworkPolicyTransform(
                            headers={"Authorization": f"Bearer {token}"}
                        )
                    ]
                )
            ]
        }
    )


async def main() -> None:
    box = await sandbox.create_sandbox(
        network_policy=policy_for(
            "ai-gateway.vercel.sh",
            os.environ["AI_GATEWAY_TOKEN"],
        )
    )

    # Remove Internet access and disable credential brokering.
    await box.update_network_policy(NetworkPolicy.deny_all())

    # Allow AI Gateway again with the same brokered credential.
    await box.update_network_policy(
        policy_for(
            "ai-gateway.vercel.sh",
            os.environ["AI_GATEWAY_TOKEN"],
        )
    )


asyncio.run(main())
```

## Requests proxying

Requests proxying allows forwarding traffic toward specific domains to a proxy you control, for logging, debugging, or transformation purposes. This is useful when you want to allow access to a domain while ensuring control over the requests and responses.

The `forwardURL` field must be a URL pointing to an HTTP/1.1-capable server and must not include a query string or fragment. Each rule can define [matchers](#matchers) on the path, method, query parameters, and headers. When defined, only matching requests are forwarded. A request that matches no rule is not forwarded: it goes directly to the destination as ordinary allowed traffic.

Forwarding is also how you restrict a domain to specific paths. Allow the domain with a `forwardURL` rule that has no `match`. A rule without `match` applies to every request, so all traffic to the domain routes through your proxy, and you reject the requests you don't want there. Adding a `match` would let non-matching requests skip the proxy and reach the destination directly.

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

**TypeScript**

```ts
import { Sandbox } from '@vercel/sandbox';

// Sandbox has access to everything, with a proxy forwarding for *.github.com.
const sandbox = await Sandbox.create({
  networkPolicy: {
    allow: {
      "*.github.com": [{
        forwardURL: "https://my-proxy.vercel.app/github"
      }],
      // Allow traffic to all other domains. If unset only defined ones are reachable.
      "*": []
    }
  }
});
```

**Python**

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import NetworkPolicy, NetworkPolicyRule


async def main() -> None:
    # Allow all traffic, and forward requests for *.github.com to the proxy.
    box = await sandbox.create_sandbox(
        network_policy=NetworkPolicy.custom(
            allow={
                "*.github.com": [
                    NetworkPolicyRule(
                        forward_url="https://my-proxy.vercel.app/github"
                    )
                ],
                "*": [],
            }
        )
    )
    print(box.name)


asyncio.run(main())
```

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

The firewall makes two separate decisions:

1. **Access**: the domain list decides whether a request gets through at all.
2. **Handling**: matchers decide which of those requests get the rule's `transform` or `forwardURL`.

With `match` set, the rule applies to the subset of requests that match every dimension you include. Without `match`, the rule applies to every request to the domain. A request the rule does not apply to is still allowed. It goes directly to the domain, with no forwarding and no injected headers.

When multiple rules target the same domain, they are evaluated in order and the first match wins; a rule without `match` matches every request and shadows later rules for the same domain.

**Matchers never block traffic.** To allow only certain paths on a domain, define a `forwardURL` rule without `match` for the domain and reject unwanted requests in your proxy; see [requests proxying](#requests-proxying).

The domain is not a match dimension. It is the key the rule is defined under, and it has already matched by the time rules are evaluated.

The following dimensions are supported:

- `path`: Matches on the request path. Comparison is case-sensitive.
- `method`: HTTP methods to match. Any single match succeeds (OR semantics).
- `queryString`: Query-string entry matchers. Multiple entries are ANDed. Query parameter names and values are both compared case-sensitively (RFC 3986). When a request has multiple values for the same key, any matching value satisfies the matcher.
- `headers`: Header matchers. Multiple entries are ANDed. Header names are compared case-insensitively (RFC 9110); header values are compared case-sensitively. When a request has multiple values for the same header, any matching value satisfies the matcher.

Matcher supports exact, prefix, or regex matching:

- `exact`: Match the value exactly. Case-sensitive for paths, header values, and methods; case-insensitive for domains and header keys.
- `startsWith`: Match values that start with the given prefix.
- `regex`: Match values against an RE2 regular expression. Anchor with ^ or $ as needed.

**TypeScript**

```ts
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  networkPolicy: {
    allow: {
      "ai-gateway.vercel.sh": [{
        match: {
          path: { exact: "/v1/chat/completions" },
          method: ["POST"],
          queryString: [{ key: { exact: "model" }, value: { startsWith: "gpt-" } }],
        },
        transform: [{ headers: { "Authorization": `Bearer ${process.env.AI_GATEWAY_TOKEN}` } }],
      }],
      "*.github.com": [{
        match: {
          headers: [{
            key: { exact: "Content-Type" },
            value: { startsWith: "application/" }
          }],
          method: ["GET", "POST"]
        },
        forwardURL: "https://my-proxy.vercel.app/github"
      }]
    }
  }
});
```

**Python**

```python filename="main.py"
import asyncio
import os

from vercel import sandbox
from vercel.sandbox import (
    NetworkPolicy,
    NetworkPolicyKeyValueMatcher,
    NetworkPolicyMatcher,
    NetworkPolicyRequestMatcher,
    NetworkPolicyRule,
    NetworkPolicyTransform,
)


async def main() -> None:
    box = await sandbox.create_sandbox(
        network_policy=NetworkPolicy.custom(
            allow={
                "ai-gateway.vercel.sh": [
                    NetworkPolicyRule(
                        match=NetworkPolicyRequestMatcher(
                            path=NetworkPolicyMatcher.exact(
                                "/v1/chat/completions"
                            ),
                            method=["POST"],
                            query=[
                                NetworkPolicyKeyValueMatcher(
                                    key=NetworkPolicyMatcher.exact("model"),
                                    value=NetworkPolicyMatcher.starts_with("gpt-"),
                                )
                            ],
                        ),
                        transform=[
                            NetworkPolicyTransform(
                                headers={
                                    "Authorization": (
                                        f"Bearer {os.environ['AI_GATEWAY_TOKEN']}"
                                    )
                                }
                            )
                        ],
                    )
                ],
                "*.github.com": [
                    NetworkPolicyRule(
                        match=NetworkPolicyRequestMatcher(
                            headers=[
                                NetworkPolicyKeyValueMatcher(
                                    key=NetworkPolicyMatcher.exact("Content-Type"),
                                    value=NetworkPolicyMatcher.starts_with(
                                        "application/"
                                    ),
                                )
                            ],
                            method=["GET", "POST"],
                        ),
                        forward_url="https://my-proxy.vercel.app/github",
                    )
                ],
            }
        )
    )
    print(box.name)


asyncio.run(main())
```

## TLS termination

In order to apply transformation and forwarding rules within requests, the firewall needs to terminate TLS connections. Only connections targeting domains with defined transformation rules are terminated in the proxy.

A unique, per-sandbox CA is added to the system certificates. Standard environment variables are configured automatically to ensure compatibility with most clients. If your application uses a custom CA bundle, configure it to trust the mounted certificate. See [Proxy CA certificates](/docs/sandbox/concepts#proxy-ca-certificates).

## Sandbox creation

Policies can be defined on sandboxes on creation, ensuring they will never run without them.

**CLI**

```bash
# Sandbox has full Internet and secure-compute access (default).
sandbox create --network-policy allow-all

# Sandbox has no Internet or secure-compute access.
sandbox create --network-policy deny-all

# Sandbox only gets access to listed websites.
sandbox create --allowed-domain "*.google.com" --allowed-domain ai-gateway.vercel.sh
```

**TypeScript**

```ts
import { Sandbox } from '@vercel/sandbox';

// Sandbox has full Internet and secure-compute access (default).
const sandbox = await Sandbox.create({
  networkPolicy: 'allow-all'
});

// Sandbox has no Internet or secure-compute access.
const sandbox = await Sandbox.create({
  networkPolicy: 'deny-all'
});

// Sandbox only gets access to listed websites.
const sandbox = await Sandbox.create({
  networkPolicy: {
    allow: ["*.google.com", "ai-gateway.vercel.sh"]
  }
});
```

**Python**

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import NetworkPolicy


async def main() -> None:
    # Sandbox has full Internet and secure-compute access (default).
    allowed = await sandbox.create_sandbox(
        network_policy=NetworkPolicy.allow_all()
    )

    # Sandbox has no Internet or secure-compute access.
    denied = await sandbox.create_sandbox(
        network_policy=NetworkPolicy.deny_all()
    )

    # Sandbox only gets access to listed websites.
    restricted = await sandbox.create_sandbox(
        network_policy=NetworkPolicy.custom(
            allow={"*.google.com": (), "ai-gateway.vercel.sh": ()}
        )
    )


asyncio.run(main())
```

## Live updates

Policies can be updated on running sandboxes, allowing for incremental restrictions.

For instance start by installing needed packages, downloading data, and then run untrusted code on it.
Without live updates the entire run would have to get Internet access (creating exfiltration risk), or multiple steps and sandboxes would be needed.

**CLI**

```bash
sandbox create --network-policy allow-all

# Install packages
sandbox exec my-sandbox -- npm install
# Download data
sandbox exec my-sandbox -- aws s3 cp s3://my-bucket/dataset .

# Lockdown Internet access
sandbox config network-policy my-sandbox --network-policy deny-all

# Run untrusted workload, without exfiltration risk
sandbox exec my-sandbox -- ./agent
```

**TypeScript**

```ts
import { Sandbox } from '@vercel/sandbox';

// Start with Internet access (default)
const sandbox = await Sandbox.create();

// Install dependencies, download data, configure environment, etc.
await sandbox.runCommand('npm', ['install']);
await sandbox.runCommand('aws', ['s3', 'cp', 's3://my-bucket/dataset', '.']);

// Lockdown Internet access
await sandbox.update({ networkPolicy: 'deny-all' });

// Run untrusted workload, without exfiltration risk
await sandbox.runCommand('./agent', []);
```

**Python**

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import NetworkPolicy


async def main() -> None:
    # Start with Internet access (default).
    box = await sandbox.create_sandbox()

    # Install dependencies, download data, and configure the environment.
    await box.run_process("npm", ["install"], check=True)
    await box.run_process(
        "aws",
        ["s3", "cp", "s3://my-bucket/dataset", "."],
        check=True,
    )

    # Remove Internet access.
    await box.update_network_policy(NetworkPolicy.deny_all())

    # Run the untrusted workload without exfiltration risk.
    await box.run_process("./agent", check=True)


asyncio.run(main())
```


---

[View full sitemap](/docs/sitemap)
