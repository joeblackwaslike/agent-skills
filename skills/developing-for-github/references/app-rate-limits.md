---
source: "https://raw.githubusercontent.com/github/docs/main/content/apps/creating-github-apps/registering-a-github-app/rate-limits-for-github-apps.md"
fetched_at: "2026-07-20T06:45:20.604Z"
sha256: "3abbbb776138691212640d4fe208f4de090e9eb5cbad516e9da8550dc278ea8c"
---

{% ifversion ghes %}

API rate limits are disabled by default for {% data variables.product.prodname_ghe_server %}. Contact your site administrator to confirm the rate limits for your instance.

If you are a site administrator, you can set rate limits for your instance. For more information, see [AUTOTITLE](/admin/configuring-settings/configuring-user-applications-for-your-enterprise/configuring-rate-limits).

If you are developing an app for users or organizations outside of your instance, the standard {% data variables.product.github %} rate limits apply. For more information, see [AUTOTITLE](/free-pro-team@latest/rest/using-the-rest-api/rate-limits-for-the-rest-api) and [AUTOTITLE](/free-pro-team@latest/graphql/overview/rate-limits-and-query-limits-for-the-graphql-api) in the {% data variables.product.prodname_free_user %} documentation.

{% else %}

{% data variables.product.company_short %} sets a limit on the number of requests a {% data variables.product.prodname_github_app %} can make to the REST API within a specific time period. It also sets a limit on the point value of queries that a {% data variables.product.prodname_github_app %} can make to the GraphQL API within a specific time period. In addition to these primary rate limits, {% data variables.product.company_short %} may also apply secondary rate limits. These limits help to prevent abuse and denial-of-service attacks, and ensure that the system remains available for all users.

The rate limit for {% data variables.product.prodname_github_app %}s depends on whether the app authenticates with a user access token or an installation access token. It also depends on where the app is owned by or installed on a {% data variables.product.prodname_ghe_cloud %} organization.

For more information, see [AUTOTITLE](/rest/using-the-rest-api/rate-limits-for-the-rest-api) and [AUTOTITLE](/graphql/overview/rate-limits-and-query-limits-for-the-graphql-api).

{% endif %}
