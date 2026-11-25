// Interactieve onderdelen. TW.widget(naam, { titel, icoon, uitleg, maak(el, api) {} });
// Dit bestand: gedeelde hulpfuncties (TW.wa) en de formule-widgets. De statistiek-widgets staan in widgets-stat.js.
(function () {
  "use strict";
  const nl = TW.nl, R = TW.R, fmt = TW.fmt, esc = TW.esc;
  const mn = (x, d) => nl(x, d).replace("-", "−");
  const klem = (v, a, b) => Math.max(a, Math.min(b, v));
  const r9 = (x) => Math.round(x * 1e9) / 1e9;

  // Vuistregels van het formuleblad (grenzen exact zoals op het formuleblad havo wiskunde A).
  const oordeelE = (E) => { E = r9(Math.abs(E)); return E > 0.8 ? "groot" : E > 0.4 ? "middelmatig" : "gering"; };
  const oordeelPhi = (p) => { p = r9(Math.abs(p)); return p > 0.4 ? "groot" : p > 0.2 ? "middelmatig" : "gering"; };
  const oordeelVcp = (v) => { v = r9(v); return v > 40 ? "groot" : v > 20 ? "middelmatig" : "gering"; };
  const oordeelBox = (A, B) => {
    if (A.q3 < B.q1 || B.q3 < A.q1) return "groot";
    if (A.m < B.q1 || A.m > B.q3 || B.m < A.q1 || B.m > A.q3) return "middelmatig";
    return "gering";
  };
  const phi = (a, b, c, d) => (a * d - b * c) / Math.sqrt((a + b) * (a + c) * (b + d) * (c + d));
  const badge = (o) => `<span class="oordeel ${o}">${o}</span>`;
  const OORDELEN = ["gering", "middelmatig", "groot"];
  const lees = (s) => {
    s = String(s).trim().replace(/[\s%€]/g, "").replace(/−/g, "-").replace(",", ".");
    if (s === "") return null;
    const x = Number(s); return isNaN(x) ? null : x;
  };
  const mooi = (x) => { const k = Math.pow(10, Math.floor(Math.log10(x))), m = x / k; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * k; };

  // Oefenblok: opgave met invoervelden en eventueel een keuze, controle, uitwerking en een nieuwe opgave.
  // gen() → { html, velden: [{ label, antwoord, tol, eenheid, toon }], keuze: { vraag, opties, goed }, stappen: [..], voor(el), na(el) }
  function oefenBlok(el, api, gen, opt) {
    opt = opt || {};
    const doel = opt.doel || 3; let goed = 0;
    function nieuw() {
      const d = gen(); let kz = null;
      el.innerHTML = `<div class="opd"><span class="lab">${opt.kop || "Oefenopgave"} · <span class="tel">${goed} van ${doel} goed</span></span>
        <div class="ovraag">${d.html}</div><div class="ovoor"></div>
        ${(d.velden || []).map((v, i) => `<label class="veld"><span>${v.label}</span><span class="vin"><input data-i="${i}" inputmode="decimal" autocomplete="off" placeholder="…">${v.eenheid ? `<em>${v.eenheid}</em>` : ""}</span></label>`).join("")}
        ${d.keuze ? `<p>${d.keuze.vraag}</p><div class="${d.keuze.opties.length === 3 ? "kz3" : "kz2"}">${d.keuze.opties.map((o, i) => `<button class="btn" data-k="${i}">${o}</button>`).join("")}</div>` : ""}
        <button class="btn primary big chk">Controleer</button><div class="wfb"></div><div class="ona"></div></div>`;
      if (d.voor) d.voor(el.querySelector(".ovoor"));
      const fb = el.querySelector(".wfb"), kn = [...el.querySelectorAll("[data-k]")];
      kn.forEach((b) => (b.onclick = () => { kz = +b.dataset.k; kn.forEach((k) => k.classList.toggle("aan", k === b)); }));
      el.querySelector(".chk").onclick = () => {
        const inv = [...el.querySelectorAll("input[data-i]")];
        if (inv.some((i) => lees(i.value) == null) || (d.keuze && kz == null)) { fb.className = "wfb nok"; fb.textContent = "Vul eerst alles in (getallen met een komma of punt)."; return; }
        let alles = true; const mis = [];
        (d.velden || []).forEach((v, i) => {
          const ok = Math.abs(lees(inv[i].value) - v.antwoord) <= v.tol + 1e-9;
          inv[i].classList.add(ok ? "goed" : "fout"); inv[i].disabled = true;
          if (!ok) { alles = false; mis.push(`${v.label}: <b>${v.toon || nl(v.antwoord)}</b>`); }
        });
        if (d.keuze) {
          kn.forEach((k, i) => { k.disabled = true; k.classList.remove("aan"); if (i === d.keuze.goed) k.classList.add("goed"); else if (i === kz) k.classList.add("fout"); });
          if (kz !== d.keuze.goed) { alles = false; mis.push(`keuze: <b>${d.keuze.opties[d.keuze.goed]}</b>`); }
        }
        if (alles) goed++;
        el.querySelector(".tel").textContent = `${goed} van ${doel} goed`;
        fb.className = "wfb " + (alles ? "ok" : "nok");
        fb.innerHTML = alles ? "<b>Goed! ✅</b>" : `<b>Nog niet goed.</b> ${mis.join(" · ")}`;
        el.querySelector(".chk").remove();
        el.querySelector(".ona").innerHTML = `${(d.stappen || []).length ? `<ol class="stappen wstap">${d.stappen.map((s) => `<li>${fmt(s)}</li>`).join("")}</ol>` : ""}<div class="extra"></div>
          ${goed >= doel ? `<div class="wfb ok">🎉 ${doel} opgaven goed: dit onderdeel is afgevinkt. Je kunt gewoon doorgaan.</div>` : ""}
          <button class="btn primary big nw">Nieuwe opgave</button>`;
        if (d.na) d.na(el.querySelector(".extra"));
        if (goed >= doel) api.klaar();
        el.querySelector(".nw").onclick = nieuw;
      };
    }
    nieuw();
  }

  // Kleine meerkeuzevraag binnen een widget. opties[0] is goed. Fout = opnieuw proberen.
  function mcBlok(el, api, d) {
    const opties = api.shuffle(d.opties.map((t, i) => ({ t, i })));
    el.innerHTML = `<div class="opd"><span class="lab">${d.kop || "Vraag"}</span><p>${d.vraag}</p>
      <div class="kz2">${opties.map((o, n) => `<button class="btn" data-n="${n}" ${d.uit ? "disabled" : ""}>${o.t}</button>`).join("")}</div><div class="wfb"></div></div>`;
    const fb = el.querySelector(".wfb"); let pogingen = 0;
    if (d.uit) { fb.textContent = d.uit; }
    el.querySelectorAll("[data-n]").forEach((b) => (b.onclick = () => {
      const o = opties[+b.dataset.n]; pogingen++;
      if (o.i === 0) {
        el.querySelectorAll("[data-n]").forEach((k) => (k.disabled = true)); b.classList.add("goed");
        fb.className = "wfb ok"; fb.innerHTML = `<b>Goed! ✅</b> ${typeof d.uitleg === "function" ? d.uitleg() : d.uitleg}`;
        if (d.goed) d.goed(pogingen === 1);
      } else {
        b.classList.add("fout"); b.disabled = true;
        fb.className = "wfb nok"; fb.innerHTML = `<b>Nog niet.</b> ${(d.fout && d.fout[o.i - 1]) || "Kijk nog eens goed en probeer een ander antwoord."}`;
        if (d.mis) d.mis();
      }
    }));
  }

  TW.wa = { oordeelE, oordeelPhi, oordeelVcp, oordeelBox, phi, badge, OORDELEN, lees, mooi, mn, klem, r9, oefenBlok, mcBlok };

  // ------------------------------------------------------------------ Formule-lab
  TW.widget("formulelab", {
    titel: "Formule-lab", icoon: "🧪",
    uitleg: "Kies een soort verband en verschuif de getallen in de formule. Kijk wat er met de grafiek en de tabel gebeurt en los de opdracht op.",
    maak(el, api) {
      const S = (k, lab, min, max, step, v) => ({ k, lab, min, max, step, v });
      const TYPES = {
        recht: { naam: "recht evenredig", p: [S("a", "a (evenredigheidsconstante)", 0.5, 10, 0.5, 3)], f: (x, p) => p.a * x, xs: [1, 2, 4, 8], dx: [[2], [4], [5]],
          form: (p) => `y = ${mn(p.a)} · x`,
          regel: (p) => `Wordt x 2 keer zo groot, dan wordt y ook 2 keer zo groot. Het quotiënt y / x is steeds ${mn(p.a)}.` },
        lin: { naam: "lineair", p: [S("a", "a (helling)", -5, 5, 0.5, 2), S("b", "b (startgetal)", 0, 40, 1, 10)], f: (x, p) => p.a * x + p.b, xs: [0, 1, 2, 3, 4], dx: [[0, 4], [0, 5], [0, 2]],
          form: (p) => `y = ${mn(p.a)} · x + ${mn(p.b)}`,
          regel: (p) => `Elke stap van 1 in x geeft ${p.a >= 0 ? "+" : "−"}${mn(Math.abs(p.a))} in y. ${p.b === 0 ? "Met b = 0 gaat de lijn door (0, 0): dan is het ook recht evenredig." : "Niet recht evenredig, want de lijn gaat niet door (0, 0)."}` },
        omg: { naam: "omgekeerd evenredig", p: [S("a", "a (het vaste product x · y)", 6, 120, 6, 48)], f: (x, p) => p.a / x, xs: [1, 2, 4, 8], dx: [[2], [3], [6]],
          form: (p) => `y = ${mn(p.a)} / x`,
          regel: (p) => `Wordt x 2 keer zo groot, dan wordt y 2 keer zo klein. Het product x · y is steeds ${mn(p.a)}.` },
        gebr: { naam: "gebroken", p: [S("a", "a", 6, 96, 6, 36), S("b", "b (grenswaarde)", 0, 30, 1, 10)], f: (x, p) => p.a / x + p.b, xs: [1, 2, 4, 8], dx: [[2, 6], [1, 3], [3, 6]], asym: (p) => p.b,
          form: (p) => `y = ${mn(p.a)} / x + ${mn(p.b)}`,
          regel: (p) => `Voor grote x gaat ${mn(p.a)} / x naar 0. De grafiek nadert de stippellijn y = ${mn(p.b)}: dat is de grenswaarde.` },
        exp: { naam: "exponentieel", p: [S("b", "b (beginwaarde)", 1, 40, 1, 5), S("g", "g (groeifactor)", 0.5, 1.5, 0.05, 1.3)], f: (x, p) => p.b * Math.pow(p.g, x), xs: [0, 1, 2, 3, 4], dx: [[0, 1], [0, 2]],
          form: (p) => `y = ${mn(p.b)} · ${mn(p.g)}^{x}`,
          regel: (p) => (p.g > 1 ? `Elke stap van 1 in x maakt y ${mn(p.g)} keer zo groot: toenemend stijgend.` : p.g < 1 ? `Elke stap van 1 in x maakt y ${mn(p.g)} keer zo groot, dus kleiner: afnemend dalend. De grafiek nadert 0.` : "Met groeifactor 1 verandert er niets: y blijft constant.") },
        macht: { naam: "macht", p: [S("a", "a", 0.5, 6, 0.5, 1), S("n", "n (exponent)", -1, 3, 0.5, 2)], f: (x, p) => p.a * Math.pow(x, p.n), xs: [1, 2, 4, 8], dx: [[1, 4], [1, 2]],
          form: (p) => `y = ${mn(p.a)} · x^{${mn(p.n)}}`,
          regel: (p) => `Wordt x 2 keer zo groot, dan wordt y 2^{${mn(p.n)}} = ${mn(R.rond(Math.pow(2, p.n), 3))} keer zo groot.${p.n === 1 ? " Met n = 1 is dit recht evenredig." : p.n === -1 ? " Met n = −1 is dit omgekeerd evenredig: x^{−1} = 1 / x." : p.n === 0.5 ? " Met n = 0,5 is dit een wortelformule: x^{0,5} = √x." : p.n === 0 ? " Met n = 0 is y constant, want x^{0} = 1." : ""}` },
        wortel: { naam: "wortel", p: [S("a", "a", 1, 15, 1, 6), S("b", "b (startgetal)", 0, 30, 1, 0)], f: (x, p) => p.a * Math.sqrt(x) + p.b, xs: [0, 1, 4, 9], dx: [[0, 4], [0, 9], [1, 4]],
          form: (p) => `y = ${mn(p.a)} · √x + ${mn(p.b)}`,
          regel: () => "Wordt x 4 keer zo groot, dan wordt √x maar 2 keer zo groot. De grafiek is afnemend stijgend." }
      };
      let type = "recht", p = {}, doel = null, gelukt = 0;
      const P = api.plot({ x: [0, 10], y: [0, 50], xt: 2, yt: 10, xl: "x", yl: "y", h: 230 });
      el.innerHTML = `<div class="keuze soort">${Object.keys(TYPES).map((k) => `<button class="btn" data-t="${k}">${TYPES[k].naam}</button>`).join("")}</div>
        <div class="formule fl"></div><div class="graf"></div><div class="schuiven"></div><div class="tab"></div><div class="uit regel"></div>
        <div class="opd"><span class="lab">Opdracht · <span class="tel"></span></span><p class="dt"></p><p class="meta status"></p><div class="wfb"></div><button class="btn klein ander">Andere opdracht</button></div>`;
      const q = (s) => el.querySelector(s);
      const pt = (x, y) => `(${mn(x)}, ${mn(y)})`;
      const raak = (pp, x, y) => Math.abs(TYPES[type].f(x, pp) - y) <= 0.051;
      function nieuwDoel() {
        const def = TYPES[type]; doel = null;
        for (let i = 0; i < 400 && !doel; i++) {
          const k = {};
          def.p.forEach((s) => { k[s.k] = R.rond(s.min + s.step * R.int(0, Math.round((s.max - s.min) / s.step)), 4); });
          const pts = R.kies(def.dx).map((x) => [x, def.f(x, k)]);
          if (!pts.every((a) => isFinite(a[1]) && a[1] >= 1 && a[1] <= 48 && Math.abs(a[1] * 100 - Math.round(a[1] * 100)) < 1e-6)) continue;
          const rp = pts.map((a) => [a[0], R.rond(a[1], 2)]);
          if (rp.every((a) => raak(p, a[0], a[1]))) continue;
          doel = { pts: rp, af: false };
        }
      }
      function teken() {
        const def = TYPES[type];
        let body = P.assen();
        if (def.asym) body += P.lijn(0, def.asym(p), 10, def.asym(p), "stip");
        body += P.fn((x) => def.f(x, p), "curve", 200);
        if (doel) body += doel.pts.map((a) => P.punt(a[0], a[1], "ring" + (raak(p, a[0], a[1]) ? " raak" : ""), 7)).join("");
        q(".graf").innerHTML = P.svg(body, "Grafiek van een " + def.naam + " verband");
        q(".fl").innerHTML = fmt(def.form(p));
        const ys = def.xs.map((x) => { const y = def.f(x, p); return isFinite(y) ? mn(R.rond(y, 2)) : "–"; });
        q(".tab").innerHTML = `<table class="tabel wt"><tr><th>x</th>${def.xs.map((x) => `<td>${x}</td>`).join("")}</tr><tr><th>y</th>${ys.map((y) => `<td><b>${y}</b></td>`).join("")}</tr></table>`;
        q(".regel").innerHTML = fmt(def.regel(p));
        def.p.forEach((s) => { q(`[data-o="${s.k}"]`).textContent = mn(p[s.k]); });
        q(".tel").textContent = `${gelukt} gelukt`;
        if (!doel) { q(".dt").textContent = "Speel vrij met de schuiven."; q(".status").textContent = ""; return; }
        q(".dt").innerHTML = `Stel de formule zo in dat de grafiek door ${doel.pts.map((a) => `<b>${pt(a[0], a[1])}</b>`).join(" en ")} gaat.`;
        const alle = doel.pts.every((a) => raak(p, a[0], a[1]));
        q(".status").innerHTML = doel.pts.map((a) => {
          const y = R.rond(def.f(a[0], p), 2);
          return raak(p, a[0], a[1]) ? `Bij x = ${mn(a[0])} geeft jouw formule y = ${mn(a[1])} ✓` : `Bij x = ${mn(a[0])} geeft jouw formule y = ${isFinite(y) ? mn(y) : "–"}. Het doel is ${mn(a[1])}: ${y < a[1] ? "nog te laag" : "nog te hoog"}.`;
        }).join("<br>");
        const fb = q(".wfb");
        if (alle) {
          if (!doel.af) { doel.af = true; gelukt++; api.klaar(); q(".tel").textContent = `${gelukt} gelukt`; }
          fb.className = "wfb ok"; fb.innerHTML = `<b>Gelukt! ✅</b> ${fmt(def.form(p))} gaat door ${doel.pts.map((a) => pt(a[0], a[1])).join(" en ")}. Controleer het door x in te vullen. Tik op "Andere opdracht" voor een nieuwe.`;
        } else { fb.className = "wfb"; fb.innerHTML = ""; }
      }
      function kies(t) {
        type = t; const def = TYPES[t]; p = {};
        def.p.forEach((s) => (p[s.k] = s.v));
        el.querySelectorAll("[data-t]").forEach((b) => b.classList.toggle("aan", b.dataset.t === t));
        q(".schuiven").innerHTML = def.p.map((s) => `<label class="schuif"><span>${s.lab}</span><output data-o="${s.k}"></output><input type="range" data-k="${s.k}" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.v}"></label>`).join("");
        el.querySelectorAll("input[data-k]").forEach((inp) => (inp.oninput = () => { p[inp.dataset.k] = R.rond(+inp.value, 4); teken(); }));
        nieuwDoel(); teken();
      }
      el.querySelectorAll("[data-t]").forEach((b) => (b.onclick = () => kies(b.dataset.t)));
      q(".ander").onclick = () => { nieuwDoel(); teken(); };
      kies("recht");
    }
  });

  // ------------------------------------------------------------------ Omwerk-trainer
  TW.widget("omwerk", {
    titel: "Omwerk-trainer", icoon: "⚖️",
    uitleg: "Maak de gevraagde variabele vrij. Kies bij elke stap wat je aan **beide kanten** van het =-teken doet, net als bij een balans. Je pelt de formule af van buiten naar binnen.",
    maak(el, api) {
      const E = (s, prec, x) => Object.assign({ s, prec }, x || {});
      const hk = (e, max) => (e.prec > max ? `(${e.s})` : e.s);
      const isGetal = (v) => /^[\d,]+$/.test(v);
      function pas(e, op) {
        const v = op.v;
        switch (op.t) {
          case "+": return E(`${e.s} + ${v}`, 2);
          case "-": return E(`${e.s} − ${v}`, 2);
          case "*": return E(isGetal(v) ? (e.prec === 2 ? `${v}(${e.s})` : e.s.length === 1 ? `${v}${e.s}` : `${v} · ${e.s}`) : `${v} · ${hk(e, 1)}`, 1);
          case "/": return E(`${e.prec === 2 || e.q ? `(${e.s})` : e.s} / ${op.vd || v}`, 1, { q: true });
          case "kw": return E(`${e.prec > 0 || e.w ? `(${e.s})` : e.s}^{2}`, 0);
          case "wortel": return E(e.prec === 0 && !e.w && e.s.length === 1 ? `√${e.s}` : `√(${e.s})`, 0, { w: true });
          case "omg": return E(`${v} / ${hk(e, 0)}`, 1, { q: true });
          default: return E(`${v} − ${hk(e, 1)}`, 2); // "min": v − e
        }
      }
      const num = (val, op) => ({ "+": val + op.n, "-": val - op.n, "*": val * op.n, "/": val / op.n, kw: val * val, wortel: Math.sqrt(val), omg: op.n / val, min: op.n - val }[op.t]);
      function plan(l, x, ops) {
        const binnen = (k) => ops.slice(0, k).reduce(pas, E(x, 0));
        let L = E(l, 0), varLinks = false; const st = [];
        const eq = (Ls, Is) => (varLinks ? [Is, Ls] : [Ls, Is]);
        for (let k = ops.length; k > 0; k--) {
          const op = ops[k - 1], I = binnen(k - 1), v = op.v, vd = op.vd || op.v, voor = eq(L.s, binnen(k).s);
          let L2;
          if (op.t === "+") { L2 = E(`${L.s} − ${v}`, 2); st.push({ voor, knop: `− ${v}`, anti: `+ ${v}`, na: eq(L2.s, I.s), uitleg: `Er staat + ${v}. Dat haal je weg door aan beide kanten ${v} af te trekken.` }); }
          else if (op.t === "-") { L2 = E(`${L.s} + ${v}`, 2); st.push({ voor, knop: `+ ${v}`, anti: `− ${v}`, na: eq(L2.s, I.s), uitleg: `Er staat − ${v}. Dat haal je weg door aan beide kanten ${v} op te tellen.` }); }
          else if (op.t === "*") { L2 = pas(L, { t: "/", v, vd }); st.push({ voor, knop: `÷ ${vd}`, anti: `× ${vd}`, na: eq(L2.s, I.s), uitleg: `Er wordt met ${v} vermenigvuldigd. Het omgekeerde is delen door ${vd}. Let op: je deelt de hele andere kant.` }); }
          else if (op.t === "/") { L2 = pas(L, { t: "*", v }); st.push({ voor, knop: `× ${vd}`, anti: `÷ ${vd}`, na: eq(L2.s, I.s), uitleg: `Er wordt door ${v} gedeeld. Het omgekeerde is vermenigvuldigen met ${v}.` }); }
          else if (op.t === "kw") { L2 = pas(L, { t: "wortel" }); st.push({ voor, knop: "√ nemen", anti: "kwadrateren", na: eq(L2.s, I.s), uitleg: "Het omgekeerde van kwadrateren is de wortel nemen." }); }
          else if (op.t === "wortel") { L2 = pas(L, { t: "kw" }); st.push({ voor, knop: "kwadrateren", anti: "√ nemen", na: eq(L2.s, I.s), uitleg: "Het omgekeerde van de wortel is kwadrateren." }); }
          else if (op.t === "omg") {
            const Li = hk(I, 0), prod = `${hk(L, 1)} · ${hk(I, 1)}`, tussen = varLinks ? [v, prod] : [prod, v];
            st.push({ voor, knop: `× ${Li}`, anti: `÷ ${Li}`, na: tussen, uitleg: `${I.s} staat in de noemer. Vermenigvuldig eerst beide kanten met ${Li}, dan is de breuk weg.` });
            L2 = E(`${v} / ${hk(L, 0)}`, 1, { q: true }); varLinks = !varLinks;
            st.push({ voor: tussen, knop: `÷ ${hk(L, 0)}`, anti: `× ${hk(L, 0)}`, na: eq(L2.s, I.s), uitleg: `Nu staat er ${prod}. Deel beide kanten door ${hk(L, 0)}, dan blijft ${I.s} alleen over.` });
          } else {
            const som = `${L.s} + ${I.s}`, tussen = varLinks ? [v, som] : [som, v];
            st.push({ voor, knop: `+ ${I.s}`, anti: `− ${I.s}`, na: tussen, uitleg: `Er staat − ${I.s}. Tel aan beide kanten ${I.s} op, dan staat die term positief aan de andere kant.` });
            L2 = E(`${v} − ${hk(L, 1)}`, 2); varLinks = !varLinks;
            st.push({ voor: tussen, knop: `− ${hk(L, 1)}`, anti: `+ ${hk(L, 1)}`, na: eq(L2.s, I.s), uitleg: `Haal ${L.s} weg door aan beide kanten ${hk(L, 1)} af te trekken.` });
          }
          L = L2;
        }
        return { st, eind: `${x} = ${L.s}` };
      }
      const g = R.int, N = (t, n) => ({ t, v: nl(n), n }), Lt = (t, naam, n) => ({ t, v: naam, n, letters: [[naam, n]] });
      const NIV = [
        { naam: "1 · getallen", lijst: [
          () => { const a = g(2, 9), b = g(1, 20); return { l: "y", x: "x", ops: [N("*", a), N("+", b)], x0: g(2, 9) }; },
          () => { const a = g(2, 9), b = g(1, 20); return { l: "y", x: "x", ops: [N("*", a), N("-", b)], x0: g(3, 9) }; },
          () => { const a = R.kies([0.5, 1.5, 2.5, 12, 25]), b = R.kies([40, 75, 150, 300]); return { l: "K", x: "q", ops: [N("*", a), N("+", b)], x0: 10 * g(2, 9), ctx: "Kosten K (in euro) bij q verkochte producten." }; },
          () => { const a = g(2, 6), b = g(1, 12); return { l: "y", x: "x", ops: [N("/", a), N("+", b)], x0: a * g(2, 6) }; },
          () => { const a = g(2, 6), b = g(1, 9); return { l: "y", x: "x", ops: [N("+", b), N("*", a)], x0: g(1, 9) }; },
          () => { const a = g(2, 6), b = g(1, 9); return { l: "y", x: "x", ops: [N("-", b), N("/", a)], x0: b + a * g(1, 5) }; }
        ] },
        { naam: "2 · letters", lijst: [
          () => ({ l: "v", x: "s", ops: [Lt("/", "t", 4)], x0: 120, ctx: "Snelheid v = afstand s gedeeld door tijd t." }),
          () => ({ l: "P", x: "I", ops: [Lt("*", "U", 230)], x0: 6, ctx: "Vermogen P = spanning U keer stroomsterkte I." }),
          () => ({ l: "I", x: "h", ops: [{ t: "*", v: "l · b", vd: "(l · b)", n: 12, letters: [["l", 4], ["b", 3]] }], x0: 5, ctx: "Inhoud I van een doos met lengte l, breedte b en hoogte h." }),
          () => ({ l: "O", x: "b", ops: [N("*", 2), { t: "+", v: "2l", n: 14, letters: [["l", 7]] }], x0: 4, ctx: "Omtrek O van een rechthoek met lengte l en breedte b." }),
          () => ({ l: "W", x: "q", ops: [Lt("*", "p", 8), Lt("-", "k", 150)], x0: 40, ctx: "Winst W bij q producten met prijs p en vaste kosten k." }),
          () => ({ l: "y", x: "x", ops: [Lt("*", "a", 3), Lt("+", "b", 5)], x0: 4, ctx: "De algemene lineaire formule." }),
          () => ({ l: "v", x: "t", ops: [Lt("omg", "s", 120)], x0: 4, ctx: "Snelheid v = afstand s gedeeld door tijd t." })
        ] },
        { naam: "3 · kwadraat, wortel, breuk", lijst: [
          () => ({ l: "A", x: "r", ops: [{ t: "kw" }, { t: "*", v: "π", n: Math.PI }], x0: 5, ctx: "Oppervlakte A van een cirkel met straal r." }),
          () => ({ l: "E", x: "v", ops: [{ t: "kw" }, { t: "*", v: "0,5 · m", vd: "(0,5 · m)", n: 40, letters: [["m", 80]] }], x0: 6, ctx: "Bewegingsenergie E bij massa m en snelheid v." }),
          () => ({ l: "B", x: "L", ops: [{ t: "kw" }, Lt("omg", "G", 72)], x0: 1.8, ctx: "BMI: B is het gewicht G gedeeld door het kwadraat van de lengte L." }),
          () => { const a = g(2, 9); return { l: "y", x: "x", ops: [{ t: "wortel" }, N("*", a)], x0: R.kies([4, 9, 16, 25]) }; },
          () => { const a = R.kies([15, 20, 25]), b = R.kies([0.5, 0.6, 0.8]); return { l: "T", x: "h", ops: [N("*", b), N("min", a)], x0: 5, ctx: "Temperatuur T (in °C) op hoogte h (in km)." }; },
          () => ({ l: "R", x: "v", ops: [{ t: "kw" }, N("*", 0.0075)], x0: 80, ctx: "Remweg R (in m) bij snelheid v (in km/u)." }),
          () => { const a = R.kies([12, 24, 36, 60]), b = g(1, 9); return { l: "y", x: "x", ops: [N("omg", a), N("+", b)], x0: R.kies([2, 3, 4, 6]) }; }
        ] }
      ];
      let niv = 0, f, pl, i, fouten, log, af = 0, foutloos = 0, vorige = -1;
      el.innerHTML = `<div class="keuze niv">${NIV.map((n, k) => `<button class="btn" data-n="${k}">${n.naam}</button>`).join("")}</div><p class="meta stand"></p><div class="werk"></div>`;
      const werk = el.querySelector(".werk");
      const logHtml = () => (log.length ? `<ul class="wlog">${log.map((r) => `<li><span>${fmt(r[0])}</span><b>${fmt(r[1])}</b></li>`).join("")}</ul>` : "");
      function kies4() {
        const s = pl.st[i], set = [s.knop];
        const voeg = (x) => { if (x && !set.includes(x) && set.length < 4) set.push(x); };
        voeg(s.anti); if (pl.st[i + 1]) voeg(pl.st[i + 1].knop);
        api.shuffle(pl.st.reduce((a, t) => a.concat([t.knop, t.anti]), []).concat(["× 2", "− 1", "kwadrateren", "√ nemen", "+ 1", "÷ 2"])).forEach(voeg);
        return api.shuffle(set);
      }
      function stand() { el.querySelector(".stand").textContent = `Formules af: ${af} · zonder fout: ${foutloos}`; }
      function nieuw() {
        let k; do { k = R.int(0, NIV[niv].lijst.length - 1); } while (k === vorige && NIV[niv].lijst.length > 1);
        vorige = k; f = NIV[niv].lijst[k](); pl = plan(f.l, f.x, f.ops); i = 0; fouten = 0; log = []; stand(); toon();
      }
      function toon() {
        if (i >= pl.st.length) return eind();
        const s = pl.st[i], opties = kies4();
        werk.innerHTML = `${f.ctx ? `<p class="meta">${f.ctx}</p>` : ""}<p>Maak <b>${f.x}</b> vrij. Stap ${i + 1} van ${pl.st.length}.</p>
          <div class="balans"><div class="pan"><span class="e0">${fmt(s.voor[0])}</span><i class="tag"></i></div><div class="is">=</div><div class="pan"><span class="e1">${fmt(s.voor[1])}</span><i class="tag"></i></div></div><div class="balansvoet"></div>
          ${logHtml()}
          <p class="meta">Wat doe je aan beide kanten?</p>
          <div class="kz2">${opties.map((o, n) => `<button class="btn" data-n="${n}">${fmt(o)}</button>`).join("")}</div>
          <div class="wfb"></div><div class="verder"></div>`;
        const fb = werk.querySelector(".wfb");
        werk.querySelectorAll("[data-n]").forEach((b) => (b.onclick = () => {
          const o = opties[+b.dataset.n];
          if (o === s.knop) {
            werk.querySelectorAll("[data-n]").forEach((k) => (k.disabled = true)); b.classList.add("goed");
            werk.querySelectorAll(".tag").forEach((t) => (t.innerHTML = fmt(s.knop)));
            werk.querySelector(".balans").classList.add("doe");
            werk.querySelector(".e0").innerHTML = fmt(s.na[0]); werk.querySelector(".e1").innerHTML = fmt(s.na[1]);
            fb.className = "wfb ok"; fb.innerHTML = `<b>Goed! ✅</b> ${fmt(s.uitleg)}`;
            log.push([s.voor.join(" = "), s.knop]);
            werk.querySelector(".verder").innerHTML = `<button class="btn primary big">${i + 1 < pl.st.length ? "Volgende stap" : "Bekijk het resultaat"}</button>`;
            werk.querySelector(".verder button").onclick = () => { i++; toon(); };
          } else {
            fouten++; b.classList.add("fout"); b.disabled = true;
            const later = pl.st.slice(i + 1).some((t) => t.knop === o);
            fb.className = "wfb nok";
            fb.innerHTML = `<b>Nog niet.</b> ${o === s.anti ? "Dat is dezelfde bewerking nog een keer. Je zoekt juist het omgekeerde, zodat het wegvalt." : later ? "Die stap komt later. Haal eerst weg wat bij het uitrekenen als laatste gebeurt." : `Deze bewerking haalt niets weg. Kijk wat er bij het uitrekenen als laatste met ${f.x} gebeurt.`}`;
          }
        }));
      }
      function eind() {
        af++; if (!fouten) foutloos++; stand();
        if (af >= 3) api.klaar();
        const letters = f.ops.reduce((a, o) => a.concat(o.letters || []), []);
        const val = f.ops.reduce(num, f.x0);
        werk.innerHTML = `<p>Je hebt <b>${f.x}</b> vrijgemaakt:</p><div class="eindf">${fmt(pl.eind)}</div>${logHtml()}
          <div class="wfb ok"><b>Controle met getallen.</b> Neem ${letters.map((a) => `${a[0]} = ${nl(a[1])}`).concat([`${f.x} = ${nl(f.x0)}`]).join(", ")}. De oorspronkelijke formule geeft dan ${f.l} = ${nl(R.rond(val, 2))}. Vul je dat in je nieuwe formule in, dan komt er weer ${f.x} = ${nl(f.x0)} uit. Klopt! ✓</div>
          ${af === 3 ? `<div class="wfb ok">🎉 Drie formules omgewerkt: dit onderdeel is afgevinkt. Probeer ook een hoger niveau.</div>` : ""}
          <button class="btn primary big">Nieuwe formule</button>`;
        werk.querySelector("button").onclick = nieuw;
      }
      function kiesNiv(k) { niv = k; vorige = -1; el.querySelectorAll("[data-n]").forEach((b) => b.classList.toggle("aan", b.parentNode.classList.contains("niv") && +b.dataset.n === k)); nieuw(); }
      el.querySelectorAll(".niv [data-n]").forEach((b) => (b.onclick = () => kiesNiv(+b.dataset.n)));
      kiesNiv(0);
    }
  });

  // ------------------------------------------------------------------ Grenswaarde-zoeker
  TW.widget("grens", {
    titel: "Grenswaarde-zoeker", icoon: "🎯",
    uitleg: "Schuif t steeds verder naar rechts en kijk hoe de uitkomst naar een vast getal kruipt: de grenswaarde. Beantwoord daarna de twee vragen.",
    maak(el, api) {
      let G = 80, b = 60, gf = 0.9, sg = -1, t = 0;
      el.innerHTML = `<div class="formule fl"></div><div class="graf"></div>
        <label class="schuif"><span>t (schuif naar rechts)</span><output class="ot"></output><input class="st" type="range" min="0" max="60" step="1" value="0"></label>
        <div class="uit lees"></div><div class="tab"></div><div class="oef"></div>`;
      const q = (s) => el.querySelector(s), f = (x) => G + sg * b * Math.pow(gf, x);
      const form = () => `N = ${G} ${sg < 0 ? "−" : "+"} ${b} · ${nl(gf)}^{t}`;
      function teken() {
        const ymax = mooi(Math.max(G, f(0)) * 1.12);
        const P = api.plot({ x: [0, 60], y: [0, ymax], xt: 10, yt: ymax / 5, xl: "t", yl: "N", h: 220 });
        q(".graf").innerHTML = P.svg(P.assen() + P.lijn(0, G, 60, G, "stip") + P.tekst(1, G, "grenswaarde", "start", "k pg", 0, sg < 0 ? -5 : 13)
          + P.fn(f, "curve", 180) + P.lijn(t, 0, t, f(t), "stip") + P.punt(t, f(t), "greep", 7), "Grafiek die een grenswaarde nadert");
        q(".fl").innerHTML = fmt(form());
        q(".ot").textContent = t;
        q(".lees").innerHTML = `Bij t = ${t} is N = <b>${nl(R.rond(f(t), 3))}</b>. Afstand tot de grenswaarde: <b>${nl(R.rond(Math.abs(G - f(t)), 3))}</b>`;
        const ts = [0, 5, 10, 20, 40, 60];
        q(".tab").innerHTML = `<table class="tabel wt"><tr><th>t</th>${ts.map((x) => `<td>${x}</td>`).join("")}</tr><tr><th>N</th>${ts.map((x) => `<td><b>${nl(R.rond(f(x), 1))}</b></td>`).join("")}</tr></table>`;
      }
      q(".st").oninput = (e) => { t = +e.target.value; teken(); };
      oefenBlok(q(".oef"), api, () => {
        sg = R.kies([-1, -1, 1]); G = 10 * R.int(4, 40);
        b = sg < 0 ? 10 * R.int(2, Math.min(20, G / 10 - 1)) : 10 * R.int(2, 15);
        gf = R.kies([0.6, 0.7, 0.75, 0.8, 0.85, 0.9]); t = 0; q(".st").value = 0; teken();
        let tt = 0; while (b * Math.pow(gf, tt) >= 1) tt++;
        return {
          html: `<p>De grafiek hierboven hoort bij <b>${fmt(form())}</b>. Gebruik de schuif en de tabel, of redeneer met de formule.</p>`,
          velden: [{ label: "Grenswaarde van N", antwoord: G, tol: 0.001 }, { label: "Kleinste hele t waarbij N minder dan 1 van de grenswaarde af ligt", antwoord: tt, tol: 0.001 }],
          stappen: [`${nl(gf)}^{t} wordt steeds kleiner en nadert 0 (de groeifactor ligt tussen 0 en 1). Dus ${b} · ${nl(gf)}^{t} nadert 0 en N nadert ${G}.`,
            `De afstand tot de grenswaarde is ${b} · ${nl(gf)}^{t}. Bij t = ${tt - 1} is dat ${nl(R.rond(b * Math.pow(gf, tt - 1), 3))} (nog niet kleiner dan 1), bij t = ${tt} is dat ${nl(R.rond(b * Math.pow(gf, tt), 3))}. Dus vanaf t = ${tt}.`]
        };
      }, { kop: "Opdracht" });
    }
  });

  // ------------------------------------------------------------------ Top en snijpunt zoeken (tabel van de GR)
  TW.widget("topsnij", {
    titel: "Top en snijpunt zoeken", icoon: "⛰️",
    uitleg: "Zo werkt de tabel van je grafische rekenmachine: loop met x langs de grafiek, kijk waar Y1 het grootst is en waar Y1 en Y2 gelijk zijn. Verklein de stap om nauwkeuriger te zoeken.",
    maak(el, api) {
      let a, p, top, c, d, xs, x = 0, stap = 1;
      const f1 = (v) => -a * (v - p) * (v - p) + top, f2 = (v) => c * v + d;
      const P = api.plot({ x: [0, 10], y: [0, 60], xt: 2, yt: 10, xl: "x", yl: "y", h: 230 });
      el.innerHTML = `<div class="formule fl"></div><div class="graf"></div>
        <p class="meta">Stapgrootte van de tabel</p><div class="keuze ks"><button class="btn aan" data-s="1">stap 1</button><button class="btn" data-s="0.1">stap 0,1</button></div>
        <label class="schuif"><span>x</span><output class="ox"></output><input class="sx" type="range" min="0" max="10" step="1" value="0"></label>
        <div class="tab"></div><div class="oef"></div>`;
      const q = (s) => el.querySelector(s), n2 = (v) => mn(R.rond(v, 2), 2);
      function teken() {
        q(".graf").innerHTML = P.svg(P.assen() + P.fn(f1, "curve", 200) + P.fn(f2, "curve4", 20) + P.lijn(x, 0, x, 60, "stip")
          + (f1(x) >= 0 && f1(x) <= 60 ? P.punt(x, f1(x), "dotA", 6) : "") + (f2(x) >= 0 && f2(x) <= 60 ? P.punt(x, f2(x), "dotB", 6) : "")
          + P.tekst(9.8, 57, "Y1", "end", "k b pa") + P.tekst(9.8, 52, "Y2", "end", "k b pb"), "Parabool Y1 en lijn Y2");
        q(".ox").textContent = mn(x);
        const rijen = [-2, -1, 0, 1, 2].map((k) => R.rond(x + k * stap, 2)).filter((v) => v >= 0 && v <= 10);
        q(".tab").innerHTML = `<table class="tabel wt"><tr><th>x</th><th>Y1</th><th>Y2</th></tr>${rijen.map((v) => `<tr><td class="${v === x ? "sel" : ""}">${mn(v)}</td><td class="${v === x ? "sel" : ""}">${n2(f1(v))}</td><td class="${v === x ? "sel" : ""}">${n2(f2(v))}</td></tr>`).join("")}</table>`;
      }
      q(".sx").oninput = (e) => { x = R.rond(+e.target.value, 2); teken(); };
      el.querySelectorAll("[data-s]").forEach((bt) => (bt.onclick = () => {
        stap = +bt.dataset.s; el.querySelectorAll("[data-s]").forEach((k) => k.classList.toggle("aan", k === bt));
        q(".sx").step = stap; x = R.rond(Math.round(x / stap) * stap, 2); q(".sx").value = x; teken();
      }));
      oefenBlok(q(".oef"), api, () => {
        for (;;) {
          a = R.kies([1, 2]); p = R.int(26, 49) / 10; top = R.int(36, 56); c = R.kies([1, 2, 3]);
          xs = R.rond(p + R.int(8, 30) / 10, 1);
          if (Math.round(p * 10) % 10 === 0 || xs > 9.5 || xs - p <= c / (2 * a) + 0.05) continue;
          d = R.rond(f1(xs) - c * xs, 4);
          if (f1(xs) >= 6 && d >= 0 && d <= 40) break;
        }
        x = 0; q(".sx").value = 0; teken();
        const k1 = R.rond(2 * a * p, 4), k0 = R.rond(top - a * p * p, 4);
        q(".fl").innerHTML = fmt(`Y1 = −${nl(a)}x^{2} + ${nl(k1)}x ${k0 < 0 ? "−" : "+"} ${nl(Math.abs(k0))}\nY2 = ${nl(c)}x + ${nl(d)}`);
        return {
          html: "<p>Zoek met de schuif en de tabel. Geef je antwoorden in 1 decimaal.</p>",
          velden: [{ label: "x van de top van Y1", antwoord: p, tol: 0.051 }, { label: "Grootste waarde van Y1", antwoord: top, tol: 0.051 }, { label: "x van het rechter snijpunt van Y1 en Y2", antwoord: xs, tol: 0.051 }],
          stappen: [`Met stap 1 zie je dat Y1 het grootst is rond x = ${Math.floor(p)} en x = ${Math.ceil(p)}. Met stap 0,1 vind je de grootste waarde Y1 = ${nl(top)} bij x = ${nl(p)}.`,
            `Bij een snijpunt zijn Y1 en Y2 gelijk. Rechts van de top is dat bij x = ${nl(xs)}: daar zijn beide ${nl(R.rond(f1(xs), 2))}.`,
            "Op je grafische rekenmachine gaat dit sneller met de opties voor maximum en snijpunt in het grafiekmenu. De tabel gebruik je om te controleren."]
        };
      }, { kop: "Opdracht" });
    }
  });
})();
