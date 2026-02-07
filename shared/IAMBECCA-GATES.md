# IAMBECCA-GATES v1.6.0

**Purpose:** State machine, transitions, approval tokens, STOP rules, and bulletproof protocols
**Scope:** Loaded with ALL IAMBecca roles
**Source:** Ported from Prompt Architect v2.6.0 + IAMBecca vFinal++ spec

---

## 1) Canonical State Machine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   IAMBECCA STATE MACHINE v1.1.0                                             │
│                                                                             │
│   ┌──────────────┐                                                          │
│   │    START     │                                                          │
│   └──────┬───────┘                                                          │
│          │                                                                  │
│          ▼                                                                  │
│   ┌──────────────┐                                                          │
│   │ P0_INVENTORY │ ← Source (BECCA) creates run, locks, runboard            │
│   └──────┬───────┘                                                          │
│          │                                                                  │
│          ▼                                                                  │
│   ┌──────────────┐                                                          │
│   │   ANALYZE    │ ← Oracle (MQ) + Merovingian (PLANNER)                    │
│   └──────┬───────┘                                                          │
│          │                                                                  │
│          ▼                                                                  │
│   ┌──────────────┐                                                          │
│   │   PROPOSE    │ ← Trainman (DISTRIBUTOR) + Oracle (MQ)                   │
│   └──────┬───────┘                                                          │
│          │                                                                  │
│          ▼                                                                  │
│   ┌──────────────┐     ┌─────────────────────────────────────────┐          │
│   │  IMPLEMENT   │────►│ DEBUGGING SUB-FLOW (inside IMPLEMENT)   │          │
│   └──────┬───────┘     │                                         │          │
│          │             │ HALT → DEBUGGER_REQUEST → BACKUP_GATE   │          │
│          │             │ → REACTIVATE_ANT → (retry)              │          │
│          │             │ → HORSEMEN_REQUEST (if still fails)     │          │
│          │             │ → BACKUP_GATE → REACTIVATE_ANT          │          │
│          │             └─────────────────────────────────────────┘          │
│          │                                                                  │
│          ▼                                                                  │
│   ╔══════════════════════════════════════════════════════════════════════╗  │
│   ║              BATCH CLOSURE CORRIDOR (Non-Negotiable)                 ║  │
│   ╠══════════════════════════════════════════════════════════════════════╣  │
│   ║                                                                      ║  │
│   ║  1. ANT SELF-EVALS ──► 2. BQ PER-ANT VERIFY ──► 3. BQ BATCH VERIFY  ║  │
│   ║         │                       │                       │            ║  │
│   ║         ▼                       ▼                       ▼            ║  │
│   ║  4. GHOST ARCHIVE ──► 5. GHOST VALIDATE ──► 6. CERTIFICATE          ║  │
│   ║                              │                       │               ║  │
│   ║                              │                       ▼               ║  │
│   ║                              │              (if PASS → Oracle)       ║  │
│   ║                              │                                       ║  │
│   ║                              └──► (if FAIL → back to Trinity)        ║  │
│   ║                                                                      ║  │
│   ╚══════════════════════════════════════════════════════════════════════╝  │
│          │                                                                  │
│          ▼                                                                  │
│   ┌──────────────┐                                                          │
│   │    REVIEW    │ ← Ghost Twins + Agents + Evidence Validation             │
│   └──────┬───────┘                                                          │
│          │                                                                  │
│          ▼                                                                  │
│   ┌───────────────┐                                                         │
│   │ HEALTH_REPORT │ ← Oracle closure + BECCA finalization                   │
│   └──────┬────────┘                                                         │
│          │                                                                  │
│          ▼                                                                  │
│   ┌──────────────┐                                                          │
│   │   COMPLETE   │                                                          │
│   └──────────────┘                                                          │
│                                                                             │
│   Optional branches:                                                        │
│   • PM_PIPELINE (tool/automation integration)                               │
│   • PMX_ANALYZE (prompt governance checks)                                  │
│                                                                             │
│   Terminal exception:                                                       │
│   • HALTED (requires human intervention)                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2) State Ownership

| State | Owner(s) | Actions |
|-------|----------|---------|
| `P0_INVENTORY` | Source (BECCA) | Create run_id, lock project, initialize runboard, verify folders |
| `ANALYZE` | Oracle (MQ) + Merovingian (PLANNER) | Produce plan, constraints, risks, definition of done |
| `PROPOSE` | Trainman (DISTRIBUTOR) + Oracle (MQ) | Create distribution packets, directives, task assignments |
| `WIREFRAME` | Niobe (ANT-UI) | Create wireframe in Figma for UI features (CHAIN_DESIGN_FIRST) |
| `WIREFRAME_REVIEW` | Trinity (BQ) + BECCA | Review wireframe, approve or reject |
| `IMPLEMENT` | Trinity (BQ) + Ants | Execute tasks, produce code/artifacts, collect evidence |
| `VERIFY_BATCH` | Trinity (BQ) + Ghost Twins | Batch closure corridor — self-evals, verifications, archive, certificate |
| `REVIEW` | Ghost Twins + Agents | Validate evidence, extract debugger addendum, inspection verdict |
| `HEALTH_REPORT` | Oracle (MQ) + Source (BECCA) | Publish metrics, failure modes, prompt tuning inputs |
| `PM_PIPELINE` | Automation tools | Run validators, collect tool results, evidence gathering |
| `PMX_ANALYZE` | Architect + Keymaker | Prompt governance, drift checks, privilege checks |
| `HALTED` | Human | Intervention required, system paused |

---

## 3) State Transitions

### 3.1 Valid Transitions

| From | To | Trigger |
|------|----|---------|
| START | P0_INVENTORY | Human initiates project |
| P0_INVENTORY | ANALYZE | Run initialized, `🔑 APPROVED: ACTIVATE Oracle` |
| ANALYZE | PROPOSE | Plan complete, `🔑 APPROVED: ACTIVATE Trainman` |
| PROPOSE | WIREFRAME | Task flagged `ui_feature: true`, `🔑 APPROVED: WIREFRAME REQUIRED` |
| PROPOSE | IMPLEMENT | No wireframe needed, `🔑 APPROVED: ACTIVATE Trinity` |
| WIREFRAME | WIREFRAME_REVIEW | Niobe completes wireframe, `🔑 PENDING_WIREFRAME_APPROVAL` |
| WIREFRAME_REVIEW | IMPLEMENT | BECCA approves, `🔑 WIREFRAME_APPROVED` |
| WIREFRAME_REVIEW | WIREFRAME | BECCA rejects, `🔑 REJECTED: <wireframe deficiency>` |
| IMPLEMENT | VERIFY_BATCH | All ants complete, self-evals collected |
| VERIFY_BATCH | REVIEW | Batch closure corridor complete, `🔑 APPROVED: ACTIVATE Ghost Twins` |
| REVIEW | VERIFY_BATCH | Ghost REJECTED, `🔑 REJECTED: <deficiency>` (back to Trinity) |
| VERIFY_BATCH | HEALTH_REPORT | Certificate issued, `🔑 CERTIFIED: BATCH-<NNN> READY FOR ORACLE` |
| HEALTH_REPORT | COMPLETE | Final report, `🔑 APPROVED: RUN COMPLETE` |
| Any | HALTED | Unrecoverable error, human intervention needed |
| Any | PM_PIPELINE | Tool integration required |
| Any | PMX_ANALYZE | Prompt governance check required |

### 3.2 Task Progress File Gate (MANDATORY)

**Before ANY state transition, role MUST have:**

| Check | Requirement |
|-------|-------------|
| Progress file exists | `runtime/runs/<run_id>/progress/TASK_<role>_<task_id>.md` |
| Status updated | Current status reflects actual state |
| Completed tasks marked | All finished tasks have `status: COMPLETED` |
| Checkpoint log current | Last entry within 5 minutes |

**⚠️ CRITICAL: MARK DONE IMMEDIATELY**
```
Every time you complete a task or subtask:
1. STOP → Update progress file: status: COMPLETED
2. Add CHECKPOINT LOG entry with ✅ Result
3. THEN move to next task

DO NOT batch completions. Mark DONE the INSTANT you finish.
```

**If chat crashes, the next session reads the progress file to resume exactly where you left off.**

### 3.3 Invalid Transitions (BLOCKED)

- Cannot skip states (e.g., P0_INVENTORY → IMPLEMENT is INVALID)
- Cannot transition without approval token
- Cannot transition from HALTED without human intervention

---

## 4) Approval Token Pattern (FROZEN)

Every role, at completion, MUST output exactly ONE approval line:

```
🔑 APPROVED: {scope}
🔑 APPROVED WITH CHANGES: {scope} — {changes}
🔑 REJECTED: {reason}
```

> **Cross-reference:** For **sub-gates within IMPLEMENT** (D0→D1→D2→D3→D4→REPORT),
> permission levels (Level 0-3), truthy diffs, backup law, and token authenticity rules,
> see **`shared/IAMBECCA-PROTOCOL.md`**.
>
> The IMPLEMENT state is NOT a single gate. It contains **mini-gates** that Ants must
> traverse one at a time, each requiring an explicit approval token from Trinity before
> proceeding to the next step. See IAMBECCA-PROTOCOL Section 1 (Gate Progression).

### 4.1 Token Rules

| Rule | Description |
|------|-------------|
| Prefix required | Must start with `🔑` emoji |
| Exactly one | Only one approval token per role output |
| Scope required | Must specify what is being approved |
| Logged to disk | Token must be written to packet/runboard |

### 4.2 Token Examples

```
🔑 APPROVED: ACTIVATE Oracle
🔑 APPROVED: ACTIVATE Trinity
🔑 APPROVED WITH CHANGES: ACTIVATE Neo — added security requirement
🔑 REJECTED: Evidence missing for test coverage claim
🔑 APPROVED: RUN COMPLETE
🔑 WIREFRAME_APPROVED: <feature_name> ready for implementation
🔑 PENDING_WIREFRAME_APPROVAL: Wireframe submitted for BECCA review
```

### 4.3 Wireframe Tokens (CHAIN_DESIGN_FIRST)

| Token | When Used | Issued By |
|-------|-----------|-----------|
| `🔑 PENDING_WIREFRAME_APPROVAL` | Niobe completes wireframe | Niobe (IM-10) |
| `🔑 WIREFRAME_APPROVED` | BECCA approves wireframe | BECCA (IM-01) |
| `🔑 REJECTED: <wireframe deficiency>` | Wireframe needs changes | BECCA (IM-01) |

**WIREFRAME_APPROVED unlocks IMPLEMENT state for UI tasks.**

---

## 5) Activation Protocol (FROZEN)

### 5.1 Human Activation Ritual

Every role transition ends with:
```
NEXT: Activate <Role>?
```

Human responds with:
```
I am.
```

### 5.2 Activation Response Header (REQUIRED)

Upon activation, role MUST output:
```
I am <DisplayName> (<RoleCode>).
Old name: <OldName>
Target: <target_name>
I_AM_STATE: <state>
Read: <paths>
Write: <paths>
Stop conditions: <bullets>
Next expected: <role>
```

---

## 6) Debugging Sub-Flow (Inside IMPLEMENT)

### 6.1 Halt Sequence

```
ANT HALT
    │
    ▼
Trinity receives HALT packet
    │
    ▼
Trinity creates DEBUGGER_REQUEST
    │
    ▼
Morpheus (ANT-DEBUGGER) performs DIAGNOSTIC ONLY
    │ (NO CODE EDITS - produces fix instructions)
    ▼
BACKUP_GATE (MUST PASS before reattempt)
    │
    ▼
Trinity creates REACTIVATE_ANT packet
    │
    ▼
Ant reattempts with debugger guidance
    │
    ├─── SUCCESS → Continue to REVIEW
    │
    └─── FAIL → HORSEMEN_REQUEST
              │
              ▼
         BACKUP_GATE (MUST PASS again)
              │
              ▼
         Sentinels provide guidance
              │
              ▼
         Trinity creates REACTIVATE_ANT
              │
              ▼
         Ant reattempts with Sentinels guidance
```

### 6.2 Packet Kinds (for packet_kind field)

| Kind | When Used |
|------|-----------|
| `TASK` | Normal task assignment |
| `HALT` | Ant cannot proceed |
| `DEBUGGER_REQUEST` | Trinity → Morpheus |
| `REACTIVATE_ANT` | Morpheus/Trinity → Ant with guidance |
| `HORSEMEN_REQUEST` | Trinity → Sentinels (only after failed reattempt) |
| `BACKUP_GATE` | Before any reattempt or horsemen action |
| `EVALUATION` | Any role → BECCA for evaluation |
| `BECCA_REVIEW_REQUEST` | Trinity → Source for high-risk task verification (always for Neo) |
| `WIREFRAME_TASK` | Trinity → Niobe for wireframe creation |
| `WIREFRAME_REVIEW_REQUEST` | Trinity → BECCA for wireframe approval |
| `WIREFRAME_APPROVED` | BECCA → Trinity confirming wireframe ready for coding |
| `TASK_WITH_WIREFRAME` | Trinity → Neo with approved wireframe reference |

### 6.3 Debugger Doctrine (LAW)

| Rule | Enforcement |
|------|-------------|
| Debugger is DIAGNOSTIC ONLY | Morpheus produces fix instructions, NOT code |
| Debugger reactivates halted Ant | REACTIVATE_ANT packet with findings |
| Sentinels only after failed reattempt | Cannot escalate directly from HALT |
| BACKUP_GATE required | Must PASS before any reattempt or horsemen action |

---

### 6.4 HORSEMEN Escalation Path (Full Sequence)

**The complete halt chain with optional HORSEMEN escalation:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FULL HALT CHAIN WITH HORSEMEN ESCALATION                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   STAGE 1: DEBUGGER LANE                                                    │
│   ───────────────────────                                                   │
│                                                                             │
│   1. ANT HALT                    → inbox/bq/PKT_*_HALT_001.md               │
│      │                                                                      │
│   2. Trinity DEBUGGER_REQUEST    → inbox/debugger/PKT_*_BQ_to_DEBUGGER.md   │
│      │                                                                      │
│   3. Morpheus DIAGNOSTIC         → outbox/debugger/DBG-*-001.md             │
│      │ (NO CODE EDITS)                                                      │
│   4. BACKUP_GATE_001             → runtime/runs/<run_id>/BACKUP_GATE_001.md │
│      │ (MUST PASS)                                                          │
│   5. Trinity REACTIVATE_ANT      → inbox/bq/PKT_*_REACTIVATE_*_001.md       │
│      │                                                                      │
│   6. Ant reattempts with debugger guidance                                  │
│      │                                                                      │
│      ├─── SUCCESS ───────────────► Continue to REVIEW (exit halt chain)    │
│      │                                                                      │
│      └─── FAIL ─────────────────► STAGE 2: HORSEMEN LANE                   │
│                                                                             │
│   STAGE 2: HORSEMEN LANE (Only if debugger lane fails)                      │
│   ─────────────────────────────────────────────────────                     │
│                                                                             │
│   7. ANT HALT (second)           → inbox/bq/PKT_*_HALT_002.md               │
│      │                                                                      │
│   8. BACKUP_GATE_002             → runtime/runs/<run_id>/BACKUP_GATE_002.md │
│      │ (MUST PASS before HORSEMEN)                                          │
│   9. Trinity HORSEMEN_REQUEST    → inbox/horsemen/HRQ_*_001.md              │
│      │                                                                      │
│  10. Sentinels HORSEMEN_REPORT   → outbox/horsemen/HORSEMEN_REPORT_*.md     │
│      │ (NO CODE EDITS - advisory only)                                      │
│  11. BACKUP_GATE_003             → runtime/runs/<run_id>/BACKUP_GATE_003.md │
│      │ (MUST PASS before post-horsemen reattempt)                           │
│  12. Trinity REACTIVATE_ANT      → inbox/bq/PKT_*_REACTIVATE_*_FROM_HORSEMEN│
│      │                                                                      │
│  13. Ant reattempts with Sentinels guidance                                 │
│      │                                                                      │
│      ├─── SUCCESS ───────────────► Continue to REVIEW (exit halt chain)    │
│      │                                                                      │
│      └─── FAIL ─────────────────► HUMAN INTERVENTION REQUIRED              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.5 HORSEMEN Escalation Prerequisites (ALL Required)

**Sentinels may ONLY be activated if ALL conditions are met:**

| # | Condition | Evidence Required |
|---|-----------|-------------------|
| 1 | First HALT packet exists | `inbox/bq/PKT_*_HALT_001.md` |
| 2 | Debugger ran DIAGNOSTIC | `outbox/debugger/DBG-*-001.md` |
| 3 | BACKUP_GATE_001 PASS | `runtime/runs/<run_id>/BACKUP_GATE_001.md` |
| 4 | Trinity issued REACTIVATE_ANT | `inbox/bq/PKT_*_REACTIVATE_*_001.md` |
| 5 | Ant attempted fix and FAILED AGAIN | `inbox/bq/PKT_*_HALT_002.md` |
| 6 | BACKUP_GATE_002 PASS | `runtime/runs/<run_id>/BACKUP_GATE_002.md` |

**If any condition missing:** `🔑 REJECTED: invalid escalation path`

### 6.6 Invalid Escalation Rules (BLOCKED)

| Attempt | Rejection |
|---------|-----------|
| Escalate directly from first HALT to HORSEMEN | `🔑 REJECTED: must exhaust debugger lane first` |
| Skip BACKUP_GATE_001 before first reattempt | `🔑 REJECTED: backup gate required` |
| Skip BACKUP_GATE_002 before HORSEMEN | `🔑 REJECTED: backup gate required before escalation` |
| Skip BACKUP_GATE_003 before post-horsemen reattempt | `🔑 REJECTED: backup gate required before reattempt` |
| HORSEMEN_REQUEST without debugger DIAGNOSTIC | `🔑 REJECTED: debugger not run — escalation invalid` |
| HORSEMEN_REQUEST without failed reattempt | `🔑 REJECTED: no reattempt — debugger path not exhausted` |

### 6.7 Sentinels Doctrine (LAW)

| Rule | Enforcement |
|------|-------------|
| Sentinels are ADVISORY ONLY | They produce instructions, NOT code |
| May propose rollback | Must route to BECCA for approval |
| May require stricter tests | Document in HORSEMEN_REPORT |
| May require isolation fixes | Document in HORSEMEN_REPORT |
| Any destructive action | MUST be routed to BECCA for approval |
| Decision types | PASS_WITH_PLAN / FAIL_HALT / REQUIRE_BECCA_APPROVAL |

### 6.8 Backup Gate Summary

| Gate | When Required | Purpose |
|------|---------------|---------|
| BACKUP_GATE_001 | After Morpheus DIAGNOSTIC | Before first reattempt |
| BACKUP_GATE_002 | After second HALT | Before HORSEMEN activation |
| BACKUP_GATE_003 | After Sentinels REPORT | Before post-horsemen reattempt |

**BACKUP_GATE is NON-NEGOTIABLE. Cannot proceed until PASS.**

### 6.9 Wireframe Sub-Flow (CHAIN_DESIGN_FIRST)

**The wireframe-first workflow for UI features:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    WIREFRAME-FIRST UI WORKFLOW                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   TRIGGERED BY: Oracle plan includes `ui_feature: true`                     │
│                                                                             │
│   1. Trinity assigns WIREFRAME_TASK    → inbox/bq/PKT_*_WIREFRAME_*.md      │
│      │                                                                      │
│   2. Niobe creates wireframe in Figma                                       │
│      │ (Uses Figma Edit MCP: create_frame, create_text, etc.)               │
│      │                                                                      │
│   3. Niobe outputs WIREFRAME artifact  → outbox/ants/WIREFRAME_ANT-*.md     │
│      │ (Includes Figma URL, exported images, component breakdown)           │
│      │                                                                      │
│   4. Trinity WIREFRAME_REVIEW_REQUEST  → inbox/becca/PKT_*_WIREFRAME_*.md   │
│      │                                                                      │
│   5. BECCA reviews wireframe                                                │
│      │                                                                      │
│      ├─── 🔑 WIREFRAME_APPROVED ──────► PROCEED TO IMPLEMENT               │
│      │                                                                      │
│      └─── 🔑 REJECTED: <deficiency> ──► BACK TO NIOBE                      │
│                                                                             │
│   6. Trinity assigns TASK_WITH_WIREFRAME → inbox/ants/PKT_*_WITH_WF_*.md    │
│      │ (Neo receives wireframe_id and Figma references)                     │
│      │                                                                      │
│   7. Neo implements UI following approved wireframe                         │
│      │                                                                      │
│   8. Trinity assigns verification      → inbox/bq/PKT_*_VERIFY_IMPL_*.md    │
│      │                                                                      │
│   9. Niobe verifies implementation matches wireframe                        │
│      │                                                                      │
│      ├─── ✅ MATCHES ─────────────────► Continue to VERIFY_BATCH           │
│      │                                                                      │
│      └─── ❌ DEVIATION ───────────────► Neo must fix (or escalate)         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.10 Wireframe Validation Requirements

**Before BECCA can approve a wireframe:**

| Check | Required | Evidence |
|-------|----------|----------|
| Figma file URL provided | YES | Link to Figma file |
| Exported images included | YES | PNG/SVG exports in evidence folder |
| Component breakdown documented | YES | Table in WIREFRAME artifact |
| Interaction notes present | YES | User flow descriptions |
| Accessibility considered | YES | Notes on a11y approach |

**Rejection reasons:**

| Reason | Action |
|--------|--------|
| Missing component breakdown | Niobe must add component table |
| No exported images | Niobe must export Figma frames |
| UX flow unclear | Niobe must document interactions |
| Accessibility not addressed | Niobe must add a11y notes |
| Design doesn't match requirements | Niobe must revise |

---

## 7) STOP Conditions

### 7.1 Global STOP Triggers

| Trigger | Action |
|---------|--------|
| Evidence validation fails | Ghost Twins issue `🔑 REJECTED` |
| Backup gate fails | Cannot proceed until resolved |
| Human intervention requested | Transition to HALTED |
| Three failed reattempts | Escalate to human |
| Security vulnerability detected | STOP all work, notify Source |

### 7.2 Role-Specific STOP Conditions

Each role defines its own stop conditions in its role file. Common patterns:

- **Ants:** Stop when blocked, missing inputs, tests fail, or hit unforeseen complexity
- **Trinity:** Stop when >5 ants running, ant fails 3 times, or evidence incomplete
- **Ghost Twins:** Stop when evidence invalid, cannot verify claims
- **Sentinels:** Stop when security risk detected, cannot approve

---

## 8) Evidence Validation Gate

### 8.1 When Validation Runs

| Stage | Validator | Action on Fail |
|-------|-----------|----------------|
| Ant report submission | Ghost Twins | `🔑 REJECTED: evidence missing/invalid` |
| Code inspection | Agents | `🔑 REJECTED: verification failed` |
| BECCA verification | Source | `🔑 REJECTED: claims unverified` |

### 8.2 Integration with evidence_contract.py

```python
from tools.evidence_contract import validate_scout_output

validation = validate_scout_output(output, project_path, strict=True)
if not validation.valid:
    # Ghost Twins MUST reject
    return "🔑 REJECTED: " + validation.errors[0]
```

---

## 9) Batch Closure Corridor (Non-Negotiable)

**Trinity CANNOT activate Oracle unless the batch passes ALL corridor steps.**

### 9.1 Corridor Steps

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     BATCH CLOSURE CORRIDOR (7 STEPS)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Step 1: ANT SELF-EVALS                                                     │
│          Every Ant writes SE_ANT-<NNN>.md on task completion                │
│          Path: audit/self_evals/SE_ANT-<NNN>.md                             │
│                                                                             │
│  Step 2: BQ PER-ANT VERIFICATION                                            │
│          Trinity verifies each Ant's report + self-eval                     │
│          Path: audit/reviews/BQ_VERIFY_ANT-<NNN>.md                         │
│                                                                             │
│  Step 3: BQ BATCH VERIFICATION                                              │
│          Trinity verifies the entire batch is complete                      │
│          Path: audit/reviews/BQ_VERIFY_BATCH-<NNN>.md                       │
│                                                                             │
│  Step 4: GHOST ARCHIVE                                                      │
│          Ghost Twins archive all batch artifacts                            │
│          Path: outbox/ghost/ARCHIVE_BATCH-<NNN>.md                          │
│                                                                             │
│  Step 5: GHOST VALIDATION                                                   │
│          Ghost Twins validate all evidence (evidence_contract)              │
│          → 🔑 APPROVED: EVIDENCE VALIDATION PASS                            │
│          → 🔑 REJECTED: <deficiency list> (back to Trinity)                 │
│                                                                             │
│  Step 6: EVIDENCE INDEX                                                     │
│          Ghost Twins create evidence index with all proof pointers          │
│          Path: audit/evidence/INDEX_BATCH-<NNN>.md                          │
│                                                                             │
│  Step 7: CERTIFICATE                                                        │
│          Trinity writes CERTIFICATE file (only after Ghost PASS)            │
│          Path: audit/reviews/CERT_BATCH-<NNN>_PASS.md                       │
│          Token: 🔑 CERTIFIED: BATCH-<NNN> READY FOR ORACLE                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Corridor Checklist

| Requirement | Count | Artifact Path |
|-------------|-------|---------------|
| Ant Reports (8-part) | 5/5 | `outbox/ants/ANT_REPORT_ANT-<NNN>.md` |
| Ant Self-Evals | 5/5 | `audit/self_evals/SE_ANT-<NNN>.md` |
| BQ Per-Ant Verifications | 5/5 | `audit/reviews/BQ_VERIFY_ANT-<NNN>.md` |
| BQ Batch Verification | 1/1 | `audit/reviews/BQ_VERIFY_BATCH-<NNN>.md` |
| Ghost Archive | 1/1 | `outbox/ghost/ARCHIVE_BATCH-<NNN>.md` |
| Ghost Validation PASS | 1/1 | (embedded in archive) |
| Evidence Index | 1/1 | `audit/evidence/INDEX_BATCH-<NNN>.md` |
| CERTIFICATE | 1/1 | `audit/reviews/CERT_BATCH-<NNN>_PASS.md` |

### 9.3 Corridor Failure Handling

| Failure Point | Action |
|---------------|--------|
| Missing self-eval | Trinity requests Ant to produce self-eval |
| BQ verify fails | Trinity reassigns work to fix deficiencies |
| Ghost rejects | Trinity receives deficiency list, fixes, resubmits |
| Certificate blocked | Cannot proceed until all prior steps PASS |

### 9.4 Certificate Token

**Only after ALL corridor steps pass:**

```
🔑 CERTIFIED: BATCH-<NNN> READY FOR ORACLE
```

**Oracle looks for this token as the "green light" to proceed with HEALTH_REPORT.**

---

## 10) Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-GATES v1.5.0 — QUICK REFERENCE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  STATES:         P0_INVENTORY → ANALYZE → PROPOSE                           │
│                  → [WIREFRAME → WIREFRAME_REVIEW] (if ui_feature)           │
│                  → IMPLEMENT → VERIFY_BATCH → REVIEW                        │
│                  → HEALTH_REPORT → COMPLETE                                 │
│                                                                             │
│  OPTIONAL:       PM_PIPELINE | PMX_ANALYZE                                  │
│  EXCEPTION:      HALTED (human intervention)                                │
│                                                                             │
│  APPROVAL:       🔑 APPROVED: {scope}                                       │
│                  🔑 APPROVED WITH CHANGES: {scope} — {changes}              │
│                  🔑 REJECTED: {reason}                                      │
│                  🔑 CERTIFIED: BATCH-<NNN> READY FOR ORACLE (corridor pass) │
│                  🔑 WIREFRAME_APPROVED: <feature> ready for implementation  │
│                                                                             │
│  WIREFRAME-FIRST (CHAIN_DESIGN_FIRST): ← NEW                                │
│    Niobe wireframe → BECCA approve → Neo code → Niobe verify                │
│    Triggered by: `ui_feature: true` in Oracle plan                          │
│    Required for: New UI components, layout changes, new pages               │
│                                                                             │
│  ACTIVATION:     "NEXT: Activate <Role>?" → Human: "I am."                  │
│                                                                             │
│  HALT FLOW:      HALT → DEBUGGER_REQUEST → BACKUP_GATE → REACTIVATE_ANT    │
│                  → (if still fails) → HORSEMEN_REQUEST → BACKUP_GATE        │
│                  → REACTIVATE_ANT                                           │
│                                                                             │
│  DEBUGGER LAW:   DIAGNOSTIC ONLY — No code edits, produces fix instructions │
│                                                                             │
│  BACKUP GATE:    REQUIRED before any reattempt or horsemen action           │
│                                                                             │
│  BATCH CLOSURE CORRIDOR (Non-Negotiable):                                   │
│    1. Ant Self-Evals → 2. BQ Per-Ant Verify → 3. BQ Batch Verify            │
│    → 4. Ghost Archive → 5. Ghost Validate → 6. Evidence Index               │
│    → 7. CERTIFICATE                                                         │
│                                                                             │
│  CERTIFICATE:    Oracle ONLY accepts handoff with CERTIFICATE file          │
│                  Path: audit/reviews/CERT_BATCH-<NNN>_PASS.md               │
│                                                                             │
│  EVIDENCE:       Ghost Twins validate with evidence_contract.py             │
│                  Invalid evidence → 🔑 REJECTED (back to Trinity)           │
│                                                                             │
│  PROTOCOL:       shared/IAMBECCA-PROTOCOL.md — gate progression,            │
│                  permission levels (0-3), truthy diffs, backup law,         │
│                  report-to-index contract, token authenticity               │
│                                                                             │
│  IMPLEMENT SUB-GATES (per PROTOCOL):                                        │
│    D0 (FREE) → D1 (🔑 DISCOVERY APPROVED) → D2 (FOOTPRINT)                 │
│    → D3 (🔑 PATCH APPROVED) → D4 (VERIFY) → REPORT (🔑 REPORT APPROVED)   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 11) Bulletproof Protocol Enforcement (MANDATORY)

### 11.1 Required Shared Modules

Every role MUST load these modules in order:

```
1. shared/IAMBECCA-IDENTITY.md    ← "I AM" protocol (FIRST)
2. shared/IAMBECCA-CHAINS.md      ← Chain definitions
3. shared/IAMBECCA-RECOVERY.md    ← Recovery protocol
4. shared/IAMBECCA-ERRORS.md      ← Error escalation
5. shared/IAMBECCA-EVIDENCE.md    ← Evidence requirements
6. shared/IAMBECCA-GATES.md       ← This file (state machine)
7. shared/IAMBECCA-PROTOCOL.md    ← Governance token protocol (gates, permissions, truthy diffs, backup law)
8. shared/IAMBECCA-OUTPUTS.md     ← Output formats
```

### 11.2 Chain Registry Enforcement

**All chain roles MUST obey IAMBECCA-CHAINS.md:**

| Violation | Response |
|-----------|----------|
| chain_id missing in packet | 🔑 REJECTED: packet missing chain_id |
| Wrong step order | 🔑 REJECTED: chain step mismatch |
| Baton packet missing | 🔑 REJECTED: no baton packet found |
| Baton to wrong inbox | 🔑 REJECTED: baton misrouted |

### 11.3 Runtime State File Requirements

**Every role in a chain MUST maintain:**

```
runtime/runs/<run_id>/
├── state/
│   ├── CURRENT_ROLE.md       ← Who is active NOW
│   ├── CHAIN_POSITION.md     ← Step X of Y
│   ├── LAST_HANDOFF.md       ← Who handed off to whom
│   ├── ACTIVE_CHAIN.md       ← Which chain is running
│   └── EXPECTED_NEXT_ROLE.md ← Who should run next
├── progress/
│   └── TASK_<role>_<id>.md   ← Task progress files
└── errors/
    └── ERROR_<timestamp>_<role>.md ← Error logs
```

**State Update Rules:**

| Event | Files to Update |
|-------|-----------------|
| Role activates | CURRENT_ROLE (status: ACTIVE) |
| Role completes | CURRENT_ROLE (status: COMPLETE), CHAIN_POSITION, EXPECTED_NEXT_ROLE |
| Handoff | LAST_HANDOFF, write baton packet |
| Error | Error log + CURRENT_ROLE (status: PAUSED/HALTED) |
| Abort | ACTIVE_CHAIN (status: ABORTED), Error log |

### 11.4 Identity Checkpoint Rule (MANDATORY)

Every role MUST re-assert identity at these points:

| Checkpoint | When | Format |
|------------|------|--------|
| Activation | Immediately when activated | Full identity header |
| Before Handoff | Before writing baton packet | Identity verification block |
| After Long Operation | After any operation >5 minutes | Mini identity check |

**Identity Verification Block:**

```markdown
## IDENTITY CHECKPOINT

I_AM_STATE: <state>
ROLE: <Display> (<ROLE_CODE>)
RUN_ID: <run_id>
TARGET: <target_name>
CHAIN: <chain_id> step <X>/<Y>
NEXT: <expected_next_role>
```

**If identity doesn't match runtime state files:**
```
🔑 REJECTED: identity mismatch → BECCA ABORT
```

### 11.5 Packet Validation Protocol (MANDATORY)

**Before doing ANY work, validate inbound packet contains:**

| Field | Required | On Missing |
|-------|----------|------------|
| run_id | YES | 🔑 REJECTED: packet missing run_id |
| target_name | YES | 🔑 REJECTED: packet missing target_name |
| chain_id (in chain) | YES | 🔑 REJECTED: packet missing chain_id |
| from_role | YES | 🔑 REJECTED: packet missing sender |
| to_role | YES | 🔑 REJECTED: packet wrong recipient |
| required_inputs | YES | 🔑 REJECTED: packet missing inputs |
| stop_conditions | NO | Request clarification |

**Packet Validation Checklist:**

```
□ run_id present and matches active run
□ target_name matches current project
□ chain_id matches expected chain
□ from_role is previous step in chain
□ to_role matches self
□ payload contains required data
□ timestamp is reasonable (not stale)
```

### 11.6 Error Escalation Protocol (FROZEN)

**Error Categories:**

| Category | Definition | Action |
|----------|------------|--------|
| RECOVERABLE | Minor issue, can fix locally | Request info, continue |
| BLOCKER | Required input missing | PAUSE, BECCA ABORT |
| CRITICAL | Security/data risk | HALT, BECCA ABORT immediately |

**Abort Phrase (FROZEN):**

```
BECCA ABORT: <reason>
```

**Always log errors to:**
```
runtime/runs/<run_id>/errors/ERROR_<timestamp>_<role_code>.md
```

**Retry Limit (FROZEN):**
```
3 attempts maximum. After 3 failures:
🔑 REJECTED: retry limit exceeded → BECCA ABORT
```

### 11.7 Recovery Protocol Enforcement

**When context is lost, MUST execute recovery checklist:**

```
1. Read RUNBOARD.md or locks to find run_id
2. Read runtime/runs/<run_id>/state/CURRENT_ROLE.md
3. Read runtime/runs/<run_id>/state/CHAIN_POSITION.md
4. Read runtime/runs/<run_id>/state/LAST_HANDOFF.md
5. Read runtime/runs/<run_id>/state/EXPECTED_NEXT_ROLE.md
6. Verify target_name matches
7. Activate EXPECTED_NEXT_ROLE only
```

**Recovery Activation:**
```
"recovery activate"
```

### 11.8 Disk Baton Requirements for Chains

**Every chain step MUST write a disk baton packet:**

| From | To | Destination |
|------|----|-------------|
| SA-01 | SA-02 | inbox/security-audit/ |
| SA-02 | SA-03 | inbox/security-audit/ |
| SA-03 | SA-04 | inbox/security-audit/ |
| SA-04 | SA-05 | inbox/security-audit/ |
| SA-05 | BECCA | inbox/becca/ |
| HM-01..HM-04 | Next HM | inbox/horsemen/ |
| HM-05 | BECCA | inbox/becca/ |
| Oracle | Trinity | inbox/planning/ |
| Trinity | BECCA | inbox/becca/ |

**Baton naming:**
```
PKT_<run_id>_<from>_to_<to>_<seq>.md
```

---

## Changelog

### [1.6.0] 2026-02-07
- **PROTOCOL INTEGRATION:** Cross-references to new IAMBECCA-PROTOCOL.md
  - Section 4: Added cross-reference note for sub-gates within IMPLEMENT (D0→D1→D2→D3→D4→REPORT)
  - Section 10: Added PROTOCOL and IMPLEMENT SUB-GATES to Quick Reference
  - Section 11.1: Added IAMBECCA-PROTOCOL.md to required shared modules list (position 7)
  - Clarified that IMPLEMENT state contains mini-gates requiring explicit Trinity tokens
  - Gate progression, permission levels, truthy diffs, backup law now defined in PROTOCOL module

### [1.5.0] 2026-02-05
- **WIREFRAME-FIRST WORKFLOW:** Added CHAIN_DESIGN_FIRST states
  - New states: `WIREFRAME`, `WIREFRAME_REVIEW`
  - New transitions: PROPOSE → WIREFRAME (if `ui_feature: true`)
  - New approval tokens: `🔑 WIREFRAME_APPROVED`, `🔑 PENDING_WIREFRAME_APPROVAL`
  - New packet kinds: WIREFRAME_TASK, WIREFRAME_REVIEW_REQUEST, WIREFRAME_APPROVED, TASK_WITH_WIREFRAME
  - Wireframe Sub-Flow diagram (Section 6.9)
  - Wireframe Validation Requirements (Section 6.10)
  - Updated Quick Reference with wireframe flow
  - Updated State Ownership with WIREFRAME and WIREFRAME_REVIEW

### [1.4.0] 2026-02-04
- **BULLETPROOF PACK:** Added Section 11 — Bulletproof Protocol Enforcement
  - Required shared modules loading order
  - Chain Registry enforcement rules
  - Runtime state file requirements
  - Identity checkpoint rule (activation, before handoff, after long ops)
  - Packet validation protocol (mandatory checklist)
  - Error escalation protocol (RECOVERABLE/BLOCKER/CRITICAL)
  - Recovery protocol enforcement
  - Disk baton requirements for all chains

### [1.3.0] 2026-02-03
- **CRITICAL:** Added Full HORSEMEN Escalation Path (Section 6.4-6.8)
  - Complete halt chain diagram with Debugger Lane + Horsemen Lane
  - HORSEMEN escalation prerequisites (6 conditions, all required)
  - Invalid escalation rules (blocked patterns)
  - Sentinels Doctrine (advisory only, no code edits)
  - Backup Gate Summary (001, 002, 003)
- All backup gates are NON-NEGOTIABLE

### [1.2.0] 2026-02-03
- **CRITICAL:** Added BECCA_REVIEW_REQUEST packet kind
  - Trinity → Source for high-risk task verification
  - Always required for Neo (ANT-CODER) tasks
  - Triggers Becca verification and scoring

### [1.1.0] 2026-02-03
- **CRITICAL:** Added Batch Closure Corridor (Section 9)
  - 7-step mandatory quality + proof corridor
  - Trinity cannot activate Oracle without passing ALL steps
  - Added CERTIFICATE file requirement
- Added `VERIFY_BATCH` state to state machine
- Updated state machine diagram with corridor visualization
- Added `🔑 CERTIFIED` approval token
- Updated state transitions for corridor flow
- Updated State Ownership table with VERIFY_BATCH
- Updated Quick Reference with corridor and certificate

### [1.0.0] 2026-02-02
- Initial release
- Ported state machine from Prompt Architect v2.6.0
- Added IAMBecca-specific halt flow
- Integrated debugger doctrine
- Added backup gate requirements
- Defined approval token pattern
- Added evidence validation gate
