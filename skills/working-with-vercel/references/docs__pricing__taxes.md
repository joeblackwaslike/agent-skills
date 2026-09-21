---
title: Taxes
product: vercel
url: /docs/pricing/taxes
canonical_url: "https://vercel.com/docs/pricing/taxes"
last_updated: 2026-08-31
type: reference
prerequisites:
  - /docs/pricing
related:
  []
summary: This page covers frequently asked questions around taxes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/pricing/taxes.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "4ff6ac7ad98e8f0db1a2197f47b302257bbb8182e87d96a7bd4999244573f01a"
---

# Taxes

### What currency are Vercel prices shown in, and do they include taxes?

All prices shown are in USD and exclude value-added tax (VAT), goods and services tax (GST), and other applicable taxes. Taxes are calculated based on your billing address and added to your invoice where required by law.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Pricing](https://vercel.com/pricing?from=related&source_path=%2Fdocs%2Fpricing%2Ftaxes&source_site=vercel-docs&relationship=related) — Choose a Vercel plan and compare features and usage pricing.
- [Advanced Invoice Settings](https://vercel.com/blog/advanced-invoice-settings?from=related&source_path=%2Fdocs%2Fpricing%2Ftaxes&source_site=vercel-docs&relationship=related)
- [Improved infrastructure pricing](https://vercel.com/blog/improved-infrastructure-pricing?from=related&source_path=%2Fdocs%2Fpricing%2Ftaxes&source_site=vercel-docs&relationship=related)
- [Services Pricing and Limits](https://vercel.com/docs/services/pricing?from=related&source_path=%2Fdocs%2Fpricing%2Ftaxes&source_site=vercel-docs&relationship=related) — Understand how billing works for Vercel Services, what's charged, and which limits apply.
- [Manage Billing and Refunds for Integrations](https://vercel.com/docs/integrations/create-integration/billing?from=related&source_path=%2Fdocs%2Fpricing%2Ftaxes&source_site=vercel-docs&relationship=related) — Learn how billing works for native integrations, including invoice lifecycle, pricing models, and refunds.
- [Billing FAQ for Enterprise Plan](https://vercel.com/docs/plans/enterprise/billing?from=related&source_path=%2Fdocs%2Fpricing%2Ftaxes&source_site=vercel-docs&relationship=related) — This page covers frequently asked questions around payments, invoices, and billing on the Enterprise plan.
- [Billing FAQ for Pro Plan](https://vercel.com/docs/plans/pro-plan/billing?from=related&source_path=%2Fdocs%2Fpricing%2Ftaxes&source_site=vercel-docs&relationship=related) — This page covers frequently asked questions around payments, invoices, and billing on the Pro plan.
- [Billing & Invoices](https://vercel.com/docs/pricing/understanding-my-invoice?from=related&source_path=%2Fdocs%2Fpricing%2Ftaxes&source_site=vercel-docs&relationship=related) — Learn how Vercel invoices are structured for Pro and Enterprise plans, including plan charges, credits, and usage-based

Full cross-link map for this page: [/docs/pricing/taxes.graph.md](/docs/pricing/taxes.graph.md?from=related&source_path=%2Fdocs%2Fpricing%2Ftaxes&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

### Do you charge sales tax, value-added tax (VAT) or equivalent on your services?

Yes. We are rolling out collection of VAT, GST, or equivalent for international customers starting on April 1, 2026 for all Vercel products and services where required by law. We already collect sales tax for US-based customers. The exact amount depends on your billing address and applicable tax regulations.

### Why are you starting to collect sales tax and VAT now?

Regulations require cloud service providers to collect sales tax and VAT in many jurisdictions. We're updating our billing practices to ensure full compliance.

### Will all customers be charged sales tax and VAT?

Not necessarily. Sales tax and VAT are only charged in jurisdictions where Vercel is registered to collect tax. If your billing address is in one of those jurisdictions, you will see sales tax or VAT added to your invoices. If not, you will not be charged tax.

### How will sales tax and VAT appear on my invoice?

Invoices will now show a separate line item for sales tax or VAT, clearly indicating the amount charged in addition to the products and services purchased.

### Do I need to take any action regarding sales tax and VAT?

For most customers, no action is required. Vercel automatically calculates and adds sales tax or VAT to your invoice based on your billing information.

If your US-based organization is tax-exempt, follow the [US tax-exemption process](#what-if-my-organization-is-tax-exempt). If your organization is VAT-registered, [add your VAT ID in billing settings](#what-if-my-organization-is-vat-registered).

### What if my organization is tax-exempt?

If you qualify for tax exemption in the US, please send your exemption certificate to <tax@vercel.com>. Once our team verifies your certificate, we'll mark your account as tax-exempt, and sales tax won't be applied to your invoices.

### What if my organization is VAT-registered?

Add your valid VAT ID in your [billing settings](/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling%23tax-id\&title=Go+to+Billing). Vercel applies the VAT treatment automatically based on your billing details. VAT IDs do not require manual verification by the tax team.

If your invoices still include VAT, check the following in your billing settings:

- Include the country prefix in your VAT ID, such as `PL` for Poland or `GB` for the United Kingdom.
- For organizations in the European Union (EU), select **EU VAT number** as the tax ID type. A domestic tax ID, such as **Polish NIP number**, is a different option.
- For organizations in the United Kingdom, select **United Kingdom VAT number** as the tax ID type.

Update your VAT ID in billing settings yourself. The tax team cannot update it on your behalf. You may have an obligation to self-report VAT under the reverse charge mechanism.

### Can I get a refund for an incorrect tax charge?

Yes. If you were charged tax on an invoice that should have been exempt, you can ask to have the invoice reissued without tax at [vercel.com/help](/help). Vercel refunds the original invoice and issues a corrected one.

Before you request a correction, complete the steps that apply to your organization:

- If your organization is VAT-registered, [check your VAT ID, country prefix, and tax ID type](#what-if-my-organization-is-vat-registered) in billing settings.
- If your US-based organization is tax-exempt, [send your exemption certificate to tax@vercel.com](#what-if-my-organization-is-tax-exempt) and wait for confirmation from our team.

After updating your VAT ID or receiving confirmation of your US sales-tax exemption, go to [vercel.com/help](/help) and ask to correct the tax on the affected invoice. If a reissued invoice still includes unexpected VAT after you have checked your VAT ID details, ask for support to investigate.

### When will international customers start being charged VAT?

We will start collecting VAT for invoices issued on and after April 1, 2026.

### Where can I find more information about Vercel's terms of service about tax?

You can refer to our [terms of service](/legal/terms#payments) on collecting sales tax and VAT.

### Who can I contact with tax-related questions?

For questions about tax collection or US sales-tax exemptions, contact <tax@vercel.com>. For VAT ID issues, [check your billing settings](#what-if-my-organization-is-vat-registered). You do not need to email your VAT registration information to the tax team for verification.


---

[View full sitemap](/docs/sitemap)
