// H11 Allerlei formules. Paragraafindeling volgens de inhoudsopgave van Moderne Wiskunde 12e editie havo A (11.1 t/m 11.5).
// Ids nooit wijzigen (de voortgang hangt eraan); nr en titel mag je aanpassen.
(function () {
  "use strict";
  const nl = TW.nl;

  TW.hoofdstuk({
    id: "h11", nr: "H11", titel: "Allerlei formules", icoon: "🧮",
    intro: "Evenredige verbanden, grenswaarden, redeneren met formules, machten en formules met meer variabelen. Steeds dezelfde vraag: wat doet de uitkomst als je een variabele verandert?",
    onderdelen: [
      // ------------------------------------------------------------------ 11.1
      {
        id: "h11-1", nr: "11.1", titel: "Recht evenredig en omgekeerd evenredig",
        kern: [
          "Twee grootheden zijn [[recht evenredig]] als bij twee keer zo veel x ook twee keer zo veel y hoort. De formule is y = a · x.",
          "Bij een recht evenredig verband is het quotiënt y / x steeds gelijk aan a, de [[evenredigheidsconstante]]. De grafiek is een rechte lijn door de oorsprong.",
          "Twee grootheden zijn [[omgekeerd evenredig]] als bij twee keer zo veel x maar half zo veel y hoort. De formule is y = a / x.",
          "Bij een omgekeerd evenredig verband is het product x · y steeds gelijk aan a. De grafiek is een [[hyperbool]] die de assen nooit raakt.",
          { fig: "evenredig", bij: "Recht evenredig: rechte lijn door (0, 0). Omgekeerd evenredig: een kromme die steeds dichter bij de assen komt." },
          { tabel: { kop: ["", "recht evenredig", "omgekeerd evenredig"], rijen: [["formule", "y = a · x", "y = a / x"], ["vast in de tabel", "y / x = a", "x · y = a"], ["x wordt k keer zo groot", "y wordt k keer zo groot", "y wordt k keer zo klein"], ["grafiek", "lijn door (0, 0)", "hyperbool"]] } },
          { voorbeeld: { titel: "Welk verband hoort bij de tabel?", stappen: ["Tabel: x = 2, 5, 8 en y = 30, 12, 7,5.", "Quotiënt y / x: 15, 2,4, 0,9375. Niet gelijk, dus niet recht evenredig.", "Product x · y: 60, 60, 60. Steeds gelijk, dus omgekeerd evenredig met y = 60 / x.", "Bij x = 12 hoort y = 60 / 12 = 5."] } },
          { let: "Een stijgende rechte lijn is niet altijd recht evenredig. Bij y = 3x + 10 hoort bij x = 0 al y = 10: de lijn gaat niet door de oorsprong." },
          { tip: "Herken omgekeerd evenredig aan een vast totaal dat verdeeld wordt: een vaste afstand (snelheid × tijd), een vast bedrag gedeeld door het aantal personen, een vaste klus gedeeld over het aantal werkers." },
          { widget: "formulelab" }
        ],
        begrippen: [
          ["recht evenredig", "Verband y = a · x: x k keer zo groot, dan y ook k keer zo groot."],
          ["omgekeerd evenredig", "Verband y = a / x: x k keer zo groot, dan y k keer zo klein."],
          ["evenredigheidsconstante", "Het vaste getal a in y = a · x of y = a / x."],
          ["quotiënt", "De uitkomst van een deling, zoals y / x."],
          ["product", "De uitkomst van een vermenigvuldiging, zoals x · y."],
          ["hyperbool", "De kromme grafiek van y = a / x, die de assen steeds dichter nadert maar nooit raakt."],
          ["oorsprong", "Het punt (0, 0)."],
          ["lineair verband", "Verband y = a · x + b met een rechte lijn als grafiek; alleen bij b = 0 recht evenredig."]
        ],
        vragen: [
          { q: "Welke formule hoort bij een recht evenredig verband?", a: ["K = 2,5 · n", "K = 2,5 · n + 4", "K = 2,5 / n", "K = n^{2,5}"], u: "Recht evenredig is y = a · x zonder startgetal. Met + 4 is het lineair, maar niet recht evenredig." },
          { q: "y is omgekeerd evenredig met x. Wat gebeurt er met y als x 3 keer zo groot wordt?", a: ["y wordt 3 keer zo klein", "y wordt 3 keer zo groot", "y wordt 9 keer zo klein", "y neemt met 3 af"], u: "Het product x · y blijft gelijk. Wordt x 3 keer zo groot, dan moet y 3 keer zo klein worden." },
          { q: "In een tabel is het product x · y steeds 48. Welke formule hoort daarbij?", a: ["y = 48 / x", "y = 48 · x", "y = x / 48", "y = 48 − x"], u: "x · y = 48 geeft y = 48 / x: omgekeerd evenredig." },
          { q: "Met 4 pompen is een kelder in 9 uur leeg. Hoe lang duurt het met 6 pompen?", a: ["6 uur", "13,5 uur", "7 uur", "11 uur"], u: "De klus is 4 · 9 = 36 pompuren. Met 6 pompen: 36 / 6 = 6 uur. 13,5 uur krijg je als je ten onrechte recht evenredig rekent." },
          { q: "Welke grafiek hoort bij een recht evenredig verband?", a: ["een rechte lijn door (0, 0)", "een rechte lijn door (0, 10)", "een hyperbool", "een dalende rechte lijn"], u: "y = a · x geeft bij x = 0 ook y = 0, en de grafiek is recht." },
          { q: "Bij x = 4 is y = 10 en bij x = 10 is y = 25. Kan het verband recht evenredig zijn?", a: ["ja, want y / x is steeds 2,5", "nee, want het product is niet gelijk", "nee, want y stijgt sneller dan x", "ja, want x · y is steeds 40"], u: "10 / 4 = 2,5 en 25 / 10 = 2,5. Het quotiënt is gelijk, dus y = 2,5 · x past." },
          { q: "Je rijdt 120 km. De reistijd t (uur) hangt af van de snelheid v (km/u). Welk verband is dat?", a: ["omgekeerd evenredig: t = 120 / v", "recht evenredig: t = 120 · v", "recht evenredig: t = v / 120", "lineair: t = 120 − v"], u: "Afstand = snelheid × tijd, dus v · t = 120 en t = 120 / v. Twee keer zo snel is half zo lang." },
          { q: "y is recht evenredig met x en bij x = 6 hoort y = 15. Wat is y bij x = 10?", a: ["25", "19", "9", "30"], u: "a = 15 / 6 = 2,5, dus y = 2,5 · 10 = 25. 19 krijg je als je 4 optelt in plaats van met 10/6 vermenigvuldigt." }
        ],
        reken: [
          { q: "y is recht evenredig met x. Bij x = 8 hoort y = 36. Bereken y bij x = 14.", antwoord: 63, hint: "Bereken eerst a = y / x.", stappen: ["a = 36 / 8 = 4,5", "y = 4,5 · 14 = 63"] },
          { q: "Zes vrijwilligers doen 15 dagen over het opknappen van een clubhuis. Hoeveel dagen kost het met 9 vrijwilligers, als iedereen even hard werkt?", antwoord: 10, eenheid: "dagen", hint: "Het aantal werkdagen in totaal blijft gelijk.", stappen: ["Totaal: 6 · 15 = 90 werkdagen", "Met 9 vrijwilligers: 90 / 9 = 10 dagen"] },
          { q: "Gegeven de tabel x = 2, 5, 8 met y = 30, 12, 7,5. Het verband is omgekeerd evenredig. Bereken y bij x = 12.", antwoord: 5, hint: "Bereken het vaste product x · y.", stappen: ["x · y = 2 · 30 = 60 (ook 5 · 12 en 8 · 7,5)", "y = 60 / 12 = 5"] },
          { q: "De prijs van kaas is recht evenredig met het gewicht. 2,4 kg kost € 31,20. Wat kost 0,75 kg?", antwoord: 9.75, eenheid: "euro", hint: "Reken eerst de prijs per kg uit.", stappen: ["Prijs per kg: 31,20 / 2,4 = 13", "0,75 · 13 = 9,75 euro"] },
          {
            gen: (R) => {
              const a = R.kies([1.5, 2, 2.5, 3, 4, 4.5, 6, 7.5, 8]), x1 = R.int(2, 9), x2 = R.int(10, 25);
              const c = R.kies([["Het loon (euro)", "het aantal gewerkte uren"], ["Het aantal liters benzine", "het aantal gereden kilometers (in tientallen)"], ["De hoeveelheid meel (gram)", "het aantal pannenkoeken"]]);
              return { q: `${c[0]} is recht evenredig met ${c[1]}. Bij ${x1} hoort ${nl(a * x1)}. Wat hoort bij ${x2}?`, antwoord: a * x2, hint: "a = y / x, daarna y = a · x.", stappen: [`a = ${nl(a * x1)} / ${x1} = ${nl(a)}`, `${nl(a)} · ${x2} = ${nl(a * x2)}`] };
            }
          },
          {
            gen: (R) => {
              for (;;) {
                const s = R.kies([60, 72, 90, 120, 144, 180, 240]), v1 = R.kies([12, 15, 18, 20, 24, 30, 36, 40, 45, 48, 60]), v2 = R.kies([12, 15, 18, 20, 24, 30, 36, 40, 45, 48, 60]);
                if (v1 === v2) continue;
                const t1 = s / v1, t2 = s / v2;
                if (Math.abs(t1 * 100 - Math.round(t1 * 100)) > 1e-9 || Math.abs(t2 * 100 - Math.round(t2 * 100)) > 1e-9) continue;
                return { q: `Een fietstocht is ${s} km. Met een gemiddelde snelheid van ${v1} km/u duurt de tocht ${nl(t1)} uur. Hoeveel uur duurt de tocht met ${v2} km/u?`, antwoord: t2, eenheid: "uur", hint: "Snelheid × tijd is steeds de afstand: omgekeerd evenredig.", stappen: [`v · t = ${v1} · ${nl(t1)} = ${s}`, `t = ${s} / ${v2} = ${nl(t2)} uur`] };
              }
            }
          }
        ],
        oefen: [
          { type: "sorteer", q: "Recht evenredig, omgekeerd evenredig of geen van beide?", groepen: ["recht evenredig", "omgekeerd evenredig", "geen van beide"], items: [["y = 7x", 0], ["y = 7 / x", 1], ["y = 7x + 2", 2], ["x · y = 20", 1], ["y / x = 0,4", 0], ["y = x^{2}", 2], ["prijs bij een vaste prijs per kilo", 0], ["kosten per persoon bij een vaste busprijs", 1]], u: "Recht evenredig: vast quotiënt, lijn door (0, 0). Omgekeerd: vast product. Een startgetal of een kwadraat past bij geen van beide." },
          { type: "invul", q: "Vul in.", tekst: "Bij een recht evenredig verband is het {quotiënt} y / x constant. Bij een omgekeerd evenredig verband is het {product} x · y constant. De grafiek van y = a / x heet een {hyperbool}.", extra: ["verschil", "parabool", "som"], u: "Recht evenredig: delen geeft steeds hetzelfde. Omgekeerd evenredig: vermenigvuldigen geeft steeds hetzelfde." }
        ],
        open: [
          { q: "Een leerling ziet dat de lijn bij y = 4x + 12 stijgt en zegt: 'y is recht evenredig met x, want als x groter wordt, wordt y ook groter.' Leg uit waarom deze conclusie niet klopt.", a: "Recht evenredig betekent niet alleen dat y stijgt als x stijgt, maar dat y k keer zo groot wordt als x k keer zo groot wordt. Bij x = 1 is y = 16 en bij x = 2 is y = 20: geen verdubbeling. Het startgetal 12 zorgt ervoor dat de lijn niet door (0, 0) gaat, dus het verband is lineair maar niet recht evenredig.", punten: ["recht evenredig: k keer zo groot geeft k keer zo groot", "tegenvoorbeeld met getallen", "startgetal, lijn niet door (0, 0)"] }
        ],
        widgets: ["formulelab"]
      },

      // ------------------------------------------------------------------ 11.2
      {
        id: "h11-2", nr: "11.2", titel: "Grenswaarden",
        kern: [
          "Een [[grenswaarde]] is het getal waar de uitkomst van een formule steeds dichter bij komt als de variabele heel groot wordt, zonder dat getal ooit te bereiken.",
          "In de grafiek zie je een grenswaarde als een horizontale lijn waar de grafiek naartoe kruipt: een [[horizontale asymptoot]].",
          { fig: "grenswaarde", bij: "N = 80 − 60 · 0,9^{t} begint bij 20 en nadert 80." },
          { kop: "Twee soorten formules" },
          "**Exponentieel**: bij N = 80 − 60 · 0,9^{t} wordt 0,9^{t} steeds kleiner (groeifactor tussen 0 en 1). Dan nadert 60 · 0,9^{t} tot 0 en nadert N tot 80.",
          "**Gebroken**: bij GK = 3 + 450 / q wordt 450 / q steeds kleiner als q groot wordt. GK nadert dus tot 3.",
          { voorbeeld: { titel: "Afkoelende koffie", stappen: ["De temperatuur is T = 20 + 70 · 0,92^{t} (T in °C, t in minuten).", "Begin: t = 0 geeft T = 20 + 70 · 1 = 90 °C.", "Na 10 minuten: T = 20 + 70 · 0,92^{10} ≈ 20 + 30,4 = 50,4 °C.", "Voor grote t gaat 0,92^{t} naar 0, dus T nadert 20 °C: de temperatuur van de kamer."] } },
          { tip: "Controleer een grenswaarde met de tabel van je grafische rekenmachine: vul heel grote waarden in, zoals 100, 1000 en 10 000, en kijk waar de uitkomst naartoe gaat." },
          { kop: "Gebroken formule met x in teller en noemer" },
          "Bij H = (12t + 6) / (t + 2) worden de getallen 6 en 2 onbelangrijk als t heel groot is. Dan staat er ongeveer 12t / t = 12: de grenswaarde is 12.",
          { let: "Een grenswaarde wordt nooit bereikt. De koffie wordt dus nooit precies 20 °C volgens deze formule, ook al is het verschil na een uur heel klein." },
          { widget: "grens" }
        ],
        begrippen: [
          ["grenswaarde", "Getal waar de uitkomst steeds dichter bij komt als de variabele heel groot wordt."],
          ["horizontale asymptoot", "Horizontale lijn die de grafiek steeds dichter nadert zonder hem te raken."],
          ["groeifactor", "Getal waarmee je per tijdseenheid vermenigvuldigt; tussen 0 en 1 betekent afname."],
          ["exponentiële formule", "Formule met de variabele in de exponent, zoals 70 · 0,92^{t}."],
          ["gebroken formule", "Formule met de variabele in de noemer van een breuk, zoals 450 / q."],
          ["beginwaarde", "Uitkomst van de formule bij t = 0."],
          ["naderen", "Steeds dichter bij een getal komen zonder het te bereiken."]
        ],
        vragen: [
          { q: "Wat is de grenswaarde van N = 50 − 30 · 0,8^{t}?", a: ["50", "20", "30", "0,8"], u: "0,8^{t} nadert 0, dus 30 · 0,8^{t} nadert 0 en N nadert 50. 20 is de beginwaarde (50 − 30)." },
          { q: "Wat is de beginwaarde van N = 50 − 30 · 0,8^{t}?", a: ["20", "50", "80", "30"], u: "Bij t = 0 is 0,8^{0} = 1, dus N = 50 − 30 = 20." },
          { q: "Wat is de grenswaarde van K = 4 + 600 / n als n heel groot wordt?", a: ["4", "600", "604", "0"], u: "600 / n wordt steeds kleiner en nadert 0. K nadert dus 4." },
          { q: "Wat is de grenswaarde van H = (12t + 6) / (t + 2)?", a: ["12", "3", "6", "14"], u: "Voor grote t zijn 6 en 2 verwaarloosbaar: H ≈ 12t / t = 12. 3 is de beginwaarde (6 / 2)." },
          { q: "Bij welke formule is er géén grenswaarde als t groot wordt?", a: ["N = 20 + 5 · 1,1^{t}", "N = 20 + 5 · 0,9^{t}", "N = 20 − 5 · 0,5^{t}", "N = 20 + 5 / t"], u: "Bij groeifactor 1,1 wordt 1,1^{t} steeds groter, dus N groeit onbeperkt. Bij de andere drie gaat het tweede deel naar 0." },
          { q: "T = 20 + 70 · 0,92^{t}. Wat gebeurt er met T als t steeds groter wordt?", a: ["T daalt steeds langzamer en nadert 20", "T daalt steeds sneller tot 0", "T daalt met een vaste 8% per minuut tot 20", "T stijgt en nadert 90"], u: "70 · 0,92^{t} wordt steeds kleiner, en ook de afname wordt steeds kleiner. T nadert 20. Het verschil met 20 neemt met 8% per minuut af, niet T zelf." },
          { q: "Een leerling zegt: 'Na genoeg tijd wordt de koffie precies 20 °C.' Klopt dat volgens T = 20 + 70 · 0,92^{t}?", a: ["Nee, 70 · 0,92^{t} wordt nooit precies 0.", "Ja, na ongeveer een uur is T = 20.", "Ja, zodra 0,92^{t} kleiner is dan 1.", "Nee, T wordt uiteindelijk lager dan 20."], u: "Een macht van 0,92 is altijd positief. T komt dus wel heel dicht bij 20, maar bereikt het nooit." },
          { q: "Gemiddelde kosten GK = 3 + 450 / q. Hoe groot moet q zijn voor GK = 4,5?", a: ["300", "150", "100", "675"], u: "450 / q = 4,5 − 3 = 1,5, dus q = 450 / 1,5 = 300." }
        ],
        reken: [
          { q: "T = 20 + 70 · 0,92^{t}, met T in °C en t in minuten. Bereken T na 10 minuten. Rond af op 1 decimaal.", antwoord: 50.4, tol: 0.1, eenheid: "°C", hint: "Bereken eerst 0,92^{10}.", stappen: ["0,92^{10} ≈ 0,4344", "70 · 0,4344 ≈ 30,41", "T ≈ 20 + 30,41 = 50,4 °C"] },
          { q: "Wat is de grenswaarde van T = 20 + 70 · 0,92^{t}?", antwoord: 20, eenheid: "°C", hint: "Wat doet 0,92^{t} als t heel groot wordt?", stappen: ["0,92^{t} nadert 0", "70 · 0,92^{t} nadert 0", "T nadert 20 °C"] },
          { q: "GK = 3 + 450 / q. Bereken q als GK = 4,5.", antwoord: 300, hint: "Trek eerst 3 af en los dan 450 / q = … op.", stappen: ["450 / q = 4,5 − 3 = 1,5", "q = 450 / 1,5 = 300"] },
          { q: "H = (12t + 6) / (t + 2). Wat is de grenswaarde van H?", antwoord: 12, hint: "Kijk alleen naar de termen met t als t heel groot is.", stappen: ["Voor grote t: H ≈ 12t / t", "12t / t = 12", "Controle: t = 1000 geeft 12006 / 1002 ≈ 11,98"] },
          { q: "T = 20 + 70 · 0,92^{t}. Na hoeveel hele minuten is de koffie voor het eerst kouder dan 25 °C? Gebruik de tabel van je rekenmachine.", antwoord: 32, eenheid: "minuten", hint: "Zoek t waarbij 70 · 0,92^{t} kleiner wordt dan 5.", stappen: ["T < 25 betekent 70 · 0,92^{t} < 5", "t = 31: T ≈ 25,3 °C", "t = 32: T ≈ 24,9 °C", "Na 32 minuten"] },
          {
            gen: (R) => {
              const G = 10 * R.int(5, 30), b = 10 * R.int(2, Math.min(15, G / 10 - 1)), g = R.kies([0.7, 0.75, 0.8, 0.85, 0.9, 0.95]), t = R.int(2, 12);
              const gt = Math.pow(g, t), N = R.rond(G - b * gt, 1);
              return { q: `N = ${G} − ${b} · ${nl(g)}^{${"t"}}. Bereken N bij t = ${t}. Rond af op 1 decimaal.`, antwoord: N, tol: 0.1, hint: `Bereken eerst ${nl(g)}^{${t}}.`, stappen: [`${nl(g)}^{${t}} ≈ ${nl(R.rond(gt, 4))}`, `${b} · ${nl(R.rond(gt, 4))} ≈ ${nl(R.rond(b * gt, 2))}`, `N ≈ ${G} − ${nl(R.rond(b * gt, 2))} = ${nl(N)}`, `De grenswaarde is ${G}.`] };
            }
          },
          {
            gen: (R) => {
              const a = R.kies([2, 2.5, 3, 4, 5, 8]), x = R.kies([20, 25, 40, 50, 80, 100, 120, 150, 200]), k = R.kies([0.5, 1, 1.5, 2, 2.5, 3, 4]), b = k * x, y = a + k;
              return { q: `De gemiddelde kosten zijn GK = ${nl(a)} + ${nl(b)} / q. Bereken q als GK = ${nl(y)}.`, antwoord: x, hint: `Trek eerst ${nl(a)} af.`, stappen: [`${nl(b)} / q = ${nl(y)} − ${nl(a)} = ${nl(k)}`, `q = ${nl(b)} / ${nl(k)} = ${x}`, `De grenswaarde van GK is ${nl(a)}.`] };
            }
          }
        ],
        oefen: [
          { type: "koppel", q: "Koppel de formule aan de grenswaarde.", paren: [["N = 80 − 60 · 0,9^{t}", "80"], ["K = 4 + 600 / n", "4"], ["H = (12t + 6) / (t + 2)", "12"], ["T = 20 + 70 · 0,92^{t}", "20"], ["y = 5 · 0,5^{x}", "0"]], u: "Het deel met 0,9^{t}, 1 / n of de kleine getallen in teller en noemer valt weg als de variabele heel groot wordt." },
          { type: "volgorde", q: "Zet de redenering bij N = 80 − 60 · 0,9^{t} in de goede volgorde.", items: ["t wordt steeds groter", "0,9^{t} wordt steeds kleiner en nadert 0", "60 · 0,9^{t} nadert 0", "N nadert 80"], u: "Werk van binnen naar buiten: eerst de macht, dan het product, dan de hele formule." }
        ],
        open: [
          { q: "Een bedrijf heeft vaste kosten van € 450 en € 3 kosten per product: GK = 3 + 450 / q. De directeur zegt: 'Als we maar genoeg produceren, worden de gemiddelde kosten per product bijna nul.' Leg uit waarom deze conclusie niet klopt.", a: "Alleen het deel 450 / q wordt steeds kleiner als q groot wordt. De 3 euro per product blijft altijd. GK nadert dus 3, niet 0. Hoeveel je ook produceert, de gemiddelde kosten worden nooit lager dan € 3.", punten: ["450 / q nadert 0", "de 3 blijft", "grenswaarde is 3, niet 0"] }
        ],
        widgets: ["grens"]
      },

      // ------------------------------------------------------------------ 11.3
      {
        id: "h11-3", nr: "11.3", titel: "Redeneren met formules",
        kern: [
          "Bij redeneren met formules beschrijf je zonder alles uit te rekenen wat er met de uitkomst gebeurt als een variabele groter of kleiner wordt.",
          { kop: "Vier manieren van stijgen en dalen" },
          { fig: "stijgvormen", bij: "Toenemend stijgend wordt steeds steiler; afnemend stijgend wordt steeds vlakker." },
          "[[Toenemend stijgend]]: de toenamen worden steeds groter. [[Afnemend stijgend]]: de toenamen worden steeds kleiner. Bij dalen gaat het net zo met de afnamen.",
          { voorbeeld: { titel: "Herkennen in een tabel", stappen: ["x = 0, 1, 2, 3, 4 en y = 3, 5, 9, 15, 23.", "Toenamen: 2, 4, 6, 8.", "De toenamen worden steeds groter, dus de grafiek is toenemend stijgend."] } },
          { kop: "Redeneren in stappen" },
          "Werk van binnen naar buiten. Bij K = 20 + 500 / n: als n groter wordt, wordt 500 / n kleiner, dus wordt K kleiner. Omdat 500 / n steeds minder afneemt, is de grafiek afnemend dalend.",
          { tabel: { kop: ["onderdeel", "x wordt groter, dan …"], rijen: [["x^{2}, x^{3}", "toenemend stijgend"], ["√x", "afnemend stijgend"], ["1 / x", "afnemend dalend"], ["g^{x} met g > 1", "toenemend stijgend"], ["g^{x} met 0 < g < 1", "afnemend dalend"]] } },
          { kop: "Hoeveel keer zo groot?" },
          "Wordt x k keer zo groot, dan wordt x^{2} k^{2} keer zo groot en √x wordt √k keer zo groot.",
          { voorbeeld: { titel: "Oppervlakte van een cirkel", stappen: ["A = 3,14 · r^{2}.", "De straal wordt 3 keer zo groot.", "r^{2} wordt 3^{2} = 9 keer zo groot.", "A wordt dus 9 keer zo groot (3,14 blijft gelijk)."] } },
          { let: "Een min voor een deel draait alles om: bij y = 50 − 2x^{2} is x^{2} toenemend stijgend, dus y is toenemend dalend." },
          { widget: "formulelab" }
        ],
        begrippen: [
          ["toenemend stijgend", "De grafiek stijgt steeds sneller: de toenamen worden groter."],
          ["afnemend stijgend", "De grafiek stijgt steeds langzamer: de toenamen worden kleiner."],
          ["toenemend dalend", "De grafiek daalt steeds sneller: de afnamen worden groter."],
          ["afnemend dalend", "De grafiek daalt steeds langzamer: de afnamen worden kleiner."],
          ["toename", "Verschil tussen twee opeenvolgende y-waarden in een tabel."],
          ["redeneren van binnen naar buiten", "Eerst kijken wat het binnenste deel van de formule doet, daarna stap voor stap de rest."],
          ["parameter", "Vast getal in een formule dat je kunt veranderen, zoals a in y = a · x^{2}."],
          ["kwadraat", "Een getal met zichzelf vermenigvuldigd: x^{2} = x · x."]
        ],
        vragen: [
          { q: "Tabel: y = 40, 30, 22, 16, 12 bij x = 0 tot en met 4. Welke vorm heeft de grafiek?", a: ["afnemend dalend", "toenemend dalend", "afnemend stijgend", "lineair dalend"], u: "De afnamen zijn 10, 8, 6, 4: ze worden kleiner. Dus afnemend dalend." },
          { q: "Wat gebeurt er met y = 5 · √x als x 4 keer zo groot wordt?", a: ["y wordt 2 keer zo groot", "y wordt 4 keer zo groot", "y wordt 16 keer zo groot", "y wordt 20 keer zo groot"], u: "√4 = 2, dus √x wordt 2 keer zo groot en y ook." },
          { q: "Wat gebeurt er met de oppervlakte A = 3,14 · r^{2} als de straal r 2 keer zo groot wordt?", a: ["A wordt 4 keer zo groot", "A wordt 2 keer zo groot", "A wordt 6,28 keer zo groot", "A wordt 8 keer zo groot"], u: "r^{2} wordt 2^{2} = 4 keer zo groot." },
          { q: "K = 20 + 500 / n. Welke beschrijving klopt als n toeneemt?", a: ["K is afnemend dalend", "K is toenemend dalend", "K is afnemend stijgend", "K is lineair dalend"], u: "500 / n wordt kleiner, maar steeds minder snel. Dus K daalt steeds langzamer." },
          { q: "Welke formule geeft een toenemend dalende grafiek voor x > 0?", a: ["y = 50 − 2x^{2}", "y = 50 + 2x^{2}", "y = 50 − 2√x", "y = 50 / x"], u: "2x^{2} stijgt steeds sneller. Met de min ervoor daalt y steeds sneller." },
          { q: "Volume van een kubus: V = r^{3}. De ribbe r wordt 10 keer zo groot. Hoeveel keer zo groot wordt V?", a: ["1000 keer", "10 keer", "30 keer", "100 keer"], u: "10^{3} = 1000." },
          { q: "N = 80 − 60 · 0,9^{t}. Welke redenering klopt?", a: ["0,9^{t} daalt, dus 60 · 0,9^{t} daalt, dus N stijgt.", "0,9^{t} daalt, dus N daalt.", "0,9^{t} stijgt, dus N stijgt.", "60 · 0,9^{t} stijgt, dus N daalt."], u: "Je trekt een steeds kleiner getal van 80 af, dus N wordt groter." },
          { q: "Tabel: y = 2, 7, 10, 12, 13 bij x = 0 tot en met 4. Welke formule past bij deze vorm?", a: ["een formule met √x, afnemend stijgend", "een formule met x^{2}, toenemend stijgend", "een formule met 1 / x, afnemend dalend", "een lineaire formule"], u: "De toenamen zijn 5, 3, 2, 1: afnemend stijgend. Dat past bij √x." }
        ],
        reken: [
          { q: "A = 3,14 · r^{2}. De straal wordt 3 keer zo groot. Hoeveel keer zo groot wordt A?", antwoord: 9, eenheid: "keer", hint: "Wat doet r^{2} als r 3 keer zo groot wordt?", stappen: ["r^{2} wordt 3^{2} = 9 keer zo groot", "3,14 verandert niet, dus A wordt 9 keer zo groot"] },
          { q: "y = 5 · √x. Hoeveel keer zo groot wordt y als x 9 keer zo groot wordt?", antwoord: 3, eenheid: "keer", hint: "√9 = …", stappen: ["√x wordt √9 = 3 keer zo groot", "y wordt dus 3 keer zo groot"] },
          { q: "Tabel: x = 0, 1, 2, 3, 4 en y = 3, 5, 9, 15, 23. Typ de vorm: toenemend stijgend, afnemend stijgend, toenemend dalend of afnemend dalend.", antwoord: ["toenemend stijgend"], hint: "Bereken de toenamen.", stappen: ["Toenamen: 2, 4, 6, 8", "Ze worden groter: toenemend stijgend"] },
          { q: "De reistijd is T = 600 / v (T in minuten, v in km/u). De snelheid wordt 1,5 keer zo groot. Met hoeveel procent neemt de reistijd af? Rond af op 1 decimaal.", antwoord: 33.3, tol: 0.1, eenheid: "%", hint: "T wordt 1,5 keer zo klein, dus T wordt vermenigvuldigd met 1 / 1,5.", stappen: ["T wordt 1 / 1,5 ≈ 0,6667 keer zo groot", "Afname: 1 − 0,6667 = 0,3333", "Dat is 33,3%"] },
          {
            gen: (R) => {
              const c = R.kies([{ f: "y = 4 · x^{2}", n: 2, ks: [2, 3, 4, 5, 10], x: "x", v: "y" }, { f: "V = 0,5 · r^{3}", n: 3, ks: [2, 3, 4, 10], x: "r", v: "V" }, { f: "y = 7 · √x", n: 0.5, ks: [4, 9, 16, 25, 100], x: "x", v: "y" }, { f: "P = 0,3 · v^{3}", n: 3, ks: [2, 3, 5], x: "v", v: "P" }]);
              const k = R.kies(c.ks), uit = Math.pow(k, c.n), v = c.v, x = c.x;
              return { q: `${c.f}. ${x} wordt ${k} keer zo groot. Hoeveel keer zo groot wordt ${v}?`, antwoord: uit, eenheid: "keer", hint: c.n === 0.5 ? `√${k} = …` : `${k}^{${c.n}} = …`, stappen: [c.n === 0.5 ? `√${x} wordt √${k} = ${uit} keer zo groot` : `${x}^{${c.n}} wordt ${k}^{${c.n}} = ${uit} keer zo groot`, `Het getal ervoor blijft gelijk, dus ${v} wordt ${uit} keer zo groot.`] };
            }
          },
          {
            gen: (R) => {
              const b = R.int(1, 4), c = 10 * R.int(2, 6), soort = R.int(0, 3);
              const vorm = ["toenemend stijgend", "afnemend stijgend", "toenemend dalend", "afnemend dalend"][soort];
              const f = [(x) => c + b * x * x, (x) => c + b * (8 * x - x * x), (x) => c + 40 - b * x * x, (x) => c + 40 - b * (8 * x - x * x)][soort];
              const ys = [0, 1, 2, 3, 4].map(f), d = ys.slice(1).map((y, i) => y - ys[i]);
              return { q: `Tabel: x = 0, 1, 2, 3, 4 en y = ${ys.join(", ")}. Typ de vorm: toenemend stijgend, afnemend stijgend, toenemend dalend of afnemend dalend.`, antwoord: [vorm], hint: "Bereken de verschillen tussen opeenvolgende y-waarden.", stappen: [`Verschillen: ${d.map((x) => (x > 0 ? "+" : "−") + Math.abs(x)).join(", ")}`, `${d[0] > 0 ? "Stijgend" : "Dalend"}, en de verschillen worden ${Math.abs(d[3]) > Math.abs(d[0]) ? "groter" : "kleiner"}: ${vorm}.`] };
            }
          }
        ],
        oefen: [
          { type: "sorteer", q: "Welke vorm heeft de grafiek voor x > 0?", groepen: ["toenemend stijgend", "afnemend stijgend", "toenemend dalend", "afnemend dalend"], items: [["y = x^{2}", 0], ["y = 1,2^{x}", 0], ["y = √x", 1], ["y = 80 − 60 · 0,9^{x}", 1], ["y = 100 − x^{2}", 2], ["y = 10 / x", 3], ["y = 50 · 0,8^{x}", 3], ["y = 20 − √x", 2]], u: "Kijk eerst naar het binnenste deel en let dan op een min ervoor: die draait stijgen en dalen om." },
          { type: "volgorde", q: "Zet de redenering bij K = 20 + 500 / n (n wordt groter) in de goede volgorde.", items: ["n wordt groter", "500 / n wordt kleiner", "de afname van 500 / n wordt ook steeds kleiner", "K daalt steeds langzamer: afnemend dalend"], u: "Van binnen naar buiten redeneren." },
          { type: "koppel", q: "Koppel de verandering aan het gevolg.", paren: [["x 2 keer zo groot in y = x^{2}", "y 4 keer zo groot"], ["x 4 keer zo groot in y = √x", "y 2 keer zo groot"], ["x 2 keer zo groot in y = 6 / x", "y 2 keer zo klein"], ["x 2 keer zo groot in y = x^{3}", "y 8 keer zo groot"]], u: "Gebruik k^{n}: bij een kwadraat 2^{2}, bij een wortel √4, bij 1 / x het omgekeerde." }
        ],
        open: [
          { q: "Een pizzeria verkoopt een pizza met diameter 30 cm voor € 10 en een pizza met diameter 60 cm voor € 20. Een klant zegt: 'De grote pizza is twee keer zo groot en kost twee keer zoveel, dus maakt het niet uit.' Leg uit waarom deze conclusie niet klopt.", a: "De oppervlakte van een cirkel is A = 3,14 · r^{2}. Als de diameter (en dus de straal) 2 keer zo groot wordt, wordt de oppervlakte 2^{2} = 4 keer zo groot. Je krijgt dus 4 keer zoveel pizza voor 2 keer de prijs: de grote pizza is per cm^{2} de helft goedkoper.", punten: ["oppervlakte gaat met r^{2}", "2 keer de straal geeft 4 keer de oppervlakte", "grote pizza is per cm² goedkoper"] }
        ],
        widgets: ["formulelab"]
      },

      // ------------------------------------------------------------------ 11.4
      {
        id: "h11-4", nr: "11.4", titel: "Formules met machten",
        kern: [
          "Een [[machtsformule]] heeft de vorm y = a · x^{n}. Het getal n heet de [[exponent]].",
          { fig: "machten", bij: "x^{2} stijgt toenemend, √x = x^{0,5} stijgt afnemend en 1 / x = x^{−1} daalt afnemend." },
          { tabel: { kop: ["exponent n", "vorm (x > 0)", "voorbeeld"], rijen: [["n > 1", "toenemend stijgend", "y = x^{2}, y = x^{1,5}"], ["n = 1", "recht evenredig", "y = 3x"], ["0 < n < 1", "afnemend stijgend", "y = x^{0,5} = √x"], ["n < 0", "afnemend dalend", "y = x^{−1} = 1 / x"]] } },
          { kop: "Rekenregels die je moet kennen" },
          { formule: "x^{0,5} = √x · x^{−1} = 1 / x · x^{−2} = 1 / x^{2} · x^{1,5} = x · √x" },
          { kop: "Vergelijkingen met een macht" },
          "Bij a · x^{n} = c deel je eerst door a. Daarna los je x^{n} = getal op met de omgekeerde bewerking: de n-de [[wortel]], of x = getal^{1/n}.",
          { voorbeeld: { titel: "Algebraïsch oplossen", stappen: ["2x^{3} = 250", "x^{3} = 250 / 2 = 125", "x = 125^{1/3} = 5 (want 5 · 5 · 5 = 125)"] } },
          { voorbeeld: { titel: "Een macht met een kommagetal", stappen: ["4 · x^{1,5} = 108", "x^{1,5} = 27", "x = 27^{1 / 1,5} = 27^{2/3} = 9", "Controle: 9^{1,5} = 9 · √9 = 27"] } },
          { tip: "Met de grafische rekenmachine kan het altijd: voer Y1 = 4x^{1,5} en Y2 = 108 in en zoek het snijpunt." },
          { let: "Bij x^{2} = 49 zijn er twee oplossingen: x = 7 en x = −7. In een context (een lengte, een tijd) valt de negatieve oplossing meestal af." },
          { widget: "formulelab" },
          { widget: "omwerk" }
        ],
        begrippen: [
          ["machtsformule", "Formule van de vorm y = a · x^{n}."],
          ["exponent", "Het getal n in x^{n}: hoe vaak je met x vermenigvuldigt."],
          ["grondtal", "Het getal x in x^{n} dat je met zichzelf vermenigvuldigt."],
          ["wortel", "Omgekeerde van een macht: √x = x^{0,5}, en de derdemachtswortel hoort bij x^{3}."],
          ["negatieve exponent", "x^{−n} = 1 / x^{n}."],
          ["gebroken exponent", "Exponent als 0,5 of 1,5: x^{0,5} = √x en x^{1,5} = x · √x."],
          ["machtsvergelijking", "Vergelijking als a · x^{n} = c, die je oplost met x = (c / a)^{1/n}."],
          ["snijpunt (GR)", "Optie van de grafische rekenmachine om te vinden waar twee grafieken gelijk zijn."]
        ],
        vragen: [
          { q: "Hoe schrijf je √x als macht?", a: ["x^{0,5}", "x^{2}", "x^{−1}", "x^{−2}"], u: "Een wortel is een macht met exponent ½ = 0,5." },
          { q: "Hoe schrijf je 1 / x^{2} als macht?", a: ["x^{−2}", "x^{0,5}", "x^{2}", "−x^{2}"], u: "Een macht in de noemer krijgt een negatieve exponent: 1 / x^{2} = x^{−2}." },
          { q: "Los op: 2x^{3} = 250.", a: ["x = 5", "x = 125", "x ≈ 6,3", "x = 41,7"], u: "x^{3} = 125, dus x = 5. Wie eerst de derdemachtswortel van 250 neemt en daarna deelt, krijgt een fout antwoord." },
          { q: "Welke vorm heeft de grafiek van y = 3 · x^{0,7} voor x > 0?", a: ["afnemend stijgend", "toenemend stijgend", "afnemend dalend", "rechte lijn"], u: "De exponent ligt tussen 0 en 1, dus afnemend stijgend, net als √x." },
          { q: "Welke vorm heeft de grafiek van y = 8 · x^{−1,5} voor x > 0?", a: ["afnemend dalend", "toenemend dalend", "afnemend stijgend", "toenemend stijgend"], u: "Een negatieve exponent geeft een dalende grafiek die steeds vlakker wordt." },
          { q: "Wat is 16^{1,5}?", a: ["64", "24", "256", "4"], u: "16^{1,5} = 16 · √16 = 16 · 4 = 64." },
          { q: "Los op: x^{2} = 49 met x een lengte in cm.", a: ["x = 7", "x = 7 of x = −7", "x = 24,5", "x = 2401"], u: "Wiskundig zijn er twee oplossingen, maar een lengte kan niet negatief zijn. Dus x = 7." },
          { q: "Je lost 4 · x^{1,5} = 108 op. Wat is de eerste stap?", a: ["beide kanten delen door 4", "beide kanten tot de macht 1,5", "de wortel nemen van 108", "1,5 aftrekken van beide kanten"], u: "Haal eerst de 4 weg; pas als de macht alleen staat, gebruik je de omgekeerde bewerking." }
        ],
        reken: [
          { q: "Los algebraïsch op: 2x^{3} = 250.", antwoord: 5, hint: "Deel eerst door 2.", stappen: ["x^{3} = 125", "x = 125^{1/3} = 5"] },
          { q: "Los op: 4 · x^{1,5} = 108.", antwoord: 9, hint: "Deel door 4 en gebruik dan x = getal^{1 / 1,5}.", stappen: ["x^{1,5} = 27", "x = 27^{1 / 1,5} = 27^{2/3}", "x = 9 (controle: 9 · √9 = 27)"] },
          { q: "Het vermogen van een windmolen is P = 0,3 · v^{3} (P in kW, v in m/s). Bij welke windsnelheid is het vermogen 81 kW? Rond af op 1 decimaal.", antwoord: 6.5, tol: 0.1, eenheid: "m/s", hint: "Deel door 0,3 en neem de derdemachtswortel.", stappen: ["v^{3} = 81 / 0,3 = 270", "v = 270^{1/3} ≈ 6,46", "Afgerond: 6,5 m/s"] },
          { q: "y = 12 · x^{−1}. Bereken y bij x = 0,5.", antwoord: 24, hint: "x^{−1} = 1 / x.", stappen: ["0,5^{−1} = 1 / 0,5 = 2", "y = 12 · 2 = 24"] },
          { q: "Schrijf √x als macht van x. Typ bijvoorbeeld x^3.", antwoord: ["x^0,5", "x^0.5", "x^(1/2)", "x^½"], hint: "Een wortel is een halve macht.", stappen: ["√x = x^{½} = x^{0,5}"] },
          {
            gen: (R) => {
              const n = R.kies([2, 3]), x = n === 2 ? R.int(3, 15) : R.int(2, 8), a = R.kies([2, 3, 4, 5, 0.5]), c = a * Math.pow(x, n);
              return { q: `Los algebraïsch op: ${nl(a)} · x^{${n}} = ${nl(c)}, met x > 0.`, antwoord: x, hint: `Deel eerst door ${nl(a)}.`, stappen: [`x^{${n}} = ${nl(c)} / ${nl(a)} = ${nl(Math.pow(x, n))}`, n === 2 ? `x = √${nl(Math.pow(x, n))} = ${x}` : `x = ${nl(Math.pow(x, n))}^{1/3} = ${x}`] };
            }
          },
          {
            gen: (R) => {
              const c = R.kies([{ n: 1.5, s: "1,5" }, { n: 0.5, s: "0,5" }, { n: -1, s: "−1" }, { n: 2.5, s: "2,5" }]), x = R.kies([4, 9, 16, 25]), a = R.kies([2, 3, 5, 0.5, 1.2]);
              const y = R.rond(a * Math.pow(x, c.n), 2), w = Math.sqrt(x);
              const uitleg = c.n === 1.5 ? `${x}^{1,5} = ${x} · √${x} = ${x} · ${w} = ${x * w}` : c.n === 0.5 ? `${x}^{0,5} = √${x} = ${w}` : c.n === -1 ? `${x}^{−1} = 1 / ${x} = ${nl(1 / x)}` : `${x}^{2,5} = ${x}^{2} · √${x} = ${x * x} · ${w} = ${x * x * w}`;
              return { q: `y = ${nl(a)} · x^{${c.s}}. Bereken y bij x = ${x}. Rond af op 2 decimalen als dat nodig is.`, antwoord: y, tol: 0.01, hint: "Bereken eerst de macht.", stappen: [uitleg, `y = ${nl(a)} · ${nl(R.rond(Math.pow(x, c.n), 4))} = ${nl(y)}`] };
            }
          }
        ],
        oefen: [
          { type: "koppel", q: "Koppel de wortel- of breukvorm aan de macht.", paren: [["√x", "x^{0,5}"], ["1 / x", "x^{−1}"], ["1 / x^{2}", "x^{−2}"], ["x · √x", "x^{1,5}"], ["x · x · x", "x^{3}"]], u: "Wortel = exponent 0,5; in de noemer = negatieve exponent; exponenten tel je op bij vermenigvuldigen." },
          { type: "volgorde", q: "Zet de stappen om 3x^{4} = 768 op te lossen in de goede volgorde.", items: ["Deel beide kanten door 3: x^{4} = 256", "Gebruik de omgekeerde bewerking: x = 256^{1/4}", "Bereken: x = 4 of x = −4", "Kijk in de context of de negatieve oplossing afvalt"], u: "Eerst het getal voor de macht weg, dan de macht ongedaan maken." }
        ],
        open: [
          { q: "Een leerling lost 2x^{3} = 250 zo op: 'Derdemachtswortel van 250 is 6,3, gedeeld door 2 is 3,15. Dus x = 3,15.' Leg uit wat er mis gaat.", a: "De macht hoort alleen bij x, niet bij de 2. Je moet eerst de 2 weghalen door te delen: x^{3} = 125. Pas daarna neem je de derdemachtswortel: x = 5. De leerling doet de bewerkingen in de verkeerde volgorde. Controle: 2 · 3,15^{3} ≈ 62,5 en dat is geen 250.", punten: ["eerst delen door 2", "dan derdemachtswortel: x = 5", "controle laat zien dat 3,15 niet klopt"] }
        ],
        widgets: ["formulelab", "omwerk"]
      },

      // ------------------------------------------------------------------ 11.5
      {
        id: "h11-5", nr: "11.5", titel: "Formules met meer variabelen",
        kern: [
          "Veel formules hebben meer dan twee variabelen, zoals de BMI: BMI = G / L^{2} met G het gewicht in kg en L de lengte in meter.",
          "Je kunt waarden [[invullen]] (substitueren) om een uitkomst te berekenen. Houd je een variabele constant, dan zie je het verband tussen de andere twee.",
          { voorbeeld: { titel: "Invullen", stappen: ["G = 72 kg en L = 1,80 m.", "L^{2} = 1,80 · 1,80 = 3,24.", "BMI = 72 / 3,24 ≈ 22,2."] } },
          { kop: "Een variabele vrijmaken" },
          "Bij [[vrijmaken]] schrijf je de formule zo dat de gevraagde variabele alleen aan één kant staat. Je doet aan beide kanten dezelfde omgekeerde bewerking, van buiten naar binnen.",
          { voorbeeld: { titel: "L vrijmaken uit BMI = G / L^{2}", stappen: ["Vermenigvuldig beide kanten met L^{2}: BMI · L^{2} = G.", "Deel beide kanten door BMI: L^{2} = G / BMI.", "Neem de wortel: L = √(G / BMI)."] } },
          { widget: "omwerk" },
          { kop: "Formules combineren" },
          "Hangt een variabele in de ene formule af van een andere formule, dan kun je die invullen. Zo krijg je één formule met minder variabelen.",
          { voorbeeld: { titel: "Kosten van een feest", stappen: ["Kosten K = 15 + 0,4 · m, met m het aantal munten.", "Het aantal munten hangt af van het aantal gasten: m = 12 · g.", "Invullen: K = 15 + 0,4 · 12 · g = 15 + 4,8g.", "Bij 50 gasten: K = 15 + 4,8 · 50 = 255 euro."] } },
          { let: "Zet haakjes als je een som of een product invult. Uit y = 3x − 2 en x = t + 4 volgt y = 3(t + 4) − 2 = 3t + 10, en niet 3t + 4 − 2." },
          { tip: "Controleer een vrijgemaakte formule met getallen: kies waarden, reken de uitkomst uit met de oude formule en kijk of de nieuwe formule terugrekent naar je startwaarde." }
        ],
        begrippen: [
          ["variabele", "Grootheid in een formule die verschillende waarden kan aannemen."],
          ["invullen (substitueren)", "Een getal of een formule in de plaats van een variabele zetten."],
          ["vrijmaken", "De formule herschrijven zodat één variabele alleen aan één kant van het =-teken staat."],
          ["omgekeerde bewerking", "Bewerking die een andere ongedaan maakt: delen tegenover vermenigvuldigen, wortel tegenover kwadraat."],
          ["formules combineren", "De ene formule in de andere invullen, zodat er één formule met minder variabelen overblijft."],
          ["constante", "Vast getal of een variabele die je even vast houdt."],
          ["woordformule", "Formule met woorden in plaats van letters, zoals kosten = vastrecht + prijs × verbruik."],
          ["BMI", "Body mass index: gewicht in kg gedeeld door het kwadraat van de lengte in meter."]
        ],
        vragen: [
          { q: "Maak t vrij uit v = s / t.", a: ["t = s / v", "t = v / s", "t = s · v", "t = v − s"], u: "Vermenigvuldig met t: v · t = s. Deel door v: t = s / v." },
          { q: "Maak G vrij uit BMI = G / L^{2}.", a: ["G = BMI · L^{2}", "G = BMI / L^{2}", "G = L^{2} / BMI", "G = √(BMI · L)"], u: "Vermenigvuldig beide kanten met L^{2}." },
          { q: "Maak L vrij uit BMI = G / L^{2}.", a: ["L = √(G / BMI)", "L = G / BMI^{2}", "L = √(BMI / G)", "L = G / (2 · BMI)"], u: "L^{2} = G / BMI, dus L = √(G / BMI)." },
          { q: "y = 3x − 2 en x = t + 4. Welke formule geeft y in t?", a: ["y = 3t + 10", "y = 3t + 2", "y = 3t − 6", "y = 3t + 14"], u: "y = 3(t + 4) − 2 = 3t + 12 − 2 = 3t + 10. Zonder haakjes krijg je 3t + 2." },
          { q: "Bij een rechthoek is de omtrek O = 2l + 2b. Maak b vrij.", a: ["b = (O − 2l) / 2", "b = O / 2 − 2l", "b = O − l", "b = (O − l) / 2"], u: "2b = O − 2l, dus b = (O − 2l) / 2 (of O / 2 − l)." },
          { q: "BMI = G / L^{2}. Iemand van 1,60 m heeft een BMI van 25. Wat is het gewicht?", a: ["64 kg", "40 kg", "15,6 kg", "100 kg"], u: "G = BMI · L^{2} = 25 · 2,56 = 64. Wie vergeet te kwadrateren, krijgt 25 · 1,6 = 40." },
          { q: "K = 15 + 0,4m en m = 12g. Welke formule geeft K uitgedrukt in g?", a: ["K = 15 + 4,8g", "K = 15,4 + 12g", "K = 180 + 4,8g", "K = 27 + 0,4g"], u: "K = 15 + 0,4 · 12g = 15 + 4,8g." },
          { q: "In BMI = G / L^{2} houd je L constant. Welk verband is er dan tussen BMI en G?", a: ["recht evenredig", "omgekeerd evenredig", "kwadratisch", "geen verband"], u: "Met vaste L is 1 / L^{2} een vast getal: BMI = (1 / L^{2}) · G, dus recht evenredig." }
        ],
        reken: [
          { q: "BMI = G / L^{2}. Bereken de BMI van iemand van 72 kg en 1,80 m. Rond af op 1 decimaal.", antwoord: 22.2, tol: 0.1, hint: "Kwadrateer eerst de lengte.", stappen: ["L^{2} = 1,80^{2} = 3,24", "BMI = 72 / 3,24 ≈ 22,2"] },
          { q: "Hoe lang is iemand van 90 kg met een BMI van 25? Rond af op 2 decimalen.", antwoord: 1.9, tol: 0.01, eenheid: "m", hint: "L = √(G / BMI).", stappen: ["L^{2} = 90 / 25 = 3,6", "L = √3,6 ≈ 1,897", "Afgerond: 1,90 m"] },
          { q: "K = 15 + 0,4m en m = 120d (K in euro, d het aantal dagen). Bereken K bij d = 3.", antwoord: 159, eenheid: "euro", hint: "Bereken eerst m.", stappen: ["m = 120 · 3 = 360", "K = 15 + 0,4 · 360 = 15 + 144 = 159"] },
          { q: "Maak t vrij uit v = s / t. Typ de formule, bijvoorbeeld a=b/c.", antwoord: ["t=s/v", "t=s:v"], hint: "Vermenigvuldig eerst beide kanten met t.", stappen: ["v · t = s", "t = s / v"] },
          { q: "De oppervlakte van een driehoek is A = 0,5 · b · h. Bij een bepaalde soort driehoek is h = 2b. Druk A uit in b. Typ de formule, bijvoorbeeld A=3b^2.", antwoord: ["A=b^2", "A=b²", "A=b*b", "A=1b^2"], hint: "Vul h = 2b in.", stappen: ["A = 0,5 · b · 2b", "A = b^{2}"] },
          {
            gen: (R) => {
              const G = R.int(48, 105), L = R.int(155, 200) / 100, bmi = R.rond(G / (L * L), 1);
              return { q: `BMI = G / L^{2}. Bereken de BMI van iemand van ${G} kg en ${nl(L, 2)} m. Rond af op 1 decimaal.`, antwoord: bmi, tol: 0.1, hint: "Eerst L^{2}, dan delen.", stappen: [`L^{2} = ${nl(L, 2)}^{2} = ${nl(R.rond(L * L, 4))}`, `BMI = ${G} / ${nl(R.rond(L * L, 4))} ≈ ${nl(bmi)}`] };
            }
          },
          {
            gen: (R) => {
              const p = R.int(5, 40), q = R.kies([0.2, 0.25, 0.5, 1.5, 2, 3]), r = R.kies([4, 5, 6, 8, 10, 12]), t = R.int(2, 9);
              const x = r * t, y = R.rond(p + q * x, 2);
              return { q: `De kosten zijn K = ${p} + ${nl(q)} · x, met x het aantal kilometers. Het aantal kilometers is x = ${r} · t, met t de rijtijd in uren. Bereken K bij t = ${t}.`, antwoord: y, hint: "Bereken eerst x, of maak eerst één formule in t.", stappen: [`x = ${r} · ${t} = ${x}`, `K = ${p} + ${nl(q)} · ${x} = ${nl(y)}`, `Als één formule: K = ${p} + ${nl(R.rond(q * r, 4))} · t`] };
            }
          }
        ],
        oefen: [
          { type: "volgorde", q: "Zet de stappen om L vrij te maken uit BMI = G / L^{2} in de goede volgorde.", items: ["BMI = G / L^{2}", "BMI · L^{2} = G", "L^{2} = G / BMI", "L = √(G / BMI)"], u: "Eerst de breuk weg (vermenigvuldigen), dan delen, dan pas de wortel." },
          { type: "koppel", q: "Koppel de formule aan de vrijgemaakte vorm.", paren: [["v = s / t, maak s vrij", "s = v · t"], ["A = l · b, maak b vrij", "b = A / l"], ["y = 4x + 6, maak x vrij", "x = (y − 6) / 4"], ["A = 3r^{2}, maak r vrij", "r = √(A / 3)"]], u: "Werk met omgekeerde bewerkingen en doe ze aan beide kanten." }
        ],
        open: [
          { q: "Een leerling maakt L vrij uit BMI = G / L^{2} en schrijft L = G / BMI^{2}. Leg uit wat er mis gaat en geef de goede formule.", a: "De leerling verplaatst het kwadraat naar de verkeerde variabele. Correct: vermenigvuldig met L^{2} (BMI · L^{2} = G), deel door BMI (L^{2} = G / BMI) en neem de wortel: L = √(G / BMI). Controle met getallen: G = 81, L = 1,8 geeft BMI = 25; √(81 / 25) = 1,8 klopt, maar 81 / 25^{2} ≈ 0,13 niet.", punten: ["kwadraat hoort bij L, niet bij BMI", "stappen: × L², ÷ BMI, wortel", "controle met getallen"] }
        ],
        widgets: ["omwerk"]
      }
    ]
  });
})();
