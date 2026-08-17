---
title: Connect to Microsoft Azure
product: vercel
url: /docs/oidc/azure
canonical_url: "https://vercel.com/docs/oidc/azure"
last_updated: 2026-06-23
type: how-to
prerequisites:
  - /docs/oidc
related:
  - /docs/functions/quickstart
  - /docs/environment-variables
summary: "Learn how to configure your Microsoft Azure account to trust Vercel's OpenID Connect (OIDC) Identity Provider (IdP)."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/oidc/azure.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "7e2af2d1966700c0ab41fc4e533b1b50d06f1f583bf5bced112b18bbe83d7c31"
---

# Connect to Microsoft Azure

> **🔒 Permissions Required**: Secure backend access with OIDC federation


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Connect Next.js to Amazon Aurora PostgreSQL using Vercel Marketplace](https://vercel.com/kb/guide/connect-next-js-to-amazon-aurora-postgresql-using-vercel-marketplace?from=related) — Learn how to connect your Next.js application to Amazon Aurora PostgreSQL securely using the Vercel Marketplace AWS inte
- [AWS](https://vercel.com/docs/oidc/aws?from=related) — Learn how to configure your AWS account to trust Vercel's OpenID Connect \(OIDC\) Identity Provider \(IdP\).
- [Google Cloud Platform](https://vercel.com/docs/oidc/gcp?from=related) — Learn how to configure your GCP project to trust Vercel's OpenID Connect \(OIDC\) Identity Provider \(IdP\).
- [Connect your API](https://vercel.com/docs/oidc/api?from=related) — Learn how to configure your own API to trust Vercel's OpenID Connect \(OIDC\) Identity Provider \(IdP\)
- [OIDC](https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc?from=related) — Authenticate AI Gateway requests with Vercel OIDC tokens, with no API key to manage.
- [OIDC Reference](https://vercel.com/docs/oidc/reference?from=related) — Review helper libraries to help you connect with your backend and understand the structure of an OIDC token.

Full cross-link map for this page: [/docs/oidc/azure.graph.md](/docs/oidc/azure.graph.md)
<!-- /docsgraph:related -->

To understand how Azure supports OIDC through Workload Identity Federation, consult the [Azure documentation](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation).

## Configure your Azure account

- ### Create a Managed Identity
  - Navigate to **All services**
  - Select **Identity**
  - Select **Manage Identities** and select **Create**
  - Choose your Azure Subscription, Resource Group, Region and Name

- ### Create a Federated Credential
  - Go to **Federated credentials** and select **Add Credential**
  - In the **Federated credential scenario** field select **Other**
  - Enter the **Issuer URL**, the URL will depend on the issuer mode setting:
    - **Team**: `https://oidc.vercel.com/[TEAM_SLUG]`, replacing `[TEAM_SLUG]` with the path from your Vercel team URL
    - **Global**: `https://oidc.vercel.com`
  - In the **Subject identifier** field use: `owner:[TEAM_SLUG]:project[PROJECT_NAME]:environment:[preview | production | development]`
    - Replace `[TEAM_SLUG]` with your team identifier from the Vercel's team URL
    - Replace `[PROJECT_NAME]` with your [project's name](https://vercel.com/docs/projects#project-name) in your
      [project's settings](https://vercel.com/docs/projects#project-settings)
  - In the **Name** field, use a name for your own reference such as: `[Project name] - [Environment]`
  - In the **Audience** field, you have two options:
    - **Default**: Enter `https://vercel.com/[TEAM_SLUG]`, replacing `[TEAM_SLUG]` with your team identifier from the Vercel team URL
    - **Recommended**: Enter `api://AzureADTokenExchange`. When using this value, you must also pass a matching `audience` in your code. See the [custom audience section](#custom-audience) below
  > **💡 Note:** Azure does not allow for partial claim conditions so you must specify the
  > `Subject` and `Audience` fields exactly. However, it is possible to create
  > mutliple federated credentials on the same managed identity to allow for the
  > various `sub` claims.

- ### Grant access to the Azure service
  In order to connect to the Azure service that you would like to use, you need to allow your Managed Identity to access it.

  For example, to use Azure CosmosDB, associate a role definition to the Managed Identity using the Azure CLI, as explained in the [Azure CosmosDB documentation](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/tutorial-vm-managed-identities-cosmos?tabs=azure-cli#grant-access).

  You are now ready to connect to your Azure service from your project's code. Review the example below.

## Custom audience

By default, the OIDC token's `aud` claim is set to `https://vercel.com/[TEAM_SLUG]`. Azure recommends using `api://AzureADTokenExchange` as the audience for workload identity federation. To use this value, pass the `audience` option to `getVercelOidcToken`:

```ts
import { getVercelOidcToken } from '@vercel/oidc';

const token = await getVercelOidcToken({
  audience: 'api://AzureADTokenExchange',
});
```

When using a custom audience, set the **Audience** field in your federated credential to the same value (`api://AzureADTokenExchange`).

## Examples

In the following example, you create a [Vercel function](/docs/functions/quickstart#create-a-vercel-function) in a Vercel project where you have [defined Azure account environment variables](/docs/environment-variables#creating-environment-variables). The function will connect to Azure using OIDC and use a specific resource that you have allowed the Managed Identity to access.

### Query an Azure CosmosDB instance

Install the following packages:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @azure/identity @azure/cosmos @vercel/oidc
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @azure/identity @azure/cosmos @vercel/oidc
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @azure/identity @azure/cosmos @vercel/oidc
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @azure/identity @azure/cosmos @vercel/oidc
    ```
  </Code>
</CodeBlock>

In the API route for this function, use the following code to perform a database `SELECT` query from an Azure CosmosDB instance:

```ts filename="/api/azure-cosmosdb/route.ts"
import {
  ClientAssertionCredential,
  AuthenticationRequiredError,
} from '@azure/identity';
import * as cosmos from '@azure/cosmos';
import { getVercelOidcToken } from '@vercel/oidc';

/**
 * The Azure Active Directory tenant (directory) ID.
 * Added to environment variables
 */
const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID!;

/**
 * The client (application) ID of an App Registration in the tenant.
 * Added to environment variables
 */
const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID!;
const COSMOS_DB_ENDPOINT = process.env.COSMOS_DB_ENDPOINT!;
const COSMOS_DB_ID = process.env.COSMOS_DB_ID!;
const COSMOS_DB_CONTAINER_ID = process.env.COSMOS_DB_CONTAINER_ID!;

const tokenCredentials = new ClientAssertionCredential(
  AZURE_TENANT_ID,
  AZURE_CLIENT_ID,
  getVercelOidcToken,
);

const cosmosClient = new cosmos.CosmosClient({
  endpoint: COSMOS_DB_ENDPOINT,
  aadCredentials: tokenCredentials,
});

const container = cosmosClient
  .database(COSMOS_DB_ID)
  .container(COSMOS_DB_CONTAINER_ID);

export async function GET() {
  const { resources } = await container.items
    .query('SELECT * FROM my_table')
    .fetchAll();

  return Response.json(resources);
}
```

### Query an Azure CosmosDB instance with custom audience

This example uses Azure's recommended `api://AzureADTokenExchange` audience:

```ts filename="/api/azure-cosmosdb/route.ts"
import {
  ClientAssertionCredential,
  AuthenticationRequiredError,
} from '@azure/identity';
import * as cosmos from '@azure/cosmos';
import { getVercelOidcToken } from '@vercel/oidc';

const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID!;
const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID!;
const COSMOS_DB_ENDPOINT = process.env.COSMOS_DB_ENDPOINT!;
const COSMOS_DB_ID = process.env.COSMOS_DB_ID!;
const COSMOS_DB_CONTAINER_ID = process.env.COSMOS_DB_CONTAINER_ID!;

const tokenCredentials = new ClientAssertionCredential(
  AZURE_TENANT_ID,
  AZURE_CLIENT_ID,
  () => getVercelOidcToken({ audience: 'api://AzureADTokenExchange' }),
);

const cosmosClient = new cosmos.CosmosClient({
  endpoint: COSMOS_DB_ENDPOINT,
  aadCredentials: tokenCredentials,
});

const container = cosmosClient
  .database(COSMOS_DB_ID)
  .container(COSMOS_DB_CONTAINER_ID);

export async function GET() {
  const { resources } = await container.items
    .query('SELECT * FROM my_table')
    .fetchAll();

  return Response.json(resources);
}
```


---

[View full sitemap](/docs/sitemap)
