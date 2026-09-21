---
title: Transferring Domains to Another Team or Project
product: vercel
url: /docs/domains/working-with-domains/transfer-your-domain
canonical_url: "https://vercel.com/docs/domains/working-with-domains/transfer-your-domain"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/domains/working-with-domains
  - /docs/domains
related:
  - /docs/projects/transferring-projects
  - /docs/cli/alias
  - /docs/deployments/generated-urls
  - /docs/rest-api/projects/move-a-project-domain
  - /docs/domains/managing-dns-records
summary: Domains can be transferred to another team or project within Vercel, or to and from a third-party registrar. Learn how to transfer domains with this...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-domains/transfer-your-domain.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "39c7fbdf5745c40c13a8f62ac62927238d4f4a78e02528345dc5a1e1b870786c"
---

# Transferring Domains to Another Team or Project

## Transfer a domain to another Vercel user or Team

If you are moving a website and its domains to another team, [transfer the project](/docs/projects/transferring-projects) so its deployments and project configuration move together. Review [how project transfers handle apex domains, subdomains, and wildcard domains](/docs/projects/transferring-projects#transferring-domains) before starting.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I delete a Vercel team?](https://vercel.com/kb/guide/how-do-i-delete-a-vercel-team?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Ftransfer-your-domain&source_site=vercel-docs&relationship=related) — Information on deleting a Vercel team.
- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Ftransfer-your-domain&source_site=vercel-docs&relationship=related) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [How can I migrate a site to Vercel without downtime?](https://vercel.com/kb/guide/zero-downtime-migration?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Ftransfer-your-domain&source_site=vercel-docs&relationship=related) — Information about how to assign a Vercel deployment to a domain without downtime.
- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Ftransfer-your-domain&source_site=vercel-docs&relationship=related) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [Deploying & Redirecting Domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Ftransfer-your-domain&source_site=vercel-docs&relationship=related) — Learn how to deploy your domains and set up domain redirects with this guide.
- [Troubleshooting domains](https://vercel.com/docs/domains/troubleshooting?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Ftransfer-your-domain&source_site=vercel-docs&relationship=related) — Learn about common reasons for domain misconfigurations and how to troubleshoot your domain on Vercel.
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Ftransfer-your-domain&source_site=vercel-docs&relationship=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Multi-tenant Reference](https://vercel.com/docs/platforms/multi-tenant-platforms/reference?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Ftransfer-your-domain&source_site=vercel-docs&relationship=related) — Reference for the Vercel domain API, error codes, troubleshooting, and FAQ for multi-tenant platforms.
- [Claiming Domain Ownership](https://vercel.com/docs/domains/working-with-domains/claim-domain-ownership?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Ftransfer-your-domain&source_site=vercel-docs&relationship=related) — Learn how to claim ownership of a domain that is registered with another Vercel account by verifying DNS ownership.

Full cross-link map for this page: [/docs/domains/working-with-domains/transfer-your-domain.graph.md](/docs/domains/working-with-domains/transfer-your-domain.graph.md?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Ftransfer-your-domain&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

To move domain ownership without transferring a project, use the **Move** action below. The domain's DNS records are preserved, but moving ownership does not transfer its associated projects. This is also the option for a domain that is not currently assigned to a project.

- ### Select the Domains tab
  You can move domains to another team using the [**Domains** section in your team dashboard sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+team%27s+domains+page).

- ### Select the domain
  Once on the **Domains** tab, select the context menu next to the domain you wish to move, and click **Move**. You can also use checkbox next to each domain to select more than one domain

  ![Image](https://vercel.com/front/docs/domains/move-light.png)

- ### Select the team
  After selecting the domain(s) and clicking **Move**, you will be asked to confirm which profile or team you wish to move them to.

  ![Image](https://vercel.com/front/docs/domains/move-modal.png)

  When selecting the input field, you will be provided with a list of teams you belong to. If the profile or team you wish to move the domain(s) to is not present, enter the `slug` value instead. You can find the `slug` value in **Settings** page for both profiles and teams.
  > **💡 Note:** When moving domains to another team or user, all existing project domains
  > associated with them will remain and not be moved to prevent service
  > disruption. However, any [custom aliases](/docs/cli/alias) that are not part
  > of project domains will be removed immediately.

- ### Confirm the change
  To confirm the change, select **Move**. The domains will be transferred to the new profile of team immediately.

## Transferring domains between projects

To move a domain between projects in the same team, add it to the destination project and confirm the move. You do not need to remove it from the original project first. Deleting the domain before reassigning it can interrupt traffic.

1. Deploy and test the destination project using its [generated deployment URL](/docs/deployments/generated-urls). Make sure the environment you will assign the domain to serves the version you want visitors to receive.
2. In the destination project, open **Settings**, then **Domains**, and add the existing domain. Select the intended environment, Git branch, or redirect settings.
3. When **Move Domain** appears, review the source and destination projects and the full list of domains. The move can include other domains that redirect to the selected domain.
4. Confirm the move, then visit the custom domain and check its configuration in the destination project. Verify any redirects and branch assignments.

For automated workflows, use the [Move a project domain API](/docs/rest-api/projects/move-a-project-domain) instead of separate remove and add requests. The API accepts the destination project ID and optional Git branch and redirect settings.

To point a custom domain at a specific deployment with the CLI, use [`vercel alias`](/docs/cli/alias):

```bash filename="terminal"
vercel alias set your-deployment.vercel.app example.com
```

Replace `your-deployment.vercel.app` with the destination's unique deployment URL, and omit `https://` from the custom domain. This assigns the alias to that deployment. Also move the domain's project configuration using the steps above so future deployments use the intended project and environment.

## Preparing for a registrar transfer

Transferring a domain's registration and changing its DNS provider are separate operations. Before transferring a domain into or out of Vercel:

- Check transfer eligibility with the current registrar. [ICANN transfer restrictions](https://www.icann.org/resources/pages/name-holder-faqs-2017-10-10-en) can include a 60-day lock after registration, a previous transfer, or changes to registrant details. Registry-specific rules can also apply.
- Confirm that the receiving registrar supports the domain's top-level domain (TLD), and review its transfer requirements and charges.
- Export or copy the current DNS records, including website, email, and verification records. Confirm whether the current DNS provider will continue serving them after the registration transfers.
- If you also change nameservers, [migrate and verify the DNS records](/docs/domains/managing-dns-records#migrating-dns-records-from-an-external-registrar) before switching. Keep the previous DNS service active while the change propagates.

## Transferring domains out of Vercel

- ### Verifying Transfer Eligibility
  Review the [registrar transfer prerequisites](#preparing-for-a-registrar-transfer), then open the domain on your team's [Domains page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+team%27s+domains+page). Confirm that Vercel is the registrar and that the domain has no active transfer restriction. Domain age alone does not establish eligibility.

- ### Select the **Domains** tab
  For domains that are registered with Vercel, you can retrieve an authorization code for transferring out to another registrar from **Domains** in the Dashboard sidebar.

- ### Select the "Transfer out" option
  Once on the **Domains** tab, click on the triple-dot menu button for the relevant domain. A menu-item button to transfer the domain out will be presented if the domain is registered with Vercel.

  ![Image](https://vercel.com/front/docs/domains/transfer-light.png)
  > **💡 Note:** If under a Team scope, only [Team Owners](/docs/rbac/access-roles#owner-role)
  > will see the menu-item button.

- ### Use the authorization code with the new registrar
  After clicking the menu-item button, a modal will open up with the authorization code required to transfer the domain. Use this authorization code with your new registrar to confirm that you want to transfer the domain. There is no additional confirmation that you need to do on the Vercel side. Transferring a domain can take up to a week.

  If you encounter problems with the transfer code, ensure you've entered it correctly without typos or extra spaces. If the code seems correct but still doesn't work, please contact [Vercel support](/help) for further assistance.

  ![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/transfer-out-modal.png`)

## Transfer a domain to Vercel

Transferring your domain into Vercel moves its registration to Vercel. You can also use a domain registered elsewhere with a Vercel project by [adding the domain](/docs/domains/working-with-domains/add-a-domain) and configuring DNS, without transferring its registration.

> **💡 Note:** Domain transfers made within 45 days of an auto-renewal may not extend your domain's expiration by one year.
> For more details, see [ICANN's advisory on transfers within the auto-renew grace period](https://www.icann.org/en/announcements/details/registrar-advisory-concerning-registration-transfers-within-the-auto-renew-grace-period-6-6-2002-en).If your domain is currently registered with **Name.com**, the transfer is
> free and does not extend the registration period.

- ### Verifying Transfer Eligibility
  Review the [registrar transfer prerequisites](#preparing-for-a-registrar-transfer) and confirm eligibility with your current registrar.

  If Vercel reports that the TLD is not supported for transfer, keep the registration with your current registrar and [connect the domain to your Vercel project](/docs/domains/working-with-domains/add-a-domain) through DNS instead.

- ### Unlock the Domain
  Once you have verified your domain's eligibility to transfer, proceed with unlocking your domain in your registrar's domain settings. Most domains are usually locked by default to prevent unauthorized changes.

  The domain lock feature appears in different forms across registrars. Sign into the host where your domain is registered and look for a Domain Lock or similar option to unlock your domain. If this option is not available, contact your registrar to change this.

  The status `clientTransferProhibited` indicates a registrar transfer lock. Ask the registrar whether you can unlock the domain or must wait for a transfer restriction to end.

- ### Obtain Authorization Code
  After unlocking the domain, you will need to obtain an authorization code. The code will be sent to the email address associated with your domain by your registrar. In some cases, your authorization code pops up on your dashboard. This may be available in the domain registrars dashboard. If it is not available, contact your registrar to obtain this.

- ### Transferring to Vercel
  When transferring a domain, you will have two options to choose from. Either using the Vercel Dashboard or Vercel CLI.

  **Option 1: Using Vercel Dashboard**

  After obtaining the authorization code, click on the Transfer in button in the Vercel Domains Dashboard and enter in your domain and respective authorization code.

  **Option 2: Using Vercel CLI**

  With Vercel CLI, you can run the following command from your terminal.
  ```bash
  vercel domains transfer-in [your-domain]
  ```
  You will be requested to provide an authorization code from your registrar after running this command. Once you get the authorization code from your registrar, paste it into the prompt and the transfer will begin.
  > **💡 Note:** In a case where your domain cannot be transferred, check that it has been over
  > 60 days since the domain has been registered or previously transferred. If it
  > still does not work, contact your registrar.

- ### Configure domain
  Keep DNS and website migration separate from the registration transfer. Use the [registrar transfer preparation steps](#preparing-for-a-registrar-transfer) to preserve website and email records.

  **Pre-generate SSL certificates**

  If you are migrating a deployment to Vercel, require zero downtime, and aren't using Vercel's nameservers, you can pre-generate and issue SSL certificates to your domain.
  If you have enabled Vercel DNS by pointing your domain's nameserver to Vercel and have generated an SSL certificate, you can ignore this step.

  Follow the [detailed guide](/docs/domains/pre-generating-ssl-certs) to set up SSL certificates before finalizing the domain transfer.

  **Set DNS records in your registrar**

  For a website moving to Vercel, configure the A or CNAME records shown in your project's **Domains** settings at the authoritative DNS provider. Certificate-verification TXT records alone do not route website traffic. If you also switch to Vercel's nameservers, [copy and verify the full DNS configuration](/docs/domains/managing-dns-records#migrating-dns-records-from-an-external-registrar) first.

- ### Deploy the domain
  You can deploy your app with Vercel once the domain has been successfully added to your account.

  By setting a production domain from your projects' Domains dashboard, you will be able to use the following command with Vercel CLI:
  ```bash
  vercel --prod
  ```
  This command will deploy your project and make it accessible at the production domain that you have setup.


---

[View full sitemap](/docs/sitemap)
