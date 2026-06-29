---
title: reference
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference"
last_updated: 2026-06-29
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/native-integration
  - /docs/integrations/marketplace-flows
  - /docs/integrations/webhooks
summary: Learn about reference on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "b8d61d8becb7dc546a9f4773b313e22624f61d173f7ce93cd478b0e085051619"
---

# Vercel Marketplace REST API

Learn how to authenticate and use the Marketplace API to set up your integration server for the base URL.

## How it works

When a customer uses your integration, the following two APIs are used for interaction and communication between the user, Vercel and the provider integration:

- Vercel calls the provider API
- The provider calls the Vercel API

Review [Native Integration Concepts](/docs/integrations/create-integration/native-integration) and [Native Integration Flows](/docs/integrations/marketplace-flows) to learn more.

**Note:** If an endpoint is marked as **deprecated**, it will remain in the specification for a period of time, after which it will be removed. The description on the endpoint will include how to migrate and use other endpoints for the same functionality.

## Authentication

The Marketplace API uses two types of authentication depending on which API you are calling:

### Partner API Authentication

**User Authentication**: 
This authentication uses the [OpenID Connect Protocol (OIDC)](https://auth0.com/docs/authenticate/protocols/openid-connect-protocol). Vercel sends a JSON web token (JWT) signed with Vercel’s private key and verifiable using Vercel’s public [JSON Web Key Sets](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets) (JWKS) available [here](https://marketplace.vercel.com/.well-known/jwks).

User Auth OIDC token claims schema:

```json type=jsonschema
{
  "type": "object",
  "properties": {
    "iss": {
      "type": "string",
      "enum": [
        "https://marketplace.vercel.com"
      ]
    },
    "aud": {
      "type": "string",
      "description": "The integration ID. Example: \"oac_9f4YG9JFjgKkRlxoaaGG0y05\""
    },
    "type": {
      "type": "string",
      "enum": [
        "access_token",
        "id_token"
      ],
      "description": "The type of the token: id_token or access_token."
    },
    "account_id": {
      "type": "string"
    },
    "sub": {
      "type": "string",
      "description": "Denotes the User who is making the change (matches `/^account:[0-9a-fA-F]+:user:[0-9a-fA-F]+$/`)"
    },
    "installation_id": {
      "type": "string",
      "description": "The ID of the installation. Example: \"icfg_9bceb8ccT32d3U417ezb5c8p\""
    },
    "user_id": {
      "type": "string"
    },
    "user_role": {
      "type": "string",
      "enum": [
        "ADMIN",
        "USER"
      ],
      "description": "The `ADMIN` role, by default, is provided to users capable of installing integrations, while the `USER` role can be granted to Vercel users with the Vercel `Billing` or Vercel `Viewer` role, which are considered to be Read-Only roles."
    },
    "user_email": {
      "type": "string",
      "description": "The user's verified email address. This is included for all Marketplace integrations by default."
    },
    "user_name": {
      "type": "string",
      "description": "The user's real name"
    },
    "user_avatar_url": {
      "type": "string",
      "description": "The user's public avatar URL"
    }
  },
  "required": [
    "iss",
    "aud",
    "account_id",
    "sub",
    "installation_id",
    "user_id",
    "user_role"
  ],
  "additionalProperties": false
}
```


**System Authentication**: 
This authentication uses the [OpenID Connect Protocol (OIDC)](https://auth0.com/docs/authenticate/protocols/openid-connect-protocol). Vercel sends a JSON web token (JWT) signed with Vercel’s private key and verifiable using Vercel’s public [JSON Web Key Sets](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets) (JWKS) available [here](https://marketplace.vercel.com/.well-known/jwks).

System Auth OIDC token claims schema:

```json type=jsonschema
{
  "type": "object",
  "properties": {
    "iss": {
      "type": "string",
      "enum": [
        "https://marketplace.vercel.com"
      ]
    },
    "sub": {
      "type": "string",
      "description": "Denotes the Account (or Team) who is making the change (matches `/^account:[0-9a-fA-F]+$/`), possibly null"
    },
    "aud": {
      "type": "string",
      "description": "The integration ID. Example: \"oac_9f4YG9JFjgKkRlxoaaGG0y05\""
    },
    "type": {
      "type": "string",
      "enum": [
        "access_token",
        "id_token"
      ],
      "description": "The type of the token: id_token or access_token."
    },
    "installation_id": {
      "type": "string",
      "nullable": true,
      "description": "The ID of the installation. Example: \"icfg_9bceb8ccT32d3U417ezb5c8p\""
    },
    "account_id": {
      "type": "string"
    }
  },
  "required": [
    "iss",
    "sub",
    "aud",
    "installation_id",
    "account_id"
  ],
  "additionalProperties": false
}
```


### Vercel API Authentication

**bearerToken**: Default authentication mechanism

## Vercel Marketplace Partner API

### Installations

API related to Installation operations

#### Get Installation

`GET /v1/installations/{installationId}`

**Description:** Get an installation

**Parameters:**

- `installationId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)

**Responses:**

- **200**: The installation
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`

---

#### Upsert Installation

`PUT /v1/installations/{installationId}`

**Description:** Create or update an installation

**Parameters:**

- `installationId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)
- `Idempotency-Key` (header): A unique key to identify a request across multiple retries

**Request Body:**

Content-Type: `application/json`

- `scopes` (required): array
- `acceptedPolicies` (required): object - Policies accepted by the customer. Example: { "toc": "2024-02-28T10:00:00Z" }
- `credentials` (required): object - The service-account access token to access marketplace and integration APIs on behalf of a customer's installation.
- `account` (required): object - The account information for this installation. Use Get Account Info API to re-fetch this data post installation.

**Responses:**

- **200**: The installation was created successfully
  - Content-Type: `application/json`
- **204**: The installation was created successfully
- **400**: Input has failed validation
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`

---

#### Update Installation

`PATCH /v1/installations/{installationId}`

**Description:** Update an installation

**Parameters:**

- `installationId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)
- `Idempotency-Key` (header): A unique key to identify a request across multiple retries

**Request Body:**

Content-Type: `application/json`

- `billingPlanId`: string - Partner-provided billing plan. Example: "pro200"

**Responses:**

- **200**: The installation was updated successfully
  - Content-Type: `application/json`
- **204**: The installation was updated successfully
- **400**: Input has failed validation
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`

---

#### Delete Installation

`DELETE /v1/installations/{installationId}`

**Description:** Deletes the Installation. The final deletion is postponed for 24 hours to allow for sending of final invoices. You can request immediate deletion by specifying {finalized:true} in the response.

**Parameters:**

- `installationId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)
- `Idempotency-Key` (header): A unique key to identify a request across multiple retries

**Request Body:**

Content-Type: `application/json`

- `cascadeResourceDeletion`: boolean - Whether to delete the installation's resources along with the installation
- `reason`: string - The reason for deleting the installation

**Responses:**

- **200**: Installation deleted successfully
  - Content-Type: `application/json`
- **204**: Installation deleted successfully
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`

---

### Resources

API related to Resource operations

#### Provision Resource

`POST /v1/installations/{installationId}/resources`

**Description:** Provisions a Resource. This is a synchronous operation but the provisioning can be asynchronous as the Resource does not need to be immediately available however the secrets must be known ahead of time.

**Parameters:**

- `installationId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)
- `Idempotency-Key` (header): A unique key to identify a request across multiple retries

**Request Body:**

Content-Type: `application/json`

- `productId` (required): string - The partner-specific ID/slug of the product. Example: "redis"
- `name` (required): string - User-inputted name for the resource.
- `metadata` (required): object - User-inputted metadata based on the registered metadata schema.
- `billingPlanId` (required): string - Partner-provided billing plan. Example: "pro200"
- `externalId`: string - An partner-provided identifier used to indicate the source of the resource provisioning. In the Deploy Button flow, the `externalId` will equal the `external-id` query parameter.
- `protocolSettings`: object

**Responses:**

- **200**: Return the newly provisioned resource
  - Content-Type: `application/json`
- **400**: Input has failed validation
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`

---

#### Get Resource

`GET /v1/installations/{installationId}/resources/{resourceId}`

**Description:** Get a Resource

**Parameters:**

- `installationId` (path) (required)
- `resourceId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)

**Responses:**

- **200**: Return the resource
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`

---

#### Update Resource

`PATCH /v1/installations/{installationId}/resources/{resourceId}`

**Description:** Updates a resource

**Parameters:**

- `installationId` (path) (required)
- `resourceId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)
- `Idempotency-Key` (header): A unique key to identify a request across multiple retries

**Request Body:**

Content-Type: `application/json`

- `name`: string - User-inputted name for the resource.
- `metadata`: object - User-inputted metadata based on the registered metadata schema.
- `billingPlanId`: string - Partner-provided billing plan. Example: "pro200"
- `status`: string - Deprecated
- `protocolSettings`: object

**Responses:**

- **200**: Return the updated resource
  - Content-Type: `application/json`
- **400**: Input has failed validation
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`

---

#### Delete Resource

`DELETE /v1/installations/{installationId}/resources/{resourceId}`

**Description:** Uninstalls and de-provisions a Resource

**Parameters:**

- `installationId` (path) (required)
- `resourceId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)
- `Idempotency-Key` (header): A unique key to identify a request across multiple retries

**Responses:**

- **204**: Resource deleted successfully
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`

---

#### Request Secrets Rotation

`POST /v1/installations/{installationId}/resources/{resourceId}/secrets/rotate`

**Description:** Request rotation of secrets for a specific resource

**Parameters:**

- `installationId` (path) (required)
- `resourceId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)
- `Idempotency-Key` (header): A unique key to identify a request across multiple retries

**Request Body:**

Content-Type: `application/json`

- `reason`: string - Optional reason for the secrets rotation request.
- `delayOldSecretsExpirationHours`: number - Delay in hours before old secrets expire after rotation. The value can be fractional.

**Responses:**

- **200**: Return the secrets rotation result
  - Content-Type: `application/json`
- **400**: Input has failed validation
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`

---

#### Resource REPL

`POST /v1/installations/{installationId}/resources/{resourceId}/repl`

**Description:** The REPL is a command-line interface on the Store Details page that allows customers to directly interact with their resource. This endpoint is used to run commands on a specific resource.

**Parameters:**

- `installationId` (path) (required)
- `resourceId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)
- `Idempotency-Key` (header): A unique key to identify a request across multiple retries

**Request Body:**

Content-Type: `application/json`

- `input` (required): string
- `readOnly`: boolean

**Responses:**

- **200**: Return result of running REPL command
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`

---

### Billing

API related to Billing operations

#### List Billing Plans For Product

`GET /v1/products/{productSlug}/plans`

**Description:** Vercel sends a request to the partner to return quotes for different billing plans for a specific Product.

Note: You can have this request triggered by Vercel before the integration is installed when the Product is created for the first time. In this case, OIDC will be incomplete and will not contain an account ID.

**Parameters:**

- `productSlug` (path) (required)
- `metadata` (query)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)

**Responses:**

- **200**: Return a list of billing plans
  - Content-Type: `application/json`
- **400**: Input has failed validation
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`

---

#### List Billing Plans For Resource

`GET /v1/installations/{installationId}/resources/{resourceId}/plans`

**Description:** Returns the set of billing plans available to a specific Resource

**Parameters:**

- `installationId` (path) (required)
- `resourceId` (path) (required)
- `metadata` (query)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)

**Responses:**

- **200**: Return a list of billing plans for a resource
  - Content-Type: `application/json`
- **400**: Input has failed validation
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`

---

#### List Billing Plans For Installation

`GET /v1/installations/{installationId}/plans`

**Description:** Returns the set of billing plans available to a specific Installation

**Parameters:**

- `installationId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)

**Responses:**

- **200**: Return a list of billing plans for an installation
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`

---

#### Provision Purchase

`POST /v1/installations/{installationId}/billing/provision`

**Description:** Optional endpoint, only required if your integration supports billing plans with type `prepayment`.

**Parameters:**

- `installationId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)
- `Idempotency-Key` (header): A unique key to identify a request across multiple retries

**Request Body:**

Content-Type: `application/json`

- `invoiceId` (required): string - ID of the invoice in Vercel proving the purchase of credits

**Responses:**

- **200**: Return a timestamp alongside a list of balances for the installation with the most up-to-date values
  - Content-Type: `application/json`
- **400**: Input has failed validation
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`
- **422**: Operation is well-formed, but cannot be executed due to semantic errors
  - Content-Type: `application/json`

---

### Transfers

API related to Transfer operations

#### Create Resources Transfer Request

`POST /v1/installations/{installationId}/resource-transfer-requests`

**Description:** Prepares to transfer resources from the current installation to a new one. The target installation to transfer resources to will not be known until the verify & accept steps.

**Parameters:**

- `installationId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)
- `Idempotency-Key` (header): A unique key to identify a request across multiple retries

**Request Body:**

The installation ID parameter is the source installation ID which owns the resources to be transferred.

Content-Type: `application/json`

- `resourceIds` (required): array - The IDs of the resources owned by the source installation that will be transferred to the target installation.
- `expiresAt` (required): number - The timestamp in milliseconds when the transfer claim expires. After this time, the transfer cannot be claimed.

**Responses:**

- **200**: Claim created successfully
  - Content-Type: `application/json`
- **400**: Input has failed validation
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`
- **422**: Operation is well-formed, but cannot be executed due to semantic errors
  - Content-Type: `application/json`

---

#### Validate Resources Transfer Request

`GET /v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/verify`

**Description:** Vercel uses this endpoint to provide a potential target for the transfer, and to request any necessary information for prerequisite setup to support the resources in the target team upon completion of the transfer. Multiple sources/teams may verify the same transfer. Only transfers that haven't been completed can be verified.

**Important:** The installation ID in the URL is the target installation ID, not the source one.

**Parameters:**

- `installationId` (path) (required)
- `providerClaimId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)

**Responses:**

- **200**: Transfer request verified successfully
  - Content-Type: `application/json`
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **404**: Entity not found
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`
- **422**: Operation is well-formed, but cannot be executed due to semantic errors
  - Content-Type: `application/json`

---

#### Accept Resources Transfer Request

`POST /v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/accept`

**Description:** Finish the transfer process, expects any work required to move the resources from one installation to another on the provider's side is or will be completed successfully. Upon a successful response, the resource in Vercel will be moved to the target installation as well, maintaining its project connection. While the transfer is being completed, no other request to complete the same transfer can be processed. After the transfer has been completed, it cannot be completed again, nor can it be verified.

**Important:** The installation ID in the URL is the target installation ID, not the source one.

**Parameters:**

- `installationId` (path) (required)
- `providerClaimId` (path) (required)
- `X-Vercel-Auth` (header): The auth style used in the request (system, user, etc)
- `Idempotency-Key` (header): A unique key to identify a request across multiple retries

**Responses:**

- **204**: Transfer completed successfully
- **403**: Operation failed because the authentication is not allowed to perform this operation
  - Content-Type: `application/json`
- **404**: Entity not found
  - Content-Type: `application/json`
- **409**: Operation failed because of a conflict with the current state of the resource
  - Content-Type: `application/json`
- **422**: Operation is well-formed, but cannot be executed due to semantic errors
  - Content-Type: `application/json`

---

## Vercel API

### marketplace

#### Update Installation

`PATCH /v1/installations/{integrationConfigurationId}`

**Description:** This endpoint updates an integration installation.

**Parameters:**

- `integrationConfigurationId` (path) (required)

**Request Body:**

Content-Type: `application/json`

- `status`: string
- `externalId`: string
- `billingPlan`: object
- `notification` - A notification to display to your customer. Send `null` to clear the current notification.

**Responses:**

- **204**: Success
- **400**: One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Get Account Information

`GET /v1/installations/{integrationConfigurationId}/account`

**Description:** Fetches the best account or user’s contact info

**Parameters:**

- `integrationConfigurationId` (path) (required)

**Responses:**

- **200**: Success
  - Content-Type: `application/json`
- **400**: One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Get Member Information

`GET /v1/installations/{integrationConfigurationId}/member/{memberId}`

**Description:** Returns the member role and other information for a given member ID ("user_id" claim in the SSO OIDC token).

**Parameters:**

- `integrationConfigurationId` (path) (required)
- `memberId` (path) (required)

**Responses:**

- **200**: Success
  - Content-Type: `application/json`
- **400**: One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Create Event

`POST /v1/installations/{integrationConfigurationId}/events`

**Description:** Partner notifies Vercel of any changes made to an Installation or a Resource. Vercel is expected to use `list-resources` and other read APIs to get the new state.<br/> <br/> `resource.updated` event should be dispatched when any state of a resource linked to Vercel is modified by the partner.<br/> `installation.updated` event should be dispatched when an installation's billing plan is changed via the provider instead of Vercel.<br/> <br/> Resource update use cases: <br/> <br/> - The user renames a database in the partner’s application. The partner should dispatch a `resource.updated` event to notify Vercel to update the resource in Vercel’s datastores.<br/> - A resource has been suspended due to a lack of use. The partner should dispatch a `resource.updated` event to notify Vercel to update the resource's status in Vercel's datastores.<br/>

**Parameters:**

- `integrationConfigurationId` (path) (required)

**Request Body:**

Content-Type: `application/json`

- `event` (required)

**Responses:**

- **201**: Success
- **400**: One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Get Integration Resources

`GET /v1/installations/{integrationConfigurationId}/resources`

**Description:** Get all resources for a given installation ID.

**Parameters:**

- `integrationConfigurationId` (path) (required)

**Responses:**

- **200**: Success
  - Content-Type: `application/json`
- **400**: One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Get Integration Resource

`GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}`

**Description:** Get a resource by its partner ID.

**Parameters:**

- `integrationConfigurationId` (path) (required): The ID of the integration configuration (installation) the resource belongs to
- `resourceId` (path) (required): The ID provided by the 3rd party provider for the given resource

**Responses:**

- **200**: Success
  - Content-Type: `application/json`
- **400**: One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Import Resource

`PUT /v1/installations/{integrationConfigurationId}/resources/{resourceId}`

**Description:** This endpoint imports (upserts) a resource to Vercel's installation. This may be needed if resources can be independently created on the partner's side and need to be synchronized to Vercel. When importing as part of the user-initiated import flow, call this endpoint before redirecting the user back to Vercel. See the [Import existing resources flow](https://vercel.com/docs/integrations/create-integration/marketplace-flows#import-existing-resources-flow) for the full contract.

**Parameters:**

- `integrationConfigurationId` (path) (required)
- `resourceId` (path) (required)

**Request Body:**

Content-Type: `application/json`

- `ownership`: string
- `productId` (required): string
- `name` (required): string
- `status` (required): string
- `metadata`: object
- `billingPlan`: object
- `notification`: object
- `extras`: object
- `secrets`: array

**Responses:**

- **200**: Success
  - Content-Type: `application/json`
- **400**: One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success
- **409**: Success
- **422**: Success
- **429**: Success

---

#### Update Resource

`PATCH /v1/installations/{integrationConfigurationId}/resources/{resourceId}`

**Description:** This endpoint updates an existing resource in the installation. All parameters are optional, allowing partial updates.

**Parameters:**

- `integrationConfigurationId` (path) (required)
- `resourceId` (path) (required)

**Request Body:**

Content-Type: `application/json`

- `ownership`: string
- `name`: string
- `status`: string
- `metadata`: object
- `billingPlan`: object
- `notification`
- `extras`: object
- `secrets`

**Responses:**

- **200**: Success
  - Content-Type: `application/json`
- **400**: One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success
- **409**: Success
- **422**: Success

---

#### Delete Integration Resource

`DELETE /v1/installations/{integrationConfigurationId}/resources/{resourceId}`

**Description:** Delete a resource owned by the selected installation ID.

**Parameters:**

- `integrationConfigurationId` (path) (required)
- `resourceId` (path) (required)

**Responses:**

- **204**: Success
- **400**: One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Submit Billing Data

`POST /v1/installations/{integrationConfigurationId}/billing`

**Description:** Sends the billing and usage data. The partner should do this at least once a day and ideally once per hour. <br/> Use the `credentials.access_token` we provided in the [Upsert Installation](#upsert-installation) body to authorize this request.

**Parameters:**

- `integrationConfigurationId` (path) (required)

**Request Body:**

Content-Type: `application/json`

- `timestamp` (required): string - Server time of your integration, used to determine the most recent data for race conditions & updates. Only the latest usage data for a given day, week, and month will be kept.
- `eod` (required): string - End of Day, the UTC datetime for when the end of the billing/usage day is in UTC time. This tells us which day the usage data is for, and also allows for your "end of day" to be different from UTC 00:00:00. eod must be within the period dates, and cannot be older than 24h earlier from our server's current time.
- `period` (required): object - Period for the billing cycle. The period end date cannot be older than 24 hours earlier than our current server's time.
- `billing` (required) - Billing data (interim invoicing data).
- `usage` (required): array

**Responses:**

- **201**: Success
- **400**: One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Submit Invoice

`POST /v1/installations/{integrationConfigurationId}/billing/invoices`

**Description:** This endpoint allows the partner to submit an invoice to Vercel. The invoice is created in Vercel's billing system and sent to the customer. Depending on the type of billing plan, the invoice can be sent at a time of signup, at the start of the billing period, or at the end of the billing period.<br/> <br/> Use the `credentials.access_token` we provided in the [Upsert Installation](#upsert-installation) body to authorize this request. <br/> There are several limitations to the invoice submission:<br/> <br/> 1. A resource can only be billed once per the billing period and the billing plan.<br/> 2. The billing plan used to bill the resource must have been active for this resource during the billing period.<br/> 3. The billing plan used must be a subscription plan.<br/> 4. The interim usage data must be sent hourly for all types of subscriptions. See [Send subscription billing and usage data](#send-subscription-billing-and-usage-data) API on how to send interim billing and usage data.<br/> 5. If provided, `externalId` must be unique for the installation.<br/>

**Parameters:**

- `integrationConfigurationId` (path) (required)

**Request Body:**

Content-Type: `application/json`

- `externalId`: string - Partner-provided invoice identifier. If provided, it must be unique for this installation.
- `invoiceDate` (required): string - Invoice date. Must be within the period's start and end.
- `memo`: string - Additional memo for the invoice.
- `period` (required): object - Subscription period for this billing cycle.
- `items` (required): array
- `discounts`: array
- `final`: boolean - Set this to `true` if this is the final invoice for the installation. Can only be set when the installation is pending deletion.
- `test`: object - Test mode

**Responses:**

- **200**: Success
  - Content-Type: `application/json`
- **400**: One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success
- **409**: Success

---

#### Finalize Installation

`POST /v1/installations/{integrationConfigurationId}/billing/finalize`

**Description:** This endpoint allows the partner to mark an installation as finalized. This means you will not send any more invoices for the installation. Use this after a customer has requested uninstall and you have sent any remaining invoices. This will allow the uninstall process to proceed immediately after all invoices have been paid. <br/> Use the `credentials.access_token` we provided in the [Upsert Installation](#upsert-installation) body to authorize this request.

**Parameters:**

- `integrationConfigurationId` (path) (required)

**Responses:**

- **204**: Success
- **400**: One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Get Invoice

`GET /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}`

**Description:** Get Invoice details and status for a given invoice ID.<br/> <br/> See [Billing Events with Webhooks documentation](https://vercel.com/docs/integrations/create-integration/marketplace-api#working-with-billing-events-through-webhooks) on how to receive invoice events. This endpoint is used to retrieve the invoice details.

**Parameters:**

- `integrationConfigurationId` (path) (required)
- `invoiceId` (path) (required)

**Responses:**

- **200**: Success
  - Content-Type: `application/json`
- **400**: One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Invoice Actions

`POST /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}/actions`

**Description:** This endpoint allows the partner to request a refund for an invoice to Vercel. The invoice is created using the [Submit Invoice API](#submit-invoice-api).

**Parameters:**

- `integrationConfigurationId` (path) (required)
- `invoiceId` (path) (required)

**Request Body:**

Content-Type: `application/json`

**Responses:**

- **204**: Success
- **400**: One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success
- **409**: Success

---

#### Submit Prepayment Balances

`POST /v1/installations/{integrationConfigurationId}/billing/balance`

**Description:** Sends the prepayment balances. The partner should do this at least once a day and ideally once per hour. <br/> Use the `credentials.access_token` we provided in the [Upsert Installation](#upsert-installation) body to authorize this request.

**Parameters:**

- `integrationConfigurationId` (path) (required)

**Request Body:**

Content-Type: `application/json`

- `timestamp` (required): string - Server time of your integration, used to determine the most recent data for race conditions & updates. Only the latest usage data for a given day, week, and month will be kept.
- `balances` (required): array

**Responses:**

- **201**: Success
- **400**: One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Update Resource Secrets

`PUT /v1/installations/{integrationConfigurationId}/resources/{resourceId}/secrets`

**Description:** This endpoint updates the secrets of a resource. If a resource has projects connected, the connected secrets are updated with the new secrets. The old secrets may still be used by existing connected projects because they are not automatically redeployed. Redeployment is a manual action and must be completed by the user. All new project connections will use the new secrets.<br/> <br/> Use cases for this endpoint:<br/> <br/> - Resetting the credentials of a database in the partner. If the user requests the credentials to be updated in the partner’s application, the partner post the new set of secrets to Vercel, the user should redeploy their application and the expire the old credentials.<br/>

**Parameters:**

- `integrationConfigurationId` (path) (required)
- `resourceId` (path) (required)

**Request Body:**

Content-Type: `application/json`

- `secrets` (required): array
- `partial`: boolean - If true, will only overwrite the provided secrets instead of replacing all secrets.

**Responses:**

- **201**: Success
- **400**: One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success
- **409**: Success
- **422**: Success

---

#### SSO Token Exchange

`POST /v1/integrations/sso/token`

**Description:** During the autorization process, Vercel sends the user to the provider [redirectLoginUrl](https://vercel.com/docs/integrations/create-integration/submit-integration#redirect-login-url), that includes the OAuth authorization `code` parameter. The provider then calls the SSO Token Exchange endpoint with the sent code and receives the OIDC token. They log the user in based on this token and redirects the user back to the Vercel account using deep-link parameters included the redirectLoginUrl. Providers should not persist the returned `id_token` in a database since the token will expire. See [**Authentication with SSO**](https://vercel.com/docs/integrations/create-integration/marketplace-api#authentication-with-sso) for more details.

**Request Body:**

Content-Type: `application/json`

**Responses:**

- **200**: Success
  - Content-Type: `application/json`
- **400**: One of the provided values in the request body is invalid.
- **403**: Success
- **500**: Success

---

#### Create one or multiple experimentation items

`POST /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items`

**Description:** Create one or multiple experimentation items

**Parameters:**

- `integrationConfigurationId` (path) (required)
- `resourceId` (path) (required)

**Request Body:**

Content-Type: `application/json`

- `items` (required): array

**Responses:**

- **204**: The items were created
- **400**: One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Patch an existing experimentation item

`PATCH /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items/{itemId}`

**Description:** Patch an existing experimentation item

**Parameters:**

- `integrationConfigurationId` (path) (required)
- `resourceId` (path) (required)
- `itemId` (path) (required)

**Request Body:**

Content-Type: `application/json`

- `slug` (required): string
- `origin` (required): string
- `name`: string
- `category`: string
- `description`: string
- `isArchived`: boolean
- `createdAt`: number
- `updatedAt`: number

**Responses:**

- **204**: The item was updated
- **400**: One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Delete an existing experimentation item

`DELETE /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items/{itemId}`

**Description:** Delete an existing experimentation item

**Parameters:**

- `integrationConfigurationId` (path) (required)
- `resourceId` (path) (required)
- `itemId` (path) (required)

**Responses:**

- **204**: The item was deleted
- **400**: One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Get the data of a user-provided Edge Config

`GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/edge-config`

**Description:** When the user enabled Edge Config syncing, then this endpoint can be used by the partner to fetch the contents of the Edge Config.

**Parameters:**

- `integrationConfigurationId` (path) (required)
- `resourceId` (path) (required)

**Responses:**

- **200**: The Edge Config data
  - Content-Type: `application/json`
- **304**: Success
- **400**: One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

#### Push data into a user-provided Edge Config

`PUT /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/edge-config`

**Description:** When the user enabled Edge Config syncing, then this endpoint can be used by the partner to push their configuration data into the relevant Edge Config.

**Parameters:**

- `integrationConfigurationId` (path) (required)
- `resourceId` (path) (required)

**Request Body:**

Content-Type: `application/json`

- `data` (required): object

**Responses:**

- **200**: The Edge Config was updated
  - Content-Type: `application/json`
- **400**: One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success
- **409**: Success
- **412**: Success

---

#### Get the data of a user-provided Edge Config

`HEAD /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/edge-config`

**Description:** When the user enabled Edge Config syncing, then this endpoint can be used by the partner to fetch the contents of the Edge Config.

**Parameters:**

- `integrationConfigurationId` (path) (required)
- `resourceId` (path) (required)

**Responses:**

- **200**: The Edge Config data
  - Content-Type: `application/json`
- **304**: Success
- **400**: One of the provided values in the request query is invalid.
- **401**: The request is not authorized.
- **403**: You do not have permission to access this resource.
- **404**: Success

---

### authentication

#### SSO Token Exchange

`POST /v1/integrations/sso/token`

**Description:** During the autorization process, Vercel sends the user to the provider [redirectLoginUrl](https://vercel.com/docs/integrations/create-integration/submit-integration#redirect-login-url), that includes the OAuth authorization `code` parameter. The provider then calls the SSO Token Exchange endpoint with the sent code and receives the OIDC token. They log the user in based on this token and redirects the user back to the Vercel account using deep-link parameters included the redirectLoginUrl. Providers should not persist the returned `id_token` in a database since the token will expire. See [**Authentication with SSO**](https://vercel.com/docs/integrations/create-integration/marketplace-api#authentication-with-sso) for more details.

**Request Body:**

Content-Type: `application/json`

**Responses:**

- **200**: Success
  - Content-Type: `application/json`
- **400**: One of the provided values in the request body is invalid.
- **403**: Success
- **500**: Success

---

## Webhooks

For information about webhooks, see the [Native Integration Webhooks](/docs/integrations/webhooks) documentation.

## Changelog

For the latest changes to the Marketplace API, refer to the main documentation page.



---

[View full sitemap](/docs/sitemap)
