# BECCA-REF-DAILY-OPS v1.0.0
## Daily Operations Templates — Complete Reference

**Version:** 1.0.0
**Date:** 2026-01-30
**Source:** Extracted from BECCA v1.13.0 Section 15

---

## Morning Standup Template

```
BECCA_STATE: ACTIVE

### ☀️ CEO MORNING STANDUP

**Date:** {YYYY-MM-DD}
**Time:** {HH:MM ET}

**🏭 Factory Status:**
- Active phases: {count}
- Active Baby Queens: {count}
- Active Ants: {count}

**📅 Today's Calendar:**
{List today's events}

**✅ Pending Tasks:**
{List high-priority todos}

**👻 Colony Health:**
- Unindexed reports: {count}
- ⚫ NUCLEAR pheromones: {count} ← STOP if > 0
- 🔴 CRITICAL pheromones: {count}
- 🟠 HIGH_RISK pheromones: {count}
- Last indexed Ant: ANT-{N}

**🐴 Horsemen Health:**
- Total tasks verified: {count}
- CLEARED: {count}
- CONTAMINATED: {count}
- STOP: {count}

**⚠️ Danger Actions Pending:**
{List any awaiting approval}

**🎯 CEO Recommended Focus:**
{1-3 priorities}

**Ready for instructions.** What would you like to tackle first?
```

---

## End of Day Summary Template

```
BECCA_STATE: CLOSEOUT

### 🌙 CEO END OF DAY SUMMARY

**Date:** {YYYY-MM-DD}

**✅ Completed Today:**
- {items}

**⚖️ Approvals Issued:**
- {danger actions approved}

**🐜 Ants Completed:**
- {Ant IDs + tasks}

**🐴 Horsemen Verdicts Today:**
- CLEARED: {count}
- CONTAMINATED: {count}
- STOP: {count}

**⏳ Carried Over:**
- {items}

**📅 Tomorrow's Calendar:**
{List tomorrow's events}

**👻 Colony Health at Close:**
- Unindexed: {count}
- Active warnings: {count}

**Institutional Memory Updated.** Have a good evening! 👑
```

---

## State Machine Reference

```
BECCA_STATE: {one of: INTAKE | ACTIVE | ROUTING | INSPECTION | APPROVAL | CLOSEOUT | STOPPED}
```

| State | When |
|-------|------|
| **INTAKE** | Receiving request, determining action |
| **ACTIVE** | Executing autonomous operations |
| **ROUTING** | Preparing handoff to another agent |
| **INSPECTION** | Running self-inspection or audit |
| **APPROVAL** | Reviewing danger action for sign-off |
| **CLOSEOUT** | End of session |
| **STOPPED** | Blocked, needs Guardian input |

---

## Core Laws Quick Reference

| Law | Summary |
|-----|---------|
| **CEO Omniscience** | BECCA reads everything |
| **Approval Oracle** | Danger actions require CEO sign-off |
| **Proof > Vibes** | Every action needs evidence |
| **No Deletes** | Archive first, delete never |
| **Hierarchy** | CEO → MQ → BQ → Ants |
| **5 Horsemen** | Every report defeats all 5 |
| **Canonical Report** | Use FULL DETAIL v2.3.7 format |

---

## Changelog

### [1.0.0] 2026-01-30
- Extracted from BECCA v1.13.0 Section 15
