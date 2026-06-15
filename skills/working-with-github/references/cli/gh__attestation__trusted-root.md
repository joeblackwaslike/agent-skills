---
source: "gh attestation trusted-root --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "f4dbc333b54a43cfc81336bf35507e69fa3eba8e1a5d1dab9175af544807a5a1"
---

Output contents for a trusted_root.jsonl file, likely for offline verification.

When using `gh attestation verify`, if your machine is on the internet,
this will happen automatically. But to do offline verification, you need to
supply a trusted root file with `--custom-trusted-root`; this command
will help you fetch a `trusted_root.jsonl` file for that purpose.

You can call this command without any flags to get a trusted root file covering
the Sigstore Public Good Instance as well as GitHub's Sigstore instance.

Otherwise you can use `--tuf-url` to specify the URL of a custom TUF
repository mirror, and `--tuf-root` should be the path to the
`root.json` file that you securely obtained out-of-band.

If you just want to verify the integrity of your local TUF repository, and don't
want the contents of a trusted_root.jsonl file, use `--verify-only`.


USAGE
  gh attestation trusted-root [--tuf-url <url> --tuf-root <file-path>] [--verify-only] [flags]

FLAGS
  --hostname string   Configure host to use
  --tuf-root string   Path to the TUF root.json file on disk
  --tuf-url string    URL to the TUF repository mirror
  --verify-only       Don't output trusted_root.jsonl contents

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # Get a trusted_root.jsonl for both Sigstore Public Good and GitHub's instance
  $ gh attestation trusted-root

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

