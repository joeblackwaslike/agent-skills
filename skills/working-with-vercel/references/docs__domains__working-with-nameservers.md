---
title: Working with nameservers
product: vercel
url: /docs/domains/working-with-nameservers
canonical_url: "https://vercel.com/docs/domains/working-with-nameservers"
last_updated: 2026-07-15
type: conceptual
prerequisites:
  - /docs/domains
related:
  - /docs/domains/managing-nameservers
  - /docs/domains/working-with-domains
  - /docs/domains/troubleshooting
summary: Learn about nameservers and the benefits Vercel nameservers provide.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-nameservers.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "e76b6f479caac6e98e2ad06ed033f22733062d66a45521cebdb6a19847d5bff0"
---

# Working with nameservers

> **💡 Note:** Before moving your domain to use Vercel's nameservers, you should ensure that
> you own the domain listed on the [Domains](/domains) page of your account."


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records?from=related) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [How do I change my Nameservers on Vercel?](https://vercel.com/kb/guide/how-do-i-change-my-nameservers-on-vercel?from=related) — Learn about how to change Nameservers for domains registered with Vercel.
- [Does using Vercel's Nameserver's lock you in?](https://vercel.com/kb/guide/does-using-vercel-s-nameserver-s-lock-you-in?from=related) — Learn about how using Vercel's Nameservers doesn't lock you to anything.
- [Why is my Vercel domain not verified?](https://vercel.com/kb/guide/why-is-my-vercel-domain-unverified?from=related) — Information on why a Vercel domain may not be verified and how to verify it.
- [Working with DNS](https://vercel.com/docs/domains/working-with-dns?from=related) — Learn how DNS works in order to properly configure your domain.
- [Managing DNS Records](https://vercel.com/docs/domains/managing-dns-records?from=related) — Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.
- [Update nameservers for a domain](https://vercel.com/docs/rest-api/domains-registrar/update-nameservers-for-a-domain?from=related)
- [Set Up Custom Domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Working with SSL](https://vercel.com/docs/domains/working-with-ssl?from=related) — Learn how Vercel uses SSL certification to keep your site secure.

Full cross-link map for this page: [/docs/domains/working-with-nameservers.graph.md](/docs/domains/working-with-nameservers.graph.md)
<!-- /docsgraph:related -->

Nameservers are the actual servers on the network that are responsible for resolving domain names to the IP addresses where your site is hosted. Most domain registrars, including Vercel, [provide their own nameservers](/docs/domains/managing-nameservers). For Vercel these are:

- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

When you purchase your domain through Vercel, we can set all the DNS records, including nameserver records, that tell anyone looking for your site where it can be found.

### Benefits of using Vercel nameservers

- **Automatic DNS Records**: Domains with nameservers pointed to Vercel don't need explicit DNS records created for the apex domain or first-level subdomains since they will be created automatically. This means that you can add a domain or subdomain to a project without thinking about DNS records at all. Not only does this reduce the potential for mistakes, but if you have multiple subdomains that you would like to use for your project, it takes away the need for manual entry of CNAME records for each of them.
- **Wildcard Domains**: When using Vercel's nameservers you can add [wildcard domains](/docs/domains/working-with-domains#subdomains-wildcard-domains-and-apex-domains) without any further configuration.
- **Custom nameservers**: For domains registered with Vercel, you can add custom nameservers to your Vercel-hosted domain directly from the dashboard, allowing for delegation to other DNS providers. Add up to four nameservers at once, and revert to your previous settings if necessary.

For domains that are not registered with Vercel, you can change the nameservers directly from the domain registrar's dashboard. For more information, see [Add Vercel's nameservers](/docs/domains/managing-nameservers#add-vercel's-nameservers).

> **💡 Note:** Before using Vercel's nameservers, you should ensure that you own the domain.

## Troubleshooting

To learn more about common nameserver issues, see the [troubleshooting](/docs/domains/troubleshooting#common-nameserver-issues) doc.

## Related


---

[View full sitemap](/docs/sitemap)
