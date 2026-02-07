# PMX-SHARED-OUTPUTS v1.0.0
## Packet Formats for Colony OS

**Version:** 1.0.0
**Date:** 2026-01-30
**Purpose:** Standard output formats for all roles
**Scope:** Identical across all projects

---

## Packet Types

| Packet | When to Use |
|--------|-------------|
| **REPORT PACKET** | Findings, analysis, recommendations |
| **PATCH PACKET** | Code changes with diffs |
| **VERIFY PACKET** | Test results, verification evidence |
| **HANDOFF PACKET** | Passing work to another role |
| **STOP PACKET** | Halting with blocker details |

---

## REPORT PACKET

Use for: Analysis, findings, recommendations, bug investigations

```markdown
# REPORT PACKET

## Objective
{What was being investigated/analyzed}

## Evidence
| Type | Source | Finding |
|------|--------|---------|
| {file/log/command} | {path/command} | {what was found} |

## Findings
### Finding 1: {Title}
{Description with evidence links}

### Finding 2: {Title}
{Description with evidence links}

## Risks
| Risk | Severity | Mitigation |
|------|----------|------------|
| {risk} | 🔴 High / 🟠 Medium / 🟡 Low | {how to mitigate} |

## Recommendation
{What should happen next}

## Next Action
- [ ] {Action item} — Requires: {approval if any}
```

---

## PATCH PACKET

Use for: Code changes, file modifications

```markdown
# PATCH PACKET

## Objective
{What change was made and why}

## Files Changed
| File | Change Type | Lines |
|------|-------------|-------|
| {path} | Modified / Created / Deleted | {line range} |

## Patch Summary
{Brief description of the changes}

## Diff
### {filename}
```diff
- {old line}
+ {new line}
```

## Rollback Plan
{How to undo this change if needed}

## Risks
| Risk | Mitigation |
|------|------------|
| {risk} | {mitigation} |

## Required Approvals
- [ ] PATCH APPROVED (to apply changes)
- [ ] {Other approvals if needed}
```

---

## VERIFY PACKET

Use for: Test results, behavior confirmation

```markdown
# VERIFY PACKET

## Objective
{What was being verified}

## Tests Run
| Test | Result | Output |
|------|--------|--------|
| {test name} | ✅ Pass / ❌ Fail | {brief output} |

## Test Output
```
{exact test output}
```

## Manual Checks
| Check | Result | Evidence |
|-------|--------|----------|
| {what was checked} | ✅ / ❌ | {screenshot/log link} |

## Result
{Overall verification status: PASSED / FAILED / PARTIAL}

## Remaining Issues
| Issue | Severity | Notes |
|-------|----------|-------|
| {issue} | {severity} | {details} |

## Conclusion
{Ready for next state / Needs more work / STOP required}
```

---

## HANDOFF PACKET

Use for: Passing work between roles

```markdown
# HANDOFF PACKET

## From
Role: PMX-{##} ({role name})
State: {current state}

## To
Role: PMX-{##} ({role name})
Reason: {why handoff is needed}

## Context
{Everything the next role needs to know}

## Work Completed
- [x] {completed item}
- [x] {completed item}

## Work Remaining
- [ ] {remaining item}
- [ ] {remaining item}

## Key Files
| File | Relevance |
|------|-----------|
| {path} | {why it matters} |

## Warnings
{Any pheromones, blockers, or risks to be aware of}

## Suggested First Step
{What the next role should do first}
```

---

## STOP PACKET

Use for: Halting with blocker details

```markdown
# STOP PACKET

## Blocker
{One sentence description of what's blocking}

## Type
{Permission | Evidence | Safety | Scope}

## Evidence
{What you found that caused the stop}

## Attempted Solutions
| Approach | Result |
|----------|--------|
| {what was tried} | {why it didn't work} |

## To Continue
{Exactly what's needed from Guardian to proceed}

## Options
1. {Option A} — {consequence}
2. {Option B} — {consequence}
3. Abandon this direction — {consequence}

## Risk of Continuing Without Resolution
{What could go wrong if we push through}
```

---

## State Line + Packet Combination

Every response should have:
1. State line (first line)
2. Appropriate packet (based on state)

```markdown
STATE: DISCOVERY

# REPORT PACKET
...

STATE: PATCH

# PATCH PACKET
...

STATE: VERIFY

# VERIFY PACKET
...

STATE: STOP

# STOP PACKET
...
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  PMX-SHARED-OUTPUTS v1.0.0 — QUICK REFERENCE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PACKET TYPES:                                                  │
│  REPORT  — Findings, analysis, recommendations                  │
│  PATCH   — Code changes with diffs                              │
│  VERIFY  — Test results, confirmation                           │
│  HANDOFF — Passing to another role                              │
│  STOP    — Halting with blocker                                 │
│                                                                 │
│  STRUCTURE:                                                     │
│  STATE: {state}                                                 │
│  # {PACKET TYPE} PACKET                                         │
│  ## Objective                                                   │
│  ## Evidence                                                    │
│  ## {Type-specific sections}                                    │
│  ## Next Action                                                 │
│                                                                 │
│  ALWAYS INCLUDE:                                                │
│  • Objective (what was done)                                    │
│  • Evidence (proof it was done)                                 │
│  • Risks (what could go wrong)                                  │
│  • Next action (what happens next)                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-01-30
- Initial release
- 5 packet types defined
- Templates for each packet
- State + packet combination rule
