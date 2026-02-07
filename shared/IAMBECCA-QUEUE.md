# IAMBECCA-QUEUE v1.0.0
## Task Queue — Folder-Based Work Distribution Protocol

**Purpose:** Queue structure, assignment format, work distribution, and handoff tracking
**Scope:** Loaded with ALL IAMBecca roles
**Source:** Extracted from Colony OS governance/command-center/queues/

---

## 1) Core Doctrine (FROZEN)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   QUEUES ARE THE BACKBONE OF DISTRIBUTION.                                  │
│                                                                             │
│   Oracle plans → Trainman distributes → Trinity manages → Ants execute.     │
│   Every task lives in a folder. Every handoff has a file.                   │
│   No task exists only in memory — it MUST be on disk.                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2) Queue Hierarchy

```
governance/command-center/queues/<PROJECT_ID>/
├── MQ-001/                    ← Master Queen phase 1
│   ├── ASSIGNMENT.md          ← Phase plan + deliverables
│   └── PREDECESSOR-REPORT.md  ← Context from previous phase (if any)
├── MQ-002/                    ← Master Queen phase 2
│   └── ASSIGNMENT.md
├── BQ-01/                     ← Baby Queen batch 1
│   ├── ASSIGNMENT.md          ← Batch task list
│   ├── PREDECESSOR-REPORT.md  ← MQ handoff context
│   └── ANT-001/               ← Individual Ant workspace
│       ├── INSTRUCTION.md     ← Task assignment
│       └── PREDECESSOR-REPORT.md ← Context for Ant
├── BQ-02/                     ← Baby Queen batch 2
│   └── ...
└── BQ-09/                     ← Max 9 Baby Queen batches
```

---

## 3) Assignment Format

### 3.1 Master Queen Assignment (MQ)

```markdown
# MQ ASSIGNMENT: MQ-<NNN>

project_id: <PROJECT_ID>
phase_id: PH-<N>
assigned_by: Oracle (MQ)
timestamp: <ISO timestamp>

---

## PHASE OBJECTIVE
<2-3 sentence description of what this phase accomplishes>

## DELIVERABLES
| # | Deliverable | Success Criteria |
|---|-------------|------------------|
| 1 | <deliverable> | <how to verify> |
| 2 | <deliverable> | <how to verify> |

## TASK BREAKDOWN
| BQ | Task Count | Focus Area |
|----|------------|------------|
| BQ-01 | 5 | <area> |
| BQ-02 | 3 | <area> |

## CONSTRAINTS
- <constraint 1>
- <constraint 2>

## PHEROMONE WARNINGS
<relevant pheromones from memory scan>

## DEPENDENCIES
| Depends On | Status |
|------------|--------|
| MQ-<prev> | COMPLETED / PENDING |
```

### 3.2 Baby Queen Assignment (BQ)

```markdown
# BQ ASSIGNMENT: BQ-<NN>

project_id: <PROJECT_ID>
phase_id: PH-<N>
bq_id: BQ-<NN>
assigned_by: Trainman (DISTRIBUTOR)
timestamp: <ISO timestamp>

---

## BATCH TASKS
| ANT | Type | Task | Target Files | Dependencies |
|-----|------|------|-------------|--------------|
| ANT-001 | 🛠️ Carpenter | <task> | <files> | none |
| ANT-002 | 🧪 Tester | <task> | <files> | ANT-001 |
| ANT-003 | 🔥 Fire | <task> | <files> | none |

## PHEROMONE WARNINGS
<relevant pheromones from memory scan>

## MAX CONCURRENT ANTS: 5

## ALIGNMENT CHECKPOINTS
| After ANT | Check |
|-----------|-------|
| ANT-001 | Verify build passes |
| ANT-003 | Security review before proceeding |
```

### 3.3 Ant Instruction

```markdown
# ANT INSTRUCTION: ANT-<NNN>

project_id: <PROJECT_ID>
run_id: <run_id>
ant_id: ANT-<NNN>
bq_id: BQ-<NN>
assigned_by: Trinity (BQ)
timestamp: <ISO timestamp>

---

## TASK
<clear, specific task description>

## TARGET FILES
| File | Action |
|------|--------|
| <path> | CREATE / MODIFY / DELETE |

## ACCEPTANCE CRITERIA
- [ ] <criterion 1>
- [ ] <criterion 2>

## EVIDENCE REQUIRED
- [ ] <evidence type>

## STOP CONDITIONS
- Stop if: <condition>
- Stop if: <condition>

## PHEROMONE WARNINGS
<relevant warnings for target files>

## PREDECESSOR CONTEXT
<summary from previous Ant or phase, if applicable>
```

---

## 4) Queue Status Tracking

### 4.1 Queue Status Values

| Status | Meaning |
|--------|---------|
| PENDING | Not yet started |
| ACTIVE | Currently being worked on |
| BLOCKED | Waiting on dependency |
| COMPLETED | All tasks done |
| FAILED | Could not complete |

### 4.2 Queue Board

Each project maintains a queue board at:
```
governance/command-center/queues/<PROJECT_ID>/QUEUE_BOARD.md
```

```markdown
# QUEUE BOARD: <PROJECT_ID>

| Queue | Status | Ants | Completed | Blocked | Notes |
|-------|--------|------|-----------|---------|-------|
| MQ-001 | COMPLETED | — | — | — | Phase 1 done |
| MQ-002 | ACTIVE | — | — | — | Phase 2 in progress |
| BQ-01 | COMPLETED | 5 | 5/5 | 0 | Batch 1 done |
| BQ-02 | ACTIVE | 3 | 1/3 | 1 | ANT-008 blocked |
| BQ-03 | PENDING | 0 | 0/4 | 0 | Waiting on BQ-02 |
```

---

## 5) Dependency Management

### 5.1 Dependency Types

| Type | Description | Example |
|------|-------------|---------|
| **Phase** | One MQ must complete before next starts | MQ-002 depends on MQ-001 |
| **Batch** | One BQ must complete before next starts | BQ-03 depends on BQ-02 |
| **Task** | One ANT must complete before another starts | ANT-002 depends on ANT-001 |
| **File** | Task depends on a file existing | ANT-005 needs auth.ts from ANT-001 |

### 5.2 Dependency Resolution

```
DEPENDENCY CHECK (before starting task):
├── 1. Check all listed dependencies in INSTRUCTION.md
├── 2. For each dependency:
│   ├── If COMPLETED → proceed
│   ├── If ACTIVE → wait (check back in 5 min)
│   ├── If FAILED → BECCA ABORT: dependency failed
│   └── If PENDING → queue, don't start
├── 3. Log dependency check to ledger
└── 4. If all clear → start task
```

---

## 6) Work Stealing Protocol (Idle Ants)

When an Ant finishes early and other Ants are still working:

```
IDLE ANT PROTOCOL:
├── 1. Ant completes task, reports to Trinity
├── 2. Trinity checks: are there PENDING tasks in current BQ?
│   ├── YES → Assign next PENDING task to idle Ant
│   └── NO → Check if other BQs have PENDING tasks
│       ├── YES → Assign (if no cross-batch dependencies)
│       └── NO → Ant enters STANDBY (no busy-work)
├── 3. NEVER assign work outside current phase
└── 4. NEVER create make-work tasks
```

---

## 7) Role Responsibilities

| Role | Queue Duty |
|------|------------|
| **Oracle** (IM-02) | Creates MQ assignments from project plan |
| **Trainman** (IM-04) | Creates BQ assignments from MQ plan, handles distribution |
| **Trinity** (IM-03) | Creates ANT instructions, manages queue board, handles idle ants |
| **BECCA** (IM-01) | Monitors queue board, approves phase transitions |
| **Ghost Twins** (IM-12) | Validates completed queue items during archival |

---

## 8) Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-QUEUE v1.0.0 — QUICK REFERENCE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  HIERARCHY:                                                                 │
│  MQ (phase) → BQ (batch) → ANT (task)                                      │
│                                                                             │
│  STRUCTURE:                                                                 │
│  queues/<PROJECT>/MQ-NNN/ASSIGNMENT.md                                      │
│  queues/<PROJECT>/BQ-NN/ASSIGNMENT.md                                       │
│  queues/<PROJECT>/BQ-NN/ANT-NNN/INSTRUCTION.md                              │
│                                                                             │
│  STATUSES: PENDING → ACTIVE → COMPLETED/FAILED/BLOCKED                     │
│                                                                             │
│  MAX CONCURRENT ANTS: 5 per Trinity batch                                   │
│                                                                             │
│  DEPENDENCIES: Phase → Batch → Task → File                                  │
│  All dependencies checked BEFORE starting work.                             │
│                                                                             │
│  IDLE ANTS: Reassign to PENDING tasks (same phase only).                    │
│  Never create make-work. Standby is acceptable.                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-05
- Initial release
- Extracted from Colony OS governance/command-center/queues/
- Queue hierarchy: MQ → BQ → ANT folder structure
- Assignment formats for MQ, BQ, and ANT levels
- Queue status tracking with QUEUE_BOARD
- 4 dependency types with resolution protocol
- Work stealing / idle ant protocol
- Role responsibilities for queue management
