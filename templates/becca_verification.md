# BECCA VERIFICATION TEMPLATE v1.0.0

---

## VERIFICATION REPORT

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
TARGET: <target_name>
RUN_ID: <run_id>

---

## VERIFICATION SUMMARY

| Attribute | Value |
|-----------|-------|
| Ant ID | <ANT-ID> |
| Ant Role | <Role Display Name> |
| Task | <brief task description> |
| Review Scope | <CODE|SECURITY|FIREBASE|INSPECTION|RELEASE|DATA|UI|OTHER> |
| Verdict | <VERIFIED|REJECTED|CONDITIONAL> |

---

## ARTIFACTS REVIEWED

| Artifact | Path | Status |
|----------|------|--------|
| Ant Report | outbox/ants/ANT_REPORT_<ANT-ID>.md | ✅ Reviewed |
| Code Changes | <paths> | ✅ Reviewed |
| Build Output | <path or inline> | ✅ Verified |

---

## CHECKLIST RESULTS

### Scope-Specific Checks

| Check | Status | Notes |
|-------|--------|-------|
| Changes match task requirements | ✅ | |
| No unintended side effects | ✅ | |
| Build passes | ✅ | |
| Evidence is verifiable | ✅ | |
| Doctrine compliance | ✅ | |

### General Quality Checks

| Check | Status | Notes |
|-------|--------|-------|
| Ant Report complete | ✅ | |
| Evidence links valid | ✅ | |
| Changes traceable | ✅ | |

---

## EVIDENCE VERIFICATION

| Claim from Ant | Verification Method | Result |
|----------------|---------------------|--------|
| <claim 1> | <how verified> | ✅ PASS |
| <claim 2> | <how verified> | ✅ PASS |

---

## ISSUES FOUND (if any)

| Issue | Severity | Resolution |
|-------|----------|------------|
| <none or description> | <LOW|MEDIUM|HIGH|CRITICAL> | <action taken or required> |

---

## VERDICT

**<VERIFIED|REJECTED|CONDITIONAL>**

<Explanation of verdict>

---

## SCORE (output to audit/becca_scores/BS_<ANT-ID>.md)

See: audit/becca_scores/BS_<ANT-ID>.md

---

## OUTPUTS CREATED

- audit/becca_verifications/BV_<ANT-ID>.md (this file)
- audit/becca_scores/BS_<ANT-ID>.md

---

🔑 <CERTIFIED|REJECTED>: <ANT-ID> work <verified|rejected>

---

NEXT: <Trinity to proceed with batch closure | Ant to address issues>
```

---

## SCORE FILE TEMPLATE

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

## SCORING RUBRIC

### Correctness (30%)
- 5: Perfect implementation, no errors
- 4: Minor issues, easily fixed
- 3: Some issues requiring attention
- 2: Significant issues
- 1: Fundamentally incorrect

### Completeness (25%)
- 5: All requirements met, nothing missing
- 4: Nearly complete, minor omissions
- 3: Most requirements met
- 2: Significant gaps
- 1: Incomplete work

### Evidence Quality (20%)
- 5: Verifiable, comprehensive evidence
- 4: Good evidence, minor gaps
- 3: Adequate evidence
- 2: Weak evidence
- 1: Claims without proof

### Doctrine Compliance (15%)
- 5: Perfect adherence to all doctrines
- 4: Minor deviations
- 3: Some deviations
- 2: Significant violations
- 1: Ignored doctrines

### Efficiency (10%)
- 5: Optimal approach, no waste
- 4: Efficient, minor improvements possible
- 3: Acceptable efficiency
- 2: Inefficient approach
- 1: Wasteful implementation

---

## NOTES

<Additional context for score>

---

## HISTORICAL CONTEXT (for Architect ingestion)

| Metric | Value |
|--------|-------|
| Ant Role | <role> |
| Task Type | <CODE|SECURITY|FIREBASE|etc.> |
| Halt Count | <0|1|2|...> |
| Reattempt Count | <0|1|2|...> |
| Review Scope | <scope> |
| Final Score | <X.XX> |

---

🔑 SCORED: <ANT-ID> = <X.XX>/5.00
```

---

## EXAMPLE: Verification Report for ANT-003

```markdown
# BECCA VERIFICATION REPORT

verification_id: BV_ANT-003
run_id: run_TEST002_halt-debug_2026-02-03_001
target_name: "IAMBECCA | TEST | INTEGRATION | halt-debug | MORPHEUS"

reviewed_ant_id: ANT-003
reviewed_ant_role: Neo (ANT-CODER)
review_scope: CODE

---

## I_AM_STATE: IMPLEMENT

ROLE: Source (BECCA)
ACTION: Verification of ANT-003 work
TARGET: IAMBECCA | TEST | INTEGRATION | halt-debug | MORPHEUS
RUN_ID: run_TEST002_halt-debug_2026-02-03_001

---

## VERIFICATION SUMMARY

| Attribute | Value |
|-----------|-------|
| Ant ID | ANT-003 |
| Ant Role | Neo (ANT-CODER) |
| Task | Create VoiceSettingsPanel with voiceStorage module |
| Review Scope | CODE |
| Verdict | VERIFIED |

---

## ARTIFACTS REVIEWED

| Artifact | Path | Status |
|----------|------|--------|
| Ant Report | outbox/ants/ANT_REPORT_ANT-003.md | ✅ Reviewed |
| New Module | frontend/src/lib/voiceStorage.ts | ✅ Reviewed |
| Component | frontend/src/components/settings/VoiceSettingsPanel.tsx | ✅ Reviewed |
| Build Output | npm run build - exit 0 | ✅ Verified |

---

## CHECKLIST RESULTS

### Code-Specific Checks

| Check | Status | Notes |
|-------|--------|-------|
| Changes match task requirements | ✅ | voiceStorage created, VoiceSettingsPanel completed |
| No unintended side effects | ✅ | Isolated changes, no regressions |
| Build passes | ✅ | npm run build - exit 0 |
| Evidence is verifiable | ✅ | File paths exist, build output confirmed |
| Doctrine compliance | ✅ | Followed Morpheus instructions exactly |

---

## EVIDENCE VERIFICATION

| Claim from Ant | Verification Method | Result |
|----------------|---------------------|--------|
| voiceStorage.ts created | ls frontend/src/lib/voiceStorage.ts | ✅ PASS |
| Both functions exported | grep export in file | ✅ PASS |
| Build passes | npm run build | ✅ PASS |
| TS2307 resolved | No error in build output | ✅ PASS |

---

## ISSUES FOUND

| Issue | Severity | Resolution |
|-------|----------|------------|
| None | - | - |

---

## VERDICT

**VERIFIED**

ANT-003 successfully completed the task after halt and reattempt. The voiceStorage module
was created following Morpheus instructions exactly. The build passes and all evidence
is verifiable. The halt chain was properly exercised.

---

🔑 CERTIFIED: ANT-003 work verified

---

NEXT: Trinity to proceed with batch closure
```

---

## EXAMPLE: Score File for ANT-003

```markdown
# BECCA SCORE

score_id: BS_ANT-003
verification_id: BV_ANT-003
run_id: run_TEST002_halt-debug_2026-02-03_001

ant_id: ANT-003
ant_role: Neo (ANT-CODER)
task_id: create-voice-settings-panel

---

## SCORE BREAKDOWN

| Dimension | Score (1-5) | Weight | Weighted |
|-----------|-------------|--------|----------|
| Correctness | 5 | 0.30 | 1.50 |
| Completeness | 5 | 0.25 | 1.25 |
| Evidence Quality | 5 | 0.20 | 1.00 |
| Doctrine Compliance | 5 | 0.15 | 0.75 |
| Efficiency | 4 | 0.10 | 0.40 |

**TOTAL SCORE: 4.90/5.00**

---

## NOTES

- Efficiency slightly reduced due to initial halt (module not pre-checked)
- Excellent recovery after debugger guidance
- All other dimensions perfect

---

## HISTORICAL CONTEXT

| Metric | Value |
|--------|-------|
| Ant Role | Neo (ANT-CODER) |
| Task Type | CODE |
| Halt Count | 1 |
| Reattempt Count | 1 |
| Review Scope | CODE |
| Final Score | 4.90 |

---

🔑 SCORED: ANT-003 = 4.90/5.00
```
