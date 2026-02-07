# TASK PACKET TEMPLATE v1.0.0

---

```markdown
# TASK PACKET

packet_kind: <TASK|HALT|DEBUGGER_REQUEST|REACTIVATE_ANT|HORSEMEN_REQUEST|BACKUP_GATE|EVALUATION>

packet_id: PKT_<CLIENT>_<slug>_<from>_to_<to>_<seq>
run_id: run_<CLIENT>_<slug>_<YYYY-MM-DD>_<seq>

target_name: "IAMBECCA | <CLIENT_ID> | <PROJECT_TYPE> | <PROJECT_SLUG> | <MATRIX_CODENAME>"
client_id: <CLIENT_ID>
project_type: <PROJECT_TYPE>
project_slug: <PROJECT_SLUG>
matrix_codename: <MATRIX_CODENAME>

from_role_code: <ROLE_CODE>
from_role_display: "<DisplayName>"
from_old_name: "<OldName>"

to_role_code: <ROLE_CODE>
to_role_display: "<DisplayName>"
to_old_name: "<OldName>"

parent_packet_id: <optional - for chained packets>
parent_ant_id: <optional - for ant-related packets>
halt_reason: <optional - for HALT/DEBUGGER_REQUEST>
attempt_number: <optional integer - for REACTIVATE_ANT>

---

## CONTEXT SUMMARY
- <bullet 1>
- <bullet 2>

## INPUTS (paths)
- <path to input file 1>
- <path to input file 2>

## TASKS
- [ ] <task 1>
- [ ] <task 2>
- [ ] <task 3>

## EXPECTED OUTPUTS (paths)
- <path to expected output 1>
- <path to expected output 2>

## STOP CONDITIONS
- <When to request Debugger diagnosis>
- <When to require BACKUP_GATE>
- <When to escalate to HORSEMEN (only after failed reattempt)>
- <When to return to BECCA for evaluation>

---

## BACKUP GATE (required when packet_kind is REACTIVATE_ANT or HORSEMEN_REQUEST)

requires_backup_gate: <true|false>
backup_ref: <commit hash / snapshot path>
backup_validation_required: <true|false>

---

## ⚫ ISOLATION REQUIREMENTS (from Oracle assessment)

touches_tenant_data: <YES|NO>
isolation_risk: <LOW|MEDIUM|HIGH>
isolation_requirements: <specific requirements from Oracle plan | "N/A">
seraph_review_required: <true|false>

### If touches_tenant_data = YES:
- Trinity MUST verify Tenant Boundary Statement in Ant reports
- Tank (IM-07) MUST write isolation tests
- Seraph (IM-08) review recommended if isolation_risk >= MEDIUM

---

## BECCA REVIEW GATE (for high-risk tasks requiring Source verification)

becca_review_required: <true|false>
becca_review_reason: <string | empty>
becca_review_scope: <CODE|SECURITY|FIREBASE|INSPECTION|RELEASE|DATA|UI|OTHER>
becca_review_inbox_path: inbox/becca/
becca_review_due_by_state: <STATE_NAME>

---

## SELF-EVALUATION GATE (only if to_role_code == BECCA)

needs_evaluation: <true|false>
evaluation_inbox_path: <path if true>
evaluation_request: "EVALUATE ME: confirm right/wrong. Evaluation inbox: <path>."

self_checklist:
- [ ] Outputs written to correct outbox
- [ ] Evidence links included
- [ ] Target name match verified

evidence_links:
- <path to evidence 1>
- <path to evidence 2>

known_risks_or_unknowns:
- <bullet>

recommended_next_action:
- <bullet>

---

## NEXT

next_role_code: <ROLE_CODE>
next_role_display: "<DisplayName>"
```

---

## PACKET KIND REFERENCE

| Kind | When Used | Required Fields |
|------|-----------|-----------------|
| `TASK` | Normal task assignment | tasks, expected_outputs |
| `HALT` | Ant cannot proceed | halt_reason, evidence |
| `DEBUGGER_REQUEST` | Trinity → Morpheus | parent_ant_id, halt_reason |
| `REACTIVATE_ANT` | After diagnosis → Ant | parent_ant_id, attempt_number, backup_ref |
| `HORSEMEN_REQUEST` | Failed reattempt → Sentinels | evidence from original + debugger + failed reattempt |
| `BACKUP_GATE` | Before reattempt/horsemen | backup_ref, validation |
| `EVALUATION` | Any role → BECCA | self_checklist, evidence_links |
| `BECCA_REVIEW_REQUEST` | Trinity → Source (high-risk tasks) | becca_review_scope, evidence_links |

---

## EXAMPLE: Normal Task Packet

```markdown
# TASK PACKET

packet_kind: TASK

packet_id: PKT_C023_fitness-vsl_BQ_to_ANT-CODER_001
run_id: run_C023_fitness-vsl_2026-02-02_001

target_name: "IAMBECCA | C023 | LANDING | fitness-vsl | ORACLE"
client_id: C023
project_type: LANDING
project_slug: fitness-vsl
matrix_codename: ORACLE

from_role_code: BQ
from_role_display: "Trinity"
from_old_name: "Baby Queen"

to_role_code: ANT-CODER
to_role_display: "Neo"
to_old_name: "Ant Coders"

---

## CONTEXT SUMMARY
- Building hero section for fitness VSL landing page
- Must integrate with existing Tailwind setup

## INPUTS (paths)
- frontend/src/app/page.tsx
- frontend/src/components/Hero.tsx

## TASKS
- [ ] Create responsive hero section
- [ ] Add CTA button with tracking
- [ ] Ensure mobile-first design

## EXPECTED OUTPUTS (paths)
- frontend/src/components/HeroSection.tsx (new)
- frontend/src/app/page.tsx (modified)

## STOP CONDITIONS
- Stop if design system conflicts detected
- Stop if TypeScript errors cannot be resolved
- Stop if tests fail after changes

---

## NEXT

next_role_code: BQ
next_role_display: "Trinity"
```

---

## EXAMPLE: HALT Packet

```markdown
# TASK PACKET

packet_kind: HALT

packet_id: PKT_C023_fitness-vsl_ANT-CODER_to_BQ_017
run_id: run_C023_fitness-vsl_2026-02-02_001

target_name: "IAMBECCA | C023 | LANDING | fitness-vsl | ORACLE"

from_role_code: ANT-CODER
from_role_display: "Neo"

to_role_code: BQ
to_role_display: "Trinity"

parent_ant_id: ANT-001
halt_reason: "TypeScript compilation error - cannot resolve module"

---

## CONTEXT SUMMARY
- Attempted to create HeroSection component
- Import statement failing for design tokens

## EVIDENCE
- Error log: `error TS2307: Cannot find module '@/design/tokens'`
- File: frontend/src/components/HeroSection.tsx:3
- Build output: `npm run build` fails

## ATTEMPTED
- Checked tsconfig.json paths
- Verified @/ alias setup
- Searched for design/tokens directory (not found)

## REQUESTED ACTION
Debugger diagnosis required

---

## NEXT

next_role_code: ANT-DEBUGGER
next_role_display: "Morpheus"
```

---

## EXAMPLE: REACTIVATE_ANT Packet

```markdown
# TASK PACKET

packet_kind: REACTIVATE_ANT

packet_id: PKT_C023_fitness-vsl_BQ_to_ANT-CODER_021
run_id: run_C023_fitness-vsl_2026-02-02_001

target_name: "IAMBECCA | C023 | LANDING | fitness-vsl | ORACLE"

from_role_code: BQ
from_role_display: "Trinity"

to_role_code: ANT-CODER
to_role_display: "Neo"

parent_ant_id: ANT-001
attempt_number: 1

---

## CONTEXT SUMMARY
- Morpheus diagnosed missing design tokens module
- BACKUP_GATE passed
- Ready to reattempt with fix instructions

## DEBUGGER FINDINGS (reference)
- Path: outbox/debugger/DBG-ANT-001-001.md
- Root cause: Design tokens not exported from index
- Fix: Create frontend/src/design/tokens.ts and export

## FIX INSTRUCTIONS (from Morpheus)
1. Create frontend/src/design/tokens.ts
2. Export color and spacing tokens
3. Update tsconfig.json paths if needed
4. Retry HeroSection import

## VERIFICATION STEPS
1. `npm run build` should pass
2. Import should resolve
3. Component should render

---

## BACKUP GATE

requires_backup_gate: true
backup_ref: abc123def (commit hash)
backup_validation_required: true
BACKUP_GATE: PASS (verified)

---

## NEXT

next_role_code: BQ
next_role_display: "Trinity"
```
