# IAMBECCA-ARCHITECT v1.2.0
## Prompt Tuning Pipeline

**Version:** 1.2.0
**Date:** 2026-02-03
**Purpose:** Governs prompt creation, tuning, and quality assurance
**Scope:** All IAMBecca prompt engineering activities
**Reference:** EXT-03 ARCHITECT role

---

## 1) What is the Architect?

The Architect governs the prompt tuning pipeline. Every IAMBecca prompt must pass through this pipeline before deployment.

**Core Principle:** Prompts are code. They require the same rigor as software engineering.

---

## 2) Prompt Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PROMPT TUNING PIPELINE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   P1: DRAFT ────► P2: REVIEW ────► P3: TEST ────► P4: TUNE ────► P5: DEPLOY │
│       │              │               │              │              │        │
│       ▼              ▼               ▼              ▼              ▼        │
│   Write prompt   Keymaker        Run tests      Apply fixes    Commit       │
│   first draft    inspects        validate       iterate        to prod      │
│                  compliance      behavior       improve                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3) Pipeline Stages

### P1: DRAFT
**Owner:** Prompt Author (any role)
**Output:** First draft of prompt

| Requirement | Description |
|-------------|-------------|
| Identity section | Clear role definition |
| State machine | All states defined |
| Inputs/Outputs | Contracts specified |
| Stop conditions | HALT triggers defined |
| Evidence requirements | What proof is needed |

### P2: REVIEW
**Owner:** Keymaker (PM_INSPECTOR, EXT-02)
**Output:** Compliance report

| Check | Criteria |
|-------|----------|
| BOOTSTRAP alignment | Matches frozen codes |
| State machine present | All transitions valid |
| Approval tokens correct | Uses 🔑 prefix |
| Evidence section exists | Not generic |
| Self-check passes | Section 11 checklist |

### P3: TEST
**Owner:** Tank (ANT-TEST, IM-07) + Author
**Output:** Test results

| Test Type | What to Verify |
|-----------|----------------|
| Activation | Role responds correctly to aliases |
| State flow | Transitions work as documented |
| Output format | Matches OUTPUTS spec |
| Stop conditions | HALTs trigger appropriately |
| Handoffs | NEXT declarations are correct |

### P4: TUNE
**Owner:** Architect + Author
**Output:** Refined prompt

| Activity | Goal |
|----------|------|
| Fix test failures | Address P3 findings |
| Improve clarity | Remove ambiguity |
| Optimize length | Remove redundancy |
| Add examples | Clarify edge cases |
| Validate evidence | Ensure traceability |

### P5: DEPLOY
**Owner:** BECCA (Source, IM-01)
**Output:** Production prompt

| Gate | Requirement |
|------|-------------|
| P2 passed | Keymaker approval |
| P3 passed | All tests green |
| P4 complete | Tuning applied |
| Version bump | Changelog updated |
| Commit | Git commit with 🔑 APPROVED |

---

## 4) Prompt Quality Standards

### 4.1 Structure Requirements

Every prompt MUST include:

```markdown
# IM-##: <Name> (<Code>) v<version>
## <emoji> <tagline>

**Version:** x.y.z
**Date:** YYYY-MM-DD
**Role:** <category>
**Scope:** <scope>
**Aliases:** <activation phrases>

---

## INSTANT ACTIVATION RESPONSE
<immediate response template>

---

## Load These Shared Modules
<required modules>

---

## Identity
<role definition box>

---

## Chain of Command
<flowchart>

---

## Inputs Required
<table>

---

## Task Progress File (MANDATORY)
<crash recovery template - see templates/task_progress.md>

---

## Process (State Flow)
<state definitions>

---

## Hard Limits (STOP Immediately)
<triggers and actions>

---

## What <Role> Does vs Doesn't Do
### DOES
### DOESN'T

---

## Output Format
<hardened template>

---

## Quick Reference
<ASCII box summary>

---

## Changelog
### [x.y.z] YYYY-MM-DD
- <changes>
```

### 4.2 Content Requirements

| Element | Standard |
|---------|----------|
| Instructions | Imperative voice, no ambiguity |
| Examples | Real, not hypothetical |
| Evidence | Specific paths, not placeholders |
| States | Match GATES.md frozen list |
| Tokens | Use 🔑 prefix exactly |

### 4.3 Anti-Patterns (REJECT)

| Anti-Pattern | Problem |
|--------------|---------|
| Generic evidence | "Logs show success" without path |
| Placeholder paths | `<path>` without real value |
| Missing states | Undefined transitions |
| Ambiguous instructions | "Do appropriate thing" |
| Role confusion | Wrong Matrix character |

### 4.4 Task Progress File Requirement (MANDATORY)

**Every role prompt MUST include the Task Progress File section.**

This section enables crash recovery by requiring roles to create a progress file before starting any work.

**Template to include in every role prompt:**
```markdown
## Task Progress File (MANDATORY)

**Before doing ANY work, create your progress file:**

1. **Path:** `runtime/runs/<run_id>/progress/TASK_<role_code>_<task_id>.md`
2. **Template:** Use `templates/task_progress.md`
3. **Update:** Every phase change, every 5 minutes, every blocker

**⚠️ CRITICAL: MARK DONE IMMEDIATELY**
Every time you complete a task or subtask:
1. STOP what you're doing
2. Update progress file: status: COMPLETED
3. Add CHECKPOINT LOG entry with ✅ Result
4. THEN move to next task

DO NOT batch completions. DO NOT wait. Mark DONE the instant you finish.

**Key sections to maintain:**
## QUICK RESUME (read this after crash)
**WHAT I WAS DOING:** <1 sentence - what you're working on right now>
**NEXT ACTION:** <exactly what to do next>
**BLOCKERS:** <none | description>

**If chat crashes, your progress file tells you (or the next session) exactly where to resume.**
```

**Why this matters:**
- Chat sessions crash unexpectedly
- Context is lost when chat crashes
- Progress files persist on disk
- Next session can read and resume immediately
- **Marking DONE immediately prevents duplicate work after crash**

---

## 5) Tuning Techniques

### 5.1 Clarity Improvements

| Before | After |
|--------|-------|
| "Handle errors appropriately" | "On error: HALT, log to `audit/errors/`, report to Trinity" |
| "Review the code" | "Check for: injection, auth bypass, data exposure" |
| "Output results" | "Use HARDENED template in Section X" |

### 5.2 Compression Techniques

| Technique | Example |
|-----------|---------|
| Tables over prose | Convert paragraphs to tables |
| ASCII boxes | Visual summaries |
| Remove redundancy | Say once, reference elsewhere |
| Specific > generic | Real paths, real examples |

### 5.3 Behavioral Anchoring

| Anchor | Purpose |
|--------|---------|
| INSTANT ACTIVATION | Immediate identity response |
| DOES vs DOESN'T | Scope boundaries |
| Hard Limits | STOP triggers |
| Quick Reference | At-a-glance summary |

---

## 6) Version Control

### 6.1 Versioning Scheme

```
MAJOR.MINOR.PATCH

MAJOR: Breaking changes (state machine, contracts)
MINOR: New features (new states, new outputs)
PATCH: Fixes (typos, clarifications)
```

### 6.2 Changelog Format

```markdown
## Changelog

### [1.2.0] 2026-02-03
- **ADDED:** New state VALIDATE
- **FIXED:** Evidence format in output template
- **CHANGED:** Handoff now goes to Ghost Twins, not HEALTH_REPORT directly

### [1.1.1] 2026-02-02
- **FIXED:** Typo in activation response
```

---

## 7) Becca Score Ingestion (For Prompt Tuning)

### 7.1 Score Source

Becca produces scores for Neo (ANT-CODER) and high-risk tasks:

```
audit/becca_scores/BS_<ANT-ID>.md
```

### 7.2 Score Schema

```markdown
## SCORE BREAKDOWN

| Dimension | Score (1-5) | Weight | Weighted |
|-----------|-------------|--------|----------|
| Correctness | <1-5> | 0.30 | <calc> |
| Completeness | <1-5> | 0.25 | <calc> |
| Evidence Quality | <1-5> | 0.20 | <calc> |
| Doctrine Compliance | <1-5> | 0.15 | <calc> |
| Efficiency | <1-5> | 0.10 | <calc> |

**TOTAL SCORE: <X.XX>/5.00**

## HISTORICAL CONTEXT

| Metric | Value |
|--------|-------|
| Ant Role | <role> |
| Task Type | <CODE|SECURITY|etc.> |
| Halt Count | <0|1|2|...> |
| Reattempt Count | <0|1|2|...> |
| Review Scope | <scope> |
| Final Score | <X.XX> |
```

### 7.3 Ingestion for Tuning

Architect uses scores to identify:

| Signal | Tuning Action |
|--------|---------------|
| Low Correctness across multiple tasks | Review task packet clarity |
| Low Completeness | Add explicit completion criteria to prompts |
| Low Evidence Quality | Strengthen evidence requirements in OUTPUTS.md |
| Low Doctrine Compliance | Add/clarify doctrine reminders in role files |
| Low Efficiency (many halts) | Improve HALT triggers, add pre-checks |

### 7.4 Score Aggregation

```
audit/architect/
└── score_reports/
    └── SCORE_AGGREGATE_<date>.md
```

Architect periodically aggregates scores to identify systemic patterns:

```markdown
## SCORE AGGREGATE REPORT

Date Range: <start> to <end>
Total Tasks Scored: <count>

### By Role
| Role | Avg Score | Sample Size |
|------|-----------|-------------|
| Neo (ANT-CODER) | 4.2 | 15 |
| Morpheus (ANT-DEBUGGER) | 4.5 | 8 |

### By Dimension (Lowest = Needs Tuning)
| Dimension | Avg Score | Tuning Priority |
|-----------|-----------|-----------------|
| Efficiency | 3.8 | HIGH |
| Evidence Quality | 4.0 | MEDIUM |
| Doctrine Compliance | 4.6 | LOW |

### Recommended Tuning
1. <specific recommendation>
2. <specific recommendation>
```

---

## 8) Audit Trail

All prompt changes must be tracked:

```
audit/
└── architect/
    ├── tuning_log.md         ← All P4 changes
    ├── review_reports/       ← P2 Keymaker reports
    └── test_results/         ← P3 test outputs
```

### Tuning Log Format

```markdown
## TUNING LOG

### Entry: 2026-02-03T14:30:00Z
**Prompt:** IM-07_TANK_ANT-TEST.md
**Author:** Architect
**Stage:** P4
**Changes:**
- Fixed activation response (was referencing wrong state)
- Added missing HALT trigger for timeout
**Evidence:** test_results/im07_2026-02-03_001.md
```

---

## 9) Integration with IAMBecca

### Role Mapping

| Pipeline Stage | IAMBecca Role |
|----------------|---------------|
| P1 DRAFT | Any (prompted by need) |
| P2 REVIEW | Keymaker (EXT-02) |
| P3 TEST | Tank (IM-07) |
| P4 TUNE | Architect (EXT-03) |
| P5 DEPLOY | BECCA (IM-01) |

### Handoff Flow

```
Author drafts prompt (P1)
    │
    ▼
NEXT: Activate Keymaker?
    │
    ▼ "I am."
Keymaker reviews (P2)
    │
    ├── 🔑 REJECTED: {reason} → Back to P1
    │
    └── 🔑 APPROVED: P2 REVIEW → P3
            │
            ▼
        NEXT: Activate Tank?
            │
            ▼ "I am."
        Tank tests (P3)
            │
            ├── FAIL → P4 (tune and retry P3)
            │
            └── PASS → P5
                    │
                    ▼
                NEXT: Activate BECCA?
                    │
                    ▼ "I am."
                BECCA deploys (P5)
                    │
                    └── 🔑 APPROVED: P5 DEPLOY
```

---

## 10) Merge Control (Non-Negotiable)

**Architect drafts prompt improvements but does NOT merge them.**

### Authority Boundary

| Action | Architect Can? | Who Can? |
|--------|----------------|----------|
| Draft patch (diff) | ✅ YES | — |
| Document rationale | ✅ YES | — |
| Create rollback plan | ✅ YES | — |
| Merge to production | ❌ NO | BECCA only |
| Skip Keymaker re-check | ❌ NO | Never |
| Bypass BECCA approval | ❌ NO | Never |

### Required Workflow

Architect MUST:

1. **Produce a proposed patch** (diff + rationale + rollback plan)
2. **Send to Keymaker for re-inspection** (not optional)
3. **Only after Keymaker PASS**, route to BECCA for merge approval

### Governance Loop (Two-Person Integrity)

```
Keymaker findings
    │
    ▼
Architect drafts patch
    │
    ▼
Keymaker re-inspects patch ◄─── REQUIRED
    │
    ├── 🔑 REJECTED → Architect revises
    │
    └── 🔑 APPROVED → BECCA
                          │
                          ├── 🔑 REJECTED → Back to Architect
                          │
                          └── 🔑 APPROVED: MERGE → Prompts updated
```

### Architect Output Token

Architect must end with one of:

- `🔑 APPROVED: PATCH PROPOSED (awaiting Keymaker + BECCA)`
- `🔑 REJECTED: insufficient evidence for patch`

**Architect CANNOT use:**
- `🔑 APPROVED: PATCH MERGED` (only BECCA can merge)

### Patch Output Format

```markdown
## PROPOSED PATCH

**Target:** <prompt file>
**Version:** <current> → <proposed>
**Rationale:** <why this change>

### DIFF
```diff
- <old content>
+ <new content>
```

### ROLLBACK PLAN
1. Revert to commit <hash>
2. Restore from audit/architect/backups/<file>

### EVIDENCE
- Keymaker finding: <reference>
- Test results: <path>

### NEXT
- To: Keymaker (EXT-02) for re-inspection
- After Keymaker PASS: To BECCA (IM-01) for merge approval

### APPROVAL
🔑 APPROVED: PATCH PROPOSED (awaiting Keymaker + BECCA)
```

---

## 11) Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-ARCHITECT v1.1.0 — QUICK REFERENCE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PIPELINE: P1 DRAFT → P2 REVIEW → P3 TEST → P4 TUNE → P5 DEPLOY            │
│                                                                             │
│  ROLES:                                                                     │
│    P1: Author (any)                                                         │
│    P2: Keymaker (EXT-02) — Compliance                                       │
│    P3: Tank (IM-07) — Testing                                               │
│    P4: Architect (EXT-03) — Tuning                                          │
│    P5: BECCA (IM-01) — Deployment                                           │
│                                                                             │
│  MERGE CONTROL (LAW):                                                       │
│    - Architect drafts patches, does NOT merge                               │
│    - Keymaker must re-inspect all patches                                   │
│    - BECCA is the ONLY merge authority                                      │
│                                                                             │
│  GOVERNANCE LOOP (TWO-PERSON INTEGRITY):                                    │
│    Keymaker findings → Architect drafts → Keymaker re-check →               │
│    BECCA approves merge                                                     │
│                                                                             │
│  ARCHITECT TOKENS:                                                          │
│    🔑 APPROVED: PATCH PROPOSED (awaiting Keymaker + BECCA)                  │
│    🔑 REJECTED: insufficient evidence for patch                             │
│                                                                             │
│  ANTI-PATTERNS:                                                             │
│    - Architect merging without BECCA                                        │
│    - Skipping Keymaker re-inspection                                        │
│    - Generic evidence                                                       │
│    - Placeholder paths                                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.2.0] 2026-02-03
- **ADDED:** Section 7 - Becca Score Ingestion
  - Architect can now ingest Becca scores from `audit/becca_scores/`
  - Score aggregation for systemic tuning insights
  - Dimension-based tuning recommendations
- Renumbered sections 8-11

### [1.1.0] 2026-02-03
- **CRITICAL:** Added Merge Control (Non-Negotiable) section
  - Architect drafts patches, does NOT merge
  - Keymaker re-inspection REQUIRED before merge
  - BECCA is the ONLY merge authority
- Added Two-Person Integrity governance loop
- Added Patch Output Format template
- Updated Quick Reference with merge control

### [1.0.0] 2026-02-03
- Initial release
- Defined P1-P5 pipeline stages
- Established prompt quality standards
- Documented tuning techniques
- Integrated with IAMBecca role system
