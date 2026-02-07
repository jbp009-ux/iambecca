# TASK PACKET

packet_kind: REACTIVATE_ANT

packet_id: PKT_TEST005_horsemen-escalation_BQ_to_ANT-CODER_002
run_id: run_TEST005_horsemen-escalation_2026-02-03_001

target_name: "IAMBECCA | TEST | INTEGRATION | horsemen-escalation | SENTINELS"

from_role_code: BQ
from_role_display: "Trinity"

to_role_code: ANT-CODER
to_role_display: "Neo"

parent_ant_id: ANT-006
attempt_number: 2
guidance_source: HORSEMEN

---

## I_AM_STATE: IMPLEMENT

ROLE: Trinity (BQ)
TARGET: IAMBECCA | TEST | INTEGRATION | horsemen-escalation | SENTINELS
RUN_ID: run_TEST005_horsemen-escalation_2026-02-03_001

---

## REACTIVATION AUTHORIZED (FROM HORSEMEN)

| Attribute | Value |
|-----------|-------|
| Halted Ant | ANT-006 (Neo) |
| Original Halt | Deadlock (lock ordering) |
| First Reattempt | Memory leak after Morpheus fix |
| HORSEMEN Report | HORSEMEN_REPORT_ANT-006_001.md |
| Sentinels Decision | PASS_WITH_PLAN |
| BACKUP_GATE_003 | PASS ✅ |
| Attempt | 2 (post-horsemen reattempt) |

---

## COMPLETE CHAIN SUMMARY

| Stage | Artifact | Outcome |
|-------|----------|---------|
| First HALT | PKT_TEST005_ANT-006_HALT_001.md | Deadlock |
| Debugger Lane | DBG-ANT-006-001.md | Lock ordering fix |
| First Reattempt | (applied Morpheus fix) | Memory leak |
| Second HALT | PKT_TEST005_ANT-006_HALT_002.md | OOM error |
| Horsemen Lane | HORSEMEN_REPORT_ANT-006_001.md | Shared lock singleton fix |
| Post-Horsemen | This packet | Final reattempt |

---

## SENTINELS FINDINGS (from HORSEMEN_REPORT)

**Root Cause:** Architectural Issue / Resource Management
**Location:** functions/src/services/orderProcessor.ts:148
**Why Morpheus Fix Failed:** Neo created new lock objects per-call instead of
reusing shared instances. Morpheus correctly identified ordering, but didn't
address lifecycle.

---

## FIX INSTRUCTIONS FOR ANT-006 (from Sentinels)

The halted Ant (Neo/ANT-006) should:

1. **Create module-level lock instances** instead of per-call instances
   - Move `lock1` and `lock2` to module scope
   - Initialize them once at module load

2. **Implement proper lock release** using try/finally pattern
   - Every `acquire()` must have a corresponding `release()` in finally block

3. **Maintain the lock ordering** that was already fixed
   - Keep acquiring lock1 before lock2 in both code paths

4. **Add a memory leak detection test**
   - Run 1000 iterations and verify memory stays stable

5. **Run full test suite** including memory and concurrency tests
   - `npm test orderProcessor`
   - `npm run test:memory orderProcessor`

---

## VERIFICATION STEPS

After applying the fix:

1. `npm test orderProcessor` — completes without timeout (no deadlock)
2. Memory stable after 1000 iterations (< 100MB growth) (no leak)
3. Lock ordering maintained — both paths acquire lock1 then lock2
4. Lock lifecycle correct — every acquire has matching release in finally

---

## BACKUP GATE VERIFICATION

| Gate | Status |
|------|--------|
| BACKUP_GATE_001 | ✅ PASS (before first reattempt) |
| BACKUP_GATE_002 | ✅ PASS (before HORSEMEN) |
| BACKUP_GATE_003 | ✅ PASS (before this reattempt) |

**All backup gates passed. Complete chain verified.**

---

## INPUTS (paths)

- First HALT: inbox/bq/PKT_TEST005_ANT-006_HALT_001.md
- DEBUGGER_REQUEST: inbox/debugger/PKT_TEST005_BQ_to_DEBUGGER_001.md
- Diagnostic: outbox/debugger/DBG-ANT-006-001.md
- First REACTIVATE: inbox/bq/PKT_TEST005_REACTIVATE_ANT-006_001.md
- Second HALT: inbox/bq/PKT_TEST005_ANT-006_HALT_002.md
- HORSEMEN_REQUEST: inbox/horsemen/HRQ_TEST005_ANT-006_001.md
- HORSEMEN_REPORT: outbox/horsemen/HORSEMEN_REPORT_ANT-006_001.md
- BACKUP_GATE_003: runtime/runs/.../BACKUP_GATE_003.md

---

## EXPECTED OUTPUTS

After ANT-006 completes reattempt:
- outbox/ants/ANT_REPORT_ANT-006.md (SUCCESS expected)

---

## STOP CONDITIONS

- If fix doesn't resolve both deadlock AND memory leak: HALT (human intervention)
- After 3 failed reattempts: Require human intervention

---

🔑 APPROVED: REACTIVATE ANT-006 with Sentinels guidance

---

NEXT: Neo (ANT-006) to apply Sentinels fix instructions and complete task
