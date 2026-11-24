---
title: Sandbox security model
product: vercel
url: /docs/sandbox/concepts/security
canonical_url: "https://vercel.com/docs/sandbox/concepts/security"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/firewall
  - /docs/sandbox/examples/expose-a-port
  - /docs/sandbox/concepts/secure-compute
  - /docs/sandbox/concepts/persistent-sandboxes
summary: "Understand the Vercel Sandbox security model: microVM isolation, hardware side channels, resource limits, network access, and data privacy."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/concepts/security.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "36c40c6154cd4d08048808cabcc3b2da0c5a8d98c9b71261b892cbb53de41bbd"
---

# Sandbox security model

Vercel Sandboxes are designed for running untrusted code safely. This page describes the security model: the isolation boundary each sandbox runs in, what that boundary does and does not cover, and the limits that apply to every sandbox.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [A sandbox without a network boundary is only half a sandbox](https://vercel.com/blog/a-sandbox-without-a-network-boundary-is-only-half-a-sandbox)
- [Vercel Sandbox vs Upstash Box](https://vercel.com/kb/guide/vercel-sandbox-vs-upstash-box) — Compare Vercel Sandbox and Upstash Box as AI agent sandboxes, including isolation, persistence, network controls, SDKs,
- [Advanced egress firewall filtering for Vercel Sandbox](https://vercel.com/changelog/advanced-egress-firewall-filtering-for-vercel-sandbox)
- [Runtimes](https://vercel.com/docs/sandbox/concepts/runtimes) — Detailed specifications for the Vercel Sandbox environment.
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Sandbox Examples](https://vercel.com/docs/sandbox/examples) — Task-oriented examples for common Vercel Sandbox operations in TypeScript, Python, and the Sandbox CLI.
- [Vercel Sandbox SDK](https://vercel.com/docs/sandbox/sdk) — Use the Vercel Sandbox SDK for JavaScript, TypeScript, and Python, or the Sandbox CLI, to create and manage isolated Lin
- [Delete a sandbox](https://vercel.com/docs/rest-api/sandboxes/delete-a-sandbox) — DELETE /v2/sandboxes/{name} — Deletes a sandbox by name. If sandboxes are currently running, they will be stopped first.

Full cross-link map for this page: [/docs/sandbox/concepts/security.graph.md](/docs/sandbox/concepts/security.graph.md)
<!-- /docsgraph:related -->

## Isolation architecture

Each sandbox runs in its own [Firecracker](https://firecracker-microvm.github.io/) microVM with a dedicated kernel, so you can run processes that require system-level privileges. Run them with `sudo`. The microVM boundary keeps them isolated to your sandbox: they can't access other sandboxes or the host. Sandboxes on the same host still share physical hardware, which has limits described in [Hardware side channels](#hardware-side-channels).

For example, you can:

- Run Docker and other container engines to build images or run containerized workloads.
- Connect a VPN client to reach private networks during a session.
- Mount FUSE filesystems to attach object storage, network filesystems, or other custom mounts.

To run a command with `sudo` from the CLI, pass `--sudo`. In the SDK, pass `sudo: true` to `runCommand()`.

```bash filename="terminal"
sandbox exec --sudo <name> -- <command>
```

Outbound network access from these workloads still follows the [sandbox firewall](/docs/sandbox/concepts/firewall) network policy. Restrict reachable destinations with a network policy when you run untrusted code.

If you run containers and use firewall rules that modify requests, such as credential injection, the containers need the proxy CA certificate. See [Trust the proxy CA in containers](#trust-the-proxy-ca-in-containers).

## Hardware side channels

The Vercel Sandbox boundary prevents direct cross-tenant access. A workload cannot read, modify, or execute another tenant's code or data through the compute or network layers. Vercel tests this boundary publicly, including through a [$1 million security research challenge](https://vercel.com/blog/one-million-dollar-hacker-challenge-for-vercel-sandbox).

Vercel also applies the side-channel mitigations built into modern processors, operating-system kernels, and the Firecracker hypervisor. Hardware side channels remain a known property of shared physical infrastructure, documented by public research such as [Spectre and Meltdown](https://spectreattack.com/), and no multi-tenant compute platform eliminates them entirely. Two cooperating workloads on the same host can measure timing variations in shared CPU caches, memory, or storage to exchange low-bandwidth signals without a network connection or a shared filesystem. These covert channels are probabilistic, and they carry only the signals that both parties agree to exchange in advance. They do not give a workload direct access to another tenant's data.

If your threat model includes covert communication between cooperating workloads, [contact Vercel](https://vercel.com/help) to discuss your requirements.

## Resource limits

Every sandbox comes with:

- A dedicated private filesystem
- Network namespace isolation
- Kernel-level process isolation
- Strict CPU, memory, and disk limits
- Automatic timeouts to prevent runaway processes

These limits prevent resource exhaustion and ensure fair usage across all sandboxes.

## Network access

Sandboxes can make outbound HTTP requests by default, so you can install packages from public registries like npm or PyPI. Exposed ports are accessible via a public URL, so be mindful of what services you run. See [Expose a port](/docs/sandbox/examples/expose-a-port).

Internet access from the sandbox can be restricted through network policies defined by the users, as part of the [sandbox firewall](/docs/sandbox/concepts/firewall).

To send a sandbox's public-internet traffic through a Secure Compute network's static IPs, and to reach your own AWS VPC over VPC peering, see [Using Secure Compute with Sandbox](/docs/sandbox/concepts/secure-compute).

### Proxy CA certificates

Some [firewall rules](/docs/sandbox/concepts/firewall#tls-termination) change requests on their way out, for example to inject credentials. For domains with transformation, forwarding, or direct-response rules, the firewall decrypts HTTPS traffic, applies the rule, and re-encrypts it with a certificate signed by a certificate authority (CA) unique to your sandbox. Traffic to other domains passes through without being decrypted, so this section only applies if you use those rules.

Vercel Sandbox adds this proxy CA to the sandbox's system trust store, so most applications need no changes. It also sets the following environment variables so common tools and runtimes use the system CA bundle at `/etc/ssl/certs/ca-certificates.crt`:

```text
AWS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
CARGO_HTTP_CAINFO=/etc/ssl/certs/ca-certificates.crt
CURL_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
GIT_SSL_CAINFO=/etc/ssl/certs/ca-certificates.crt
GRPC_DEFAULT_SSL_ROOTS_FILE_PATH=/etc/ssl/certs/ca-certificates.crt
NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt
NODE_USE_SYSTEM_CA=1
NPM_CONFIG_CAFILE=/etc/ssl/certs/ca-certificates.crt
PIP_CERT=/etc/ssl/certs/ca-certificates.crt
REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
```

If your application uses its own CA bundle instead of the system trust store or these variables, configure it to trust the proxy CA certificate. Vercel Sandbox mounts it at both of these paths:

- `/etc/pki/ca-trust/source/anchors/vercel-proxy-ca.pem`
- `/usr/local/share/ca-certificates/vercel-proxy-ca.crt`

#### Trust the proxy CA in containers

A container you run inside the sandbox has its own filesystem and trust store, so it doesn't inherit the proxy CA or the environment variables above. HTTPS requests from the container to a domain with one of these rules fail certificate verification, for example with `curl: (60) SSL certificate problem: self-signed certificate in certificate chain`.

To fix this, mount the certificate into the container and add it to the container's trust store. For example, with a Debian- or Ubuntu-based image:

```bash filename="terminal"
docker run --rm \
  -v /etc/pki/ca-trust/source/anchors/vercel-proxy-ca.pem:/usr/local/share/ca-certificates/vercel-proxy-ca.crt:ro \
  my-image \
  sh -c "update-ca-certificates && my-command"
```

Other base images keep their trust store elsewhere. Mount the certificate where the image expects it, then run its trust-update command, such as `update-ca-trust` on Amazon Linux, Fedora, or RHEL. For applications that read a CA bundle from an environment variable instead, such as Node.js with `NODE_EXTRA_CA_CERTS`, set that variable to the mounted certificate path inside the container.

## Data privacy

Sandboxes run on Vercel's infrastructure, which maintains SOC 2 Type II certification. Sandbox snapshots, including the automatic snapshots that [persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes) save when they stop, are encrypted at rest.

For specific data residency requirements, consult your plan details or compliance team.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
