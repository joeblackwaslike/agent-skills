---
source: "https://docs.github.com/en/rest/commits/statuses"
fetched_at: "2026-06-15T19:08:53.463Z"
sha256: "198d59f034b709626606f2a3495e3282b79f6212134fef5d0eae31dbd5bac9ed"
---

# REST API endpoints for commit statuses

Use the REST API to interact with commit statuses.

## About commit statuses

You can use the REST API to allow external services to mark commits with an `error`, `failure`, `pending`, or `success` state, which is then reflected in pull requests involving those commits. Statuses can also include an optional `description` and `target_url`, and we highly recommend providing them as they make statuses much more useful in the GitHub UI.

As an example, one common use is for continuous integration services to mark commits as passing or failing builds using status. The `target_url` would be the full URL to the build output, and the `description` would be the high level summary of what happened with the build.

Statuses can include a `context` to indicate what service is providing that status. For example, you may have your continuous integration service push statuses with a context of `ci`, and a security audit tool push statuses with a context of `security`. You can then use the REST API to [Get the combined status for a specific reference](/en/rest/commits/statuses#get-the-combined-status-for-a-specific-reference) to retrieve the whole status for a commit.

Note that the `repo:status` [OAuth scope](/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps) grants targeted access to statuses **without** also granting access to repository code, while the `repo` scope grants permission to code as well as statuses.

If you are developing a GitHub App  and want to provide more detailed information about an external service, you may want to use the REST API to manage checks. For more information, see [REST API endpoints for checks](/en/rest/checks).

> \[!NOTE]
> Most endpoints use `Authorization: Bearer <YOUR-TOKEN>` and `Accept: application/vnd.github+json` headers, plus `X-GitHub-Api-Version: 2026-03-10`. Curl examples below omit these standard headers for brevity.

## Get the combined status for a specific reference

```
GET /repos/{owner}/{repo}/commits/{ref}/status
```

Users with pull access in a repository can access a combined view of commit statuses for a given ref. The ref can be a SHA, a branch name, or a tag name.
Additionally, a combined state is returned. The state is one of:

failure if any of the contexts report as error or failure
pending if there are no statuses or a context is pending
success if the latest status for all contexts is success

### Parameters

#### Headers

* **`accept`** (string)
  Setting to `application/vnd.github+json` is recommended.

#### Path and query parameters

* **`owner`** (string) (required)
  The account owner of the repository. The name is not case sensitive.

* **`repo`** (string) (required)
  The name of the repository without the .git extension. The name is not case sensitive.

* **`ref`** (string) (required)
  The commit reference. Can be a commit SHA, branch name (heads/BRANCH\_NAME), or tag name (tags/TAG\_NAME). For more information, see "Git References" in the Git documentation.

* **`per_page`** (integer)
  The number of results per page (max 100). For more information, see "Using pagination in the REST API."
  Default: `30`

* **`page`** (integer)
  The page number of the results to fetch. For more information, see "Using pagination in the REST API."
  Default: `1`

### HTTP response status codes

* **200** - OK

* **404** - Resource not found

### Code examples

#### Example

**Request:**

```curl
curl -L \
  -X GET \
  https://api.github.com/repos/OWNER/REPO/commits/REF/status
```

**Response schema (Status: 200):**

* `state`: required, string
* `statuses`: required, array of `Simple Commit Status`:
  * `description`: required, string or null
  * `id`: required, integer
  * `node_id`: required, string
  * `state`: required, string
  * `context`: required, string
  * `target_url`: required, string or null, format: uri
  * `required`: boolean or null
  * `avatar_url`: required, string or null, format: uri
  * `url`: required, string, format: uri
  * `created_at`: required, string, format: date-time
  * `updated_at`: required, string, format: date-time
* `sha`: required, string
* `total_count`: required, integer
* `repository`: required, `Minimal Repository`:
  * `id`: required, integer, format: int64
  * `node_id`: required, string
  * `name`: required, string
  * `full_name`: required, string
  * `owner`: required, `Simple User`:
    * `name`: string or null
    * `email`: string or null
    * `login`: required, string
    * `id`: required, integer, format: int64
    * `node_id`: required, string
    * `avatar_url`: required, string, format: uri
    * `gravatar_id`: required, string or null
    * `url`: required, string, format: uri
    * `html_url`: required, string, format: uri
    * `followers_url`: required, string, format: uri
    * `following_url`: required, string
    * `gists_url`: required, string
    * `starred_url`: required, string
    * `subscriptions_url`: required, string, format: uri
    * `organizations_url`: required, string, format: uri
    * `repos_url`: required, string, format: uri
    * `events_url`: required, string
    * `received_events_url`: required, string, format: uri
    * `type`: required, string
    * `site_admin`: required, boolean
    * `starred_at`: string
    * `user_view_type`: string
  * `private`: required, boolean
  * `html_url`: required, string, format: uri
  * `description`: required, string or null
  * `fork`: required, boolean
  * `url`: required, string, format: uri
  * `archive_url`: required, string
  * `assignees_url`: required, string
  * `blobs_url`: required, string
  * `branches_url`: required, string
  * `collaborators_url`: required, string
  * `comments_url`: required, string
  * `commits_url`: required, string
  * `compare_url`: required, string
  * `contents_url`: required, string
  * `contributors_url`: required, string, format: uri
  * `deployments_url`: required, string, format: uri
  * `downloads_url`: required, string, format: uri
  * `events_url`: required, string, format: uri
  * `forks_url`: required, string, format: uri
  * `git_commits_url`: required, string
  * `git_refs_url`: required, string
  * `git_tags_url`: required, string
  * `git_url`: string
  * `issue_comment_url`: required, string
  * `issue_events_url`: required, string
  * `issues_url`: required, string
  * `keys_url`: required, string
  * `labels_url`: required, string
  * `languages_url`: required, string, format: uri
  * `merges_url`: required, string, format: uri
  * `milestones_url`: required, string
  * `notifications_url`: required, string
  * `pulls_url`: required, string
  * `releases_url`: required, string
  * `ssh_url`: string
  * `stargazers_url`: required, string, format: uri
  * `statuses_url`: required, string
  * `subscribers_url`: required, string, format: uri
  * `subscription_url`: required, string, format: uri
  * `tags_url`: required, string, format: uri
  * `teams_url`: required, string, format: uri
  * `trees_url`: required, string
  * `clone_url`: string
  * `mirror_url`: string or null
  * `hooks_url`: required, string, format: uri
  * `svn_url`: string
  * `homepage`: string or null
  * `language`: string or null
  * `forks_count`: integer
  * `stargazers_count`: integer
  * `watchers_count`: integer
  * `size`: integer
  * `default_branch`: string
  * `open_issues_count`: integer
  * `is_template`: boolean
  * `topics`: array of string
  * `has_issues`: boolean
  * `has_projects`: boolean
  * `has_wiki`: boolean
  * `has_pages`: boolean
  * `has_discussions`: boolean
  * `has_pull_requests`: boolean
  * `pull_request_creation_policy`: string, enum: `all`, `collaborators_only`
  * `archived`: boolean
  * `disabled`: boolean
  * `visibility`: string
  * `pushed_at`: string or null, format: date-time
  * `created_at`: string or null, format: date-time
  * `updated_at`: string or null, format: date-time
  * `permissions`: object:
    * `admin`: boolean
    * `maintain`: boolean
    * `push`: boolean
    * `triage`: boolean
    * `pull`: boolean
  * `role_name`: string
  * `temp_clone_token`: string
  * `delete_branch_on_merge`: boolean
  * `subscribers_count`: integer
  * `network_count`: integer
  * `code_of_conduct`: `Code Of Conduct`:
    * `key`: required, string
    * `name`: required, string
    * `url`: required, string, format: uri
    * `body`: string
    * `html_url`: required, string or null, format: uri
  * `license`: object or null:
    * `key`: string
    * `name`: string
    * `spdx_id`: string
    * `url`: string or null
    * `node_id`: string
  * `forks`: integer
  * `open_issues`: integer
  * `watchers`: integer
  * `allow_forking`: boolean
  * `web_commit_signoff_required`: boolean
  * `security_and_analysis`: object or null:
    * `advanced_security`: object:
      * `status`: string, enum: `enabled`, `disabled`
    * `code_security`: object:
      * `status`: string, enum: `enabled`, `disabled`
    * `dependabot_security_updates`: object:
      * `status`: string, enum: `enabled`, `disabled`
    * `secret_scanning`: object:
      * `status`: string, enum: `enabled`, `disabled`
    * `secret_scanning_push_protection`: object:
      * `status`: string, enum: `enabled`, `disabled`
    * `secret_scanning_non_provider_patterns`: object:
      * `status`: string, enum: `enabled`, `disabled`
    * `secret_scanning_ai_detection`: object:
      * `status`: string, enum: `enabled`, `disabled`
    * `secret_scanning_delegated_alert_dismissal`: object:
      * `status`: string, enum: `enabled`, `disabled`
    * `secret_scanning_delegated_bypass`: object:
      * `status`: string, enum: `enabled`, `disabled`
    * `secret_scanning_delegated_bypass_options`: object:
      * `reviewers`: array of objects:
        * `reviewer_id`: required, integer
        * `reviewer_type`: required, string, enum: `TEAM`, `ROLE`
        * `mode`: string, enum: `ALWAYS`, `EXEMPT`, default: `"ALWAYS"`
  * `custom_properties`: object, additional properties allowed
* `commit_url`: required, string, format: uri
* `url`: required, string, format: uri

## List commit statuses for a reference

```
GET /repos/{owner}/{repo}/commits/{ref}/statuses
```

Users with pull access in a repository can view commit statuses for a given ref. The ref can be a SHA, a branch name, or a tag name. Statuses are returned in reverse chronological order. The first status in the list will be the latest one.
This resource is also available via a legacy route: GET /repos/:owner/:repo/statuses/:ref.

### Parameters

#### Headers

* **`accept`** (string)
  Setting to `application/vnd.github+json` is recommended.

#### Path and query parameters

* **`owner`** (string) (required)
  The account owner of the repository. The name is not case sensitive.

* **`repo`** (string) (required)
  The name of the repository without the .git extension. The name is not case sensitive.

* **`ref`** (string) (required)
  The commit reference. Can be a commit SHA, branch name (heads/BRANCH\_NAME), or tag name (tags/TAG\_NAME). For more information, see "Git References" in the Git documentation.

* **`per_page`** (integer)
  The number of results per page (max 100). For more information, see "Using pagination in the REST API."
  Default: `30`

* **`page`** (integer)
  The page number of the results to fetch. For more information, see "Using pagination in the REST API."
  Default: `1`

### HTTP response status codes

* **200** - OK

* **301** - Moved permanently

### Code examples

#### Example

**Request:**

```curl
curl -L \
  -X GET \
  https://api.github.com/repos/OWNER/REPO/commits/REF/statuses
```

**Response schema (Status: 200):**

Array of `Status`:

* `url`: required, string
* `avatar_url`: required, string or null
* `id`: required, integer
* `node_id`: required, string
* `state`: required, string
* `description`: required, string or null
* `target_url`: required, string or null
* `context`: required, string
* `created_at`: required, string
* `updated_at`: required, string
* `creator`: required, any of:
  * **null**
  * **Simple User**
    * `name`: string or null
    * `email`: string or null
    * `login`: required, string
    * `id`: required, integer, format: int64
    * `node_id`: required, string
    * `avatar_url`: required, string, format: uri
    * `gravatar_id`: required, string or null
    * `url`: required, string, format: uri
    * `html_url`: required, string, format: uri
    * `followers_url`: required, string, format: uri
    * `following_url`: required, string
    * `gists_url`: required, string
    * `starred_url`: required, string
    * `subscriptions_url`: required, string, format: uri
    * `organizations_url`: required, string, format: uri
    * `repos_url`: required, string, format: uri
    * `events_url`: required, string
    * `received_events_url`: required, string, format: uri
    * `type`: required, string
    * `site_admin`: required, boolean
    * `starred_at`: string
    * `user_view_type`: string

## Create a commit status

```
POST /repos/{owner}/{repo}/statuses/{sha}
```

Users with push access in a repository can create commit statuses for a given SHA.
Note: there is a limit of 1000 statuses per sha and context within a repository. Attempts to create more than 1000 statuses will result in a validation error.

### Parameters

#### Headers

* **`accept`** (string)
  Setting to `application/vnd.github+json` is recommended.

#### Path and query parameters

* **`owner`** (string) (required)
  The account owner of the repository. The name is not case sensitive.

* **`repo`** (string) (required)
  The name of the repository without the .git extension. The name is not case sensitive.

* **`sha`** (string) (required)

#### Body parameters

* **`state`** (string) (required)
  The state of the status.
  Can be one of: `error`, `failure`, `pending`, `success`

* **`target_url`** (string or null)
  The target URL to associate with this status. This URL will be linked from the GitHub UI to allow users to easily see the source of the status.
  For example, if your continuous integration system is posting build status, you would want to provide the deep link for the build output for this specific SHA:
  <http://ci.example.com/user/repo/build/sha>

* **`description`** (string or null)
  A short description of the status.

* **`context`** (string)
  A string label to differentiate this status from the status of other systems. This field is case-insensitive.
  Default: `default`

### HTTP response status codes

* **201** - Created

### Code examples

#### Example

**Request:**

```curl
curl -L \
  -X POST \
  https://api.github.com/repos/OWNER/REPO/statuses/SHA \
  -d '{
  "state": "success",
  "target_url": "https://example.com/build/status",
  "description": "The build succeeded!",
  "context": "continuous-integration/jenkins"
}'
```

**Response schema (Status: 201):**

* `url`: required, string
* `avatar_url`: required, string or null
* `id`: required, integer
* `node_id`: required, string
* `state`: required, string
* `description`: required, string or null
* `target_url`: required, string or null
* `context`: required, string
* `created_at`: required, string
* `updated_at`: required, string
* `creator`: required, any of:
  * **null**
  * **Simple User**
    * `name`: string or null
    * `email`: string or null
    * `login`: required, string
    * `id`: required, integer, format: int64
    * `node_id`: required, string
    * `avatar_url`: required, string, format: uri
    * `gravatar_id`: required, string or null
    * `url`: required, string, format: uri
    * `html_url`: required, string, format: uri
    * `followers_url`: required, string, format: uri
    * `following_url`: required, string
    * `gists_url`: required, string
    * `starred_url`: required, string
    * `subscriptions_url`: required, string, format: uri
    * `organizations_url`: required, string, format: uri
    * `repos_url`: required, string, format: uri
    * `events_url`: required, string
    * `received_events_url`: required, string, format: uri
    * `type`: required, string
    * `site_admin`: required, boolean
    * `starred_at`: string
    * `user_view_type`: string
