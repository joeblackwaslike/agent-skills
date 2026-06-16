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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "33748f3586ee997ab1701e06610d32c6ca5f4620cb6747c3e96b17dca39c9674"
---

# Form Submissions

BotID does **not** support traditional HTML forms that use the `action` and `method` attributes, such as:

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
