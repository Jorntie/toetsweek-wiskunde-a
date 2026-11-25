// H13 Conclusies uit data. Paragraafindeling volgens de inhoudsopgave van Moderne Wiskunde 12e editie havo A (13.1 t/m 13.5).
// Het extra onderdeel h13-6 herhaalt steekproeven, de normale verdeling en het betrouwbaarheidsinterval.
// Ids nooit wijzigen (de voortgang hangt eraan); nr en titel mag je aanpassen.
(function () {
  "use strict";
  const nl = TW.nl, W = TW.wa;
  const r2 = (x) => nl(TW.R.rond(x, 2), 2), r3 = (x) => nl(TW.R.rond(x, 3), 3);

  TW.hoofdstuk({
    id: "h13", nr: "H13", titel: "Conclusies uit data", icoon: "📊",
    intro: "Percenteren, soorten gegevens en twee groepen vergelijken: met plaatjes (boxplot, cumulatieve polygoon) en met formules (effectgrootte, phi). De vuistregels staan op het formuleblad; je moet ze wel goed kunnen toepassen, ook op de grenzen.",
    onderdelen: [
      // ------------------------------------------------------------------ 13.1
      {
        id: "h13-1", nr: "13.1", titel: "Percenteren",
        kern: [
          "Bij [[percenteren]] reken je aantallen om naar percentages, zodat je groepen van verschillende grootte eerlijk kunt vergelijken.",
          "Een [[kruistabel]] zet twee variabelen tegen elkaar uit: elke cel telt hoeveel waarnemingen bij die combinatie horen.",
          { formule: "percentage = deel / geheel × 100%" },
          { kop: "Wat stel je op 100%?" },
          "Bij [[rijpercentages]] is elk rijtotaal 100%, bij [[kolompercentages]] elk kolomtotaal. Je kunt ook alles delen door het totaal van de hele tabel.",
          { tip: "Wil je twee groepen vergelijken, dan stel je per groep het groepstotaal op 100%. Staan de groepen in de rijen, dan reken je dus rijpercentages uit." },
          { tabel: { kop: ["", "bijbaan", "geen bijbaan", "totaal"], rijen: [["jongens", "78", "42", "120"], ["meisjes", "60", "20", "80"], ["totaal", "138", "62", "200"]] } },
          { voorbeeld: { titel: "Hebben jongens vaker een bijbaan?", stappen: ["In absolute aantallen hebben meer jongens een bijbaan: 78 tegen 60. Maar er zijn ook meer jongens.", "Jongens: 78 / 120 × 100% = 65%.", "Meisjes: 60 / 80 × 100% = 75%.", "Conclusie: bij de meisjes heeft een groter deel een bijbaan, 10 procentpunt meer dan bij de jongens."] } },
          { widget: "percenteren" },
          { kop: "Procent en procentpunt" },
          "Het verschil tussen twee percentages geef je in [[procentpunt]]. Van 65% naar 75% is 10 procentpunt erbij, maar dat is (75 − 65) / 65 × 100% ≈ 15,4% meer.",
          { formule: "procentuele verandering = (nieuw − oud) / oud × 100%" },
          "Bij een toename van p% is de [[groeifactor]] 1 + p/100; bij een afname van p% is die 1 − p/100. Nieuw = oud × groeifactor.",
          { let: "Terugrekenen gaat met delen: kost iets na 20% korting € 48, dan was de prijs 48 / 0,8 = € 60 en niet 48 × 1,2." }
        ],
        begrippen: [
          ["percenteren", "Aantallen omrekenen naar percentages van een geheel, zodat je groepen van verschillende grootte kunt vergelijken."],
          ["kruistabel", "Tabel waarin twee variabelen tegen elkaar zijn uitgezet; elke cel geeft het aantal bij een combinatie."],
          ["rijpercentage", "Percentage van het rijtotaal: elk rijtotaal is 100%."],
          ["kolompercentage", "Percentage van het kolomtotaal: elk kolomtotaal is 100%."],
          ["absoluut aantal", "Het echte aantal, zonder het te vergelijken met een totaal."],
          ["relatief aantal", "Een aantal als deel van een geheel, meestal als percentage of proportie."],
          ["procentpunt", "Eenheid voor het verschil tussen twee percentages: van 30% naar 35% is 5 procentpunt."],
          ["procentuele verandering", "(nieuw − oud) / oud × 100%: hoeveel procent iets groter of kleiner is geworden."],
          ["groeifactor", "Getal waarmee je vermenigvuldigt: 1,08 bij 8% erbij, 0,85 bij 15% eraf."]
        ],
        vragen: [
          { q: "In klas A fietsen 18 van de 24 leerlingen naar school, in klas B 21 van de 30. Welke conclusie klopt?", a: ["In klas A fietst een groter deel: 75% tegen 70%.", "In klas B fietst een groter deel, want 21 is meer dan 18.", "In klas B fietst een groter deel: 75% tegen 70%.", "Er is geen verschil: in beide klassen fietst ongeveer driekwart."], u: "18 / 24 = 0,75 = 75% en 21 / 30 = 0,70 = 70%. Absolute aantallen vergelijken mag niet, want de klassen zijn niet even groot." },
          { q: "Het percentage leerlingen dat ontbijt stijgt van 40% naar 50%. Welke beschrijving klopt?", a: ["10 procentpunt erbij, dat is 25% meer", "10% erbij, dat is 10 procentpunt meer", "25 procentpunt erbij, dat is 10% meer", "10 procentpunt erbij, dat is 20% meer"], u: "50 − 40 = 10 procentpunt. Procentueel: 10 / 40 × 100% = 25%. Deel door de oude waarde (40), niet door de nieuwe (50 geeft 20%)." },
          { q: "Een abonnement wordt 8% duurder. Met welke groeifactor vermenigvuldig je de oude prijs?", a: ["1,08", "0,08", "8", "0,92"], u: "100% + 8% = 108% = 1,08. Met 0,08 reken je alleen de prijsstijging uit, 0,92 hoort bij 8% korting." },
          { q: "De prijs van een spelcomputer daalt met 15%. Wat is de groeifactor?", a: ["0,85", "1,15", "0,15", "−0,15"], u: "100% − 15% = 85% = 0,85. Een groeifactor is nooit negatief; 1,15 hoort bij een stijging." },
          { q: "Je wilt weten of meisjes vaker sporten dan jongens. Wat stel je in de kruistabel op 100%?", a: ["Het aantal jongens en het aantal meisjes, elk apart", "Het totale aantal sporters in de tabel", "Het totaal van de hele tabel", "Het aantal jongens dat sport en het aantal meisjes dat sport"], u: "Je vergelijkt jongens met meisjes, dus reken je per groep uit welk deel sport: het groepstotaal is 100%." },
          { q: "Een jas kost na 20% korting € 48. Wat was de oorspronkelijke prijs?", a: ["€ 60,00", "€ 57,60", "€ 68,00", "€ 38,40"], u: "Na korting betaal je 80%: oud × 0,8 = 48, dus oud = 48 / 0,8 = 60. 48 × 1,2 = 57,60 is fout: 20% van 48 is minder dan 20% van 60." },
          { q: "Een prijs gaat eerst 10% omhoog en daarna 10% omlaag. Hoe verhoudt de eindprijs zich tot de beginprijs?", a: ["1% lager dan het begin", "precies gelijk aan het begin", "1% hoger dan het begin", "20% lager dan het begin"], u: "1,10 × 0,90 = 0,99. De daling van 10% is over een groter bedrag dan de stijging, dus je houdt 99% over." },
          { q: "Bij welke manier van percenteren is elk kolomtotaal 100%?", a: ["kolompercentages", "rijpercentages", "percentages van het totaal", "absolute aantallen"], u: "De naam zegt het al: bij kolompercentages deel je elke cel door het totaal van zijn kolom." },
          { q: "In een tabel staat: 'aandeel rokers onder jongeren daalde van 12% naar 9%'. Hoeveel procent is het aandeel gedaald?", a: ["25%", "3%", "33%", "75%"], u: "De daling is 3 procentpunt. Procentueel: 3 / 12 × 100% = 25%. 3 / 9 ≈ 33% is fout, want je deelt door de oude waarde." }
        ],
        reken: [
          { q: "Van de 250 leerlingen van een school komen er 85 met de fiets. Hoeveel procent is dat?", antwoord: 34, eenheid: "%", hint: "Deel het deel door het geheel en vermenigvuldig met 100.", stappen: ["85 / 250 = 0,34", "0,34 × 100% = 34%"] },
          { q: "Een sportschool had 1250 leden en nu 1400. Bereken de procentuele toename.", antwoord: 12, eenheid: "%", hint: "Toename gedeeld door de oude waarde.", stappen: ["Toename: 1400 − 1250 = 150", "150 / 1250 × 100% = 12%"] },
          { q: "In de bovenbouw komen 96 van de 160 leerlingen met de fiets, in de onderbouw 192 van de 240. Hoeveel procentpunt is het verschil tussen de percentages fietsers?", antwoord: 20, eenheid: "procentpunt", hint: "Reken eerst beide percentages uit en trek ze van elkaar af.", stappen: ["Bovenbouw: 96 / 160 × 100% = 60%", "Onderbouw: 192 / 240 × 100% = 80%", "Verschil: 80 − 60 = 20 procentpunt"] },
          { q: "Na een prijsstijging van 6% kost een abonnement € 26,50 per maand. Wat kostte het abonnement eerst?", antwoord: 25, eenheid: "euro", hint: "Oud × 1,06 = 26,50. Reken terug met delen.", stappen: ["Groeifactor bij 6% erbij: 1,06", "oud = 26,50 / 1,06 = 25", "Het abonnement kostte € 25,00."] },
          { q: "Van de 130 ondervraagde jongeren hebben er 47 een bijbaan. Hoeveel procent is dat? Rond af op 1 decimaal.", antwoord: 36.2, tol: 0.1, eenheid: "%", hint: "47 / 130 × 100%.", stappen: ["47 / 130 = 0,36153…", "× 100% = 36,153…%", "Afgerond: 36,2%"] },
          {
            gen: (R) => {
              const c = R.kies([["bezoekers van een festival", "kochten een muntkaart"], ["leerlingen van een school", "hebben een bijbaan"], ["deelnemers aan een enquête", "kijken dagelijks naar het nieuws"], ["klanten van een webwinkel", "gaven vijf sterren"]]);
              const n = R.kies([200, 400, 500, 800]), p = R.int(6, 94), k = (n * p) / 100;
              return { q: `Van de ${n} ${c[0]} ${c[1]} er ${k}. Hoeveel procent is dat?`, antwoord: p, eenheid: "%", hint: "Deel door het totaal en vermenigvuldig met 100.", stappen: [`${k} / ${n} = ${nl(p / 100)}`, `${nl(p / 100)} × 100% = ${p}%`] };
            }
          },
          {
            gen: (R) => {
              const oud = 50 * R.int(4, 30), p = R.kies([-24, -20, -16, -12, -10, -8, -6, -4, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 30]), nieuw = oud + (oud * p) / 100;
              const c = R.kies(["Het aantal abonnees", "Het aantal bezoekers per week", "Het aantal verkochte kaartjes"]);
              return { q: `${c} ging van ${oud} naar ${nieuw}. Bereken de procentuele verandering. Geef een daling met een minteken.`, antwoord: p, eenheid: "%", hint: "(nieuw − oud) / oud × 100%.", stappen: [`nieuw − oud = ${nieuw} − ${oud} = ${nl(nieuw - oud)}`, `${nl(nieuw - oud)} / ${oud} × 100% = ${nl(p)}%`, p < 0 ? `Het is een daling van ${-p}%.` : `Het is een stijging van ${p}%.`] };
            }
          }
        ],
        oefen: [
          { type: "sorteer", q: "Gaat de uitspraak over een absoluut of over een relatief aantal?", groepen: ["absoluut", "relatief"], items: [["78 jongens hebben een bijbaan", 0], ["65% van de jongens heeft een bijbaan", 1], ["2 op de 5 leerlingen fietst", 1], ["Er kwamen 1400 bezoekers", 0], ["Het aandeel daalde met 3 procentpunt", 1], ["Er zijn 42 meisjes zonder bijbaan", 0]], u: "Een absoluut aantal is een echt aantal. Relatief betekent: als deel van een geheel (procent, proportie, 'op de')." },
          { type: "invul", q: "Vul in.", tekst: "Van 20% naar 25% is een stijging van 5 {procentpunt}. Procentueel is dat een stijging van {25}%, want je deelt het verschil door de {oude} waarde.", extra: ["procent", "20", "nieuwe"], u: "5 / 20 × 100% = 25%. Bij een procentuele verandering deel je altijd door de oude waarde." },
          { type: "volgorde", q: "Zet de stappen in de goede volgorde om twee groepen in een kruistabel te vergelijken.", items: ["Bepaal welke groepen je vergelijkt", "Stel per groep het groepstotaal op 100%", "Reken per groep het percentage uit", "Vergelijk de percentages in procentpunten", "Trek een conclusie in woorden"], u: "Eerst bepalen wat je vergelijkt; daarvan hangt af of je rij- of kolompercentages nodig hebt." }
        ],
        open: [
          { q: "Een schoolkrant schrijft bij de tabel van de bijbanen (jongens 78 van de 120, meisjes 60 van de 80): 'Jongens werken vaker dan meisjes: 78 jongens hebben een bijbaan tegen maar 60 meisjes.' Leg uit waarom deze conclusie niet klopt.", a: "De krant vergelijkt absolute aantallen, maar er zijn meer jongens (120) dan meisjes (80). Je moet per groep het percentage uitrekenen: 78 / 120 = 65% van de jongens en 60 / 80 = 75% van de meisjes heeft een bijbaan. Relatief hebben meisjes dus vaker een bijbaan, 10 procentpunt meer.", punten: ["groepen zijn niet even groot", "percentages per groep: 65% en 75%", "conclusie omgekeerd: meisjes relatief vaker"] }
        ],
        widgets: ["percenteren"]
      },

      // ------------------------------------------------------------------ 13.2
      {
        id: "h13-2", nr: "13.2", titel: "Continu, discreet, nominaal en ordinaal",
        kern: [
          "Elke [[variabele]] in een onderzoek heeft een meetniveau. Dat bepaalt welke diagrammen en welke maten je mag gebruiken.",
          "Een [[kwalitatieve variabele]] heeft categorieën (woorden), een [[kwantitatieve variabele]] heeft getallen waarmee je echt kunt rekenen.",
          { fig: "meetniveaus", bij: "De vier meetniveaus. Bij kwalitatief kijk je of er een volgorde is, bij kwantitatief of je telt of meet." },
          { kop: "Kwalitatief: nominaal of ordinaal" },
          "[[Nominaal]]: categorieën zonder volgorde, zoals vervoermiddel, lievelingssport of haarkleur.",
          "[[Ordinaal]]: categorieën met een vaste volgorde, zoals 'zeer ontevreden' tot 'zeer tevreden' of opleidingsniveau. De afstanden tussen de categorieën zijn niet gelijk.",
          { kop: "Kwantitatief: discreet of continu" },
          "[[Discreet]]: je telt, er zijn alleen losse waarden, zoals het aantal broers en zussen of het aantal keer sporten per week.",
          "[[Continu]]: je meet, elke tussenwaarde is mogelijk, zoals lengte, reistijd of gewicht. Continue gegevens zet je vaak in klassen.",
          { tabel: { kop: ["meetniveau", "centrummaat", "geschikte grafiek"], rijen: [["nominaal", "modus", "staafdiagram, cirkeldiagram"], ["ordinaal", "modus, mediaan", "staafdiagram, cumulatief percentage"], ["discreet", "modus, mediaan, gemiddelde", "staafdiagram, boxplot"], ["continu", "mediaan, gemiddelde", "histogram, boxplot, frequentiepolygoon"]] } },
          { let: "Een getal is niet altijd kwantitatief. Postcodes, rugnummers en een code als 1 = fiets, 2 = bus zijn nominaal: een gemiddelde ervan betekent niets." },
          { tip: "Het meetniveau bepaalt ook welke vuistregel je gebruikt. Twee groepen en een ja/nee-kenmerk: phi. Gegevens met een volgorde in klassen: max V_{cp}. Kwantitatieve gegevens met gemiddelde en standaardafwijking: effectgrootte E." },
          { voorbeeld: { titel: "Mediaan bij ordinale gegevens", stappen: ["Enquête onder 100 klanten: zeer ontevreden 4, ontevreden 11, neutraal 20, tevreden 38, zeer tevreden 27.", "Cumulatief: 4, 15, 35, 73, 100.", "De mediaan ligt tussen waarneming 50 en 51. Die vallen allebei in 'tevreden' (36 tot en met 73).", "De mediaan is dus 'tevreden'. Een gemiddelde kun je hier niet goed uitrekenen."] } }
        ],
        begrippen: [
          ["variabele", "Kenmerk dat je bij elke waarneming meet of noteert, zoals leeftijd of vervoermiddel."],
          ["kwalitatieve variabele", "Variabele met categorieën (woorden) in plaats van getallen om mee te rekenen."],
          ["kwantitatieve variabele", "Variabele met getallen waarmee je kunt rekenen."],
          ["nominaal", "Kwalitatief zonder volgorde, zoals haarkleur of vervoermiddel."],
          ["ordinaal", "Kwalitatief met een vaste volgorde, zoals tevredenheid of opleidingsniveau."],
          ["discreet", "Kwantitatief met losse waarden die je telt, zoals het aantal huisdieren."],
          ["continu", "Kwantitatief met alle tussenwaarden mogelijk, gemeten, zoals lengte of tijd."],
          ["modus", "De waarde of categorie die het vaakst voorkomt."],
          ["mediaan", "De middelste waarneming als je alle waarnemingen op volgorde zet."],
          ["klassenindeling", "Indeling van (meestal continue) waarnemingen in intervallen, zoals 10 tot 20 minuten."]
        ],
        vragen: [
          { q: "Welk meetniveau heeft 'de reistijd naar school in minuten'?", a: ["kwantitatief continu", "kwantitatief discreet", "kwalitatief ordinaal", "kwalitatief nominaal"], u: "Tijd meet je en elke tussenwaarde is mogelijk, dus continu. Dat je afrondt op hele minuten verandert dat niet." },
          { q: "Welk meetniveau heeft 'het aantal broers en zussen'?", a: ["kwantitatief discreet", "kwantitatief continu", "kwalitatief ordinaal", "kwalitatief nominaal"], u: "Je telt: 0, 1, 2, … Er zijn geen tussenwaarden, dus discreet." },
          { q: "In een enquête kies je uit 'nooit', 'soms', 'vaak' en 'altijd'. Welk meetniveau is dat?", a: ["kwalitatief ordinaal", "kwalitatief nominaal", "kwantitatief discreet", "kwantitatief continu"], u: "Het zijn categorieën met een duidelijke volgorde, maar de afstanden zijn niet gelijk: ordinaal." },
          { q: "Welk meetniveau heeft het rugnummer van een voetballer?", a: ["kwalitatief nominaal", "kwantitatief discreet", "kwalitatief ordinaal", "kwantitatief continu"], u: "Het rugnummer is een naam in cijfers. Nummer 10 is niet 'twee keer zoveel' als nummer 5 en er is geen betekenisvolle volgorde." },
          { q: "Welke centrummaat kun je bij nominale gegevens gebruiken?", a: ["alleen de modus", "de modus en de mediaan", "de mediaan en het gemiddelde", "alleen het gemiddelde"], u: "Zonder volgorde is er geen middelste waarneming, dus geen mediaan. Rekenen kan niet, dus geen gemiddelde. Alleen de modus blijft over." },
          { q: "Welke grafiek past het best bij continue gegevens, zoals de lengte van 300 leerlingen?", a: ["een histogram", "een cirkeldiagram", "een staafdiagram met losse staven", "een kruistabel"], u: "Continue gegevens zet je in klassen; bij klassen hoort een histogram met aansluitende staven." },
          { q: "Waarom mag je bij ordinale gegevens wel een mediaan bepalen, maar eigenlijk geen gemiddelde?", a: ["Er is een volgorde, maar de afstanden tussen de categorieën zijn niet gelijk.", "Er is geen volgorde, maar wel een categorie die het vaakst voorkomt.", "De afstanden zijn gelijk, maar er is geen middelste waarneming.", "Ordinale gegevens zijn getallen, dus alles mag."], u: "Door de volgorde kun je de middelste vinden. Een gemiddelde vraagt gelijke afstanden en die zijn er niet." },
          { q: "Welke vuistregel past bij de vraag 'Hebben havisten vaker een bijbaan dan vwo'ers?' met de antwoorden ja en nee?", a: ["phi bij een 2×2-kruistabel", "effectgrootte E", "max V_{cp}", "twee boxplots vergelijken"], u: "Twee groepen en een kenmerk met twee categorieën (ja/nee): dat geeft een 2×2-kruistabel, dus phi." }
        ],
        reken: [
          { q: "Een enquête onder 100 klanten: zeer ontevreden 4, ontevreden 11, neutraal 20, tevreden 38, zeer tevreden 27. Wat is de mediaan? Typ de categorie.", antwoord: ["tevreden"], hint: "Tel cumulatief op tot je bij waarneming 50 en 51 bent.", stappen: ["Cumulatief: 4, 15, 35, 73, 100", "Waarneming 50 en 51 vallen in de categorie die loopt van 36 tot en met 73.", "De mediaan is 'tevreden'."] },
          { q: "Bij dezelfde enquête (4, 11, 20, 38 en 27 van de 100): hoeveel procent van de klanten is tevreden of zeer tevreden?", antwoord: 65, eenheid: "%", hint: "Tel de twee categorieën op en deel door 100.", stappen: ["38 + 27 = 65", "65 / 100 × 100% = 65%"] },
          { q: "50 leerlingen noteren hoe vaak ze per week sporten: 0 keer: 6, 1 keer: 9, 2 keer: 14, 3 keer: 11, 4 keer: 6, 5 keer: 4. Bereken het gemiddelde. Rond af op 1 decimaal.", antwoord: 2.3, tol: 0.1, eenheid: "keer", hint: "Vermenigvuldig elke waarde met zijn frequentie, tel op en deel door 50.", stappen: ["0·6 + 1·9 + 2·14 + 3·11 + 4·6 + 5·4 = 0 + 9 + 28 + 33 + 24 + 20 = 114", "114 / 50 = 2,28", "Afgerond: 2,3 keer per week"] },
          { q: "Bepaal bij dezelfde 50 leerlingen (6, 9, 14, 11, 6, 4 voor 0 tot en met 5 keer) de mediaan.", antwoord: 2, eenheid: "keer", hint: "De mediaan ligt tussen waarneming 25 en 26.", stappen: ["Cumulatief: 6, 15, 29, 40, 46, 50", "Waarneming 25 en 26 vallen allebei bij 2 keer (16 tot en met 29).", "Mediaan = 2"] },
          {
            gen: (R) => {
              const f = [R.int(2, 8), R.int(5, 14), R.int(8, 18), R.int(5, 14), R.int(2, 9)], n = f.reduce((a, b) => a + b, 0);
              const som = f.reduce((a, x, i) => a + x * (i + 1), 0), gem = R.rond(som / n, 1);
              const c = R.kies([["het aantal huisdieren", "huisdieren"], ["het aantal keer per week dat ze fastfood eten", "keer"], ["het aantal apps dat ze dagelijks gebruiken (in tientallen)", "tientallen"]]);
              return { q: `${n} jongeren noteren ${c[0]}. Waarde 1: ${f[0]}, waarde 2: ${f[1]}, waarde 3: ${f[2]}, waarde 4: ${f[3]}, waarde 5: ${f[4]} keer. Bereken het gemiddelde. Rond af op 1 decimaal.`, antwoord: gem, tol: 0.1, hint: "Som van waarde × frequentie, gedeeld door het totaal.", stappen: [`1·${f[0]} + 2·${f[1]} + 3·${f[2]} + 4·${f[3]} + 5·${f[4]} = ${som}`, `${som} / ${n} = ${nl(R.rond(som / n, 4))}`, `Afgerond: ${nl(gem)}`] };
            }
          },
          {
            gen: (R) => {
              const f = [R.int(1, 9), R.int(3, 12), R.int(4, 14), R.int(3, 12), R.int(1, 9)], n = f.reduce((a, b) => a + b, 0);
              const cum = []; f.reduce((a, x) => { cum.push(a + x); return a + x; }, 0);
              const waarde = (k) => cum.findIndex((c) => c >= k) + 1;
              const m = n % 2 ? waarde((n + 1) / 2) : (waarde(n / 2) + waarde(n / 2 + 1)) / 2;
              const plek = n % 2 ? `Bij ${n} waarnemingen is de mediaan waarneming ${(n + 1) / 2}.` : `Bij ${n} waarnemingen ligt de mediaan tussen waarneming ${n / 2} en ${n / 2 + 1}.`;
              return { q: `Een klas geeft een rapportcijfer voor de kantine van 1 tot en met 5. Cijfer 1: ${f[0]}, 2: ${f[1]}, 3: ${f[2]}, 4: ${f[3]}, 5: ${f[4]} leerlingen. Bepaal de mediaan.`, antwoord: m, tol: 0.001, hint: "Tel cumulatief op en zoek de middelste waarneming.", stappen: [`Cumulatief: ${cum.join(", ")}`, plek, `Mediaan = ${nl(m)}`] };
            }
          }
        ],
        oefen: [
          { type: "sorteer", q: "Sorteer de variabelen op meetniveau.", groepen: ["nominaal", "ordinaal", "discreet", "continu"], items: [["lievelingsvak", 0], ["postcode", 0], ["schoolniveau vmbo/havo/vwo", 1], ["tevredenheid in vijf categorieën", 1], ["aantal sms'jes per dag", 2], ["aantal doelpunten", 2], ["lichaamslengte", 3], ["tijd op de 100 meter", 3]], u: "Woorden zonder volgorde: nominaal. Met volgorde: ordinaal. Tellen: discreet. Meten: continu. Een postcode is een naam in cijfers." },
          { type: "koppel", q: "Koppel het meetniveau aan wat er mag.", paren: [["nominaal", "alleen de modus"], ["ordinaal", "modus en mediaan"], ["discreet", "ook gemiddelde, losse waarden"], ["continu", "gemiddelde, in klassen, histogram"]], u: "Hoe hoger het meetniveau, hoe meer je mag uitrekenen." }
        ],
        open: [
          { q: "Een onderzoeker codeert het vervoermiddel van leerlingen: 1 = lopen, 2 = fiets, 3 = bus, 4 = auto. Hij rekent het gemiddelde uit, vindt 2,2 en concludeert: 'De gemiddelde leerling komt ongeveer met de fiets.' Leg uit waarom deze conclusie niet klopt.", a: "Vervoermiddel is een nominale variabele: de getallen zijn alleen codes. Met andere codes (bijvoorbeeld 1 = auto) krijg je een ander gemiddelde, dus het gemiddelde betekent niets. Bij nominale gegevens gebruik je de modus: het vervoermiddel dat het vaakst voorkomt.", punten: ["nominaal: getallen zijn codes", "andere codering geeft ander gemiddelde", "gebruik de modus"] }
        ],
        widgets: ["vuistkiezer"]
      },

      // ------------------------------------------------------------------ 13.3
      {
        id: "h13-3", nr: "13.3", titel: "Groepen grafisch vergelijken",
        kern: [
          "Twee groepen vergelijk je in één oogopslag met twee [[boxplot]]s onder elkaar, of met twee [[cumulatieve frequentiepolygonen]] in één assenstelsel.",
          "Een boxplot toont vijf getallen: minimum, [[eerste kwartiel]] Q_{1}, mediaan, derde kwartiel Q_{3} en maximum. De box (van Q_{1} tot en met Q_{3}) bevat de middelste 50% van de waarnemingen.",
          { kop: "Vuistregel voor twee boxplots" },
          { fig: "boxregels", bij: "De drie gevallen van het formuleblad." },
          "Boxen overlappen niet: het verschil is **groot**. Boxen overlappen wel en een mediaan ligt buiten de box van de andere groep: **middelmatig**. In alle andere gevallen: **gering**.",
          { let: "De box loopt tot en met Q_{1} en Q_{3}. Raken de boxen elkaar precies, dan overlappen ze. Ligt een mediaan precies op de rand van de andere box, dan ligt hij erbinnen. De snorharen tellen niet mee." },
          { widget: "boxplot" },
          { kop: "Cumulatieve polygonen en max V_{cp}" },
          "Bij elke klassengrens lees je van beide groepen het [[cumulatief percentage]] af. Het grootste verschil daartussen is [[max Vcp]].",
          { formule: "max V_{cp} > 40: groot · 20 < max V_{cp} ≤ 40: middelmatig · max V_{cp} ≤ 20: gering" },
          { tip: "Deze vuistregel geldt alleen als beide groepen groter zijn dan 100 (n > 100)." },
          { fig: "vcpfig", bij: "Reistijd van twee groepen. Het grootste verticale verschil zit bij 30 minuten." },
          { voorbeeld: { titel: "Max V_{cp} uit een tabel", stappen: ["Groep A cumulatief (in %) bij 0, 10, 20, 30, 40, 50 minuten: 0, 12, 40, 71, 93, 100. Groep B: 0, 4, 17, 45, 80, 100.", "Verschillen: 0, 8, 23, 26, 13, 0.", "max V_{cp} = 26 (bij 30 minuten).", "20 < 26 ≤ 40, dus het verschil is middelmatig (beide groepen hebben meer dan 100 waarnemingen)."] } },
          { widget: "vcp" }
        ],
        begrippen: [
          ["boxplot", "Diagram met minimum, Q1, mediaan, Q3 en maximum; de box bevat de middelste 50%."],
          ["eerste kwartiel (Q1)", "Waarde waaronder 25% van de waarnemingen ligt."],
          ["derde kwartiel (Q3)", "Waarde waaronder 75% van de waarnemingen ligt."],
          ["interkwartielafstand", "Q3 − Q1: de breedte van de box, een maat voor de spreiding van de middelste helft."],
          ["spreidingsbreedte", "Maximum − minimum."],
          ["cumulatief percentage", "Percentage waarnemingen kleiner dan een klassengrens."],
          ["cumulatieve frequentiepolygoon", "Grafiek van de cumulatieve percentages tegen de rechter klassengrenzen."],
          ["max Vcp", "Grootste verticale verschil tussen de cumulatieve percentages van twee groepen."],
          ["vuistregel", "Afspraak van het formuleblad om een verschil gering, middelmatig of groot te noemen."],
          ["overlappen (boxen)", "De boxen hebben minstens één waarde gemeen; raken telt ook als overlappen."]
        ],
        vragen: [
          { q: "Welk oordeel geeft de vuistregel over het verschil tussen A en B?", fig: "box-q1", a: ["groot", "middelmatig", "gering", "niet te bepalen zonder gemiddelden"], u: "Box A loopt van 20 tot 36 en box B van 44 tot 64. De boxen overlappen niet, dus groot." },
          { q: "Welk oordeel geeft de vuistregel over het verschil tussen A en B?", fig: "box-q2", a: ["middelmatig", "groot", "gering", "niet te bepalen zonder gemiddelden"], u: "De boxen overlappen (van 42 tot 50). De mediaan van A (36) ligt buiten box B (42 tot 68), dus middelmatig." },
          { q: "Welk oordeel geeft de vuistregel over het verschil tussen A en B?", fig: "box-q3", a: ["gering", "middelmatig", "groot", "niet te bepalen zonder gemiddelden"], u: "De boxen overlappen. Mediaan A (46) ligt in box B (38 tot 66) en mediaan B (50) ligt in box A (30 tot 58). Dus gering." },
          { q: "Box A loopt van 20 tot 40, box B van 40 tot 62. De mediaan van A is 31, die van B is 50. Welk oordeel?", a: ["middelmatig", "groot", "gering", "groot, want de medianen liggen ver uit elkaar"], u: "De boxen raken elkaar bij 40, dus ze overlappen (de box loopt tot en met Q_{3}). Beide medianen liggen buiten de andere box, dus middelmatig." },
          { q: "Bij twee groepen van elk 250 personen is max V_{cp} = 40. Welk oordeel?", a: ["middelmatig", "groot", "gering", "niet toegestaan, de groepen zijn te klein"], u: "Groot geldt pas bij max V_{cp} > 40. 40 zelf valt onder 20 < max V_{cp} ≤ 40: middelmatig." },
          { q: "Bij twee groepen van elk 400 personen is max V_{cp} = 20. Welk oordeel?", a: ["gering", "middelmatig", "groot", "niet toegestaan, de groepen zijn te klein"], u: "Middelmatig geldt pas boven 20. Bij max V_{cp} ≤ 20 is het verschil gering." },
          { q: "Wanneer mag je de vuistregel voor max V_{cp} gebruiken?", a: ["als beide groepen meer dan 100 waarnemingen hebben", "als de groepen samen meer dan 100 waarnemingen hebben", "als beide groepen even groot zijn", "alleen bij nominale gegevens"], u: "Op het formuleblad staat: voor beide groepen een steekproefomvang n > 100." },
          { q: "Wat zegt de breedte van de box van een boxplot?", a: ["hoe ver de middelste 50% van de waarnemingen uiteenligt", "hoe ver alle waarnemingen uiteenliggen", "hoeveel waarnemingen er zijn", "hoe groot het gemiddelde is"], u: "De box loopt van Q_{1} tot Q_{3}: dat is de interkwartielafstand, de spreiding van de middelste helft." },
          { q: "In een cumulatieve polygoon lees je bij 20 minuten 35% af. Wat betekent dat?", a: ["35% van de groep heeft een reistijd van minder dan 20 minuten", "35% van de groep heeft een reistijd van precies 20 minuten", "35% van de groep heeft een reistijd van meer dan 20 minuten", "De groep doet gemiddeld 35 minuten over de reis"], u: "Cumulatief betekent opgeteld vanaf het begin: alles onder de klassengrens van 20 minuten." }
        ],
        reken: [
          { q: "Groep A heeft bij 0, 10, 20, 30, 40, 50 minuten de cumulatieve percentages 0, 12, 40, 71, 93, 100. Groep B: 0, 4, 17, 45, 80, 100. Bepaal max V_{cp}.", antwoord: 26, tol: 0.001, hint: "Trek bij elke grens de twee percentages van elkaar af.", stappen: ["Verschillen: 0, 8, 23, 26, 13, 0", "max V_{cp} = 26"] },
          { q: "Cumulatieve percentages bij 0, 5, 10, 15, 20, 25 uur. Groep A: 0, 10, 35, 68, 90, 100. Groep B: 0, 3, 12, 27, 62, 100. Bepaal max V_{cp}.", antwoord: 41, tol: 0.001, hint: "Bereken alle verschillen en neem het grootste.", stappen: ["Verschillen: 0, 7, 23, 41, 28, 0", "max V_{cp} = 41"] },
          { q: "Bij de vorige opgave (max V_{cp} = 41) hebben beide groepen 150 deelnemers. Welk oordeel geeft de vuistregel? Typ gering, middelmatig of groot.", antwoord: ["groot"], hint: "Vergelijk met de grenzen 20 en 40.", stappen: ["Beide groepen zijn groter dan 100, dus de vuistregel mag.", "41 > 40, dus het verschil is groot."] },
          { q: "Een boxplot heeft Q_{1} = 42, mediaan 56 en Q_{3} = 68. Bereken de interkwartielafstand.", antwoord: 26, tol: 0.001, hint: "Q3 − Q1.", stappen: ["68 − 42 = 26"] },
          {
            gen: () => {
              const d = W.maakVcp(), c = d.c;
              return { q: `Cumulatieve percentages van ${c.x} bij de grenzen ${d.gr.join(", ")}. ${c.a} (n = ${d.nA}): ${d.A.join(", ")}. ${c.b} (n = ${d.nB}): ${d.B.join(", ")}. Bepaal max V_{cp}.`, antwoord: d.mx, tol: 0.001, hint: "Trek bij elke grens de percentages van elkaar af en neem het grootste verschil.", stappen: [`Verschillen: ${d.D.join(", ")}`, `max V_{cp} = ${d.mx}, bij grens ${d.gr[d.imax]}`, `Oordeel: ${d.oordeel} (beide groepen hebben meer dan 100 deelnemers).`] };
            }
          },
          {
            gen: () => {
              const wil = TW.R.kies(["groot", "middelmatig", "gering"]), G = W.maakBox(wil), A = G.a, B = G.b;
              const vijf = (g) => `min ${g.q1 - g.wl}, Q1 ${g.q1}, mediaan ${g.m}, Q3 ${g.q3}, max ${g.q3 + g.wr}`;
              return { q: `Twee boxplots. Groep A: ${vijf(A)}. Groep B: ${vijf(B)}. Welk oordeel geeft de vuistregel? Typ gering, middelmatig of groot.`, antwoord: [W.oordeelBox(A, B)], hint: "Kijk eerst of de boxen (van Q1 tot en met Q3) overlappen, dan pas naar de medianen.", stappen: [`Box A: ${A.q1} tot ${A.q3}. Box B: ${B.q1} tot ${B.q3}.`, W.boxUitleg(G).tekst] };
            }
          }
        ],
        oefen: [
          { type: "sorteer", q: "Welk oordeel geeft de vuistregel voor boxplots?", groepen: ["gering", "middelmatig", "groot"], items: [["De boxen overlappen niet", 2], ["Boxen overlappen, beide medianen in de andere box", 0], ["Boxen overlappen, één mediaan buiten de andere box", 1], ["Alleen de snorharen overlappen", 2], ["Boxen raken elkaar precies, medianen buiten de andere box", 1], ["Mediaan precies op de rand van de andere box, de andere mediaan erin", 0]], u: "Raken telt als overlappen en een mediaan op de rand ligt in de box. Snorharen doen niet mee." },
          { type: "volgorde", q: "Zet de stappen voor max V_{cp} in de goede volgorde.", items: ["Controleer dat beide groepen meer dan 100 waarnemingen hebben", "Lees bij elke klassengrens beide cumulatieve percentages af", "Bereken per grens het verschil", "Neem het grootste verschil: max V_{cp}", "Vergelijk met de grenzen 20 en 40"], u: "Eerst controleren of de vuistregel mag, dan pas rekenen." }
        ],
        open: [
          { q: "Twee boxplots van toetscijfers: klas A heeft box 5,8 tot 7,4 met mediaan 6,6; klas B heeft box 6,0 tot 7,6 met mediaan 6,9. De mentor zegt: 'Klas B scoort duidelijk beter, want de mediaan is hoger.' Leg uit waarom deze conclusie niet klopt.", a: "De boxen overlappen bijna helemaal. Mediaan A (6,6) ligt in box B (6,0 tot 7,6) en mediaan B (6,9) ligt in box A (5,8 tot 7,4). Volgens de vuistregel is het verschil dus gering. Een iets hogere mediaan is nog geen duidelijk verschil.", punten: ["boxen overlappen", "beide medianen in de andere box", "vuistregel: gering"] }
        ],
        widgets: ["boxplot", "vcp"]
      },

      // ------------------------------------------------------------------ 13.4
      {
        id: "h13-4", nr: "13.4", titel: "Groepen vergelijken met formules",
        kern: [
          "Twee formules op het formuleblad maken een verschil meetbaar: de [[effectgrootte]] E bij gemiddelden en [[phi]] bij een 2×2-kruistabel.",
          { kop: "Effectgrootte E" },
          { formule: "E = (X̄₁ − X̄₂) / (½(S_{1} + S_{2})), met X̄₁ ≥ X̄₂" },
          "Je deelt het verschil in gemiddelden door de gemiddelde [[standaardafwijking]]. Hetzelfde verschil telt zwaarder als de spreiding klein is.",
          { formule: "E > 0,8: groot · 0,4 < E ≤ 0,8: middelmatig · E ≤ 0,4: gering" },
          { voorbeeld: { titel: "Cijfers van twee klassen", stappen: ["Klas 5A: gemiddeld 6,8 met S = 1,2. Klas 5B: gemiddeld 6,1 met S = 1,0.", "Verschil: 6,8 − 6,1 = 0,7.", "Gemiddelde standaardafwijking: ½(1,2 + 1,0) = 1,1.", "E = 0,7 / 1,1 ≈ 0,64.", "0,4 < 0,64 ≤ 0,8, dus het verschil is middelmatig."] } },
          { widget: "effect" },
          { kop: "Phi bij een 2×2-kruistabel" },
          { formule: "phi = (ad − bc) / √((a + b)(a + c)(b + d)(c + d))" },
          "Hier zijn a, b (bovenste rij) en c, d (onderste rij) **absolute aantallen**, geen percentages. Phi ligt altijd tussen −1 en 1; het teken zegt alleen welke groep het hoogste percentage heeft.",
          { formule: "phi < −0,4 of phi > 0,4: groot · −0,4 ≤ phi < −0,2 of 0,2 < phi ≤ 0,4: middelmatig · −0,2 ≤ phi ≤ 0,2: gering" },
          { voorbeeld: { titel: "Bijbaan bij jongens en meisjes", stappen: ["Jongens: 78 met en 42 zonder bijbaan (a = 78, b = 42). Meisjes: 60 met en 20 zonder (c = 60, d = 20).", "ad − bc = 78 · 20 − 42 · 60 = 1560 − 2520 = −960.", "(a + b)(a + c)(b + d)(c + d) = 120 · 138 · 62 · 80 = 82 137 600; de wortel is ongeveer 9063.", "phi = −960 / 9063 ≈ −0,11.", "−0,2 ≤ −0,11 ≤ 0,2, dus het verschil is gering. Het minteken betekent alleen dat de tweede rij (meisjes) het hoogste percentage heeft."] } },
          { widget: "phi" },
          { let: "Let op de grenzen: precies E = 0,8 is middelmatig, precies E = 0,4 is gering. Precies phi = 0,4 of −0,4 is middelmatig, precies 0,2 of −0,2 is gering." },
          { widget: "vuistkiezer" }
        ],
        begrippen: [
          ["effectgrootte E", "(X̄₁ − X̄₂) / (½(S1 + S2)): verschil in gemiddelden gedeeld door de gemiddelde standaardafwijking."],
          ["steekproefgemiddelde", "Het gemiddelde X̄ van de waarnemingen in een steekproef."],
          ["standaardafwijking", "Maat voor hoe ver de waarnemingen gemiddeld van het gemiddelde af liggen (S of σ)."],
          ["phi", "Getal tussen −1 en 1 dat bij een 2×2-kruistabel aangeeft hoe groot het verschil tussen twee groepen is."],
          ["2×2-kruistabel", "Kruistabel met twee groepen en een kenmerk met twee categorieën, met absolute aantallen a, b, c en d."],
          ["gering verschil", "E ≤ 0,4; −0,2 ≤ phi ≤ 0,2; max Vcp ≤ 20; of medianen in elkaars box."],
          ["middelmatig verschil", "0,4 < E ≤ 0,8; 0,2 < |phi| ≤ 0,4; 20 < max Vcp ≤ 40; of boxen overlappen met een mediaan buiten de andere box."],
          ["groot verschil", "E > 0,8; |phi| > 0,4; max Vcp > 40; of boxen overlappen niet."]
        ],
        vragen: [
          { q: "Je berekent E = 0,8. Welk oordeel hoort daarbij?", a: ["middelmatig", "groot", "gering", "groot of middelmatig, dat mag je kiezen"], u: "Groot geldt pas bij E > 0,8. Bij 0,4 < E ≤ 0,8 is het middelmatig, en 0,8 hoort daar nog bij." },
          { q: "Je berekent E = 0,4. Welk oordeel hoort daarbij?", a: ["gering", "middelmatig", "groot", "gering of middelmatig, dat mag je kiezen"], u: "Middelmatig begint pas boven 0,4. Bij E ≤ 0,4 is het verschil gering." },
          { q: "Je berekent phi = −0,4. Welk oordeel hoort daarbij?", a: ["middelmatig", "groot", "gering", "geen, phi kan niet negatief zijn"], u: "Groot is phi < −0,4. Bij −0,4 ≤ phi < −0,2 is het middelmatig; −0,4 hoort daar dus bij." },
          { q: "Je berekent phi = 0,2. Welk oordeel hoort daarbij?", a: ["gering", "middelmatig", "groot", "groot, want phi is positief"], u: "Gering is −0,2 ≤ phi ≤ 0,2. 0,2 zelf is dus nog gering." },
          { q: "Je berekent phi = −0,45. Welk oordeel hoort daarbij?", a: ["groot", "gering, want phi is negatief", "middelmatig", "gering, want phi is kleiner dan 0,2"], u: "phi < −0,4, dus groot. Het minteken zegt alleen welke groep het hoogste percentage heeft." },
          { q: "Gemiddelden 24 en 20, standaardafwijkingen 6 en 4. Iemand rekent E = 4 / (6 + 4) = 0,4. Wat gaat er mis?", a: ["Hij vergeet de ½: E = 4 / 5 = 0,8.", "Hij moet 20 − 24 doen: E = −0,4.", "Hij moet door 6 delen, de grootste S.", "Er gaat niets mis, E = 0,4."], u: "De noemer is ½(S_{1} + S_{2}) = ½ · 10 = 5. Dan E = 4 / 5 = 0,8: middelmatig in plaats van gering." },
          { q: "Wat vul je voor a, b, c en d in bij de formule van phi?", a: ["de absolute aantallen uit de kruistabel", "de rijpercentages uit de kruistabel", "de kolompercentages uit de kruistabel", "de percentages van het totaal"], u: "Op het formuleblad staat dat a, b, c en d absolute aantallen zijn. Met percentages krijg je een andere uitkomst." },
          { q: "Van twee groepen zijn alleen het gemiddelde en de standaardafwijking bekend. Welke vuistregel gebruik je?", a: ["effectgrootte E", "phi", "max V_{cp}", "twee boxplots vergelijken"], u: "E is de enige vuistregel die werkt met gemiddelden en standaardafwijkingen." },
          { q: "Waarom deel je bij E door de standaardafwijking?", a: ["Een verschil telt zwaarder als de groepen weinig spreiding hebben.", "Zo wordt E altijd een getal tussen 0 en 1.", "De standaardafwijking is het verschil tussen de groepen.", "Zo hoef je de gemiddelden niet af te ronden."], u: "Bij weinig spreiding overlappen de groepen weinig, dan is hetzelfde verschil in gemiddelde opvallender. E kan ook groter dan 1 zijn." }
        ],
        reken: [
          { q: "Groep 1: X̄₁ = 7,4 en S_{1} = 1,3. Groep 2: X̄₂ = 6,6 en S_{2} = 1,1. Bereken E. Rond af op 2 decimalen.", antwoord: 0.67, tol: 0.01, hint: "Verschil in gemiddelden gedeeld door ½(S1 + S2).", stappen: ["7,4 − 6,6 = 0,8", "½(1,3 + 1,1) = 1,2", "E = 0,8 / 1,2 ≈ 0,67 (middelmatig)"] },
          { q: "Kruistabel: groep 1 heeft 30 ja en 20 nee, groep 2 heeft 15 ja en 35 nee. Bereken phi. Rond af op 2 decimalen.", antwoord: 0.3, tol: 0.01, hint: "a = 30, b = 20, c = 15, d = 35.", stappen: ["ad − bc = 30 · 35 − 20 · 15 = 1050 − 300 = 750", "(a + b)(a + c)(b + d)(c + d) = 50 · 45 · 55 · 50 = 6 187 500", "√6 187 500 ≈ 2487,5", "phi = 750 / 2487,5 ≈ 0,30 (middelmatig)"] },
          { q: "Gemiddelden 24 en 20, standaardafwijkingen 5 en 5. Welk oordeel geeft de vuistregel voor E? Typ gering, middelmatig of groot.", antwoord: ["middelmatig"], hint: "Reken E uit en let op de grens.", stappen: ["E = (24 − 20) / (½(5 + 5)) = 4 / 5 = 0,8", "0,8 is niet groter dan 0,8, dus niet groot.", "0,4 < 0,8 ≤ 0,8: middelmatig"] },
          { q: "Reistijd van fietsers: gemiddeld 32,5 minuten (S = 8,2). Busreizigers: gemiddeld 26,0 minuten (S = 6,8). Bereken E. Rond af op 2 decimalen.", antwoord: 0.87, tol: 0.01, hint: "Gemiddelde standaardafwijking: ½(8,2 + 6,8).", stappen: ["32,5 − 26,0 = 6,5", "½(8,2 + 6,8) = 7,5", "E = 6,5 / 7,5 ≈ 0,87 (groot)"] },
          {
            gen: () => {
              const d = W.maakE(), c = d.c, e = c.e ? " " + c.e : "";
              return { q: `Bij een onderzoek naar ${c.w}: ${c.a} gemiddeld ${nl(d.mA)}${e} met S = ${nl(d.sA)}, ${c.b} gemiddeld ${nl(d.mB)}${e} met S = ${nl(d.sB)}. Bereken de effectgrootte E. Rond af op 2 decimalen.`, antwoord: TW.R.rond(d.E, 2), tol: 0.01, hint: "Grootste gemiddelde min kleinste, gedeeld door ½(S1 + S2).", stappen: [`${nl(d.hoog)} − ${nl(d.laag)} = ${nl(d.verschil)}`, `½(${nl(d.sA)} + ${nl(d.sB)}) = ${nl(d.sg)}`, `E = ${nl(d.verschil)} / ${nl(d.sg)} ≈ ${r2(d.E)}`, `Oordeel: ${d.oordeel}`] };
            }
          },
          {
            gen: () => {
              const d = W.maakPhi(), c = d.c, n = [d.a + d.b, d.a + d.cc, d.b + d.d, d.cc + d.d], pr = n[0] * n[1] * n[2] * n[3];
              return { q: `Kruistabel over ${c.wat}. ${c.r[0]}: ${d.a} ${c.k[0]} en ${d.b} ${c.k[1]}. ${c.r[1]}: ${d.cc} ${c.k[0]} en ${d.d} ${c.k[1]}. Bereken phi. Rond af op 2 decimalen.`, antwoord: TW.R.rond(d.phi, 2), tol: 0.01, hint: `a = ${d.a}, b = ${d.b}, c = ${d.cc}, d = ${d.d}.`, stappen: [`ad − bc = ${d.a} · ${d.d} − ${d.b} · ${d.cc} = ${d.a * d.d - d.b * d.cc}`, `(a + b)(a + c)(b + d)(c + d) = ${n.join(" · ")} = ${pr}`, `√${pr} ≈ ${nl(TW.R.rond(Math.sqrt(pr), 1))}`, `phi ≈ ${r2(d.phi)}: ${d.oordeel}`] };
            }
          },
          {
            gen: () => {
              const d = W.maakE(), c = d.c, e = c.e ? " " + c.e : "";
              return { q: `${c.a}: gemiddeld ${nl(d.mA)}${e} (S = ${nl(d.sA)}). ${c.b}: gemiddeld ${nl(d.mB)}${e} (S = ${nl(d.sB)}). Het gaat om ${c.w}. Welk oordeel geeft de vuistregel voor de effectgrootte? Typ gering, middelmatig of groot.`, antwoord: [d.oordeel], hint: "Reken E uit en vergelijk met 0,4 en 0,8.", stappen: [`E = ${nl(d.verschil)} / ${nl(d.sg)} ≈ ${r2(d.E)}`, d.oordeel === "groot" ? "E > 0,8: groot" : d.oordeel === "middelmatig" ? "0,4 < E ≤ 0,8: middelmatig" : "E ≤ 0,4: gering"] };
            }
          }
        ],
        oefen: [
          { type: "sorteer", q: "Welk oordeel hoort bij de uitkomst?", groepen: ["gering", "middelmatig", "groot"], items: [["E = 0,4", 0], ["E = 0,8", 1], ["E = 0,81", 2], ["phi = −0,4", 1], ["phi = 0,2", 0], ["phi = −0,41", 2], ["E = 0,55", 1], ["phi = 0,05", 0]], u: "De grenzen zelf horen bij het lagere oordeel: E = 0,8 is middelmatig, E = 0,4 gering, phi = ±0,4 middelmatig, phi = ±0,2 gering." },
          { type: "koppel", q: "Welke vuistregel past bij de gegevens?", paren: [["gemiddelde en standaardafwijking van twee groepen", "effectgrootte E"], ["twee groepen, antwoord ja of nee", "phi"], ["cumulatieve percentages, twee groepen van 200", "max Vcp"], ["vijfgetallensamenvatting van twee groepen", "boxplots vergelijken"]], u: "Kijk welke gegevens je hebt: die bepalen welke formule of regel je kunt gebruiken." }
        ],
        open: [
          { q: "Een fabrikant test een nieuw leerprogramma. Groep met programma: gemiddeld 6,9 (S = 1,5). Groep zonder: gemiddeld 6,4 (S = 1,3). In de reclame staat: 'Met ons programma scoor je duidelijk hoger!' Leg met een berekening uit waarom deze conclusie niet klopt.", a: "E = (6,9 − 6,4) / (½(1,5 + 1,3)) = 0,5 / 1,4 ≈ 0,36. Dat is kleiner dan of gelijk aan 0,4, dus volgens de vuistregel is het verschil gering. Er is wel een verschil, maar het is klein vergeleken met de spreiding; 'duidelijk hoger' is overdreven.", punten: ["E berekend: ≈ 0,36", "E ≤ 0,4: gering", "verschil klein ten opzichte van de spreiding"] },
          { q: "Leg uit waarom je in de formule voor phi geen percentages mag invullen.", a: "Phi houdt rekening met hoe groot de groepen zijn. Met percentages wordt elke groep 100, ook als de ene groep veel groter is dan de andere. Dan klopt de noemer niet en krijg je een andere uitkomst. Het formuleblad zegt daarom dat a, b, c en d absolute aantallen zijn.", punten: ["formuleblad: absolute aantallen", "percentages maken groepen kunstmatig even groot", "andere uitkomst"] }
        ],
        widgets: ["effect", "phi", "vuistkiezer"]
      },

      // ------------------------------------------------------------------ 13.5
      {
        id: "h13-5", nr: "13.5", titel: "Data-analyse",
        kern: [
          "Een statistisch onderzoek doorloopt een vaste cyclus: vraag, data verzamelen, analyseren en een conclusie die de vraag beantwoordt.",
          { fig: "cyclus", bij: "De statistische cyclus. Na de conclusie volgt vaak een nieuwe vraag." },
          { kop: "Populatie en steekproef" },
          "De [[populatie]] is de hele groep waarover je iets wilt weten. Meestal onderzoek je een deel daarvan: de [[steekproef]].",
          "Een steekproef is [[representatief]] als hij een goede afspiegeling is van de populatie. Dat bereik je het best [[aselect]]: iedereen in de populatie heeft dezelfde kans om gekozen te worden.",
          { let: "Een enquête op een website of een straatinterview om 11 uur 's ochtends is niet aselect: je bereikt vooral bepaalde mensen (selectie). Ook als weinig mensen reageren (lage respons) kan de steekproef scheef worden." },
          "De [[steekproefproportie]] p is het deel van de steekproef met het kenmerk; het [[steekproefgemiddelde]] X̄ is het gemiddelde in de steekproef. Ze schatten de proportie en het gemiddelde van de populatie.",
          { kop: "Een conclusie trekken" },
          "Een goede conclusie beantwoordt de onderzoeksvraag, noemt een getal of vuistregel als onderbouwing en zegt over welke populatie het gaat.",
          { tip: "Twee dingen die samen voorkomen, hoeven elkaar niet te veroorzaken. Leerlingen die meer slapen halen hogere cijfers, maar dat kan ook komen door iets anders, zoals minder schermtijd." },
          { kop: "Misleidende grafieken" },
          { fig: "misleid", bij: "Hetzelfde verschil (52 tegen 56). Links begint de as bij 50 en lijkt B drie keer zo hoog; rechts zie je dat het verschil klein is." },
          { let: "Let bij een grafiek altijd op waar de as begint, op de schaalverdeling en op percentages zonder aantallen (hoeveel mensen zijn er eigenlijk ondervraagd?)." },
          { voorbeeld: { titel: "Een conclusie controleren", stappen: ["Bewering: '62% van de jongeren wil een langere zomervakantie.'", "Vraag 1: wie is er ondervraagd en hoe? (240 lezers van een jongerensite die zelf reageerden: niet aselect.)", "Vraag 2: is de steekproef groot genoeg? (240 is niet weinig, maar zegt niets als de steekproef scheef is.)", "Vraag 3: geldt de conclusie voor de hele populatie? Nee: alleen voor lezers van die site die wilden reageren."] } }
        ],
        begrippen: [
          ["populatie", "De hele groep waarover je een uitspraak wilt doen."],
          ["steekproef", "Het deel van de populatie dat je echt onderzoekt."],
          ["steekproefomvang", "Het aantal waarnemingen in de steekproef (n)."],
          ["representatief", "De steekproef is een goede afspiegeling van de populatie."],
          ["aselect", "Iedereen in de populatie heeft dezelfde kans om in de steekproef te komen."],
          ["steekproefproportie", "Het deel van de steekproef met een bepaald kenmerk (p)."],
          ["steekproefgemiddelde", "Het gemiddelde van de waarnemingen in de steekproef (X̄)."],
          ["respons", "Het deel van de benaderde mensen dat echt meedoet aan het onderzoek."],
          ["statistische cyclus", "Vraag, data verzamelen, analyseren, conclusie trekken."],
          ["afgekapte as", "Verticale as die niet bij 0 begint, waardoor verschillen groter lijken."]
        ],
        vragen: [
          { q: "Een school wil weten hoeveel leerlingen ontbijten. Ze vragen het aan alle leerlingen van één havo-4-klas. Wat is het grootste probleem?", a: ["De steekproef is niet representatief voor de hele school.", "De steekproef is te groot om goed te verwerken.", "Ontbijten is een continue variabele.", "Er is geen populatie bij deze vraag."], u: "Eén klas is geen goede afspiegeling van alle leerjaren en niveaus. Je zou aselect uit de hele school moeten kiezen." },
          { q: "Welke manier van kiezen is aselect?", a: ["Een computer kiest 100 willekeurige leerlingnummers uit de leerlingenlijst.", "De eerste 100 leerlingen die 's ochtends de school binnenkomen.", "100 leerlingen die zelf reageren op een oproep in de app.", "Uit elke klas de 4 leerlingen die het dichtst bij de deur zitten."], u: "Alleen bij loting heeft iedereen dezelfde kans. Vroege leerlingen, vrijwilligers of plaatsen bij de deur zijn geen toeval." },
          { q: "In een steekproef van 200 jongeren gamen er 72 dagelijks. Wat is de steekproefproportie?", a: ["0,36", "0,72", "36", "0,28"], u: "p = 72 / 200 = 0,36. Als percentage is dat 36%, maar een proportie schrijf je als getal tussen 0 en 1." },
          { q: "Een staafdiagram heeft een verticale as die begint bij 50. Staaf A is 52, staaf B is 56. Hoeveel keer zo hoog lijkt staaf B?", a: ["3 keer", "ongeveer 1,08 keer", "4 keer", "2 keer"], u: "Boven de 50 is A 2 hoog en B 6 hoog: B lijkt 3 keer zo hoog. In werkelijkheid is 56 / 52 ≈ 1,08." },
          { q: "Uit onderzoek blijkt: leerlingen die meer sporten, halen gemiddeld hogere cijfers. Welke conclusie mag je trekken?", a: ["Sporten en hoge cijfers komen samen voor, maar dat bewijst geen oorzaak.", "Sporten zorgt voor hogere cijfers.", "Hoge cijfers zorgen ervoor dat leerlingen meer gaan sporten.", "Er is geen verband tussen sporten en cijfers."], u: "Een verband is geen oorzaak. Er kan een andere verklaring zijn, bijvoorbeeld een gezonde leefstijl die beide beïnvloedt." },
          { q: "Een onderzoeker stuurt 1500 enquêtes en krijgt er 180 terug. Wat is de respons?", a: ["12%", "18%", "8,3%", "88%"], u: "180 / 1500 × 100% = 12%. Bij zo'n lage respons kan de steekproef scheef zijn: wie reageert, is vaak extra betrokken." },
          { q: "Wat hoort er in een goede conclusie van een vergelijkend onderzoek?", a: ["antwoord op de vraag, onderbouwing met een getal of vuistregel en de populatie", "alleen het getal dat je hebt uitgerekend", "een beschrijving van hoe de enquête eruitzag", "de mening van de onderzoeker over de uitkomst"], u: "Een conclusie beantwoordt de onderzoeksvraag, laat zien waarop dat antwoord steunt en zegt voor wie het geldt." },
          { q: "Waarom gebruik je meestal een steekproef in plaats van de hele populatie?", a: ["De hele populatie onderzoeken kost te veel tijd en geld.", "Een steekproef geeft altijd precies de goede waarde.", "Bij de hele populatie kun je geen gemiddelde uitrekenen.", "Een steekproef hoeft niet representatief te zijn."], u: "Een steekproef is goedkoper en sneller. Je neemt daarbij een kleine onzekerheid op de koop toe." }
        ],
        reken: [
          { q: "Van de 1200 aangeschreven leden vulden er 312 de enquête in. Bereken de respons in procenten.", antwoord: 26, eenheid: "%", hint: "Deel het aantal reacties door het aantal aangeschreven leden.", stappen: ["312 / 1200 = 0,26", "0,26 × 100% = 26%"] },
          { q: "In een peiling krijgt partij A 52 zetels en partij B 56. Hoeveel procent groter is het aantal zetels van B dan dat van A? Rond af op 1 decimaal.", antwoord: 7.7, tol: 0.1, eenheid: "%", hint: "(56 − 52) / 52 × 100%.", stappen: ["56 − 52 = 4", "4 / 52 × 100% = 7,69…%", "Afgerond: 7,7%"] },
          { q: "In een grafiek begint de verticale as bij 50. Staaf A heeft waarde 52, staaf B waarde 56. Hoeveel keer zo hoog is staaf B in de grafiek?", antwoord: 3, tol: 0.001, eenheid: "keer", hint: "Kijk alleen naar het deel boven de 50.", stappen: ["Hoogte A in de grafiek: 52 − 50 = 2", "Hoogte B in de grafiek: 56 − 50 = 6", "6 / 2 = 3 keer zo hoog, terwijl B maar 7,7% groter is."] },
          { q: "In een aselecte steekproef van 240 leerlingen hebben 84 leerlingen een huisdier. Bereken de steekproefproportie.", antwoord: 0.35, tol: 0.001, hint: "Deel het aantal met het kenmerk door de steekproefomvang.", stappen: ["p = 84 / 240 = 0,35"] },
          {
            gen: (R) => {
              const n = R.kies([150, 200, 250, 300, 400, 500, 600]), k = R.int(Math.round(0.1 * n), Math.round(0.8 * n)), p = R.rond(k / n, 2);
              const c = R.kies(["hebben een bijbaan", "lezen elke week een boek", "gebruiken dagelijks een stappenteller", "zijn lid van een sportclub"]);
              return { q: `In een aselecte steekproef van ${n} jongeren ${c.split(" ")[0]} er ${k} ${c.split(" ").slice(1).join(" ")}. Bereken de steekproefproportie. Rond af op 2 decimalen.`, antwoord: p, tol: 0.01, hint: "p = aantal met het kenmerk / n.", stappen: [`p = ${k} / ${n} = ${nl(R.rond(k / n, 4))}`, `Afgerond: ${r2(k / n)}`] };
            }
          },
          {
            gen: (R) => {
              const n = 100 * R.int(5, 30), pct = R.int(8, 70), k = (n * pct) / 100;
              return { q: `Een onderzoeksbureau benadert ${n} mensen voor een enquête. ${k} mensen doen mee. Bereken de respons in procenten.`, antwoord: pct, eenheid: "%", hint: "Aantal deelnemers gedeeld door het aantal benaderde mensen.", stappen: [`${k} / ${n} = ${nl(pct / 100)}`, `× 100% = ${pct}%`] };
            }
          }
        ],
        oefen: [
          { type: "volgorde", q: "Zet de stappen van de statistische cyclus in de goede volgorde.", items: ["Formuleer een onderzoeksvraag", "Bepaal de populatie en trek een aselecte steekproef", "Verzamel de gegevens", "Maak tabellen en grafieken en reken maten uit", "Trek een conclusie die de vraag beantwoordt"], u: "Eerst de vraag; die bepaalt welke gegevens je nodig hebt en van wie." },
          { type: "sorteer", q: "Is de steekproef aselect of niet?", groepen: ["aselect", "niet aselect"], items: [["Loten uit de ledenlijst", 0], ["Wie reageert op een oproep op sociale media", 1], ["Elke tiende naam uit een willekeurig geschudde lijst", 0], ["Interview bij de ingang van een sportschool", 1], ["Je vrienden en hun vrienden", 1], ["De computer kiest 50 random leerlingnummers", 0]], u: "Aselect betekent: iedereen heeft dezelfde kans. Vrijwilligers, vrienden of een bepaalde plek maken de steekproef scheef." },
          { type: "invul", q: "Vul in.", tekst: "Je wilt iets weten over alle Nederlandse jongeren: dat is de {populatie}. Je ondervraagt er 800: dat is de {steekproef}. Als iedereen dezelfde kans had om gekozen te worden, is de steekproef {aselect}.", extra: ["representatief", "respons"], u: "Representatief is het doel (een goede afspiegeling); aselect kiezen is de manier om dat te bereiken." }
        ],
        open: [
          { q: "Een sportmerk zet een poll op zijn eigen Instagram. 85% van de 3000 stemmers zegt dagelijks te sporten. Het merk schrijft: '85% van de Nederlanders sport dagelijks.' Leg uit waarom deze conclusie niet klopt.", a: "De steekproef is niet aselect en niet representatief: alleen volgers van een sportmerk konden stemmen, en zij sporten waarschijnlijk vaker dan gemiddeld. Ook stemmen mensen zelf (vrijwillige deelname). Dat er veel stemmers zijn (3000) lost dat niet op. De conclusie geldt hooguit voor volgers die stemden, niet voor alle Nederlanders.", punten: ["geen aselecte steekproef", "volgers van een sportmerk zijn niet representatief", "grote n maakt een scheve steekproef niet goed"] },
          { q: "Een krant laat met een staafdiagram zien dat de gemiddelde huur in stad B 'veel hoger' is dan in stad A. De as begint bij € 800; A is € 820 en B is € 860. Leg uit waarom de grafiek misleidend is.", a: "Doordat de as bij € 800 begint, is staaf A 20 hoog en staaf B 60 hoog: B lijkt drie keer zo hoog. In werkelijkheid is B maar 40 / 820 × 100% ≈ 4,9% hoger. Een eerlijke grafiek begint bij 0 of vermeldt duidelijk dat de as is afgekapt.", punten: ["afgekapte as", "B lijkt 3 keer zo hoog", "werkelijk ongeveer 5% verschil"] }
        ],
        widgets: ["vuistkiezer"]
      },

      // ------------------------------------------------------------------ extra: normale verdeling en betrouwbaarheidsinterval
      {
        id: "h13-6", nr: "Extra", titel: "Normale verdeling en betrouwbaarheidsinterval",
        kern: [
          "Veel metingen, zoals lengte of reistijd, zijn bij benadering [[normaal verdeeld]]: een symmetrische klokvorm rond het gemiddelde μ, met standaardafwijking σ als maat voor de breedte.",
          { fig: "klok", bij: "De vuistregels van de normale verdeling." },
          { formule: "68% ligt tussen μ − σ en μ + σ · 95% tussen μ − 2σ en μ + 2σ · nagenoeg 100% tussen μ − 3σ en μ + 3σ" },
          { voorbeeld: { titel: "Rekenen met de vuistregels", stappen: ["De lengte van jongens is normaal verdeeld met μ = 170 cm en σ = 8 cm.", "Boven 186 cm (μ + 2σ): (100% − 95%) / 2 = 2,5%.", "Tussen 162 en 186 cm (μ − σ tot μ + 2σ): 34% + 34% + 13,5% = 81,5%.", "Boven 178 cm (μ + σ): (100% − 68%) / 2 = 16%."] } },
          { widget: "normaal" },
          { kop: "Van steekproef naar populatie" },
          "Elke steekproef geeft een iets andere steekproefproportie. Bij een grote steekproef zijn die proporties bij benadering normaal verdeeld rond de echte proportie.",
          "Daarom geef je een [[95%-betrouwbaarheidsinterval]]: een interval waarin de echte waarde van de populatie met 95% betrouwbaarheid ligt.",
          { formule: "proportie: p ± 2 · √(p(1 − p) / n) · gemiddelde: X̄ ± 2 · S / √n" },
          { voorbeeld: { titel: "Interval voor een proportie", stappen: ["Van 500 ondervraagden zijn er 200 voor een plan: p = 200 / 500 = 0,40.", "√(0,40 · 0,60 / 500) = √0,00048 ≈ 0,0219.", "2 · 0,0219 ≈ 0,0438.", "Interval: 0,40 − 0,0438 ≈ 0,356 tot 0,40 + 0,0438 ≈ 0,444. Tussen 35,6% en 44,4% van de populatie is voor."] } },
          { voorbeeld: { titel: "Interval voor een gemiddelde", stappen: ["64 leerlingen slapen gemiddeld 7,2 uur met S = 1,6 uur.", "2 · 1,6 / √64 = 3,2 / 8 = 0,4.", "Interval: 6,8 tot 7,6 uur."] } },
          { fig: "bi-lijn", bij: "Een betrouwbaarheidsinterval op de getallenlijn: p = 0,43 bij n = 400 geeft het interval van 0,3805 tot 0,4795." },
          { tip: "Een 4 keer zo grote steekproef maakt het interval 2 keer zo smal, want n staat onder een wortel." },
          { widget: "steekproef" },
          { widget: "bi" }
        ],
        begrippen: [
          ["normale verdeling", "Symmetrische, klokvormige verdeling, vastgelegd door gemiddelde μ en standaardafwijking σ."],
          ["μ (mu)", "Het gemiddelde van de populatie of van de normale verdeling."],
          ["σ (sigma)", "De standaardafwijking van de populatie of van de normale verdeling."],
          ["vuistregel 68%", "Ongeveer 68% van de waarnemingen ligt tussen μ − σ en μ + σ."],
          ["vuistregel 95%", "Ongeveer 95% van de waarnemingen ligt tussen μ − 2σ en μ + 2σ."],
          ["95%-betrouwbaarheidsinterval", "Interval rond de steekproefwaarde waarin de populatiewaarde met 95% betrouwbaarheid ligt."],
          ["steekproevenverdeling", "Verdeling van de uitkomsten (proportie of gemiddelde) van heel veel steekproeven; bij grote n bij benadering normaal."],
          ["steekproefomvang n", "Aantal waarnemingen; hoe groter n, hoe smaller het interval."]
        ],
        vragen: [
          { q: "Gewicht van appels: normaal verdeeld met μ = 180 gram en σ = 15 gram. Hoeveel procent weegt meer dan 210 gram?", a: ["2,5%", "5%", "16%", "13,5%"], u: "210 = μ + 2σ. Buiten μ ± 2σ ligt 5%, verdeeld over twee kanten: 2,5% aan de bovenkant." },
          { q: "Bij dezelfde appels (μ = 180, σ = 15): hoeveel procent weegt tussen 165 en 195 gram?", a: ["68%", "95%", "34%", "50%"], u: "165 en 195 zijn μ − σ en μ + σ. Daartussen ligt ongeveer 68%." },
          { q: "Bij dezelfde appels: hoeveel procent weegt minder dan 165 gram?", a: ["16%", "32%", "34%", "2,5%"], u: "Buiten μ ± σ ligt 100% − 68% = 32%, de helft aan elke kant: 16%." },
          { q: "Wat gebeurt er met het 95%-betrouwbaarheidsinterval als de steekproef 4 keer zo groot wordt (en p ongeveer gelijk blijft)?", a: ["Het wordt 2 keer zo smal.", "Het wordt 4 keer zo smal.", "Het blijft even breed.", "Het wordt 2 keer zo breed."], u: "In de formule staat √n in de noemer. n × 4 geeft √n × 2, dus de marge wordt gedeeld door 2." },
          { q: "Een 95%-betrouwbaarheidsinterval voor de proportie is [0,31; 0,39]. Wat betekent dat?", a: ["De echte proportie in de populatie ligt met 95% betrouwbaarheid tussen 0,31 en 0,39.", "95% van de steekproef heeft een waarde tussen 0,31 en 0,39.", "De steekproefproportie ligt zeker tussen 0,31 en 0,39.", "De echte proportie is 95% van 0,35."], u: "Het interval gaat over de populatie. Bij ongeveer 95 van de 100 steekproeven bevat zo'n interval de echte waarde." },
          { q: "Wat is de steekproefproportie bij het interval [0,31; 0,39]?", a: ["0,35", "0,31", "0,39", "0,08"], u: "Het interval ligt symmetrisch om p: (0,31 + 0,39) / 2 = 0,35. De marge is 0,04." },
          { q: "Iemand rekent het interval voor een gemiddelde uit als X̄ ± 2 · S / n. Wat gaat er mis?", a: ["Er moet √n in de noemer staan, niet n.", "Er moet 1 staan in plaats van 2.", "Er moet p(1 − p) staan in plaats van S.", "Er gaat niets mis."], u: "De formule is X̄ ± 2 · S / √n. Zonder wortel wordt het interval veel te smal." },
          { q: "In een steekproef zijn 30 van de 50 leerlingen voor een nieuwe kantine. Wat is de marge 2 · √(p(1 − p) / n)? (afgerond)", a: ["0,14", "0,07", "0,0048", "0,28"], u: "p = 0,6. √(0,6 · 0,4 / 50) = √0,0048 ≈ 0,069. Twee keer zoveel: 0,139 ≈ 0,14." }
        ],
        reken: [
          { q: "In een steekproef van 300 personen zijn er 120 voor een plan. Bereken de linkergrens van het 95%-betrouwbaarheidsinterval voor de proportie. Rond af op 3 decimalen.", antwoord: 0.343, tol: 0.001, hint: "p = 120 / 300. Marge = 2 · √(p(1 − p) / n).", stappen: ["p = 120 / 300 = 0,4", "√(0,4 · 0,6 / 300) = √0,0008 ≈ 0,02828", "Marge: 2 · 0,02828 ≈ 0,05657", "Linkergrens: 0,4 − 0,05657 ≈ 0,343"] },
          { q: "Bereken bij dezelfde steekproef (120 van de 300) de rechtergrens. Rond af op 3 decimalen.", antwoord: 0.457, tol: 0.001, hint: "p + marge.", stappen: ["Marge ≈ 0,05657 (zie de vorige opgave)", "0,4 + 0,05657 ≈ 0,457"] },
          { q: "100 fietsers hebben een gemiddelde reistijd van 32,5 minuten met S = 6 minuten. Bereken de linkergrens van het 95%-betrouwbaarheidsinterval voor het gemiddelde. Rond af op 1 decimaal.", antwoord: 31.3, tol: 0.1, eenheid: "minuten", hint: "X̄ − 2 · S / √n.", stappen: ["2 · 6 / √100 = 12 / 10 = 1,2", "32,5 − 1,2 = 31,3 minuten"] },
          { q: "De lengte van jongens is normaal verdeeld met μ = 170 cm en σ = 8 cm. Hoeveel procent is langer dan 186 cm?", antwoord: 2.5, tol: 0.05, eenheid: "%", hint: "186 = μ + 2σ.", stappen: ["186 = 170 + 2 · 8 = μ + 2σ", "Buiten μ ± 2σ ligt 5%, de helft daarvan aan de bovenkant: 2,5%"] },
          { q: "Bij dezelfde lengtes (μ = 170, σ = 8): hoeveel procent ligt tussen 162 en 186 cm?", antwoord: 81.5, tol: 0.05, eenheid: "%", hint: "162 = μ − σ en 186 = μ + 2σ. Tel de stukken op.", stappen: ["162 tot 170: 34%", "170 tot 178: 34%", "178 tot 186: 13,5%", "Samen: 81,5%"] },
          { q: "Bij n = 400 is de marge van een interval voor een proportie 0,05. Hoe groot moet n worden om de marge te halveren tot 0,025 (bij dezelfde p)?", antwoord: 1600, tol: 0.5, hint: "Halveren van de marge betekent √n verdubbelen.", stappen: ["Marge = 2 · √(p(1 − p)) / √n", "Marge 2 keer zo klein, dan √n 2 keer zo groot", "n wordt 4 keer zo groot: 4 · 400 = 1600"] },
          {
            gen: (R) => {
              const n = R.kies([200, 250, 400, 500, 800, 1000]), k = R.int(Math.round(0.15 * n), Math.round(0.85 * n)), p = k / n;
              const m = 2 * Math.sqrt((p * (1 - p)) / n), hoog = R.rond(p + m, 3);
              return { q: `In een aselecte steekproef van ${n} kiezers zijn er ${k} van plan te gaan stemmen. Bereken de rechtergrens van het 95%-betrouwbaarheidsinterval voor de proportie. Rond af op 3 decimalen.`, antwoord: hoog, tol: 0.001, hint: "p = aantal / n. Rechtergrens = p + 2 · √(p(1 − p) / n).", stappen: [`p = ${k} / ${n} = ${nl(R.rond(p, 4))}`, `√(${nl(R.rond(p, 4))} · ${nl(R.rond(1 - p, 4))} / ${n}) ≈ ${nl(R.rond(m / 2, 5))}`, `Marge: 2 · ${nl(R.rond(m / 2, 5))} ≈ ${nl(R.rond(m, 4))}`, `Rechtergrens: ${nl(R.rond(p, 4))} + ${nl(R.rond(m, 4))} ≈ ${r3(p + m)}`] };
            }
          },
          {
            gen: (R) => {
              const c = R.kies([["De lengte van volwassen vrouwen", 168, 7, "cm"], ["Het gewicht van zakken chips", 150, 4, "gram"], ["De reistijd van forenzen", 40, 6, "minuten"], ["De levensduur van een batterij", 30, 3, "uur"]]);
              const deel = [2.5, 13.5, 34, 34, 13.5, 2.5], gr = [-2, -1, 0, 1, 2];
              let i = R.int(0, 4), j = R.int(i + 1, 5); if (i === 0 && j === 5) j = 4;
              const pct = deel.slice(i, j + 1).reduce((a, b) => a + b, 0), x = (k) => c[1] + gr[k] * c[2];
              const lo = i === 0 ? null : x(i - 1), hi = j === 5 ? null : x(j);
              const naam = (g) => (g === 0 ? "μ" : `μ ${g < 0 ? "−" : "+"} ${Math.abs(g) === 1 ? "" : Math.abs(g)}σ`);
              const vr = lo == null ? `minder dan ${hi} ${c[3]}` : hi == null ? `meer dan ${lo} ${c[3]}` : `tussen ${lo} en ${hi} ${c[3]}`;
              return { q: `${c[0]} is normaal verdeeld met μ = ${c[1]} ${c[3]} en σ = ${c[2]} ${c[3]}. Hoeveel procent zit ${vr}?`, antwoord: pct, tol: 0.05, eenheid: "%", hint: "Druk de grenzen uit in μ en σ en tel de stukken van de klokkromme op: 2,5 · 13,5 · 34 · 34 · 13,5 · 2,5.", stappen: [`Grenzen: ${[lo == null ? null : `${lo} = ${naam(gr[i - 1])}`, hi == null ? null : `${hi} = ${naam(gr[j])}`].filter(Boolean).join(" en ")}`, `Stukken: ${deel.slice(i, j + 1).map((d) => nl(d) + "%").join(" + ")}`, `Samen: ${nl(pct)}%`] };
            }
          }
        ],
        oefen: [
          { type: "koppel", q: "Koppel het gebied aan het percentage (normale verdeling).", paren: [["tussen μ − σ en μ + σ", "68%"], ["tussen μ − 2σ en μ + 2σ", "95%"], ["boven μ + σ", "16%"], ["boven μ + 2σ", "2,5%"], ["tussen μ en μ + σ", "34%"], ["tussen μ + σ en μ + 2σ", "13,5%"]], u: "Begin bij 68% en 95% en gebruik de symmetrie: elke kant krijgt de helft." },
          { type: "invul", q: "Vul in.", tekst: "Het 95%-betrouwbaarheidsinterval voor een proportie is p ± 2 · √(p(1 − p) / {n}). Wordt de steekproef 4 keer zo groot, dan wordt het interval {2} keer zo smal. Het interval zegt iets over de {populatie}.", extra: ["4", "steekproef", "p"], u: "n staat onder de wortel: √4 = 2. Het interval schat de waarde in de populatie." }
        ],
        open: [
          { q: "Uit een steekproef van 400 leerlingen volgt het 95%-betrouwbaarheidsinterval [0,38; 0,48] voor het deel dat een bijbaan heeft. Een leerling concludeert: 'Precies 43% van alle leerlingen heeft een bijbaan.' Leg uit waarom deze conclusie niet klopt.", a: "0,43 is alleen de steekproefproportie, het midden van het interval. Een andere steekproef geeft een iets andere uitkomst. Je weet alleen dat de echte proportie met 95% betrouwbaarheid tussen 38% en 48% ligt; 'precies 43%' kun je niet zeggen.", punten: ["43% is de steekproefproportie", "steekproeven verschillen", "echte waarde ligt in het interval, met 95% betrouwbaarheid"] }
        ],
        widgets: ["normaal", "steekproef", "bi"]
      }
    ]
  });
})();
