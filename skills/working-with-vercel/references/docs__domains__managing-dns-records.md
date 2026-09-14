---
title: Managing DNS Records
product: vercel
url: /docs/domains/managing-dns-records
canonical_url: "https://vercel.com/docs/domains/managing-dns-records"
last_updated: 2026-08-28
type: how-to
prerequisites:
  - /docs/domains
related:
  - /docs/domains/managing-nameservers
summary: Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/managing-dns-records.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "06d8ecfea614b940c08f3d8b5c9732dfc812c4418f31448d197d3ef964dee4bb"
---

# Managing DNS Records

Once you've added a domain and it's using Vercel's nameservers, you can view its DNS records from your team's [**Domains** page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+team%27s+domains+page). From there, you can view, [add](#adding-dns-records), [verify](#verifying-dns-records), [remove the records](#removing-dns-records), or add [presets](#dns-presets).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-dns-records&source_site=vercel-docs&relationship=related) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [How to send emails from an application on Vercel](https://vercel.com/kb/guide/sending-emails-from-an-application-on-vercel?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-dns-records&source_site=vercel-docs&relationship=related) — Send email from Vercel Functions over an HTTP API instead of SMTP. Match the right Next.js pattern to your trigger and f
- [How to set up email with your Vercel domain](https://vercel.com/kb/guide/set-up-email-with-your-vercel-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-dns-records&source_site=vercel-docs&relationship=related) — Set up email on your Vercel domain by adding your provider's MX and TXT records in Vercel DNS, and send transactional em
- [How can I migrate a site to Vercel without downtime?](https://vercel.com/kb/guide/zero-downtime-migration?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-dns-records&source_site=vercel-docs&relationship=related) — Information about how to assign a Vercel deployment to a domain without downtime.
- [DNS Records UI](https://vercel.com/blog/dns-records-ui?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-dns-records&source_site=vercel-docs&relationship=related)
- [How can I do a "Zero Downtime" DNS migration to Vercel?](https://vercel.com/kb/guide/zero-downtime-migration-for-dns?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-dns-records&source_site=vercel-docs&relationship=related) — Information about how to migrate your DNS records to Vercel without downtime.
- [Working with DNS](https://vercel.com/docs/domains/working-with-dns?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-dns-records&source_site=vercel-docs&relationship=related) — Learn how DNS works in order to properly configure your domain.
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-dns-records&source_site=vercel-docs&relationship=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Troubleshooting domains](https://vercel.com/docs/domains/troubleshooting?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-dns-records&source_site=vercel-docs&relationship=related) — Learn about common reasons for domain misconfigurations and how to troubleshoot your domain on Vercel.
- [Working with domains](https://vercel.com/docs/domains/working-with-domains?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-dns-records&source_site=vercel-docs&relationship=related) — Learn how domains work and the options Vercel provides for managing them.
- [Working with nameservers](https://vercel.com/docs/domains/working-with-nameservers?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-dns-records&source_site=vercel-docs&relationship=related) — Learn about nameservers and the benefits Vercel nameservers provide.

Full cross-link map for this page: [/docs/domains/managing-dns-records.graph.md](/docs/domains/managing-dns-records.graph.md?from=related&source_path=%2Fdocs%2Fdomains%2Fmanaging-dns-records&source_site=vercel-docs&relationship=graph)
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

## Pointing a subdomain to an external service

If your domain uses Vercel's nameservers, you can point a subdomain to a service hosted elsewhere by adding the DNS records that service provides. You do not need to add the subdomain to a Vercel project.

For example, to host `support.example.com` with another provider, open `example.com` on your team's **Domains** page and [add a DNS record](#adding-dns-records):

| Type | Name | Value |
| --- | --- | --- |
| A | `support` | The IPv4 address supplied by the provider. |
| CNAME | `support` | The target hostname supplied by the provider. |

Use the record type requested by the provider. Do not add both an A and a CNAME record for the same hostname. In Vercel's **Name** field, enter only `support`, not `support.example.com`. Add any additional verification records the provider requires, then [verify the published records](#verifying-dns-records).

If your domain uses another provider's nameservers, make these changes at that DNS provider instead.

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

## Setting up email for your domain

Vercel does not host mailboxes or provide a domain email service, including for domains purchased through or transferred to Vercel. To send and receive email at an address such as `you@example.com`, use an email provider and add its required DNS records.

If the domain uses Vercel's nameservers, add the records in Vercel. Otherwise, add them at your current DNS provider. Adding a domain to a Vercel project does not, by itself, move its DNS records or change its email configuration.

### Use a DNS preset

Open the domain from your team's **Domains** page and select your email provider from **Add DNS Preset**. Follow the [preset instructions](#dns-presets), then complete any domain verification or mailbox activation required by your provider.

If your provider is not listed, add its records manually.

### Add email records manually

Use the exact record values from your email provider's setup instructions. For example, Google Workspace maintains its [MX record and Gmail activation instructions](https://knowledge.workspace.google.com/admin/domains/set-up-mx-records-for-google-workspace).

1. Open the domain's DNS settings and select **MX** as the record type.
2. Leave **Name** blank for the root domain. For email on a subdomain, enter only that subdomain's prefix.
3. Enter the **Value** and **Priority** supplied by your email provider, then select **Add**. Repeat for each required MX record. Lower priority numbers take precedence.
4. Add the provider's domain verification records, such as a TXT record. Use the exact name and value the provider specifies.
5. Complete the provider's verification and activation steps. Add any email authentication records the provider requires, such as SPF, DKIM, and DMARC.

MX records control where incoming email is delivered. Adding MX records does not create a mailbox or configure outgoing email; complete those tasks with your email provider.

### Troubleshooting email delivery

If email stops arriving after a nameserver change, check that the new DNS provider has your email provider's MX and verification records. Records at the previous DNS provider no longer control delivery after the nameserver change takes effect.

1. Run `dig NS example.com +short` to check which nameservers are authoritative. Edit records at that provider.
2. Run `dig MX example.com +short` and compare the returned hostnames and priorities with your email provider's instructions.
3. Restore missing records and correct typos. Remove obsolete MX records from a previous email service, while keeping all records your current provider requires.
4. Confirm that the domain is verified and the mailbox is active with your provider. Allow for [DNS propagation](#adding-dns-records) and any additional activation time specified by the provider.

If the published records match and delivery still fails, contact your email provider with the domain name and any delivery error. Before a future nameserver change, [copy and verify the existing records](#migrating-dns-records-from-an-external-registrar), including email records.

## Migrating DNS records from an external registrar

Once you have added a [domain to your Vercel project](https://vercel.com/docs/domains/working-with-domains/add-a-domain) and also verified the certificate is working as expected, you can choose three options of records to finally complete the migration: A, CNAME, or Nameservers. In case you decide to use an A or a CNAME record, then you can change those records in your DNS provider to make Vercel serve your deployment from the selected domain, as instructed on your dashboard.

If you decide to change the nameservers of your domain, copy and verify the existing DNS records before switching. Include MX records for email, TXT verification and authentication records, and any subdomains hosted by external services. Keep the previous DNS service active while the nameserver change propagates.

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
