const fs = require('fs');
const path = 'test-results/results.json';

function walkSuite(suite, rows = []) {
  for (const spec of suite.specs || []) {
    for (const test of spec.tests || []) {
      const badResults = (test.results || []).filter(r => r.status !== 'passed' && r.status !== 'skipped');
      const finalStatus = test.outcome || test.status;
      if (finalStatus && finalStatus !== 'expected' && finalStatus !== 'skipped') {
        rows.push({
          title: spec.title,
          file: spec.file,
          line: spec.line,
          project: test.projectName,
          status: finalStatus,
          error: badResults.map(r => (r.error && (r.error.message || r.error.stack)) || '').filter(Boolean).join('\n---\n')
        });
      }
    }
  }
  for (const child of suite.suites || []) walkSuite(child, rows);
  return rows;
}

let body = '';
if (!fs.existsSync(path)) {
  body = 'Playwright test finished, but JSON report was not found. Please check the GitHub Actions log and uploaded artifact.';
} else {
  const report = JSON.parse(fs.readFileSync(path, 'utf8'));
  const failed = walkSuite(report);
  const stats = report.stats || {};
  body += `Playwright CI Report\n\n`;
  body += `Total: ${stats.expected ?? 'N/A'} passed, ${stats.unexpected ?? 0} failed, ${stats.flaky ?? 0} flaky, ${stats.skipped ?? 0} skipped\n`;
  body += `Status: ${(stats.unexpected || 0) > 0 ? 'FAILED' : 'PASSED'}\n\n`;
  if (failed.length) {
    body += 'Failed tests:\n';
    failed.forEach((f, i) => {
      body += `\n${i + 1}. ${f.title}\n`;
      body += `   File: ${f.file}:${f.line || ''}\n`;
      body += `   Project: ${f.project || ''}\n`;
      body += `   Status: ${f.status}\n`;
      if (f.error) body += `   Error: ${f.error.split('\n').slice(0, 6).join('\n          ')}\n`;
    });
  } else {
    body += 'No failed tests found.\n';
  }
  body += '\nFull HTML report and JUnit XML are attached/uploaded in GitHub Actions artifacts.\n';
}
fs.writeFileSync('test-results/email-summary.txt', body);
console.log(body);
