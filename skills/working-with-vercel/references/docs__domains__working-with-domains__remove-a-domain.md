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
  - /docs/rest-api
summary: Remove a domain from a Vercel project, or delete it from your account and all associated projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-domains/remove-a-domain.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "a1e80dbac65b262d0d139c2cf9fe8666e5a77336549f887c06e903e9c2c5e627"
---

# Removing a Domain from a Project or Account

To remove a domain from one Vercel project, delete it from the project's **Domains** settings. To remove the domain from your account and all associated projects, delete it from the **Domains** section of your dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Remove a domain from a project](https://vercel.com/docs/rest-api/projects/remove-a-domain-from-a-project?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fremove-a-domain&source_site=vercel-docs&relationship=related) — DELETE /v9/projects/{idOrName}/domains/{domain} — Remove a domain from a project by passing the domain name and by speci
- [Remove a domain by name](https://vercel.com/docs/rest-api/domains/remove-a-domain-by-name?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fremove-a-domain&source_site=vercel-docs&relationship=related) — DELETE /v6/domains/{domain} — Delete a previously registered domain name from Vercel. Deleting a domain will automatical
- [Delete a Project](https://vercel.com/docs/rest-api/projects/delete-a-project?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fremove-a-domain&source_site=vercel-docs&relationship=related) — DELETE /v9/projects/{idOrName} — Delete a specific project by passing either the project \\`id\\` or \\`name\\` in the URL.
- [Add a domain to a project](https://vercel.com/docs/rest-api/projects/add-a-domain-to-a-project?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fremove-a-domain&source_site=vercel-docs&relationship=related) — POST /v10/projects/{idOrName}/domains — Add a domain to the project by passing its domain name and by specifying the pro
- [Deploying & Redirecting Domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fremove-a-domain&source_site=vercel-docs&relationship=related) — Learn how to deploy your domains and set up domain redirects with this guide.

Full cross-link map for this page: [/docs/domains/working-with-domains/remove-a-domain.graph.md](/docs/domains/working-with-domains/remove-a-domain.graph.md?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fremove-a-domain&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- ### Navigate to the Domains tab
  To remove a domain that is assigned to a project, open [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdomains\&title=Go+to+Domains+Settings) in the sidebar from the **Project Overview** and click the **More Options** button for the domain you want to remove.

- ### Click remove button
  Once the **• • •** menu button has been clicked, you will be presented with further options. Click the **Delete** menu button to remove the domain from the project.

- ### Remove domain from your account
  Optionally, if you wish to remove a domain from all Projects, as well as your Account, navigate to the **Domains** section of your dashboard. In the list of all the domains under your account, find the domain you wish to remove. Then, from the context menu, click the **Delete** menu item.

  ![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/remove-domains.png`)
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
