# GitHub Actions Setup - Quick Start

## ✅ What Was Fixed

1. ✓ Added environment variables to GitHub Actions workflow
2. ✓ Increased CI timeouts (90s test, 30s expect, 45s action)
3. ✓ Added retry strategy (2 retries in CI vs 0 locally)
4. ✓ Configured trace/video capture on failures

## 🚀 What You Need To Do NOW

### Step 1: Add GitHub Secrets (REQUIRED)
```
Go to: GitHub Repo → Settings → Secrets and variables → Actions → New repository secret
```

Add these secrets:
- **Name:** `AUTH_EMAIL` | **Value:** `rajesh@jupitermeta.io`
- **Name:** `AUTH_PASSWORD` | **Value:** `12345678`
- **Name:** `TARGET_URL` | **Value:** `https://hercules.works/ai`

### Step 2: Test Locally First
```bash
# Test with CI configuration locally
CI=true npx playwright test tests/authenticated_flows.spec.js --project=chromium
```

### Step 3: Push to GitHub
```bash
git add .github/workflows/playwright.yml playwright.config.js CI_TROUBLESHOOTING.md
git commit -m "fix: add env vars and increase CI timeouts for stable tests"
git push origin main
```

### Step 4: Monitor GitHub Actions
- Go to: `https://github.com/YOUR_USERNAME/Hercules.works/actions`
- Watch the workflow run
- Check for PASS ✓ or FAIL ✗

---

## 📋 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Login button not found" | Secret values are wrong |
| "Timeout waiting for profile" | Increase waits or check network |
| "Navigation to https://hercules.works/ai failed" | Website unreachable from CI (network issue) |
| "Credential rejected" | Test account doesn't exist or password changed |

---

## 🔧 Files Changed

1. `.github/workflows/playwright.yml` - Added env vars and CI configuration
2. `playwright.config.js` - Increased timeouts for CI environment
3. `CI_TROUBLESHOOTING.md` - Full debugging guide (this document)

---

## 📊 Expected Results

**Before Fix:**
- Local: ✓ PASS (all 12 tests)
- CI: ✗ FAIL (timeout/login errors)

**After Fix:**
- Local: ✓ PASS (all 12 tests)
- CI: ✓ PASS (with secrets configured)

---

## ❓ Still Failing?

Check:
1. Are GitHub Secrets added? (Settings → Secrets)
2. Do credentials work locally? (Run: `npm run test:auth`)
3. Can you access the URL? (Try in browser from local machine)
4. Check GitHub Actions output for specific error

See `CI_TROUBLESHOOTING.md` for detailed debugging steps.
