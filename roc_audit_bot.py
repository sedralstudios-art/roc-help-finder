#!/usr/bin/env python3
"""
ROC HELP FINDER — Weekly Audit Bot
Built by Sedral Studios · Rochester NY

Checks all program data for:
  1. Dead URLs (HTTP 4xx/5xx/timeout)
  2. Expiring hardcoded dates (within 30 days)
  3. Phone number format validation
  4. Content change detection on key pages (hash comparison)
  5. Seasonal program reminders

Run weekly via cron or GitHub Actions.
Output: Markdown report to stdout (pipe to file or email).

SETUP:
  pip install requests
  python roc_audit_bot.py > audit_report.md

GITHUB ACTIONS: See roc_audit.yml (included alongside this file)
"""

import re
import sys
import json
import hashlib
import os
from datetime import datetime, timedelta
from pathlib import Path

try:
    import requests
except ImportError:
    print("ERROR: `pip install requests` first")
    sys.exit(1)

# ─── CONFIG ───
JSX_PATH = os.environ.get("ROC_JSX_PATH", "roc_help.jsx")
HASH_FILE = os.environ.get("ROC_HASH_FILE", ".roc_url_hashes.json")
TIMEOUT = 15  # seconds per URL check
USER_AGENT = "ROCHelpFinder-AuditBot/1.0 (community resource checker)"

# Key pages to hash-check for content changes
WATCH_PAGES = [
    "https://www.willowcenterny.org",
    "https://211lifeline.org",
    "https://mybenefits.ny.gov",
    "https://www.rochesterhousing.org",
    "https://trilliumhealth.org",
    "https://rochesterhope.org",
    "https://ncadd-ra.org",
    "https://outalliance.org",
    "https://hutherdoyle.com",
    "https://veteransoutreach.org",
]

# Seasonal reminders (month → message)
SEASONAL = {
    10: "🍂 HEAP heating assistance season approaching — verify opening dates and fund availability.",
    11: "🍂 HEAP should be open now — verify current season dates in the app.",
    1:  "📋 VITA free tax prep season starting — verify locations and hours.",
    4:  "📋 VITA tax season ending April 15 — update or remove seasonal notes.",
    5:  "☀️ Summer cooling assistance programs may be opening — check if any should be added.",
    6:  "☀️ Check summer youth programs — verify Teen Empowerment and Youth Bureau summer hours.",
    8:  "📚 Back to school — verify Family Resource Centers, Head Start enrollment dates.",
}


def extract_programs(jsx_path):
    """Parse program entries from the JSX file."""
    with open(jsx_path, "r", encoding="utf-8") as f:
        content = f.read()

    programs = []
    # Match each program object: { id:"...", n:"...", ... }
    pattern = r'\{\s*id:"([^"]+)",\s*n:"([^"]+)".*?\}'
    for m in re.finditer(pattern, content, re.DOTALL):
        block = m.group(0)
        prog = {"id": m.group(1), "name": m.group(2), "raw": block}

        # Extract fields
        for field, key in [("ph", "phone"), ("url", "url"), ("aurl", "apply_url"),
                           ("ad", "address"), ("hr", "hours"), ("nt", "note")]:
            fm = re.search(rf'{field}:"([^"]*)"', block)
            if fm:
                prog[key] = fm.group(1)

        programs.append(prog)
    return programs


def extract_community(jsx_path):
    """Parse community group entries."""
    with open(jsx_path, "r", encoding="utf-8") as f:
        content = f.read()

    groups = []
    # Find COMMUNITY array
    cm = re.search(r'const COMMUNITY\s*=\s*\[(.*?)\];', content, re.DOTALL)
    if not cm:
        return groups

    block = cm.group(1)
    for m in re.finditer(r'n:"([^"]+)".*?url:"([^"]*)"', block, re.DOTALL):
        groups.append({"name": m.group(1), "url": m.group(2)})
    return groups


def check_url(url, session):
    """Check if a URL is reachable. Returns (status_code, error_message)."""
    try:
        resp = session.head(url, timeout=TIMEOUT, allow_redirects=True)
        if resp.status_code >= 400:
            return resp.status_code, f"HTTP {resp.status_code}"
        return resp.status_code, None
    except requests.exceptions.SSLError:
        return 0, "SSL certificate error"
    except requests.exceptions.ConnectionError:
        return 0, "Connection refused / DNS failure"
    except requests.exceptions.Timeout:
        return 0, f"Timeout ({TIMEOUT}s)"
    except requests.exceptions.RequestException as e:
        return 0, str(e)[:80]


def check_phone(phone):
    """Basic phone format validation."""
    if phone in ("211", "988", "911"):
        return None  # special numbers, always valid format
    digits = re.sub(r"[^0-9]", "", phone)
    if len(digits) == 10:
        return None  # valid US number
    if len(digits) == 11 and digits[0] == "1":
        return None  # valid with country code
    return f"Unusual format: '{phone}' ({len(digits)} digits)"


def find_dates(jsx_path):
    """Find hardcoded dates in the JSX that might go stale."""
    with open(jsx_path, "r", encoding="utf-8") as f:
        content = f.read()

    issues = []
    today = datetime.now()
    soon = today + timedelta(days=30)

    # Match patterns like "April 7, 2026" or "January 15, 2027"
    months = "January|February|March|April|May|June|July|August|September|October|November|December"
    for m in re.finditer(rf'({months})\s+(\d{{1,2}}),?\s+(\d{{4}})', content):
        try:
            d = datetime.strptime(f"{m.group(1)} {m.group(2)} {m.group(3)}", "%B %d %Y")
            if d < today:
                issues.append(f"🔴 EXPIRED: \"{m.group(0)}\" is in the past")
            elif d < soon:
                days_left = (d - today).days
                issues.append(f"🟡 EXPIRING: \"{m.group(0)}\" — {days_left} days away")
        except ValueError:
            pass

    # Match year-only references like "2025" or "2026" in notes
    for m in re.finditer(r'nt:"[^"]*(\b20\d{2}\b)[^"]*"', content):
        year = int(m.group(1))
        if year < today.year:
            issues.append(f"🟡 STALE YEAR: Note contains \"{year}\" — current year is {today.year}")

    return issues


def hash_page(url, session):
    """Fetch page and return content hash."""
    try:
        resp = session.get(url, timeout=TIMEOUT)
        # Strip whitespace, scripts, and timestamps for stable comparison
        text = re.sub(r'<script.*?</script>', '', resp.text, flags=re.DOTALL)
        text = re.sub(r'\s+', ' ', text).strip()
        return hashlib.md5(text.encode()).hexdigest()
    except Exception:
        return None


def load_hashes(path):
    """Load previous URL content hashes."""
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return {}


def save_hashes(path, hashes):
    """Save URL content hashes for next run."""
    with open(path, "w") as f:
        json.dump(hashes, f, indent=2)


def run_audit():
    today = datetime.now()
    print(f"# ROC Help Finder — Weekly Audit Report")
    print(f"**Run:** {today.strftime('%A, %B %d, %Y at %I:%M %p')}")
    print(f"**JSX file:** `{JSX_PATH}`")
    print()

    # ── PARSE PROGRAMS ──
    if not os.path.exists(JSX_PATH):
        print(f"❌ ERROR: Cannot find `{JSX_PATH}`. Set ROC_JSX_PATH environment variable.")
        sys.exit(1)

    programs = extract_programs(JSX_PATH)
    community = extract_community(JSX_PATH)
    print(f"Parsed **{len(programs)}** programs and **{len(community)}** community groups.")
    print()

    session = requests.Session()
    session.headers["User-Agent"] = USER_AGENT

    # ── 1. URL CHECKS ──
    print("## 1. URL Health Check")
    print()
    dead = []
    ok_count = 0

    all_urls = []
    for p in programs:
        if "url" in p:
            all_urls.append((p["name"], p["url"], "program"))
        if "apply_url" in p:
            all_urls.append((p["name"], p["apply_url"], "apply link"))
    for g in community:
        if g.get("url"):
            all_urls.append((g["name"], g["url"], "community"))

    for name, url, source in all_urls:
        status, error = check_url(url, session)
        if error:
            dead.append({"name": name, "url": url, "error": error, "source": source})
        else:
            ok_count += 1

    if dead:
        print(f"🔴 **{len(dead)} DEAD LINKS:**")
        print()
        for d in dead:
            print(f"- **{d['name']}** ({d['source']}): `{d['url']}` → {d['error']}")
        print()
    print(f"🟢 **{ok_count}/{len(all_urls)}** URLs responding OK.")
    print()

    # ── 2. PHONE VALIDATION ──
    print("## 2. Phone Number Validation")
    print()
    phone_issues = []
    for p in programs:
        if "phone" in p:
            issue = check_phone(p["phone"])
            if issue:
                phone_issues.append(f"- **{p['name']}**: {issue}")

    if phone_issues:
        print(f"🟡 **{len(phone_issues)} phone format issues:**")
        print()
        for pi in phone_issues:
            print(pi)
        print()
    else:
        print("🟢 All phone numbers in valid format.")
    print()

    # ── 3. DATE CHECK ──
    print("## 3. Hardcoded Date Check")
    print()
    date_issues = find_dates(JSX_PATH)
    if date_issues:
        for di in date_issues:
            print(f"- {di}")
        print()
    else:
        print("🟢 No expiring or stale dates found.")
    print()

    # ── 4. CONTENT CHANGE DETECTION ──
    print("## 4. Content Change Detection (Key Pages)")
    print()
    old_hashes = load_hashes(HASH_FILE)
    new_hashes = {}
    changes = []
    hash_errors = []

    for url in WATCH_PAGES:
        h = hash_page(url, session)
        if h is None:
            hash_errors.append(url)
            continue
        new_hashes[url] = h
        if url in old_hashes and old_hashes[url] != h:
            changes.append(url)

    if changes:
        print(f"🟡 **{len(changes)} pages changed since last check:**")
        print()
        for c in changes:
            print(f"- {c} — content has changed, verify program info is still accurate")
        print()
    else:
        print("🟢 No content changes detected on watched pages.")
    if hash_errors:
        print(f"⚠️ Could not reach: {', '.join(hash_errors)}")
    print()

    save_hashes(HASH_FILE, new_hashes)

    # ── 5. SEASONAL REMINDERS ──
    print("## 5. Seasonal Reminders")
    print()
    month = today.month
    if month in SEASONAL:
        print(f"- {SEASONAL[month]}")
    else:
        print("No seasonal reminders for this month.")
    print()

    # ── 6. PROGRAM COUNT SUMMARY ──
    print("## 6. Summary")
    print()
    categories = {}
    for p in programs:
        raw = p.get("raw", "")
        cm = re.search(r'c:"([^"]*)"', raw)
        if cm:
            cat = cm.group(1)
            categories[cat] = categories.get(cat, 0) + 1

    print(f"| Category | Count |")
    print(f"|----------|-------|")
    for cat in sorted(categories.keys()):
        print(f"| {cat} | {categories[cat]} |")
    print(f"| **TOTAL** | **{len(programs)}** |")
    print()
    print(f"Community groups: **{len(community)}**")
    print()

    # ── FINAL ──
    total_issues = len(dead) + len(phone_issues) + len(date_issues) + len(changes)
    if total_issues == 0:
        print("---")
        print("✅ **All clear.** No issues found this week.")
    else:
        print("---")
        print(f"⚠️ **{total_issues} items need attention.** Review above and update as needed.")
    print()
    print(f"*Report generated by ROC Help Finder Audit Bot · Sedral Studios*")


if __name__ == "__main__":
    run_audit()
