# TRINITY-REF-EVIDENCE-BUDGET v1.0.0
## Anti-Drowning Controls & Evidence Budget

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Evidence budget enforcement rules for Trinity (BQ)
**Source:** BABY_QUEEN_VSCODE_v1.0.6

---

## When to Use

Load this module when:
- Reviewing Ant D1 (DISCOVER) gate
- Enforcing anti-drowning controls
- Verifying Budget Ledger math

Say: `LOAD: TRINITY-REF-EVIDENCE-BUDGET`

---

## Evidence Budget Caps

During **Ant DISCOVERY** (D1), enforce hard caps:

| Resource | Cap | Expansion Token |
|----------|-----|-----------------|
| Files opened | ≤ 5 | `🔑 DISCOVERY EXPANSION APPROVED: +{N} files` |
| Lines read total | ≤ 200 | `🔑 DISCOVERY EXPANSION APPROVED: +{N} lines` |
| Search results inspected | ≤ 10 | Narrow query or request expansion |

If they hit the cap without expansion token → **reject and force STOP + redo within constraints**.

---

## Budget Ledger Format (Strict)

```
BUDGET LEDGER
─────────────
Files opened: {N}/5
  - path/to/file1.js (lines 1-50: 50 lines)
  - path/to/file2.js (lines 100-150: 50 lines)
Search output printed: {N} lines
Lines read total: {N}/200
Search results inspected: {N}/10
  - Query: "functionName" → {N} results ({N} lines)
Expansion tokens used: {none | list}
```

---

## SNAPSHOT Format (Strict)

```
SNAPSHOT
────────
Goal: {one sentence}
Files inspected: {list, max 5}
Key evidence: {≤3 bullets with file:line citations}
Open questions: {if any}
Proposed footprint: {files to change + 1-line purpose each}
Risk level: LOW / MED / HIGH
Next token needed: 🔑 FOOTPRINT APPROVED (or STOP reason)
```

---

## Budget Math Rules

### Ledger Math Rule (±2 Tolerance)
`Lines read total` must equal the sum of file line counts + search output (±2 lines). If mismatch → reject (code: `BQ_VIOLATION_BUDGET`).

### Re-read Rule
Re-reading the same lines counts again. Budget tracks attention, not uniqueness.

### Search Output Rule (Tool-Agnostic)
Any search/scan command output (`grep`, `rg`, `ripgrep`, `git grep`, `sed -n`, `awk`, etc.) counts toward `Lines read total` once cumulative output exceeds 20 lines per session.

### Search Accumulator Rule
The 20-line threshold is per discovery session, not per command. Sum all search output across D1.

---

## Ledger-to-Evidence Binding (Required)

Every file listed in the Budget Ledger must appear at least once in:
- SNAPSHOT "Key evidence" citations, OR
- An included snippet/excerpt shown in the message

If a file is listed but never cited/shown → treat as suspicious scope creep; reject and require resubmission (code: `BQ_VIOLATION_LEDGER_UNBOUND`).

---

## Expansion Token Rules

### Token Exactness Rule
The expansion token MUST specify **either** `files` **or** `lines` (never both).

**Valid:**
- `🔑 DISCOVERY EXPANSION APPROVED: +3 files`
- `🔑 DISCOVERY EXPANSION APPROVED: +100 lines`

**Invalid (reject):**
- `🔑 DISCOVERY EXPANSION APPROVED: +3 files/lines`
- `🔑 DISCOVERY EXPANSION APPROVED: +3 files, +100 lines`

Issuing combined form = NON-COMPLIANT (code: `BQ_VIOLATION_TOKEN_DRIFT`).

### Expansion Justification Required
If expansion requested: require justification ("why current evidence cannot answer goal")

---

## Enforcement Checklist

When reviewing D1 output:

- [ ] Budget Ledger present
- [ ] SNAPSHOT present
- [ ] Files opened ≤ 5 (or expansion token used)
- [ ] Lines read total ≤ 200 (or expansion token used)
- [ ] Search results ≤ 10
- [ ] Math adds up (±2 tolerance)
- [ ] Every ledger file appears in evidence citations
- [ ] Discovery stayed read-only (no modifications)

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  TRINITY-REF-EVIDENCE-BUDGET v1.0.0                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CAPS:                                                          │
│  • ≤5 files opened                                              │
│  • ≤200 lines read total                                        │
│  • ≤10 search results                                           │
│                                                                 │
│  EXPANSION TOKENS:                                              │
│  • 🔑 DISCOVERY EXPANSION APPROVED: +{N} files                  │
│  • 🔑 DISCOVERY EXPANSION APPROVED: +{N} lines                  │
│  • (never combined — one or the other)                          │
│                                                                 │
│  MATH RULES:                                                    │
│  • ±2 line tolerance                                            │
│  • Re-reads count again                                         │
│  • Search output >20 lines counts toward budget                 │
│  • 20-line threshold is per session                             │
│                                                                 │
│  REQUIRED OUTPUTS:                                              │
│  • Budget Ledger (files, lines, search counts)                  │
│  • SNAPSHOT (goal, evidence, footprint, risk)                   │
│                                                                 │
│  LEDGER-TO-EVIDENCE:                                            │
│  Every file in ledger must appear in SNAPSHOT citations         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from BABY_QUEEN_VSCODE_v1.0.6
- Evidence budget caps and math rules
