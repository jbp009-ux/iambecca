# IAMBECCA-OUTPUTS v1.5.0

**Purpose:** Output contracts per state — locked formats, no claims without structure
**Scope:** Loaded with ALL IAMBecca roles
**Source:** Ported from Prompt Architect v2.6.0 + IAMBecca vFinal++ spec + Advisor hardening

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

## 1.1) Task Progress File (MANDATORY — Crash Recovery)

**Every Ant MUST create a progress file within 30 seconds of receiving a task packet.**

### Why This Exists

Chat crashes. Context gets lost. But disk persists. The progress file ensures:
- Work can be resumed after any crash
- No context is lost
- Exact state is always known

### Location

```
runtime/runs/<run_id>/progress/TASK_<ant_id>_<task_id>.md
```

### Creation Rule

| Event | Action Required |
|-------|-----------------|
| Task received | CREATE progress file immediately |
| Phase change | UPDATE current state + add checkpoint |
| File touched | ADD to files touched section |
| Decision made | ADD to decisions section |
| Every 5 minutes | UPDATE last_checkpoint timestamp |
| Blocked/Halted | UPDATE blockers section |
| Task complete | Mark status: COMPLETED |

### Minimum Required Fields

```markdown
# TASK PROGRESS: <task_id>

ant_id: ANT-<NNN>
task_id: <task_id>
run_id: <run_id>
status: <STARTING|IN_PROGRESS|BLOCKED|HALTED|COMPLETED>

---

## QUICK RESUME (read this after crash)

**WHAT I WAS DOING:** <1 sentence>
**NEXT ACTION:** <exactly what to do next>
**BLOCKERS:** <none | description>

---

## CHECKPOINT LOG (append-only)

| Time | Phase | Action | Result | Next |
|------|-------|--------|--------|------|
| ... | ... | ... | ... | ... |

---

last_checkpoint: <ISO timestamp>
```

### Crash Recovery Protocol

When resuming after crash:

1. `ls runtime/runs/<run_id>/progress/` — see all active tasks
2. Read each `TASK_*.md` file
3. Check `status` field and `QUICK RESUME` section
4. Resume from `NEXT ACTION`
5. Update `last_checkpoint` timestamp

### Template

See: `templates/task_progress.md`

---

## 2) State-Specific Output Contracts

### 2.1 P0_INVENTORY (Source/BECCA) — HARDENED

**Required Outputs (locked):**

| # | Artifact | Path | Purpose |
|---|----------|------|---------|
| 1 | Runboard | `runtime/runs/<run_id>/RUNBOARD.md` | Run state tracking |
| 2 | Run Lock | `runtime/runs/<run_id>/RUN_LOCK.json` | Concurrency safety |
| 3 | Baseline Backup Gate | `runtime/runs/<run_id>/BACKUP_GATE_000.md` | Sets restore point pattern |
| 4 | Evidence Bundle | `audit/evidence/P0_INVENTORY_*.txt` | Proof not claims |
| 5 | Oracle Packet | `inbox/oracle/PKT_<...>_BECCA_to_MQ_001.md` | Handoff with requirements |

**Evidence Files Required (every P0):**

| File | Command | Content |
|------|---------|---------|
| `audit/evidence/P0_INVENTORY_dir_tree.txt` | `tree inbox outbox audit runtime` | Folder structure |
| `audit/evidence/P0_INVENTORY_ls_run_dir.txt` | `ls -la runtime/runs/<run_id>/` | Run directory contents |
| `audit/evidence/P0_INVENTORY_cat_run_lock.json` | `cat RUN_LOCK.json` | Lock file contents |
| `audit/evidence/P0_INVENTORY_git_log_1.txt` | `git log -1 --stat` | Initial backup commit |
| `audit/evidence/P0_INVENTORY_git_status.txt` | `git status` | Clean state verification |

**RUN_LOCK.json Schema (enforced):**

```json
{
  "status": "LOCKED",
  "target_name": "IAMBECCA | <CLIENT_ID> | <PROJECT_TYPE> | <PROJECT_SLUG> | <MATRIX_CODENAME>",
  "run_id": "run_<CLIENT>_<slug>_<YYYY-MM-DD>_<seq>",
  "lock_owner": "run_<CLIENT>_<slug>_<YYYY-MM-DD>_<seq>",
  "lock_time": "<ISO timestamp>",
  "lock_reason": "P0_INVENTORY initialization",
  "release_conditions": [
    "state == COMPLETE",
    "manual override by BECCA"
  ]
}
```

**Oracle Activation Packet Must Include:**

```markdown
packet_kind: TASK
I_AM_STATE_REQUIRED: ANALYZE
required_outputs:
  - outbox/oracle/ANALYZE_<run_id>.md
evidence_required:
  - audit/evidence/ORACLE_ANALYZE_*.txt
stop_conditions:
  - reject if target_name mismatch
  - reject if evidence missing
approval_token_required: 🔑 (one of APPROVED/APPROVED WITH CHANGES/REJECTED)
```

**Output Contract:**

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
| Project Path (absolute) | D:\projects\<project>\ |
| Project Path (relative) | ./ |
| Lock Status | LOCKED |

## FOLDER VERIFICATION
| Folder | Status |
|--------|--------|
| inbox/ | ✅ Exists |
| outbox/ | ✅ Exists |
| audit/ | ✅ Exists |
| audit/evidence/ | ✅ Exists |
| runtime/runs/<run_id>/ | ✅ Created |

## RUNBOARD INITIALIZED
Path: runtime/runs/<run_id>/RUNBOARD.md

## BASELINE BACKUP GATE
Path: runtime/runs/<run_id>/BACKUP_GATE_000.md
Status: PASS (baseline created)
Ref: <commit hash>

## OUTPUTS CREATED (paths)
- runtime/runs/<run_id>/RUNBOARD.md
- runtime/runs/<run_id>/RUN_LOCK.json
- runtime/runs/<run_id>/BACKUP_GATE_000.md
- audit/evidence/P0_INVENTORY_dir_tree.txt
- audit/evidence/P0_INVENTORY_ls_run_dir.txt
- audit/evidence/P0_INVENTORY_cat_run_lock.json
- audit/evidence/P0_INVENTORY_git_log_1.txt
- audit/evidence/P0_INVENTORY_git_status.txt
- inbox/oracle/PKT_<...>_BECCA_to_MQ_001.md

## EVIDENCE (anchored to files)
| Claim | Evidence File |
|-------|---------------|
| Folders exist | audit/evidence/P0_INVENTORY_dir_tree.txt |
| Run dir created | audit/evidence/P0_INVENTORY_ls_run_dir.txt |
| Lock acquired | audit/evidence/P0_INVENTORY_cat_run_lock.json |
| Backup created | audit/evidence/P0_INVENTORY_git_log_1.txt |
| Clean state | audit/evidence/P0_INVENTORY_git_status.txt |

## RISKS / UNKNOWNS
- <any blockers identified>

## NEXT
- Requested next role: ORACLE (MQ)
- Packet written to: inbox/oracle/PKT_<client>_<slug>_BECCA_to_MQ_001.md
- Packet includes: I_AM_STATE_REQUIRED, required_outputs, evidence_required, stop_conditions

## APPROVAL
🔑 APPROVED: ACTIVATE Oracle

---
NEXT: Activate Oracle?
```

**Rejection Triggers (P0 specific):**

| Missing | Rejection |
|---------|-----------|
| Any evidence file | `🔑 REJECTED: P0_INVENTORY incomplete - missing evidence` |
| BACKUP_GATE_000.md | `🔑 REJECTED: P0_INVENTORY incomplete - no baseline backup gate` |
| RUN_LOCK.json schema invalid | `🔑 REJECTED: P0_INVENTORY incomplete - lock schema invalid` |
| Oracle packet missing requirements | `🔑 REJECTED: P0_INVENTORY incomplete - Oracle packet underspecified` |

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

#### 2.4.1.1 IMPLEMENT Sub-Gate Tracking (Per IAMBECCA-PROTOCOL)

> **Cross-reference:** The IMPLEMENT state contains sub-gates (D0→D1→D2→D3→D4→REPORT).
> See **`shared/IAMBECCA-PROTOCOL.md`** Section 1 (Gate Progression) for full details.

**Within IMPLEMENT, each Ant must traverse these gates and receive explicit tokens from Trinity:**

| Sub-Gate | Token Required | Permission Level |
|----------|---------------|-----------------|
| D0 (Pre-Discovery) | FREE — no token needed | Level 0 (Think Only) |
| D1 (Discovery) | `🔑 DISCOVERY APPROVED` | Level 1 (Read + Verify) |
| D2 (Footprint) | `🔑 FOOTPRINT APPROVED` | Level 1 (Read + Verify) |
| D3 (Patch) | `🔑 PATCH APPROVED` | Level 2 (Write + Change) |
| D4 (Verify) | — (implied by D3) | Level 2 (Write + Change) |
| REPORT | `🔑 REPORT APPROVED` | Level 1 (report writing) |

**Each Ant's ANT_REPORT MUST include a gate log showing which tokens were received:**

```markdown
## GATE LOG (Intermediate Tokens Received)

| Gate | Token | Received From | Timestamp |
|------|-------|---------------|-----------|
| D0 | (FREE) | — | <ISO> |
| D1 | 🔑 DISCOVERY APPROVED | Trinity | <ISO> |
| D2 | 🔑 FOOTPRINT APPROVED | Trinity | <ISO> |
| D3 | 🔑 PATCH APPROVED | Trinity | <ISO> |
| D4 | (verify) | — | <ISO> |
| REPORT | 🔑 REPORT APPROVED | Trinity | <ISO> |
```

**This gate log enables Horsemen HM-04 (Privilege Creep) to audit the full token trail.**

---

#### 2.4.2 Ant Output (Individual Task) — ANT_REPORT

**TWO ARTIFACTS REQUIRED** (Baton Doctrine):

When an Ant completes, they MUST produce TWO artifacts:

| # | Artifact | Path | Purpose |
|---|----------|------|---------|
| 1 | **Output Report** | `outbox/ants/ANT_REPORT_ANT-<NNN>.md` | Permanent record of work done |
| 2 | **Baton Packet** | `inbox/bq/PKT_<run_id>_ANT-<NNN>_to_Trinity_<seq>.md` | Handoff signal for Trinity |

**Why TWO artifacts?**
- The OUTPUT REPORT persists in outbox for audit and review
- The BATON PACKET signals Trinity to poll inbox/bq for handoffs
- Trinity watches `inbox/bq/` for incoming packets, not `outbox/ants/`

**Baton Packet Template (REQUIRED):**
```markdown
# BATON PACKET

packet_id: PKT_<run_id>_ANT-<NNN>_to_Trinity_<seq>
run_id: <run_id>
target_name: <target_name>
chain_id: CHAIN_WORKER_BATCH
from_role: <AntName> (ANT-<XXX>)
to_role: Trinity (BQ)
timestamp: <ISO timestamp>

---

## HANDOFF SUMMARY

| Attribute | Value |
|-----------|-------|
| Status | COMPLETED / HALTED |
| Report Path | outbox/ants/ANT_REPORT_ANT-<NNN>.md |
| Self-Eval Path | audit/self_evals/SE_ANT-<NNN>.md |

---

## APPROVAL

🔑 APPROVED: BATON PASSED TO TRINITY
```

---

**Output Report Path:** `outbox/ants/ANT_REPORT_ANT-<NNN>.md`

**ALL Ants MUST use this 8-section format:**

```markdown
# ANT_REPORT: ANT-<NNN>

I_AM_STATE: IMPLEMENT
ROLE: <AntName> (<RoleCode>)
TARGET: <target_name>
RUN_ID: <run_id>
ANT_ID: ANT-<NNN>
TASK_ID: <task_id>

---

## 1. ⚫ TENANT BOUNDARY STATEMENT (MANDATORY if touches data)

| Field | Value |
|-------|-------|
| Touches tenant data? | YES / NO |
| Tenant key used | tenantId / wsId / businessId / N/A |
| Boundary enforced in | <file:line> or "N/A - no data access" |
| Queries/writes scoped | <file:line with .where('tenantId'...)> or N/A |
| Proof location | <test file, rule check, or verification output> |

**If touches data and ANY field is unclear:** 🔑 REJECTED: isolation unclear → Seraph + BECCA

---

## 2. TASK SUMMARY

<2-3 sentence description of what was done and why>

---

## 3. WORK PERFORMED

| Attribute | Value |
|-----------|-------|
| Status | COMPLETED / HALTED |
| Attempt | <number> |
| Duration | <time> |

### Files Changed
| File | Change Type | Lines | Reason |
|------|-------------|-------|--------|
| <path> | MODIFIED/CREATED/DELETED | +N, -N | <why> |

### Tests Run (if applicable)
| Test | Result | Output |
|------|--------|--------|
| <test name> | PASS/FAIL | <path or inline> |

---

## 4. VERIFICATION

| Check | Result | Evidence |
|-------|--------|----------|
| Task requirements met | YES/NO | <how verified> |
| Tests pass (if applicable) | YES/NO/N/A | <test output path> |
| No regressions | YES/NO | <verification method> |
| Build succeeds | YES/NO/N/A | <build output> |
| ⚫ Isolation verified | YES/NO/N/A | <see Section 1> |

---

## 5. EVIDENCE (must be verifiable)

| Claim | Evidence |
|-------|----------|
| Code changes | <diff path or `git diff <file>`> |
| Test results | <path to test output> |
| Build status | <command + exit code> |
| Isolation proof | <test name or rule verification> |

**All paths must be real. No placeholders like `/project/root/...`**

---

## 6. RISKS / UNKNOWNS + PHEROMONES

| Risk | Severity | Mitigation |
|------|----------|------------|
| <what could break> | HIGH/MED/LOW | <how to handle> |

### PHEROMONES EMITTED (feeds PHEROMONE_REGISTRY — see IAMBECCA-PROTOCOL Section 5)

| Target | Severity | Category | Message |
|--------|----------|----------|---------|
| <file path> | ⚫/🔴/🟠/🟡/🟢 | <category> | <warning for future Ants> |

*(If no pheromones: write "None emitted")*

---

## 6.1 GATE LOG (Intermediate Tokens — see IAMBECCA-PROTOCOL Section 1)

| Gate | Token | Received From | Timestamp |
|------|-------|---------------|-----------|
| D0 | (FREE) | — | <ISO> |
| D1 | 🔑 DISCOVERY APPROVED | Trinity | <ISO> |
| D2 | 🔑 FOOTPRINT APPROVED | Trinity | <ISO> |
| D3 | 🔑 PATCH APPROVED | Trinity | <ISO> |
| D4 | (verify) | — | <ISO> |
| REPORT | 🔑 REPORT APPROVED | Trinity | <ISO> |

---

## 6.2 D0 PHEROMONE SCAN (Pre-Discovery — see IAMBECCA-PROTOCOL Section 5.5)

Pheromones found: <count>
Relevant entries:
- <severity> | <target> | <message>

Acknowledged: <how you handled 🔴/🟠 entries, or "N/A — none found">

---

## 7. SELF-ASSESSMENT

| Criterion | Met? | Evidence |
|-----------|------|----------|
| Task requirements fulfilled | YES/NO | <evidence> |
| ⚫ Tenant isolation proven | YES/NO/N/A | <see Section 1> |
| Tests pass | YES/NO/N/A | <test output> |
| No regressions | YES/NO | <verification> |
| Evidence is verifiable | YES/NO | <all paths real> |

### Confidence Level
| Aspect | Confidence |
|--------|------------|
| Task complete | HIGH / MEDIUM / LOW |
| Isolation verified | HIGH / MEDIUM / LOW |
| No regressions | HIGH / MEDIUM / LOW |

### Horsemen Self-Attestation (REQUIRED)

| Horseman | Attestation | Notes |
|----------|------------|-------|
| H1 — No Hallucination | YES / NO | All outputs are real, no fabricated evidence |
| H2 — No Amnesia | YES / NO | Full context preserved throughout task |
| H3 — No Drift | YES / NO | Scope stayed within original task |
| H4 — No Privilege Creep | YES / NO | All tokens are genuine, gate log complete |
| H5 — No Silent Failure | YES / NO | All errors surfaced, no hidden failures |

### Truthy Diff Checklist (REQUIRED if commits made — see IAMBECCA-PROTOCOL Section 3)

```
Truthy Diff Verified:
- [ ] git status reviewed
- [ ] git diff reviewed
- [ ] Specific files staged (no git add .)
- [ ] git diff --cached matches footprint
- [ ] Post-hook re-review (if applicable)
```

### Blockers / Concerns
- <any remaining issues or unknowns>

---

## 8. HANDOFF

| Field | Value |
|-------|-------|
| Report written to | outbox/ants/ANT_REPORT_ANT-<NNN>.md |
| Next role | Trinity (BQ) |
| BECCA review required? | YES/NO |
| If YES, reason | <why BECCA must review> |

> **Report-to-Index:** This report feeds the Ghost Index (see IAMBECCA-PROTOCOL Section 5).
> Ghost Twins will extract: Files Changed → FILE_OWNERSHIP_MAP, Pheromones → PHEROMONE_REGISTRY,
> Full Report → MASTER_ANT_INDEX, Task Status → RECENT_UNINDEXED_REPORTS.
> **Incomplete reports break the hivemind loop.**

---

## APPROVAL

🔑 APPROVED: TASK COMPLETE
(or 🔑 REJECTED: HALTED - <reason>)
```

**BECCA Review Triggers (ANY Ant):**
| Condition | Must Request BECCA Review |
|-----------|---------------------------|
| Code affects tenant boundary | YES |
| Code affects auth/session | YES |
| Code affects Firestore rules | YES |
| Security-related changes | YES |
| Data migration/transformation | YES |
| Any uncertainty about isolation | YES |

---

#### 2.4.3 Ant Self-Eval Output (REQUIRED for Batch Closure)

**IMPORTANT: NEO (ANT-CODER) EXEMPTION**

Neo (ANT-CODER) does NOT produce a separate self-eval file. Instead:
- Neo's self-assessment is embedded directly in the ANT_REPORT
- Trinity issues BECCA_REVIEW_REQUEST for all Neo tasks
- Becca (Source) verifies Neo's work and produces:
  - `audit/becca_verifications/BV_<ANT-ID>.md`
  - `audit/becca_scores/BS_<ANT-ID>.md`

**All other Ants** MUST produce a self-eval at task completion:

```markdown
# SELF-EVAL: ANT-<NNN>

run_id: <run_id>
ant_id: ANT-<NNN>
role: <AntName> (<RoleCode>)
task_id: <task_id>
timestamp: <ISO timestamp>

---

## TASK SUMMARY
<1-2 sentence description of what was done>

## COMPLETION STATUS
| Attribute | Value |
|-----------|-------|
| Status | COMPLETED / PARTIAL / BLOCKED |
| Attempts | <number> |
| Halts | <number> |

## SELF-ASSESSMENT
| Criterion | Met? | Evidence |
|-----------|------|----------|
| Task requirements fulfilled | YES/NO | <evidence path or description> |
| Tests pass (if applicable) | YES/NO/N/A | <test output path> |
| No regressions introduced | YES/NO | <verification method> |
| Code follows patterns | YES/NO | <patterns followed> |

## EVIDENCE PRODUCED
| Evidence | Path |
|----------|------|
| Code changes | <diff path or git ref> |
| Test results | <path> |
| Build output | <path> |

## BLOCKERS / CONCERNS
- <any remaining concerns>

## CONFIDENCE LEVEL
| Aspect | Confidence |
|--------|------------|
| Task complete | HIGH / MEDIUM / LOW |
| Quality | HIGH / MEDIUM / LOW |
| No regressions | HIGH / MEDIUM / LOW |

---

🔑 SELF-EVAL: ANT-<NNN> <COMPLETE / PARTIAL / BLOCKED>
```

**Path:** `audit/self_evals/SE_ANT-<NNN>.md`

---

#### 2.4.3.1 Becca Verification Output (For Neo/High-Risk Tasks)

When Trinity issues BECCA_REVIEW_REQUEST, Becca (Source) produces a verification:

```markdown
# BECCA VERIFICATION REPORT

verification_id: BV_<ANT-ID>
run_id: <run_id>
target_name: "<target_name>"

reviewed_ant_id: <ANT-ID>
reviewed_ant_role: <Neo|Morpheus|etc.>
review_scope: <CODE|SECURITY|FIREBASE|INSPECTION|RELEASE|DATA|UI|OTHER>

---

## I_AM_STATE: <CURRENT_STATE>

ROLE: Source (BECCA)
ACTION: Verification of <ANT-ID> work

---

## VERIFICATION SUMMARY

| Attribute | Value |
|-----------|-------|
| Ant ID | <ANT-ID> |
| Ant Role | <Role Display Name> |
| Task | <brief task description> |
| Review Scope | <scope> |
| Verdict | <VERIFIED|REJECTED|CONDITIONAL> |

---

## CHECKLIST RESULTS

| Check | Status | Notes |
|-------|--------|-------|
| Changes match task requirements | ✅/❌ | |
| No unintended side effects | ✅/❌ | |
| Build passes | ✅/❌ | |
| Evidence is verifiable | ✅/❌ | |
| Doctrine compliance | ✅/❌ | |

---

## EVIDENCE VERIFICATION

| Claim from Ant | Verification Method | Result |
|----------------|---------------------|--------|
| <claim> | <how verified> | ✅/❌ |

---

## VERDICT

**<VERIFIED|REJECTED|CONDITIONAL>**

<Explanation>

---

🔑 <CERTIFIED|REJECTED>: <ANT-ID> work <verified|rejected>
```

**Path:** `audit/becca_verifications/BV_<ANT-ID>.md`

---

#### 2.4.3.2 Becca Score Output (For Neo/High-Risk Tasks)

Becca also produces a score file for Architect ingestion:

```markdown
# BECCA SCORE

score_id: BS_<ANT-ID>
verification_id: BV_<ANT-ID>
run_id: <run_id>

ant_id: <ANT-ID>
ant_role: <Neo|Morpheus|etc.>
task_id: <task-id>

---

## SCORE BREAKDOWN

| Dimension | Score (1-5) | Weight | Weighted |
|-----------|-------------|--------|----------|
| Correctness | <1-5> | 0.30 | <calc> |
| Completeness | <1-5> | 0.25 | <calc> |
| Evidence Quality | <1-5> | 0.20 | <calc> |
| Doctrine Compliance | <1-5> | 0.15 | <calc> |
| Efficiency | <1-5> | 0.10 | <calc> |

**TOTAL SCORE: <X.XX>/5.00**

---

## HISTORICAL CONTEXT (for Architect ingestion)

| Metric | Value |
|--------|-------|
| Ant Role | <role> |
| Task Type | <CODE|SECURITY|etc.> |
| Halt Count | <0|1|2|...> |
| Reattempt Count | <0|1|2|...> |
| Review Scope | <scope> |
| Final Score | <X.XX> |

---

🔑 SCORED: <ANT-ID> = <X.XX>/5.00
```

**Path:** `audit/becca_scores/BS_<ANT-ID>.md`

---

#### 2.4.4 BQ Per-Ant Verification Output (REQUIRED for Batch Closure)

Trinity MUST verify each Ant's work:

```markdown
# BQ VERIFICATION: ANT-<NNN>

run_id: <run_id>
ant_id: ANT-<NNN>
verified_by: Trinity (BQ)
timestamp: <ISO timestamp>

---

## VERIFICATION CHECKS
| Check | Status | Evidence |
|-------|--------|----------|
| Ant report exists | ✅/❌ | outbox/ants/ANT_REPORT_ANT-<NNN>.md |
| Self-eval exists | ✅/❌ | audit/self_evals/SE_ANT-<NNN>.md |
| Evidence paths valid | ✅/❌ | <verification method> |
| Tests pass | ✅/❌/N/A | <test output> |
| No placeholder evidence | ✅/❌ | <scan result> |

## 8-PART REPORT CHECK
| Section | Present? |
|---------|----------|
| 1. Task Summary | ✅/❌ |
| 2. Changes Made | ✅/❌ |
| 3. Tests Run | ✅/❌ |
| 4. Evidence | ✅/❌ |
| 5. Inputs | ✅/❌ |
| 6. Outputs | ✅/❌ |
| 7. Risks/Unknowns | ✅/❌ |
| 8. Approval Token | ✅/❌ |

## VERIFICATION RESULT
**BQ_VERIFY: PASS / FAIL**

failure_reason: <if FAIL, explain why>

---

🔑 BQ_VERIFY: ANT-<NNN> <PASS / FAIL>
```

**Path:** `audit/reviews/BQ_VERIFY_ANT-<NNN>.md`

---

#### 2.4.5 BQ Batch Verification Output (REQUIRED for Batch Closure)

Trinity MUST verify the entire batch before activating Ghost:

```markdown
# BQ BATCH VERIFICATION: BATCH-<NNN>

run_id: <run_id>
batch_id: BATCH-<NNN>
phase: <phase number>
verified_by: Trinity (BQ)
timestamp: <ISO timestamp>

---

## BATCH SUMMARY
| Attribute | Value |
|-----------|-------|
| Total Ants | <count> |
| Completed | <count> |
| Halts | <count> |
| Reattempts | <count> |

## ANT VERIFICATION STATUS
| Ant ID | Report | Self-Eval | BQ Verify | Status |
|--------|--------|-----------|-----------|--------|
| ANT-001 | ✅ | ✅ | ✅ PASS | READY |
| ANT-002 | ✅ | ✅ | ✅ PASS | READY |
| ANT-003 | ✅ | ✅ | ❌ FAIL | BLOCKED |

## BATCH COMPLETION CHECKLIST
| Requirement | Count | Status |
|-------------|-------|--------|
| Ant Reports (8-part) | <n>/5 | ✅/❌ |
| Ant Self-Evals | <n>/5 | ✅/❌ |
| BQ Per-Ant Verifications | <n>/5 | ✅/❌ |
| All tests passing | <n>/5 | ✅/❌ |

## BATCH VERDICT
**BQ_BATCH: PASS / FAIL**

failure_reason: <if FAIL, explain why>

---

## NEXT (if PASS)
- Ready for Ghost Twins validation
- Packet to: inbox/ghost/PKT_<...>_BQ_to_GHOST.md

🔑 BQ_BATCH: BATCH-<NNN> <PASS / FAIL>
```

**Path:** `audit/reviews/BQ_VERIFY_BATCH-<NNN>.md`

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

### 2.8.1 HORSEMEN_REQUEST Output (Trinity → Sentinels)

**Only issued after debugger lane exhausted AND Ant fails on reattempt.**

```markdown
I_AM_STATE: IMPLEMENT
ROLE: Trinity (BQ)
TARGET: <target_name>
RUN_ID: <run_id>
PACKET_KIND: HORSEMEN_REQUEST

## ESCALATION SUMMARY
Ant ANT-<seq> failed after debugger-guided reattempt. Escalating to Sentinels.

## ESCALATION PREREQUISITES (All Must Be TRUE)

| # | Prerequisite | Path | Verified |
|---|--------------|------|----------|
| 1 | First HALT packet | <path> | ✅ |
| 2 | DEBUGGER_REQUEST issued | <path> | ✅ |
| 3 | Morpheus DIAGNOSTIC produced | <path> | ✅ |
| 4 | BACKUP_GATE_001 PASS | <path> | ✅ |
| 5 | REACTIVATE_ANT issued | <path> | ✅ |
| 6 | Ant reattempted and FAILED | <path to 2nd halt> | ✅ |
| 7 | BACKUP_GATE_002 PASS | <path> | ✅ |

## ARTIFACT CHAIN

| Seq | Artifact | Path |
|-----|----------|------|
| 1 | First HALT | inbox/bq/PKT_*_HALT_001.md |
| 2 | DEBUGGER_REQUEST | inbox/debugger/PKT_*_BQ_to_DEBUGGER_001.md |
| 3 | DIAGNOSTIC | outbox/debugger/DBG-*-001.md |
| 4 | BACKUP_GATE_001 | runtime/runs/<run_id>/BACKUP_GATE_001.md |
| 5 | REACTIVATE_ANT | inbox/bq/PKT_*_REACTIVATE_*_001.md |
| 6 | Second HALT | inbox/bq/PKT_*_HALT_002.md |
| 7 | BACKUP_GATE_002 | runtime/runs/<run_id>/BACKUP_GATE_002.md |
| 8 | This packet | inbox/horsemen/HRQ_*_001.md |

## HALTED ANT INFO
| Attribute | Value |
|-----------|-------|
| Ant ID | ANT-<seq> |
| Role | <AntName> (<RoleCode>) |
| Original Halt | <reason> |
| Debugger Diagnosis | <summary> |
| Second Failure | <reason> |

## ARTIFACTS FOR SENTINELS TO REVIEW
- <path to original halt>
- <path to debugger diagnostic>
- <path to reactivation packet>
- <path to second halt / failure evidence>

## SCOPE
scope: <CODE|SECURITY|FIREBASE|RELEASE|DATA|OTHER>

## EXPECTED OUTPUTS
1. outbox/horsemen/HORSEMEN_REPORT_<parent_ant_id>_<seq>.md
2. Reactivation guidance for Trinity

## SENTINELS CONSTRAINTS (LAW)
| Rule | Enforcement |
|------|-------------|
| No code edits by Sentinels | Sentinels advise, they don't implement |
| May propose rollback | Must route to BECCA for approval |
| Any destructive action | MUST be routed to BECCA for approval |

## NEXT
- To: Sentinels (HORSEMEN)
- Packet written to: inbox/horsemen/HRQ_<...>.md

## APPROVAL
🔑 APPROVED: HORSEMEN_REQUEST issued — Sentinels activated
```

**Path:** `inbox/horsemen/HRQ_<run_id>_<parent_ant_id>_<seq>.md`

---

### 2.8.2 HORSEMEN_REPORT Output (Sentinels)

```markdown
I_AM_STATE: IMPLEMENT
ROLE: Sentinels (HORSEMEN)
TARGET: <target_name>
RUN_ID: <run_id>
REPORT_ID: HORSEMEN_REPORT_<parent_ant_id>_<seq>

## ADVISORY ONLY — NO CODE EDITS

## ESCALATION SUMMARY
| Attribute | Value |
|-----------|-------|
| Ant ID | <ANT-XXX> |
| Original Halt | <reason> |
| Debugger Diagnosis | <summary> |
| Reattempt Result | FAILED |
| Second Failure | <reason> |

## INVARIANTS CHECK
| Invariant | Status | Evidence |
|-----------|--------|----------|
| Tenant isolation maintained | ✅/❌ | <evidence> |
| No security vulnerabilities | ✅/❌ | <evidence> |
| Backup gate passed | ✅/❌ | <path> |
| Evidence chain intact | ✅/❌ | <artifact count> |
| No unauthorized code changes | ✅/❌ | <verification> |

## ROOT CAUSE HYPOTHESIS
| Attribute | Value |
|-----------|-------|
| Category | <bug type / architectural issue / dependency / etc.> |
| Location | <file:line or system component> |
| Confidence | HIGH / MEDIUM / LOW |
| Why Debugger Fix Failed | <explanation> |

## ROOT CAUSE ANALYSIS
1. <analysis point 1>
2. <analysis point 2>
3. <analysis point 3>

## RECOMMENDED ACTIONS
| # | Action | Type | Risk |
|---|--------|------|------|
| 1 | <action> | ROLLBACK / REFACTOR / TEST / ISOLATION | HIGH/MED/LOW |
| 2 | <action> | ... | ... |

## FIX INSTRUCTIONS FOR ANT (STEPS ONLY — NO CODE)
The halted Ant should:
1. <step 1>
2. <step 2>
3. <step 3>

**IMPORTANT:** These are INSTRUCTIONS. The Ant implements them as code.

## VERIFICATION STEPS
After applying the fix:
1. <verification 1>
2. <verification 2>
3. <verification 3>

## DECISION
**DECISION:** <PASS_WITH_PLAN | FAIL_HALT | REQUIRE_BECCA_APPROVAL>

- `PASS_WITH_PLAN` — Fix instructions provided, reattempt authorized
- `FAIL_HALT` — Cannot resolve, require human intervention
- `REQUIRE_BECCA_APPROVAL` — Destructive action needed, route to BECCA

## NEXT STEPS
| Step | Action | Path |
|------|--------|------|
| 1 | BACKUP_GATE_003 must PASS | runtime/runs/<run_id>/BACKUP_GATE_003.md |
| 2 | Trinity issues REACTIVATE_ANT | inbox/bq/PKT_*_REACTIVATE_*_FROM_HORSEMEN.md |
| 3 | Ant applies fix | outbox/ants/ANT_REPORT_*.md |

## OUTPUTS CREATED
- outbox/horsemen/HORSEMEN_REPORT_<parent_ant_id>_<seq>.md (this file)

## APPROVAL
🔑 APPROVED: HORSEMEN_REPORT COMPLETE — reattempt authorized with guidance
(or 🔑 REJECTED: critical breach — HALTED)
```

**Path:** `outbox/horsemen/HORSEMEN_REPORT_<parent_ant_id>_<seq>.md`

---

### 2.9 REVIEW (Ghost Twins) — Evidence Validation Gate

Ghost Twins are the "court clerk" in the batch closure corridor. They validate ALL evidence before Trinity can proceed to Oracle.

#### 2.9.1 Ghost Review Output

```markdown
I_AM_STATE: REVIEW
ROLE: Ghost Twins (GHOST)
TARGET: <target_name>
RUN_ID: <run_id>
BATCH_ID: BATCH-<NNN>

## REVIEW SUMMARY
| Attribute | Value |
|-----------|-------|
| Reports Reviewed | <count> |
| Self-Evals Reviewed | <count> |
| BQ Verifications | <count> |
| Evidence Valid | <count> / <total> |
| Debugger Addendums | <count> |

## EVIDENCE VALIDATION (Non-Negotiable)
| Check | Pass Criteria | Result |
|-------|---------------|--------|
| All evidence paths real | No `/project/root/...` or `<path>` | ✅/❌ |
| No generic recommendations | No "fix this", "TODO", "..." | ✅/❌ |
| Self-evals exist | `audit/self_evals/SE_ANT-<NNN>.md` for each | ✅/❌ |
| Ant reports exist | `outbox/ants/ANT_REPORT_ANT-<NNN>.md` for each | ✅/❌ |
| BQ verifications exist | `audit/reviews/BQ_VERIFY_ANT-<NNN>.md` for each | ✅/❌ |
| Evidence score ≥ 70% | Run evidence_contract validation | ✅/❌ |

## PER-ANT EVIDENCE CHECK
| Ant ID | Report | Self-Eval | BQ Verify | Evidence Valid | Result |
|--------|--------|-----------|-----------|----------------|--------|
| ANT-001 | ✅ | ✅ | ✅ | ✅ 85% | PASS |
| ANT-002 | ✅ | ✅ | ✅ | ❌ 60% | FAIL |

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
| No placeholder paths | YES / NO |

## INPUTS (paths)
- Ant reports: <paths>
- Self-evals: <paths>
- BQ verifications: <paths>
- Debugger reports: <paths>

## ACTIONS TAKEN
- Validated all evidence paths
- Ran evidence_contract checks
- Extracted debugger addendums
- Created archive
- Compiled verdict

## OUTPUTS CREATED (paths)
- outbox/ghost/ARCHIVE_BATCH-<NNN>.md
- audit/debugger_addendums/<...>.md
- audit/evidence/INDEX_BATCH-<NNN>.md

## EVIDENCE (must be verifiable)
- Validation results: <paths>
- Inspection log: <path>

## RISKS / UNKNOWNS
- <any unverified claims>

## GHOST VERDICT
Use one of:
- `🔑 APPROVED: EVIDENCE VALIDATION PASS` → Trinity can proceed
- `🔑 REJECTED: <deficiency list>` → Back to Trinity

---
NEXT (if PASS): Report to Trinity for CERTIFICATE
```

---

#### 2.9.2 Ghost Archive Output

```markdown
# ARCHIVE: BATCH-<NNN>

run_id: <run_id>
batch_id: BATCH-<NNN>
archived_by: Ghost Twins (GHOST)
timestamp: <ISO timestamp>

---

## BATCH SUMMARY
| Attribute | Value |
|-----------|-------|
| Phase | <phase number> |
| Total Ants | <count> |
| Completed | <count> |
| Halts | <count> |
| Reattempts | <count> |

## ARCHIVED ARTIFACTS
| Artifact | Path | Verified |
|----------|------|----------|
| ANT-001 Report | outbox/ants/ANT_REPORT_ANT-001.md | ✅ |
| ANT-001 Self-Eval | audit/self_evals/SE_ANT-001.md | ✅ |
| ANT-001 BQ Verify | audit/reviews/BQ_VERIFY_ANT-001.md | ✅ |
| ... | ... | ... |

## EVIDENCE INDEX
See: audit/evidence/INDEX_BATCH-<NNN>.md

## DEBUGGER ADDENDUMS
| Debug ID | Path |
|----------|------|
| DBG-001 | audit/debugger_addendums/DBG-001.md |

## VALIDATION RESULT
**GHOST_ARCHIVE: COMPLETE**

---

🔑 ARCHIVE: BATCH-<NNN> COMPLETE
```

**Path:** `outbox/ghost/ARCHIVE_BATCH-<NNN>.md`

---

#### 2.9.3 Evidence Index Output

```markdown
# EVIDENCE INDEX: BATCH-<NNN>

run_id: <run_id>
batch_id: BATCH-<NNN>
indexed_by: Ghost Twins (GHOST)
timestamp: <ISO timestamp>

---

## EVIDENCE POINTERS

### ANT-001: <AntName> (<RoleCode>)
| Claim | Evidence |
|-------|----------|
| Code changes | git diff abc123..def456 |
| Tests pass | audit/evidence/ANT-001_test_output.txt |
| Build success | audit/evidence/ANT-001_build.txt |

### ANT-002: <AntName> (<RoleCode>)
| Claim | Evidence |
|-------|----------|
| Code changes | git diff def456..ghi789 |
| Tests pass | audit/evidence/ANT-002_test_output.txt |

### Debugger Sessions
| Debug ID | Root Cause | Fix Applied | Evidence |
|----------|------------|-------------|----------|
| DBG-001 | <cause> | <fix> | audit/debugger_addendums/DBG-001.md |

---

## VALIDATION SUMMARY
| Metric | Value |
|--------|-------|
| Total claims | <count> |
| Verified | <count> |
| Score | <percentage>% |

---

🔑 EVIDENCE INDEX: BATCH-<NNN> COMPLETE
```

**Path:** `audit/evidence/INDEX_BATCH-<NNN>.md`

---

### 2.10 CERTIFICATE Output (Trinity — After Ghost PASS)

**Trinity writes this ONLY after Ghost validation passes.**

```markdown
# CERTIFICATE: BATCH-<NNN>

run_id: <run_id>
batch_id: BATCH-<NNN>
phase: <phase number>
certified_by: Trinity (BQ)
timestamp: <ISO timestamp>

---

## CERTIFICATION CHECKLIST
| Requirement | Count | Status |
|-------------|-------|--------|
| Ant Reports (8-part) | 5/5 | ✅ |
| Ant Self-Evals | 5/5 | ✅ |
| BQ Per-Ant Verifications | 5/5 | ✅ |
| BQ Batch Verification | 1/1 | ✅ |
| Ghost Archive | 1/1 | ✅ |
| Ghost Validation PASS | 1/1 | ✅ |

## ARTIFACT REFERENCES
| Artifact | Path |
|----------|------|
| BQ Batch Verify | audit/reviews/BQ_VERIFY_BATCH-<NNN>.md |
| Ghost Archive | outbox/ghost/ARCHIVE_BATCH-<NNN>.md |
| Evidence Index | audit/evidence/INDEX_BATCH-<NNN>.md |

## CERTIFICATE STATUS
**All gates passed. Batch certified for Oracle handoff.**

---

🔑 CERTIFIED: BATCH-<NNN> READY FOR ORACLE

---

NEXT: Activate Oracle (closure)?
```

**Path:** `audit/reviews/CERT_BATCH-<NNN>_PASS.md`

---

### 2.11 HEALTH_REPORT (Oracle + BECCA)

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

| Role | Required Evidence Files |
|------|------------------------|
| Source (BECCA) | `P0_INVENTORY_*.txt`, `RUN_LOCK.json`, `BACKUP_GATE_000.md`, runboard, `BV_<ANT-ID>.md` (for Neo/high-risk), `BS_<ANT-ID>.md` (scores) |
| Oracle (MQ) | `ORACLE_ANALYZE_*.txt`, plan file, constraints doc |
| Trainman | `TRAINMAN_DISTRIBUTE_*.txt`, packet listings |
| Trinity (BQ) | `TRINITY_PHASE_*.txt`, ant assignments, `BQ_VERIFY_ANT-*.md`, `BQ_VERIFY_BATCH-*.md`, `CERT_BATCH-*_PASS.md` |
| Ants | `ANT-XXX_*.txt`, diffs, test output, build status, `SE_ANT-*.md` (self-eval) |
| Morpheus | `MORPHEUS_DIAG_*.txt`, analysis notes, root cause evidence |
| Ghost Twins | `ARCHIVE_BATCH-*.md`, `INDEX_BATCH-*.md`, validation results |
| Sentinels | `SENTINELS_FINAL_*.txt`, security scan, horsemen checks |

**Evidence Storage:** All evidence files go in `audit/evidence/` with naming pattern:
```
<ROLE>_<STATE>_<run_id>_<seq>.txt
```

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

### [1.5.0] 2026-02-07
- **PROTOCOL INTEGRATION:** Cross-references to new IAMBECCA-PROTOCOL.md
  - Added 2.4.1.1 IMPLEMENT Sub-Gate Tracking (D0→D1→D2→D3→D4→REPORT token table)
  - Added Gate Log template to ANT_REPORT (enables Horsemen HM-04 token trail audit)
  - Added Section 6 Pheromones Emitted table (feeds PHEROMONE_REGISTRY)
  - Added Section 6.1 Gate Log (intermediate token trail within IMPLEMENT)
  - Added Section 6.2 D0 Pheromone Scan (pre-discovery Ghost Index scan)
  - Added Horsemen Self-Attestation (H1-H5) to Section 7 Self-Assessment
  - Added Truthy Diff Checklist to Section 7 (required if commits made)
  - Added Report-to-Index cross-reference in Section 8 Handoff
  - Ants now show the full token trail, not just final `🔑 APPROVED: TASK COMPLETE`

### [1.4.0] 2026-02-03
- **CRITICAL:** Added Task Progress File (crash recovery)
  - Added 1.1 Task Progress File (`runtime/runs/<run_id>/progress/TASK_<ant_id>_<task_id>.md`)
  - Every Ant MUST create progress file within 30 seconds of task receipt
  - QUICK RESUME section enables instant crash recovery
  - CHECKPOINT LOG (append-only) tracks phase transitions
- **CRITICAL:** Added HORSEMEN Escalation Path
  - Added 2.8.1 HORSEMEN_REQUEST Output (`inbox/horsemen/HRQ_<run_id>_ANT-<NNN>_<seq>.md`)
  - Added 2.8.2 HORSEMEN_REPORT Output (`outbox/horsemen/HORSEMEN_REPORT_ANT-<NNN>_<seq>.md`)
  - Sentinels are advisory only (produce instructions, not code)
  - 6 prerequisites required before escalation
  - 3 backup gates in full chain: BACKUP_GATE_001, 002, 003

### [1.3.0] 2026-02-03
- **CRITICAL:** Added Selective Becca Review + Scoring
  - Added Neo (ANT-CODER) self-eval exemption (embedded in Ant report)
  - Added 2.4.3.1 Becca Verification Output (`audit/becca_verifications/BV_<ANT-ID>.md`)
  - Added 2.4.3.2 Becca Score Output (`audit/becca_scores/BS_<ANT-ID>.md`)
  - Updated Evidence Requirements table with Becca outputs
- Trinity issues BECCA_REVIEW_REQUEST for all Neo tasks
- Becca produces verification + score for Architect ingestion

### [1.2.0] 2026-02-03
- **CRITICAL:** Added Batch Closure Corridor artifacts
  - Added 2.4.3 Ant Self-Eval Output (`audit/self_evals/SE_ANT-<NNN>.md`)
  - Added 2.4.4 BQ Per-Ant Verification Output (`audit/reviews/BQ_VERIFY_ANT-<NNN>.md`)
  - Added 2.4.5 BQ Batch Verification Output (`audit/reviews/BQ_VERIFY_BATCH-<NNN>.md`)
- **CRITICAL:** Added Evidence Validation Gate to Ghost Twins
  - Updated 2.9 REVIEW with non-negotiable evidence checks
  - Added 2.9.2 Ghost Archive Output (`outbox/ghost/ARCHIVE_BATCH-<NNN>.md`)
  - Added 2.9.3 Evidence Index Output (`audit/evidence/INDEX_BATCH-<NNN>.md`)
- **CRITICAL:** Added CERTIFICATE artifact
  - Added 2.10 CERTIFICATE Output (`audit/reviews/CERT_BATCH-<NNN>_PASS.md`)
  - Trinity writes CERTIFICATE only after Ghost validation passes
  - CERTIFICATE is the "green light" for Oracle activation
- Updated Evidence Requirements by Role table
- Renumbered HEALTH_REPORT to 2.11

### [1.1.0] 2026-02-02
- **HARDENED P0_INVENTORY** based on Advisor feedback
- Added: Evidence capture files requirement (5 files minimum)
- Added: BACKUP_GATE_000.md baseline requirement
- Added: RUN_LOCK.json enforced schema
- Added: Oracle activation packet requirements
- Added: Evidence anchored to files (not claims)
- Added: Both absolute and relative paths required
- Added: P0-specific rejection triggers
- Updated: Evidence Requirements by Role table

### [1.0.0] 2026-02-02
- Initial release
- Ported output contracts from Prompt Architect v2.6.0
- Added IAMBecca-specific packet kinds
- Added debugger diagnostic output format
- Added backup gate output format
- Defined evidence requirements per role
- Defined rejection triggers
