---
title: Removing a Domain from a Project or Account
product: vercel
url: /docs/domains/working-with-domains/remove-a-domain
canonical_url: "https://vercel.com/docs/domains/working-with-domains/remove-a-domain"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/domains/working-with-domains
  - /docs/domains
related:
  - /docs/cli/domains
  - /docs/rest-api
summary: Remove a domain from a Vercel project, or delete it from your account and all associated projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/domains/working-with-domains/remove-a-domain.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "0df3a2fc81bfc85285b5a60d89f5b47e0fc43335ecd38f2946033c0b476b4776"
---

# Removing a Domain from a Project or Account

To remove a domain from one Vercel project, delete it from the project's **Domains** settings. To remove the domain from your account and all associated projects, delete it from the **Domains** section of your dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Removing Domains is now much easier](https://vercel.com/changelog/removing-domains-is-now-much-easier)
- [Remove a domain from a project](https://vercel.com/docs/rest-api/projects/remove-a-domain-from-a-project) — DELETE /v9/projects/{idOrName}/domains/{domain} — Remove a domain from a project by passing the domain name and by speci
- [Remove a domain by name](https://vercel.com/docs/rest-api/domains/remove-a-domain-by-name) — DELETE /v6/domains/{domain} — Delete a previously registered domain name from Vercel. Deleting a domain will automatical
- [Viewing & Searching Domains](https://vercel.com/docs/domains/working-with-domains/view-and-search-domains) — Learn how to view and search all registered domains that are assigned to Vercel Projects through the Vercel dashboard.
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain) — Add and configure a custom domain for your Vercel project using the CLI.

Full cross-link map for this page: [/docs/domains/working-with-domains/remove-a-domain.graph.md](/docs/domains/working-with-domains/remove-a-domain.graph.md)
<!-- /docsgraph:related -->

- ### Navigate to the Domains tab
  To remove a domain that is assigned to a project, open [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdomains\&title=Go+to+Domains+Settings) in the sidebar from the **Project Overview** and click **Edit** for the domain you want to remove.

- ### Click remove button
  In the edit form, click **Remove**. Then confirm the removal in the **Remove Domain from Project** dialog.

- ### Remove domain from your account
  Remove the domain from your account from the dashboard or the Vercel CLI.
  #### Dashboard
  Optionally, if you wish to remove a domain from all Projects, as well as your Account, navigate to the **Domains** section of your dashboard. In the list of all the domains under your account, find the domain you wish to remove. Then, from the context menu, click the **Delete** menu item.

  ![Option to delete domain(s) from the Domains tab.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/custom-domains/remove-domains.png)
  #### CLI
  Run [`vercel domains remove`](/docs/cli/domains) to remove the domain from your account and all projects:
  ```bash filename="terminal"
  vercel domains remove example.com
  ```
  > **💡 Note:** If the domain was purchased through Vercel, you must first wait for the domain
  > to expire before you can remove it from your account.

## Using cURL

To remove a domain from a project using cURL, you can use the following command. To create an Authorization Bearer token, see the [access token](/docs/rest-api#creating-an-access-token) section of the API documentation.

```bash filename="cURL"
curl --request DELETE \
  --url https://api.vercel.com/v9/projects/<project-id-or-name>/domains/<domain-name> \
  --header "Authorization: Bearer $VERCEL_TOKEN"
```

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
