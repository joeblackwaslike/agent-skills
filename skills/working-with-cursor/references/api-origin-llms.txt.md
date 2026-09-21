---
source: "https://cursor.com/docs/api/origin/llms.txt"
fetched_at: "2026-09-21T09:40:19.892Z"
sha256: "8d3ec00dc7f202fec27c1ca362a0ea828349fdcbf6d7d0201d27425e6bf7fd73"
---

# Cursor Origin API

> Early Beta reference for the Cursor Origin API. Origin is Cursor's code forge; its public REST API lets apps and tools work with Origin repositories, commits, checks, pull requests, apps, and installations.

The base URL for API requests is `https://api.cursor.com/v1/origin`. The Origin API is in Early Beta and subject to change.

## Docs

- [Full reference (Markdown)](https://cursor.com/docs/api/origin/llms-full.txt): The complete Origin API reference as a single Markdown file.
- [Origin API reference](https://cursor.com/docs/api/origin): Interactive reference page.
- [OpenAPI specification](https://cursor.com/docs/api/origin/openapi.yaml): Machine-readable OpenAPI 3.1 spec with request and response schemas.

## Guides

- [Overview](https://cursor.com/docs/api/origin)
- [Base URL](https://cursor.com/docs/api/origin#base-url)
- [Protocol conventions](https://cursor.com/docs/api/origin#protocol-conventions)
- [Changelog](https://cursor.com/docs/api/origin/changelog)
- [Getting started](https://cursor.com/docs/api/origin#getting-started)
- [Origin access](https://cursor.com/docs/api/origin#origin-access)
- [Origin CLI](https://cursor.com/docs/api/origin#origin-cli)
- [Installation](https://cursor.com/docs/api/origin#installation)
- [Installation receipt](https://cursor.com/docs/api/origin#installation-receipt)
- [Authentication](https://cursor.com/docs/api/origin#authentication)
- [Generate an app signing key](https://cursor.com/docs/api/origin#generate-an-app-signing-key)
- [App JWT](https://cursor.com/docs/api/origin#app-jwt)
- [Installation access token](https://cursor.com/docs/api/origin#installation-access-token)
- [Git HTTPS authentication](https://cursor.com/docs/api/origin#git-https-authentication)
- [User-authenticated CLI requests](https://cursor.com/docs/api/origin#user-authenticated-cli-requests)
- [Discovery and signing keys](https://cursor.com/docs/api/origin#discovery-and-signing-keys)
- [Scopes](https://cursor.com/docs/api/origin#scopes)
- [Mirrored repositories](https://cursor.com/docs/api/origin#mirrored-repositories)
- [Rate limits](https://cursor.com/docs/api/origin#rate-limits)
- [Response headers](https://cursor.com/docs/api/origin#response-headers)
- [Exceeding the limit](https://cursor.com/docs/api/origin#exceeding-the-limit)
- [Checking remaining quota](https://cursor.com/docs/api/origin#checking-remaining-quota)
- [Common conventions](https://cursor.com/docs/api/origin#common-conventions)
- [Pagination](https://cursor.com/docs/api/origin#pagination)
- [Errors](https://cursor.com/docs/api/origin#errors)
- [Repository paths](https://cursor.com/docs/api/origin#repository-paths)
- [Resource references](https://cursor.com/docs/api/origin#resource-references)
- [Current limitations](https://cursor.com/docs/api/origin#current-limitations)
- [Implementation checklist](https://cursor.com/docs/api/origin#implementation-checklist)
- [Endpoint reference](https://cursor.com/docs/api/origin#endpoint-reference)

## Apps and installations

- [Get Rate Limit](https://cursor.com/docs/api/origin#get-rate-limit)
- [Get Authenticated App](https://cursor.com/docs/api/origin#get-authenticated-app)
- [List App Installations](https://cursor.com/docs/api/origin#list-app-installations)
- [Get App Installation](https://cursor.com/docs/api/origin#get-app-installation)
- [Delete App Installation](https://cursor.com/docs/api/origin#delete-app-installation)
- [Create Installation Access Token](https://cursor.com/docs/api/origin#create-installation-access-token)
- [List App Installation Repositories](https://cursor.com/docs/api/origin#list-app-installation-repositories)
- [List Webhook Deliveries](https://cursor.com/docs/api/origin#list-webhook-deliveries)
- [Batch Redeliver Webhook Deliveries](https://cursor.com/docs/api/origin#batch-redeliver-webhook-deliveries)
- [Ping Webhook](https://cursor.com/docs/api/origin#ping-webhook)
- [Get App](https://cursor.com/docs/api/origin#get-app)
- [Update App](https://cursor.com/docs/api/origin#update-app)
- [Add App Signing Key](https://cursor.com/docs/api/origin#add-app-signing-key)
- [Revoke App Signing Key](https://cursor.com/docs/api/origin#revoke-app-signing-key)
- [List Namespace Apps](https://cursor.com/docs/api/origin#list-namespace-apps)
- [Create App](https://cursor.com/docs/api/origin#create-app)
- [Add App Installation Repositories](https://cursor.com/docs/api/origin#add-app-installation-repositories)

## Repositories

- [List Repos](https://cursor.com/docs/api/origin#list-repos)
- [Get Repo](https://cursor.com/docs/api/origin#get-repo)
- [Update Repo](https://cursor.com/docs/api/origin#update-repo)
- [Create Repo](https://cursor.com/docs/api/origin#create-repo)
- [List Branches](https://cursor.com/docs/api/origin#list-branches)
- [Get Repo Tarball](https://cursor.com/docs/api/origin#get-repo-tarball)
- [Sync Mirror](https://cursor.com/docs/api/origin#sync-mirror)

## Checks

- [Post Check Run](https://cursor.com/docs/api/origin#post-check-run)
- [Batch Upsert Check Runs](https://cursor.com/docs/api/origin#batch-upsert-check-runs)
- [Get Check Run](https://cursor.com/docs/api/origin#get-check-run)
- [List Check Run Annotations](https://cursor.com/docs/api/origin#list-check-run-annotations)
- [Create Check Run Annotations](https://cursor.com/docs/api/origin#create-check-run-annotations)
- [Rerequest Check Run](https://cursor.com/docs/api/origin#rerequest-check-run)
- [Get Check Suite](https://cursor.com/docs/api/origin#get-check-suite)
- [List Check Runs For Suite](https://cursor.com/docs/api/origin#list-check-runs-for-suite)
- [List Check Runs For Commit](https://cursor.com/docs/api/origin#list-check-runs-for-commit)
- [List Check Suites For Commit](https://cursor.com/docs/api/origin#list-check-suites-for-commit)

## Commits and contents

- [List Commits](https://cursor.com/docs/api/origin#list-commits)
- [Get Commit](https://cursor.com/docs/api/origin#get-commit)
- [List Commit Files](https://cursor.com/docs/api/origin#list-commit-files)
- [Compare Commits](https://cursor.com/docs/api/origin#compare-commits)
- [List Comparison Files](https://cursor.com/docs/api/origin#list-comparison-files)
- [Get Contents](https://cursor.com/docs/api/origin#get-contents)
- [Batch Get Contents](https://cursor.com/docs/api/origin#batch-get-contents)
- [Grep Contents](https://cursor.com/docs/api/origin#grep-contents)

## Git data

- [Get Blob](https://cursor.com/docs/api/origin#get-blob)
- [Get Git Commit](https://cursor.com/docs/api/origin#get-git-commit)
- [Create Commit From Files](https://cursor.com/docs/api/origin#create-commit-from-files)
- [Get Git Ref](https://cursor.com/docs/api/origin#get-git-ref)
- [Create Git Ref](https://cursor.com/docs/api/origin#create-git-ref)
- [Delete Git Ref](https://cursor.com/docs/api/origin#delete-git-ref)
- [List Matching Git Refs](https://cursor.com/docs/api/origin#list-matching-git-refs)
- [List Matching Git Refs by Path](https://cursor.com/docs/api/origin#list-matching-git-refs-by-path)
- [Get Tag](https://cursor.com/docs/api/origin#get-tag)
- [Get Tree](https://cursor.com/docs/api/origin#get-tree)

## Grants

- [List Repository Grants](https://cursor.com/docs/api/origin#list-repository-grants)
- [Upsert Repository Grant](https://cursor.com/docs/api/origin#upsert-repository-grant)
- [Delete Repository Grant](https://cursor.com/docs/api/origin#delete-repository-grant)
- [List Namespace Grants](https://cursor.com/docs/api/origin#list-namespace-grants)
- [Upsert Namespace Grant](https://cursor.com/docs/api/origin#upsert-namespace-grant)
- [Delete Namespace Grant](https://cursor.com/docs/api/origin#delete-namespace-grant)

## Grants concepts

- [Grants concepts](https://cursor.com/docs/api/origin/grants-api)

## Labels

- [List Labels](https://cursor.com/docs/api/origin#list-labels)
- [Create Label](https://cursor.com/docs/api/origin#create-label)
- [Get Label](https://cursor.com/docs/api/origin#get-label)
- [Delete Label](https://cursor.com/docs/api/origin#delete-label)
- [Update Label](https://cursor.com/docs/api/origin#update-label)

## Pull requests

- [List Pull Requests](https://cursor.com/docs/api/origin#list-pull-requests)
- [Get Pull Request](https://cursor.com/docs/api/origin#get-pull-request)
- [Create Pull Request](https://cursor.com/docs/api/origin#create-pull-request)
- [Update Pull Request](https://cursor.com/docs/api/origin#update-pull-request)
- [List Pull Request Comments](https://cursor.com/docs/api/origin#list-pull-request-comments)
- [Get Pull Request Comment](https://cursor.com/docs/api/origin#get-pull-request-comment)
- [Create Pull Request Comment](https://cursor.com/docs/api/origin#create-pull-request-comment)
- [Update Pull Request Comment](https://cursor.com/docs/api/origin#update-pull-request-comment)
- [Update Pull Request Thread](https://cursor.com/docs/api/origin#update-pull-request-thread)
- [List Pull Request Commits](https://cursor.com/docs/api/origin#list-pull-request-commits)
- [List Pull Request Files](https://cursor.com/docs/api/origin#list-pull-request-files)
- [List Pull Request Labels](https://cursor.com/docs/api/origin#list-pull-request-labels)
- [Set Pull Request Labels](https://cursor.com/docs/api/origin#set-pull-request-labels)
- [Add Pull Request Labels](https://cursor.com/docs/api/origin#add-pull-request-labels)
- [Remove All Pull Request Labels](https://cursor.com/docs/api/origin#remove-all-pull-request-labels)
- [Remove Pull Request Label](https://cursor.com/docs/api/origin#remove-pull-request-label)
- [Merge Pull Request](https://cursor.com/docs/api/origin#merge-pull-request)
- [Get Pull Request Mergeability](https://cursor.com/docs/api/origin#get-pull-request-mergeability)
- [List Pull Request Requested Reviewers](https://cursor.com/docs/api/origin#list-pull-request-requested-reviewers)
- [Request Pull Request Reviewers](https://cursor.com/docs/api/origin#request-pull-request-reviewers)
- [Remove Pull Request Requested Reviewers](https://cursor.com/docs/api/origin#remove-pull-request-requested-reviewers)
- [List Pull Request Reviews](https://cursor.com/docs/api/origin#list-pull-request-reviews)
- [Create Pull Request Review](https://cursor.com/docs/api/origin#create-pull-request-review)
- [Update Pull Request Review](https://cursor.com/docs/api/origin#update-pull-request-review)
- [Dismiss Pull Request Review](https://cursor.com/docs/api/origin#dismiss-pull-request-review)

## Rulesets

- [List Rulesets](https://cursor.com/docs/api/origin#list-rulesets)
- [Create Ruleset](https://cursor.com/docs/api/origin#create-ruleset)
- [Get Ruleset](https://cursor.com/docs/api/origin#get-ruleset)
- [Update Ruleset](https://cursor.com/docs/api/origin#update-ruleset)
- [Delete Ruleset](https://cursor.com/docs/api/origin#delete-ruleset)

## Webhooks

- [Headers](https://cursor.com/docs/api/origin#headers)
- [Signature verification](https://cursor.com/docs/api/origin#signature-verification)
- [Delivery envelope](https://cursor.com/docs/api/origin#delivery-envelope)
- [Recovery](https://cursor.com/docs/api/origin#recovery)

## Webhooks reference

- [Events](https://cursor.com/docs/api/origin#events)
- [Event payloads](https://cursor.com/docs/api/origin#event-payloads)
- [Repository Created](https://cursor.com/docs/api/origin#repository-created)
- [Repository Deleted](https://cursor.com/docs/api/origin#repository-deleted)
- [Repository Push](https://cursor.com/docs/api/origin#repository-push)
- [Repository Metadata Updated](https://cursor.com/docs/api/origin#repository-metadata-updated)
- [Pull Request Events](https://cursor.com/docs/api/origin#pull-request-events)
- [Pull Request Label Events](https://cursor.com/docs/api/origin#pull-request-label-events)
- [Pull Request Comment](https://cursor.com/docs/api/origin#pull-request-comment)
- [Pull Request Review Events](https://cursor.com/docs/api/origin#pull-request-review-events)
- [Pull Request Reviewer Events](https://cursor.com/docs/api/origin#pull-request-reviewer-events)
- [Check Run Events](https://cursor.com/docs/api/origin#check-run-events)
- [Check Run Rerequested](https://cursor.com/docs/api/origin#check-run-rerequested)
- [Installation Created](https://cursor.com/docs/api/origin#installation-created)
- [Installation Updated](https://cursor.com/docs/api/origin#installation-updated)
- [Installation Suspended](https://cursor.com/docs/api/origin#installation-suspended)
- [Installation Unsuspended](https://cursor.com/docs/api/origin#installation-unsuspended)
- [Installation Deleted](https://cursor.com/docs/api/origin#installation-deleted)
