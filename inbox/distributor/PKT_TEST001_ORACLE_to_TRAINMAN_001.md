# Packet: Oracle → Trainman (DISTRIBUTOR)

## Packet Metadata
| Attribute | Value |
|-----------|-------|
| Packet ID | PKT_TEST001_ORACLE_to_TRAINMAN_001 |
| From | Oracle (MQ) |
| To | Trainman (DISTRIBUTOR) |
| Run ID | run_TEST001_iambecca-test-run_2026-02-02_001 |
| Created | 2026-02-03T00:30:00Z |
| Packet Kind | TASK |

## Requirements (ENFORCED)

```yaml
packet_kind: TASK
I_AM_STATE_REQUIRED: PROPOSE
required_outputs:
  - outbox/distributor/PROPOSE_run_TEST001_iambecca-test-run_2026-02-02_001.md
  - inbox/bq/PKT_*_TRAINMAN_to_TRINITY_*.md (task packets)
evidence_required:
  - audit/evidence/TRAINMAN_DISTRIBUTE_*.txt
stop_conditions:
  - reject if target_name mismatch
  - reject if evidence missing
  - reject if packets incomplete
approval_token_required: 🔑 (one of APPROVED/APPROVED WITH CHANGES/REJECTED)
```

## Target
```
IAMBECCA | TEST001 | GOVERNANCE | iambecca-test-run | NEO
```

## Plan Reference
| Attribute | Value |
|-----------|-------|
| Plan Path | outbox/oracle/ANALYZE_run_TEST001_iambecca-test-run_2026-02-02_001.md |
| Phases | 1 |
| Total Tasks | 3 |

## Tasks to Distribute

### TASK-001: Create test script
| Attribute | Value |
|-----------|-------|
| Ant Type | Neo (ANT-CODER) |
| Summary | Write a simple test file that validates role activation |
| Inputs | roles/*.md, shared/*.md |
| Expected Output | tests/activation_test.js |
| Evidence Required | audit/evidence/ANT-001_*.txt |

### TASK-002: Execute activation test
| Attribute | Value |
|-----------|-------|
| Ant Type | Tank (ANT-TEST) |
| Summary | Run through BECCA → Oracle handoff verification |
| Inputs | tests/activation_test.js |
| Expected Output | Test results (pass/fail) |
| Evidence Required | audit/evidence/ANT-002_*.txt |
| Depends On | TASK-001 |

### TASK-003: Review evidence
| Attribute | Value |
|-----------|-------|
| Ant Type | Ghost Twins (GHOST) |
| Summary | Validate all artifacts created during test run |
| Inputs | All ant reports, all evidence files |
| Expected Output | Archive, Evidence Index |
| Evidence Required | audit/evidence/GHOST_REVIEW_*.txt |
| Depends On | TASK-001, TASK-002 |

## Instructions for Trainman

1. **Parse** the task list above
2. **Create** distribution packets for Trinity:
   - One packet per task
   - Include all task metadata
   - Set stop conditions per task
3. **Write** packets to: `inbox/bq/PKT_*_TRAINMAN_to_TRINITY_*.md`
4. **Write** output to: `outbox/distributor/PROPOSE_*.md`
5. **Capture** evidence to: `audit/evidence/TRAINMAN_DISTRIBUTE_*.txt`
6. **Hand off** to Trinity for execution

## Approval (from Oracle)
```
Oracle (MQ) says:
Plan complete. 3 tasks defined for Phase 1 (Happy Path Test).
Trainman may proceed with distribution.

🔑 APPROVED: ACTIVATE Trainman
```
