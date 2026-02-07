# BECCA-REF-FILE-LOCATIONS v1.0.0
## Critical File Locations — Complete Reference

**Version:** 1.0.0
**Date:** 2026-01-30
**Source:** Extracted from BECCA v1.13.0 Section 4

---

## Templates

| Template | Path | Purpose |
|----------|------|---------|
| Completion Report | `governance/templates/COMPLETION_REPORT_TEMPLATE.md` | Ant report template |
| CEO Approval Request | `governance/templates/CEO_APPROVAL_REQUEST.md` | Request danger approval |

---

## Horsemen System

| File | Path | Purpose |
|------|------|---------|
| Horsemen Orchestration | `governance/scripts/run-horsemen.md` | How to invoke Horsemen |
| Pre-Deploy Check | `governance/scripts/pre-deploy-check.md` | Verify before deploy |
| Horsemen Outcomes Index | `governance/index/HORSEMEN_OUTCOMES.md` | Track all verdicts |

---

## Packet System

| Directory | Path | Purpose |
|-----------|------|---------|
| Task Packets | `governance/packets/tasks/` | Input packets (what to do) |
| Result Packets | `governance/packets/results/` | Output packets (what was done) |
| Packet Docs | `governance/packets/README.md` | Naming conventions |

---

## Ghost Index

| File | Path | Purpose |
|------|------|---------|
| Master Ant Index | `governance/index/MASTER_ANT_INDEX.md` | All Ant work history |
| Pheromone Registry | `governance/index/PHEROMONE_REGISTRY.md` | All warnings by severity |
| File Ownership Map | `governance/index/FILE_OWNERSHIP_MAP.md` | Who touched every file |
| Recent Unindexed | `governance/index/RECENT_UNINDEXED_REPORTS.md` | Pending indexing queue |

---

## Raw Reports

| Directory | Path | Purpose |
|-----------|------|---------|
| Inbox | `governance/raw-reports/inbox/` | **Ants write here** |
| Processed | `governance/raw-reports/processed/` | Ghost moves processed |
| Quarantine | `governance/raw-reports/quarantine/` | Ghost moves failures |

---

## Prompts (Legacy)

| Prompt | Path | Version |
|--------|------|---------|
| Coder Ant | `CLAUDE.md` | v1.3.22 |
| Ghost Archivist | `governance/prompts/core/GHOST_ARCHIVIST_v2.7.0.md` | v2.7.0 |
| Baby Queen | `governance/prompts/orchestration/BABY_QUEEN_VSCODE_v1.3.6.md` | v1.3.6 |
| Master Queen | `governance/prompts/orchestration/MASTER_QUEEN_VSCODE_v1.0.6.md` | v1.0.6 |
| Queue Distributor | `governance/prompts/planning/QUEUE_DISTRIBUTOR_VSCODE_v1.0.2.md` | v1.0.2 |
| BECCA | `governance/prompts/runtime/BECCA_v1.13.0.md` | v1.13.0 |

---

## PMX (Prompt Matrix)

| Category | Path | Contents |
|----------|------|----------|
| Bootstrap | `governance/prompts/pmx/PMX-00_BOOTSTRAP.md` | Universal kernel |
| Index | `governance/prompts/pmx/PMX-INDEX.md` | Role router |
| Shared | `governance/prompts/pmx/shared/` | EVIDENCE, GATES, SAAS, OUTPUTS |
| Roles | `governance/prompts/pmx/roles/` | PMX-01 to PMX-13 |
| References | `governance/prompts/pmx/ref/` | BECCA-REF-* modules |

---

## Queue System

| Directory | Path | Purpose |
|-----------|------|---------|
| Blueprints | `governance/command-center/blueprints/` | Planner output files |
| MQ Queues | `governance/command-center/queues/{PROJECT-ID}/MQ-{NNN}/` | Master Queen assignments |
| BQ Queues | `governance/command-center/queues/{PROJECT-ID}/BQ-{NN}/` | Baby Queen assignments |
| Ant Folders | `governance/command-center/queues/{PROJECT-ID}/BQ-{NN}/ANT-{NNN}/` | Individual Ant instructions |

---

## Quick Lookup

```
REPORTS:     governance/raw-reports/inbox/
INDEXES:     governance/index/
TEMPLATES:   governance/templates/
PROMPTS:     governance/prompts/
PMX:         governance/prompts/pmx/
QUEUES:      governance/command-center/queues/
BLUEPRINTS:  governance/command-center/blueprints/
```

---

## Changelog

### [1.0.0] 2026-01-30
- Extracted from BECCA v1.13.0 Section 4
- Added PMX paths
