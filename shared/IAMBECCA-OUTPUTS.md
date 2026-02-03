# IAMBECCA-OUTPUTS v1.0.0

**Purpose:** Output contracts per state — locked formats, no claims without structure
**Scope:** Loaded with ALL IAMBecca roles
**Source:** Ported from Prompt Architect v2.6.0 + IAMBecca vFinal++ spec

---

## 1) Required Output Skeleton (EVERY STATE)

Every role output MUST include this structure:

```markdown
I_AM_STATE: <STATE_NAME>
ROLE: <DisplayName> (<RoleCode>)
TARGET: <target_name>
RUN_ID: <run_id>

## INPUTS (paths)
- <path>

## ACTIONS TAKEN
- <bullet>

## OUTPUTS CREATED (paths)
- <path>

## EVIDENCE (must be verifiable)
- <path or command output>

## RISKS / UNKNOWNS
- <bullet>

## NEXT
- Requested next role: <RoleCode>
- Packet written to: <path>

## APPROVAL
🔑 <APPROVED|APPROVED WITH CHANGES|REJECTED>: <scope/reason>
```

---

## 2) State-Specific Output Contracts

### 2.1 P0_INVENTORY (Source/BECCA)

```markdown
I_AM_STATE: P0_INVENTORY
ROLE: Source (BECCA)
TARGET: IAMBECCA | <CLIENT_ID> | <PROJECT_TYPE> | <PROJECT_SLUG> | <MATRIX_CODENAME>
RUN_ID: run_<CLIENT>_<slug>_<YYYY-MM-DD>_<seq>

## RUN INITIALIZATION
| Attribute | Value |
|-----------|-------|
| Run ID | <run_id> |
| Created | <timestamp> |
| Project Path | <path> |
| Lock Status | LOCKED |

## FOLDER VERIFICATION
| Folder | Status |
|--------|--------|
| inbox/ | ✅ Exists |
| outbox/ | ✅ Exists |
| audit/ | ✅ Exists |
| runtime/runs/<run_id>/ | ✅ Created |

## RUNBOARD INITIALIZED
Path: runtime/runs/<run_id>/RUNBOARD.md

## INPUTS (paths)
- <project root>
- <prior run reference if any>

## ACTIONS TAKEN
- Created run directory
- Initialized runboard
- Locked project
- Verified folder structure

## OUTPUTS CREATED (paths)
- runtime/runs/<run_id>/RUNBOARD.md
- runtime/runs/<run_id>/RUN_LOCK.json

## EVIDENCE (must be verifiable)
- Folder listing: `ls -la runtime/runs/<run_id>/`
- Lock file contents: <path>

## RISKS / UNKNOWNS
- <any blockers identified>

## NEXT
- Requested next role: ORACLE (MQ)
- Packet written to: inbox/oracle/PKT_<client>_<slug>_BECCA_to_MQ_001.md

## APPROVAL
🔑 APPROVED: ACTIVATE Oracle

---
NEXT: Activate Oracle?
```

---

### 2.2 ANALYZE (Oracle/MQ + Merovingian/PLANNER)

```markdown
I_AM_STATE: ANALYZE
ROLE: Oracle (MQ)
TARGET: <target_name>
RUN_ID: <run_id>

## ANALYSIS SUMMARY
<2-3 sentence overview of what needs to be done>

## PLAN PRODUCED
| Attribute | Value |
|-----------|-------|
| Plan Path | <path to plan file> |
| Phases | <count> |
| Total Tasks | <count> |

## CONSTRAINTS
- <constraint 1>
- <constraint 2>

## RISKS IDENTIFIED
| Risk | Severity | Mitigation |
|------|----------|------------|
| <risk> | HIGH/MEDIUM/LOW | <mitigation> |

## DEFINITION OF DONE
- [ ] <criterion 1>
- [ ] <criterion 2>

## INPUTS (paths)
- <source materials>
- <prior analysis>

## ACTIONS TAKEN
- Analyzed requirements
- Identified constraints
- Produced plan
- Defined success criteria

## OUTPUTS CREATED (paths)
- <plan file path>
- <analysis notes path>

## EVIDENCE (must be verifiable)
- Plan file exists: `cat <plan path>`
- Constraints documented: <path>

## RISKS / UNKNOWNS
- <remaining unknowns>

## NEXT
- Requested next role: TRAINMAN (DISTRIBUTOR)
- Packet written to: inbox/distributor/PKT_<...>.md

## APPROVAL
🔑 APPROVED: ACTIVATE Trainman

---
NEXT: Activate Trainman?
```

---

### 2.3 PROPOSE (Trainman/DISTRIBUTOR)

```markdown
I_AM_STATE: PROPOSE
ROLE: Trainman (DISTRIBUTOR)
TARGET: <target_name>
RUN_ID: <run_id>

## DISTRIBUTION SUMMARY
| Attribute | Value |
|-----------|-------|
| Total Packets | <count> |
| Phases | <count> |
| Ants Required | <list> |

## PACKETS CREATED
| Packet ID | To Role | Task Summary |
|-----------|---------|--------------|
| PKT_..._001 | Neo (ANT-CODER) | <summary> |
| PKT_..._002 | Tank (ANT-TEST) | <summary> |

## DIRECTIVES
- <directive 1>
- <directive 2>

## INPUTS (paths)
- <plan from Oracle>

## ACTIONS TAKEN
- Parsed plan into tasks
- Created distribution packets
- Assigned to appropriate ants
- Set stop conditions per task

## OUTPUTS CREATED (paths)
- inbox/bq/PKT_..._001.md
- inbox/bq/PKT_..._002.md

## EVIDENCE (must be verifiable)
- Packet count: `ls inbox/bq/*.md | wc -l`
- Packet contents: <paths>

## RISKS / UNKNOWNS
- <any distribution concerns>

## NEXT
- Requested next role: TRINITY (BQ)
- Packet written to: inbox/bq/PKT_<...>_DISTRIBUTOR_to_BQ_001.md

## APPROVAL
🔑 APPROVED: ACTIVATE Trinity

---
NEXT: Activate Trinity?
```

---

### 2.4 IMPLEMENT (Trinity/BQ + Ants)

#### 2.4.1 Trinity Output (Ant Management)

```markdown
I_AM_STATE: IMPLEMENT
ROLE: Trinity (BQ)
TARGET: <target_name>
RUN_ID: <run_id>

## PHASE STATUS
| Attribute | Value |
|-----------|-------|
| Phase | <phase number> |
| Active Ants | <count> (max 5) |
| Completed | <count> |
| Pending | <count> |

## ANT ASSIGNMENTS
| Ant ID | Role | Task | Status |
|--------|------|------|--------|
| ANT-001 | Neo (ANT-CODER) | <task> | IN_PROGRESS |
| ANT-002 | Tank (ANT-TEST) | <task> | COMPLETED |

## HALTS (if any)
| Ant ID | Reason | Action |
|--------|--------|--------|
| ANT-003 | <reason> | DEBUGGER_REQUEST sent |

## INPUTS (paths)
- <packets from Trainman>

## ACTIONS TAKEN
- Assigned ants to tasks
- Monitored progress
- Handled halts (if any)

## OUTPUTS CREATED (paths)
- inbox/ants/PKT_..._to_ANT-CODER_001.md
- <debugger requests if any>

## EVIDENCE (must be verifiable)
- Ant reports collected: <paths>
- Assignment packets: <paths>

## RISKS / UNKNOWNS
- <any blocked ants>

## NEXT
- Requested next role: GHOST (when all ants complete)
- Packet written to: inbox/ghost/PKT_<...>.md

## APPROVAL
🔑 APPROVED: ACTIVATE Ghost Twins

---
NEXT: Activate Ghost Twins?
```

#### 2.4.2 Ant Output (Individual Task)

```markdown
I_AM_STATE: IMPLEMENT
ROLE: <AntName> (<RoleCode>)
TARGET: <target_name>
RUN_ID: <run_id>
ANT_ID: ANT-<seq>
TASK_ID: <task_id>

## TASK SUMMARY
<brief description of what was done>

## STATUS
| Attribute | Value |
|-----------|-------|
| Status | COMPLETED / HALTED |
| Attempt | <number> |
| Duration | <time> |

## CHANGES MADE
| File | Change Type | Lines |
|------|-------------|-------|
| <path> | MODIFIED | +10, -3 |
| <path> | CREATED | +50 |

## TESTS RUN
| Test | Result |
|------|--------|
| <test name> | PASS / FAIL |

## INPUTS (paths)
- <task packet>
- <files read>

## ACTIONS TAKEN
- <action 1>
- <action 2>

## OUTPUTS CREATED (paths)
- <modified files>
- <test results>

## EVIDENCE (must be verifiable)
- Diff: `git diff <file>`
- Test output: <path or inline>
- Build status: <command + output>

## RISKS / UNKNOWNS
- <any concerns>

## NEXT
- Report to: Trinity (BQ)
- Report written to: outbox/ants/REPORT_ANT-<seq>.md

## APPROVAL
🔑 APPROVED: TASK COMPLETE (or 🔑 REJECTED: HALTED - <reason>)
```

---

### 2.5 HALT Output (Ant → Trinity)

```markdown
I_AM_STATE: IMPLEMENT
ROLE: <AntName> (<RoleCode>)
TARGET: <target_name>
RUN_ID: <run_id>
ANT_ID: ANT-<seq>
PACKET_KIND: HALT

## HALT REASON
<clear description of why ant cannot proceed>

## ATTEMPTED
- <what was tried>
- <what failed>

## BLOCKING ISSUE
| Attribute | Value |
|-----------|-------|
| Type | <error type> |
| Location | <file:line> |
| Error | <error message> |

## EVIDENCE
- Error log: <path or inline>
- Stack trace: <if applicable>
- Failing test: <if applicable>

## REQUESTED ACTION
Debugger diagnosis required

## NEXT
- Report to: Trinity (BQ)
- Packet written to: inbox/bq/PKT_<...>_HALT.md

## APPROVAL
🔑 REJECTED: HALTED - <reason>
```

---

### 2.6 DEBUGGER_REQUEST Output (Trinity → Morpheus)

```markdown
I_AM_STATE: IMPLEMENT
ROLE: Trinity (BQ)
TARGET: <target_name>
RUN_ID: <run_id>
PACKET_KIND: DEBUGGER_REQUEST

## REQUEST SUMMARY
Ant ANT-<seq> has halted. Diagnostic analysis required.

## HALTED ANT INFO
| Attribute | Value |
|-----------|-------|
| Ant ID | ANT-<seq> |
| Role | <AntName> (<RoleCode>) |
| Task | <task summary> |
| Halt Reason | <reason> |

## EVIDENCE FROM HALT
- Halt packet: <path>
- Error log: <path>
- Ant report: <path>

## REQUESTED OUTPUT
1. Root cause diagnosis
2. Fix instructions for Ant (NO CODE EDITS)
3. Verification steps

## NEXT
- To: Morpheus (ANT-DEBUGGER)
- Packet written to: inbox/debugger/PKT_<...>_DEBUGGER_REQUEST.md
```

---

### 2.7 DIAGNOSTIC Output (Morpheus/ANT-DEBUGGER)

```markdown
I_AM_STATE: IMPLEMENT
ROLE: Morpheus (ANT-DEBUGGER)
TARGET: <target_name>
RUN_ID: <run_id>
DEBUG_ID: DBG-<parent_ant_id>-<seq>
PACKET_KIND: REACTIVATE_ANT

## DIAGNOSTIC ONLY — NO CODE EDITS

## DIAGNOSIS SUMMARY
<2-3 sentence summary of root cause>

## ROOT CAUSE HYPOTHESIS
| Attribute | Value |
|-----------|-------|
| Category | <bug type> |
| Location | <file:line> |
| Confidence | HIGH / MEDIUM / LOW |

## ROOT CAUSE ANALYSIS
- <point 1>
- <point 2>

## FIX INSTRUCTIONS FOR ANT
The halted Ant should:
1. <step 1>
2. <step 2>
3. <step 3>

## VERIFICATION STEPS
After applying fix:
1. <verification 1>
2. <verification 2>

## INPUTS (paths)
- Halt packet: <path>
- Error logs: <path>
- Source files examined: <paths>

## ACTIONS TAKEN
- Analyzed halt reason
- Examined error logs
- Identified root cause
- Prepared fix instructions

## OUTPUTS CREATED (paths)
- outbox/debugger/DBG-<...>.md

## EVIDENCE (must be verifiable)
- Analysis notes: <path>
- Root cause evidence: <log snippets, file references>

## RISKS / UNKNOWNS
- <confidence level on diagnosis>

## NEXT
- To: Trinity (BQ) for BACKUP_GATE then REACTIVATE_ANT
- Packet written to: inbox/bq/PKT_<...>_REACTIVATE_ANT.md

## APPROVAL
🔑 APPROVED: REACTIVATE ANT-<seq> with diagnostic guidance
```

---

### 2.8 BACKUP_GATE Output

```markdown
I_AM_STATE: IMPLEMENT
ROLE: Source (BECCA)
TARGET: <target_name>
RUN_ID: <run_id>
PACKET_KIND: BACKUP_GATE

## BACKUP GATE EXECUTION
| Attribute | Value |
|-----------|-------|
| Triggered By | <role> |
| Reason | <before reattempt / before horsemen> |
| Gate Number | <seq> |

## BACKUP STATUS
| Check | Status |
|-------|--------|
| Backup exists | ✅ / ❌ |
| Timestamp correct | ✅ / ❌ |
| Restore test passed | ✅ / ❌ |
| Critical files verified | ✅ / ❌ |

## BACKUP REFERENCE
- Commit hash: <hash>
- Snapshot path: <path>
- Created: <timestamp>

## EVIDENCE
- Backup verification: `git log -1 <hash>`
- File listing: `git show --stat <hash>`

## GATE RESULT
**BACKUP_GATE: PASS / FAIL**

## NEXT
- If PASS: Proceed with reattempt / horsemen action
- If FAIL: Cannot proceed until backup verified

## APPROVAL
🔑 APPROVED: BACKUP_GATE PASS (or 🔑 REJECTED: BACKUP_GATE FAIL - <reason>)
```

---

### 2.9 REVIEW (Ghost Twins)

```markdown
I_AM_STATE: REVIEW
ROLE: Ghost Twins (GHOST)
TARGET: <target_name>
RUN_ID: <run_id>

## REVIEW SUMMARY
| Attribute | Value |
|-----------|-------|
| Reports Reviewed | <count> |
| Evidence Valid | <count> / <total> |
| Debugger Addendums | <count> |

## EVIDENCE VALIDATION
| Report | Evidence Check | Result |
|--------|----------------|--------|
| ANT-001 | evidence_contract.py | ✅ VALID |
| ANT-002 | evidence_contract.py | ❌ INVALID - <reason> |

## DEBUGGER ADDENDUMS EXTRACTED
| Debug ID | Extracted To |
|----------|--------------|
| DBG-001 | audit/debugger_addendums/DBG-001.md |

## INSPECTION VERDICT
| Check | Result |
|-------|--------|
| All evidence valid | YES / NO |
| All tests passing | YES / NO |
| No security issues | YES / NO |

## INPUTS (paths)
- Ant reports: <paths>
- Debugger reports: <paths>

## ACTIONS TAKEN
- Validated all evidence
- Extracted debugger addendums
- Performed inspection checks
- Compiled verdict

## OUTPUTS CREATED (paths)
- audit/reviews/REVIEW_<run_id>.md
- audit/debugger_addendums/<...>.md

## EVIDENCE (must be verifiable)
- Validation results: <paths>
- Inspection log: <path>

## RISKS / UNKNOWNS
- <any unverified claims>

## NEXT
- If all valid: HEALTH_REPORT
- If invalid: 🔑 REJECTED with reassignment to Trinity

## APPROVAL
🔑 APPROVED: ACTIVATE Oracle (closure) (or 🔑 REJECTED: <reason>)

---
NEXT: Activate Oracle (closure)?
```

---

### 2.10 HEALTH_REPORT (Oracle + BECCA)

```markdown
I_AM_STATE: HEALTH_REPORT
ROLE: Oracle (MQ)
TARGET: <target_name>
RUN_ID: <run_id>

## RUN METRICS
| Metric | Value |
|--------|-------|
| Total Tasks | <count> |
| Completed | <count> |
| Halts | <count> |
| Reattempts | <count> |
| Duration | <time> |

## FAILURE MODES
| Failure | Count | Pattern |
|---------|-------|---------|
| <type> | <n> | <pattern if any> |

## PROMPT TUNING INPUTS
| Observation | Recommendation |
|-------------|----------------|
| <obs> | <rec> |

## FINAL STATUS
| Attribute | Value |
|-----------|-------|
| Status | COMPLETE / PARTIAL |
| Definition of Done | MET / NOT MET |
| Blockers Remaining | <count> |

## INPUTS (paths)
- Review report: <path>
- All ant reports: <paths>

## ACTIONS TAKEN
- Compiled metrics
- Analyzed failure modes
- Prepared tuning inputs
- Finalized report

## OUTPUTS CREATED (paths)
- audit/health_reports/HEALTH_<run_id>.md
- runtime/runs/<run_id>/FINAL_STATUS.md

## EVIDENCE (must be verifiable)
- Metrics computed from: <source>
- Final deliverables: <paths>

## RISKS / UNKNOWNS
- <any remaining concerns>

## NEXT
- Run complete
- Architect intake: audit/health_reports/HEALTH_<run_id>.md

## APPROVAL
🔑 APPROVED: RUN COMPLETE

---
Run complete. Architect may review for prompt tuning.
```

---

## 3) Evidence Requirements by Role

| Role | Required Evidence |
|------|-------------------|
| Source (BECCA) | Folder listings, lock file, runboard |
| Oracle (MQ) | Plan file, constraints doc |
| Trainman | Packet listings, packet contents |
| Trinity (BQ) | Ant assignments, completion status |
| Ants | Diffs, test output, build status |
| Morpheus | Analysis notes, root cause evidence |
| Ghost Twins | Validation results, inspection log |
| Sentinels | Security scan, horsemen checks |

---

## 4) Rejection Triggers

If ANY of these are missing, output MUST be `🔑 REJECTED`:

| Missing Element | Rejection Message |
|-----------------|-------------------|
| I_AM_STATE | `🔑 REJECTED: Missing state declaration` |
| EVIDENCE section | `🔑 REJECTED: No evidence provided` |
| Verifiable paths | `🔑 REJECTED: Evidence paths not verifiable` |
| APPROVAL token | `🔑 REJECTED: Missing approval token` |
| NEXT section | `🔑 REJECTED: No next action specified` |

---

## Changelog

### [1.0.0] 2026-02-02
- Initial release
- Ported output contracts from Prompt Architect v2.6.0
- Added IAMBecca-specific packet kinds
- Added debugger diagnostic output format
- Added backup gate output format
- Defined evidence requirements per role
- Defined rejection triggers
