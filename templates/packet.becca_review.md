# BECCA REVIEW REQUEST TEMPLATE v1.0.0

---

```markdown
# TASK PACKET

packet_kind: BECCA_REVIEW_REQUEST

packet_id: PKT_<CLIENT>_<slug>_BQ_to_BECCA_<seq>
run_id: run_<CLIENT>_<slug>_<YYYY-MM-DD>_<seq>

target_name: "IAMBECCA | <CLIENT_ID> | <PROJECT_TYPE> | <PROJECT_SLUG> | <MATRIX_CODENAME>"
client_id: <CLIENT_ID>
project_type: <PROJECT_TYPE>
project_slug: <PROJECT_SLUG>
matrix_codename: <MATRIX_CODENAME>

from_role_code: BQ
from_role_display: "Trinity"
from_old_name: "Baby Queen"

to_role_code: BECCA
to_role_display: "Source"
to_old_name: "BECCA"

parent_ant_id: <ANT_ID that produced the work>
parent_ant_report: <path to ANT_REPORT>

---

## I_AM_STATE: <CURRENT_STATE>

ROLE: Trinity (BQ)
TARGET: <target_name>
RUN_ID: <run_id>

---

## BECCA REVIEW REQUESTED

| Attribute | Value |
|-----------|-------|
| Ant Role | <Neo|Morpheus|etc.> |
| Ant ID | <ANT-XXX> |
| Review Scope | <CODE|SECURITY|FIREBASE|INSPECTION|RELEASE|DATA|UI|OTHER> |
| Review Reason | <why this requires Becca verification> |
| Risk Level | <HIGH|CRITICAL> |

---

## CONTEXT SUMMARY

- <bullet 1: what was the task>
- <bullet 2: what changes were made>
- <bullet 3: why Becca review is needed>

---

## ARTIFACTS TO REVIEW

| Artifact | Path | Type |
|----------|------|------|
| Ant Report | outbox/ants/ANT_REPORT_<ANT-ID>.md | REPORT |
| Code Changes | <path to changed files> | CODE |
| Build Output | <path or inline> | VERIFICATION |

---

## REVIEW SCOPE: <CODE|SECURITY|FIREBASE|INSPECTION|RELEASE|DATA|UI|OTHER>

### If CODE:
- [ ] Code changes match task requirements
- [ ] No unintended side effects
- [ ] Build passes
- [ ] Tests pass (if applicable)

### If SECURITY:
- [ ] Security rules are correct
- [ ] No privilege escalation
- [ ] Tenant isolation maintained
- [ ] Authentication/authorization verified

### If FIREBASE:
- [ ] Firestore rules updated correctly
- [ ] Indexes created if needed
- [ ] No data exposure risks
- [ ] Backup considerations addressed

### If DATA:
- [ ] Data integrity preserved
- [ ] Migration safe
- [ ] Rollback possible
- [ ] No data loss scenarios

---

## EVIDENCE LINKS

- <path to evidence 1>
- <path to evidence 2>
- <path to build output>

---

## EXPECTED BECCA OUTPUTS

1. **Verification Report**: audit/becca_verifications/BV_<ANT-ID>.md
2. **Score File**: audit/becca_scores/BS_<ANT-ID>.md

---

## STOP CONDITIONS

- If artifacts missing: REJECT with reason
- If evidence insufficient: Request additional evidence
- If critical issue found: HALT and escalate

---

🔑 APPROVED: BECCA_REVIEW_REQUEST issued

---

NEXT: Source (BECCA) to verify and score
```

---

## WHEN TO USE BECCA_REVIEW_REQUEST

| Condition | Use BECCA_REVIEW_REQUEST |
|-----------|--------------------------|
| Neo (ANT-CODER) completes any task | **YES** - always |
| Security-related changes | **YES** - always |
| Firebase/Firestore changes | **YES** - always |
| Data migration or transformation | **YES** - always |
| High-risk inspection findings | **YES** - if risk > LOW |
| Release preparation | **YES** - always |
| Non-code Ant completes task | **NO** - use standard self-eval |

---

## EXAMPLE: BECCA_REVIEW_REQUEST for Neo Code Change

```markdown
# TASK PACKET

packet_kind: BECCA_REVIEW_REQUEST

packet_id: PKT_TEST002_halt-debug_BQ_to_BECCA_001
run_id: run_TEST002_halt-debug_2026-02-03_001

target_name: "IAMBECCA | TEST | INTEGRATION | halt-debug | MORPHEUS"

from_role_code: BQ
from_role_display: "Trinity"

to_role_code: BECCA
to_role_display: "Source"

parent_ant_id: ANT-003
parent_ant_report: outbox/ants/ANT_REPORT_ANT-003.md

---

## I_AM_STATE: IMPLEMENT

ROLE: Trinity (BQ)
TARGET: IAMBECCA | TEST | INTEGRATION | halt-debug | MORPHEUS
RUN_ID: run_TEST002_halt-debug_2026-02-03_001

---

## BECCA REVIEW REQUESTED

| Attribute | Value |
|-----------|-------|
| Ant Role | Neo (ANT-CODER) |
| Ant ID | ANT-003 |
| Review Scope | CODE |
| Review Reason | Neo created new module and completed VoiceSettingsPanel |
| Risk Level | HIGH |

---

## CONTEXT SUMMARY

- ANT-003 was halted due to missing module
- After Morpheus diagnosis, ANT-003 created frontend/src/lib/voiceStorage.ts
- ANT-003 completed VoiceSettingsPanel.tsx
- Code changes require Becca verification

---

## ARTIFACTS TO REVIEW

| Artifact | Path | Type |
|----------|------|------|
| Ant Report | outbox/ants/ANT_REPORT_ANT-003.md | REPORT |
| New Module | frontend/src/lib/voiceStorage.ts | CODE |
| Component | frontend/src/components/settings/VoiceSettingsPanel.tsx | CODE |
| Build Output | npm run build - exit 0 | VERIFICATION |

---

## REVIEW SCOPE: CODE

- [ ] Code changes match task requirements
- [ ] No unintended side effects
- [ ] Build passes
- [ ] VoiceSettingsPanel renders correctly

---

## EVIDENCE LINKS

- outbox/ants/ANT_REPORT_ANT-003.md
- outbox/debugger/DBG-ANT-003-001.md
- runtime/runs/run_TEST002_halt-debug_2026-02-03_001/BACKUP_GATE_001.md

---

## EXPECTED BECCA OUTPUTS

1. **Verification Report**: audit/becca_verifications/BV_ANT-003.md
2. **Score File**: audit/becca_scores/BS_ANT-003.md

---

🔑 APPROVED: BECCA_REVIEW_REQUEST issued

---

NEXT: Source (BECCA) to verify and score
```
