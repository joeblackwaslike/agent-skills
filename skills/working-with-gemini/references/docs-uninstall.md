---
source: "https://raw.githubusercontent.com/google-gemini/gemini-cli/main/docs/resources/uninstall.md"
fetched_at: "2026-06-15T05:55:14.234Z"
sha256: "839d715ea05f2cd14c2b008bff070c60a39627bdc4faf59f5bde29d4c9169117"
---

# Uninstalling the CLI

Your uninstall method depends on how you ran the CLI. Follow the instructions
for either npx or a global npm installation.

## Method 1: Using npx

npx runs packages from a temporary cache without a permanent installation. To
"uninstall" the CLI, you must clear this cache, which will remove gemini-cli and
any other packages previously executed with npx.

The npx cache is a directory named `_npx` inside your main npm cache folder. You
can find your npm cache path by running `npm config get cache`.

**For macOS / Linux**

```bash
# The path is typically ~/.npm/_npx
rm -rf "$(npm config get cache)/_npx"
```

**For Windows (PowerShell)**

```powershell
# The path is typically $env:LocalAppData\npm-cache\_npx
Remove-Item -Path (Join-Path $env:LocalAppData "npm-cache\_npx") -Recurse -Force
```

## Method 2: Using npm (global install)

If you installed the CLI globally (for example,
`npm install -g @google/gemini-cli`), use the `npm uninstall` command with the
`-g` flag to remove it.

```bash
npm uninstall -g @google/gemini-cli
```

This command completely removes the package from your system.

## Method 3: Homebrew

If you installed the CLI globally using Homebrew (for example,
`brew install gemini-cli`), use the `brew uninstall` command to remove it.

```bash
brew uninstall gemini-cli
```

## Method 4: MacPorts

If you installed the CLI globally using MacPorts (for example,
`sudo port install gemini-cli`), use the `port uninstall` command to remove it.

```bash
sudo port uninstall gemini-cli
```
