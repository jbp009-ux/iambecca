# PMX-SHARED-ANTI-DROWNING v1.0.0
## Information Diet & Evidence Budget

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Prevent context overload, enforce focused discovery
**Scope:** Identical across all projects
**Source:** Extracted from CODER_ANT_VSCODE_v1.3.9

---

## Overview

You have direct access to a large repo (200+ reports, hundreds of files). Your job is to stay **focused, fast, and non-chaotic**.

---

## 1) ONE-QUESTION RULE

Before reading anything, state the **single question** you're trying to answer.
- If you can't phrase it as one sentence → STOP and ask Guardian to define the objective.

---

## 2) TRIAGE FIRST (3-Minute Orientation)

Never "browse" the repo randomly.

**Step A — Find the nearest source**
- Prefer: exact file(s) named in task, or folder most directly related to change
- Only widen search if first source doesn't contain what you need

**Step B — Use narrow search**
- Grep/Glob with specific terms (file names, IDs, function names)
- Read only what's necessary to make a footprint plan

---

## 3) EVIDENCE BUDGET (Hard Caps)

During DISCOVERY, you have strict limits:

| Resource | Cap | To Expand |
|----------|-----|-----------|
| Files opened | 5 max | Request `DISCOVERY EXPANSION APPROVED: +{N} files` |
| Lines read | 200 max | Request `DISCOVERY EXPANSION APPROVED: +{N} lines` |
| Grep results inspected | 10 max | Request expansion or narrow query |

If you hit budget and lack certainty → STOP and request expansion.

### Line Budget Enforcement

- If a file exceeds remaining budget, use targeted search (grep) to isolate the relevant section, then read only that section (or STOP + request expansion)
- "Read whole file" only allowed when file line count fits within remaining budget
- Claiming "I read 1 file" while that file has 500 lines is a budget violation

### Search Output Rule (Tool-Agnostic)

Any search/scan command output (`grep`, `rg`, `ripgrep`, `git grep`, `sed -n`, `awk`, `cat | head`, etc.) printed to console counts toward `Lines read total` once cumulative output exceeds 20 lines per discovery session.

### Search Line Counting

`search output lines` = number of lines printed to the console and visible to the Ant (not total matches in files).

### Search Accumulator Rule

The 20-line threshold is per discovery session, not per command. Sum all search output lines across D1 and apply the rule to the total. No "tail laundering" by chunking into small slices.

### Re-Read Rule

Re-reading the same lines counts again toward `Lines read total` if the output is printed again. Budget tracks attention, not uniqueness.

---

## 4) NEAREST TRUTH RULE

When multiple sources exist (reports, code comments, docs):

| Priority | Source | Trust For |
|----------|--------|-----------|
| 1st | Code | Actual behavior |
| 2nd | Config/Rules | Security, deploy targets |
| 3rd | Reports | Intent, history, context |

**If report conflicts with code → REPORT the conflict.** Do not pick a side.

---

## 5) REPORTS ARE AN INDEX, NOT A BOOK

You do not read reports end-to-end. You use them like a map:
- Search for specific ID/tag (ANT-#, filename, keyword)
- Extract only the minimum snippet needed
- Cite exact file + section used

---

## 6) TWO-PASS WORKFLOW

**Pass 1 (Locate):** Find minimal set of files that matter.
**Pass 2 (Confirm):** Read specific sections to verify.

Do NOT do Pass 2 on more than 2 files until you have a footprint plan.

---

## 7) "WHY THIS, NOT THAT" (Required)

When you choose sources, you must say:
- "I used X because it directly controls Y"
- "I did NOT use Z because it's outdated / indirect / not authoritative"

---

## 8) SNAPSHOT SUMMARY (End of Discovery)

At the end of DISCOVERY, output this structure:

```
SNAPSHOT
────────
Goal: {one sentence}
Files inspected: {list, max 5}
Key evidence: {3 bullets max, with file:line citations}
Open questions: {if any}
Proposed footprint: {files to change + 1-line summary each}
Risk level: LOW / MED / HIGH
Next token needed: FOOTPRINT APPROVED (or STOP reason)
```

---

## 8.5) BUDGET LEDGER (Required)

At the end of `STATE: DISCOVERY`, include a Budget Ledger (strict format):

```
BUDGET LEDGER
─────────────
Files opened: {N}/5
  • path/to/file1 (lines a-b: {count})
  • path/to/file2 (lines a-b: {count})
Search output printed: {N} lines
Lines read total: {N}/200
Grep results inspected: {N}/10
  • Query: "{query}" → inspected {k} results
Expansion tokens used: {none | list}
```

### Ledger Integrity Rule

Every file listed above must appear in SNAPSHOT evidence or be shown in a snippet excerpt. No "phantom" files.

### Ledger Math Rule

`Lines read total` must equal the sum of listed file line counts (±2 lines allowed). If any single file count is rounded, mark it as `(approx)` and explain why. If mismatch → STOP.

---

## 9) NO SCOPE EXPANSION

If you detect a pattern that *could* be improved everywhere:
- Propose it as a **separate task**
- Do NOT expand scope in current task

---

## 10) DEFAULT MODE: BORING AND DETERMINISTIC

- Prefer repeatable steps over cleverness
- Prefer small diffs over "perfect architecture"
- Prefer verifying with build/tests over explaining

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  PMX-SHARED-ANTI-DROWNING v1.0.0 — QUICK REFERENCE              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ONE-QUESTION RULE:                                             │
│  State ONE question before reading anything                     │
│                                                                 │
│  EVIDENCE BUDGET:                                               │
│  • Files: 5 max                                                 │
│  • Lines: 200 max                                               │
│  • Grep results: 10 max                                         │
│  → Request DISCOVERY EXPANSION APPROVED to increase             │
│                                                                 │
│  NEAREST TRUTH:                                                 │
│  Code > Config > Reports                                        │
│  (If conflict: REPORT it, don't pick a side)                    │
│                                                                 │
│  TWO-PASS:                                                      │
│  1. Locate (find files)                                         │
│  2. Confirm (read sections)                                     │
│                                                                 │
│  OUTPUTS:                                                       │
│  • SNAPSHOT (goal, files, evidence, footprint)                  │
│  • BUDGET LEDGER (files, lines, grep counts)                    │
│                                                                 │
│  BORING > CLEVER. SMALL > PERFECT. VERIFY > EXPLAIN.            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from CODER_ANT_VSCODE_v1.3.9
- One-Question Rule
- Evidence Budget (5 files, 200 lines, 10 grep)
- Nearest Truth Rule
- Two-Pass Workflow
- Snapshot Summary format
- Budget Ledger format
- Ledger integrity and math rules
