# IAMBECCA-GUARDRAILS v1.0.0
## Safety Rules — Cardinal Rules, Rate Limits, Rollback, Emergency Stop

**Purpose:** Formalized safety boundaries for all IAMBecca operations
**Scope:** Loaded with ALL IAMBecca roles
**Source:** Extracted from Sonny governance/specs/GUARDRAILS.md

---

## 1) Five Cardinal Rules (FROZEN — NEVER VIOLATE)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   1. NO SILENT IRREVERSIBLE ACTIONS                                         │
│      Every destructive action must be logged + require approval.            │
│                                                                             │
│   2. NO SELF-APPROVAL                                                       │
│      A role cannot approve its own output. Ghost Twins validate.            │
│      BECCA verifies Neo. Sentinels audit on escalation.                     │
│                                                                             │
│   3. NO EXECUTION WITHOUT EVIDENCE                                          │
│      Claims without proof = 🔑 REJECTED. Evidence contract is law.          │
│                                                                             │
│   4. NO STATE SKIPPING                                                      │
│      Must follow state machine: P0→ANALYZE→PROPOSE→IMPLEMENT→...           │
│      Skipping states = 🔑 REJECTED: invalid transition.                     │
│                                                                             │
│   5. NO RECOVERY FROM TERMINAL STATES                                       │
│      HALTED requires human intervention. ROLLED_BACK is final.              │
│      Cannot "undo" a terminal state programmatically.                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2) Action Risk Classification

### 2.1 HIGH RISK Actions (Require BECCA Approval)

| Action | Why | Approval Required |
|--------|-----|-------------------|
| Modify firestore.rules | Tenant isolation boundary | BECCA + Seraph review |
| Modify auth/session logic | Authentication boundary | BECCA + Seraph review |
| Delete any file | Irreversible without git | BECCA approval |
| Modify deployment config | Affects production | BECCA + Link review |
| Data migration touching tenantId | Tenant isolation risk | BECCA + Apoc review |
| Merge to main/master | Affects all environments | BECCA approval |
| Force push to any branch | Destroys git history | BECCA approval (discouraged) |
| Modify CI/CD pipelines | Affects build/deploy | BECCA + Link review |
| Add new API endpoint | New attack surface | BECCA + Seraph review |
| Schema changes to shared collections | Cross-tenant risk | BECCA + Apoc review |

### 2.2 MEDIUM RISK Actions (Log + Proceed with Caution)

| Action | Why |
|--------|-----|
| Create new component | Could affect bundle size |
| Add npm dependency | Supply chain risk |
| Modify shared utilities | Wide blast radius |
| Change environment variables | Could affect runtime |
| Modify test fixtures | Could hide regressions |

### 2.3 AUTO-APPROVE Actions (Safe — No Approval Needed)

| Action | Why |
|--------|-----|
| Read any file | Non-destructive |
| Run tests | Non-destructive |
| Run linters | Non-destructive |
| Create new test file | Additive only |
| Add code comments | Non-functional change |
| Run build (local) | Non-destructive |
| Create branch | Reversible |

---

## 3) Environment Boundaries

### 3.1 Environment Classification

| Environment | Write Access | Deploy Access | Data Access |
|-------------|-------------|---------------|-------------|
| **Local** | ✅ Full | ❌ No | Emulator only |
| **Dev** | ✅ Full | ✅ With approval | Dev data only |
| **Staging** | 🔒 Limited | 🔒 With approval | Staging data only |
| **Production** | ❌ FORBIDDEN | ❌ FORBIDDEN | ❌ FORBIDDEN |

### 3.2 Environment Guardrails

```
PRODUCTION SAFEGUARDS:
├── Ants NEVER touch production directly
├── All changes go through: local → dev → staging → production
├── BECCA cannot authorize production deployment (human only)
├── Production data cannot be read by Ants
└── Production credentials NEVER appear in prompts or reports
```

---

## 4) Rate Limits

### 4.1 Per-Run Limits

| Resource | Limit | On Exceeded |
|----------|-------|-------------|
| Active Ants (concurrent) | 5 per Trinity batch | Queue remaining |
| Retry attempts per task | 3 | `🔑 REJECTED: retry limit exceeded` |
| Horsemen escalations per run | 2 | Human intervention required |
| BECCA ABORT calls per run | 3 | Run HALTED, human review |
| Files modified per Ant | 10 (soft limit) | Flag for review, not block |

### 4.2 Per-Ant Limits

| Resource | Limit | On Exceeded |
|----------|-------|-------------|
| Single task duration | 30 minutes (soft) | Progress check required |
| Checkpoint interval | Every 5 minutes | Update progress file |
| File creation | 5 new files per task | Flag for review |
| Lines of code changed | 500 (soft limit) | Flag for review, consider splitting |

---

## 5) Rollback Protocol

### 5.1 Backup Requirements

| When | Backup Type | Responsible |
|------|-------------|-------------|
| Before run starts | Git commit (BACKUP_GATE_000) | BECCA |
| Before Ant reattempt | Git commit (BACKUP_GATE_NNN) | BECCA |
| Before Horsemen escalation | Git commit (BACKUP_GATE_NNN) | BECCA |
| Before any deployment | Git tag + snapshot | Link |

### 5.2 Rollback Triggers

| Trigger | Action |
|---------|--------|
| Security vulnerability in production path | Immediate rollback to last known good |
| Tenant isolation breach detected | Immediate rollback + BECCA ABORT |
| 3 consecutive Ant failures on same task | Rollback to pre-task state |
| Ghost Twins reject entire batch | Rollback batch, reassign |
| Human requests rollback | Execute immediately |

### 5.3 Rollback Execution

```
ROLLBACK PROTOCOL:
├── 1. Log ROLLBACK event to ledger
├── 2. Identify rollback target (commit hash from BACKUP_GATE)
├── 3. Execute: git checkout <hash> -- <affected files>
├── 4. Verify rollback: run tests, check state
├── 5. Update run state: status = ROLLED_BACK
├── 6. Notify BECCA with rollback report
└── 7. BECCA decides: retry, skip, or halt
```

---

## 6) Emergency Stop

### 6.1 Emergency Stop Triggers

| Trigger | Severity | Action |
|---------|----------|--------|
| Tenant data exposed cross-tenant | 🔴 CRITICAL | HALT ALL ANTS immediately |
| Production credentials in logs/reports | 🔴 CRITICAL | HALT + purge + human notify |
| Infinite loop detected (retry > 3) | 🟠 HIGH | HALT affected Ant |
| Unauthorized file modification | 🟠 HIGH | HALT + rollback |
| State machine corruption | 🟠 HIGH | HALT + recovery protocol |

### 6.2 Emergency Stop Phrase (FROZEN)

```
BECCA ABORT: EMERGENCY STOP — <reason>
```

**Response:** ALL active Ants must stop. Run transitions to HALTED. Human must authorize resume.

### 6.3 Post-Emergency Checklist

```
AFTER EMERGENCY STOP:
├── 1. All Ants stopped (verify no background work)
├── 2. Run state = HALTED
├── 3. Error log written with full context
├── 4. Ledger event: ERROR_CRITICAL logged
├── 5. BECCA notified with emergency report
├── 6. Human notified (if available)
├── 7. Rollback executed (if needed)
└── 8. Post-mortem pheromone added (🔴 CRITICAL)
```

---

## 7) Secrets Protection

| Rule | Enforcement |
|------|-------------|
| Never log API keys, tokens, passwords | Scan all output for patterns |
| Never include secrets in Ant reports | Ghost Twins verify during archival |
| Never commit .env files | Pre-commit hook (if available) |
| Use environment variables only | No hardcoded secrets in code |
| Production credentials NEVER in prompts | BECCA ABORT if detected |

**Secret Detection Patterns:**
```
SUSPICIOUS_PATTERNS:
├── API keys: /[A-Za-z0-9_-]{20,}/ in unexpected locations
├── Tokens: /Bearer [A-Za-z0-9_.-]+/
├── Passwords: /password\s*[:=]\s*["'][^"']+/
├── Connection strings: /mongodb\+srv:\/\/|postgres:\/\//
└── Firebase: /firebase.*apiKey|FIREBASE.*KEY/
```

---

## 8) Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-GUARDRAILS v1.0.0 — QUICK REFERENCE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  5 CARDINAL RULES:                                                          │
│  1. No silent irreversible actions                                          │
│  2. No self-approval                                                        │
│  3. No execution without evidence                                           │
│  4. No state skipping                                                       │
│  5. No recovery from terminal states                                        │
│                                                                             │
│  HIGH RISK = Requires BECCA approval:                                       │
│  firestore.rules, auth, delete, deploy, data migration, merge              │
│                                                                             │
│  RATE LIMITS:                                                               │
│  5 concurrent Ants, 3 retries, 3 ABORTs max, 30min soft timeout            │
│                                                                             │
│  ROLLBACK: Always from BACKUP_GATE commit hash                              │
│                                                                             │
│  EMERGENCY STOP: "BECCA ABORT: EMERGENCY STOP — <reason>"                   │
│  All Ants halt. Run = HALTED. Human must authorize resume.                  │
│                                                                             │
│  SECRETS: Never in logs, reports, prompts, or commits.                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-05
- Initial release
- Extracted from Sonny governance/specs/GUARDRAILS.md
- 5 Cardinal Rules (frozen)
- Action risk classification (HIGH/MEDIUM/AUTO-APPROVE)
- Environment boundaries (Local/Dev/Staging/Production)
- Rate limits (per-run and per-ant)
- Rollback protocol with backup gates
- Emergency stop triggers and post-emergency checklist
- Secrets protection rules
