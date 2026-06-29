---
title: Using the Activity Log
product: vercel
url: /docs/activity-log
canonical_url: "https://vercel.com/docs/activity-log"
last_updated: 2026-06-16
type: reference
prerequisites:
  []
related:
  - /docs/accounts
  - /docs/cli/activity
summary: Learn how to use the Activity Log, which provides a list of all events on a team, chronologically organized since its creation.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/activity-log.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "027f90fbbeb0c31f5dea3765d35c5c847eb420809bec0490a5443a3307da2934"
---

# Using the Activity Log

> **🔒 Permissions Required**: Activity Log

The [Activity Log](/dashboard/activity) provides a list of all events on a [team](/docs/accounts#teams), chronologically organized since its creation. These events include:

- User(s) involved with the event
- Type of event performed
- Type of account
- Time of the event (hover over the time to reveal the exact timestamp)

> **💡 Note:** Vercel does not emit any logs to third-party services. The Activity Log is
> only available to the account owner and team members.

![Image](`/front/docs/observability/activity-logs-light.png`)

*Example events list on the Activity page.*

## When to use the Activity log

Common use cases for viewing the Activity log include:

- If a user was removed or deleted by mistake, use the list to find when the event happened and who requested it
- A domain can be disconnected from your deployment. Use the list to see if a domain related event was recently triggered
- Check if a specific user was removed from a team

## CLI access

You can also view and filter activity events from the command line. See the [`vercel activity`](/docs/cli/activity) CLI reference for available options.

## Events logged

The table below shows a list of events logged on the Activity page.

| Event Name | Status | Description |
| --- | --- | --- |
| access-group-created | Active | A user created an access group. |
| access-group-deleted | Active | A user deleted an access group. |
| access-group-project-updated | Active | A project was changed in an access group. |
| access-group-updated | Active | An access group was updated. |
| access-group-user-added | Active | A user was added to an access group. |
| access-group-user-removed | Active | A user was removed from an access group. |
| agentic-provisioning-account-blocked | Active | Agentic provisioning of an account was blocked (fraud, enterprise-managed, or recently-deleted). |
| agentic-provisioning-account-linked | Active | An account was linked to a Vercel team via agentic provisioning. |
| agentic-provisioning-account-relinked | Active | An account was relinked to an existing Vercel team via agentic provisioning. |
| agentic-provisioning-account-unlinked | Active | An agentic provisioning provider's account was unlinked from a Vercel team (team deletion or backoffice reset). |
| agentic-provisioning-credentials-rotated | Active | Credentials were rotated for an agentically provisioned resource. |
| agentic-provisioning-plan-changed | Active | A team billing plan was changed via agentic provisioning. |
| agentic-provisioning-team-created | Active | A new Vercel team was created via agentic provisioning. |
| ai-alert-investigation | Active | AI alert investigation was configured for a team. |
| ai-code-review | Active | AI code review was configured for a team. |
| ai-gateway-api-key-created | Active | A user created an AI Gateway API key. |
| ai-gateway-api-key-deleted | Active | A user deleted an AI Gateway API key. |
| ai-gateway-api-key-quota-updated | Active | A user set or changed the budget on an AI Gateway API key. |
| ai-gateway-byok-credential-created | Active | A user created an AI Gateway BYOK credential. |
| ai-gateway-byok-credential-deleted | Active | A user deleted an AI Gateway BYOK credential. |
| ai-gateway-byok-credential-updated | Active | A user updated an AI Gateway BYOK credential. |
| ai-gateway-private-model-created | Active | A user created an AI Gateway private model. |
| ai-gateway-private-model-deleted | Active | A user removed an AI Gateway private model. |
| ai-gateway-private-model-updated | Active | A user updated an AI Gateway private model. |
| ai-gateway-private-provider-created | Active | A user created an AI Gateway private provider. |
| ai-gateway-private-provider-deleted | Active | A user removed an AI Gateway private provider. |
| ai-gateway-private-provider-updated | Active | A user updated an AI Gateway private provider. |
| ai-gateway-provider-allowlist-providers-updated | Active | Providers were added to or removed from the AI Gateway provider allowlist. |
| ai-gateway-provider-allowlist-toggled | Active | The AI Gateway provider allowlist was enabled or disabled for a team. |
| ai-gateway-rule-created | Active | A user created an AI Gateway routing rule. |
| ai-gateway-rule-deleted | Active | A user removed an AI Gateway routing rule. |
| ai-gateway-rule-updated | Active | A user updated an AI Gateway routing rule. |
| ai-gateway-virtual-model-config-archived | Active | A user archived an AI Gateway virtual model. |
| ai-gateway-virtual-model-config-created | Active | A user created an AI Gateway virtual model. |
| ai-gateway-virtual-model-config-restored | Active | A user restored an AI Gateway virtual model. |
| ai-gateway-virtual-model-config-updated | Active | A user updated an AI Gateway virtual model. |
| ai-omniagent | Active | Vercel Agent was configured for a team. |
| alert-rule-created | Active | An alert rule was created. |
| alert-rule-deleted | Active | An alert rule was deleted. |
| alert-rule-updated | Active | An alert rule was updated. |
| alias | Replaced | An alias was assigned. (Replaced by aliases-assigned) |
| alias-delete | Active | An alias was deleted. |
| alias-invite-created | Active | An invite was sent for an alias. |
| alias-invite-joined | Active | A user joined an alias they were given access to. |
| alias-invite-revoked | Active | An invite was revoked for an alias. |
| alias-protection-bypass-created | Active | A shareable link was created for an alias. |
| alias-protection-bypass-exception | Active | A Deployment Protection Exception was updated for an alias. |
| alias-protection-bypass-regenerated | Active | A shareable link was regenerated for an alias. |
| alias-protection-bypass-revoked | Active | A shareable link was revoked for an alias. |
| alias-system | Active | A system alias was assigned. |
| alias-user-scoped-access-denied | Active | User-scoped access was denied for an alias. |
| alias-user-scoped-access-granted | Active | User-scoped access was granted for an alias. |
| alias-user-scoped-access-requested | Active | A user requested access to an alias. |
| alias-user-scoped-access-revoked | Active | User-scoped access was revoked for an alias. |
| aliases-assigned | Active | Aliases were assigned. |
| attack-mode-disabled | Active | Attack challenge mode was disabled. |
| attack-mode-enabled | Active | Attack challenge mode was enabled. |
| auto-expose-system-envs | Active | Automatically exposing System Environment Variables for the project. |
| avatar | Active | An avatar was created for the profile of a personal account. |
| bulk-redirects-settings-updated | Active | The capacity for bulk redirects was updated. |
| bulk-redirects-version-promoted | Active | A bulk redirects version was promoted. |
| bulk-redirects-version-restored | Active | A bulk redirects version was restored. |
| cert | Active | An SSL certificate was created for a custom domain in a personal account or team. |
| cert-autorenew | Active | An SSL certificate was auto-renewed. |
| cert-clone | Deprecated | An SSL certificate was successfully cloned. |
| cert-delete | Active | An SSL certificate connected to a custom domain was deleted. |
| cert-renew | Replaced | An SSL certificate was renewed. (Replaced by cert-autorenew) |
| cert-replace | Deprecated | An SSL certificate connected to a custom domain was successfully replaced by a new one, such as by uploading a new certificate in the dashboard. |
| cert-system-create | Active | A system SSL certificate was created. |
| concurrent-builds-update | Active | The concurrent builds limit was updated. |
| connect-attach-project | Active | A Connector was attached to a project |
| connect-bitbucket | Active | A BitBucket account was connected to a personal. |
| connect-bitbucket-app | Active | A Bitbucket app was connected. |
| connect-configuration-created | Active | A Secure Compute network was created. |
| connect-configuration-deleted | Active | A Secure Compute network was deleted. |
| connect-configuration-link-updated | Active | A Secure Compute network link was updated. |
| connect-configuration-linked | Active | A project was linked to a Secure Compute network. |
| connect-configuration-unlinked | Active | A project was unlinked from a Secure Compute network. |
| connect-configuration-updated | Active | A Secure Compute network was updated. |
| connect-create-connector | Active | A Connector was created |
| connect-delete-connector | Active | A Connector was deleted |
| connect-delete-installation | Active | A Connector installation was deleted |
| connect-detach-project | Active | A Connector was detached from a project |
| connect-github | Active | A GitHub account was connected to a personal. |
| connect-github-custom-host | Active | A GitHub Enterprise host was connected. |
| connect-github-limited | Active | A GitHub account was connected with limited access. |
| connect-gitlab | Active | A GitLab account was connected to a personal. |
| connect-gitlab-app | Active | A GitLab app was connected. |
| connect-import-tokens | Active | Connector tokens were imported |
| connect-revoke-all-tokens | Active | All matching Connector tokens were revoked |
| connect-update-connector | Active | A Connector was updated |
| connect-update-trigger-destinations | Active | Connector trigger destinations were updated |
| connect-upsert-installation | Active | A Connector installation was created or updated |
| custom-alert-created | Active | A custom alert was created. |
| custom-alert-deleted | Active | A custom alert was deleted. |
| custom-alert-updated | Active | A custom alert was updated. |
| custom-suffix-clear | Active | A custom deployment suffix was cleared. |
| custom-suffix-disable | Replaced | A custom suffix for a project was disabled. (Replaced by preview-deployment-suffix-disabled) |
| custom-suffix-enable | Replaced | A custom suffix for a project was enabled. (Replaced by preview-deployment-suffix-enabled) |
| custom-suffix-pending | Active | A custom deployment suffix is pending verification. |
| custom-suffix-ready | Active | A custom deployment suffix is ready. |
| deploy-hook-created | Active | A deploy hook was created. |
| deploy-hook-deduped | Deprecated | If a deploy hook triggers a deployment for a commit that already triggered a deployment via Git, then the deployment from the deploy hook is stopped. This action is reported with the deploy-hook-deduped event. |
| deploy-hook-deleted | Active | A deploy hook was deleted. |
| deploy-hook-processed | Active | A deployment was successfully triggered by a specific deploy hook. |
| deployment | Active | A deployment was created for a project. |
| deployment-check-created | Active | A deployment check was created for a project. |
| deployment-check-deleted | Active | A deployment check was deleted from a project. |
| deployment-check-updated | Active | A deployment check was updated for a project. |
| deployment-creation-blocked | Active | A deployment was blocked because the Git user is not part of the team. |
| deployment-delete | Active | A specific deployment was deleted. |
| deployment-policy-blocked | Active | A deployment was blocked by the team or project deployment policy. |
| disconnect-bitbucket-app | Active | A Bitbucket app was disconnected. |
| disconnect-github | Active | A GitHub account was disconnected. |
| disconnect-github-custom-host | Active | A GitHub Enterprise host was disconnected. |
| disconnect-github-limited | Active | A limited GitHub account was disconnected. |
| disconnect-gitlab-app | Active | A GitLab app was disconnected. |
| dns-add | Active | A DNS record was added to the personal account or team domain records for a specific domain. |
| dns-delete | Active | A DNS record was deleted from the personal account or team domain records for a specific domain. |
| dns-update | Active | A DNS record was updated in the personal account or team domain records for a specific domain. |
| dns-zonefile-import | Active | A DNS zone file was imported. |
| domain | Active | A domain connection was created in a personal account or team. |
| domain-buy | Active | A domain was successfully purchased in a personal account or team. |
| domain-cdn | Deprecated | The CDN feature for a domain was enabled or disabled. |
| domain-custom-ns-change | Active | Domain custom nameservers were changed. |
| domain-delegated | Deprecated | A domain was successfully delegated to another personal account or team so it can also be used there. |
| domain-delete | Active | A domain was removed from a personal account or team. |
| domain-move-in | Active | A domain was moved in from another personal account or team to the current personal account or team. |
| domain-move-out | Active | A domain was moved out from the current personal account or team to another personal account or team. |
| domain-move-out-request-sent | Active | The request to move a domain from the current personal account or team to another personal account or team was sent. |
| domain-renew-change | Active | A domain hosted with Vercel was renewed. |
| domain-service-type-updated | Active | Domain DNS service type was updated. |
| domain-transfer-in | Active | A domain was transferred from an external provider to Vercel. |
| domain-transfer-in-canceled | Deprecated | A domain transfer-in was canceled. |
| domain-transfer-in-completed | Deprecated | A domain transfer-in was completed. |
| domain-zone-change | Active | DNS zone was enabled or disabled for a domain. |
| drain-created | Active | A drain was created. |
| drain-deleted | Active | A drain was deleted. |
| drain-disabled | Replaced | A drain was disabled. (Replaced by drain-updated) |
| drain-enabled | Replaced | A drain was enabled. (Replaced by drain-updated) |
| drain-updated | Active | A drain was updated. |
| edge-cache-dangerously-delete-by-src-images | Active | The CDN cache was dangerously deleted by source images. |
| edge-cache-dangerously-delete-by-tags | Active | The CDN cache was dangerously deleted by tags. |
| edge-cache-invalidate-by-src-images | Active | The CDN cache was invalidated by source images. |
| edge-cache-invalidate-by-tags | Active | The CDN cache was invalidated by tags. |
| edge-cache-purge-all | Active | The CDN cache was purged. |
| edge-cache-rollback-purge | Active | The CDN cache purge was rolled back. |
| edge-config-backup-restored | Active | An Edge Config was restored from a backup. |
| edge-config-created | Active | An Edge Config was created. |
| edge-config-deleted | Active | An Edge Config was deleted. |
| edge-config-items-updated | Active | The values in an Edge Config were updated. |
| edge-config-schema-deleted | Active | An Edge Config schema was deleted. |
| edge-config-schema-updated | Active | An Edge Config schema was updated. |
| edge-config-token-created | Active | An access token for an Edge Config was created. |
| edge-config-token-deleted | Active | An access token for an Edge Config was deleted. |
| edge-config-transfer-in | Active | An Edge Config was transferred in. |
| edge-config-transfer-out | Active | An Edge Config was transferred out. |
| edge-config-updated | Active | An Edge Config was updated. |
| email | Active | The email of the current user was updated. |
| emu-member-removed-unverified-domain | Active | A team member was removed because their email domain is not a verified enterprise managed domain. |
| enforce-sensitive-environment-variables | Active | Sensitive environment variable enforcement was updated. |
| env-variable-add | Active | An automatically encrypted environment variable was added to a project. |
| env-variable-delete | Active | An existing environment variable was deleted from a project. |
| env-variable-edit | Active | An existing environment variable in a project was updated. |
| env-variable-masked | Active | A sensitive environment variable value was masked from build logs. |
| env-variable-read | Active | The plain text value of an encrypted environment variable was read. |
| env-variable-read:cli:dev | Active | An environment variable was decrypted via CLI dev. |
| env-variable-read:cli:env:add | Active | An environment variable was decrypted via CLI env add. |
| env-variable-read:cli:env:ls | Active | An environment variable was decrypted via CLI env ls. |
| env-variable-read:cli:env:pull | Active | An environment variable was decrypted via CLI env pull. |
| env-variable-read:cli:env:rm | Active | An environment variable was decrypted via CLI env rm. |
| env-variable-read:cli:pull | Active | An environment variable was decrypted via CLI pull. |
| env-variable-read:unknown-source | Active | An environment variable was decrypted from an unknown source. |
| env-variable-rotated | Active | An integration-managed environment variable was rotated during a secret rotation. |
| firewall-bypass-created | Active | A bypass of system firewall rules was created |
| firewall-bypass-deleted | Active | A bypass of system firewall rules was deleted |
| firewall-config-modified | Active | A firewall configuration was modified. |
| firewall-config-promoted | Active | A firewall configuration was promoted. |
| firewall-config-removed | Active | A firewall configuration was removed. |
| flag | Replaced | A Flag was created, updated, deleted, archived, or unarchived. (Replaced by flag-created, flag-updated, flag-deleted, flag-archived, flag-unarchived) |
| flag-archived | Active | A Flag was archived. |
| flag-created | Active | A Flag was created. |
| flag-deleted | Active | A Flag was deleted. |
| flag-unarchived | Active | A Flag was unarchived. |
| flag-updated | Active | A Flag was updated. |
| flags-explorer-subscription | Active | The Flags Explorer subscription was updated. |
| flags-sdk-key | Replaced | An SDK Key for Vercel Flags was added, deleted, or read. (Replaced by flags-sdk-key-added, flags-sdk-key-deleted) |
| flags-sdk-key-added | Active | An SDK Key for Vercel Flags was added. |
| flags-sdk-key-deleted | Active | An SDK Key for Vercel Flags was deleted. |
| flags-segment | Active | A Segment definition for the Flags tab was created, updated, or deleted. |
| flags-settings | Active | Settings for the Flags tab were created, updated, or deleted. |
| git_account_integration_link_added | Active | A GitHub account was linked to an additional Vercel account as an integration. |
| instant-rollback-created | Active | An instant rollback was created. |
| integration-configuration-owner-changed | Active | An integration configuration owner was changed. |
| integration-configuration-scope-change-confirmed | Active | The permissions upgrade request from an installed integration was confirmed. |
| integration-configuration-transfer-in-success | Active | An integration was transferred into the current team or account. |
| integration-configuration-transfer-out-success | Active | An integration was transferred out of the current team or account. |
| integration-configurations-disabled | Active | One or more integrations were disabled because their owner has left the team |
| integration-installation-billing-plan-updated | Active | An integration billing plan was updated. |
| integration-installation-completed | Active | An integration was installed in one or all projects under a personal account or team. |
| integration-installation-permission-updated | Active | The permissions for an installed integration was updated. |
| integration-installation-removed | Active | An integration was removed from a project or personal account or team. |
| integration-resource-sql-query-executed | Active | A SQL query was executed against a marketplace database resource. |
| integration-scope-changed | Active | The scopes for an integration were changed. |
| log-drain-created | Replaced | A log drain was created. (Replaced by drain-created) |
| log-drain-deleted | Replaced | A log drain was deleted. (Replaced by drain-deleted) |
| log-drain-disabled | Replaced | A log drain was disabled. (Replaced by drain-updated) |
| log-drain-enabled | Replaced | A log drain was enabled. (Replaced by drain-updated) |
| manual-deployment-promotion-created | Active | A deployment was manually promoted to production. |
| marketplace-integration-allowlist-updated | Active | The team's marketplace integration allowlist configuration was changed. |
| microfrontend-group-added | Active | A new microfrontend group was created |
| microfrontend-group-deleted | Active | A microfrontend group was deleted |
| microfrontend-group-updated | Active | A microfrontend group was updated |
| microfrontend-project-added-to-group | Active | A project was added to a microfrontend group |
| microfrontend-project-removed-from-group | Active | A project was removed from a microfrontend group |
| microfrontend-project-updated | Active | A microfrontend project configuration was updated. |
| monitoring-disabled | Active | Monitoring was disabled for the team |
| monitoring-enabled | Active | Monitoring was enabled for the team. |
| oauth-app-connection-created | Active | A user authorized an app. |
| oauth-app-connection-removed | Active | A user removed an app authorization. |
| oauth-app-connection-updated | Active | A user updated an app authorization. |
| oauth-app-created | Active | A user created an app. |
| oauth-app-deleted | Active | A user deleted an app. |
| oauth-app-secret-deleted | Active | A user deleted a secret for an app. |
| oauth-app-secret-generated | Active | A user generated a secret for an app. |
| oauth-app-token-created | Active | A token was created for an app. |
| oauth-app-updated | Active | A user updated an app. |
| observability-disabled | Active | Observability Plus was disabled for the team. |
| observability-enabled | Active | Observability Plus was enabled for the team. |
| observability-plus-project-disabled | Active | Observability Plus was disabled for a project. |
| observability-plus-project-enabled | Active | Observability Plus was enabled for a project. |
| page-integrity-config-updated | Active | Page Integrity configuration was updated. |
| page-integrity-header-approved | Active | A header was approved in Page Integrity. |
| page-integrity-header-rejected | Active | A header was rejected in Page Integrity. |
| page-integrity-inventory-cleared | Active | The Page Integrity resource inventory was cleared. |
| page-integrity-resource-approved | Active | A resource was approved in Page Integrity. |
| page-integrity-resource-deleted | Active | A resource was deleted from the Page Integrity resource inventory. |
| page-integrity-resource-rejected | Active | A resource was rejected in Page Integrity. |
| passkey-created | Active | A new passkey was created. |
| passkey-deleted | Active | An existing passkey was deleted. |
| passkey-updated | Active | The name of the existing passkey was updated. |
| password-protection-disabled | Active | Advanced Deployment Protection was disabled for the team. |
| password-protection-enabled | Active | Advanced Deployment Protection was enabled for the team. |
| payment-method-added | Active | A payment method was added to the account. |
| payment-method-default-updated | Active | The default payment method was updated. |
| payment-method-removed | Active | A payment method was removed from the account. |
| plan | Active | A payment plan (hobby, pro or enterprise) was added to a personal account. |
| preview-deployment-suffix-disabled | Active | The preview deployment suffix for a team was disabled. |
| preview-deployment-suffix-enabled | Active | The preview deployment suffix for a team was enabled. |
| preview-deployment-suffix-update | Active | The preview deployment suffix for a team was updated. |
| privatelink-endpoint-created | Active | A PrivateLink endpoint was created for a project. |
| privatelink-endpoint-deleted | Active | A PrivateLink endpoint was deleted from a project. |
| privatelink-endpoint-updated | Active | A PrivateLink endpoint was updated. |
| production-branch-updated | Active | The production branch for a project was updated. |
| project-add-alias | Active | An alias was added to a project domain. |
| project-add-redirect | Active | A redirect was added to a project domain. |
| project-affected-projects-deployments-updated | Active | The skip deployments when root and dependencies are unchanged setting for a project was updated. |
| project-alias-configured-change | Active | A project alias configuration was changed. |
| project-analytics-disabled | Active | Legacy Speed Insights was disabled for a specific project. |
| project-analytics-enabled | Active | Legacy Speed Insights was enabled for a specific project. |
| project-auto-assign-custom-production-domains-updated | Active | The auto-assign custom production domains setting was updated for a project. |
| project-automation-bypass | Active | Protection Bypass for Automation for a project was modified. |
| project-avatar-update | Active | The avatar of a specific project was updated. |
| project-build-command-updated | Active | The build command for a project was updated. |
| project-build-logs-and-source-protection-updated | Active | Build logs and source protection was updated for a project. |
| project-build-machine-updated | Active | The build machine for a project was updated. |
| project-client-cert-delete | Active | A client certificate was deleted from a project. |
| project-client-cert-upload | Active | A client certificate was uploaded to a project. |
| project-connect-configurations | Active | Project Secure Compute configurations were updated. |
| project-consolidated-git-commit-status-updated | Active | The consolidated git commit status setting for a project was updated. |
| project-created | Active | A new project was created. |
| project-cron-jobs-toggled | Active | Cron jobs were toggled for a project. |
| project-custom-environment-created | Active | A custom environment was created for a project. |
| project-custom-environment-deleted | Active | A custom environment was deleted from a project. |
| project-custom-environment-updated | Active | A custom environment branch tracking was updated for a project. |
| project-customer-success-code-visibility-updated | Active | Customer success code visibility was updated for a project. |
| project-delete | Active | A specific project was deleted. |
| project-deployment-policy-updated | Active | Project deployment policy was updated. |
| project-deployment-retention-updated | Active | The deployment retention policy was updated for a project. |
| project-directory-listing | Active | The directory listing setting was updated for a project. |
| project-domain-deleted | Active | A domain was deleted from a project. |
| project-domain-moved | Active | A domain was moved between projects. |
| project-domain-unverified | Active | The ownership of a domain added to Vercel became unverified. |
| project-domain-updated | Active | A project domain configuration was updated. |
| project-domain-verified | Active | The project domain ownership was verified. |
| project-elastic-concurrency-updated | Active | On-demand concurrency for a project was updated. |
| project-expiration-locked | Active | A project was locked. |
| project-expiration-reached | Active | A project reached its expiration deadline and was automatically soft deleted. |
| project-expiration-scheduled | Active | A project was scheduled for expiration. |
| project-expiration-unlocked | Active | A project was unlocked and re-scheduled for expiration. |
| project-external-rewrite-caching-updated | Active | The external rewrite caching setting for a project was updated. |
| project-framework-updated | Active | The framework for a project was updated. |
| project-function-cpu-memory | Active | Function CPU and memory settings were updated for a project. |
| project-function-failover | Active | Function failover settings were updated for a project. |
| project-function-max-duration | Active | Function max duration was updated for a project. |
| project-function-regions | Active | Function regions were updated for a project. |
| project-functions-beta-updated | Active | Functions Beta setting was updated for a specific project. |
| project-functions-fluid-disabled | Active | Fluid compute was disabled for a specific project. |
| project-functions-fluid-enabled | Active | Fluid compute was enabled for a specific project. |
| project-git-commit-comments-toggled | Active | The Git commit comments setting for a project was updated. |
| project-git-commit-status-toggled | Active | The git commit status setting for a project was updated. |
| project-git-create-deployments-toggled | Active | The GitHub deployments setting for a project was updated. |
| project-git-fork-protection-updated | Active | Git fork protection was updated for a project. |
| project-git-lfs-toggled | Active | The Git LFS setting for a project was updated. |
| project-git-pr-comments-toggled | Active | The Git PR comments setting for a project was updated. |
| project-git-repository-connected | Active | A Git repository was connected to a project. |
| project-git-repository-disconnected | Active | A Git repository was disconnected from a project. |
| project-git-repository-dispatch-events-toggled | Active | The repository dispatch events setting for a project was updated. |
| project-git-require-verified-commits-toggled | Active | The verified commits requirement setting for a project was updated. |
| project-ignored-build-step-updated | Active | The ignored build step setting was updated for a project. |
| project-install-command-updated | Active | The install command for a project was updated. |
| project-member-added | Active | A user was added to a project. |
| project-member-invited | Active | A user was invited to a project. |
| project-member-removed | Active | A user was removed from a project. |
| project-member-removed-batch | Active | Multiple members were removed from a project. |
| project-member-updated | Active | A user was updated in a project. |
| project-move-in-success | Active | The transfer of a project to the current personal account or team succeeded. |
| project-move-out-failed | Active | The transfer of a project from the current personal account or team failed. |
| project-move-out-started | Active | The transfer of a project from the current personal account or team was initiated. |
| project-move-out-success | Active | The transfer of a project from the current personal account or team succeeded. |
| project-name | Active | A project was renamed. |
| project-node-version-updated | Active | The Node.js version for a project was updated. |
| project-oidc-issuer-mode-updated | Active | The OIDC issuer mode was updated for a project. |
| project-oidc-token-created | Active | A project OIDC token was created. |
| project-options-allowlist | Active | OPTIONS Allowlist was modified. |
| project-output-directory-updated | Active | The output directory for a project was updated. |
| project-passport-updated | Active | The Passport configuration was updated for a project. |
| project-password-protection | Active | Password Protection for a project was modified. |
| project-paused | Active | A project was paused. |
| project-preview-deployment-suffix | Active | The preview deployment suffix was updated for a project. |
| project-preview-environment-branch-tracking-updated | Active | Preview environment branch tracking was updated for a project. |
| project-prioritize-production-builds-updated | Active | The prioritize production builds setting was updated for a project. |
| project-program-enrollment-changed | Active | Program enrollment was updated for a project. |
| project-protected-sourcemaps-updated | Active | The protected sourcemaps setting was updated for a project. |
| project-rolling-release-aborted | Active | A production canary rollout was aborted for a project. |
| project-rolling-release-approved | Active | Advancing to the next stage of a production canary rollout was approved for a project. |
| project-rolling-release-completed | Active | A production canary rollout was completed for a project. |
| project-rolling-release-configured | Active | The rolling release configuration was updated for a project. |
| project-rolling-release-continued | Active | A production canary rollout was resumed for a project. |
| project-rolling-release-disabled | Active | Rolling releases were disabled for a project. |
| project-rolling-release-enabled | Active | Rolling releases were enabled for a project. |
| project-rolling-release-paused | Active | A production canary rollout was paused for a project. |
| project-rolling-release-started | Active | A production canary rollout was started for a project. |
| project-rolling-release-suggested-actions-generated | Active | Suggested actions were generated for a production canary rollout. |
| project-rolling-release-timer | Active | A production canary rollout was automatically advanced to the next stage for a project. |
| project-root-directory-updated | Active | The root directory was updated for a project. |
| project-routes-version-promoted | Active | A project routes version was promoted. |
| project-routes-version-restored | Active | A project routes version was restored. |
| project-sandbox-url-protection-updated | Active | Sandbox URL protection was updated for a project. |
| project-skew-protection-allowed-domains-updated | Active | Skew Protection allowed domains were updated for a project. |
| project-skew-protection-max-age-updated | Active | Skew Protection max age was updated for a project. |
| project-skew-protection-threshold-updated | Active | Skew Protection threshold was updated for a project. |
| project-source-files-outside-root-directory-updated | Active | The include files outside root directory setting for a project was updated. |
| project-speed-insights-disabled | Active | Speed Insights was disabled for a specific project. |
| project-speed-insights-enabled | Active | Speed Insights was enabled for a specific project. |
| project-sso-protection | Active | Vercel Authentication (formerly SSO protection) for a project was modified. |
| project-static-ips-updated | Active | Static IPs were updated for a project. |
| project-trusted-ips | Active | Trusted IPs for a project was modified. |
| project-trusted-sources | Active | Trusted Sources for a project was modified. |
| project-unpaused | Active | A project was unpaused. |
| project-web-analytics-disabled | Active | Web Analytics was disabled for a project. |
| project-web-analytics-enabled | Active | Web Analytics was enabled for a project. |
| protected-git-scope-added | Active | A Protected Git Scope was added for the team. |
| protected-git-scope-removed | Active | A Protected Git Scope was removed from the team. |
| runtime-cache-purge-all | Active | All runtime cache was purged. |
| sandbox-alias-assigned | Active | An alias was assigned to a sandbox. |
| sandbox-alias-delete | Active | An alias was removed from a sandbox. |
| scale | Active | A deployment was scaled. |
| scale-auto | Active | Auto-scaling was configured for a deployment. |
| secondary-email-added | Active | An email was added to the account |
| secondary-email-removed | Active | An email was removed from the account |
| secondary-email-verified | Active | An email was verified |
| secret-add | Active | An encrypted environment variable was added to a project. (Only possible through the API and CLI) |
| secret-delete | Deprecated | An encrypted environment variable was deleted from a project. (Only possible through the API and CLI) |
| secret-rename | Active | An encrypted environment variable was renamed in a project. (Only possible through the API and CLI) |
| security-plus-updated | Active | Security Plus configuration was updated. |
| set-scale | Deprecated | If a deployment needs to be scaled up or down by increasing or decreasing the docker container size, this event is created. |
| shared-env-variable-create | Active | An automatically encrypted shared environment variable was created. |
| shared-env-variable-delete | Active | An existing shared environment variable was deleted. |
| shared-env-variable-read | Active | The plain text value of an encrypted shared environment variable was read. |
| shared-env-variable-update | Active | An existing shared environment variable was updated. |
| show-ip-addresses | Active | The show IP addresses setting was updated. |
| signup | Active | A new user account was created. |
| signup-via-bitbucket | Active | A new user account was created via Bitbucket. |
| signup-via-github | Active | A new user account was created via GitHub. |
| signup-via-gitlab | Active | A new user account was created via GitLab. |
| speed-insights-settings-updated | Active | Speed Insights settings were updated. |
| spend-created | Active | A spend management budget was added. |
| spend-deleted | Active | A spend management budget was deleted. |
| spend-updated | Active | A spend management budget was updated. |
| storage-accept-tos | Active | Acceptance of storage terms of service |
| storage-access-token-set | Active | A storage access token was set. |
| storage-accessed-data-browser | Active | Made a query to the store from the Data tab |
| storage-connect-project | Active | A store was connected to a project |
| storage-create | Active | A new store was created |
| storage-delete | Active | A store was deleted |
| storage-disconnect-project | Active | A store was disconnected to a project |
| storage-disconnect-projects | Active | A store was disconnected from multiple projects. |
| storage-inactive-store-deleted | Active | An inactive store was deleted |
| storage-reset-credentials | Active | The credentials for a store were reset |
| storage-resource-repl-command | Active | A storage REPL command was executed. |
| storage-set-locked | Active | A store was locked down or unlocked. |
| storage-transfer-in-success | Active | A store was transferred into the current team or account. |
| storage-transfer-out-success | Active | A store was transferred out of the current team or account. |
| storage-transfer-request-created | Active | A transfer request was created for a store. |
| storage-update | Active | A store was updated |
| storage-update-project-connection | Active | A storage project connection was updated. |
| storage-upgrade-project-connection-to-oidc | Active | A storage project connection was upgraded to OIDC. |
| storage-view-secret | Active | Viewed a secret for a store |
| strict-deployment-protection-settings | Active | Strict deployment protection settings were updated. |
| strict-shareable-links | Active | Strict shareable links settings were updated. |
| subscription-product-added | Active | A self-serve product was added to a subscription. |
| subscription-product-removed | Active | A self-serve product was removed from a subscription. |
| team | Active | A team was created in a personal account. |
| team-avatar-update | Active | The avatar of a specific team was updated. |
| team-default-build-machine-updated | Active | The default build machine for a team was updated. |
| team-default-passport-updated | Active | The default Passport configuration was updated for a team. |
| team-delete | Active | A specific team was deleted. |
| team-deployment-policy-updated | Active | Team deployment policy was updated. |
| team-email-domain-update | Active | The team email domain was updated. |
| team-ended-trial | Active | A team trial ended. |
| team-git-repository-dispatch-events-toggled | Active | The team-wide repository dispatch events default setting was updated. |
| team-git-require-verified-commits-toggled | Active | The team-wide verified commits requirement setting was updated. |
| team-invite-bulk-delete | Active | One or more team invites were deleted. |
| team-invite-code-reset | Active | The team invite code was reset. |
| team-invite-link-created | Active | A team invite link was created. |
| team-invite-link-deleted | Active | A team invite link was deleted. |
| team-ip-blocking-rules-created | Active | Team IP blocking rules were created. |
| team-ip-blocking-rules-removed | Active | Team IP blocking rules were removed. |
| team-member-add | Active | A member was added to a specific team. |
| team-member-confirm-request | Active | The request for a user to join a team was confirmed. |
| team-member-decline-request | Active | The request for a user to join a team was declined. |
| team-member-delete | Active | A specific team member was deleted from a team. |
| team-member-entitlement-added | Active | A team member was added to an entitlement. |
| team-member-entitlement-canceled | Active | A team member entitlement was canceled and set not to renew. |
| team-member-entitlement-reactivated | Active | A team member had an entitlement reactivated. |
| team-member-entitlement-removed | Active | A team member was removed from an entitlement. |
| team-member-join | Active | A team member joined the current team. |
| team-member-leave | Active | A team member left the current team. |
| team-member-request-access | Active | A user requested access to join a team. |
| team-member-role-update | Active | The role of a specific team member was updated. |
| team-mfa-enforcement-updated | Active | The 2FA enforcement of a team was updated. |
| team-name-update | Active | The name of a team was updated. |
| team-paid-invoice | Active | A team invoice was paid. |
| team-program-enrollment-changed | Active | Program enrollment was updated for a team. |
| team-remote-caching-update | Active | The Remote Caching status was changed. |
| team-saml-enforced | Active | SAML enforcement was configured for a team. |
| team-saml-roles | Active | SAML roles were configured for a team. |
| team-slug-update | Active | The slug of a team was updated. |
| unlink-login-connection | Active | A login connection was unlinked. |
| user-delete | Active | A user account was deleted. |
| user-emu-account-archived | Active | A user archived their personal account during enterprise-managed user setup. |
| user-emu-account-recovered | Active | A user recovered their archived account using a recovery code. |
| user-mfa-challenge-verified | Active | A two-factor challenge was verified |
| user-mfa-configuration-updated | Active | Two-factor configuration was updated |
| user-mfa-recovery-codes-regenerated | Active | Two-factor recovery codes were regenerated |
| user-mfa-removed | Active | MFA was removed from a user account. |
| user-mfa-setup-skipped | Active | Two-factor authentication setup was skipped |
| user-mfa-totp-verified | Active | A Two-factor authenticator app was added |
| user-primary-email-updated | Active | The primary email was changed |
| user-token-created | Active | A Personal Access Token was created. |
| user-token-deleted | Active | A Token was deleted. |
| user-tokens-deleted | Active | All Tokens (except the current one) were deleted. |
| username | Active | The username of a personal account was updated. |
| vcr-image-deleted | Active | A container image was deleted from a registry repository. |
| vcr-repository-created | Active | A container registry repository was created for a project. |
| vercel-agent-elevated-permissions-approved | Active | A Vercel Agent elevated access request was approved. |
| vercel-agent-elevated-permissions-requested | Active | A Vercel Agent plan requested elevated access. |
| vercel-agent-session-created | Active | A Vercel Agent session was created. |
| vercel-app-tokens-revoked | Active | A user revoked tokens for an app. |
| vercel-toolbar | Active | The Vercel Toolbar setting was updated. |
| vpc-peering-connection-accepted | Active | A VPC peering connection was accepted. |
| vpc-peering-connection-deleted | Active | A VPC peering connection was deleted. |
| vpc-peering-connection-rejected | Active | A VPC peering connection was rejected. |
| vpc-peering-connection-updated | Active | A VPC peering connection was updated. |
| vulnerability-banner-dismissed | Active | A vulnerability banner was dismissed, optionally with deployment protection enabled. |
| web-analytics-tier-updated | Active | The Web Analytics subscription tier was changed. |
| webhook-created | Active | A webhook was created. |
| webhook-deleted | Active | A webhook was deleted. |
| webhook-updated | Active | A webhook was updated. |
| workflow-deployment-key-accessed | Active | A workflow deployment key was accessed. |


---

[View full sitemap](/docs/sitemap)
