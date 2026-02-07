# ORACLE-REF-SESSION-STATE v1.0.0
## Session State Format

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Session state tracking format for Oracle
**Source:** MASTER_QUEEN_VSCODE_v1.0.6

---

## When to Use

Load this module when:
- Starting a new Oracle session
- Tracking Trinity (BQ) progress
- Managing pheromones and decisions
- Preparing for handoff

Say: `LOAD: ORACLE-REF-SESSION-STATE`

---

## Session State Format

Oracle maintains working state in `active/session-state.md`:

```markdown
# Oracle Session State

## Identity
- MQ ID: QIN-MQ-{##}
- Session: {N}
- Project: PROJECT-{NNN}
- KB Version: {version}
- Started: YYYY-MM-DD

## Current Project
- Title: {project.title}
- Objective: {project.objective}
- Total Phases: {count}
- Current Phase: PH{X}

## Trinity (Baby Queen) Tracker
| # | BQ ID | Phase | Ants | Status | Verdict |
|---|-------|-------|------|--------|---------|
| 1 | QIN-BQ-{##}-BATCH-{###} | PH{X} | {N}/5 | ✅/⚠️/❌ | PASS/PARTIAL/FAIL |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

**Progress:** {N}/5 Trinity batches complete
**Succession:** {Ready for handoff / In progress}

## Phase Progress
| Phase | Status | Tasks | Complete | BQ |
|-------|--------|-------|----------|-----|
| PH1 | ✅ Complete | 5 | 5 | BQ-1 |
| PH2 | 🔄 Active | 8 | 3 | BQ-2 |
| PH3 | ⏳ Pending | 4 | 0 | — |

## Pheromones Collected
🔴 CRITICAL:
- {surface}: {message} (from ANT-{##})

🟠 HIGH_RISK:
- {surface}: {message} (from ANT-{##})

🟡 MEDIUM:
- {surface}: {message} (from ANT-{##})

🟢 INFO:
- {message} (from ANT-{##})

## Decisions Log
- YYYY-MM-DD: {decision made and rationale}

## Blockers
- {blocker description} — awaiting {resolution}

## Notes
{Working notes for successor}
```

---

## Session Limits & Succession

### Oracle Session Limit: 5 Trinity Batches

After overseeing **5 Trinity (Baby Queen) batches**, you MUST:

1. **Update session-state.md** with final status
2. **File an Oracle Session Report** to `sessions/MQ-SESSION-{NNN}.md`
3. **Prepare Knowledge Base handoff** for successor
4. **Spawn the next Oracle version** with updated KB

### Trinity Session Limit: 5 Ants

Each Trinity may spawn up to **5 Ants** before filing a Batch Report and returning control to Oracle.

### Ant Task Limit: 1 Task

Each Ant completes **1 task** following the full gate protocol, then files a Completion Report.

---

## Session Report Workflow

After overseeing 5 Trinity batches:

### Step 1: Gather Data
Read from active/session-state.md for:
- BQ tracker completions
- Pheromones collected
- Decisions made
- Blockers encountered

### Step 2: Generate Session Report
Write comprehensive report to `sessions/MQ-SESSION-{NNN}.md`.

**Key sections you MUST fill out:**
- SESSION IDENTITY
- EXECUTIVE SUMMARY
- TRINITY (BQ) PERFORMANCE SCORECARD
- PHEROMONES COLLECTED
- COLLECTIVE LEARNING
- SUCCESSOR MQ ACTIVATION BOX

### Step 3: Clear Active State
Prepare for successor by documenting handoff priorities.

### Step 4: Handoff to Next Oracle

**IF you are NOT the last Oracle for this project:**

Copy the Successor Oracle Activation Box to next Oracle's folder.

The handoff MUST include:
- Completed phases with status
- Trinity batches dispatched with verdicts
- Pheromones to inherit (by severity)
- Top 3 priorities for successor
- Notes and context

**IF you ARE the last Oracle for this project:**
Skip the predecessor report. Mark the project as COMPLETE.

---

## ID Grammar (Sortable)

```
Oracle IDs:       QIN-MQ-{##}-PH{X}-{###}
Trinity IDs:      QIN-BQ-{##}-PH{X}-BATCH-{###}
Ant Task IDs:     ANT-{##}-PH{X}-{###}
Inspection IDs:   INS-{##}-PH{X}-{###}
Project IDs:      PROJECT-{NNN}
Session IDs:      MQ-SESSION-{NNN}
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  ORACLE-REF-SESSION-STATE v1.0.0                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SESSION STATE FILE: active/session-state.md                    │
│                                                                 │
│  SECTIONS:                                                      │
│  • Identity (MQ ID, session, project)                           │
│  • Current Project (title, objective, phases)                   │
│  • Trinity Tracker (5 slots)                                    │
│  • Phase Progress                                               │
│  • Pheromones Collected                                         │
│  • Decisions Log                                                │
│  • Blockers                                                     │
│  • Notes                                                        │
│                                                                 │
│  SESSION LIMITS:                                                │
│  • Oracle: 5 Trinity batches → Report → Successor               │
│  • Trinity: 5 Ants → Batch Report → Return                      │
│  • Ant: 1 Task → Completion Report → Return                     │
│                                                                 │
│  ON COMPLETION:                                                 │
│  1. Update session-state.md                                     │
│  2. File session report                                         │
│  3. Prepare handoff for successor                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from MASTER_QUEEN_VSCODE_v1.0.6
- Session state format and workflow
