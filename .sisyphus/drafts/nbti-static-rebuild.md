# Draft: NBTI Static Rebuild

## Requirements (confirmed)
- Source baseline: only the public website URL is available; no repository or local source code.
- Rebuild scope: greenfield reconstruction, not minor edits.
- Tone: fully preserve spicy, joking, attack-heavy entertainment style.
- Product goal: optimize for friend-to-friend sharing.
- Delivery format: pure static HTML/CSS/JS.
- Naming: use NBTI instead of SBTI.
- Worldbuilding: original site may be used only as inspiration; personalities should be expanded and rewritten.
- Scope shape: preserve the broad quiz framework while rewriting content system.
- Project architecture: must stay clear, layered, and easy to extend.
- Project memory: must include a project-specific memory file/configuration path.

## Technical Decisions
- Project type: greenfield static-site implementation with no backend in v1.
- Reference boundary: use the deployed site only as behavioral inspiration; do not reuse text, art, labels, or taxonomy verbatim.
- Share strategy default: screenshot-first result poster plus copyable result text, no server-side OG generation in v1.
- Flow default: landing -> quiz -> result poster -> detailed interpretation -> dimension breakdown -> disclaimer/restart.
- Architecture default: separate `content`, `domain/scoring`, `ui`, `state`, and `share` modules.
- Memory default: include `.memory/memory.json` or equivalent documented project memory location in the new project root and describe how it is maintained.

## Research Findings
- Public site includes a landing page, gated 31-question flow, result page, main type, match percentage, system remark, interpretation block, fifteen-dimension scores, and entertainment disclaimer.
- The tone is comedic, roasting, and intentionally provocative.
- The site appears compatible with a static SPA-style client implementation.

## Open Questions
- None blocking for plan generation; unresolved product preferences are being fixed via defaults in the plan.

## Scope Boundaries
- INCLUDE: public-site reverse analysis, NBTI taxonomy redesign, static frontend rebuild, shareable result output, deterministic scoring model, project memory setup, clean architecture, agent-executed QA.
- EXCLUDE: backend services, analytics dashboards, user accounts, CMS, dynamic server-side image generation, compatibility matrix, social graph features.
