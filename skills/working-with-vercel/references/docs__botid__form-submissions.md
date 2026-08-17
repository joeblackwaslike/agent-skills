---
title: Form Submissions
product: vercel
url: /docs/botid/form-submissions
canonical_url: "https://vercel.com/docs/botid/form-submissions"
last_updated: 2026-02-26
type: how-to
prerequisites:
  - /docs/botid
related:
  []
summary: How to properly handle form submissions with BotID protection
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/botid/form-submissions.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ad2901318805f509813369c1e88c64434a0bc505a97cb2815d497a9337d9aadd"
---

# Form Submissions

BotID does **not** support traditional HTML forms that use the `action` and `method` attributes, such as:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Export your Webflow site and host it on Vercel](https://vercel.com/kb/guide/webflow-vercel-drop?from=related) — Learn how to export your Webflow site's code and host it on Vercel with Vercel Drop. Drag your .zip export into the brow
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk?from=related) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [Deploying React Forms Using Formspree with Vercel](https://vercel.com/kb/guide/deploying-react-forms-using-formspree-with-vercel?from=related) — Create and deploy a React form with the help of Formspree and Vercel.
- [Using SvelteKit Form Actions](https://vercel.com/kb/guide/using-sveltekit-form-actions?from=related) — This guide explains how to use form actions in SvelteKit to handle form submissions, process form data, and enhance form
- [Forms](https://nextjs.org/docs/pages/guides/forms?from=related) — Learn how to handle form submissions and data mutations with Next.js.
- [Form](https://nextjs.org/docs/pages/api-reference/components/form?from=related) — Learn how to use the `<Form>` component to handle form submissions and search params updates with client-side navigation
- [Deploying and testing BotID](https://vercel.com/kb/guide/deploying-and-testing-botid?from=related) — This guide gives an overview on Vercel BotID and how to deploy and test it in production
- [Form Component](https://nextjs.org/docs/app/api-reference/components/form?from=related) — Learn how to use the `<Form>` component to handle form submissions and search params updates with client-side navigation
- [Formspree](https://vercel.com/docs/integrations/cms/formspree?from=related) — Learn how to integrate Formspree with Vercel. Follow our tutorial to set up Formspree and manage form submissions on you

Full cross-link map for this page: [/docs/botid/form-submissions.graph.md](/docs/botid/form-submissions.graph.md)
<!-- /docsgraph:related -->

```html
<form id="contact-form" method="POST" action="/api/contact">
  <!-- form fields -->
  <button type="submit">Send</button>
</form>
```

Native form submissions don't work with BotID due to how they are handled by the browser.

To ensure the necessary headers are attached, handle the form submission in JavaScript and send the request using `fetch` or `XMLHttpRequest`, allowing BotID to properly verify the request.

## Enable form submissions to work with BotID

Here's how you can refactor your form to work with BotID:

```tsx
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  // handle response
}

return (
  <form onSubmit={handleSubmit}>
    {/* form fields */}
    <button type="submit">Send</button>
  </form>
);
```

### Form submissions with Next.js

If you're using Next.js, you can [use a server action](https://nextjs.org/docs/app/guides/forms#how-it-works) in your form and use the `checkBotId` function to verify the request:

```ts filename=app/actions/contact.ts
'use server';
import { checkBotId } from 'botid/server';

export async function submitContact(formData: FormData) {
  const verification = await checkBotId();
  if (verification.isBot) {
    throw new Error('Access denied');
  }
  // process formData
  return { success: true };
}
```

And in your form component:

```tsx filename=app/contact/page.tsx
'use client';
import { submitContact } from '../actions/contact';

export default function ContactForm() {
  async function handleAction(formData: FormData) {
    return submitContact(formData);
  }

  return (
    <form action={handleAction}>
      {/* form fields */}
      <button type="submit">Send</button>
    </form>
  );
}
```


---

[View full sitemap](/docs/sitemap)
