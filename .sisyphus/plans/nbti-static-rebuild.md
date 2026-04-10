# NBTI Static Rebuild

## Goal
Build an original static HTML/CSS/JS personality quiz site named NBTI, inspired only by the public behavior of https://sbti.unun.dev/, optimized for friend-to-friend sharing, with a clear modular architecture and project-specific memory file.

## Locked Decisions
- Pure static frontend with Vite vanilla JavaScript
- No backend in v1
- Brand: NBTI
- Tone: spicy, roast-heavy, but bounded by safety guardrails
- Share strategy: screenshot-first poster region + copy-result text
- Routing: hash-based
- Persistence: localStorage
- Structure: `content`, `domain`, `ui`, `share`, `storage`, `app`
- Project memory file required at `.memory/memory.json`

## Guardrails
- Do not copy source-site wording, labels, dimensions, archetype names, or assets.
- Do not add accounts, database features, CMS, analytics dashboards, or server-side image generation.
- Do not use diagnostic/clinical framing.
- Do not ship hateful, protected-class, or self-harm-oriented text.

## Phases
- [ ] 1. Scaffold the static project, `.memory`, and `.sisyphus` work state
- [ ] 2. Define product contract, originality rules, architecture rules, and memory maintenance rules
- [ ] 3. Create schemas for questions, dimensions, archetypes, scoring, and share payloads
- [ ] 4. Build original taxonomy for 12 archetypes and 8 dimensions
- [ ] 5. Add deterministic fixtures for all archetypes and edge cases
- [ ] 6. Implement app shell, hash routing, and local persistence
- [ ] 7. Implement quiz renderer, progress indicator, and completion gate
- [ ] 8. Implement deterministic scoring engine and result payload builder
- [ ] 9. Populate the original question bank and content linting rules
- [ ] 10. Build result screen, poster-safe region, and restart flow
- [ ] 11. Implement share copy flow and screenshot-friendly sharing UX
- [ ] 12. Apply visual identity, responsive polish, and accessibility hardening
- [ ] 13. Add deployment docs and project-operation docs
- [ ] 14. Finalize automated regression coverage
- [ ] 15. Run originality and tone audit
- [ ] 16. Execute launch verification and package v1 handoff

## Definition of Done
- `npm run build` emits static assets only.
- `npm test` passes schema and scoring checks.
- `npm run test:e2e` passes landing, quiz, result, share, persistence, and restart flows.
- The project contains `.memory/memory.json` and documents how it is maintained.
- The output is deployable to a static host without server logic.
