---
title: PCI DSS iframe Integration
product: vercel
url: /docs/security/pci-dss
canonical_url: "https://vercel.com/docs/security/pci-dss"
last_updated: 2026-03-17
type: how-to
prerequisites:
  - /docs/security
related:
  - /docs/security/shared-responsibility
summary: Learn how to integrate an iframe into your application to support PCI DSS compliance.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/security/pci-dss.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "b3f774bc126e39f61042bb5bb28f81768f4429afe710186ea42d80d44fa8630c"
---

# PCI DSS iframe Integration

## Benefits of using an `iframe`

When you use an [\`iframe\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe "<span>What is an `iframe`?</span>") to process payments, you create a secure conduit between your end users and your payment provider.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [PCI compliance for ecommerce](https://vercel.com/blog/pci-compliance-for-ecommerce-teams)
- [How to conduct PCI scans on Vercel: A complete guide to IP safelisting](https://vercel.com/kb/guide/how-to-conduct-pci-scans-on-vercel-guide) — Scan and verify your Vercel deployments for secure, PCI-compliant payment processing.
- [Upgraded PCI DSS version 3.2.1 to 4.0](https://vercel.com/changelog/upgraded-pci-dss-version-3-2-1-to-4-0)
- [Vercel Commerce and Payments Integrations](https://vercel.com/docs/integrations/ecommerce) — Learn how to integrate Vercel with payment processors and ecommerce platforms, including Stripe, Shopify, BigCommerce, a
- [Security & Compliance Measures](https://vercel.com/docs/security/compliance) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [CDN security](https://vercel.com/docs/cdn-security) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers
- [Stripe Integration](https://vercel.com/docs/integrations/ecommerce/stripe) — Connect your Stripe account to Vercel and accept payments in your applications.
- [Vercel Integrations](https://vercel.com/docs/integrations) — Learn how to extend Vercel's capabilities by integrating with your preferred providers for AI, databases, headless conte

Full cross-link map for this page: [/docs/security/pci-dss.graph.md](/docs/security/pci-dss.graph.md)
<!-- /docsgraph:related -->

In accordance with Vercel's [shared responsibility model](/docs/security/shared-responsibility), this approach facilitates:

- **Data isolation**: The payment card information entered in the `iframe` is isolated from Vercel’s environment and **does not** pass through Vercel's managed infrastructure
- **Direct data transmission**: Information entered in the `iframe` is sent directly to your payment processor so that Vercel never processes, stores, or has access to your end users’ payment card data
- **Reduced PCI DSS scope**: With isolation and direct data transmission, the scope of PCI DSS compliance is reduced. This simplifies compliance efforts and enhances security

## Integrate an `iframe` for payment processing

1. Select a [payment provider](https://www.pcisecuritystandards.org/glossary/payment-processor/) that offers the following:
   - End-to-end encryption
   - Data tokenization
   - Built-in fraud detection
   - 3DS authentication protocol
   - Compliance with latest PCI DSS requirements

2. Embed the provider’s `iframe` in your application’s payment page

   This is an example code for a payment processor's `iframe`:

   ```tsx filename="paymentProcessor.tsx" framework=all
   const PaymentProcessorIframe = (): JSX.Element => {
     const paymentProcessorIframeURL = `https://${PAYMENT_PROCESSOR_BASE_URL}.com/secure-payment-form`;

     return (
       <div className="container mx-auto my-10 rounded bg-white p-5 shadow-md">
         <iframe
           src={paymentProcessorIframeURL}
           frameBorder="0"
           width="100%"
           height="500px"
           sandbox="allow-forms allow-top-navigation allow-same-origin"
           className="h-auto w-full"
         />
       </div>
     );
   };

   export default PaymentProcessorIframe;
   ```

   ```jsx filename="paymentProcessor.jsx" framework=all
   const PaymentProcessorIframe = () => {
     const paymentProcessorIframeURL = `https://${PAYMENT_PROCESSOR_BASE_URL}.com/secure-payment-form`;

     return (
       <div className="container mx-auto my-10 rounded bg-white p-5 shadow-md">
         <iframe
           src={paymentProcessorIframeURL}
           frameBorder="0"
           width="100%"
           height="500px"
           sandbox="allow-forms allow-top-navigation allow-same-origin"
           className="h-auto w-full"
         />
       </div>
     );
   };

   export default PaymentProcessorIframe;
   ```

   The `sandbox` attribute and its values are often required by the payment processor:

   - `allow-forms`: Enables form submissions in the `iframe`, essential for payment data entry
   - `allow-top-navigation`: Allows the `iframe` to change the full page URL. This is useful for post-transaction redirections
   - `allow-same-origin`: Permits the `iframe` to interact with resources from the hosting page's origin. This is important for functionality but slightly reduces isolation

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
