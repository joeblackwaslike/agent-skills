---
title: Billing FAQ for Enterprise Plan
product: vercel
url: /docs/plans/enterprise/billing
canonical_url: "https://vercel.com/docs/plans/enterprise/billing"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/plans/enterprise
  - /docs/plans
related:
  - /docs/accounts
  - /docs/rbac
  - /docs/rbac/access-roles
  - /docs/vercel-firewall/ddos-mitigation
  - /docs/vercel-firewall/attack-mode
summary: This page covers frequently asked questions around payments, invoices, and billing on the Enterprise plan.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/plans/enterprise/billing.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "9d16952ca6e24f2d0d297db88fbff807a7ac1c3ef3c17ca148b72a11f5a8422f"
---

# Billing FAQ for Enterprise Plan

The Vercel Enterprise plan is perfect for [teams](/docs/accounts#creating-a-team) with increased performance, collaboration, and security needs. This page covers frequently asked questions around payments, invoices, and billing on the **Enterprise** plan.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Billing FAQ](https://vercel.com/docs/plans/pro-plan/billing?from=related) — This page covers frequently asked questions around payments, invoices, and billing on the Pro plan.
- [Billing & Invoices](https://vercel.com/docs/pricing/understanding-my-invoice?from=related) — Learn how Vercel invoices are structured for Pro and Enterprise plans, including plan charges, credits, and usage-based
- [Billing and Refunds](https://vercel.com/docs/integrations/create-integration/billing?from=related) — Learn how billing works for native integrations, including invoice lifecycle, pricing models, and refunds.
- [Pricing](https://vercel.com/docs/pricing?from=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y

Full cross-link map for this page: [/docs/plans/enterprise/billing.graph.md](/docs/plans/enterprise/billing.graph.md)
<!-- /docsgraph:related -->

## Payments

### When are payments taken?

- Pay by credit card: When the invoice is finalized in Stripe
- Pay by ACH/Wire: Due by due date on the invoice

### What payment methods are available?

- Credit card
- ACH/Wire

### What currency can I pay in?

You can pay in any currency so long as the credit card provider allows charging in USD *after* conversion.

### Can I delay my payment?

Contact your Vercel account representative if you feel payment might be delayed.

### Can I pay annually?

Yes.

### What card types can I pay with?

- American Express
- China UnionPay (CUP)
- Discover & Diners
- Japan Credit Bureau (JCB)
- Mastercard
- Visa

#### If paying by ACH, do I need to cover the payment fee cost on top of the payment?

Yes, when paying with ACH, the payment fee is often deducted by the sender. You need to add this fee to the amount you send, otherwise the payment may be rejected.

### Can I change my payment method?

Yes. You are free to remove your current payment method, so long as you have ACH payments set up. Once you have ACH payments set up, notify your Vercel account representative. They can verify your account changes.

## Invoices

### Can I pay by invoice?

- Yes. After checking the invoice, you can make a payment. You will receive a receipt after your credit card gets charged
- If you are paying with ACH, you will receive an email containing the bank account details you can wire the payment to
- If you are paying with ACH, you should provide the invoice number as a reference on the payment

### Why am I overdue?

Payment was not received from you by the invoice due date. This could be due to an issue with your credit card, like reaching your payment limit or your card having expired.

### Can I change an existing invoice detail?

No. Unless you provide specific justification to your Vercel account representative. This addition will get added to future invoices, **not** to the current invoice.

## Billing

### Is there a Billing role available?

Yes. Learn more about [Roles and Permissions](/docs/rbac).

### How do I update my billing information?

- ### Go to the  page
  - Navigate to the [Dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard)
  - Select your team from the team switcher on the top left as explained [here](/docs/accounts#creating-a-team)
  - Open **Settings** in the sidebar

- ### Go to the **Billing** section to update the appropriate fields
  Select [**Billing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling\&title=Go+to+Billing) from the sidebar. Scroll down to find the following editable fields. You can update these if you are a [team owner](/docs/rbac/access-roles#owner-role) or have the [billing role](/docs/rbac/access-roles#billing-role):
  - **Invoice Email Recipient**: A custom destination email for your invoices. By default, they get sent to the first owner of the team
  - **Company Name**: The company name that shows up on your invoices. By default, it is set to your team name
  - **Billing Address**: A postal address added to every invoice. By default, it is blank
  - **Invoice Language**: The language of your invoices which is set to **English** by default
  - **Invoice Purchase Order**: A line that includes a purchase order on your invoices. By default, it is blank
  - **Tax ID**: A line for rendering a specific tax ID on your invoices. By default, it is blank
  > **💡 Note:** Your changes only affect future invoices, not existing ones.

### What do I do if I think my bill is wrong?

Please [open a support ticket](/help#issues) to log your request, which will allow our support team to look into the case for you.

When you contact support the following information will be needed:

- Invoice ID
- The account email
- The Team name
- If the query is related to the monthly plan, or usage billing

### Do I get billed for DDoS?

[Vercel automatically mitigates against L3, L4, and L7 DDoS attacks](/docs/vercel-firewall/ddos-mitigation) at the platform level for all plans. Vercel does not charge customers for traffic that gets blocked by the Firewall.

Usage will be incurred for requests that are successfully served prior to us automatically mitigating the event. Usage will also be incurred for requests that are not recognized as a DDoS event, which may include bot and crawler traffic.

For an additional layer of security, we recommend that you enable [Attack Mode](/docs/vercel-firewall/attack-mode) when you are under attack, which is available for free on all plans. While some malicious traffic is automatically challenged, enabling Attack Mode will challenge all traffic, including legitimate traffic to ensure that only real users can access your site.

You can monitor usage in the [Vercel Dashboard](/dashboard) under the **Usage** section in the sidebar, although you will [receive notifications](/docs/notifications#on-demand-usage-notifications) when nearing your usage limits.

### What is a billing cycle?

The billing cycle refers to the period of time between invoices. The start date depends on when you created the account. You will be billed every 1, 2, 3, 6, or 12 months depending on your contract.


---

[View full sitemap](/docs/sitemap)
