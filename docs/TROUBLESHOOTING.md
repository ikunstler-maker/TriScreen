# Troubleshooting
Format per entry: title — area; Symptom; Root cause; Fix; Verify; Seen (YYYY-MM-DD).



## Running checks locally — CI
- Symptom: need to reproduce CI `checks` job
- Fix: `npx html-validate@8 -f text $(ls *.html | grep -v '^google') entrolog/index.html` and `node scripts/check-links.mjs <same files>`
- Verify: both exit 0
- Seen: 2026-11-24
