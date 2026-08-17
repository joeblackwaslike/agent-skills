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
source: "https://vercel.com/docs/security/pci-dss.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "64b674981355322429e4432382d9269349dd11c4b9152b96b48ad82c4583585b"
---

# PCI DSS iframe Integration

## Benefits of using an `iframe`


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Does Vercel support PCI compliance?](https://vercel.com/kb/guide/is-vercel-pci-compliant?from=related) — Learn about Vercel and PCI compliance.
- [How to conduct PCI scans on Vercel: A complete guide to IP safelisting](https://vercel.com/kb/guide/how-to-conduct-pci-scans-on-vercel-guide?from=related) — Scan and verify your Vercel deployments for secure, PCI-compliant payment processing.
- [Ensuring safe and effective infrastructure testing](https://vercel.com/kb/guide/ensuring-safe-and-effective-infrastructure-testing?from=related) — We conduct regular penetration testing through certified third-party assessors to secure the Vercel platform. This guide
- [Commerce and Payments](https://vercel.com/docs/integrations/ecommerce?from=related) — Learn how to integrate Vercel with payment processors and ecommerce platforms, including Stripe, Shopify, BigCommerce, a
- [Stripe](https://vercel.com/docs/integrations/ecommerce/stripe?from=related) — Connect your Stripe account to Vercel and accept payments in your applications.
- [Security](https://vercel.com/docs/cdn-security?from=related) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers
- [Security Headers](https://vercel.com/docs/cdn-security/security-headers?from=related) — Learn how the Content Security Policy \(CSP\) offers defense against web vulnerabilities, its key features, and best pra
- [Overview](https://vercel.com/docs/integrations?from=related) — Learn how to extend Vercel's capabilities by integrating with your preferred providers for AI, databases, headless conte

Full cross-link map for this page: [/docs/security/pci-dss.graph.md](/docs/security/pci-dss.graph.md)
<!-- /docsgraph:related -->

When you use an [\`iframe\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe "<span>What is an `iframe`?</span>") to process payments, you create a secure conduit between your end users and your payment provider.

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


---

[View full sitemap](/docs/sitemap)
