---
title: Building Integrations with Vercel REST API
product: vercel
url: /docs/integrations/create-integration/vercel-api-integrations
canonical_url: "https://vercel.com/docs/integrations/create-integration/vercel-api-integrations"
last_updated: 2026-09-16
type: reference
prerequisites:
  - /docs/integrations/create-integration
  - /docs/integrations
related:
  - /docs/rest-api/projects/create-one-or-more-environment-variables
  - /docs/drains/reference/logs
  - /docs/rest-api
  - /docs/integrations/create-integration/submit-integration
  - /docs/integrations/create-integration/short-lived-access-tokens
summary: Learn how to use Vercel REST API to build your integrations and work with redirect URLs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/integrations/create-integration/vercel-api-integrations.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "bc701551f5d5a65d9ab77bbf00b6b7cb50554ad81796988ffa34b11dc8977c16"
---

# Building Integrations with Vercel REST API

## Using the Vercel REST API

See the following API reference documentation for how to use Vercel REST API to create integrations:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Permissions and Access](https://vercel.com/docs/integrations/install-an-integration/manage-integrations-reference) — Learn how to manage project access and added products for your integrations.
- [Get configurations for the authenticated user or team](https://vercel.com/docs/rest-api/integrations/get-configurations-for-the-authenticated-user-or-team) — GET /v1/integrations/configurations — Allows to retrieve all configurations for an authenticated integration. When the \\
- [Access tokens](https://vercel.com/docs/accounts/access-tokens) — Create and scope Vercel access tokens to your full account, a team, or a single project, then use them to authenticate A
- [Upgrade an Integration](https://vercel.com/docs/integrations/create-integration/upgrade-integration) — Lean more about when you may need to upgrade your Integration.
- [Connect integration resource to project](https://vercel.com/docs/rest-api/integrations/connect-integration-resource-to-project) — POST /v1/integrations/installations/{integrationConfigurationId}/resources/{resourceId}/connections — Connects an integr

Full cross-link map for this page: [/docs/integrations/create-integration/vercel-api-integrations.graph.md](/docs/integrations/create-integration/vercel-api-integrations.graph.md)
<!-- /docsgraph:related -->

- [Creating a Project Environment Variable](/docs/rest-api/projects/create-one-or-more-environment-variables)
- [Forwarding Logs using Log Drains](/docs/drains/reference/logs)
- [Create an Access Token](/docs/integrations/create-integration/vercel-api-integrations#create-an-access-token)
- [Interacting with Teams](/docs/integrations/create-integration/vercel-api-integrations#interacting-with-teams)
- [Interacting with Configurations](/docs/integrations/create-integration/vercel-api-integrations#interacting-with-configurations)
- [Interacting with Vercel Projects](/docs/integrations/create-integration/vercel-api-integrations#interacting-with-vercel-projects)

### Create an Access Token

To use Vercel REST API, you need to authenticate with an [access token](/docs/rest-api#authentication) that contains the necessary [scope](#scopes). You can then provide the API token through the [`Authorization` header](/docs/rest-api#authentication).

#### Exchange `code` for Access Token

When you create an integration, you define a [redirect URL](/docs/integrations/create-integration/submit-integration#redirect-url) that can have query parameters attached.

Exchange the `code` parameter **once**, within **30 minutes**, for an access token. If your integration issues only short-lived access tokens, this exchange returns a token that expires within one hour. Otherwise, it returns a long-lived token. Use the following endpoint:

```bash filename="terminal"
POST https://api.vercel.com/v2/oauth/access_token
```

Pass the following values to the request body in the form of `application/x-www-form-urlencoded`.

| Key               | [Type](/docs/rest-api#types) | Required | Description                                                 |
| ----------------- | ----------------------------------------------------------------------- | -------- | ----------------------------------------------------------- |
| **client\_id**     | [ID](/docs/rest-api#types)           | Yes      | ID of your application.                                     |
| **client\_secret** | [String](/docs/rest-api#types)       | Yes      | Secret of your application.                                 |
| **code**          | [String](/docs/rest-api#types)       | Yes      | The code you received.                                      |
| **redirect\_uri**  | [String](/docs/rest-api#types)       | Yes      | The Redirect URL you configured on the Integration Console. |

#### Example Request

```bash filename="terminal"
curl -X POST https://api.vercel.com/v2/oauth/access_token \
  -d "client_id=oac_4GViITbjKesSmZ658unqfNA8&client_secret=EOBPvZuBYAtb3SbYo8H1iWFP&code=jMIukZ1DBCKXHje3X14BCkU0&redirect_uri=https://example.com/oauth" \
  -H "Content-Type: application/x-www-form-urlencoded"
```

You'll receive a JSON response containing the value of an `access_token`:

### Example Response

```json filename="terminal"
{
  "token_type": "Bearer",
  "access_token": "xEbuzM1ZAJ46afITQlYqH605",
  "installation_id": "icfg_ijgU3GzRxyz7nGpwwsSmbNkI",
  "user_id": "2tUzTmv4ljvFVHifEf9TGdpH",
  "team_id": null
}
```

> **💡 Note:** A request can only be made once with the same code.

### Use short-lived access tokens

> **⚠️ Warning:** Long-lived access tokens are deprecated. Don't build new integrations that
> store or reuse the access token from the code exchange. If your integration
> uses long-lived tokens today, [migrate to short-lived access
> tokens](/docs/integrations/create-integration/short-lived-access-tokens).

Short-lived access tokens expire after one hour and work for both connected accounts and native Marketplace integrations. Your server requests them with the `client_credentials` grant, using your integration's client ID and client secret. You can start using them before you change any settings, and customers don't need to reinstall your integration.

Save the `installation_id` from the code exchange response, but don't use the access token it returns. Request a short-lived token with `client_credentials` whenever a call needs one, including your first call after installation.

If you're building a new integration, turn on **Issue Only Short-Lived Access Tokens** when you create it, so every token is short-lived from the start.

If your integration already uses long-lived tokens, follow [Migrating to short-lived access tokens](/docs/integrations/create-integration/short-lived-access-tokens) to update your callers, check migration readiness, and work through the cutover checklist. Then turn on **Expire Long-Lived Access Tokens** in the Integration Console. An hour after you save, every long-lived access token for your integration stops working and every new token is short-lived. You can't undo this setting.

### Interacting with Teams

The response of your `code` exchange request includes a `team_id` property. If `team_id` is not null, you know that this integration was installed on a team.

If your integration is installed on a team, append the `teamId` query parameter to each API request. See [Accessing Resources Owned by a Team](/docs/rest-api#accessing-resources-owned-by-a-team) for more details.

### Interacting with Configurations

Each installation of your integration is stored and tracked as a configuration.

Sometimes it makes sense to fetch the configuration to get more insights about the current scope or the projects your integration has access to.

To see which endpoints are available, see the [Configurations](/docs/rest-api/integrations/retrieve-an-integration-configuration) documentation for more details.

#### Disabled Integration Configurations

> **⚠️ Warning:** If an owner(s) of an integration leaves the team that's responsible for the
> integration, the integration will be flagged as disabled. The team will
> receive an email to take action (transfer ownership) within 30 days, otherwise
> the integration will be deleted.

When integration configurations are disabled:

- Any API requests will fail with a `403` HTTP status code and a `code` of `integration_configuration_disabled`
- We continue to send `project.created`, `project.removed` and `integration-configuration.removed` webhooks, as these will allow the integration configuration to operate correctly when re-activated. All other webhook delivery will be paused
- Log drains will not receive any logs

### Interacting with Vercel Projects

Deployments made with Vercel are grouped into Projects. This means that each deployment is assigned a name and is grouped into a project with other deployments using that same name.

Using the Vercel REST API, you can modify Projects that the Integration has access to. Here are some examples:

### Modifying Environment Variables on a Project

When building a Vercel Integration, you may want to expose an API token or a configuration URL for deployments within a [Project](/docs/projects).

You can do so by [Creating a Project Environment Variable](/docs/rest-api/projects/create-one-or-more-environment-variables) using the API.

> **💡 Note:** Environment Variables created by an Integration will[display the Integration's logo](/docs/environment-variables#integration-environment-variables).

## Scopes

When creating integrations the following scopes can be updated within the Integration Console:

> **💡 Note:** Write permissions are required for both
> `project` and `domain` when
> updating the domain of a project.

| Scope                     | Description                                                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| integration-configuration | Interact with the installation of your integration                                                                                                       |
| deployment                | Interact with deployments                                                                                                                                |
| deployment-check          | Verify deployments with Checks                                                                                                                           |
| edge-config               | Create and manage Global Configs and their tokens                                                                                                          |
| project                   | Access project details and settings                                                                                                                      |
| project-env-vars          | Create and manage integration-owned project environment variables                                                                                        |
| global-project-env-vars   | Create and manage all account project environment variables                                                                                              |
| team                      | Access team details                                                                                                                                      |
| user                      | Get information about the current user                                                                                                                   |
| log-drain                 | Deprecated. Use the `drains` scope instead. Create and manage log drains to forward logs                                                                 |
| drains                    | Create and manage drains to forward Logs, Traces, Speed Insights, and Analytics data                                                                     |
| domain                    | Manage and interact with domains and certificates. Write permissions are required for both `project` and `domain` when updating the domain of a project. |
| billing                   | Access billing information including charges. Only available to Pro and Enterprise teams.                                       |

Integration ConfigurationInteract with an installation of your integration.ActionEndpointsRead GET \[/v1/integrations/configurations]\(/docs/rest-api/reference/endpoints/integrations/get-configurations-for-the-authenticated-user-or-team)GET \[/v1/integrations/configuration/{id}]\(/docs/rest-api/reference/endpoints/integrations/retrieve-an-integration-configuration)Read/Write GET \[/v1/integrations/configurations]\(/docs/rest-api/reference/endpoints/integrations/get-configurations-for-the-authenticated-user-or-team)GET \[/v1/integrations/configuration/{id}]\(/docs/rest-api/reference/endpoints/integrations/retrieve-an-integration-configuration)DELETE \[/v1/integrations/configuration/{id}]\(/docs/rest-api/reference/endpoints/integrations/delete-an-integration-configuration)DeploymentsInteract with deployments.ActionEndpointsRead GET \[/v6/deployments]\(/docs/rest-api/reference/endpoints/deployments/list-deployments)GET \[/v13/deployments/{idOrUrl}]\(/docs/rest-api/reference/endpoints/deployments/get-a-deployment-by-id-or-url)GET \[/v2/deployments/{idOrUrl}/events]\(/docs/rest-api/reference/endpoints/deployments/get-deployment-events)GET \[/v6/deployments/{id}/files]\(/docs/rest-api/reference/endpoints/deployments/list-deployment-files)GET \[/v2/deployments/{id}/aliases]\(/docs/rest-api/reference/endpoints/aliases/list-deployment-aliases)Read/Write GET \[/v6/deployments]\(/docs/rest-api/reference/endpoints/deployments/list-deployments)GET \[/v13/deployments/{idOrUrl}]\(/docs/rest-api/reference/endpoints/deployments/get-a-deployment-by-id-or-url)GET \[/v2/deployments/{idOrUrl}/events]\(/docs/rest-api/reference/endpoints/deployments/get-deployment-events)GET \[/v6/deployments/{id}/files]\(/docs/rest-api/reference/endpoints/deployments/list-deployment-files)GET \[/v2/deployments/{id}/aliases]\(/docs/rest-api/reference/endpoints/aliases/list-deployment-aliases)POST \[/v13/deployments]\(/docs/rest-api/reference/endpoints/deployments/create-a-new-deployment)PATCH \[/v12/deployments/{id}/cancel]\(/docs/rest-api/reference/endpoints/deployments/cancel-a-deployment)DELETE \[/v13/deployments/{id}]\(/docs/rest-api/reference/endpoints/deployments/delete-a-deployment)POST \[/v2/files]\(/docs/rest-api/reference/endpoints/deployments/upload-deployment-files)Deployment ChecksVerify deployments with Checks.ActionEndpointsRead/Write GET \[/v1/deployments/{deploymentId}/checks]\(/docs/rest-api/reference/endpoints/checks/retrieve-a-list-of-all-checks)GET \[/v1/deployments/{deploymentId}/checks/{checkId}]\(/docs/rest-api/reference/endpoints/checks/get-a-single-check)POST \[/v1/deployments/{deploymentId}/checks]\(/docs/rest-api/reference/endpoints/checks/creates-a-new-check)PATCH \[/v1/deployments/{deploymentId}/checks/{checkId}]\(/docs/rest-api/reference/endpoints/checks/update-a-check)POST \[/v1/deployments/{deploymentId}/checks/{checkId}/rerequest]\(/docs/rest-api/reference/endpoints/checks/rerequest-a-check)Global ConfigCreate and manage Global Configs and their tokens.ActionEndpointsRead GET \[/v1/edge-config/{edgeConfigId}]\(/docs/rest-api/reference/endpoints/edge-config/get-an-edge-config)GET \[/v1/edge-config]\(/docs/rest-api/reference/endpoints/edge-config/get-edge-configs)GET \[/v1/edge-config/{edgeConfigId}/items]\(/docs/rest-api/reference/endpoints/edge-config/get-edge-config-items)GET \[/v1/edge-config/{edgeConfigId}/item/{edgeConfigItemKey}]\(/docs/rest-api/reference/endpoints/edge-config/get-an-edge-config-item)GET \[/v1/edge-config/{edgeConfigId}/tokens]\(/docs/rest-api/reference/endpoints/edge-config/get-all-tokens-of-an-edge-config)GET \[/v1/edge-config/{edgeConfigId}/token/:token]\(/docs/rest-api/reference/endpoints/edge-config/get-edge-config-token-meta-data)Read/Write GET \[/v1/edge-config/{edgeConfigId}]\(/docs/rest-api/reference/endpoints/edge-config/get-an-edge-config)GET \[/v1/edge-config]\(/docs/rest-api/reference/endpoints/edge-config/get-edge-configs)GET \[/v1/edge-config/{edgeConfigId}/items]\(/docs/rest-api/reference/endpoints/edge-config/get-edge-config-items)GET \[/v1/edge-config/{edgeConfigId}/item/{edgeConfigItemKey}]\(/docs/rest-api/reference/endpoints/edge-config/get-an-edge-config-item)GET \[/v1/edge-config/{edgeConfigId}/tokens]\(/docs/rest-api/reference/endpoints/edge-config/get-all-tokens-of-an-edge-config)GET \[/v1/edge-config/{edgeConfigId}/token/:token]\(/docs/rest-api/reference/endpoints/edge-config/get-edge-config-token-meta-data)POST \[/v1/edge-config]\(/docs/rest-api/reference/endpoints/edge-config/create-an-edge-config)PUT \[/v1/edge-config/{edgeConfigId}]\(/docs/rest-api/reference/endpoints/edge-config/update-an-edge-config)DELETE \[/v1/edge-config/{edgeConfigId}]\(/docs/rest-api/reference/endpoints/edge-config/delete-an-edge-config)PATCH \[/v1/edge-config/{edgeConfigId}/items]\(/docs/rest-api/reference/endpoints/edge-config/update-edge-config-items-in-batch)POST \[/v1/edge-config/{edgeConfigId}/token]\(/docs/rest-api/reference/endpoints/edge-config/create-an-edge-config-token)DELETE \[/v1/edge-config/{edgeConfigId}/tokens]\(/docs/rest-api/reference/endpoints/edge-config/delete-one-or-more-edge-config-tokens)ProjectsAccess project details and settings.ActionEndpointsRead GET \[/v9/projects]\(/docs/rest-api/reference/endpoints/projects/create-a-new-project)GET \[/v9/projects/{idOrName}]\(/docs/rest-api/reference/endpoints/projects/find-a-project-by-id-or-name)GET \[/v9/projects/{idOrName}/domains]\(/docs/rest-api/reference/endpoints/projects/retrieve-project-domains-by-project-by-id-or-name)GET \[/v9/projects/{idOrName}/domains/{domain}]\(/docs/rest-api/reference/endpoints/projects/get-a-project-domain)Read/Write GET \[/v9/projects]\(/docs/rest-api/reference/endpoints/projects/create-a-new-project)GET \[/v9/projects/{idOrName}]\(/docs/rest-api/reference/endpoints/projects/find-a-project-by-id-or-name)GET \[/v9/projects/{idOrName}/domains]\(/docs/rest-api/reference/endpoints/projects/retrieve-project-domains-by-project-by-id-or-name)GET \[/v9/projects/{idOrName}/domains/{domain}]\(/docs/rest-api/reference/endpoints/projects/get-a-project-domain)POST \[/v9/projects]\(/docs/rest-api/reference/endpoints/projects/create-a-new-project)PATCH \[/v9/projects/{idOrName}]\(/docs/rest-api/reference/endpoints/projects/update-an-existing-project)DELETE \[/v9/projects/{idOrName}]\(/docs/rest-api/reference/endpoints/projects/delete-a-project)POST \[/v9/projects/{idOrName}/domains]\(/docs/rest-api/reference/endpoints/projects/add-a-domain-to-a-project)PATCH \[/v9/projects/{idOrName}/domains/{domain}]\(/docs/rest-api/reference/endpoints/projects/update-a-project-domain)DELETE \[/v9/projects/{idOrName}/domains/{domain}]\(/docs/rest-api/reference/endpoints/projects/remove-a-domain-from-a-project)POST \[/v9/projects/{idOrName}/domains/{domain}/verify]\(/docs/rest-api/reference/endpoints/projects/verify-project-domain)Project Environmental VariablesCreate and manage integration-owned project environment variables.ActionEndpointsRead/Write GET \[/v9/projects/{idOrName}/env]\(/docs/rest-api/reference/endpoints/projects/retrieve-the-environment-variables-of-a-project-by-id-or-name)POST \[/v9/projects/{idOrName}/env]\(/docs/rest-api/reference/endpoints/projects/create-one-or-more-environment-variables)PATCH \[/v9/projects/{idOrName}/env/{id}]\(/docs/rest-api/reference/endpoints/projects/edit-an-environment-variable)DELETE \[/v9/projects/{idOrName}/env/{keyOrId}]\(/docs/rest-api/reference/endpoints/projects/remove-an-environment-variable)Global Project Environmental VariablesCreate and manage all account project environment variables.ActionEndpointsRead/Write GET \[/v9/projects/{idOrName}/env]\(/docs/rest-api/reference/endpoints/projects/retrieve-the-environment-variables-of-a-project-by-id-or-name)POST \[/v9/projects/{idOrName}/env]\(/docs/rest-api/reference/endpoints/projects/create-one-or-more-environment-variables)PATCH \[/v9/projects/{idOrName}/env/{id}]\(/docs/rest-api/reference/endpoints/projects/edit-an-environment-variable)DELETE \[/v9/projects/{idOrName}/env/{keyOrId}]\(/docs/rest-api/reference/endpoints/projects/remove-an-environment-variable)TeamsAccess team details.ActionEndpointsRead GET \[/v2/teams/{teamId}]\(/docs/rest-api/reference/endpoints/teams/get-a-team)GET \[/v2/teams/{teamId}/members]\(/docs/rest-api/reference/endpoints/teams/list-team-members)UserGet information about the current user.ActionEndpointsRead GET \[/v2/user]\(/docs/rest-api/reference/endpoints/user/get-the-user)Log DrainsDeprecated. Use the Drains scope instead. Create and manage log drains to forward logs.ActionEndpointsRead/Write GET \[/v1/integrations/log-drains]\(/docs/rest-api/reference/endpoints/drains/retrieve-a-list-of-all-drains)POST \[/v1/integrations/log-drains]\(/docs/rest-api/reference/endpoints/drains/create-a-new-drain)DELETE \[/v1/integrations/log-drains/{id}]\(/docs/rest-api/reference/endpoints/drains/delete-a-drain)DrainsCreate and manage drains to forward Logs, Traces, Speed Insights, and Analytics data.ActionEndpointsRead/Write GET \[/v1/drains]\(/docs/rest-api/reference/endpoints/drains/retrieve-a-list-of-all-drains)GET \[/v1/drains/{id}]\(/docs/rest-api/reference/endpoints/drains/find-a-drain-by-id)POST \[/v1/drains]\(/docs/rest-api/reference/endpoints/drains/create-a-new-drain)PATCH \[/v1/drains/{id}]\(/docs/rest-api/reference/endpoints/drains/update-an-existing-drain)DELETE \[/v1/drains/{id}]\(/docs/rest-api/reference/endpoints/drains/delete-a-drain)POST \[/v1/drains/test]\(/docs/rest-api/reference/endpoints/drains/validate-drain-delivery-configuration)DomainManage and interact with domains and certificates.ActionEndpointsRead GET \[/v5/domains]\(/docs/rest-api/reference/endpoints/domains/list-all-the-domains)GET \[/v5/domains/{domain}]\(/docs/rest-api/reference/endpoints/domains/get-information-for-a-single-domain)GET \[/v6/domains/{domain}/config]\(/docs/rest-api/reference/endpoints/domains/get-a-domains-configuration)GET \[/v4/domains/{domain}/records]\(/docs/rest-api/reference/endpoints/dns/list-existing-dns-records)GET \[/v7/certs/{id}]\(/docs/rest-api/reference/endpoints/certs/get-cert-by-id)GET \[/v1/registrar/domains/{domain}/availability]\(/docs/rest-api/reference/endpoints/domains-registrar/get-availability-for-a-domain)GET \[/v1/registrar/domains/{domain}/price]\(/docs/rest-api/reference/endpoints/domains-registrar/get-price-data-for-a-domain)Read/Write GET \[/v5/domains]\(/docs/rest-api/reference/endpoints/domains/list-all-the-domains)GET \[/v5/domains/{domain}]\(/docs/rest-api/reference/endpoints/domains/get-information-for-a-single-domain)GET \[/v6/domains/{domain}/config]\(/docs/rest-api/reference/endpoints/domains/get-a-domains-configuration)GET \[/v4/domains/{domain}/records]\(/docs/rest-api/reference/endpoints/dns/list-existing-dns-records)GET \[/v7/certs/{id}]\(/docs/rest-api/reference/endpoints/certs/get-cert-by-id)GET \[/v1/registrar/domains/{domain}/availability]\(/docs/rest-api/reference/endpoints/domains-registrar/get-availability-for-a-domain)GET \[/v1/registrar/domains/{domain}/price]\(/docs/rest-api/reference/endpoints/domains-registrar/get-price-data-for-a-domain)POST \[/v1/registrar/domains/{domain}/transfer]\(/docs/rest-api/reference/endpoints/domains-registrar/transfer-in-a-domain)DELETE \[/v6/domains/{domain}]\(/docs/rest-api/reference/endpoints/domains/remove-a-domain-by-name)POST \[/v9/projects/{idOrName}/domains/{domain}/verify]\(/docs/rest-api/reference/endpoints/projects/verify-project-domain)POST \[/v2/domains/{domain}/records]\(/docs/rest-api/reference/endpoints/dns/create-a-dns-record)PATCH \[/v1/domains/records/{recordId}]\(/docs/rest-api/reference/endpoints/dns/update-an-existing-dns-record)DELETE \[/v2/domains/{domain}/records/{recordId}]\(/docs/rest-api/reference/endpoints/dns/delete-a-dns-record)POST \[/v7/certs]\(/docs/rest-api/reference/endpoints/certs/issue-a-new-cert)PUT \[/v7/certs]\(/docs/rest-api/reference/endpoints/certs/upload-a-cert)DELETE \[/v8/certs/{id}]\(/docs/rest-api/reference/endpoints/certs/remove-cert)POST \[/v1/registrar/domains/{domain}/buy]\(/docs/rest-api/reference/endpoints/domains-registrar/buy-a-domain)POST \[/v1/registrar/domains/{domain}/transfer]\(/docs/rest-api/reference/endpoints/domains-registrar/transfer-in-a-domain)BillingAccess billing information including charges. Only available to Pro and Enterprise teams.ActionEndpointsRead GET \[/v1/billing/charges]\(/docs/rest-api/reference/endpoints/billing/list-focus-billing-charges)

### Updating Scopes

As the Vercel REST API evolves, you'll need to update your scopes based on your integration's endpoint usage.

![Confirming Scope changes.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/integrations/console/confirm-scope-change.png)

Additions and upgrades always require a review and confirmation. To ensure this, every affected user and team owner will be informed through email to undergo this process.
Please make sure you provide a meaningful, short, and descriptive note for your changes.

Scope removals and downgrades won't require user confirmation and will be applied **immediately** to confirmed scopes and pending requested scope changes.

### Confirmed Scope Changes

User and Teams will always confirm **all pending changes** with one confirmation.
That means that if you have requested new scopes multiple times over the past year, the users will see a summary of all pending changes with their respective provided note.

Once a user confirms these changes, scopes get directly applied to the installation. You will also get notified through the new `integration-configuration.scope-change-confirmed` event.

## Common Errors

When using the Vercel REST API with Integrations, you might come across some errors which you can address immediately.

### CORS issues

To avoid CORS issues, make sure you only interact with the Vercel REST API on the **server side**.

Since the token grants access to resources of the Team or Personal Account, you should never expose it on the client side.

For more information on using CORS with Vercel, see [How can I enable CORS on Vercel?](/kb/guide/how-to-enable-cors).

### 403 Forbidden responses

Ensure you are not missing the `teamId` [query parameter](/docs/integrations/create-integration/submit-integration#redirect-url). `teamId` is required if the integration installation is for a Team.
Ensure the Scope of Your [Access Token](/docs/integrations/create-integration/vercel-api-integrations#using-the-vercel-api/scopes/teams) is properly set.

## Frequently Asked Questions

### Are integration configuration IDs reused after deletion?

No, integration configuration IDs (`icfg_*`) are not reused after an integration is deleted or uninstalled. Each installation of an integration receives a unique configuration ID that is permanently retired when the integration is removed. If you reinstall the same integration later, a new unique configuration ID will be generated.

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
