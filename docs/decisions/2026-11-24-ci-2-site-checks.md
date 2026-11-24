| Date | Decision | What and why |
|---|---|---|
| 2026-11-24 | CI checks on every PR and push to `main` | `.github/workflows/checks.yml`: html-validate (structural rules only, `.htmlvalidate.json`), local link check (`scripts/check-links.mjs`), conflict-marker check. Strict presets (a11y, SRI) skipped: hundreds of legacy findings, not stability-critical. Approved by owner (stage 1 plan). |
| 2026-11-24 | Link check maps `/TriScreen/...` to repo root | GitHub Pages project base path used by the EntroLog bundle. |
