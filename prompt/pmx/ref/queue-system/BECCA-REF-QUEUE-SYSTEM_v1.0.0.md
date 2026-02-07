# BECCA-REF-QUEUE-PIPELINE v1.0.0
## Queue-Based Orchestration System — Complete Reference

**Version:** 1.0.0
**Date:** 2026-01-30
**Source:** Extracted from BECCA v1.13.0 Section 5

---

## The Complete Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│  COLONY OS ORCHESTRATION PIPELINE                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 👤 GUARDIAN describes project                               │
│           ↓                                                     │
│  2. 🗺️ PLANNER creates text blueprint                           │
│           ↓ (saves to blueprints/)                              │
│  3. 📦 QUEUE DISTRIBUTOR parses blueprint                       │
│           ↓ (creates folders + INSTRUCTION.md files)            │
│  4. Queues populated (project-isolated):                        │
│      queues/{PROJECT-ID}/MQ-001/ASSIGNMENT.md                   │
│      queues/{PROJECT-ID}/BQ-01/ASSIGNMENT.md                    │
│      queues/{PROJECT-ID}/BQ-01/ANT-225/INSTRUCTION.md           │
│           ↓                                                     │
│  5. 👑 MASTER QUEEN reads {PROJECT}/MQ-{NNN}/ASSIGNMENT.md      │
│           ↓ (activates Baby Queens)                             │
│  6. 👸 BABY QUEEN reads {PROJECT}/BQ-{NN}/ASSIGNMENT.md         │
│           ↓ (reads + updates Ant instructions before activation)│
│  7. 🐜 CODER ANT reads {PROJECT}/ANT-{NNN}/INSTRUCTION.md       │
│           ↓ (executes task, files report)                       │
│  8. 👻 GHOST ARCHIVIST indexes reports                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Queue Folder Structure

```
governance/command-center/
├── blueprints/                    ← Planner saves here
│   └── {PROJECT-ID}.md            ← Text blueprint (source of truth)
│
├── queues/                        ← Project-isolated queues
│   └── {PROJECT-ID}/              ← Project folder
│       ├── MQ-001/
│       │   └── ASSIGNMENT.md      ← MQ's phases + BQ list
│       │
│       ├── BQ-01/
│       │   ├── ASSIGNMENT.md      ← BQ's Ant list
│       │   ├── ANT-225/
│       │   │   └── INSTRUCTION.md ← Ant's task instructions
│       │   ├── ANT-226/
│       │   │   └── INSTRUCTION.md
│       │   └── ...
│       │
│       ├── BQ-02/
│       │   ├── ASSIGNMENT.md
│       │   └── ... (more Ants)
│       │
│       └── ... (more BQs)
```

---

## Ant Instruction File Format

Each `INSTRUCTION.md` file has this structure:

```markdown
# ANT-{NNN} Instructions

## 📋 Original Instructions (Locked)
{From Planner blueprint — DO NOT MODIFY}

## 👑 BQ Updates
**Last Updated:** {date}
**Updated By:** {BQ-##}
{Baby Queen's updates when direction changes}

## 🛡️ Guardian Notes
{Guardian clarifications}

## ⚠️ Pheromone Warnings
{Warnings from Ghost Index}

## 🔗 Dependencies
{Previous/next Ant relationships}

## 📍 Where to Report
governance/raw-reports/inbox/ANT-{NNN}-RAW.md
```

---

## How BQ Updates Work

When a Baby Queen manages Ants, she can UPDATE instructions mid-flight:

| Situation | BQ Action |
|-----------|-----------|
| Previous Ant changed schema | Update next Ant's `👑 BQ Updates` with new field names |
| Previous Ant found blocker | Warn next Ant in `👑 BQ Updates` |
| Direction changed | Write new approach in `👑 BQ Updates` |
| Normal progression | Write "No changes. Proceed with original instructions." |

**Rule:** BQ NEVER modifies `📋 Original Instructions`. Only `👑 BQ Updates`.

---

## Ant Reading Priority

When an Ant reads their INSTRUCTION.md:

| Priority | Section | What It Means |
|----------|---------|---------------|
| 1st | 👑 BQ Updates | If non-empty, direction may have changed — follow this |
| 2nd | 📋 Original Instructions | Base task from Planner |
| 3rd | 🛡️ Guardian Notes | Check for clarifications |
| 4th | ⚠️ Pheromone Warnings | 🔴 CRITICAL = STOP |

**If `👑 BQ Updates` conflicts with `📋 Original Instructions`, follow BQ Updates.**

---

## Queue Distributor Role

The Queue Distributor is responsible for:

| Phase | What It Does |
|-------|--------------|
| INTAKE | Read Planner blueprint (READ-ONLY) |
| PARSE | Extract MQs, BQs, and Ant tasks |
| DISTRIBUTE | Create folders + write ASSIGNMENT.md + INSTRUCTION.md |
| VERIFY | Count everything, compare to source |
| CONFIRM | Output verification report |

**Critical Rules:**
- ⛔ NEVER modify/delete/move the source blueprint
- ⛔ NEVER write PREDECESSOR-REPORT.md (Queens do that)
- ⛔ NEVER update BQ Updates section (BQ does that)
- ✅ Create folders if they don't exist
- ✅ Overwrite existing ASSIGNMENT.md (new distribution replaces old)

---

## CEO Commands for Queue System

| Command | What BECCA Does |
|---------|-----------------|
| "Show queues" | List all MQ/BQ queue folders with status |
| "Check BQ-05 assignment" | Read BQ-05/ASSIGNMENT.md |
| "Check ANT-247 instructions" | Read BQ-{##}/ANT-247/INSTRUCTION.md |
| "Who's in BQ-03?" | List Ants assigned to BQ-03 |
| "Queue health" | Count assignments vs completions |
| "Run Queue Distributor on {blueprint}" | Activate distribution workflow |

---

## Changelog

### [1.0.0] 2026-01-30
- Extracted from BECCA v1.13.0 Section 5
