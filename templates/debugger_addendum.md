# DEBUGGER ADDENDUM TEMPLATE v1.0.0

**CRITICAL:** Morpheus (ANT-DEBUGGER) is DIAGNOSTIC ONLY. This template produces fix INSTRUCTIONS, not code.

---

```markdown
# DEBUGGER ADDENDUM (DIAGNOSTIC ONLY — NO CODE EDITS)

debug_id: DBG-<parent_ant_id>-<seq>
parent_ant_id: <ANT-XXX>
parent_task_id: <string>
run_id: run_<CLIENT>_<slug>_<YYYY-MM-DD>_<seq>
target_name: "IAMBECCA | <CLIENT_ID> | <PROJECT_TYPE> | <PROJECT_SLUG> | <MATRIX_CODENAME>"

trigger_reason: <string - why debugger was called>

---

## DIAGNOSTIC SUMMARY

<2-3 sentence summary of the diagnosis>

---

## ROOT CAUSE HYPOTHESIS

| Attribute | Value |
|-----------|-------|
| Category | <bug type: logic / config / dependency / type / runtime / etc.> |
| Location | <file:line> |
| Confidence | HIGH / MEDIUM / LOW |
| Evidence | <what confirms this hypothesis> |

---

## ROOT CAUSE ANALYSIS

- <point 1 - what was examined>
- <point 2 - what was found>
- <point 3 - why this is the root cause>

---

## FIX INSTRUCTIONS FOR ANT (NOT CODE — STEPS ONLY)

The halted Ant should:

1. <step 1 - specific action>
2. <step 2 - specific action>
3. <step 3 - specific action>

**Important:** These are INSTRUCTIONS. The Ant applies them as code.

---

## VERIFICATION STEPS

After applying the fix, verify:

1. <verification 1 - command or check>
2. <verification 2 - expected result>
3. <verification 3 - edge case check>

---

## EVIDENCE EXAMINED

| Source | Path | Relevant Finding |
|--------|------|------------------|
| Halt packet | <path> | <what it showed> |
| Error log | <path or inline> | <error message> |
| Source file | <file:line> | <relevant code> |
| Config file | <path> | <config issue> |

---

## RISKS / UNKNOWNS

- <any uncertainty in diagnosis>
- <potential side effects of fix>
- <areas needing verification>

---

## STATUS

status: <return_to_ant | escalated_to_horsemen>
extracted_to: <filled by Ghost Twins during REVIEW>

---

## NEXT

Packet written to: inbox/bq/PKT_<...>_REACTIVATE_ANT.md
Next action: Trinity creates REACTIVATE_ANT packet for halted Ant
BACKUP_GATE required: YES (before reattempt)
```

---

## DEBUGGER DOCTRINE REMINDER

| Rule | Enforcement |
|------|-------------|
| Morpheus produces INSTRUCTIONS, not code | Fix instructions are steps, not patches |
| Morpheus reactivates the halted Ant | REACTIVATE_ANT packet to Trinity |
| Sentinels only after failed reattempt | Cannot escalate directly from diagnosis |
| BACKUP_GATE required | Must pass before Ant reattempts |

---

## EXAMPLE: Complete Debugger Addendum

```markdown
# DEBUGGER ADDENDUM (DIAGNOSTIC ONLY — NO CODE EDITS)

debug_id: DBG-ANT-001-001
parent_ant_id: ANT-001
parent_task_id: task_hero_section
run_id: run_C023_fitness-vsl_2026-02-02_001
target_name: "IAMBECCA | C023 | LANDING | fitness-vsl | ORACLE"

trigger_reason: "TypeScript compilation error - cannot resolve module @/design/tokens"

---

## DIAGNOSTIC SUMMARY

The halted Ant (Neo/ANT-CODER) encountered a module resolution error because the design tokens module does not exist. The tsconfig paths are correctly configured, but the target file was never created during project setup.

---

## ROOT CAUSE HYPOTHESIS

| Attribute | Value |
|-----------|-------|
| Category | dependency / missing file |
| Location | frontend/src/design/tokens.ts (missing) |
| Confidence | HIGH |
| Evidence | `ls frontend/src/design/` returns empty or no such directory |

---

## ROOT CAUSE ANALYSIS

- Examined tsconfig.json: `@/design/*` path alias is correctly configured to `./src/design/*`
- Examined frontend/src/: No `design/` directory exists
- The error `TS2307: Cannot find module '@/design/tokens'` confirms the module simply doesn't exist
- This is a setup gap, not a code bug

---

## FIX INSTRUCTIONS FOR ANT (NOT CODE — STEPS ONLY)

The halted Ant (Neo) should:

1. Create the directory `frontend/src/design/`
2. Create the file `frontend/src/design/tokens.ts`
3. Export the design tokens that HeroSection needs (colors, spacing, typography)
4. Ensure the exports match what HeroSection.tsx is trying to import
5. Run `npm run build` to verify the module resolves

**Important:** These are INSTRUCTIONS. Neo applies them as code.

---

## VERIFICATION STEPS

After applying the fix, verify:

1. `ls frontend/src/design/tokens.ts` - file exists
2. `npm run build` - no TS2307 errors
3. Import statement in HeroSection.tsx resolves without error
4. Component renders in dev mode

---

## EVIDENCE EXAMINED

| Source | Path | Relevant Finding |
|--------|------|------------------|
| Halt packet | inbox/bq/PKT_..._HALT.md | TS2307 error on import |
| Error log | (inline in halt) | `Cannot find module '@/design/tokens'` |
| tsconfig.json | frontend/tsconfig.json:15 | Paths configured correctly |
| Source dir | frontend/src/ | No design/ directory |

---

## RISKS / UNKNOWNS

- Unknown: What specific tokens HeroSection needs (colors, spacing, etc.)
- Risk: If tokens don't match component expectations, may need iteration
- Mitigation: Ant should examine HeroSection imports to determine exact needs

---

## STATUS

status: return_to_ant
extracted_to: (pending Ghost extraction)

---

## NEXT

Packet written to: inbox/bq/PKT_C023_fitness-vsl_ANT-DEBUGGER_to_BQ_020.md
Next action: Trinity creates REACTIVATE_ANT packet for ANT-001
BACKUP_GATE required: YES (before reattempt)
```

---

## WHAT MORPHEUS DOES NOT DO

| Forbidden Action | Why |
|------------------|-----|
| Write code | Morpheus diagnoses, Ant implements |
| Create patches | Instructions only, not diffs |
| Edit files | Read-only analysis |
| Skip to Sentinels | Must go through reattempt first |
| Bypass backup gate | Safety gate is mandatory |
