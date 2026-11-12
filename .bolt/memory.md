# Project memory

## Product intent & audience

- Room-based checking/evaluation application: a "checker" evaluates exactly one room per check (domain concept, not a single-room app).
- App is local-only; no external deployments or publishing.

## Brand personality & voice

- Governance/docs tone is precise and constrained; edits are expected to be surgical and verbatim where approved.

## Visual design & UX direction

- Inferred from framework + prompt: Vite + React + Tailwind CSS + Lucide React icons; `@/` alias maps to `src/`. No UI/theme/icon packages beyond these unless explicitly requested.

## Decisions, constraints & rationale

- `AGENTS.md` is a governance file with at least **Constraints** and **Verification** sections.
  - Constraints include: no secrets/API keys/credentials in code, fixtures, or docs; app runs locally only.
  - Verification includes: all tests must pass before proposing acceptance; failing or untested changes are not proposals.
- "One room" means one room evaluated per check, not a single-room application. `AGENTS.md` already reflects this with "one room checked at a time."
- Edits to governed docs should be minimal and verbatim when approved; do not change unrelated content.
- `README.md` still contains placeholders flagged earlier; not yet addressed.

## Open questions & assumptions

- README placeholders: still need resolution or intentional replacement.
- No further details yet on room data model, check logic, or UI screens — to be inferred as work progresses.
- `.bolt/prompt` contains authoritative global instructions for design quality and stack conventions; not restated here.