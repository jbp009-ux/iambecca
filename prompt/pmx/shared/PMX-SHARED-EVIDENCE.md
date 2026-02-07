# PMX-SHARED-EVIDENCE v1.0.0
## Proof Standards for Colony OS

**Version:** 1.0.0
**Date:** 2026-01-30
**Purpose:** Single source of truth for evidence requirements
**Scope:** Identical across all projects

---

## Core Principle

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   PROOF > CLAIMS                                                │
│                                                                 │
│   An assertion is only "true" if backed by evidence.            │
│   "It works" means nothing without test output.                 │
│   "I fixed it" means nothing without a diff.                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Evidence Types (What Counts as Proof)

| Evidence Type | Example | Strength |
|---------------|---------|----------|
| **File excerpt** | Path + exact snippet with line numbers | ✅ Strong |
| **Command output** | Exact terminal output (copy/paste) | ✅ Strong |
| **Test result** | Test name + pass/fail + output | ✅ Strong |
| **Screenshot** | Timestamped image of behavior | ✅ Strong |
| **Diff** | Before/after with exact changes | ✅ Strong |
| **Log excerpt** | Timestamped log entries | ✅ Strong |
| **Repro steps** | Steps + observed vs expected | ✅ Strong |
| **"I checked"** | No citation | ❌ Not evidence |
| **"It should work"** | No verification | ❌ Not evidence |
| **"Looks good"** | No specifics | ❌ Not evidence |

---

## Citation Format

**Always cite your source:**

```markdown
**File evidence:**
`path/to/file.ts:42-45`
```typescript
const example = "exact code here";
```

**Command evidence:**
```bash
$ npm test
✓ 42 tests passed
```

**Log evidence:**
[2026-01-30 14:32:01] INFO: Server started on port 3000
```

---

## Assertion Rules

### ✅ DO
- Cite exact file paths with line numbers
- Copy/paste actual output (don't paraphrase)
- Include timestamps on logs/screenshots
- Show before AND after for changes
- Link claims to specific evidence

### ❌ DON'T
- Say "I verified" without showing verification
- Say "tests pass" without test output
- Say "it works" without demonstrating it
- Paraphrase error messages (copy exact text)
- Assume behavior without checking

---

## Hypothesis vs Fact

When you're not certain, label it:

| Statement Type | Format |
|----------------|--------|
| **Fact** (proven) | "The error is on line 42: `TypeError: x is undefined`" |
| **Hypothesis** (unproven) | "HYPOTHESIS: The error may be caused by X. To test: {steps}" |

**Every hypothesis must include how to test it.**

---

## Minimum Evidence by State

| State | Required Evidence |
|-------|-------------------|
| **DISCOVERY** | Evidence of current behavior (file excerpts, logs, repro) |
| **FOOTPRINT** | Evidence of where change belongs (file paths, relevant code) |
| **PATCH** | Evidence of exact edits (diffs, before/after) |
| **VERIFY** | Evidence tests passed + behavior fixed (test output, screenshots) |
| **REPORT** | Evidence summary with links to all above |
| **STOP** | Evidence of blocker (error message, missing resource) |

---

## Evidence Quality Checklist

Before submitting any claim, verify:

```
[ ] Source is cited (file path, command, URL)
[ ] Content is exact (copy/paste, not paraphrased)
[ ] Timestamp included (for logs, screenshots)
[ ] Reproducible (someone else could verify)
[ ] Relevant (directly supports the claim)
```

---

## Anti-Patterns (Evidence Failures)

| Bad Pattern | Why It Fails | Fix |
|-------------|--------------|-----|
| "The bug is fixed" | No proof of fix | Show test passing + behavior change |
| "I updated the file" | No diff shown | Show before/after |
| "Tests are passing" | No output | Copy/paste test results |
| "Security is handled" | No verification | Show rules test output |
| "Performance improved" | No metrics | Show before/after benchmarks |

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  PMX-SHARED-EVIDENCE v1.0.0 — QUICK REFERENCE                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PROOF > CLAIMS                                                 │
│                                                                 │
│  VALID EVIDENCE:                                                │
│  • File excerpt (path + snippet + line numbers)                 │
│  • Command output (exact copy/paste)                            │
│  • Test result (name + output)                                  │
│  • Screenshot (timestamped)                                     │
│  • Diff (before/after)                                          │
│                                                                 │
│  NOT EVIDENCE:                                                  │
│  • "I checked" (no citation)                                    │
│  • "It works" (no test)                                         │
│  • "Looks good" (no specifics)                                  │
│                                                                 │
│  HYPOTHESIS FORMAT:                                             │
│  "HYPOTHESIS: {claim}. To test: {steps}"                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-01-30
- Initial release
- Evidence types defined
- Citation format established
- Minimum evidence by state
- Anti-patterns documented
