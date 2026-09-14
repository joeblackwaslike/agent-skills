---
source: "https://cursor.com/docs/api/origin/openapi.yaml"
fetched_at: "2026-09-14T09:38:41.937Z"
sha256: "4d1aef16d438c0ab95debf7001b158d356f6ef61d6ba03b0984dd97a58aa7239"
---

# Generated with protoc-gen-openapi
# https://github.com/google/gnostic/tree/master/cmd/protoc-gen-openapi

openapi: 3.1.0
info:
    title: Cursor Origin API
    description: Public third-party-facing Origin API.
    version: v1alpha1
servers:
    - url: https://api.cursor.com
paths:
    /v1/origin/app:
        get:
            tags:
                - OriginService
            description: Returns metadata for the authenticated app.
            operationId: OriginService_GetAuthenticatedApp
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/App'
                            examples:
                                getAuthenticatedApp:
                                    value:
                                        id: app_01k2ja2000e0080000000000a1
                                        displayName: CI Status Bot
                                        webhookUrl: https://ci.acme.dev/webhooks/origin
                                        events:
                                            - pull_request.created
                                            - pull_request.merged
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                                        installationRedirectUris:
                                            - https://ci.acme.dev/origin/setup
                                        namespaceSlug: acme
                                        description: Posts CI status on pull requests.
                                        websiteUrl: https://ci.acme.dev
                                        defaultScopes:
                                            - repository:contents:read
                                            - repository:pull_requests:read
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The authenticated app no longer exists.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - app
                scopes:
                    - app:metadata:read
                ambient: true
    /v1/origin/app/installations:
        get:
            tags:
                - OriginService
            description: Lists installations for the authenticated app.
            operationId: OriginService_ListAppInstallations
            parameters:
                - name: pageSize
                  in: query
                  description: |-
                    Max installations to return. Defaults to 30 when unset or 0. Values
                     above 100 are clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListAppInstallationsResponse'
                            examples:
                                listAppInstallations:
                                    value:
                                        installations:
                                            - id: inst_01k2ja2000e0080000000000b2
                                              appId: app_01k2ja2000e0080000000000a1
                                              target:
                                                slug: acme
                                                id: ns_01k2ja2000e0080000000000p3
                                                type: team
                                              createdAt: "2026-08-01T09:30:00Z"
                                              updatedAt: "2026-08-02T14:45:00Z"
                                              repoSelectionMode: selected
                                              scopes:
                                                - repository:contents:read
                                                - repository:pull_requests:read
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - app
                scopes:
                    - app:metadata:read
                ambient: true
    /v1/origin/app/installations/{installationId}:
        get:
            tags:
                - OriginService
            description: Returns a single installation for the authenticated app.
            operationId: OriginService_GetAppInstallation
            parameters:
                - name: installationId
                  in: path
                  description: Installation identifier.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/AppInstallation'
                            examples:
                                getAppInstallation:
                                    value:
                                        id: inst_01k2ja2000e0080000000000b2
                                        appId: app_01k2ja2000e0080000000000a1
                                        target:
                                            slug: acme
                                            id: ns_01k2ja2000e0080000000000p3
                                            type: team
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                                        repoSelectionMode: selected
                                        scopes:
                                            - repository:contents:read
                                            - repository:pull_requests:read
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - app
                scopes:
                    - app:metadata:read
                ambient: true
        delete:
            tags:
                - OriginService
            description: Deletes an installation that belongs to the authenticated app.
            operationId: OriginService_DeleteAppInstallation
            parameters:
                - name: installationId
                  in: path
                  description: |-
                    The unique identifier of the installation to delete. Bound from the URL
                     path; the installation must belong to the authenticated app.
                  required: true
                  schema:
                    type: string
            responses:
                "204":
                    description: OK
                    content: {}
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - app
                scopes:
                    - app:metadata:write
                ambient: true
    /v1/origin/app/installations/{installationId}/access_tokens:
        post:
            tags:
                - OriginService
            description: |-
                Creates an installation access token for the authenticated app.

                 Requires app signing-JWT authentication, like GetAuthenticatedApp. The
                 token is scoped to the named installation, which must belong to the
                 authenticated app.
                 Callers may attenuate the token to a subset of the installation's accepted
                 scopes and accessible repositories.
            operationId: OriginService_CreateInstallationAccessToken
            parameters:
                - name: installationId
                  in: path
                  description: |-
                    The unique identifier of the installation to scope the token to. Bound from
                     the URL path; the installation must belong to the authenticated app.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                scopes:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        Scope strings to grant the token. Values must be unique and included in the
                                         installation's accepted scopes. Empty or omitted inherits the full scope grant.
                                repositoryIds:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        Repository IDs to grant the token. Values must be unique, accessible to the
                                         installation, and contain at most 50 entries. Empty or omitted inherits all
                                         accessible repositories.
                        examples:
                            createInstallationAccessToken:
                                value:
                                    scopes:
                                        - repository:contents:read
                                        - repository:pull_requests:read
                                    repositoryIds:
                                        - repo_01k2ja2000e0080000000000q4
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/InstallationAccessToken'
                            examples:
                                createInstallationAccessToken:
                                    value:
                                        token: oit_2v8xkq4m1c7p9t3w5y0z6r4b
                                        expiresAt: "2026-08-01T10:30:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - app
                scopes:
                    - app:metadata:read
                ambient: true
    /v1/origin/app/webhook/deliveries:
        get:
            tags:
                - OriginService
            description: |-
                Lists webhook deliveries for the authenticated app, newest first.

                 A delivery is one event owed to one app; its id is the `webhook-id`
                 header value the receiver sees. `delivered=false` is the recovery
                 predicate: every delivery the receiver has never acknowledged with a 2xx,
                 regardless of where retries stand.

                 Deliveries are listable for 7 days after creation, and only while the app
                 has an active installation in the delivery's namespace. App-targeted
                 lifecycle events (for example `installation.deleted`) stay visible after
                 the uninstall they describe.
            operationId: OriginService_ListWebhookDeliveries
            parameters:
                - name: delivered
                  in: query
                  description: |-
                    Compares against `delivered_at`. `delivered=false` is the recovery
                     predicate: it selects every delivery that has never received a 2xx,
                     including deliveries whose retry ladder exhausted during an outage.
                  schema:
                    type: boolean
                - name: eventType
                  in: query
                  description: Exact event type, e.g. `pull_request.created`.
                  schema:
                    type: string
                - name: installationId
                  in: query
                  description: Narrow to one installation (`WebhookDelivery.installation.id`).
                  schema:
                    type: string
                - name: createdAfter
                  in: query
                  description: Bound the delivery's creation time. For browsing, not for recovery.
                  schema:
                    type: string
                    format: date-time
                - name: createdBefore
                  in: query
                  schema:
                    type: string
                    format: date-time
                - name: pageSize
                  in: query
                  description: Defaults to 30 when unset or 0. Values above 100 are clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListWebhookDeliveriesResponse'
                            examples:
                                listWebhookDeliveries:
                                    value:
                                        deliveries:
                                            - id: whd_01k2ja2000e0080000000000j9
                                              event:
                                                id: evt_01k2ja2000e0080000000000r5
                                                type: pull_request.created
                                              installation:
                                                id: inst_01k2ja2000e0080000000000b2
                                                target:
                                                    slug: acme
                                                    id: ns_01k2ja2000e0080000000000p3
                                                    type: team
                                              createdAt: "2026-08-01T09:30:00Z"
                                              deliveredAt: "2026-08-02T14:45:05Z"
                                              lastAttempt:
                                                id: wha_01k2ja2000e0080000000000k0
                                                deliveryId: whd_01k2ja2000e0080000000000j9
                                                trigger: automatic
                                                responseStatusCode: 200
                                                latencyMs: 182
                                                attemptedAt: "2026-08-02T14:45:05Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - app
                scopes:
                    - app:webhook_deliveries:read
                ambient: true
    /v1/origin/app/webhook/deliveries:batchRedeliver:
        post:
            tags:
                - OriginService
            description: |-
                Asks Origin to send deliveries again.

                 The request means "ensure a send is in flight for each of these", not
                 "add another send". Follows BatchGetContents in returning one result per
                 unique input rather than failing the batch on a bad entry, so a single
                 expired id cannot block the rest of a recovery page.

                 Answers 202: the sends are queued, delivery itself is asynchronous. Poll
                 ListWebhookDeliveries for outcomes.
            operationId: OriginService_BatchRedeliverWebhookDeliveries
            requestBody:
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/BatchRedeliverWebhookDeliveriesRequest'
                        examples:
                            batchRedeliverWebhookDeliveries:
                                value:
                                    deliveryIds:
                                        - whd_01k2ja2000e0080000000000j9
                required: true
            responses:
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "202":
                    description: 'Accepted: the sends are queued, delivery itself is asynchronous.'
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/BatchRedeliverWebhookDeliveriesResponse'
                            examples:
                                batchRedeliverWebhookDeliveries:
                                    value:
                                        results:
                                            - deliveryId: whd_01k2ja2000e0080000000000j9
                                              outcome: queued
            x-origin-scopes:
                tokenTypes:
                    - app
                scopes:
                    - app:webhook_deliveries:write
                ambient: true
    /v1/origin/app/webhook/pings:
        post:
            tags:
                - OriginService
            description: |-
                Sends a synthetic `ping` test delivery to the authenticated app's
                 configured webhook URL and reports the receiver's response, so a
                 receiver can be verified during setup without waiting for a real event.

                 The ping is signed exactly like production deliveries (Standard Webhooks
                 headers; verify against `/v1/origin/keys`) with event type `ping` and a
                 payload identifying the app. It is sent once, synchronously, with no
                 retries, and does not appear in ListWebhookDeliveries. Requires a
                 configured webhook URL; rejected with FAILED_PRECONDITION otherwise.
            operationId: OriginService_PingWebhook
            requestBody:
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/PingWebhookRequest'
                        examples:
                            pingWebhook:
                                value: {}
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/PingWebhookResponse'
                            examples:
                                pingWebhook:
                                    value:
                                        deliveryId: whd_01k2ja2000e0080000000000j9
                                        eventId: evt_01k2ja2000e0080000000000r5
                                        delivered: true
                                        responseStatusCode: 200
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - app
                scopes:
                    - app:webhook_deliveries:write
                ambient: true
    /v1/origin/apps/{appId}:
        get:
            tags:
                - OriginService
            description: |-
                Returns a single app by its identifier.

                 This is the management read for app publishers; GetAuthenticatedApp is
                 the equivalent self-read for the app's own JWT credential.
            operationId: OriginService_GetApp
            parameters:
                - name: appId
                  in: path
                  description: App identifier.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/App'
                            examples:
                                getApp:
                                    value:
                                        id: app_01k2ja2000e0080000000000a1
                                        displayName: CI Status Bot
                                        webhookUrl: https://ci.acme.dev/webhooks/origin
                                        events:
                                            - pull_request.created
                                            - pull_request.merged
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                                        installationRedirectUris:
                                            - https://ci.acme.dev/origin/setup
                                        namespaceSlug: acme
                                        description: Posts CI status on pull requests.
                                        websiteUrl: https://ci.acme.dev
                                        defaultScopes:
                                            - repository:contents:read
                                            - repository:pull_requests:read
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - user
                scopes:
                    - app:settings:read
        patch:
            tags:
                - OriginService
            description: |-
                Updates an app's settings. Omitted fields are left unchanged; at least
                 one settable field must be provided.

                 Clearing `webhook_url` (providing it as an empty string) disables
                 outbound webhook delivery and cancels the app's pending deliveries;
                 re-setting a URL later does not resurrect cancelled deliveries.
            operationId: OriginService_UpdateApp
            parameters:
                - name: appId
                  in: path
                  description: App identifier.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                displayName:
                                    type: string
                                    description: New human-facing app name. Must not be empty when provided.
                                webhookUrl:
                                    type: string
                                    description: |-
                                        New outbound webhook delivery URL: an absolute https URL. Providing an
                                         empty string disables webhook delivery and cancels the app's pending
                                         deliveries.
                                events:
                                    allOf:
                                        - $ref: '#/components/schemas/AppEventsReplace'
                                    description: |-
                                        Clean replace of the outbound webhook event subscriptions. Absent leaves
                                         them unchanged; present with an empty list clears them.
                                description:
                                    type: string
                                    description: New app description. Absent leaves it unchanged; empty clears it.
                                websiteUrl:
                                    type: string
                                    description: New publisher website. Absent leaves it unchanged; empty clears it.
                                installationRedirectUris:
                                    allOf:
                                        - $ref: '#/components/schemas/AppInstallationRedirectUrisReplace'
                                    description: |-
                                        Clean replace of the OAuth install callback allowlist. Absent leaves it
                                         unchanged; present with an empty list clears it.
                                defaultScopes:
                                    allOf:
                                        - $ref: '#/components/schemas/AppDefaultScopesReplace'
                                    description: |-
                                        Clean replace of the app's default install scopes. Absent leaves them
                                         unchanged; present with an empty list clears them.
                        examples:
                            updateApp:
                                value:
                                    webhookUrl: https://ci.acme.dev/webhooks/origin-v2
                                    events:
                                        events:
                                            - pull_request.created
                                            - pull_request.merged
                                            - repository.pushed
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/App'
                            examples:
                                updateApp:
                                    value:
                                        id: app_01k2ja2000e0080000000000a1
                                        displayName: CI Status Bot
                                        webhookUrl: https://ci.acme.dev/webhooks/origin-v2
                                        events:
                                            - pull_request.created
                                            - pull_request.merged
                                            - repository.pushed
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                                        installationRedirectUris:
                                            - https://ci.acme.dev/origin/setup
                                        namespaceSlug: acme
                                        description: Posts CI status on pull requests.
                                        websiteUrl: https://ci.acme.dev
                                        defaultScopes:
                                            - repository:contents:read
                                            - repository:pull_requests:read
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - user
                scopes:
                    - app:settings:write
    /v1/origin/apps/{appId}/signing_keys:
        post:
            tags:
                - OriginService
            description: |-
                Adds a signing key to an app.

                 Apps hold a bounded set of active signing keys; adding a key beyond the
                 limit is rejected with a failed-precondition error until another key is
                 revoked. A key that is already registered is rejected with an
                 already-exists error.
            operationId: OriginService_AddAppSigningKey
            parameters:
                - name: appId
                  in: path
                  description: App identifier.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - publicKey
                            type: object
                            properties:
                                publicKey:
                                    type: string
                                    description: PEM SPKI Ed25519 public key to add to the app's signing key set.
                        examples:
                            addAppSigningKey:
                                value:
                                    publicKey: |-
                                        -----BEGIN PUBLIC KEY-----
                                        MCowBQYDK2VwAyEAq9zTf3hL6wXe1cVj0bYs5mKR8uDnG2oAaPp4NiEkKlM=
                                        -----END PUBLIC KEY-----
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/AppSigningKey'
                            examples:
                                addAppSigningKey:
                                    value:
                                        kid: 3q2xW9dK5fJm8vB1nY6cT0aZrQpLh4eGkVsN7uMxOdI
                                        createdAt: "2026-08-02T14:45:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - user
                scopes:
                    - app:settings:write
    /v1/origin/apps/{appId}/signing_keys/{kid}:
        delete:
            tags:
                - OriginService
            description: |-
                Revokes an app signing key by its key ID.

                 JWTs signed with a revoked key stop authenticating. The last active
                 signing key cannot be revoked; the request is rejected with a
                 failed-precondition error.
            operationId: OriginService_RevokeAppSigningKey
            parameters:
                - name: appId
                  in: path
                  description: App identifier.
                  required: true
                  schema:
                    type: string
                - name: kid
                  in: path
                  description: Key ID of the signing key to revoke.
                  required: true
                  schema:
                    type: string
            responses:
                "204":
                    description: OK
                    content: {}
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - user
                scopes:
                    - app:settings:write
    /v1/origin/installation/repos:
        get:
            tags:
                - OriginService
            description: |-
                Lists repositories accessible to the authenticated app installation.

                 Requires an installation access token (`oit_`) minted by
                 CreateInstallationAccessToken.
            operationId: OriginService_ListAppInstallationRepositories
            parameters:
                - name: pageSize
                  in: query
                  description: |-
                    Max repositories to return. Defaults to 30 when unset or 0. Values above
                     100 are clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListAppInstallationRepositoriesResponse'
                            examples:
                                listAppInstallationRepositories:
                                    value:
                                        repositories:
                                            - id: repo_01k2ja2000e0080000000000q4
                                              name: rocket
                                              fullName: acme/rocket
                                              owner:
                                                slug: acme
                                                id: ns_01k2ja2000e0080000000000p3
                                                type: team
                                              defaultBranch: main
                                              createdAt: "2026-08-01T09:30:00Z"
                                              updatedAt: "2026-08-02T14:45:00Z"
                                              pushedAt: "2026-08-02T14:45:00Z"
                                              cloneUrl: https://origin.cursor.com/git/acme/rocket.git
                                        repoSelectionMode: selected
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                scopes:
                    - installation:metadata:read
                ambient: true
    /v1/origin/namespaces/{namespaceSlug}/apps:
        get:
            tags:
                - OriginService
            description: Lists apps owned by a namespace, ordered by creation time descending.
            operationId: OriginService_ListNamespaceApps
            parameters:
                - name: namespaceSlug
                  in: path
                  description: Slug of the namespace whose apps to list.
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max apps to return. Defaults to 30 when unset or 0. Values above 100 are
                     clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListNamespaceAppsResponse'
                            examples:
                                listNamespaceApps:
                                    value:
                                        apps:
                                            - id: app_01k2ja2000e0080000000000a1
                                              displayName: CI Status Bot
                                              description: Posts CI status on pull requests.
                                            - id: app_01k2ja2000e0080000000000a2
                                              displayName: Deploy Bot
                                              description: ""
                                        nextPageToken: ""
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - user
                scopes:
                    - namespace:apps:read
        post:
            tags:
                - OriginService
            description: |-
                Creates an app owned by a namespace.

                 Apps are created private. `public_key` must be a PEM SPKI Ed25519 public
                 key; the caller generates the key pair locally and retains the private
                 key, and only the public key is stored, for app JWT verification.
                 Invalid webhook URLs, event types, redirect URIs, or scopes are rejected
                 as invalid arguments.
            operationId: OriginService_CreateApp
            parameters:
                - name: namespaceSlug
                  in: path
                  description: Slug of the namespace that will own the app.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - displayName
                                - publicKey
                            type: object
                            properties:
                                displayName:
                                    type: string
                                    description: Human-facing app name. Must not be empty.
                                publicKey:
                                    type: string
                                    description: |-
                                        PEM SPKI Ed25519 public key for the app's signing key pair. The caller
                                         generates the key pair locally and retains the private key; only the
                                         public key is stored, for app JWT verification.
                                webhookUrl:
                                    type: string
                                    description: |-
                                        Outbound webhook delivery URL: an absolute https URL. Empty means the app
                                         receives no webhook deliveries.
                                events:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        Outbound webhook event subscriptions (for example `pull_request.created`
                                         or `repository.pushed`). Unknown event types are rejected.
                                description:
                                    type: string
                                    description: Short app description.
                                websiteUrl:
                                    type: string
                                    description: 'Publisher website: an absolute https URL.'
                                installationRedirectUris:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        OAuth install callback allowlist: redirect URIs an app-initiated install
                                         may return to (absolute https URI, no fragment), matched exactly at
                                         authorize time.
                                defaultScopes:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        Default scopes offered when the app is installed, as catalog scope
                                         strings (for example `repository:contents:read`). Installs still accept
                                         scopes explicitly.
                        examples:
                            createApp:
                                value:
                                    displayName: CI Status Bot
                                    publicKey: |-
                                        -----BEGIN PUBLIC KEY-----
                                        MCowBQYDK2VwAyEAv7wFoV1bC9yKq3nZ8dQmXh5uJb2tR4sEwG6aP0iN8kY=
                                        -----END PUBLIC KEY-----
                                    webhookUrl: https://ci.acme.dev/webhooks/origin
                                    events:
                                        - pull_request.created
                                        - pull_request.merged
                                    description: Posts CI status on pull requests.
                                    websiteUrl: https://ci.acme.dev
                                    installationRedirectUris:
                                        - https://ci.acme.dev/origin/setup
                                    defaultScopes:
                                        - repository:contents:read
                                        - repository:pull_requests:read
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/App'
                            examples:
                                createApp:
                                    value:
                                        id: app_01k2ja2000e0080000000000a1
                                        displayName: CI Status Bot
                                        webhookUrl: https://ci.acme.dev/webhooks/origin
                                        events:
                                            - pull_request.created
                                            - pull_request.merged
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-01T09:30:00Z"
                                        installationRedirectUris:
                                            - https://ci.acme.dev/origin/setup
                                        namespaceSlug: acme
                                        description: Posts CI status on pull requests.
                                        websiteUrl: https://ci.acme.dev
                                        defaultScopes:
                                            - repository:contents:read
                                            - repository:pull_requests:read
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - user
                scopes:
                    - namespace:apps:create
    /v1/origin/owners/{ownerSlug}/grants:
        get:
            tags:
                - OriginService
            description: |-
                Lists who has been granted access to an owner: users, groups, and the
                 owning team's built-in admin and member groups. Each grant carries the
                 permission it confers on every repository under the owner. Grants made on
                 individual repositories are not included; see `ListRepositoryGrants`.
                 Requires the `namespace:settings:read` scope. Paginated with `page_size`
                 and `page_token`; default page size is 30, maximum is 100.
            operationId: OriginService_ListNamespaceGrants
            parameters:
                - name: ownerSlug
                  in: path
                  description: Slug of the owner whose grants to list.
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max grants to return. Defaults to 30 when unset or 0. Values above 100
                     are clamped to 100. Ignored when `page_token` is set.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListNamespaceGrantsResponse'
                            examples:
                                listNamespaceGrants:
                                    value:
                                        grants:
                                            - group:
                                                id: grp_01k2ja2000e0080000000000n2
                                              permission: PERMISSION_ADMIN
                                            - teamGroup:
                                                kind: admins
                                              permission: PERMISSION_ADMIN
                                            - teamGroup:
                                                kind: members
                                              permission: PERMISSION_CONTRIBUTOR
                                            - user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                                              permission: PERMISSION_WRITE
                                        nextPageToken: ""
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - namespace:settings:read
        post:
            tags:
                - OriginService
            description: |-
                Sets the permission a user, group, or owning-team group holds directly on
                 an owner, replacing any permission previously granted directly to that
                 principal. Repeating a grant the principal already holds succeeds without
                 change. Only the four presets are accepted; `PERMISSION_CUSTOM` fails with
                 INVALID_ARGUMENT. A user must be an active member of the owning team or
                 its organization and a group an active group of that organization, and the
                 write must leave the owner with at least one admin; otherwise the request
                 fails with FAILED_PRECONDITION.
            operationId: OriginService_UpsertNamespaceGrant
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owner slug.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - permission
                            type: object
                            properties:
                                user:
                                    $ref: '#/components/schemas/OriginUserActor'
                                group:
                                    $ref: '#/components/schemas/OriginGroup'
                                teamGroup:
                                    $ref: '#/components/schemas/OriginTeamGroup'
                                permission:
                                    enum:
                                        - PERMISSION_READ
                                        - PERMISSION_CONTRIBUTOR
                                        - PERMISSION_WRITE
                                        - PERMISSION_ADMIN
                                        - PERMISSION_CUSTOM
                                    type: string
                                    description: |-
                                        `PERMISSION_READ`, `PERMISSION_CONTRIBUTOR`, `PERMISSION_WRITE`, or
                                         `PERMISSION_ADMIN`.
                                    format: enum
                        examples:
                            upsertNamespaceGrant:
                                value:
                                    user:
                                        id: user_01k2ja2000e0080000000000c3
                                    permission: PERMISSION_WRITE
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/NamespaceGrant'
                            examples:
                                upsertNamespaceGrant:
                                    value:
                                        user:
                                            id: user_01k2ja2000e0080000000000c3
                                            email: jane@acme.dev
                                        permission: PERMISSION_WRITE
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - namespace:settings:write
        delete:
            tags:
                - OriginService
            description: |-
                Removes the permission a user, group, or owning-team group holds directly
                 on an owner. Per-repository grants are unaffected. Removing a permission
                 the principal does not hold directly succeeds without change; a removal
                 that would leave the owner without an admin fails with
                 FAILED_PRECONDITION.
            operationId: OriginService_DeleteNamespaceGrant
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owner slug.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                user:
                                    $ref: '#/components/schemas/OriginUserActor'
                                group:
                                    $ref: '#/components/schemas/OriginGroup'
                                teamGroup:
                                    $ref: '#/components/schemas/OriginTeamGroup'
                        examples:
                            deleteNamespaceGrant:
                                value:
                                    group:
                                        id: grp_01k2ja2000e0080000000000n2
                required: true
            responses:
                "204":
                    description: OK
                    content: {}
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - namespace:settings:write
    /v1/origin/rate_limit:
        get:
            tags:
                - OriginService
            description: |-
                Returns the authenticated principal's current public API rate limit status.

                 Accessing this endpoint does not consume rate limit points. The response
                 covers the shared per-minute point budget used by other public API
                 endpoints for this principal.
            operationId: OriginService_GetRateLimit
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/RateLimitStatus'
                            examples:
                                getRateLimit:
                                    value:
                                        resources:
                                            core:
                                                limit: 6000
                                                remaining: 5994
                                                reset: 1785682800
                                                used: 6
                                        rate:
                                            limit: 6000
                                            remaining: 5994
                                            reset: 1785682800
                                            used: 6
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - app
                    - installation
                    - user
                scopes: []
    /v1/origin/repos/{ownerSlug}:
        get:
            tags:
                - OriginService
            description: Lists repos belonging to an owner entity.
            operationId: OriginService_ListRepos
            parameters:
                - name: ownerSlug
                  in: path
                  description: Parent owner entity slug.
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max repos to return. Defaults to 30 when unset or 0. Values above 100 are
                     clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page.
                  schema:
                    type: string
                - name: filter
                  in: query
                  description: Optional case-insensitive substring filter.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListReposResponse'
                            examples:
                                listRepos:
                                    value:
                                        repositories:
                                            - id: repo_01k2ja2000e0080000000000q4
                                              name: rocket
                                              fullName: acme/rocket
                                              owner:
                                                slug: acme
                                                id: ns_01k2ja2000e0080000000000p3
                                                type: team
                                              defaultBranch: main
                                              createdAt: "2026-08-01T09:30:00Z"
                                              updatedAt: "2026-08-02T14:45:00Z"
                                              pushedAt: "2026-08-02T14:45:00Z"
                                              cloneUrl: https://origin.cursor.com/git/acme/rocket.git
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - user
                scopes:
                    - namespace:repositories:read
        post:
            tags:
                - OriginService
            description: Creates a repo belonging to an owner.
            operationId: OriginService_CreateRepo
            parameters:
                - name: ownerSlug
                  in: path
                  description: Parent owner entity's slug.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/Repo'
                        examples:
                            createRepo:
                                value:
                                    name: rocket
                                    defaultBranch: main
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Repo'
                            examples:
                                createRepo:
                                    value:
                                        id: repo_01k2ja2000e0080000000000q4
                                        name: rocket
                                        fullName: acme/rocket
                                        owner:
                                            slug: acme
                                            id: ns_01k2ja2000e0080000000000p3
                                            type: team
                                        defaultBranch: main
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                                        pushedAt: "2026-08-02T14:45:00Z"
                                        cloneUrl: https://origin.cursor.com/git/acme/rocket.git
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - user
                scopes:
                    - namespace:new_repository:write
    /v1/origin/repos/{ownerSlug}/{repoName}:
        get:
            tags:
                - OriginService
            description: Returns a single repo by its `(owner_id, name)` identifier.
            operationId: OriginService_GetRepo
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Repo'
                            examples:
                                getRepo:
                                    value:
                                        id: repo_01k2ja2000e0080000000000q4
                                        name: rocket
                                        fullName: acme/rocket
                                        owner:
                                            slug: acme
                                            id: ns_01k2ja2000e0080000000000p3
                                            type: team
                                        defaultBranch: main
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                                        pushedAt: "2026-08-02T14:45:00Z"
                                        cloneUrl: https://origin.cursor.com/git/acme/rocket.git
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:metadata:read
        patch:
            tags:
                - OriginService
            description: |-
                Updates repository settings. Omitted fields are left unchanged; at least
                 one settable field must be provided.

                 Provided settings are applied as independent groups in a fixed order:
                 default branch, automatic head-branch deletion, visibility, then merge
                 methods. When a group is rejected, groups earlier in that order have
                 already been applied and remain applied; retrying with the rejected group
                 corrected converges on the requested state.
            operationId: OriginService_UpdateRepo
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                defaultBranch:
                                    type: string
                                    description: |-
                                        New default branch. Must name an existing branch. Supported only on
                                         repositories that do not pull from or push to an upstream source;
                                         other repositories are rejected with a failed-precondition error.
                                allowMergeCommit:
                                    type: boolean
                                    description: |-
                                        Whether pull requests may land as merge commits. Must be provided
                                         together with `allow_squash_merge`; at least one of the two must be
                                         true. Providing one without the other is rejected as invalid.
                                allowSquashMerge:
                                    type: boolean
                                    description: |-
                                        Whether pull requests may land as squash merges. Must be provided
                                         together with `allow_merge_commit`; at least one of the two must be
                                         true. Providing one without the other is rejected as invalid.
                                deleteBranchOnMerge:
                                    type: boolean
                                    description: |-
                                        Whether the head branch is deleted automatically on merge. Supported
                                         only on repositories whose pull requests live on this API; repositories
                                         pulling from an upstream source are rejected with a failed-precondition
                                         error.
                                visibility:
                                    enum:
                                        - internal
                                        - private
                                    type: string
                                    description: |-
                                        New repository visibility, `internal` or `private`. Unspecified leaves
                                         the visibility unchanged.
                                    format: enum
                        examples:
                            updateRepo:
                                value:
                                    defaultBranch: main
                                    allowMergeCommit: false
                                    allowSquashMerge: true
                                    deleteBranchOnMerge: true
                                    visibility: private
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Repo'
                            examples:
                                updateRepo:
                                    value:
                                        id: repo_01k2ja2000e0080000000000q4
                                        name: rocket
                                        fullName: acme/rocket
                                        owner:
                                            slug: acme
                                            id: ns_01k2ja2000e0080000000000p3
                                            type: team
                                        defaultBranch: main
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                                        pushedAt: "2026-08-02T14:45:00Z"
                                        cloneUrl: https://origin.cursor.com/git/acme/rocket.git
                                        visibility: private
                                        allowMergeCommit: false
                                        allowSquashMerge: true
                                        deleteBranchOnMerge: true
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:settings:write
    /v1/origin/repos/{ownerSlug}/{repoName}/branches:
        get:
            tags:
                - OriginService
            description: |-
                Lists the repo's branches and tip commits in ascending name order,
                 paginated with `page_size` and `page_token`.
            operationId: OriginService_ListBranches
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max branches to return. Defaults to 30 when unset or 0. Values above 100
                     are clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page. Encodes the page offset, so `page_size` on a follow-up request
                     is ignored when a token is supplied.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListBranchesResponse'
                            examples:
                                listBranches:
                                    value:
                                        branches:
                                            - name: main
                                              commit:
                                                sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/check-runs:
        post:
            tags:
                - OriginService
            description: |-
                Upserts a check suite + check run using an installation access token with
                 `repository:checks:write`. The write is attributed to the app that owns
                 the authenticated installation. A repeated call with the same
                 `(repo, head_sha, suite.key, check.key)` updates the existing check run in
                 place rather than creating a duplicate.
            operationId: OriginService_PostCheckRun
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - headSha
                                - checkSuite
                                - checkRun
                            type: object
                            properties:
                                headSha:
                                    type: string
                                    description: Head commit SHA the check run is reported against (40- or 64-char hex).
                                checkSuite:
                                    allOf:
                                        - $ref: '#/components/schemas/CheckSuiteInput'
                                    description: The suite the check run belongs to; upserted alongside the check run.
                                checkRun:
                                    allOf:
                                        - $ref: '#/components/schemas/CheckRunInput'
                                    description: The check run to upsert.
                        examples:
                            postCheckRun:
                                value:
                                    headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                    checkSuite:
                                        key: ci-8842
                                        name: CI
                                        detailsUrl: https://ci.acme.dev/runs/8842
                                        externalId: build-8842
                                    checkRun:
                                        key: ci-8842-unit-tests
                                        name: unit-tests
                                        status: completed
                                        conclusion: success
                                        externalUpdatedAt: "2026-08-02T14:44:30Z"
                                        startedAt: "2026-08-02T14:40:00Z"
                                        completedAt: "2026-08-02T14:44:30Z"
                                        detailsUrl: https://ci.acme.dev/runs/8842
                                        externalId: run-8842
                                        output:
                                            title: Unit tests
                                            summary: 128 tests passed.
                                            text: All suites green.
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/PostCheckRunResponse'
                            examples:
                                postCheckRun:
                                    value:
                                        checkSuite:
                                            id: crg_01k2ja2000e0080000000000h8
                                            repository:
                                                id: repo_01k2ja2000e0080000000000q4
                                                name: rocket
                                                owner:
                                                    slug: acme
                                                    id: ns_01k2ja2000e0080000000000p3
                                                    type: team
                                            sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            key: ci-8842
                                            name: CI
                                            detailsUrl: https://ci.acme.dev/runs/8842
                                            createdAt: "2026-08-01T09:30:00Z"
                                            updatedAt: "2026-08-02T14:45:00Z"
                                            externalId: build-8842
                                            actor:
                                                user:
                                                    id: user_01k2ja2000e0080000000000c3
                                                    email: jane@acme.dev
                                        checkRun:
                                            id: cr_01k2ja2000e0080000000000g7
                                            repository:
                                                id: repo_01k2ja2000e0080000000000q4
                                                name: rocket
                                                owner:
                                                    slug: acme
                                                    id: ns_01k2ja2000e0080000000000p3
                                                    type: team
                                            checkSuite:
                                                id: crg_01k2ja2000e0080000000000h8
                                            sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            key: ci-8842-unit-tests
                                            name: unit-tests
                                            status: completed
                                            conclusion: success
                                            detailsUrl: https://ci.acme.dev/runs/8842
                                            externalUpdatedAt: "2026-08-02T14:44:30Z"
                                            startedAt: "2026-08-02T14:40:00Z"
                                            completedAt: "2026-08-02T14:44:30Z"
                                            createdAt: "2026-08-01T09:30:00Z"
                                            updatedAt: "2026-08-02T14:45:00Z"
                                            externalId: run-8842
                                            actor:
                                                user:
                                                    id: user_01k2ja2000e0080000000000c3
                                                    email: jane@acme.dev
                                            output:
                                                title: Unit tests
                                                summary: 128 tests passed.
                                                text: All suites green.
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                scopes:
                    - repository:checks:write
    /v1/origin/repos/{ownerSlug}/{repoName}/check-runs/{checkRunId}:
        get:
            tags:
                - OriginService
            description: Returns a single check run by server-assigned id (`cr_…`).
            operationId: OriginService_GetCheckRun
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: checkRunId
                  in: path
                  description: Server-assigned check-run id (`cr_…`).
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/CheckRun'
                            examples:
                                getCheckRun:
                                    value:
                                        id: cr_01k2ja2000e0080000000000g7
                                        repository:
                                            id: repo_01k2ja2000e0080000000000q4
                                            name: rocket
                                            owner:
                                                slug: acme
                                                id: ns_01k2ja2000e0080000000000p3
                                                type: team
                                        checkSuite:
                                            id: crg_01k2ja2000e0080000000000h8
                                        sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                        key: ci-8842-unit-tests
                                        name: unit-tests
                                        status: completed
                                        conclusion: success
                                        detailsUrl: https://ci.acme.dev/runs/8842
                                        externalUpdatedAt: "2026-08-02T14:44:30Z"
                                        startedAt: "2026-08-02T14:40:00Z"
                                        completedAt: "2026-08-02T14:44:30Z"
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                                        externalId: run-8842
                                        actor:
                                            user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                                        output:
                                            title: Unit tests
                                            summary: 128 tests passed.
                                            text: All suites green.
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:checks:read
    /v1/origin/repos/{ownerSlug}/{repoName}/check-runs/{checkRunId}/annotations:
        get:
            tags:
                - OriginService
            description: |-
                Lists a check run's annotations in ascending id order. Annotation ids are
                 time-sortable TypeIDs. Uses opaque pagination with a default page size of
                 30 and maximum of 100.
            operationId: OriginService_ListCheckRunAnnotations
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: checkRunId
                  in: path
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max annotations to return. Defaults to 30 when unset or 0. Values above
                     100 are clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page. A supplied token fixes the page size and scope, so
                     `page_size` is ignored on follow-up requests.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListCheckRunAnnotationsResponse'
                            examples:
                                listCheckRunAnnotations:
                                    value:
                                        annotations:
                                            - id: cra_01k2ja2000e0080000000000v1
                                              checkRunId: cr_01k2ja2000e0080000000000g7
                                              annotationLevel: warning
                                              message: Deprecated API usage; migrate to the v2 client.
                                              title: Deprecated API
                                              createdAt: "2026-08-02T14:45:00Z"
                                              updatedAt: "2026-08-02T14:45:00Z"
                                              location:
                                                path: src/telemetry.ts
                                                startLine: 42
                                                endLine: 42
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:checks:read
        post:
            tags:
                - OriginService
            description: |-
                Atomically appends 1–25 annotations when the run's durable total would
                 remain at or below 100. This follows common Checks API annotation field
                 semantics, but uses a dedicated append-only operation and nested optional
                 location. The operation is not request-idempotent: retrying after an
                 ambiguous transport failure may append duplicates and consume capacity.
                 Identical content is intentionally allowed.
            operationId: OriginService_CreateCheckRunAnnotations
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: checkRunId
                  in: path
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - annotations
                            type: object
                            properties:
                                annotations:
                                    type: array
                                    items:
                                        $ref: '#/components/schemas/CheckRunAnnotationInput'
                                    description: |-
                                        Atomic append batch. Must contain 1–25 entries. A check run stores at most
                                         100 annotations; non-idempotent retries append duplicates and consume that
                                         capacity. `location` is entirely optional; when present, its required
                                         fields must form a coherent range.
                        examples:
                            createCheckRunAnnotations:
                                value:
                                    annotations:
                                        - annotationLevel: warning
                                          message: Deprecated API usage; migrate to the v2 client.
                                          title: Deprecated API
                                          location:
                                            path: src/telemetry.ts
                                            startLine: 42
                                            endLine: 42
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/CreateCheckRunAnnotationsResponse'
                            examples:
                                createCheckRunAnnotations:
                                    value:
                                        annotations:
                                            - id: cra_01k2ja2000e0080000000000v1
                                              checkRunId: cr_01k2ja2000e0080000000000g7
                                              annotationLevel: warning
                                              message: Deprecated API usage; migrate to the v2 client.
                                              title: Deprecated API
                                              createdAt: "2026-08-02T14:45:00Z"
                                              updatedAt: "2026-08-02T14:45:00Z"
                                              location:
                                                path: src/telemetry.ts
                                                startLine: 42
                                                endLine: 42
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                scopes:
                    - repository:checks:write
    /v1/origin/repos/{ownerSlug}/{repoName}/check-runs/{checkRunId}/rerequest:
        post:
            tags:
                - OriginService
            description: |-
                Asks the app that reported a check run to run it again. Origin records
                 the request on the run (`rerequested_at`) and notifies the owning app
                 through the `repository.check_run.rerequested` webhook event; the app
                 answers by posting a fresh run for the same head SHA and `key` — a new
                 run or an update of this one — which clears `rerequested_at`. The run's
                 own status and conclusion are never changed by this call.

                 The run must be `completed`, must have been declared re-requestable
                 (`is_rerequestable`), must be the current attempt for its `key`, and must
                 belong to the current head of an open pull request; otherwise the call
                 fails with FAILED_PRECONDITION. One re-request may be outstanding per
                 run: while `rerequested_at` is set, a repeat request fails with
                 ALREADY_EXISTS; once the owning app has answered, the run may be
                 re-requested again. Any principal with repository contents write may
                 re-request any re-requestable run, whichever app reported it. Returns
                 the run with `rerequested_at` set.
            operationId: OriginService_RerequestCheckRun
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: checkRunId
                  in: path
                  description: Server-assigned check-run id (`cr_…`).
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            type: object
                            properties: {}
                        examples:
                            rerequestCheckRun:
                                value: {}
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/CheckRun'
                            examples:
                                rerequestCheckRun:
                                    value:
                                        id: cr_01k2ja2000e0080000000000g7
                                        repository:
                                            id: repo_01k2ja2000e0080000000000q4
                                            name: rocket
                                            owner:
                                                slug: acme
                                                id: ns_01k2ja2000e0080000000000p3
                                                type: team
                                        checkSuite:
                                            id: crg_01k2ja2000e0080000000000h8
                                        sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                        key: ci-8842-unit-tests
                                        name: unit-tests
                                        status: completed
                                        conclusion: failure
                                        detailsUrl: https://ci.acme.dev/runs/8842
                                        externalUpdatedAt: "2026-08-02T14:44:30Z"
                                        startedAt: "2026-08-02T14:40:00Z"
                                        completedAt: "2026-08-02T14:44:30Z"
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T15:02:10Z"
                                        externalId: run-8842
                                        actor:
                                            app:
                                                id: app_01k2ja2000e0080000000000a1
                                                displayName: Acme CI
                                        output:
                                            title: Unit tests
                                            summary: 3 of 128 tests failed.
                                        isRerequestable: true
                                        rerequestedAt: "2026-08-02T15:02:10Z"
                                        rerequestedBy:
                                            user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:write
    /v1/origin/repos/{ownerSlug}/{repoName}/check-runs:batchUpsert:
        post:
            tags:
                - OriginService
            description: |-
                Atomically upserts several check runs belonging to one suite. The request
                 accepts at most 10 runs and rejects duplicate `(external_id, key)`
                 identities. Every run is committed or the entire request is rolled back.
            operationId: OriginService_BatchUpsertCheckRuns
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - headSha
                                - checkSuite
                                - checkRuns
                            type: object
                            properties:
                                headSha:
                                    type: string
                                    description: Head commit SHA the check runs are reported against (40- or 64-char hex).
                                checkSuite:
                                    allOf:
                                        - $ref: '#/components/schemas/CheckSuiteInput'
                                    description: The suite shared by every check run in this request.
                                checkRuns:
                                    type: array
                                    items:
                                        $ref: '#/components/schemas/CheckRunInput'
                                    description: |-
                                        Check runs to upsert, in response order. Must contain 1–10 entries with
                                         unique `(external_id, key)` identities.
                        examples:
                            batchUpsertCheckRuns:
                                value:
                                    headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                    checkSuite:
                                        key: ci-8842
                                        name: CI
                                        detailsUrl: https://ci.acme.dev/runs/8842
                                        externalId: build-8842
                                    checkRuns:
                                        - key: ci-8842-unit-tests
                                          name: unit-tests
                                          status: completed
                                          conclusion: success
                                          externalUpdatedAt: "2026-08-02T14:44:30Z"
                                          startedAt: "2026-08-02T14:40:00Z"
                                          completedAt: "2026-08-02T14:44:30Z"
                                          detailsUrl: https://ci.acme.dev/runs/8842
                                          externalId: run-8842
                                          output:
                                            title: Unit tests
                                            summary: 128 tests passed.
                                            text: All suites green.
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/BatchUpsertCheckRunsResponse'
                            examples:
                                batchUpsertCheckRuns:
                                    value:
                                        checkSuite:
                                            id: crg_01k2ja2000e0080000000000h8
                                            repository:
                                                id: repo_01k2ja2000e0080000000000q4
                                                name: rocket
                                                owner:
                                                    slug: acme
                                                    id: ns_01k2ja2000e0080000000000p3
                                                    type: team
                                            sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            key: ci-8842
                                            name: CI
                                            detailsUrl: https://ci.acme.dev/runs/8842
                                            createdAt: "2026-08-01T09:30:00Z"
                                            updatedAt: "2026-08-02T14:45:00Z"
                                            externalId: build-8842
                                            actor:
                                                user:
                                                    id: user_01k2ja2000e0080000000000c3
                                                    email: jane@acme.dev
                                        checkRuns:
                                            - id: cr_01k2ja2000e0080000000000g7
                                              repository:
                                                id: repo_01k2ja2000e0080000000000q4
                                                name: rocket
                                                owner:
                                                    slug: acme
                                                    id: ns_01k2ja2000e0080000000000p3
                                                    type: team
                                              checkSuite:
                                                id: crg_01k2ja2000e0080000000000h8
                                              sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                              key: ci-8842-unit-tests
                                              name: unit-tests
                                              status: completed
                                              conclusion: success
                                              detailsUrl: https://ci.acme.dev/runs/8842
                                              externalUpdatedAt: "2026-08-02T14:44:30Z"
                                              startedAt: "2026-08-02T14:40:00Z"
                                              completedAt: "2026-08-02T14:44:30Z"
                                              createdAt: "2026-08-01T09:30:00Z"
                                              updatedAt: "2026-08-02T14:45:00Z"
                                              externalId: run-8842
                                              actor:
                                                user:
                                                    id: user_01k2ja2000e0080000000000c3
                                                    email: jane@acme.dev
                                              output:
                                                title: Unit tests
                                                summary: 128 tests passed.
                                                text: All suites green.
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                scopes:
                    - repository:checks:write
    /v1/origin/repos/{ownerSlug}/{repoName}/check-suites/{checkSuiteId}:
        get:
            tags:
                - OriginService
            description: |-
                Returns check suite metadata by server-assigned id (`crg_…`). Does not
                 embed check runs; use `ListCheckRunsForSuite` for the suite's runs.
            operationId: OriginService_GetCheckSuite
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: checkSuiteId
                  in: path
                  description: Server-assigned check suite id (`crg_…`).
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/CheckSuite'
                            examples:
                                getCheckSuite:
                                    value:
                                        id: crg_01k2ja2000e0080000000000h8
                                        repository:
                                            id: repo_01k2ja2000e0080000000000q4
                                            name: rocket
                                            owner:
                                                slug: acme
                                                id: ns_01k2ja2000e0080000000000p3
                                                type: team
                                        sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                        key: ci-8842
                                        name: CI
                                        detailsUrl: https://ci.acme.dev/runs/8842
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                                        externalId: build-8842
                                        actor:
                                            user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:checks:read
    /v1/origin/repos/{ownerSlug}/{repoName}/check-suites/{checkSuiteId}/check-runs:
        get:
            tags:
                - OriginService
            description: |-
                Lists a suite's current check runs. When a run key has been reported
                 more than once within the suite, only the latest attempt for that key is
                 returned; superseded attempts are omitted. Paginated.
            operationId: OriginService_ListCheckRunsForSuite
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: checkSuiteId
                  in: path
                  description: Server-assigned check suite id (`crg_…`).
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max check runs to return. Defaults to 30 when unset or 0. Values above 100
                     are clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page. Encodes the last-seen check-run id scoped to this suite, so
                     `page_size` on a follow-up request is ignored when a token is supplied.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListCheckRunsForSuiteResponse'
                            examples:
                                listCheckRunsForSuite:
                                    value:
                                        checkRuns:
                                            - id: cr_01k2ja2000e0080000000000g7
                                              repository:
                                                id: repo_01k2ja2000e0080000000000q4
                                                name: rocket
                                                owner:
                                                    slug: acme
                                                    id: ns_01k2ja2000e0080000000000p3
                                                    type: team
                                              checkSuite:
                                                id: crg_01k2ja2000e0080000000000h8
                                              sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                              key: ci-8842-unit-tests
                                              name: unit-tests
                                              status: completed
                                              conclusion: success
                                              detailsUrl: https://ci.acme.dev/runs/8842
                                              externalUpdatedAt: "2026-08-02T14:44:30Z"
                                              startedAt: "2026-08-02T14:40:00Z"
                                              completedAt: "2026-08-02T14:44:30Z"
                                              createdAt: "2026-08-01T09:30:00Z"
                                              updatedAt: "2026-08-02T14:45:00Z"
                                              externalId: run-8842
                                              actor:
                                                user:
                                                    id: user_01k2ja2000e0080000000000c3
                                                    email: jane@acme.dev
                                              output:
                                                title: Unit tests
                                                summary: 128 tests passed.
                                                text: All suites green.
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:checks:read
    /v1/origin/repos/{ownerSlug}/{repoName}/commits:
        get:
            tags:
                - OriginService
            description: Lists commits on a branch or starting ref.
            operationId: OriginService_ListCommits
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: sha
                  in: query
                  description: |-
                    SHA, branch, tag, or symbolic ref (for example `HEAD`) to start listing
                     from. Empty means the repo's default branch.
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max commits to return. Defaults to 30 when unset or 0. Values above 100 are
                     clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page. Encodes the starting ref and page, so `sha`/`page_size` on a
                     follow-up request are ignored when a token is supplied.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListCommitsResponse'
                            examples:
                                listCommits:
                                    value:
                                        commits:
                                            - sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                              commit:
                                                author:
                                                    name: Jane Doe
                                                    email: jane@acme.dev
                                                    date: "2026-08-01T09:30:00Z"
                                                committer:
                                                    name: Jane Doe
                                                    email: jane@acme.dev
                                                    date: "2026-08-01T09:30:00Z"
                                                message: Add launch telemetry
                                                tree:
                                                    sha: a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8
                                              parents:
                                                - sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                              stats:
                                                additions: 128
                                                deletions: 46
                                                total: 174
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/commits/{sha}:
        get:
            tags:
                - OriginService
            description: Returns a single commit by SHA or ref with whole-commit aggregate stats.
            operationId: OriginService_GetCommit
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: sha
                  in: path
                  description: |-
                    SHA, branch, tag, or symbolic ref (for example `HEAD`) of the commit to
                     fetch.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Commit'
                            examples:
                                getCommit:
                                    value:
                                        sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                        commit:
                                            author:
                                                name: Jane Doe
                                                email: jane@acme.dev
                                                date: "2026-08-01T09:30:00Z"
                                            committer:
                                                name: Jane Doe
                                                email: jane@acme.dev
                                                date: "2026-08-01T09:30:00Z"
                                            message: Add launch telemetry
                                            tree:
                                                sha: a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8
                                        parents:
                                            - sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                        stats:
                                            additions: 128
                                            deletions: 46
                                            total: 174
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/commits/{sha}/check-runs:
        get:
            tags:
                - OriginService
            description: |-
                Lists a commit's current check runs across all suites: only runs
                 belonging to each suite's latest attempt, and within each suite only the
                 latest attempt per run key. Superseded attempts are omitted. Optionally
                 filtered by check name and status; filters apply to the collapsed set.
                 Paginated.
            operationId: OriginService_ListCheckRunsForCommit
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: sha
                  in: path
                  description: Commit SHA (40- or 64-char hex) to list check runs for.
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max check runs to return. Defaults to 30 when unset or 0. Values above 100
                     are clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page. Encodes the last-seen check-run id scoped to this commit and
                     the filters below, so `page_size` on a follow-up request is ignored when
                     a token is supplied and reusing a token under different filters is
                     rejected with INVALID_ARGUMENT.
                  schema:
                    type: string
                - name: checkName
                  in: query
                  description: Optional exact check-run name filter (the check run's `name`).
                  schema:
                    type: string
                - name: status
                  in: query
                  description: |-
                    Optional status filter: `queued`, `in_progress`, or `completed`. Any
                     other value is rejected with INVALID_ARGUMENT.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListCheckRunsForCommitResponse'
                            examples:
                                listCheckRunsForCommit:
                                    value:
                                        checkRuns:
                                            - id: cr_01k2ja2000e0080000000000g7
                                              repository:
                                                id: repo_01k2ja2000e0080000000000q4
                                                name: rocket
                                                owner:
                                                    slug: acme
                                                    id: ns_01k2ja2000e0080000000000p3
                                                    type: team
                                              checkSuite:
                                                id: crg_01k2ja2000e0080000000000h8
                                              sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                              key: ci-8842-unit-tests
                                              name: unit-tests
                                              status: completed
                                              conclusion: success
                                              detailsUrl: https://ci.acme.dev/runs/8842
                                              externalUpdatedAt: "2026-08-02T14:44:30Z"
                                              startedAt: "2026-08-02T14:40:00Z"
                                              completedAt: "2026-08-02T14:44:30Z"
                                              createdAt: "2026-08-01T09:30:00Z"
                                              updatedAt: "2026-08-02T14:45:00Z"
                                              externalId: run-8842
                                              actor:
                                                user:
                                                    id: user_01k2ja2000e0080000000000c3
                                                    email: jane@acme.dev
                                              output:
                                                title: Unit tests
                                                summary: 128 tests passed.
                                                text: All suites green.
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:checks:read
    /v1/origin/repos/{ownerSlug}/{repoName}/commits/{sha}/check-suites:
        get:
            tags:
                - OriginService
            description: |-
                Lists check suites reported against a commit. Returns only the latest
                 attempt of each suite (per reporting actor and suite key); superseded
                 attempts are omitted. Returns suite metadata only (no embedded runs).
                 Paginated.
            operationId: OriginService_ListCheckSuitesForCommit
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: sha
                  in: path
                  description: Commit SHA (40- or 64-char hex) to list suites for.
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max suites to return. Defaults to 30 when unset or 0. Values above 100 are
                     clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page. Encodes the last-seen check-suite id scoped to this commit, so
                     `page_size` on a follow-up request is ignored when a token is supplied.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListCheckSuitesForCommitResponse'
                            examples:
                                listCheckSuitesForCommit:
                                    value:
                                        checkSuites:
                                            - id: crg_01k2ja2000e0080000000000h8
                                              repository:
                                                id: repo_01k2ja2000e0080000000000q4
                                                name: rocket
                                                owner:
                                                    slug: acme
                                                    id: ns_01k2ja2000e0080000000000p3
                                                    type: team
                                              sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                              key: ci-8842
                                              name: CI
                                              detailsUrl: https://ci.acme.dev/runs/8842
                                              createdAt: "2026-08-01T09:30:00Z"
                                              updatedAt: "2026-08-02T14:45:00Z"
                                              externalId: build-8842
                                              actor:
                                                user:
                                                    id: user_01k2ja2000e0080000000000c3
                                                    email: jane@acme.dev
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:checks:read
    /v1/origin/repos/{ownerSlug}/{repoName}/commits/{sha}/files:
        get:
            tags:
                - OriginService
            description: Lists the files changed by a commit.
            operationId: OriginService_ListCommitFiles
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: sha
                  in: path
                  description: |-
                    SHA, branch, tag, or symbolic ref (for example `HEAD`) of the commit
                     whose files should be listed.
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max changed files to return. Defaults to 30 when unset or 0. Values above
                     100 are clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page. The token fixes the resolved commit, page size, and file cursor,
                     so `sha` and `page_size` on a follow-up request must match the token.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListCommitFilesResponse'
                            examples:
                                listCommitFiles:
                                    value:
                                        files:
                                            - filename: src/telemetry.ts
                                              status: modified
                                              additions: 6
                                              deletions: 3
                                              changes: 9
                                              patch: |
                                                @@ -12,6 +12,9 @@
                                                 import { ignite } from "./ignition";
                                                +import { emitLaunchTelemetry } from "./telemetry";
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/compare/{basehead}:
        get:
            tags:
                - OriginService
            description: |-
                Compares commits, refs, or tags relative to their merge base.
                 `basehead` is `"{base}...{head}"`; refs containing "/" must use their SHA.
            operationId: OriginService_CompareCommits
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: basehead
                  in: path
                  description: |-
                    `"{base}...{head}"`, where either revision may be a SHA, branch, tag, or
                     symbolic ref such as `HEAD`.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/CommitComparison'
                            examples:
                                compareCommits:
                                    value:
                                        status: ahead
                                        aheadBy: 2
                                        behindBy: 0
                                        baseCommit:
                                            sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                            commit:
                                                author:
                                                    name: Jane Doe
                                                    email: jane@acme.dev
                                                    date: "2026-08-01T09:30:00Z"
                                                committer:
                                                    name: Jane Doe
                                                    email: jane@acme.dev
                                                    date: "2026-08-01T09:30:00Z"
                                                message: Add launch telemetry
                                                tree:
                                                    sha: a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8
                                            parents:
                                                - sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                            stats:
                                                additions: 128
                                                deletions: 46
                                                total: 174
                                        headCommit:
                                            sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            commit:
                                                author:
                                                    name: Jane Doe
                                                    email: jane@acme.dev
                                                    date: "2026-08-01T09:30:00Z"
                                                committer:
                                                    name: Jane Doe
                                                    email: jane@acme.dev
                                                    date: "2026-08-01T09:30:00Z"
                                                message: Add launch telemetry
                                                tree:
                                                    sha: a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8
                                            parents:
                                                - sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                            stats:
                                                additions: 128
                                                deletions: 46
                                                total: 174
                                        mergeBaseCommit:
                                            sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                            commit:
                                                author:
                                                    name: Jane Doe
                                                    email: jane@acme.dev
                                                    date: "2026-08-01T09:30:00Z"
                                                committer:
                                                    name: Jane Doe
                                                    email: jane@acme.dev
                                                    date: "2026-08-01T09:30:00Z"
                                                message: Add launch telemetry
                                                tree:
                                                    sha: a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8
                                            parents:
                                                - sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                            stats:
                                                additions: 128
                                                deletions: 46
                                                total: 174
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/compare/{basehead}/files:
        get:
            tags:
                - OriginService
            description: |-
                Lists the files changed by a comparison: the diff of `head` against the
                 merge base of `base` and `head`. `basehead` is `"{base}...{head}"`; refs
                 containing "/" must use their SHA. Unrelated histories return NOT_FOUND.
            operationId: OriginService_ListComparisonFiles
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: basehead
                  in: path
                  description: |-
                    `"{base}...{head}"`, where either revision may be a SHA, branch, tag, or
                     symbolic ref such as `HEAD`.
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max changed files to return. Defaults to 30 when unset or 0. Values above
                     100 are clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page. The token is bound to the resolved comparison, page size, and
                     file cursor, so `basehead` and `page_size` on a follow-up request must
                     match the token; if the comparison's resolved commits have changed since
                     the token was issued, the request fails with INVALID_ARGUMENT and listing
                     must restart from the first page.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListComparisonFilesResponse'
                            examples:
                                listComparisonFiles:
                                    value:
                                        files:
                                            - filename: src/telemetry.ts
                                              status: modified
                                              additions: 6
                                              deletions: 3
                                              changes: 9
                                              patch: |
                                                @@ -12,6 +12,9 @@
                                                 import { ignite } from "./ignition";
                                                +import { emitLaunchTelemetry } from "./telemetry";
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/contents:
        get:
            tags:
                - OriginService
            description: |-
                Returns file or directory contents at a ref.
                 The file path is passed as the `path` query parameter (supports nested
                 paths); omit or leave empty for the repository root directory.
                 Files larger than 1 MiB (decoded) are rejected with FailedPrecondition
                 (HTTP 400); fetch larger files by cloning the repository over Git HTTPS.
            operationId: OriginService_GetContents
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: path
                  in: query
                  description: |-
                    Path to the file or directory relative to the repository root. Empty
                     requests the root directory.
                  schema:
                    type: string
                - name: ref
                  in: query
                  description: |-
                    Commit, branch, tag, or symbolic ref (for example `HEAD`) to read from.
                     Empty means the repository's default branch.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Content'
                            examples:
                                getContents:
                                    value:
                                        type: file
                                        encoding: base64
                                        size: "312"
                                        name: telemetry.ts
                                        path: src/telemetry.ts
                                        sha: c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0
                                        content: Y29uc29sZS5sb2coImxhdW5jaCIpOwo=
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/contents:batchGet:
        post:
            tags:
                - OriginService
            description: |-
                Returns the contents of several explicit paths at a ref in one request.
                 Each requested path yields a result marking whether it was found; a found
                 path carries the same `Content` shape as `GetContents` (files as base64,
                 directories as immediate `entries`, symlinks as files). Paths are matched
                 exactly — no globs or patterns — and at most 20 may be requested; duplicates
                 are removed. A single file larger than the GetContents 1 MiB cap fails the
                 whole batch with FailedPrecondition (HTTP 400). Uses POST because the path
                 list travels in the request body.
            operationId: OriginService_BatchGetContents
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - paths
                            type: object
                            properties:
                                paths:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        Exact paths to fetch, relative to the repository root (no globs or
                                         patterns). At most 20 entries; duplicates are removed. An empty string
                                         requests the repository root directory.
                                ref:
                                    type: string
                                    description: |-
                                        Commit, branch, tag, or symbolic ref (for example `HEAD`) to read from.
                                         Empty means the repository's default branch.
                        examples:
                            batchGetContents:
                                value:
                                    paths:
                                        - src/telemetry.ts
                                    ref: main
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/BatchGetContentsResponse'
                            examples:
                                batchGetContents:
                                    value:
                                        results:
                                            - path: src/telemetry.ts
                                              found: true
                                              content:
                                                type: file
                                                encoding: base64
                                                size: "312"
                                                name: telemetry.ts
                                                path: src/telemetry.ts
                                                sha: c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0
                                                content: Y29uc29sZS5sb2coImxhdW5jaCIpOwo=
                                        resolvedCommitSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/git/blobs/{sha}:
        get:
            tags:
                - OriginService
            description: |-
                Returns a Git blob object by SHA.
                 Default response is JSON with MIME-wrapped base64 `content`. Pass
                 `Accept: application/vnd.origin.raw+json` (or `application/vnd.origin.raw`)
                 on the REST surface to receive raw blob bytes instead.
                 Blobs larger than 4 MiB (decoded) are rejected; fetch larger files by
                 cloning the repository over Git HTTPS. Empty repositories return 409
                 Conflict.
            operationId: OriginService_GetBlob
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: sha
                  in: path
                  description: Full or abbreviated hex SHA of the blob object.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Blob'
                            examples:
                                getBlob:
                                    value:
                                        sha: c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0
                                        size: 312
                                        encoding: base64
                                        content: Y29uc29sZS5sb2coImxhdW5jaCIpOwo=
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/git/commits/{sha}:
        get:
            tags:
                - OriginService
            description: |-
                Returns a Git commit object by SHA (or resolvable revision).
                 This is the low-level Git Database commit shape (flat author/message/tree),
                 not the higher-level `GetCommit` resource under `/commits/{sha}`.
                 `sha` accepts a commit SHA, branch, tag, or symbolic ref such as `HEAD`.
                 Empty repositories return 409 Conflict.
            operationId: OriginService_GetGitCommit
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: sha
                  in: path
                  description: |-
                    Full or abbreviated hex SHA of the commit object, or a branch, tag, or
                     symbolic ref such as `HEAD`.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/GitCommit'
                            examples:
                                getGitCommit:
                                    value:
                                        sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                        author:
                                            name: Jane Doe
                                            email: jane@acme.dev
                                            date: "2026-08-01T09:30:00Z"
                                        committer:
                                            name: Jane Doe
                                            email: jane@acme.dev
                                            date: "2026-08-01T09:30:00Z"
                                        message: Add launch telemetry
                                        tree:
                                            sha: a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8
                                        parents:
                                            - sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/git/commits:createFromFiles:
        post:
            tags:
                - OriginService
            description: |-
                Creates a commit on a branch from inline file changes and advances the
                 branch to it. `target_branch` must currently point at `expected_head_sha`,
                 which becomes the new commit's parent; a branch that has moved or does
                 not exist fails with FAILED_PRECONDITION, as does a write blocked by a
                 push ruleset or attempted on a repository whose contents are mirrored
                 from another host. The changes must alter the tree: an empty diff is
                 rejected with FAILED_PRECONDITION. Limits per request: 1000 file changes,
                 8 MiB per file, 32 MiB of content in total.
            operationId: OriginService_CreateCommitFromFiles
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - targetBranch
                                - expectedHeadSha
                                - message
                                - author
                                - files
                            type: object
                            properties:
                                targetBranch:
                                    type: string
                                    description: |-
                                        Branch that receives the commit, as `<branch>`, `heads/<branch>`, or
                                         `refs/heads/<branch>`. The branch must already exist.
                                expectedHeadSha:
                                    type: string
                                    description: |-
                                        Full hex SHA the target branch must currently point at. It becomes the
                                         new commit's parent; the write fails with FAILED_PRECONDITION when the
                                         branch tip differs.
                                message:
                                    type: string
                                    description: Commit message.
                                author:
                                    allOf:
                                        - $ref: '#/components/schemas/CommitSignature'
                                    description: Commit author. Timestamps are assigned by the server.
                                committer:
                                    allOf:
                                        - $ref: '#/components/schemas/CommitSignature'
                                    description: Commit committer. Defaults to `author` when omitted.
                                files:
                                    type: array
                                    items:
                                        $ref: '#/components/schemas/CommitFileChange'
                                    description: |-
                                        File changes applied to the branch tip's tree. At least one change is
                                         required, and paths must be unique within a request.
                        examples:
                            createCommitFromFiles:
                                value:
                                    targetBranch: feature/login
                                    expectedHeadSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                    message: Add login telemetry
                                    author:
                                        name: Jane Doe
                                        email: jane@acme.dev
                                    files:
                                        - path: src/login/telemetry.ts
                                          content: export const LOGIN_EVENT = 1;
                                        - path: assets/login.png
                                          content: iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==
                                          encoding: base64
                                        - path: src/login/legacy.ts
                                          delete: true
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/CreateCommitFromFilesResponse'
                            examples:
                                createCommitFromFiles:
                                    value:
                                        sha: 5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d
                                        treeSha: a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8
                                        previousHeadSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:write
    /v1/origin/repos/{ownerSlug}/{repoName}/git/matching-refs:
        get:
            tags:
                - OriginService
            description: |-
                Lists Git references whose names start with the given prefix.
                 REST responses unwrap to a JSON array (via `response_body`).
                 A trailing slash on `ref` is preserved (`heads/` → `refs/heads/`).
                 The symbolic `HEAD` is matched exactly (it is not under `refs/`).
                 Empty repositories return 409 Conflict.
            operationId: OriginService_ListMatchingGitRefs_2
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: ref
                  in: query
                  description: |-
                    Prefix to match. Typically `heads/<prefix>` or `tags/<prefix>`; a leading
                     `refs/` is accepted and normalized. Empty lists all refs (REST binding
                     without a trailing path segment).
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListMatchingGitRefsResponse'
                            examples:
                                listMatchingGitRefs:
                                    value:
                                        refs:
                                            - ref: refs/heads/main
                                              object:
                                                sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                                type: commit
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/git/matching-refs/{ref}:
        get:
            tags:
                - OriginService
            description: |-
                Lists Git references whose names start with the given prefix.
                 REST responses unwrap to a JSON array (via `response_body`).
                 A trailing slash on `ref` is preserved (`heads/` → `refs/heads/`).
                 The symbolic `HEAD` is matched exactly (it is not under `refs/`).
                 Empty repositories return 409 Conflict.
            operationId: OriginService_ListMatchingGitRefs
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: ref
                  in: path
                  description: |-
                    Prefix to match. Typically `heads/<prefix>` or `tags/<prefix>`; a leading
                     `refs/` is accepted and normalized. Empty lists all refs (REST binding
                     without a trailing path segment).
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListMatchingGitRefsResponse'
                            examples:
                                listMatchingGitRefs:
                                    value:
                                        refs:
                                            - ref: refs/heads/main
                                              object:
                                                sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                                type: commit
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/git/ref/{ref}:
        get:
            tags:
                - OriginService
            description: |-
                Returns a single Git reference by name.
                 `ref` is typically `heads/<branch>` or `tags/<tag>` (with or without a
                 leading `refs/`), or the symbolic `HEAD`. Exact match only; use
                 ListMatchingGitRefs for prefixes. Empty repositories return 409 Conflict.
            operationId: OriginService_GetGitRef
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: ref
                  in: path
                  description: |-
                    Git reference name. Typically `heads/<branch>` or `tags/<tag>`; a leading
                     `refs/` is accepted and normalized. The symbolic `HEAD` is also accepted
                     (returned as `ref: "HEAD"` with the tip commit). Exact match on the full
                     ref name.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/GitRef'
                            examples:
                                getGitRef:
                                    value:
                                        ref: refs/heads/main
                                        object:
                                            sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            type: commit
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/git/refs:
        post:
            tags:
                - OriginService
            description: |-
                Creates a branch reference pointing at an existing commit.
                 `ref` names the branch as `refs/heads/<branch>` or `heads/<branch>`; only
                 branch references can be created. `sha` must be the full hex SHA of a
                 commit already present in the repository. Creating a branch that already
                 points at `sha` succeeds and returns the existing reference; a branch that
                 exists at any other commit returns 409 Conflict. A create blocked by a
                 push ruleset, or on a repository whose contents are mirrored from another
                 host, fails with FAILED_PRECONDITION.
            operationId: OriginService_CreateGitRef
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - ref
                                - sha
                            type: object
                            properties:
                                ref:
                                    type: string
                                    description: |-
                                        Branch reference to create, as `refs/heads/<branch>` or `heads/<branch>`.
                                         Only branch references can be created; tag and other reference names are
                                         rejected.
                                sha:
                                    type: string
                                    description: Full hex SHA of an existing commit that the new branch points at.
                        examples:
                            createGitRef:
                                value:
                                    ref: refs/heads/feature/login
                                    sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/GitRef'
                            examples:
                                createGitRef:
                                    value:
                                        ref: refs/heads/feature/login
                                        object:
                                            sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            type: commit
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:write
    /v1/origin/repos/{ownerSlug}/{repoName}/git/tags/{sha}:
        get:
            tags:
                - OriginService
            description: |-
                Returns an annotated Git tag object by SHA.
                 Lightweight tags are not tag objects and return NotFound.
                 Empty repositories return 409 Conflict.
            operationId: OriginService_GetTag
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: sha
                  in: path
                  description: Full or abbreviated hex SHA of the annotated tag object.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/GitTag'
                            examples:
                                getTag:
                                    value:
                                        sha: e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2
                                        tag: v1.2.0
                                        message: Release v1.2.0
                                        tagger:
                                            name: Jane Doe
                                            email: jane@acme.dev
                                            date: "2026-08-01T09:30:00Z"
                                        object:
                                            sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            type: commit
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/git/trees/{sha}:
        get:
            tags:
                - OriginService
            description: |-
                Returns a Git tree object by SHA or resolvable revision.
                 `sha` accepts a tree SHA, commit SHA, branch, tag, or symbolic ref such as
                 `HEAD`. Set `recursive=true` (or `1`) to walk the whole tree; omitting the
                 parameter or passing any other value lists immediate children only.
                 Recursive listings truncate at
                 100,000 entries or 7 MiB and set `truncated=true`. Empty repositories
                 return 409 Conflict.
            operationId: OriginService_GetTree
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: sha
                  in: path
                  description: Tree SHA, commit SHA, branch, tag, or symbolic ref such as `HEAD`.
                  required: true
                  schema:
                    type: string
                - name: recursive
                  in: query
                  description: |-
                    When true, returns the full recursive walk of the tree. Query values
                     `true` and `1` enable recursion; omitting the parameter or passing any
                     other value (including `false` and `0`) lists immediate children only.
                  schema:
                    type: boolean
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/GitTree'
                            examples:
                                getTree:
                                    value:
                                        sha: a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8
                                        tree:
                                            - path: src/telemetry.ts
                                              mode: "100644"
                                              type: blob
                                              sha: c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0
                                              size: 312
                                        truncated: false
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/grants:
        get:
            tags:
                - OriginService
            description: |-
                Lists the users, groups, and owning-team groups holding a permission
                 granted directly on a repository. Permissions inherited from the
                 repository's owner are not included. Paginated with `page_size` and
                 `page_token`; default page size is 30, maximum is 100.
            operationId: OriginService_ListRepositoryGrants
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max grants to return. Defaults to 30 when unset or 0. Values above 100
                     are clamped to 100. Ignored when `page_token` is set.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListRepositoryGrantsResponse'
                            examples:
                                listRepositoryGrants:
                                    value:
                                        grants:
                                            - group:
                                                id: grp_01k2ja2000e0080000000000n2
                                              permission: admin
                                            - teamGroup:
                                                kind: admins
                                              permission: admin
                                            - teamGroup:
                                                kind: members
                                              permission: write
                                            - user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                                              permission: read
                                        repository:
                                            id: repo_01k2ja2000e0080000000000q4
                                            name: rocket
                                            owner:
                                                slug: acme
                                                id: ns_01k2ja2000e0080000000000p3
                                                type: team
                                        nextPageToken: ""
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:settings:read
        post:
            tags:
                - OriginService
            description: |-
                Sets the permission a user, group, or owning-team group holds directly on
                 a repository, replacing any permission previously granted directly to that
                 principal. Repeating a grant the principal already holds succeeds without
                 change. Only `read`, `write`, and `admin` are accepted; `custom` fails with
                 INVALID_ARGUMENT. A user must be an active member of the repository
                 owner's team or organization and a group an active group of that
                 organization; otherwise the request fails with FAILED_PRECONDITION.
            operationId: OriginService_UpsertRepositoryGrant
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - permission
                            type: object
                            properties:
                                user:
                                    $ref: '#/components/schemas/OriginUserActor'
                                group:
                                    $ref: '#/components/schemas/OriginGroup'
                                teamGroup:
                                    $ref: '#/components/schemas/OriginTeamGroup'
                                permission:
                                    enum:
                                        - read
                                        - write
                                        - admin
                                        - custom
                                    type: string
                                    description: '`read`, `write`, or `admin`.'
                                    format: enum
                        examples:
                            upsertRepositoryGrant:
                                value:
                                    user:
                                        id: user_01k2ja2000e0080000000000c3
                                    permission: write
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/RepositoryGrant'
                            examples:
                                upsertRepositoryGrant:
                                    value:
                                        user:
                                            id: user_01k2ja2000e0080000000000c3
                                            email: jane@acme.dev
                                        permission: write
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:settings:write
        delete:
            tags:
                - OriginService
            description: |-
                Removes the permission a user, group, or owning-team group holds directly
                 on a repository. Permissions inherited from the repository's owner are
                 unaffected, so an owning-team group falls back to its owner-level default.
                 Removing a permission the principal does not hold directly succeeds
                 without change.
            operationId: OriginService_DeleteRepositoryGrant
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                user:
                                    $ref: '#/components/schemas/OriginUserActor'
                                group:
                                    $ref: '#/components/schemas/OriginGroup'
                                teamGroup:
                                    $ref: '#/components/schemas/OriginTeamGroup'
                        examples:
                            deleteRepositoryGrant:
                                value:
                                    group:
                                        id: grp_01k2ja2000e0080000000000n2
                required: true
            responses:
                "204":
                    description: OK
                    content: {}
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:settings:write
    /v1/origin/repos/{ownerSlug}/{repoName}/labels:
        get:
            tags:
                - OriginService
            description: |-
                Lists labels defined on a repository, ordered by name, paginated with
                 `page_size` and `page_token`. Default page size is 30; maximum is 100.
            operationId: OriginService_ListLabels
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Maximum labels to return. Defaults to 30 when omitted or zero; capped at
                     100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListLabelsResponse'
                            examples:
                                listLabels:
                                    value:
                                        labels:
                                            - id: lbl_01k2ja2000e0080000000000m1
                                              name: bug
                                              color: d73a4a
                                              description: Something isn't working
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:labels:read
        post:
            tags:
                - OriginService
            description: |-
                Creates a repository label. Returns the created label. Duplicate names
                 return ALREADY_EXISTS.
            operationId: OriginService_CreateLabel
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - name
                                - color
                            type: object
                            properties:
                                name:
                                    type: string
                                    description: |-
                                        Label name. Leading and trailing whitespace is trimmed. Maximum 50
                                         characters.
                                color:
                                    type: string
                                    description: Six-character hex color without a leading `#`.
                                description:
                                    type: string
                                    description: Optional description. Maximum 255 characters.
                        examples:
                            createLabel:
                                value:
                                    name: bug
                                    color: d73a4a
                                    description: Something isn't working
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Label'
                            examples:
                                createLabel:
                                    value:
                                        id: lbl_01k2ja2000e0080000000000m1
                                        name: bug
                                        color: d73a4a
                                        description: Something isn't working
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:labels:write
    /v1/origin/repos/{ownerSlug}/{repoName}/labels/{labelName}:
        get:
            tags:
                - OriginService
            description: Returns a single repository label by name. Unknown names return NOT_FOUND.
            operationId: OriginService_GetLabel
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: labelName
                  in: path
                  description: Label name. Leading and trailing whitespace is trimmed before lookup.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Label'
                            examples:
                                getLabel:
                                    value:
                                        id: lbl_01k2ja2000e0080000000000m1
                                        name: bug
                                        color: d73a4a
                                        description: Something isn't working
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:labels:read
        delete:
            tags:
                - OriginService
            description: Deletes a repository label by name.
            operationId: OriginService_DeleteLabel
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: labelName
                  in: path
                  description: Label name. Leading and trailing whitespace is trimmed before lookup.
                  required: true
                  schema:
                    type: string
            responses:
                "204":
                    description: OK
                    content: {}
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:labels:write
        patch:
            tags:
                - OriginService
            description: |-
                Updates a repository label identified by its current name. Omitted fields
                 are left unchanged. Rename with `name`.
            operationId: OriginService_UpdateLabel
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: labelName
                  in: path
                  description: |-
                    Current label name. Leading and trailing whitespace is trimmed before
                     lookup.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                name:
                                    type: string
                                    description: |-
                                        New label name. Leading and trailing whitespace is trimmed. Maximum 50
                                         characters. Omit to leave unchanged.
                                color:
                                    type: string
                                    description: Six-character hex color without a leading `#`. Omit to leave unchanged.
                                description:
                                    type: string
                                    description: Description. Maximum 255 characters. Omit to leave unchanged.
                        examples:
                            updateLabel:
                                value:
                                    color: b60205
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Label'
                            examples:
                                updateLabel:
                                    value:
                                        id: lbl_01k2ja2000e0080000000000m1
                                        name: bug
                                        color: b60205
                                        description: Something isn't working
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:labels:write
    /v1/origin/repos/{ownerSlug}/{repoName}/mirror:
        delete:
            tags:
                - OriginService
            description: |-
                Permanently disconnects a mirrored repository from its upstream source.
                 The repository keeps its current contents and becomes a native
                 repository; syncing stops in both directions and the mirror's deploy
                 credential is deleted. A repository that never had a mirror is rejected
                 with FAILED_PRECONDITION; detaching an already-detached repository
                 succeeds without effect. Detaching is not reversible through this API.
            operationId: OriginService_DetachRepoMirror
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            responses:
                "204":
                    description: OK
                    content: {}
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - user
                scopes:
                    - repository:mirror:delete
    /v1/origin/repos/{ownerSlug}/{repoName}/mirror/transition-jobs/{jobId}:
        get:
            tags:
                - OriginService
            description: Returns one mirror transition job by id.
            operationId: OriginService_GetMirrorTransitionJob
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: jobId
                  in: path
                  description: Identifier of the transition job, as returned in `job.id`.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/MirrorTransitionJob'
                            examples:
                                getMirrorTransitionJob:
                                    value:
                                        id: rmt_01k2ja2000e0080000000000m3
                                        transition: inbound_to_outbound
                                        status: succeeded
                                        phase: completed
                                        attemptCount: 1
                                        startedAt: "2026-08-02T15:00:00Z"
                                        completedAt: "2026-08-02T15:12:00Z"
                                        createdAt: "2026-08-02T14:59:30Z"
                                        updatedAt: "2026-08-02T15:12:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:metadata:read
    /v1/origin/repos/{ownerSlug}/{repoName}/mirror/transition-jobs:active:
        get:
            tags:
                - OriginService
            description: |-
                Returns the repository's currently active mirror transition job and its
                 most recent terminal one. Both fields are optional: `active_job` is
                 absent when no transition is in progress, and `last_job` is absent when
                 the repository has never completed a transition.
            operationId: OriginService_GetActiveMirrorTransitionJob
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/GetActiveMirrorTransitionJobResponse'
                            examples:
                                getActiveMirrorTransitionJob:
                                    value:
                                        activeJob:
                                            id: rmt_01k2ja2000e0080000000000m4
                                            transition: outbound_to_inbound
                                            status: running
                                            phase: draining-writes
                                            attemptCount: 1
                                            drainUntil: "2026-08-02T15:05:00Z"
                                            startedAt: "2026-08-02T15:00:00Z"
                                            createdAt: "2026-08-02T14:59:30Z"
                                            updatedAt: "2026-08-02T15:01:00Z"
                                        lastJob:
                                            id: rmt_01k2ja2000e0080000000000m3
                                            transition: inbound_to_outbound
                                            status: succeeded
                                            phase: completed
                                            attemptCount: 1
                                            startedAt: "2026-08-01T10:00:00Z"
                                            completedAt: "2026-08-01T10:12:00Z"
                                            createdAt: "2026-08-01T09:59:30Z"
                                            updatedAt: "2026-08-01T10:12:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:metadata:read
    /v1/origin/repos/{ownerSlug}/{repoName}/mirror:forceCutover:
        post:
            tags:
                - OriginService
            description: |-
                Forces an `outbound_to_inbound` cutover without pushing this host's
                 divergent state back to the upstream source: the source is adopted as
                 source of truth as-is, and refs that only exist on this host are
                 snapshotted and abandoned. Accepted only for a repository in `outbound`
                 status, or one stuck in a `transitioning-outbound-to-inbound` status whose
                 active job requires attention (that job is superseded); any other state,
                 including a queued or running transition job, is rejected with
                 FAILED_PRECONDITION. The caller must administer the repository on the
                 mirror's upstream source; a caller without that access is rejected with
                 PERMISSION_DENIED. Returns the job tracking the forced cutover.
            operationId: OriginService_ForceRepoMirrorCutover
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            type: object
                            properties: {}
                        examples:
                            forceRepoMirrorCutover:
                                value: {}
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/TransitionRepoMirrorResponse'
                            examples:
                                forceRepoMirrorCutover:
                                    value:
                                        repository:
                                            id: repo_01k2ja2000e0080000000000q4
                                            name: rocket
                                            fullName: acme/rocket
                                            owner:
                                                slug: acme
                                                id: ns_01k2ja2000e0080000000000p3
                                                type: team
                                            defaultBranch: main
                                            createdAt: "2026-08-01T09:30:00Z"
                                            updatedAt: "2026-08-02T15:00:00Z"
                                            pushedAt: "2026-08-02T14:45:00Z"
                                            cloneUrl: https://origin.cursor.com/git/acme/rocket.git
                                            mirror:
                                                source: github
                                                sourceId: R_kgDOAbc123
                                                status: outbound
                                        job:
                                            id: rmt_01k2ja2000e0080000000000m4
                                            transition: outbound_to_inbound
                                            status: running
                                            phase: snapshotting-refs
                                            attemptCount: 1
                                            startedAt: "2026-08-02T15:00:00Z"
                                            createdAt: "2026-08-02T14:59:30Z"
                                            updatedAt: "2026-08-02T15:01:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - user
                scopes:
                    - repository:mirror:write
    /v1/origin/repos/{ownerSlug}/{repoName}/mirror:transition:
        post:
            tags:
                - OriginService
            description: |-
                Starts a mirror-state transition on a mirrored repository and returns the
                 job tracking it. The repository enters a transitioning mirror status while
                 the job runs; poll GetActiveMirrorTransitionJob or GetMirrorTransitionJob
                 until the job reaches a terminal status. A repository that is not in the
                 transition's expected start state, or that already has an active
                 transition job, is rejected with FAILED_PRECONDITION. The caller must
                 administer the repository on the mirror's upstream source; a caller
                 without that access is rejected with PERMISSION_DENIED.
            operationId: OriginService_TransitionRepoMirror
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - transition
                            type: object
                            properties:
                                transition:
                                    enum:
                                        - initial_to_inbound
                                        - inbound_to_outbound
                                        - outbound_to_inbound
                                    type: string
                                    description: The mirror-state change to start.
                                    format: enum
                        examples:
                            transitionRepoMirror:
                                value:
                                    transition: inbound_to_outbound
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/TransitionRepoMirrorResponse'
                            examples:
                                transitionRepoMirror:
                                    value:
                                        repository:
                                            id: repo_01k2ja2000e0080000000000q4
                                            name: rocket
                                            fullName: acme/rocket
                                            owner:
                                                slug: acme
                                                id: ns_01k2ja2000e0080000000000p3
                                                type: team
                                            defaultBranch: main
                                            createdAt: "2026-08-01T09:30:00Z"
                                            updatedAt: "2026-08-02T15:00:00Z"
                                            pushedAt: "2026-08-02T14:45:00Z"
                                            cloneUrl: https://origin.cursor.com/git/acme/rocket.git
                                            mirror:
                                                source: github
                                                sourceId: R_kgDOAbc123
                                                status: inbound
                                        job:
                                            id: rmt_01k2ja2000e0080000000000m3
                                            transition: inbound_to_outbound
                                            status: running
                                            phase: draining-writes
                                            attemptCount: 1
                                            drainUntil: "2026-08-02T15:05:00Z"
                                            startedAt: "2026-08-02T15:00:00Z"
                                            createdAt: "2026-08-02T14:59:30Z"
                                            updatedAt: "2026-08-02T15:01:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - user
                scopes:
                    - repository:mirror:write
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls:
        get:
            tags:
                - OriginService
            description: |-
                Lists pull requests in a repo, optionally filtered by head branch, base
                 branch, author, creation-time range, and state, in creation order
                 (newest first by default; set `direction=asc` for oldest first). Each
                 pull request includes its assigned labels.
            operationId: OriginService_ListPullRequests
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: head
                  in: query
                  description: Optional exact branch (head-ref) filter. Omit to list across every branch.
                  schema:
                    type: string
                - name: state
                  in: query
                  description: '"open" | "closed" | "all". Defaults to "open".'
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: Maximum results to return. Defaults to 30; maximum 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page.
                  schema:
                    type: string
                - name: author
                  in: query
                  description: |-
                    Optional author filter: an actor id as returned in
                     `pull_request.author.id` (`user_…`, `app_…`, or `sa_…`) or an exact user
                     email. Email matching is case-insensitive. An author that does not resolve
                     uniquely yields an empty list. Any other value, including the shared
                     `origin-cursor-managed-actor` id, is rejected with INVALID_ARGUMENT.
                  schema:
                    type: string
                - name: base
                  in: query
                  description: |-
                    Optional exact base-branch filter. Accepts a short name (`main`) or a
                     fully qualified ref (`refs/heads/main`). Omit to list across every base.
                  schema:
                    type: string
                - name: direction
                  in: query
                  description: |-
                    Sort direction by creation order (pull number): `"desc"` (newest first,
                     the default) or `"asc"` (oldest first).
                  schema:
                    type: string
                - name: since
                  in: query
                  description: |-
                    Optional inclusive lower bound on creation time (RFC 3339 timestamp,
                     e.g. `2026-08-01T00:00:00Z`): only pull requests created at or after
                     this instant. Malformed timestamps are rejected with INVALID_ARGUMENT.
                  schema:
                    type: string
                - name: until
                  in: query
                  description: |-
                    Optional inclusive upper bound on creation time (RFC 3339 timestamp):
                     only pull requests created at or before this instant. Malformed
                     timestamps are rejected with INVALID_ARGUMENT.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListPullRequestsResponse'
                            examples:
                                listPullRequests:
                                    value:
                                        pullRequests:
                                            - id: pr_01k2ja2000e0080000000000d4
                                              number: "17"
                                              state: open
                                              draft: false
                                              merged: false
                                              title: Add launch telemetry
                                              body: Adds structured launch telemetry to the ignition path.
                                              head:
                                                ref: add-telemetry
                                                sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                              base:
                                                ref: main
                                                sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                              author:
                                                user:
                                                    id: user_01k2ja2000e0080000000000c3
                                                    email: jane@acme.dev
                                              createdAt: "2026-08-01T09:30:00Z"
                                              updatedAt: "2026-08-02T14:45:00Z"
                                              additions: 128
                                              deletions: 46
                                              changedFiles: 5
                                              labels:
                                                - id: lbl_01k2ja2000e0080000000000m1
                                                  name: bug
                                                  color: d73a4a
                                                  description: Something isn't working
                                              version:
                                                number: "3"
                                                headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                                baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                                createdAt: "2026-08-01T09:30:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:read
        post:
            tags:
                - OriginService
            description: |-
                Creates a pull request from `head` into `base`.

                 Optional `parent_pull_number` stacks this change on another open or draft
                 pull request in the same repository.
            operationId: OriginService_CreatePullRequest
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - title
                                - head
                                - base
                            type: object
                            properties:
                                title:
                                    type: string
                                    description: Pull request title.
                                body:
                                    type: string
                                    description: Pull request body / description. May be empty.
                                head:
                                    type: string
                                    description: |-
                                        Source branch name (the head of the change). Must resolve in the repo at
                                         call time.
                                base:
                                    type: string
                                    description: |-
                                        Target branch name (what the change merges into). Must resolve in the repo
                                         at call time.
                                draft:
                                    type: boolean
                                    description: |-
                                        When true, create as a draft. When false or omitted, create as open
                                         (ready for review).
                                parentPullNumber:
                                    type: string
                                    description: |-
                                        Optional parent pull request number when stacking this change on another
                                         open/draft change in the same repository.
                        examples:
                            createPullRequest:
                                value:
                                    title: Add launch telemetry
                                    body: Adds structured launch telemetry to the ignition path.
                                    head: add-telemetry
                                    base: main
                                    draft: false
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/PullRequest'
                            examples:
                                createPullRequest:
                                    value:
                                        id: pr_01k2ja2000e0080000000000d4
                                        number: "17"
                                        state: open
                                        draft: false
                                        merged: false
                                        title: Add launch telemetry
                                        body: Adds structured launch telemetry to the ignition path.
                                        head:
                                            ref: add-telemetry
                                            sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                        base:
                                            ref: main
                                            sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                        author:
                                            user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                                        additions: 128
                                        deletions: 46
                                        changedFiles: 5
                                        labels:
                                            - id: lbl_01k2ja2000e0080000000000m1
                                              name: bug
                                              color: d73a4a
                                              description: Something isn't working
                                        version:
                                            number: "3"
                                            headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                            createdAt: "2026-08-01T09:30:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:write
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls/comments/{commentId}:
        get:
            tags:
                - OriginService
            description: Returns a single pull request comment by its stable Origin id.
            operationId: OriginService_GetPullRequestComment
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: commentId
                  in: path
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/PullRequestComment'
                            examples:
                                getPullRequestComment:
                                    value:
                                        id: cmt_01k2ja2000e0080000000000e5
                                        thread:
                                            id: cth_01k2ja2000e0080000000000s6
                                            version:
                                                number: "3"
                                                headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                                baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                                createdAt: "2026-08-01T09:30:00Z"
                                            path: src/telemetry/retry.ts
                                            side: right
                                            startLine: 42
                                            endLine: 45
                                            createdAt: "2026-08-01T09:30:00Z"
                                            updatedAt: "2026-08-02T14:45:00Z"
                                        body: Should the retry budget be configurable?
                                        author:
                                            user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:reviews:read
        patch:
            tags:
                - OriginService
            description: Updates a pull request comment by its stable Origin id.
            operationId: OriginService_UpdatePullRequestComment
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: commentId
                  in: path
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - body
                            type: object
                            properties:
                                body:
                                    type: string
                        examples:
                            updatePullRequestComment:
                                value:
                                    body: Should the retry budget be configurable?
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/PullRequestComment'
                            examples:
                                updatePullRequestComment:
                                    value:
                                        id: cmt_01k2ja2000e0080000000000e5
                                        thread:
                                            id: cth_01k2ja2000e0080000000000s6
                                            version:
                                                number: "3"
                                                headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                                baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                                createdAt: "2026-08-01T09:30:00Z"
                                            path: src/telemetry/retry.ts
                                            side: right
                                            startLine: 42
                                            endLine: 45
                                            createdAt: "2026-08-01T09:30:00Z"
                                            updatedAt: "2026-08-02T14:45:00Z"
                                        body: Should the retry budget be configurable?
                                        author:
                                            user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:reviews:write
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls/threads/{threadId}:
        patch:
            tags:
                - OriginService
            description: |-
                Resolves or reopens a pull request comment thread and returns the
                 thread's updated state. Resolving an already-resolved thread, or
                 reopening an already-open one, is a no-op.
            operationId: OriginService_UpdatePullRequestThread
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: threadId
                  in: path
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - resolved
                            type: object
                            properties:
                                resolved:
                                    type: boolean
                                    description: Target resolution state. True resolves the thread; false reopens it.
                        examples:
                            updatePullRequestThread:
                                value:
                                    resolved: true
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Thread'
                            examples:
                                updatePullRequestThread:
                                    value:
                                        id: cth_01k2ja2000e0080000000000s6
                                        version:
                                            number: "3"
                                            headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                            createdAt: "2026-08-01T09:30:00Z"
                                        path: src/telemetry/retry.ts
                                        side: right
                                        startLine: 42
                                        endLine: 45
                                        resolvedAt: "2026-08-03T10:00:00Z"
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-03T10:00:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:reviews:write
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls/{pullNumber}:
        get:
            tags:
                - OriginService
            description: Returns a single pull request, including its assigned labels.
            operationId: OriginService_GetPullRequest
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/PullRequest'
                            examples:
                                getPullRequest:
                                    value:
                                        id: pr_01k2ja2000e0080000000000d4
                                        number: "17"
                                        state: open
                                        draft: false
                                        merged: false
                                        title: Add launch telemetry
                                        body: Adds structured launch telemetry to the ignition path.
                                        head:
                                            ref: add-telemetry
                                            sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                        base:
                                            ref: main
                                            sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                        author:
                                            user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                                        additions: 128
                                        deletions: 46
                                        changedFiles: 5
                                        labels:
                                            - id: lbl_01k2ja2000e0080000000000m1
                                              name: bug
                                              color: d73a4a
                                              description: Something isn't working
                                        version:
                                            number: "3"
                                            headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                            createdAt: "2026-08-01T09:30:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:read
        patch:
            tags:
                - OriginService
            description: |-
                Updates a pull request's title, body, base branch, and/or lifecycle state.

                 Omitted fields are unchanged. Present fields are applied in order:
                 metadata, then reopen/draft/ready-for-review, then base, then close. Close
                 runs last so a same-request retarget can still see an open change; reopen
                 runs before base so a closed pull can be retargeted. If a later step
                 fails, earlier steps may already have been committed.
            operationId: OriginService_UpdatePullRequest
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                title:
                                    type: string
                                    description: New title. Omitted fields are left unchanged.
                                body:
                                    type: string
                                    description: New body / description. An empty string clears the body.
                                state:
                                    type: string
                                    description: |-
                                        `"open"` or `"closed"`. `"closed"` closes the pull request. `"open"`
                                         without `draft: true` marks it ready for review, including publishing an
                                         existing draft. Merged is not writable — use `MergePullRequest`.
                                draft:
                                    type: boolean
                                    description: |-
                                        `true` marks the pull request draft; `false` marks it ready for review
                                         (and reopens it if currently closed). Ignored when `state` is `"closed"`.
                                base:
                                    type: string
                                    description: |-
                                        New base branch. Retargets the pull request and may update stack
                                         parentage when the new base is another change's head (or the default
                                         branch).
                        examples:
                            updatePullRequest:
                                value:
                                    title: Add launch telemetry
                                    body: Adds structured launch telemetry to the ignition path.
                                    state: open
                                    draft: false
                                    base: main
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/PullRequest'
                            examples:
                                updatePullRequest:
                                    value:
                                        id: pr_01k2ja2000e0080000000000d4
                                        number: "17"
                                        state: open
                                        draft: false
                                        merged: false
                                        title: Add launch telemetry
                                        body: Adds structured launch telemetry to the ignition path.
                                        head:
                                            ref: add-telemetry
                                            sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                        base:
                                            ref: main
                                            sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                        author:
                                            user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                                        additions: 128
                                        deletions: 46
                                        changedFiles: 5
                                        labels:
                                            - id: lbl_01k2ja2000e0080000000000m1
                                              name: bug
                                              color: d73a4a
                                              description: Something isn't working
                                        version:
                                            number: "3"
                                            headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                            createdAt: "2026-08-01T09:30:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:write
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls/{pullNumber}/comments:
        get:
            tags:
                - OriginService
            description: |-
                Lists every comment on a pull request in chronological order, optionally
                 bounded to a creation-time window. Each comment includes its thread
                 reference — id, diff anchor, and resolution state — so clients can group
                 the flat response into threads.
            operationId: OriginService_ListPullRequestComments
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: Maximum comments to return. Defaults to 30; maximum 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page.
                  schema:
                    type: string
                - name: since
                  in: query
                  description: |-
                    Optional inclusive RFC 3339 lower bound on comment creation time, e.g.
                     `2026-08-01T00:00:00Z`, matching the list's chronological order. A
                     malformed timestamp is rejected with INVALID_ARGUMENT. Page tokens embed
                     the bound; reusing a token under a different `since` is rejected.
                  schema:
                    type: string
                - name: until
                  in: query
                  description: |-
                    Optional inclusive RFC 3339 upper bound on comment creation time, e.g.
                     `2026-08-31T23:59:59Z`. A malformed timestamp is rejected with
                     INVALID_ARGUMENT. Page tokens embed the bound; reusing a token under a
                     different `until` is rejected.
                  schema:
                    type: string
                - name: threadIds
                  in: query
                  description: |-
                    Optional thread ids that restrict the listing to comments in those
                     threads. Empty or omitted returns every comment. Duplicates are
                     ignored. At most 20 ids. A page token embeds the canonical id set;
                     reusing a token under a different set is rejected with
                     INVALID_ARGUMENT.
                  schema:
                    type: array
                    items:
                        type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListPullRequestCommentsResponse'
                            examples:
                                listPullRequestComments:
                                    value:
                                        comments:
                                            - id: cmt_01k2ja2000e0080000000000e5
                                              thread:
                                                id: cth_01k2ja2000e0080000000000s6
                                                version:
                                                    number: "3"
                                                    headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                                    baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                                    createdAt: "2026-08-01T09:30:00Z"
                                                path: src/telemetry/retry.ts
                                                side: right
                                                startLine: 42
                                                endLine: 45
                                                createdAt: "2026-08-01T09:30:00Z"
                                                updatedAt: "2026-08-02T14:45:00Z"
                                              body: Should the retry budget be configurable?
                                              author:
                                                user:
                                                    id: user_01k2ja2000e0080000000000c3
                                                    email: jane@acme.dev
                                              createdAt: "2026-08-01T09:30:00Z"
                                              updatedAt: "2026-08-02T14:45:00Z"
                                        pullRequest:
                                            id: pr_01k2ja2000e0080000000000d4
                                            number: "17"
                                            repository:
                                                id: repo_01k2ja2000e0080000000000q4
                                                name: rocket
                                                owner:
                                                    slug: acme
                                                    id: ns_01k2ja2000e0080000000000p3
                                                    type: team
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:reviews:read
        post:
            tags:
                - OriginService
            description: |-
                Creates a comment on an Origin pull request.

                 The comment targets exactly one of: an existing thread (`thread_id` — a
                 reply, on general-discussion and inline threads alike), a new inline
                 thread on the version's diff (`inline`), or, with neither, a new
                 general-discussion thread.
            operationId: OriginService_CreatePullRequestComment
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - body
                            type: object
                            properties:
                                body:
                                    type: string
                                threadId:
                                    type: string
                                    description: |-
                                        Existing thread id to reply to. Cannot be combined with
                                         `version_number`.
                                inline:
                                    allOf:
                                        - $ref: '#/components/schemas/InlineCommentAnchor'
                                    description: Anchor for a new inline thread.
                                file:
                                    allOf:
                                        - $ref: '#/components/schemas/FileCommentAnchor'
                                    description: |-
                                        Anchor for a new file-level thread; the side is derived from the
                                         file's change kind.
                                versionNumber:
                                    type: string
                                    description: |-
                                        Pull request version number to file a new thread against. 0 or unset
                                         means the latest version at call time. Only meaningful for new
                                         threads; rejected together with `thread_id`.
                        examples:
                            createPullRequestComment:
                                value:
                                    body: Should the retry budget be configurable?
                            createPullRequestCommentFile:
                                value:
                                    body: This module needs a design doc link.
                                    file:
                                        path: src/telemetry/retry.ts
                                    versionNumber: "3"
                            createPullRequestCommentInline:
                                value:
                                    body: Should the retry budget be configurable?
                                    inline:
                                        path: src/telemetry/retry.ts
                                        side: right
                                        startLine: 42
                                        endLine: 45
                                    versionNumber: "3"
                            createPullRequestCommentReply:
                                value:
                                    body: Agreed — let's make it configurable.
                                    threadId: cth_01k2ja2000e0080000000000s6
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/PullRequestComment'
                            examples:
                                createPullRequestComment:
                                    value:
                                        id: cmt_01k2ja2000e0080000000000e5
                                        thread:
                                            id: cth_01k2ja2000e0080000000000s6
                                            version:
                                                number: "3"
                                                headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                                baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                                createdAt: "2026-08-01T09:30:00Z"
                                            path: src/telemetry/retry.ts
                                            side: right
                                            startLine: 42
                                            endLine: 45
                                            createdAt: "2026-08-01T09:30:00Z"
                                            updatedAt: "2026-08-02T14:45:00Z"
                                        body: Should the retry budget be configurable?
                                        author:
                                            user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                                        createdAt: "2026-08-01T09:30:00Z"
                                        updatedAt: "2026-08-02T14:45:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:reviews:write
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls/{pullNumber}/commits:
        get:
            tags:
                - OriginService
            description: Lists the commits in a pull request.
            operationId: OriginService_ListPullRequestCommits
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max commits to return. Defaults to 30 when unset or 0. Values above 100
                     are clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page. The token is bound to the repository, pull request version,
                     page size, and commit offset.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListPullRequestCommitsResponse'
                            examples:
                                listPullRequestCommits:
                                    value:
                                        commits:
                                            - sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                              commit:
                                                author:
                                                    name: Jane Doe
                                                    email: jane@acme.dev
                                                    date: "2026-08-01T09:30:00Z"
                                                committer:
                                                    name: Jane Doe
                                                    email: jane@acme.dev
                                                    date: "2026-08-01T09:30:00Z"
                                                message: Add launch telemetry
                                                tree:
                                                    sha: a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8
                                              parents:
                                                - sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                              stats:
                                                additions: 128
                                                deletions: 46
                                                total: 174
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:read
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls/{pullNumber}/files:
        get:
            tags:
                - OriginService
            description: Lists the files changed in a pull request.
            operationId: OriginService_ListPullRequestFiles
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: |-
                    Max changed files to return. Defaults to 30 when unset or 0. Values above
                     100 are clamped to 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page. The token is bound to the repository, pull request version,
                     page size, and changed-file cursor.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListPullRequestFilesResponse'
                            examples:
                                listPullRequestFiles:
                                    value:
                                        files:
                                            - filename: src/telemetry.ts
                                              status: modified
                                              additions: 6
                                              deletions: 3
                                              changes: 9
                                              patch: |
                                                @@ -12,6 +12,9 @@
                                                 import { ignite } from "./ignition";
                                                +import { emitLaunchTelemetry } from "./telemetry";
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:read
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls/{pullNumber}/labels:
        get:
            tags:
                - OriginService
            description: |-
                Lists every label assigned to a pull request, ordered by name. The
                 response is the full assigned list; a pull request can have at most 100
                 labels.
            operationId: OriginService_ListPullRequestLabels
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListPullRequestLabelsResponse'
                            examples:
                                listPullRequestLabels:
                                    value:
                                        labels:
                                            - id: lbl_01k2ja2000e0080000000000m1
                                              name: bug
                                              color: d73a4a
                                              description: Something isn't working
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:read
        put:
            tags:
                - OriginService
            description: |-
                Replaces every label assigned to a pull request with the provided names.
                 An empty list removes every assigned label. Unknown names and a missing
                 pull request return NOT_FOUND. Returns the labels assigned after the
                 replacement, ordered by name.
            operationId: OriginService_SetPullRequestLabels
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                labels:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        Label names to assign. Maximum 100. An empty list removes every assigned
                                         label. Duplicate names are ignored.
                        examples:
                            setPullRequestLabels:
                                value:
                                    labels:
                                        - bug
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/SetPullRequestLabelsResponse'
                            examples:
                                setPullRequestLabels:
                                    value:
                                        labels:
                                            - id: lbl_01k2ja2000e0080000000000m1
                                              name: bug
                                              color: d73a4a
                                              description: Something isn't working
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:write
        post:
            tags:
                - OriginService
            description: Adds existing repository labels to a pull request.
            operationId: OriginService_AddPullRequestLabels
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - labels
                            type: object
                            properties:
                                labels:
                                    type: array
                                    items:
                                        type: string
                                    description: Label names to add. Maximum 100.
                        examples:
                            addPullRequestLabels:
                                value:
                                    labels:
                                        - bug
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/AddPullRequestLabelsResponse'
                            examples:
                                addPullRequestLabels:
                                    value:
                                        labels:
                                            - id: lbl_01k2ja2000e0080000000000m1
                                              name: bug
                                              color: d73a4a
                                              description: Something isn't working
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:write
        delete:
            tags:
                - OriginService
            description: |-
                Removes every label from a pull request.
                 Succeeds when the pull request has no labels. A missing pull request
                 returns NOT_FOUND.
            operationId: OriginService_RemoveAllPullRequestLabels
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
            responses:
                "204":
                    description: OK
                    content: {}
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:write
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls/{pullNumber}/labels/{labelName}:
        delete:
            tags:
                - OriginService
            description: |-
                Removes a label from a pull request.
                 Returns the labels remaining on the pull request.
            operationId: OriginService_RemovePullRequestLabel
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
                - name: labelName
                  in: path
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/RemovePullRequestLabelResponse'
                            examples:
                                removePullRequestLabel:
                                    value:
                                        labels:
                                            - id: lbl_01k2ja2000e0080000000000m1
                                              name: bug
                                              color: d73a4a
                                              description: Something isn't working
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:write
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls/{pullNumber}/merge:
        post:
            tags:
                - OriginService
            description: |-
                Merges a pull request into its base.

                 For a stacked pull request, merges the entire root-to-target prefix ending
                 at this pull number — not only this pull. Supported only on native Origin
                 repositories; mirrored repositories are rejected.
            operationId: OriginService_MergePullRequest
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  description: |-
                    Pull number to merge. When this pull is stacked, the merge lands every
                     pull from the stack root through this number.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                expectedHeadSha:
                                    type: string
                                    description: |-
                                        Optional guard against merging a head the caller has not seen: the full
                                         commit SHA (40- or 64-character hex) expected to be the pull request's
                                         current head. When set and the head has moved, the merge is rejected
                                         with ABORTED (HTTP 409 Conflict) and nothing is merged. Values that are
                                         not a full commit SHA are rejected with INVALID_ARGUMENT. Not evaluated
                                         when the pull request is already merged (the call returns idempotent
                                         success). Omit to merge whatever the current head is.
                                mergeMethod:
                                    enum:
                                        - merge
                                        - squash
                                    type: string
                                    description: |-
                                        `merge` writes a merge commit, `squash` a single squash commit. A method
                                         the repository does not allow fails with FAILED_PRECONDITION. Omit to use
                                         the repository's default: a merge commit when allowed, otherwise squash;
                                         squash when the base branch requires linear history.
                                    format: enum
                        examples:
                            mergePullRequest:
                                value:
                                    expectedHeadSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                    mergeMethod: squash
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/MergePullRequestResponse'
                            examples:
                                mergePullRequest:
                                    value:
                                        mergeCommitSha: 5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d
                                        mergedPullNumbers:
                                            - "17"
                                        pullRequest:
                                            id: pr_01k2ja2000e0080000000000d4
                                            number: "17"
                                            state: closed
                                            draft: false
                                            merged: true
                                            title: Add launch telemetry
                                            body: Adds structured launch telemetry to the ignition path.
                                            head:
                                                ref: add-telemetry
                                                sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            base:
                                                ref: main
                                                sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                            author:
                                                user:
                                                    id: user_01k2ja2000e0080000000000c3
                                                    email: jane@acme.dev
                                            createdAt: "2026-08-01T09:30:00Z"
                                            updatedAt: "2026-08-02T14:45:00Z"
                                            closedAt: "2026-08-03T10:15:00Z"
                                            mergedAt: "2026-08-03T10:15:00Z"
                                            mergeCommitSha: 5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d
                                            additions: 128
                                            deletions: 46
                                            changedFiles: 5
                                            labels:
                                                - id: lbl_01k2ja2000e0080000000000m1
                                                  name: bug
                                                  color: d73a4a
                                                  description: Something isn't working
                                            version:
                                                number: "3"
                                                headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                                baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                                createdAt: "2026-08-01T09:30:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:write
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls/{pullNumber}/requested_reviewers:
        get:
            tags:
                - OriginService
            description: |-
                Lists users and groups whose review is currently requested on a pull
                 request. A requested reviewer who has already submitted a review for the
                 current request is omitted; requesting review again after a submission
                 returns them to this list.
            operationId: OriginService_ListPullRequestRequestedReviewers
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListPullRequestRequestedReviewersResponse'
                            examples:
                                listPullRequestRequestedReviewers:
                                    value:
                                        users:
                                            - id: user_01k2ja2000e0080000000000c3
                                              email: jane@acme.dev
                                        groups:
                                            - id: grp_01k2ja2000e0080000000000n2
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:reviews:read
        post:
            tags:
                - OriginService
            description: |-
                Requests reviews from the given users and groups on a pull request.

                 Each entry in `users` must uniquely identify a user candidate for the
                 repository by public user id or email. Each entry in `groups`
                 must uniquely identify a group candidate by group public id, qualified
                 group slug, or group slug. An unknown or ambiguous identifier returns
                 INVALID_ARGUMENT. At least one non-empty identifier is required across
                 both lists. Requesting an already-requested reviewer again bumps the
                 request timestamp so they reappear as pending after a prior submission.

                 Returns the users and groups requested by this call.
            operationId: OriginService_RequestPullRequestReviewers
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                users:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        User identifiers to request. Each must uniquely match a user candidate
                                         for the repository by public `user_…` id or email.
                                groups:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        Group identifiers to request. Each must uniquely match a group candidate
                                         for the repository by public `grp_…` id, qualified group slug, or group
                                         slug.
                        examples:
                            requestPullRequestReviewers:
                                value:
                                    users:
                                        - user_01k2ja2000e0080000000000c3
                                    groups:
                                        - grp_01k2ja2000e0080000000000n2
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListPullRequestRequestedReviewersResponse'
                            examples:
                                requestPullRequestReviewers:
                                    value:
                                        users:
                                            - id: user_01k2ja2000e0080000000000c3
                                              email: jane@acme.dev
                                        groups:
                                            - id: grp_01k2ja2000e0080000000000n2
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:reviews:write
        delete:
            tags:
                - OriginService
            description: |-
                Removes requested reviews from the given users and groups on a pull
                 request.

                 Each entry in `users` must uniquely identify a user candidate for the
                 repository by public user id or email. Each entry in `groups`
                 must uniquely identify a group candidate by group public id, qualified
                 group slug, or group slug. An unknown or ambiguous identifier returns
                 INVALID_ARGUMENT. At least one non-empty identifier is required across
                 both lists. Removing a user or group that is not currently requested is a
                 no-op.
            operationId: OriginService_RemovePullRequestRequestedReviewers
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                users:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        User identifiers to remove. Each must uniquely match a user candidate
                                         for the repository by public `user_…` id or email.
                                groups:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        Group identifiers to remove. Each must uniquely match a group candidate
                                         for the repository by public `grp_…` id, qualified group slug, or group
                                         slug.
                        examples:
                            removePullRequestRequestedReviewers:
                                value:
                                    users:
                                        - user_01k2ja2000e0080000000000c3
                                    groups:
                                        - grp_01k2ja2000e0080000000000n2
                required: true
            responses:
                "204":
                    description: OK
                    content: {}
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:reviews:write
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls/{pullNumber}/reviews:
        get:
            tags:
                - OriginService
            description: |-
                Lists submitted reviews on a pull request, ordered by `submitted_at`
                 ascending. Pending reviews are omitted.
            operationId: OriginService_ListPullRequestReviews
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
                - name: pageSize
                  in: query
                  description: Maximum reviews to return. Defaults to 30; maximum 100.
                  schema:
                    type: integer
                    format: int32
                - name: pageToken
                  in: query
                  description: |-
                    Opaque cursor from a previous response's `next_page_token`. Empty for the
                     first page.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListPullRequestReviewsResponse'
                            examples:
                                listPullRequestReviews:
                                    value:
                                        reviews:
                                            - id: rev_01k2ja2000e0080000000000f6
                                              author:
                                                user:
                                                    id: user_01k2ja2000e0080000000000c3
                                                    email: jane@acme.dev
                                              verdict: approve
                                              body: Approving. The telemetry schema matches the spec.
                                              submittedAt: "2026-08-02T15:00:00Z"
                                              pullRequestVersion:
                                                number: "3"
                                                headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                                baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                                createdAt: "2026-08-01T09:30:00Z"
                                        pullRequest:
                                            id: pr_01k2ja2000e0080000000000d4
                                            number: "17"
                                            repository:
                                                id: repo_01k2ja2000e0080000000000q4
                                                name: rocket
                                                owner:
                                                    slug: acme
                                                    id: ns_01k2ja2000e0080000000000p3
                                                    type: team
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:reviews:read
        post:
            tags:
                - OriginService
            description: |-
                Creates and submits a review on a pull request, optionally together
                 with its line-anchored comments in one atomic request.

                 The review is submitted immediately. A new `approve` or `request_changes`
                 review supersedes the caller's prior live decision review on the same pull
                 request, which is dismissed. Pull request authors cannot `approve` their
                 own pull request. Fails with FAILED_PRECONDITION while the caller has an
                 unsubmitted draft review on the pull request.

                 When `comments` is set, every comment is validated against the reviewed
                 version's diff before anything is written (the same in-diff check as
                 CreatePullRequestComment); if any comment fails, the entire request
                 fails INVALID_ARGUMENT and nothing is published. Comments become visible
                 atomically with the review: no comment or event is observable until the
                 review submits, then each comment emits its `pull_request.comment.created`
                 webhook alongside the review's own event. There is never a fallback to a
                 general discussion comment.
            operationId: OriginService_CreatePullRequestReview
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - verdict
                            type: object
                            properties:
                                verdict:
                                    enum:
                                        - approve
                                        - request_changes
                                        - comment
                                    type: string
                                    description: The review decision.
                                    format: enum
                                body:
                                    type: string
                                    description: Free-text review summary. May be empty.
                                versionNumber:
                                    type: string
                                    description: |-
                                        Pull request version number the review applies to (see
                                         `PullRequestVersion.number`). Omit to review the latest version at call
                                         time. Comments anchor against this same version.
                                comments:
                                    type: array
                                    items:
                                        $ref: '#/components/schemas/ReviewCommentInput'
                                    description: |-
                                        Line-anchored comments published atomically with the review. At most 50
                                         per request. Every anchor must reference the reviewed version's diff or
                                         the entire request fails INVALID_ARGUMENT with nothing published.
                        examples:
                            createPullRequestReview:
                                value:
                                    verdict: approve
                                    body: Approving. The telemetry schema matches the spec.
                                    versionNumber: "3"
                            createPullRequestReviewWithComments:
                                value:
                                    verdict: request_changes
                                    body: Two anchors need attention before this merges.
                                    versionNumber: "3"
                                    comments:
                                        - body: Should the retry budget be configurable?
                                          inline:
                                            path: src/telemetry/retry.ts
                                            side: right
                                            startLine: 42
                                            endLine: 45
                                        - body: This constant duplicates the launch default.
                                          inline:
                                            path: src/telemetry/defaults.ts
                                            side: left
                                            startLine: 7
                                        - body: Agreed — resolving once the budget is configurable.
                                          threadId: cth_01k2ja2000e0080000000000s6
                                        - body: Overall the telemetry schema looks solid.
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/PullRequestReview'
                            examples:
                                createPullRequestReview:
                                    value:
                                        id: rev_01k2ja2000e0080000000000f6
                                        author:
                                            user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                                        verdict: approve
                                        body: Approving. The telemetry schema matches the spec.
                                        submittedAt: "2026-08-02T15:00:00Z"
                                        pullRequestVersion:
                                            number: "3"
                                            headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                            createdAt: "2026-08-01T09:30:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:reviews:write
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls/{pullNumber}/reviews/{reviewId}:
        patch:
            tags:
                - OriginService
            description: |-
                Updates the body of a review. Only the review author can update it;
                 other callers receive PERMISSION_DENIED. A review that does not belong
                 to the named pull request returns NOT_FOUND.

                 Unsubmitted draft reviews can be updated too; a draft's response has no
                 `submitted_at`.
            operationId: OriginService_UpdatePullRequestReview
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
                - name: reviewId
                  in: path
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - body
                            type: object
                            properties:
                                body:
                                    type: string
                                    description: |-
                                        Replacement review summary text; replaces the prior body in full. Must
                                         contain a non-whitespace character; INVALID_ARGUMENT otherwise.
                        examples:
                            updatePullRequestReview:
                                value:
                                    body: Approving. The telemetry schema matches the spec.
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/PullRequestReview'
                            examples:
                                updatePullRequestReview:
                                    value:
                                        id: rev_01k2ja2000e0080000000000f6
                                        author:
                                            user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                                        verdict: approve
                                        body: Approving. The telemetry schema matches the spec.
                                        submittedAt: "2026-08-02T15:00:00Z"
                                        pullRequestVersion:
                                            number: "3"
                                            headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                            createdAt: "2026-08-01T09:30:00Z"
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:reviews:write
    /v1/origin/repos/{ownerSlug}/{repoName}/pulls/{pullNumber}/reviews/{reviewId}/dismissals:
        put:
            tags:
                - OriginService
            description: |-
                Dismisses a submitted review so its verdict no longer counts toward the
                 pull request's review state. The review itself is retained and keeps
                 appearing in ListPullRequestReviews, with `dismissal` set.

                 Dismissing does not require having authored the review; write permission
                 on the repository's pull request reviews is sufficient.

                 Only `approve` and `request_changes` reviews can be dismissed, and only
                 once: a `comment` review, an unsubmitted draft review, or an
                 already-dismissed review returns FAILED_PRECONDITION, and repeating the
                 call leaves the first dismissal in place. A review that does not belong to
                 the named pull request returns NOT_FOUND.
            operationId: OriginService_DismissPullRequestReview
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: pullNumber
                  in: path
                  required: true
                  schema:
                    type: string
                - name: reviewId
                  in: path
                  description: Stable Origin review identifier, as returned by ListPullRequestReviews.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - message
                            type: object
                            properties:
                                message:
                                    type: string
                                    description: |-
                                        Reason recorded with the dismissal. Must contain a non-whitespace
                                         character; INVALID_ARGUMENT otherwise.
                        examples:
                            dismissPullRequestReview:
                                value:
                                    message: Superseded by a newer review.
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/PullRequestReview'
                            examples:
                                dismissPullRequestReview:
                                    value:
                                        id: rev_01k2ja2000e0080000000000f6
                                        author:
                                            user:
                                                id: user_01k2ja2000e0080000000000c3
                                                email: jane@acme.dev
                                        verdict: approve
                                        body: Approving. The telemetry schema matches the spec.
                                        submittedAt: "2026-08-02T15:00:00Z"
                                        pullRequestVersion:
                                            number: "3"
                                            headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                                            baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                                            createdAt: "2026-08-01T09:30:00Z"
                                        dismissal:
                                            dismissedBy:
                                                user:
                                                    id: user_01k2ja2000e0080000000000c3
                                                    email: jane@acme.dev
                                            dismissedAt: "2026-08-02T15:00:00Z"
                                            message: Superseded by a newer review.
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:pull_requests:reviews:write
    /v1/origin/repos/{ownerSlug}/{repoName}/rulesets:
        get:
            tags:
                - OriginService
            description: |-
                Lists every ruleset configured on a repository. Returns the full set in
                 one response (rulesets per repository are bounded configuration).
            operationId: OriginService_ListRulesets
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/ListRulesetsResponse'
                            examples:
                                listRulesets:
                                    value:
                                        rulesets:
                                            - id: rs_01k2ja2000e0080000000000t7
                                              name: require-review
                                              description: Require an approving review before merging to main.
                                              enforcement: active
                                              kind: merge_branch
                                              includedRefNames:
                                                - refs/heads/main
                                              rules:
                                                - id: rsr_01k2ja2000e0080000000000v8
                                                  ruleType: pull_request
                                                  parameters:
                                                    requiredApprovingReviewCount: 1
                                              bypassActors:
                                                - id: rsba_01k2ja2000e0080000000000w9
                                                  bypassMode: always
                                                  user:
                                                    id: act_01k2ja2000e0080000000000x0
                                        repository:
                                            id: repo_01k2ja2000e0080000000000q4
                                            name: rocket
                                            owner:
                                                slug: acme
                                                id: ns_01k2ja2000e0080000000000p3
                                                type: team
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:rulesets:read
        post:
            tags:
                - OriginService
            description: |-
                Creates a repository ruleset and returns the created ruleset, including
                 server-assigned rule and bypass-actor ids.
            operationId: OriginService_CreateRuleset
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - name
                                - enforcement
                                - kind
                            type: object
                            properties:
                                name:
                                    type: string
                                description:
                                    type: string
                                enforcement:
                                    enum:
                                        - active
                                        - evaluate
                                        - disabled
                                    type: string
                                    format: enum
                                kind:
                                    enum:
                                        - merge_branch
                                        - push_branch
                                        - push_tag
                                        - push_repository
                                    type: string
                                    format: enum
                                includedRefNames:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        Ref name patterns this ruleset includes. Supports globs and the tokens
                                         `~ALL` and `~DEFAULT_BRANCH`.
                                excludedRefNames:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        Ref name patterns this ruleset excludes. Same pattern language as
                                         `included_ref_names`.
                                rules:
                                    type: array
                                    items:
                                        $ref: '#/components/schemas/RulesetRuleInput'
                                bypassActors:
                                    type: array
                                    items:
                                        $ref: '#/components/schemas/RulesetBypassActorInput'
                        examples:
                            createRuleset:
                                value:
                                    name: require-review
                                    description: Require an approving review before merging to main.
                                    enforcement: active
                                    kind: merge_branch
                                    includedRefNames:
                                        - refs/heads/main
                                    rules:
                                        - ruleType: pull_request
                                          parameters:
                                            requiredApprovingReviewCount: 1
                                    bypassActors:
                                        - bypassMode: always
                                          user:
                                            id: act_01k2ja2000e0080000000000x0
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Ruleset'
                            examples:
                                createRuleset:
                                    value:
                                        id: rs_01k2ja2000e0080000000000t7
                                        name: require-review
                                        description: Require an approving review before merging to main.
                                        enforcement: active
                                        kind: merge_branch
                                        includedRefNames:
                                            - refs/heads/main
                                        rules:
                                            - id: rsr_01k2ja2000e0080000000000v8
                                              ruleType: pull_request
                                              parameters:
                                                requiredApprovingReviewCount: 1
                                        bypassActors:
                                            - id: rsba_01k2ja2000e0080000000000w9
                                              bypassMode: always
                                              user:
                                                id: act_01k2ja2000e0080000000000x0
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:rulesets:write
    /v1/origin/repos/{ownerSlug}/{repoName}/rulesets/{rulesetId}:
        get:
            tags:
                - OriginService
            description: Returns a single repository ruleset by its stable Origin id.
            operationId: OriginService_GetRuleset
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: rulesetId
                  in: path
                  description: Stable Origin ruleset id.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Ruleset'
                            examples:
                                getRuleset:
                                    value:
                                        id: rs_01k2ja2000e0080000000000t7
                                        name: require-review
                                        description: Require an approving review before merging to main.
                                        enforcement: active
                                        kind: merge_branch
                                        includedRefNames:
                                            - refs/heads/main
                                        rules:
                                            - id: rsr_01k2ja2000e0080000000000v8
                                              ruleType: pull_request
                                              parameters:
                                                requiredApprovingReviewCount: 1
                                        bypassActors:
                                            - id: rsba_01k2ja2000e0080000000000w9
                                              bypassMode: always
                                              user:
                                                id: act_01k2ja2000e0080000000000x0
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:rulesets:read
        put:
            tags:
                - OriginService
            description: |-
                Updates an existing repository ruleset. Replaces the ruleset configuration
                 (including nested rules and bypass actors) and returns the updated
                 ruleset with server-assigned rule and bypass-actor ids.
            operationId: OriginService_UpdateRuleset
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: rulesetId
                  in: path
                  description: Stable Origin ruleset id.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - name
                                - enforcement
                                - kind
                            type: object
                            properties:
                                name:
                                    type: string
                                description:
                                    type: string
                                enforcement:
                                    enum:
                                        - active
                                        - evaluate
                                        - disabled
                                    type: string
                                    format: enum
                                kind:
                                    enum:
                                        - merge_branch
                                        - push_branch
                                        - push_tag
                                        - push_repository
                                    type: string
                                    format: enum
                                includedRefNames:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        Ref name patterns this ruleset includes. Supports globs and the tokens
                                         `~ALL` and `~DEFAULT_BRANCH`.
                                excludedRefNames:
                                    type: array
                                    items:
                                        type: string
                                    description: |-
                                        Ref name patterns this ruleset excludes. Same pattern language as
                                         `included_ref_names`.
                                rules:
                                    type: array
                                    items:
                                        $ref: '#/components/schemas/RulesetRuleInput'
                                bypassActors:
                                    type: array
                                    items:
                                        $ref: '#/components/schemas/RulesetBypassActorInput'
                        examples:
                            updateRuleset:
                                value:
                                    name: require-review
                                    description: Require an approving review before merging to main.
                                    enforcement: active
                                    kind: merge_branch
                                    includedRefNames:
                                        - refs/heads/main
                                    rules:
                                        - ruleType: pull_request
                                          parameters:
                                            requiredApprovingReviewCount: 1
                                    bypassActors:
                                        - bypassMode: always
                                          user:
                                            id: act_01k2ja2000e0080000000000x0
                required: true
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Ruleset'
                            examples:
                                updateRuleset:
                                    value:
                                        id: rs_01k2ja2000e0080000000000t7
                                        name: require-review
                                        description: Require an approving review before merging to main.
                                        enforcement: active
                                        kind: merge_branch
                                        includedRefNames:
                                            - refs/heads/main
                                        rules:
                                            - id: rsr_01k2ja2000e0080000000000v8
                                              ruleType: pull_request
                                              parameters:
                                                requiredApprovingReviewCount: 1
                                        bypassActors:
                                            - id: rsba_01k2ja2000e0080000000000w9
                                              bypassMode: always
                                              user:
                                                id: act_01k2ja2000e0080000000000x0
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:rulesets:write
        delete:
            tags:
                - OriginService
            description: Deletes a repository ruleset by its stable Origin id.
            operationId: OriginService_DeleteRuleset
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: rulesetId
                  in: path
                  description: Stable Origin ruleset id.
                  required: true
                  schema:
                    type: string
            responses:
                "204":
                    description: OK
                    content: {}
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:rulesets:write
    /v1/origin/repos/{ownerSlug}/{repoName}/tarball:
        get:
            tags:
                - OriginService
            description: |-
                Downloads a gzip-compressed tar of the repository tree at `ref`.
                 `ref` is a commit SHA, branch, tag, or symbolic name such as `HEAD`.
                 Empty `ref` uses the repository default branch.

                 REST: the first request for a given repository and resolved commit
                 streams `application/gzip` bytes. Later requests for the same commit
                 respond 302 with a short-lived signed download URL in `Location`.
                 Archive entries are at the root of the tar (no wrapping directory).
                 Empty repositories return 409 Conflict.
            operationId: OriginService_GetRepoTarball
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: ref
                  in: query
                  description: |-
                    Commit SHA (full or abbreviated hex), bare branch or tag name, fully
                     qualified `refs/heads/...` / `refs/tags/...`, or symbolic `HEAD`. Not a
                     glob or revspec (`<rev>~3` is rejected). Empty uses the repository
                     default branch.
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/GetRepoTarballResponse'
                            examples:
                                getRepoTarball:
                                    value:
                                        downloadUrl: https://artifacts.origin.cursor.com/tarballs/0192f7a4-6c1e-7b3a-9f21-3d54c9a7e6b0/9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4.tar.gz?Expires=1767225600&Signature=EXAMPLE&Key-Pair-Id=KEXAMPLE123
                                        sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}/tarball/{ref}:
        get:
            tags:
                - OriginService
            description: |-
                Downloads a gzip-compressed tar of the repository tree at `ref`.
                 `ref` is a commit SHA, branch, tag, or symbolic name such as `HEAD`.
                 Empty `ref` uses the repository default branch.

                 REST: the first request for a given repository and resolved commit
                 streams `application/gzip` bytes. Later requests for the same commit
                 respond 302 with a short-lived signed download URL in `Location`.
                 Archive entries are at the root of the tar (no wrapping directory).
                 Empty repositories return 409 Conflict.
            operationId: OriginService_GetRepoTarball_2
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
                - name: ref
                  in: path
                  description: |-
                    Commit SHA (full or abbreviated hex), bare branch or tag name, fully
                     qualified `refs/heads/...` / `refs/tags/...`, or symbolic `HEAD`. Not a
                     glob or revspec (`<rev>~3` is rejected). Empty uses the repository
                     default branch.
                  required: true
                  schema:
                    type: string
            responses:
                "200":
                    description: OK
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/GetRepoTarballResponse'
                            examples:
                                getRepoTarball:
                                    value:
                                        downloadUrl: https://artifacts.origin.cursor.com/tarballs/0192f7a4-6c1e-7b3a-9f21-3d54c9a7e6b0/9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4.tar.gz?Expires=1767225600&Signature=EXAMPLE&Key-Pair-Id=KEXAMPLE123
                                        sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "409":
                    description: The request conflicts with the current state of the resource.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
    /v1/origin/repos/{ownerSlug}/{repoName}:syncMirror:
        post:
            tags:
                - OriginService
            description: |-
                Synchronizes one ref of a mirrored repository from its upstream source.
                 Returns HTTP 200 when the sync target is satisfied, or HTTP 202 when the
                 sync is still pending. `wait=false` (the default) schedules the sync and
                 usually returns 202; it returns 200 immediately when `sha` is already
                 reachable from `ref`. `wait=true` blocks until satisfied or the wait
                 budget (~2 minutes) expires; expiry still returns 202 and the sync
                 continues in the background.
                 Repositories that do not pull from an upstream source are rejected.
            operationId: OriginService_SyncMirror
            parameters:
                - name: ownerSlug
                  in: path
                  description: Owning entity's unique slug.
                  required: true
                  schema:
                    type: string
                - name: repoName
                  in: path
                  description: Repo name, unique to the owner entity.
                  required: true
                  schema:
                    type: string
            requestBody:
                content:
                    application/json:
                        schema:
                            required:
                                - ref
                            type: object
                            properties:
                                ref:
                                    type: string
                                    description: |-
                                        Full git ref name to fetch. Must start with `refs/` and name a ref
                                         after that prefix, for example `refs/heads/main` or `refs/tags/v1`.
                                         Short names such as `main` are rejected with INVALID_ARGUMENT.
                                wait:
                                    type: boolean
                                    description: When true, block until synced or the wait budget expires. Defaults to false.
                                sha:
                                    type: string
                                    description: |-
                                        Optional full commit object id: 40- or 64-character hex. Omit or leave
                                         empty to wait on the tip of `ref`. When set and reachable from `ref`,
                                         the call returns early without waiting for other mirror work to drain.
                                         Other values are rejected with INVALID_ARGUMENT.
                        examples:
                            syncMirror:
                                value:
                                    ref: refs/heads/main
                                    wait: true
                required: true
            responses:
                "200":
                    description: 'OK: the requested ref (or SHA) is already mirrored; `synced` is true.'
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/SyncMirrorResponse'
                            examples:
                                syncMirror:
                                    value:
                                        synced: true
                "400":
                    description: Bad Request
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "401":
                    description: Unauthorized
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "403":
                    description: Forbidden
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "429":
                    description: Too Many Requests
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                default:
                    description: Default error response
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
                "202":
                    description: 'Accepted: the sync is still pending; `synced` is false.'
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/SyncMirrorResponse'
                            examples:
                                syncMirror:
                                    value:
                                        synced: false
                "404":
                    description: The addressed resource, or its repository, does not exist or is not visible to the caller. Not-found and no-access are deliberately indistinguishable; a 404 never confirms that the resource does not exist.
                    content:
                        application/json:
                            schema:
                                $ref: '#/components/schemas/Status'
            x-origin-scopes:
                tokenTypes:
                    - installation
                    - user
                scopes:
                    - repository:contents:read
components:
    schemas:
        AddAppSigningKeyRequest:
            required:
                - appId
                - publicKey
            type: object
            properties:
                appId:
                    type: string
                    description: App identifier.
                publicKey:
                    type: string
                    description: PEM SPKI Ed25519 public key to add to the app's signing key set.
        AddPullRequestLabelsRequest:
            required:
                - identifier
                - pullNumber
                - labels
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                labels:
                    type: array
                    items:
                        type: string
                    description: Label names to add. Maximum 100.
        AddPullRequestLabelsResponse:
            type: object
            properties:
                labels:
                    type: array
                    items:
                        $ref: '#/components/schemas/Label'
        App:
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                    description: Globally unique app identifier.
                displayName:
                    readOnly: true
                    type: string
                webhookUrl:
                    readOnly: true
                    type: string
                events:
                    readOnly: true
                    type: array
                    items:
                        type: string
                    description: Outbound webhook event subscriptions.
                createdAt:
                    readOnly: true
                    type: string
                    format: date-time
                updatedAt:
                    readOnly: true
                    type: string
                    format: date-time
                installationRedirectUris:
                    readOnly: true
                    type: array
                    items:
                        type: string
                    description: |-
                        OAuth install callback allowlist: redirect URIs an app-initiated install
                         may return to, matched exactly at authorize time.
                namespaceSlug:
                    readOnly: true
                    type: string
                    description: Slug of the namespace that owns (publishes) the app.
                description:
                    readOnly: true
                    type: string
                    description: Publisher-provided app description. Empty when unset.
                websiteUrl:
                    readOnly: true
                    type: string
                    description: Publisher website. Empty when unset.
                defaultScopes:
                    readOnly: true
                    type: array
                    items:
                        type: string
                    description: |-
                        Default scopes offered when the app is installed, as catalog scope
                         strings.
            description: An Origin app.
        AppDefaultScopesReplace:
            type: object
            properties:
                scopes:
                    type: array
                    items:
                        type: string
                    description: The app's complete new set of default install scopes.
            description: Clean-replace wrapper for `UpdateAppRequest.default_scopes`.
        AppDisplayMetadata:
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                    description: Globally unique app identifier.
                displayName:
                    readOnly: true
                    type: string
                description:
                    readOnly: true
                    type: string
                    description: Publisher-provided description. Empty when unset.
            description: Non-sensitive display fields for an app in a namespace catalog.
        AppEventsReplace:
            type: object
            properties:
                events:
                    type: array
                    items:
                        type: string
                    description: The app's complete new set of webhook event subscriptions.
            description: Clean-replace wrapper for `UpdateAppRequest.events`.
        AppInstallation:
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                    description: Globally unique installation identifier.
                appId:
                    readOnly: true
                    type: string
                    description: The installed app's identifier.
                target:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/Owner'
                    description: Target owner entity the app is installed into.
                createdAt:
                    readOnly: true
                    type: string
                    format: date-time
                updatedAt:
                    readOnly: true
                    type: string
                    format: date-time
                repoSelectionMode:
                    readOnly: true
                    enum:
                        - all
                        - selected
                    type: string
                    description: Whether the app can access all repos belonging to the owner, or only selected repos.
                    format: enum
                scopes:
                    readOnly: true
                    type: array
                    items:
                        type: string
                    description: |-
                        Scopes granted to this installation as catalog scope strings, e.g.
                         "repository:contents:read".
                installedBy:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/OriginUserActor'
                    description: User who originally installed the app.
                suspendedAt:
                    readOnly: true
                    type: string
                    description: Set while the installation is suspended; unset when it is active.
                    format: date-time
                deletedAt:
                    readOnly: true
                    type: string
                    description: |-
                        When the installation was deleted. Set only on the `installation.deleted`
                         webhook snapshot; a deleted installation no longer resolves through the
                         API.
                    format: date-time
            description: An installation of an Origin app into a target owner entity.
        AppInstallationRedirectUrisReplace:
            type: object
            properties:
                installationRedirectUris:
                    type: array
                    items:
                        type: string
                    description: The app's complete new OAuth install callback allowlist.
            description: Clean-replace wrapper for `UpdateAppRequest.installation_redirect_uris`.
        AppSigningKey:
            type: object
            properties:
                kid:
                    readOnly: true
                    type: string
                    description: |-
                        Key ID: the base64url-encoded SHA-256 digest of the key's SPKI DER
                         encoding.
                createdAt:
                    readOnly: true
                    type: string
                    format: date-time
            description: |-
                An app signing key. Only the key's identity is returned; the key material
                 is write-only.
        BatchGetContentsRequest:
            required:
                - identifier
                - paths
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: 'Identity of the repo: `(owner_slug, name)`.'
                paths:
                    type: array
                    items:
                        type: string
                    description: |-
                        Exact paths to fetch, relative to the repository root (no globs or
                         patterns). At most 20 entries; duplicates are removed. An empty string
                         requests the repository root directory.
                ref:
                    type: string
                    description: |-
                        Commit, branch, tag, or symbolic ref (for example `HEAD`) to read from.
                         Empty means the repository's default branch.
        BatchGetContentsResponse:
            type: object
            properties:
                results:
                    type: array
                    items:
                        $ref: '#/components/schemas/BatchGetContentsResult'
                    description: One result per unique requested path, in first-seen request order.
                resolvedCommitSha:
                    type: string
                    description: The commit SHA the `ref` resolved to.
        BatchGetContentsResult:
            type: object
            properties:
                path:
                    type: string
                    description: The requested path this result corresponds to (echoed verbatim).
                found:
                    type: boolean
                    description: |-
                        Whether the path exists at the resolved ref. When false, `content` is
                         unset.
                content:
                    allOf:
                        - $ref: '#/components/schemas/Content'
                    description: |-
                        The path's content when `found` is true; unset otherwise. Uses the same
                         representation as `GetContents`.
            description: The outcome for one requested path in a BatchGetContents response.
        BatchRedeliverWebhookDeliveriesRequest:
            required:
                - deliveryIds
            type: object
            properties:
                deliveryIds:
                    type: array
                    items:
                        type: string
                    description: |-
                        Deliveries to send again. At most 100 unique entries, matching the
                         page_size ceiling on ListWebhookDeliveries. Duplicates are removed,
                         keeping first-seen order. An empty list, or more than 100 unique
                         entries, is a 400 InvalidArgument.
        BatchRedeliverWebhookDeliveriesResponse:
            type: object
            properties:
                results:
                    type: array
                    items:
                        $ref: '#/components/schemas/BatchRedeliverWebhookDeliveryResult'
                    description: One result per unique requested delivery id, in first-seen request order.
        BatchRedeliverWebhookDeliveryResult:
            type: object
            properties:
                deliveryId:
                    type: string
                    description: The requested delivery id, echoed verbatim.
                outcome:
                    enum:
                        - queued
                        - already_in_flight
                        - not_found
                    type: string
                    description: |-
                        The result for this id: `queued` (a send was created),
                         `already_in_flight` (a send was already running; success, not an error),
                         or `not_found`. `not_found` covers unknown ids, ids older than the 7-day
                         retention window, and namespaces where the app is no longer installed.
                    format: enum
            description: The outcome for one requested delivery id.
        BatchUpsertCheckRunsRequest:
            required:
                - identifier
                - headSha
                - checkSuite
                - checkRuns
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: 'Identity of the repo the check runs target: `(owner_slug, name)`.'
                headSha:
                    type: string
                    description: Head commit SHA the check runs are reported against (40- or 64-char hex).
                checkSuite:
                    allOf:
                        - $ref: '#/components/schemas/CheckSuiteInput'
                    description: The suite shared by every check run in this request.
                checkRuns:
                    type: array
                    items:
                        $ref: '#/components/schemas/CheckRunInput'
                    description: |-
                        Check runs to upsert, in response order. Must contain 1–10 entries with
                         unique `(external_id, key)` identities.
        BatchUpsertCheckRunsResponse:
            type: object
            properties:
                checkSuite:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/CheckSuite'
                    description: The persisted suite shared by all returned check runs.
                checkRuns:
                    readOnly: true
                    type: array
                    items:
                        $ref: '#/components/schemas/CheckRun'
                    description: Persisted check runs in the same order as the request.
        Blob:
            type: object
            properties:
                sha:
                    type: string
                    description: Git blob object SHA (hex).
                size:
                    type: integer
                    description: |-
                        Decoded content size in bytes. `int32` ensures REST JSON emits a number.
                         The GetBlob size cap is 4 MiB.
                    format: int32
                encoding:
                    type: string
                    description: Always "base64".
                content:
                    type: string
                    description: |-
                        Base64-encoded blob contents wrapped at 60 characters per line, with a
                         trailing newline.
            description: A Git blob object.
        Branch:
            type: object
            properties:
                name:
                    type: string
                    description: Branch name without the "refs/heads/" prefix, e.g. "main".
                commit:
                    allOf:
                        - $ref: '#/components/schemas/BranchCommit'
                    description: The commit at the tip of the branch.
            description: A repository branch and the commit at its tip.
        BranchCommit:
            type: object
            properties:
                sha:
                    type: string
                    description: Full hex SHA of the commit at the tip of the branch.
            description: The commit a branch points at.
        CheckRun:
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                    description: Server-assigned unique ID of the check run.
                repository:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/RepositoryReference'
                    description: Repository the check run belongs to.
                checkSuite:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/CheckSuiteReference'
                    description: Suite this check run belongs to.
                sha:
                    readOnly: true
                    type: string
                    description: Resolved head commit SHA the check run is attached to (lowercase hex).
                key:
                    readOnly: true
                    type: string
                    description: App-chosen idempotency key for the check run.
                name:
                    readOnly: true
                    type: string
                    description: Human-facing check-run name.
                status:
                    readOnly: true
                    enum:
                        - queued
                        - in_progress
                        - completed
                    type: string
                    format: enum
                conclusion:
                    readOnly: true
                    enum:
                        - success
                        - failure
                        - neutral
                        - cancelled
                        - skipped
                        - timed_out
                        - action_required
                        - stale
                    type: string
                    description: Present iff `status == completed`.
                    format: enum
                detailsUrl:
                    readOnly: true
                    type: string
                    description: Link to more detail about this specific check run, if set.
                externalUpdatedAt:
                    readOnly: true
                    type: string
                    description: The external system's last-update time used for ordering.
                    format: date-time
                startedAt:
                    readOnly: true
                    type: string
                    description: When the check run started, if reported.
                    format: date-time
                completedAt:
                    readOnly: true
                    type: string
                    description: When the check run completed, if reported.
                    format: date-time
                createdAt:
                    readOnly: true
                    type: string
                    format: date-time
                updatedAt:
                    readOnly: true
                    type: string
                    format: date-time
                externalId:
                    readOnly: true
                    type: string
                    description: Provider-assigned immutable identity for this check attempt.
                actor:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/OriginActor'
                    description: Principal that produced the check run.
                output:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/CheckRunOutput'
                    description: Human-readable output for this check run, if set.
                deadlineAt:
                    readOnly: true
                    type: string
                    description: Optional deadline. Omitted or unset means no expiration.
                    format: date-time
                isRerequestable:
                    readOnly: true
                    type: boolean
                    description: |-
                        Whether the reporting app declared this run re-requestable
                         (`CheckRunInput.is_rerequestable`).
                rerequestedAt:
                    readOnly: true
                    type: string
                    description: |-
                        Set while a re-request is outstanding; cleared when the provider posts
                         again. Unset means no re-request is pending. While set, the run stays in
                         the commit's CI state as pending (`status` and `conclusion` are the
                         superseded result); the owning app answers by posting the run it
                         committed to by declaring `is_rerequestable` — a new run for the same
                         `key`, or an update of this run (which clears this field) — after which
                         the run may be re-requested again.
                    format: date-time
                rerequestedBy:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/OriginActor'
                    description: |-
                        Principal that re-requested the run. Present iff `rerequested_at` is set;
                         cleared together with it when the owning app answers.
            description: |-
                A persisted check run, as returned by `PostCheckRun`. All fields are
                 server-owned; the writable shape is `CheckRunInput`.
        CheckRunAnnotation:
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                checkRunId:
                    readOnly: true
                    type: string
                annotationLevel:
                    readOnly: true
                    enum:
                        - notice
                        - warning
                        - failure
                    type: string
                    format: enum
                message:
                    readOnly: true
                    type: string
                title:
                    readOnly: true
                    type: string
                rawDetails:
                    readOnly: true
                    type: string
                createdAt:
                    readOnly: true
                    type: string
                    format: date-time
                updatedAt:
                    readOnly: true
                    type: string
                    format: date-time
                location:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/CheckRunAnnotationLocation'
            description: Persisted append-only annotation. Non-inline annotations omit `location`.
        CheckRunAnnotationColumnRange:
            type: object
            properties:
                startColumn:
                    type: integer
                    format: int32
                endColumn:
                    type: integer
                    format: int32
            description: Optional paired columns for a single-line annotation range.
        CheckRunAnnotationInput:
            required:
                - annotationLevel
                - message
            type: object
            properties:
                annotationLevel:
                    enum:
                        - notice
                        - warning
                        - failure
                    type: string
                    format: enum
                message:
                    type: string
                    description: 'Non-empty annotation message. Maximum UTF-8 size: 65535 bytes.'
                title:
                    type: string
                    description: 'Optional title. Maximum length: 255 Unicode characters.'
                rawDetails:
                    type: string
                    description: 'Optional raw detail text. Maximum UTF-8 size: 65535 bytes.'
                location:
                    allOf:
                        - $ref: '#/components/schemas/CheckRunAnnotationLocation'
                    description: Omit for a general, non-inline annotation.
            description: |-
                Content fields follow common Checks API annotation semantics. Origin groups source
                 coordinates in optional `location`, allowing run-level annotations to omit it.
        CheckRunAnnotationLocation:
            required:
                - path
                - startLine
                - endLine
            type: object
            properties:
                path:
                    type: string
                    description: 'Maximum UTF-8 size: 4096 bytes.'
                startLine:
                    type: integer
                    format: int32
                endLine:
                    type: integer
                    format: int32
                columns:
                    $ref: '#/components/schemas/CheckRunAnnotationColumnRange'
            description: |-
                Optional source location for a check-run annotation. `path`, `start_line`,
                 and `end_line` are required whenever the enclosing annotation supplies this
                 message. `path` is canonical and repository-relative, lines and columns are
                 positive 1-based inclusive coordinates, and `columns` is supported only for
                 a single-line range.
        CheckRunInput:
            required:
                - key
                - name
                - status
                - externalUpdatedAt
                - externalId
            type: object
            properties:
                key:
                    type: string
                    description: Stable, app-chosen key identifying the logical check across attempts.
                name:
                    type: string
                    description: Human-facing check-run name.
                status:
                    enum:
                        - queued
                        - in_progress
                        - completed
                    type: string
                    format: enum
                conclusion:
                    enum:
                        - success
                        - failure
                        - neutral
                        - cancelled
                        - skipped
                        - timed_out
                        - action_required
                        - stale
                    type: string
                    description: Required iff `status == completed`.
                    format: enum
                externalUpdatedAt:
                    type: string
                    description: |-
                        The external system's last-update time. Used to order concurrent updates
                         so a stale retry can't overwrite newer state.
                    format: date-time
                startedAt:
                    type: string
                    description: When the check run started.
                    format: date-time
                completedAt:
                    type: string
                    description: When the check run completed.
                    format: date-time
                detailsUrl:
                    type: string
                    description: |-
                        Optional link to more detail about this specific check run (e.g. the
                         provider's job/build URL).
                externalId:
                    type: string
                    description: Provider-assigned immutable identity for this check attempt.
                output:
                    allOf:
                        - $ref: '#/components/schemas/CheckRunOutput'
                    description: Human-readable output for this check run.
                deadlineAt:
                    type: string
                    description: |-
                        Optional deadline. Omitted or unset means no expiration.
                         Must not be more than 24 hours in the future.
                    format: date-time
                isRerequestable:
                    type: boolean
                    description: |-
                        Declares that this run can be re-run on request. Setting this to true is
                         a commitment: the app must subscribe to the
                         `repository.check_run.rerequested` webhook event and respond to each
                         delivery by posting a fresh run for the same head SHA and `key` — either
                         a new run (new `external_id`, preserving the old attempt as history) or
                         an update of the re-requested run (same `external_id`, refreshing it in
                         place). Once a run is re-requested, it reads as pending in the commit's
                         CI state until that fresh post arrives: a required check blocks merges
                         and the pull request shows the run as awaiting its re-run, so declaring
                         re-requestability without responding strands the check. Origin does not
                         verify the subscription at post time.
                         Omitted preserves the previously stored value (new runs default to
                         false); an explicit value sets it, so a later post can withdraw the
                         declaration.
            description: |-
                A single check run to report. Combined with `CheckSuiteInput`, this is
                 upserted in one request.
        CheckRunOutput:
            type: object
            properties:
                title:
                    type: string
                    description: 'Short headline for the output. Maximum length: 255 characters.'
                summary:
                    type: string
                    description: |-
                        Summary of the output. May contain Markdown.
                         Maximum UTF-8 size: 65535 bytes.
                text:
                    type: string
                    description: |-
                        Detailed output. May contain Markdown.
                         Maximum UTF-8 size: 65535 bytes.
            description: Human-readable output reported for a check run.
        CheckRunRerequestedWebhookPayload:
            type: object
            properties:
                repository:
                    allOf:
                        - $ref: '#/components/schemas/RepositoryReference'
                    description: The repository the check run belongs to.
                checkSuite:
                    allOf:
                        - $ref: '#/components/schemas/CheckSuite'
                    description: The suite the check run belongs to.
                checkRun:
                    allOf:
                        - $ref: '#/components/schemas/CheckRun'
                    description: |-
                        The re-requested check run; `check_run.rerequested_at` records the stamp
                         and `check_run.rerequested_by` the principal that asked.
            description: |-
                repository.check_run.rerequested webhook payload, delivered only to the app
                 that owns the check run. Answer by posting a fresh run for the same head
                 SHA and key — a new run (new external_id) or an update of the re-requested
                 run — the stamped run's status is never reset by Origin, and the answering
                 post clears `rerequested_at`. Each accepted re-request emits one event, and
                 a run may be re-requested again once answered, so dedupe redeliveries on
                 the event id alone; `check_run.rerequested_at` carries the outstanding
                 stamp. The payload carries no pull request context (check runs attach to
                 `(repository, sha)`): a consumer that needs the pull request resolves it
                 from `check_run.sha` via its own head mapping, or `ListPullRequests`
                 filtered to the head branch it built.
            x-origin-webhook-events:
                - repository.check_run.rerequested
            example:
                repository:
                    id: repo_01k2ja2000e0080000000000q4
                    name: rocket
                    owner:
                        slug: acme
                        id: ns_01k2ja2000e0080000000000p3
                        type: team
                checkSuite:
                    id: crg_01k2ja2000e0080000000000h8
                    repository:
                        id: repo_01k2ja2000e0080000000000q4
                        name: rocket
                        owner:
                            slug: acme
                            id: ns_01k2ja2000e0080000000000p3
                            type: team
                    sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                    key: ci-8842
                    name: CI
                    detailsUrl: https://ci.acme.dev/runs/8842
                    createdAt: "2026-08-01T09:30:00Z"
                    updatedAt: "2026-08-02T15:10:00Z"
                    externalId: build-8842
                    actor:
                        user:
                            id: user_01k2ja2000e0080000000000c3
                            email: jane@acme.dev
                checkRun:
                    id: cr_01k2ja2000e0080000000000g7
                    repository:
                        id: repo_01k2ja2000e0080000000000q4
                        name: rocket
                        owner:
                            slug: acme
                            id: ns_01k2ja2000e0080000000000p3
                            type: team
                    checkSuite:
                        id: crg_01k2ja2000e0080000000000h8
                    sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                    key: ci-8842-unit-tests
                    name: unit-tests
                    status: completed
                    conclusion: failure
                    detailsUrl: https://ci.acme.dev/runs/8842
                    externalUpdatedAt: "2026-08-02T14:44:30Z"
                    startedAt: "2026-08-02T14:40:00Z"
                    completedAt: "2026-08-02T14:44:30Z"
                    createdAt: "2026-08-01T09:30:00Z"
                    updatedAt: "2026-08-02T15:10:00Z"
                    externalId: run-8842
                    actor:
                        user:
                            id: user_01k2ja2000e0080000000000c3
                            email: jane@acme.dev
                    output:
                        title: Unit tests
                        summary: 1 of 129 tests failed.
                        text: "FAIL telemetry.spec.ts > flushes queued events on shutdown"
                    isRerequestable: true
                    rerequestedAt: "2026-08-02T15:10:00Z"
                    rerequestedBy:
                        user:
                            id: user_01k2ja2000e0080000000000c3
                            email: jane@acme.dev
        CheckRunWebhookPayload:
            type: object
            properties:
                repository:
                    allOf:
                        - $ref: '#/components/schemas/RepositoryReference'
                    description: The repository the check run belongs to.
                checkSuite:
                    allOf:
                        - $ref: '#/components/schemas/CheckSuite'
                    description: The suite the check run belongs to.
                checkRun:
                    allOf:
                        - $ref: '#/components/schemas/CheckRun'
                    description: The check run snapshot at this lifecycle point.
                actor:
                    allOf:
                        - $ref: '#/components/schemas/OriginActor'
                    description: The principal that produced the check run.
            description: Committed snapshot for an Origin check-run lifecycle event.
            x-origin-webhook-events:
                - repository.check_run.created
                - repository.check_run.completed
            example:
                repository:
                    id: repo_01k2ja2000e0080000000000q4
                    name: rocket
                    owner:
                        slug: acme
                        id: ns_01k2ja2000e0080000000000p3
                        type: team
                checkSuite:
                    id: crg_01k2ja2000e0080000000000h8
                    repository:
                        id: repo_01k2ja2000e0080000000000q4
                        name: rocket
                        owner:
                            slug: acme
                            id: ns_01k2ja2000e0080000000000p3
                            type: team
                    sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                    key: ci-8842
                    name: CI
                    detailsUrl: https://ci.acme.dev/runs/8842
                    createdAt: "2026-08-01T09:30:00Z"
                    updatedAt: "2026-08-02T14:45:00Z"
                    externalId: build-8842
                    actor:
                        user:
                            id: user_01k2ja2000e0080000000000c3
                            email: jane@acme.dev
                checkRun:
                    id: cr_01k2ja2000e0080000000000g7
                    repository:
                        id: repo_01k2ja2000e0080000000000q4
                        name: rocket
                        owner:
                            slug: acme
                            id: ns_01k2ja2000e0080000000000p3
                            type: team
                    checkSuite:
                        id: crg_01k2ja2000e0080000000000h8
                    sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                    key: ci-8842-unit-tests
                    name: unit-tests
                    status: completed
                    conclusion: success
                    detailsUrl: https://ci.acme.dev/runs/8842
                    externalUpdatedAt: "2026-08-02T14:44:30Z"
                    startedAt: "2026-08-02T14:40:00Z"
                    completedAt: "2026-08-02T14:44:30Z"
                    createdAt: "2026-08-01T09:30:00Z"
                    updatedAt: "2026-08-02T14:45:00Z"
                    externalId: run-8842
                    actor:
                        user:
                            id: user_01k2ja2000e0080000000000c3
                            email: jane@acme.dev
                    output:
                        title: Unit tests
                        summary: 128 tests passed.
                        text: All suites green.
                actor:
                    user:
                        id: user_01k2ja2000e0080000000000c3
                        email: jane@acme.dev
        CheckSuite:
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                    description: Server-assigned unique ID of the suite.
                repository:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/RepositoryReference'
                    description: Repository the suite belongs to.
                sha:
                    readOnly: true
                    type: string
                    description: Resolved head commit SHA the suite is attached to (lowercase hex).
                key:
                    readOnly: true
                    type: string
                    description: App-chosen idempotency key for the suite.
                name:
                    readOnly: true
                    type: string
                    description: Human-facing suite name.
                detailsUrl:
                    readOnly: true
                    type: string
                    description: Link to more detail about the suite as a whole, if set.
                createdAt:
                    readOnly: true
                    type: string
                    format: date-time
                updatedAt:
                    readOnly: true
                    type: string
                    format: date-time
                externalId:
                    readOnly: true
                    type: string
                    description: Provider-assigned immutable identity for this suite attempt.
                actor:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/OriginActor'
                    description: Principal that produced the suite.
            description: |-
                A persisted check suite, as returned by `PostCheckRun`. All fields are
                 server-owned; the writable shape is `CheckSuiteInput`.
        CheckSuiteInput:
            required:
                - key
                - name
                - externalId
            type: object
            properties:
                key:
                    type: string
                    description: Stable, app-chosen key identifying the logical suite across attempts.
                name:
                    type: string
                    description: Human-facing suite name.
                detailsUrl:
                    type: string
                    description: Optional link to more detail about the suite as a whole.
                externalId:
                    type: string
                    description: Provider-assigned immutable identity for this suite attempt.
        CheckSuiteReference:
            type: object
            properties:
                id:
                    type: string
        Commit:
            type: object
            properties:
                sha:
                    type: string
                    description: Full 40/64-char hex commit SHA.
                commit:
                    allOf:
                        - $ref: '#/components/schemas/CommitDetail'
                    description: Git-object metadata (author, committer, message, tree).
                parents:
                    type: array
                    items:
                        $ref: '#/components/schemas/CommitParent'
                stats:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/CommitStats'
                    description: Aggregate diff stats. `GetCommit` only.
            description: |-
                A commit with identity fields (`sha`, `parents`) at the top level and
                 git-object metadata nested under
                 `commit`. File diffs live in the paginated `ListCommitFiles` collection.
        CommitAuthor:
            type: object
            properties:
                name:
                    type: string
                email:
                    type: string
                date:
                    type: string
                    description: |-
                        ISO-8601 timestamp preserving the git signature's original timezone offset
                         (e.g. "2014-11-07T22:01:45+01:00").
            description: |-
                Git identity and timestamp for a commit's author or committer.

                 This is the identity recorded in the commit object, not a linked user
                 account.
        CommitComparison:
            type: object
            properties:
                status:
                    enum:
                        - identical
                        - ahead
                        - behind
                        - diverged
                    type: string
                    format: enum
                aheadBy:
                    type: integer
                    description: Commits `head` is ahead of the merge base.
                    format: int32
                behindBy:
                    type: integer
                    description: Commits `head` is behind `base`.
                    format: int32
                baseCommit:
                    allOf:
                        - $ref: '#/components/schemas/Commit'
                    description: Resolved `base`, using the list projection without `stats` or `files`.
                headCommit:
                    allOf:
                        - $ref: '#/components/schemas/Commit'
                    description: Resolved `head`, using the list projection without `stats` or `files`.
                mergeBaseCommit:
                    allOf:
                        - $ref: '#/components/schemas/Commit'
                    description: Merge base of `base` and `head`; unrelated histories return NOT_FOUND.
            description: |-
                A comparison summary without nested commit lists or URL fields. File
                 diffs live in the paginated `ListComparisonFiles` collection.
        CommitDetail:
            type: object
            properties:
                author:
                    $ref: '#/components/schemas/CommitAuthor'
                committer:
                    $ref: '#/components/schemas/CommitAuthor'
                message:
                    type: string
                tree:
                    $ref: '#/components/schemas/CommitTree'
            description: Git-object metadata for a commit.
        CommitFile:
            type: object
            properties:
                filename:
                    type: string
                    description: New path of the file.
                status:
                    type: string
                    description: One of "added", "removed", "modified", "renamed", or "copied".
                additions:
                    type: integer
                    format: int32
                deletions:
                    type: integer
                    format: int32
                changes:
                    type: integer
                    description: '`additions + deletions`.'
                    format: int32
                patch:
                    type: string
                    description: Unified diff patch for this file. Empty for binary files.
                previousFilename:
                    type: string
                    description: Pre-rename path, set only when `status` is "renamed" or "copied".
            description: A single file changed by a commit. Populated only on `GetCommit`.
        CommitFileChange:
            required:
                - path
            type: object
            properties:
                path:
                    type: string
                    description: Repository-relative path using `/` separators, e.g. `docs/changelog.md`.
                content:
                    type: string
                    description: |-
                        New file contents, encoded per `encoding`. Creates the file or replaces
                         its contents.
                delete:
                    type: boolean
                    description: |-
                        Removes the file. Must be `true` when set; removing a path that does not
                         exist fails with FAILED_PRECONDITION.
                encoding:
                    type: string
                    description: |-
                        Encoding of `content`: "utf-8" (default) or "base64". Ignored for
                         `delete`.
                mode:
                    type: string
                    description: |-
                        File mode for `content`: "file" (default), "executable", or "symlink",
                         where the contents are the link target. Ignored for `delete`.
            description: |-
                One file change in a commit created from files. Exactly one of `content`
                 and `delete` must be set.
        CommitParent:
            type: object
            properties:
                sha:
                    type: string
            description: A parent commit reference. Only the SHA is exposed (URLs omitted).
        CommitSignature:
            required:
                - name
                - email
            type: object
            properties:
                name:
                    type: string
                email:
                    type: string
            description: Name and email recorded for a commit author or committer.
        CommitStats:
            type: object
            properties:
                additions:
                    type: integer
                    format: int32
                deletions:
                    type: integer
                    format: int32
                total:
                    type: integer
                    description: '`additions + deletions`.'
                    format: int32
            description: |-
                Aggregate line stats for a commit's diff against its base. Populated only
                 on `GetCommit`, not in list responses.
        CommitTree:
            type: object
            properties:
                sha:
                    type: string
            description: The git tree a commit points at.
        CompareCommitsRequest:
            required:
                - identifier
                - basehead
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: Repository identity.
                basehead:
                    type: string
                    description: |-
                        `"{base}...{head}"`, where either revision may be a SHA, branch, tag, or
                         symbolic ref such as `HEAD`.
        Content:
            type: object
            properties:
                type:
                    type: string
                    description: One of "file" or "dir".
                encoding:
                    type: string
                    description: Present for files. Typically "base64".
                size:
                    type: string
                    description: |-
                        Decoded content size in bytes. GetContents / BatchGetContents reject file
                         payloads larger than 1 MiB.
                name:
                    type: string
                    description: Base name of the file or directory.
                path:
                    type: string
                    description: Path relative to the repository root.
                sha:
                    type: string
                    description: Git blob or tree object SHA (hex).
                content:
                    type: string
                    description: Base64-encoded file contents. Set only when `type` is "file".
                entries:
                    type: array
                    items:
                        $ref: '#/components/schemas/Content'
                    description: Immediate children when `type` is "dir".
            description: |-
                Repository file or directory content.

                 For a file (`type` = "file"): `encoding` and `content` are populated
                 (base64). For a directory (`type` = "dir"): `entries` lists immediate
                 children.
        CreateAppRequest:
            required:
                - namespaceSlug
                - displayName
                - publicKey
            type: object
            properties:
                namespaceSlug:
                    type: string
                    description: Slug of the namespace that will own the app.
                displayName:
                    type: string
                    description: Human-facing app name. Must not be empty.
                publicKey:
                    type: string
                    description: |-
                        PEM SPKI Ed25519 public key for the app's signing key pair. The caller
                         generates the key pair locally and retains the private key; only the
                         public key is stored, for app JWT verification.
                webhookUrl:
                    type: string
                    description: |-
                        Outbound webhook delivery URL: an absolute https URL. Empty means the app
                         receives no webhook deliveries.
                events:
                    type: array
                    items:
                        type: string
                    description: |-
                        Outbound webhook event subscriptions (for example `pull_request.created`
                         or `repository.pushed`). Unknown event types are rejected.
                description:
                    type: string
                    description: Short app description.
                websiteUrl:
                    type: string
                    description: 'Publisher website: an absolute https URL.'
                installationRedirectUris:
                    type: array
                    items:
                        type: string
                    description: |-
                        OAuth install callback allowlist: redirect URIs an app-initiated install
                         may return to (absolute https URI, no fragment), matched exactly at
                         authorize time.
                defaultScopes:
                    type: array
                    items:
                        type: string
                    description: |-
                        Default scopes offered when the app is installed, as catalog scope
                         strings (for example `repository:contents:read`). Installs still accept
                         scopes explicitly.
        CreateCheckRunAnnotationsRequest:
            required:
                - identifier
                - checkRunId
                - annotations
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                checkRunId:
                    type: string
                annotations:
                    type: array
                    items:
                        $ref: '#/components/schemas/CheckRunAnnotationInput'
                    description: |-
                        Atomic append batch. Must contain 1–25 entries. A check run stores at most
                         100 annotations; non-idempotent retries append duplicates and consume that
                         capacity. `location` is entirely optional; when present, its required
                         fields must form a coherent range.
        CreateCheckRunAnnotationsResponse:
            type: object
            properties:
                annotations:
                    readOnly: true
                    type: array
                    items:
                        $ref: '#/components/schemas/CheckRunAnnotation'
        CreateCommitFromFilesRequest:
            required:
                - identifier
                - targetBranch
                - expectedHeadSha
                - message
                - author
                - files
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: 'Identity of the repo: `(owner_slug, name)`.'
                targetBranch:
                    type: string
                    description: |-
                        Branch that receives the commit, as `<branch>`, `heads/<branch>`, or
                         `refs/heads/<branch>`. The branch must already exist.
                expectedHeadSha:
                    type: string
                    description: |-
                        Full hex SHA the target branch must currently point at. It becomes the
                         new commit's parent; the write fails with FAILED_PRECONDITION when the
                         branch tip differs.
                message:
                    type: string
                    description: Commit message.
                author:
                    allOf:
                        - $ref: '#/components/schemas/CommitSignature'
                    description: Commit author. Timestamps are assigned by the server.
                committer:
                    allOf:
                        - $ref: '#/components/schemas/CommitSignature'
                    description: Commit committer. Defaults to `author` when omitted.
                files:
                    type: array
                    items:
                        $ref: '#/components/schemas/CommitFileChange'
                    description: |-
                        File changes applied to the branch tip's tree. At least one change is
                         required, and paths must be unique within a request.
        CreateCommitFromFilesResponse:
            type: object
            properties:
                sha:
                    type: string
                    description: SHA of the new commit, now the branch tip.
                treeSha:
                    type: string
                    description: SHA of the new commit's root tree.
                previousHeadSha:
                    type: string
                    description: Branch tip before the write; the new commit's parent.
        CreateGitRefRequest:
            required:
                - identifier
                - ref
                - sha
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: 'Identity of the repo: `(owner_slug, name)`.'
                ref:
                    type: string
                    description: |-
                        Branch reference to create, as `refs/heads/<branch>` or `heads/<branch>`.
                         Only branch references can be created; tag and other reference names are
                         rejected.
                sha:
                    type: string
                    description: Full hex SHA of an existing commit that the new branch points at.
        CreateInstallationAccessTokenRequest:
            required:
                - installationId
            type: object
            properties:
                installationId:
                    type: string
                    description: |-
                        The unique identifier of the installation to scope the token to. Bound from
                         the URL path; the installation must belong to the authenticated app.
                scopes:
                    type: array
                    items:
                        type: string
                    description: |-
                        Scope strings to grant the token. Values must be unique and included in the
                         installation's accepted scopes. Empty or omitted inherits the full scope grant.
                repositoryIds:
                    type: array
                    items:
                        type: string
                    description: |-
                        Repository IDs to grant the token. Values must be unique, accessible to the
                         installation, and contain at most 50 entries. Empty or omitted inherits all
                         accessible repositories.
        CreateLabelRequest:
            required:
                - identifier
                - name
                - color
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                name:
                    type: string
                    description: |-
                        Label name. Leading and trailing whitespace is trimmed. Maximum 50
                         characters.
                color:
                    type: string
                    description: Six-character hex color without a leading `#`.
                description:
                    type: string
                    description: Optional description. Maximum 255 characters.
        CreatePullRequestCommentRequest:
            required:
                - identifier
                - pullNumber
                - body
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                body:
                    type: string
                threadId:
                    type: string
                    description: |-
                        Existing thread id to reply to. Cannot be combined with
                         `version_number`.
                inline:
                    allOf:
                        - $ref: '#/components/schemas/InlineCommentAnchor'
                    description: Anchor for a new inline thread.
                file:
                    allOf:
                        - $ref: '#/components/schemas/FileCommentAnchor'
                    description: |-
                        Anchor for a new file-level thread; the side is derived from the
                         file's change kind.
                versionNumber:
                    type: string
                    description: |-
                        Pull request version number to file a new thread against. 0 or unset
                         means the latest version at call time. Only meaningful for new
                         threads; rejected together with `thread_id`.
        CreatePullRequestRequest:
            required:
                - identifier
                - title
                - head
                - base
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                title:
                    type: string
                    description: Pull request title.
                body:
                    type: string
                    description: Pull request body / description. May be empty.
                head:
                    type: string
                    description: |-
                        Source branch name (the head of the change). Must resolve in the repo at
                         call time.
                base:
                    type: string
                    description: |-
                        Target branch name (what the change merges into). Must resolve in the repo
                         at call time.
                draft:
                    type: boolean
                    description: |-
                        When true, create as a draft. When false or omitted, create as open
                         (ready for review).
                parentPullNumber:
                    type: string
                    description: |-
                        Optional parent pull request number when stacking this change on another
                         open/draft change in the same repository.
        CreatePullRequestReviewRequest:
            required:
                - identifier
                - pullNumber
                - verdict
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                verdict:
                    enum:
                        - approve
                        - request_changes
                        - comment
                    type: string
                    description: The review decision.
                    format: enum
                body:
                    type: string
                    description: Free-text review summary. May be empty.
                versionNumber:
                    type: string
                    description: |-
                        Pull request version number the review applies to (see
                         `PullRequestVersion.number`). Omit to review the latest version at call
                         time. Comments anchor against this same version.
                comments:
                    type: array
                    items:
                        $ref: '#/components/schemas/ReviewCommentInput'
                    description: |-
                        Line-anchored comments published atomically with the review. At most 50
                         per request. Every anchor must reference the reviewed version's diff or
                         the entire request fails INVALID_ARGUMENT with nothing published.
        CreateRepoRequest:
            required:
                - ownerSlug
                - repo
            type: object
            properties:
                ownerSlug:
                    type: string
                    description: Parent owner entity's slug.
                repo:
                    allOf:
                        - $ref: '#/components/schemas/Repo'
                    description: |-
                        The repo to create. Only `name` (required) and `default_branch` (optional;
                         defaults to "main" when omitted) are honored on input; OUTPUT_ONLY fields
                         are ignored.
        CreateRulesetRequest:
            required:
                - identifier
                - name
                - enforcement
                - kind
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                name:
                    type: string
                description:
                    type: string
                enforcement:
                    enum:
                        - active
                        - evaluate
                        - disabled
                    type: string
                    format: enum
                kind:
                    enum:
                        - merge_branch
                        - push_branch
                        - push_tag
                        - push_repository
                    type: string
                    format: enum
                includedRefNames:
                    type: array
                    items:
                        type: string
                    description: |-
                        Ref name patterns this ruleset includes. Supports globs and the tokens
                         `~ALL` and `~DEFAULT_BRANCH`.
                excludedRefNames:
                    type: array
                    items:
                        type: string
                    description: |-
                        Ref name patterns this ruleset excludes. Same pattern language as
                         `included_ref_names`.
                rules:
                    type: array
                    items:
                        $ref: '#/components/schemas/RulesetRuleInput'
                bypassActors:
                    type: array
                    items:
                        $ref: '#/components/schemas/RulesetBypassActorInput'
        DeleteAppInstallationRequest:
            required:
                - installationId
            type: object
            properties:
                installationId:
                    type: string
                    description: |-
                        The unique identifier of the installation to delete. Bound from the URL
                         path; the installation must belong to the authenticated app.
        DeleteLabelRequest:
            required:
                - identifier
                - labelName
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                labelName:
                    type: string
                    description: Label name. Leading and trailing whitespace is trimmed before lookup.
        DeleteNamespaceGrantRequest:
            required:
                - ownerSlug
            type: object
            properties:
                ownerSlug:
                    type: string
                    description: Owner slug.
                user:
                    $ref: '#/components/schemas/OriginUserActor'
                group:
                    $ref: '#/components/schemas/OriginGroup'
                teamGroup:
                    $ref: '#/components/schemas/OriginTeamGroup'
        DeleteRepositoryGrantRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                user:
                    $ref: '#/components/schemas/OriginUserActor'
                group:
                    $ref: '#/components/schemas/OriginGroup'
                teamGroup:
                    $ref: '#/components/schemas/OriginTeamGroup'
        DeleteRulesetRequest:
            required:
                - identifier
                - rulesetId
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                rulesetId:
                    type: string
                    description: Stable Origin ruleset id.
        DetachRepoMirrorRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
        DismissPullRequestReviewRequest:
            required:
                - identifier
                - pullNumber
                - reviewId
                - message
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                reviewId:
                    type: string
                    description: Stable Origin review identifier, as returned by ListPullRequestReviews.
                message:
                    type: string
                    description: |-
                        Reason recorded with the dismissal. Must contain a non-whitespace
                         character; INVALID_ARGUMENT otherwise.
        FileCommentAnchor:
            required:
                - path
            type: object
            properties:
                path:
                    type: string
                    description: |-
                        File path in the pull request version's diff: the deleted path for
                         deletions, the head path otherwise (a renamed file's pre-rename source
                         path is rejected). Paths outside the diff fail with INVALID_ARGUMENT;
                         there is no fallback to a general-discussion comment.
            description: |-
                Anchor for a new file-level comment thread on the whole file in the pull
                 request version's diff. The side is derived from the file's change kind,
                 matching the review UI: the base version for deleted files, the head
                 version otherwise. It comes back on the thread's `side` field.
        ForceRepoMirrorCutoverRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
        GetActiveMirrorTransitionJobRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
        GetActiveMirrorTransitionJobResponse:
            type: object
            properties:
                activeJob:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/MirrorTransitionJob'
                    description: |-
                        The currently active transition job. Absent when no transition is in
                         progress.
                lastJob:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/MirrorTransitionJob'
                    description: |-
                        The most recent job that reached a terminal status. Absent when the
                         repository has never completed a transition.
        GetAppInstallationRequest:
            required:
                - installationId
            type: object
            properties:
                installationId:
                    type: string
                    description: Installation identifier.
        GetAppRequest:
            required:
                - appId
            type: object
            properties:
                appId:
                    type: string
                    description: App identifier.
        GetAuthenticatedAppRequest:
            type: object
            properties: {}
        GetBlobRequest:
            required:
                - identifier
                - sha
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: 'Identity of the repo: `(owner_slug, name)`.'
                sha:
                    type: string
                    description: Full or abbreviated hex SHA of the blob object.
        GetCheckRunRequest:
            required:
                - identifier
                - checkRunId
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                checkRunId:
                    type: string
                    description: Server-assigned check-run id (`cr_…`).
        GetCheckSuiteRequest:
            required:
                - identifier
                - checkSuiteId
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                checkSuiteId:
                    type: string
                    description: Server-assigned check suite id (`crg_…`).
        GetCommitRequest:
            required:
                - identifier
                - sha
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: Repo identifier.
                sha:
                    type: string
                    description: |-
                        SHA, branch, tag, or symbolic ref (for example `HEAD`) of the commit to
                         fetch.
        GetContentsRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: 'Identity of the repo: `(owner_slug, name)`.'
                path:
                    type: string
                    description: |-
                        Path to the file or directory relative to the repository root. Empty
                         requests the root directory.
                ref:
                    type: string
                    description: |-
                        Commit, branch, tag, or symbolic ref (for example `HEAD`) to read from.
                         Empty means the repository's default branch.
        GetGitCommitRequest:
            required:
                - identifier
                - sha
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: 'Identity of the repo: `(owner_slug, name)`.'
                sha:
                    type: string
                    description: |-
                        Full or abbreviated hex SHA of the commit object, or a branch, tag, or
                         symbolic ref such as `HEAD`.
        GetGitRefRequest:
            required:
                - identifier
                - ref
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: 'Identity of the repo: `(owner_slug, name)`.'
                ref:
                    type: string
                    description: |-
                        Git reference name. Typically `heads/<branch>` or `tags/<tag>`; a leading
                         `refs/` is accepted and normalized. The symbolic `HEAD` is also accepted
                         (returned as `ref: "HEAD"` with the tip commit). Exact match on the full
                         ref name.
        GetLabelRequest:
            required:
                - identifier
                - labelName
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                labelName:
                    type: string
                    description: Label name. Leading and trailing whitespace is trimmed before lookup.
        GetMirrorTransitionJobRequest:
            required:
                - identifier
                - jobId
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                jobId:
                    type: string
                    description: Identifier of the transition job, as returned in `job.id`.
        GetMirroredRepoRequest:
            required:
                - sourceNodeId
            type: object
            properties:
                sourceNodeId:
                    type: string
                    description: Node ID of the repository on the mirrored source.
        GetPullRequestCommentRequest:
            required:
                - identifier
                - commentId
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                commentId:
                    type: string
        GetPullRequestRequest:
            required:
                - identifier
                - pullNumber
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
        GetRateLimitRequest:
            type: object
            properties: {}
        GetRepoRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
        GetRepoTarballRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: 'Identity of the repo: `(owner_slug, name)`.'
                ref:
                    type: string
                    description: |-
                        Commit SHA (full or abbreviated hex), bare branch or tag name, fully
                         qualified `refs/heads/...` / `refs/tags/...`, or symbolic `HEAD`. Not a
                         glob or revspec (`<rev>~3` is rejected). Empty uses the repository
                         default branch.
        GetRepoTarballResponse:
            type: object
            properties:
                downloadUrl:
                    readOnly: true
                    type: string
                    description: |-
                        Short-lived signed download URL, valid for 15 minutes. Empty when the
                         REST response streams the archive inline (first request for this
                         repository and commit).
                sha:
                    readOnly: true
                    type: string
                    description: Resolved commit object id (40- or 64-character hex).
        GetRulesetRequest:
            required:
                - identifier
                - rulesetId
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                rulesetId:
                    type: string
                    description: Stable Origin ruleset id.
        GetTagRequest:
            required:
                - identifier
                - sha
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: 'Identity of the repo: `(owner_slug, name)`.'
                sha:
                    type: string
                    description: Full or abbreviated hex SHA of the annotated tag object.
        GetTreeRequest:
            required:
                - identifier
                - sha
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: 'Identity of the repo: `(owner_slug, name)`.'
                sha:
                    type: string
                    description: Tree SHA, commit SHA, branch, tag, or symbolic ref such as `HEAD`.
                recursive:
                    type: boolean
                    description: |-
                        When true, returns the full recursive walk of the tree. Query values
                         `true` and `1` enable recursion; omitting the parameter or passing any
                         other value (including `false` and `0`) lists immediate children only.
        GitCommit:
            type: object
            properties:
                sha:
                    type: string
                    description: Full hex commit SHA.
                author:
                    allOf:
                        - $ref: '#/components/schemas/CommitAuthor'
                    description: Author signature from the git object.
                committer:
                    allOf:
                        - $ref: '#/components/schemas/CommitAuthor'
                    description: Committer signature from the git object.
                message:
                    type: string
                    description: Full commit message.
                tree:
                    allOf:
                        - $ref: '#/components/schemas/CommitTree'
                    description: Tree this commit points at.
                parents:
                    type: array
                    items:
                        $ref: '#/components/schemas/CommitParent'
                    description: Parent commit SHAs (empty for a root commit).
            description: |-
                A Git commit object.
                 Distinct from `Commit`, which is the higher-level commits API shape
                 (`GET .../commits/{sha}`) with nested `commit` metadata and optional
                 diff `stats` / `files`.
        GitRef:
            type: object
            properties:
                ref:
                    type: string
                    description: Full ref name, e.g. "refs/heads/main".
                object:
                    allOf:
                        - $ref: '#/components/schemas/TaggedObject'
                    description: |-
                        Object this ref points at directly (unpeeled). For annotated tags,
                         `object.type` is "tag" and `object.sha` is the tag object SHA.
            description: A Git reference.
        GitTag:
            type: object
            properties:
                sha:
                    type: string
                    description: Tag object SHA (hex).
                tag:
                    type: string
                    description: Tag name, e.g. "v1.0".
                message:
                    type: string
                    description: Tag message.
                tagger:
                    allOf:
                        - $ref: '#/components/schemas/CommitAuthor'
                    description: Tagger signature from the tag object.
                object:
                    allOf:
                        - $ref: '#/components/schemas/TaggedObject'
                    description: Object this tag points at.
            description: |-
                An annotated Git tag object. Lightweight tags are refs only and are not
                 returned by this API.
        GitTree:
            type: object
            properties:
                sha:
                    type: string
                    description: Tree object SHA (hex).
                tree:
                    type: array
                    items:
                        $ref: '#/components/schemas/GitTreeEntry'
                    description: Entries under this tree (immediate children, or the full recursive walk).
                truncated:
                    type: boolean
                    description: True when the entry list was truncated by the entry-count or size cap.
            description: |-
                A Git tree object.

                 When `truncated` is true, the entry list was cut short by the 100,000-entry
                 or 7 MiB encoded-payload cap. Fetch subtrees non-recursively to page further.
        GitTreeEntry:
            type: object
            properties:
                path:
                    type: string
                    description: Path relative to the requested tree root.
                mode:
                    type: string
                    description: 'Git mode as an octal string: "100644", "100755", "040000", "120000", "160000".'
                type:
                    type: string
                    description: One of "blob", "tree", or "commit" (gitlink/submodule).
                sha:
                    type: string
                    description: Object SHA (hex).
                size:
                    type: integer
                    description: |-
                        Blob size in bytes. Unset for trees and gitlinks. `int32` ensures REST JSON
                         emits a number; individual blobs over 2 GiB are not representable.
                    format: int32
            description: One entry in a Git tree.
        GoogleProtobufAny:
            type: object
            properties:
                '@type':
                    type: string
                    description: The type of the serialized message.
            additionalProperties: true
            description: Contains an arbitrary serialized message along with a @type that describes the type of the serialized message.
        InlineCommentAnchor:
            required:
                - path
                - side
                - startLine
            type: object
            properties:
                path:
                    type: string
                    description: |-
                        File path in the pull request version's diff. The path must be part of
                         that diff, on a side the file has content on; otherwise the request
                         fails with INVALID_ARGUMENT. There is no fallback to a
                         general-discussion comment.
                side:
                    enum:
                        - left
                        - right
                    type: string
                    description: |-
                        Diff side of the anchor: `left` for the base version of the file,
                         `right` for the head version.
                    format: enum
                startLine:
                    type: integer
                    description: |-
                        First 1-based line of the anchored range in the `side` version of the
                         file. Any line of the file anchors, matching the review UI — the range
                         is not restricted to the diff's hunks, but must not run past the end
                         of the file.
                    format: uint32
                endLine:
                    type: integer
                    description: |-
                        Inclusive last line of the anchored range. Must be greater than or
                         equal to `start_line`. Omit for a single-line anchor.
                    format: uint32
            description: |-
                Diff anchor for a new line-anchored comment thread on a file in the pull
                 request version's diff. `start_line` anchors to a line and `end_line`
                 extends it to a range; for a comment on the whole file, use
                 `FileCommentAnchor` instead.
        InstallationAccessToken:
            type: object
            properties:
                token:
                    readOnly: true
                    type: string
                    description: |-
                        The installation access token. This is a secret credential; treat it like
                         a password and do not log it.
                expiresAt:
                    readOnly: true
                    type: string
                    description: |-
                        When the token expires, typically about one hour after creation. Serialized
                         as an RFC 3339 / ISO-8601 string in JSON.
                    format: date-time
            description: A short-lived installation access token.
        InstallationCreatedWebhookPayload:
            type: object
            properties:
                installation:
                    allOf:
                        - $ref: '#/components/schemas/WebhookInstallation'
                    description: The installation snapshot at the time of the event.
                app:
                    allOf:
                        - $ref: '#/components/schemas/WebhookApp'
                    description: The app the installation belongs to.
            x-origin-webhook-events:
                - installation.created
            example:
                installation:
                    id: inst_01k2ja2000e0080000000000b2
                    appId: app_01k2ja2000e0080000000000a1
                    target:
                        slug: acme
                        id: ns_01k2ja2000e0080000000000p3
                        type: team
                    repoSelectionMode: selected
                    repositories:
                        - id: repo_01k2ja2000e0080000000000q4
                          name: rocket
                          owner:
                            slug: acme
                            id: ns_01k2ja2000e0080000000000p3
                            type: team
                    scopes:
                        - repository:contents:read
                        - repository:pull_requests:read
                    repositoriesCount: 1
                    createdAt: "2026-08-01T09:30:00Z"
                    updatedAt: "2026-08-01T09:30:00Z"
                    installedBy:
                        id: user_01k2ja2000e0080000000000c3
                        email: jane@acme.dev
                app:
                    id: app_01k2ja2000e0080000000000a1
                    displayName: CI Status Bot
        InstallationDeletedWebhookPayload:
            type: object
            properties:
                installation:
                    allOf:
                        - $ref: '#/components/schemas/WebhookInstallation'
                    description: The installation snapshot at the time of the event.
                app:
                    allOf:
                        - $ref: '#/components/schemas/WebhookApp'
                    description: The app the installation belongs to.
            x-origin-webhook-events:
                - installation.deleted
            example:
                installation:
                    id: inst_01k2ja2000e0080000000000b2
                    appId: app_01k2ja2000e0080000000000a1
                    target:
                        slug: acme
                        id: ns_01k2ja2000e0080000000000p3
                        type: team
                    repoSelectionMode: selected
                    repositories:
                        - id: repo_01k2ja2000e0080000000000q4
                          name: rocket
                          owner:
                            slug: acme
                            id: ns_01k2ja2000e0080000000000p3
                            type: team
                    scopes:
                        - repository:contents:read
                        - repository:pull_requests:read
                    repositoriesCount: 1
                    createdAt: "2026-08-01T09:30:00Z"
                    installedBy:
                        id: user_01k2ja2000e0080000000000c3
                        email: jane@acme.dev
                    deletedAt: "2026-08-03T08:15:00Z"
                app:
                    id: app_01k2ja2000e0080000000000a1
                    displayName: CI Status Bot
        InstallationReference:
            type: object
            properties:
                id:
                    type: string
                target:
                    allOf:
                        - $ref: '#/components/schemas/Owner'
                    description: Target owner entity the app is installed into.
            description: |-
                Stable identity for an app installation: the installation id plus the
                 owner entity it is installed into, matching AppInstallation.
        InstallationSuspendedWebhookPayload:
            type: object
            properties:
                installation:
                    allOf:
                        - $ref: '#/components/schemas/WebhookInstallation'
                    description: The installation snapshot at the time of the event.
                app:
                    allOf:
                        - $ref: '#/components/schemas/WebhookApp'
                    description: The app the installation belongs to.
            x-origin-webhook-events:
                - installation.suspended
            example:
                installation:
                    id: inst_01k2ja2000e0080000000000b2
                    appId: app_01k2ja2000e0080000000000a1
                    target:
                        slug: acme
                        id: ns_01k2ja2000e0080000000000p3
                        type: team
                    repoSelectionMode: selected
                    repositories:
                        - id: repo_01k2ja2000e0080000000000q4
                          name: rocket
                          owner:
                            slug: acme
                            id: ns_01k2ja2000e0080000000000p3
                            type: team
                    scopes:
                        - repository:contents:read
                        - repository:pull_requests:read
                    repositoriesCount: 1
                    createdAt: "2026-08-01T09:30:00Z"
                    installedBy:
                        id: user_01k2ja2000e0080000000000c3
                        email: jane@acme.dev
                    suspendedAt: "2026-08-03T08:15:00Z"
                app:
                    id: app_01k2ja2000e0080000000000a1
                    displayName: CI Status Bot
        InstallationUnsuspendedWebhookPayload:
            type: object
            properties:
                installation:
                    allOf:
                        - $ref: '#/components/schemas/WebhookInstallation'
                    description: The installation snapshot at the time of the event.
                app:
                    allOf:
                        - $ref: '#/components/schemas/WebhookApp'
                    description: The app the installation belongs to.
            x-origin-webhook-events:
                - installation.unsuspended
            example:
                installation:
                    id: inst_01k2ja2000e0080000000000b2
                    appId: app_01k2ja2000e0080000000000a1
                    target:
                        slug: acme
                        id: ns_01k2ja2000e0080000000000p3
                        type: team
                    repoSelectionMode: selected
                    repositories:
                        - id: repo_01k2ja2000e0080000000000q4
                          name: rocket
                          owner:
                            slug: acme
                            id: ns_01k2ja2000e0080000000000p3
                            type: team
                    scopes:
                        - repository:contents:read
                        - repository:pull_requests:read
                    repositoriesCount: 1
                    createdAt: "2026-08-01T09:30:00Z"
                    installedBy:
                        id: user_01k2ja2000e0080000000000c3
                        email: jane@acme.dev
                app:
                    id: app_01k2ja2000e0080000000000a1
                    displayName: CI Status Bot
        InstallationUpdatedWebhookPayload:
            type: object
            properties:
                installation:
                    allOf:
                        - $ref: '#/components/schemas/WebhookInstallation'
                    description: The installation snapshot at the time of the event.
                app:
                    allOf:
                        - $ref: '#/components/schemas/WebhookApp'
                    description: The app the installation belongs to.
            x-origin-webhook-events:
                - installation.updated
            example:
                installation:
                    id: inst_01k2ja2000e0080000000000b2
                    appId: app_01k2ja2000e0080000000000a1
                    target:
                        slug: acme
                        id: ns_01k2ja2000e0080000000000p3
                        type: team
                    repoSelectionMode: selected
                    repositories:
                        - id: repo_01k2ja2000e0080000000000q4
                          name: rocket
                          owner:
                            slug: acme
                            id: ns_01k2ja2000e0080000000000p3
                            type: team
                    scopes:
                        - repository:contents:read
                        - repository:pull_requests:read
                    repositoriesCount: 1
                    createdAt: "2026-08-01T09:30:00Z"
                    updatedAt: "2026-08-02T14:45:00Z"
                    installedBy:
                        id: user_01k2ja2000e0080000000000c3
                        email: jane@acme.dev
                app:
                    id: app_01k2ja2000e0080000000000a1
                    displayName: CI Status Bot
        Label:
            type: object
            properties:
                id:
                    type: string
                name:
                    type: string
                color:
                    type: string
                    description: Six-character hex color without a leading `#`.
                description:
                    type: string
        ListAppInstallationRepositoriesRequest:
            type: object
            properties:
                pageSize:
                    type: integer
                    description: |-
                        Max repositories to return. Defaults to 30 when unset or 0. Values above
                         100 are clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page.
        ListAppInstallationRepositoriesResponse:
            type: object
            properties:
                repositories:
                    type: array
                    items:
                        $ref: '#/components/schemas/Repo'
                nextPageToken:
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
                repoSelectionMode:
                    readOnly: true
                    enum:
                        - all
                        - selected
                    type: string
                    description: Whether the authenticated installation can access all repos belonging to an owner, or only selected repos.
                    format: enum
        ListAppInstallationsRequest:
            type: object
            properties:
                pageSize:
                    type: integer
                    description: |-
                        Max installations to return. Defaults to 30 when unset or 0. Values
                         above 100 are clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page.
        ListAppInstallationsResponse:
            type: object
            properties:
                installations:
                    type: array
                    items:
                        $ref: '#/components/schemas/AppInstallation'
                nextPageToken:
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
        ListBranchesRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pageSize:
                    type: integer
                    description: |-
                        Max branches to return. Defaults to 30 when unset or 0. Values above 100
                         are clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page. Encodes the page offset, so `page_size` on a follow-up request
                         is ignored when a token is supplied.
        ListBranchesResponse:
            type: object
            properties:
                branches:
                    type: array
                    items:
                        $ref: '#/components/schemas/Branch'
                nextPageToken:
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
        ListCheckRunAnnotationsRequest:
            required:
                - identifier
                - checkRunId
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                checkRunId:
                    type: string
                pageSize:
                    type: integer
                    description: |-
                        Max annotations to return. Defaults to 30 when unset or 0. Values above
                         100 are clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page. A supplied token fixes the page size and scope, so
                         `page_size` is ignored on follow-up requests.
        ListCheckRunAnnotationsResponse:
            type: object
            properties:
                annotations:
                    readOnly: true
                    type: array
                    items:
                        $ref: '#/components/schemas/CheckRunAnnotation'
                nextPageToken:
                    readOnly: true
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
        ListCheckRunsForCommitRequest:
            required:
                - identifier
                - sha
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                sha:
                    type: string
                    description: Commit SHA (40- or 64-char hex) to list check runs for.
                pageSize:
                    type: integer
                    description: |-
                        Max check runs to return. Defaults to 30 when unset or 0. Values above 100
                         are clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page. Encodes the last-seen check-run id scoped to this commit and
                         the filters below, so `page_size` on a follow-up request is ignored when
                         a token is supplied and reusing a token under different filters is
                         rejected with INVALID_ARGUMENT.
                checkName:
                    type: string
                    description: Optional exact check-run name filter (the check run's `name`).
                status:
                    type: string
                    description: |-
                        Optional status filter: `queued`, `in_progress`, or `completed`. Any
                         other value is rejected with INVALID_ARGUMENT.
        ListCheckRunsForCommitResponse:
            type: object
            properties:
                checkRuns:
                    readOnly: true
                    type: array
                    items:
                        $ref: '#/components/schemas/CheckRun'
                nextPageToken:
                    readOnly: true
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
        ListCheckRunsForSuiteRequest:
            required:
                - identifier
                - checkSuiteId
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                checkSuiteId:
                    type: string
                    description: Server-assigned check suite id (`crg_…`).
                pageSize:
                    type: integer
                    description: |-
                        Max check runs to return. Defaults to 30 when unset or 0. Values above 100
                         are clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page. Encodes the last-seen check-run id scoped to this suite, so
                         `page_size` on a follow-up request is ignored when a token is supplied.
        ListCheckRunsForSuiteResponse:
            type: object
            properties:
                checkRuns:
                    readOnly: true
                    type: array
                    items:
                        $ref: '#/components/schemas/CheckRun'
                nextPageToken:
                    readOnly: true
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
        ListCheckSuitesForCommitRequest:
            required:
                - identifier
                - sha
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                sha:
                    type: string
                    description: Commit SHA (40- or 64-char hex) to list suites for.
                pageSize:
                    type: integer
                    description: |-
                        Max suites to return. Defaults to 30 when unset or 0. Values above 100 are
                         clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page. Encodes the last-seen check-suite id scoped to this commit, so
                         `page_size` on a follow-up request is ignored when a token is supplied.
        ListCheckSuitesForCommitResponse:
            type: object
            properties:
                checkSuites:
                    readOnly: true
                    type: array
                    items:
                        $ref: '#/components/schemas/CheckSuite'
                nextPageToken:
                    readOnly: true
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
        ListCommitFilesRequest:
            required:
                - identifier
                - sha
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                sha:
                    type: string
                    description: |-
                        SHA, branch, tag, or symbolic ref (for example `HEAD`) of the commit
                         whose files should be listed.
                pageSize:
                    type: integer
                    description: |-
                        Max changed files to return. Defaults to 30 when unset or 0. Values above
                         100 are clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page. The token fixes the resolved commit, page size, and file cursor,
                         so `sha` and `page_size` on a follow-up request must match the token.
        ListCommitFilesResponse:
            type: object
            properties:
                files:
                    readOnly: true
                    type: array
                    items:
                        $ref: '#/components/schemas/CommitFile'
                nextPageToken:
                    readOnly: true
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more files.
        ListCommitsRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                sha:
                    type: string
                    description: |-
                        SHA, branch, tag, or symbolic ref (for example `HEAD`) to start listing
                         from. Empty means the repo's default branch.
                pageSize:
                    type: integer
                    description: |-
                        Max commits to return. Defaults to 30 when unset or 0. Values above 100 are
                         clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page. Encodes the starting ref and page, so `sha`/`page_size` on a
                         follow-up request are ignored when a token is supplied.
        ListCommitsResponse:
            type: object
            properties:
                commits:
                    type: array
                    items:
                        $ref: '#/components/schemas/Commit'
                nextPageToken:
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
        ListComparisonFilesRequest:
            required:
                - identifier
                - basehead
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                basehead:
                    type: string
                    description: |-
                        `"{base}...{head}"`, where either revision may be a SHA, branch, tag, or
                         symbolic ref such as `HEAD`.
                pageSize:
                    type: integer
                    description: |-
                        Max changed files to return. Defaults to 30 when unset or 0. Values above
                         100 are clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page. The token is bound to the resolved comparison, page size, and
                         file cursor, so `basehead` and `page_size` on a follow-up request must
                         match the token; if the comparison's resolved commits have changed since
                         the token was issued, the request fails with INVALID_ARGUMENT and listing
                         must restart from the first page.
        ListComparisonFilesResponse:
            type: object
            properties:
                files:
                    readOnly: true
                    type: array
                    items:
                        $ref: '#/components/schemas/CommitFile'
                nextPageToken:
                    readOnly: true
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more files.
        ListLabelsRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pageSize:
                    type: integer
                    description: |-
                        Maximum labels to return. Defaults to 30 when omitted or zero; capped at
                         100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page.
        ListLabelsResponse:
            type: object
            properties:
                labels:
                    type: array
                    items:
                        $ref: '#/components/schemas/Label'
                nextPageToken:
                    type: string
                    description: Opaque cursor for the next page. Empty when there are no more results.
        ListMatchingGitRefsRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: 'Identity of the repo: `(owner_slug, name)`.'
                ref:
                    type: string
                    description: |-
                        Prefix to match. Typically `heads/<prefix>` or `tags/<prefix>`; a leading
                         `refs/` is accepted and normalized. Empty lists all refs (REST binding
                         without a trailing path segment).
        ListMatchingGitRefsResponse:
            type: object
            properties:
                refs:
                    type: array
                    items:
                        $ref: '#/components/schemas/GitRef'
                    description: Matching refs, sorted by full ref name.
        ListNamespaceAppsRequest:
            required:
                - namespaceSlug
            type: object
            properties:
                namespaceSlug:
                    type: string
                    description: Slug of the namespace whose apps to list.
                pageSize:
                    type: integer
                    description: |-
                        Max apps to return. Defaults to 30 when unset or 0. Values above 100 are
                         clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page.
        ListNamespaceAppsResponse:
            type: object
            properties:
                apps:
                    type: array
                    items:
                        $ref: '#/components/schemas/AppDisplayMetadata'
                nextPageToken:
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
        ListNamespaceGrantsRequest:
            required:
                - ownerSlug
            type: object
            properties:
                ownerSlug:
                    type: string
                    description: Slug of the owner whose grants to list.
                pageSize:
                    type: integer
                    description: |-
                        Max grants to return. Defaults to 30 when unset or 0. Values above 100
                         are clamped to 100. Ignored when `page_token` is set.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page.
        ListNamespaceGrantsResponse:
            type: object
            properties:
                grants:
                    type: array
                    items:
                        $ref: '#/components/schemas/NamespaceGrant'
                    description: |-
                        Grants on this page. Admin grants are listed before all others; within
                         each of those two runs, grants are ordered by principal kind (groups,
                         owning-team admins, owning-team members, users) and then by id. Grants
                         whose user, group, or owning team no longer exists are omitted, so a page
                         may hold fewer than `page_size` grants.
                nextPageToken:
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
        ListPullRequestCommentsRequest:
            required:
                - identifier
                - pullNumber
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                pageSize:
                    type: integer
                    description: Maximum comments to return. Defaults to 30; maximum 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page.
                since:
                    type: string
                    description: |-
                        Optional inclusive RFC 3339 lower bound on comment creation time, e.g.
                         `2026-08-01T00:00:00Z`, matching the list's chronological order. A
                         malformed timestamp is rejected with INVALID_ARGUMENT. Page tokens embed
                         the bound; reusing a token under a different `since` is rejected.
                until:
                    type: string
                    description: |-
                        Optional inclusive RFC 3339 upper bound on comment creation time, e.g.
                         `2026-08-31T23:59:59Z`. A malformed timestamp is rejected with
                         INVALID_ARGUMENT. Page tokens embed the bound; reusing a token under a
                         different `until` is rejected.
                threadIds:
                    type: array
                    items:
                        type: string
                    description: |-
                        Optional thread ids that restrict the listing to comments in those
                         threads. Empty or omitted returns every comment. Duplicates are
                         ignored. At most 20 ids. A page token embeds the canonical id set;
                         reusing a token under a different set is rejected with
                         INVALID_ARGUMENT.
        ListPullRequestCommentsResponse:
            type: object
            properties:
                comments:
                    type: array
                    items:
                        $ref: '#/components/schemas/PullRequestComment'
                pullRequest:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestReference'
                    description: Pull request shared by every comment in this page.
                nextPageToken:
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more comments.
        ListPullRequestCommitsRequest:
            required:
                - identifier
                - pullNumber
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                pageSize:
                    type: integer
                    description: |-
                        Max commits to return. Defaults to 30 when unset or 0. Values above 100
                         are clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page. The token is bound to the repository, pull request version,
                         page size, and commit offset.
        ListPullRequestCommitsResponse:
            type: object
            properties:
                commits:
                    type: array
                    items:
                        $ref: '#/components/schemas/Commit'
                nextPageToken:
                    readOnly: true
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more commits.
        ListPullRequestFilesRequest:
            required:
                - identifier
                - pullNumber
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                pageSize:
                    type: integer
                    description: |-
                        Max changed files to return. Defaults to 30 when unset or 0. Values above
                         100 are clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page. The token is bound to the repository, pull request version,
                         page size, and changed-file cursor.
        ListPullRequestFilesResponse:
            type: object
            properties:
                files:
                    type: array
                    items:
                        $ref: '#/components/schemas/PullRequestFile'
                nextPageToken:
                    readOnly: true
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more files.
        ListPullRequestLabelsRequest:
            required:
                - identifier
                - pullNumber
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
        ListPullRequestLabelsResponse:
            type: object
            properties:
                labels:
                    type: array
                    items:
                        $ref: '#/components/schemas/Label'
                    description: Every label currently assigned to the pull request, sorted by name.
        ListPullRequestRequestedReviewersRequest:
            required:
                - identifier
                - pullNumber
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
        ListPullRequestRequestedReviewersResponse:
            type: object
            properties:
                users:
                    type: array
                    items:
                        $ref: '#/components/schemas/OriginUserActor'
                    description: Users whose review is currently requested.
                groups:
                    type: array
                    items:
                        $ref: '#/components/schemas/OriginGroup'
                    description: Groups whose review is currently requested.
        ListPullRequestReviewsRequest:
            required:
                - identifier
                - pullNumber
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                pageSize:
                    type: integer
                    description: Maximum reviews to return. Defaults to 30; maximum 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page.
        ListPullRequestReviewsResponse:
            type: object
            properties:
                reviews:
                    type: array
                    items:
                        $ref: '#/components/schemas/PullRequestReview'
                pullRequest:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestReference'
                    description: Pull request shared by every review in this page.
                nextPageToken:
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more reviews.
        ListPullRequestsRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                head:
                    type: string
                    description: Optional exact branch (head-ref) filter. Omit to list across every branch.
                state:
                    type: string
                    description: '"open" | "closed" | "all". Defaults to "open".'
                pageSize:
                    type: integer
                    description: Maximum results to return. Defaults to 30; maximum 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page.
                author:
                    type: string
                    description: |-
                        Optional author filter: an actor id as returned in
                         `pull_request.author.id` (`user_…`, `app_…`, or `sa_…`) or an exact user
                         email. Email matching is case-insensitive. An author that does not resolve
                         uniquely yields an empty list. Any other value, including the shared
                         `origin-cursor-managed-actor` id, is rejected with INVALID_ARGUMENT.
                base:
                    type: string
                    description: |-
                        Optional exact base-branch filter. Accepts a short name (`main`) or a
                         fully qualified ref (`refs/heads/main`). Omit to list across every base.
                direction:
                    type: string
                    description: |-
                        Sort direction by creation order (pull number): `"desc"` (newest first,
                         the default) or `"asc"` (oldest first).
                since:
                    type: string
                    description: |-
                        Optional inclusive lower bound on creation time (RFC 3339 timestamp,
                         e.g. `2026-08-01T00:00:00Z`): only pull requests created at or after
                         this instant. Malformed timestamps are rejected with INVALID_ARGUMENT.
                until:
                    type: string
                    description: |-
                        Optional inclusive upper bound on creation time (RFC 3339 timestamp):
                         only pull requests created at or before this instant. Malformed
                         timestamps are rejected with INVALID_ARGUMENT.
        ListPullRequestsResponse:
            type: object
            properties:
                pullRequests:
                    type: array
                    items:
                        $ref: '#/components/schemas/PullRequest'
                nextPageToken:
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
        ListReposRequest:
            required:
                - ownerSlug
            type: object
            properties:
                ownerSlug:
                    type: string
                    description: Parent owner entity slug.
                pageSize:
                    type: integer
                    description: |-
                        Max repos to return. Defaults to 30 when unset or 0. Values above 100 are
                         clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page.
                filter:
                    type: string
                    description: Optional case-insensitive substring filter.
        ListReposResponse:
            type: object
            properties:
                repositories:
                    type: array
                    items:
                        $ref: '#/components/schemas/Repo'
                nextPageToken:
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
        ListRepositoryGrantsRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pageSize:
                    type: integer
                    description: |-
                        Max grants to return. Defaults to 30 when unset or 0. Values above 100
                         are clamped to 100. Ignored when `page_token` is set.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page.
        ListRepositoryGrantsResponse:
            type: object
            properties:
                grants:
                    type: array
                    items:
                        $ref: '#/components/schemas/RepositoryGrant'
                    description: |-
                        Ordered by principal kind (groups, owning-team admins, owning-team
                         members, users), then by id. Principals that no longer resolve to an active
                         user, group, or owning team are omitted, so a page may hold fewer than
                         `page_size` grants.
                repository:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/RepositoryReference'
                    description: Repository shared by every grant in this response.
                nextPageToken:
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
        ListRulesetsRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
        ListRulesetsResponse:
            type: object
            properties:
                rulesets:
                    type: array
                    items:
                        $ref: '#/components/schemas/Ruleset'
                repository:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/RepositoryReference'
                    description: Repository shared by every ruleset in this response.
        ListWebhookDeliveriesRequest:
            type: object
            properties:
                delivered:
                    type: boolean
                    description: |-
                        Compares against `delivered_at`. `delivered=false` is the recovery
                         predicate: it selects every delivery that has never received a 2xx,
                         including deliveries whose retry ladder exhausted during an outage.
                eventType:
                    type: string
                    description: Exact event type, e.g. `pull_request.created`.
                installationId:
                    type: string
                    description: Narrow to one installation (`WebhookDelivery.installation.id`).
                createdAfter:
                    type: string
                    description: Bound the delivery's creation time. For browsing, not for recovery.
                    format: date-time
                createdBefore:
                    type: string
                    format: date-time
                pageSize:
                    type: integer
                    description: Defaults to 30 when unset or 0. Values above 100 are clamped to 100.
                    format: int32
                pageToken:
                    type: string
                    description: |-
                        Opaque cursor from a previous response's `next_page_token`. Empty for the
                         first page.
        ListWebhookDeliveriesResponse:
            type: object
            properties:
                deliveries:
                    type: array
                    items:
                        $ref: '#/components/schemas/WebhookDelivery'
                nextPageToken:
                    type: string
                    description: Opaque cursor for the next page; empty when there are no more pages.
        MergePullRequestRequest:
            required:
                - identifier
                - pullNumber
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                    description: |-
                        Pull number to merge. When this pull is stacked, the merge lands every
                         pull from the stack root through this number.
                expectedHeadSha:
                    type: string
                    description: |-
                        Optional guard against merging a head the caller has not seen: the full
                         commit SHA (40- or 64-character hex) expected to be the pull request's
                         current head. When set and the head has moved, the merge is rejected
                         with ABORTED (HTTP 409 Conflict) and nothing is merged. Values that are
                         not a full commit SHA are rejected with INVALID_ARGUMENT. Not evaluated
                         when the pull request is already merged (the call returns idempotent
                         success). Omit to merge whatever the current head is.
                mergeMethod:
                    enum:
                        - merge
                        - squash
                    type: string
                    description: |-
                        `merge` writes a merge commit, `squash` a single squash commit. A method
                         the repository does not allow fails with FAILED_PRECONDITION. Omit to use
                         the repository's default: a merge commit when allowed, otherwise squash;
                         squash when the base branch requires linear history.
                    format: enum
        MergePullRequestResponse:
            type: object
            properties:
                mergeCommitSha:
                    readOnly: true
                    type: string
                    description: SHA of the merge commit written to the base branch.
                mergedPullNumbers:
                    readOnly: true
                    type: array
                    items:
                        type: string
                    description: |-
                        Pull numbers (root-to-target order) transitioned to merged by this call.
                         Empty when the prefix was already merged.
                pullRequest:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/PullRequest'
                    description: The target pull request after the merge.
        MirrorTransitionJob:
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                    description: Unique identifier of the job.
                transition:
                    readOnly: true
                    enum:
                        - initial_to_inbound
                        - inbound_to_outbound
                        - outbound_to_inbound
                    type: string
                    description: The mirror-direction change this job performs.
                    format: enum
                status:
                    readOnly: true
                    enum:
                        - queued
                        - running
                        - succeeded
                        - failed_rolled_back
                        - requires_attention
                        - superseded
                    type: string
                    description: |-
                        Lifecycle state. `succeeded`, `failed_rolled_back`, and `superseded` are
                         terminal; `requires_attention` needs operator intervention or a forced
                         cutover.
                    format: enum
                phase:
                    readOnly: true
                    type: string
                    description: |-
                        Progress detail within `status`, for display and debugging. One of
                         "queued", "starting", "draining-writes", "initializing-mirror-fetch",
                         "finalizing-mirror-fetch", "finalizing-mirror-push", "snapshotting-refs",
                         "verifying-integrity", "reopening-inbound-mirror",
                         "committing-target-status", "rolling-back", or "completed". New phases
                         may appear as the transition process evolves; poll `status` for
                         completion rather than matching on phases.
                attemptCount:
                    readOnly: true
                    type: integer
                    description: Number of times this job has been attempted.
                    format: uint32
                drainUntil:
                    readOnly: true
                    type: string
                    description: |-
                        When the write-drain window of an in-progress transition ends. Absent
                         outside the draining phase.
                    format: date-time
                lastErrorCode:
                    readOnly: true
                    type: string
                    description: |-
                        Stable code identifying why the job last failed, for example
                         "InboundMirrorDrainTimeout" or "MirrorIntegrityMismatch". Absent while
                         the job has not failed.
                lastErrorMessage:
                    readOnly: true
                    type: string
                    description: |-
                        Human-readable detail for `last_error_code`. Absent while the job has
                         not failed.
                startedAt:
                    readOnly: true
                    type: string
                    description: When the job started running. Absent while queued.
                    format: date-time
                completedAt:
                    readOnly: true
                    type: string
                    description: When the job reached a terminal status. Absent until then.
                    format: date-time
                createdAt:
                    readOnly: true
                    type: string
                    format: date-time
                updatedAt:
                    readOnly: true
                    type: string
                    format: date-time
            description: |-
                An asynchronous job tracking one mirror transition. Jobs are created by
                 starting a transition or forcing a cutover, and are polled until they reach
                 a terminal status.
        NamespaceGrant:
            type: object
            properties:
                user:
                    $ref: '#/components/schemas/OriginUserActor'
                group:
                    $ref: '#/components/schemas/OriginGroup'
                teamGroup:
                    allOf:
                        - $ref: '#/components/schemas/OriginTeamGroup'
                    description: A built-in group of the owning team.
                permission:
                    enum:
                        - PERMISSION_READ
                        - PERMISSION_CONTRIBUTOR
                        - PERMISSION_WRITE
                        - PERMISSION_ADMIN
                        - PERMISSION_CUSTOM
                    type: string
                    description: Permission the principal holds on every repository under the owner.
                    format: enum
            description: |-
                One grant of access to an owner: the principal that holds it and the
                 permission it confers on every repository under that owner. The principal is
                 a user, a group, or one of the owning team's built-in groups (all team
                 admins, or all team members). Grants to the built-in team groups are the
                 team's default access to the owner and are set through
                 `UpsertNamespaceGrant` and `DeleteNamespaceGrant` like any other grant.
        OriginActor:
            type: object
            properties:
                user:
                    $ref: '#/components/schemas/OriginUserActor'
                app:
                    $ref: '#/components/schemas/OriginAppActor'
                serviceAccount:
                    $ref: '#/components/schemas/OriginServiceAccountActor'
            description: A user, app, or service account that performed an externally visible action.
        OriginAppActor:
            type: object
            properties:
                id:
                    type: string
                displayName:
                    type: string
                    description: |-
                        The app's registered display name, never empty when present. Omitted on
                         payloads whose app could not be resolved and on the first-party Cursor
                         facade actor.
        OriginGroup:
            type: object
            properties:
                id:
                    type: string
            description: Public Origin group identity (`grp_…`). Currently id-only.
        OriginServiceAccountActor:
            type: object
            properties:
                id:
                    type: string
        OriginTeamGroup:
            type: object
            properties:
                kind:
                    enum:
                        - members
                        - admins
                    type: string
                    format: enum
            description: |-
                A fixed group of the team that owns a repository or an owner: every team
                 member or every team admin. These are the owning team's default access
                 shelves, granted on the resource itself; a repository's team-group grant is
                 distinct from the one inherited from its owner.
        OriginUserActor:
            required:
                - email
            type: object
            properties:
                id:
                    type: string
                email:
                    type: string
                displayName:
                    type: string
                    description: |-
                        Human-readable display name: the account's first and last name, each
                         trimmed, joined with a space — exactly the name the product UI renders.
                         Omitted when the account has no name; never synthesized from the email,
                         the id, or any other field. May also be absent on webhook payloads whose
                         actor could not be resolved.
                handle:
                    type: string
                    description: |-
                        The user's claimed profile handle (the identity behind cursor.com
                         /@handle), without the @ prefix. Present only while the user's profile
                         is publicly visible; omitted for users without a claimed handle and for
                         non-public profiles.
        Owner:
            type: object
            properties:
                slug:
                    type: string
                    description: Unique URL-friendly name of the owner.
                id:
                    type: string
                    description: Unique ID of the owner namespace.
                type:
                    readOnly: true
                    enum:
                        - team
                        - user
                    type: string
                    description: '`team` or `user`. Output-only; unset when unknown.'
                    format: enum
            description: The owner of a repo.
        PingWebhookRequest:
            type: object
            properties: {}
        PingWebhookResponse:
            type: object
            properties:
                deliveryId:
                    readOnly: true
                    type: string
                    description: Standard Webhooks `webhook-id` of the test delivery.
                eventId:
                    readOnly: true
                    type: string
                    description: Event id inside the signed envelope (`event.id`).
                delivered:
                    readOnly: true
                    type: boolean
                    description: |-
                        True when the receiver answered with a 2xx status within the delivery
                         timeout. Always present in JSON responses (explicit presence keeps
                         `false` from being omitted as a proto3 default).
                responseStatusCode:
                    readOnly: true
                    type: integer
                    description: |-
                        HTTP status the receiver answered with; 0 when no response arrived
                         (connection failure or timeout). Always present in JSON responses.
                    format: int32
        PostCheckRunRequest:
            required:
                - identifier
                - headSha
                - checkSuite
                - checkRun
            type: object
            properties:
                identifier:
                    allOf:
                        - $ref: '#/components/schemas/RepoIdentifier'
                    description: 'Identity of the repo the check run targets: `(owner_slug, name)`.'
                headSha:
                    type: string
                    description: Head commit SHA the check run is reported against (40- or 64-char hex).
                checkSuite:
                    allOf:
                        - $ref: '#/components/schemas/CheckSuiteInput'
                    description: The suite the check run belongs to; upserted alongside the check run.
                checkRun:
                    allOf:
                        - $ref: '#/components/schemas/CheckRunInput'
                    description: The check run to upsert.
        PostCheckRunResponse:
            type: object
            properties:
                checkSuite:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/CheckSuite'
                    description: The upserted check suite.
                checkRun:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/CheckRun'
                    description: The upserted check run.
        PullRequest:
            type: object
            properties:
                id:
                    type: string
                    description: Stable Origin pull request identifier.
                number:
                    type: string
                    description: Pull request number within its repository.
                state:
                    type: string
                    description: '"open" or "closed". A draft is "open"; merged and closed pull requests are both "closed".'
                draft:
                    type: boolean
                    description: Whether the pull request is still a draft.
                merged:
                    type: boolean
                    description: Whether the pull request has been merged.
                title:
                    type: string
                    description: Pull request title.
                body:
                    type: string
                    description: Pull request description.
                head:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestRef'
                    description: The source side of the pull request - what is being merged in.
                base:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestRef'
                    description: The target side of the pull request — what it merges into.
                author:
                    allOf:
                        - $ref: '#/components/schemas/OriginActor'
                    description: The principal that opened the pull request.
                createdAt:
                    type: string
                    description: When the pull request was opened.
                    format: date-time
                updatedAt:
                    type: string
                    description: When the pull request was last updated.
                    format: date-time
                closedAt:
                    type: string
                    description: When the pull request was closed or merged; unset while open.
                    format: date-time
                mergedAt:
                    type: string
                    description: When the pull request was merged; unset unless merged.
                    format: date-time
                mergeCommitSha:
                    type: string
                    description: SHA of the resulting merge commit; set once merged.
                additions:
                    type: integer
                    description: Lines added by the pull request's latest version.
                    format: int32
                deletions:
                    type: integer
                    description: Lines deleted by the pull request's latest version.
                    format: int32
                changedFiles:
                    type: integer
                    description: Files changed by the pull request's latest version.
                    format: int32
                labels:
                    type: array
                    items:
                        $ref: '#/components/schemas/Label'
                    description: |-
                        Labels currently assigned to this pull request, sorted by name. Empty when
                         none are assigned. A pull request can have at most 100 labels.
                version:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestVersion'
                    description: The pull request's latest version.
            description: A pull request.
        PullRequestComment:
            type: object
            properties:
                id:
                    type: string
                thread:
                    allOf:
                        - $ref: '#/components/schemas/Thread'
                    description: |-
                        The thread this comment belongs to, including its diff anchor and
                         resolution state.
                body:
                    type: string
                author:
                    $ref: '#/components/schemas/OriginActor'
                createdAt:
                    type: string
                    format: date-time
                updatedAt:
                    type: string
                    format: date-time
            description: A threaded comment on a pull request.
        PullRequestCommentWebhookPayload:
            type: object
            properties:
                pullRequest:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestReference'
                    description: The pull request the comment was filed on.
                comment:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestComment'
                    description: |-
                        The created comment. A comment that opened its thread carries the thread's
                         diff anchor inline; a reply carries only `comment.thread.id`. Thread
                         resolution state is not part of the event; read it with
                         `GetPullRequestComment`.
            description: |-
                A comment created on a pull request. Comments filed with a review are
                 delivered when the review submits, one event per comment.
            x-origin-webhook-events:
                - pull_request.comment.created
            example:
                pullRequest:
                    id: pr_01k2ja2000e0080000000000d4
                    number: "17"
                    repository:
                        id: repo_01k2ja2000e0080000000000q4
                        name: rocket
                        owner:
                            slug: acme
                            id: ns_01k2ja2000e0080000000000p3
                            type: team
                comment:
                    id: cmt_01k2ja2000e0080000000000e5
                    thread:
                        id: cth_01k2ja2000e0080000000000s6
                        version:
                            number: "3"
                            headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                            baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                            createdAt: "2026-08-01T09:30:00Z"
                        path: src/telemetry/retry.ts
                        side: right
                        startLine: 42
                        endLine: 45
                        createdAt: "2026-08-01T09:30:00Z"
                        updatedAt: "2026-08-02T14:45:00Z"
                    body: Should the retry budget be configurable?
                    author:
                        user:
                            id: user_01k2ja2000e0080000000000c3
                            email: jane@acme.dev
                    createdAt: "2026-08-01T09:30:00Z"
                    updatedAt: "2026-08-02T14:45:00Z"
        PullRequestFile:
            type: object
            properties:
                filename:
                    type: string
                status:
                    type: string
                    description: '"added" / "removed" / "modified" / "renamed" / "copied"'
                additions:
                    type: integer
                    format: int32
                deletions:
                    type: integer
                    format: int32
                changes:
                    type: integer
                    format: int32
                patch:
                    type: string
                previousFilename:
                    type: string
            description: A file changed in a pull request.
        PullRequestRef:
            type: object
            properties:
                ref:
                    type: string
                    description: The ref this side points at, as Origin records it.
                sha:
                    type: string
                    description: Tip commit SHA of this side at the change's latest version.
            description: One side (head or base) of a change.
        PullRequestReference:
            type: object
            properties:
                id:
                    type: string
                    description: Immutable Origin change id.
                number:
                    type: string
                repository:
                    allOf:
                        - $ref: '#/components/schemas/RepositoryReference'
                    description: Repository reference for this pull request.
            description: Stable identity and display coordinates for an Origin pull request.
        PullRequestRequestedReviewer:
            type: object
            properties:
                user:
                    $ref: '#/components/schemas/OriginUserActor'
                group:
                    $ref: '#/components/schemas/OriginGroup'
            description: A user or group whose review has been requested on a pull request.
        PullRequestReview:
            type: object
            properties:
                id:
                    type: string
                    description: Stable Origin review identifier.
                author:
                    allOf:
                        - $ref: '#/components/schemas/OriginActor'
                    description: The principal that authored the review.
                verdict:
                    enum:
                        - approve
                        - request_changes
                        - comment
                    type: string
                    format: enum
                body:
                    type: string
                    description: Free-text review summary. Empty when the reviewer left no summary.
                submittedAt:
                    type: string
                    description: When the review was submitted. Unset for an unsubmitted draft review.
                    format: date-time
                pullRequestVersion:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestVersion'
                    description: The pull request version and head SHA the verdict applies to.
                dismissal:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestReviewDismissal'
                    description: |-
                        Set once the review has been dismissed; absent while the verdict still
                         counts toward the pull request's review state.
            description: A pull request review.
        PullRequestReviewDismissal:
            type: object
            properties:
                dismissedBy:
                    allOf:
                        - $ref: '#/components/schemas/OriginActor'
                    description: |-
                        The principal that dismissed the review. Absent when the dismissal was
                         recorded under an actor kind this API does not expose.
                dismissedAt:
                    type: string
                    description: When the review was dismissed.
                    format: date-time
                message:
                    type: string
                    description: |-
                        Reason recorded with the dismissal. Reviews retired automatically because
                         their author submitted a newer verdict carry a server-generated reason.
            description: |-
                Records that a submitted review no longer counts toward the pull request's
                 review state.
        PullRequestReviewWebhookPayload:
            type: object
            properties:
                pullRequest:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestReference'
                    description: The pull request the review was filed on.
                review:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestReview'
                    description: |-
                        The review that was submitted or dismissed. On a dismissal,
                         `review.dismissal` is set.
            x-origin-webhook-events:
                - pull_request.review.submitted
                - pull_request.review.dismissed
            example:
                pullRequest:
                    id: pr_01k2ja2000e0080000000000d4
                    number: "17"
                    repository:
                        id: repo_01k2ja2000e0080000000000q4
                        name: rocket
                        owner:
                            slug: acme
                            id: ns_01k2ja2000e0080000000000p3
                            type: team
                review:
                    id: rev_01k2ja2000e0080000000000f6
                    author:
                        user:
                            id: user_01k2ja2000e0080000000000c3
                            email: jane@acme.dev
                    verdict: approve
                    body: Approving. The telemetry schema matches the spec.
                    submittedAt: "2026-08-02T15:00:00Z"
                    pullRequestVersion:
                        number: "3"
                        headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                        baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                        createdAt: "2026-08-01T09:30:00Z"
        PullRequestReviewerWebhookPayload:
            type: object
            properties:
                pullRequest:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestReference'
                    description: The pull request whose requested reviewers changed.
                reviewer:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestRequestedReviewer'
                    description: The requested reviewer the event is about.
                createdVia:
                    enum:
                        - manual
                        - codeowners
                    type: string
                    description: How the review request was created.
                    format: enum
                createdBy:
                    allOf:
                        - $ref: '#/components/schemas/OriginActor'
                    description: The principal that created the review request, when known.
                createdAt:
                    type: string
                    description: When the review request was created.
                    format: date-time
            description: |-
                A change to the pull request's requested reviewers. Read the current pending
                 set with `ListPullRequestRequestedReviewers`.
            x-origin-webhook-events:
                - pull_request.reviewer.added
                - pull_request.reviewer.removed
                - pull_request.reviewer.rerequested
            example:
                pullRequest:
                    id: pr_01k2ja2000e0080000000000d4
                    number: "17"
                    repository:
                        id: repo_01k2ja2000e0080000000000q4
                        name: rocket
                        owner:
                            slug: acme
                            id: ns_01k2ja2000e0080000000000p3
                            type: team
                reviewer:
                    user:
                        id: user_01k2ja2000e0080000000000c3
                        email: jane@acme.dev
                createdVia: codeowners
                createdAt: "2026-08-02T14:45:00Z"
        PullRequestVersion:
            type: object
            properties:
                number:
                    type: string
                    description: Monotonic version number within the change (1-based).
                headSha:
                    type: string
                    description: Head commit SHA for this version.
                baseSha:
                    type: string
                    description: Base commit SHA this version is diffed against.
                createdAt:
                    type: string
                    description: When this version was created.
                    format: date-time
            description: |-
                A numbered revision of a change. Each push produces a new version with its
                 own head/base SHAs and diff stats.
        PullRequestWebhook:
            type: object
            properties:
                id:
                    type: string
                    description: Stable Origin pull request identifier.
                number:
                    type: string
                    description: Pull request number within its repository.
                state:
                    type: string
                    description: '"open" or "closed". A draft is "open"; merged and closed pull requests are both "closed".'
                draft:
                    type: boolean
                    description: Whether the pull request is still a draft.
                merged:
                    type: boolean
                    description: Whether the pull request has been merged.
                title:
                    type: string
                    description: Pull request title.
                body:
                    type: string
                    description: Pull request description.
                head:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestRef'
                    description: The source side of the pull request - what is being merged in.
                base:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestRef'
                    description: The target side of the pull request — what it merges into.
                author:
                    allOf:
                        - $ref: '#/components/schemas/OriginActor'
                    description: The principal that opened the pull request.
                createdAt:
                    type: string
                    description: When the pull request was opened.
                    format: date-time
                updatedAt:
                    type: string
                    description: When the pull request was last updated.
                    format: date-time
                closedAt:
                    type: string
                    description: When the pull request was closed or merged; unset while open.
                    format: date-time
                mergedAt:
                    type: string
                    description: When the pull request was merged; unset unless merged.
                    format: date-time
                mergeCommitSha:
                    type: string
                    description: SHA of the resulting merge commit; set once merged.
                additions:
                    type: integer
                    description: Lines added by the pull request's latest version.
                    format: int32
                deletions:
                    type: integer
                    description: Lines deleted by the pull request's latest version.
                    format: int32
                changedFiles:
                    type: integer
                    description: Files changed by the pull request's latest version.
                    format: int32
                version:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestVersion'
                    description: The pull request's latest version.
            description: |-
                A pull request snapshot for webhook payloads. Assigned labels are omitted;
                 GetPullRequest and ListPullRequests return them.
        PullRequestWebhookPayload:
            type: object
            properties:
                pullRequest:
                    allOf:
                        - $ref: '#/components/schemas/PullRequestWebhook'
                    description: |-
                        The pull request snapshot. Assigned labels are omitted; read them with
                         `GetPullRequest`.
                repository:
                    allOf:
                        - $ref: '#/components/schemas/RepositoryReference'
                    description: The repository the pull request belongs to.
            description: |-
                A pull request lifecycle change. The lifecycle action is the envelope's
                 `event.type`; there is no separate action field.
            x-origin-webhook-events:
                - pull_request.created
                - pull_request.published
                - pull_request.reopened
                - pull_request.closed
                - pull_request.merged
                - pull_request.metadata.updated
                - pull_request.head_ref.pushed
                - pull_request.base_ref.updated
            example:
                pullRequest:
                    id: pr_01k2ja2000e0080000000000d4
                    number: "17"
                    state: open
                    draft: false
                    merged: false
                    title: Add launch telemetry
                    body: Adds structured launch telemetry to the ignition path.
                    head:
                        ref: add-telemetry
                        sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                    base:
                        ref: main
                        sha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                    author:
                        user:
                            id: user_01k2ja2000e0080000000000c3
                            email: jane@acme.dev
                    createdAt: "2026-08-01T09:30:00Z"
                    updatedAt: "2026-08-02T14:45:00Z"
                    additions: 128
                    deletions: 46
                    changedFiles: 5
                    version:
                        number: "3"
                        headSha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                        baseSha: 3b1f9c2d8a7e6f5049c8b7a6d5e4f3a2b1c0d9e8
                        createdAt: "2026-08-01T09:30:00Z"
                repository:
                    id: repo_01k2ja2000e0080000000000q4
                    name: rocket
                    owner:
                        slug: acme
                        id: ns_01k2ja2000e0080000000000p3
                        type: team
        RateLimitResource:
            type: object
            properties:
                limit:
                    type: integer
                    description: Maximum points available in the current window.
                    format: int32
                remaining:
                    type: integer
                    description: Points remaining in the current window.
                    format: int32
                reset:
                    type: integer
                    description: Unix timestamp (UTC seconds) when the current window resets.
                    format: int32
                used:
                    type: integer
                    description: Points consumed in the current window.
                    format: int32
            description: Point budget for one rate limit resource in the current window.
        RateLimitResources:
            type: object
            properties:
                core:
                    allOf:
                        - $ref: '#/components/schemas/RateLimitResource'
                    description: Shared per-minute point budget for public API endpoints.
            description: Rate limit resources for the authenticated principal.
        RateLimitStatus:
            type: object
            properties:
                resources:
                    $ref: '#/components/schemas/RateLimitResources'
                rate:
                    allOf:
                        - $ref: '#/components/schemas/RateLimitResource'
                    description: Alias of `resources.core`. Prefer `resources.core` in new clients.
            description: Rate limit status for the authenticated principal.
        RemoveAllPullRequestLabelsRequest:
            required:
                - identifier
                - pullNumber
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
        RemovePullRequestLabelRequest:
            required:
                - identifier
                - pullNumber
                - labelName
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                labelName:
                    type: string
        RemovePullRequestLabelResponse:
            type: object
            properties:
                labels:
                    type: array
                    items:
                        $ref: '#/components/schemas/Label'
        RemovePullRequestRequestedReviewersRequest:
            required:
                - identifier
                - pullNumber
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                users:
                    type: array
                    items:
                        type: string
                    description: |-
                        User identifiers to remove. Each must uniquely match a user candidate
                         for the repository by public `user_…` id or email.
                groups:
                    type: array
                    items:
                        type: string
                    description: |-
                        Group identifiers to remove. Each must uniquely match a group candidate
                         for the repository by public `grp_…` id, qualified group slug, or group
                         slug.
        Repo:
            required:
                - name
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                name:
                    type: string
                    description: The repo name, unique to its owner. Required on create.
                fullName:
                    readOnly: true
                    type: string
                    description: '"{owner.login}/{name}". Derived.'
                owner:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/Owner'
                    description: The owning entity. Determined by the parent on create; not settable directly.
                defaultBranch:
                    type: string
                    description: Default branch name. Always set on responses. On create, omitting this field or leaving it empty defaults to "main".
                createdAt:
                    readOnly: true
                    type: string
                    format: date-time
                updatedAt:
                    readOnly: true
                    type: string
                    format: date-time
                pushedAt:
                    readOnly: true
                    type: string
                    description: Most-recent-push timestamp on any branch; absent until the first push.
                    format: date-time
                cloneUrl:
                    readOnly: true
                    type: string
                    description: HTTPS URL for cloning the repository.
                mirror:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/RepositoryMirror'
                    description: |-
                        Mirror metadata. Absent for a native repository and before a mirror's
                         initial sync is ready.
                visibility:
                    readOnly: true
                    enum:
                        - internal
                        - private
                    type: string
                    description: Repository visibility, `internal` or `private`.
                    format: enum
                allowMergeCommit:
                    readOnly: true
                    type: boolean
                    description: Whether pull requests may land as merge commits.
                allowSquashMerge:
                    readOnly: true
                    type: boolean
                    description: Whether pull requests may land as squash merges.
                deleteBranchOnMerge:
                    readOnly: true
                    type: boolean
                    description: Whether the head branch is deleted automatically on merge.
            description: A repository.
        RepoIdentifier:
            type: object
            properties:
                ownerSlug:
                    type: string
                    description: Owning entity's unique slug.
                name:
                    type: string
                    description: Repo name, unique to the owner entity.
            description: |-
                Addresses a repository as `{owner_slug}/{name}` or `/_/{id}` (`_` is not
                 a valid namespace). Unauthorized `/_/{id}` lookups return the same NotFound
                 as an unknown id; knowing an id is not authorization.
        RepositoryCreatedWebhookPayload:
            type: object
            properties:
                repository:
                    allOf:
                        - $ref: '#/components/schemas/Repo'
                    description: The created repository.
            x-origin-webhook-events:
                - repository.created
            example:
                repository:
                    id: repo_01k2ja2000e0080000000000q4
                    name: rocket
                    fullName: acme/rocket
                    owner:
                        slug: acme
                        id: ns_01k2ja2000e0080000000000p3
                        type: team
                    defaultBranch: main
                    createdAt: "2026-08-01T09:30:00Z"
                    updatedAt: "2026-08-01T09:30:00Z"
                    cloneUrl: https://origin.cursor.com/git/acme/rocket.git
        RepositoryDeletedWebhookPayload:
            type: object
            properties:
                repository:
                    allOf:
                        - $ref: '#/components/schemas/RepositoryReference'
                    description: |-
                        The repository that was deleted. A reference only: the repository no
                         longer resolves through the API once deleted.
                deletedAt:
                    type: string
                    description: When the repository was deleted.
                    format: date-time
            x-origin-webhook-events:
                - repository.deleted
            example:
                repository:
                    id: repo_01k2ja2000e0080000000000q4
                    name: rocket
                    owner:
                        slug: acme
                        id: ns_01k2ja2000e0080000000000p3
                        type: team
                deletedAt: "2026-08-03T08:15:00Z"
        RepositoryGrant:
            type: object
            properties:
                user:
                    $ref: '#/components/schemas/OriginUserActor'
                group:
                    $ref: '#/components/schemas/OriginGroup'
                teamGroup:
                    $ref: '#/components/schemas/OriginTeamGroup'
                permission:
                    enum:
                        - read
                        - write
                        - admin
                        - custom
                    type: string
                    format: enum
            description: |-
                A permission granted directly on a repository to one user, group, or
                 owning-team group.
        RepositoryMetadataUpdatedWebhookPayload:
            type: object
            properties:
                repository:
                    allOf:
                        - $ref: '#/components/schemas/Repo'
                    description: The full repository snapshot after the update.
            description: |-
                Carries the full repository snapshot with no delta and no updating actor.
                 Compare successive snapshots or refetch the repository to see what changed.
            x-origin-webhook-events:
                - repository.metadata.updated
            example:
                repository:
                    id: repo_01k2ja2000e0080000000000q4
                    name: rocket
                    fullName: acme/rocket
                    owner:
                        slug: acme
                        id: ns_01k2ja2000e0080000000000p3
                        type: team
                    defaultBranch: release
                    createdAt: "2026-08-01T09:30:00Z"
                    updatedAt: "2026-08-03T08:15:00Z"
                    cloneUrl: https://origin.cursor.com/git/acme/rocket.git
                    pushedAt: "2026-08-02T14:45:00Z"
        RepositoryMirror:
            type: object
            properties:
                source:
                    readOnly: true
                    enum:
                        - github
                    type: string
                    format: enum
                sourceId:
                    readOnly: true
                    type: string
                    description: Opaque repository identifier assigned by the source.
                status:
                    readOnly: true
                    enum:
                        - inbound
                        - outbound
                    type: string
                    description: Effective direction during a transition, until cutover completes.
                    format: enum
            description: The external source and lifecycle state of a mirrored repository.
        RepositoryPushCommit:
            type: object
            properties:
                sha:
                    type: string
                author:
                    $ref: '#/components/schemas/CommitAuthor'
                committer:
                    $ref: '#/components/schemas/CommitAuthor'
                message:
                    type: string
            description: |-
                Commit at the peeled tip of a pushed ref. The SHA may differ from the ref's
                 `after` value when an annotated tag points to the commit.
        RepositoryPushRefUpdate:
            type: object
            properties:
                ref:
                    type: string
                    description: |-
                        The full git ref that was pushed.
                         Example: `refs/heads/main` or `refs/tags/v3.14.1`.
                before:
                    type: string
                    description: |-
                        The SHA of the most recent commit on `ref` before the push. All-zero
                         (`0000000000000000000000000000000000000000`) when the ref was just created.
                after:
                    type: string
                    description: |-
                        The SHA of the most recent commit on `ref` after the push. All-zero
                         (`0000000000000000000000000000000000000000`) when the ref was deleted.
                created:
                    type: boolean
                    description: Whether this push created the ref.
                deleted:
                    type: boolean
                    description: Whether this push deleted the ref.
                forced:
                    type: boolean
                    description: |-
                        Whether this push rewrote history: a non-fast-forward update of an existing
                         ref (the new tip is not a descendant of the old tip). False for ref
                         creates, deletes, fast-forward updates, and pushes observed before Origin
                         tracked force-push status.
                headCommit:
                    allOf:
                        - $ref: '#/components/schemas/RepositoryPushCommit'
                    description: |-
                        Best-effort metadata for the commit at the peeled new tip. Unset for
                         deletions, non-commit refs, historical pushes, and extraction failures.
            description: One ref update within an atomic repository push.
        RepositoryPushWebhookPayload:
            type: object
            properties:
                repository:
                    allOf:
                        - $ref: '#/components/schemas/RepositoryReference'
                    description: The repository the push targeted.
                refUpdates:
                    type: array
                    items:
                        $ref: '#/components/schemas/RepositoryPushRefUpdate'
                    description: Refs included from this push, capped at 100.
                pushedAt:
                    type: string
                    description: When Origin observed the push.
                    format: date-time
                pusher:
                    allOf:
                        - $ref: '#/components/schemas/OriginActor'
                    description: |-
                        The principal that performed the push, as verified by Origin. Absent when
                         Origin itself performed the push, such as the merge push that advances the
                         base ref when a pull request merges.
                refUpdatesCount:
                    type: integer
                    description: |-
                        Number of ref updates in the atomic push. ref_updates may be shorter when
                         the producer capped the list.
                    format: uint32
            description: |-
                One atomic push, which may update several refs. There is no commits array;
                 each ref update carries best-effort tip metadata only.
            x-origin-webhook-events:
                - repository.pushed
            example:
                repository:
                    id: repo_01k2ja2000e0080000000000q4
                    name: rocket
                    owner:
                        slug: acme
                        id: ns_01k2ja2000e0080000000000p3
                        type: team
                refUpdates:
                    - ref: refs/heads/add-telemetry
                      before: 5c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d
                      after: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                      created: false
                      deleted: false
                      forced: false
                      headCommit:
                        sha: 9a41f0c3d2b8e7f6a5c4d3e2f1b0a9c8d7e6f5a4
                        author:
                            name: Jane Doe
                            email: jane@acme.dev
                            date: "2026-08-01T09:30:00Z"
                        committer:
                            name: Jane Doe
                            email: jane@acme.dev
                            date: "2026-08-01T09:30:00Z"
                        message: Add launch telemetry
                pushedAt: "2026-08-02T14:45:00Z"
                pusher:
                    user:
                        id: user_01k2ja2000e0080000000000c3
                        email: jane@acme.dev
                refUpdatesCount: 1
        RepositoryReference:
            type: object
            properties:
                id:
                    type: string
                name:
                    type: string
                owner:
                    $ref: '#/components/schemas/Owner'
            description: Stable identity and display coordinates for a repository.
        RequestPullRequestReviewersRequest:
            required:
                - identifier
                - pullNumber
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                users:
                    type: array
                    items:
                        type: string
                    description: |-
                        User identifiers to request. Each must uniquely match a user candidate
                         for the repository by public `user_…` id or email.
                groups:
                    type: array
                    items:
                        type: string
                    description: |-
                        Group identifiers to request. Each must uniquely match a group candidate
                         for the repository by public `grp_…` id, qualified group slug, or group
                         slug.
        RerequestCheckRunRequest:
            required:
                - identifier
                - checkRunId
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                checkRunId:
                    type: string
                    description: Server-assigned check-run id (`cr_…`).
        ReviewCommentInput:
            required:
                - body
            type: object
            properties:
                body:
                    type: string
                    description: Comment text. Must contain a non-whitespace character.
                inline:
                    allOf:
                        - $ref: '#/components/schemas/InlineCommentAnchor'
                    description: Diff anchor for a new inline thread on the reviewed version's diff.
                threadId:
                    type: string
                    description: |-
                        Existing thread id to reply to (general-discussion and inline threads
                         alike). The reply stays hidden until the review publishes.
                file:
                    allOf:
                        - $ref: '#/components/schemas/FileCommentAnchor'
                    description: |-
                        Anchor for a new file-level thread; the side is derived from the
                         file's change kind.
            description: |-
                One comment filed with a review via `CreatePullRequestReview`. Targets the
                 same shapes as `CreatePullRequestComment`: provide `thread_id` to reply to
                 an existing thread, `inline` to open a new line-anchored thread on the
                 reviewed version's diff, `file` to open a new file-level thread, or
                 neither to open a new general-discussion thread. Every comment publishes
                 with the review.
        RevokeAppSigningKeyRequest:
            required:
                - appId
                - kid
            type: object
            properties:
                appId:
                    type: string
                    description: App identifier.
                kid:
                    type: string
                    description: Key ID of the signing key to revoke.
        Ruleset:
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                    description: Stable Origin ruleset id.
                name:
                    type: string
                description:
                    type: string
                enforcement:
                    enum:
                        - active
                        - evaluate
                        - disabled
                    type: string
                    format: enum
                kind:
                    enum:
                        - merge_branch
                        - push_branch
                        - push_tag
                        - push_repository
                    type: string
                    format: enum
                includedRefNames:
                    type: array
                    items:
                        type: string
                    description: |-
                        Ref name patterns this ruleset includes. Supports globs and the tokens
                         `~ALL` and `~DEFAULT_BRANCH`. Create/update reject more than 64 entries;
                         list/get therefore never paginate this field.
                excludedRefNames:
                    type: array
                    items:
                        type: string
                    description: |-
                        Ref name patterns this ruleset excludes. Same pattern language and 64-entry
                         write cap as `included_ref_names`.
                rules:
                    type: array
                    items:
                        $ref: '#/components/schemas/RulesetRule'
                    description: |-
                        Protection rules in this ruleset. Create/update reject more than 20
                         entries; list/get therefore never paginate this field.
                bypassActors:
                    type: array
                    items:
                        $ref: '#/components/schemas/RulesetBypassActor'
                    description: |-
                        Bypass principals for this ruleset. Create/update reject more than 15
                         entries; list/get therefore never paginate this field.
            description: |-
                A named bundle of branch, merge, and push protections for one repository.
                 This is a stable caller-facing projection: repository coordinates live on
                 the request path (and are hoisted once on list responses), not on each
                 ruleset.
        RulesetAppBypassActor:
            type: object
            properties:
                id:
                    type: string
                    description: App id (`app_…`).
            description: An app principal that may bypass ruleset enforcement.
        RulesetBypassActor:
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                    description: Stable Origin id for this bypass actor row.
                bypassMode:
                    enum:
                        - always
                        - pull_request_only
                    type: string
                    format: enum
                user:
                    $ref: '#/components/schemas/RulesetUserBypassActor'
                team:
                    $ref: '#/components/schemas/RulesetTeamBypassActor'
                app:
                    $ref: '#/components/schemas/RulesetAppBypassActor'
                originRole:
                    $ref: '#/components/schemas/RulesetOriginRoleBypassActor'
            description: |-
                A principal that may bypass ruleset enforcement. Identity is a typed
                 `actor` oneof (user, team, app, or Origin role), not a parallel kind enum
                 plus opaque JSON payload.
        RulesetBypassActorInput:
            required:
                - bypassMode
            type: object
            properties:
                bypassMode:
                    enum:
                        - always
                        - pull_request_only
                    type: string
                    format: enum
                user:
                    $ref: '#/components/schemas/RulesetUserBypassActor'
                team:
                    $ref: '#/components/schemas/RulesetTeamBypassActor'
                app:
                    $ref: '#/components/schemas/RulesetAppBypassActor'
                originRole:
                    $ref: '#/components/schemas/RulesetOriginRoleBypassActor'
            description: |-
                Input for one bypass actor when creating a ruleset. Does not include the
                 server-assigned bypass-actor id.
        RulesetOriginRoleBypassActor:
            type: object
            properties:
                role:
                    enum:
                        - namespace_admin
                        - repository_admin
                        - repository_write
                    type: string
                    format: enum
            description: |-
                Bypass granted to holders of a policy-backed Origin role. Payload role is
                 one of `namespace_admin`, `repository_admin`, or `repository_write`.
        RulesetRule:
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                    description: Stable Origin id for this rule row.
                ruleType:
                    type: string
                    description: |-
                        Rule type string, for example `pull_request`, `require_status_checks`,
                         `require_branch_up_to_date`, `deletion`, or `non_fast_forward`.
                parameters:
                    type: object
                    description: Type-specific parameters as a JSON object. Shape depends on `rule_type`.
            description: One rule inside a repository ruleset.
        RulesetRuleInput:
            required:
                - ruleType
            type: object
            properties:
                ruleType:
                    type: string
                    description: |-
                        Rule type string, for example `pull_request`, `require_status_checks`,
                         `require_branch_up_to_date`, `deletion`, or `non_fast_forward`.
                parameters:
                    type: object
                    description: Type-specific parameters as a JSON object. Shape depends on `rule_type`.
            description: |-
                Input for one rule when creating a ruleset. Does not include the
                 server-assigned rule id.
        RulesetTeamBypassActor:
            type: object
            properties:
                organizationPublicId:
                    type: string
                groupPublicId:
                    type: string
            description: |-
                A team principal that may bypass ruleset enforcement. Identity is the
                 immutable org/group `public_id` pair (never mutable slugs).
        RulesetUserBypassActor:
            type: object
            properties:
                id:
                    type: string
                    description: |-
                        Numeric maindb user id, encoded as a decimal string. Internal upsert
                         stamps the actor-registry id (`act_…`) from this value.
            description: A user principal that may bypass ruleset enforcement.
        SetPullRequestLabelsRequest:
            required:
                - identifier
                - pullNumber
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                labels:
                    type: array
                    items:
                        type: string
                    description: |-
                        Label names to assign. Maximum 100. An empty list removes every assigned
                         label. Duplicate names are ignored.
        SetPullRequestLabelsResponse:
            type: object
            properties:
                labels:
                    type: array
                    items:
                        $ref: '#/components/schemas/Label'
        Status:
            type: object
            properties:
                code:
                    type: integer
                    description: The status code, which should be an enum value of [google.rpc.Code][google.rpc.Code].
                    format: int32
                message:
                    type: string
                    description: A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the [google.rpc.Status.details][google.rpc.Status.details] field, or localized by the client.
                details:
                    type: array
                    items:
                        $ref: '#/components/schemas/GoogleProtobufAny'
                    description: A list of messages that carry the error details.  There is a common set of message types for APIs to use.
            description: 'The canonical error envelope, after google.rpc.Status: a code, a developer-facing message, and typed details — google.rpc.BadRequest field violations for invalid arguments, and a google.rpc.RequestInfo entry echoing the caller-supplied request id. New detail types may appear at any time, so integrations must tolerate unknown entries. 404 responses never distinguish a resource that does not exist from one the caller cannot access; not-found and no-access are deliberately indistinguishable.'
        SyncMirrorRequest:
            required:
                - identifier
                - ref
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                ref:
                    type: string
                    description: |-
                        Full git ref name to fetch. Must start with `refs/` and name a ref
                         after that prefix, for example `refs/heads/main` or `refs/tags/v1`.
                         Short names such as `main` are rejected with INVALID_ARGUMENT.
                wait:
                    type: boolean
                    description: When true, block until synced or the wait budget expires. Defaults to false.
                sha:
                    type: string
                    description: |-
                        Optional full commit object id: 40- or 64-character hex. Omit or leave
                         empty to wait on the tip of `ref`. When set and reachable from `ref`,
                         the call returns early without waiting for other mirror work to drain.
                         Other values are rejected with INVALID_ARGUMENT.
        SyncMirrorResponse:
            type: object
            properties:
                synced:
                    type: boolean
                    description: |-
                        True when the sync target is known to be satisfied; false while the sync
                         is still pending. Always present in JSON responses, mirroring the HTTP
                         status (200 when true, 202 when false).
        TaggedObject:
            type: object
            properties:
                sha:
                    type: string
                    description: Hex SHA of the target object.
                type:
                    type: string
                    description: One of "commit", "tree", "blob", or "tag".
            description: The git object an annotated tag points at.
        Thread:
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                version:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/PullRequestVersion'
                    description: |-
                        The pull request version the thread was filed against, including its
                         head and base SHAs (see `PullRequestReview.pull_request_version`).
                path:
                    readOnly: true
                    type: string
                    description: |-
                        File path of the thread's diff anchor. Empty for general-discussion
                         threads.
                side:
                    readOnly: true
                    enum:
                        - left
                        - right
                    type: string
                    description: Diff side of the anchor. Unset for general-discussion threads.
                    format: enum
                startLine:
                    readOnly: true
                    type: integer
                    description: |-
                        First line of the anchored range in the `side` version of the file.
                         0 for file-level and general-discussion threads.
                    format: uint32
                endLine:
                    readOnly: true
                    type: integer
                    description: |-
                        Inclusive last line of the anchored range. 0 when the anchor is a
                         single line or has no line range.
                    format: uint32
                resolvedAt:
                    readOnly: true
                    type: string
                    description: When the thread was resolved. Unset while the thread is open.
                    format: date-time
                createdAt:
                    readOnly: true
                    type: string
                    format: date-time
                updatedAt:
                    readOnly: true
                    type: string
                    format: date-time
            description: |-
                A pull request comment thread as stored: identity, the version it was
                 filed against, its diff anchor, and resolution state.

                 A thread takes one of three shapes: general discussion (no diff anchor),
                 file-level (`path` and `side` set with no line range), or line-anchored
                 (`path`, `side`, and `start_line` set, optionally with `end_line`).
        ThreadReference:
            type: object
            properties:
                id:
                    type: string
            description: Stable identity of a pull request comment thread.
        TransitionRepoMirrorRequest:
            required:
                - identifier
                - transition
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                transition:
                    enum:
                        - initial_to_inbound
                        - inbound_to_outbound
                        - outbound_to_inbound
                    type: string
                    description: The mirror-state change to start.
                    format: enum
        TransitionRepoMirrorResponse:
            type: object
            properties:
                repository:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/Repo'
                    description: The repository, reflecting its transitioning mirror state.
                job:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/MirrorTransitionJob'
                    description: |-
                        The job tracking the transition. Poll it until it reaches a terminal
                         status.
        UpdateAppRequest:
            required:
                - appId
            type: object
            properties:
                appId:
                    type: string
                    description: App identifier.
                displayName:
                    type: string
                    description: New human-facing app name. Must not be empty when provided.
                webhookUrl:
                    type: string
                    description: |-
                        New outbound webhook delivery URL: an absolute https URL. Providing an
                         empty string disables webhook delivery and cancels the app's pending
                         deliveries.
                events:
                    allOf:
                        - $ref: '#/components/schemas/AppEventsReplace'
                    description: |-
                        Clean replace of the outbound webhook event subscriptions. Absent leaves
                         them unchanged; present with an empty list clears them.
                description:
                    type: string
                    description: New app description. Absent leaves it unchanged; empty clears it.
                websiteUrl:
                    type: string
                    description: New publisher website. Absent leaves it unchanged; empty clears it.
                installationRedirectUris:
                    allOf:
                        - $ref: '#/components/schemas/AppInstallationRedirectUrisReplace'
                    description: |-
                        Clean replace of the OAuth install callback allowlist. Absent leaves it
                         unchanged; present with an empty list clears it.
                defaultScopes:
                    allOf:
                        - $ref: '#/components/schemas/AppDefaultScopesReplace'
                    description: |-
                        Clean replace of the app's default install scopes. Absent leaves them
                         unchanged; present with an empty list clears them.
        UpdateLabelRequest:
            required:
                - identifier
                - labelName
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                labelName:
                    type: string
                    description: |-
                        Current label name. Leading and trailing whitespace is trimmed before
                         lookup.
                name:
                    type: string
                    description: |-
                        New label name. Leading and trailing whitespace is trimmed. Maximum 50
                         characters. Omit to leave unchanged.
                color:
                    type: string
                    description: Six-character hex color without a leading `#`. Omit to leave unchanged.
                description:
                    type: string
                    description: Description. Maximum 255 characters. Omit to leave unchanged.
        UpdatePullRequestCommentRequest:
            required:
                - identifier
                - commentId
                - body
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                commentId:
                    type: string
                body:
                    type: string
        UpdatePullRequestRequest:
            required:
                - identifier
                - pullNumber
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                title:
                    type: string
                    description: New title. Omitted fields are left unchanged.
                body:
                    type: string
                    description: New body / description. An empty string clears the body.
                state:
                    type: string
                    description: |-
                        `"open"` or `"closed"`. `"closed"` closes the pull request. `"open"`
                         without `draft: true` marks it ready for review, including publishing an
                         existing draft. Merged is not writable — use `MergePullRequest`.
                draft:
                    type: boolean
                    description: |-
                        `true` marks the pull request draft; `false` marks it ready for review
                         (and reopens it if currently closed). Ignored when `state` is `"closed"`.
                base:
                    type: string
                    description: |-
                        New base branch. Retargets the pull request and may update stack
                         parentage when the new base is another change's head (or the default
                         branch).
        UpdatePullRequestReviewRequest:
            required:
                - identifier
                - pullNumber
                - reviewId
                - body
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                pullNumber:
                    type: string
                reviewId:
                    type: string
                body:
                    type: string
                    description: |-
                        Replacement review summary text; replaces the prior body in full. Must
                         contain a non-whitespace character; INVALID_ARGUMENT otherwise.
        UpdatePullRequestThreadRequest:
            required:
                - identifier
                - threadId
                - resolved
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                threadId:
                    type: string
                resolved:
                    type: boolean
                    description: Target resolution state. True resolves the thread; false reopens it.
        UpdateRepoRequest:
            required:
                - identifier
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                defaultBranch:
                    type: string
                    description: |-
                        New default branch. Must name an existing branch. Supported only on
                         repositories that do not pull from or push to an upstream source;
                         other repositories are rejected with a failed-precondition error.
                allowMergeCommit:
                    type: boolean
                    description: |-
                        Whether pull requests may land as merge commits. Must be provided
                         together with `allow_squash_merge`; at least one of the two must be
                         true. Providing one without the other is rejected as invalid.
                allowSquashMerge:
                    type: boolean
                    description: |-
                        Whether pull requests may land as squash merges. Must be provided
                         together with `allow_merge_commit`; at least one of the two must be
                         true. Providing one without the other is rejected as invalid.
                deleteBranchOnMerge:
                    type: boolean
                    description: |-
                        Whether the head branch is deleted automatically on merge. Supported
                         only on repositories whose pull requests live on this API; repositories
                         pulling from an upstream source are rejected with a failed-precondition
                         error.
                visibility:
                    enum:
                        - internal
                        - private
                    type: string
                    description: |-
                        New repository visibility, `internal` or `private`. Unspecified leaves
                         the visibility unchanged.
                    format: enum
        UpdateRulesetRequest:
            required:
                - identifier
                - rulesetId
                - name
                - enforcement
                - kind
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                rulesetId:
                    type: string
                    description: Stable Origin ruleset id.
                name:
                    type: string
                description:
                    type: string
                enforcement:
                    enum:
                        - active
                        - evaluate
                        - disabled
                    type: string
                    format: enum
                kind:
                    enum:
                        - merge_branch
                        - push_branch
                        - push_tag
                        - push_repository
                    type: string
                    format: enum
                includedRefNames:
                    type: array
                    items:
                        type: string
                    description: |-
                        Ref name patterns this ruleset includes. Supports globs and the tokens
                         `~ALL` and `~DEFAULT_BRANCH`.
                excludedRefNames:
                    type: array
                    items:
                        type: string
                    description: |-
                        Ref name patterns this ruleset excludes. Same pattern language as
                         `included_ref_names`.
                rules:
                    type: array
                    items:
                        $ref: '#/components/schemas/RulesetRuleInput'
                bypassActors:
                    type: array
                    items:
                        $ref: '#/components/schemas/RulesetBypassActorInput'
            description: |-
                Same configuration body as `CreateRulesetRequest`, plus the ruleset id on
                 the path. Nested rules and bypass actors are fully replaced.
        UpsertNamespaceGrantRequest:
            required:
                - ownerSlug
                - permission
            type: object
            properties:
                ownerSlug:
                    type: string
                    description: Owner slug.
                user:
                    $ref: '#/components/schemas/OriginUserActor'
                group:
                    $ref: '#/components/schemas/OriginGroup'
                teamGroup:
                    $ref: '#/components/schemas/OriginTeamGroup'
                permission:
                    enum:
                        - PERMISSION_READ
                        - PERMISSION_CONTRIBUTOR
                        - PERMISSION_WRITE
                        - PERMISSION_ADMIN
                        - PERMISSION_CUSTOM
                    type: string
                    description: |-
                        `PERMISSION_READ`, `PERMISSION_CONTRIBUTOR`, `PERMISSION_WRITE`, or
                         `PERMISSION_ADMIN`.
                    format: enum
        UpsertRepositoryGrantRequest:
            required:
                - identifier
                - permission
            type: object
            properties:
                identifier:
                    $ref: '#/components/schemas/RepoIdentifier'
                user:
                    $ref: '#/components/schemas/OriginUserActor'
                group:
                    $ref: '#/components/schemas/OriginGroup'
                teamGroup:
                    $ref: '#/components/schemas/OriginTeamGroup'
                permission:
                    enum:
                        - read
                        - write
                        - admin
                        - custom
                    type: string
                    description: '`read`, `write`, or `admin`.'
                    format: enum
        WebhookApp:
            type: object
            properties:
                id:
                    type: string
                displayName:
                    type: string
                    description: |-
                        The app's registered display name, never empty when present. Omitted
                         when enqueue-time hydration could not resolve the app.
        WebhookDelivery:
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                event:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/WebhookEventReference'
                    description: The event this delivery carries.
                installation:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/InstallationReference'
                    description: |-
                        The installation this delivery belongs to. `id` is the current active
                         installation for the target owner; unset when none exists (possible only
                         for app-targeted lifecycle events after an uninstall).
                createdAt:
                    readOnly: true
                    type: string
                    format: date-time
                deliveredAt:
                    readOnly: true
                    type: string
                    description: |-
                        First 2xx from any attempt, automatic or manual. Set once, never cleared.
                         Unset means the receiver has never acknowledged this delivery.
                    format: date-time
                lastAttempt:
                    readOnly: true
                    allOf:
                        - $ref: '#/components/schemas/WebhookDeliveryAttempt'
                    description: |-
                        The most recent HTTP attempt, when one exists: its response status code,
                         latency, transport error, trigger, and time.
            description: |-
                A delivery obligation: one event owed to one app. Its id is the
                 `webhook-id` header the receiver sees, stable across every attempt.
        WebhookDeliveryAttempt:
            type: object
            properties:
                id:
                    readOnly: true
                    type: string
                deliveryId:
                    readOnly: true
                    type: string
                trigger:
                    readOnly: true
                    enum:
                        - automatic
                        - manual
                    type: string
                    format: enum
                responseStatusCode:
                    readOnly: true
                    type: integer
                    description: Unset when the POST produced no HTTP response (transport error, timeout).
                    format: int32
                latencyMs:
                    readOnly: true
                    type: integer
                    format: int32
                errorMessage:
                    readOnly: true
                    type: string
                    description: Transport error detail when there was no HTTP response; empty otherwise.
                attemptedAt:
                    readOnly: true
                    type: string
                    format: date-time
            description: One HTTP POST of a delivery's payload to the app's webhook URL.
        WebhookEventReference:
            type: object
            properties:
                id:
                    type: string
                type:
                    type: string
            description: |-
                The event a delivery carries. `type` is the subscription event type, e.g.
                 `pull_request.created`; `id` is shared by every app's delivery of the same
                 event.
        WebhookInstallation:
            type: object
            properties:
                id:
                    type: string
                appId:
                    type: string
                    description: The installed app's identifier; the same value as `app.id` on the payload.
                target:
                    $ref: '#/components/schemas/Owner'
                repoSelectionMode:
                    enum:
                        - all
                        - selected
                    type: string
                    format: enum
                repositories:
                    type: array
                    items:
                        $ref: '#/components/schemas/RepositoryReference'
                    description: |-
                        Empty when repository_selection is "all". Capped at 5,000; see
                         repositories_count for the true total.
                scopes:
                    type: array
                    items:
                        type: string
                repositoriesCount:
                    type: integer
                    description: True total; 0 when repository_selection is "all".
                    format: int32
                createdAt:
                    type: string
                    format: date-time
                updatedAt:
                    type: string
                    format: date-time
                deletedAt:
                    type: string
                    format: date-time
                suspendedAt:
                    type: string
                    description: Set while the installation is suspended; unset when it is active.
                    format: date-time
                installedBy:
                    allOf:
                        - $ref: '#/components/schemas/OriginUserActor'
                    description: User who originally installed the app.
            description: |-
                The installation snapshot delivered with `installation.*` events: the fields
                 of `AppInstallation` (same names and types, so an `AppInstallation` decoder
                 reads it) plus the inline `repositories` snapshot that the API serves
                 separately through `ListAppInstallationRepositories`. `created_at` and
                 `updated_at` are present on the events that carry them.
    securitySchemes:
        bearerAuth:
            type: http
            description: 'Origin API credentials are sent as `Authorization: Bearer` tokens: an app JWT for app-level endpoints, or an installation access token (`oit_...`) for installation-scoped endpoints.'
            scheme: bearer
security:
    - bearerAuth: []
tags:
    - name: OriginService
