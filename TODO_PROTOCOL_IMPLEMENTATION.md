# TODO: IAMBECCA-PROTOCOL.md Implementation

**Created:** 2026-02-07
**Purpose:** Crash-recovery document for implementing governance token protocol across IAMBecca
**Context:** IAMBecca ant roles (IM-05 through IM-12) are missing the enforcement backbone that ColonyOS uses to make 100K ants coordinate without breaking each other's work.

---

## QUICK RESUME (read this after crash)

**WHAT I'M DOING:** Implementing IAMBECCA-PROTOCOL.md — the unified enforcement backbone that ties gate progression, permission levels, truthy diffs, backup law, and report-to-index contracts into one shared module loaded by all IM roles.

**NEXT ACTION:** ALL STEPS COMPLETE. Implementation done.

**BLOCKERS:** None
**STATUS:** ✅ COMPLETE (2026-02-07)

---

## ROOT CAUSE

The Level 0-3 permission hierarchy exists in `prompt/pmx/shared/permissions/PMX-SHARED-PERMISSIONS_v1.0.0.md` but NO IM role loads it. The gate progression, truthy diffs, and backup law exist in ColonyOS CLAUDE.md but have no equivalent shared module in IAMBecca. Without these, ants can skip D0 scans, make rogue changes, and file incomplete reports — breaking the hivemind loop.

## THE HIVEMIND LOOP (Why This Matters)

```
ANT D0 SCAN ←──── GHOST INDEX ←──── GHOST ARCHIVIST ←──── COMPLETION REPORT ←──── GATE PROGRESSION
     │                                                                                    │
     └────────────────────────────────────────────────────────────────────────────────────┘
```

Gates force complete reports → reports feed Ghost Index → Ghost Index feeds next ant's D0 → cycle repeats at 100K scale.

---

## IMPLEMENTATION STEPS

### Step 1: Create `shared/IAMBECCA-PROTOCOL.md`
- ✅ Create the file with 7 sections:
  - Section 1: Gate Progression (D0→D1→D2→D3→D4→REPORT)
  - Section 2: Permission Levels (Level 0-3, ported from PMX-SHARED-PERMISSIONS)
  - Section 3: Truthy Diffs Protocol (7-step commit safety, from ColonyOS)
  - Section 4: Backup Law (git checkpoint + desktop backup)
  - Section 5: Report-to-Index Contract (hivemind glue)
  - Section 6: Token Authenticity Rules
  - Section 7: Quick Reference

### Step 2: Update ALL IM role shared modules lists
- ✅ IM-05 NEO (ANT-CODER) — added IAMBECCA-PROTOCOL.md to shared modules
- ✅ IM-06 MORPHEUS (ANT-DEBUGGER) — added IAMBECCA-PROTOCOL.md
- ✅ IM-07 TANK (ANT-TEST) — added IAMBECCA-PROTOCOL.md
- ✅ IM-08 SERAPH (ANT-SECURITY) — added IAMBECCA-PROTOCOL.md
- ✅ IM-09 LINK (ANT-INFRA) — added IAMBECCA-PROTOCOL.md
- ✅ IM-10 NIOBE (ANT-UI) — added IAMBECCA-PROTOCOL.md
- ✅ IM-11 APOC (ANT-DATA) — added IAMBECCA-PROTOCOL.md
- ✅ IM-12 GHOST TWINS (ANT-REVIEW) — added IAMBECCA-PROTOCOL.md

### Step 3: Check for non-ANT roles that also need it
- ✅ IM-01 BECCA — added IAMBECCA-PROTOCOL.md
- ✅ IM-02 ORACLE — added IAMBECCA-PROTOCOL.md
- ✅ IM-03 TRINITY — added IAMBECCA-PROTOCOL.md
- ✅ IM-04 TRAINMAN — added IAMBECCA-PROTOCOL.md
- ✅ IM-13 SENTINELS — added IAMBECCA-PROTOCOL.md

### Step 4: Update IAMBECCA-GATES.md
- ✅ Added cross-reference in Section 4 (Approval Token Pattern) for sub-gates within IMPLEMENT
- ✅ Added PROTOCOL to Section 11.1 shared modules list (position 7)
- ✅ Added PROTOCOL + IMPLEMENT SUB-GATES to Section 10 Quick Reference
- ✅ Updated version to v1.6.0 with changelog entry

### Step 5: Update IAMBECCA-OUTPUTS.md
- ✅ Added Section 2.4.1.1 IMPLEMENT Sub-Gate Tracking (D0→D1→D2→D3→D4→REPORT)
- ✅ Added Gate Log template to ANT_REPORT (intermediate token trail)
- ✅ Added Pheromones Emitted table to Section 6 (feeds PHEROMONE_REGISTRY)
- ✅ Added D0 Pheromone Scan section (pre-discovery Ghost Index scan)
- ✅ Added Horsemen Self-Attestation (H1-H5) to Section 7 Self-Assessment
- ✅ Added Truthy Diff Checklist to Section 7 (required if commits made)
- ✅ Added Report-to-Index cross-reference in Section 8 Handoff
- ✅ Updated version to v1.5.0 with changelog entry

### Step 6: Verify consistency
- ✅ Token names in PROTOCOL match Trinity's documented issuance list — ZERO mismatches
- ✅ Gate progression matches IAMBECCA-GATES state machine — sub-gates live within IMPLEMENT state
- ✅ Permission levels vs TOOLS: complementary systems (TOOLS = which tools per role, PROTOCOL = when during IMPLEMENT). Added clarification note to PROTOCOL Section 2.
- ✅ All 13 IM roles confirmed to have IAMBECCA-PROTOCOL.md in shared modules

---

## KEY FILES

| File | Purpose |
|------|---------|
| `shared/IAMBECCA-PROTOCOL.md` | NEW — unified enforcement backbone |
| `shared/IAMBECCA-GATES.md` | Existing — state machine (needs cross-ref update) |
| `shared/IAMBECCA-OUTPUTS.md` | Existing — output formats (needs cross-ref update) |
| `shared/IAMBECCA-TOOLS.md` | Existing — tool permissions (reference only) |
| `shared/IAMBECCA-MEMORY.md` | Existing — Ghost Index / pheromones (reference only) |
| `shared/IAMBECCA-EVIDENCE.md` | Existing — evidence scoring (reference only) |
| `roles/IM-05_NEO_ANT-CODER.md` | Primary test role for protocol |
| `prompt/pmx/shared/permissions/PMX-SHARED-PERMISSIONS_v1.0.0.md` | Source for Level 0-3 |
| `D:\projects\colony-os\CLAUDE.md` | Source for Truthy Diffs + Backup Law |

## SOURCE OF TRUTH

| Concept | Source |
|---------|--------|
| Level 0-3 permissions | PMX-SHARED-PERMISSIONS_v1.0.0.md |
| Gate progression | IAMBECCA-GATES.md + ColonyOS CLAUDE.md |
| Truthy Diffs | ColonyOS CLAUDE.md lines 491-551 |
| Backup Law | ColonyOS CLAUDE.md lines 299-415 |
| Token authenticity | ColonyOS CLAUDE.md lines 725-740 |
| Report-to-Index | IAMBECCA-MEMORY.md + IAMBECCA-OUTPUTS.md |
| Token names | IM-03 TRINITY lines 250, 254, 277, 297 |

---

## ADVISOR INSIGHTS (2026-02-07)

Key compliance gaps flagged by Advisor analysis:

1. **Combined Gates in One Prompt** — Ants currently do ALL sub-steps (discovery→footprint→patch→verify→report) in one continuous exchange without stopping for intermediate tokens. This is the core violation.

2. **Missing Intermediate Token Trail** — ANT_REPORT only shows final `🔑 APPROVED: TASK COMPLETE`, not the granular DISCOVERY→FOOTPRINT→PATCH approvals. Horsemen H4 audit expects to see all tokens.

3. **Trinity needs enforcement update** — Trinity should inject approval tokens at sub-step boundaries, not just at role transitions. When Neo outputs a proposed footprint, Trinity must verify and issue `🔑 FOOTPRINT APPROVED` before Neo continues.

4. **IAMBECCA-OUTPUTS.md gap** — Currently only shows final "TASK COMPLETE" token. Needs to show that within IMPLEMENT state, Ants produce intermediate outputs requiring approval (D1→D2→D3→D4).

5. **IAMBECCA-GATES.md gap** — Needs to clarify that even within IMPLEMENT state, mini-gates (D1-D4) exist and must be respected for token compliance.

6. **Ghost Twins + Sentinels verification** — Need to confirm Ghost Twins output `🔑 APPROVED: ACTIVATE Oracle (closure)` at end of review, and Sentinels produce proper tokens.

**These are addressed across Steps 1-6 below.** IAMBECCA-PROTOCOL.md (Step 1) defines the gates. Steps 2-5 wire it into the existing system.
