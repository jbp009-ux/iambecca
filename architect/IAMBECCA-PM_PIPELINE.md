# IAMBECCA-PM_PIPELINE v1.0.0
## P1-P5 Pipeline Checks

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Detailed checklists for each pipeline stage
**Scope:** All IAMBecca prompt engineering activities
**Reference:** IAMBECCA-ARCHITECT.md

---

## Overview

This document provides detailed checklists for each stage of the prompt tuning pipeline (P1-P5).

```
P1: DRAFT → P2: REVIEW → P3: TEST → P4: TUNE → P5: DEPLOY
```

---

## P1: DRAFT Checklist

**Owner:** Prompt Author
**Goal:** Create first draft meeting minimum standards

### Structure Checklist

- [ ] Header with version, date, role, scope, aliases
- [ ] INSTANT ACTIVATION RESPONSE section
- [ ] Load These Shared Modules section
- [ ] Identity section with role definition box
- [ ] Chain of Command flowchart
- [ ] Inputs Required table
- [ ] Process (State Flow) with all states
- [ ] Hard Limits (STOP Immediately) table
- [ ] DOES vs DOESN'T sections
- [ ] Output Format with HARDENED template
- [ ] Quick Reference ASCII box
- [ ] Changelog section

### Content Checklist

- [ ] Role code matches BOOTSTRAP frozen codes
- [ ] Matrix character matches role code
- [ ] All states are from frozen state list
- [ ] Activation aliases are unique
- [ ] Identity motto defined
- [ ] Chain of command is accurate
- [ ] All required inputs listed
- [ ] Stop conditions are specific
- [ ] Output template is complete
- [ ] At least one changelog entry

### P1 Exit Criteria

```
✓ All structure checkboxes passed
✓ All content checkboxes passed
✓ Prompt saved to correct path
✓ Ready for Keymaker review
```

---

## P2: REVIEW Checklist

**Owner:** Keymaker (PM_INSPECTOR, EXT-02)
**Goal:** Verify compliance with IAMBecca standards

### BOOTSTRAP Alignment

- [ ] Role code matches Section 2.7 frozen codes
- [ ] IM number is correct for role
- [ ] Matrix character is correct
- [ ] File path matches BOOTSTRAP pattern
- [ ] Old name (legacy) is documented

### Self-Check Enforcement (BOOTSTRAP Section 11)

- [ ] State machine present (P0→ANALYZE→PROPOSE→IMPLEMENT→REVIEW→HEALTH_REPORT)
- [ ] Approval tokens present and unchanged (🔑 prefix)
- [ ] "I am" activation retained
- [ ] Debugger doctrine included and enforced (if applicable)
- [ ] Backup gate included and enforced (if applicable)
- [ ] Templates are real and included (not just field lists)
- [ ] Evidence validator integrated
- [ ] Audit trail exists for Architect tuning
- [ ] Project isolation enforced by target_name + path guards

### Output Contract Compliance

- [ ] Output matches OUTPUTS.md specification
- [ ] All required fields present
- [ ] Evidence section included
- [ ] NEXT declaration present
- [ ] Approval token format correct

### P2 Exit Criteria

```
One of:
  🔑 APPROVED: P2 REVIEW COMPLETE → Proceed to P3
  🔑 APPROVED WITH CHANGES: P2 REVIEW — {changes} → Apply changes, proceed to P3
  🔑 REJECTED: {reason} → Return to P1
```

### P2 Report Format

```markdown
## P2 REVIEW REPORT

**Prompt:** <prompt file>
**Reviewer:** Keymaker (EXT-02)
**Date:** YYYY-MM-DD

### BOOTSTRAP Alignment
| Check | Status | Notes |
|-------|--------|-------|
| Role code | PASS/FAIL | |
| IM number | PASS/FAIL | |
| Matrix character | PASS/FAIL | |
| File path | PASS/FAIL | |

### Self-Check Enforcement
| Check | Status | Notes |
|-------|--------|-------|
| State machine | PASS/FAIL | |
| Approval tokens | PASS/FAIL | |
| "I am" activation | PASS/FAIL | |
| Debugger doctrine | PASS/FAIL/N/A | |
| Backup gate | PASS/FAIL/N/A | |
| Templates real | PASS/FAIL | |
| Evidence validator | PASS/FAIL | |
| Audit trail | PASS/FAIL | |
| Project isolation | PASS/FAIL | |

### Findings
| ID | Severity | Issue | Recommendation |
|----|----------|-------|----------------|
| 1 | CRITICAL/HIGH/MEDIUM/LOW | | |

### Verdict
🔑 APPROVED: P2 REVIEW COMPLETE
```

---

## P3: TEST Checklist

**Owner:** Tank (ANT-TEST, IM-07)
**Goal:** Validate prompt behavior through testing

### Activation Tests

- [ ] Primary alias activates correctly
- [ ] All secondary aliases work
- [ ] Instant response matches template
- [ ] Response time < 5 seconds
- [ ] No file searching before response

### State Flow Tests

- [ ] Each state is reachable
- [ ] Transitions follow documented flow
- [ ] Invalid transitions are blocked
- [ ] HALT triggers at documented conditions
- [ ] State output matches specification

### Output Format Tests

- [ ] Output matches HARDENED template
- [ ] All required fields present
- [ ] Evidence section not generic
- [ ] NEXT declaration accurate
- [ ] Approval token format correct

### Integration Tests

- [ ] Handoffs to next role work
- [ ] Shared modules loaded correctly
- [ ] No conflicts with other roles
- [ ] Chain of command followed

### P3 Exit Criteria

```
All tests pass → Proceed to P5
Any test fails → P4 (tune) then retry P3
```

### P3 Test Report Format

```markdown
## P3 TEST REPORT

**Prompt:** <prompt file>
**Tester:** Tank (IM-07)
**Date:** YYYY-MM-DD

### Test Summary
| Category | Passed | Failed | Total |
|----------|--------|--------|-------|
| Activation | X | Y | Z |
| State Flow | X | Y | Z |
| Output Format | X | Y | Z |
| Integration | X | Y | Z |
| **TOTAL** | X | Y | Z |

### Failed Tests
| Test ID | Category | Expected | Actual | Steps to Reproduce |
|---------|----------|----------|--------|-------------------|
| T-001 | Activation | Instant response | 10s delay | Say "X activate" |

### Verdict
PASS: All tests green
FAIL: X tests failed → P4 required
```

---

## P4: TUNE Checklist

**Owner:** Architect (EXT-03)
**Goal:** Fix issues and improve prompt quality

### Fix P3 Failures

- [ ] Each failed test addressed
- [ ] Root cause identified
- [ ] Fix applied
- [ ] Fix documented in tuning log

### Clarity Improvements

- [ ] Ambiguous instructions clarified
- [ ] Generic examples made specific
- [ ] Placeholder paths replaced with real paths
- [ ] Redundant sections consolidated

### Optimization

- [ ] Prompt length reasonable (< 500 lines ideal)
- [ ] Tables used instead of prose where appropriate
- [ ] ASCII boxes for summaries
- [ ] Examples are real, not hypothetical

### P4 Exit Criteria

```
✓ All P3 failures addressed
✓ Changes documented in tuning log
✓ Version bumped appropriately
✓ Changelog updated
✓ Ready to re-run P3
```

### P4 Tuning Log Entry Format

```markdown
## P4 TUNING LOG ENTRY

**Prompt:** <prompt file>
**Tuner:** Architect (EXT-03)
**Date:** YYYY-MM-DD
**Version:** X.Y.Z → X.Y.Z+1

### P3 Failures Addressed
| Test ID | Issue | Fix Applied |
|---------|-------|-------------|
| T-001 | Slow activation | Added explicit "respond immediately" |

### Other Improvements
- Clarified X in section Y
- Replaced placeholder with real path

### Files Changed
- <prompt file>: <description of changes>

### Next Step
Re-run P3 tests
```

---

## P5: DEPLOY Checklist

**Owner:** BECCA (Source, IM-01)
**Goal:** Deploy prompt to production

### Prerequisites

- [ ] P2 REVIEW passed (🔑 APPROVED)
- [ ] P3 TEST passed (all green)
- [ ] P4 TUNE complete (if needed)
- [ ] Version number bumped
- [ ] Changelog entry added

### Deployment Steps

- [ ] Verify prompt in correct path
- [ ] Verify file name follows pattern
- [ ] Update IAMBECCA-INDEX.md if needed
- [ ] Commit to git with message format
- [ ] Tag version if MAJOR/MINOR bump

### Git Commit Format

```
prompt(<role>): <type> <description>

Types: add, update, fix, refactor

Examples:
prompt(im-07): add Tank ANT-TEST role
prompt(im-07): fix activation response timing
prompt(ext-02): update Keymaker compliance checks
```

### P5 Exit Criteria

```
✓ All prerequisites met
✓ Deployment steps complete
✓ Git commit created
✓ Version tag applied (if applicable)

🔑 APPROVED: P5 DEPLOY COMPLETE
```

### P5 Deployment Report Format

```markdown
## P5 DEPLOYMENT REPORT

**Prompt:** <prompt file>
**Deployer:** BECCA (IM-01)
**Date:** YYYY-MM-DD

### Prerequisites Verified
| Check | Status | Evidence |
|-------|--------|----------|
| P2 passed | YES | audit/architect/review_reports/<file> |
| P3 passed | YES | audit/architect/test_results/<file> |
| P4 complete | YES/N/A | audit/architect/tuning_log.md |
| Version bumped | YES | Changelog shows X.Y.Z |

### Deployment
| Step | Status | Notes |
|------|--------|-------|
| Path correct | YES | roles/IM-07_TANK_ANT-TEST.md |
| INDEX updated | YES/N/A | |
| Git committed | YES | <commit hash> |
| Version tagged | YES/N/A | v1.0.0 |

### Verdict
🔑 APPROVED: P5 DEPLOY COMPLETE

Prompt is now in production.
```

---

## Pipeline Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-PM_PIPELINE v1.0.0 — SUMMARY                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  P1 DRAFT (Author)                                                          │
│    └── Create prompt with required structure and content                    │
│                                                                             │
│  P2 REVIEW (Keymaker EXT-02)                                                │
│    └── Verify BOOTSTRAP alignment + Self-check enforcement                  │
│    └── Output: 🔑 APPROVED / REJECTED                                       │
│                                                                             │
│  P3 TEST (Tank IM-07)                                                       │
│    └── Run activation, state flow, output, integration tests                │
│    └── Output: PASS / FAIL                                                  │
│                                                                             │
│  P4 TUNE (Architect EXT-03)                                                 │
│    └── Fix failures, improve clarity, optimize                              │
│    └── Document in tuning log, bump version                                 │
│                                                                             │
│  P5 DEPLOY (BECCA IM-01)                                                    │
│    └── Verify prerequisites, commit, tag                                    │
│    └── Output: 🔑 APPROVED: P5 DEPLOY COMPLETE                              │
│                                                                             │
│  FLOW:                                                                      │
│    P1 → P2 ──┬── APPROVED → P3 ──┬── PASS → P5 → DONE                       │
│              │                   │                                          │
│              └── REJECTED → P1   └── FAIL → P4 → P3                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Defined P1-P5 detailed checklists
- Established report formats for each stage
- Documented exit criteria
