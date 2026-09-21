---
title: Connect to Microsoft Azure
product: vercel
url: /docs/oidc/azure
canonical_url: "https://vercel.com/docs/oidc/azure"
last_updated: 2026-09-16
type: how-to
prerequisites:
  - /docs/oidc
related:
  - /docs/integrations/external-platforms/azure
  - /docs/environment-variables
  - /docs/functions/quickstart
summary: "Learn how to configure your Microsoft Azure account to trust Vercel's OpenID Connect (OIDC) Identity Provider (IdP)."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/oidc/azure.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "be591318401ff1a297e21bceb41d46f32392f7824a8db88ac9956b199b5ec765"
---

# Connect to Microsoft Azure

> **🔒 Permissions Required**: Secure backend access with OIDC federation

Connect your Vercel deployments to Microsoft Azure without storing long-lived credentials. Microsoft Entra ID trusts Vercel's OIDC Identity Provider (IdP) and exchanges the token Vercel issues for a short-lived Entra ID access token.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Enhancing security of backend connectivity with OpenID Connect](https://vercel.com/blog/enhancing-security-of-backend-connectivity-with-openid-connect?from=related&source_path=%2Fdocs%2Foidc%2Fazure&source_site=vercel-docs&relationship=related)
- [Migrate self-hosted Next.js and containers from AWS to Vercel](https://vercel.com/kb/guide/migrate-containers-from-aws-to-vercel?from=related&source_path=%2Fdocs%2Foidc%2Fazure&source_site=vercel-docs&relationship=related) — Migrate containers from AWS to Vercel: deploy with Dockerfile.vercel, keep RDS, S3, and SQS in AWS over OIDC, and cut ov
- [Connect to Amazon Web Services \\(AWS\\)](https://vercel.com/docs/oidc/aws?from=related&source_path=%2Fdocs%2Foidc%2Fazure&source_site=vercel-docs&relationship=related) — Learn how to configure your AWS account to trust Vercel's OpenID Connect \\(OIDC\\) Identity Provider \\(IdP\\).
- [Connect to your own API](https://vercel.com/docs/oidc/api?from=related&source_path=%2Fdocs%2Foidc%2Fazure&source_site=vercel-docs&relationship=related) — Learn how to configure your own API to trust Vercel's OpenID Connect \\(OIDC\\) Identity Provider \\(IdP\\)
- [Connect to Google Cloud Platform \\(GCP\\)](https://vercel.com/docs/oidc/gcp?from=related&source_path=%2Fdocs%2Foidc%2Fazure&source_site=vercel-docs&relationship=related) — Learn how to configure your GCP project to trust Vercel's OpenID Connect \\(OIDC\\) Identity Provider \\(IdP\\).
- [Authentication](https://vercel.com/docs/connect/concepts/authentication?from=related&source_path=%2Fdocs%2Foidc%2Fazure&source_site=vercel-docs&relationship=related) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V
- [OIDC Federation Reference](https://vercel.com/docs/oidc/reference?from=related&source_path=%2Fdocs%2Foidc%2Fazure&source_site=vercel-docs&relationship=related) — Review helper libraries to help you connect with your backend and understand the structure of an OIDC token.

Full cross-link map for this page: [/docs/oidc/azure.graph.md](/docs/oidc/azure.graph.md?from=related&source_path=%2Fdocs%2Foidc%2Fazure&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

To understand how Azure supports OIDC through Workload Identity Federation, consult the [Azure documentation](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation).

## Which Azure services you can reach

OIDC federation works with any endpoint that accepts a Microsoft Entra ID access token. This includes managed Azure services:

- **Databases and storage**: Azure Cosmos DB, Azure SQL Database, Azure Storage (Blob, Queue, Table, and Data Lake), Azure Managed Redis, and Azure Cache for Redis
- **Messaging and eventing**: Azure Event Hubs, Azure Service Bus, and Azure Event Grid
- **Security**: Azure Key Vault and Azure App Configuration
- **AI**: Azure AI Foundry and Azure AI Search

It also includes APIs you build and host yourself. If your API accepts Entra ID tokens, your Vercel deployment can call it with a federated credential regardless of where it runs: whether that's Azure Kubernetes Service (AKS), App Service, Container Apps, Azure Functions, or a virtual machine.

> **💡 Note:** OIDC federation covers identity, not network reachability. If your Azure resources reject public traffic or restrict access by IP address, see [Using Vercel with Microsoft Azure](/docs/integrations/external-platforms/azure#connect-to-azure-networks) for your network connectivity options.

## Configure your Azure account

- ### Register an application in Microsoft Entra ID
  - Navigate to **Microsoft Entra ID** in the [Azure portal](https://portal.azure.com)
  - Select **App registrations** and select **New registration**
  - Enter a **Name** for your own reference, such as `Vercel`, keep the default single-tenant option, and select **Register**
  - From the app registration's **Overview** page, copy the **Application (client) ID** and the **Directory (tenant) ID**. You'll add both to your Vercel project as [environment variables](/docs/environment-variables#creating-environment-variables)
  Registering an application creates a service principal in your tenant. That service principal is the identity your Vercel deployments act as, and you never need to create a client secret for it.

- ### Create a Federated Credential
  - From your app registration, go to **Certificates & secrets**, open the **Federated credentials** tab, and select **Add credential**
  - In the **Federated credential scenario** field select **Other**
  - Enter the **Issuer URL**, the URL will depend on the issuer mode setting:
    - **Team**: `https://oidc.vercel.com/[TEAM_SLUG]`, replacing `[TEAM_SLUG]` with the path from your Vercel team URL
    - **Global**: `https://oidc.vercel.com`
  - In the **Subject identifier** field use: `owner:[TEAM_SLUG]:project:[PROJECT_NAME]:environment:[preview | production | development]`
    - Replace `[TEAM_SLUG]` with your team identifier from the Vercel's team URL
    - Replace `[PROJECT_NAME]` with your [project's name](https://vercel.com/docs/projects#project-name) in your
      [project's settings](https://vercel.com/docs/projects#project-settings)
  - In the **Name** field, use a name for your own reference such as: `[Project name] - [Environment]`
  - In the **Audience** field, you have two options:
    - **Default**: Enter `https://vercel.com/[TEAM_SLUG]`, replacing `[TEAM_SLUG]` with your team identifier from the Vercel team URL
    - **Recommended**: Enter `api://AzureADTokenExchange`. When using this value, you must also pass a matching `audience` in your code. See the [custom audience section](#custom-audience) below
  > **💡 Note:** Azure does not allow for partial claim conditions so you must specify the `Subject` and `Audience` fields exactly. However, it is possible to create multiple federated credentials on the same app registration to allow for the various `sub` claims.

- ### Grant access to the Azure service
  To connect to the Azure service that you would like to use, grant your service principal access to it. How you do that depends on the service:
  - **Azure RBAC**: for services such as Azure Storage, Azure Key Vault, and Azure Service Bus, assign a built-in role to the service principal on the resource, such as `Storage Blob Data Contributor` or `Key Vault Secrets User`
  - **Azure Cosmos DB**: assign a data plane role definition to the service principal with the Azure CLI, as explained in the [Azure Cosmos DB documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/security/how-to-grant-data-plane-role-based-access)
  - **Azure SQL Database**: create a contained database user for the app registration with `CREATE USER [your_app_registration_name] FROM EXTERNAL PROVIDER`, then grant it the database roles it needs. See the [Azure SQL documentation](https://learn.microsoft.com/en-us/azure/azure-sql/database/authentication-aad-service-principal)
  - **Your own API**: expose an app role or scope on the API's app registration, assign it to your Vercel app registration, and validate the resulting token in your API
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

In the following example, you create a [Vercel function](/docs/functions/quickstart#create-a-vercel-function) in a Vercel project where you have [defined Azure account environment variables](/docs/environment-variables#creating-environment-variables). The function will connect to Azure using OIDC and use a specific resource that you have granted the service principal access to.

`ClientAssertionCredential` from `@azure/identity` accepts the Vercel OIDC token as a client assertion, so the same pattern works with every Azure SDK client that takes a credential.

### Query an Azure Cosmos DB instance

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

In the API route for this function, use the following code to perform a database `SELECT` query from an Azure Cosmos DB instance:

```ts filename="/api/azure-cosmosdb/route.ts"
import { ClientAssertionCredential } from '@azure/identity';
import * as cosmos from '@azure/cosmos';
import { getVercelOidcToken } from '@vercel/oidc';

/**
 * The Microsoft Entra ID tenant (directory) ID.
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

### Query an Azure Cosmos DB instance with custom audience

This example uses Azure's recommended `api://AzureADTokenExchange` audience:

```ts filename="/api/azure-cosmosdb/route.ts"
import { ClientAssertionCredential } from '@azure/identity';
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

### Read a secret from Azure Key Vault

Install the following packages:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @azure/identity @azure/keyvault-secrets @vercel/oidc
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @azure/identity @azure/keyvault-secrets @vercel/oidc
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @azure/identity @azure/keyvault-secrets @vercel/oidc
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @azure/identity @azure/keyvault-secrets @vercel/oidc
    ```
  </Code>
</CodeBlock>

```ts filename="/api/azure-key-vault/route.ts"
import { ClientAssertionCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import { getVercelOidcToken } from '@vercel/oidc';

const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID!;
const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID!;
const KEY_VAULT_URL = process.env.KEY_VAULT_URL!;

const tokenCredentials = new ClientAssertionCredential(
  AZURE_TENANT_ID,
  AZURE_CLIENT_ID,
  () => getVercelOidcToken({ audience: 'api://AzureADTokenExchange' }),
);

const secretClient = new SecretClient(KEY_VAULT_URL, tokenCredentials);

export async function GET() {
  const secret = await secretClient.getSecret('your_secret_name_here');

  return Response.json({ value: secret.value });
}
```

### Call your own API protected with Entra ID

To call an API you host yourself, request an access token scoped to that API and send it as a bearer token. This works wherever the API runs, including AKS, App Service, Container Apps, or a VM.

Before your code can request the token, expose an app role on the API's own app registration and assign that role to the app registration you created for Vercel, as described in [Grant access to the Azure service](#grant-access-to-the-azure-service).

Install the following packages:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @azure/identity @vercel/oidc
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @azure/identity @vercel/oidc
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @azure/identity @vercel/oidc
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @azure/identity @vercel/oidc
    ```
  </Code>
</CodeBlock>

```ts filename="/api/azure-backend/route.ts"
import { ClientAssertionCredential } from '@azure/identity';
import { getVercelOidcToken } from '@vercel/oidc';

const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID!;
const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID!;

/**
 * The Application ID URI of your API's app registration,
 * such as api://your_api_client_id_here
 * Added to environment variables
 */
const API_APP_ID_URI = process.env.API_APP_ID_URI!;
const API_BASE_URL = process.env.API_BASE_URL!;

const tokenCredentials = new ClientAssertionCredential(
  AZURE_TENANT_ID,
  AZURE_CLIENT_ID,
  () => getVercelOidcToken({ audience: 'api://AzureADTokenExchange' }),
);

export async function GET() {
  const { token } = await tokenCredentials.getToken(
    `${API_APP_ID_URI}/.default`,
  );

  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    return new Response('Request to the backend API failed', { status: 502 });
  }

  return Response.json(await response.json());
}
```

Two different audiences are in play.\
First, `api://AzureADTokenExchange` is the audience of the Vercel OIDC token, which Entra ID checks when it exchanges your federated credential.\
Second, the `.default` scope built from your API's Application ID URI sets the `aud` claim of the access token that your API receives, which is the value your API validates.

The credential caches the access token and refreshes it before expiry, so calling `getToken` on every request does not trigger a new token exchange each time.


---

[View full sitemap](/docs/sitemap)
