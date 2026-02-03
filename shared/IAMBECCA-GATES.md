# IAMBECCA-GATES v1.0.0

**Purpose:** State machine, transitions, approval tokens, and STOP rules
**Scope:** Loaded with ALL IAMBecca roles
**Source:** Ported from Prompt Architect v2.6.0 + IAMBecca vFinal++ spec

---

## 1) Canonical State Machine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   IAMBECCA STATE MACHINE v1.0.0                                             │
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
| `IMPLEMENT` | Trinity (BQ) + Ants | Execute tasks, produce code/artifacts, collect evidence |
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
| PROPOSE | IMPLEMENT | Packets distributed, `🔑 APPROVED: ACTIVATE Trinity` |
| IMPLEMENT | REVIEW | All ants complete, `🔑 APPROVED: ACTIVATE Ghost Twins` |
| REVIEW | HEALTH_REPORT | Evidence validated, `🔑 APPROVED: ACTIVATE Oracle (closure)` |
| HEALTH_REPORT | COMPLETE | Final report, `🔑 APPROVED: RUN COMPLETE` |
| Any | HALTED | Unrecoverable error, human intervention needed |
| Any | PM_PIPELINE | Tool integration required |
| Any | PMX_ANALYZE | Prompt governance check required |

### 3.2 Invalid Transitions (BLOCKED)

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
```

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

### 6.3 Debugger Doctrine (LAW)

| Rule | Enforcement |
|------|-------------|
| Debugger is DIAGNOSTIC ONLY | Morpheus produces fix instructions, NOT code |
| Debugger reactivates halted Ant | REACTIVATE_ANT packet with findings |
| Sentinels only after failed reattempt | Cannot escalate directly from HALT |
| BACKUP_GATE required | Must PASS before any reattempt or horsemen action |

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

## 9) Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-GATES v1.0.0 — QUICK REFERENCE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  STATES:         P0_INVENTORY → ANALYZE → PROPOSE → IMPLEMENT → REVIEW     │
│                  → HEALTH_REPORT → COMPLETE                                 │
│                                                                             │
│  OPTIONAL:       PM_PIPELINE | PMX_ANALYZE                                  │
│  EXCEPTION:      HALTED (human intervention)                                │
│                                                                             │
│  APPROVAL:       🔑 APPROVED: {scope}                                       │
│                  🔑 APPROVED WITH CHANGES: {scope} — {changes}              │
│                  🔑 REJECTED: {reason}                                      │
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
│  EVIDENCE:       Ghost Twins validate with evidence_contract.py             │
│                  Invalid evidence → 🔑 REJECTED                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-02
- Initial release
- Ported state machine from Prompt Architect v2.6.0
- Added IAMBecca-specific halt flow
- Integrated debugger doctrine
- Added backup gate requirements
- Defined approval token pattern
- Added evidence validation gate
