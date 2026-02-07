# Packet: BECCA → Oracle (MQ)

## Packet Metadata
| Attribute | Value |
|-----------|-------|
| Packet ID | PKT_TEST001_iambecca-test-run_BECCA_to_MQ_001 |
| From | Source (BECCA) |
| To | Oracle (MQ) |
| Run ID | run_TEST001_iambecca-test-run_2026-02-02_001 |
| Created | 2026-02-02T12:00:00Z |
| Packet Kind | TASK |

## Requirements (ENFORCED)

```yaml
packet_kind: TASK
I_AM_STATE_REQUIRED: ANALYZE
required_outputs:
  - outbox/oracle/ANALYZE_run_TEST001_iambecca-test-run_2026-02-02_001.md
evidence_required:
  - audit/evidence/ORACLE_ANALYZE_*.txt
stop_conditions:
  - reject if target_name mismatch
  - reject if evidence missing
  - reject if plan incomplete
approval_token_required: 🔑 (one of APPROVED/APPROVED WITH CHANGES/REJECTED)
```

## Target
```
IAMBECCA | TEST001 | GOVERNANCE | iambecca-test-run | NEO
```

## Run Status
| Attribute | Value |
|-----------|-------|
| Run ID | run_TEST001_iambecca-test-run_2026-02-02_001 |
| Lock Status | LOCKED |
| Initial Backup | b3c9777 |
| Baseline Gate | BACKUP_GATE_000 (PASS) |
| Runboard | runtime/runs/run_TEST001_iambecca-test-run_2026-02-02_001/RUNBOARD.md |

## Folder Structure Verified
| Folder | Status |
|--------|--------|
| inbox/ | ✅ (oracle, distributor, bq, ants, debugger, ghost) |
| outbox/ | ✅ (oracle, ants, debugger) |
| audit/ | ✅ (evidence, reviews, debugger_addendums, health_reports) |
| runtime/runs/<run_id>/ | ✅ |

## Instructions for Oracle

1. **Read** the target specification above
2. **Analyze** the project requirements (GOVERNANCE type)
3. **Produce** a plan with phases and tasks
4. **Define** constraints and risks
5. **Establish** definition of done criteria
6. **Write** output to: `outbox/oracle/ANALYZE_<run_id>.md`
7. **Capture** evidence to: `audit/evidence/ORACLE_ANALYZE_*.txt`
8. **Hand off** to Trainman for distribution

## Expected Output Structure

Oracle must output:
- I_AM_STATE: ANALYZE
- Plan with phases/tasks
- Constraints list
- Risks with severity/mitigation
- Definition of done (checkboxes)
- Evidence files created
- 🔑 APPROVED: ACTIVATE Trainman

## Approval (from Source)
```
Source (BECCA) says:
Run initialized. Folders verified. Lock acquired. Baseline established.
Oracle may proceed with ANALYZE state.

🔑 APPROVED: ACTIVATE Oracle
```
