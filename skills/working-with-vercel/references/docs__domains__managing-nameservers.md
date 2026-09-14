---
title: Managing Nameservers
product: vercel
url: /docs/domains/managing-nameservers
canonical_url: "https://vercel.com/docs/domains/managing-nameservers"
last_updated: 2026-08-28
type: how-to
prerequisites:
  - /docs/domains
related:
  - /docs/domains/working-with-nameservers
summary: Learn how to add custom nameservers and restore original nameservers for your domains on Vercel with this guide.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/managing-nameservers.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "8bfaf8b7f40f0e3785c28d91feff3124faecbb908fdaf12421d2467a201c890c"
---

# Managing Nameservers

[Nameservers](/docs/domains/working-with-nameservers) are used to resolve domain names to IP addresses. For domains with Vercel as the registrar, nameservers can be viewed, edited, and reset by selecting the domain from the [**Domains** section in your team dashboard sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+team%27s+domains+page).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Easily manage custom nameservers for domains](https://vercel.com/changelog/easily-manage-custom-nameservers-for-domains?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-nameservers&source_site=vercel-docs&relationship=related)
- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-nameservers&source_site=vercel-docs&relationship=related) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [How can I migrate a site to Vercel without downtime?](https://vercel.com/kb/guide/zero-downtime-migration?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-nameservers&source_site=vercel-docs&relationship=related) — Information about how to assign a Vercel deployment to a domain without downtime.
- [How can I do a "Zero Downtime" DNS migration to Vercel?](https://vercel.com/kb/guide/zero-downtime-migration-for-dns?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-nameservers&source_site=vercel-docs&relationship=related) — Information about how to migrate your DNS records to Vercel without downtime.
- [Managing DNS Records](https://vercel.com/docs/domains/managing-dns-records?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-nameservers&source_site=vercel-docs&relationship=related) — Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.
- [Update nameservers for a domain](https://vercel.com/docs/rest-api/domains-registrar/update-nameservers-for-a-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-nameservers&source_site=vercel-docs&relationship=related) — PATCH /v1/registrar/domains/{domain}/nameservers — Update the nameservers for a domain. Pass an empty array to use Verce
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-nameservers&source_site=vercel-docs&relationship=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Working with DNS](https://vercel.com/docs/domains/working-with-dns?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-nameservers&source_site=vercel-docs&relationship=related) — Learn how DNS works in order to properly configure your domain.
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-nameservers&source_site=vercel-docs&relationship=related) — Add and configure a custom domain for your Vercel project using the CLI.

Full cross-link map for this page: [/docs/domains/managing-nameservers.graph.md](/docs/domains/managing-nameservers.graph.md?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-nameservers&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Sometimes, however, you may need to delegate nameserver management to another host. For domains registered with Vercel, you can [add custom nameservers](#add-custom-nameservers) to your Vercel-hosted domain, directly from the dashboard, allowing for delegation to other DNS providers. You can add up to four nameservers at once, and [revert to your previous settings](#restore-original-nameservers) if necessary.

For domains that are not registered with Vercel, you can change the nameservers directly from the domain registrar's dashboard.

Nameserver changes can take up to 48 hours to complete due to [DNS propagation](https://ns1.com/resources/dns-propagation).

## Add custom nameservers

1. Ensure your account or team is selected in the team switcher
2. Open [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains) in the sidebar and select the domain
3. On your domain's settings page, under **Nameservers**, click the **Edit** button:

![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/nameservers.png`)

4. In the **Edit Nameservers** modal, add the new nameservers:

![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/edit-nameservers.png`)

## Add Vercel's nameservers

> **💡 Note:** Before using Vercel's nameservers, you should ensure that you own the domain.

1. Ensure your account or team is selected in the team switcher
2. Open [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains) in the sidebar and select the domain
3. On your domain's settings page, under **DNS Records**, click the **Enable Vercel DNS** button to opt in
4. You then must configure the following nameservers from the domain registrar's dashboard

- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

## Restore original nameservers

1. Ensure your account or team is selected in the team switcher
2. Open [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains) in the sidebar and select the domain
3. Under **Nameservers**, select the **Restore Original Nameservers** button
4. On the **Restore Original Nameservers** modal confirm the nameservers that will be present after the change

Vercel will present a message when you have successfully submitted the nameserver change.

![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/restore-original-nameservers.png`)


---

[View full sitemap](/docs/sitemap)
