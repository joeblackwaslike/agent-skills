---
title: Linux
description: Installing the Dolt binary on Linux.
source: "https://www.dolthub.com/docs/introduction/installation/linux.md"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "050af858138a37a5333f659e9ca5d2a5ce7b0b2ddaab28cd1eeeb9832ade09d9"
---


For Linux users we provide an installation script that will detect your architecture, download the appropriate binary, and place in `/usr/local/bin`:

```text
sudo bash -c 'curl -L https://github.com/dolthub/dolt/releases/latest/download/install.sh | sudo bash'
```

The use of `sudo` is required to ensure the binary lands in your path. The script can be examined before executing should you have any concerns.
