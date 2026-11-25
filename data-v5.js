// Vaardigheden 5 (Moderne Wiskunde 12e editie havo A): Breuken · Getallen · Herleiden · Grafieken · Toppen en snijpunten.
// Hier in drie onderdelen samengevoegd. Ids nooit wijzigen (de voortgang hangt eraan); nr en titel mag je aanpassen.
(function () {
  "use strict";
  const nl = TW.nl;
  const ggd = (a, b) => (b ? ggd(b, a % b) : Math.abs(a));
  const tm = (x) => (x < 0 ? "−" + nl(-x) : nl(x));             // getal met echt minteken
  const co = (k) => (k === 1 ? "" : k === -1 ? "−" : tm(k));       // coëfficiënt voor x
  const plus = (x) => (x < 0 ? "− " + nl(-x) : "+ " + nl(x));   // + 5 of − 5 achter een term

  TW.hoofdstuk({
    id: "v5", nr: "V5", titel: "Vaardigheden 5", icoon: "🛠️",
    intro: "Basisvaardigheden die je bij elk hoofdstuk nodig hebt: rekenen met breuken en getallen, herleiden en vergelijkingen oplossen, en toppen en snijpunten vinden.",
    onderdelen: [
      // ------------------------------------------------------------------ breuken en getallen
      {
        id: "v5-1", nr: "V5 · 1", titel: "Breuken en getallen",
        kern: [
          "Breuken [[optellen]] of aftrekken kan alleen als ze dezelfde noemer hebben. Maak ze eerst [[gelijknamig]].",
          { voorbeeld: { titel: "Optellen", stappen: ["2/3 + 3/4", "Gelijknamig maken met noemer 12: 8/12 + 9/12", "= 17/12 = 1 5/12"] } },
          "**Vermenigvuldigen**: teller maal teller en noemer maal noemer. **Delen** door een breuk is vermenigvuldigen met het [[omgekeerde]].",
          { voorbeeld: { titel: "Delen door een breuk", stappen: ["2/3 : 4/9", "= 2/3 × 9/4", "= 18/12 = 3/2 = 1,5"] } },
          "Een breuk van een getal: 3/5 van 240 = 240 / 5 × 3 = 144.",
          { tabel: { kop: ["breuk", "decimaal", "procent"], rijen: [["1/2", "0,5", "50%"], ["1/4", "0,25", "25%"], ["3/4", "0,75", "75%"], ["1/5", "0,2", "20%"], ["1/8", "0,125", "12,5%"], ["1/3", "0,333…", "33,3%"]] } },
          { kop: "Volgorde van bewerkingen" },
          { ezel: "Haakjes, dan machten en wortels, dan vermenigvuldigen en delen (van links naar rechts), dan optellen en aftrekken." },
          { voorbeeld: { titel: "Voorrangsregels", stappen: ["8 − 2 · 3^{2} + 12 / 4", "Macht eerst: 3^{2} = 9", "Dan × en /: 2 · 9 = 18 en 12 / 4 = 3", "Dan + en −: 8 − 18 + 3 = −7"] } },
          { kop: "Grote en kleine getallen" },
          "In [[wetenschappelijke notatie]] schrijf je een getal als een getal tussen 1 en 10 maal een macht van 10: 3 500 000 = 3,5 · 10^{6} en 0,0042 = 4,2 · 10^{−3}.",
          { let: "−3^{2} = −9, want de macht gaat voor de min. (−3)^{2} = 9. Typ op je rekenmachine dus haakjes als je een negatief getal kwadrateert." }
        ],
        begrippen: [
          ["teller", "Het getal boven de breukstreep."],
          ["noemer", "Het getal onder de breukstreep."],
          ["gelijknamig maken", "Breuken herschrijven zodat ze dezelfde noemer hebben."],
          ["vereenvoudigen", "Teller en noemer door hetzelfde getal delen: 18/12 = 3/2."],
          ["omgekeerde (breuk)", "Teller en noemer omgewisseld: het omgekeerde van 4/9 is 9/4."],
          ["voorrangsregels", "Volgorde: haakjes, machten en wortels, × en :, + en −."],
          ["wetenschappelijke notatie", "Getal tussen 1 en 10 maal een macht van 10, zoals 4,2 · 10^{−3}."],
          ["macht van 10", "10^{3} = 1000, 10^{−2} = 0,01."]
        ],
        vragen: [
          { q: "Wat is 2/3 + 3/4?", a: ["17/12", "5/7", "5/12", "6/12"], u: "Gelijknamig: 8/12 + 9/12 = 17/12. Tellers en noemers apart optellen (5/7) mag niet." },
          { q: "Wat is 2/3 × 3/5?", a: ["2/5", "6/8", "10/9", "5/8"], u: "Teller × teller en noemer × noemer: 6/15 = 2/5." },
          { q: "Wat is 2/3 : 4/9?", a: ["3/2", "8/27", "2/3", "6/9"], u: "Delen is vermenigvuldigen met het omgekeerde: 2/3 × 9/4 = 18/12 = 3/2." },
          { q: "Wat is 8 − 2 · 3^{2} + 12 / 4?", a: ["−7", "57", "−4", "21"], u: "Eerst de macht (9), dan 2 · 9 = 18 en 12 / 4 = 3, dan 8 − 18 + 3 = −7. Van links naar rechts zonder voorrang krijg je 57." },
          { q: "Hoe schrijf je 0,00056 in wetenschappelijke notatie?", a: ["5,6 · 10^{−4}", "5,6 · 10^{4}", "56 · 10^{−5}", "5,6 · 10^{−3}"], u: "De komma gaat 4 plaatsen naar rechts om 5,6 te krijgen, dus 10^{−4}. 56 · 10^{−5} is goed in waarde, maar 56 ligt niet tussen 1 en 10." },
          { q: "Wat is −4^{2}?", a: ["−16", "16", "−8", "8"], u: "De macht gaat voor de min: −(4^{2}) = −16. Alleen (−4)^{2} = 16." },
          { q: "Welke breuk hoort bij 12,5%?", a: ["1/8", "1/12", "1/5", "1/125"], u: "12,5% = 0,125 = 1/8." },
          { q: "Wat is (3 · 10^{4}) × (2 · 10^{3})?", a: ["6 · 10^{7}", "6 · 10^{12}", "5 · 10^{7}", "6 · 10^{1}"], u: "3 × 2 = 6 en 10^{4} × 10^{3} = 10^{7}: de exponenten tel je op." }
        ],
        reken: [
          { q: "Bereken 2/3 + 3/4. Schrijf het antwoord als één breuk, bijvoorbeeld 7/5.", antwoord: ["17/12"], hint: "Maak eerst gelijknamig met noemer 12.", stappen: ["2/3 = 8/12 en 3/4 = 9/12", "8/12 + 9/12 = 17/12"] },
          { q: "Bereken 3/5 van 240.", antwoord: 144, hint: "Deel door de noemer en vermenigvuldig met de teller.", stappen: ["240 / 5 = 48", "48 × 3 = 144"] },
          { q: "Bereken 2/3 : 4/9. Geef het antwoord als decimaal getal.", antwoord: 1.5, hint: "Vermenigvuldig met het omgekeerde.", stappen: ["2/3 × 9/4 = 18/12", "18/12 = 3/2 = 1,5"] },
          { q: "Bereken (3,5 · 10^{4}) × (2 · 10^{3}). Schrijf het antwoord als gewoon getal.", antwoord: 70000000, tol: 0.5, hint: "Vermenigvuldig de getallen en tel de exponenten op.", stappen: ["3,5 × 2 = 7", "10^{4} × 10^{3} = 10^{7}", "7 · 10^{7} = 70 000 000"] },
          { q: "Bereken 8 − 2 · 3^{2} + 12 / 4.", antwoord: -7, tol: 0.001, hint: "Eerst de macht, dan × en /, dan + en −.", stappen: ["3^{2} = 9", "2 · 9 = 18 en 12 / 4 = 3", "8 − 18 + 3 = −7"] },
          {
            gen: (R) => {
              const n = R.kies([3, 4, 5, 6, 8, 10]); let t = R.int(1, n - 1); while (ggd(t, n) !== 1) t = R.int(1, n - 1);
              const N = n * R.int(6, 60), c = R.kies(["van de leerlingen fietst", "van het budget gaat naar huur", "van de bezoekers komt met het openbaar vervoer"]);
              return { q: `${t}/${n} ${c}. Het totaal is ${N}. Om hoeveel gaat het?`, antwoord: (N / n) * t, hint: "Deel door de noemer, vermenigvuldig met de teller.", stappen: [`${N} / ${n} = ${N / n}`, `${N / n} × ${t} = ${(N / n) * t}`] };
            }
          },
          {
            gen: (R) => {
              const a = R.int(5, 30), b = R.int(2, 5), c = R.int(2, 4), e = R.int(2, 6), d = e * R.int(2, 9);
              const uit = a - b * c * c + d / e;
              return { q: `Bereken ${a} − ${b} · ${c}^{2} + ${d} / ${e}.`, antwoord: uit, tol: 0.001, hint: "Machten gaan voor, dan × en /, dan + en −.", stappen: [`${c}^{2} = ${c * c}`, `${b} · ${c * c} = ${b * c * c} en ${d} / ${e} = ${d / e}`, `${a} − ${b * c * c} + ${d / e} = ${tm(uit)}`] };
            }
          }
        ],
        oefen: [
          { type: "koppel", q: "Koppel de breuk aan het percentage.", paren: [["1/4", "25%"], ["3/4", "75%"], ["1/5", "20%"], ["1/8", "12,5%"], ["2/5", "40%"]], u: "Deel de teller door de noemer en vermenigvuldig met 100%." },
          { type: "volgorde", q: "Zet de bewerkingen in de volgorde waarin je ze uitvoert.", items: ["haakjes", "machten en wortels", "vermenigvuldigen en delen", "optellen en aftrekken"], u: "Dit zijn de voorrangsregels; je rekenmachine volgt ze ook." },
          { type: "invul", q: "Vul in.", tekst: "Delen door 4/9 is hetzelfde als vermenigvuldigen met {9/4}. Bij optellen van breuken maak je ze eerst {gelijknamig}. In 0,0042 = 4,2 · 10 tot de macht −3 schuift de komma {3} plaatsen.", extra: ["4/9", "4", "omgekeerd"], u: "Het omgekeerde van 4/9 is 9/4. Van 0,0042 naar 4,2 schuift de komma 3 plaatsen naar rechts, dus 10 tot de macht −3." }
        ],
        open: [
          { q: "Een leerling rekent 1/2 + 1/3 = 2/5. Leg uit waarom dat niet klopt.", a: "Je mag tellers en noemers niet apart optellen. 2/5 = 0,4 is zelfs kleiner dan 1/2 alleen, terwijl je er iets bij optelt. Maak eerst gelijknamig: 1/2 = 3/6 en 1/3 = 2/6, samen 5/6.", punten: ["tellers en noemers niet apart optellen", "2/5 is kleiner dan 1/2: kan niet", "gelijknamig: 5/6"] }
        ],
        widgets: []
      },

      // ------------------------------------------------------------------ herleiden
      {
        id: "v5-2", nr: "V5 · 2", titel: "Herleiden en vergelijkingen",
        kern: [
          "[[Herleiden]] is een uitdrukking korter schrijven zonder de waarde te veranderen: haakjes wegwerken en [[gelijksoortige termen]] samennemen.",
          { formule: "a(b + c) = ab + ac · −(b − c) = −b + c · (a + b)(c + d) = ac + ad + bc + bd" },
          { voorbeeld: { titel: "Haakjes wegwerken", stappen: ["2(3x + 4) − (x − 5)", "= 6x + 8 − x + 5", "= 5x + 13"] } },
          { voorbeeld: { titel: "Dubbele haakjes", stappen: ["(x + 3)(x − 2)", "= x^{2} − 2x + 3x − 6", "= x^{2} + x − 6"] } },
          { let: "Een min voor haakjes verandert elk teken binnen de haakjes: −(x − 5) = −x + 5, niet −x − 5." },
          { kop: "Vergelijkingen oplossen met de balansmethode" },
          "Doe aan beide kanten van het =-teken hetzelfde, tot x alleen staat. Werk eerst de haakjes weg.",
          { voorbeeld: { titel: "Lineaire vergelijking", stappen: ["3(x − 4) = 2x + 5", "3x − 12 = 2x + 5", "3x − 2x = 5 + 12", "x = 17"] } },
          { kop: "Gebroken vergelijkingen" },
          "Staat x in de noemer, vermenigvuldig dan eerst beide kanten met die noemer. Bij a / B = c geldt B = a / c.",
          { voorbeeld: { titel: "x in de noemer", stappen: ["120 / (x + 2) = 15", "x + 2 = 120 / 15 = 8", "x = 6"] } },
          { widget: "omwerk" },
          { tip: "Controleer je oplossing door hem in te vullen in de oorspronkelijke vergelijking: 120 / (6 + 2) = 15 klopt." }
        ],
        begrippen: [
          ["herleiden", "Een uitdrukking zo kort mogelijk schrijven zonder de waarde te veranderen."],
          ["gelijksoortige termen", "Termen met dezelfde letter en macht, zoals 6x en −x; die mag je samennemen."],
          ["haakjes wegwerken", "Elke term binnen de haakjes vermenigvuldigen met wat ervoor staat."],
          ["balansmethode", "Aan beide kanten van het =-teken dezelfde bewerking doen."],
          ["vergelijking", "Twee uitdrukkingen met een =-teken ertussen; oplossen is de x vinden die klopt."],
          ["gebroken vergelijking", "Vergelijking met de onbekende in een noemer."],
          ["oplossing controleren", "De gevonden x invullen in de oorspronkelijke vergelijking."],
          ["term", "Deel van een som, zoals 5x of 13 in 5x + 13."]
        ],
        vragen: [
          { q: "Herleid 2(3x + 4) − (x − 5).", a: ["5x + 13", "5x + 3", "7x + 13", "5x − 1"], u: "6x + 8 − x + 5 = 5x + 13. Wie −(x − 5) als −x − 5 schrijft, krijgt 5x + 3." },
          { q: "Werk de haakjes weg: (x + 3)(x − 2).", a: ["x^{2} + x − 6", "x^{2} − 6", "x^{2} + 5x − 6", "2x + 1"], u: "x · x + x · −2 + 3 · x + 3 · −2 = x^{2} − 2x + 3x − 6 = x^{2} + x − 6." },
          { q: "Los op: 3(x − 4) = 2x + 5.", a: ["x = 17", "x = 9", "x = 1,4", "x = −7"], u: "3x − 12 = 2x + 5, dus x = 17. Met 3x − 4 = 2x + 5 (haakje half weggewerkt) kom je op 9." },
          { q: "Los op: 120 / (x + 2) = 15.", a: ["x = 6", "x = 8", "x = 10", "x = 1800"], u: "x + 2 = 120 / 15 = 8, dus x = 6. 8 is x + 2, nog niet x." },
          { q: "Los op: 5x − 7 = 2(x + 4).", a: ["x = 5", "x = 1", "x = 3", "x = −5"], u: "5x − 7 = 2x + 8, dus 3x = 15 en x = 5." },
          { q: "Wat is −(2x − 7)?", a: ["−2x + 7", "−2x − 7", "2x + 7", "2x − 7"], u: "Elk teken binnen de haakjes draait om." },
          { q: "Los op: 48 / x = 6.", a: ["x = 8", "x = 288", "x = 42", "x = 0,125"], u: "x = 48 / 6 = 8. Controle: 48 / 8 = 6." },
          { q: "Je lost 4x + 6 = 30 op. Welke stap is fout?", a: ["4x = 36", "4x = 24", "x = 6", "controle: 4 · 6 + 6 = 30"], u: "Je trekt 6 af aan beide kanten: 4x = 24, niet 36." }
        ],
        reken: [
          { q: "Los op: 3(x − 4) = 2x + 5.", antwoord: 17, tol: 0.001, hint: "Werk eerst de haakjes weg.", stappen: ["3x − 12 = 2x + 5", "3x − 2x = 5 + 12", "x = 17"] },
          { q: "Los op: 120 / (x + 2) = 15.", antwoord: 6, tol: 0.001, hint: "Wat moet x + 2 zijn?", stappen: ["x + 2 = 120 / 15 = 8", "x = 8 − 2 = 6"] },
          { q: "Herleid 2(3x + 4) − (x − 5). Typ het antwoord, bijvoorbeeld 4x+7.", antwoord: ["5x+13", "13+5x"], hint: "Let op de min voor het tweede haakje.", stappen: ["2(3x + 4) = 6x + 8", "−(x − 5) = −x + 5", "6x + 8 − x + 5 = 5x + 13"] },
          { q: "Werk de haakjes weg en herleid: (x + 3)(x − 2). Typ bijvoorbeeld x^2+4x-5.", antwoord: ["x^2+x-6", "x²+x-6", "x^2+1x-6"], hint: "Vermenigvuldig elke term van het eerste haakje met elke term van het tweede.", stappen: ["x · x = x^{2}, x · −2 = −2x, 3 · x = 3x, 3 · −2 = −6", "x^{2} − 2x + 3x − 6 = x^{2} + x − 6"] },
          { q: "Los op: 5x − 7 = 2(x + 4).", antwoord: 5, tol: 0.001, hint: "Haakjes weg, dan alle x naar links.", stappen: ["5x − 7 = 2x + 8", "3x = 15", "x = 5"] },
          {
            gen: (R) => {
              for (;;) {
                const x0 = R.int(-6, 15), a = R.int(2, 6), b = R.int(1, 9), c = R.int(1, 5);
                if (a === c) continue;
                const d = a * (x0 - b) - c * x0;
                return { q: `Los op: ${a}(x − ${b}) = ${c === 1 ? "" : c}x ${plus(d)}.`, antwoord: x0, tol: 0.001, hint: "Werk eerst de haakjes weg en breng alle x naar één kant.", stappen: [`${a}x − ${a * b} = ${c === 1 ? "" : c}x ${plus(d)}`, `${a}x − ${c === 1 ? "" : c}x = ${tm(d)} + ${a * b}`, ...(a - c === 1 ? [] : [`${co(a - c)}x = ${tm(d + a * b)}`]), `x = ${tm(x0)}`] };
              }
            }
          },
          {
            gen: (R) => {
              const x0 = R.int(1, 20), b = R.int(1, 9), c = R.kies([2, 3, 4, 5, 6, 8, 10, 12]), k = c * (x0 + b);
              return { q: `Los op: ${k} / (x + ${b}) = ${c}.`, antwoord: x0, tol: 0.001, hint: `Bereken eerst x + ${b}.`, stappen: [`x + ${b} = ${k} / ${c} = ${x0 + b}`, `x = ${x0 + b} − ${b} = ${x0}`, `Controle: ${k} / ${x0 + b} = ${c}`] };
            }
          }
        ],
        oefen: [
          { type: "volgorde", q: "Zet de stappen om 3(x − 4) = 2x + 5 op te lossen in de goede volgorde.", items: ["3(x − 4) = 2x + 5", "3x − 12 = 2x + 5", "3x − 2x = 5 + 12", "x = 17", "Controle: 3 · 13 = 39 en 2 · 17 + 5 = 39"], u: "Eerst haakjes weg, dan de x-en naar één kant en de getallen naar de andere." },
          { type: "koppel", q: "Koppel de uitdrukking aan de herleide vorm.", paren: [["3(2x − 1)", "6x − 3"], ["−(4 − x)", "x − 4"], ["(x + 1)(x + 4)", "x^{2} + 5x + 4"], ["5x − 2(x − 3)", "3x + 6"]], u: "Let steeds op de min voor de haakjes." },
          { type: "invul", q: "Vul in.", tekst: "Bij 60 / (x + 1) = 12 is x + 1 = {5}, dus x = {4}. Bij −(x − 5) wordt de −5 een {+5}.", extra: ["720", "6", "−5"], u: "60 / 12 = 5. Een min voor haakjes draait elk teken om." }
        ],
        open: [
          { q: "Een leerling lost 2(x + 3) = 14 zo op: '2x + 3 = 14, dus 2x = 11 en x = 5,5.' Leg uit wat er mis gaat.", a: "Bij het haakjes wegwerken moet de 2 met beide termen vermenigvuldigd worden: 2(x + 3) = 2x + 6. Dan 2x = 8 en x = 4. Controle: 2(4 + 3) = 14 klopt, terwijl 2(5,5 + 3) = 17 niet klopt.", punten: ["2 maal beide termen: 2x + 6", "x = 4", "controle door invullen"] }
        ],
        widgets: ["omwerk"]
      },

      // ------------------------------------------------------------------ grafieken, toppen en snijpunten
      {
        id: "v5-3", nr: "V5 · 3", titel: "Grafieken, toppen en snijpunten",
        kern: [
          "Een [[lineaire formule]] y = ax + b geeft een rechte lijn. Het [[startgetal]] b is y bij x = 0; de [[helling]] a is hoeveel y verandert als x 1 groter wordt.",
          { fig: "lijnfig", bij: "Van (2, 16) naar (8, 34): 6 naar rechts en 18 omhoog, dus de helling is 18 / 6 = 3." },
          { voorbeeld: { titel: "Formule bij twee punten", stappen: ["Punten (2, 16) en (8, 34).", "Helling a = (34 − 16) / (8 − 2) = 18 / 6 = 3.", "Invullen van (2, 16) in y = 3x + b: 16 = 6 + b, dus b = 10.", "Formule: y = 3x + 10."] } },
          { kop: "Toppen, snijpunten en nulpunten" },
          "Een [[top]] is het hoogste (maximum) of laagste (minimum) punt van een grafiek. Een [[snijpunt]] is een punt waar twee grafieken dezelfde y hebben. Een [[nulpunt]] is een snijpunt met de x-as (y = 0).",
          { fig: "topsnijfig", bij: "y = −2(x − 4)^{2} + 50 en y = 4x + 18: top (4, 50), snijpunten (0, 18) en (6, 42), nulpunt bij x = 9." },
          { tabel: { kop: ["je zoekt", "op de grafische rekenmachine"], rijen: [["top", "optie maximum of minimum in het grafiekmenu"], ["snijpunt", "beide formules invoeren, optie snijpunt (intersect)"], ["nulpunt", "optie nulpunt (zero), of snijpunt met y = 0"], ["controle", "tabel: kijk waar Y1 het grootst is of waar Y1 = Y2"]] } },
          { kop: "Snijpunt van twee lijnen algebraïsch" },
          { voorbeeld: { titel: "Twee lijnen", stappen: ["y = 3x + 10 en y = −2x + 35.", "Gelijkstellen: 3x + 10 = −2x + 35.", "5x = 25, dus x = 5.", "y = 3 · 5 + 10 = 25. Snijpunt (5, 25)."] } },
          { tip: "Kies een venster waarin je het hele interessante deel ziet. Gebruik de tabel van je rekenmachine om te bepalen welke waarden van x en y je nodig hebt." },
          { widget: "topsnij" },
          { let: "Lees de vraag goed: soms wordt alleen de x van de top gevraagd, soms de maximale waarde (de y). Rond pas aan het eind af." }
        ],
        begrippen: [
          ["lineaire formule", "Formule y = ax + b met een rechte lijn als grafiek."],
          ["helling", "Hoeveel y verandert als x 1 groter wordt: (verschil y) / (verschil x)."],
          ["startgetal", "De waarde van y bij x = 0; daar snijdt de lijn de y-as."],
          ["top", "Hoogste punt (maximum) of laagste punt (minimum) van een grafiek."],
          ["maximum", "De grootste y-waarde van een grafiek, bij de top."],
          ["snijpunt", "Punt waar twee grafieken dezelfde x en y hebben."],
          ["nulpunt", "Snijpunt van de grafiek met de x-as: daar is y = 0."],
          ["venster", "Het deel van het assenstelsel dat je rekenmachine laat zien (Xmin, Xmax, Ymin, Ymax)."]
        ],
        vragen: [
          { q: "Een lijn gaat door (2, 16) en (8, 34). Wat is de helling?", a: ["3", "2", "18", "0,33"], u: "(34 − 16) / (8 − 2) = 18 / 6 = 3. Delen andersom (6 / 18) geeft 0,33." },
          { q: "Een lijn heeft helling 3 en gaat door (2, 16). Wat is het startgetal?", a: ["10", "16", "22", "14"], u: "16 = 3 · 2 + b, dus b = 10." },
          { q: "Wat is het snijpunt van y = 3x + 10 en y = −2x + 35?", a: ["(5, 25)", "(25, 5)", "(5, 45)", "(9, 37)"], u: "3x + 10 = −2x + 35 geeft 5x = 25, x = 5 en y = 25." },
          { q: "Wat is de top van y = −2(x − 4)^{2} + 50?", a: ["(4, 50)", "(−4, 50)", "(50, 4)", "(4, −2)"], u: "Het kwadraat is nooit negatief, dus −2(x − 4)^{2} is hoogstens 0, bij x = 4. Dan is y = 50." },
          { q: "In welke punten snijden y = −2(x − 4)^{2} + 50 en y = 4x + 18 elkaar?", a: ["(0, 18) en (6, 42)", "alleen in (6, 42)", "(4, 50) en (6, 42)", "(0, 18) en (9, 0)"], u: "Bij x = 0: beide 18. Bij x = 6: −2 · 4 + 50 = 42 en 4 · 6 + 18 = 42. (4, 50) is de top van de parabool, niet een snijpunt." },
          { q: "Wat is een nulpunt van een grafiek?", a: ["een punt waar de grafiek de x-as snijdt", "een punt waar de grafiek de y-as snijdt", "het laagste punt van de grafiek", "het punt (0, 0)"], u: "Bij een nulpunt is y = 0: dat ligt op de x-as." },
          { q: "Welke optie van de grafische rekenmachine gebruik je om de top van een bergparabool te vinden?", a: ["maximum", "minimum", "snijpunt", "nulpunt"], u: "Een bergparabool heeft een hoogste punt: het maximum." },
          { q: "Een lijn heeft startgetal 40 en daalt 5 per stap van 1 in x. Welke formule hoort erbij?", a: ["y = −5x + 40", "y = 5x + 40", "y = 40x − 5", "y = −40x + 5"], u: "Helling −5 (dalend), startgetal 40." }
        ],
        reken: [
          { q: "Een lijn gaat door (2, 16) en (8, 34). Bereken de helling.", antwoord: 3, tol: 0.001, hint: "Verschil in y gedeeld door verschil in x.", stappen: ["34 − 16 = 18", "8 − 2 = 6", "a = 18 / 6 = 3"] },
          { q: "Bereken het startgetal van de lijn door (2, 16) en (8, 34).", antwoord: 10, tol: 0.001, hint: "Gebruik a = 3 en vul een punt in.", stappen: ["y = 3x + b", "16 = 3 · 2 + b", "b = 10"] },
          { q: "Bereken de x-coördinaat van het snijpunt van y = 3x + 10 en y = −2x + 35.", antwoord: 5, tol: 0.001, hint: "Stel de formules aan elkaar gelijk.", stappen: ["3x + 10 = −2x + 35", "5x = 25", "x = 5"] },
          { q: "Wat is de maximale waarde van y = −2(x − 4)^{2} + 50?", antwoord: 50, tol: 0.001, hint: "Wanneer is −2(x − 4)^{2} het grootst?", stappen: ["(x − 4)^{2} is minstens 0", "Dus −2(x − 4)^{2} is hoogstens 0, bij x = 4", "Maximum: y = 50"] },
          { q: "Bereken het nulpunt van y = −2(x − 4)^{2} + 50 dat rechts van de top ligt.", antwoord: 9, tol: 0.001, hint: "Los −2(x − 4)^{2} + 50 = 0 op.", stappen: ["−2(x − 4)^{2} = −50", "(x − 4)^{2} = 25", "x − 4 = 5 of x − 4 = −5", "Rechts van de top: x = 9"] },
          {
            gen: (R) => {
              for (;;) {
                const a = R.kies([-4, -3, -2, -1.5, -1, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5]), b = R.int(-10, 30), x1 = R.int(0, 5), x2 = x1 + R.kies([2, 4, 6]);
                const y1 = a * x1 + b, y2 = a * x2 + b;
                if (!Number.isInteger(y1) || !Number.isInteger(y2)) continue;
                return { q: `Een lijn gaat door (${x1}, ${tm(y1)}) en (${x2}, ${tm(y2)}). Bereken de helling.`, antwoord: a, tol: 0.001, hint: "Verschil in y gedeeld door verschil in x.", stappen: [`${tm(y2)} − ${y1 < 0 ? "(" + tm(y1) + ")" : nl(y1)} = ${tm(y2 - y1)}`, `${x2} − ${x1} = ${x2 - x1}`, `a = ${tm(y2 - y1)} / ${x2 - x1} = ${tm(a)}`, `Startgetal: ${tm(y1)} − ${a < 0 ? "(" + tm(a) + ")" : nl(a)} · ${x1} = ${tm(b)}, dus y = ${co(a)}x ${plus(b)}`] };
              }
            }
          },
          {
            gen: (R) => {
              for (;;) {
                const x0 = R.int(1, 12), a1 = R.int(1, 6), a2 = -R.int(1, 5), b1 = R.int(-5, 20);
                const y0 = a1 * x0 + b1, b2 = y0 - a2 * x0;
                return { q: `Bereken de x-coördinaat van het snijpunt van y = ${a1 === 1 ? "" : a1}x ${plus(b1)} en y = ${co(a2)}x ${plus(b2)}.`, antwoord: x0, tol: 0.001, hint: "Stel de twee formules gelijk aan elkaar.", stappen: [`${a1 === 1 ? "" : a1}x ${plus(b1)} = ${co(a2)}x ${plus(b2)}`, `${a1 - a2}x = ${tm(b2 - b1)}`, `x = ${x0}`, `y = ${tm(y0)}, snijpunt (${x0}, ${tm(y0)})`] };
              }
            }
          }
        ],
        oefen: [
          { type: "koppel", q: "Koppel wat je zoekt aan wat je op de rekenmachine doet.", paren: [["hoogste punt", "optie maximum"], ["laagste punt", "optie minimum"], ["waar twee grafieken gelijk zijn", "optie snijpunt"], ["snijpunt met de x-as", "optie nulpunt"]], u: "Elk soort punt heeft een eigen optie in het grafiekmenu." },
          { type: "volgorde", q: "Zet de stappen om een formule bij twee punten op te stellen in de goede volgorde.", items: ["Bereken het verschil in y en het verschil in x", "Deel: helling a = verschil y / verschil x", "Vul a en een punt in y = ax + b in", "Los b op en schrijf de formule op"], u: "Eerst de helling, dan het startgetal." }
        ],
        open: [
          { q: "Een leerling zoekt het snijpunt van y = −2(x − 4)^{2} + 50 en y = 4x + 18. Hij ziet op zijn scherm (venster 2 ≤ x ≤ 10) één snijpunt, (6, 42), en schrijft: 'De grafieken snijden elkaar alleen in (6, 42).' Leg uit waarom deze conclusie niet klopt.", a: "Het venster laat niet alles zien. Vul je x = 0 in, dan is −2 · 16 + 50 = 18 en 4 · 0 + 18 = 18: ook (0, 18) is een snijpunt. Een parabool en een lijn kunnen elkaar twee keer snijden. Kies een groter venster of gebruik de tabel om te controleren.", punten: ["venster te klein", "tweede snijpunt (0, 18)", "parabool en lijn: hoogstens twee snijpunten, controleer met tabel"] }
        ],
        widgets: ["topsnij"]
      }
    ]
  });
})();
