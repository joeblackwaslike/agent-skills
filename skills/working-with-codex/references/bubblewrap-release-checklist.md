---
source: "https://raw.githubusercontent.com/openai/codex/main/codex-rs/vendor/bubblewrap/release-checklist.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "99a43f1c07af118a61b399e2a4b40f43f8c4e231bc3cea394be1986cdf87869e"
---

bubblewrap release checklist
============================

* Collect release notes in `NEWS.md`
* Update version number in `meson.build` and release date in `NEWS.md`
* Commit the changes
* `meson dist -C ${builddir}`
* Do any final smoke-testing, e.g. update a package, install and test it
* `git evtag sign v$VERSION`
    * Include the release notes from `NEWS.md` in the tag message
* `git push --atomic origin main v$VERSION`
* https://github.com/containers/bubblewrap/releases/new
    * Fill in the new version's tag in the "Tag version" box
    * Title: `$VERSION`
    * Copy the release notes into the description
    * Upload the tarball that you built with `meson dist`
    * Get the `sha256sum` of the tarball and append it to the description
    * `Publish release`
