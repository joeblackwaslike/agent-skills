---
title: Managing Nameservers
product: vercel
url: /docs/domains/managing-nameservers
canonical_url: "https://vercel.com/docs/domains/managing-nameservers"
last_updated: 2026-02-27
type: how-to
prerequisites:
  - /docs/domains
related:
  - /docs/domains/working-with-nameservers
summary: Learn how to add custom nameservers and restore original nameservers for your domains on Vercel with this guide.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/managing-nameservers.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "c6266be64e23d3f2e3ff9c4c26d5dab06d4d88a88a2fca6a7ce1eb4d9ded0ee0"
---

# Managing Nameservers

[Nameservers](/docs/domains/working-with-nameservers) are used to resolve domain names to IP addresses. For domains with Vercel as the registrar, nameservers can be viewed, edited, and reset by selecting the domain from the [**Domains** section in your team dashboard sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+team%27s+domains+page).

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
