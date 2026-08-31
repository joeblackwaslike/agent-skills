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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "84b92b01330f79da05dcd43c945db8596b2fcb2d625767dd6f6bfdd188a949e6"
---

# Reverse Proxy Servers and Vercel

**We do not recommend** placing a reverse proxy server in front of your Vercel project as it affects Vercel's firewall in the following ways:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Accessing Vercel-hosted sites from mainland China](https://vercel.com/kb/guide/accessing-vercel-hosted-sites-from-mainland-china?from=related&source_path=%2Fdocs%2Fsecurity%2Freverse-proxy&source_site=vercel-docs&relationship=related) — Understand why Vercel-hosted sites may be slow or inaccessible in mainland China, and explore steps to improve performan
- [Why is my domain not automatically generating an SSL/TLS certificate?](https://vercel.com/kb/guide/domain-not-generating-ssl-certificate?from=related&source_path=%2Fdocs%2Fsecurity%2Freverse-proxy&source_site=vercel-docs&relationship=related) — Information on why a domain may not be automatically generating an SSL/TLS certificate.
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related&source_path=%2Fdocs%2Fsecurity%2Freverse-proxy&source_site=vercel-docs&relationship=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Should I use Cloudflare in front of Vercel?](https://vercel.com/kb/guide/cloudflare-with-vercel?from=related&source_path=%2Fdocs%2Fsecurity%2Freverse-proxy&source_site=vercel-docs&relationship=related) — Information on using Cloudflare together with Vercel.
- [Can I use a proxy on top of my Vercel Deployment?](https://vercel.com/kb/guide/can-i-use-a-proxy-on-top-of-my-vercel-deployment?from=related&source_path=%2Fdocs%2Fsecurity%2Freverse-proxy&source_site=vercel-docs&relationship=related) — General information about using an external proxy to serve a Vercel Deployment.
- [Encryption and TLS](https://vercel.com/docs/cdn-security/encryption?from=related&source_path=%2Fdocs%2Fsecurity%2Freverse-proxy&source_site=vercel-docs&relationship=related) — Learn how Vercel encrypts data in transit and at rest.
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure?from=related&source_path=%2Fdocs%2Fsecurity%2Freverse-proxy&source_site=vercel-docs&relationship=related) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [How Vercel CDN works](https://vercel.com/docs/how-vercel-cdn-works?from=related&source_path=%2Fdocs%2Fsecurity%2Freverse-proxy&source_site=vercel-docs&relationship=related) — Learn how Vercel's CDN processes requests through routing, caching, and compute layers to deliver your content with low
- [CDN security](https://vercel.com/docs/cdn-security?from=related&source_path=%2Fdocs%2Fsecurity%2Freverse-proxy&source_site=vercel-docs&relationship=related) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers
- [Using the REST API with the Firewall](https://vercel.com/docs/vercel-firewall/firewall-api?from=related&source_path=%2Fdocs%2Fsecurity%2Freverse-proxy&source_site=vercel-docs&relationship=related) — Learn how to interact with the security endpoints of the Vercel REST API programmatically.

Full cross-link map for this page: [/docs/security/reverse-proxy.graph.md](/docs/security/reverse-proxy.graph.md?from=related&source_path=%2Fdocs%2Fsecurity%2Freverse-proxy&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

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
