---
title: Domains Overview
product: vercel
url: /docs/domains
canonical_url: "https://vercel.com/docs/domains"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/domains/add-a-domain
  - /docs/domains/working-with-dns
  - /docs/domains/working-with-nameservers
  - /docs/domains/working-with-ssl
  - /docs/domains/working-with-domains
summary: Learn the fundamentals of how domains, DNS, and nameservers work on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "fcfb0638e2da090c7db77975b9e957b170ab84a0325811a550b9e79d8d054eab"
---

# Domains Overview

A **domain** is a user-friendly way of referring to the address access a website on the internet. For example, the domain you're reading this on is `vercel.com`. Domains can be analogous to the address where your house is. When someone sends a letter to your house, they don't need to know exactly *where* it is, they just need the address and the relevant post office handles routing the letter.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Debug routing on Vercel](https://vercel.com/kb/guide/debug-routing-on-vercel?from=related) — Learn how to debug how Vercel decides where to route your request
- [Migrate self-hosted Next.js and containers from AWS to Vercel](https://vercel.com/kb/guide/migrate-containers-from-aws-to-vercel?from=related) — Migrate containers from AWS to Vercel: deploy with Dockerfile.vercel, keep RDS, S3, and SQS in AWS over OIDC, and cut ov
- [Why am I no longer receiving email after adding my domain to Vercel?](https://vercel.com/kb/guide/why-has-email-stopped-working?from=related) — Fix email that stopped working after adding your domain to Vercel, with a concrete MX record table and the DNS preset cl
- [Configuring Domains](https://vercel.com/docs/platforms/multi-tenant-platforms/configuring-domains?from=related) — Add, verify, redirect, and remove wildcard and custom domains for a multi-tenant application using the Vercel SDK.
- [vercel domains](https://vercel.com/docs/cli/domains?from=related) — Learn how to buy, sell, transfer, and manage your domains using the vercel domains CLI command.
- [List all the domains](https://vercel.com/docs/rest-api/domains/list-all-the-domains?from=related)
- [Reference](https://vercel.com/docs/platforms/multi-tenant-platforms/reference?from=related) — Reference for the Vercel domain API, error codes, troubleshooting, and FAQ for multi-tenant platforms.
- [Get a Domain's configuration](https://vercel.com/docs/rest-api/domains/get-a-domain-s-configuration?from=related)

Full cross-link map for this page: [/docs/domains.graph.md](/docs/domains.graph.md)
<!-- /docsgraph:related -->

The system that manages the details about where a site is located on the internet, is known as **DNS or the Domain Name System**. At its most basic, DNS maps human-readable domain names to computer-friendly IP addresses. When you request a site in your browser, the first step is converting the domain address to an IP address. That process is handled by DNS and called **DNS Resolution**. Understanding how DNS works is important to ensure that you are configuring your domain correctly.

*Diagram showing a basic DNS query.*

1. You enter `vercel.com` in your browser. Your browser will first check its local DNS cache to see if it knows the IP address of `vercel.com`. If it does, it will request the site from that address.

2. Your browser initiates a DNS query through a server known as a **recursive resolver**, usually provided by your [ISP](# "ISP or Internet service provider") or a third-party. The recursive resolver acts as a middleman between the browser and DNS server and is used to increase the speed and efficiency of the resolution process. The resolver will check its cache first to see if it already has the IP address. If it doesn't, it'll request the IP address from a DNS server.

3. There is a network of DNS servers, in a hierarchy, located all around the world. The recursive resolver will query in the following pattern:
   - At the entrance to the network are 13 **root nameservers**. These are the servers that will be contacted first. The root server will look at the domain name, and based on the **TLD or top-level domain** (.com, .co.uk, etc.), will direct the resolver to the correct **TLD server**.
   - The TLD nameservers store information about domain names that belong to the same TLD. For example, when searching for `vercel.com`, once the recursive resolver receives a response from the root nameserver, it will query the `.com` TLD nameserver.
   - This TLD server will then respond resolver with details about the **authoritative nameserver** that has the IP address mapping for `vercel.com` stored in an A record. The authoritative nameserver returns this record to the recursive resolver, which will cache the result and return it to your browser.

4. Once your browser has the IP address, an HTTP request is made by the browser to the web server located at that IP address.

> **💡 Note:** This list is just a general overview and doesn't happen every time. Most of us
> tend to visit the same sites over and over. Therefore, the request will first
> check the cache from your browser and then from the recursive resolver,
> allowing for quicker load times. In addition, this example describes a basic
> unicast DNS network. In reality, when using Vercel, you're using anycast
> servers on the Vercel CDN.

This overview shows a point of view of a user visiting your site. Here's what this looks like from the developer's perspective.

When you've created a project and deployed it on Vercel, your site is served from Vercel's anycast network. It's reachable at whatever IP address the domain's DNS records point to. In this example we'll use `76.76.21.21`. The value you should actually use is the one on [your project's **Domains** settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdomains\&title=Project+Domains) in your dashboard. None of this is visible from your user's perspective, because the browser only knows the domain, so it performs a DNS Lookup to map `yoursiteaddress.com` to the IP.

*Diagram showing the Vercel-hosted query.*

This is where, as a developer, you may have to configure the DNS settings to tell the authoritative server exactly where your site lives. Vercel [guides you through](/docs/domains/add-a-domain) exactly what information you need to set, within [your dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdomains\&title=Project+Domains). There are a number of different settings that you should be aware of:

- **DNS records**: DNS records are an entry in a database that maps the domain with the IP address, which is then stored on the authoritative server. Some of the most common record types are: CNAME (Canonical name), A (Address), NS (nameserver), and MX (mail exchange). These are all described in more detail in [Working with DNS](/docs/domains/working-with-dns).
- **Nameserver**: Nameservers are an important part of the DNS. They refer to the *actual* server that maintains and manages the DNS records. There are three types of nameservers: root nameserver, TLD nameserver, and the authoritative server. You can learn more about using a nameserver with Vercel in [Working with nameservers](/docs/domains/working-with-nameservers).
- **SSL Certificates**: SSL Certificates are a way to show that there is a secure connection from your domain to your website. These are described in more detail in [Working with SSL certificates](/docs/domains/working-with-ssl).

## More resources

- [Working with domains](/docs/domains/working-with-domains)
- [Working with DNS](/docs/domains/working-with-dns)
- [Working with nameservers](/docs/domains/working-with-nameservers)
- [Working with SSL](/docs/domains/working-with-ssl)
- [Manage domains programmatically with the registrar API](/docs/domains/registrar-api)
- [Troubleshooting domains](/docs/domains/troubleshooting)


---

[View full sitemap](/docs/sitemap)
