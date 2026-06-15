# Hosting Git Yourself

How Git works as a shared server without a forge — bare repos, the transport protocols, an SSH-based setup, and remote management. For most teams a hosted forge (GitHub/GitLab) is simpler; self-hosting earns its keep for air-gapped networks, CI build servers, or full control. See `working-with-github` for the hosted path.

## Bare repositories: the shared repo

A normal clone has a working tree plus a `.git` directory. A **bare** repo is just the `.git` contents with no working tree — nobody edits files in it; it exists purely to be pushed to and pulled from. That's exactly what a "central"/"shared" repo should be: pushing into a non-bare repo's checked-out branch causes confusing inconsistencies, which bare repos avoid by having no checkout.

```bash
# Create a fresh shared repo (the .git suffix is convention)
git init --bare /srv/git/project.git

# Or convert an existing project into one to seed the server
git clone --bare /path/to/project /srv/git/project.git
```

## Transport protocols

| Protocol            | Auth        | Read/Write | Notes                                                        |
| ------------------- | ----------- | ---------- | ------------------------------------------------------------ |
| **SSH** (`ssh://`, `user@host:path`) | SSH keys | read+write | The standard for authenticated self-hosting. Easy, secure.   |
| **HTTP(S) smart**   | configurable| read+write | Firewall-friendly, works behind proxies; needs a web server + `git-http-backend`. The forge default. |
| **Git** (`git://`)  | **none**    | read-only (by default) | Fast, anonymous, **unauthenticated** — anything served is public on its network. Port **9418**. |
| **Local** (`/path`, `file://`) | filesystem | read+write | Same machine or shared mount; good for a quick shared repo on an NFS share. |

Key point about `git://`: it has no authentication and no encryption. Use it only for read-only access to content you're fine being public within the network (e.g. a CI fleet pulling internal mirrors), never for writes or secrets.

## SSH-based server (the common self-host)

The minimal, robust setup: a dedicated `git` user whose access is controlled by `authorized_keys`.

```bash
# On the server: create the git user and its repo store
sudo adduser git
sudo mkdir -p /home/git/.ssh && sudo chmod 700 /home/git/.ssh
sudo touch /home/git/.ssh/authorized_keys && sudo chmod 600 /home/git/.ssh/authorized_keys

# Add each developer's PUBLIC key (one per line)
cat developer_id_ed25519.pub | sudo tee -a /home/git/.ssh/authorized_keys

# Create bare repos
sudo -u git git init --bare /home/git/repos/project.git
```

Developers then use the repo over SSH:

```bash
git clone git@server:repos/project.git
git remote add origin git@server:repos/project.git
git push origin main
```

Hardening: set the `git` user's shell to `git-shell` (`sudo chsh git -s $(which git-shell)`) so those keys can run Git operations but not get an interactive login. For per-repo access control at scale, layer Gitolite on top rather than hand-managing `authorized_keys`.

## `git daemon` (anonymous read-only)

For fast unauthenticated reads (a CI fleet, internal mirrors):

```bash
git daemon --reuseaddr --base-path=/srv/git/ /srv/git/
```

`--base-path` lets clients clone `git://host/project.git` without the full server path. Each repo must opt in by containing a `git-daemon-export-ok` file:

```bash
cd /srv/git/project.git && touch git-daemon-export-ok
```

Open port **9418** in the firewall. Daemonize it with a systemd unit (`ExecStart=/usr/bin/git daemon --reuseaddr --base-path=/srv/git/ /srv/git/`, run as the `git` user) so it restarts on boot.

## HTTP(S) smart protocol

Serve over HTTPS via `git-http-backend` (a CGI) behind Apache/Nginx. This is what forges expose; it's firewall- and proxy-friendly and supports auth via the web server. Setup is heavier than SSH (web server config, CGI wiring, auth) — only worth it when you specifically need HTTP transport. For most self-hosts, SSH is less work.

## Managing remotes

```bash
git remote -v                              # list remotes with their fetch/push URLs
git remote add origin git@server:repo.git  # add a remote
git remote rename origin upstream          # rename
git remote remove upstream                 # delete
git remote set-url origin git@new:repo.git # change the URL

# Separate push URL from fetch URL, or push to multiple mirrors at once:
git remote set-url --push origin git@primary:repo.git
git remote set-url --add --push origin git@mirror1:repo.git
git remote set-url --add --push origin git@mirror2:repo.git
```

Multiple remotes are normal: e.g. `origin` (your fork) + `upstream` (the source) in a fork workflow; or one remote with several push URLs to mirror every push to backup hosts.

## Server-side hooks

A bare repo can run hooks in its `hooks/` directory to enforce policy or trigger automation on incoming pushes:

- **`pre-receive`** — runs once for the whole push *before* any ref updates; exit non-zero to reject the entire push (enforce commit policy, run checks).
- **`update`** — runs once *per ref* being updated; can reject individual branch updates.
- **`post-receive`** — runs *after* all refs update; use for notifications, CI triggers, deploys.

Full hook semantics, arguments, and the complete list are in `references/cli/githooks.adoc`.

## Web viewing and the simpler path

`gitweb` is Git's built-in lightweight CGI for browsing repos in a browser; `git instaweb` spins it up instantly for local use. Heavier self-hosted forges (GitLab, Gitea) add issues, PRs, and access control. But for the vast majority of teams, a hosted forge is less operational burden than running and securing your own server — reach for self-hosting only when you have a concrete reason. Cross-reference `working-with-github` for that route.
