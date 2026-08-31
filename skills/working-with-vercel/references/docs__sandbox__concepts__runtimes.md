---
title: Runtimes
product: vercel
url: /docs/sandbox/concepts/runtimes
canonical_url: "https://vercel.com/docs/sandbox/concepts/runtimes"
last_updated: 2026-08-19
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/images
  - /docs/sandbox/concepts/firewall
summary: Detailed specifications for the Vercel Sandbox environment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/runtimes.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "6c9f802ec5144d10e852b3d259106ac7d1a205b901e9a5eb278729d78e8c8973"
---

# Runtimes

Vercel Sandbox provides a secure, isolated environment for running your code. This page details the legacy runtime environments, available packages, and system configuration. New sandboxes default to [Vercel Managed Images](/docs/sandbox/concepts/images) instead of runtimes.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Running Docker on Vercel](https://vercel.com/kb/guide/docker?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fruntimes&source_site=vercel-docs&relationship=related) — Learn how to run Docker on Vercel by deploying OCI container images as Vercel Functions, storing them in Vercel Containe
- [Run Docker containers inside Vercel Sandbox](https://vercel.com/changelog/run-docker-containers-inside-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fruntimes&source_site=vercel-docs&relationship=related)
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fruntimes&source_site=vercel-docs&relationship=related) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \\(VCR
- [A sandbox without a network boundary is only half a sandbox](https://vercel.com/blog/a-sandbox-without-a-network-boundary-is-only-half-a-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fruntimes&source_site=vercel-docs&relationship=related)
- [Vercel Sandbox now runs on Vercel Managed Images](https://vercel.com/changelog/vercel-sandbox-managed-images?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fruntimes&source_site=vercel-docs&relationship=related)
- [Advanced egress firewall filtering for Vercel Sandbox](https://vercel.com/changelog/advanced-egress-firewall-filtering-for-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fruntimes&source_site=vercel-docs&relationship=related)
- [Vercel Sandboxes are now generally available](https://vercel.com/changelog/vercel-sandboxes-ga?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fruntimes&source_site=vercel-docs&relationship=related)
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fruntimes&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fruntimes&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/sandbox/concepts/runtimes.graph.md](/docs/sandbox/concepts/runtimes.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fruntimes&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Runtimes

> **💡 Note:** Since August 7th, runtimes are deprecated and we recommend using [Images](/docs/sandbox/concepts/images) for new sandboxes. Starting with version 3 of the Sandbox SDK, new sandboxes default to the Ubuntu-based `vercel/sandbox/universal:latest` Vercel Managed Image, and the `runtime` property is deprecated but keeps working for existing code. Images provide more flexibility by allowing any OCI image to be used as the base of sandboxes.

The legacy runtimes include `node26`, `node24`, `node22`, and `python3.13` images. In all of these images:

- User code is executed as the `vercel-sandbox` user.
- The default working directory is `/vercel/sandbox`.
- `sudo` access is available.

|              | Runtime                   | Package managers |
| ------------ | ------------------------- | ---------------- |
| `node26`     | `/vercel/runtimes/node26` | `npm`, `pnpm`    |
| `node24`     | `/vercel/runtimes/node24` | `npm`, `pnpm`    |
| `node22`     | `/vercel/runtimes/node22` | `npm`, `pnpm`    |
| `python3.13` | `/vercel/runtimes/python` | `pip`, `uv`      |

`node24` is the default runtime if the `runtime` property is not specified on version 2 of the Sandbox SDK. Starting with version 3, sandboxes that specify neither `runtime` nor `image` use the `vercel/sandbox/universal:latest` managed image instead.

### Available packages

The base system for legacy runtimes is Amazon Linux 2023 with the following additional packages:

- `bind-utils`
- `bzip2`
- `findutils`
- `git`
- `gzip`
- `iputils`
- `libicu`
- `libjpeg`
- `libpng`
- `ncurses-libs`
- `openssl`
- `openssl-libs`
- `procps`
- `tar`
- `unzip`
- `which`
- `whois`
- `zstd`

In legacy runtimes, you can install additional packages using `dnf`. Managed images use their own package managers instead, such as `apt-get` on the Ubuntu-based images. See [How to install system packages in Vercel Sandbox](/kb/guide/how-to-install-system-packages-in-vercel-sandbox) for examples.

You can find the [list of available packages](https://docs.aws.amazon.com/linux/al2023/release-notes/all-packages-AL2023.7.html) on the Amazon Linux documentation.

### Proxy CA certificates

Vercel Sandbox mounts a unique, per-sandbox certificate authority (CA) certificate for the sandbox proxy in these locations:

- `/etc/pki/ca-trust/source/anchors/vercel-proxy-ca.pem`
- `/usr/local/share/ca-certificates/vercel-proxy-ca.pem`

Vercel Sandbox adds the proxy CA certificate to the system trust bundle automatically. Applications that use the system trust store do not need extra configuration.

The following environment variables are also set so common tools and runtimes use the system CA bundle at `/etc/ssl/certs/ca-certificates.crt`:

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

If your application does not use the system trust store and these environment variables, configure it to trust one of the mounted `vercel-proxy-ca.pem` files. This is required for HTTPS traffic that the [sandbox firewall](/docs/sandbox/concepts/firewall) terminates for transformation rules.

**Containers do not inherit the proxy CA.** The proxy CA certificate and the CA environment variables are installed on the sandbox host. A container that you run inside the sandbox has its own isolated filesystem and trust store, so it does not inherit either of them. Without the certificate, HTTPS requests from inside the container fail TLS verification when the [sandbox firewall](/docs/sandbox/concepts/firewall) terminates them for transformation rules.

To make a container trust the proxy, mount the certificate into the container and add it to the container's own trust store. For example, with Docker:

```bash filename="terminal"
# Mount the host certificate into the container and trust it at build or run time.
docker run --rm \
  -v /etc/pki/ca-trust/source/anchors/vercel-proxy-ca.pem:/usr/local/share/ca-certificates/vercel-proxy-ca.crt:ro \
  my-image \
  sh -c "update-ca-certificates && my-command"
```

The exact path and command depend on the container's base image. Place the certificate where that image's trust store expects it, then run the image's trust-update command (for example, `update-ca-certificates` on Debian or Ubuntu, or `update-ca-trust` on Amazon Linux, Fedora, or RHEL). For applications that read a CA bundle from an environment variable instead of the system trust store, set the relevant variable (such as `NODE_EXTRA_CA_CERTS`) to the mounted certificate path inside the container.

### Sudo config

The sandbox sudo configuration is designed to be straightforward:

- `HOME` is set to `/root`. Commands executed with sudo will source root's configuration files (e.g. `.gitconfig`, `.bashrc`, etc).
- `PATH` is left unchanged. Local or project-specific binaries will still be available when running with elevated privileges.
- The executed command inherits all other environment variables that were set.

## System-privileged processes

Each sandbox runs in its own [Firecracker](https://firecracker-microvm.github.io/) microVM with a dedicated kernel, so you can run processes that require system-level privileges without affecting other sandboxes or the host. These workloads run with `sudo` and are isolated to your sandbox by the microVM boundary.

Supported workloads include:

- **Container runtimes**: Run Docker and other container engines inside the sandbox to build images or run containerized workloads.
- **VPN clients**: Connect to a VPN provider to reach private networks during a session.
- **FUSE filesystems**: Mount Filesystem in Userspace (FUSE) drivers to attach object storage, network filesystems, or other custom mounts.

These processes require elevated privileges, so run them with `sudo`. For example, to run a command with elevated privileges through the CLI:

```bash filename="terminal"
sandbox exec --sudo <name> -- <command>
```

Outbound network access from these workloads still follows the [sandbox firewall](/docs/sandbox/concepts/firewall) network policy. Restrict reachable destinations with a network policy when you run untrusted code.

If you run containers inside the sandbox, the proxy CA certificate is not available inside the container by default. Install it in the container's trust store so HTTPS traffic that the firewall terminates passes TLS verification. See [Proxy CA certificates](#proxy-ca-certificates).


---

[View full sitemap](/docs/sitemap)
