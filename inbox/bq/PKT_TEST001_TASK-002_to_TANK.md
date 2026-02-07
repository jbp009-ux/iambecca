# Task Packet: TASK-002 → Tank (ANT-TEST)

## Packet Metadata
| Attribute | Value |
|-----------|-------|
| Packet ID | PKT_TEST001_TASK-002_to_TANK |
| From | Trinity (BQ) via Trainman |
| To | Tank (ANT-TEST) |
| Run ID | run_TEST001_iambecca-test-run_2026-02-02_001 |
| Ant ID | ANT-002 |
| Task ID | TASK-002 |
| Packet Kind | TASK |

## Requirements (ENFORCED)

```yaml
packet_kind: TASK
I_AM_STATE_REQUIRED: IMPLEMENT
ant_id: ANT-002
ant_type: Tank (ANT-TEST)
required_outputs:
  - outbox/ants/ANT_REPORT_ANT-002.md
  - audit/self_evals/SE_ANT-002.md
evidence_required:
  - audit/evidence/ANT-002_test_execution.txt
  - audit/evidence/ANT-002_test_results.txt
depends_on:
  - TASK-001 (must complete first)
stop_conditions:
  - TASK-001 not complete
  - test script missing
  - all tests fail
approval_token_required: 🔑 TASK COMPLETE
```

## Task Details
| Attribute | Value |
|-----------|-------|
| Task ID | TASK-002 |
| Summary | Execute activation tests and verify BECCA → Oracle handoff |
| Priority | P1 |
| Depends On | TASK-001 |

## Task Description

Execute the activation test created by Neo (ANT-001) and verify the IAMBecca handoff pattern works:

1. **Run the test script** created in TASK-001
2. **Verify BECCA → Oracle handoff:** Check that:
   - BECCA produces correct P0_INVENTORY output
   - Oracle packet is created in correct location
   - Approval token is present
3. **Document results:** Pass/Fail for each check

## Inputs
- `tests/activation_test.js` (or equivalent from TASK-001)
- Evidence from run: `audit/evidence/P0_INVENTORY_*.txt`
- Evidence from run: `audit/evidence/ORACLE_ANALYZE_*.txt`

## Expected Output
- Test execution results (pass/fail counts)
- Verification of handoff artifacts
- Summary of what worked vs what failed

## Evidence Requirements
- `audit/evidence/ANT-002_test_execution.txt` - Log of test execution
- `audit/evidence/ANT-002_test_results.txt` - Pass/Fail summary

## Self-Eval Requirements
After task completion, write `audit/self_evals/SE_ANT-002.md` with:
- Task summary
- Completion status
- Self-assessment criteria
- Evidence produced
- Confidence level

## Report to
- Trinity (BQ) at `outbox/ants/ANT_REPORT_ANT-002.md`

## On HALT
If you cannot complete:
1. Write HALT packet to `inbox/bq/PKT_TASK-002_HALT.md`
2. Include: halt reason, what was attempted, blocking issue
3. Trinity will send to Morpheus for diagnosis
