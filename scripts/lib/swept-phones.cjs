// scripts/lib/swept-phones.cjs
//
// Shared list of already-swept wrong phone numbers, used by both the legal
// entry gate (claim-gate.cjs) and the help-program gate (program-gate.cjs).
// Each entry was caught at least once during the 2026-04 fact-check sweep
// and corrected — re-flag any reappearance so the wrong number cannot
// silently come back through new authoring.
//
// Each rule:
//   num     — wrong number to detect (any reasonable formatting)
//   label   — human-readable description of what was wrong
//   fix     — what to use instead
//   cooccur — optional regex; if present, only flag when this matches
//             a 200-char window around the phone (prevents false positives
//             where the same digits are a legitimate other line)

const SWEPT_WRONG_PHONES = [
  { num: '585-295-5727', label: 'Legal Aid Society of Rochester (old number)', fix: 'use (585) 232-4090' },
  { num: '585-295-5800', label: 'Empire Justice Center (old number)',          fix: 'use (585) 454-4060' },
  { num: '585-295-5702', label: 'Empire Justice Center (old number)',          fix: 'use (585) 454-4060' },
  { num: '585-295-5775', label: 'Empire Justice Center (old number)',          fix: 'use (585) 454-4060' },
  { num: '585-295-3100', label: 'JustCause (old VLSP number)',                 fix: 'use (585) 232-3051' },
  { num: '585-325-2800', label: 'Lifespan / Eldersource (old number)',         fix: 'use (585) 244-8400' },
  { num: '585-226-5380', label: 'DEC Region 8 Avon (old number)',              fix: 'use (585) 226-5400 or (585) 226-2466 by context' },
  { num: '585-753-5363', label: 'Monroe County Surrogate Court (old number)',  fix: 'use (585) 371-3310', cooccur: /Surrogate/i },
  { num: '585-371-3553', label: 'Monroe County Family Court (old number)',     fix: 'use (585) 371-3544' },
  { num: '585-428-2480', label: 'Monroe County Family Court (old number)',     fix: 'use (585) 371-3544' },
  { num: '585-428-5429', label: 'Monroe County Family Court (old number)',     fix: 'use (585) 371-3544' },
  { num: '585-371-3548', label: 'Monroe County Family Court (wrong extension)', fix: 'use (585) 371-3544 (verified at nycourts.gov 4/2026)' },
  { num: '585-371-3300', label: 'Monroe County Supreme Court Clerk (wrong number)', fix: 'use (585) 371-3758 (verified per recurring patterns memory)', cooccur: /(?:Supreme\s+Court|Court\s+Clerk)/i },
  { num: '585-428-3720', label: 'Monroe County Family Court / Attorney for Child (wrong number)', fix: 'use (585) 371-3544 for Family Court main' },
  { num: '585-295-5708', label: 'JustCause / VLSP (wrong number)', fix: 'use (585) 232-3051 (verified at justcauseny.org)' },
  { num: '585-428-7600', label: 'Rochester courts / Hall of Justice (wrong number)', fix: 'Hall of Justice court lines: (585) 371-3412 City Court Civil/Housing; (585) 428-7482 Parking/Municipal Code; Veterans Treatment Court does not use this number — verify the specific Hall of Justice court phone before publishing', cooccur: /(?:City\s+Court|Housing\s+(?:Part|Court)|Parking\s+Violations|Veterans\s+(?:Treatment\s+)?Court|Hall\s+of\s+Justice|Drug\s+Court|Mental\s+Health\s+Court)/i },
  { num: '585-753-6960', label: 'Monroe County DHS / DSS (old main number)',   fix: 'use (585) 753-6998 for DHS general / SNAP main, (585) 753-6316 for Child Care; (585) 753-6960 IS still the appointment line for application mailing', cooccur: /(?:DHS|DSS|Human\s+Services|Social\s+Services|Department\s+of|SNAP|Food\s+Assistance|Temporary\s+Assistance|EBT)/i },
  { num: '585-753-6010', label: 'Monroe County DHS / DSS general (wrong number)', fix: 'use (585) 753-6998 for DHS general / Medicaid intake; (585) 753-5765 for Foster Care intake', cooccur: /(?:DHS|DSS|Human\s+Services|Social\s+Services|Medicaid|SNAP|Temporary\s+Assistance)/i },
  { num: '585-295-5700', label: 'LawNY / Legal Assistance of Western NY (old/wrong number)', fix: 'use (585) 325-2520 (verified at lawny.org/Contact)' },
  { num: '585-428-6650', label: 'Rochester City Court / Small Claims / Housing Court (wrong number)', fix: 'use (585) 371-3412 for Civil Division (covers Small Claims and Housing Part); (585) 371-3413 for Criminal' },
  { num: '585-295-0660', label: 'JustCause / VLSP (wrong number)', fix: 'use (585) 232-3051 (verified at justcauseny.org)' },
  // 585-423-1500 is a real number — Rochester Housing Authority main office.
  // It is NOT NAMI Rochester's number. Only flag when paired with NAMI context.
  { num: '585-423-1500', label: 'NAMI Rochester (wrong number — 423-1500 is Rochester Housing Authority)', fix: 'NAMI Rochester is (585) 423-1593', cooccur: /NAMI/i },
  { num: '585-568-8726', label: 'Recovery Houses of Rochester (wrong number)', fix: 'use (585) 910-5527 main or (585) 413-0551 alt (verified at recoveryhousesofrochester.org/contact-us 2026-04-30)', cooccur: /Recovery\s+Houses/i },
  // 800-432-4210 is a real number — NYS HCR Mobile and Manufactured Homes division.
  // It is NOT a tenant rights / eviction hotline. Only flag when paired with general
  // tenant-rights context where it does not belong.
  { num: '800-432-4210', label: 'NY HCR Mobile/Manufactured Homes division (wrong number for tenant rights/eviction context)', fix: 'HCR has no public tenant rights phone hotline; use the tenant resources website at hcr.ny.gov/tenant-resources, or refer Monroe County tenants to LawNY (585-325-2520) / Legal Aid Rochester (585-232-4090) for direct eviction help', cooccur: /(?:tenant\s+rights|eviction|unsafe\s+conditions|housing\s+discrimination)/i },
  { num: '585-371-3608', label: 'Rochester City Court / Housing (wrong number)', fix: 'Civil Division (handles housing/eviction/small claims): (585) 371-3412 at 99 Exchange Blvd Room 6 (verified at nycourts.gov 2026-04-30)', cooccur: /(?:City\s+Court|Housing\s+Court|eviction|99\s+Exchange)/i },
  { num: '585-392-9461', label: 'Parma Town Clerk (wrong number — 9461 is Town Hall main switchboard, not Clerk direct)', fix: 'Parma Clerk direct: (585) 392-9462 (verified at parmany.gov/departments/town-clerk/ 2026-04-30)', cooccur: /(?:Town\s+Clerk|Clerk's\s+Office)/i },
  { num: '585-336-6020', label: 'Irondequoit Building Department (wrong number)', fix: 'Building Dept: (585) 336-6026; Inspection Request Line: (585) 336-6072 (verified at irondequoit.gov/180/Building 2026-04-30)', cooccur: /(?:Building\s+Department|Building\s+Dept|building\s+permits)/i },
  { num: '585-275-3574', label: 'Strong Recovery / URMC chemical dependency (wrong number)', fix: 'use (585) 275-3161 (verified at urmc.rochester.edu/locations/strong-recovery 2026-04-30)', cooccur: /(?:Strong\s+Recovery|URMC|UR\s+Medicine.*chemical|chemical\s+dependency)/i },
];

function normalizePhone(s) {
  return s.replace(/[^\d]/g, '');
}

function findPhoneMatches(text, raw, cooccur) {
  const target = normalizePhone(raw);
  if (target.length !== 10) return [];
  const re = /\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}/g;
  const hits = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    if (normalizePhone(m[0]) === target) {
      if (cooccur) {
        const window = text.slice(Math.max(0, m.index - 200), m.index + 200);
        if (!cooccur.test(window)) continue;
      }
      hits.push({ at: m.index, raw: m[0] });
    }
  }
  return hits;
}

module.exports = { SWEPT_WRONG_PHONES, normalizePhone, findPhoneMatches };
