/**
 * IAMBecca Activation Test Suite
 * TASK-001: Validates role activation patterns
 * ANT-001 (Neo) | Run: run_TEST001_iambecca-test-run_2026-02-02_001
 */

const fs = require('fs');
const path = require('path');

const ROLES_DIR = path.join(__dirname, '..', 'roles');
const SHARED_DIR = path.join(__dirname, '..', 'shared');

// Expected role files (IM-01 through IM-13)
const EXPECTED_ROLES = [
  'IM-01_SOURCE_BECCA.md',
  'IM-02_ORACLE_MQ.md',
  'IM-03_TRINITY_BQ.md',
  'IM-04_TRAINMAN_DISTRIBUTOR.md',
  'IM-05_NEO_ANT-CODER.md',
  'IM-06_MORPHEUS_ANT-DEBUGGER.md',
  'IM-07_TANK_ANT-TEST.md',
  'IM-08_SERAPH_ANT-SECURITY.md',
  'IM-09_LINK_ANT-FIREBASE.md',
  'IM-10_NIOBE_ANT-UI.md',
  'IM-11_APOC_ANT-DATA.md',
  'IM-12_GHOST-TWINS_ANT-REVIEW.md',
  'IM-13_SENTINELS_HORSEMEN.md'
];

// Expected shared modules
const EXPECTED_SHARED = [
  'IAMBECCA-EVIDENCE.md',
  'IAMBECCA-GATES.md',
  'IAMBECCA-OUTPUTS.md'
];

// Test results collector
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function test(name, fn) {
  try {
    const result = fn();
    if (result.pass) {
      results.passed++;
      results.tests.push({ name, status: 'PASS', details: result.details });
      console.log(`  [PASS] ${name}`);
    } else {
      results.failed++;
      results.tests.push({ name, status: 'FAIL', details: result.details });
      console.log(`  [FAIL] ${name}: ${result.details}`);
    }
  } catch (err) {
    results.failed++;
    results.tests.push({ name, status: 'ERROR', details: err.message });
    console.log(`  [ERROR] ${name}: ${err.message}`);
  }
}

// =============================================================================
// TEST SUITE 1: Role File Existence
// =============================================================================
console.log('\n--- TEST SUITE 1: Role File Existence ---');

EXPECTED_ROLES.forEach(role => {
  test(`Role exists: ${role}`, () => {
    const filePath = path.join(ROLES_DIR, role);
    const exists = fs.existsSync(filePath);
    return { pass: exists, details: exists ? 'File found' : 'File missing' };
  });
});

// =============================================================================
// TEST SUITE 2: Shared Module Existence
// =============================================================================
console.log('\n--- TEST SUITE 2: Shared Module Existence ---');

EXPECTED_SHARED.forEach(mod => {
  test(`Shared module exists: ${mod}`, () => {
    const filePath = path.join(SHARED_DIR, mod);
    const exists = fs.existsSync(filePath);
    return { pass: exists, details: exists ? 'File found' : 'File missing' };
  });
});

// =============================================================================
// TEST SUITE 3: I_AM_STATE Header Validation
// =============================================================================
console.log('\n--- TEST SUITE 3: I_AM_STATE Header Validation ---');

EXPECTED_ROLES.forEach(role => {
  test(`I_AM_STATE header in: ${role}`, () => {
    const filePath = path.join(ROLES_DIR, role);
    if (!fs.existsSync(filePath)) {
      return { pass: false, details: 'File missing, cannot check header' };
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const hasHeader = content.includes('I_AM_STATE');
    return { pass: hasHeader, details: hasHeader ? 'Header found' : 'Header missing' };
  });
});

// =============================================================================
// TEST SUITE 4: Shared Module References in Roles
// =============================================================================
console.log('\n--- TEST SUITE 4: Shared Module References ---');

// Check if key roles reference shared modules
const KEY_ROLES = ['IM-01_SOURCE_BECCA.md', 'IM-02_ORACLE_MQ.md', 'IM-03_TRINITY_BQ.md'];
const EXPECTED_REFS = ['GATES', 'OUTPUTS', 'EVIDENCE'];

KEY_ROLES.forEach(role => {
  test(`Shared modules referenced in: ${role}`, () => {
    const filePath = path.join(ROLES_DIR, role);
    if (!fs.existsSync(filePath)) {
      return { pass: false, details: 'File missing' };
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const foundRefs = EXPECTED_REFS.filter(ref => content.includes(ref));
    const allFound = foundRefs.length === EXPECTED_REFS.length;
    return {
      pass: allFound,
      details: allFound
        ? 'All modules referenced'
        : `Missing refs: ${EXPECTED_REFS.filter(r => !foundRefs.includes(r)).join(', ')}`
    };
  });
});

// =============================================================================
// SUMMARY
// =============================================================================
console.log('\n===========================================');
console.log('ACTIVATION TEST SUMMARY');
console.log('===========================================');
console.log(`Total Tests: ${results.passed + results.failed}`);
console.log(`Passed: ${results.passed}`);
console.log(`Failed: ${results.failed}`);
console.log(`Result: ${results.failed === 0 ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
console.log('===========================================\n');

// Exit with appropriate code
process.exit(results.failed > 0 ? 1 : 0);
