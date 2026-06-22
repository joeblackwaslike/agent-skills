---
source: "https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/app/e2e/performance/AGENTS.md"
fetched_at: "2026-06-22T05:59:46.710Z"
sha256: "f3139eb2927c5b6758955772ea1dd42ba9d5403b785f6e09b2c5cc858e73e0f1"
---

- Prioritize stability, then simplicity, then measurement overhead.
- Use Playwright for scenario control, isolation, and completion checks.
- Use Chrome Performance traces for generic browser profiling.
- Use Electron `contentTracing` for packaged multi-process profiling.
- Keep custom probes only for product-specific measurements.
- Do not duplicate measurements across the harness, probes, and traces.
- Run benchmarks serially to avoid cross-test contention.
- Run benchmarks against production builds.
- Keep detailed profiling opt-in when it changes workload behavior.
- Preserve raw diagnostic data or use lossless representations.
- Do not enforce machine-dependent performance thresholds.
- Assert scenario completion and metric collection only.
- Keep normal test discovery free of manual benchmarks.
