# IAMBECCA-ERRORS v1.0.0
## Error & Abort Protocol — Single Escalation Grammar

**Version:** 1.0.0
**Date:** 2026-02-04
**Purpose:** Define error categories, logging requirements, and abort protocol

---

## Error Categories

| Category | Definition | Action |
|----------|------------|--------|
| **RECOVERABLE** | Missing minor info, can request clarification | Request info, continue |
| **BLOCKER** | Missing required input, cannot proceed | PAUSE, request repair |
| **CRITICAL** | Security breach, data loss risk, scope bleed | ABORT immediately |

### Category Examples

**RECOVERABLE:**
- Missing optional field in packet
- Unclear success criteria (can ask)
- Minor formatting issue

**BLOCKER:**
- Missing required_inputs paths
- Packet missing chain_id
- Evidence file not found
- Test environment unavailable

**CRITICAL:**
- Target mismatch (wrong project)
- Security vulnerability discovered that can't wait
- Evidence contract violation
- Tenant isolation breach detected
- Retry limit exceeded (3 attempts)

---

## Error Logging (Required)

On ANY error (all categories), write to:

```
runtime/runs/<run_id>/errors/ERROR_<timestamp>_<role_code>.md
```

### Error Log Format (Canonical)

```markdown
# ERROR LOG

error_id: ERROR_<timestamp>_<role_code>
run_id: <run_id>
target_name: <target project name>
chain_id: <chain_id or "none">
role: <role code and display>
timestamp: <ISO timestamp>
category: RECOVERABLE | BLOCKER | CRITICAL

---

## WHAT FAILED

<description of the failure>

---

## EVIDENCE CHECKED

<list of files/paths checked before determining error>

---

## WHAT WAS ATTEMPTED

<actions taken before failure>

---

## ROOT CAUSE (if known)

<why this happened>

---

## RECOMMENDED NEXT ACTION

<what should happen to resolve this>

---

## ESCALATION

<who should handle: self, BECCA, human>
```

---

## Abort Protocol

### Abort Phrase (Frozen)

To abort and return control to BECCA:

```
BECCA ABORT: <reason>
```

**This phrase is FROZEN.** Do not modify or create variations.

### Abort Response Format

When a role issues BECCA ABORT, it must:

```markdown
---

## 🛑 BECCA ABORT

**Reason:** <concise reason>

**Error Category:** BLOCKER | CRITICAL

**Error Log:** runtime/runs/<run_id>/errors/ERROR_<timestamp>_<role_code>.md

**Chain State:**
- chain_id: <chain_id>
- step: <X> of <Y>
- last_completed: <role>

**Recommended Action:**
<what BECCA should do>

---

**Say:** "BECCA activate" to return control to BECCA
```

---

## When to ABORT Immediately

| Condition | Category | Action |
|-----------|----------|--------|
| Critical security finding (can't wait for chain end) | CRITICAL | BECCA ABORT |
| Missing required input that blocks work | BLOCKER | BECCA ABORT |
| Evidence contract failure that cannot be repaired locally | BLOCKER | BECCA ABORT |
| Unrecoverable loop (3 retries failed) | CRITICAL | BECCA ABORT |
| Target mismatch (wrong project) | CRITICAL | BECCA ABORT |
| Identity mismatch (wrong role activated) | BLOCKER | BECCA ABORT |
| Packet validation failed | BLOCKER | BECCA ABORT |
| Human requests abort | - | BECCA ABORT |

---

## Retry Limit (Frozen)

```
Any repeated failure beyond 3 attempts:
🔑 REJECTED: retry limit exceeded → BECCA ABORT
```

### Retry Counter

Track retries in error log:

```markdown
## RETRY TRACKING

attempt: <N> of 3
previous_attempts:
  - attempt 1: <what was tried> → <result>
  - attempt 2: <what was tried> → <result>
  - attempt 3: <what was tried> → <result>

retry_limit_exceeded: true/false
```

---

## Error Escalation Path

```
RECOVERABLE errors:
  └── Role handles locally
      └── Request clarification if needed
      └── Continue after resolution

BLOCKER errors:
  └── Log to errors/
  └── Set CURRENT_ROLE status: PAUSED
  └── BECCA ABORT
  └── BECCA decides: repair or skip

CRITICAL errors:
  └── Log to errors/
  └── Set CURRENT_ROLE status: HALTED
  └── BECCA ABORT (immediate)
  └── BECCA escalates to human if needed
```

---

## Packet Validation Errors

Before doing ANY work, validate inbound packet. If validation fails:

| Missing Field | Category | Response |
|---------------|----------|----------|
| run_id | BLOCKER | 🔑 REJECTED: packet missing run_id |
| target_name | BLOCKER | 🔑 REJECTED: packet missing target_name |
| chain_id (in chain) | BLOCKER | 🔑 REJECTED: packet missing chain_id |
| from_role | BLOCKER | 🔑 REJECTED: packet missing sender |
| to_role | BLOCKER | 🔑 REJECTED: packet wrong recipient |
| required_inputs | BLOCKER | 🔑 REJECTED: packet missing inputs |
| stop_conditions | RECOVERABLE | Request clarification |

---

## Common Error Codes

| Code | Meaning |
|------|---------|
| E001 | Packet validation failed |
| E002 | Identity mismatch |
| E003 | Target mismatch |
| E004 | Chain position mismatch |
| E005 | Evidence file not found |
| E006 | Retry limit exceeded |
| E007 | Security critical finding |
| E008 | State file missing |
| E009 | Wrong role activated |
| E010 | Corrupted packet |

---

## Error Notification to BECCA

When BECCA is reactivated after an ABORT, she receives:

```markdown
👑 SOURCE (BECCA IM-01) reactivated.

I AM the Source. I have received an ABORT.

**ABORT Source:** <role that aborted>
**Error Category:** <BLOCKER/CRITICAL>
**Error Log:** <path>

Reading error log to determine next action...
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  IAMBECCA ERROR PROTOCOL v1.0.0 — QUICK REFERENCE               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ERROR CATEGORIES:                                              │
│  • RECOVERABLE — Handle locally, request clarification          │
│  • BLOCKER — PAUSE, BECCA ABORT, await repair                   │
│  • CRITICAL — HALT, BECCA ABORT immediately                     │
│                                                                 │
│  ALWAYS LOG TO:                                                 │
│  runtime/runs/<run_id>/errors/ERROR_<timestamp>_<role>.md       │
│                                                                 │
│  ABORT PHRASE (FROZEN):                                         │
│  "BECCA ABORT: <reason>"                                        │
│                                                                 │
│  RETRY LIMIT: 3 attempts max                                    │
│  After 3 failures: 🔑 REJECTED: retry limit exceeded            │
│                                                                 │
│  ABORT CONDITIONS:                                              │
│  • Critical security finding                                    │
│  • Missing required input                                       │
│  • Target/identity mismatch                                     │
│  • Retry limit exceeded                                         │
│  • Packet validation failed                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-04
- Initial release
- Three error categories: RECOVERABLE, BLOCKER, CRITICAL
- Error logging format
- Abort protocol with frozen phrase
- Retry limit (3 attempts)
- Packet validation errors
- Error escalation path
- Common error codes
