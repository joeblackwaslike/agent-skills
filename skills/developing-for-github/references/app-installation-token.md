---
source: "https://raw.githubusercontent.com/github/docs/main/content/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app.md"
fetched_at: "2026-07-20T06:45:20.604Z"
sha256: "9618e6e1094a492cd53e5d1c71c3fdd4bb2b55cf6269f29433b79bc04a54d902"
---

## About installation access tokens

In order to authenticate as an app installation, you must generate an installation access token. For more information about authenticating as an app installation, see [Authenticating as a GitHub App installation](/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation).

> [!NOTE]
> Instead of generating an installation access token, you can use {% data variables.product.company_short %}'s Octokit SDKs to authenticate as an app. The SDK will take care of generating an installation access token for you and will regenerate the token once it expires. For more information about authenticating as an app installation, see [Authenticating as a GitHub App installation](/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation).

You should keep your installation access token secure. For more information, see [AUTOTITLE](/apps/creating-github-apps/about-creating-github-apps/best-practices-for-creating-a-github-app).

{% data reusables.apps.ghs-stateless-token-format %}

## Generating an installation access token

{% data reusables.apps.generate-installation-access-token %}
