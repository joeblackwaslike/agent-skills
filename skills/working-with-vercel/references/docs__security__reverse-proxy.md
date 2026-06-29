---
title: Reverse Proxy Servers and Vercel
product: vercel
url: /docs/security/reverse-proxy
canonical_url: "https://vercel.com/docs/security/reverse-proxy"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  - /docs/security
related:
  - /docs/vercel-firewall
summary: "Learn why reverse proxy servers are not recommended with Vercel's firewall."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/security/reverse-proxy.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "3ad64bbe68b0010c0e68ec2403c7b52f6d9eafe0cb51e9c86539fde945aef2a8"
---

# Reverse Proxy Servers and Vercel

**We do not recommend** placing a reverse proxy server in front of your Vercel project as it affects Vercel's firewall in the following ways:

- Vercel's CDN **loses visibility** into the traffic, which reduces the effectiveness of the firewall in identifying suspicious activity.
- Real end-user IP addresses cannot be accurately identified.
- If the reverse proxy undergoes a malicious attack, this traffic can be forwarded to the Vercel project and cause usage spikes.
- If the reverse proxy is compromised, Vercel's firewall cannot automatically purge the cache.

## Using a reverse proxy server

However, you may still need to use a reverse proxy server. For example, your organization has legacy web applications protected by a reverse proxy and mandates that your Vercel project also uses this reverse proxy.

In such a case, you want to ensure that Vercel's [platform-wide firewall](/docs/vercel-firewall#platform-wide-firewall) does not block this proxy server due to the reasons mentioned above.

### Prerequisites

- **TLS setup:** Disable HTTP→HTTPS redirection for `http://<DOMAIN>/.well-known/acme-challenge/*` on port 80
- **Cache control:** Never cache `https://<DOMAIN>/.well-known/vercel/*` paths
- **Plan eligibility:**
  - Hobby/Pro: Verified Proxy Lite only
  - Enterprise: Lite + Advanced (self-hosted/geolocation preservation)

### Automatic vs. Manual enablement

Verified Proxy is automatically enabled for the providers listed below on all plans. Any other provider or a self-hosted proxy (for example, Nginx, HAProxy, etc) requires a manual onboarding process (Enterprise only).

### Supported providers (Verified Proxy Lite)

| Provider                    | Required Header             | Configuration                                                                                                                                                                                                                                |
| --------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fastly                      | `Fastly-Client-IP`          | A built-in header. No additional configuration required.                                                                                                                                                                                     |
| Google Cloud Load Balancing | `X-GCP-Connecting-IP`       | Add a custom header: `X-GCP-Connecting-IP: {client_ip_address}` using their [built-in variables](https://cloud.google.com/load-balancing/docs/https/custom-headers#variables).                                                               |
| Cloudflare                  | `CF-Connecting-IP`          | A built-in header. No additional configuration required.                                                                                                                                                                                     |
| AWS CloudFront              | `CloudFront-Viewer-Address` | Enable the header via the [Origin Request Policy](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/adding-cloudfront-headers.html#cloudfront-headers-viewer-location).                                                     |
| Imperva CDN (Cloud WAF)     | `Incap-Client-IP`           | A built-in header. No additional configuration required.                                                                                                                                                                                     |
| Akamai                      | `True-Client-IP`            | Enable the header via the property manager. Clients may be able to spoof the header; work with Akamai to harden the configuration. You must also enable the [Origin IP ACL](https://techdocs.akamai.com/origin-ip-acl/docs/welcome) feature. |
| Azure Front Door            | `X-Azure-ClientIP`          | A built-in header. No additional configuration required.                                                                                                                                                                                     |
| F5                          | `X-F5-True-Client-IP`       | Add a custom header: `X-F5-True-Client-IP: {client_ip_address}`                                                                                                                                                                              |

### Self-hosted reverse proxies (Verified Proxy Advanced)

> **🔒 Permissions Required**: Verified Proxy Advanced

Ensure that the following requirements are met if you are running self-hosted reverse proxies:

- Your proxy must have static egress IP addresses assigned. We cannot support dynamic IP addresses.
- Your proxy must send a custom request header that carries the real client IP (e.g. `x-${team-slug}-connecting-ip`).
- Your proxy must enable SNI (Server Name Indication) on outbound TLS connections.
- Use consistent and predictable Vercel project domains for onboarding. For example, use \*.vercel.example.com and ensure your Proxy always sends traffic to those specific hostnames.

For detailed setup instructions, please contact your Vercel account representative.

## More resources

- [Can I use Vercel as a reverse proxy?](/kb/guide/vercel-reverse-proxy-rewrites-external)


---

[View full sitemap](/docs/sitemap)
