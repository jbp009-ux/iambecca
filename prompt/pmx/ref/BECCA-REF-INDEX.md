# BECCA-REF-INDEX v1.2.0
## Reference Module Router

**Version:** 1.2.0
**Date:** 2026-02-03
**Purpose:** Index for BECCA reference modules (load on demand)

---

## How This Works

Reference modules contain the **full canon** — detailed tables, templates, diagrams, and workflows. They are NOT loaded by default. They are loaded only when the Guardian needs detailed reference material.

**Why separate?** PMX-01 (BECCA-exec) is the lean driver (~600 lines). Loading 70KB of encyclopedia for a simple approval wastes context. Load refs only when needed.

**Versioned Folders:** Each module lives in its own folder with version suffix for easy upgrades.

---

## How to Load

Say or type:
```
LOAD: BECCA-REF-{NAME}
```

Then read the corresponding file from `ref/{name}/BECCA-REF-{NAME}_v{X.Y.Z}.md`.

---

## Available Reference Modules

### BECCA-Specific Refs

| Module | Folder | File | What It Contains |
|--------|--------|------|------------------|
| **HORSEMEN** | `horsemen/` | `BECCA-REF-HORSEMEN_v1.0.0.md` | Five Horsemen encyclopedia: tables, diagrams, platform mapping, evidence guide, execution order, verdicts |
| **REPORT-TEMPLATE** | `report-template/` | `BECCA-REF-REPORT-TEMPLATE_v1.0.0.md` | Full Detail Completion Report v2.3.7 template, Ant types table, canonical format |
| **FILE-LOCATIONS** | `file-locations/` | `BECCA-REF-FILE-LOCATIONS_v1.0.0.md` | All file paths: templates, Horsemen, packets, Ghost index, raw reports, prompts, queues |
| **QUEUE-SYSTEM** | `queue-system/` | `BECCA-REF-QUEUE-SYSTEM_v1.0.0.md` | End-to-end queue orchestration diagrams, folder structures, INSTRUCTION.md format |
| **INSTRUCTION-FLOW** | `instruction-flow/` | `BECCA-REF-INSTRUCTION-FLOW_v1.0.0.md` | 5-layer data pipeline, key fields (purpose/task), update methods, troubleshooting |
| **APPROVAL-WORKFLOW** | `approval-workflow/` | `BECCA-REF-APPROVAL-WORKFLOW_v1.0.0.md` | Full CEO approval processing workflow, response formats, result packet blocks |
| **DAILY-OPS** | `daily-ops/` | `BECCA-REF-DAILY-OPS_v1.0.0.md` | Morning standup template, end-of-day summary template |
| **COMMANDS** | `commands/` | `BECCA-REF-COMMANDS_v1.0.0.md` | Full quick command list, operational macros |
| **RUN-INIT** | `run-init/` | `BECCA-REF-RUN-INIT_v1.0.0.md` | Hardened run initialization patterns, evidence capture, lock schema (from IM-01 v1.2.0 testing) |

### PMX Shared Refs (All Roles)

| Module | Folder | File | What It Contains |
|--------|--------|------|------------------|
| **GHOST-INDEX** | `ghost-index/` | `BECCA-REF-GHOST-INDEX_v1.0.0.md` | Pre-discovery index checks, pheromone registry |
| **ANT-TYPES** | `ant-types/` | `BECCA-REF-ANT-TYPES_v1.0.0.md` | 13 canonical ant classifications |
| **DEBUGGER-LAW** | `debugger-law/` | `BECCA-REF-DEBUGGER-LAW_v1.0.0.md` | TEST REPORT format, diagnostic rules |
| **GATE-PROGRESSION** | `gate-progression/` | `BECCA-REF-GATE-PROGRESSION_v1.0.0.md` | Hard rules, violations, test scenarios |

---

## When to Load Each Module

| Situation | Load This |
|-----------|-----------|
| "How do Horsemen work?" | `ref/horsemen/` |
| "Show me the report template" | `ref/report-template/` |
| "Where is the Ghost index?" | `ref/file-locations/` |
| "How do queues work?" | `ref/queue-system/` |
| "How do instructions flow?" | `ref/instruction-flow/` |
| "Walk me through CEO approval" | `ref/approval-workflow/` |
| "Morning standup format" | `ref/daily-ops/` |
| "What commands can I use?" | `ref/commands/` |
| "How to initialize a run?" | `ref/run-init/` |
| "What ant types exist?" | `ref/ant-types/` |
| "How does pre-discovery work?" | `ref/ghost-index/` |
| "Debugger rules?" | `ref/debugger-law/` |
| "Gate progression rules?" | `ref/gate-progression/` |

---

## Folder Structure

```
ref/
├── BECCA-REF-INDEX.md              ← This file (router)
│
├── horsemen/
│   └── BECCA-REF-HORSEMEN_v1.0.0.md
│
├── report-template/
│   └── BECCA-REF-REPORT-TEMPLATE_v1.0.0.md
│
├── file-locations/
│   └── BECCA-REF-FILE-LOCATIONS_v1.0.0.md
│
├── queue-system/
│   └── BECCA-REF-QUEUE-SYSTEM_v1.0.0.md
│
├── instruction-flow/
│   └── BECCA-REF-INSTRUCTION-FLOW_v1.0.0.md
│
├── approval-workflow/
│   └── BECCA-REF-APPROVAL-WORKFLOW_v1.0.0.md
│
├── daily-ops/
│   └── BECCA-REF-DAILY-OPS_v1.0.0.md
│
├── commands/
│   └── BECCA-REF-COMMANDS_v1.0.0.md
│
├── run-init/
│   └── BECCA-REF-RUN-INIT_v1.0.0.md
│
├── ghost-index/
│   └── BECCA-REF-GHOST-INDEX_v1.0.0.md
│
├── ant-types/
│   └── BECCA-REF-ANT-TYPES_v1.0.0.md
│
├── debugger-law/
│   └── BECCA-REF-DEBUGGER-LAW_v1.0.0.md
│
└── gate-progression/
    └── BECCA-REF-GATE-PROGRESSION_v1.0.0.md
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  BECCA-REF-INDEX v1.2.0 — REFERENCE MODULE ROUTER               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LOAD: BECCA-REF-{NAME}                                         │
│                                                                 │
│  BECCA REFS (CEO-specific):                                     │
│  • HORSEMEN         — Five Horsemen encyclopedia                │
│  • REPORT-TEMPLATE  — Full Detail v2.3.7 format                 │
│  • FILE-LOCATIONS   — All governance file paths                 │
│  • QUEUE-SYSTEM     — Queue orchestration diagrams              │
│  • INSTRUCTION-FLOW — 5-layer data pipeline                     │
│  • APPROVAL-WORKFLOW— CEO approval process                      │
│  • DAILY-OPS        — Standup/EOD templates                     │
│  • COMMANDS         — Full command list                         │
│  • RUN-INIT         — Hardened run initialization patterns      │
│                                                                 │
│  PMX REFS (All roles):                                          │
│  • GHOST-INDEX      — Pre-discovery, pheromone registry         │
│  • ANT-TYPES        — 13 canonical ant classifications          │
│  • DEBUGGER-LAW     — TEST REPORT format, diagnostic rules      │
│  • GATE-PROGRESSION — Hard rules, violations, test scenarios    │
│                                                                 │
│  VERSIONED: Each in its own folder with _vX.Y.Z.md suffix       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.2.0] 2026-02-03
- **NEW**: RUN-INIT module — Hardened run initialization patterns from IM-01 v1.2.0 testing
- Includes: evidence capture, RUN_LOCK.json schema, Oracle packet requirements
- 13 total reference modules indexed

### [1.1.0] 2026-02-03
- **VERSIONED FOLDERS**: All refs now in own folder with version suffix
- Added PMX Shared Refs section (GHOST-INDEX, ANT-TYPES, DEBUGGER-LAW, GATE-PROGRESSION)
- Added folder structure diagram
- Renamed QUEUE-PIPELINE → QUEUE-SYSTEM for consistency
- 12 total reference modules indexed

### [1.0.0] 2026-01-30
- Initial release
- 8 reference modules indexed
