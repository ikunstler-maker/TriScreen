# Tests, results, history
Source: audit 2026-11-24 (blocks А–Г). Block А = TEST-1.
## Next by plan
1. ~~TEST-1 — Drive history safety (block А)~~ — done
2. Block Б — answers loss during a test (needs owner approval: draft storage = new localStorage data)
   - Reload / tab close / Back loses all answers; no `beforeunload`, no history/hash per tab (`switchTab`)
   - Footer links (policy/terms/updates) open in same tab → answers lost on return via «На головну»
   - «Очистити результати» (`resetForm`) and «Очистити тест» without confirmation
   - PCL-5 Criterion A «Ні» silently deletes entered answers
   - «Відкрити з історії» (`exportHistoryDay`): resets unsaved answers without prompt; sets date input to "YYYY-MM-DD HH:MM" (invalid → «Не вказано»); АУДИТ not restored; TMCQ saved as P-subscale only
   - `clearTest('tmcq')` does not reset `tmcqServices`
3. Block В — misleading results and texts
   - Untaken/incomplete tests show «Мінімальний / симптоми відсутні», PCL-5 «не підтверджено»; DES-II divides by 28 regardless of answered count; PHQ-9 difficulty pre-answered
   - Privacy policy: diaries' localStorage not mentioned; non-existent "Google session flag"; Google scripts + 2 Google Forms iframes load on every visit (not "only with consent"); Web Speech API in journal not disclosed; footer «нікуди не передаються»
   - Assessment date is UTC date + local time (wrong around midnight)
   - History opens with empty charts (filter «Усі опитування» matches no test); АУДИТ chart Y labels check 'AUDIT'
   - TMCQ card says «26 питань», counter is 33
4. Block Г — resilience and usability
   - Tailwind runtime CDN only: unstyled page with all sections visible if blocked; slow CDN/Google/Chart.js blocks first paint (sync scripts) → ship prebuilt CSS, defer scripts, self-host Chart.js (unpinned) and logo/QR
   - Keyboard: `div role=button` cards (18) not activatable; focus lost after each answer (form re-render); modals: no role=dialog, focus trap, Esc/backdrop only for one
   - Mobile: answer text 12 px, small tap targets (clear test, modal close, DES-II 40 px), title under sticky header (`scroll-mt-20`), history row buttons off-screen at 375 px
   - Contrast: white on sky-500 2.77:1; lime-600 tab; slate-400 icons; dark theme forced on first visit
   - No «Наступне опитування» after a test; AUDIT missing in top progress list
   - Emotion journal: no edit, no backup/import, insertion order not date, long URLs cut, non-array storage breaks page, two tabs overwrite, quota error silent
   - EntroLog (frozen bundle, ENTRO-1): no date on entries, delete without confirm, «ти» tone, OS-based dark mode, blank app on corrupted `energyJournal`
   - Crisis hotlines not `tel:` links; subpages miss favicon/meta; two h1 on subpages
## Known gaps / follow-ups
- Google sign-in does not survive reload (token kept in memory only, by design)
- Drive has no conditional writes: two devices saving within the same ~1 s window can still lose one write (TEST-1 verifies and retries, rare)
