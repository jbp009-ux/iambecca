# PMX-SHARED-INSPECTOR-SCHEMA v1.3.0
## Machine-Enforceable Inspector Report Validation

**Version:** 1.3.0
**Date:** 2026-02-01
**Purpose:** Hard schema gate for INSPECTOR_REPORT.json — Receipts Mode enforcement
**Scope:** Identical across all projects

---

## Schema Version Pin

**Current Version:** `1.3.0`

BECCA MUST reject Inspector reports unless:
```
report.schema_version === "1.3.0"
```

This prevents old/rogue Inspectors from bypassing validation.

---

## Overview

This schema makes "Evidence or FAIL" **machine-enforceable**. BECCA uses this to automatically reject Inspector reports that lack receipts.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   INSPECTOR REPORT VALIDATION CHAIN                             │
│                                                                 │
│   Inspector submits report                                      │
│            ↓                                                    │
│   BECCA validates against this schema                           │
│            ↓                                                    │
│   ❌ FAIL: EVIDENCE_MISSING → Report rejected, re-run           │
│   ❌ FAIL: TIMESTAMP_INVALID → Report rejected, re-run          │
│   ❌ FAIL: TRINITY_MISMATCH → Report rejected, re-run           │
│   ✅ PASS: All gates → Report accepted                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## JSON Schema (TypeScript Definition)

```typescript
interface InspectorReport {
  // Schema Version (REQUIRED - BECCA rejects if mismatch)
  schema_version: "1.3.0";      // Must match PMX-SHARED-INSPECTOR-SCHEMA version

  // Metadata
  from: "PMX-13";
  to: "PMX-01";
  work_id: string;              // e.g., "ANT-042"
  timestamp: string;            // ISO 8601, MUST be within ±24h of manifest
  tenant_key_used: string;      // e.g., "tenantId" or "workspaceId" — BECCA cross-checks

  // Trinity Match (REQUIRED)
  trinity: {
    run_id: string;             // From sentinel_summary.json
    commit: string;             // From evidence_manifest.json
    evidence_hash: string;      // From sentinel_summary.json
    all_match: boolean;         // FAIL if false
  };

  // Verdict
  verdict: "APPROVED" | "REJECTED";

  // Horsemen Status (REQUIRED for all 5)
  horsemen: {
    H1_Hallucination: HorsemanCheck;
    H2_Amnesia: HorsemanCheck;
    H3_Drift: HorsemanCheck;
    H4_PrivilegeCreep: HorsemanCheck;
    H5_SilentFailure: HorsemanCheck;
  };

  // Ledger Verification (REQUIRED)
  ledger_verification: {
    command: string;            // Exact command run
    output: string;             // Exact output
    result: "PASS" | "FAIL";
    entries_count: number;
    breaks_count: number;
  };

  // Tamper Detection (REQUIRED)
  tamper_test: {
    command: string;
    output: string;
    result: "FAIL";             // MUST be FAIL (expected behavior)
    mismatch_line: number;
  };

  // Reproduction Command (REQUIRED)
  reproduction: {
    source: string;             // "sentinel_summary.md → Reproduce:"
    command: string;            // Full command including --config
  };

  // Rejection reasons (if REJECTED)
  rejection_reasons?: string[];
}

/**
 * Status Semantics (CRITICAL - Read Carefully):
 *
 * VICTORIOUS = The SYSTEM passed this horseman's check (no issues found)
 * DEFEATED   = The HORSEMAN defeated the system (found an issue)
 *
 * Think of it as: "Did the horseman find a problem?"
 * - VICTORIOUS: No, the system is clean
 * - DEFEATED: Yes, the horseman caught something bad
 *
 * Evidence is ALWAYS required for VICTORIOUS (to prove the check ran).
 * Evidence is ALWAYS required for DEFEATED (to prove what was found).
 */
interface HorsemanCheck {
  status: "VICTORIOUS" | "DEFEATED";
  evidence: Evidence[];         // MUST have length >= 1 for BOTH statuses
}

// Evidence MUST be one of these three types
type Evidence =
  | { type: "json_path"; file: string; path: string; value: string; }
  | { type: "snippet"; file: string; lines: string; content: string; }
  | {
      type: "command";
      fingerprint: {
        cwd: string;              // Working directory when command ran
        command: string;          // Exact command executed
        exit_code: number;        // 0 = success, non-zero = failure
        output_sha256: string;    // SHA-256 hash of full output (case-insensitive hex)
        output_path: string;      // Path to raw output file for BECCA to verify hash
      };
      output_excerpt: string;     // Human-readable excerpt (for report)
    };
```

---

## Validation Rules (BECCA Enforces)

### Rule 1: Evidence Required for ALL Statuses
```
FOR each horseman in report.horsemen:
  ASSERT horseman.evidence.length >= 1
  ELSE → FAIL: EVIDENCE_MISSING

# Why: Both VICTORIOUS and DEFEATED need proof.
# VICTORIOUS proves the check ran and passed.
# DEFEATED proves what issue was found.
```

### Rule 2: Evidence Type Valid
```
FOR each evidence in horseman.evidence:
  ASSERT evidence.type IN ["json_path", "snippet", "command"]
  IF evidence.type == "json_path":
    ASSERT evidence.file != ""
    ASSERT evidence.path != ""
    ASSERT evidence.value != ""
  IF evidence.type == "snippet":
    ASSERT evidence.file != ""
    ASSERT evidence.lines != ""
    ASSERT evidence.content != ""
  IF evidence.type == "command":
    ASSERT evidence.command != ""
    ASSERT evidence.output_excerpt != ""
  ELSE → FAIL: EVIDENCE_INVALID
```

### Rule 3: Timestamp Sanity (Anti-Template Tripwire)
```
manifest_ts = PARSE(evidence_manifest.json → $.timestamp)
report_ts = PARSE(report.timestamp)
diff = ABS(report_ts - manifest_ts)

# Primary check: Report must be within ±24h of manifest
IF diff > 24 HOURS:
  → FAIL: TIMESTAMP_DRIFT (report too far from evidence timestamp)

# Secondary check: Catches templates with hardcoded years
IF report_ts.year != manifest_ts.year AND report_ts.year != CURRENT_YEAR:
  → FAIL: TIMESTAMP_STALE (likely template output)
```

### Rule 4: Trinity Match
```
run_id_sentinel = READ(sentinel_summary.json → $.run_id)
commit_manifest = READ(evidence_manifest.json → $.repo.commit_hash)
hash_sentinel = READ(sentinel_summary.json → $.evidence_hash)

ASSERT report.trinity.run_id == run_id_sentinel
ASSERT report.trinity.commit == commit_manifest
ASSERT report.trinity.evidence_hash == hash_sentinel

IF ANY mismatch:
  → FAIL: TRINITY_MISMATCH
```

### Rule 5: Ledger Verification Present
```
ASSERT report.ledger_verification.command != ""
ASSERT report.ledger_verification.output != ""
ASSERT report.ledger_verification.result IN ["PASS", "FAIL"]
ELSE → FAIL: LEDGER_VERIFICATION_MISSING
```

### Rule 6: Tamper Test Shows Expected Failure
```
ASSERT report.tamper_test.result == "FAIL"  # Must detect tamper
ASSERT report.tamper_test.mismatch_line > 0
ELSE → FAIL: TAMPER_TEST_INVALID
```

### Rule 7: Reproduction Command Present
```
ASSERT report.reproduction.command CONTAINS "--config"
ELSE → FAIL: REPRODUCTION_INCOMPLETE
```

### Rule 8: Schema Version Pin
```
ASSERT report.schema_version == "1.3.0"
ELSE → FAIL: SCHEMA_VERSION_MISMATCH (prevents old/rogue Inspectors)
```

### Rule 9: Receipt Origin for Runtime Claims (Regardless of Status)
```
RUNTIME_CHECKS = ["ledger_verification", "tamper_test", "H5_SilentFailure"]

FOR each check in RUNTIME_CHECKS:
  # Runtime proof is required WHETHER PASS OR FAIL
  # Because runtime proof is how you know it actually ran
  ASSERT at least one evidence item has type == "command"
  ELSE → FAIL: RUNTIME_CLAIM_WITHOUT_COMMAND_OUTPUT

# Why: File quotes don't prove runtime behavior. Only command output does.
# - Ledger integrity (PASS) must include command fingerprint
# - Tamper test (FAIL by design) must include command fingerprint
# - Fail-closed test must include command fingerprint
```

### Rule 10: Command Fingerprint Required (with Re-Verification)
```
FOR each evidence item where type == "command":
  ASSERT evidence.fingerprint EXISTS
  ASSERT evidence.fingerprint.cwd != ""
  ASSERT evidence.fingerprint.command != ""
  ASSERT evidence.fingerprint.exit_code IS INTEGER
  ASSERT evidence.fingerprint.output_sha256 MATCHES /^[A-Fa-f0-9]{64}$/  # Case-insensitive!
  ASSERT evidence.fingerprint.output_path != ""
  ELSE → FAIL: COMMAND_FINGERPRINT_INVALID

# BECCA Re-Verification (REQUIRED, not optional):
# 1. Read file at output_path
# 2. Compute sha256(file_bytes)
# 3. Compare to output_sha256 (case-insensitive)
# 4. If mismatch → FAIL: HASH_VERIFICATION_FAILED (output was tampered)
```

### Rule 11: Tenant Key Cross-Check (Anti-Config-Drift)
```
config_tenant_key = READ(project_config → tenant_key)  # From CLAUDE.md or tap.config.json
ASSERT report.tenant_key_used == config_tenant_key
ELSE → FAIL: TENANT_KEY_MISMATCH (Inspector ran with wrong config)

# Why: Prevents "Inspector ran against wrong project config but still produced receipts"
# Example: Inspector claims tenantId but project uses workspaceId = config drift
```

---

## Command Fingerprint Implementation Guide

**These gotchas will weaken cryptographic provenance if ignored.**

### 1. Hash Raw Bytes, Not Pretty-Printed Text
```python
# CORRECT: Hash exact captured output bytes (including newlines)
import hashlib
raw_output = subprocess.run(cmd, capture_output=True).stdout
output_sha256 = hashlib.sha256(raw_output).hexdigest()

# WRONG: Hash after normalization (loses provenance)
normalized = raw_output.decode().strip()  # DON'T DO THIS
output_sha256 = hashlib.sha256(normalized.encode()).hexdigest()
```

**Best practice:** Redirect output to a file, then hash the file bytes directly.
```bash
command > output.raw 2>&1
sha256sum output.raw  # Use this hash
```

### 2. Redaction Order (Choose One)
| Option | How | Tradeoff |
|--------|-----|----------|
| **A: Hash-then-redact** | Hash full raw output → store hash → redact excerpt separately | Stronger provenance, but raw output must never be stored if contains secrets |
| **B: Redact-then-hash** | Redact secrets first → hash redacted output → store hash | Safer (no secret exposure), but proves "redacted run" not "true run" |

**Recommendation:** Option B for most cases (safety > forensics). Document which you chose.

### 3. CWD Validation (CI-Aware)
On CI systems, `cwd` varies (`/home/runner/work/...` vs local `/projects/sonny`).

```python
# BECCA validator should accept:
# - Exact match, OR
# - Match against allowed CI prefixes

ALLOWED_CWD_PATTERNS = [
    r"^/projects/sonny",          # Local dev
    r"^/home/runner/work/",       # GitHub Actions
    r"^d:\\projects\\sonny",      # Windows local
    r"^C:\\actions\\",            # Windows CI
]

def validate_cwd(cwd):
    return any(re.match(p, cwd) for p in ALLOWED_CWD_PATTERNS)
```

### 4. Command String Exactness
Capture the command exactly as executed. If using shell wrappers:

```typescript
fingerprint: {
  command: "npm test",                    // What you intended
  command_resolved?: "node_modules/.bin/jest --config=...",  // What actually ran (optional)
  cwd: "/projects/sonny",
  exit_code: 0,
  output_sha256: "..."
}
```

The `command_resolved` field is optional but helpful for debugging command expansion issues.

### 5. Newline Consistency
```
Windows: \r\n (CRLF)
Linux/Mac: \n (LF)
```

**Rule:** Hash whatever the OS produces. Don't normalize. The hash is environment-specific, and that's OK—it proves "this exact run on this exact system."

---

## BECCA Validation Function

```python
def validate_inspector_report(report: dict, evidence_dir: str) -> tuple[bool, str]:
    """
    Validate Inspector report against Receipts Mode schema.
    Returns (is_valid, error_message).
    """
    errors = []

    # Rule 1 & 2: Evidence required for ALL statuses (VICTORIOUS and DEFEATED)
    for horseman_name, check in report.get("horsemen", {}).items():
        evidence = check.get("evidence", [])
        status = check.get("status")
        # Evidence required for BOTH statuses
        if len(evidence) < 1:
            errors.append(f"EVIDENCE_MISSING: {horseman_name} ({status}) needs proof")
        for ev in evidence:
            if ev.get("type") not in ["json_path", "snippet", "command"]:
                errors.append(f"EVIDENCE_INVALID: {horseman_name} has invalid evidence type")

    # Rule 3: Timestamp sanity
    from datetime import datetime, timedelta
    try:
        report_ts = datetime.fromisoformat(report["timestamp"].replace("Z", "+00:00"))
        # Check year
        if report_ts.year != datetime.now().year:
            errors.append(f"TIMESTAMP_STALE: Report year {report_ts.year} != current year (template output?)")
    except:
        errors.append("TIMESTAMP_INVALID: Cannot parse report timestamp")

    # Rule 4: Trinity match
    import json
    from pathlib import Path
    evidence_path = Path(evidence_dir)

    try:
        sentinel = json.loads((evidence_path / "sentinel_summary.json").read_text())
        manifest = json.loads((evidence_path / "evidence_manifest.json").read_text())

        trinity = report.get("trinity", {})
        if trinity.get("run_id") != sentinel.get("run_id"):
            errors.append(f"TRINITY_MISMATCH: run_id {trinity.get('run_id')} != {sentinel.get('run_id')}")
        if trinity.get("commit") != manifest.get("repo", {}).get("commit_hash"):
            errors.append("TRINITY_MISMATCH: commit doesn't match evidence_manifest")
        if trinity.get("evidence_hash") != sentinel.get("evidence_hash"):
            errors.append("TRINITY_MISMATCH: evidence_hash doesn't match sentinel_summary")
    except FileNotFoundError as e:
        errors.append(f"EVIDENCE_FILES_MISSING: {e}")

    # Rule 5: Ledger verification
    ledger = report.get("ledger_verification", {})
    if not ledger.get("command") or not ledger.get("output"):
        errors.append("LEDGER_VERIFICATION_MISSING: No command/output provided")

    # Rule 6: Tamper test
    tamper = report.get("tamper_test", {})
    if tamper.get("result") != "FAIL":
        errors.append("TAMPER_TEST_INVALID: Must show FAIL (tamper detected)")

    # Rule 7: Reproduction command
    repro = report.get("reproduction", {})
    if "--config" not in repro.get("command", ""):
        errors.append("REPRODUCTION_INCOMPLETE: Missing --config in reproduction command")

    if errors:
        return False, "\n".join(errors)
    return True, "PASS: All validation rules satisfied"
```

---

## Example Valid Report

```json
{
  "schema_version": "1.3.0",
  "from": "PMX-13",
  "to": "PMX-01",
  "work_id": "ANT-042",
  "timestamp": "2026-02-01T14:30:22Z",
  "tenant_key_used": "tenantId",
  "trinity": {
    "run_id": "RUN-20260201-143022",
    "commit": "abc123def456",
    "evidence_hash": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "all_match": true
  },
  "verdict": "APPROVED",
  "horsemen": {
    "H1_Hallucination": {
      "status": "DEFEATED",
      "evidence": [
        {
          "type": "json_path",
          "file": "sentinel_summary.json",
          "path": "$.evidence_hash",
          "value": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        },
        {
          "type": "command",
          "fingerprint": {
            "cwd": "/projects/sonny",
            "command": "npm test",
            "exit_code": 0,
            "output_sha256": "a1b2c3d4e5f6789012345678901234567890123456789012345678901234abcd",
            "output_path": "tap_exports/test_output.raw"
          },
          "output_excerpt": "Tests: 42 passed, 0 failed"
        }
      ]
    },
    "H2_Amnesia": {
      "status": "DEFEATED",
      "evidence": [
        {
          "type": "snippet",
          "file": "completion_report.md",
          "lines": "12-18",
          "content": "All requirements from original_task.md addressed..."
        }
      ]
    },
    "H3_Drift": {
      "status": "DEFEATED",
      "evidence": [
        {
          "type": "command",
          "command": "git diff --stat",
          "output_excerpt": "2 files changed, 15 insertions(+), 3 deletions(-)"
        }
      ]
    },
    "H4_PrivilegeCreep": {
      "status": "DEFEATED",
      "evidence": [
        {
          "type": "json_path",
          "file": "approval_log.json",
          "path": "$.PATCH_APPROVED",
          "value": "true"
        }
      ]
    },
    "H5_SilentFailure": {
      "status": "VICTORIOUS",
      "evidence": [
        {
          "type": "command",
          "fingerprint": {
            "cwd": "/projects/sonny",
            "command": "verifyLedgerIntegrity(tap_exports/evidence_index.jsonl)",
            "exit_code": 0,
            "output_sha256": "b2c3d4e5f6789012345678901234567890123456789012345678901234abcdef",
            "output_path": "tap_exports/ledger_verify.raw"
          },
          "output_excerpt": "LEDGER INTEGRITY: PASS (247 entries, 0 breaks)"
        }
      ]
    }
  },
  "ledger_verification": {
    "command": "verifyLedgerIntegrity(tap_exports/evidence_index.jsonl)",
    "output": "LEDGER INTEGRITY: PASS (247 entries, 0 breaks)",
    "result": "PASS",
    "entries_count": 247,
    "breaks_count": 0
  },
  "tamper_test": {
    "command": "verifyLedgerIntegrity(tap_exports/evidence_index.tamper.jsonl)",
    "output": "LEDGER INTEGRITY: FAIL (line 42: HASH_MISMATCH)",
    "result": "FAIL",
    "mismatch_line": 42
  },
  "reproduction": {
    "source": "sentinel_summary.md → Reproduce:",
    "command": "npm run tap -- --config tap.config.json --run-id RUN-20260201-143022"
  },
  "rejection_reasons": []
}
```

---

## Example Invalid Report (Would Be Rejected)

```json
{
  "schema_version": "1.0.0",            // ❌ SCHEMA_VERSION_MISMATCH - old version!
  "from": "PMX-13",
  "to": "PMX-01",
  "work_id": "ANT-042",
  "timestamp": "2024-12-19T10:00:00Z",  // ❌ WRONG YEAR - template output!
  "trinity": {
    "run_id": "RUN-PLACEHOLDER",        // ❌ MISMATCH - not from actual file
    "commit": "abc123",
    "evidence_hash": "TODO",            // ❌ MISMATCH - placeholder
    "all_match": false
  },
  "verdict": "APPROVED",                // ❌ Can't be APPROVED with trinity mismatch
  "horsemen": {
    "H1_Hallucination": {
      "status": "DEFEATED",
      "evidence": []                    // ❌ EVIDENCE_MISSING - empty array
    }
    // ... other horsemen also missing evidence
  },
  "ledger_verification": {
    "command": "",                      // ❌ LEDGER_VERIFICATION_MISSING
    "output": "",
    "result": "PASS",
    "entries_count": 0,
    "breaks_count": 0
  },
  "tamper_test": {
    "command": "",
    "output": "",
    "result": "PASS",                   // ❌ TAMPER_TEST_INVALID - should be FAIL
    "mismatch_line": 0
  },
  "reproduction": {
    "source": "",
    "command": "npm run tap"            // ❌ REPRODUCTION_INCOMPLETE - missing --config
  }
}
```

**BECCA rejection message:**
```
INSPECTOR REPORT REJECTED

Errors:
- SCHEMA_VERSION_MISMATCH: Expected 1.1.0, got 1.0.0 (old/rogue Inspector)
- TIMESTAMP_STALE: Report year 2024 != current year (template output?)
- TRINITY_MISMATCH: run_id RUN-PLACEHOLDER != RUN-20260201-143022
- EVIDENCE_MISSING: H1_Hallucination marked DEFEATED but no evidence
- LEDGER_VERIFICATION_MISSING: No command/output provided
- TAMPER_TEST_INVALID: Must show FAIL (tamper detected)
- REPRODUCTION_INCOMPLETE: Missing --config in reproduction command
- RUNTIME_CLAIM_WITHOUT_COMMAND: H5 needs command output, not file quotes

Action: Re-run Inspector with actual evidence collection.
```

---

## Integration with BECCA

### In PMX-01 (BECCA), add this gate:

```python
# After receiving Inspector report
from pmx_shared_inspector_schema import validate_inspector_report

is_valid, error_msg = validate_inspector_report(
    report=inspector_response,
    evidence_dir="tap_exports/"
)

if not is_valid:
    # REJECT - do not accept work
    return {
        "from": "PMX-01",
        "to": "PMX-13",
        "action": "RERUN_REQUIRED",
        "reason": error_msg,
        "instruction": "Collect actual evidence and resubmit. No template outputs."
    }
else:
    # ACCEPT - work is verified
    return {
        "from": "PMX-01",
        "verdict": "WORK_ACCEPTED",
        "inspector_report": inspector_response
    }
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  PMX-SHARED-INSPECTOR-SCHEMA v1.3.0 — RECEIPTS MODE ENFORCER    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SCHEMA VERSION: 1.3.0 (BECCA rejects if mismatch)              │
│                                                                 │
│  VALIDATION RULES (Machine-Enforced by BECCA):                  │
│                                                                 │
│  1. EVIDENCE_MISSING                                            │
│     ALL horsemen need evidence[] length >= 1 (both statuses)    │
│                                                                 │
│  2. EVIDENCE_INVALID                                            │
│     Evidence must be: json_path | snippet | command             │
│                                                                 │
│  3. TIMESTAMP_STALE                                             │
│     Report year must match current year (anti-template)         │
│     Report timestamp must be within ±24h of manifest            │
│                                                                 │
│  4. TRINITY_MISMATCH                                            │
│     run_id + commit + evidence_hash must match source files     │
│                                                                 │
│  5. LEDGER_VERIFICATION_MISSING                                 │
│     Must include command + output for ledger integrity          │
│                                                                 │
│  6. TAMPER_TEST_INVALID                                         │
│     Tamper test must show FAIL (proves detection works)         │
│                                                                 │
│  7. REPRODUCTION_INCOMPLETE                                     │
│     Reproduction command must include --config                  │
│                                                                 │
│  8. SCHEMA_VERSION_MISMATCH                                     │
│     report.schema_version must equal "1.3.0"                    │
│                                                                 │
│  9. RUNTIME_CLAIM_WITHOUT_COMMAND                               │
│     Runtime checks (H5, ledger, tamper) need command_output     │
│     File quotes don't prove runtime behavior                    │
│                                                                 │
│  10. COMMAND_FINGERPRINT_INVALID                                │
│      Command evidence must include fingerprint:                 │
│      cwd, command, exit_code, output_sha256, output_path        │
│      Makes command evidence tamper-evident + re-verifiable      │
│                                                                 │
│  11. TENANT_KEY_MISMATCH                                        │
│      report.tenant_key_used must match project config           │
│      Prevents Inspector running with wrong config               │
│                                                                 │
│  ANY FAILURE → REPORT REJECTED → INSPECTOR MUST RERUN           │
│                                                                 │
│  MOTTO: "Templates don't pass. Hashes don't lie."               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.3.0] 2026-02-01
- **UNIVERSAL PORTABILITY**: Schema now portable across all projects
- **TENANT KEY CROSS-CHECK**: New `tenant_key_used` field + Rule 11 validation
- Evidence required for BOTH statuses (VICTORIOUS and DEFEATED need proof)
- `output_path` field required in command fingerprints for hash re-verification
- Smarter timestamp validation: ±24h from manifest (not just year check)
- Case-insensitive hex regex for output_sha256
- BECCA reads output_path, recomputes SHA-256, compares to claim
- All version references synchronized to 1.3.0

### [1.2.1] 2026-02-01
- **IMPLEMENTATION GUIDE**: Added gotcha-prevention documentation
- Hash raw bytes, not pretty-printed text
- Redaction order options (hash-then-redact vs redact-then-hash)
- CI-aware cwd validation patterns
- Command string exactness guidance
- Newline consistency rules

### [1.2.0] 2026-02-01
- **COMMAND FINGERPRINT**: Command evidence now includes tamper-evident fingerprint
- Fingerprint includes: cwd, command, exit_code, output_sha256
- If output is "cleaned", SHA-256 mismatch reveals tampering
- Added Rule 10: COMMAND_FINGERPRINT_INVALID
- Updated Evidence type to require fingerprint for command evidence

### [1.1.0] 2026-02-01
- **SCHEMA VERSION PIN**: BECCA rejects reports with wrong schema_version
- **RECEIPT ORIGIN CHECK**: Runtime claims (H5, ledger, tamper) require command_output
- File quotes don't prove runtime behavior — only command output does
- Added schema_version field to JSON schema
- Added Rules 8 and 9 to validation

### [1.0.0] 2026-02-01
- Initial release
- JSON schema for INSPECTOR_REPORT
- 7 validation rules defined
- Anti-template tripwires (timestamp, trinity match)
- BECCA validation function
- Example valid and invalid reports
