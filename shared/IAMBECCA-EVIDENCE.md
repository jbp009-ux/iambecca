# IAMBECCA-EVIDENCE v1.0.0

**Purpose:** Evidence contract rules, validator integration, rejection enforcement
**Scope:** Loaded with ALL IAMBecca roles
**Source:** Integrated from evidence_contract.py + IAMBecca vFinal++ spec

---

## 1) Core Evidence Doctrine (FROZEN)

No output is "real" unless evidence exists:
- File paths
- Diffs (git diff output)
- Command outputs
- Test reports
- Logs
- Screenshots (for UI work)

Evidence MUST be verifiable using the evidence contract validator.

---

## 2) Evidence Contract Rules

### 2.1 Required Fields per Finding

Every finding/claim MUST include:

| Field | Required | Description |
|-------|----------|-------------|
| `file_path` | YES | Actual path to the file (not placeholder) |
| `line_number` | YES (for code) | Specific line number |
| `code_snippet` | YES (for code) | Actual code showing the issue/change |
| `severity` | YES | BLOCKER / HIGH / MEDIUM / LOW |
| `fix_recommendation` | YES | Specific fix, not generic advice |
| `verification` | YES | How to verify the fix worked |

### 2.2 Rejected Patterns (INVALID EVIDENCE)

The following patterns indicate FAKE/TEMPLATE evidence and MUST be rejected:

**Placeholder Paths:**
```
/project/root/...
path/to/...
.../
<file_path>
[file_path]
your_project/...
example_/...
sample_/...
todo_/...
placeholder/...
```

**Generic Recommendations:**
```
"fix this"
"update this"
"change this"
"modify as needed"
"implement appropriate..."
"add necessary..."
"TODO"
"..."
```

### 2.3 Minimum Evidence Thresholds

| Finding Type | Minimum Requirements |
|--------------|---------------------|
| Code change | file_path + line_number + diff |
| Bug report | file_path + line_number + error log |
| Test result | test name + pass/fail + output |
| Security issue | file_path + line_number + vulnerability description + fix |
| Performance | metric + baseline + measured value |
| Task Progress | progress file path + status + checkpoint log |

### 2.4 Task Progress File (MANDATORY)

Every role MUST create a Task Progress File before starting work:

| Requirement | Description |
|-------------|-------------|
| **Path** | `runtime/runs/<run_id>/progress/TASK_<role>_<task_id>.md` |
| **Template** | Use `templates/task_progress.md` |
| **Create** | Within 30 seconds of receiving task |
| **Update** | Every phase change, every 5 minutes, every blocker |

**⚠️ CRITICAL: MARK DONE IMMEDIATELY**
```
Every time you complete a task or subtask:
1. STOP what you're doing
2. Update progress file: status: COMPLETED
3. Add CHECKPOINT LOG entry with ✅ Result
4. THEN move to next task

DO NOT batch completions. Mark DONE the INSTANT you finish.
```

**Why:** If chat crashes before you mark done, the next session redoes completed work.

---

## 3) Validator Integration

### 3.1 Python Validator Location

```
becca-kernel/orchestrator/tools/evidence_contract.py
```

### 3.2 Validation Functions

```python
from tools.evidence_contract import (
    validate_finding,
    validate_scout_output,
    is_placeholder_path,
    is_generic_recommendation
)

# Validate a single finding
valid, errors = validate_finding(finding, project_path)

# Validate entire output
result = validate_scout_output(output, project_path, strict=True)
if not result.valid:
    # MUST REJECT
    print(f"🔑 REJECTED: {result.errors[0]}")
```

### 3.3 Validation Result Structure

```python
@dataclass
class EvidenceValidationResult:
    valid: bool
    errors: list[str]
    warnings: list[str]
    score: int  # 0-100
```

### 3.4 Strict Mode Requirements

When `strict=True`:
- ALL findings must pass validation
- Score must be >= 70%
- ALL file paths must be real (not placeholders)
- ALL recommendations must be specific (not generic)

---

## 3.5) Evidence Scoring Rubric (FROZEN)

The evidence contract validator uses this rubric to calculate scores:

### Scoring Dimensions (100 points total)

| Dimension | Weight | Criteria |
|-----------|--------|----------|
| **Path Validity** | 30 pts | All file paths exist and are verifiable |
| **Specificity** | 25 pts | Line numbers, function names, specific locations |
| **Completeness** | 20 pts | All required fields present per finding type |
| **Verification** | 15 pts | Each claim has corresponding proof |
| **No Placeholders** | 10 pts | Zero placeholder or generic patterns |

### Scoring Rules

```
For each finding:
  +6 pts  file_path is real (not placeholder)
  +4 pts  line_number provided
  +4 pts  code_snippet provided
  +3 pts  severity specified
  +4 pts  fix_recommendation is specific (>20 chars, not generic)
  +4 pts  verification method provided

Deductions:
  -10 pts  ANY placeholder path detected
  -5 pts   Generic recommendation ("fix this", "TODO")
  -3 pts   Missing required field
  -5 pts   Claim without evidence
```

### Score Thresholds

| Score | Grade | Action |
|-------|-------|--------|
| 90-100 | ✅ EXCELLENT | Auto-approve, fast-track |
| 70-89 | ✅ PASS | Standard approval |
| 50-69 | ⚠️ MARGINAL | Flag for review, may pass with fixes |
| 0-49 | 🔴 FAIL | 🔑 REJECTED, must resubmit |

### BECCA Score Integration

When BECCA scores Ant work (for Neo and high-risk tasks), use this rubric:

| Dimension | Score (1-5) | Weight | Description |
|-----------|-------------|--------|-------------|
| Correctness | 1-5 | 0.30 | Does the work actually solve the problem? |
| Completeness | 1-5 | 0.25 | Are all requirements addressed? |
| Evidence Quality | 1-5 | 0.20 | Is evidence verifiable per this rubric? |
| Doctrine Compliance | 1-5 | 0.15 | Follows IAMBecca protocols (isolation, etc.)? |
| Efficiency | 1-5 | 0.10 | Minimal changes, no over-engineering? |

**Calculation:** `Total = Σ(score × weight) → 1.00-5.00 scale`

---

## 4) When Validation Runs

| Stage | Validator | Who Runs | On Failure |
|-------|-----------|----------|------------|
| Ant report submission | evidence_contract.py | Ghost Twins | `🔑 REJECTED` |
| Scout output | evidence_contract.py | BQ Executor | Mark as `partial` |
| Code inspection | evidence_contract.py | Agents | `🔑 REJECTED` |
| BECCA verification | evidence_contract.py | Source | `🔑 REJECTED` |

---

## 5) Rejection Protocol

### 5.1 Ghost Twins Rejection

When Ghost Twins validate an Ant report and evidence is invalid:

```markdown
I_AM_STATE: REVIEW
ROLE: Ghost Twins (GHOST)

## EVIDENCE VALIDATION FAILED

| Finding | Issue |
|---------|-------|
| Finding[0] | PLACEHOLDER_PATH: '/project/root' is not a real file path |
| Finding[1] | MISSING: line_number |
| Finding[2] | GENERIC_RECOMMENDATION: 'fix this' is too vague |

## VALIDATION RESULT
| Attribute | Value |
|-----------|-------|
| Valid | NO |
| Score | 42/100 |
| Errors | 3 |

## REQUIRED ACTION
Ant must resubmit with:
1. Real file paths (not placeholders)
2. Line numbers for all code findings
3. Specific fix recommendations

## APPROVAL
🔑 REJECTED: Evidence validation failed - 3 errors

---
Report returned to Trinity for reassignment.
```

### 5.2 Trinity Reassignment

When Ghost Twins reject, Trinity MUST:

1. Create REACTIVATE_ANT packet
2. Include specific evidence requirements
3. Reference Ghost rejection

```markdown
PACKET_KIND: REACTIVATE_ANT

## EVIDENCE REQUIREMENTS (from Ghost rejection)
- [ ] All file paths must be real, verifiable paths
- [ ] All code findings must include line numbers
- [ ] All recommendations must be specific (>20 chars, not generic)

## GHOST REJECTION REFERENCE
Path: audit/reviews/REJECTED_<ant_id>.md
Errors: <list>
```

---

## 6) Evidence Categories

### 6.1 Code Evidence

| Type | Required Format |
|------|-----------------|
| File change | `git diff <file>` output |
| New file | Full file listing with path |
| Deleted file | Confirmation of deletion + reason |
| Refactor | Before/after comparison |

### 6.2 Test Evidence

| Type | Required Format |
|------|-----------------|
| Unit test | Test name + output + pass/fail |
| Integration test | Test name + output + pass/fail |
| E2E test | Test name + screenshot/log + pass/fail |
| Manual test | Steps + expected + actual |

### 6.3 Command Evidence

| Type | Required Format |
|------|-----------------|
| Build | Command + output (success/fail) |
| Lint | Command + output (errors/warnings) |
| Deploy | Command + output + URL/confirmation |
| Script | Command + output |

### 6.4 Security Evidence

| Type | Required Format |
|------|-----------------|
| Vulnerability | CVE/CWE reference + location + severity |
| Fix | Before/after + verification test |
| Rules audit | Rule file + specific rule + pass/fail |
| Auth check | Endpoint + auth state + expected/actual |

---

## 7) Evidence Storage

### 7.1 Where Evidence Lives

```
projects/<client>/<type>/<slug>/
├── outbox/
│   └── ants/
│       └── REPORT_ANT-<seq>.md    ← Contains evidence section
├── audit/
│   ├── evidence/
│   │   └── <run_id>/
│   │       ├── diffs/
│   │       ├── logs/
│   │       ├── screenshots/
│   │       └── test_outputs/
│   └── reviews/
│       └── REVIEW_<run_id>.md     ← Contains validation results
└── runtime/
    └── runs/<run_id>/
        └── RUNBOARD.md            ← Links to evidence
```

### 7.2 Evidence Naming Convention

```
<type>_<run_id>_<ant_id>_<seq>.<ext>

Examples:
- diff_run_C023_001_ANT-001_001.patch
- log_run_C023_001_ANT-001_001.txt
- screenshot_run_C023_001_ANT-001_001.png
- test_run_C023_001_ANT-001_001.json
```

---

## 8) Evidence Checklist (Per Role)

### 8.1 Ants (All Types)

Before submitting report:
- [ ] All file paths are real (can be `cat`/`ls`)
- [ ] All code findings have line numbers
- [ ] All changes have diffs attached
- [ ] All tests have output attached
- [ ] All recommendations are specific (not generic)
- [ ] Evidence paths are in EVIDENCE section

### 8.2 Ghost Twins

Before approving:
- [ ] Run `validate_scout_output()` on report
- [ ] Score >= 70%
- [ ] No placeholder paths
- [ ] No generic recommendations
- [ ] All evidence paths exist

### 8.3 Morpheus (Debugger)

Before submitting diagnostic:
- [ ] Root cause has file:line reference
- [ ] Error logs attached
- [ ] Fix instructions are specific steps
- [ ] Verification steps are testable

---

## 9) Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-EVIDENCE v1.0.0 — QUICK REFERENCE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  REQUIRED PER FINDING:                                                      │
│  • file_path (real, not placeholder)                                        │
│  • line_number (for code)                                                   │
│  • code_snippet (for code)                                                  │
│  • severity (BLOCKER/HIGH/MEDIUM/LOW)                                       │
│  • fix_recommendation (specific, not generic)                               │
│  • verification (how to verify)                                             │
│                                                                             │
│  REJECTED PATTERNS:                                                         │
│  • /project/root/... (placeholder)                                          │
│  • path/to/... (placeholder)                                                │
│  • "fix this" (generic)                                                     │
│  • "TODO" (generic)                                                         │
│                                                                             │
│  VALIDATION:                                                                │
│  • Ghost Twins validate ALL ant reports                                     │
│  • Score must be >= 70%                                                     │
│  • Invalid = 🔑 REJECTED                                                    │
│                                                                             │
│  VALIDATOR:                                                                 │
│  becca-kernel/orchestrator/tools/evidence_contract.py                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-02
- Initial release
- Integrated evidence_contract.py rules
- Defined rejected patterns
- Defined validation stages
- Added rejection protocol
- Added evidence categories
- Added evidence storage structure
- Added evidence checklists
