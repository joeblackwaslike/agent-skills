---
title: System Specifications
product: vercel
url: /docs/sandbox/system-specifications
canonical_url: "https://vercel.com/docs/sandbox/system-specifications"
last_updated: 2026-06-01
type: conceptual
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/firewall
summary: Detailed specifications for the Vercel Sandbox environment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/system-specifications.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "f52c904b3e25a95bd10362c48606fd04de5d81f1d50fb219471fe1b0b0ce8f2a"
---

# System Specifications

Vercel Sandbox provides a secure, isolated environment for running your code. This page details the runtime environments, available packages, and system configuration.

## Runtimes

Sandbox includes `node26`, `node24`, `node22`, and `python3.13` images. In all of these images:

- User code is executed as the `vercel-sandbox` user.
- The default working directory is `/vercel/sandbox`.
- `sudo` access is available.

|              | Runtime                   | Package managers |
| ------------ | ------------------------- | ---------------- |
| `node26`     | `/vercel/runtimes/node26` | `npm`, `pnpm`    |
| `node24`     | `/vercel/runtimes/node24` | `npm`, `pnpm`    |
| `node22`     | `/vercel/runtimes/node22` | `npm`, `pnpm`    |
| `python3.13` | `/vercel/runtimes/python` | `pip`, `uv`      |

`node24` is the default runtime if the `runtime` property is not specified.

### Available packages

The base system is Amazon Linux 2023 with the following additional packages:

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

You can install additional packages using `dnf`. See [How to install system packages in Vercel Sandbox](/kb/guide/how-to-install-system-packages-in-vercel-sandbox) for examples.

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
