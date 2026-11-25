// Interactieve onderdelen bij H13 (statistiek). Gebruikt de hulpfuncties uit widgets.js (TW.wa).
(function () {
  "use strict";
  const nl = TW.nl, R = TW.R, fmt = TW.fmt, W = TW.wa;
  const { oordeelE, oordeelPhi, oordeelVcp, oordeelBox, phi, badge, OORDELEN, mn, klem, r9, oefenBlok, mcBlok } = W;
  const dichtbij = (x, grenzen, marge) => grenzen.some((g) => Math.abs(Math.abs(x) - g) < marge);

  // ---------- gedeelde generatoren (ook gebruikt door de rekenopgaven in data-h13.js) ----------
  const ECTX = [
    { w: "het cijfer voor wiskunde", a: "klas 5A", b: "klas 5B", m: [5.5, 7.5], s: [0.8, 1.6], d: 1, e: "" },
    { w: "de reistijd naar school in minuten", a: "de fietsers", b: "de busreizigers", m: [15, 35], s: [4, 9], d: 1, e: "minuten" },
    { w: "de slaapduur in uren", a: "de onderbouwers", b: "de bovenbouwers", m: [7, 8.6], s: [0.6, 1.4], d: 1, e: "uur" },
    { w: "de score op een leestoets", a: "school A", b: "school B", m: [55, 75], s: [8, 14], d: 0, e: "punten" },
    { w: "het aantal stappen per dag (in duizendtallen)", a: "de sporters", b: "de niet-sporters", m: [6, 10], s: [1.5, 3], d: 1, e: "" }
  ];
  W.maakE = function () {
    for (;;) {
      const c = R.kies(ECTX), rd = (x) => R.rond(x, c.d), u = (a, b) => a + Math.random() * (b - a);
      const s1 = rd(u(c.s[0], c.s[1])), s2 = rd(u(c.s[0], c.s[1])), sg = (s1 + s2) / 2;
      const verschil = rd(u(0.1, 1.4) * sg), laag = rd(u(c.m[0], c.m[1])), hoog = rd(laag + verschil);
      if (verschil <= 0 || s1 <= 0 || s2 <= 0) continue;
      const E = (hoog - laag) / sg;
      if (dichtbij(E, [0.4, 0.8], 0.012)) continue;
      const wissel = Math.random() < 0.5;
      return { c, mA: wissel ? laag : hoog, sA: wissel ? s2 : s1, mB: wissel ? hoog : laag, sB: wissel ? s1 : s2, hoog, laag, sg: r9(sg), verschil: r9(hoog - laag), E, oordeel: oordeelE(E) };
    }
  };
  const PCTX = [
    { r: ["jongens", "meisjes"], k: ["bijbaan", "geen bijbaan"], wat: "het hebben van een bijbaan" },
    { r: ["havo", "vwo"], k: ["sport", "geen sport"], wat: "sporten" },
    { r: ["onderbouw", "bovenbouw"], k: ["fiets", "anders"], wat: "het vervoer naar school" },
    { r: ["middel", "placebo"], k: ["beter", "niet beter"], wat: "het herstel" },
    { r: ["stad", "dorp"], k: ["abonnement", "geen abonnement"], wat: "het hebben van een sportabonnement" }
  ];
  W.maakPhi = function () {
    for (;;) {
      const c = R.kies(PCTX), n1 = 10 * R.int(4, 15), n2 = 10 * R.int(4, 15), p1 = 0.15 + Math.random() * 0.7;
      const p2 = p1 + R.kies([-1, 1]) * R.kies([0.03, 0.08, 0.15, 0.22, 0.3, 0.4, 0.5]);
      if (p2 < 0.08 || p2 > 0.92) continue;
      const a = Math.round(n1 * p1), b = n1 - a, cc = Math.round(n2 * p2), d = n2 - cc;
      if (Math.min(a, b, cc, d) < 5) continue;
      const f = phi(a, b, cc, d);
      if (dichtbij(f, [0.2, 0.4], 0.012)) continue;
      return { c, a, b, cc, d, phi: f, oordeel: oordeelPhi(f) };
    }
  };
  const VCTX = [
    { x: "reistijd (min)", s: 0, st: 10, a: "fietsers", b: "busreizigers" },
    { x: "toetsscore", s: 20, st: 10, a: "klas 5A", b: "klas 5B" },
    { x: "sporturen per maand", s: 0, st: 5, a: "jongens", b: "meisjes" },
    { x: "schermtijd (uren per week)", s: 5, st: 5, a: "onderbouw", b: "bovenbouw" }
  ];
  W.maakVcp = function (k) {
    k = k || 6;
    const verdeel = (c, s) => {
      const w = []; for (let i = 0; i < k; i++) w.push(Math.exp(-Math.pow(i + 0.5 - c, 2) / (2 * s * s)) + 0.03);
      const som = w.reduce((a, b) => a + b, 0), pc = w.map((x) => Math.round((100 * x) / som));
      pc[pc.indexOf(Math.max.apply(null, pc))] += 100 - pc.reduce((a, b) => a + b, 0);
      const cum = [0]; pc.forEach((x) => cum.push(cum[cum.length - 1] + x)); return cum;
    };
    for (;;) {
      const c = R.kies(VCTX), cA = k / 4 + Math.random() * (k / 4), d = R.kies([0.3, 0.6, 0.9, 1.3, 1.8, 2.3]) * (k / 6);
      const A = verdeel(cA, 1 + Math.random() * 0.5), B = verdeel(cA + d, 1 + Math.random() * 0.5);
      const D = A.map((a, i) => Math.abs(a - B[i])), mx = Math.max.apply(null, D);
      if (D.filter((x) => x === mx).length !== 1 || mx < 4) continue;
      const gr = A.map((_, i) => c.s + i * c.st);
      return { c, gr, A, B, D, mx, imax: D.indexOf(mx), oordeel: oordeelVcp(mx), nA: 10 * R.int(11, 40), nB: 10 * R.int(11, 40) };
    }
  };

  // ------------------------------------------------------------------ Steekproef-simulator
  TW.widget("steekproef", {
    titel: "Steekproef-simulator", icoon: "🎲",
    uitleg: "In de populatie heeft een vast deel het kenmerk. Trek steeds opnieuw een steekproef: de steekproefproporties stapelen zich op en bij elke steekproef hoort een 95%-betrouwbaarheidsinterval. Hoe vaak bevat dat interval de echte waarde?",
    maak(el, api) {
      let p = 0.4, n = 100, N = 0, raak = 0, somB = 0, bins = {}, laatste = [], timer = null, laatsteBin = null, q1af = false, q2af = false;
      const breedtes = {}, BW = { 25: 0.04, 100: 0.02, 400: 0.01, 1600: 0.005 };
      el.innerHTML = `
        <label class="schuif"><span>Echte proportie in de populatie</span><output class="op"></output><input class="sp" type="range" min="0.3" max="0.7" step="0.05" value="0.4"></label>
        <p class="meta">Steekproefomvang n</p>
        <div class="keuze kn">${[25, 100, 400, 1600].map((k) => `<button class="btn ${k === 100 ? "aan" : ""}" data-n="${k}">n = ${k}</button>`).join("")}</div>
        <div class="kz3"><button class="btn" data-t="1">Trek 1</button><button class="btn" data-t="10">Trek 10</button><button class="btn primary" data-t="100">Trek 100</button></div>
        <div class="g1"></div><p class="bij">Stapel van steekproefproporties. De stippellijn is de echte waarde.</p>
        <div class="g2"></div><p class="bij">De laatste 20 intervallen: groen bevat de echte waarde, rood mist.</p>
        <div class="statrij"><div><b class="sN">0</b><span>steekproeven</span></div><div><b class="sR">–</b><span>interval raak</span></div><div><b class="sB">–</b><span>gem. breedte</span></div></div>
        <button class="btn klein wis">Wis en begin opnieuw</button>
        <div class="q1"></div><div class="q2"></div>`;
      const q = (s) => el.querySelector(s);
      const X = (v) => 20 + ((v - (p - 0.3)) / 0.6) * 300;
      function trek1() {
        let k = 0; for (let i = 0; i < n; i++) if (Math.random() < p) k++;
        const ph = k / n, m = 2 * Math.sqrt((ph * (1 - ph)) / n), ok = ph - m <= p && p <= ph + m;
        N++; if (ok) raak++; somB += 2 * m;
        laatsteBin = Math.round(ph / BW[n]); bins[laatsteBin] = (bins[laatsteBin] || 0) + 1;
        laatste.push({ ph, m, ok }); if (laatste.length > 20) laatste.shift();
      }
      function as(y) {
        let s = `<line x1="20" y1="${y}" x2="320" y2="${y}" class="s"/>`;
        for (let i = -3; i <= 3; i++) { const v = R.rond(p + i * 0.1, 2); s += `<line x1="${X(v)}" y1="${y}" x2="${X(v)}" y2="${y + 4}" class="s"/><text x="${X(v)}" y="${y + 16}" text-anchor="middle" class="k">${nl(v, 1)}</text>`; }
        return s;
      }
      function teken() {
        const bw = BW[n], pxw = bw * 500, keys = Object.keys(bins).map(Number), maxc = Math.max(1, Math.max.apply(null, keys.map((k) => bins[k]).concat([1])));
        const eenheid = Math.min(9, 96 / maxc);
        let s1 = as(112);
        keys.forEach((k) => {
          const v = k * bw; if (v < p - 0.3 - 1e-9 || v > p + 0.3 + 1e-9) return;
          const hgt = bins[k] * eenheid;
          s1 += `<rect x="${(X(v) - pxw / 2 + 0.4).toFixed(1)}" y="${(112 - hgt).toFixed(1)}" width="${Math.max(1.2, pxw - 0.8).toFixed(1)}" height="${hgt.toFixed(1)}" class="staaf${k === laatsteBin ? " nieuw" : ""}"/>`;
        });
        s1 += `<line x1="${X(p)}" y1="6" x2="${X(p)}" y2="112" class="echt"/><text x="${X(p) + 5}" y="14" class="k b">echte waarde ${nl(p, 2)}</text>`;
        q(".g1").innerHTML = `<svg class="fig" viewBox="0 0 340 132" role="img" aria-label="Stapel van steekproefproporties">${s1}</svg>`;
        let s2 = as(132);
        laatste.forEach((d, i) => {
          const y = 8 + i * 6, a = klem(d.ph - d.m, p - 0.3, p + 0.3), b = klem(d.ph + d.m, p - 0.3, p + 0.3);
          s2 += `<line x1="${X(a).toFixed(1)}" y1="${y}" x2="${X(b).toFixed(1)}" y2="${y}" class="${d.ok ? "ok" : "mis"}"/>`;
        });
        s2 += `<line x1="${X(p)}" y1="2" x2="${X(p)}" y2="132" class="echt"/>`;
        q(".g2").innerHTML = `<svg class="fig" viewBox="0 0 340 152" role="img" aria-label="De laatste twintig betrouwbaarheidsintervallen">${s2}</svg>`;
        q(".op").textContent = nl(p, 2);
        q(".sN").textContent = N;
        q(".sR").textContent = N ? nl((100 * raak) / N, 1) + "%" : "–";
        q(".sB").textContent = N ? nl(somB / N, 3) : "–";
        if (N >= 20) breedtes[n] = somB / N;
        if (!q1af) {
          const kn = el.querySelectorAll(".q1 [data-n]");
          if (N >= 100 && kn.length && kn[0].disabled && !q(".q1 .goed")) vraag1();
        }
        const memo = q(".q2 .memo");
        if (memo) memo.textContent = Object.keys(breedtes).length ? "Gemeten: " + Object.keys(breedtes).map((k) => `n = ${k} → breedte ${nl(breedtes[k], 3)}`).join(" · ") : "";
      }
      function wis() { clearInterval(timer); timer = null; N = 0; raak = 0; somB = 0; bins = {}; laatste = []; laatsteBin = null; teken(); }
      function trek(k) {
        if (timer) return;
        if (k <= 10) { for (let i = 0; i < k; i++) trek1(); teken(); return; }
        let over = k;
        timer = setInterval(() => { for (let i = 0; i < 5 && over > 0; i++, over--) trek1(); teken(); if (over <= 0) { clearInterval(timer); timer = null; } }, 45);
      }
      api.opruimen(() => clearInterval(timer));
      function klaarCheck() { if (q1af && q2af) api.klaar(); }
      function vraag1() {
        mcBlok(q(".q1"), api, {
          kop: "Vraag 1", vraag: "Trek minstens 100 steekproeven. Welk deel van de intervallen bevat de echte waarde?",
          opties: ["ongeveer 95%", "ongeveer 68%", "precies 100%", "ongeveer 50%"],
          uit: N >= 100 ? "" : "Trek eerst 100 steekproeven, dan kun je antwoorden.",
          uitleg: () => `Bij jou is het nu ${nl((100 * raak) / N, 1)}% van ${N} steekproeven. Daarom heet het een 95%-betrouwbaarheidsinterval: bij ongeveer 95 van de 100 steekproeven ligt de echte waarde in het interval. Ongeveer 1 op de 20 keer zit je er dus naast.`,
          fout: ["68% hoort bij één standaardafwijking. Het interval gebruikt twee standaardafwijkingen.", "Kijk naar de rode streepjes: af en toe mist het interval de echte waarde.", "Tel de rode streepjes: het zijn er veel minder dan de helft."],
          goed: () => { q1af = true; klaarCheck(); }
        });
      }
      function vraag2() {
        mcBlok(q(".q2"), api, {
          kop: "Vraag 2", vraag: `Trek 100 steekproeven bij n = 100 en kijk naar de gemiddelde breedte. Kies dan n = 400 (4 keer zo groot) en trek er weer 100. Wat gebeurt er met de breedte van het interval?<br><span class="meta memo"></span>`,
          opties: ["wordt 2 keer zo klein", "wordt 4 keer zo klein", "blijft ongeveer gelijk", "wordt 2 keer zo groot"],
          uitleg: () => "In de formule staat √n in de noemer. Wordt n 4 keer zo groot, dan wordt √n 2 keer zo groot en het interval dus 2 keer zo smal. Voor een 2 keer zo nauwkeurige schatting heb je 4 keer zoveel mensen nodig.",
          fout: ["Vergelijk de twee gemeten breedtes: de factor is kleiner dan 4, want in de formule staat √n.", "Kijk naar de gemeten breedtes: een grotere steekproef geeft een smaller interval.", "Een grotere steekproef geeft juist meer zekerheid, dus een smaller interval."],
          goed: () => { q2af = true; klaarCheck(); }
        });
      }
      q(".sp").oninput = (e) => { p = R.rond(+e.target.value, 2); wis(); };
      el.querySelectorAll("[data-n]").forEach((b) => (b.onclick = () => { if (!b.parentNode.classList.contains("kn")) return; n = +b.dataset.n; el.querySelectorAll(".kn .btn").forEach((k) => k.classList.toggle("aan", k === b)); wis(); }));
      el.querySelectorAll("[data-t]").forEach((b) => (b.onclick = () => trek(+b.dataset.t)));
      q(".wis").onclick = wis;
      vraag1(); vraag2(); teken();
    }
  });

  // ------------------------------------------------------------------ Betrouwbaarheidsinterval-rekenaar
  function biLijn(lo, mid, hi, dec, claim, claimTekst) {
    const w = Math.max(hi - lo, 1e-9); let a = lo - 0.45 * w, b = hi + 0.45 * w;
    if (claim != null) { a = Math.min(a, claim - 0.15 * w); b = Math.max(b, claim + 0.15 * w); }
    const X = (v) => 24 + ((v - a) / (b - a)) * 292, f = (v) => nl(v, dec);
    let s = `<line x1="12" y1="58" x2="328" y2="58" class="s"/>`
      + `<line x1="${X(lo).toFixed(1)}" y1="58" x2="${X(hi).toFixed(1)}" y2="58" class="dik"/>`
      + `<line x1="${X(lo).toFixed(1)}" y1="48" x2="${X(lo).toFixed(1)}" y2="68" class="s"/><line x1="${X(hi).toFixed(1)}" y1="48" x2="${X(hi).toFixed(1)}" y2="68" class="s"/>`
      + `<circle cx="${X(mid).toFixed(1)}" cy="58" r="5.5" class="dot"/>`
      + `<text x="${X(lo).toFixed(1)}" y="84" text-anchor="middle" class="b">${f(lo)}</text><text x="${X(hi).toFixed(1)}" y="84" text-anchor="middle" class="b">${f(hi)}</text>`
      + `<text x="${X(mid).toFixed(1)}" y="42" text-anchor="middle" class="k">${f(mid)}</text>`
      + `<text x="${((X(lo) + X(mid)) / 2).toFixed(1)}" y="22" text-anchor="middle" class="k pg">− marge</text><text x="${((X(hi) + X(mid)) / 2).toFixed(1)}" y="22" text-anchor="middle" class="k pg">+ marge</text>`;
    if (claim != null) {
      const binnen = claim >= lo && claim <= hi;
      s += `<line x1="${X(claim).toFixed(1)}" y1="34" x2="${X(claim).toFixed(1)}" y2="94" class="${binnen ? "ok" : "mis"}"/><text x="${X(claim).toFixed(1)}" y="108" text-anchor="${X(claim) > 250 ? "end" : X(claim) < 90 ? "start" : "middle"}" class="k b ${binnen ? "pg" : "pr"}">${claimTekst}</text>`;
    }
    return `<svg class="fig" viewBox="0 0 340 ${claim != null ? 114 : 92}" role="img" aria-label="Getallenlijn met het betrouwbaarheidsinterval">${s}</svg>`;
  }
  W.biLijn = biLijn;
  TW.fig("bi-lijn", () => biLijn(0.3805, 0.43, 0.4795, 3));

  TW.widget("bi", {
    titel: "Betrouwbaarheidsinterval", icoon: "📏",
    uitleg: "Reken een 95%-betrouwbaarheidsinterval stap voor stap uit en zie het op de getallenlijn. Oefen daarna met nieuwe opgaven.",
    maak(el, api) {
      let soort = "p";
      el.innerHTML = `<div class="keuze ks"><button class="btn aan" data-s="p">Proportie</button><button class="btn" data-s="g">Gemiddelde</button></div>
        <div class="formule fl"></div><div class="inv"></div><ol class="stappen wstap uitw"></ol><div class="lijn"></div><div class="oef"></div>`;
      const q = (s) => el.querySelector(s), lees = W.lees;
      const veld = (cls, lab, v) => `<label class="veld"><span>${lab}</span><span class="vin"><input class="getal ${cls}" inputmode="decimal" autocomplete="off" value="${v}"></span></label>`;
      function reken() {
        const uit = q(".uitw"), lijn = q(".lijn");
        if (soort === "p") {
          const k = lees(q(".ik").value), n = lees(q(".in").value);
          if (k == null || n == null || n <= 0 || k < 0 || k > n) { uit.innerHTML = "<li>Vul een aantal in dat past bij de steekproefomvang.</li>"; lijn.innerHTML = ""; return; }
          const p = k / n, sd = Math.sqrt((p * (1 - p)) / n), m = 2 * sd;
          uit.innerHTML = [`Steekproefproportie: p = ${nl(k)} / ${nl(n)} = ${nl(R.rond(p, 4))}`,
            `√(p · (1 − p) / n) = √(${nl(R.rond(p, 4))} · ${nl(R.rond(1 - p, 4))} / ${nl(n)}) = ${nl(R.rond(sd, 4))}`,
            `Marge: 2 · ${nl(R.rond(sd, 4))} = ${nl(R.rond(m, 4))}`,
            `Interval: van ${nl(R.rond(p, 4))} − ${nl(R.rond(m, 4))} = **${nl(R.rond(p - m, 3), 3)}** tot ${nl(R.rond(p, 4))} + ${nl(R.rond(m, 4))} = **${nl(R.rond(p + m, 3), 3)}**`,
            `In procenten: tussen ${nl(R.rond(100 * (p - m), 1), 1)}% en ${nl(R.rond(100 * (p + m), 1), 1)}%`].map((s) => `<li>${fmt(s)}</li>`).join("");
          lijn.innerHTML = biLijn(p - m, p, p + m, 3);
        } else {
          const x = lees(q(".ix").value), s = lees(q(".is").value), n = lees(q(".in").value);
          if (x == null || s == null || n == null || n <= 0 || s < 0) { uit.innerHTML = "<li>Vul drie getallen in.</li>"; lijn.innerHTML = ""; return; }
          const sd = s / Math.sqrt(n), m = 2 * sd;
          uit.innerHTML = [`S / √n = ${nl(s)} / √${nl(n)} = ${nl(R.rond(sd, 4))}`,
            `Marge: 2 · ${nl(R.rond(sd, 4))} = ${nl(R.rond(m, 4))}`,
            `Interval: van ${nl(x)} − ${nl(R.rond(m, 4))} = **${nl(R.rond(x - m, 2), 2)}** tot ${nl(x)} + ${nl(R.rond(m, 4))} = **${nl(R.rond(x + m, 2), 2)}**`].map((t) => `<li>${fmt(t)}</li>`).join("");
          lijn.innerHTML = biLijn(x - m, x, x + m, 2);
        }
      }
      const u = (a, b) => a + Math.random() * (b - a);
      const kiesClaim = (lo, hi, mid, dec) => {
        for (;;) {
          const binnen = Math.random() < 0.5, m = (hi - lo) / 2;
          const c = R.rond(mid + R.kies([-1, 1]) * m * (binnen ? u(0.1, 0.7) : u(1.3, 2.2)), dec);
          if (Math.abs(c - lo) > 0.6 * Math.pow(10, -dec) + m * 0.08 && Math.abs(c - hi) > 0.6 * Math.pow(10, -dec) + m * 0.08) return c;
        }
      };
      const genP = () => {
        const ctx = R.kies([["scholieren", "elke dag te ontbijten"], ["inwoners", "voor het plan te zijn"], ["klanten", "tevreden te zijn over de service"], ["jongeren", "elke week te sporten"], ["reizigers", "meestal met de trein te gaan"]]);
        const n = R.kies([100, 150, 200, 250, 400, 500, 625, 800, 1000]), k = Math.round((n * R.int(15, 85)) / 100);
        const p = k / n, m = 2 * Math.sqrt((p * (1 - p)) / n), lo = p - m, hi = p + m, claim = kiesClaim(lo, hi, p, 2), binnen = claim >= lo && claim <= hi;
        return {
          html: `<p>In een aselecte steekproef van <b>${n}</b> ${ctx[0]} zeggen er <b>${k}</b> ${ctx[1]}. Bereken het 95%-betrouwbaarheidsinterval voor de proportie in de hele populatie. Rond de grenzen af op 3 decimalen.</p>`,
          velden: [{ label: "Linkergrens", antwoord: R.rond(lo, 3), tol: 0.0011, toon: nl(R.rond(lo, 3), 3) }, { label: "Rechtergrens", antwoord: R.rond(hi, 3), tol: 0.0011, toon: nl(R.rond(hi, 3), 3) }],
          keuze: { vraag: `Iemand beweert dat de proportie in de populatie <b>${nl(claim, 2)}</b> is. Past dat bij deze steekproef?`, opties: ["ja, het ligt in het interval", "nee, het ligt erbuiten"], goed: binnen ? 0 : 1 },
          stappen: [`p = ${k} / ${n} = ${nl(R.rond(p, 4))}`, `√(p · (1 − p) / n) = √(${nl(R.rond(p, 4))} · ${nl(R.rond(1 - p, 4))} / ${n}) = ${nl(R.rond(m / 2, 4))}`, `Marge: 2 · ${nl(R.rond(m / 2, 4))} = ${nl(R.rond(m, 4))}`,
            `Interval: ${nl(R.rond(p, 4))} ± ${nl(R.rond(m, 4))}, dus van ${nl(R.rond(lo, 3), 3)} tot ${nl(R.rond(hi, 3), 3)}`, `${nl(claim, 2)} ligt ${binnen ? "in het interval: de bewering past bij de steekproef" : "buiten het interval: de bewering past niet bij de steekproef"}.`],
          na: (e) => { e.innerHTML = biLijn(lo, p, hi, 3, claim, "bewering " + nl(claim, 2)); }
        };
      };
      const genG = () => {
        const c = R.kies([{ w: "de slaapduur", e: "uur", m: [6.5, 8.5], s: [0.8, 1.6], d: 1 }, { w: "de reistijd", e: "minuten", m: [18, 45], s: [6, 15], d: 0 }, { w: "het zakgeld per maand", e: "euro", m: [30, 80], s: [10, 25], d: 0 }, { w: "de schermtijd per dag", e: "uur", m: [3, 6], s: [1, 2.2], d: 1 }]);
        const n = R.kies([64, 100, 144, 225, 400]), x = R.rond(u(c.m[0], c.m[1]), c.d), s = R.rond(u(c.s[0], c.s[1]), c.d), m = (2 * s) / Math.sqrt(n), lo = x - m, hi = x + m;
        const claim = kiesClaim(lo, hi, x, 1), binnen = claim >= lo && claim <= hi;
        return {
          html: `<p>Van <b>${n}</b> aselect gekozen leerlingen is ${c.w} gemeten. Het steekproefgemiddelde is <b>${nl(x)}</b> ${c.e} met standaardafwijking <b>${nl(s)}</b> ${c.e}. Bereken het 95%-betrouwbaarheidsinterval voor het populatiegemiddelde. Rond de grenzen af op 2 decimalen.</p>`,
          velden: [{ label: "Linkergrens", antwoord: R.rond(lo, 2), tol: 0.011, toon: nl(R.rond(lo, 2), 2) }, { label: "Rechtergrens", antwoord: R.rond(hi, 2), tol: 0.011, toon: nl(R.rond(hi, 2), 2) }],
          keuze: { vraag: `Iemand beweert dat het populatiegemiddelde <b>${nl(claim, 1)}</b> ${c.e} is. Past dat bij deze steekproef?`, opties: ["ja, het ligt in het interval", "nee, het ligt erbuiten"], goed: binnen ? 0 : 1 },
          stappen: [`S / √n = ${nl(s)} / √${n} = ${nl(s)} / ${nl(Math.sqrt(n))} = ${nl(R.rond(m / 2, 4))}`, `Marge: 2 · ${nl(R.rond(m / 2, 4))} = ${nl(R.rond(m, 4))}`,
            `Interval: ${nl(x)} ± ${nl(R.rond(m, 4))}, dus van ${nl(R.rond(lo, 2), 2)} tot ${nl(R.rond(hi, 2), 2)}`, `${nl(claim, 1)} ligt ${binnen ? "in het interval: de bewering past bij de steekproef" : "buiten het interval: de bewering past niet bij de steekproef"}.`],
          na: (e) => { e.innerHTML = biLijn(lo, x, hi, 2, claim, "bewering " + nl(claim, 1)); }
        };
      };
      function kies(s) {
        soort = s; el.querySelectorAll("[data-s]").forEach((b) => b.classList.toggle("aan", b.dataset.s === s));
        q(".fl").innerHTML = s === "p" ? "p ± 2 · √( p · (1 − p) / n )" : "X̄ ± 2 · S / √n";
        q(".inv").innerHTML = s === "p" ? veld("ik", "Aantal met het kenmerk", "172") + veld("in", "Steekproefomvang n", "400")
          : veld("ix", "Steekproefgemiddelde X̄", "7,4") + veld("is", "Standaardafwijking S", "1,1") + veld("in", "Steekproefomvang n", "121");
        el.querySelectorAll(".inv input").forEach((i) => (i.oninput = reken));
        reken();
        oefenBlok(q(".oef"), api, s === "p" ? genP : genG);
      }
      el.querySelectorAll("[data-s]").forEach((b) => (b.onclick = () => kies(b.dataset.s)));
      kies("p");
    }
  });

  // ------------------------------------------------------------------ Boxplot-vergelijker
  const BX = (v) => 20 + v * 3, BIX = (px) => (px - 20) / 3, RY = { a: 56, b: 164 };
  function boxBeeld(G, opt) {
    opt = opt || {};
    let s = `<line x1="${BX(0)}" y1="222" x2="${BX(100)}" y2="222" class="s"/>`;
    for (let v = 0; v <= 100; v += 10) s += `<line x1="${BX(v)}" y1="222" x2="${BX(v)}" y2="226" class="s"/><text x="${BX(v)}" y="240" text-anchor="middle" class="k">${v}</text>`;
    const lo = Math.max(G.a.q1, G.b.q1), hi = Math.min(G.a.q3, G.b.q3);
    if (opt.hulp && hi >= lo) s += `<rect x="${BX(lo)}" y="34" width="${Math.max(1.5, BX(hi) - BX(lo))}" height="152" class="vlak3"/>`;
    ["a", "b"].forEach((k) => {
      const g = G[k], y = RY[k], K = k.toUpperCase(), mi = g.q1 - g.wl, ma = g.q3 + g.wr, kl = k === "a" ? "pa" : "pb";
      if (opt.hulp) s += `<line x1="${BX(g.m)}" y1="34" x2="${BX(g.m)}" y2="186" class="stip"/>`;
      s += `<line x1="${BX(mi)}" y1="${y}" x2="${BX(g.q1)}" y2="${y}" class="l${K}"/><line x1="${BX(g.q3)}" y1="${y}" x2="${BX(ma)}" y2="${y}" class="l${K}"/>`
        + `<line x1="${BX(mi)}" y1="${y - 8}" x2="${BX(mi)}" y2="${y + 8}" class="l${K}"/><line x1="${BX(ma)}" y1="${y - 8}" x2="${BX(ma)}" y2="${y + 8}" class="l${K}"/>`
        + `<rect x="${BX(g.q1)}" y="${y - 18}" width="${BX(g.q3) - BX(g.q1)}" height="36" class="box${K}"/><line x1="${BX(g.m)}" y1="${y - 18}" x2="${BX(g.m)}" y2="${y + 18}" class="m${K}"/>`
        + `<text x="3" y="${y + 5}" class="g ${kl}">${K}</text>`;
      if (opt.grepen) {
        const gc = k === "a" ? "greep" : "greepB";
        s += `<line x1="${BX(g.m)}" y1="${y - 18}" x2="${BX(g.m)}" y2="${y - 30}" class="l${K}"/><circle cx="${BX(g.m)}" cy="${y - 30}" r="9" class="${gc}"/><text x="${BX(g.m)}" y="${y - 43}" text-anchor="middle" class="k b ${kl}">${g.m}</text>`
          + `<line x1="${BX(g.q1)}" y1="${y + 18}" x2="${BX(g.q1)}" y2="${y + 30}" class="l${K}"/><circle cx="${BX(g.q1)}" cy="${y + 30}" r="9" class="${gc}"/><text x="${BX(g.q1) - 12}" y="${y + 34}" text-anchor="end" class="k b ${kl}">${g.q1}</text>`
          + `<line x1="${BX(g.q3)}" y1="${y + 18}" x2="${BX(g.q3)}" y2="${y + 30}" class="l${K}"/><circle cx="${BX(g.q3)}" cy="${y + 30}" r="9" class="${gc}"/><text x="${BX(g.q3) + 12}" y="${y + 34}" text-anchor="start" class="k b ${kl}">${g.q3}</text>`;
      } else if (opt.getallen) {
        s += `<text x="${BX(g.m)}" y="${y - 23}" text-anchor="middle" class="k b ${kl}">${g.m}</text><text x="${BX(g.q1)}" y="${y + 31}" text-anchor="middle" class="k ${kl}">${g.q1}</text><text x="${BX(g.q3)}" y="${y + 31}" text-anchor="middle" class="k ${kl}">${g.q3}</text>`;
      }
    });
    return s;
  }
  const boxSvg = (G, opt) => `<svg class="fig" viewBox="0 0 340 246" role="img" aria-label="Twee boxplots boven een getallenlijn">${boxBeeld(G, opt)}</svg>`;
  function boxUitleg(G) {
    const A = G.a, B = G.b, o = oordeelBox(A, B), ov = !(A.q3 < B.q1 || B.q3 < A.q1), buiten = [];
    if (A.m < B.q1 || A.m > B.q3) buiten.push(`mediaan A (${A.m}) ligt buiten box B (${B.q1} tot ${B.q3})`);
    if (B.m < A.q1 || B.m > A.q3) buiten.push(`mediaan B (${B.m}) ligt buiten box A (${A.q1} tot ${A.q3})`);
    const tekst = !ov ? `De boxen overlappen niet: box A loopt van ${A.q1} tot ${A.q3} en box B van ${B.q1} tot ${B.q3}. Dus is het verschil groot.`
      : buiten.length ? `De boxen overlappen wel, maar ${buiten.join(" en ")}. Dus is het verschil middelmatig.`
        : "De boxen overlappen en beide medianen liggen binnen de box van de andere groep. Dus is het verschil gering.";
    return { o, ov, buiten, tekst };
  }
  W.boxSvg = boxSvg; W.boxUitleg = boxUitleg;
  W.maakBox = function (wil) {
    for (;;) {
      const q1 = R.int(12, 50), w = R.int(12, 28), s = R.int(-30, 32), w2 = R.int(12, 28);
      const a = { q1, q3: q1 + w, m: q1 + R.int(3, w - 3), wl: R.int(5, 12), wr: R.int(5, 14) };
      const b = { q1: q1 + s, q3: q1 + s + w2, m: q1 + s + R.int(3, w2 - 3), wl: R.int(5, 12), wr: R.int(5, 14) };
      if (a.q1 - a.wl < 0 || a.q3 + a.wr > 100 || b.q1 - b.wl < 0 || b.q3 + b.wr > 100) continue;
      if ([a.q3 - b.q1, b.q3 - a.q1, a.m - b.q1, a.m - b.q3, b.m - a.q1, b.m - a.q3].some((x) => Math.abs(x) < 2)) continue;
      if (!wil || oordeelBox(a, b) === wil) return { a, b };
    }
  };

  TW.widget("boxplot", {
    titel: "Boxplot-vergelijker", icoon: "📦",
    uitleg: "Sleep de boxplots: pak de box zelf, of de bolletjes voor Q1, de mediaan en Q3. Kijk welk oordeel de vuistregel van het formuleblad geeft. In de oefenmodus kies je eerst zelf.",
    maak(el, api) {
      let G;
      el.innerHTML = `<div class="keuze km"><button class="btn aan" data-m="sleep">Slepen</button><button class="btn" data-m="oefen">Oefenen</button></div><div class="inh"></div>`;
      const inh = el.querySelector(".inh");
      const lijst = (G) => {
        const u = boxUitleg(G), A = G.a, B = G.b;
        return `<li>1. Overlappen de boxen? <b>${u.ov ? "ja" : "nee"}</b> <span class="meta">(A: ${A.q1} tot ${A.q3} · B: ${B.q1} tot ${B.q3})</span></li>
          <li>2. Ligt een mediaan buiten de andere box? <b>${!u.ov ? "niet meer nodig" : u.buiten.length ? "ja" : "nee"}</b>${u.ov && u.buiten.length ? ` <span class="meta">(${u.buiten.join("; ")})</span>` : ""}</li>
          <li>Oordeel: ${badge(u.o)}</li>`;
      };
      function sleepModus() {
        const doelen = ["middelmatig", "groot", "gering"]; let di = 0, off = 0;
        G = { a: { q1: 35, m: 48, q3: 60, wl: 12, wr: 14 }, b: { q1: 42, m: 55, q3: 68, wl: 13, wr: 12 } };
        inh.innerHTML = `<div class="opd"><span class="lab">Opdracht <span class="tel"></span></span><p class="dt"></p><div class="wfb"></div></div>
          <svg class="fig" viewBox="0 0 340 246" role="img" aria-label="Twee sleepbare boxplots"><g class="beeld"></g>${["a", "b"].map((k) => `<rect class="hit" data-h="${k}-body" height="36"/><circle class="hit" r="20" data-h="${k}-m"/><circle class="hit" r="20" data-h="${k}-q1"/><circle class="hit" r="20" data-h="${k}-q3"/>`).join("")}</svg>
          <ul class="check3"></ul>`;
        const svg = inh.querySelector("svg"), beeld = svg.querySelector(".beeld"), fb = inh.querySelector(".wfb");
        const H = (naam) => svg.querySelector(`[data-h="${naam}"]`);
        function opdracht() {
          inh.querySelector(".tel").textContent = di < 3 ? `${di + 1} van 3` : "klaar";
          inh.querySelector(".dt").innerHTML = di < 3 ? `Sleep de boxplots zo dat de vuistregel het oordeel ${badge(doelen[di])} geeft.` : "Alle drie gelukt. Sleep nu vrij en probeer de grensgevallen: wat gebeurt er als een mediaan precies op de rand van de andere box ligt?";
        }
        function plaats() {
          beeld.innerHTML = boxBeeld(G, { hulp: true, grepen: true });
          ["a", "b"].forEach((k) => {
            const g = G[k], y = RY[k], b = H(k + "-body");
            b.setAttribute("x", BX(g.q1)); b.setAttribute("y", y - 18); b.setAttribute("width", BX(g.q3) - BX(g.q1));
            H(k + "-m").setAttribute("cx", BX(g.m)); H(k + "-m").setAttribute("cy", y - 30);
            H(k + "-q1").setAttribute("cx", BX(g.q1)); H(k + "-q1").setAttribute("cy", y + 30);
            H(k + "-q3").setAttribute("cx", BX(g.q3)); H(k + "-q3").setAttribute("cy", y + 30);
          });
          inh.querySelector(".check3").innerHTML = lijst(G);
        }
        function controleer() {
          if (di >= 3) return;
          const u = boxUitleg(G);
          if (u.o === doelen[di]) {
            di++; fb.className = "wfb ok"; fb.innerHTML = `<b>Gelukt! ✅</b> ${u.tekst}`;
            if (di === 3) { api.klaar(); fb.innerHTML += " 🎉 Dit onderdeel is afgevinkt."; }
            opdracht();
          }
        }
        svg.querySelectorAll("[data-h]").forEach((h) => {
          const k = h.dataset.h.split("-")[0], deel = h.dataset.h.split("-")[1];
          api.sleep(svg, h, (x, y, fase) => {
            const g = G[k], v = Math.round(BIX(x));
            if (deel === "body") {
              if (fase === "start") off = BIX(x) - g.q1;
              const d = klem(Math.round(BIX(x) - off), g.wl, 100 - g.wr - (g.q3 - g.q1)) - g.q1;
              g.q1 += d; g.m += d; g.q3 += d;
            } else if (deel === "m") g.m = klem(v, g.q1, g.q3);
            else if (deel === "q1") { g.q1 = klem(v, g.wl, g.q3 - 6); g.m = Math.max(g.m, g.q1); }
            else { g.q3 = klem(v, g.q1 + 6, 100 - g.wr); g.m = Math.min(g.m, g.q3); }
            plaats(); if (fase === "eind") controleer();
          });
        });
        opdracht(); plaats();
      }
      function oefenModus() {
        let ronde = 0, goed = 0;
        function nieuw() {
          if (ronde === 5) {
            inh.innerHTML = `<div class="wfb ok"><b>${goed} van de 5 goed.</b> ${goed >= 4 ? "De vuistregel zit erin. 🎉" : "Loop bij elke opgave de twee stappen na: eerst de boxen, dan de medianen."}</div><button class="btn primary big">Nog een ronde</button>`;
            api.klaar(); inh.querySelector("button").onclick = () => { ronde = 0; goed = 0; nieuw(); }; return;
          }
          G = W.maakBox(R.kies(OORDELEN)); ronde++;
          inh.innerHTML = `<p class="meta">Opgave ${ronde} van 5 · ${goed} goed</p><div class="plaat">${boxSvg(G, { getallen: true })}</div>
            <p>Welk oordeel geeft de vuistregel over het verschil tussen A en B?</p>
            <div class="kz3">${OORDELEN.map((o) => `<button class="btn" data-o="${o}">${o}</button>`).join("")}</div><div class="wfb"></div><div class="na"></div>`;
          inh.querySelectorAll("[data-o]").forEach((b) => (b.onclick = () => {
            const u = boxUitleg(G), ok = b.dataset.o === u.o; if (ok) goed++;
            inh.querySelectorAll("[data-o]").forEach((k) => { k.disabled = true; if (k.dataset.o === u.o) k.classList.add("goed"); });
            if (!ok) b.classList.add("fout");
            inh.querySelector(".plaat").innerHTML = boxSvg(G, { getallen: true, hulp: true });
            const fb = inh.querySelector(".wfb"); fb.className = "wfb " + (ok ? "ok" : "nok"); fb.innerHTML = `<b>${ok ? "Goed! ✅" : "Niet goed."}</b> ${u.tekst}`;
            inh.querySelector(".na").innerHTML = `<button class="btn primary big">${ronde === 5 ? "Bekijk je score" : "Volgende"}</button>`;
            inh.querySelector(".na button").onclick = nieuw;
          }));
        }
        nieuw();
      }
      el.querySelectorAll("[data-m]").forEach((b) => (b.onclick = () => {
        el.querySelectorAll("[data-m]").forEach((k) => k.classList.toggle("aan", k === b));
        if (b.dataset.m === "sleep") sleepModus(); else oefenModus();
      }));
      sleepModus();
    }
  });

  // ------------------------------------------------------------------ Max Vcp zoeken
  function vcpPlot(d, i, toonMax) {
    const P = TW.plot({ x: [d.gr[0], d.gr[d.gr.length - 1]], y: [0, 100], xt: d.c.st, yt: 20, xl: d.c.x, yl: "cumulatief %", h: 236 });
    let s = P.assen() + P.pad(d.gr.map((g, k) => [g, d.A[k]]), "curve") + P.pad(d.gr.map((g, k) => [g, d.B[k]]), "curve4");
    d.gr.forEach((g, k) => { s += P.punt(g, d.A[k], "dotA", 3.5) + P.punt(g, d.B[k], "dotB", 3.5); });
    if (i != null) {
      const g = d.gr[i], lo = Math.min(d.A[i], d.B[i]), hi = Math.max(d.A[i], d.B[i]), rechts = i < d.gr.length - 2;
      s += P.lijn(g, 0, g, 100, "stip") + (hi > lo ? P.lijn(g, lo, g, hi, toonMax ? "dik" : "ok") : "") + P.punt(g, d.A[i], "dotA", 6) + P.punt(g, d.B[i], "dotB", 6)
        + P.tekst(g, (lo + hi) / 2, "verschil " + d.D[i], rechts ? "start" : "end", "k b pg", rechts ? 8 : -8, 4);
    }
    s += P.tekst(d.gr[0], 96, "A: " + d.c.a, "start", "k b pa", 6, 0) + P.tekst(d.gr[0], 87, "B: " + d.c.b, "start", "k b pb", 6, 0);
    return P.svg(s, "Cumulatieve frequentiepolygonen van twee groepen");
  }
  W.vcpPlot = vcpPlot;

  TW.widget("vcp", {
    titel: "Max Vcp zoeken", icoon: "📈",
    uitleg: "Twee groepen, twee cumulatieve frequentiepolygonen. Zoek de klassengrens waar het verticale verschil het grootst is: dat is max V_{cp}. Kies daarna het oordeel van de vuistregel.",
    maak(el, api) {
      let d, i, fase, gezien, rondes = 0;
      el.innerHTML = `<p class="meta kop"></p><div class="graf"></div>
        <label class="schuif"><span>Meetlijn bij klassengrens</span><output class="oi"></output><input class="si" type="range" min="0" max="6" step="1" value="0"></label>
        <div class="tab"></div><div class="actie"></div><div class="wfb"></div>`;
      const q = (s) => el.querySelector(s), fb = q(".wfb");
      function teken() {
        q(".graf").innerHTML = vcpPlot(d, i, fase > 0);
        q(".oi").textContent = d.gr[i];
        q(".tab").innerHTML = `<table class="tabel wt"><tr><th>grens</th><th class="g1a">A %</th><th class="g2a">B %</th><th>verschil</th></tr>${d.gr.map((g, k) => `<tr><td class="${k === i ? "sel" : ""}">${g}</td><td class="${k === i ? "sel" : ""}">${d.A[k]}</td><td class="${k === i ? "sel" : ""}">${d.B[k]}</td><td class="${fase > 0 && k === d.imax ? "max" : k === i ? "sel" : ""}">${gezien[k] || fase > 0 ? d.D[k] : "?"}</td></tr>`).join("")}</table>`;
      }
      function actie() {
        const a = q(".actie");
        if (fase === 0) {
          a.innerHTML = `<button class="btn primary big">Hier is het verschil het grootst</button>`;
          a.querySelector("button").onclick = () => {
            if (i === d.imax) { fase = 1; fb.className = "wfb ok"; fb.innerHTML = `<b>Klopt! ✅</b> Bij ${d.gr[i]} is het verschil ${d.A[i] > d.B[i] ? d.A[i] + " − " + d.B[i] : d.B[i] + " − " + d.A[i]} = ${d.mx}. Dus max V<sub>cp</sub> = ${d.mx}.`; teken(); actie(); }
            else { fb.className = "wfb nok"; fb.innerHTML = `<b>Nog niet.</b> Hier is het verschil ${d.D[i]}, maar ergens is het groter. Loop met de meetlijn alle klassengrenzen langs en vergelijk de verschillen.`; }
          };
        } else if (fase === 1) {
          a.innerHTML = `<p>Welk oordeel hoort bij max V<sub>cp</sub> = ${d.mx}?</p><div class="kz3">${OORDELEN.map((o) => `<button class="btn" data-o="${o}">${o}</button>`).join("")}</div>`;
          a.querySelectorAll("[data-o]").forEach((b) => (b.onclick = () => {
            const ok = b.dataset.o === d.oordeel;
            a.querySelectorAll("[data-o]").forEach((k) => { k.disabled = true; if (k.dataset.o === d.oordeel) k.classList.add("goed"); });
            if (!ok) b.classList.add("fout");
            rondes++; if (rondes >= 2) api.klaar();
            fb.className = "wfb " + (ok ? "ok" : "nok");
            fb.innerHTML = `<b>${ok ? "Goed! ✅" : "Niet goed."}</b> ${d.mx > 40 ? `${d.mx} is groter dan 40` : d.mx > 20 ? `${d.mx} ligt tussen 20 en 40 (40 zelf hoort er nog bij)` : `${d.mx} is hoogstens 20`}, dus het verschil is ${d.oordeel}. De vuistregel mag hier, want beide groepen zijn groter dan 100.${rondes === 2 ? " 🎉 Dit onderdeel is afgevinkt." : ""}`;
            a.insertAdjacentHTML("beforeend", `<button class="btn primary big nw">Nieuwe groepen</button>`);
            a.querySelector(".nw").onclick = nieuw;
          }));
        }
      }
      function nieuw() {
        d = W.maakVcp(6); i = 0; fase = 0; gezien = { 0: true }; fb.className = "wfb"; fb.innerHTML = "";
        q(".si").value = 0;
        q(".kop").innerHTML = `Groep A: ${d.c.a} (n = ${d.nA}) · groep B: ${d.c.b} (n = ${d.nB})`;
        teken(); actie();
      }
      q(".si").oninput = (e) => { i = +e.target.value; gezien[i] = true; teken(); };
      nieuw();
    }
  });

  // ------------------------------------------------------------------ Effectgrootte
  TW.widget("effect", {
    titel: "Effectgrootte", icoon: "↔️",
    uitleg: "Twee groepen met elk een gemiddelde en een standaardafwijking. Verschuif ze en zie hoe de effectgrootte E verandert. Daarna oefen je met nieuwe getallen.",
    maak(el, api) {
      let m1 = 60, s1 = 10, m2 = 54, s2 = 10, vrij = false;
      const P = api.plot({ x: [20, 100], y: [0, 0.21], xt: 10, yt: 0.07, geenGetallen: true, h: 196, mb: 24, ml: 12, mr: 12 });
      const dens = (m, s) => (x) => Math.exp(-Math.pow(x - m, 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));
      const sch = (k, lab, cls, min, max, step, v, uit) => `<label class="schuif"><span class="${cls}">${lab}</span><output data-o="${k}"></output><input type="range" data-k="${k}" min="${min}" max="${max}" step="${step}" value="${v}" ${uit ? "disabled" : ""}></label>`;
      el.innerHTML = `<div class="graf"></div>
        <div class="schuif2">${sch("m1", "gemiddelde 1", "g1a", 40, 80, 1, 60, true)}${sch("m2", "gemiddelde 2", "g2a", 40, 80, 1, 54, true)}${sch("s1", "S van groep 1", "g1a", 2, 14, 0.5, 10)}${sch("s2", "S van groep 2", "g2a", 2, 14, 0.5, 10)}</div>
        <ol class="stappen wstap uitw"></ol>
        <div class="opd"><span class="lab">Opdracht</span><p>De gemiddelden staan vast op 60 en 54. Verander alleen de standaardafwijkingen zodat het verschil <b>groot</b> wordt.</p><div class="wfb"></div></div>
        <div class="oef"></div>`;
      const q = (s) => el.querySelector(s);
      function vlak(m, s, cls) { const f = dens(m, s), pts = [[20, 0]]; for (let i = 0; i <= 80; i++) pts.push([20 + i, Math.min(0.21, f(20 + i))]); pts.push([100, 0]); return P.vlak(pts, cls); }
      function teken() {
        let b = P.assen();
        for (let v = 20; v <= 100; v += 20) b += P.tekst(v, 0, String(v), "middle", "k", 0, 14);
        b += vlak(m1, s1, "vlak") + vlak(m2, s2, "vlak4") + P.fn(dens(m1, s1), "curve", 160) + P.fn(dens(m2, s2), "curve4", 160)
          + P.lijn(m1, 0, m1, Math.min(0.21, dens(m1, s1)(m1)), "lA") + P.lijn(m2, 0, m2, Math.min(0.21, dens(m2, s2)(m2)), "lB");
        q(".graf").innerHTML = P.svg(b, "Twee klokvormige verdelingen");
        const hoog = Math.max(m1, m2), laag = Math.min(m1, m2), sg = (s1 + s2) / 2, E = (hoog - laag) / sg;
        ["m1", "m2", "s1", "s2"].forEach((k) => (q(`[data-o="${k}"]`).textContent = nl({ m1, m2, s1, s2 }[k])));
        q(".uitw").innerHTML = [`Verschil van de gemiddelden (grootste voorop): ${nl(hoog)} − ${nl(laag)} = ${nl(hoog - laag)}`,
          `Gemiddelde van de standaardafwijkingen: ½ · (${nl(s1)} + ${nl(s2)}) = ${nl(sg)}`,
          `E = ${nl(hoog - laag)} / ${nl(sg)} = <b>${nl(R.rond(E, 2), 2)}</b> → ${badge(oordeelE(E))}`].map((t) => `<li>${t}</li>`).join("");
        if (!vrij && r9(E) > 0.8) {
          vrij = true; api.klaar();
          el.querySelectorAll('[data-k="m1"],[data-k="m2"]').forEach((i) => (i.disabled = false));
          const fb = q(".opd .wfb"); fb.className = "wfb ok";
          fb.innerHTML = "<b>Gelukt! ✅</b> E is nu groter dan 0,8. Bij een kleinere spreiding overlappen de klokken minder: hetzelfde verschil in gemiddelde telt dan zwaarder. Je kunt nu ook de gemiddelden verschuiven.";
        }
      }
      el.querySelectorAll("input[data-k]").forEach((inp) => (inp.oninput = () => {
        const v = +inp.value, k = inp.dataset.k;
        if (k === "m1") m1 = v; else if (k === "m2") m2 = v; else if (k === "s1") s1 = v; else s2 = v;
        teken();
      }));
      teken();
      oefenBlok(q(".oef"), api, () => {
        const d = W.maakE(), c = d.c;
        return {
          html: `<p>Onderzocht is ${c.w}. Voor ${c.a} geldt: gemiddelde <b>${nl(d.mA)}</b> en standaardafwijking <b>${nl(d.sA)}</b>. Voor ${c.b}: gemiddelde <b>${nl(d.mB)}</b> en standaardafwijking <b>${nl(d.sB)}</b>. Bereken de effectgrootte in 2 decimalen.</p>`,
          velden: [{ label: "E", antwoord: R.rond(d.E, 2), tol: 0.011, toon: nl(R.rond(d.E, 2), 2) }],
          keuze: { vraag: "Welk oordeel geeft de vuistregel?", opties: OORDELEN, goed: OORDELEN.indexOf(d.oordeel) },
          stappen: [`Grootste gemiddelde voorop: ${nl(d.hoog)} − ${nl(d.laag)} = ${nl(d.verschil)}`, `½ · (${nl(d.sA)} + ${nl(d.sB)}) = ${nl(d.sg)}`, `E = ${nl(d.verschil)} / ${nl(d.sg)} = ${nl(R.rond(d.E, 2), 2)}`,
            d.oordeel === "groot" ? "E > 0,8, dus het verschil is groot." : d.oordeel === "middelmatig" ? "0,4 < E ≤ 0,8, dus het verschil is middelmatig." : "E ≤ 0,4, dus het verschil is gering."]
        };
      });
    }
  });

  // ------------------------------------------------------------------ Phi bij een 2x2-kruistabel
  const phiStappen = (a, b, c, d) => {
    const t = a * d - b * c, pr = (a + b) * (a + c) * (b + d) * (c + d), f = t / Math.sqrt(pr);
    return [`a · d − b · c = ${a} · ${d} − ${b} · ${c} = ${mn(t)}`, `De vier totalen: a + b = ${a + b}, a + c = ${a + c}, b + d = ${b + d}, c + d = ${c + d}`,
      `√(${a + b} · ${a + c} · ${b + d} · ${c + d}) = ${nl(R.rond(Math.sqrt(pr), 2))}`, `phi = ${mn(t)} / ${nl(R.rond(Math.sqrt(pr), 2))} = ${mn(R.rond(f, 2), 2)}`];
  };
  const phiRegel = (f) => { const o = oordeelPhi(f); return o === "groot" ? "phi is kleiner dan −0,4 of groter dan 0,4, dus het verschil is groot." : o === "middelmatig" ? "phi ligt tussen 0,2 en 0,4 of tussen −0,4 en −0,2 (de 0,4 zelf hoort er nog bij), dus het verschil is middelmatig." : "phi ligt tussen −0,2 en 0,2 (de grenzen horen erbij), dus het verschil is gering."; };
  W.phiStappen = phiStappen; W.phiRegel = phiRegel;
  const kruisTabel = (c, a, b, cc, d) => `<table class="tabel wt"><tr><th></th><th>${c.k[0]}</th><th>${c.k[1]}</th><th class="tot">totaal</th></tr>
    <tr><th>${c.r[0]}</th><td><b>${a}</b></td><td><b>${b}</b></td><td class="tot">${a + b}</td></tr><tr><th>${c.r[1]}</th><td><b>${cc}</b></td><td><b>${d}</b></td><td class="tot">${cc + d}</td></tr>
    <tr><th class="tot">totaal</th><td class="tot">${a + cc}</td><td class="tot">${b + d}</td><td class="tot">${a + b + cc + d}</td></tr></table>`;
  W.kruisTabel = kruisTabel;

  TW.widget("phi", {
    titel: "Phi bij een kruistabel", icoon: "🔲",
    uitleg: "Vul een 2×2-kruistabel met de plus- en minknoppen. De balken laten per groep het percentage zien, daaronder staat de berekening van phi. Daarna oefen je met nieuwe tabellen.",
    maak(el, api) {
      const T = { a: 30, b: 20, c: 20, d: 30 }, c = PCTX[0]; let opd = 0;
      const cel = (k) => `<div class="cel"><small>${k}</small><b data-v="${k}"></b><div class="pm"><button data-k="${k}" data-d="-5" aria-label="${k} min 5">−</button><button data-k="${k}" data-d="5" aria-label="${k} plus 5">+</button></div></div>`;
      el.innerHTML = `<div class="kruis"><span></span><span class="kh">${c.k[0]}</span><span class="kh">${c.k[1]}</span>
          <span class="rh">${c.r[0]}</span>${cel("a")}${cel("b")}<span class="rh">${c.r[1]}</span>${cel("c")}${cel("d")}</div>
        <div class="balken"></div><ol class="stappen wstap uitw"></ol>
        <div class="opd"><span class="lab">Opdracht <span class="tel"></span></span><p class="dt"></p><div class="wfb"></div></div><div class="oef"></div>`;
      const q = (s) => el.querySelector(s);
      const OPD = [
        { t: "Maak de twee balken (bijna) even lang. Wat doet phi dan?", ok: (f) => Math.abs(f) <= 0.05, u: "Als in beide groepen hetzelfde percentage een bijbaan heeft, is er geen verschil tussen de groepen en is phi (bijna) 0." },
        { t: "Maak het verschil tussen de groepen <b>groot</b> volgens de vuistregel.", ok: (f) => oordeelPhi(f) === "groot", u: "Hoe verder de percentages van de twee groepen uit elkaar liggen, hoe verder phi van 0 af ligt. Het teken zegt alleen welke groep het hoogste percentage heeft." }
      ];
      function teken() {
        ["a", "b", "c", "d"].forEach((k) => (q(`[data-v="${k}"]`).textContent = T[k]));
        const r1 = T.a + T.b, r2 = T.c + T.d, geldig = r1 > 0 && r2 > 0 && T.a + T.c > 0 && T.b + T.d > 0;
        const balk = (naam, x, tot) => { const pc = tot ? (100 * x) / tot : 0; return `<div class="balklab">${naam}: ${tot ? nl(R.rond(pc, 1)) : "–"}% ${c.k[0]}</div><div class="balk"><i style="width:${pc}%">${pc >= 18 ? nl(R.rond(pc, 0)) + "%" : ""}</i><i></i></div>`; };
        q(".balken").innerHTML = balk(c.r[0], T.a, r1) + balk(c.r[1], T.c, r2);
        const f = geldig ? phi(T.a, T.b, T.c, T.d) : null;
        q(".uitw").innerHTML = geldig ? phiStappen(T.a, T.b, T.c, T.d).map((s) => `<li>${fmt(s)}</li>`).join("") + `<li>${phiRegel(f)} ${badge(oordeelPhi(f))}</li>` : "<li>Elke rij en elke kolom moet minstens één waarneming hebben, anders kun je phi niet uitrekenen.</li>";
        q(".tel").textContent = opd < OPD.length ? `${opd + 1} van ${OPD.length}` : "klaar";
        q(".dt").innerHTML = opd < OPD.length ? OPD[opd].t : "Beide opdrachten gelukt. Speel vrij met de tabel of ga door met de oefenopgaven hieronder.";
        if (opd < OPD.length && geldig && OPD[opd].ok(f)) {
          const fb = q(".opd .wfb"); fb.className = "wfb ok"; fb.innerHTML = `<b>Gelukt! ✅</b> phi = ${mn(R.rond(f, 2), 2)}. ${OPD[opd].u}`;
          opd++; if (opd === OPD.length) api.klaar();
          q(".tel").textContent = opd < OPD.length ? `${opd + 1} van ${OPD.length}` : "klaar";
          q(".dt").innerHTML = opd < OPD.length ? OPD[opd].t : "Beide opdrachten gelukt. Speel vrij met de tabel of ga door met de oefenopgaven hieronder.";
        }
      }
      el.querySelectorAll(".pm button").forEach((b) => (b.onclick = () => { T[b.dataset.k] = klem(T[b.dataset.k] + +b.dataset.d, 0, 200); teken(); }));
      teken();
      oefenBlok(q(".oef"), api, () => {
        const d = W.maakPhi();
        return {
          html: `<p>Onderzocht is of ${d.c.wat} verschilt tussen ${d.c.r[0]} en ${d.c.r[1]}. Bereken phi in 2 decimalen.</p>${kruisTabel(d.c, d.a, d.b, d.cc, d.d)}`,
          velden: [{ label: "phi", antwoord: R.rond(d.phi, 2), tol: 0.011, toon: mn(R.rond(d.phi, 2), 2) }],
          keuze: { vraag: "Welk oordeel geeft de vuistregel?", opties: OORDELEN, goed: OORDELEN.indexOf(d.oordeel) },
          stappen: phiStappen(d.a, d.b, d.cc, d.d).concat([phiRegel(d.phi)])
        };
      });
    }
  });

  // ------------------------------------------------------------------ Normale verdeling
  TW.widget("normaal", {
    titel: "Normale verdeling", icoon: "🔔",
    uitleg: "Verschuif het gemiddelde μ en de standaardafwijking σ. De gekleurde gebieden zijn de vuistregels: 68% ligt binnen één σ van het gemiddelde en 95% binnen twee σ.",
    maak(el, api) {
      const CTX = [
        { naam: "lengte (cm)", mu: [160, 185, 172], sg: [6, 10, 8], zin: "Hoeveel procent is" },
        { naam: "pak koffie (gram)", mu: [495, 510, 500], sg: [3, 5, 4], zin: "Hoeveel procent weegt" },
        { naam: "reistijd (min)", mu: [25, 45, 30], sg: [4, 8, 5], zin: "Hoeveel procent duurt" }
      ];
      const SEG = [2.5, 13.5, 34, 34, 13.5, 2.5], K = [-Infinity, -2, -1, 0, 1, 2, Infinity], KL = ["vlak2", "vlak4", "vlak", "vlak", "vlak4", "vlak2"];
      let c, mu, sg, P, x0, x1, vr = null, mark = false, goed = 0;
      el.innerHTML = `<div class="keuze kc">${CTX.map((k, i) => `<button class="btn" data-c="${i}">${k.naam}</button>`).join("")}</div><div class="graf"></div>
        <div class="schuif2"><label class="schuif"><span>gemiddelde μ</span><output class="om"></output><input class="smu" type="range"></label><label class="schuif"><span>standaardafwijking σ</span><output class="os"></output><input class="ssg" type="range"></label></div>
        <div class="vraag"></div><div class="na"></div>`;
      const q = (s) => el.querySelector(s);
      const f = (x) => Math.exp(-Math.pow(x - mu, 2) / (2 * sg * sg)) / (sg * Math.sqrt(2 * Math.PI));
      function stuk(a, b, cls) {
        a = Math.max(a, x0); b = Math.min(b, x1); if (b <= a) return "";
        const pts = [[a, 0]]; for (let i = 0; i <= 24; i++) { const x = a + ((b - a) * i) / 24; pts.push([x, f(x)]); } pts.push([b, 0]);
        return P.vlak(pts, cls);
      }
      function teken() {
        const g = K.map((k) => (k === -Infinity ? x0 : k === Infinity ? x1 : mu + k * sg));
        let s = "";
        for (let i = 0; i < 6; i++) s += stuk(g[i], g[i + 1], KL[i]);
        s += P.fn(f, "curve3", 160) + P.lijn(x0, 0, x1, 0, "s");
        for (let k = -2; k <= 2; k++) { const x = mu + k * sg; s += P.lijn(x, 0, x, f(x), "stip") + P.tekst(x, 0, nl(R.rond(x, 1)), "middle", "k" + (k === 0 ? " b" : ""), 0, k % 2 === 0 ? 14 : 27); }
        s += P.tekst(mu - 0.5 * sg, f(mu - 0.5 * sg) * 0.42, "34%", "middle", "k b") + P.tekst(mu + 0.5 * sg, f(mu + 0.5 * sg) * 0.42, "34%", "middle", "k b")
          + P.tekst(mu - 1.5 * sg, f(mu - 1.5 * sg), "13,5%", "end", "k b pb", 2, -7) + P.tekst(mu + 1.5 * sg, f(mu + 1.5 * sg), "13,5%", "start", "k b pb", -2, -7)
          + P.tekst(mu - 2.55 * sg, 0, "2,5%", "middle", "k b pr", 0, -6) + P.tekst(mu + 2.55 * sg, 0, "2,5%", "middle", "k b pr", 0, -6);
        if (mark && vr) s += stuk(g[vr.i], g[vr.j], "omlijn");
        q(".graf").innerHTML = P.svg(s, "Klokkromme met de vuistregels van de normale verdeling");
        q(".om").textContent = nl(mu); q(".os").textContent = nl(sg);
      }
      function toonVraag() {
        mark = false;
        const v = (k) => nl(R.rond(mu + K[k] * sg, 1)), delen = SEG.slice(vr.i, vr.j), pct = R.rond(delen.reduce((a, b) => a + b, 0), 1);
        const waar = vr.i === 0 ? `minder dan ${v(vr.j)}` : vr.j === 6 ? `meer dan ${v(vr.i)}` : `tussen ${v(vr.i)} en ${v(vr.j)}`;
        const pool = api.shuffle([2.5, 5, 13.5, 16, 34, 47.5, 50, 68, 81.5, 84, 95, 97.5].filter((x) => x !== pct));
        const fout = [R.rond(100 - pct, 1)].filter((x) => x !== pct && x > 0).concat(pool).filter((x, n, arr) => arr.indexOf(x) === n).slice(0, 3);
        q(".na").innerHTML = "";
        mcBlok(q(".vraag"), api, {
          kop: `Vraag · ${goed} in één keer goed`, vraag: `μ = ${nl(mu)} en σ = ${nl(sg)}. ${c.zin} <b>${waar}</b>?`,
          opties: [nl(pct) + "%"].concat(fout.map((x) => nl(x) + "%")),
          uitleg: () => `${delen.length > 1 ? delen.map((x) => nl(x) + "%").join(" + ") + " = " : ""}${nl(pct)}%. Het gebied is in de klokkromme omlijnd.`,
          fout: ["Tel de gekleurde gebieden op die bij de vraag horen. Reken de grenzen eerst om: hoeveel σ liggen ze van μ af?", "Tel de gekleurde gebieden op die bij de vraag horen. Reken de grenzen eerst om: hoeveel σ liggen ze van μ af?", "Tel de gekleurde gebieden op die bij de vraag horen. Reken de grenzen eerst om: hoeveel σ liggen ze van μ af?"],
          goed: (eerste) => {
            if (eerste) goed++; if (goed >= 4) api.klaar();
            mark = true; teken();
            q(".na").innerHTML = `${goed === 4 && eerste ? `<div class="wfb ok">🎉 Vier vragen in één keer goed: dit onderdeel is afgevinkt.</div>` : ""}<button class="btn primary big">Volgende vraag</button>`;
            q(".na button").onclick = nieuweVraag;
          }
        });
      }
      function nieuweVraag() {
        let i, j; do { i = R.int(0, 5); j = R.int(i + 1, 6); } while (i === 0 && j === 6);
        vr = { i, j }; toonVraag(); teken();
      }
      function kies(n) {
        c = CTX[n]; mu = c.mu[2]; sg = c.sg[2];
        x0 = c.mu[0] - 2.5 * c.sg[1]; x1 = c.mu[1] + 2.5 * c.sg[1];
        P = api.plot({ x: [x0, x1], y: [0, 1.08 / (c.sg[0] * Math.sqrt(2 * Math.PI))], h: 216, ml: 10, mr: 10, mt: 10, mb: 36 });
        el.querySelectorAll("[data-c]").forEach((b) => b.classList.toggle("aan", +b.dataset.c === n));
        const a = q(".smu"), b = q(".ssg");
        a.min = c.mu[0]; a.max = c.mu[1]; a.step = 1; a.value = mu; b.min = c.sg[0]; b.max = c.sg[1]; b.step = 1; b.value = sg;
        nieuweVraag();
      }
      q(".smu").oninput = (e) => { mu = +e.target.value; toonVraag(); teken(); };
      q(".ssg").oninput = (e) => { sg = +e.target.value; toonVraag(); teken(); };
      el.querySelectorAll("[data-c]").forEach((b) => (b.onclick = () => kies(+b.dataset.c)));
      kies(0);
    }
  });

  // ------------------------------------------------------------------ Welke vuistregel?
  const MINI = [
    `<svg class="fig mini" viewBox="0 0 120 70" role="img" aria-label="twee klokvormen"><path d="M5 60 C30 60 30 12 45 12 C60 12 60 60 85 60" class="curve"/><path d="M35 60 C60 60 60 12 75 12 C90 12 90 60 115 60" class="curve4"/><line x1="5" y1="60" x2="115" y2="60" class="s"/></svg>`,
    `<svg class="fig mini" viewBox="0 0 120 70" role="img" aria-label="twee boxplots"><line x1="10" y1="20" x2="30" y2="20" class="lA"/><rect x="30" y="10" width="34" height="20" class="boxA"/><line x1="45" y1="10" x2="45" y2="30" class="mA"/><line x1="64" y1="20" x2="84" y2="20" class="lA"/><line x1="34" y1="50" x2="52" y2="50" class="lB"/><rect x="52" y="40" width="36" height="20" class="boxB"/><line x1="72" y1="40" x2="72" y2="60" class="mB"/><line x1="88" y1="50" x2="110" y2="50" class="lB"/></svg>`,
    `<svg class="fig mini" viewBox="0 0 120 70" role="img" aria-label="twee cumulatieve polygonen"><line x1="10" y1="62" x2="114" y2="62" class="s"/><line x1="10" y1="62" x2="10" y2="6" class="s"/><path d="M10 62 L30 44 L50 22 L70 12 L90 9 L110 8" class="curve"/><path d="M10 62 L30 58 L50 46 L70 28 L90 14 L110 8" class="curve4"/><line x1="50" y1="22" x2="50" y2="46" class="dik"/></svg>`,
    `<svg class="fig mini" viewBox="0 0 120 70" role="img" aria-label="een twee bij twee kruistabel"><rect x="24" y="8" width="36" height="26" class="cel"/><rect x="60" y="8" width="36" height="26" class="cel"/><rect x="24" y="34" width="36" height="26" class="cel"/><rect x="60" y="34" width="36" height="26" class="cel"/><text x="42" y="26" text-anchor="middle" class="b">a</text><text x="78" y="26" text-anchor="middle" class="b">b</text><text x="42" y="52" text-anchor="middle" class="b">c</text><text x="78" y="52" text-anchor="middle" class="b">d</text></svg>`
  ];
  const METH = ["Effectgrootte E", "Boxplots vergelijken", "Max Vcp", "Phi"];
  const GRENS = [
    "E > 0,8 groot · 0,4 < E ≤ 0,8 middelmatig · E ≤ 0,4 gering",
    "Boxen overlappen niet: groot · overlappen en een mediaan buiten de andere box: middelmatig · anders gering",
    "max Vcp > 40 groot · 20 < max Vcp ≤ 40 middelmatig · max Vcp ≤ 20 gering (beide groepen n > 100)",
    "phi < −0,4 of phi > 0,4 groot · tussen 0,2 en 0,4 of tussen −0,4 en −0,2 middelmatig · van −0,2 tot en met 0,2 gering"
  ];
  const SCEN = [
    [0, "Van twee klassen ken je het gemiddelde cijfer en de standaardafwijking.", "Twee gemiddelden met standaardafwijkingen: dat zijn precies de vier getallen in de formule van E."],
    [0, "Een sportschool meet de hartslag van leden en niet-leden. Je krijgt per groep X̄ en S.", "X̄ en S per groep horen bij de effectgrootte."],
    [0, "Onderzoekers vergelijken de slaapduur van onderbouwers en bovenbouwers. In de tabel staan per groep het gemiddelde, de standaardafwijking en n.", "Met gemiddelde en standaardafwijking bereken je E. De n heb je daarbij niet nodig."],
    [1, "Van de reistijd van jongens en meisjes zie je twee boxplots boven dezelfde getallenlijn.", "Bij twee boxplots kijk je naar de boxen en de medianen."],
    [1, "Je krijgt van twee groepen alleen Q1, de mediaan en Q3 van het aantal uren bijbaan.", "Q1, mediaan en Q3 zijn precies wat je nodig hebt voor de boxplotregel, ook als de boxplots niet getekend zijn."],
    [1, "In een figuur staan de vijf kengetallen van de toetsscores van twee scholen als twee dozen met snorharen.", "Dozen met snorharen zijn boxplots: vergelijk de boxen en de medianen."],
    [2, "De leeftijd van bezoekers van twee festivals staat in één figuur met twee cumulatieve relatieve frequentiepolygonen.", "Bij twee cumulatieve polygonen zoek je het grootste verticale verschil: max Vcp."],
    [2, "Je krijgt van 400 mannen en 350 vrouwen een tabel met cumulatieve percentages van het inkomen per klassengrens.", "Cumulatieve percentages per klassengrens: trek ze van elkaar af en zoek het grootste verschil."],
    [2, "Twee somfrequentiepolygonen in procenten laten zien hoe lang leerlingen van 4 havo en 5 havo aan huiswerk zitten.", "Somfrequentiepolygonen in procenten zijn cumulatieve relatieve frequentiepolygonen: gebruik max Vcp."],
    [3, "In een kruistabel staat van 300 leerlingen of ze jongen of meisje zijn en of ze wel of geen bijbaan hebben.", "Twee variabelen met elk twee categorieën geven een 2×2-kruistabel: gebruik phi."],
    [3, "Van 180 patiënten weet je of ze het medicijn of een placebo kregen en of ze wel of niet herstelden. Je krijgt de vier aantallen.", "Vier absolute aantallen in een 2×2-tabel: dat zijn a, b, c en d in de formule van phi."],
    [3, "Een enquête vraagt naar de woonplaats (stad of dorp) en of iemand een auto heeft (ja of nee).", "Twee nominale variabelen met elk twee mogelijkheden: zet de aantallen in een 2×2-kruistabel en bereken phi."]
  ];
  const UITK = [
    [["E = 0,35", 0], ["E = 0,4", 0], ["E = 0,41", 1], ["E = 0,8", 1], ["E = 0,81", 2], ["E = 1,2", 2], ["E = 0,62", 1]],
    [["De boxen overlappen niet", 2], ["De boxen overlappen en beide medianen liggen in de andere box", 0], ["De boxen overlappen en één mediaan ligt buiten de andere box", 1], ["De snorharen overlappen, maar de boxen niet", 2], ["De boxen overlappen en beide medianen liggen buiten de andere box", 1]],
    [["max Vcp = 18", 0], ["max Vcp = 20", 0], ["max Vcp = 21", 1], ["max Vcp = 40", 1], ["max Vcp = 41", 2], ["max Vcp = 55", 2]],
    [["phi = −0,45", 2], ["phi = −0,4", 1], ["phi = −0,2", 0], ["phi = 0,15", 0], ["phi = 0,2", 0], ["phi = 0,21", 1], ["phi = 0,4", 1], ["phi = 0,41", 2], ["phi = −0,31", 1]]
  ];
  W.MINI = MINI;
  TW.widget("vuistkiezer", {
    titel: "Welke vuistregel?", icoon: "🧭",
    uitleg: "Je krijgt steeds een situatie. Kies eerst de methode die bij de gegevens past en daarna het oordeel bij de uitkomst. Let op de grenzen: die zijn het lastigst.",
    maak(el, api) {
      let rij, n, goed;
      function start() { rij = api.shuffle(SCEN).slice(0, 8); n = 0; goed = 0; toon(); }
      function toon() {
        if (n === rij.length) {
          el.innerHTML = `<div class="wfb ok"><b>${goed} van de ${2 * rij.length} keuzes goed.</b> ${goed >= 14 ? "Je kiest snel de goede methode en kent de grenzen. 🎉" : "Kijk nog eens naar het overzicht van de vier vuistregels en probeer het opnieuw."}</div><button class="btn primary big">Opnieuw</button>`;
          api.klaar(); el.querySelector("button").onclick = start; return;
        }
        const sc = rij[n], m = sc[0], uit = R.kies(UITK[m]);
        el.innerHTML = `<p class="meta">Situatie ${n + 1} van ${rij.length} · ${goed} keuzes goed</p><div class="opd"><span class="lab">Welke methode past?</span><p>${sc[1]}</p>
          <div class="kz2">${METH.map((t, i) => `<button class="btn" data-m="${i}">${t}</button>`).join("")}</div><div class="wfb f1"></div>
          <div class="stap2"></div></div>`;
        let eerste = true;
        el.querySelectorAll("[data-m]").forEach((b) => (b.onclick = () => {
          const fb = el.querySelector(".f1");
          if (+b.dataset.m !== m) { eerste = false; b.classList.add("fout"); b.disabled = true; fb.className = "wfb f1 nok"; fb.innerHTML = "<b>Nog niet.</b> Kijk welke gegevens je precies krijgt: gemiddelden met standaardafwijkingen, boxplots, cumulatieve percentages of een 2×2-kruistabel?"; return; }
          if (eerste) goed++;
          el.querySelectorAll("[data-m]").forEach((k) => (k.disabled = true)); b.classList.add("goed");
          fb.className = "wfb f1 ok"; fb.innerHTML = `${MINI[m]}<b>${METH[m]} ✅</b> ${sc[2]}`;
          el.querySelector(".stap2").innerHTML = `<p>De uitkomst is: <b>${uit[0]}</b>. Welk oordeel hoort daarbij?</p><div class="kz3">${OORDELEN.map((o, i) => `<button class="btn" data-o="${i}">${o}</button>`).join("")}</div><div class="wfb f2"></div><div class="na"></div>`;
          el.querySelectorAll("[data-o]").forEach((k) => (k.onclick = () => {
            const ok = +k.dataset.o === uit[1]; if (ok) goed++;
            el.querySelectorAll("[data-o]").forEach((z, i) => { z.disabled = true; if (i === uit[1]) z.classList.add("goed"); });
            if (!ok) k.classList.add("fout");
            const f2 = el.querySelector(".f2"); f2.className = "wfb f2 " + (ok ? "ok" : "nok");
            f2.innerHTML = `<b>${ok ? "Goed! ✅" : "Niet goed."}</b> ${uit[0]} → ${OORDELEN[uit[1]]}. De regel: ${GRENS[m]}.`;
            el.querySelector(".na").innerHTML = `<button class="btn primary big">${n + 1 === rij.length ? "Bekijk je score" : "Volgende situatie"}</button>`;
            el.querySelector(".na button").onclick = () => { n++; toon(); };
          }));
        }));
      }
      start();
    }
  });

  // ------------------------------------------------------------------ Percenteren in een kruistabel
  const PZIN = [
    { rij: (i, j) => `Hoeveel procent van de ${["jongens", "meisjes"][i]} heeft ${j ? "geen" : "een"} bijbaan?`, kol: (i, j) => `Hoeveel procent van de leerlingen ${j ? "zonder" : "met"} bijbaan is een ${["jongen", "meisje"][i]}?`, tot: (i, j) => `Hoeveel procent van alle leerlingen is een ${["jongen", "meisje"][i]} ${j ? "zonder" : "met"} bijbaan?`, alle: "leerlingen" },
    { rij: (i, j) => `Hoeveel procent van de ${["havisten", "vwo'ers"][i]} doet ${j ? "niet " : ""}aan sport?`, kol: (i, j) => `Hoeveel procent van de leerlingen die ${j ? "niet " : ""}sporten zit op ${["havo", "vwo"][i]}?`, tot: (i, j) => `Hoeveel procent van alle leerlingen zit op ${["havo", "vwo"][i]} en doet ${j ? "niet " : ""}aan sport?`, alle: "leerlingen" },
    { rij: (i, j) => `Hoeveel procent van de ${["onderbouwers", "bovenbouwers"][i]} komt ${j ? "niet " : ""}met de fiets?`, kol: (i, j) => `Hoeveel procent van de leerlingen die ${j ? "niet " : ""}met de fiets komen zit in de ${["onderbouw", "bovenbouw"][i]}?`, tot: (i, j) => `Hoeveel procent van alle leerlingen zit in de ${["onderbouw", "bovenbouw"][i]} en komt ${j ? "niet " : ""}met de fiets?`, alle: "leerlingen" }
  ];
  TW.widget("percenteren", {
    titel: "Percenteren in een kruistabel", icoon: "🧮",
    uitleg: "Dezelfde tabel, vier manieren om ernaar te kijken. Wissel tussen aantallen, rijpercentages, kolompercentages en percentages van het totaal en zie wat er op 100% wordt gesteld.",
    maak(el, api) {
      let ci = 0, T = [[54, 66], [96, 84]], modus = "aantal";
      el.innerHTML = `<div class="keuze km">${[["aantal", "aantallen"], ["rij", "rij-%"], ["kolom", "kolom-%"], ["totaal", "totaal-%"]].map((m) => `<button class="btn" data-m="${m[0]}">${m[1]}</button>`).join("")}</div>
        <div class="tab"></div><div class="uit toel"></div><div class="balken"></div><div class="oef"></div>`;
      const q = (s) => el.querySelector(s), pc = (x, t) => nl(R.rond((100 * x) / t, 1), 1) + "%";
      function teken() {
        const c = PCTX[ci], r = [T[0][0] + T[0][1], T[1][0] + T[1][1]], k = [T[0][0] + T[1][0], T[0][1] + T[1][1]], tot = r[0] + r[1];
        el.querySelectorAll("[data-m]").forEach((b) => b.classList.toggle("aan", b.dataset.m === modus));
        const cel = (i, j) => (modus === "aantal" ? T[i][j] : modus === "rij" ? pc(T[i][j], r[i]) : modus === "kolom" ? pc(T[i][j], k[j]) : pc(T[i][j], tot));
        const rt = (i) => (modus === "aantal" ? r[i] : modus === "rij" ? "100%" : modus === "kolom" ? "" : pc(r[i], tot));
        const kt = (j) => (modus === "aantal" ? k[j] : modus === "kolom" ? "100%" : modus === "rij" ? "" : pc(k[j], tot));
        q(".tab").innerHTML = `<table class="tabel wt"><tr><th></th><th>${c.k[0]}</th><th>${c.k[1]}</th><th class="tot">totaal</th></tr>
          ${[0, 1].map((i) => `<tr><th>${c.r[i]}</th><td><b>${cel(i, 0)}</b></td><td><b>${cel(i, 1)}</b></td><td class="${modus === "rij" ? "honderd" : "tot"}">${rt(i)}</td></tr>`).join("")}
          <tr><th class="tot">totaal</th><td class="${modus === "kolom" ? "honderd" : "tot"}">${kt(0)}</td><td class="${modus === "kolom" ? "honderd" : "tot"}">${kt(1)}</td><td class="${modus === "totaal" ? "honderd" : "tot"}">${modus === "aantal" ? tot : modus === "totaal" ? "100%" : ""}</td></tr></table>`;
        q(".toel").innerHTML = { aantal: "De absolute aantallen. De groepen zijn niet even groot, dus aantallen vergelijken is niet eerlijk.", rij: `Elke <b>rij</b> is op 100% gesteld. Zo vergelijk je ${c.r[0]} met ${c.r[1]}.`, kolom: `Elke <b>kolom</b> is op 100% gesteld. Zo zie je hoe elke kolom is opgebouwd uit ${c.r[0]} en ${c.r[1]}.`, totaal: "Het <b>eindtotaal</b> is op 100% gesteld. Elke cel is een deel van de hele groep." }[modus];
        const balk = (naam, x, t, lab) => { const p = (100 * x) / t; return `<div class="balklab">${naam}: ${pc(x, t)} ${lab}</div><div class="balk"><i style="width:${p}%"></i><i></i></div>`; };
        q(".balken").innerHTML = modus === "rij" ? balk(c.r[0], T[0][0], r[0], c.k[0]) + balk(c.r[1], T[1][0], r[1], c.k[0]) : modus === "kolom" ? balk(c.k[0], T[0][0], k[0], c.r[0]) + balk(c.k[1], T[0][1], k[1], c.r[0]) : "";
      }
      el.querySelectorAll("[data-m]").forEach((b) => (b.onclick = () => { modus = b.dataset.m; teken(); }));
      oefenBlok(q(".oef"), api, () => {
        ci = R.int(0, 2);
        do { T = [[R.int(20, 120), R.int(20, 120)], [R.int(20, 120), R.int(20, 120)]]; } while (T[0][0] + T[0][1] === T[1][0] + T[1][1]);
        modus = "aantal"; teken();
        const c = PCTX[ci], z = PZIN[ci], i = R.int(0, 1), j = R.int(0, 1), soort = R.kies(["rij", "rij", "kolom", "kolom", "totaal"]);
        const r = T[i][0] + T[i][1], k = T[0][j] + T[1][j], tot = T[0][0] + T[0][1] + T[1][0] + T[1][1], x = T[i][j];
        const geheel = soort === "rij" ? r : soort === "kolom" ? k : tot, antw = R.rond((100 * x) / geheel, 1);
        return {
          html: `<p>Gebruik de tabel hierboven (nieuwe getallen). ${z[soort === "rij" ? "rij" : soort === "kolom" ? "kol" : "tot"](i, j)} Rond af op 1 decimaal.</p>`,
          velden: [{ label: "Percentage", antwoord: antw, tol: 0.06, eenheid: "%", toon: nl(antw, 1) + "%" }],
          stappen: [soort === "rij" ? `"Van de ${c.r[i]}" betekent: het rijtotaal van ${c.r[i]} is 100%. Dat is ${r}.` : soort === "kolom" ? `Het geheel is de kolom "${c.k[j]}": het kolomtotaal ${k} is 100%.` : `Het geheel is iedereen: het eindtotaal ${tot} is 100%.`,
            `${x} / ${geheel} × 100% = ${nl(antw, 1)}%`],
          na: () => { modus = soort; teken(); }
        };
      }, { kop: "Opgave" });
    }
  });
})();
