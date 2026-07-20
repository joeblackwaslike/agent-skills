---
source: "https://raw.githubusercontent.com/github/docs/main/content/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app.md"
fetched_at: "2026-07-20T06:45:20.604Z"
sha256: "d48c56320e19d2168d8a936fca3d659f9873b356690b514b123fd1ce7c37657a"
---

## Authentication as a {% data variables.product.prodname_github_app %}

To authenticate as itself, your app will use a JSON Web Token (JWT). Your app should authenticate as itself when it needs to generate an installation access token. An installation access token is required to authenticate as an app installation. Your app should also authenticate as itself when it needs to make API requests to manage resources related to the app. For example, when it needs to list the accounts where it is installed. For more information, see [AUTOTITLE](/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app) and [AUTOTITLE](/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-json-web-token-jwt-for-a-github-app).

## Authentication as an app installation

To authenticate as an installation, your app will use an installation access token. Your app should authenticate as an app installation when you want to attribute app activity to the app. Authenticating as an app installation lets your app access resources that are owned by the user or organization that installed the app. Authenticating as an app installation is ideal for automation workflows that don't involve user input. For more information, see [AUTOTITLE](/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation) and [AUTOTITLE](/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app).

## Authentication on behalf of a user

To authenticate on behalf of a user, your app will use a user access token. Your app should authenticate on behalf of a user when you want to attribute app activity to a user. Similar to authenticating as an app installation, your app can access resources that are owned by the user or organization that installed the app. Authenticating on behalf of a user is ideal when you want to ensure that your app only takes actions that could be performed by a specific user. For more information, see [AUTOTITLE](/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-a-github-app-on-behalf-of-a-user) and [AUTOTITLE](/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app).
