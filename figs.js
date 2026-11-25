// Figuren (inline SVG). TW.fig(naam, (quiz) => svg); bij quiz = true weglaten wat het antwoord verklapt.
(function () {
  "use strict";
  const nl = TW.nl;
  const svg = (w, h, label, body) => `<svg class="fig" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${body}</svg>`;

  // ---------- H11 ----------
  TW.fig("evenredig", () => {
    const P = TW.plot({ x: [0, 10], y: [0, 50], xt: 2, yt: 10, xl: "x", yl: "y", h: 220 });
    return P.svg(P.assen() + P.fn((x) => 4 * x, "curve") + P.fn((x) => 48 / x, "curve4", 200)
      + P.tekst(8.2, 44, "y = 4 · x", "end", "k b pa") + P.tekst(5.2, 14, "y = 48 / x", "start", "k b pb")
      + P.punt(0, 0, "dotA", 5), "Een rechte lijn door de oorsprong en een hyperbool");
  });
  TW.fig("grenswaarde", () => {
    const P = TW.plot({ x: [0, 40], y: [0, 100], xt: 10, yt: 20, xl: "t", yl: "N", h: 220 });
    return P.svg(P.assen() + P.lijn(0, 80, 40, 80, "stip") + P.tekst(39, 80, "grenswaarde 80", "end", "k b pg", 0, -6)
      + P.fn((t) => 80 - 60 * Math.pow(0.9, t), "curve", 160) + P.punt(0, 20, "dotA", 5) + P.tekst(1.5, 20, "start: 20", "start", "k", 0, 4)
      + P.tekst(39, 52, "N = 80 − 60 · 0,9ᵗ", "end", "k b pa"), "Grafiek die afnemend stijgt naar de grenswaarde 80");
  });
  TW.fig("machten", () => {
    const P = TW.plot({ x: [0, 4], y: [0, 8], xt: 1, yt: 2, xl: "x", yl: "y", h: 230 });
    return P.svg(P.assen() + P.fn((x) => x * x, "curve", 160) + P.fn((x) => x, "curve3") + P.fn((x) => Math.sqrt(x), "curve5", 160) + P.fn((x) => 1 / x, "curve4", 200)
      + P.tekst(2.75, 7.2, "y = x²", "start", "k b pa", 4, 0) + P.tekst(3.9, 4.4, "y = x", "end", "k b") + P.tekst(3.9, 2.35, "y = √x", "end", "k b pg") + P.tekst(3.9, 0.6, "y = 1 / x", "end", "k b pb"),
      "Grafieken van vier machtsformules");
  });
  TW.fig("stijgvormen", () => {
    const vak = (i, naam, f) => {
      const x0 = 12 + (i % 2) * 166, y0 = 10 + Math.floor(i / 2) * 104; let d = "";
      for (let k = 0; k <= 30; k++) { const t = k / 30; d += (k ? "L" : "M") + (x0 + 10 + t * 130).toFixed(1) + " " + (y0 + 72 - f(t) * 62).toFixed(1); }
      return `<rect x="${x0}" y="${y0}" width="150" height="94" rx="8" class="kader"/><path d="${d}" class="curve"/><text x="${x0 + 75}" y="${y0 + 88}" text-anchor="middle" class="k b">${naam}</text>`;
    };
    return svg(340, 222, "Vier soorten stijgen en dalen", vak(0, "toenemend stijgend", (t) => t * t) + vak(1, "afnemend stijgend", (t) => Math.sqrt(t))
      + vak(2, "toenemend dalend", (t) => 1 - t * t) + vak(3, "afnemend dalend", (t) => (1 - t) * (1 - t)));
  });

  // ---------- H13 ----------
  TW.fig("meetniveaus", () => {
    const doos = (x, y, w, t, cls, sub) => `<rect x="${x}" y="${y}" width="${w}" height="${sub ? 42 : 30}" rx="8" class="kader"/><text x="${x + w / 2}" y="${y + 19}" text-anchor="middle" class="b ${cls || ""}">${t}</text>${sub ? `<text x="${x + w / 2}" y="${y + 34}" text-anchor="middle" class="k">${sub}</text>` : ""}`;
    const lijn = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="s"/>`;
    return svg(340, 200, "Schema van de vier meetniveaus",
      doos(120, 6, 100, "variabele") + lijn(170, 36, 88, 62) + lijn(170, 36, 252, 62)
      + doos(18, 62, 140, "kwalitatief", "pa", "woorden, categorieën") + doos(182, 62, 140, "kwantitatief", "pb", "getallen om mee te rekenen")
      + lijn(88, 104, 48, 138) + lijn(88, 104, 128, 138) + lijn(252, 104, 212, 138) + lijn(252, 104, 292, 138)
      + doos(8, 138, 76, "nominaal", "pa", "geen volgorde") + doos(90, 138, 76, "ordinaal", "pa", "wel volgorde")
      + doos(174, 138, 76, "discreet", "pb", "tellen") + doos(256, 138, 76, "continu", "pb", "meten"));
  });
  TW.fig("boxregels", () => {
    const X = (v) => 110 + v * 2.2;
    const paar = (y, titel, A, B) => {
      const bp = (g, yy, K) => `<line x1="${X(g[0])}" y1="${yy}" x2="${X(g[1])}" y2="${yy}" class="l${K}"/><line x1="${X(g[3])}" y1="${yy}" x2="${X(g[4])}" y2="${yy}" class="l${K}"/><rect x="${X(g[1])}" y="${yy - 10}" width="${X(g[3]) - X(g[1])}" height="20" class="box${K}"/><line x1="${X(g[2])}" y1="${yy - 10}" x2="${X(g[2])}" y2="${yy + 10}" class="m${K}"/>`;
      return `<rect x="4" y="${y}" width="332" height="84" rx="8" class="kader"/><text x="14" y="${y + 38}" class="g">${titel[0]}</text><text x="14" y="${y + 54}" class="k">${titel[1]}</text><text x="14" y="${y + 67}" class="k">${titel[2]}</text>` + bp(A, y + 26, "A") + bp(B, y + 58, "B");
    };
    return svg(340, 276, "De drie gevallen van de vuistregel voor boxplots",
      paar(4, ["groot", "boxen overlappen", "niet"], [5, 14, 22, 32, 42], [40, 52, 62, 74, 88])
      + paar(96, ["middelmatig", "overlap, mediaan", "buiten andere box"], [8, 20, 28, 46, 58], [26, 40, 54, 68, 84])
      + paar(188, ["gering", "overlap, medianen", "in elkaars box"], [8, 22, 40, 56, 70], [18, 32, 48, 66, 82]));
  });
  const BQ = {
    "box-q1": { a: { q1: 20, m: 28, q3: 36, wl: 8, wr: 9 }, b: { q1: 44, m: 55, q3: 64, wl: 10, wr: 12 } },
    "box-q2": { a: { q1: 30, m: 36, q3: 50, wl: 10, wr: 12 }, b: { q1: 42, m: 56, q3: 68, wl: 9, wr: 10 } },
    "box-q3": { a: { q1: 30, m: 46, q3: 58, wl: 10, wr: 10 }, b: { q1: 38, m: 50, q3: 66, wl: 12, wr: 9 } }
  };
  Object.keys(BQ).forEach((n) => TW.fig(n, (quiz) => TW.wa.boxSvg(BQ[n], { getallen: true, hulp: !quiz })));
  TW.fig("vcpfig", (quiz) => TW.wa.vcpPlot({ c: { st: 10, x: "reistijd (min)", a: "groep A", b: "groep B" }, gr: [0, 10, 20, 30, 40, 50], A: [0, 12, 40, 71, 93, 100], B: [0, 4, 17, 45, 80, 100], D: [0, 8, 23, 26, 13, 0], mx: 26, imax: 3 }, quiz ? null : 3, true));
  TW.fig("klok", () => {
    const mu = 0, f = (x) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
    const P = TW.plot({ x: [-3.3, 3.3], y: [0, 0.44], h: 210, ml: 10, mr: 10, mt: 8, mb: 34 });
    const stuk = (a, b, cls) => { const pts = [[a, 0]]; for (let i = 0; i <= 20; i++) { const x = a + ((b - a) * i) / 20; pts.push([x, f(x)]); } pts.push([b, 0]); return P.vlak(pts, cls); };
    let s = stuk(-3.3, -2, "vlak2") + stuk(-2, -1, "vlak4") + stuk(-1, 1, "vlak") + stuk(1, 2, "vlak4") + stuk(2, 3.3, "vlak2") + P.fn(f, "curve3", 160) + P.lijn(-3.3, 0, 3.3, 0, "s");
    ["μ − 2σ", "μ − σ", "μ", "μ + σ", "μ + 2σ"].forEach((t, i) => { const x = i - 2; s += P.lijn(x, 0, x, f(x), "stip") + P.tekst(x, 0, t, "middle", "k b", 0, 15); });
    s += P.tekst(-0.5, 0.15, "34%", "middle", "b") + P.tekst(0.5, 0.15, "34%", "middle", "b") + P.tekst(-1.5, 0.04, "13,5%", "middle", "k b") + P.tekst(1.5, 0.04, "13,5%", "middle", "k b")
      + P.tekst(-2.6, 0.035, "2,5%", "middle", "k b") + P.tekst(2.6, 0.035, "2,5%", "middle", "k b") + P.tekst(mu, 0, "68% binnen één σ · 95% binnen twee σ", "middle", "k", 0, 30);
    return P.svg(s, "Klokkromme met de vuistregels 68 procent en 95 procent");
  });
  TW.fig("cyclus", () => {
    const st = [["1", "Vraag", "onderzoeksvraag"], ["2", "Data", "verzamelen"], ["3", "Analyse", "tabel, grafiek, maat"], ["4", "Conclusie", "antwoord op de vraag"]];
    const pos = [[170, 12], [258, 78], [170, 144], [82, 78]];
    let s = `<path d="M228 44 Q262 50 268 74 M268 124 Q262 148 228 156 M112 156 Q78 150 72 124 M72 74 Q78 50 112 44" class="curve" marker-end="url(#pijl)"/>
      <defs><marker id="pijl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="dotA"/></marker></defs>`;
    st.forEach((t, i) => { const p = pos[i]; s += `<rect x="${p[0] - 58}" y="${p[1]}" width="116" height="46" rx="10" class="kader"/><text x="${p[0]}" y="${p[1] + 20}" text-anchor="middle" class="b pa">${t[0]}. ${t[1]}</text><text x="${p[0]}" y="${p[1] + 36}" text-anchor="middle" class="k">${t[2]}</text>`; });
    return svg(340, 204, "De statistische cyclus: vraag, data, analyse, conclusie", s);
  });
  TW.fig("misleid", () => {
    const staaf = (x0, titel, lo, hi) => {
      const Y = (v) => 150 - ((v - lo) / (hi - lo)) * 110; let s = `<text x="${x0 + 70}" y="16" text-anchor="middle" class="k b">${titel}</text><line x1="${x0 + 22}" y1="150" x2="${x0 + 140}" y2="150" class="s"/><line x1="${x0 + 22}" y1="150" x2="${x0 + 22}" y2="34" class="s"/>`;
      [lo, (lo + hi) / 2, hi].forEach((v) => (s += `<text x="${x0 + 18}" y="${Y(v) + 4}" text-anchor="end" class="k">${nl(v)}</text>`));
      [[52, "A"], [56, "B"]].forEach((d, i) => (s += `<rect x="${x0 + 42 + i * 48}" y="${Y(d[0])}" width="32" height="${150 - Y(d[0])}" class="${i ? "vlak4" : "vlak"}" style="fill-opacity:.7"/><text x="${x0 + 58 + i * 48}" y="165" text-anchor="middle" class="k b">${d[1]} ${d[0]}</text>`));
      return s;
    };
    return svg(340, 172, "Hetzelfde verschil met een afgekapte en een eerlijke verticale as", staaf(0, "as begint bij 50", 50, 58) + staaf(170, "as begint bij 0", 0, 60));
  });

  // ---------- Vaardigheden 5 ----------
  TW.fig("topsnijfig", () => {
    const P = TW.plot({ x: [0, 10], y: [0, 60], xt: 2, yt: 10, xl: "x", yl: "y", h: 220 });
    const f = (x) => -2 * (x - 4) * (x - 4) + 50, g = (x) => 4 * x + 18;
    return P.svg(P.assen() + P.fn(f, "curve", 200) + P.fn(g, "curve4") + P.punt(4, 50, "dotA", 5.5) + P.tekst(4, 50, "top (4, 50)", "middle", "k b pa", 0, -8)
      + P.punt(6, 42, "dot", 5.5) + P.tekst(6, 42, "snijpunt (6, 42)", "start", "k b", 8, 4) + P.punt(0, 18, "dot", 5.5) + P.tekst(0, 18, "snijpunt (0, 18)", "start", "k b", 8, 12) + P.punt(9, 0, "dot", 5) + P.tekst(9, 0, "nulpunt", "end", "k b", -7, -6), "Parabool y = −2(x − 4)² + 50 met top, twee snijpunten met de lijn y = 4x + 18 en een nulpunt");
  });
  TW.fig("lijnfig", () => {
    const P = TW.plot({ x: [0, 10], y: [0, 50], xt: 2, yt: 10, xl: "x", yl: "y", h: 210 });
    return P.svg(P.assen() + P.fn((x) => 3 * x + 10, "curve") + P.punt(2, 16, "dotA", 5) + P.punt(8, 34, "dotA", 5) + P.lijn(2, 16, 8, 16, "stip") + P.lijn(8, 16, 8, 34, "stip")
      + P.tekst(5, 16, "6 naar rechts", "middle", "k b", 0, 14) + P.tekst(8, 25, "18 omhoog", "start", "k b", 6, 4) + P.tekst(0, 10, "startgetal 10", "start", "k b pa", 8, -8), "Lijn door (2, 16) en (8, 34) met hellingsdriehoek");
  });
})();
