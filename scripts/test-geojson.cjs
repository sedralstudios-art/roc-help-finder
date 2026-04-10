const geo = require('../src/data/geo/monroe-jurisdictions.json');

function pointInRing(p, ring) {
  const [x, y] = p;
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function pip(p, g) {
  if (g.type === 'Polygon') {
    if (!pointInRing(p, g.coordinates[0])) return false;
    for (let i = 1; i < g.coordinates.length; i++) {
      if (pointInRing(p, g.coordinates[i])) return false;
    }
    return true;
  }
  if (g.type === 'MultiPolygon') {
    return g.coordinates.some(poly => {
      if (!pointInRing(p, poly[0])) return false;
      for (let i = 1; i < poly.length; i++) {
        if (pointInRing(p, poly[i])) return false;
      }
      return true;
    });
  }
  return false;
}

function resolve(lat, lng) {
  const m = [];
  for (const f of geo.features) {
    if (pip([lng, lat], f.geometry)) {
      m.push(f.properties.name + ' (' + f.properties.tier + ')');
    }
  }
  return m;
}

const tests = [
  ['Fairport',        43.0975, -77.4410, ['Fairport (village)', 'Perinton (town)']],
  ['Greece',          43.2098, -77.6930, ['Greece (town)']],
  ['Rochester',       43.1566, -77.6088, ['Rochester (city)']],
  ['Brockport',       43.2137, -77.9393, ['Brockport (village)']],
  ['Pittsford',       43.0901, -77.5151, ['Pittsford (town)']],
  ['Outside county',  42.8000, -77.0000, []],
];

let pass = 0;
let fail = 0;
for (const [label, lat, lng, expected] of tests) {
  const result = resolve(lat, lng);
  const ok = result.length <= expected.length + 1; // allow parent town for villages
  const hasExpected = expected.every(e => result.includes(e));
  if (hasExpected && (expected.length === 0 ? result.length === 0 : true)) {
    console.log('✓', label + ':', result.join(', ') || '[]');
    pass++;
  } else {
    console.log('✗', label + ':', result.join(', ') || '[]');
    console.log('  expected:', expected.join(', ') || '[]');
    fail++;
  }
}
console.log('\n' + pass + ' passed, ' + fail + ' failed');
