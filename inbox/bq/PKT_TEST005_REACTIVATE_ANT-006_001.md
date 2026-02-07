# TASK PACKET

packet_kind: REACTIVATE_ANT

packet_id: PKT_TEST005_horsemen-escalation_BQ_to_ANT-CODER_001
run_id: run_TEST005_horsemen-escalation_2026-02-03_001

target_name: "IAMBECCA | TEST | INTEGRATION | horsemen-escalation | SENTINELS"

from_role_code: BQ
from_role_display: "Trinity"

to_role_code: ANT-CODER
to_role_display: "Neo"

parent_ant_id: ANT-006
attempt_number: 1

---

## I_AM_STATE: IMPLEMENT

ROLE: Trinity (BQ)
TARGET: IAMBECCA | TEST | INTEGRATION | horsemen-escalation | SENTINELS
RUN_ID: run_TEST005_horsemen-escalation_2026-02-03_001

---

## REACTIVATION AUTHORIZED

| Attribute | Value |
|-----------|-------|
| Halted Ant | ANT-006 (Neo) |
| Original Halt | Deadlock introduced while fixing race condition |
| Diagnostic | DBG-ANT-006-001.md |
| BACKUP_GATE | BACKUP_GATE_001.md — **PASS** ✅ |
| Attempt | 1 (first reattempt after debugger) |

---

## CONTEXT SUMMARY

- ANT-006 halted due to deadlock
- Morpheus diagnosed: inconsistent lock ordering between Thread A and Thread B
- BACKUP_GATE_001 passed (safe to proceed)
- ANT-006 now authorized to apply fix instructions

---

## DEBUGGER FINDINGS (from DBG-ANT-006-001.md)

**Root Cause:** Concurrency Bug / Deadlock
**Location:** functions/src/services/orderProcessor.ts:142-156
**Confidence:** HIGH

---

## FIX INSTRUCTIONS FOR ANT-006 (from Morpheus)

The halted Ant (Neo/ANT-006) should:

1. Identify all lock acquisitions in orderProcessor.ts
2. Define a global lock ordering (e.g., always lock1 before lock2)
3. Refactor Thread A path to follow the global ordering
4. Refactor Thread B path to follow the same global ordering
5. Add comments documenting the required lock ordering
6. Run tests with `npm test orderProcessor` to verify no deadlock

---

## VERIFICATION STEPS

After applying the fix:

1. `npm test orderProcessor` — completes without timeout
2. Race condition fixed — tests pass with concurrent access
3. Lock ordering consistent — both paths acquire locks in same order

---

## INPUTS (paths)

- Halt packet: inbox/bq/PKT_TEST005_ANT-006_HALT_001.md
- DEBUGGER_REQUEST: inbox/debugger/PKT_TEST005_BQ_to_DEBUGGER_001.md
- Diagnostic: outbox/debugger/DBG-ANT-006-001.md
- BACKUP_GATE: runtime/runs/.../BACKUP_GATE_001.md

---

## BACKUP GATE VERIFICATION

| Check | Status |
|-------|--------|
| BACKUP_GATE_001 exists | ✅ |
| BACKUP_GATE_001 = PASS | ✅ |
| Safe to proceed | ✅ |

**BACKUP_GATE: PASS — Reattempt authorized**

---

## EXPECTED OUTPUTS

After ANT-006 completes reattempt:
- outbox/ants/ANT_REPORT_ANT-006.md (if successful)
- inbox/bq/PKT_TEST005_ANT-006_HALT_002.md (if fails again)

---

## STOP CONDITIONS

- If fix doesn't resolve deadlock: HALT again with new evidence
- If additional errors appear: Document and HALT
- After 2 failed reattempts: Escalate to HORSEMEN

---

🔑 APPROVED: REACTIVATE ANT-006 with diagnostic guidance

---

NEXT: Neo (ANT-006) to apply fix instructions and reattempt task
