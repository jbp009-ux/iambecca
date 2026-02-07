# BECCA-REF-GHOST-INDEX v1.0.0
## Ghost Index Pre-Discovery (Team Awareness)

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Institutional memory and prior work awareness
**Load:** On demand via `LOAD: BECCA-REF-GHOST-INDEX`
**Source:** Extracted from CODER_ANT_VSCODE_v1.3.9

---

## Purpose

Before you start main discovery, check what prior Ants have done. This prevents:
- Breaking code that another Ant carefully built
- Duplicating work that's already been done
- Missing critical warnings about fragile areas
- Wandering/guessing when there's clear institutional knowledge

**This step is FREE — does not count toward your 5 files / 200 lines evidence budget.**

---

## The Ghost Index System

Ghost Archivist maintains 4 index files in `governance/index/`:

| File | Path | What's Inside | How to Use |
|------|------|---------------|------------|
| **Pheromone Registry** | `governance/index/PHEROMONE_REGISTRY.md` | Warnings by severity (🔴🟠🟡🟢) with target, category, Ant ID, message | `grep -i "{TARGET}" governance/index/PHEROMONE_REGISTRY.md` — Find hazards on your target |
| **File Ownership Map** | `governance/index/FILE_OWNERSHIP_MAP.md` | File → Ant mappings showing who touched what, when, for what task | `grep -i "{TARGET}" governance/index/FILE_OWNERSHIP_MAP.md` — Find prior owners |
| **Master Ant Index** | `governance/index/MASTER_ANT_INDEX.md` | Single-line registry of all Ants: ID, type, phase, file, pheromone counts, status | `grep -i "{TARGET}" governance/index/MASTER_ANT_INDEX.md` — Find related work |
| **Recent Unindexed** | `governance/index/RECENT_UNINDEXED_REPORTS.md` | Work completed but not yet indexed by Ghost | `tail -50 governance/index/RECENT_UNINDEXED_REPORTS.md` — Check very recent work |

---

## What Each Index Tells You

### PHEROMONE_REGISTRY.md — The Danger Map
```
| index.js:onEventWrite | QUEEN_WATCHER | ANT-5 | 🔴 CRITICAL "Deterministic alert system. NO AI logic." |
```
→ "If I touch `onEventWrite`, I break ANT-5's Queen Watcher. Don't touch it."

### FILE_OWNERSHIP_MAP.md — The Ownership Chain
```
functions/index.js
  +ANT-2 | PH1 | Admin Pipeline
  +ANT-3 | PH2 | Truth Broker
  +ANT-5 | PH4 | Queen Guardian Watcher
```
→ "20+ Ants touched this file. I need to add code surgically between their sections."

### MASTER_ANT_INDEX.md — The Work Log
```
ANT-182 🛠️ Carpenter | PH9 | ChatTab.jsx | Wire Functional Side Panels | 🟢3 | ✅ | → ANT_REPORTS_175_199.md
```
→ "ANT-182 just worked on ChatTab.jsx in PH9. Check their report before modifying."

### RECENT_UNINDEXED_REPORTS.md — The Fresh Queue
→ "ANT-189 finished 2 hours ago but isn't indexed yet. Their work might affect my task."

---

## Pre-Discovery Commands (Run These First)

After receiving your task but BEFORE main discovery:

```bash
# 1. Check PHEROMONE_REGISTRY for hazards on your target surface
#    Replace {TARGET} with your target file/function name
grep -i "{TARGET}" governance/index/PHEROMONE_REGISTRY.md

# 2. Check FILE_OWNERSHIP_MAP for prior owners
grep -i "{TARGET}" governance/index/FILE_OWNERSHIP_MAP.md

# 3. Check MASTER_ANT_INDEX for related work
grep -i "{TARGET}" governance/index/MASTER_ANT_INDEX.md

# 4. Check for unindexed recent work (last 50 lines)
tail -50 governance/index/RECENT_UNINDEXED_REPORTS.md
```

---

## Pre-Discovery Output Format

After running the index scans, output this structure:

```
PRE-DISCOVERY INDEX CHECK
─────────────────────────
Target surface(s): {files/areas you'll work on}

PHEROMONE_REGISTRY scan:
- 🔴 CRITICAL: {list any, or "none found"}
- 🟠 HIGH_RISK: {list any, or "none found"}
- 🟡 MEDIUM: {list any, or "none found"}
- 🟢 INFO: {list any, or "none found"}

FILE_OWNERSHIP_MAP scan:
- {file}: last touched by {ANT-X} for {task}
- {or "No prior ownership found"}

MASTER_ANT_INDEX scan:
- Prior Ants on this surface: {list with phase/task, or "none"}

RECENT_UNINDEXED scan:
- Recent work: {any relevant, or "none affecting target"}

INDEX VERDICT:
- [ ] No blockers — proceed to D1 main discovery
- [ ] Pheromone warning — proceed with caution (see notes)
- [ ] 🔴 CRITICAL pheromone — STOP and escalate to Guardian
- [ ] Conflicting active work — coordinate before proceeding
```

---

## Severity-Based Rules

| Finding | Action |
|---------|--------|
| 🔴 CRITICAL pheromone on target | **STOP immediately.** Report to Guardian. Do NOT proceed without explicit override. |
| 🟠 HIGH_RISK pheromone on target | **Acknowledge in your plan.** State how you'll avoid breaking it. |
| 🟡 MEDIUM pheromone on target | Note it. Proceed with awareness. |
| 🟢 INFO pheromone on target | Good to know. Proceed normally. |
| Prior Ant ownership | Check their pheromones. Your code must integrate surgically with theirs. |
| Recent unindexed work | Scan for conflicts. If unclear, ask Guardian. |

---

## Example: How Index Helps

**Without Index:**
> ANT-190: "I need to add a function to index.js... let me read the whole file and figure out where things go..."
> *[Accidentally breaks ANT-5's Queen Watcher because they didn't know it existed]*

**With Index:**
```bash
$ grep -i "index.js" governance/index/PHEROMONE_REGISTRY.md
```
```
| index.js:onEventWrite | QUEEN_WATCHER | ANT-5 | 🔴 CRITICAL "Deterministic alert system. NO AI logic." |
| index.js:sendAssistantMessage | ADMIN_PIPELINE | ANT-2 | 🔴 CRITICAL "ONLY authorized path for role:'assistant' writes." |
```
> ANT-190: "I see ANT-5's Queen Watcher is CRITICAL — I'll add my function AFTER that block and not touch anything in onEventWrite."

---

## If Index Files Don't Exist

If the `governance/index/` directory doesn't exist or is empty:
1. Note this in your Pre-Discovery output: "Index files not found"
2. Proceed to main discovery with extra caution
3. Be aware you're working without institutional memory
4. Consider asking Guardian: "Is there prior work on {target} I should know about?"

---

## Simplified Token Flow with D0

**D0 — Pre-Discovery (Ghost Index Check)**
- Ant runs index scans (FREE, no budget cost)
- Ant outputs PRE-DISCOVERY INDEX CHECK
- If 🔴 CRITICAL found → STOP immediately
- If clear → proceed to D1

**D1 — Discovery**
- Ant requests: `DISCOVERY APPROVED`
- Guardian grants: `DISCOVERY APPROVED`
- Ant reads/searches/runs checks within evidence budget
- Ant outputs SNAPSHOT summary

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  BECCA-REF-GHOST-INDEX v1.0.0 — QUICK REFERENCE                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PURPOSE: Check institutional memory BEFORE main discovery      │
│  COST: FREE (does not count toward evidence budget)             │
│                                                                 │
│  INDEX FILES:                                                   │
│  • PHEROMONE_REGISTRY.md — Hazards by severity                  │
│  • FILE_OWNERSHIP_MAP.md — Who touched what                     │
│  • MASTER_ANT_INDEX.md — Work log                               │
│  • RECENT_UNINDEXED_REPORTS.md — Fresh queue                    │
│                                                                 │
│  COMMANDS:                                                      │
│  grep -i "{TARGET}" governance/index/PHEROMONE_REGISTRY.md      │
│  grep -i "{TARGET}" governance/index/FILE_OWNERSHIP_MAP.md      │
│  grep -i "{TARGET}" governance/index/MASTER_ANT_INDEX.md        │
│  tail -50 governance/index/RECENT_UNINDEXED_REPORTS.md          │
│                                                                 │
│  RULES:                                                         │
│  🔴 CRITICAL → STOP immediately                                 │
│  🟠 HIGH_RISK → Acknowledge in plan                             │
│  🟡 MEDIUM → Note and proceed                                   │
│  🟢 INFO → Proceed normally                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from CODER_ANT_VSCODE_v1.3.9
- Ghost Index system documentation
- Pre-Discovery commands
- Output format template
- Severity-based rules
- Token flow with D0
