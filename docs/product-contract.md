# Product Contract

## Product Intent
Build an original NBTI entertainment quiz that feels sharp, meme-forward, and screenshot-friendly for friend-to-friend sharing.

## Locked Decisions
- Brand name: `NBTI`
- Tech stack: pure static HTML/CSS/JS with Vite
- Persistence: localStorage
- Routing: hash routes
- Share strategy: screenshot-first poster region plus clipboard share text
- Backend: not allowed in v1

## Flow
`landing -> quiz -> result poster -> detailed interpretation -> dimension breakdown -> disclaimer -> restart`

## v1 Scope
Included:
- static app shell
- quiz rendering
- deterministic scoring
- result page
- restart flow
- clipboard share text
- mobile-friendly poster region
- automated unit and e2e coverage

Excluded:
- accounts
- databases
- admin panel or CMS
- server-side OG image generation
- leaderboards
- compatibility graphs
- analytics dashboard

## Tone Rules
Allowed:
- roast-heavy humor
- self-aware exaggeration
- social-media-friendly punchlines
- playful insults that stay in the realm of entertainment

Blocked:
- protected-class attacks
- slurs
- self-harm or violence prompts
- diagnosis-style language
- humiliating language that makes result sharing socially unsafe

## Originality Rules
- The public reference site may inspire interaction rhythm only.
- Do not reuse or lightly paraphrase its question text, type names, labels, or disclaimer copy.
- Do not mimic distinctive visual assets or poster layouts closely enough to look derivative.

## Data Contract Targets
- Questions: 24
- Answers per question: 4
- Dimensions: 8
- Archetypes: 12

## Verification Requirements
- `npm run build` must produce static assets only.
- `npm test` must validate core contracts.
- `npm run test:e2e` must verify landing, route change, and shell flow.
