/* Toetsweek-kern: gedeelde leer-engine voor alle vak-apps.
   Bron: toetsweek/core/core.js. Niet per vak aanpassen; wijzig de bron en draai sync-core.sh.
   Dataformaat en widget-API: zie toetsweek/core/README.md. */
(function () {
  "use strict";
  const TW = (window.TW = window.TW || {});
  const S = {
    vak: { id: "demo", titel: "Demo", icoon: "📚", kleur: "#2563a8", hub: "../toetsweek/", methode: "", toets: "" },
    hfst: [], widgets: {}, figs: {}
  };
  TW.vak = (o) => Object.assign(S.vak, o);
  TW.hoofdstuk = (h) => { S.hfst.push(h); };
  TW.widget = (naam, def) => { S.widgets[naam] = def; };
  TW.fig = (naam, fn) => { S.figs[naam] = fn; };

  // ---------- hulpfuncties ----------
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // Lichte opmaak: **vet**, [[begrip]], _{sub}, ^{super}, regeleinde.
  const fmt = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/\[\[(.+?)\]\]/g, '<mark class="term">$1</mark>')
    .replace(/_\{(.+?)\}/g, "<sub>$1</sub>")
    .replace(/\^\{(.+?)\}/g, "<sup>$1</sup>")
    .replace(/\n/g, "<br>");
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const nl = (x, d) => Number(x).toLocaleString("nl-NL", d == null ? { maximumFractionDigits: 6 } : { minimumFractionDigits: d, maximumFractionDigits: d });
  const R = {
    int: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),
    kies: (arr) => arr[Math.floor(Math.random() * arr.length)],
    rond: (x, d = 0) => Math.round((x + Number.EPSILON) * 10 ** d) / 10 ** d,
    nl, shuffle
  };
  const dag = () => { const n = new Date(); return Math.floor((n.getTime() - n.getTimezoneOffset() * 60000) / 864e5); };
  const $ = (id) => document.getElementById(id);
  const FIG = (naam, quiz) => {
    try { return S.figs[naam] ? S.figs[naam](!!quiz) : ""; } catch (e) { console.error("figuur " + naam, e); return ""; }
  };
  const figkaart = (naam, quiz) => { const h = FIG(naam, quiz); return h ? `<div class="card figkaart">${h}</div>` : ""; };
  Object.assign(TW, { esc, fmt, shuffle, nl, R, FIG, _S: S });

  // ---------- opslag (alleen op dit apparaat) ----------
  let st;
  const KEY = () => "tw:" + S.vak.id;
  const leeg = () => ({ v: 1, k: {}, q: {}, m: {}, l: {}, w: {}, d: {} });
  function laad() {
    st = leeg();
    try { const r = JSON.parse(localStorage.getItem(KEY())); if (r && r.v === 1) st = Object.assign(st, r); } catch (e) { /* geen opslag: app werkt door */ }
  }
  function bewaar() {
    st.sum = samenvat();
    try { localStorage.setItem(KEY(), JSON.stringify(st)); } catch (e) { /* negeren */ }
    const v = $("vuur"); if (v) v.textContent = reeks() ? "🔥 " + reeks() : "";
  }

  // ---------- index van alle stof ----------
  let OND = [];
  const SOORT = { v: "meerkeuze", r: "rekenen", o: "oefening", p: "open vraag" };
  function bouw() {
    OND = [];
    S.hfst.forEach((h) => (h.onderdelen || []).forEach((o) => {
      o.h = h; OND.push(o); o._items = [];
      const voeg = (lijst, t) => (lijst || []).forEach((d, i) => o._items.push({ id: `${o.id}:${t}${i}`, t, d, o }));
      voeg(o.vragen, "v"); voeg(o.reken, "r"); voeg(o.oefen, "o"); voeg(o.open, "p");
      o._kaarten = (o.begrippen || []).map((b, i) => ({ id: `${o.id}:k${i}`, b, o }));
    }));
  }
  const ond = (id) => OND.find((o) => o.id === id);
  const alleItems = (types) => OND.flatMap((o) => o._items).filter((x) => !types || types.includes(x.t));
  const alleKaarten = () => OND.flatMap((o) => o._kaarten);
  const isFout = (x) => st.q[x.id] && st.q[x.id].g === 0;
  const isGoed = (x) => st.q[x.id] && st.q[x.id].g === 1;
  const kaartRec = (k) => st.k[k.id] || { b: 0, d: 0 };
  const kaartDue = (k) => st.k[k.id] && st.k[k.id].d <= dag();
  function beheersing(o) {
    const its = o._items.filter((x) => x.t !== "p");
    const tot = its.length + o._kaarten.length;
    if (!tot) return st.l[o.id] ? 1 : 0;
    return (its.filter(isGoed).length + o._kaarten.filter((k) => kaartRec(k).b >= 2).length) / tot;
  }
  function reeks() {
    let n = 0, t = dag();
    if (!st.d[t]) t--;
    while (st.d[t]) { n++; t--; }
    return n;
  }
  function samenvat() {
    const n = OND.length;
    const pct = n ? Math.round((OND.reduce((s, o) => s + beheersing(o), 0) / n) * 100) : 0;
    return {
      titel: S.vak.titel, icoon: S.vak.icoon, n, pct,
      af: OND.filter((o) => st.m[o.id] === "af").length,
      her: OND.filter((o) => st.m[o.id] === "her").length,
      fout: alleItems().filter(isFout).length,
      due: alleKaarten().filter(kaartDue).length,
      reeks: reeks(), laatst: Date.now(),
      ond: OND.map((o) => ({ id: o.id, nr: o.nr || "", titel: o.titel, m: st.m[o.id] || "", p: Math.round(beheersing(o) * 100) }))
    };
  }
  function noteer(x, juist) {
    const r = st.q[x.id] || (st.q[x.id] = { g: 0, n: 0, f: 0 });
    r.g = juist ? 1 : 0; r.n++; if (!juist) r.f++;
    telDag(juist);
    if (!juist && st.m[x.o.id] === "af") st.m[x.o.id] = "her"; // geel wordt turquoise: herhalen
    bewaar();
  }
  function telDag(juist) {
    const t = dag(), d = st.d[t] || (st.d[t] = { n: 0, g: 0 });
    d.n++; if (juist) d.g++;
    Object.keys(st.d).forEach((k) => { if (k < t - 90) delete st.d[k]; });
  }

  // ---------- bouwstenen ----------
  let app;
  let opruim = [];
  const bar = (n, tot) => `<div class="bar" role="img" aria-label="${n} van ${tot}"><i style="width:${tot ? Math.round((n / tot) * 100) : 0}%"></i></div>`;
  function ring(p) {
    const r = 15, c = 2 * Math.PI * r, pct = Math.round(p * 100);
    return `<svg class="ring" viewBox="0 0 40 40" role="img" aria-label="${pct}% beheerst"><circle cx="20" cy="20" r="${r}" class="rb"/><circle cx="20" cy="20" r="${r}" class="rv" stroke-dasharray="${(c * p).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 20 20)"/><text x="20" y="24" text-anchor="middle">${pct}</text></svg>`;
  }
  const stiftKlasse = (id) => (st.m[id] === "af" ? "geel" : st.m[id] === "her" ? "turq" : "");
  function widgetIn(el, naam) {
    const w = S.widgets[naam];
    if (!w) { el.innerHTML = `<p class="meta">Onderdeel "${esc(naam)}" ontbreekt.</p>`; return; }
    el.classList.add("tw-w");
    el.innerHTML = `<div class="wkop"><h3>${esc(w.titel || naam)}</h3>${w.uitleg ? `<p>${fmt(w.uitleg)}</p>` : ""}</div><div class="wlijf"></div>`;
    const api = {
      klaar() { st.w[naam] = 1; bewaar(); },
      opruimen(fn) { opruim.push(fn); },
      esc, fmt, nl, R, plot: TW.plot, sleep: TW.sleep, shuffle
    };
    try { w.maak(el.querySelector(".wlijf"), api); }
    catch (e) { console.error("widget " + naam, e); el.querySelector(".wlijf").innerHTML = `<p class="meta">Dit onderdeel kon niet laden.</p>`; }
  }

  // ---------- pagina: overzicht ----------
  function home() {
    const sum = samenvat();
    const perH = S.hfst.map((h) => `
      <h2>${h.icoon ? h.icoon + " " : ""}${esc(h.nr ? h.nr + " · " : "")}${esc(h.titel)}</h2>
      ${h.intro ? `<p class="sub">${fmt(h.intro)}</p>` : ""}
      <div class="lijst">${(h.onderdelen || []).map((o) => `
        <a class="ond" href="#/o/${o.id}">
          <span class="t"><span class="hl ${stiftKlasse(o.id)}">${o.nr ? `<b>${esc(o.nr)}</b> ` : ""}${esc(o.titel)}</span>
          <small>${st.m[o.id] === "af" ? "af" : st.m[o.id] === "her" ? "herhalen" : o._items.filter(isFout).length ? o._items.filter(isFout).length + " fout om te herhalen" : beheersing(o) ? "bezig" : "nog niet begonnen"}</small></span>
          ${ring(beheersing(o))}</a>`).join("")}</div>`).join("");
    app.innerHTML = `
      <section class="held">
        <h1>${S.vak.icoon} ${esc(S.vak.titel)}</h1>
        ${S.vak.toets ? `<p class="sub">${esc(S.vak.toets)}</p>` : ""}
        <div class="stats">
          <div><b>${sum.pct}%</b><span>beheerst</span></div>
          <div><b>${sum.af}/${sum.n}</b><span>af</span></div>
          <div><b>${sum.her}</b><span>herhalen</span></div>
          <div><b>${sum.reeks ? "🔥 " + sum.reeks : "–"}</b><span>dagen op rij</span></div>
        </div>
      </section>
      <div class="card vandaag">
        <a class="btn primary big" href="#/slim">⚡ Slim oefenen · 10 vragen</a>
        <div class="two">
          <a class="btn" href="#/kaart/due">🃏 Flitskaarten${sum.due ? ` (${sum.due})` : ""}</a>
          <a class="btn ${sum.fout ? "bad" : ""}" href="#/fout">🔁 Mijn fouten${sum.fout ? ` (${sum.fout})` : ""}</a>
          <a class="btn" href="#/toets">📝 Oefentoets</a>
          <a class="btn" href="#/begrippen">🔎 Begrippen</a>
        </div>
      </div>
      ${perH}
      <p class="legenda"><span class="hl geel">geel</span> = af &nbsp; <span class="hl turq">turquoise</span> = herhalen</p>
      <p style="text-align:center"><button class="btn link" id="reset">Voortgang van dit vak wissen</button></p>`;
    $("reset").onclick = () => { if (confirm("Alle voortgang van " + S.vak.titel + " op dit apparaat wissen?")) { st = leeg(); bewaar(); home(); } };
  }

  // ---------- pagina: onderdeel ----------
  function onderdeel(o) {
    const n = (t) => o._items.filter((x) => x.t === t).length;
    const g = (t) => o._items.filter((x) => x.t === t && isGoed(x)).length;
    const tegel = (href, ico, naam, sub) => `<a class="tegel" href="${href}"><i>${ico}</i><b>${naam}</b><small>${sub}</small></a>`;
    const kg = o._kaarten.filter((k) => kaartRec(k).b >= 2).length;
    const i = OND.indexOf(o), vorige = OND[i - 1], volgende = OND[i + 1];
    app.innerHTML = `
      <a class="crumb" href="#/">← ${esc(S.vak.titel)}</a>
      <div class="meta">${esc(o.h.nr ? o.h.nr + " · " : "")}${esc(o.h.titel)}</div>
      <h1><span class="hl ${stiftKlasse(o.id)}">${o.nr ? esc(o.nr) + " · " : ""}${esc(o.titel)}</span></h1>
      <div class="stiften" role="group" aria-label="Markeren">
        <button data-m="af" class="stift geel ${st.m[o.id] === "af" ? "aan" : ""}">🖍 Af</button>
        <button data-m="her" class="stift turq ${st.m[o.id] === "her" ? "aan" : ""}">🖍 Herhalen</button>
        <span class="meta">${Math.round(beheersing(o) * 100)}% beheerst</span>
      </div>
      <div class="tegels">
        ${(o.kern || []).length ? tegel(`#/leer/${o.id}`, "📖", "Leren", st.l[o.id] ? "gelezen ✓" : "samenvatting") : ""}
        ${o._kaarten.length ? tegel(`#/kaart/${o.id}`, "🃏", "Flitskaarten", `${kg}/${o._kaarten.length} gekend`) : ""}
        ${n("v") ? tegel(`#/quiz/${o.id}/v`, "✅", "Quiz", `${g("v")}/${n("v")} goed`) : ""}
        ${n("r") ? tegel(`#/quiz/${o.id}/r`, S.vak.rekenIcoon || "🧮", esc(S.vak.rekenNaam || "Rekenen"), `${g("r")}/${n("r")} goed`) : ""}
        ${n("o") ? tegel(`#/quiz/${o.id}/o`, "🧩", "Oefenen", `${g("o")}/${n("o")} goed`) : ""}
        ${n("p") ? tegel(`#/quiz/${o.id}/p`, "✍️", "Open vragen", `${g("p")}/${n("p")} goed`) : ""}
        ${(o.widgets || []).map((w) => tegel(`#/doe/${o.id}/${w}`, (S.widgets[w] || {}).icoon || "🔬", esc((S.widgets[w] || {}).titel || w), st.w[w] ? "gedaan ✓" : "interactief")).join("")}
      </div>
      ${o._items.length > 1 ? `<a class="btn primary big" href="#/quiz/${o.id}">Alles van dit onderdeel door elkaar (${o._items.length})</a>` : ""}
      <div class="two nav">
        ${vorige ? `<a class="btn" href="#/o/${vorige.id}">← ${esc(vorige.nr || "Vorige")}</a>` : "<span></span>"}
        ${volgende ? `<a class="btn" href="#/o/${volgende.id}">${esc(volgende.nr || "Volgende")} →</a>` : "<span></span>"}
      </div>`;
    app.querySelectorAll(".stift").forEach((b) => (b.onclick = () => {
      st.m[o.id] = st.m[o.id] === b.dataset.m ? "" : b.dataset.m; bewaar(); onderdeel(o);
    }));
  }

  // ---------- pagina: leren ----------
  function leer(o) {
    let html = "", open = false;
    const sluit = () => { if (open) { html += "</ul></div>"; open = false; } };
    (o.kern || []).forEach((k, i) => {
      if (typeof k === "string") {
        if (!open) { html += '<div class="card"><ul class="kern">'; open = true; }
        html += `<li>${fmt(k)}</li>`; return;
      }
      sluit();
      if (k.kop) html += `<h2>${fmt(k.kop)}</h2>`;
      else if (k.fig) html += figkaart(k.fig) + (k.bij ? `<p class="bij">${fmt(k.bij)}</p>` : "");
      else if (k.widget) html += `<div class="card" data-widget="${esc(k.widget)}"></div>`;
      else if (k.tip) html += `<div class="note tip"><b>Tip</b> ${fmt(k.tip)}</div>`;
      else if (k.let) html += `<div class="note let"><b>Let op</b> ${fmt(k.let)}</div>`;
      else if (k.ezel) html += `<div class="note ezel"><b>Ezelsbruggetje</b> ${fmt(k.ezel)}</div>`;
      else if (k.formule) html += `<div class="formule">${fmt(k.formule)}</div>`;
      else if (k.voorbeeld) html += `<div class="card vb"><p><b>Voorbeeld · ${fmt(k.voorbeeld.titel)}</b></p><ol class="stappen">${k.voorbeeld.stappen.map((r) => `<li>${fmt(r)}</li>`).join("")}</ol></div>`;
      else if (k.tabel) html += `<div class="card figkaart"><table class="tabel">${k.tabel.kop ? `<tr>${k.tabel.kop.map((c) => `<th>${fmt(c)}</th>`).join("")}</tr>` : ""}${k.tabel.rijen.map((r) => `<tr>${r.map((c) => `<td>${fmt(c)}</td>`).join("")}</tr>`).join("")}</table></div>`;
    });
    sluit();
    app.innerHTML = `
      <a class="crumb" href="#/o/${o.id}">← ${esc(o.nr || o.titel)}</a>
      <h1>${o.nr ? esc(o.nr) + " · " : ""}${esc(o.titel)}</h1>
      ${html}
      ${o._kaarten.length ? `<h2>Begrippen</h2><div class="card"><dl class="begrippen">${o._kaarten.map((k) => `<dt>${fmt(k.b[0])}</dt><dd>${fmt(k.b[1])}</dd>`).join("")}</dl></div>` : ""}
      <div class="two">
        ${o._kaarten.length ? `<a class="btn" href="#/kaart/${o.id}">🃏 Flitskaarten</a>` : "<span></span>"}
        ${o._items.length ? `<a class="btn primary" href="#/quiz/${o.id}">✅ Nu oefenen</a>` : `<a class="btn primary" href="#/o/${o.id}">Verder</a>`}
      </div>`;
    app.querySelectorAll("[data-widget]").forEach((el) => widgetIn(el, el.dataset.widget));
    if (!st.l[o.id]) { st.l[o.id] = 1; bewaar(); }
  }

  // ---------- pagina: interactief onderdeel ----------
  function doe(o, naam) {
    app.innerHTML = `<a class="crumb" href="#/o/${o.id}">← ${esc(o.nr || o.titel)}</a><div class="card" id="w"></div>
      <a class="btn big" href="#/o/${o.id}">Klaar</a>`;
    widgetIn($("w"), naam);
  }

  // ---------- flitskaarten (gespreide herhaling, Leitner) ----------
  const INTERVAL = [0, 1, 2, 4, 7, 14];
  function kaarten(lijst, titel, terug) {
    if (!lijst.length) {
      app.innerHTML = `<a class="crumb" href="${terug}">← Terug</a><h1>${esc(titel)}</h1><div class="card">Er staan nu geen kaarten klaar om te herhalen. Kom morgen terug of oefen de kaarten per onderdeel. 🎉</div>`;
      return;
    }
    let rij = shuffle(lijst).sort((a, b) => kaartRec(a).b - kaartRec(b).b);
    const totaal = rij.length;
    let om = false, klaar = 0, andersom = false;
    function teken() {
      if (!rij.length) {
        app.innerHTML = `<a class="crumb" href="${terug}">← Terug</a><h1>Stapel klaar 🎉</h1>
          <p class="sub">${esc(titel)} · ${totaal} kaarten. Kaarten die je wist komen over een paar dagen vanzelf terug.</p>
          <div class="two"><button class="btn" id="weer">Nog een keer</button><a class="btn primary" href="${terug}">Verder</a></div>`;
        $("weer").onclick = () => kaarten(lijst, titel, terug);
        return;
      }
      const k = rij[0], voor = andersom ? k.b[1] : k.b[0], achter = andersom ? k.b[0] : k.b[1];
      app.innerHTML = `
        <a class="crumb" href="${terug}">← Stoppen</a>
        <div class="pl"><span>${esc(titel)}</span><span>${klaar}/${totaal}</span></div>${bar(klaar, totaal)}
        <div class="card flash ${om ? "om" : ""}" id="flash" tabindex="0" role="button" aria-label="Kaart omdraaien">
          <div class="doos">${"●".repeat(kaartRec(k).b)}${"○".repeat(5 - kaartRec(k).b)}</div>
          <div class="term ${andersom ? "klein" : ""}">${fmt(voor)}</div>
          ${om ? `<div class="def ${andersom ? "groot" : ""}">${fmt(achter)}</div>` : `<div class="hint">Bedenk het antwoord en tik om te draaien</div>`}
        </div>
        ${om ? `<div class="two"><button class="btn bad" id="nee">Nog niet</button><button class="btn good" id="ja">Wist ik</button></div>`
          : `<button class="btn primary big" id="draai">Draai om</button>`}
        <p style="text-align:center"><button class="btn link" id="wissel">${andersom ? "Toon eerst het begrip" : "Toon eerst de omschrijving"}</button></p>`;
      const draai = () => { if (!om) { om = true; teken(); } };
      $("flash").onclick = draai;
      $("flash").onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); draai(); } };
      $("wissel").onclick = () => { andersom = !andersom; om = false; teken(); };
      if (!om) $("draai").onclick = draai;
      else {
        $("ja").onclick = () => {
          const b = Math.min(5, kaartRec(k).b + 1);
          st.k[k.id] = { b, d: dag() + INTERVAL[b] }; telDag(true); bewaar();
          rij.shift(); klaar++; om = false; teken();
        };
        $("nee").onclick = () => {
          st.k[k.id] = { b: 1, d: dag() }; telDag(false); bewaar();
          rij.push(rij.shift()); om = false; teken();
        };
      }
    }
    teken();
  }

  // ---------- vraagtypen ----------
  const RENDER = {};

  // meerkeuze: eerste antwoord is het goede
  RENDER.v = function (el, x, klaar) {
    const d = x.d, goed = d.a[0], opties = shuffle(d.a);
    el.innerHTML = `${d.fig ? figkaart(d.fig, true) : ""}<div class="vraag">${fmt(d.q)}</div>
      <div>${opties.map((o, n) => `<button class="opt" data-n="${n}">${fmt(o)}</button>`).join("")}</div>`;
    const knoppen = [...el.querySelectorAll(".opt")];
    knoppen.forEach((k, n) => (k.onclick = () => {
      const juist = opties[n] === goed;
      knoppen.forEach((kk, m) => { kk.disabled = true; if (opties[m] === goed) kk.classList.add("goed"); });
      if (!juist) k.classList.add("fout");
      klaar(juist, fmt(d.u || ""));
    }));
  };

  // rekenen / kort antwoord, met hint en stapsgewijze uitwerking
  function getallen(s) {
    s = String(s).trim().replace(/[€%\s]/g, "").replace(/−/g, "-");
    const uit = [];
    if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) uit.push(parseFloat(s.replace(/\./g, "").replace(",", ".")));
    const b = Number(s.replace(",", "."));
    if (s !== "" && !isNaN(b)) uit.push(b);
    return uit;
  }
  function rekenGoed(d, inv) {
    if (typeof d.antwoord !== "number") {
      const n = (t) => String(t).toLowerCase().replace(/\s+/g, "").replace(/,/g, ".").replace(/−/g, "-").replace(/[·×]/g, "*");
      return [].concat(d.antwoord).some((a) => n(a) === n(inv));
    }
    const tol = d.tol != null ? d.tol : Math.max(Math.abs(d.antwoord) * 0.01, 0.005);
    return getallen(inv).some((g) => Math.abs(g - d.antwoord) <= tol + 1e-9);
  }
  RENDER.r = function (el, x, klaar) {
    const d = x.d.gen ? x.d.gen(R) : x.d;
    const tekst = typeof d.antwoord !== "number", stappen = d.stappen || [];
    let pogingen = 0, gezien = 0, af = false;
    el.innerHTML = `${d.fig ? figkaart(d.fig, true) : ""}<div class="vraag">${fmt(d.q)}</div>
      <div class="invoer"><input id="inv" inputmode="${tekst ? "text" : "decimal"}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Jouw antwoord" aria-label="Jouw antwoord">${d.eenheid ? `<span class="eenh">${fmt(d.eenheid)}</span>` : ""}<button class="btn primary" id="chk">Controleer</button></div>
      <div id="fb" class="fb"></div>
      <div class="row hulp">${d.hint ? `<button class="btn klein" id="hint">💡 Hint</button>` : ""}${stappen.length ? `<button class="btn klein" id="stap">👣 Stap voor stap</button>` : ""}<button class="btn klein" id="geef">Toon antwoord</button></div>
      <ol class="stappen" id="st"></ol>`;
    const toon = d.toon || (tekst ? [].concat(d.antwoord)[0] : nl(d.antwoord)) + (d.eenheid && !d.toon ? " " + d.eenheid : "");
    const einde = (juist) => {
      if (af) return; af = true;
      el.querySelectorAll("input,button").forEach((b) => (b.disabled = true));
      el.querySelector(".hulp").remove(); $("st").remove(); $("fb").innerHTML = "";
      klaar(juist, `<div class="antw">Antwoord: <b>${fmt(toon)}</b></div>${stappen.length ? `<ol class="stappen">${stappen.map((s) => `<li>${fmt(s)}</li>`).join("")}</ol>` : ""}${d.u ? `<p>${fmt(d.u)}</p>` : ""}`);
    };
    const check = () => {
      const inv = $("inv").value;
      if (!inv.trim()) return;
      if (rekenGoed(d, inv)) return einde(!stappen.length || gezien < stappen.length);
      pogingen++;
      if (pogingen >= 2) return einde(false);
      $("fb").innerHTML = `<span class="nok">Nog niet goed.</span> Reken het na of gebruik een hint; je hebt nog één poging.`;
    };
    $("chk").onclick = check;
    $("inv").onkeydown = (e) => { if (e.key === "Enter") check(); };
    if ($("hint")) $("hint").onclick = () => { $("fb").innerHTML = `💡 ${fmt(d.hint)}`; };
    if ($("stap")) $("stap").onclick = () => {
      if (gezien < stappen.length) { $("st").insertAdjacentHTML("beforeend", `<li>${fmt(stappen[gezien++])}</li>`); }
      if (gezien >= stappen.length) $("stap").disabled = true;
    };
    $("geef").onclick = () => einde(false);
  };

  // open vraag met modelantwoord en zelfbeoordeling
  RENDER.p = function (el, x, klaar) {
    const d = x.d;
    el.innerHTML = `${d.fig ? figkaart(d.fig, true) : ""}<div class="vraag">${fmt(d.q)}</div>
      <textarea id="ta" rows="4" placeholder="Schrijf eerst zelf je antwoord (wordt niet bewaard)…"></textarea>
      <button class="btn primary big" id="toon">Vergelijk met het modelantwoord</button><div id="mod"></div>`;
    $("toon").onclick = () => {
      $("toon").remove();
      $("mod").innerHTML = `<div class="model"><b>Modelantwoord</b><p>${fmt(d.a)}</p>
        ${(d.punten || []).length ? `<p class="meta">Vink aan wat in jouw antwoord stond:</p>${d.punten.map((p) => `<label class="vink"><input type="checkbox"> <span>${fmt(p)}</span></label>`).join("")}` : ""}</div>
        <p class="meta">Hoe ging het?</p>
        <div class="drie"><button class="btn bad" data-s="0">Niet</button><button class="btn" data-s="1">Deels</button><button class="btn good" data-s="2">Goed</button></div>`;
      $("mod").querySelectorAll("[data-s]").forEach((b) => (b.onclick = () => {
        $("mod").querySelectorAll("[data-s]").forEach((k) => (k.disabled = true));
        b.classList.add("aan");
        klaar(b.dataset.s === "2", "", b.dataset.s === "1" ? "Deels goed: deze komt terug bij je fouten." : null);
      }));
    };
  };

  // oefenvormen: sorteer, volgorde, koppel, invul
  RENDER.o = function (el, x, klaar) {
    const d = x.d;
    const f = { sorteer, volgorde, koppel, invul }[d.type];
    if (!f) { el.innerHTML = `<p class="meta">Onbekend oefentype.</p>`; return; }
    el.innerHTML = `${d.fig ? figkaart(d.fig, true) : ""}<div class="vraag">${fmt(d.q)}</div><div id="oef"></div>`;
    f($("oef"), d, (juist) => klaar(juist, fmt(d.u || "")));
  };
  function sorteer(el, d, klaar) {
    const items = shuffle(d.items.map((it, i) => ({ t: it[0], g: it[1], i })));
    const plek = {}; let sel = null, na = false;
    function teken() {
      const chip = (it) => `<button class="chip ${sel === it.i ? "sel" : ""} ${na ? (plek[it.i] === it.g ? "goed" : "fout") : ""}" data-i="${it.i}" ${na ? "disabled" : ""}>${fmt(it.t)}${na && plek[it.i] !== it.g ? ` <small>→ ${fmt(d.groepen[it.g])}</small>` : ""}</button>`;
      const los = items.filter((it) => plek[it.i] == null);
      el.innerHTML = `<p class="meta">Tik op een kaartje en daarna op het vak waar het hoort.</p>
        <div class="pool">${los.map(chip).join("") || '<span class="meta">Alles is ingedeeld.</span>'}</div>
        <div class="bakken">${d.groepen.map((g, gi) => `<div class="bak ${sel != null ? "kan" : ""}" data-g="${gi}"><h4>${fmt(g)}</h4>${items.filter((it) => plek[it.i] === gi).map(chip).join("")}</div>`).join("")}</div>
        ${na ? "" : `<button class="btn primary big" id="chk" ${los.length ? "disabled" : ""}>Controleer</button>`}`;
      if (na) return;
      el.querySelectorAll(".chip").forEach((c) => (c.onclick = (e) => { e.stopPropagation(); const i = +c.dataset.i; sel = sel === i ? null : i; teken(); }));
      el.querySelectorAll(".bak").forEach((b) => (b.onclick = () => { if (sel != null) { plek[sel] = +b.dataset.g; sel = null; teken(); } }));
      el.querySelector(".pool").onclick = () => { if (sel != null && plek[sel] != null) { delete plek[sel]; sel = null; teken(); } };
      $("chk").onclick = () => { na = true; teken(); klaar(items.every((it) => plek[it.i] === it.g)); };
    }
    teken();
  }
  function volgorde(el, d, klaar) {
    const items = shuffle(d.items.map((t, i) => ({ t, i })));
    let rij = [], na = false;
    function teken() {
      const los = items.filter((it) => !rij.includes(it.i));
      el.innerHTML = `<p class="meta">Tik de stappen aan in de juiste volgorde. Tik in je rij om een stap terug te leggen.</p>
        <ol class="rij">${rij.map((i, p) => `<li><button class="chip breed ${na ? (i === p ? "goed" : "fout") : ""}" data-r="${i}" ${na ? "disabled" : ""}>${fmt(d.items[i])}</button></li>`).join("")}</ol>
        <div class="pool kolom">${los.map((it) => `<button class="chip breed" data-i="${it.i}">${fmt(it.t)}</button>`).join("")}</div>
        ${na ? (rij.every((i, p) => i === p) ? "" : `<div class="model"><b>Juiste volgorde</b><ol class="stappen">${d.items.map((t) => `<li>${fmt(t)}</li>`).join("")}</ol></div>`) : `<button class="btn primary big" id="chk" ${los.length ? "disabled" : ""}>Controleer</button>`}`;
      if (na) return;
      el.querySelectorAll("[data-i]").forEach((c) => (c.onclick = () => { rij.push(+c.dataset.i); teken(); }));
      el.querySelectorAll("[data-r]").forEach((c) => (c.onclick = () => { rij = rij.filter((i) => i !== +c.dataset.r); teken(); }));
      $("chk").onclick = () => { na = true; teken(); klaar(rij.every((i, p) => i === p)); };
    }
    teken();
  }
  function koppel(el, d, klaar) {
    const links = shuffle(d.paren.map((p, i) => i)), rechts = shuffle(d.paren.map((p, i) => i));
    const paar = {}; let sel = null, na = false; // paar[linksIndex] = rechtsIndex
    function teken() {
      const nr = (li) => links.indexOf(li) + 1;
      const vanRechts = (ri) => Object.keys(paar).find((li) => paar[li] === ri);
      el.innerHTML = `<p class="meta">Tik links iets aan en daarna rechts wat erbij hoort.</p>
        <div class="koppel">
          <div>${links.map((li) => `<button class="chip breed ${sel === li ? "sel" : ""} ${paar[li] != null ? "k" + (nr(li) % 6) : ""} ${na ? (paar[li] === li ? "goed" : "fout") : ""}" data-l="${li}" ${na ? "disabled" : ""}><span class="nr">${nr(li)}</span> ${fmt(d.paren[li][0])}</button>`).join("")}</div>
          <div>${rechts.map((ri) => { const li = vanRechts(ri); return `<button class="chip breed ${li != null ? "k" + (nr(+li) % 6) : ""}" data-r="${ri}" ${na ? "disabled" : ""}>${li != null ? `<span class="nr">${nr(+li)}</span> ` : ""}${fmt(d.paren[ri][1])}</button>`; }).join("")}</div>
        </div>
        ${na ? (links.every((li) => paar[li] === li) ? "" : `<div class="model"><b>Zo hoort het</b>${d.paren.map((p) => `<p>${fmt(p[0])} → ${fmt(p[1])}</p>`).join("")}</div>`) : `<button class="btn primary big" id="chk" ${Object.keys(paar).length < links.length ? "disabled" : ""}>Controleer</button>`}`;
      if (na) return;
      el.querySelectorAll("[data-l]").forEach((c) => (c.onclick = () => { const li = +c.dataset.l; if (paar[li] != null) { delete paar[li]; sel = li; } else sel = sel === li ? null : li; teken(); }));
      el.querySelectorAll("[data-r]").forEach((c) => (c.onclick = () => {
        const ri = +c.dataset.r, oud = vanRechts(ri);
        if (sel == null) { if (oud != null) { delete paar[oud]; teken(); } return; }
        if (oud != null) delete paar[oud];
        paar[sel] = ri; sel = null; teken();
      }));
      $("chk").onclick = () => { na = true; teken(); klaar(links.every((li) => paar[li] === li)); };
    }
    teken();
  }
  function invul(el, d, klaar) {
    const delen = d.tekst.split(/\{(.+?)\}/g); // oneven index = gat
    const gaten = delen.filter((_, i) => i % 2 === 1);
    const bank = shuffle(gaten.concat(d.extra || []).map((w, i) => ({ w, i })));
    const inv = gaten.map(() => null); let na = false; // inv[g] = bank-index
    function teken() {
      let g = -1;
      const tekst = delen.map((s, i) => {
        if (i % 2 === 0) return fmt(s);
        g++; const b = inv[g] != null ? bank.find((x) => x.i === inv[g]) : null;
        const ok = b && b.w === gaten[g];
        return `<button class="gat ${b ? "vol" : ""} ${na ? (ok ? "goed" : "fout") : ""}" data-g="${g}" ${na ? "disabled" : ""}>${b ? fmt(b.w) : "&nbsp;"}</button>${na && !ok ? `<small class="juist">${fmt(gaten[g])}</small>` : ""}`;
      }).join("");
      el.innerHTML = `<p class="meta">Tik op een woord om het in het eerste lege vak te zetten. Tik op een gevuld vak om het leeg te maken.</p>
        <p class="invultekst">${tekst}</p>
        <div class="pool">${bank.filter((x) => !inv.includes(x.i)).map((x) => `<button class="chip" data-b="${x.i}" ${na ? "disabled" : ""}>${fmt(x.w)}</button>`).join("")}</div>
        ${na ? "" : `<button class="btn primary big" id="chk" ${inv.includes(null) ? "disabled" : ""}>Controleer</button>`}`;
      if (na) return;
      el.querySelectorAll("[data-b]").forEach((c) => (c.onclick = () => { const leegGat = inv.indexOf(null); if (leegGat >= 0) { inv[leegGat] = +c.dataset.b; teken(); } }));
      el.querySelectorAll("[data-g]").forEach((c) => (c.onclick = () => { inv[+c.dataset.g] = null; teken(); }));
      $("chk").onclick = () => { na = true; teken(); klaar(inv.every((bi, gi) => bank.find((x) => x.i === bi).w === gaten[gi])); };
    }
    teken();
  }

  // ---------- sessie: een reeks vragen van elk type ----------
  function sessie(items, titel, terug, opt) {
    opt = opt || {};
    if (!items.length) {
      app.innerHTML = `<a class="crumb" href="${terug}">← Terug</a><h1>${esc(titel)}</h1><div class="card">Er zijn hier nu geen vragen. Goed bezig! 🎉</div>`;
      return;
    }
    let i = 0;
    const fouten = [], t0 = Date.now();
    function toon() {
      const x = items[i];
      app.innerHTML = `
        <a class="crumb" href="${terug}">← Stoppen</a>
        <div class="pl"><span>${esc(titel)}</span><span>${i + 1}/${items.length}</span></div>${bar(i, items.length)}
        <div class="bron">${esc(x.o.nr ? x.o.nr + " · " : "")}${esc(x.o.titel)} <span class="soort">${x.t === "r" && S.vak.rekenNaam ? esc(S.vak.rekenNaam.toLowerCase()) : SOORT[x.t]}</span></div>
        <div id="item"></div><div id="na"></div>`;
      RENDER[x.t]($("item"), x, (juist, uitleg, kop) => {
        noteer(x, juist);
        if (!juist) fouten.push(x);
        const laatste = i === items.length - 1;
        $("na").innerHTML = `<div class="uitleg ${juist ? "ok" : "nok"}"><b>${kop || (juist ? "Goed! ✅" : "Niet goed ❌")}</b>${uitleg || ""}</div>
          <button class="btn primary big" id="verder">${laatste ? "Bekijk resultaat" : "Volgende"}</button>`;
        $("verder").onclick = () => { i++; window.scrollTo(0, 0); if (i < items.length) toon(); else klaar(); };
        $("verder").scrollIntoView({ block: "nearest", behavior: "smooth" });
      });
    }
    function klaar() {
      const goed = items.length - fouten.length, pct = Math.round((goed / items.length) * 100);
      const min = Math.max(1, Math.round((Date.now() - t0) / 60000));
      const tekst = pct === 100 ? "Alles goed, top! 🎉" : pct >= 75 ? "Mooi resultaat! 💪" : pct >= 55 ? "Je bent er bijna. Herhaal je fouten." : "Lees de samenvatting nog eens en probeer het opnieuw.";
      const perO = {};
      items.forEach((x) => { const p = perO[x.o.id] || (perO[x.o.id] = { o: x.o, n: 0, g: 0 }); p.n++; if (!fouten.includes(x)) p.g++; });
      const rijen = Object.values(perO);
      const stiftTip = rijen.filter((p) => p.n >= 3 && p.g / p.n >= 0.8 && beheersing(p.o) >= 0.7 && st.m[p.o.id] !== "af");
      app.innerHTML = `
        <a class="crumb" href="${terug}">← Terug</a>
        <h1>${esc(titel)}</h1>
        <div class="card">
          <p class="score">${opt.toets ? nl(1 + 9 * (goed / items.length), 1) : `${goed}/${items.length}`}</p>
          <p class="score-sub">${opt.toets ? `cijfer (indicatie) · ${goed}/${items.length} goed · ` : `${pct}% goed · `}${min} min · ${tekst}</p>${bar(goed, items.length)}
        </div>
        ${rijen.length > 1 ? `<div class="card"><table class="tabel">${rijen.map((p) => `<tr><td>${esc(p.o.nr ? p.o.nr + " · " : "")}${esc(p.o.titel)}</td><td class="r">${p.g}/${p.n}</td></tr>`).join("")}</table></div>` : ""}
        ${stiftTip.length ? `<div class="card"><p><b>Klaar om te markeren?</b></p>${stiftTip.map((p) => `<button class="stift geel los" data-af="${p.o.id}">🖍 ${esc(p.o.nr || p.o.titel)} is af</button>`).join(" ")}</div>` : ""}
        <div class="two">
          ${fouten.length ? `<button class="btn bad" id="herhaal">Fouten opnieuw (${fouten.length})</button>` : `<a class="btn" href="#/">Overzicht</a>`}
          <a class="btn primary" href="${terug}">Verder</a>
        </div>
        ${fouten.length ? `<h2>Dit ging nog niet goed</h2><div class="fouten-lijst">${fouten.map((x) => `<div class="card"><div class="meta">${esc(x.o.nr ? x.o.nr + " · " : "")}${esc(x.o.titel)}</div><p><b>${fmt(x.d.q || (x.d.gen ? "Rekenopgave" : ""))}</b></p>${x.t === "v" ? `<p class="ans">✔ ${fmt(x.d.a[0])}</p>` : ""}${x.t === "p" ? `<p>${fmt(x.d.a)}</p>` : x.d.u ? `<p>${fmt(x.d.u)}</p>` : ""}</div>`).join("")}</div>` : ""}`;
      app.querySelectorAll("[data-af]").forEach((b) => (b.onclick = () => { st.m[b.dataset.af] = "af"; bewaar(); b.classList.add("aan"); b.disabled = true; }));
      if ($("herhaal")) $("herhaal").onclick = () => { sessie(shuffle(fouten), "Fouten herhalen", terug); window.scrollTo(0, 0); };
    }
    toon();
  }

  // ---------- slim oefenen, oefentoets, begrippen ----------
  function slimLijst(n) {
    const score = (x) => (isFout(x) ? 0 : !st.q[x.id] ? 1 : 2) + Math.random() * 0.9;
    return alleItems(["v", "r", "o"]).map((x) => [score(x), x]).sort((a, b) => a[0] - b[0]).slice(0, n).map((p) => p[1]);
  }
  function toetsKeuze() {
    app.innerHTML = `
      <a class="crumb" href="#/">← ${esc(S.vak.titel)}</a>
      <h1>📝 Oefentoets</h1>
      <p class="sub">Kies wat je wilt toetsen. Je krijgt meerkeuze, reken- en oefenvragen door elkaar en aan het eind een cijfer als indicatie.</p>
      <div class="card">
        <p><b>Stof</b></p>
        ${S.hfst.map((h, i) => `<label class="vink"><input type="checkbox" data-h="${i}" checked> <span>${esc(h.nr ? h.nr + " · " : "")}${esc(h.titel)}</span></label>`).join("")}
        <p><b>Aantal vragen</b></p>
        <div class="drie" id="aantal">${[10, 20, 30].map((n) => `<button class="btn ${n === 20 ? "aan" : ""}" data-n="${n}">${n}</button>`).join("")}</div>
      </div>
      <button class="btn primary big" id="start">Start de toets</button>`;
    let n = 20;
    $("aantal").querySelectorAll("button").forEach((b) => (b.onclick = () => { n = +b.dataset.n; $("aantal").querySelectorAll("button").forEach((k) => k.classList.toggle("aan", k === b)); }));
    $("start").onclick = () => {
      const kies = [...app.querySelectorAll("[data-h]")].filter((c) => c.checked).map((c) => S.hfst[+c.dataset.h]);
      const pool = shuffle(alleItems(["v", "r", "o"]).filter((x) => kies.includes(x.o.h)));
      sessie(pool.slice(0, n), "Oefentoets", "#/", { toets: true });
    };
  }
  function begrippenLijst() {
    app.innerHTML = `<a class="crumb" href="#/">← ${esc(S.vak.titel)}</a><h1>🔎 Begrippen</h1>
      <input id="zoek" class="zoek" type="search" placeholder="Zoek een begrip…" aria-label="Zoek een begrip"><div id="res"></div>`;
    const alle = alleKaarten().slice().sort((a, b) => a.b[0].localeCompare(b.b[0], "nl"));
    const teken = () => {
      const z = $("zoek").value.toLowerCase();
      const lijst = alle.filter((k) => !z || k.b[0].toLowerCase().includes(z) || k.b[1].toLowerCase().includes(z));
      $("res").innerHTML = `<p class="meta">${lijst.length} begrippen</p><div class="card"><dl class="begrippen">${lijst.map((k) => `<dt>${fmt(k.b[0])} <a class="waar" href="#/o/${k.o.id}">${esc(k.o.nr || k.o.titel)}</a></dt><dd>${fmt(k.b[1])}</dd>`).join("")}</dl></div>`;
    };
    $("zoek").oninput = teken; teken();
  }

  // ---------- router ----------
  function route() {
    opruim.forEach((f) => { try { f(); } catch (e) { /* negeren */ } }); opruim = [];
    const p = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
    window.scrollTo(0, 0);
    const o = ond(p[1]);
    if (p[0] === "o" && o) return onderdeel(o);
    if (p[0] === "leer" && o) return leer(o);
    if (p[0] === "doe" && o && p[2]) return doe(o, p[2]);
    if (p[0] === "kaart") {
      if (o) return kaarten(o._kaarten, o.titel, `#/o/${o.id}`);
      return kaarten(alleKaarten().filter(kaartDue), "Flitskaarten herhalen", "#/");
    }
    if (p[0] === "quiz" && o) {
      const lijst = o._items.filter((x) => !p[2] || x.t === p[2]);
      return sessie(p[2] === "r" || p[2] === "p" ? lijst : shuffle(lijst), o.titel, `#/o/${o.id}`);
    }
    if (p[0] === "slim") return sessie(slimLijst(10), "Slim oefenen", "#/");
    if (p[0] === "fout") return sessie(shuffle(alleItems().filter(isFout)), "Mijn fouten", "#/");
    if (p[0] === "toets") return toetsKeuze();
    if (p[0] === "begrippen") return begrippenLijst();
    home();
  }

  TW.start = function () {
    app = $("app");
    bouw(); laad();
    document.documentElement.style.setProperty("--accent-l", S.vak.kleur);
    if (S.vak.kleurDonker) document.documentElement.style.setProperty("--accent-d", S.vak.kleurDonker);
    document.title = S.vak.titel + " · toetsweek";
    const top = $("top"), voet = $("voet");
    if (top) top.innerHTML = `<a class="hublink" href="${esc(S.vak.hub)}" aria-label="Terug naar de planner">‹ Planner</a><a class="brand" href="#/">${S.vak.icoon} ${esc(S.vak.titel)}</a><span id="vuur" class="vuur"></span>`;
    if (voet) voet.innerHTML = `Eigen oefenstof${S.vak.methode ? " bij " + esc(S.vak.methode) : ""}. Je voortgang wordt alleen op dit apparaat bewaard.`;
    bewaar();
    window.addEventListener("hashchange", route);
    route();
  };

  // ---------- grafiekhulp (SVG) ----------
  // P = TW.plot({ x:[0,10], y:[0,100], xl:"hoeveelheid", yl:"prijs", xt:2, yt:20 })
  TW.plot = function (o) {
    const w = o.w || 340, h = o.h || 250;
    const ml = o.ml != null ? o.ml : 44, mr = o.mr != null ? o.mr : 14, mt = o.mt != null ? o.mt : 14, mb = o.mb != null ? o.mb : 38;
    const x0 = o.x[0], x1 = o.x[1], y0 = o.y[0], y1 = o.y[1];
    const X = (v) => ml + ((v - x0) / (x1 - x0)) * (w - ml - mr);
    const Y = (v) => h - mb - ((v - y0) / (y1 - y0)) * (h - mt - mb);
    const f1 = (n) => n.toFixed(1);
    const P = {
      w, h, X, Y,
      ix: (px) => x0 + ((px - ml) / (w - ml - mr)) * (x1 - x0),
      iy: (py) => y0 + ((h - mb - py) / (h - mt - mb)) * (y1 - y0),
      assen() {
        let s = "";
        const xt = o.xt || (x1 - x0) / 5, yt = o.yt || (y1 - y0) / 5;
        for (let v = Math.ceil(x0 / xt) * xt; v <= x1 + 1e-9; v += xt) {
          s += `<line x1="${f1(X(v))}" y1="${Y(y0)}" x2="${f1(X(v))}" y2="${Y(y1)}" class="raster"/>`;
          if (!o.geenGetallen) s += `<text x="${f1(X(v))}" y="${Y(y0) + 14}" text-anchor="middle" class="k">${o.xf ? o.xf(v) : nl(R.rond(v, 6))}</text>`;
        }
        for (let v = Math.ceil(y0 / yt) * yt; v <= y1 + 1e-9; v += yt) {
          s += `<line x1="${X(x0)}" y1="${f1(Y(v))}" x2="${X(x1)}" y2="${f1(Y(v))}" class="raster"/>`;
          if (!o.geenGetallen) s += `<text x="${X(x0) - 6}" y="${f1(Y(v) + 4)}" text-anchor="end" class="k">${o.yf ? o.yf(v) : nl(R.rond(v, 6))}</text>`;
        }
        const yAs = y0 < 0 && y1 > 0 ? Y(0) : Y(y0), xAs = x0 < 0 && x1 > 0 ? X(0) : X(x0);
        s += `<line x1="${X(x0)}" y1="${f1(yAs)}" x2="${X(x1)}" y2="${f1(yAs)}" class="s"/><line x1="${f1(xAs)}" y1="${Y(y0)}" x2="${f1(xAs)}" y2="${Y(y1)}" class="s"/>`;
        if (o.xl) s += `<text x="${X(x1)}" y="${h - 6}" text-anchor="end" class="k b">${esc(o.xl)}</text>`;
        if (o.yl) s += `<text x="${4}" y="${10}" text-anchor="start" class="k b">${esc(o.yl)}</text>`;
        return s;
      },
      pad: (pts, cls) => `<path d="M${pts.map((p) => f1(X(p[0])) + " " + f1(Y(p[1]))).join("L")}" class="${cls || "curve"}" fill="none"/>`,
      vlak: (pts, cls) => `<path d="M${pts.map((p) => f1(X(p[0])) + " " + f1(Y(p[1]))).join("L")}Z" class="${cls || "vlak"}"/>`,
      fn(f, cls, n) {
        const pts = []; n = n || 80;
        for (let i = 0; i <= n; i++) { const x = x0 + ((x1 - x0) * i) / n, y = f(x); if (isFinite(y) && y >= y0 - 1e-9 && y <= y1 + 1e-9) pts.push([x, y]); }
        return pts.length > 1 ? P.pad(pts, cls) : "";
      },
      punt: (x, y, cls, r, extra) => `<circle cx="${f1(X(x))}" cy="${f1(Y(y))}" r="${r || 4.5}" class="${cls || "dot"}" ${extra || ""}/>`,
      lijn: (xa, ya, xb, yb, cls) => `<line x1="${f1(X(xa))}" y1="${f1(Y(ya))}" x2="${f1(X(xb))}" y2="${f1(Y(yb))}" class="${cls || "s"}"/>`,
      tekst: (x, y, s, anker, cls, dx, dy) => `<text x="${f1(X(x) + (dx || 0))}" y="${f1(Y(y) + (dy || 0))}" text-anchor="${anker || "middle"}" class="${cls || ""}">${esc(s)}</text>`,
      svg: (body, label, attrs) => `<svg class="fig" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label || "grafiek")}" ${attrs || ""}>${body}</svg>`
    };
    return P;
  };

  // Slepen binnen een SVG: cb(x, y, fase) in viewBox-coördinaten; fase = "start" | "move" | "eind".
  // Vervang het gesleepte element niet tijdens het slepen (pas attributen aan), anders stopt het slepen.
  TW.sleep = function (svg, doel, cb) {
    const pt = (e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
    doel.style.touchAction = "none"; doel.style.cursor = "grab";
    doel.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      try { doel.setPointerCapture(e.pointerId); } catch (err) { /* negeren */ }
      let q = pt(e); cb(q.x, q.y, "start");
      const mv = (ev) => { q = pt(ev); cb(q.x, q.y, "move"); };
      const up = () => {
        doel.removeEventListener("pointermove", mv); doel.removeEventListener("pointerup", up); doel.removeEventListener("pointercancel", up);
        cb(q.x, q.y, "eind");
      };
      doel.addEventListener("pointermove", mv); doel.addEventListener("pointerup", up); doel.addEventListener("pointercancel", up);
    });
  };
})();
