---
paths:
  - "*.html"
---
# Site (HTML pages) rules
- `index.html` is huge: locate with Grep, edit with targeted Edit; never rewrite whole.
- Do not change localStorage keys or stored data shape without owner approval (users lose history).
- Clinical scales: never alter item wording, scoring or cut-offs without a source reference in the decision file.
- New page → link from `index.html` nav and add to the link check.
- Every user-visible change → entry in `updates.html` and README changelog.
- Test on mobile width (375 px) and desktop.
