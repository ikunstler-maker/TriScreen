| Date | Decision | What and why |
|---|---|---|
| 2026-11-24 | Drive history: read-merge-write sync | Audit reproduced total history wipe (failed load + save PATCHed `[new]`), false "saved" message (save not awaited, 401 ignored), and two tabs/devices overwriting each other. Now every write re-reads the Drive file and applies only this tab's pending adds/deletes; writes are blocked while the load failed; success is shown only after the write succeeded. |
| 2026-11-24 | Drive file format unchanged | `triscreen_history.json` stays a plain JSON array of `{id, date, test, total, answers}`; no new localStorage keys, no stored tokens, no new network hosts. Old files load as before. |
| 2026-11-24 | Expired session keeps unsaved results | On 401 the token is dropped and the user is asked to sign in again; pending results stay in memory and are written after the next sign-in. Explicit sign-out with pending results asks for confirmation. |
| 2026-11-24 | Sign-in: `select_account`, no revoke on sign-out | Repeat sign-in no longer forces the full consent screen; account chooser stays (shared computers). Sign-out drops the token but does not revoke the app grant (user can revoke in Google account settings). Session still does not survive reload: persisting the token would be a separate risk. |
| 2026-11-24 | Delete confirmation, no duplicate saves | Deleting one entry asks for confirmation. Repeated "Зберегти в історію" with unchanged answers does not add entries again. |
| 2026-11-24 | History backup and restore | "Завантажити копію" downloads the history as JSON; "Відновити з файлу" adds strictly validated entries (whitelisted fields, known tests, size ≤5 MB), never deletes. History table output is HTML-escaped (crafted files/dates rendered as text). |

Owner: «Погоджую ризикову зміну. Починай в режимі оркестрації» (high-risk approval for user data, start delayed by 2 h at owner's request).
Source: audit 2026-11-24 (4 reviewer agents, findings re-checked against code).

| Date | Decision | What and why |
|---|---|---|
| 2026-11-24 | Strict answer validation for display/import | Reviewers found stored XSS via imported/Drive answers reaching TMCQ table. Answers loaded into forms or imported must be canonical item indices with that test's option values; invalid imported entries are rejected; Drive entries are never rewritten by this filter. |
| 2026-11-24 | Results after expired session go to a new account only with consent | Reviewer reproduced account A's PHQ-9 written into account B's Drive. Carried results are hidden and written only after a confirm on the next sign-in. |
| 2026-11-24 | Verified writes | After each write the file is re-read (~1 s later); missing changes are re-merged (max 3 attempts), otherwise a conflict message keeps them pending. Drive has no conditional writes, so an overwrite later than this window is still possible (rare). |
| 2026-11-24 | Removed unused `apis.google.com/js/api.js` | No code uses `gapi` after the rewrite; one third-party host fewer. |

Orchestration: implementer ×1, security reviewer ×1, quality reviewer ×1 (each re-verified after fixes).
