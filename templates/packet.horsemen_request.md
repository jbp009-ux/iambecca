# HORSEMEN REQUEST TEMPLATE v1.0.0

---

## When to Use HORSEMEN_REQUEST

**HORSEMEN (Sentinels) may ONLY be activated if ALL conditions are met:**

| # | Condition | Verification |
|---|-----------|--------------|
| 1 | Existing HALT packet for parent_ant_id | `inbox/bq/PKT_*_HALT_*.md` exists |
| 2 | Debugger ran and produced DIAGNOSTIC | `outbox/debugger/DBG-*.md` exists |
| 3 | Trinity issued REACTIVATE_ANT | `inbox/bq/PKT_*_REACTIVATE_*.md` exists |
| 4 | Ant attempted fix and FAILED AGAIN | Second HALT or explicit FAIL token |
| 5 | BACKUP_GATE PASS before HORSEMEN | `BACKUP_GATE_<N>.md` with PASS |
| 6 | BACKUP_GATE PASS before post-horsemen reattempt | Required after Sentinels report |

**If any condition missing:** `🔑 REJECTED: invalid escalation path`

---

## HORSEMEN_REQUEST Packet Template

```markdown
# TASK PACKET

packet_kind: HORSEMEN_REQUEST

packet_id: HRQ_<run_id>_<parent_ant_id>_<seq>
run_id: <run_id>

target_name: "IAMBECCA | <CLIENT_ID> | <PROJECT_TYPE> | <PROJECT_SLUG> | <MATRIX_CODENAME>"

from_role_code: BQ
from_role_display: "Trinity"
from_old_name: "Baby Queen"

to_role_code: HORSEMEN
to_role_display: "Sentinels"
to_old_name: "Horsemen"

parent_ant_id: <ANT-XXX>
escalation_reason: "Debugger instructions applied but Ant still failing. Escalate."

---

## I_AM_STATE: IMPLEMENT

ROLE: Trinity (BQ)
TARGET: <target_name>
RUN_ID: <run_id>

---

## ESCALATION PREREQUISITES (All Must Be TRUE)

| # | Prerequisite | Path | Verified |
|---|--------------|------|----------|
| 1 | First HALT packet | <path> | ✅ |
| 2 | DEBUGGER_REQUEST issued | <path> | ✅ |
| 3 | Morpheus DIAGNOSTIC produced | <path> | ✅ |
| 4 | BACKUP_GATE_001 PASS | <path> | ✅ |
| 5 | REACTIVATE_ANT issued | <path> | ✅ |
| 6 | Ant reattempted and FAILED | <path to 2nd halt> | ✅ |
| 7 | BACKUP_GATE_002 PASS (this gate) | <path> | ✅ |

**All prerequisites verified. Escalation to Sentinels authorized.**

---

## CONTEXT SUMMARY

- ANT-<XXX> halted due to: <original halt reason>
- Morpheus diagnosed: <diagnosis summary>
- Ant applied fix and reattempted
- Ant failed again due to: <second failure reason>
- Debugger lane exhausted → Escalating to Sentinels

---

## ARTIFACT CHAIN (Evidence Trail)

| Seq | Artifact | Path |
|-----|----------|------|
| 1 | First HALT | inbox/bq/PKT_*_HALT_001.md |
| 2 | DEBUGGER_REQUEST | inbox/debugger/PKT_*_BQ_to_DEBUGGER_001.md |
| 3 | DIAGNOSTIC | outbox/debugger/DBG-*-001.md |
| 4 | BACKUP_GATE_001 | runtime/runs/<run_id>/BACKUP_GATE_001.md |
| 5 | REACTIVATE_ANT | inbox/bq/PKT_*_REACTIVATE_*_001.md |
| 6 | Second HALT | inbox/bq/PKT_*_HALT_002.md |
| 7 | BACKUP_GATE_002 | runtime/runs/<run_id>/BACKUP_GATE_002.md |
| 8 | This packet | inbox/horsemen/HRQ_*_001.md |

---

## SCOPE

scope: <CODE|SECURITY|FIREBASE|RELEASE|DATA|OTHER>

---

## ARTIFACTS FOR SENTINELS TO REVIEW

- <path to original halt>
- <path to debugger diagnostic>
- <path to reactivation packet>
- <path to second halt / failure evidence>
- <path to relevant source files>

---

## BACKUP GATE REQUIREMENTS

| Gate | When | Status |
|------|------|--------|
| BACKUP_GATE_002 | Before HORSEMEN activation | MUST PASS |
| BACKUP_GATE_003 | Before post-horsemen reattempt | MUST PASS |

backup_gate_required_before_start: true
required_backup_gate_path: runtime/runs/<run_id>/BACKUP_GATE_002.md

---

## EXPECTED OUTPUTS FROM SENTINELS

1. `outbox/horsemen/HORSEMEN_REPORT_<parent_ant_id>_<seq>.md`
2. Reactivation guidance for Trinity

---

## SENTINELS CONSTRAINTS (LAW)

| Rule | Enforcement |
|------|-------------|
| No code edits by Sentinels | Sentinels advise, they don't implement |
| May propose rollback | Must route to BECCA for approval |
| May require stricter tests | Document in HORSEMEN_REPORT |
| May require isolation fixes | Document in HORSEMEN_REPORT |
| Any destructive action | MUST be routed to BECCA for approval |

---

## STOP CONDITIONS

- If BACKUP_GATE fails: STOP, cannot proceed
- If critical security breach found: STOP, escalate to BECCA immediately
- If Sentinels cannot diagnose: STOP, require human intervention

---

🔑 APPROVED: HORSEMEN_REQUEST issued — Sentinels activated

---

NEXT: Sentinels to review and produce HORSEMEN_REPORT
```

---

## HORSEMEN_REPORT Template (Sentinels Output)

```markdown
# HORSEMEN REPORT

report_id: HORSEMEN_REPORT_<parent_ant_id>_<seq>
run_id: <run_id>
target_name: "<target_name>"

parent_ant_id: <ANT-XXX>
horsemen_request: <path to HRQ packet>

---

## I_AM_STATE: IMPLEMENT

ROLE: Sentinels (HORSEMEN)
OLD_NAME: Horsemen
TARGET: <target_name>
RUN_ID: <run_id>

---

## ESCALATION SUMMARY

| Attribute | Value |
|-----------|-------|
| Ant ID | <ANT-XXX> |
| Original Halt | <reason> |
| Debugger Diagnosis | <summary> |
| Reattempt Result | FAILED |
| Second Failure | <reason> |

---

## INVARIANTS CHECK

| Invariant | Status | Evidence |
|-----------|--------|----------|
| Tenant isolation maintained | ✅/❌ | <evidence> |
| No security vulnerabilities | ✅/❌ | <evidence> |
| Backup gate passed | ✅/❌ | <path> |
| Evidence chain intact | ✅/❌ | <artifact count> |
| No unauthorized code changes | ✅/❌ | <verification> |

---

## ROOT CAUSE HYPOTHESIS

| Attribute | Value |
|-----------|-------|
| Category | <bug type / architectural issue / dependency / etc.> |
| Location | <file:line or system component> |
| Confidence | HIGH / MEDIUM / LOW |
| Why Debugger Fix Failed | <explanation> |

---

## ROOT CAUSE ANALYSIS

1. <analysis point 1>
2. <analysis point 2>
3. <analysis point 3>

---

## RECOMMENDED ACTIONS

| # | Action | Type | Risk |
|---|--------|------|------|
| 1 | <action> | ROLLBACK / REFACTOR / TEST / ISOLATION | HIGH/MED/LOW |
| 2 | <action> | ... | ... |

---

## FIX INSTRUCTIONS FOR ANT (STEPS ONLY — NO CODE)

The halted Ant should:

1. <step 1>
2. <step 2>
3. <step 3>

**IMPORTANT:** These are INSTRUCTIONS. The Ant implements them as code.

---

## VERIFICATION STEPS

After applying the fix:

1. <verification 1>
2. <verification 2>
3. <verification 3>

---

## ARTIFACTS REVIEWED

| Artifact | Path | Status |
|----------|------|--------|
| First HALT | <path> | ✅ Reviewed |
| DIAGNOSTIC | <path> | ✅ Reviewed |
| Second HALT | <path> | ✅ Reviewed |
| Source files | <paths> | ✅ Reviewed |

---

## DECISION

Use one of:
- `PASS_WITH_PLAN` — Fix instructions provided, reattempt authorized
- `FAIL_HALT` — Cannot resolve, require human intervention
- `REQUIRE_BECCA_APPROVAL` — Destructive action needed, route to BECCA

**DECISION:** <PASS_WITH_PLAN | FAIL_HALT | REQUIRE_BECCA_APPROVAL>

---

## NEXT STEPS

| Step | Action | Path |
|------|--------|------|
| 1 | BACKUP_GATE_003 must PASS | runtime/runs/<run_id>/BACKUP_GATE_003.md |
| 2 | Trinity issues REACTIVATE_ANT | inbox/bq/PKT_*_REACTIVATE_*_FROM_HORSEMEN.md |
| 3 | Ant applies fix | outbox/ants/ANT_REPORT_*.md |

---

## OUTPUTS CREATED

- outbox/horsemen/HORSEMEN_REPORT_<parent_ant_id>_<seq>.md (this file)

---

🔑 APPROVED: HORSEMEN_REPORT COMPLETE — reattempt authorized with guidance

---

NEXT: Trinity to request BACKUP_GATE_003, then issue REACTIVATE_ANT
```

---

## Invalid Escalation Rules

**Trinity MUST reject HORSEMEN_REQUEST if:**

| Condition | Rejection |
|-----------|-----------|
| No first HALT exists | `🔑 REJECTED: no prior HALT — cannot escalate` |
| No DIAGNOSTIC exists | `🔑 REJECTED: debugger not run — escalation invalid` |
| No REACTIVATE_ANT exists | `🔑 REJECTED: no reattempt — debugger path not exhausted` |
| No second failure | `🔑 REJECTED: reattempt succeeded — no escalation needed` |
| BACKUP_GATE not passed | `🔑 REJECTED: backup gate required before escalation` |
| Escalating directly from first HALT | `🔑 REJECTED: must exhaust debugger lane first` |

---

## Example: HORSEMEN_REQUEST

```markdown
# TASK PACKET

packet_kind: HORSEMEN_REQUEST

packet_id: HRQ_run_TEST005_ANT-006_001
run_id: run_TEST005_horsemen-escalation_2026-02-03_001

target_name: "IAMBECCA | TEST | INTEGRATION | horsemen-escalation | SENTINELS"

from_role_code: BQ
from_role_display: "Trinity"

to_role_code: HORSEMEN
to_role_display: "Sentinels"

parent_ant_id: ANT-006
escalation_reason: "Debugger instructions applied but Ant still failing. Escalate."

---

## I_AM_STATE: IMPLEMENT

ROLE: Trinity (BQ)
TARGET: IAMBECCA | TEST | INTEGRATION | horsemen-escalation | SENTINELS
RUN_ID: run_TEST005_horsemen-escalation_2026-02-03_001

---

## ESCALATION PREREQUISITES (All Must Be TRUE)

| # | Prerequisite | Path | Verified |
|---|--------------|------|----------|
| 1 | First HALT packet | inbox/bq/PKT_TEST005_ANT-006_HALT_001.md | ✅ |
| 2 | DEBUGGER_REQUEST issued | inbox/debugger/PKT_TEST005_BQ_to_DEBUGGER_001.md | ✅ |
| 3 | Morpheus DIAGNOSTIC produced | outbox/debugger/DBG-ANT-006-001.md | ✅ |
| 4 | BACKUP_GATE_001 PASS | runtime/runs/.../BACKUP_GATE_001.md | ✅ |
| 5 | REACTIVATE_ANT issued | inbox/bq/PKT_TEST005_REACTIVATE_ANT-006_001.md | ✅ |
| 6 | Ant reattempted and FAILED | inbox/bq/PKT_TEST005_ANT-006_HALT_002.md | ✅ |
| 7 | BACKUP_GATE_002 PASS | runtime/runs/.../BACKUP_GATE_002.md | ✅ |

**All prerequisites verified. Escalation to Sentinels authorized.**

---

🔑 APPROVED: HORSEMEN_REQUEST issued — Sentinels activated

---

NEXT: Sentinels to review and produce HORSEMEN_REPORT
```
