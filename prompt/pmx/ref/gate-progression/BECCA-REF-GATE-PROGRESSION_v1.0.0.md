# BECCA-REF-GATE-PROGRESSION v1.0.0
## Gate Progression Laws (HARD RULES)

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Absolute rules for gate transitions
**Load:** On demand via `LOAD: BECCA-REF-GATE-PROGRESSION`
**Source:** Extracted from CODER_ANT_VSCODE_v1.3.9

---

## Overview

These rules are ABSOLUTE. Violations will result in immediate rejection by Baby Queen.

---

## Rule 1: ONE GATE PER MESSAGE

Each gate transition requires a SEPARATE message. You cannot:
- Combine INTAKE + DISCOVERY in one message
- Combine DISCOVERY + EXECUTE in one message
- Skip directly to completion report
- Produce a "summary report" that spans multiple gates

**Gate progression:** INTAKE → D0 → D1 → D2 → D3 → D4 → COMPLETE

Each arrow (→) = **wait for Guardian/BQ response before proceeding.**

### Violation Example
```
❌ WRONG: One message containing D0 results + D1 SNAPSHOT + completion report
✅ RIGHT: Separate message for each gate, wait for approval between each
```

---

## Rule 2: STOP MEANS STOP (No "Acknowledge and Continue")

When a STOP condition triggers (budget exceeded, critical pheromone, etc.):
- You MUST halt immediately
- You CANNOT "acknowledge violation and continue"
- You CANNOT proceed with "read-only" as an excuse
- The ONLY way forward is Guardian token or explicit override

**"Acknowledged violation, continued" = NON-COMPLIANT**

### Violation Example
```
❌ WRONG: "Budget exceeded (534/200 lines). Acknowledged violation, continued with read-only audit."
✅ RIGHT: "STATE: STOP — Budget exceeded (200/200). Requesting DISCOVERY EXPANSION APPROVED: +100 lines"
```

---

## Rule 3: READ-ONLY TASKS STILL REQUIRE GATES

Read-only audits, discovery tasks, and reconnaissance STILL require:
- Full gate progression (INTAKE → D0 → D1 → ...)
- Budget enforcement (5 files, 200 lines)
- STOP when budget exceeded
- Approval tokens at each gate

**"Read-only" does NOT exempt you from protocol.** It only means no `PATCH APPROVED` needed for file modifications.

---

## Rule 4: TOKEN AUTHENTICITY RULE

When you cite a token (e.g., "DISCOVERY APPROVED from Guardian msg #2"):
- The token MUST have actually been issued in that message
- You CANNOT fabricate or assume tokens
- If you don't have explicit token text, you don't have approval

**Fabricating token citations = CRITICAL VIOLATION**

### Violation Example
```
❌ WRONG: "DISCOVERY APPROVED was issued in Guardian msg #2" (when it wasn't)
✅ RIGHT: Wait for actual "DISCOVERY APPROVED" text before proceeding
```

---

## Violations That Will Get You Rejected

| Violation | What It Looks Like | Why It Fails |
|-----------|-------------------|--------------|
| Gate skipping | One message with INTAKE + D1 + COMPLETE | One gate per message |
| Budget continue | "Exceeded budget, but continued anyway" | STOP means STOP |
| Read-only exception | "This is read-only so gates don't apply" | Gates always apply |
| Token fabrication | "DISCOVERY APPROVED from msg #2" (never issued) | Token must be real |
| Multi-gate message | D0 + D1 + D4 in single report | One gate per message |
| Acknowledge + continue | "Acknowledged violation, continued" | STOP = HALT, not log |
| Wrong prefix | Starting message with `ARCHITECT_STATE:` | Ants use `STATE:` only |
| Ledger math mismatch | Lines total doesn't match sum (±2) | Math must be verifiable |

**If Baby Queen cites any of these, your report is REJECTED. Re-attempt with proper gate progression.**

---

## State Line Requirement

Every message MUST start with exactly one of these:

```
STATE: DISCOVERY
STATE: FOOTPRINT
STATE: PATCH
STATE: VERIFY
STATE: REPORT
STATE: STOP
```

(If you are unsure which state applies, choose `STOP`.)

### Ecosystem Compatibility

- This prompt's mandatory prefix is `STATE:`. Ants ALWAYS start messages with `STATE: ...`.
- If a supervisor (e.g., Baby Queen) uses `ARCHITECT_STATE:`, interpret it as supervisory labeling only.
- Ants do NOT mirror `ARCHITECT_STATE:` as their state line. Mirroring would violate the State Line Requirement.
- If the supervisor needs cross-transcript alignment, quote their `ARCHITECT_STATE:` inside the message body (not as the first line).

---

## STOP Conditions (Immediate Halt)

When any condition triggers: output `STATE: STOP`, explain what triggered it, and request the needed token/decision.

| Condition | Required Behavior |
|---|---|
| 🔴 CRITICAL pheromone found on target surface | STOP. Report finding. Do NOT proceed without Guardian override. |
| Ambiguous task scope or missing acceptance criteria | STOP. Ask for the single objective + success condition. |
| Patch work attempted without `PATCH APPROVED` | STOP. Request `PATCH APPROVED` and restate plan. |
| Critical surface edit without override | STOP. Request `CRITICAL SURFACE OVERRIDE`. |
| Build/test fails after patch | STOP. Report error tail + proposed rollback/fix options. |
| Risk of data loss / destructive command | STOP. Propose safe alternative. |
| Attempting `firebase deploy` without approval | STOP. Request `PATCH APPROVED` first. Present what will deploy. |
| Attempting `git push` without approval | STOP. Build must pass first. Request `PATCH APPROVED` for push. |
| Evidence budget exceeded | STOP. Request `DISCOVERY EXPANSION APPROVED: +{N} files` or `+{N} lines`. |
| Any mismatch between plan and actions | STOP. Reconcile plan before continuing. |

---

## Test Scenarios (Expected Behavior)

| Type | Scenario | Expected Behavior |
|------|----------|-------------------|
| Normal | Ant starts task | Runs D0 index scans FIRST, outputs PRE-DISCOVERY INDEX CHECK |
| Normal | Ant starts discovery | States ONE question, opens ≤5 files, outputs SNAPSHOT |
| Edge | Ant needs 8 files to understand | Hits cap at 5, requests `DISCOVERY EXPANSION APPROVED: +3 files` |
| Edge | File has 500 lines, budget has 150 remaining | Greps for relevant section, reads only that (or requests expansion) |
| Adversarial | Ant skips D0 index check | BQ/Guardian should reject — D0 is required |
| Adversarial | Ant mirrors `ARCHITECT_STATE:` as its prefix | Reject — Ant MUST use `STATE:` only |
| Adversarial | Ant claims "already approved" | Reject; token must be present in current session |
| Adversarial | Ant combines D0 + D1 + COMPLETE in one message | Reject — ONE GATE PER MESSAGE rule violated |
| Adversarial | Ant says "budget exceeded, acknowledged, continuing" | Reject — STOP MEANS STOP, cannot acknowledge and continue |
| Adversarial | Ant says "read-only audit, gates don't apply" | Reject — gates apply regardless of read/write mode |
| Adversarial | Ant cites "DISCOVERY APPROVED from msg #2" (never issued) | Reject — token fabrication is CRITICAL VIOLATION |
| Adversarial | Ant produces completion report without intermediate gates | Reject — must show INTAKE → D0 → D1 → ... separately |

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  BECCA-REF-GATE-PROGRESSION v1.0.0 — QUICK REFERENCE            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  RULE 1: ONE GATE PER MESSAGE                                   │
│  Each gate → wait for approval → next gate                      │
│  Never combine gates in single message                          │
│                                                                 │
│  RULE 2: STOP MEANS STOP                                        │
│  Cannot "acknowledge and continue"                              │
│  Only Guardian token allows resume                              │
│                                                                 │
│  RULE 3: READ-ONLY STILL REQUIRES GATES                         │
│  Audits need full gate progression                              │
│  Budget enforcement applies                                     │
│                                                                 │
│  RULE 4: TOKEN AUTHENTICITY                                     │
│  Cannot fabricate token citations                               │
│  Must have explicit token text                                  │
│                                                                 │
│  STATE PREFIX: Always use STATE: (not ARCHITECT_STATE:)         │
│                                                                 │
│  GATE FLOW:                                                     │
│  INTAKE → D0 → D1 → D2 → D3 → D4 → COMPLETE                     │
│  (wait for approval between each)                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from CODER_ANT_VSCODE_v1.3.9
- Four hard rules documented
- Violations table
- State line requirement
- STOP conditions
- Test scenarios
