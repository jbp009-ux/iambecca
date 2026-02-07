# IAMBecca Build Plan v1.5.0

**Created:** 2026-02-02
**Updated:** 2026-02-03 (HORSEMEN Escalation Path with full disk proof)
**Repo:** `d:\projects\iambecca\` (standalone GitHub repo)
**Approach:** Structure first, BECCA first, then sequential with loop testing
**Rule:** Each role must demonstrate activation loop works before moving to next

---

## Phase 0: Folder Structure (DO FIRST)

```
iambecca/   # Standalone repo at d:\projects\iambecca\
├── IAMBECCA-BOOTSTRAP.md        ← Core protocol + invariants
├── IAMBECCA-INDEX.md            ← Router (like PMX-INDEX)
├── shared/
│   ├── IAMBECCA-EVIDENCE.md     ← Evidence contract integration
│   ├── IAMBECCA-GATES.md        ← State machine + transitions (v1.1.0)
│   └── IAMBECCA-OUTPUTS.md      ← Output contracts per state (v1.2.0)
├── roles/
│   ├── IM-01_SOURCE_BECCA.md
│   ├── IM-02_ORACLE_MQ.md
│   ├── IM-03_TRINITY_BQ.md       ← Batch Closure Corridor (v1.2.0)
│   ├── IM-04_TRAINMAN_DISTRIBUTOR.md
│   ├── IM-05_NEO_ANT-CODER.md
│   ├── IM-06_MORPHEUS_ANT-DEBUGGER.md
│   ├── IM-07_TANK_ANT-TEST.md    ← FIXED: Tank, not Merovingian
│   ├── IM-08_SERAPH_ANT-SECURITY.md
│   ├── IM-09_LINK_ANT-FIREBASE.md ← FIXED: Link, not Architect
│   ├── IM-10_NIOBE_ANT-UI.md     ← FIXED: Niobe, not Switch
│   ├── IM-11_APOC_ANT-DATA.md
│   ├── IM-12_GHOST-TWINS_ANT-REVIEW.md ← Evidence Validation Gate (v1.1.0)
│   ├── IM-13_SENTINELS_HORSEMEN.md ← FIXED: Sentinels, not Keymaker
│   ├── EXT-01_MEROVINGIAN_PLANNER.md ← Project planner (bonus)
│   └── EXT-02_KEYMAKER_PM-INSPECTOR.md ← Prompt governance (v1.1.0)
├── architect/
│   ├── IAMBECCA-ARCHITECT.md     ← Architect pipeline (v1.1.0)
│   └── IAMBECCA-PM_PIPELINE.md   ← PM Pipeline (v1.0.0) ✅
└── templates/
    ├── packet.task.md
    ├── backup_gate.md
    ├── debugger_addendum.md
    └── run_lock.json.md
```

### Phase 0 Tasks
- [x] Create folder structure
- [x] Create placeholder files

---

## Phase 1: Foundation (MUST COMPLETE BEFORE ROLES)

### 1.1 IAMBECCA-BOOTSTRAP.md
- [x] Frozen invariants (tokens, activation ritual, identity header, evidence rules, debugger doctrine)
- [x] "I am" protocol definition
- [x] Approval token patterns

### 1.2 IAMBECCA-GATES.md (shared)
- [x] State machine diagram (P0_INVENTORY → ANALYZE → PROPOSE → IMPLEMENT → REVIEW → HEALTH_REPORT)
- [x] State ownership table (who acts in each)
- [x] Transition rules
- [x] HALTED state handling
- [x] Debugging sub-flow rules

### 1.3 IAMBECCA-OUTPUTS.md (shared)
- [x] Required output skeleton (every state)
- [x] State-specific requirements
- [x] Evidence validation rules
- [x] **HARDENED:** P0_INVENTORY with 5 evidence files, RUN_LOCK.json schema, BACKUP_GATE_000 baseline

### 1.4 IAMBECCA-EVIDENCE.md (shared)
- [x] Evidence contract rules
- [x] Validator integration points (evidence_contract.py)
- [x] Rejection rules

### 1.5 IAMBECCA-INDEX.md
- [x] Role index table (IM-01 to IM-13)
- [x] Activation aliases
- [x] Shared module loading rules
- [x] Quick reference

---

## Phase 2: Templates (MUST COMPLETE BEFORE ROLES)

### 2.1 Core Templates
- [x] packet.task.md (with packet_kind + backup gate)
- [x] backup_gate.md
- [x] debugger_addendum.md (diagnostic-only)
- [x] run_lock.json.md (lock schema)

---

## Phase 3: Roles (SEQUENTIAL - TEST EACH BEFORE NEXT)

### 3.1 IM-01_SOURCE_BECCA.md (START HERE)
- [x] Identity header (I am Source (BECCA))
- [x] P0_INVENTORY ownership
- [x] Run initialization
- [x] Backup gate execution
- [x] Evaluation processing
- [x] Approval token output
- [x] **HARDENED:** 9 artifacts, 5 evidence files, RUN_LOCK.json, BACKUP_GATE_000
- [x] **TESTED:** Activation verified, output format confirmed
- [x] **ADVISOR APPROVED:** Passed clean with "🔑 APPROVED: ACTIVATE Oracle"

### 3.2 IM-02_ORACLE_MQ.md
- [x] Identity header (I am Oracle (MQ))
- [x] ANALYZE state ownership
- [x] Phase planning
- [x] Trainman packet creation
- [x] Approval token output
- [x] **TEST:** BECCA → Oracle handoff, verify packet format, verify "NEXT: Activate Trainman?" ✅ PASSED

### 3.3 IM-04_TRAINMAN_DISTRIBUTOR.md (before Trinity - Trainman creates packets)
- [x] Identity header (I am Trainman (DISTRIBUTOR))
- [x] PROPOSE state ownership
- [x] Directive packet creation
- [x] Task distribution
- [x] Approval token output
- [x] **TEST:** Oracle → Trainman handoff, verify distribution packets created ✅ PASSED

### 3.4 IM-03_TRINITY_BQ.md
- [x] Identity header (I am Trinity (BQ))
- [x] IMPLEMENT state ownership
- [x] Ant management
- [x] Halt handling (DEBUGGER_REQUEST)
- [x] Reactivation flow
- [x] Approval token output
- [x] **TEST:** Trainman → Trinity handoff, verify ant assignment ✅ PASSED
- [x] **FIXED:** Prefix drift corrected (ARCHITECT_STATE: → I_AM_STATE:) v1.2.1

### 3.5 IM-06_MORPHEUS_ANT-DEBUGGER.md (CRITICAL - diagnostic only)
- [x] Identity header (I am Morpheus (ANT-DEBUGGER))
- [x] Diagnostic-only doctrine (NO CODE EDITS)
- [x] Root cause analysis
- [x] Fix instructions output (for Ant to apply)
- [x] REACTIVATE_ANT packet creation
- [x] **TEST:** Trinity DEBUGGER_REQUEST → Morpheus, verify diagnostic output, verify no code changes ✅ PASSED (DBG-003-001)

### 3.6 IM-05_NEO_ANT-CODER.md
- [x] Identity header (I am Neo (ANT-CODER))
- [x] IMPLEMENT execution
- [x] Code change rules
- [x] Evidence requirements
- [x] HALT conditions
- [x] Report format
- [x] **TEST:** Trinity → Neo assignment, verify code change + evidence ✅ PASSED (ANT-001)

### 3.7 IM-07_TANK_ANT-TEST.md
- [x] Identity header (I am Tank (ANT-TEST))
- [x] Test writing/execution
- [x] Evidence collection
- [x] Report format
- [x] **TEST:** Trinity → Tank assignment, verify test execution + evidence ✅ PASSED (ANT-002)

### 3.8 IM-08_SERAPH_ANT-SECURITY.md
- [x] Identity header (I am Seraph (ANT-SECURITY))
- [x] Security audit rules
- [x] Firestore rules focus
- [x] Evidence requirements
- [x] Report format
- [x] **NUCLEAR INVARIANT:** Tenant isolation doctrine
- [ ] **TEST:** Trinity → Seraph assignment, verify security findings + evidence

### 3.9 IM-09_LINK_ANT-FIREBASE.md
- [x] Identity header (I am Link (ANT-FIREBASE))
- [x] Firebase structure focus
- [x] Rules/indexes
- [x] Evidence requirements
- [ ] **TEST:** Trinity → Link assignment, verify Firebase work + evidence

### 3.10 IM-10_NIOBE_ANT-UI.md
- [x] Identity header (I am Niobe (ANT-UI))
- [x] UI/UX focus
- [x] Accessibility
- [x] Evidence requirements
- [x] Chrome DevTools integration
- [ ] **TEST:** Trinity → Niobe assignment, verify UI work + evidence

### 3.11 IM-11_APOC_ANT-DATA.md
- [x] Identity header (I am Apoc (ANT-DATA))
- [x] Schema/validation focus
- [x] Migration rules
- [x] Evidence requirements
- [x] Backup-first doctrine
- [ ] **TEST:** Trinity → Apoc assignment, verify data work + evidence

### 3.12 IM-12_GHOST-TWINS_ANT-REVIEW.md
- [x] Identity header (I am Ghost Twins (ANT-REVIEW))
- [x] REVIEW state ownership
- [x] Evidence validation
- [x] Definition of Done checking
- [x] Verdict system (APPROVED/CHANGES_REQUESTED/REJECTED)
- [x] **TEST:** Phase complete → Ghost Twins review, verify DoD check, verify verdict output ✅ PASSED

### 3.13 IM-13_SENTINELS_HORSEMEN.md
- [x] Identity header (I am Sentinels (HORSEMEN))
- [x] Final escalation gate
- [x] Requires failed reattempt before activation
- [x] Rollback protocol
- [x] Reports to BECCA
- [ ] **TEST:** Failed reattempt → Sentinels escalation, verify horsemen guidance

---

## Phase 4: Architect Pipeline

### 4.1 IAMBECCA-ARCHITECT.md ✅ COMPLETE (v1.1.0)
- [x] Port Prompt Architect v2.6.0 behavior
- [x] Audit data intake
- [x] Prompt diff proposals
- [x] Change summary + rollback plan
- [x] **ADDED:** Merge Control (Non-Negotiable) — Architect drafts, BECCA merges
- [x] **ADDED:** Two-Person Integrity governance loop

### 4.2 EXT-02_KEYMAKER_PM-INSPECTOR.md ✅ COMPLETE (v1.1.0)
- [x] Governance reviewer (PM_INSPECTOR)
- [x] Pre-merge checks
- [x] Privilege check
- [x] **ADDED:** Authority Boundary — Keymaker recommends, does NOT trigger/merge
- [x] **ADDED:** Escalation Rule — Invariant breach → BECCA immediately

### 4.3 IAMBECCA-PM_PIPELINE.md ✅ COMPLETE (v1.0.0)
- [x] P1 Morpheus check (hallucination)
- [x] P3 Sentinels check (drift)
- [x] P4 Keymaker check (privilege)
- [x] Tool integration
- [x] **VERIFIED:** File exists at `architect/IAMBECCA-PM_PIPELINE.md`

---

## Phase 5: Integration Tests

### 5.1 Happy Path Test ✅ PASSED
- [x] Full flow: BECCA → Oracle → Trainman → Trinity → Neo/Tank → Ghost Twins → HEALTH_REPORT
- [x] Verify all packets written to correct locations
- [x] **RUN:** run_TEST001_iambecca-test-run_2026-02-02_001
- [x] **CERTIFICATE:** CERT_BATCH-001_PASS
- [x] Verify all approval tokens present (🔑 prefix verified across all roles)

### 5.2 Halt + Debug Test ✅ PASSED (REAL ARTIFACTS)
- [x] Neo HALT → Trinity DEBUGGER_REQUEST → Morpheus diagnostic → BACKUP_GATE → Neo REACTIVATE
- [x] Verify debugger produces instructions only (no code)
- [x] Verify backup gate passes before reattempt
- [x] **RUN:** run_TEST002_halt-debug_2026-02-03_001
- [x] **DOCTRINE:** Morpheus output = 6 instruction steps, zero code lines
- [x] **ARTIFACTS ON DISK (9 files):**
  - `runtime/runs/run_TEST002_.../RUNBOARD.md`
  - `runtime/runs/run_TEST002_.../RUN_LOCK.json`
  - `runtime/runs/run_TEST002_.../BACKUP_GATE_001.md`
  - `inbox/bq/PKT_TEST002_ANT-003_HALT.md`
  - `inbox/debugger/PKT_TEST002_BQ_to_DEBUGGER_001.md`
  - `outbox/debugger/DBG-ANT-003-001.md`
  - `inbox/bq/PKT_TEST002_REACTIVATE_ANT-003.md`
  - `outbox/ants/ANT_REPORT_ANT-003.md`
  - `audit/self_evals/SE_ANT-003.md`

### 5.3 Evidence Rejection Test ✅ PASSED
- [x] Ant report with invalid evidence → Ghost Twins REJECTED
- [x] Verify evidence_contract.py integration
- [x] Verify Trinity reassignment with evidence requirements
- [x] **RUN:** run_TEST003_evidence-rejection_2026-02-03_001 (simulated)
- [x] **DEFICIENCIES:** 4 caught (placeholder path, 2 generic claims, missing self-eval)
- [x] **RESUBMIT:** Score improved 15% → 85% after fixes

### 5.4 Selective Becca Review + Scoring ✅ PASSED (REAL ARTIFACTS)
**Feature:** Neo (ANT-CODER) self-eval exemption with Becca verification

#### Test A: Neo Code Change Triggers Becca Review
- [x] Neo (ANT-004) creates Tooltip component
- [x] Neo does NOT produce separate SE_ANT-004.md (exempt)
- [x] Neo's self-assessment is embedded in ANT_REPORT
- [x] Trinity issues BECCA_REVIEW_REQUEST
- [x] Becca produces verification + score
- [x] **RUN:** run_TESTA_becca-review_2026-02-03_001
- [x] **ARTIFACTS ON DISK (5 files):**
  - `runtime/runs/run_TESTA_.../RUNBOARD.md`
  - `outbox/ants/ANT_REPORT_ANT-004.md` (embedded self-assessment)
  - `inbox/becca/PKT_TESTA_BQ_to_BECCA_001.md`
  - `audit/becca_verifications/BV_ANT-004.md`
  - `audit/becca_scores/BS_ANT-004.md`
- [x] **VERIFIED:** `ls audit/self_evals/SE_ANT-004.md` → "not found" (correct)

#### Test B: Non-Code Role Requires Self-Eval
- [x] Tank (ANT-005) creates tests for Tooltip
- [x] Tank produces separate SE_ANT-005.md (required)
- [x] No BECCA_REVIEW_REQUEST (not high-risk)
- [x] **RUN:** run_TESTB_self-eval_2026-02-03_001
- [x] **ARTIFACTS ON DISK (3 files):**
  - `runtime/runs/run_TESTB_.../RUNBOARD.md`
  - `outbox/ants/ANT_REPORT_ANT-005.md`
  - `audit/self_evals/SE_ANT-005.md` (required for non-Neo roles)
- [x] **VERIFIED:** `ls audit/self_evals/SE_ANT-005.md` → EXISTS (correct)

#### Test Contrast Summary
| Aspect | Neo (ANT-004) | Tank (ANT-005) |
|--------|---------------|----------------|
| Role Type | Code | Test |
| Separate Self-Eval | ❌ NO (exempt) | ✅ YES (required) |
| BECCA_REVIEW_REQUEST | ✅ YES | ❌ NO |
| Self-Assessment | Embedded in ANT_REPORT | Separate SE file |

### 5.5 HORSEMEN Escalation Path ✅ PASSED (REAL ARTIFACTS)

**Full escalation chain proven with 12 disk artifacts:**

HALT → DEBUGGER_REQUEST → BACKUP_GATE_001 → REACTIVATE_ANT →
(fail again) → BACKUP_GATE_002 → HORSEMEN_REQUEST → HORSEMEN_REPORT →
BACKUP_GATE_003 → REACTIVATE_ANT → SUCCESS

- [x] ANT-006 (Neo) halts with deadlock
- [x] Morpheus diagnoses lock ordering (NO CODE)
- [x] BACKUP_GATE_001 PASS before first reattempt
- [x] ANT-006 reattempts, introduces memory leak
- [x] ANT-006 halts again (OOM error)
- [x] BACKUP_GATE_002 PASS before HORSEMEN
- [x] Trinity issues HORSEMEN_REQUEST (all 6 prerequisites verified)
- [x] Sentinels produce HORSEMEN_REPORT (NO CODE - advisory only)
- [x] BACKUP_GATE_003 PASS before post-horsemen reattempt
- [x] ANT-006 applies Sentinels fix, SUCCESS
- [x] **RUN:** run_TEST005_horsemen-escalation_2026-02-03_001
- [x] **ARTIFACTS ON DISK (12 files):**

| Seq | Artifact | Path |
|-----|----------|------|
| 1 | First HALT | `inbox/bq/PKT_TEST005_ANT-006_HALT_001.md` |
| 2 | DEBUGGER_REQUEST | `inbox/debugger/PKT_TEST005_BQ_to_DEBUGGER_001.md` |
| 3 | DIAGNOSTIC | `outbox/debugger/DBG-ANT-006-001.md` |
| 4 | BACKUP_GATE_001 | `runtime/runs/.../BACKUP_GATE_001.md` |
| 5 | REACTIVATE_ANT (first) | `inbox/bq/PKT_TEST005_REACTIVATE_ANT-006_001.md` |
| 6 | Second HALT | `inbox/bq/PKT_TEST005_ANT-006_HALT_002.md` |
| 7 | BACKUP_GATE_002 | `runtime/runs/.../BACKUP_GATE_002.md` |
| 8 | HORSEMEN_REQUEST | `inbox/horsemen/HRQ_TEST005_ANT-006_001.md` |
| 9 | HORSEMEN_REPORT | `outbox/horsemen/HORSEMEN_REPORT_ANT-006_001.md` |
| 10 | BACKUP_GATE_003 | `runtime/runs/.../BACKUP_GATE_003.md` |
| 11 | REACTIVATE_ANT (horsemen) | `inbox/bq/PKT_TEST005_REACTIVATE_ANT-006_FROM_HORSEMEN_001.md` |
| 12 | ANT_REPORT (success) | `outbox/ants/ANT_REPORT_ANT-006.md` |

#### Proof Evidence (quoted from artifacts)

**BACKUP_GATE_001.md:**
```
🔑 APPROVED: BACKUP_GATE PASS
```

**BACKUP_GATE_002.md:**
```
🔑 APPROVED: BACKUP_GATE PASS
All prerequisites verified. HORSEMEN escalation is valid.
```

**BACKUP_GATE_003.md:**
```
🔑 APPROVED: BACKUP_GATE PASS
All backup gates passed. Complete chain verified.
```

**HORSEMEN_REPORT_ANT-006_001.md:**
```
## INVARIANTS CHECK
| Invariant | Status |
|-----------|--------|
| Tenant isolation maintained | ✅ PASS |
| No security vulnerabilities | ✅ PASS |
| Backup gate passed | ✅ PASS |
| Evidence chain intact | ✅ PASS |

**DECISION: PASS_WITH_PLAN**

🔑 APPROVED: HORSEMEN_REPORT COMPLETE — reattempt authorized with guidance
```

#### Doctrine Compliance

| Doctrine | Verification |
|----------|--------------|
| Morpheus = instructions only | ✅ DBG-ANT-006-001.md has 0 code lines |
| Sentinels = advisory only | ✅ HORSEMEN_REPORT has 0 code lines |
| Cannot skip debugger to horsemen | ✅ Debugger lane completed first |
| BACKUP_GATE_001 before reattempt | ✅ Verified |
| BACKUP_GATE_002 before horsemen | ✅ Verified |
| BACKUP_GATE_003 before post-horsemen | ✅ Verified |
| All 6 escalation prerequisites | ✅ Verified in HRQ packet |

---

## Build Order Summary

```
PHASE 0: Folders ✅ COMPLETE
    ↓
PHASE 1: Foundation (BOOTSTRAP, GATES, OUTPUTS, EVIDENCE, INDEX) ✅ COMPLETE
    ↓
PHASE 2: Templates (packet.task, backup_gate, debugger_addendum, run_lock) ✅ COMPLETE
    ↓
PHASE 3: Roles (ALL 13 IM + 3 EXT CREATED) ✅ COMPLETE — Testing in progress
    ↓
PHASE 4: Architect Pipeline ✅ COMPLETE (ARCHITECT + KEYMAKER + PM_PIPELINE all done)
    ↓
PHASE 5: Integration Tests ✅ ALL 5 TESTS COMPLETE (5.1-5.5)
```

---

## Current Progress

| Phase | Status | Notes |
|-------|--------|-------|
| 0 - Folders | ✅ COMPLETE | All folders created |
| 1 - Foundation | ✅ COMPLETE | HARDENED with evidence requirements, Batch Closure Corridor added |
| 2 - Templates | ✅ COMPLETE | Including RUN_LOCK.json schema |
| 3 - Roles | ✅ ALL 16 CREATED | 13 IM roles + 3 EXT roles (Merovingian, Keymaker, Architect) — Testing pending |
| 4 - Architect | ✅ COMPLETE | ARCHITECT v1.1.0 ✅, KEYMAKER v1.1.0 ✅, PM_PIPELINE v1.0.0 ✅ |
| 5 - Tests | ✅ COMPLETE | Happy Path ✅, Halt+Debug ✅, Evidence Rejection ✅, Becca Review ✅, HORSEMEN ✅ |

---

## Role Files Summary

| ID | Matrix Name | Role | Status |
|-------|-------------|------|--------|
| IM-01 | Source (BECCA) | Orchestrator | ✅ Created + Tested + Hardened |
| IM-02 | Oracle (MQ) | Phase Planner | ✅ Created |
| IM-03 | Trinity (BQ) | Phase Executor | ✅ Created + Batch Closure Corridor (v1.2.0) |
| IM-04 | Trainman (Distributor) | Packet Router | ✅ Created |
| IM-05 | Neo (Coder) | Code Implementation | ✅ Created + Self-Eval Exempt (v1.1.0) |
| IM-06 | Morpheus (Debugger) | Diagnosis ONLY | ✅ Created |
| IM-07 | **Tank** (Tester) | Test Execution | ✅ Created |
| IM-08 | Seraph (Security) | Security Audit | ✅ Created |
| IM-09 | **Link** (Firebase) | Firebase Ops | ✅ Created |
| IM-10 | **Niobe** (UI) | UI Implementation | ✅ Created |
| IM-11 | Apoc (Data) | Data Operations | ✅ Created |
| IM-12 | Ghost Twins (Review) | Evidence Validation | ✅ Created + Evidence Gate (v1.1.0) |
| IM-13 | **Sentinels** (Horsemen) | Final Escalation | ✅ Created |
| EXT-01 | **Merovingian** (Planner) | Project Planning | ✅ Created (bonus) |
| EXT-02 | **Keymaker** (PM_INSPECTOR) | Prompt Governance | ✅ Created (v1.1.0) |
| — | **Architect** | Prompt Tuning | ✅ In `architect/IAMBECCA-ARCHITECT.md` |
| — | **PM_PIPELINE** | Multi-AI Evaluation | ✅ In `architect/IAMBECCA-PM_PIPELINE.md` |

---

## Notes

- Each role MUST be tested before moving to next
- Testing = verify activation loop works (input → process → output → next activation)
- Evidence contract integration is MANDATORY for Ghost Twins
- Debugger doctrine is LAW: diagnostic only, no code edits
- Backup gate is REQUIRED before any reattempt
- **BECCA hardening applied:** 9 artifacts, 5 evidence files, RUN_LOCK.json schema, BACKUP_GATE_000 baseline
- **Batch Closure Corridor:** Trinity cannot activate Oracle without CERTIFICATE file
- **Two-Person Integrity:** Keymaker → Architect → Keymaker re-check → BECCA merge
- **Role naming corrected:** Tank (IM-07), Link (IM-09), Niobe (IM-10), Sentinels (IM-13), Keymaker (EXT-02)
- **Selective Becca Review:** Neo exempt from separate self-eval, Becca verifies + scores all Neo tasks
- **Becca Score Ingestion:** Architect ingests scores from `audit/becca_scores/` for prompt tuning
- **HORSEMEN Escalation Path:** Full chain proven: HALT → DEBUGGER → BACKUP_GATE → REACTIVATE → (fail) → BACKUP_GATE → HORSEMEN → BACKUP_GATE → REACTIVATE → SUCCESS
- **Sentinels Doctrine:** Advisory only (no code), PASS_WITH_PLAN / FAIL_HALT / REQUIRE_BECCA_APPROVAL

---

## Parallel Structure: PMX

A parallel `prompt/pmx/` structure exists with:
- 13 PMX role files (PMX-01 to PMX-13)
- Shared modules (EVIDENCE, GATES, OUTPUTS, SAAS, etc.)
- Reference modules (BECCA-REF-*, ORACLE-REF-*, TRINITY-REF-*)

This is the **project-agnostic** version of the prompts. The `roles/IM-*` files are **Matrix-themed** aliases.
