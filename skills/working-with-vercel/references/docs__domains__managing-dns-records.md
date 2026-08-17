---
title: Managing DNS Records
product: vercel
url: /docs/domains/managing-dns-records
canonical_url: "https://vercel.com/docs/domains/managing-dns-records"
last_updated: 2026-02-27
type: how-to
prerequisites:
  - /docs/domains
related:
  - /docs/domains/managing-nameservers
summary: Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/managing-dns-records.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ee15289a332fda38227e43c25957253c13502a4f36bfe0af961c5a793b2c13fd"
---

# Managing DNS Records

Once you've added a domain and it's using Vercel's nameservers, you can view its DNS records from your team's [**Domains** page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+team%27s+domains+page). From there, you can view, [add](#adding-dns-records), [verify](#verifying-dns-records), [remove the records](#removing-dns-records), or add [presets](#dns-presets).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records?from=related) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [Why am I no longer receiving email after adding my domain to Vercel?](https://vercel.com/kb/guide/why-has-email-stopped-working?from=related) — Fix email that stopped working after adding your domain to Vercel, with a concrete MX record table and the DNS preset cl
- [How can I migrate a site to Vercel without downtime?](https://vercel.com/kb/guide/zero-downtime-migration?from=related) — Information about how to assign a Vercel deployment to a domain without downtime.
- [How can I do a "Zero Downtime" DNS migration to Vercel?](https://vercel.com/kb/guide/zero-downtime-migration-for-dns?from=related) — Information about how to migrate your DNS records to Vercel without downtime.
- [How to Export Your Domain's DNS Records from Vercel](https://vercel.com/kb/guide/export-domain-dns-records-via-api?from=related) — Learn how to utilize our API to export your domain's DNS records from Vercel.
- [Working with DNS](https://vercel.com/docs/domains/working-with-dns?from=related) — Learn how DNS works in order to properly configure your domain.
- [Set Up Custom Domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Troubleshooting Domains](https://vercel.com/docs/domains/troubleshooting?from=related) — Learn about common reasons for domain misconfigurations and how to troubleshoot your domain on Vercel.
- [Working with Nameservers](https://vercel.com/docs/domains/working-with-nameservers?from=related) — Learn about nameservers and the benefits Vercel nameservers provide.
- [Pre-Generate SSL Certificates](https://vercel.com/docs/domains/pre-generating-ssl-certs?from=related) — test

Full cross-link map for this page: [/docs/domains/managing-dns-records.graph.md](/docs/domains/managing-dns-records.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** To make sure DNS records are applied, and to allow you to manage them, your
> domain needs to use [Vercel's nameservers](/docs/domains/managing-nameservers)
> . If you are using a third-party domain, you will be provided with the Vercel
> nameservers to copy and use with your registrar.

## Adding DNS Records

- ### Selecting your Domain
  On your team's [dashboard](/dashboard), open **Domains** in the sidebar. From the Domains page, click on a domain of your choice to view its Advanced Settings page.

- ### Add DNS Record
  Once on the Advanced Settings page of your domain, select the **Enable Vercel DNS** button to fill out the DNS Record form. Once complete, click on the **Add** button.

  ![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/dns-records-form.png`)

  You can then create a new DNS record with the following data:
  - **Name:** The prefix or location of the record. For www.example.com, the name argument would be www.
  - **Type:** Types can be `A`, `AAAA`, `ALIAS`, `CAA`, `CNAME`, `HTTPS`, `MX`, `NS`, `SRV`, or `TXT`.
  - **Value:** The value of the record.
  - **TTL:** Default is 60 seconds. For advanced users, this value can be customized.
  - **Comment:** An optional comment to provide context on what this record is for.
  - **More:** Some records will require more data. MX records, for example, will request "priority".
  > **💡 Note:** Once a DNS record has been added, it can take up to 24 hours to the DNS
  > records to fully update and any local caches to be cleared.

## Verifying DNS Records

Once DNS records have been changed, you may wish to check that these have been set correctly. There are many third-party tools that do this, such as DNS Checker and DNS Map - these show the state of your DNS records in different regions of the world.

You can also use the `dig` command to check the DNS record for your domain:

```bash filename="terminal"
$ dig A api.example.com +short
```

*Verifying the A record set for a domain using the terminal.*

```bash filename="terminal"
$ dig MX example.com +short
```

*Verifying the MX record set for a domain using the terminal.*

## Removing DNS Records

To remove DNS records:

1. On your team's [dashboard](/dashboard), select the [**Domains** section in the sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+team%27s+domains+page). From the Domains page, click on a domain of your choice to view its Advanced Settings page.
2. Select the ellipsis (⋯) to access the context menu and select **Delete DNS Zone**. Follow the prompts to delete the record.

Default records can't be removed. However, new records can override them if required.

![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/delete-dns-record.png`)

## DNS Presets

Vercel does not provide an email service. To be able to receive emails or add specific DNS configurations through a domain that you've added to Vercel, you need to add the respective DNS Records, such as MX for email or TXT for other services.

Vercel streamlines this process for common third-party services by allowing you to add missing DNS Records using **DNS Presets** on your dashboard.

1. From your [dashboard](/dashboard), open [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains) in the sidebar.
2. Select the domain you wish to add a preset to and click the **Add DNS Preset** dropdown on the right:

![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/dns-presents-light.png`)

3. You will be presented with a list of commonly used third-party providers. If your provider is listed, select it, and the necessary DNS Records—such as MX for email or TXT for other services like [Bluesky](/kb/guide/use-my-domain-bluesky) will automatically be configured on your domain.

If your provider is not listed, please refer to their documentation to find out which DNS Records you need to add.

## Migrating DNS records from an external registrar

Once you have added a [domain to your Vercel project](https://vercel.com/docs/domains/working-with-domains/add-a-domain) and also verified the certificate is working as expected, you can choose three options of records to finally complete the migration: A, CNAME, or Nameservers. In case you decide to use an A or a CNAME record, then you can change those records in your DNS provider to make Vercel serve your deployment from the selected domain, as instructed on your dashboard.

If you decide to change the Nameservers of your domain, you can follow the below instructions which will help you migrate your DNS configuration from any provider and avoid downtime.

### Clone the Current DNS Configuration

To locate the current DNS provider of your domain, you can run the following command:

```bash filename="terminal"
$ dig NS example.com +short
```

*Checking the DNS authority for a domain using the terminal.*

The result will show the current DNS authority. Next, you'll need to locate your DNS records from the provider's dashboard.

After you've successfully located all records associated with your domain, you may now add them to Vercel. You can either do this manually or by importing a zone file.

**Importing a zone file**

If you have downloaded a zone file from your existing file, you may use the following comand to upload that to Vercel:

```bash
vercel dns import [your-domain] [zonefile]
```

If you do not apply a custom zone file, transferring in a domain automatically applies the default Vercel DNS settings.

### Verify the Records

To verify the records, you can now query the DNS configuration that will be served by Vercel:

```bash filename="terminal"
$ dig A api.example.com +short @ns1.vercel-dns.com
```

*Checking the DNS configuration of the A record under "api" served by Vercel.*

Then, check the DNS records from the existing provider to make sure they match. If you were moving your DNS from [Cloudflare](https://vercel.com/kb/guide/cloudflare-with-vercel), for example, the correct command would be:

```bash filename="terminal"
$ dig A api.example.com +short @example.ns.cloudflare.com
```

*Checking the DNS configuration of the A record under "api" served by
Cloudflare. The example should be replaced with the authoritative nameserver
given by your provider.*

Before proceeding, we recommend checking every record you moved. For more insight into the DNS resolution, remove the `+short` flag.

### Switch the Nameservers

In your registrar's dashboard (where you bought the domain), change the Nameservers to your new provider.
Nameserver changes can take up to 48 hours to propagate. If you bought the domain from Vercel, you can
[manage nameservers](https://vercel.com/docs/domains/managing-nameservers) from the [domains page](https://vercel.com/dashboard/domains).


---

[View full sitemap](/docs/sitemap)
