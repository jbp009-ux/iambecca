# IAMBecca Build Plan v1.0.0

**Created:** 2026-02-02
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
│   ├── IAMBECCA-GATES.md        ← State machine + transitions
│   └── IAMBECCA-OUTPUTS.md      ← Output contracts per state
├── roles/
│   ├── IM-01_SOURCE_BECCA.md
│   ├── IM-02_ORACLE_MQ.md
│   ├── IM-03_TRINITY_BQ.md
│   ├── IM-04_TRAINMAN_DISTRIBUTOR.md
│   ├── IM-05_NEO_ANT-CODER.md
│   ├── IM-06_MORPHEUS_ANT-DEBUGGER.md
│   ├── IM-07_TANK_ANT-TEST.md
│   ├── IM-08_SERAPH_ANT-SECURITY.md
│   ├── IM-09_LINK_ANT-FIREBASE.md
│   ├── IM-10_NIOBE_ANT-UI.md
│   ├── IM-11_APOC_ANT-DATA.md
│   ├── IM-12_GHOST_TWINS.md
│   └── IM-13_SENTINELS_HORSEMEN.md
├── architect/
│   ├── IAMBECCA-ARCHITECT.md
│   ├── IAMBECCA-KEYMAKER.md
│   └── IAMBECCA-PM_PIPELINE.md
└── templates/
    ├── packet.task.md
    ├── packet.report.md
    ├── debugger_addendum.md
    ├── backup_gate.md
    ├── self_evaluation.md
    ├── becca_verification.md
    └── becca_runboard.md
```

### Phase 0 Tasks
- [ ] Create folder structure
- [ ] Create placeholder files (empty with header comment)

---

## Phase 1: Foundation (MUST COMPLETE BEFORE ROLES)

### 1.1 IAMBECCA-BOOTSTRAP.md
- [ ] Frozen invariants (tokens, activation ritual, identity header, evidence rules, debugger doctrine)
- [ ] "I am" protocol definition
- [ ] Approval token patterns

### 1.2 IAMBECCA-GATES.md (shared)
- [ ] State machine diagram (P0_INVENTORY → ANALYZE → PROPOSE → IMPLEMENT → REVIEW → HEALTH_REPORT)
- [ ] State ownership table (who acts in each)
- [ ] Transition rules
- [ ] HALTED state handling
- [ ] Debugging sub-flow rules

### 1.3 IAMBECCA-OUTPUTS.md (shared)
- [ ] Required output skeleton (every state)
- [ ] State-specific requirements
- [ ] Evidence validation rules

### 1.4 IAMBECCA-EVIDENCE.md (shared)
- [ ] Evidence contract rules
- [ ] Validator integration points (evidence_contract.py)
- [ ] Rejection rules

### 1.5 IAMBECCA-INDEX.md
- [ ] Role index table (IM-01 to IM-13)
- [ ] Activation aliases
- [ ] Shared module loading rules
- [ ] Quick reference

---

## Phase 2: Templates (MUST COMPLETE BEFORE ROLES)

### 2.1 Core Templates
- [ ] packet.task.md (with packet_kind + backup gate)
- [ ] packet.report.md
- [ ] backup_gate.md
- [ ] debugger_addendum.md (diagnostic-only)

### 2.2 Evaluation Templates
- [ ] self_evaluation.md
- [ ] becca_verification.md
- [ ] becca_runboard.md

---

## Phase 3: Roles (SEQUENTIAL - TEST EACH BEFORE NEXT)

### 3.1 IM-01_SOURCE_BECCA.md (START HERE)
- [ ] Identity header (I am Source (BECCA))
- [ ] P0_INVENTORY ownership
- [ ] Run initialization
- [ ] Backup gate execution
- [ ] Evaluation processing
- [ ] Approval token output
- [ ] **TEST:** Activate BECCA, verify output format, verify "NEXT: Activate Oracle?"

### 3.2 IM-02_ORACLE_MQ.md
- [ ] Identity header (I am Oracle (MQ))
- [ ] ANALYZE state ownership
- [ ] Phase planning
- [ ] Trinity assignment
- [ ] Approval token output
- [ ] **TEST:** BECCA → Oracle handoff, verify packet format, verify "NEXT: Activate Trainman?"

### 3.3 IM-04_TRAINMAN_DISTRIBUTOR.md (before Trinity - Trainman creates packets)
- [ ] Identity header (I am Trainman (DISTRIBUTOR))
- [ ] PROPOSE state ownership
- [ ] Directive packet creation
- [ ] Task distribution
- [ ] Approval token output
- [ ] **TEST:** Oracle → Trainman handoff, verify distribution packets created

### 3.4 IM-03_TRINITY_BQ.md
- [ ] Identity header (I am Trinity (BQ))
- [ ] IMPLEMENT state ownership
- [ ] Ant management (max 5)
- [ ] Halt handling (DEBUGGER_REQUEST)
- [ ] Reactivation flow
- [ ] HORSEMEN escalation (only after failed reattempt)
- [ ] Approval token output
- [ ] **TEST:** Trainman → Trinity handoff, verify ant assignment, verify halt flow

### 3.5 IM-06_MORPHEUS_ANT-DEBUGGER.md (CRITICAL - diagnostic only)
- [ ] Identity header (I am Morpheus (ANT-DEBUGGER))
- [ ] Diagnostic-only doctrine (NO CODE EDITS)
- [ ] Root cause analysis
- [ ] Fix instructions output (for Ant to apply)
- [ ] REACTIVATE_ANT packet creation
- [ ] **TEST:** Trinity DEBUGGER_REQUEST → Morpheus, verify diagnostic output, verify no code changes

### 3.6 IM-05_NEO_ANT-CODER.md
- [ ] Identity header (I am Neo (ANT-CODER))
- [ ] IMPLEMENT execution
- [ ] Code change rules
- [ ] Evidence requirements
- [ ] HALT conditions
- [ ] Report format
- [ ] **TEST:** Trinity → Neo assignment, verify code change + evidence, verify HALT packet on failure

### 3.7 IM-07_TANK_ANT-TEST.md
- [ ] Identity header (I am Tank (ANT-TEST))
- [ ] Test writing/execution
- [ ] Evidence collection
- [ ] Report format
- [ ] **TEST:** Trinity → Tank assignment, verify test execution + evidence

### 3.8 IM-08_SERAPH_ANT-SECURITY.md
- [ ] Identity header (I am Seraph (ANT-SECURITY))
- [ ] Security audit rules
- [ ] Firestore rules focus
- [ ] Evidence requirements
- [ ] Report format
- [ ] **TEST:** Trinity → Seraph assignment, verify security findings + evidence

### 3.9 IM-09_LINK_ANT-FIREBASE.md
- [ ] Identity header (I am Link (ANT-FIREBASE))
- [ ] Firebase structure focus
- [ ] Rules/indexes
- [ ] Evidence requirements
- [ ] **TEST:** Trinity → Link assignment, verify Firebase work + evidence

### 3.10 IM-10_NIOBE_ANT-UI.md
- [ ] Identity header (I am Niobe (ANT-UI))
- [ ] UI/UX focus
- [ ] Accessibility
- [ ] Evidence requirements
- [ ] **TEST:** Trinity → Niobe assignment, verify UI work + evidence

### 3.11 IM-11_APOC_ANT-DATA.md
- [ ] Identity header (I am Apoc (ANT-DATA))
- [ ] Schema/validation focus
- [ ] Migration rules
- [ ] Evidence requirements
- [ ] **TEST:** Trinity → Apoc assignment, verify data work + evidence

### 3.12 IM-12_GHOST_TWINS.md
- [ ] Identity header (I am Ghost Twins (GHOST))
- [ ] REVIEW state ownership
- [ ] Evidence validation (calls evidence_contract.py)
- [ ] Debugger addendum extraction
- [ ] Rejection rules
- [ ] Two modes: Archivist + Inspector
- [ ] **TEST:** Ant report → Ghost validation, verify evidence check, verify rejection on invalid

### 3.13 IM-13_SENTINELS_HORSEMEN.md
- [ ] Identity header (I am Sentinels (HORSEMEN))
- [ ] Final review gate
- [ ] Only activated AFTER failed reattempt
- [ ] Five Horsemen checks
- [ ] BACKUP_GATE requirement
- [ ] **TEST:** Failed reattempt → Sentinels, verify backup gate enforced, verify guidance output

---

## Phase 4: Architect Pipeline

### 4.1 IAMBECCA-ARCHITECT.md
- [ ] Port Prompt Architect v2.6.0 behavior
- [ ] Audit data intake
- [ ] Prompt diff proposals
- [ ] Change summary + rollback plan

### 4.2 IAMBECCA-KEYMAKER.md
- [ ] Governance reviewer
- [ ] Pre-merge checks
- [ ] Privilege check

### 4.3 IAMBECCA-PM_PIPELINE.md
- [ ] P1 Morpheus check (hallucination)
- [ ] P3 Sentinels check (drift)
- [ ] P4 Keymaker check (privilege)
- [ ] Tool integration

---

## Phase 5: Integration Tests

### 5.1 Happy Path Test
- [ ] Full flow: BECCA → Oracle → Trainman → Trinity → Neo → Ghost → BECCA verification
- [ ] Verify all packets written to correct locations
- [ ] Verify all approval tokens present

### 5.2 Halt + Debug Test
- [ ] Neo HALT → Trinity DEBUGGER_REQUEST → Morpheus diagnostic → BACKUP_GATE → Neo REACTIVATE
- [ ] Verify debugger produces instructions only (no code)
- [ ] Verify backup gate passes before reattempt

### 5.3 Escalation Test
- [ ] Failed reattempt → Trinity HORSEMEN_REQUEST → Sentinels
- [ ] Verify backup gate required
- [ ] Verify Sentinels guidance applied

### 5.4 Evidence Rejection Test
- [ ] Ant report with invalid evidence → Ghost REJECTED
- [ ] Verify evidence_contract.py integration
- [ ] Verify Trinity reassignment with evidence requirements

---

## Build Order Summary

```
PHASE 0: Folders
    ↓
PHASE 1: Foundation (BOOTSTRAP, GATES, OUTPUTS, EVIDENCE, INDEX)
    ↓
PHASE 2: Templates (packet.task, backup_gate, debugger_addendum, etc.)
    ↓
PHASE 3: Roles (BECCA first, then sequential with testing)
    ↓
PHASE 4: Architect Pipeline
    ↓
PHASE 5: Integration Tests
```

---

## Current Progress

| Phase | Status | Notes |
|-------|--------|-------|
| 0 - Folders | ⬜ NOT STARTED | |
| 1 - Foundation | ⬜ NOT STARTED | |
| 2 - Templates | ⬜ NOT STARTED | |
| 3 - Roles | ⬜ NOT STARTED | |
| 4 - Architect | ⬜ NOT STARTED | |
| 5 - Tests | ⬜ NOT STARTED | |

---

## Notes

- Each role MUST be tested before moving to next
- Testing = verify activation loop works (input → process → output → next activation)
- Evidence contract integration is MANDATORY for Ghost Twins
- Debugger doctrine is LAW: diagnostic only, no code edits
- Backup gate is REQUIRED before any reattempt or horsemen action
