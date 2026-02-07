# Task Packet: TASK-001 → Neo (ANT-CODER)

## Packet Metadata
| Attribute | Value |
|-----------|-------|
| Packet ID | PKT_TEST001_TASK-001_to_NEO |
| From | Trinity (BQ) via Trainman |
| To | Neo (ANT-CODER) |
| Run ID | run_TEST001_iambecca-test-run_2026-02-02_001 |
| Ant ID | ANT-001 |
| Task ID | TASK-001 |
| Packet Kind | TASK |

## Requirements (ENFORCED)

```yaml
packet_kind: TASK
I_AM_STATE_REQUIRED: IMPLEMENT
ant_id: ANT-001
ant_type: Neo (ANT-CODER)
required_outputs:
  - outbox/ants/ANT_REPORT_ANT-001.md
  - audit/self_evals/SE_ANT-001.md
  - tests/activation_test.js (or similar test file)
evidence_required:
  - audit/evidence/ANT-001_code_changes.txt
  - audit/evidence/ANT-001_test_output.txt
stop_conditions:
  - cannot access role files
  - test fails to compile
  - scope exceeds task boundaries
approval_token_required: 🔑 TASK COMPLETE
```

## Task Details
| Attribute | Value |
|-----------|-------|
| Task ID | TASK-001 |
| Summary | Create test script for role activation validation |
| Priority | P0 (blocks TASK-002) |

## Task Description

Write a simple test file that validates the IAMBecca role activation pattern works correctly. The test should verify:

1. **Role file existence:** Check that all IM-01 to IM-13 role files exist
2. **Instant activation pattern:** Each role file contains the correct "I_AM_STATE" header
3. **Shared modules loaded:** GATES, OUTPUTS, EVIDENCE modules are referenced

## Inputs
- `roles/*.md` - All role files
- `shared/*.md` - Shared modules
- `IAMBECCA-INDEX.md` - Role index

## Expected Output
- `tests/activation_test.js` (or `tests/activation_test.md` if documenting manual test)
- Test should be runnable or clearly documented
- Must produce pass/fail output

## Evidence Requirements
- `audit/evidence/ANT-001_code_changes.txt` - List of files created/modified
- `audit/evidence/ANT-001_test_output.txt` - Output of test run (or test documentation)

## Self-Eval Requirements
After task completion, write `audit/self_evals/SE_ANT-001.md` with:
- Task summary
- Completion status
- Self-assessment criteria
- Evidence produced
- Confidence level

## Report to
- Trinity (BQ) at `outbox/ants/ANT_REPORT_ANT-001.md`

## On HALT
If you cannot complete:
1. Write HALT packet to `inbox/bq/PKT_TASK-001_HALT.md`
2. Include: halt reason, what was attempted, blocking issue
3. Trinity will send to Morpheus for diagnosis
