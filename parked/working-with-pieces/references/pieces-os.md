---
name: pieces-os
description: Pieces OS installation, processes, launchd services, port discovery, service management, and system requirements
---

# Pieces OS

Pieces OS is the local background daemon that powers the entire Pieces ecosystem. It runs as a headless process (no dock icon), manages all ML models, serves the REST API and MCP server, and orchestrates LTM capture.

## Installation

### macOS

Download the DMG or PKG from https://docs.pieces.app/products/desktop/download. Running the installer installs both Pieces OS and the Pieces Desktop app.

```bash
# Verify Pieces OS is running
curl http://localhost:$(cat ~/Library/com.pieces.os/production/Config/.port.txt)/.well-known/health
# → ok:<uuid>

curl http://localhost:$(cat ~/Library/com.pieces.os/production/Config/.port.txt)/.well-known/version
# → 12.4.1  (current version as of June 2026)
```

### Windows

```powershell
winget install Pieces
# or download AppInstaller/EXE from docs.pieces.app
```

### Linux (Ubuntu 22+)

```bash
sudo apt install snapd          # enable snap if needed
sudo snap install pieces-os
```

Requirements: Ubuntu 22+, snapd enabled.

## Three Running Processes

Pieces runs three processes on macOS:

| Process | Binary | Role |
|---------|--------|------|
| **Pieces OS** | `/Applications/Pieces OS.app/Contents/MacOS/Pieces OS` | Backend daemon; REST API, MCP server, LTM engine, ML inference |
| **Pieces Desktop** | `/Applications/Pieces.app/Contents/MacOS/Pieces` | UI client; Timeline, Copilot chat, settings |
| **Pieces Babysitter** | `python3 ~/.local/bin/pieces_babysitter.py` | Watchdog; health checks every 10s, restarts on crash |

Pieces OS sets `LSUIElement=true` (no Dock icon) and `LSMultipleInstancesProhibited=true`.

Check running processes:

```bash
ps aux | grep -i "pieces" | grep -v grep
```

## Three launchd Services (macOS)

| Service | Purpose | Keep Alive |
|---------|---------|-----------|
| `com.pieces.os.launch` | Launches Pieces OS at login via `open -W` | No |
| `com.pieces.babysitter` | Watchdog — restarts OS if it crashes; probes health every 10s | Yes |
| `com.pieces.metrics` | Collects process metrics to `~/Library/Logs/PiecesOS/metrics.db` | Yes |

```bash
# Check status
launchctl list | grep pieces

# Restart Pieces OS via launchctl
launchctl kickstart -k gui/$(id -u)/com.pieces.os.launch

# Or via the REST API (preferred)
curl -X POST "http://localhost:$(cat ~/Library/com.pieces.os/production/Config/.port.txt)/os/restart"
```

**Babysitter details**: probes `/.well-known/health` every 10 seconds; on failure escalates: `/os/restart` → SIGTERM → SIGKILL; 5-attempt limit before giving up; resets counter after 10 clean minutes; kills stale instances before launching fresh copy.

## Port Discovery

Pieces OS picks an available port from the range **39300–39333** at startup and writes it to:

```
~/Library/com.pieces.os/production/Config/.port.txt
```

Always read the port dynamically — do not hardcode 39300:

```bash
PORT=$(cat ~/Library/com.pieces.os/production/Config/.port.txt)
echo "Pieces OS running on port $PORT"
curl http://localhost:${PORT}/.well-known/health
```

The REST API (for SDK use) is a separate fixed port:
- macOS/Windows: `localhost:1000`
- Linux: `localhost:5323`

## Service Management

```bash
# macOS — restart via API
curl -X POST http://localhost:$(cat ~/Library/com.pieces.os/production/Config/.port.txt)/os/restart

# macOS — restart via launchctl
launchctl kickstart -k gui/$(id -u)/com.pieces.os.launch

# Linux — snap
sudo snap restart pieces-os
sudo snap refresh pieces-os        # update

# Windows — Services (services.msc)
# or via Pieces OS Quick Menu in system tray
```

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| macOS | 12.0 Monterey | Latest |
| Windows | 10 v1809 | 11 |
| Linux | Ubuntu 22+ with snapd | Ubuntu 24 |
| CPU | 4 cores | 8 cores (for 13B models) |
| RAM | 12 GB free storage | 16 GB system RAM |
| GPU | Optional | 6 GB+ VRAM for faster inference |

**Installation constraint**: Do NOT install Pieces OS to OneDrive, iCloud Drive, or any cloud-synced folder. Use a local path — default location is always correct.

**Windows Controlled Folder Access**: If CFA is enabled, add the PiecesOS executable to the allowlist or disable CFA for the install directory.
