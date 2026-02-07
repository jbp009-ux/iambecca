# IAMBECCA-PROJECTS v1.0.0
## Project Specifications — Hierarchical Work Breakdown & Manifest

**Purpose:** Project planning format, hierarchical task breakdown, manifest tracking
**Scope:** Loaded with ALL IAMBecca roles
**Source:** Extracted from Colony OS command-center/projects/ + Sonny colony_manifest.json

---

## 1) Core Doctrine (FROZEN)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   EVERY PROJECT STARTS WITH A SPEC.                                         │
│                                                                             │
│   No work begins without: objectives, phases, task breakdown,               │
│   dependencies, and definition of done.                                     │
│   The spec is the contract between BECCA and Oracle.                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2) Project Specification Format

### 2.1 Location

```
governance/command-center/projects/<PROJECT_ID>.json
```

### 2.2 Schema

```json
{
  "projectId": "PROJECT-001",
  "name": "Authentication System Overhaul",
  "description": "Migrate from session-based to JWT auth with multi-tenant support",
  "created": "2026-02-05T14:00:00.000Z",
  "status": "ACTIVE",
  "priority": "HIGH",

  "totalCounts": {
    "masterQueens": 3,
    "babyQueens": 9,
    "ants": 41
  },

  "masterQueens": [
    {
      "id": "MQ-001",
      "phaseId": "PH-1",
      "name": "Auth Foundation",
      "objective": "Set up JWT infrastructure and tenant context",
      "status": "ACTIVE",
      "babyQueens": [
        {
          "id": "BQ-01",
          "name": "Token Infrastructure",
          "status": "COMPLETED",
          "ants": [
            {
              "id": "ANT-001",
              "title": "Create JWT utility functions",
              "antType": "carpenter",
              "status": "COMPLETED",
              "surface": "functions/src/auth/jwt.ts",
              "deliverables": ["JWT sign/verify/refresh utilities"],
              "evidenceRequired": ["tsc --noEmit passes", "unit tests pass"],
              "dependencies": []
            }
          ]
        }
      ]
    }
  ],

  "dependencies": {
    "phaseDependencies": [
      {"from": "PH-1", "to": "PH-2", "reason": "Auth must exist before UI"}
    ],
    "bqDependencies": [
      {"from": "BQ-01", "to": "BQ-02", "reason": "Token utils needed by auth middleware"}
    ]
  },

  "pheromones": {
    "critical": [],
    "highRisk": [
      {"target": "functions/src/auth/", "message": "Legacy session code still present"}
    ],
    "medium": [],
    "info": []
  },

  "definitionOfDone": [
    "All auth flows work with JWT",
    "Tenant isolation verified (Seraph audit)",
    "Migration script for existing sessions",
    "Zero downtime deployment plan"
  ],

  "metadata": {
    "specVersion": "1.0.0",
    "createdBy": "Oracle (MQ)",
    "lastModified": "2026-02-05T16:30:00.000Z"
  }
}
```

---

## 3) Colony Manifest (Project-Level Tracking)

Each project maintains a manifest at the project root:

### 3.1 Location

```
colony_manifest.json (project root)
```

### 3.2 Schema

```json
{
  "project": "Sonny AI Restaurant SaaS",
  "colony_status": "Active",
  "current_sprint": "Stage 4: Memory & Persistence",
  "active_project_id": "PROJECT-001",

  "tasks": {
    "AUTH-001": {
      "title": "JWT infrastructure",
      "status": "Complete",
      "owner": "ANT-001",
      "completed": "2026-02-05"
    },
    "AUTH-002": {
      "title": "Auth middleware",
      "status": "In Progress",
      "owner": "ANT-005",
      "completed": null
    }
  },

  "completed_tasks": [
    {"id": "AUTH-001", "title": "JWT infrastructure", "completed": "2026-02-05"}
  ],

  "missing_dependencies": [
    "Firebase Admin SDK upgrade to v14"
  ],

  "do_not_touch_without_review": [
    "firestore.rules",
    "functions/src/auth/tenantContext.ts"
  ]
}
```

---

## 4) Ant Type Classification

| Type | Emoji | Category | Use Case |
|------|-------|----------|----------|
| Carpenter | 🛠️ | STANDARD | Building features, writing code |
| Fire | 🔥 | CRITICAL | Security-related work |
| Leafcutter | 🌿 | STANDARD | Documentation |
| Scout | 🎯 | LOW | Discovery, research |
| Builder | 🏗️ | STANDARD | Infrastructure |
| Researcher | 🔬 | LOW | Analysis |
| Guardian | 🛡️ | CRITICAL | Security review |
| Cleaner | 🧹 | LOW | Refactoring |
| Carrier | 📦 | STANDARD | Migration |
| Mechanic | 🔧 | STANDARD | Bug fixes |
| Scribe | 📝 | LOW | Logging |
| Watcher | 👁️ | LOW | Monitoring |
| Debugger | 🐛 | LOW | Diagnosis |

---

## 5) Project Lifecycle

```
PROJECT LIFECYCLE:
│
├── 1. BECCA creates project spec (JSON)
│   └── governance/command-center/projects/<PROJECT_ID>.json
│
├── 2. Oracle reviews spec, creates phase plan
│   └── MQ assignments in queues/<PROJECT_ID>/
│
├── 3. Trainman distributes to BQ assignments
│   └── BQ assignments in queues/<PROJECT_ID>/
│
├── 4. Trinity manages Ant execution
│   └── ANT instructions + queue board updates
│
├── 5. Ghost Twins archive + validate
│   └── Memory updates (pheromones, index, ownership)
│
├── 6. Oracle closes with health report
│   └── Project status → COMPLETED
│
└── 7. Manifest updated with results
    └── colony_manifest.json
```

---

## 6) Project Status Values

| Status | Meaning |
|--------|---------|
| DRAFT | Spec created, not yet approved |
| ACTIVE | Work in progress |
| PAUSED | Temporarily stopped |
| BLOCKED | Waiting on external dependency |
| COMPLETED | All work done, DoD met |
| CANCELLED | Abandoned |

---

## 7) Who Creates What

| Artifact | Created By | When |
|----------|-----------|------|
| Project spec (JSON) | BECCA + Oracle | Before run starts |
| Colony manifest | BECCA | Run initialization |
| Phase assignments (MQ) | Oracle | During ANALYZE |
| Batch assignments (BQ) | Trainman | During PROPOSE |
| Ant instructions | Trinity | During IMPLEMENT |
| Queue board updates | Trinity | During IMPLEMENT |
| Manifest updates | Ghost Twins | During REVIEW |

---

## 8) Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-PROJECTS v1.0.0 — QUICK REFERENCE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROJECT SPEC:   governance/command-center/projects/<ID>.json                │
│  MANIFEST:       colony_manifest.json (project root)                        │
│                                                                             │
│  HIERARCHY:                                                                 │
│  Project → Master Queens (phases) → Baby Queens (batches) → Ants (tasks)   │
│                                                                             │
│  STATUSES: DRAFT → ACTIVE → COMPLETED / PAUSED / BLOCKED / CANCELLED       │
│                                                                             │
│  13 ANT TYPES: 🛠️ Carpenter, 🔥 Fire, 🌿 Leafcutter, 🎯 Scout,           │
│  🏗️ Builder, 🔬 Researcher, 🛡️ Guardian, 🧹 Cleaner, 📦 Carrier,         │
│  🔧 Mechanic, 📝 Scribe, 👁️ Watcher, 🐛 Debugger                         │
│                                                                             │
│  EVERY PROJECT HAS: objectives, phases, task breakdown,                     │
│  dependencies, pheromones, definition of done.                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-05
- Initial release
- Extracted from Colony OS command-center/projects/ + Sonny colony_manifest.json
- Hierarchical project spec format (MQ → BQ → ANT)
- Colony manifest schema for project-level tracking
- 13 Ant type classification
- Project lifecycle flow
- Status values and role responsibilities
