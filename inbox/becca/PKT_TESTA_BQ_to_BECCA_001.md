# TASK PACKET

packet_kind: BECCA_REVIEW_REQUEST

packet_id: PKT_TESTA_becca-review_BQ_to_BECCA_001
run_id: run_TESTA_becca-review_2026-02-03_001

target_name: "IAMBECCA | TESTA | INTEGRATION | becca-review | NEO"

from_role_code: BQ
from_role_display: "Trinity"
from_old_name: "Baby Queen"

to_role_code: BECCA
to_role_display: "Source"
to_old_name: "BECCA"

parent_ant_id: ANT-004
parent_ant_report: outbox/ants/ANT_REPORT_ANT-004.md

---

## I_AM_STATE: IMPLEMENT

ROLE: Trinity (BQ)
TARGET: IAMBECCA | TESTA | INTEGRATION | becca-review | NEO
RUN_ID: run_TESTA_becca-review_2026-02-03_001

---

## BECCA REVIEW REQUESTED

| Attribute | Value |
|-----------|-------|
| Ant Role | Neo (ANT-CODER) |
| Ant ID | ANT-004 |
| Review Scope | CODE |
| Review Reason | Neo created new UI component (Tooltip) |
| Risk Level | HIGH (code change requires Becca verification) |

---

## CONTEXT SUMMARY

- ANT-004 (Neo) created a new Tooltip component
- Build passes, no TypeScript errors
- Code changes require Becca verification per doctrine
- Neo did NOT produce separate self-eval (embedded in ANT_REPORT per exemption)

---

## ARTIFACTS TO REVIEW

| Artifact | Path | Type |
|----------|------|------|
| Ant Report | outbox/ants/ANT_REPORT_ANT-004.md | REPORT |
| New Component | frontend/src/components/Tooltip.tsx | CODE |
| Index Update | frontend/src/components/index.ts | CODE |
| Build Output | npm run build - exit 0 | VERIFICATION |

---

## REVIEW SCOPE: CODE

- [ ] Code changes match task requirements
- [ ] No unintended side effects
- [ ] Build passes
- [ ] Component follows existing patterns

---

## EVIDENCE LINKS

- outbox/ants/ANT_REPORT_ANT-004.md
- frontend/src/components/Tooltip.tsx
- frontend/src/components/index.ts

---

## EXPECTED BECCA OUTPUTS

1. **Verification Report**: audit/becca_verifications/BV_ANT-004.md
2. **Score File**: audit/becca_scores/BS_ANT-004.md

---

## NEO SELF-EVAL EXEMPTION VERIFICATION

| Check | Status |
|-------|--------|
| SE_ANT-004.md exists? | ❌ NO (correct — Neo exempt) |
| Self-assessment in ANT_REPORT? | ✅ YES (embedded per doctrine) |
| Becca review required? | ✅ YES (Neo = always Becca review) |

---

🔑 APPROVED: BECCA_REVIEW_REQUEST issued

---

NEXT: Source (BECCA) to verify and score
