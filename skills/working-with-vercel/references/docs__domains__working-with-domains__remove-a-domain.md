---
title: Removing a Domain from a Project
product: vercel
url: /docs/domains/working-with-domains/remove-a-domain
canonical_url: "https://vercel.com/docs/domains/working-with-domains/remove-a-domain"
last_updated: 2026-02-27
type: how-to
prerequisites:
  - /docs/domains/working-with-domains
  - /docs/domains
related:
  - /docs/rest-api/reference/welcome
summary: Learn how to remove a domain from a Project and from your account completely with this guide.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-domains/remove-a-domain.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "62a8d644d73adff1ecb0cbef452c6142a7bda0607cd3967b13ad8727061021fe"
---

# Removing a Domain from a Project

When you add a domain to any project, it will be connected to your account until you choose to delete it. This guide demonstrates how to remove a domain from a Project and from your account completely.

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

To remove a domain from a project using cURL, you can use the following command. To create an Authorization Bearer token, see the [access token](/docs/rest-api/reference/welcome#creating-an-access-token) section of the API documentation.

```bash filename="cURL"
curl --request DELETE \
  --url https://api.vercel.com/v9/projects/<project-id-or-name>/domains/<domain-name> \
  --header "Authorization: Bearer $VERCEL_TOKEN"
```


---

[View full sitemap](/docs/sitemap)
