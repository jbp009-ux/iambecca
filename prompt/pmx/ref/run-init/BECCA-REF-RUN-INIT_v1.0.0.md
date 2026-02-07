# BECCA-REF-RUN-INIT v1.0.0
## Evidence Hardening Patterns

**Version:** 1.0.0
**Date:** 2026-02-03
**Source:** Extracted from IM-01 v1.2.0 testing (evidence rules only)
**Purpose:** Evidence capture patterns, proof requirements

---

## When to Load

Load this module when:
- Capturing evidence for any state
- Creating backup gates
- Verifying claims have proof

---

## 1. Evidence Anchoring Rule

**Claims MUST be anchored to files, not vibes.**

| ❌ BAD (Claim only) | ✅ GOOD (Anchored to file) |
|---------------------|----------------------------|
| "Folders exist" | "Folders exist → `audit/evidence/dir_tree.txt`" |
| "Backup created" | "Backup created → `audit/evidence/git_log_1.txt`" |
| "Tests pass" | "Tests pass → `audit/evidence/test_output.txt`" |
| "Build succeeded" | "Build succeeded → `audit/evidence/build_log.txt`" |

**Rule:** If you can't point to a file, it's not evidence.

---

## 2. Minimum Evidence Files

Every state transition should capture evidence files:

| Evidence Type | Example Filename | What It Proves |
|---------------|------------------|----------------|
| Directory tree | `*_dir_tree.txt` | Folder structure |
| File listing | `*_ls_*.txt` | Files exist |
| File contents | `*_cat_*.txt` | Content verified |
| Git log | `*_git_log_*.txt` | Commit exists |
| Git status | `*_git_status.txt` | Clean/dirty state |
| Command output | `*_output.txt` | Command ran |
| Test results | `*_test_*.txt` | Tests passed/failed |

**Naming pattern:** `<STATE>_<description>.txt`

---

## 3. Path Rules

**Always include BOTH paths:**

| Type | Example | Why |
|------|---------|-----|
| Absolute | `D:\projects\iambecca\audit\evidence\file.txt` | Verification |
| Relative | `./audit/evidence/file.txt` | Portability |

---

## 4. Evidence Table Format

In reports, use this format:

```markdown
## EVIDENCE (anchored to files)
| Claim | Evidence File |
|-------|---------------|
| Folders exist | audit/evidence/dir_tree.txt |
| Files created | audit/evidence/ls_output.txt |
| Build passed | audit/evidence/build_log.txt |
| Tests passed | audit/evidence/test_output.txt |
```

---

## 5. STOP Conditions (Evidence-Related)

| Trigger | Action |
|---------|--------|
| Claim without evidence file | STOP, capture evidence first |
| Evidence file missing | STOP, file must exist |
| Evidence file empty | STOP, content required |
| < 3 evidence files for state | STOP, insufficient proof |

---

## 6. Backup Gate Pattern

Before risky operations, create a backup gate:

```markdown
# BACKUP_GATE_<NNN>

**Created:** <timestamp>
**Git Ref:** <commit hash>
**State:** <current state>

## What This Captures
- State before <operation>
- Rollback point if operation fails

## Evidence
| Claim | File |
|-------|------|
| Commit exists | audit/evidence/git_log_1.txt |
| No uncommitted changes | audit/evidence/git_status.txt |
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  BECCA-REF-RUN-INIT v1.0.0 — EVIDENCE HARDENING                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  RULE 1: Claims MUST be anchored to files                       │
│          ❌ "Tests pass" → ✅ "Tests pass → test_output.txt"    │
│                                                                 │
│  RULE 2: Minimum evidence files per state                       │
│          dir_tree | ls_* | cat_* | git_log | git_status         │
│                                                                 │
│  RULE 3: Both absolute + relative paths                         │
│                                                                 │
│  RULE 4: Evidence table in every report                         │
│          | Claim | Evidence File |                              │
│                                                                 │
│  RULE 5: STOP if no evidence file for claim                     │
│                                                                 │
│  RULE 6: Backup gate before risky operations                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Stripped automation-specific content
- Focus on evidence hardening rules only
- 6 core patterns for proof requirements
