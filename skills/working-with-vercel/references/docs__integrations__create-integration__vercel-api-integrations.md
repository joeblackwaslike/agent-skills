---
title: Building Integrations with Vercel REST API
product: vercel
url: /docs/integrations/create-integration/vercel-api-integrations
canonical_url: "https://vercel.com/docs/integrations/create-integration/vercel-api-integrations"
last_updated: 2026-08-28
type: reference
prerequisites:
  - /docs/integrations/create-integration
  - /docs/integrations
related:
  - /docs/rest-api/projects/create-one-or-more-environment-variables
  - /docs/drains/reference/logs
  - /docs/rest-api
  - /docs/integrations/create-integration/submit-integration
  - /docs/project-configuration
summary: Learn how to use Vercel REST API to build your integrations and work with redirect URLs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/vercel-api-integrations.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "2d9bc5ccef20e65c355310c73cdb9758d0b476b202b497bf9a42f0a701a6b5ce"
---

# Building Integrations with Vercel REST API

## Using the Vercel REST API

See the following API reference documentation for how to use Vercel REST API to create integrations:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel SDK Reference](https://vercel.com/docs/rest-api/sdk?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fvercel-api-integrations&source_site=vercel-docs&relationship=related) — Interact programmatically with your Vercel account using the SDK.
- [Retrieve project domains by project by id or name](https://vercel.com/docs/rest-api/projects/retrieve-project-domains-by-project-by-id-or-name?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fvercel-api-integrations&source_site=vercel-docs&relationship=related) — GET /v9/projects/{idOrName}/domains — Retrieve the domains associated with a given project by passing either the project
- [Get a project domain](https://vercel.com/docs/rest-api/projects/get-a-project-domain?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fvercel-api-integrations&source_site=vercel-docs&relationship=related) — GET /v9/projects/{idOrName}/domains/{domain} — Get project domain by project id/name and domain name.
- [Audit Logs](https://vercel.com/docs/audit-log?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fvercel-api-integrations&source_site=vercel-docs&relationship=related) — Learn how to track and analyze your team members' activities.
- [Update a project domain](https://vercel.com/docs/rest-api/projects/update-a-project-domain?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fvercel-api-integrations&source_site=vercel-docs&relationship=related) — PATCH /v9/projects/{idOrName}/domains/{domain} — Update a project domain's configuration, including the name, git branch

Full cross-link map for this page: [/docs/integrations/create-integration/vercel-api-integrations.graph.md](/docs/integrations/create-integration/vercel-api-integrations.graph.md?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fvercel-api-integrations&source_site=vercel-docs&relationship=graph)
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

One of these parameters is the `code` parameter. This short-lived parameter is valid for **30 minutes** and can be exchanged **once** for a long-lived access token using the following API endpoint:

```bash filename="terminal"
{`POST https://api.vercel.com/v2/oauth/access_token`}
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
{`curl -X POST ${API_ENDPOINT}/v2/oauth/access_token \\
 -d "client_id=oac_4GViITbjKesSmZ658unqfNA8&client_secret=EOBPvZuBYAtb3SbYo8H1iWFP&code=jMIukZ1DBCKXHje3X14BCkU0&redirect_uri=https://example.com/oauth" \\
 -H "Content-Type: application/x-www-form-urlencoded"
`}
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

### Interacting with Teams

The response of your `code` exchange request includes a `team_id` property. If `team_id` is not null, you know that this integration was installed on a team.

If your integration is installed on a team, append the `teamId` query parameter to each API request. See [Accessing Resources Owned by a Team](/docs/rest-api#accessing-resources-owned-by-a-team) for more details.

### Interacting with Configurations

Each installation of your integration is stored and tracked as a configuration.

Sometimes it makes sense to fetch the configuration in order to get more insights about the current scope or the projects your integration has access to.

To see which endpoints are available, see the [Configurations](/docs/project-configuration) documentation for more details.

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
| log-drain                 | Create and manage log drains to forward logs                                                                                                             |
| domain                    | Manage and interact with domains and certificates. Write permissions are required for both `project` and `domain` when updating the domain of a project. |
| billing                   | Access billing information including charges and contract commitments. Only available to Pro and Enterprise teams.                                       |

Integration ConfigurationInteract with an installation of your integration.ActionEndpointsReadGET\[/v1/integrations/configurations]\(/docs/rest-api/reference/endpoints/integrations/get-configurations-for-the-authenticated-user-or-team)GET\[/v1/integrations/configuration/{id}]\(/docs/rest-api/reference/endpoints/integrations/retrieve-an-integration-configuration)Read/WriteGET\[/v1/integrations/configurations]\(/docs/rest-api/reference/endpoints/integrations/get-configurations-for-the-authenticated-user-or-team)GET\[/v1/integrations/configuration/{id}]\(/docs/rest-api/reference/endpoints/integrations/retrieve-an-integration-configuration)DELETE\[/v1/integrations/configuration/{id}]\(/docs/rest-api/reference/endpoints/integrations/delete-an-integration-configuration)DeploymentsInteract with deployments.ActionEndpointsReadGET\[/v6/deployments]\(/docs/rest-api/reference/endpoints/deployments/list-deployments)GET\[/v13/deployments/{idOrUrl}]\(/docs/rest-api/reference/endpoints/deployments/get-a-deployment-by-id-or-url)GET\[/v2/deployments/{idOrUrl}/events]\(/docs/rest-api/reference/endpoints/deployments/get-deployment-events)GET\[/v6/deployments/{id}/files]\(/docs/rest-api/reference/endpoints/deployments/list-deployment-files)GET\[/v2/deployments/{id}/aliases]\(/docs/rest-api/reference/endpoints/aliases/list-deployment-aliases)Read/WriteGET\[/v6/deployments]\(/docs/rest-api/reference/endpoints/deployments/list-deployments)GET\[/v13/deployments/{idOrUrl}]\(/docs/rest-api/reference/endpoints/deployments/get-a-deployment-by-id-or-url)GET\[/v2/deployments/{idOrUrl}/events]\(/docs/rest-api/reference/endpoints/deployments/get-deployment-events)GET\[/v6/deployments/{id}/files]\(/docs/rest-api/reference/endpoints/deployments/list-deployment-files)GET\[/v2/deployments/{id}/aliases]\(/docs/rest-api/reference/endpoints/aliases/list-deployment-aliases)POST\[/v13/deployments]\(/docs/rest-api/reference/endpoints/deployments/create-a-new-deployment)PATCH\[/v12/deployments/{id}/cancel]\(/docs/rest-api/reference/endpoints/deployments/cancel-a-deployment)DELETE\[/v13/deployments/{id}]\(/docs/rest-api/reference/endpoints/deployments/delete-a-deployment)POST\[/v2/files]\(/docs/rest-api/reference/endpoints/deployments/upload-deployment-files)Deployment ChecksVerify deployments with Checks.ActionEndpointsRead/WriteGET\[/v1/deployments/{deploymentId}/checks]\(/docs/rest-api/reference/endpoints/checks/retrieve-a-list-of-all-checks)GET\[/v1/deployments/{deploymentId}/checks/{checkId}]\(/docs/rest-api/reference/endpoints/checks/get-a-single-check)POST\[/v1/deployments/{deploymentId}/checks]\(/docs/rest-api/reference/endpoints/checks/creates-a-new-check)PATCH\[/v1/deployments/{deploymentId}/checks/{checkId}]\(/docs/rest-api/reference/endpoints/checks/update-a-check)POST\[/v1/deployments/{deploymentId}/checks/{checkId}/rerequest]\(/docs/rest-api/reference/endpoints/checks/rerequest-a-check)Global ConfigCreate and manage Global Configs and their tokens.ActionEndpointsReadGET\[/v1/edge-config/{edgeConfigId}]\(/docs/rest-api/reference/endpoints/edge-config/get-an-edge-config)GET\[/v1/edge-config]\(/docs/rest-api/reference/endpoints/edge-config/get-edge-configs)GET\[/v1/edge-config/{edgeConfigId}/items]\(/docs/rest-api/reference/endpoints/edge-config/get-edge-config-items)GET\[/v1/edge-config/{edgeConfigId}/item/{edgeConfigItemKey}]\(/docs/rest-api/reference/endpoints/edge-config/get-an-edge-config-item)GET\[/v1/edge-config/{edgeConfigId}/tokens]\(/docs/rest-api/reference/endpoints/edge-config/get-all-tokens-of-an-edge-config)GET\[/v1/edge-config/{edgeConfigId}/token/:token]\(/docs/rest-api/reference/endpoints/edge-config/get-edge-config-token-meta-data)Read/WriteGET\[/v1/edge-config/{edgeConfigId}]\(/docs/rest-api/reference/endpoints/edge-config/get-an-edge-config)GET\[/v1/edge-config]\(/docs/rest-api/reference/endpoints/edge-config/get-edge-configs)GET\[/v1/edge-config/{edgeConfigId}/items]\(/docs/rest-api/reference/endpoints/edge-config/get-edge-config-items)GET\[/v1/edge-config/{edgeConfigId}/item/{edgeConfigItemKey}]\(/docs/rest-api/reference/endpoints/edge-config/get-an-edge-config-item)GET\[/v1/edge-config/{edgeConfigId}/tokens]\(/docs/rest-api/reference/endpoints/edge-config/get-all-tokens-of-an-edge-config)GET\[/v1/edge-config/{edgeConfigId}/token/:token]\(/docs/rest-api/reference/endpoints/edge-config/get-edge-config-token-meta-data)POST\[/v1/edge-config]\(/docs/rest-api/reference/endpoints/edge-config/create-an-edge-config)PUT\[/v1/edge-config/{edgeConfigId}]\(/docs/rest-api/reference/endpoints/edge-config/update-an-edge-config)DELETE\[/v1/edge-config/{edgeConfigId}]\(/docs/rest-api/reference/endpoints/edge-config/delete-an-edge-config)PATCH\[/v1/edge-config/{edgeConfigId}/items]\(/docs/rest-api/reference/endpoints/edge-config/update-edge-config-items-in-batch)POST\[/v1/edge-config/{edgeConfigId}/token]\(/docs/rest-api/reference/endpoints/edge-config/create-an-edge-config-token)DELETE\[/v1/edge-config/{edgeConfigId}/tokens]\(/docs/rest-api/reference/endpoints/edge-config/delete-one-or-more-edge-config-tokens)ProjectsAccess project details and settings.ActionEndpointsReadGET\[/v9/projects]\(/docs/rest-api/reference/endpoints/projects/create-a-new-project)GET\[/v9/projects/{idOrName}]\(/docs/rest-api/reference/endpoints/projects/find-a-project-by-id-or-name)GET\[/v9/projects/{idOrName}/domains]\(/docs/rest-api/reference/endpoints/projects/retrieve-project-domains-by-project-by-id-or-name)GET\[/v9/projects/{idOrName}/domains/{domain}]\(/docs/rest-api/reference/endpoints/projects/get-a-project-domain)Read/WriteGET\[/v9/projects]\(/docs/rest-api/reference/endpoints/projects/create-a-new-project)GET\[/v9/projects/{idOrName}]\(/docs/rest-api/reference/endpoints/projects/find-a-project-by-id-or-name)GET\[/v9/projects/{idOrName}/domains]\(/docs/rest-api/reference/endpoints/projects/retrieve-project-domains-by-project-by-id-or-name)GET\[/v9/projects/{idOrName}/domains/{domain}]\(/docs/rest-api/reference/endpoints/projects/get-a-project-domain)POST\[/v9/projects]\(/docs/rest-api/reference/endpoints/projects/create-a-new-project)PATCH\[/v9/projects/{idOrName}]\(/docs/rest-api/reference/endpoints/projects/update-an-existing-project)DELETE\[/v9/projects/{idOrName}]\(/docs/rest-api/reference/endpoints/projects/delete-a-project)POST\[/v9/projects/{idOrName}/domains]\(/docs/rest-api/reference/endpoints/projects/add-a-domain-to-a-project)PATCH\[/v9/projects/{idOrName}/domains/{domain}]\(/docs/rest-api/reference/endpoints/projects/update-a-project-domain)DELETE\[/v9/projects/{idOrName}/domains/{domain}]\(/docs/rest-api/reference/endpoints/projects/remove-a-domain-from-a-project)POST\[/v9/projects/{idOrName}/domains/{domain}/verify]\(/docs/rest-api/reference/endpoints/projects/verify-project-domain)Project Environmental VariablesCreate and manage integration-owned project environment variables.ActionEndpointsRead/WriteGET\[/v9/projects/{idOrName}/env]\(/docs/rest-api/reference/endpoints/projects/retrieve-the-environment-variables-of-a-project-by-id-or-name)POST\[/v9/projects/{idOrName}/env]\(/docs/rest-api/reference/endpoints/projects/create-one-or-more-environment-variables)PATCH\[/v9/projects/{idOrName}/env/{id}]\(/docs/rest-api/reference/endpoints/projects/edit-an-environment-variable)DELETE\[/v9/projects/{idOrName}/env/{keyOrId}]\(/docs/rest-api/reference/endpoints/projects/remove-an-environment-variable)Global Project Environmental VariablesCreate and manage all account project environment variables.ActionEndpointsRead/WriteGET\[/v9/projects/{idOrName}/env]\(/docs/rest-api/reference/endpoints/projects/retrieve-the-environment-variables-of-a-project-by-id-or-name)POST\[/v9/projects/{idOrName}/env]\(/docs/rest-api/reference/endpoints/projects/create-one-or-more-environment-variables)PATCH\[/v9/projects/{idOrName}/env/{id}]\(/docs/rest-api/reference/endpoints/projects/edit-an-environment-variable)DELETE\[/v9/projects/{idOrName}/env/{keyOrId}]\(/docs/rest-api/reference/endpoints/projects/remove-an-environment-variable)TeamsAccess team details.ActionEndpointsReadGET\[/v2/teams/{teamId}]\(/docs/rest-api/reference/endpoints/teams/get-a-team)GET\[/v2/teams/{teamId}/members]\(/docs/rest-api/reference/endpoints/teams/list-team-members)UserGet information about the current user.ActionEndpointsReadGET\[/v2/user]\(/docs/rest-api/reference/endpoints/user/get-the-user)Log DrainsCreate and manage log drains to forward logs.ActionEndpointsRead/WriteGET\[/v1/integrations/log-drains]\(/docs/rest-api/reference/endpoints/drains/retrieve-a-list-of-all-drains)POST\[/v1/integrations/log-drains]\(/docs/rest-api/reference/endpoints/drains/create-a-new-drain)DELETE\[/v1/integrations/log-drains/{id}]\(/docs/rest-api/reference/endpoints/drains/delete-a-drain)DrainsCreate and manage drains to forward Logs, Traces, Speed Insights, and Analytics data.ActionEndpointsRead/WriteGET\[/v1/drains]\(/docs/rest-api/reference/endpoints/drains/retrieve-a-list-of-all-drains)GET\[/v1/drains/{id}]\(/docs/rest-api/reference/endpoints/drains/find-a-drain-by-id)POST\[/v1/drains]\(/docs/rest-api/reference/endpoints/drains/create-a-new-drain)PATCH\[/v1/drains/{id}]\(/docs/rest-api/reference/endpoints/drains/update-an-existing-drain)DELETE\[/v1/drains/{id}]\(/docs/rest-api/reference/endpoints/drains/delete-a-drain)POST\[/v1/drains/test]\(/docs/rest-api/reference/endpoints/drains/validate-drain-delivery-configuration)DomainManage and interact with domains and certificates.ActionEndpointsReadGET\[/v5/domains]\(/docs/rest-api/reference/endpoints/domains/list-all-the-domains)GET\[/v5/domains/{domain}]\(/docs/rest-api/reference/endpoints/domains/get-information-for-a-single-domain)GET\[/v6/domains/{domain}/config]\(/docs/rest-api/reference/endpoints/domains/get-a-domains-configuration)GET\[/v4/domains/{domain}/records]\(/docs/rest-api/reference/endpoints/dns/list-existing-dns-records)GET\[/v7/certs/{id}]\(/docs/rest-api/reference/endpoints/certs/get-cert-by-id)GET\[/v1/registrar/domains/{domain}/availability]\(/docs/rest-api/reference/endpoints/domains-registrar/get-availability-for-a-domain)GET\[/v1/registrar/domains/{domain}/price]\(/docs/rest-api/reference/endpoints/domains-registrar/get-price-data-for-a-domain)Read/WriteGET\[/v5/domains]\(/docs/rest-api/reference/endpoints/domains/list-all-the-domains)GET\[/v5/domains/{domain}]\(/docs/rest-api/reference/endpoints/domains/get-information-for-a-single-domain)GET\[/v6/domains/{domain}/config]\(/docs/rest-api/reference/endpoints/domains/get-a-domains-configuration)GET\[/v4/domains/{domain}/records]\(/docs/rest-api/reference/endpoints/dns/list-existing-dns-records)GET\[/v7/certs/{id}]\(/docs/rest-api/reference/endpoints/certs/get-cert-by-id)GET\[/v1/registrar/domains/{domain}/availability]\(/docs/rest-api/reference/endpoints/domains-registrar/get-availability-for-a-domain)GET\[/v1/registrar/domains/{domain}/price]\(/docs/rest-api/reference/endpoints/domains-registrar/get-price-data-for-a-domain)POST\[/v1/registrar/domains/{domain}/transfer]\(/docs/rest-api/reference/endpoints/domains-registrar/transfer-in-a-domain)DELETE\[/v6/domains/{domain}]\(/docs/rest-api/reference/endpoints/domains/remove-a-domain-by-name)POST\[/v9/projects/{idOrName}/domains/{domain}/verify]\(/docs/rest-api/reference/endpoints/projects/verify-project-domain)POST\[/v2/domains/{domain}/records]\(/docs/rest-api/reference/endpoints/dns/create-a-dns-record)PATCH\[/v1/domains/records/{recordId}]\(/docs/rest-api/reference/endpoints/dns/update-an-existing-dns-record)DELETE\[/v2/domains/{domain}/records/{recordId}]\(/docs/rest-api/reference/endpoints/dns/delete-a-dns-record)POST\[/v7/certs]\(/docs/rest-api/reference/endpoints/certs/issue-a-new-cert)PUT\[/v7/certs]\(/docs/rest-api/reference/endpoints/certs/upload-a-cert)DELETE\[/v8/certs/{id}]\(/docs/rest-api/reference/endpoints/certs/remove-cert)POST\[/v1/registrar/domains/{domain}/buy]\(/docs/rest-api/reference/endpoints/domains-registrar/buy-a-domain)POST\[/v1/registrar/domains/{domain}/transfer]\(/docs/rest-api/reference/endpoints/domains-registrar/transfer-in-a-domain)BillingAccess billing information including charges and contract commitments. Only available to Pro and Enterprise teams.ActionEndpointsReadGET\[/v1/billing/charges]\(/docs/rest-api/reference/endpoints/billing/list-focus-billing-charges)GET\[/v1/billing/contract-commitments]\(/docs/rest-api/reference/endpoints/billing/list-focus-contract-commitments)

### Updating Scopes

As the Vercel REST API evolves, you'll need to update your scopes based on your integration's endpoint usage.

![Image](https://vercel.com/docs-assets/static/docs/integrations/console/confirm-scope-change.png)

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


---

[View full sitemap](/docs/sitemap)
