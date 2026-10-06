// Self-check for route-edges.js. Run: node extension/route-edges.test.js
const assert = require('assert');
const { routeEdges } = require('./src/route-edges.js');

const COL_W = 150;
const COL_GAP = 36;
const CARD_H = 110;
const ROW_GAP = 20;
const TOP = 60;

// Small seeded generator so a failure is reproducible.
function rng(seed) {
  let s = seed;
  return () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
}

function lattice(seed) {
  const rand = rng(seed);
  const cols = Array.from({ length: 8 }, (_, c) => Array.from({ length: 2 + Math.floor(rand() * 6) }, (_, r) => ({
    x: c * (COL_W + COL_GAP), y: TOP + r * (CARD_H + ROW_GAP), w: COL_W, h: CARD_H, c, r,
  })));
  const cards = cols.flat();
  const edges = [];
  for (let i = 0; i < 30; i++) {
    const from = cards[Math.floor(rand() * cards.length)];
    const later = cards.filter(t => t.c > from.c);
    if (later.length) edges.push({ from, to: later[Math.floor(rand() * later.length)] });
  }
  return { cards, edges };
}

const touches = (s, r) => s.x0 <= r.x + r.w && s.x1 >= r.x && s.y0 <= r.y + r.h && s.y1 >= r.y;

for (let seed = 1; seed <= 40; seed++) {
  const { cards, edges } = lattice(seed);
  const routes = routeEdges(edges, { colGap: COL_GAP, rowGap: ROW_GAP });
  assert.strictEqual(routes.length, edges.length);
  const colLanes = new Map();
  const rowLanes = new Map();

  routes.forEach(({ points, d }, i) => {
    const { from, to } = edges[i];
    assert.ok(d.startsWith('M '), 'path data');
    assert.deepStrictEqual(points[0], [from.x + from.w, from.y + from.h / 2], 'leaves the source from its right edge');
    assert.deepStrictEqual(points[points.length - 1], [to.x, to.y + to.h / 2], 'enters the target from its left edge');
    for (let k = 1; k < points.length; k++) {
      const [ax, ay] = points[k - 1];
      const [bx, by] = points[k];
      assert.ok(ax === bx || ay === by, `seed ${seed} edge ${i}: segment ${k} is not axis aligned`);
      const s = { x0: Math.min(ax, bx), x1: Math.max(ax, bx), y0: Math.min(ay, by), y1: Math.max(ay, by) };
      cards.forEach(card => {
        // The first and last segments meet their own card only at the endpoint.
        if (card === from && k === 1) return assert.ok(s.x0 >= card.x + card.w);
        if (card === to && k === points.length - 1) return assert.ok(s.x1 <= card.x);
        assert.ok(!touches(s, card), `seed ${seed} edge ${i}: segment ${k} touches card ${card.c},${card.r}`);
      });
      if (ax === bx && ay !== by) { // vertical run in a column gap
        const gap = Math.floor(ax / (COL_W + COL_GAP)) * (COL_W + COL_GAP) + COL_W;
        if (!colLanes.has(gap)) colLanes.set(gap, new Set());
        colLanes.get(gap).add(ax);
      }
      if (ay === by && ax !== bx && k !== 1 && k !== points.length - 1) { // run along a row gap
        const top = TOP - ROW_GAP + Math.floor((ay - TOP + ROW_GAP) / (CARD_H + ROW_GAP)) * (CARD_H + ROW_GAP);
        assert.ok(ay > top && ay < top + ROW_GAP, `seed ${seed} edge ${i}: run at ${ay} is outside a row gap`);
        if (!rowLanes.has(top)) rowLanes.set(top, new Set());
        rowLanes.get(top).add(ay);
      }
    }
  });

  // Lanes in a gap are distinct and evenly spaced across it: offsets at (k+1)/(n+1).
  const even = (lanes, start, width, what) => {
    const xs = [...lanes].sort((a, b) => a - b);
    xs.forEach((x, k) => assert.ok(Math.abs(x - start - (k + 1) * width / (xs.length + 1)) < 1e-6,
      `seed ${seed}: ${what} at ${start} has uneven lanes ${xs.map(v => (v - start).toFixed(1)).join(' ')}`));
  };
  colLanes.forEach((xs, gap) => even(xs, gap, COL_GAP, 'column gap'));
  rowLanes.forEach((ys, top) => even(ys, top, ROW_GAP, 'row gap'));
}

console.log('route-edges.test.js: 40 random lattices, every arrow stays in the gaps on even lanes');
