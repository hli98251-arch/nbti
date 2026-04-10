# Architecture Rules

## Layer Ownership

### `src/app`
Owns bootstrap sequence, route changes, and page-level orchestration.

### `src/content`
Owns content data only. This layer should not include DOM logic or scoring behavior.

### `src/domain`
Owns validation, scoring, and result assembly as pure logic. Keep this layer independent from the browser DOM.

### `src/ui`
Owns screen rendering and event binding. It may call `app` and `domain` helpers, but should not redefine business rules.

### `src/share`
Owns clipboard copy and share text formatting.

### `src/storage`
Owns localStorage persistence and recovery logic.

## Conventions
- Use descriptive filenames and export names.
- Keep pure logic testable without browser rendering.
- Prefer small modules over large mixed-purpose files.
- Comments should explain intent, not repeat code.

## Memory Maintenance
Whenever these change, update `.memory/memory.json`:
- route model
- deployment target
- share strategy
- question count
- dimension count
- archetype count
- scoring tie-break rules

## Testing Strategy
- `tests/unit` for schema, scoring, and content validation
- `tests/e2e` for browser flows and layout-safe interactions
- Keep fixture-based expectations deterministic
