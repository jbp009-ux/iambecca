# BACKUP GATE TEMPLATE v1.0.0

---

```markdown
# BACKUP GATE

run_id: run_<CLIENT>_<slug>_<YYYY-MM-DD>_<seq>
target_name: "IAMBECCA | <CLIENT_ID> | <PROJECT_TYPE> | <PROJECT_SLUG> | <MATRIX_CODENAME>"
gate_number: <seq>

triggered_by: <role_code>
reason: <before reattempt / before horsemen / before more changes>

---

## BACKUP REFERENCE

backup_type: <git_commit / snapshot / both>
backup_ref: <commit hash or snapshot path>
backup_timestamp: <ISO timestamp>
created_by: <role that created backup>

---

## BACKUP CHECKS

| Check | Status | Notes |
|-------|--------|-------|
| Backup exists | ✅ / ❌ | <verification method> |
| Timestamp correct for phase | ✅ / ❌ | <expected vs actual> |
| Restore/checkout test passed | ✅ / ❌ | <test method> |
| Critical files verified | ✅ / ❌ | <files checked> |

---

## VERIFICATION COMMANDS

```bash
# Verify commit exists
git log -1 <backup_ref>

# Show what files are in backup
git show --stat <backup_ref>

# Test restore (dry run)
git checkout <backup_ref> --dry-run
```

---

## GATE RESULT

**BACKUP_GATE: PASS / FAIL**

failure_reason: <if FAIL, explain why>

---

## NEXT ALLOWED ACTIONS

If PASS:
- Proceed with reattempt (REACTIVATE_ANT)
- Proceed with horsemen action (if applicable)

If FAIL:
- CANNOT proceed with any changes
- Must resolve backup issue first
- Escalate to Source (BECCA) if cannot resolve

---

## APPROVAL

🔑 APPROVED: BACKUP_GATE PASS
OR
🔑 REJECTED: BACKUP_GATE FAIL - <reason>
```

---

## WHEN BACKUP GATE IS REQUIRED

| Scenario | Required? |
|----------|-----------|
| Before ant reattempt (after debugger diagnosis) | YES |
| Before horsemen action | YES |
| Before any changes after failed attempt | YES |
| Normal task execution | NO |
| Initial run start | NO (but recommended) |

---

## EXAMPLE: Passing Backup Gate

```markdown
# BACKUP GATE

run_id: run_C023_fitness-vsl_2026-02-02_001
target_name: "IAMBECCA | C023 | LANDING | fitness-vsl | ORACLE"
gate_number: 001

triggered_by: BQ
reason: before reattempt after debugger diagnosis

---

## BACKUP REFERENCE

backup_type: git_commit
backup_ref: abc123def456789
backup_timestamp: 2026-02-02T14:30:00Z
created_by: Source (BECCA)

---

## BACKUP CHECKS

| Check | Status | Notes |
|-------|--------|-------|
| Backup exists | ✅ | `git log -1 abc123def` returns valid commit |
| Timestamp correct for phase | ✅ | Before ANT-001 started work |
| Restore/checkout test passed | ✅ | `git checkout abc123def --dry-run` succeeds |
| Critical files verified | ✅ | page.tsx, Hero.tsx present |

---

## VERIFICATION COMMANDS

```bash
$ git log -1 abc123def456789
commit abc123def456789
Author: becca <becca@iambecca.ai>
Date:   Mon Feb 2 14:30:00 2026 -0500

    BACKUP: Before ANT-001 reattempt

$ git show --stat abc123def456789
 frontend/src/app/page.tsx        | 45 +++
 frontend/src/components/Hero.tsx | 23 ++
 2 files changed, 68 insertions(+)
```

---

## GATE RESULT

**BACKUP_GATE: PASS**

---

## APPROVAL

🔑 APPROVED: BACKUP_GATE PASS
```

---

## EXAMPLE: Failing Backup Gate

```markdown
# BACKUP GATE

run_id: run_C023_fitness-vsl_2026-02-02_001
target_name: "IAMBECCA | C023 | LANDING | fitness-vsl | ORACLE"
gate_number: 002

triggered_by: BQ
reason: before horsemen escalation

---

## BACKUP REFERENCE

backup_type: git_commit
backup_ref: xyz789abc (claimed)
backup_timestamp: 2026-02-02T15:00:00Z
created_by: ANT-001 (claimed)

---

## BACKUP CHECKS

| Check | Status | Notes |
|-------|--------|-------|
| Backup exists | ❌ | `git log -1 xyz789abc` returns "unknown revision" |
| Timestamp correct for phase | N/A | Cannot verify - backup missing |
| Restore/checkout test passed | N/A | Cannot test - backup missing |
| Critical files verified | N/A | Cannot verify - backup missing |

---

## GATE RESULT

**BACKUP_GATE: FAIL**

failure_reason: Backup commit xyz789abc does not exist in repository. Cannot proceed without valid backup.

---

## REQUIRED ACTION

- Cannot proceed with horsemen escalation
- Must create valid backup first
- Escalate to Source (BECCA) to create backup

---

## APPROVAL

🔑 REJECTED: BACKUP_GATE FAIL - Backup commit does not exist
```
