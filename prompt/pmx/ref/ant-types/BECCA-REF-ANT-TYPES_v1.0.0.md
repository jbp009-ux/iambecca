# BECCA-REF-ANT-TYPES v1.0.0
## 13 Canonical Ant Classifications

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Canonical ant type reference for report headers
**Load:** On demand via `LOAD: BECCA-REF-ANT-TYPES`
**Source:** Extracted from CODER_ANT_VSCODE_v1.3.9

---

## Overview

Select your classification based on the nature of your task. This determines your Identity Card header and completion report format.

---

## The 13 Canonical Types

| Emoji | Type (Header Value) | Risk Level | Use When |
|-------|---------------------|------------|----------|
| 🔥 | Fire | CRITICAL | Security rules, auth, permissions, firestore.rules |
| 🛠️ | Carpenter | STANDARD | Building features, UI components, standard dev work |
| 🌿 | Leafcutter | STANDARD | Documentation, markdown, content updates |
| 🎯 | Scout | LOW | Discovery, investigation, audits, read-only tasks |
| 🏗️ | Builder | STANDARD | Infrastructure, scaffolding, project setup |
| 🔬 | Researcher | LOW | Analysis, experimentation, prototyping |
| 🛡️ | Guardian | CRITICAL | Security review, verification, protection |
| 🧹 | Cleaner | LOW | Refactoring, cleanup, tech debt |
| 📦 | Carrier | STANDARD | Migration, data movement, imports/exports |
| 🔧 | Mechanic | STANDARD | Bug fixes, repairs, patches |
| 📝 | Scribe | LOW | Logging, reporting, record-keeping |
| 👁️ | Watcher | LOW | Monitoring, observability, alerts |
| 🐛 | Debugger | LOW | Diagnosis (reproduce, evidence, TEST REPORT) |

**Default:** If uncertain, use 🛠️ Carpenter (STANDARD risk).

---

## Important Notes

### These are THE canonical types
Ghost Archivist will validate your report header against this list. Using non-canonical types (like "Designer" or "Coder") may cause indexing issues.

### Type column = exact header value
The Type column shows the exact value to use in your header — do NOT add "Ant" suffix.

### "Coder Ant" is NOT a valid header type
"Coder Ant" is your internal identity (what you are), but it is NOT a valid header type. Your completion report header MUST use one of the 13 canonical types above based on what your task actually did.

---

## Type Selection Guide

| What You Did | Use This Type |
|--------------|---------------|
| Fixed a bug | 🔧 Mechanic |
| Built a new component | 🛠️ Carpenter |
| Refactored/cleaned up code | 🧹 Cleaner |
| Built new scaffolding/infrastructure | 🏗️ Builder |
| Diagnosed without fixing | 🐛 Debugger |
| Updated documentation | 🌿 Leafcutter |
| Investigated/audited code | 🎯 Scout |
| Changed security rules | 🔥 Fire |
| Reviewed security posture | 🛡️ Guardian |
| Migrated data | 📦 Carrier |
| Set up monitoring | 👁️ Watcher |
| Wrote reports/logs | 📝 Scribe |
| Prototyped/experimented | 🔬 Researcher |

---

## Risk Levels

### CRITICAL
Security-sensitive work. Extra scrutiny required. Requires explicit approval for all changes.
- 🔥 Fire (security rules)
- 🛡️ Guardian (security review)

### STANDARD
Normal development work. Standard approval flow.
- 🛠️ Carpenter (features)
- 🌿 Leafcutter (docs)
- 🏗️ Builder (infrastructure)
- 📦 Carrier (migration)
- 🔧 Mechanic (bug fixes)

### LOW
Read-only or low-impact work. Minimal risk.
- 🎯 Scout (investigation)
- 🔬 Researcher (analysis)
- 🧹 Cleaner (refactoring)
- 📝 Scribe (logging)
- 👁️ Watcher (monitoring)
- 🐛 Debugger (diagnosis)

---

## Debugger Ant Note

🐛 Debugger is the 13th canonical type, added in v1.3.7.

Debugger Ants diagnose and produce TEST REPORTs but do NOT fix code — they hand off to the appropriate owner Ant (Carpenter/Mechanic/etc).

See `BECCA-REF-DEBUGGER-LAW` for full rules.

---

## Report Header Format

```markdown
### ANT-{N} {EMOJI} {Type} | PH{X} | {primary_file}

**Task:** {one-line task description}
**Status:** ✅ COMPLETE | ❌ BLOCKED | ⚠️ PARTIAL
```

### Example Headers

```markdown
### ANT-182 🛠️ Carpenter | PH9 | ChatTab.jsx
### ANT-183 🔧 Mechanic | PH9 | useOrders.ts
### ANT-184 🔥 Fire | PH10 | firestore.rules
### ANT-185 🐛 Debugger | PH10 | CartDrawer.tsx
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  BECCA-REF-ANT-TYPES v1.0.0 — QUICK REFERENCE                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  13 CANONICAL TYPES:                                            │
│                                                                 │
│  CRITICAL RISK:                                                 │
│  🔥 Fire (security) | 🛡️ Guardian (review)                      │
│                                                                 │
│  STANDARD RISK:                                                 │
│  🛠️ Carpenter (features) | 🌿 Leafcutter (docs)                 │
│  🏗️ Builder (infra) | 📦 Carrier (migration)                    │
│  🔧 Mechanic (bugs)                                             │
│                                                                 │
│  LOW RISK:                                                      │
│  🎯 Scout (audit) | 🔬 Researcher (analysis)                    │
│  🧹 Cleaner (refactor) | 📝 Scribe (logging)                    │
│  👁️ Watcher (monitor) | 🐛 Debugger (diagnose)                  │
│                                                                 │
│  DEFAULT: 🛠️ Carpenter                                          │
│                                                                 │
│  NEVER USE: "Coder", "Designer", "Developer"                    │
│  (Not canonical types)                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from CODER_ANT_VSCODE_v1.3.9
- 13 canonical types documented
- Type selection guide
- Risk level explanations
- Report header format
