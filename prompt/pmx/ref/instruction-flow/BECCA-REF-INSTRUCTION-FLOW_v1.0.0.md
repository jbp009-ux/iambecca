# BECCA-REF-INSTRUCTION-FLOW v1.0.0
## 5-Layer Data Pipeline — Complete Reference

**Version:** 1.0.0
**Date:** 2026-01-30
**Source:** Extracted from BECCA v1.13.0 Section 6

---

## The 5-Layer Data Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    INSTRUCTION FLOW: SOURCE → UI                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. PROJECT JSON (Local Disk)                                                │
│     └── governance/command-center/projects/{PROJECT-ID}.json                 │
│         └── masterQueens[].babyQueens[].purpose ← INSTRUCTIONS LIVE HERE     │
│                                                                              │
│  2. BRIDGE SERVICE (Node.js Watcher)                                         │
│     └── bridge/index.js watches governance/ folder                           │
│     └── On file change → syncs to Firestore                                  │
│                                                                              │
│  3. FIRESTORE (Cloud Database)                                               │
│     └── projects/{PROJECT-ID} document                                       │
│     └── Contains full project structure including BQ purposes                │
│                                                                              │
│  4. REACT HOOKS (Client-Side)                                                │
│     └── useProjects() subscribes to projects collection                      │
│     └── Returns array of project objects with nested MQs/BQs                 │
│                                                                              │
│  5. COMMAND CENTER UI (React Component)                                      │
│     └── CommandCenterTab.jsx extracts allBabyQueens from projects            │
│     └── Renders "👑 Baby Queen Instructions" panel when BQ expanded          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Instruction Fields (Where Instructions Live)

| Level | Field Name | Location | Displayed In UI |
|-------|------------|----------|-----------------|
| **Master Queen** | `purpose` | `masterQueens[].purpose` | 📋 Master Queen Instructions (gray panel) |
| **Baby Queen** | `purpose` | `babyQueens[].purpose` | 👑 Baby Queen Instructions (amber panel) |
| **Ant** | `task` | `ants[].task` | 📋 Original Instructions (Locked) |

---

## Project JSON Structure (Source of Truth)

```json
{
  "projectId": "COLONY-OS-001",
  "name": "Colony OS - Governance Dashboard",
  "masterQueens": [
    {
      "id": "COS-MQ-01",
      "name": "Core Infrastructure",
      "purpose": "MQ-level instructions here...",
      "babyQueens": [
        {
          "id": "COS-BQ-01",
          "name": "Bridge Service",
          "purpose": "BQ-level instructions here...",
          "ants": [
            {
              "id": "ANT-COS-001",
              "title": "Bridge File Watcher",
              "task": "ANT-level instructions..."
            }
          ]
        }
      ]
    }
  ]
}
```

---

## How Each Layer Works

| Layer | File/Service | What It Does |
|-------|--------------|--------------|
| **Layer 1** | `governance/command-center/projects/*.json` | Source of truth for project structure |
| **Layer 2** | `bridge/index.js` | Watches files, parses JSON directly, syncs to Firestore |
| **Layer 3** | Firestore `projects/{projectId}` | Cloud storage with real-time subscriptions |
| **Layer 4** | `src/hooks/useGovernanceData.js` | React hooks for Firestore subscriptions |
| **Layer 5** | `src/tabs/CommandCenterTab.jsx` | UI rendering with `allBabyQueens` extraction |

---

## How to Update Instructions

There are two ways to update instructions:

```
UPDATE FLOW OPTIONS
───────────────────

┌─────────────────────────────────┐
│ Option A: Edit JSON (Source)    │
│ (for permanent changes)         │
└─────────────────────────────────┘
         ↓
Edit: governance/command-center/projects/{PROJECT-ID}.json
         ↓
Bridge detects file change (chokidar)
         ↓
Firestore updated automatically
         ↓
UI reflects new instructions (real-time)

┌─────────────────────────────────┐
│ Option B: BQ Updates (Runtime)  │
│ (for mid-flight direction changes)
└─────────────────────────────────┘
         ↓
Baby Queen writes to "👑 BQ Updates" section in INSTRUCTION.md
         ↓
Stored in: registryBabyQueens/{bqId}.bqUpdates
         ↓
UI shows BQ Updates below Original Instructions
```

---

## When to Use Each Update Method

| Situation | Method | Where to Edit |
|-----------|--------|---------------|
| Permanent change to base instructions | **JSON** | `projects/{PROJECT-ID}.json` |
| Mid-phase direction change | **BQ Updates** | INSTRUCTION.md `👑 BQ Updates` section |
| Schema changed by previous Ant | **BQ Updates** | Update next Ant's instructions |
| New blocker discovered | **BQ Updates** | Warn in next Ant's instructions |
| Initial project setup | **JSON** | Create new project file |

---

## Troubleshooting: Why Isn't Instruction Showing?

Check each layer in order:

1. **Layer 1 (JSON):** Does the file exist? Is the field populated?
2. **Layer 2 (Bridge):** Is bridge running? Check bridge/status in Firestore
3. **Layer 3 (Firestore):** Open Firebase console, check the document
4. **Layer 4 (Hooks):** Add console.log to useProjects(), verify data shape
5. **Layer 5 (UI):** Check component props, verify extraction logic

---

## CEO Commands for Instruction Flow

| Command | What BECCA Does |
|---------|-----------------|
| "Check project JSON for {PROJECT-ID}" | Read source JSON file |
| "Is bridge running?" | Check bridge/status in Firestore |
| "What's BQ-05's purpose?" | Trace from JSON → Firestore → UI |
| "Update BQ-03 instructions" | Edit JSON or BQ Updates (ask which) |
| "Why isn't instruction showing?" | Trace 5 layers to find break |
| "Show instruction flow for ANT-247" | Trace from JSON to INSTRUCTION.md |

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `governance/command-center/projects/*.json` | Source of truth for project structure |
| `bridge/index.js` | Watches files, parses JSON, syncs to Firestore |
| `src/utils/structureParser.js` | Parses pasted text/JSON for StructureImportPanel |
| `src/hooks/useGovernanceData.js` | React hooks for Firestore subscriptions |
| `src/tabs/CommandCenterTab.jsx` | Main UI displaying BQ/ANT hierarchy |

---

## Changelog

### [1.0.0] 2026-01-30
- Extracted from BECCA v1.13.0 Section 6
