---
source: "gh release upload --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "471143de98fcb1ec2df9a71b5c3a5570f23fe3920b512a167c3ffbc41539a822"
---

Upload asset files to a GitHub Release.

To define a display label for an asset, append text starting with `#` after the
file name.

When using `--clobber`, existing assets are deleted before new assets are uploaded.
If the upload fails, the original assets will be lost.


USAGE
  gh release upload <tag> <files>... [flags]

FLAGS
  --clobber   Delete and re-upload existing assets of the same name

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

