# Toetsweek · Wiskunde A

Interactieve leer-app voor de toetsweek (havo 5). Stof: H11 Allerlei formules · H13 Conclusies uit data · Vaardigheden 5. Eigen oefenstof bij Moderne Wiskunde 12e editie, havo wiskunde A (H11 en H13 uit deel 3, Vaardigheden 5 uit deel 2).

Statische app zonder build-stap: open `index.html`, of start een lokale server:

```bash
python3 -m http.server 8777
```

`core.js` en `core.css` zijn de gedeelde kern uit `../toetsweek/core/` (daar aanpassen, dan `../toetsweek/sync-core.sh`).
Controle van de stof: `node ../toetsweek/core/check.js`.
