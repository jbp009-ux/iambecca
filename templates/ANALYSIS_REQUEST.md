# ANALYSIS_REQUEST Template
## For Prompt Maker Chain (PM-01 to PM-05)

**Created by:** PM-00 (Prompt Architect)
**Consumed by:** PM-01 (first), then passed through chain

---

## Template

```markdown
# ANALYSIS_REQUEST

packet_id: AR_<YYYYMMDD>_<HHMMSS>_<seq>
created_by: PM-00 (Prompt Architect)
created_at: <ISO timestamp>

---

## TARGET PROMPT

| Attribute | Value |
|-----------|-------|
| Name | <prompt name> |
| Path | <full path to prompt file> |
| Version | <current version> |
| Lines | <line count> |

---

## PROMPT CONTENT

```
<paste full prompt content here>
```

---

## ANALYSIS CHAIN STATUS

| Step | Prompt Maker | Focus | Status |
|------|--------------|-------|--------|
| 1 | PM-01 Morpheus | Hallucination | PENDING |
| 2 | PM-02 Architect | Amnesia | PENDING |
| 3 | PM-03 Sentinel | Drift | PENDING |
| 4 | PM-04 Keymaker | Privilege | PENDING |
| 5 | PM-05 Analyst | Consolidation | PENDING |

---

## ROUTING

| Attribute | Value |
|-----------|-------|
| Current Location | inbox/prompt-maker/ |
| Next | PM-01 (morpheus activate) |
| Final Output | outbox/prompt-maker/UPGRADE_PACKET_<id>.md |
| Returns To | PM-00 (Prompt Architect) |

---

🔑 ANALYSIS_REQUEST CREATED — Route to PM-01
```

---

## How PM-00 Creates This

1. User activates PM-00: "prompt architect activate"
2. User provides target prompt path
3. PM-00 reads the prompt
4. PM-00 creates this packet with prompt content
5. PM-00 saves to `inbox/prompt-maker/ANALYSIS_REQUEST_<id>.md`
6. PM-00 tells user: "Route to PM-01 (morpheus activate)"

---

## How Each PM Updates This

Each PM adds their findings section and updates status:

```markdown
## PM-01 HALLUCINATION_FINDINGS

### Summary
| Metric | Count |
|--------|-------|
| Claims Checked | X |
| ✅ Proven | X |
| 🔴 Unproven | X |

### Details
<findings table>

---

## ANALYSIS CHAIN STATUS (updated)

| Step | Prompt Maker | Status |
|------|--------------|--------|
| 1 | PM-01 Morpheus | ✅ COMPLETE |
| 2 | PM-02 Architect | PENDING |
...

NEXT: PM-02 (architect activate)
```

---

## File Naming

```
inbox/prompt-maker/ANALYSIS_REQUEST_<YYYYMMDD>_<HHMMSS>_001.md
```

Example: `ANALYSIS_REQUEST_20260204_143022_001.md`
