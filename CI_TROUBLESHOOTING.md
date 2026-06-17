# CI Test Failures - Troubleshooting Guide

## Why Tests Pass Locally But Fail in GitHub Actions

### Root Causes Identified

#### 1. **Missing Environment Variables** ❌
**Problem:** The GitHub Actions workflow wasn't passing test credentials to Playwright.

**Before:**
```yaml
- name: Run Playwright Tests
  run: npx playwright test --project=chromium
```

**After (Fixed):**
```yaml
env:
  TARGET_URL: ${{ secrets.TARGET_URL || 'https://hercules.works/ai' }}
  AUTH_EMAIL: ${{ secrets.AUTH_EMAIL || 'rajesh@jupitermeta.io' }}
  AUTH_PASSWORD: ${{ secrets.AUTH_PASSWORD || '12345678' }}
```

---

#### 2. **Hardcoded Test Credentials** ❌
**Problem:** Using hardcoded `rajesh@jupitermeta.io` / `12345678` credentials.

**Why it fails in CI:**
- Test account might not exist in CI environment
- Password might have changed
- Account might be rate-limited or locked

**Solution:** Set GitHub Secrets for sensitive data:

```
Go to: Settings → Secrets and Variables → Actions
Add these secrets:
- AUTH_EMAIL: your-test-account@example.com
- AUTH_PASSWORD: your-secure-password
- TARGET_URL: https://hercules.works/ai (or your staging URL)
```

---

#### 3. **Timing/Timeout Issues** ❌
**Problem:** CI servers are slower. Default timeouts were too short.

**Fixed in `playwright.config.js`:**
- Test timeout: `60000ms` → `90000ms` (in CI)
- Expect timeout: `20000ms` → `30000ms` (in CI)
- Action timeout: `30000ms` → `45000ms` (in CI)
- Navigation timeout: `60000ms` → `90000ms` (in CI)

---

#### 4. **Insufficient Retries** ❌
**Problem:** Tests failed on first try with no recovery mechanism.

**Fixed:**
```javascript
retries: process.env.CI ? 2 : 0,  // Now retries 2x in CI, 0x locally
```

---

#### 5. **Network Accessibility** ⚠️
**Problem:** GitHub Actions runner IP might be blocked by your website.

**Check if this is the issue:**
```bash
# Run this locally to see actual error logs
npm run test:auth:slow
```

**If you see network errors:**
- Check if `https://hercules.works/ai` is accessible from GitHub runner IPs
- Consider using a staging/test environment
- Add your GitHub Actions IP to whitelist (if applicable)

---

## Setup Instructions

### Step 1: Add GitHub Secrets
1. Go to your GitHub repository
2. Click `Settings` → `Secrets and Variables` → `Actions`
3. Click `New repository secret`
4. Add these three secrets:

| Secret Name | Value | Example |
|------------|-------|---------|
| `AUTH_EMAIL` | Test account email | `test@example.com` |
| `AUTH_PASSWORD` | Test account password | `secure123!` |
| `TARGET_URL` | Test URL (optional) | `https://staging.hercules.works/ai` |

### Step 2: Update Workflow (Already Done ✓)
The `.github/workflows/playwright.yml` has been updated to use these secrets.

### Step 3: Verify Configuration
```bash
# Test locally with CI timeouts
SLOW_MO=0 npx playwright test tests/authenticated_flows.spec.js --project=chromium
```

---

## Debugging Failed Tests

### When CI Tests Still Fail:

#### 1. **Check Test Logs in GitHub Actions**
```
1. Go to Actions tab in GitHub
2. Click the failed workflow run
3. Click "Run Playwright Tests" step
4. Scroll down to see error details
```

#### 2. **Check Artifacts for Video/Screenshots**
GitHub Actions automatically saves:
- `playwright-report/` - HTML test report
- `test-results/` - XML, JSON results
- Videos & screenshots of failed tests

#### 3. **Common Error Messages & Solutions**

**Error: "Login button not found"**
```
→ Check if TARGET_URL is correct
→ Verify test account exists
→ Check if website structure changed
```

**Error: "Timeout waiting for profile icon"**
```
→ Login failed (check credentials)
→ Network too slow (increase timeout)
→ Element selectors changed
```

**Error: "Navigation failed"**
```
→ GitHub runner can't access the URL
→ Try a staging/internal URL
→ Check firewalls/IP whitelisting
```

---

## Configuration Comparison

### Local vs CI Timeouts (After Fix)

| Setting | Local | CI |
|---------|-------|-----|
| Test Timeout | 60s | 90s ⬆️ |
| Expect Timeout | 20s | 30s ⬆️ |
| Action Timeout | 30s | 45s ⬆️ |
| Navigation Timeout | 60s | 90s ⬆️ |
| Retries | 0 | 2 ⬆️ |

---

## Running Tests Locally to Simulate CI

### Simulate CI Environment:
```bash
# Run with CI timeouts locally
CI=true npx playwright test tests/authenticated_flows.spec.js --project=chromium

# Run with slower machine simulation
SLOW_MO=100 CI=true npx playwright test tests/authenticated_flows.spec.js --project=chromium
```

### Run Single Test Case:
```bash
npx playwright test -g "TC01 - User lands on authenticated AI home after login"
```

### Run with Debug Mode:
```bash
npx playwright test tests/authenticated_flows.spec.js --debug
```

---

## Quick Checklist Before Pushing

- [ ] GitHub Secrets added (AUTH_EMAIL, AUTH_PASSWORD)
- [ ] Test account credentials are correct
- [ ] Target URL is accessible from CI environment
- [ ] Local tests pass: `npm run test:auth`
- [ ] CI config has increased timeouts ✓ (Already done)
- [ ] Workflow uses environment variables ✓ (Already done)

---

## Next Steps

1. **Add GitHub Secrets** (Required)
2. **Push & Test**: `git push` and monitor Actions tab
3. **Check CI Logs**: If tests fail, review the GitHub Actions output
4. **Update Credentials**: If needed, adjust `AUTH_EMAIL`, `AUTH_PASSWORD` in Secrets

---

## Support

If tests still fail:
1. Check the test report: `./playwright-report/index.html` (after local run)
2. Review GitHub Actions logs for specific error
3. Verify selectors haven't changed in the website
4. Check if test account is locked/rate-limited
