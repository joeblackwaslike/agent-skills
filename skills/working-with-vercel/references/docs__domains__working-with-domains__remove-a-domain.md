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
source: "https://vercel.com/docs/domains/working-with-domains/remove-a-domain.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "89fced6df70d5483823483cd01db7186ee69f99284c422aca2ef7f4083fcda9e"
---

# Removing a Domain from a Project or Account

To remove a domain from one Vercel project, delete it from the project's **Domains** settings. To remove the domain from your account and all associated projects, delete it from the **Domains** section of your dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Remove a domain from a project](https://vercel.com/docs/rest-api/projects/remove-a-domain-from-a-project) — DELETE /v9/projects/{idOrName}/domains/{domain} — Remove a domain from a project by passing the domain name and by speci
- [How do I delete my Vercel account?](https://vercel.com/kb/guide/how-do-i-delete-my-vercel-account) — This guide covers how to delete your personal or team account on Vercel.
- [Remove a domain by name](https://vercel.com/docs/rest-api/domains/remove-a-domain-by-name) — DELETE /v6/domains/{domain} — Delete a previously registered domain name from Vercel. Deleting a domain will automatical
- [vercel remove](https://vercel.com/docs/cli/remove) — Learn how to remove a deployment using the vercel remove CLI command.
- [Delete a Project](https://vercel.com/docs/rest-api/projects/delete-a-project) — DELETE /v9/projects/{idOrName} — Delete a specific project by passing either the project \\`id\\` or \\`name\\` in the URL.
- [Add a domain to a project](https://vercel.com/docs/rest-api/projects/add-a-domain-to-a-project) — POST /v10/projects/{idOrName}/domains — Add a domain to the project by passing its domain name and by specifying the pro

Full cross-link map for this page: [/docs/domains/working-with-domains/remove-a-domain.graph.md](/docs/domains/working-with-domains/remove-a-domain.graph.md)
<!-- /docsgraph:related -->

- ### Navigate to the Domains tab
  To remove a domain that is assigned to a project, open [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdomains\&title=Go+to+Domains+Settings) in the sidebar from the **Project Overview** and click the **More Options** button for the domain you want to remove.

- ### Click remove button
  Once the **• • •** menu button has been clicked, you will be presented with further options. Click the **Delete** menu button to remove the domain from the project.

- ### Remove domain from your account
  Remove the domain from your account from the dashboard or the Vercel CLI.
  #### Dashboard
  Optionally, if you wish to remove a domain from all Projects, as well as your Account, navigate to the **Domains** section of your dashboard. In the list of all the domains under your account, find the domain you wish to remove. Then, from the context menu, click the **Delete** menu item.

  ![Option to delete domain(s) from the Domains tab.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/custom-domains/remove-domains.png)
  #### CLI
  Run [`vercel domains rm`](/docs/cli/domains) to remove the domain from your account and all projects:
  ```bash filename="terminal"
  vercel domains rm example.com
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


---

[View full sitemap](/docs/sitemap)
