#!/usr/bin/env node
// Rekent elke rekenopgave na (ook gen-opgaven, 300 keer per stuk) en test de vuistregelgrenzen van de widgets.
// Gebruik (vanuit de vak-map): node tools/narekenen.js
const fs = require("fs"), path = require("path"), vm = require("vm");
const dir = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const ctx = { console, Math, Date, JSON, Number, String, Array, Object, isFinite, isNaN, parseFloat, parseInt, setTimeout, clearTimeout, setInterval, clearInterval,
  document: { getElementById: () => null, documentElement: { style: { setProperty() {} } }, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [] },
  localStorage: { getItem: () => null, setItem() {} }, location: { hash: "" }, addEventListener() {}, requestAnimationFrame() {} };
ctx.window = ctx; vm.createContext(ctx);
for (const m of html.matchAll(/<script src="([^"]+)"/g)) vm.runInContext(fs.readFileSync(path.join(dir, m[1]), "utf8"), ctx, { filename: m[1] });
const TW = ctx.TW, S = TW._S, R = TW.R, W = TW.wa;

const fout = [];
let nStatisch = 0, nGen = 0;
const rond = (x, d) => Math.round((x + Number.EPSILON) * 10 ** d) / 10 ** d;
const gelijk = (a, b, e = 1e-9) => Math.abs(a - b) <= e;
const getallen = (s) => (s.replace(/\^\{[^}]*\}|_\{[^}]*\}/g, "").replace(/−/g, "-").match(/-?\d+(?:[.,]\d+)?/g) || []).map((x) => Number(x.replace(",", ".")));
const nlm = (x) => TW.nl(x).replace("-", "−");

// ---------- onafhankelijke berekeningen van de vaste opgaven (id#index → verwacht antwoord) ----------
const phiF = (a, b, c, d) => (a * d - b * c) / Math.sqrt((a + b) * (a + c) * (b + d) * (c + d));
const E = (m1, m2, s1, s2) => Math.abs(m1 - m2) / (0.5 * (s1 + s2));
const VAST = {
  "h11-1#0": (36 / 8) * 14, "h11-1#1": (6 * 15) / 9, "h11-1#2": (2 * 30) / 12, "h11-1#3": (31.2 / 2.4) * 0.75,
  "h11-2#0": rond(20 + 70 * 0.92 ** 10, 1), "h11-2#1": 20, "h11-2#2": 450 / (4.5 - 3), "h11-2#3": 12,
  "h11-2#4": (() => { let t = 0; while (20 + 70 * 0.92 ** t >= 25) t++; return t; })(),
  "h11-3#0": 3 ** 2, "h11-3#1": Math.sqrt(9), "h11-3#2": "toenemend stijgend", "h11-3#3": rond((1 - 1 / 1.5) * 100, 1),
  "h11-4#0": Math.cbrt(250 / 2), "h11-4#1": (108 / 4) ** (1 / 1.5), "h11-4#2": rond(Math.cbrt(81 / 0.3), 1), "h11-4#3": 12 / 0.5, "h11-4#4": "x^0,5",
  "h11-5#0": rond(72 / 1.8 ** 2, 1), "h11-5#1": rond(Math.sqrt(90 / 25), 2), "h11-5#2": 15 + 0.4 * 120 * 3, "h11-5#3": "t=s/v", "h11-5#4": "A=b^2",
  "h13-1#0": (85 / 250) * 100, "h13-1#1": ((1400 - 1250) / 1250) * 100, "h13-1#2": (192 / 240 - 96 / 160) * 100, "h13-1#3": 26.5 / 1.06, "h13-1#4": rond((47 / 130) * 100, 1),
  "h13-2#0": "tevreden", "h13-2#1": 38 + 27, "h13-2#2": rond((0 * 6 + 1 * 9 + 2 * 14 + 3 * 11 + 4 * 6 + 5 * 4) / 50, 1), "h13-2#3": 2,
  "h13-3#0": Math.max(...[0, 12, 40, 71, 93, 100].map((a, i) => Math.abs(a - [0, 4, 17, 45, 80, 100][i]))),
  "h13-3#1": Math.max(...[0, 10, 35, 68, 90, 100].map((a, i) => Math.abs(a - [0, 3, 12, 27, 62, 100][i]))),
  "h13-3#2": W.oordeelVcp(41), "h13-3#3": 68 - 42,
  "h13-4#0": rond(E(7.4, 6.6, 1.3, 1.1), 2), "h13-4#1": rond(phiF(30, 20, 15, 35), 2), "h13-4#2": W.oordeelE(E(24, 20, 5, 5)), "h13-4#3": rond(E(32.5, 26.0, 8.2, 6.8), 2),
  "h13-5#0": (312 / 1200) * 100, "h13-5#1": rond(((56 - 52) / 52) * 100, 1), "h13-5#2": (56 - 50) / (52 - 50), "h13-5#3": 84 / 240,
  "h13-6#0": rond(0.4 - 2 * Math.sqrt((0.4 * 0.6) / 300), 3), "h13-6#1": rond(0.4 + 2 * Math.sqrt((0.4 * 0.6) / 300), 3), "h13-6#2": rond(32.5 - (2 * 6) / Math.sqrt(100), 1),
  "h13-6#3": 2.5, "h13-6#4": 34 + 34 + 13.5, "h13-6#5": 400 * 4,
  "v5-1#0": "17/12", "v5-1#1": (240 / 5) * 3, "v5-1#2": (2 / 3) / (4 / 9), "v5-1#3": 3.5e4 * 2e3, "v5-1#4": 8 - 2 * 3 ** 2 + 12 / 4,
  "v5-2#0": 17, "v5-2#1": 120 / 15 - 2, "v5-2#2": "5x+13", "v5-2#3": "x^2+x-6", "v5-2#4": 5,
  "v5-3#0": (34 - 16) / (8 - 2), "v5-3#1": 16 - 3 * 2, "v5-3#2": (35 - 10) / (3 + 2), "v5-3#3": 50, "v5-3#4": 4 + 5
};
// extra controles van de vaste opgaven die meer dan één getal raken
const f = (x) => -2 * (x - 4) ** 2 + 50, g = (x) => 4 * x + 18;
if (!(f(0) === g(0) && f(6) === g(6) && f(6) === 42 && f(9) === 0 && f(4) === 50)) fout.push("topsnijfig: snijpunten (0, 18), (6, 42), nulpunt 9 of top (4, 50) klopt niet");
if (!(3 * 2 + 10 === 16 && 3 * 8 + 10 === 34)) fout.push("lijnfig klopt niet");
if (!gelijk(0.43 - 2 * Math.sqrt((0.43 * 0.57) / 400), 0.3805, 1e-4)) fout.push("bi-lijn: ondergrens klopt niet bij p = 0,43, n = 400");
if (!gelijk(phiF(78, 42, 60, 20), -0.1059, 1e-4)) fout.push("voorbeeld phi bijbaan klopt niet");
if (!gelijk(E(6.8, 6.1, 1.2, 1.0), 0.636, 1e-3)) fout.push("voorbeeld E klopt niet");
if (!gelijk(2 * Math.sqrt((0.4 * 0.6) / 500), 0.0438, 1e-4)) fout.push("voorbeeld BI proportie klopt niet");
if (!gelijk(2 * Math.sqrt((0.6 * 0.4) / 50), 0.139, 1e-3)) fout.push("mc marge 0,14 klopt niet");
if (!gelijk(E(6.9, 6.4, 1.5, 1.3), 0.357, 1e-3)) fout.push("open vraag E = 0,36 klopt niet");

// ---------- onafhankelijke controle van gen-opgaven uit de getallen in de vraag ----------
const GEN = {
  "h13-4#4": (d) => { const n = getallen(d.q.slice(d.q.indexOf("gemiddeld")).replace(/klas 5[AB]/g, "")); return rond(E(n[0], n[2], n[1], n[3]), 2); },
  "h13-4#5": (d) => { const n = getallen(d.q).filter((x) => x !== 2); const [a, b, c, dd] = n; return rond(phiF(a, b, c, dd), 2); },
  "h13-3#4": (d) => { const m = d.q.match(/: ([\d, ]+)\. .*: ([\d, ]+)\. Bepaal/); const A = getallen(m[1]), B = getallen(m[2]); return Math.max(...A.map((a, i) => Math.abs(a - B[i]))); },
  "h13-6#6": (d) => { const [n, k] = getallen(d.q); const p = k / n; return rond(p + 2 * Math.sqrt((p * (1 - p)) / n), 3); },
  "h11-2#5": (d) => { const [G, b, gg, t] = getallen(d.q); return rond(G - b * gg ** t, 1); },
  "h11-5#5": (d) => { const [G, L] = getallen(d.q); return rond(G / L ** 2, 1); },
  "v5-2#5": (d) => { const m = d.q.match(/(\d+)\(x − (\d+)\) = (\d*)x ([+−]) (\d+)/); const a = +m[1], b = +m[2], c0 = m[3] ? +m[3] : 1, dd = (m[4] === "−" ? -1 : 1) * m[5]; return (dd + a * b) / (a - c0); },
  "v5-2#6": (d) => { const [k, b, c] = getallen(d.q); return k / c - b; },
  "v5-3#5": (d) => { const [x1, y1, x2, y2] = getallen(d.q); return (y2 - y1) / (x2 - x1); },
  "h13-1#6": (d) => { const [o, nw] = getallen(d.q); return ((nw - o) / o) * 100; }
};

function decimalenUitVraag(q) {
  const m = q.match(/Rond af op (\d) decima/); if (m) return +m[1];
  if (/Rond af op een geheel getal/.test(q)) return 0;
  return null;
}
function controleer(d, waar, verwacht) {
  const num = typeof d.antwoord === "number";
  if (verwacht !== undefined) {
    if (typeof verwacht === "number") { if (!num || !gelijk(d.antwoord, verwacht, 1e-6)) fout.push(`${waar}: antwoord ${d.antwoord} ≠ narekening ${verwacht} | ${d.q.slice(0, 70)}`); }
    else if (![].concat(d.antwoord).some((a) => a.replace(/\s/g, "").toLowerCase() === verwacht.replace(/\s/g, "").toLowerCase())) fout.push(`${waar}: tekstantwoord ${JSON.stringify(d.antwoord)} mist ${verwacht}`);
  }
  if (!num) { const st = (d.stappen || []).join(" ").toLowerCase().replace(/\s/g, ""); if (!st.includes(String([].concat(d.antwoord)[0]).toLowerCase().replace(/\s/g, "").slice(0, 6)) && !/x\^|=|\//.test([].concat(d.antwoord)[0])) fout.push(`${waar}: stappen noemen het antwoord niet`); return; }
  const dec = decimalenUitVraag(d.q);
  if (dec != null) {
    if (!gelijk(d.antwoord, rond(d.antwoord, dec), 1e-9)) fout.push(`${waar}: antwoord ${d.antwoord} heeft meer dan ${dec} decimalen`);
    if (d.tol == null || !gelijk(d.tol, 10 ** -dec, 1e-9)) fout.push(`${waar}: vraag zegt ${dec} decimalen maar tol = ${d.tol}`);
  } else if (d.tol != null && d.tol > Math.max(0.01 * Math.abs(d.antwoord), 0.5)) fout.push(`${waar}: ruime tol ${d.tol} zonder afrondingsinstructie`);
  // het antwoord moet in de laatste stappen terugkomen (zelfde getal als in de uitwerking)
  const st = (d.stappen || []).join(" ").replace(/\s(?=\d{3}\b)/g, "");
  const kand = [nlm(d.antwoord), TW.nl(d.antwoord), String(d.antwoord), nlm(d.antwoord).replace(/,(\d)$/, ",$10")];
  if (dec != null) kand.push(TW.nl(d.antwoord, dec));
  if (!kand.some((k) => st.includes(k))) fout.push(`${waar}: antwoord ${nlm(d.antwoord)} staat niet in de stappen`);
}

S.hfst.forEach((h) => h.onderdelen.forEach((o) => (o.reken || []).forEach((r, i) => {
  const sleutel = `${o.id}#${i}`;
  if (typeof r.gen === "function") {
    for (let k = 0; k < 300; k++) { const d = r.gen(R); nGen++; controleer(d, sleutel + " (gen)", GEN[sleutel] ? GEN[sleutel](d) : undefined); }
  } else { nStatisch++; if (!(sleutel in VAST)) fout.push(`${sleutel}: geen narekening opgegeven`); controleer(r, sleutel, VAST[sleutel]); }
})));

// ---------- vuistregelgrenzen van de widgets ----------
const T = [
  [W.oordeelE(0.4), "gering"], [W.oordeelE(0.4000001), "middelmatig"], [W.oordeelE(0.8), "middelmatig"], [W.oordeelE(0.8000001), "groot"], [W.oordeelE(0.39), "gering"],
  [W.oordeelE((24 - 20) / (0.5 * (5 + 5))), "middelmatig"], [W.oordeelE((6.6 - 6.2) / (0.5 * (1.1 + 0.9))), "gering"],
  [W.oordeelPhi(0.2), "gering"], [W.oordeelPhi(-0.2), "gering"], [W.oordeelPhi(0.2000001), "middelmatig"], [W.oordeelPhi(-0.2000001), "middelmatig"],
  [W.oordeelPhi(0.4), "middelmatig"], [W.oordeelPhi(-0.4), "middelmatig"], [W.oordeelPhi(0.4000001), "groot"], [W.oordeelPhi(-0.4000001), "groot"], [W.oordeelPhi(0), "gering"],
  [W.oordeelVcp(20), "gering"], [W.oordeelVcp(21), "middelmatig"], [W.oordeelVcp(40), "middelmatig"], [W.oordeelVcp(41), "groot"], [W.oordeelVcp(20.0000001), "middelmatig"],
  [W.oordeelBox({ q1: 20, m: 30, q3: 40 }, { q1: 41, m: 50, q3: 60 }), "groot"],
  [W.oordeelBox({ q1: 20, m: 30, q3: 40 }, { q1: 40, m: 50, q3: 60 }), "middelmatig"],   // raken = overlappen, beide medianen buiten
  [W.oordeelBox({ q1: 20, m: 35, q3: 40 }, { q1: 35, m: 40, q3: 60 }), "gering"],        // medianen precies op de rand = binnen
  [W.oordeelBox({ q1: 20, m: 30, q3: 40 }, { q1: 30, m: 41, q3: 60 }), "middelmatig"],
  [W.oordeelBox({ q1: 30, m: 36, q3: 50 }, { q1: 42, m: 56, q3: 68 }), "middelmatig"],   // box-q2
  [W.oordeelBox({ q1: 30, m: 46, q3: 58 }, { q1: 38, m: 50, q3: 66 }), "gering"],        // box-q3
  [W.oordeelBox({ q1: 20, m: 28, q3: 36 }, { q1: 44, m: 55, q3: 64 }), "groot"]          // box-q1
];
T.forEach(([uit, wil], i) => { if (uit !== wil) fout.push(`vuistregeltest ${i}: ${uit}, verwacht ${wil}`); });
// generatoren van de widgets: oordeel moet passen bij de eigen getallen, ver genoeg van de grenzen
for (let k = 0; k < 2000; k++) {
  const e = W.maakE(); if (W.oordeelE(E(e.mA, e.mB, e.sA, e.sB)) !== e.oordeel) fout.push("maakE: oordeel past niet bij de getallen");
  const p = W.maakPhi(); if (W.oordeelPhi(phiF(p.a, p.b, p.cc, p.d)) !== p.oordeel) fout.push("maakPhi: oordeel past niet");
  if (W.oordeelPhi(rond(p.phi, 2)) !== p.oordeel) fout.push(`maakPhi: afgeronde phi ${rond(p.phi, 2)} geeft ander oordeel dan ${p.phi}`);
  if (W.oordeelE(rond(e.E, 2)) !== e.oordeel) fout.push(`maakE: afgeronde E ${rond(e.E, 2)} geeft ander oordeel dan ${e.E}`);
  const v = W.maakVcp(); if (Math.max(...v.A.map((a, i) => Math.abs(a - v.B[i]))) !== v.mx || v.A[v.A.length - 1] !== 100 || v.B[v.B.length - 1] !== 100 || v.nA <= 100 || v.nB <= 100) fout.push("maakVcp: klopt niet");
  if (v.A.some((x, i) => i && x < v.A[i - 1]) || v.B.some((x, i) => i && x < v.B[i - 1])) fout.push("maakVcp: cumulatief daalt");
}
const uniek = [...new Set(fout.map((m) => m.split(" | ")[0].replace(/antwoord [-\d.]+ ≠ narekening [-\d.]+/, "antwoord ≠ narekening").replace(/antwoord −?[\d.,]+ staat/, "antwoord staat")))];
console.log(`Nagerekend: ${nStatisch} vaste opgaven, ${nGen} gegenereerde opgaven, ${T.length} grensgevallen, 2000 widget-generaties.`);
uniek.slice(0, 60).forEach((m) => console.log("✖ " + m));
console.log(uniek.length ? `${uniek.length} verschillende fouten` : "Alles klopt ✔");
process.exit(uniek.length ? 1 : 0);
