# TASK PROGRESS TEMPLATE v1.0.0

**Purpose:** Every role creates this file when starting a task. Survives chat crashes.
**Location:** `runtime/runs/<run_id>/progress/TASK_<ant_id>_<task_id>.md`

---

## WHY THIS EXISTS

Chat crashes. Context gets lost. But disk persists.

When you start ANY task:
1. Create this file FIRST
2. Update it at EVERY checkpoint
3. If chat crashes → read this file to resume

---

## CREATION RULE (MANDATORY)

**Every Ant MUST create a progress file within 30 seconds of receiving a task packet.**

```
runtime/runs/<run_id>/progress/
└── TASK_ANT-001_fix-auth-bug.md
└── TASK_ANT-002_add-tooltip.md
└── TASK_ANT-003_refactor-locks.md
```

---

## ⚠️ MARK DONE IMMEDIATELY (CRITICAL)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   Every time you complete a task or subtask:                                │
│                                                                             │
│   1. STOP what you're doing                                                 │
│   2. Update progress file: status: COMPLETED                                │
│   3. Add CHECKPOINT LOG entry with ✅ Result                                │
│   4. THEN move to next task                                                 │
│                                                                             │
│   DO NOT batch completions.                                                 │
│   DO NOT wait until later.                                                  │
│   Mark DONE the INSTANT you finish.                                         │
│                                                                             │
│   WHY: If chat crashes 1 second after you finish but before you mark done,  │
│   the next session will redo all the work you just completed.               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## TEMPLATE

```markdown
# TASK PROGRESS: <task_id>

ant_id: ANT-<NNN>
task_id: <task_id>
run_id: <run_id>
target_name: "<target_name>"

created: <ISO timestamp>
last_updated: <ISO timestamp>
status: <STARTING|IN_PROGRESS|BLOCKED|HALTED|COMPLETED>

---

## QUICK RESUME (read this after crash)

**WHAT I WAS DOING:** <1 sentence - what you're working on right now>

**NEXT ACTION:** <exactly what to do next>

**BLOCKERS:** <none | description>

---

## CURRENT STATE

| Attribute | Value |
|-----------|-------|
| Phase | <DISCOVERY|FOOTPRINT|PATCH|VERIFY|REPORT> |
| Progress | <0-100>% |
| Confidence | <LOW|MEDIUM|HIGH> |
| Time Elapsed | <minutes since start> |

---

## CHECKPOINT LOG (append-only)

| Time | Phase | Action | Result | Next |
|------|-------|--------|--------|------|
| 10:00 | START | Received task packet | ✅ | Read target files |
| 10:05 | DISCOVERY | Read auth.ts | ✅ Found bug at line 42 | Plan fix |
| 10:12 | FOOTPRINT | Proposed 3-line change | ⏳ Waiting approval | — |
| 10:15 | PATCH | Applied fix | ✅ | Run tests |
| 10:20 | VERIFY | npm test | ❌ 2 failures | Debug tests |
| 10:25 | BLOCKED | Test fixture missing | ⏳ | Request fixture |

---

## FILES TOUCHED

| File | Status | Lines | Notes |
|------|--------|-------|-------|
| src/auth.ts | MODIFIED | +3, -1 | Fixed null check |
| src/auth.test.ts | READ | — | Need to add test case |

---

## DECISIONS MADE

| Time | Decision | Rationale |
|------|----------|-----------|
| 10:08 | Use null coalescing | Cleaner than if-check |
| 10:22 | Skip test A | Out of scope per task |

---

## IF BLOCKED/HALTED

halt_reason: <reason if halted>
blocked_on: <what you're waiting for>
recovery_path: <what needs to happen to unblock>

---

## EVIDENCE COLLECTED

| Evidence | Path |
|----------|------|
| Bug location | src/auth.ts:42 |
| Test output | audit/evidence/ANT-001_test_fail.txt |
| Proposed diff | audit/evidence/ANT-001_diff.txt |

---

## ⚫ ISOLATION CHECK (if task touches tenant data)

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Queries tenant-scoped | ✅/❌/N/A | <file:line with where clause> |
| useAuth() used (not props) | ✅/❌/N/A | <file:line> |
| tenantId field preserved | ✅/❌/N/A | <evidence> |
| No cross-tenant access | ✅/❌/N/A | <evidence> |

isolation_verified: <true|false|N/A>

---

## COMPLETION CHECKLIST

- [ ] Task requirements understood
- [ ] Files identified
- [ ] Changes made
- [ ] Tests pass
- [ ] ⚫ Isolation verified (if touches tenant data)
- [ ] Evidence collected
- [ ] ANT_REPORT written

---

## CRASH RECOVERY INSTRUCTIONS

If you're reading this after a chat crash:

1. **Read QUICK RESUME section** — tells you exactly where you were
2. **Check CURRENT STATE** — know your phase and progress
3. **Read last 3 CHECKPOINT LOG entries** — understand recent actions
4. **Check BLOCKERS section** — know if you're stuck
5. **Continue from NEXT ACTION** — resume work

---

last_checkpoint: <ISO timestamp>
```

---

## UPDATE FREQUENCY

| Event | Update Required |
|-------|-----------------|
| Task received | CREATE file immediately |
| Phase change | Update CURRENT STATE + add CHECKPOINT |
| File touched | Add to FILES TOUCHED |
| Decision made | Add to DECISIONS MADE |
| Evidence created | Add to EVIDENCE COLLECTED |
| Blocked | Update BLOCKERS + add CHECKPOINT |
| Every 5 minutes | Update last_checkpoint timestamp |
| Task complete | Mark status: COMPLETED, finish checklist |

---

## EXAMPLE: ANT-003 Race Condition Fix

```markdown
# TASK PROGRESS: fix-race-condition

ant_id: ANT-003
task_id: fix-race-condition
run_id: run_TEST005_horsemen-escalation_2026-02-03_001
target_name: "IAMBECCA | TEST | INTEGRATION | horsemen-escalation | SENTINELS"

created: 2026-02-03T12:00:00Z
last_updated: 2026-02-03T12:25:00Z
status: BLOCKED

---

## QUICK RESUME (read this after crash)

**WHAT I WAS DOING:** Fixing deadlock in orderProcessor.ts lock ordering

**NEXT ACTION:** Wait for DEBUGGER_REQUEST response from Morpheus

**BLOCKERS:** Deadlock introduced — need debugger diagnosis

---

## CURRENT STATE

| Attribute | Value |
|-----------|-------|
| Phase | PATCH |
| Progress | 40% |
| Confidence | LOW |
| Time Elapsed | 25 min |

---

## CHECKPOINT LOG (append-only)

| Time | Phase | Action | Result | Next |
|------|-------|--------|--------|------|
| 12:00 | START | Received task packet | ✅ | Read orderProcessor.ts |
| 12:05 | DISCOVERY | Read file, found race condition | ✅ | Plan mutex fix |
| 12:10 | FOOTPRINT | Proposed adding mutex locks | ✅ | Apply patch |
| 12:15 | PATCH | Added lock1 and lock2 | ✅ | Run tests |
| 12:20 | VERIFY | npm test orderProcessor | ❌ DEADLOCK | Request debugger |
| 12:25 | HALTED | Created HALT packet | ⏳ | Wait for Morpheus |

---

## FILES TOUCHED

| File | Status | Lines | Notes |
|------|--------|-------|-------|
| functions/src/services/orderProcessor.ts | MODIFIED | +15, -2 | Added mutex locks |

---

## IF BLOCKED/HALTED

halt_reason: Deadlock — Thread A waits for lock2, Thread B waits for lock1
blocked_on: DEBUGGER_REQUEST response from Morpheus
recovery_path: Apply Morpheus fix instructions after BACKUP_GATE passes

---

last_checkpoint: 2026-02-03T12:25:00Z
```

---

## ROLE INTEGRATION

**Add to every Ant role file (IM-05 through IM-11):**

```markdown
## Task Progress File (MANDATORY)

Before doing ANY work, create your progress file:

1. **Path:** `runtime/runs/<run_id>/progress/TASK_<ant_id>_<task_id>.md`
2. **Template:** Use `templates/task_progress.md`
3. **Update:** Every phase change, every 5 minutes, every blocker

If chat crashes, your progress file tells you (or the next session) exactly where to resume.
```

---

## TRINITY VERIFICATION

Trinity (BQ) should verify progress files exist:

```markdown
## Progress File Check (Before Phase Completion)

| Ant | Progress File | Last Updated | Status |
|-----|---------------|--------------|--------|
| ANT-001 | ✅ Exists | 2 min ago | IN_PROGRESS |
| ANT-002 | ✅ Exists | 5 min ago | COMPLETED |
| ANT-003 | ❌ Missing | — | ⚠️ REQUEST CREATE |
```

---

## CRASH RECOVERY PROTOCOL

When resuming after crash:

1. `ls runtime/runs/<run_id>/progress/` — see all active tasks
2. Read each `TASK_*.md` file
3. Check `status` field and `QUICK RESUME` section
4. Resume from `NEXT ACTION`
5. Update `last_updated` timestamp

---

## DIRECTORY STRUCTURE

```
runtime/runs/<run_id>/
├── RUNBOARD.md           ← Run-level state
├── RUN_LOCK.json         ← Concurrency lock
├── BACKUP_GATE_*.md      ← Backup checkpoints
└── progress/             ← NEW: Task-level progress
    ├── TASK_ANT-001_fix-auth.md
    ├── TASK_ANT-002_add-tooltip.md
    └── TASK_ANT-003_refactor-locks.md
```

---

## BENEFITS

| Problem | Solution |
|---------|----------|
| Chat crashes | Progress file persists on disk |
| Context lost | QUICK RESUME section tells you where you were |
| Long tasks | Checkpoint log shows exact history |
| Debugging | Decisions log explains why choices were made |
| Handoff | Next session can read and continue |
| Audit | Evidence collected incrementally |
