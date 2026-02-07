# ORACLE-REF-ALIGNMENT-GATE v1.0.0
## Alignment Verification Gate

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Verify work matches roadmap before spawning next Trinity (BQ)
**Source:** MASTER_QUEEN_VSCODE_v1.0.6

---

## When to Use

Load this module when:
- Inspection Mode passes
- Before spawning next Trinity (BQ)
- Checking if project is on track

Say: `LOAD: ORACLE-REF-ALIGNMENT-GATE`

---

## Why This Gate Exists

```
┌─────────────────────────────────────────────────────────────────┐
│  THE ALIGNMENT PROBLEM                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Without verification, BQ-1's work might:                       │
│  • Create schemas that don't match PH3's expected inputs        │
│  • Build components that PH4 can't integrate with               │
│  • Make assumptions that conflict with PH5's requirements       │
│  • Drift from the original project objective                    │
│                                                                 │
│  ❌ Result: Future phases blocked or require rework             │
│                                                                 │
│  With verification:                                             │
│  ✅ Each BQ's work is validated against future phases           │
│  ✅ Drift is caught immediately, not 3 BQs later                │
│  ✅ Project stays on track toward success criteria              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Alignment Verification Checklist

After Inspection Mode PASSES, run this checklist before spawning the next BQ:

```
ALIGNMENT VERIFICATION: BQ-{N} → BQ-{N+1}
═══════════════════════════════════════════

PROJECT: {project.title}
COMPLETED: PH{X} by BQ-{N}
NEXT UP: PH{Y} (or continue PH{X})

A) DELIVERABLES CHECK
─────────────────────
Review what BQ-{N} delivered against the roadmap:

| Deliverable | Expected (from roadmap) | Actual (from reports) | Match? |
|-------------|------------------------|----------------------|--------|
| {item 1} | {roadmap spec} | {what was built} | ✅/❌ |
| {item 2} | {roadmap spec} | {what was built} | ✅/❌ |

[ ] All expected deliverables completed
[ ] No unexpected additions (scope creep)
[ ] No missing pieces that block future phases

B) DEPENDENCY CHAIN CHECK
─────────────────────────
Verify future phases can still proceed:

| Future Phase | Depends On | Status |
|--------------|------------|--------|
| PH{Y} | {dependency from PH{X}} | ✅ Satisfied / ❌ Blocked / ⚠️ Modified |
| PH{Z} | {dependency from PH{X}} | ✅ Satisfied / ❌ Blocked / ⚠️ Modified |

[ ] No future phases blocked by this work
[ ] Dependencies documented in pheromones

C) INTERFACE CONTRACT CHECK
───────────────────────────
Verify APIs, schemas, and contracts match roadmap expectations:

| Contract | Roadmap Spec | Implemented | Compatible? |
|----------|--------------|-------------|-------------|
| {schema/API} | {expected shape} | {actual shape} | ✅/❌ |

[ ] All interfaces match expected contracts
[ ] No breaking changes to shared surfaces
[ ] Future phases can consume these outputs

D) SUCCESS CRITERIA PROGRESS
────────────────────────────
Check progress toward project success criteria:

| Success Criterion | Progress | On Track? |
|-------------------|----------|-----------|
| {criterion 1} | {X}% | ✅/⚠️/❌ |
| {criterion 2} | {X}% | ✅/⚠️/❌ |

[ ] Project still on track for success criteria
[ ] No work that contradicts success criteria

E) DRIFT DETECTION
──────────────────
Look for signs the project is drifting:

[ ] No unplanned features added
[ ] No planned features removed without approval
[ ] Architecture still matches roadmap design
[ ] No "temporary hacks" that will block future work

F) ALIGNMENT VERDICT
────────────────────
[ ] ✅ ALIGNED — Ready to spawn next BQ
[ ] ⚠️ MINOR_DRIFT — Document deviation, spawn with caution
[ ] ❌ MISALIGNED — STOP, repair before continuing

If MISALIGNED:
- Document the drift
- Create repair ticket
- Decide: Fix now or adjust roadmap?
- Get Guardian approval if roadmap changes needed
```

---

## Alignment Gate Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  ORACLE BQ CYCLE (With Alignment Gate)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. SPAWN BQ-1 for PH{X}                                        │
│        ↓                                                        │
│  2. BQ-1 completes (5 Ants finish)                              │
│        ↓                                                        │
│  3. INSPECTION MODE → Verify protocol compliance                │
│        ↓                                                        │
│  4. ⭐ ALIGNMENT VERIFICATION → Verify work matches roadmap     │
│        ↓                                                        │
│     ┌─────────────────────────────────────────────────┐         │
│     │ ALIGNED?                                        │         │
│     │   ✅ Yes → Proceed to step 5                    │         │
│     │   ⚠️ Minor drift → Document, proceed cautiously │         │
│     │   ❌ Misaligned → STOP, repair, re-verify       │         │
│     └─────────────────────────────────────────────────┘         │
│        ↓                                                        │
│  5. SPAWN BQ-2 for PH{Y} (or continue PH{X})                    │
│        ↓                                                        │
│  6. Repeat steps 2-5 until 5 BQs complete                       │
│        ↓                                                        │
│  7. FILE SESSION REPORT → Handoff to successor                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## What To Do When Misaligned

| Situation | Action |
|-----------|--------|
| **Minor interface mismatch** | Document in pheromones, adjust next BQ's tasks to accommodate |
| **Missing deliverable** | Create repair task for next BQ before continuing |
| **Scope creep detected** | Review with Guardian — keep or revert the extra work? |
| **Blocking dependency** | STOP — cannot spawn next BQ until resolved |
| **Architecture drift** | STOP — get Guardian decision on roadmap adjustment |
| **Success criteria at risk** | STOP — escalate to Guardian for project review |

---

## Alignment Pheromones

When documenting drift or alignment issues, emit these pheromones:

| Tag | Severity | When to Emit |
|-----|----------|--------------|
| `ROADMAP_DRIFT` | 🟠 HIGH_RISK | Work deviates from roadmap spec |
| `DEPENDENCY_BLOCKED` | 🔴 CRITICAL | Future phase cannot proceed |
| `CONTRACT_CHANGED` | 🟠 HIGH_RISK | Interface differs from spec |
| `SCOPE_CREEP` | 🟡 MEDIUM | Unplanned features added |
| `ON_TRACK` | 🟢 INFO | Alignment verified, proceeding |

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  ORACLE-REF-ALIGNMENT-GATE v1.0.0                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  WHEN: After Inspection Mode passes, before spawning next BQ    │
│                                                                 │
│  CHECKLIST SECTIONS:                                            │
│  A) Deliverables check                                          │
│  B) Dependency chain check                                      │
│  C) Interface contract check                                    │
│  D) Success criteria progress                                   │
│  E) Drift detection                                             │
│  F) Alignment verdict                                           │
│                                                                 │
│  VERDICTS:                                                      │
│  • ✅ ALIGNED — Spawn next BQ                                   │
│  • ⚠️ MINOR_DRIFT — Document, proceed cautiously                │
│  • ❌ MISALIGNED — STOP, repair before continuing               │
│                                                                 │
│  PHEROMONES:                                                    │
│  • ROADMAP_DRIFT (🟠)                                           │
│  • DEPENDENCY_BLOCKED (🔴)                                      │
│  • CONTRACT_CHANGED (🟠)                                        │
│  • SCOPE_CREEP (🟡)                                             │
│  • ON_TRACK (🟢)                                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from MASTER_QUEEN_VSCODE_v1.0.6
- Full alignment verification checklist
