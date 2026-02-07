# IAMBECCA-ACTIVATION v1.0.0
## Agent Activation — JSON Spawn Protocol for All Roles

**Purpose:** Structured JSON activation packets for spawning agents with full context
**Scope:** Loaded with ALL IAMBecca roles
**Source:** Extracted from Colony OS governance/runtime/activate/ patterns

---

## 1) Core Doctrine (FROZEN)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   NO AGENT STARTS BLIND.                                                    │
│                                                                             │
│   Every agent activation includes: who you are, what you do,                │
│   what to watch out for, and when to stop.                                  │
│   JSON activation packets are the single entry point.                       │
│   CURRENT_RUN.json is the pointer to the active run.                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2) Run Tracking

### 2.1 CURRENT_RUN.json

**Location:** `governance/runtime/activate/CURRENT_RUN.json`

**Schema:**

```json
{
  "run_id": "run_C023_001_2026-02-05_001",
  "project_id": "PROJECT-001",
  "started_at": "2026-02-05T14:30:00.000Z",
  "status": "ACTIVE",
  "current_phase": "PH-1",
  "current_role": "TRINITY",
  "current_ant": "ANT-005"
}
```

**Status Values:**

| Status | Meaning |
|--------|---------|
| ACTIVE | Run is in progress |
| PAUSED | Run is paused (awaiting input) |
| COMPLETED | Run finished successfully |
| FAILED | Run terminated with error |
| HALTED | Run stopped, needs human |

**Update Rules:**
- Updated by BECCA at every state transition
- Only ONE run can be ACTIVE at a time
- If multiple ACTIVE runs detected: BECCA ABORT — multi-run conflict

---

## 3) Activation Packet Schemas

### 3.1 Run Activation (BECCA → All)

**Location:** `governance/runtime/activate/RUN-<project>-<timestamp>/`

This folder contains activation packets for all agents in a run.

### 3.2 Master Queen Activation (MQ.json)

```json
{
  "run_id": "run_C023_001_2026-02-05_001",
  "project_id": "PROJECT-001",
  "activated_by": "BECCA",
  "activated_at": "2026-02-05T14:30:00.000Z",
  "instruction": "Plan Phase 1: Authentication system",
  "project_path": "D:\\projects\\sonny\\",
  "queue_path": "governance/command-center/queues/PROJECT-001/MQ-001/",
  "pheromone_warnings": [
    {"severity": "CRITICAL", "target": "firestore.rules", "message": "Custom functions, don't flatten"}
  ],
  "constraints": [
    "Max 5 ants per batch",
    "All code must pass tsc --noEmit"
  ],
  "notes": "First phase of BECCA integration project"
}
```

### 3.3 Baby Queen Activation (BQ-NN.json)

```json
{
  "run_id": "run_C023_001_2026-02-05_001",
  "project_id": "PROJECT-001",
  "bq_id": "BQ-01",
  "bq_name": "Auth Components",
  "phase_id": "PH-1",
  "activated_by": "TRAINMAN",
  "activated_at": "2026-02-05T15:00:00.000Z",
  "tasks": [
    {
      "ant_id": "ANT-001",
      "title": "Create LoginForm component",
      "status": "PENDING",
      "surface": "src/components/auth/LoginForm.tsx",
      "dependencies": [],
      "ant_type": "carpenter"
    },
    {
      "ant_id": "ANT-002",
      "title": "Write LoginForm tests",
      "status": "PENDING",
      "surface": "tests/auth/LoginForm.test.tsx",
      "dependencies": ["ANT-001"],
      "ant_type": "tester"
    }
  ],
  "pheromone_warnings": [],
  "alignment_checkpoints": [
    {"after_ant": "ANT-001", "check": "Build passes"}
  ],
  "notes": "Batch 1 of Phase 1"
}
```

### 3.4 Ant Activation (ANT-NNN.json)

```json
{
  "run_id": "run_C023_001_2026-02-05_001",
  "project_id": "PROJECT-001",
  "ant_id": "ANT-001",
  "ant_type": "carpenter",
  "bq_id": "BQ-01",
  "activated_by": "TRINITY",
  "activated_at": "2026-02-05T15:05:00.000Z",
  "task": "Create LoginForm component with email/password fields",
  "target_files": [
    {"path": "src/components/auth/LoginForm.tsx", "action": "CREATE"},
    {"path": "src/components/auth/LoginForm.css", "action": "CREATE"}
  ],
  "instruction_path": "governance/command-center/queues/PROJECT-001/BQ-01/ANT-001/INSTRUCTION.md",
  "acceptance_criteria": [
    "Component renders email and password inputs",
    "Form validates required fields",
    "Submits via useAuth() hook"
  ],
  "stop_conditions": [
    "If auth context unavailable, HALT",
    "If useAuth hook doesn't exist, HALT"
  ],
  "pheromone_warnings": [],
  "predecessor_context": null
}
```

---

## 4) Activation Flow

```
BECCA initializes run
    │
    ├── Creates CURRENT_RUN.json (status: ACTIVE)
    ├── Creates run folder: governance/runtime/activate/RUN-<...>/
    │
    ▼
BECCA activates Oracle
    │
    ├── Writes MQ.json activation packet
    ├── Updates CURRENT_RUN.json (current_role: ORACLE)
    │
    ▼
Oracle completes → Trainman distributes
    │
    ├── Writes BQ-01.json, BQ-02.json... activation packets
    ├── Updates CURRENT_RUN.json (current_role: TRAINMAN)
    │
    ▼
Trinity activates Ants
    │
    ├── Writes ANT-001.json, ANT-002.json... activation packets
    ├── Updates CURRENT_RUN.json (current_role: TRINITY, current_ant: ANT-001)
    │
    ▼
Each Ant reads their activation packet and starts work
```

---

## 5) Activation Validation

Before an agent starts work, it MUST validate its activation packet:

| Check | On Failure |
|-------|------------|
| `run_id` matches CURRENT_RUN.json | `🔑 REJECTED: run_id mismatch` |
| `activated_by` is expected predecessor | `🔑 REJECTED: unexpected activator` |
| `project_id` matches active project | `BECCA ABORT: project mismatch` |
| `tasks` array non-empty (for BQ) | `🔑 REJECTED: no tasks assigned` |
| `task` field non-empty (for ANT) | `🔑 REJECTED: no task assigned` |
| `stop_conditions` present | Log warning, proceed with defaults |

---

## 6) Multi-Window Activation (Colony Exec Pattern)

For human-in-the-loop multi-window setups:

```
colony-exec/
├── becca/            ← BECCA window (CEO coordinator)
│   └── CLAUDE.md     ← BECCA prompt loads on start
├── mq/               ← Master Queen window
│   └── CLAUDE.md     ← Oracle prompt loads on start
├── bq/               ← Baby Queen window
│   └── CLAUDE.md     ← Trinity prompt loads on start
└── ant/              ← Worker Ant window
    └── CLAUDE.md     ← Current Ant prompt loads on start
```

Each window picks up activation packets from `governance/runtime/activate/`.

---

## 7) Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-ACTIVATION v1.0.0 — QUICK REFERENCE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CURRENT RUN: governance/runtime/activate/CURRENT_RUN.json                  │
│  RUN FOLDER:  governance/runtime/activate/RUN-<project>-<timestamp>/        │
│                                                                             │
│  PACKETS:                                                                   │
│  • MQ.json — Master Queen activation (phase plan)                           │
│  • BQ-NN.json — Baby Queen activation (batch tasks)                         │
│  • ANT-NNN.json — Ant activation (individual task)                          │
│                                                                             │
│  FLOW: BECCA → Oracle (MQ) → Trainman → Trinity (BQ) → Ants               │
│                                                                             │
│  RULES:                                                                     │
│  • Only ONE ACTIVE run at a time                                            │
│  • Every agent validates packet before starting                             │
│  • CURRENT_RUN.json updated at every transition                             │
│  • No agent starts blind — full context in packet                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-05
- Initial release
- Extracted from Colony OS governance/runtime/activate/ patterns
- CURRENT_RUN.json tracking with single-active-run enforcement
- MQ, BQ, and ANT activation packet JSON schemas
- Activation flow diagram
- Packet validation rules
- Multi-window colony-exec pattern reference
