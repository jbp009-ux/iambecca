# IAMBECCA-LEDGER v1.0.0
## Event Logging — Structured Audit Trail for All Actions

**Purpose:** JSONL event log for every action, handoff, error, and state change
**Scope:** Loaded with ALL IAMBecca roles
**Source:** Extracted from Colony OS RUN_LEDGER.jsonl + Colony Local transcript.jsonl

---

## 1) Core Doctrine (FROZEN)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   IF IT DIDN'T GET LOGGED, IT DIDN'T HAPPEN.                                │
│                                                                             │
│   Every action, handoff, error, and decision gets a ledger entry.           │
│   The ledger is append-only. Never edited, never deleted.                   │
│   One line per event. JSONL format. grep-friendly. AI-parseable.            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2) Ledger Location

**Per-Run Transcript (detailed):**
```
runtime/runs/<run_id>/transcript.jsonl
```

**Global Run Ledger (summary):**
```
governance/command-center/ledger/RUN_LEDGER.jsonl
```

---

## 3) Event Schema

Every event is a single JSON line with these fields:

```json
{
  "seq": 1,
  "event_id": "evt_20260205_143022_a1b2c3",
  "timestamp": "2026-02-05T14:30:22.000Z",
  "run_id": "run_C023_001_2026-02-05_001",
  "task_id": "TASK_NEO_fix_auth",
  "type": "ANT_STARTED",
  "from_role": "TRINITY",
  "to_role": "NEO",
  "status": "IN_PROGRESS",
  "artifacts": ["inbox/ants/PKT_run_C023_001_to_ANT-001.md"],
  "violations": [],
  "payload": {"ant_id": "ANT-001", "task": "Fix auth flow"},
  "metadata": {"chain_id": "CHAIN_WORKER_BATCH", "step": 2}
}
```

### 3.1 Required Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `seq` | integer | YES | Auto-incrementing sequence per run |
| `event_id` | string | YES | `evt_YYYYMMDD_HHMMSS_XXXXXX` |
| `timestamp` | ISO 8601 | YES | When the event occurred |
| `run_id` | string | YES | Active run identifier |
| `type` | string | YES | Event type (see Section 4) |
| `from_role` | string | YES | Role that initiated the event |
| `to_role` | string | YES | Role that receives/is affected |
| `status` | string | YES | PASS / FAIL / IN_PROGRESS / HALTED |

### 3.2 Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `task_id` | string | Task identifier if event is task-related |
| `artifacts` | string[] | Paths to related files |
| `violations` | string[] | Any rule violations detected |
| `payload` | object | Event-specific data (free-form) |
| `metadata` | object | Chain position, step, context |

---

## 4) Event Types

### 4.1 Run Lifecycle

| Type | Description | from_role | to_role |
|------|-------------|-----------|---------|
| `RUN_STARTED` | New run initialized | BECCA | BECCA |
| `RUN_COMPLETED` | Run finished successfully | BECCA | BECCA |
| `RUN_FAILED` | Run terminated with error | BECCA | BECCA |
| `RUN_HALTED` | Run paused, needs intervention | ANY | BECCA |

### 4.2 State Transitions

| Type | Description | from_role | to_role |
|------|-------------|-----------|---------|
| `STATE_TRANSITION` | State machine moved | CURRENT | NEXT |
| `APPROVAL_GRANTED` | 🔑 APPROVED issued | APPROVER | NEXT_ROLE |
| `APPROVAL_REJECTED` | 🔑 REJECTED issued | REVIEWER | REJECTED_ROLE |
| `APPROVAL_CERTIFIED` | 🔑 CERTIFIED issued | TRINITY | ORACLE |

### 4.3 Role Events

| Type | Description | from_role | to_role |
|------|-------------|-----------|---------|
| `ROLE_ACTIVATED` | Role started work | PREVIOUS | ACTIVATED |
| `ROLE_COMPLETED` | Role finished work | COMPLETED | NEXT |
| `BATON_PASSED` | Handoff packet written | FROM | TO |

### 4.4 Ant Events

| Type | Description | from_role | to_role |
|------|-------------|-----------|---------|
| `ANT_STARTED` | Ant began task | TRINITY | ANT |
| `ANT_COMPLETED` | Ant finished task | ANT | TRINITY |
| `ANT_HALTED` | Ant cannot proceed | ANT | TRINITY |
| `ANT_REACTIVATED` | Ant given second chance | TRINITY | ANT |

### 4.5 Quality Events

| Type | Description | from_role | to_role |
|------|-------------|-----------|---------|
| `GHOST_ARCHIVE` | Batch archived | GHOST | GHOST |
| `GHOST_VALIDATED` | Evidence validated | GHOST | TRINITY |
| `GHOST_REJECTED` | Evidence invalid | GHOST | TRINITY |
| `HORSEMEN_REQUESTED` | Escalation to Sentinels | TRINITY | SENTINELS |
| `HORSEMEN_COMPLETED` | Sentinels reported | SENTINELS | TRINITY |
| `DEBUGGER_REQUESTED` | Escalation to Morpheus | TRINITY | MORPHEUS |
| `DEBUGGER_COMPLETED` | Morpheus diagnosed | MORPHEUS | TRINITY |

### 4.6 Error Events

| Type | Description | from_role | to_role |
|------|-------------|-----------|---------|
| `ERROR_RECOVERABLE` | Minor issue handled locally | ROLE | ROLE |
| `ERROR_BLOCKER` | Requires BECCA intervention | ROLE | BECCA |
| `ERROR_CRITICAL` | Security/data risk | ROLE | BECCA |
| `BECCA_ABORT` | Emergency stop | ROLE | BECCA |

### 4.7 Memory Events

| Type | Description | from_role | to_role |
|------|-------------|-----------|---------|
| `PHEROMONE_ADDED` | New warning registered | GHOST | MEMORY |
| `INDEX_UPDATED` | Ant index updated | GHOST | MEMORY |
| `OWNERSHIP_UPDATED` | File ownership changed | GHOST | MEMORY |

---

## 5) Who Logs What

| Role | Events to Log |
|------|---------------|
| **BECCA** (IM-01) | RUN_STARTED, RUN_COMPLETED/FAILED, STATE_TRANSITION, APPROVAL_* |
| **Oracle** (IM-02) | ROLE_ACTIVATED, ROLE_COMPLETED, BATON_PASSED |
| **Trinity** (IM-03) | ANT_STARTED, ANT_COMPLETED/HALTED, DEBUGGER_REQUESTED, HORSEMEN_REQUESTED |
| **Trainman** (IM-04) | ROLE_ACTIVATED, ROLE_COMPLETED, BATON_PASSED |
| **Neo–Apoc** (IM-05–11) | ANT_STARTED, ANT_COMPLETED/HALTED, ERROR_* |
| **Ghost Twins** (IM-12) | GHOST_ARCHIVE, GHOST_VALIDATED/REJECTED, PHEROMONE_ADDED, INDEX_UPDATED |
| **Sentinels** (IM-13) | HORSEMEN_COMPLETED, ERROR_CRITICAL |

---

## 6) Logging Rules

| Rule | Enforcement |
|------|-------------|
| Append-only | NEVER edit or delete ledger entries |
| One event per line | JSONL format (newline-delimited JSON) |
| Log BEFORE action | Log intent before executing |
| Log AFTER result | Log outcome after completion |
| Include artifacts | Always reference file paths |
| No sensitive data | NEVER log secrets, tokens, or credentials |

---

## 7) Ledger Queries

The JSONL format supports grep-based analysis:

```bash
# All events for a run
grep '"run_id":"run_C023_001"' RUN_LEDGER.jsonl

# All errors
grep '"type":"ERROR_' transcript.jsonl

# All Ant completions
grep '"type":"ANT_COMPLETED"' transcript.jsonl

# Events by role
grep '"from_role":"NEO"' transcript.jsonl

# Count events by type
grep -o '"type":"[^"]*"' transcript.jsonl | sort | uniq -c | sort -rn
```

---

## 8) Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-LEDGER v1.0.0 — QUICK REFERENCE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LOCATIONS:                                                                 │
│  • Per-run: runtime/runs/<run_id>/transcript.jsonl                          │
│  • Global:  governance/command-center/ledger/RUN_LEDGER.jsonl               │
│                                                                             │
│  FORMAT: JSONL — one JSON object per line, append-only                      │
│                                                                             │
│  REQUIRED FIELDS: seq, event_id, timestamp, run_id, type,                   │
│                   from_role, to_role, status                                │
│                                                                             │
│  EVENT TYPES: RUN_*, STATE_*, ROLE_*, ANT_*, GHOST_*,                       │
│               HORSEMEN_*, DEBUGGER_*, ERROR_*, MEMORY_*                     │
│                                                                             │
│  RULES: Append-only. Log before AND after. No secrets.                      │
│         If it didn't get logged, it didn't happen.                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-05
- Initial release
- Extracted from Colony OS RUN_LEDGER.jsonl + Colony Local transcript.jsonl
- Defined event schema with 8 required + 4 optional fields
- 7 event categories with 25+ event types
- Role-to-event mapping for all 13 IM roles
- Logging rules and grep-based query examples
