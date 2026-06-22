---
title: Billing & Invoices
product: vercel
url: /docs/pricing/understanding-my-invoice
canonical_url: "https://vercel.com/docs/pricing/understanding-my-invoice"
last_updated: 2026-04-27
type: reference
prerequisites:
  - /docs/pricing
related:
  - /docs/pricing
  - /docs/plans/pro-plan
  - /docs/plans/enterprise
  - /docs/pricing/manage-and-optimize-usage
summary: Learn how Vercel invoices are structured for Pro and Enterprise plans, including plan charges, credits, and usage-based resources.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/pricing/understanding-my-invoice.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "baea2d7f7de8cffa92d33d5608e89525999687bfb92b1aa6c08fc9e4b190153e"
---

# Billing & Invoices

You can view your current invoice from the **Settings** section in your dashboard sidebar(/dashboard) in two ways:

- By navigating to the **Billing** section in the sidebar of the dashboard
- Or selecting the latest entry in the list of invoices on the **Invoices** tab.

## Understanding your invoice

Your invoice is a breakdown of the charges you have incurred for the current billing cycle. It includes the total amount due, the billing period, and a detailed breakdown of both [metered](# "What is metered?") and on-demand charges depending on your plan.

> **💡 Note:** In addition to your regular billing cycle invoice, you may receive [partial
> invoices](#partial-invoices) before your cycle ends.

![Image](https://vercel.com/front/docs/pricing/full-invoice-light.png)

When you access your invoice through the **Invoice** tab:

- You can choose to download the invoice as a PDF through selecting the  icon on the invoice row
- You can select an invoice to view the detailed breakdown of the charges. Each invoice includes an invoice number, the date issued, and the due date

### Pro plan invoices

Pro plan users receive invoices based on plan charges, usage credits, and on-demand usage. Under [Managed Infrastructure](/docs/pricing#managed-infrastructure-billable-resources):

- Some resources include a specific usage allowance. Charges incur on-demand when you exceed the allowance.
- Your Pro monthly usage credit can cover other resources that are usage-based from the first unit before on-demand charges apply.
- Vercel meters and bills [Managed Infrastructure](/docs/pricing#managed-infrastructure-billable-resources) charges monthly.
- Vercel bills [Developer Experience Platform](/docs/pricing#dx-platform-billable-resources) features at fixed prices when purchased. These charges can include monthly or one-time charges.

When viewing an invoice, Pro plan users see a section called **[On-demand Charges](#pro-plan-on-demand-charges)**. This section has two categories: [Managed Infrastructure](/docs/pricing#managed-infrastructure) and [Developer Experience Platform](/docs/pricing#developer-experience-platform).

#### Pro plan on-demand charges

For Pro plan users, on-demand charges incur in two ways: when usage under [Managed Infrastructure](/docs/pricing#managed-infrastructure-billable-resources) exceeds any applicable allowance or credit, or when you purchase a product from [Developer Experience Platform](/docs/pricing#dx-platform-billable-resources) during the period of the invoice.

![Image](https://vercel.com/front/docs/pricing/pro-plan-invoice-light.jpg)

### Enterprise plan invoices

Enterprise invoices follow a flexible usage model based on a periodic commitment to [Managed Infrastructure Units (MIU)](#managed-infrastructure-units-miu).

The top of the invoice shows a summary of the commitment period, the total MIUs committed, and the current usage towards that commitment. If the commitment has been exceeded, the on-demand charges will be listed under the [**On-demand Charges**](#enterprise-on-demand-charges) section.

#### Managed Infrastructure Units (MIU)

MIUs are a measure of the infrastructure consumption of an Enterprise project. These consist of a variety of resources like [Fast Data Transfer, Edge Requests, and more](/docs/pricing#managed-infrastructure-billable-resources).

#### Enterprise on-demand charges

When Enterprise customers exceed their commitment for a period, they will see individual line items for the on-demand amount under the **On-demand Charges** section. This is the same as for Pro plan users.

![Image](https://vercel.com/front/docs/pricing/ent-on-demand-light.jpg)

## Partial invoices

A partial invoice charges you for some of your on-demand usage before your regular billing cycle ends. It covers only the usage that triggered the charge. Any remaining usage stays on your end-of-cycle invoice, so you are never billed twice for the same usage.

Partial invoices help keep accrued balances manageable and reduce the risk of an unexpectedly large invoice at the end of the cycle.

### Who this applies to

Partial invoices apply to [Pro plan](/docs/plans/pro-plan) accounts. Hobby and [Enterprise](/docs/plans/enterprise) accounts are not affected.

Most Pro customers will not see a partial invoice. They are issued only when accrued on-demand usage is significantly higher than typical activity on your account.

### When you might receive a partial invoice

You may receive a partial invoice if either of the following happens before the end of your billing cycle:

- Your accrued on-demand usage crosses an internal billing threshold.
- Your account shows unusually high or suspicious usage, for example a sudden spike in [Fast Data Transfer](/docs/pricing#managed-infrastructure-billable-resources) or [Function](/docs/pricing#managed-infrastructure-billable-resources) activity that does not match your normal pattern.

Vercel does not publish the specific threshold value. The threshold is designed so that customers with typical workloads will not see a partial invoice.

### What's on a partial invoice

A partial invoice contains:

- Only the on-demand usage that crossed the threshold or triggered the charge. It does not include seat fees, add-ons, or usage that has not yet crossed the threshold.
- A clear `Partial` label in your invoice list, so it is easy to tell apart from your regular cycle-end invoice.
- The same line-item breakdown you would see on a regular invoice.

Your regular end-of-cycle invoice will still arrive on the normal date and will cover the rest of the cycle's charges.

### How payment works

Partial invoices are automatically charged to the payment method on file, the same way regular invoices are. You do not need to take any action for a successful charge.

If a charge fails, Vercel will retry the payment and notify the billing contact on the account. Update your payment method from **Settings > Billing** to avoid interruption.

### If a partial invoice goes unpaid

If you accumulate multiple unpaid partial invoices, new deployments and some billable features on the account are paused until the outstanding balance is paid. This protects your account from accumulating a balance that would be difficult to settle.

To restore the account, pay the outstanding partial invoices from **Settings > Invoices**.

### Viewing your partial invoices

1. Go to **Settings** in the dashboard sidebar.
2. Select **Invoices**.
3. Partial invoices are labeled `Partial` and show the date issued and the period covered.

You can download any partial invoice as a PDF from the row's `…` menu, the same as a regular invoice.

### Questions about a partial invoice

If you believe a partial invoice was issued in error, or you have questions about a specific charge, [contact support](/help) with the invoice number and the affected team.

## More resources

For more information on Vercel's pricing, and guidance on optimizing consumption, see the following resources:

- [Vercel Pricing](/docs/pricing)
- [Manage and optimize usage](/docs/pricing/manage-and-optimize-usage)


---

[View full sitemap](/docs/sitemap)
