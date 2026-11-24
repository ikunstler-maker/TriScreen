| Date | Decision | What and why |
|---|---|---|
| 2026-11-24 | EntroLog links → `entrolog/` | `index.html` linked to non-existent `entrolog.html` (3 places); EntroLog was unreachable from the site. |
| 2026-11-24 | Remove dead duplicate progress bar | Second `#top-progress-container`/`#top-progress-bar` in nav was never updated by JS (`getElementById` returns the first). Removal keeps current visible behavior. |
