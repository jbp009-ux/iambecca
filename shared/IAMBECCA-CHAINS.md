# IAMBECCA-CHAINS v1.1.0
## Chain Registry — Canonical Definition of All Role Chains

**Version:** 1.1.0
**Date:** 2026-02-05
**Purpose:** Single source of truth for all chains, their order, and baton paths

---

## Frozen Rule

Chains are canonical. A chain may only be changed with:
```
🔑 APPROVED: CHAIN_UPDATE — by BECCA (IM-01)
```

Any modification without this approval token is:
```
🔑 REJECTED: unauthorized chain modification
```

---

## Chain: SA (Security Audit)

```
chain_id: CHAIN_SA
purpose: Security audit from detection → verdict
trigger: "security audit activate" or BECCA routes to SA-01

order:
  1. SA-01 Data Leaks (The Leak Hunter)
  2. SA-02 Tenant Isolation (The Wall Builder)
  3. SA-03 Auth & Secrets (The Vault Keeper)
  4. SA-04 OWASP (The Vulnerability Hunter)
  5. SA-05 Security Verdict (The Judge)
  6. IM-01 BECCA (Source) ← FINAL RETURN

total_steps: 5 (before BECCA return)
```

### Handoff Rule (CHAIN_SA)

- Each step MUST write a disk baton packet to the next role's inbox
- Each step MUST include CHAIN_CONTINUATION block in its report
- Each step MUST update runtime/runs/<run_id>/state/ files

### Disk Baton Paths (CHAIN_SA)

```
inbox/security-audit/PKT_<run_id>_SA-01_to_SA-02_<seq>.md
inbox/security-audit/PKT_<run_id>_SA-02_to_SA-03_<seq>.md
inbox/security-audit/PKT_<run_id>_SA-03_to_SA-04_<seq>.md
inbox/security-audit/PKT_<run_id>_SA-04_to_SA-05_<seq>.md
inbox/becca/PKT_<run_id>_SA-05_to_BECCA_<seq>.md
```

### Final Output (CHAIN_SA)

```
outbox/security-audit/SECURITY_VERDICT_<run_id>.md
audit/security-audit/SUMMARY_<run_id>.md (optional aggregation)
```

### Activation Phrases (CHAIN_SA)

| Step | Role | Activation Phrase |
|------|------|-------------------|
| 1 | SA-01 | "data leaks activate" OR "sa-01 activate" |
| 2 | SA-02 | "tenant isolation activate" OR "sa-02 activate" |
| 3 | SA-03 | "auth secrets activate" OR "sa-03 activate" |
| 4 | SA-04 | "owasp activate" OR "sa-04 activate" |
| 5 | SA-05 | "security verdict activate" OR "sa-05 activate" |
| RETURN | BECCA | "BECCA activate" |

---

## Chain: HM (Horsemen / Sentinel Audit)

```
chain_id: CHAIN_HM
purpose: High-severity review and final gating when escalated
trigger: BECCA escalates critical issues to Horsemen

order:
  1. HM-01 Hallucination Hunter
  2. HM-02 Amnesia Detector
  3. HM-03 Drift Tracker
  4. HM-04 Privilege Creep Monitor
  5. HM-05 Silent Failure Detector
  6. IM-01 BECCA (Source) ← FINAL RETURN

total_steps: 5 (before BECCA return)
```

### Disk Baton Paths (CHAIN_HM)

```
inbox/horsemen/PKT_<run_id>_HM-01_to_HM-02_<seq>.md
inbox/horsemen/PKT_<run_id>_HM-02_to_HM-03_<seq>.md
inbox/horsemen/PKT_<run_id>_HM-03_to_HM-04_<seq>.md
inbox/horsemen/PKT_<run_id>_HM-04_to_HM-05_<seq>.md
inbox/becca/PKT_<run_id>_HM-05_to_BECCA_<seq>.md
```

### Final Output (CHAIN_HM)

```
outbox/horsemen/HORSEMEN_VERDICT_<run_id>.md
```

---

## Chain: CORE_EXEC (Core Execution — Main Workflow)

```
chain_id: CHAIN_CORE_EXEC
purpose: Full execution cycle from planning to completion
trigger: BECCA initializes run and routes to Oracle

order:
  1. IM-02 Oracle (Planner) — Creates plan
  2. IM-04 Trainman (Distributor) — Distributes tasks
  3. IM-03 Trinity (Executor) — Manages Ants
  4. IM-12 Ghost Twins (Reviewer) — Validates batch
  5. IM-02 Oracle (Closer) — Health report
  6. IM-01 BECCA (Source) ← FINAL RETURN

total_steps: 5 (before BECCA return)
```

### Disk Baton Paths (CHAIN_CORE_EXEC)

```
inbox/oracle/PKT_<run_id>_BECCA_to_Oracle_<seq>.md
inbox/distributor/PKT_<run_id>_Oracle_to_Trainman_<seq>.md
inbox/bq/PKT_<run_id>_Trainman_to_Trinity_<seq>.md
inbox/ghost/PKT_<run_id>_Trinity_to_Ghost_<seq>.md
inbox/oracle/PKT_<run_id>_Ghost_to_Oracle_<seq>.md
inbox/becca/PKT_<run_id>_Oracle_to_BECCA_<seq>.md
```

---

## Chain: PM (Prompt Maker — Prompt Improvement)

```
chain_id: CHAIN_PM
purpose: Prompt improvement pipeline for role optimization
trigger: Architect ingests scores and triggers improvement cycle

order:
  1. PM-00 Prompt Architect (Designer)
  2. PM-01 Morpheus (Hallucination Analysis)
  3. PM-02 Architect (Amnesia Analysis)
  4. PM-03 Sentinel (Drift Analysis)
  5. PM-04 Keymaker (Privilege Analysis)
  6. PM-05 Analyst (Consolidator)
  7. IM-01 BECCA (Source) ← FINAL RETURN

total_steps: 6 (before BECCA return)
```

### Disk Baton Paths (CHAIN_PM)

```
inbox/prompt-maker/PKT_<run_id>_PM-00_to_PM-01_<seq>.md
inbox/prompt-maker/PKT_<run_id>_PM-01_to_PM-02_<seq>.md
inbox/prompt-maker/PKT_<run_id>_PM-02_to_PM-03_<seq>.md
inbox/prompt-maker/PKT_<run_id>_PM-03_to_PM-04_<seq>.md
inbox/prompt-maker/PKT_<run_id>_PM-04_to_PM-05_<seq>.md
inbox/becca/PKT_<run_id>_PM-05_to_BECCA_<seq>.md
```

---

## Chain: DESIGN_FIRST (Wireframe-First UI Workflow)

```
chain_id: CHAIN_DESIGN_FIRST
purpose: UI features start with wireframe in Figma before code
trigger: Oracle marks phase as UI_FEATURE requiring wireframe

order:
  1. IM-03 Trinity (assigns wireframe task to Niobe)
  2. IM-10 Niobe (ANT-UI) creates wireframe in Figma
  3. IM-03 Trinity (reviews wireframe, prepares for BECCA approval)
  4. IM-01 BECCA (approves wireframe — 🔑 WIREFRAME_APPROVED)
  5. IM-03 Trinity (assigns code tasks referencing approved wireframe)
  6. IM-05 Neo (ANT-CODER) implements UI from wireframe
  7. IM-10 Niobe (verifies implementation matches wireframe)

total_steps: 7 (Trinity orchestrates both design and code phases)
```

### DESIGN_FIRST Doctrine (FROZEN)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   NO UI CODE WITHOUT APPROVED WIREFRAME.                                    │
│                                                                             │
│   For any task flagged as UI_FEATURE:                                       │
│   1. Niobe creates wireframe FIRST in Figma                                 │
│   2. BECCA approves wireframe (🔑 WIREFRAME_APPROVED)                       │
│   3. ONLY THEN can Neo code the UI                                          │
│                                                                             │
│   Skipping wireframe for UI features = 🔑 REJECTED: missing wireframe       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Disk Baton Paths (CHAIN_DESIGN_FIRST)

```
inbox/bq/PKT_<run_id>_Trinity_to_Niobe_WIREFRAME_<seq>.md
outbox/ants/WIREFRAME_ANT-<NNN>.md (Figma link + export)
inbox/becca/PKT_<run_id>_Trinity_to_BECCA_WIREFRAME_REVIEW_<seq>.md
inbox/bq/PKT_<run_id>_BECCA_to_Trinity_WIREFRAME_APPROVED_<seq>.md
inbox/ants/PKT_<run_id>_Trinity_to_Neo_WITH_WIREFRAME_<seq>.md
outbox/ants/ANT_REPORT_ANT-<NNN>.md + inbox/bq/PKT_<run_id>_ANT-<NNN>_to_Trinity_<seq>.md
inbox/bq/PKT_<run_id>_Trinity_to_Niobe_VERIFY_IMPL_<seq>.md
```

### Wireframe Artifact Format

```markdown
# WIREFRAME: <feature_name>

wireframe_id: WF_<run_id>_<seq>
figma_file: <Figma file URL>
figma_page: <page name>
figma_frame: <frame name>
exported_images: outbox/ants/evidence/wireframe/<wireframe_id>/

## DESIGN DECISIONS
- <decision 1>
- <decision 2>

## COMPONENT BREAKDOWN
| Component | Figma Node ID | Description |
|-----------|---------------|-------------|
| <name> | <node_id> | <what it does> |

## INTERACTION NOTES
- <user flow description>
- <state transitions>

## APPROVAL
🔑 PENDING_WIREFRAME_APPROVAL
```

### When DESIGN_FIRST Applies

| Task Type | Requires Wireframe? | Reason |
|-----------|---------------------|--------|
| New UI component | YES | Visual design must be approved first |
| UI layout change | YES | Layout affects UX, needs review |
| New page/screen | YES | Full page needs wireframe |
| Style-only change | NO | Colors, fonts — no layout impact |
| Bug fix | NO | Restoring existing behavior |
| Backend-only | NO | No visual component |

**Flag in Oracle's plan:** `ui_feature: true` triggers CHAIN_DESIGN_FIRST

---

## Chain: WORKER_BATCH (Worker Batch — Ant Task Execution)

```
chain_id: CHAIN_WORKER_BATCH
purpose: Batch task execution with validation
trigger: Trinity receives tasks from Trainman

order:
  1. IM-03 Trinity (assigns tasks)
  2. Worker Ants (Neo, Tank, Seraph, Link, Niobe, Apoc)
  3. IM-03 Trinity (collects reports, verifies)
  4. IM-12 Ghost Twins (validates batch)
  5. IM-03 Trinity (writes CERTIFICATE)

total_steps: 5 (Trinity manages the batch)
```

### Disk Baton Paths (CHAIN_WORKER_BATCH)

```
inbox/ants/PKT_<run_id>_Trinity_to_ANT-XXX_<seq>.md
outbox/ants/ANT_REPORT_ANT-XXX.md + inbox/bq/PKT_<run_id>_ANT-XXX_to_Trinity_<seq>.md
inbox/ghost/PKT_<run_id>_Trinity_to_Ghost_<seq>.md
outbox/ghost/ARCHIVE_BATCH-XXX.md + inbox/bq/PKT_<run_id>_Ghost_to_Trinity_<seq>.md
audit/reviews/CERT_BATCH-XXX_PASS.md
```

### Ant Completion (TWO ARTIFACTS REQUIRED)

When an Ant completes, they MUST produce:

1. **Output artifact** → `outbox/ants/ANT_REPORT_ANT-XXX.md`
2. **Baton packet** → `inbox/bq/PKT_<run_id>_ANT-XXX_to_Trinity_<seq>.md`

This ensures Trinity can watch inbox/bq for handoffs while reports persist in outbox.

---

## Baton Packet Format (Canonical)

Every disk baton packet MUST contain:

```markdown
# BATON PACKET

packet_id: PKT_<run_id>_<from>_to_<to>_<seq>
run_id: <run_id>
target_name: <target project name>
chain_id: <CHAIN_SA|CHAIN_HM|CHAIN_PM|CHAIN_WORKER>
from_role: <role code and display>
to_role: <role code and display>
timestamp: <ISO timestamp>

---

## CHAIN POSITION

step_completed: <X>
step_total: <Y>
next_step: <X+1>
next_role: <next role display>
next_activation: <activation phrase>

---

## PAYLOAD

<findings, data, or instructions for next role>

---

## REQUIRED FROM NEXT ROLE

<what the next role must produce>

---

## STOP CONDITIONS

<when the next role should ABORT>
```

---

## Chain Validation Rules

Before starting work, every chain role MUST verify:

| Check | Action if Failed |
|-------|------------------|
| chain_id present | 🔑 REJECTED: missing chain_id |
| step matches expected | 🔑 REJECTED: step mismatch |
| from_role is previous step | 🔑 REJECTED: unexpected sender |
| target_name matches active project | BECCA ABORT: target mismatch |
| payload contains required data | 🔑 REJECTED: incomplete payload |

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  IAMBECCA CHAINS REGISTRY v1.1.0 — QUICK REFERENCE              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CHAIN_SA (Security Audit):                                     │
│  SA-01 → SA-02 → SA-03 → SA-04 → SA-05 → BECCA                  │
│                                                                 │
│  CHAIN_HM (Horsemen):                                           │
│  HM-01 → HM-02 → HM-03 → HM-04 → HM-05 → BECCA                  │
│                                                                 │
│  CHAIN_PM (Planning):                                           │
│  Oracle → Trinity → BECCA                                       │
│                                                                 │
│  CHAIN_DESIGN_FIRST (Wireframe-First UI): ← NEW                 │
│  Niobe (wireframe) → BECCA (approve) → Neo (code) → Niobe (verify)│
│                                                                 │
│  CHAIN_WORKER (Single Task):                                    │
│  Ant → Trinity → (optional BECCA)                               │
│                                                                 │
│  EVERY HANDOFF REQUIRES:                                        │
│  1. Disk baton packet to next role's inbox                      │
│  2. Runtime state files updated                                 │
│  3. CHAIN_CONTINUATION block in report                          │
│                                                                 │
│  FROZEN: Chains cannot change without BECCA approval            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.1.0] 2026-02-05
- **NEW CHAIN:** CHAIN_DESIGN_FIRST (Wireframe-First UI Workflow)
  - UI features must start with wireframe in Figma before coding
  - Niobe creates wireframe → BECCA approves → Neo codes → Niobe verifies
  - DESIGN_FIRST Doctrine: No UI code without approved wireframe
  - Wireframe artifact format with Figma links and component breakdown
  - "When DESIGN_FIRST Applies" decision table
  - Disk baton paths for wireframe workflow
- Updated Quick Reference with CHAIN_DESIGN_FIRST

### [1.0.0] 2026-02-04
- Initial release
- Defines CHAIN_SA (Security Audit)
- Defines CHAIN_HM (Horsemen)
- Defines CHAIN_PM (Planning)
- Defines CHAIN_WORKER (Single Task)
- Canonical baton packet format
- Chain validation rules
