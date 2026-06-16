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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "34a82d7318df9a09879eccec256e9bc376d46f4c989d04dee8b51a7fd3195187"
---

# PCI DSS iframe Integration

## Benefits of using an `iframe`

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
