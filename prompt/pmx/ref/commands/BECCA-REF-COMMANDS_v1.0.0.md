# BECCA-REF-COMMANDS v1.1.0
## Quick Reference Commands — Complete Reference

**Version:** 1.1.0
**Date:** 2026-01-30
**Source:** Extracted from BECCA v1.13.0 Section 17 + Starter Pack v1.0.0

---

## Daily Operations

| Say This | BECCA Does |
|----------|------------|
| "Morning standup" | Run CEO morning workflow |
| "End of day" | Run CEO closeout workflow |
| "Colony health check" | Run full inspection |

---

## Phase Management

| Say This | BECCA Does |
|----------|------------|
| "Show phases" | List all phases with status |
| "Create phase: X" | Create new phase |

---

## Agent Spawning

| Say This | BECCA Does |
|----------|------------|
| "Spawn MQ for X" | Activate Master Queen |
| "Spawn BQ for phase X" | Activate Baby Queen |
| "Spawn Ant for task X" | Activate Coder Ant |

---

## Task Management

| Say This | BECCA Does |
|----------|------------|
| "Add task: X" | Create todo |
| "Assign task X to phase Y" | Link todo to phase |
| "Mark X as done" | Update status (requires proof) |

---

## Ghost Index Queries

| Say This | BECCA Does |
|----------|------------|
| "Who worked on X?" | Query Ghost Index |
| "Any warnings about X?" | Query Pheromone Registry |

---

## Horsemen System

| Say This | BECCA Does |
|----------|------------|
| "Horsemen status" | Show Horsemen outcomes summary |
| "Guide me through Horsemen" | Explain Five Horsemen system |
| "Run H1 check on ANT-{N}" | Prepare H1 input for Perplexity |
| "Run H2 check on ANT-{N}" | Prepare H2 input for OpenAI |
| "Run H3 check on ANT-{N}" | Prepare H3 input for GitHub Copilot |
| "Run H4 check on ANT-{N}" | Prepare H4 input for Claude |
| "Run H5 check on ANT-{N}" | Prepare H5 input for Gemini |
| "Run all Horsemen on batch" | Prepare all 5 verification inputs |
| "Consolidate Horsemen verdict" | Combine all 5 results |

---

## Approvals

| Say This | BECCA Does |
|----------|------------|
| "Approve: X" | Sign off on danger action |

---

## Documentation

| Say This | BECCA Does |
|----------|------------|
| "What prompts exist?" | Show prompt library |
| "Show report template" | Display FULL DETAIL v2.3.7 |

---

## Queue System

| Say This | BECCA Does |
|----------|------------|
| "Show queues" | List all MQ/BQ queue folders |
| "Check BQ-05 assignment" | Read BQ-05/ASSIGNMENT.md |
| "Check ANT-247 instructions" | Read Ant's INSTRUCTION.md |
| "Who's in BQ-03?" | List Ants assigned to BQ-03 |
| "Queue health" | Count assignments vs completions |
| "Run Queue Distributor" | Activate distribution workflow |

---

## PMX System

| Say This | BECCA Does |
|----------|------------|
| "Show PMX roles" | List all 13 role modules |
| "Which PMX for security?" | Recommend PMX-08 (Security-Ant) |
| "Activate PMX-05" | Prepare Coder-Ant activation |
| "What modules does PMX-09 need?" | Show shared modules for Firebase-Ant |

---

## 🚀 Starter Pack (4-Window Crew)

| Say This | BECCA Does |
|----------|------------|
| "Create starter pack and activate the crew" | Full 4-window setup protocol (project selection → queue setup → window instructions) |
| "Show starter pack for {PROJECT}" | Generate setup instructions for specific project |
| "Refresh crew instructions" | Re-output window setup after queue changes |
| "Crew status" | Check which windows/agents are active |

**Reference:** `governance/prompts/automation/STARTER_PACK_v1.0.0.md`

---

## Instruction Flow

| Say This | BECCA Does |
|----------|------------|
| "Check project JSON for {PROJECT-ID}" | Read source JSON file |
| "Is bridge running?" | Check bridge/status in Firestore |
| "What's BQ-05's purpose?" | Trace from JSON → Firestore → UI |
| "Update BQ-03 instructions" | Edit JSON or BQ Updates (ask which) |
| "Why isn't instruction showing?" | Trace 5 layers to find break |
| "Show instruction flow for ANT-247" | Trace from JSON to INSTRUCTION.md |

---

## Changelog

### [1.1.0] 2026-01-30
- Added: 🚀 Starter Pack (4-Window Crew) section
- Commands: "Create starter pack and activate the crew", "Show starter pack for {PROJECT}", "Refresh crew instructions", "Crew status"
- Reference: `governance/prompts/automation/STARTER_PACK_v1.0.0.md`

### [1.0.0] 2026-01-30
- Extracted from BECCA v1.13.0 Section 17
