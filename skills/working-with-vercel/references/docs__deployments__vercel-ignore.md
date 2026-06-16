---
title: Exclude Files from Deployments with .vercelignore
product: vercel
url: /docs/deployments/vercel-ignore
canonical_url: "https://vercel.com/docs/deployments/vercel-ignore"
last_updated: 2025-03-12
type: reference
prerequisites:
  []
related:
  - /docs/deployments/build-features
summary: The .vercelignore file allows you to define which files and directories should be ignored when uploading your project to Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployments/vercel-ignore.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "7292ff770aec3d300dca152ea16ab38ab9adb19aae2a04bfaaee7a66488d6d94"
---

# Exclude Files from Deployments with .vercelignore

The `.vercelignore` file can be used to specify files and directories that should be excluded from the deployment process when using Vercel. This file works similarly to a `.gitignore` file, but it is specific to Vercel.

The `.vercelignore` file should be placed in the root directory of your project and should contain a list of files and directories, one per line, that should be excluded from deployment. For example, to prevent an `/image` directory and `/private.html` file within a project from being uploaded to Vercel, you would add them to the `.vercelignore` file like this:

```bash filename=".vercelignore"
image
private.html
```

## Allowlist

A typical `.vercelignore` file assumes all files are allowed and each entry is a pattern to ignore. Alternatively, you can ignore all files and each entry is a pattern to allow.

Add a wildcard `/*` as the first line in `.vercelignore` to ensure all directories and files in the **project root** are ignored. The following lines must then start with a `!` to invert the ignore action and ensure the directory or file is allowed.

```bash filename=".vercelignore"
# Ignore everything (folders and files) on root only
/*
!api
!vercel.json
!*.html
```

## Uploaded Files

Aside from the [default exclusions](/docs/deployments/build-features#ignored-files-and-folders), all files within your project are uploaded to Vercel if no source path is specified to be excluded in a `.vercelignore` configuration file

The complete list of files and directories excluded by default can be found in the [ignored files and folders](/docs/deployments/build-features#ignored-files-and-folders) documentation.

## Served Files

The use of a `.vercelignore` configuration file allows you to keep private files safe and also makes your deployment faster by uploading only the essential files. Non-targeted files are prevented from being deployed and served on Vercel.

## Monorepos

If you have a monorepo, a `.vercelignore` in the project root directory always takes precedence over one that is defined at the root level. If there is no `.vercelignore` to be found at the project level, Vercel will use the `.vercelignore` at the root level.


---

[View full sitemap](/docs/sitemap)
