# ROC Help Finder — Audit Bot Setup

## What it does

Every Monday at 8am ET, the bot:

1. **Checks every URL** in roc_help.jsx (programs + community groups + apply links) for dead links
2. **Validates phone numbers** for correct format
3. **Scans for expiring dates** hardcoded in program notes (flags anything within 30 days)
4. **Detects content changes** on key agency websites (Willow Center, 211, myBenefits, etc.)
5. **Shows seasonal reminders** (HEAP season, VITA tax prep, summer programs, back to school)
6. **Creates a GitHub Issue** automatically if any problems are found

You review the issue, make calls if needed, update what needs updating. ~10 minutes a week.

## Files

| File | Where it goes | What it does |
|------|--------------|-------------|
| `roc_audit_bot.py` | Repo root | The audit script |
| `roc_audit.yml` | `.github/workflows/roc_audit.yml` | GitHub Actions schedule |
| `.roc_url_hashes.json` | Auto-generated | Stores page hashes between runs |

## Setup (GitHub Actions — recommended)

1. Put `roc_help.jsx` and `roc_audit_bot.py` in your repo root
2. Create `.github/workflows/` directory if it doesn't exist
3. Copy `roc_audit.yml` into `.github/workflows/roc_audit.yml`
4. Push to GitHub
5. Go to repo → Actions tab → verify "ROC Help Finder Weekly Audit" appears
6. Click "Run workflow" to test manually

That's it. Every Monday you'll get a GitHub Issue if anything needs attention.

## Setup (Local cron — alternative)

```bash
# Install
pip install requests

# Test run
python roc_audit_bot.py

# Save report to file
python roc_audit_bot.py > weekly_report.md

# Add to crontab (every Monday 8am)
crontab -e
# Add this line:
0 8 * * 1 cd /path/to/your/repo && python roc_audit_bot.py > audit_$(date +\%Y\%m\%d).md
```

## Environment variables (optional)

| Variable | Default | Description |
|----------|---------|-------------|
| `ROC_JSX_PATH` | `roc_help.jsx` | Path to the app file |
| `ROC_HASH_FILE` | `.roc_url_hashes.json` | Where to store content hashes |

## Cost

- GitHub Actions: Free tier covers this easily (runs ~5 min/week)
- No API keys needed
- No external services

## What the report looks like

```
# ROC Help Finder — Weekly Audit Report
**Run:** Monday, March 24, 2026 at 08:00 AM

## 1. URL Health Check
🔴 **2 DEAD LINKS:**
- **ROCovery Fitness** (program): rocoveryfitness.org → HTTP 503
- **NA Rochester** (program): nny-na.org → Timeout (15s)
🟢 **94/96** URLs responding OK.

## 2. Phone Number Validation
🟢 All phone numbers in valid format.

## 3. Hardcoded Date Check
🟢 No expiring or stale dates found.

## 4. Content Change Detection
🟡 **1 page changed since last check:**
- https://www.rochesterhousing.org — content changed, verify program info

## 5. Seasonal Reminders
No seasonal reminders for this month.

## 6. Summary
| Category | Count |
|----------|-------|
| addiction | 9 |
| cash | 6 |
| food | 9 |
...
| **TOTAL** | **86** |

---
⚠️ **3 items need attention.** Review above and update as needed.
```
