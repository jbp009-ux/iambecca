# TRINITY-REF-GATE-ENFORCEMENT v1.0.0
## Full Gate Enforcement Checklists

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Detailed gate checklists for Trinity (BQ) to enforce on Ants
**Source:** BABY_QUEEN_VSCODE_v1.0.6

---

## When to Use

Load this module when:
- Reviewing Ant gate transitions
- Need detailed checklist for each gate
- Verifying gate progression rules

Say: `LOAD: TRINITY-REF-GATE-ENFORCEMENT`

---

## Gate 1 — INTAKE (Before `🔑 DISCOVERY APPROVED`)

Require Ant to provide:
- [ ] Identity Card: Ant ID, Task ID, Phase, single-sentence objective, success condition
- [ ] Surface(s) targeted (paths)
- [ ] Confirmation: no critical surfaces OR escalation request
- [ ] Proposed discovery plan (how they'll stay inside budget)

✅ If complete and in-scope → issue `🔑 DISCOVERY APPROVED`
❌ If unclear scope/criteria → `ARCHITECT_STATE: STOP` and request clarity/escalate

---

## Gate D0 — PRE-DISCOVERY (Before Gate D1)

Before accepting D1 SNAPSHOT, verify Ant completed Ghost Index Pre-Discovery:

**Required PRE-DISCOVERY INDEX CHECK output:**
```
PRE-DISCOVERY INDEX CHECK
─────────────────────────
Target surface(s): {files/areas}

MASTER_ANT_INDEX scan: {results or "none"}
FILE_OWNERSHIP_MAP scan: {results or "none"}
PHEROMONE_REGISTRY scan: {results or "none"}
RECENT_UNINDEXED scan: {results or "none"}

INDEX VERDICT:
- [ ] No blockers — proceed to D1
- [ ] Pheromone warning — proceed with caution
- [ ] 🔴 CRITICAL pheromone — STOP and escalate
- [ ] Conflicting active work — coordinate
```

**Enforcement rules:**
- If Ant skipped D0 entirely → reject (code: `BQ_VIOLATION_D0_SKIPPED`)
- If 🔴 CRITICAL pheromone found → verify Ant STOPPED and escalated
- If 🟠 HIGH_RISK pheromone found → verify Ant acknowledged it in plan
- D0 scans are FREE — do not count against evidence budget

✅ If D0 complete and no 🔴 blockers → proceed to D1 review
❌ If D0 missing → reject; require Pre-Discovery first

---

## Gate D1 — DISCOVER (After Discovery, Before Footprint)

**Prerequisite: Gate D0 must be complete.**

Ant must output **SNAPSHOT** AND **Budget Ledger**.

**Required Budget Ledger format (strict):**
```
BUDGET LEDGER
─────────────
Files opened: {N}/5
  - path/to/file1.js (lines 1-50: 50 lines)
  - path/to/file2.js (lines 100-150: 50 lines)
Search output printed: {N} lines
Lines read total: {N}/200
Search results inspected: {N}/10
  - Query: "functionName" → {N} results ({N} lines)
Expansion tokens used: {none | list}
```

**Required SNAPSHOT format (strict):**
```
SNAPSHOT
────────
Goal: {one sentence}
Files inspected: {list, max 5}
Key evidence: {≤3 bullets with file:line citations}
Open questions: {if any}
Proposed footprint: {files to change + 1-line purpose each}
Risk level: LOW / MED / HIGH
Next token needed: 🔑 FOOTPRINT APPROVED (or STOP reason)
```

**Your enforcement duties:**
- [ ] Verify discovery stayed read-only (no modifications)
- [ ] Verify budget math is honest (line totals, file count, search count)
- [ ] If exceeded budget without expansion token → reject, force STOP + redo
- [ ] If expansion requested: require justification ("why current evidence cannot answer goal")

**Ledger-to-evidence binding (required):**
Every file listed in the Budget Ledger must appear at least once in:
- SNAPSHOT "Key evidence" citations, OR
- An included snippet/excerpt shown in the message

If a file is listed but never cited/shown → treat as suspicious scope creep; reject and require resubmission (code: `BQ_VIOLATION_LEDGER_UNBOUND`).

✅ If compliant → proceed to Gate D2
❌ If missing SNAPSHOT/Budget Ledger → reject; require resubmission (code: `BQ_VIOLATION_BUDGET`)

---

## Gate D2 — PROPOSE (Before `🔑 FOOTPRINT APPROVED`)

Ant must provide:
- [ ] Minimal change plan (smallest diff that solves goal)
- [ ] Exact files to change
- [ ] Risks + rollback plan
- [ ] Verification plan (commands + expected outcome)
- [ ] If deploy/push in scope: exact commands (no placeholders)

**Rules:**
- No patch execution in D2 (plan only)
- No scope expansion
- If any target is CRITICAL → STOP + escalate to Oracle

✅ If plan is minimal/safe/reversible → issue `🔑 FOOTPRINT APPROVED`
❌ If plan is vague/large/unsafe → reject and request smaller plan

---

## Gate D3 — EXECUTE (Before `🔑 PATCH APPROVED`)

Ant must restate:
- [ ] Approved footprint (echo back)
- [ ] Backup plan (per-file backup naming)
- [ ] Exact execution steps
- [ ] Exact verification steps

**Universal D3 checks:**
- [ ] Backup first, then edit
- [ ] Smallest edit possible
- [ ] Verification must run after edits
- [ ] Diff summary must be shown before reporting success

✅ If the above is satisfied (and no deploy/push) → issue `🔑 PATCH APPROVED`
⚠️ If deploy/push requested → load `TRINITY-REF-DEPLOY-PUSH` before approving

---

## Gate D4 — VERIFY (Before `🔑 REPORT APPROVED`)

Require:
- [ ] Verification evidence (build/test/lint outputs)
- [ ] Diff summary + files touched list
- [ ] If deploy happened: deploy output summary (success/failure + target)
- [ ] If push happened: push output summary
- [ ] Rollback path (how to restore)

✅ If verified and evidence-backed → issue `🔑 REPORT APPROVED`
❌ If verification missing → reject; request the missing proof

---

## Gate 4 — COMPLETE (Completion Report Discipline)

Before accepting completion:
- [ ] `🔑 REPORT APPROVED` must have been issued
- [ ] Ant must request the current completion report template
- [ ] Guardian pastes template
- [ ] Ant fills it with evidence-backed details

**Do NOT accept completion reports generated from memory.**

---

## Gate Progression Enforcement

**ONE GATE PER MESSAGE:** Ant must send separate messages for each gate transition.

| Violation | Code |
|-----------|------|
| Ant combines INTAKE + D1 in one message | `BQ_VIOLATION_GATE_SKIP` |
| Ant skips directly to completion report | `BQ_VIOLATION_GATE_SKIP` |
| Ant cites token that was never issued | `BQ_VIOLATION_TOKEN_FABRICATION` |
| Ant says "acknowledged violation, continued" | `BQ_VIOLATION_STOP_CONTINUED` |

**Read-only tasks still require full gate progression.** No "audit exemption."

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  TRINITY-REF-GATE-ENFORCEMENT v1.0.0                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  GATE FLOW:                                                     │
│  Gate 1 (INTAKE) → 🔑 DISCOVERY APPROVED                        │
│       ↓                                                         │
│  Gate D0 (PRE-DISCOVERY) → Ghost Index check                    │
│       ↓                                                         │
│  Gate D1 (DISCOVER) → Budget Ledger + SNAPSHOT                  │
│       ↓                                                         │
│  Gate D2 (PROPOSE) → 🔑 FOOTPRINT APPROVED                      │
│       ↓                                                         │
│  Gate D3 (EXECUTE) → 🔑 PATCH APPROVED                          │
│       ↓                                                         │
│  Gate D4 (VERIFY) → 🔑 REPORT APPROVED                          │
│       ↓                                                         │
│  Gate 4 (COMPLETE) → Completion report template                 │
│                                                                 │
│  ONE GATE PER MESSAGE — no combining, no skipping               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from BABY_QUEEN_VSCODE_v1.0.6
- Full gate checklists D0 through D4
