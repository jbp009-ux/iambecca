# Packet: Trainman → Trinity (BQ)

## Packet Metadata
| Attribute | Value |
|-----------|-------|
| Packet ID | PKT_TEST001_TRAINMAN_to_TRINITY_001 |
| From | Trainman (DISTRIBUTOR) |
| To | Trinity (BQ) |
| Run ID | run_TEST001_iambecca-test-run_2026-02-02_001 |
| Created | 2026-02-03T01:00:00Z |
| Packet Kind | TASK |

## Requirements (ENFORCED)

```yaml
packet_kind: TASK
I_AM_STATE_REQUIRED: IMPLEMENT
phase_number: 1
phase_description: Happy Path Integration Test
required_outputs:
  - outbox/trinity/IMPLEMENT_run_TEST001_phase_001.md
  - outbox/ants/ANT_REPORT_ANT-001.md
  - outbox/ants/ANT_REPORT_ANT-002.md
  - audit/self_evals/SE_ANT-001.md
  - audit/self_evals/SE_ANT-002.md
  - audit/reviews/BQ_VERIFY_ANT-001.md
  - audit/reviews/BQ_VERIFY_ANT-002.md
  - audit/reviews/BQ_VERIFY_BATCH-001.md
evidence_required:
  - audit/evidence/TRINITY_PHASE_*.txt
  - audit/evidence/ANT-001_*.txt
  - audit/evidence/ANT-002_*.txt
ants_suggested:
  - Neo (ANT-CODER) for TASK-001
  - Tank (ANT-TEST) for TASK-002
estimated_tasks: 2
stop_conditions:
  - ant failure after reattempt
  - blocking dependency unresolved
  - evidence validation fails
approval_token_required: 🔑 (one of APPROVED/APPROVED WITH CHANGES/REJECTED)
```

## Target
```
IAMBECCA | TEST001 | GOVERNANCE | iambecca-test-run | NEO
```

## Phase Details
| Attribute | Value |
|-----------|-------|
| Phase Number | 1 |
| Phase Name | Happy Path Integration Test |
| Total Tasks | 2 (Ants) + 1 (Ghost Twins at end) |
| Max Concurrent Ants | 5 |
| Expected Duration | 1 session |

## Tasks to Execute

### TASK-001: Create test script
| Attribute | Value |
|-----------|-------|
| Task ID | TASK-001 |
| Ant Assignment | ANT-001 → Neo (ANT-CODER) |
| Summary | Write a simple test file that validates role activation |
| Inputs | roles/*.md, shared/*.md |
| Expected Output | tests/activation_test.js (or similar) |
| Evidence Required | audit/evidence/ANT-001_*.txt |
| Self-Eval Required | audit/self_evals/SE_ANT-001.md |
| Priority | P0 (blocking TASK-002) |

### TASK-002: Execute activation test
| Attribute | Value |
|-----------|-------|
| Task ID | TASK-002 |
| Ant Assignment | ANT-002 → Tank (ANT-TEST) |
| Summary | Run through BECCA → Oracle handoff verification |
| Inputs | tests/activation_test.js (from TASK-001) |
| Expected Output | Test results with pass/fail status |
| Evidence Required | audit/evidence/ANT-002_*.txt |
| Self-Eval Required | audit/self_evals/SE_ANT-002.md |
| Depends On | TASK-001 |
| Priority | P1 |

## After Ants Complete

Trinity MUST produce:
1. BQ Per-Ant Verifications (`audit/reviews/BQ_VERIFY_ANT-*.md`)
2. BQ Batch Verification (`audit/reviews/BQ_VERIFY_BATCH-001.md`)
3. THEN activate Ghost Twins for REVIEW state

## Instructions for Trinity

1. **Assign** ANT-001 (Neo) to TASK-001
2. **Wait** for ANT-001 completion + Self-Eval
3. **Verify** ANT-001 (BQ_VERIFY_ANT-001.md)
4. **Assign** ANT-002 (Tank) to TASK-002
5. **Wait** for ANT-002 completion + Self-Eval
6. **Verify** ANT-002 (BQ_VERIFY_ANT-002.md)
7. **Create** BQ_VERIFY_BATCH-001.md
8. **If BATCH PASS:** Activate Ghost Twins
9. **If any HALT:** Send DEBUGGER_REQUEST to Morpheus

## Approval (from Trainman)
```
Trainman (DISTRIBUTOR) says:
Distribution complete. Phase 1 routed to Trinity.
2 tasks queued: Neo (P0), Tank (P1).
Ghost Twins activates at phase end.

🔑 APPROVED: ACTIVATE Trinity
```
