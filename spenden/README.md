# Spendenseite

Statische Einzelseite für `spenden.anglicanbonncologne.de`. Kein Build, keine
Dependencies, keine externen Requests — deshalb auch kein Cookie-Banner nötig.

## Später anpassen

In `index.html` ganz unten im `<script>`:

- `BETTERPLACE_URL` — URL des betterplace-Projekts. Solange leer, zeigt der
  Button "Spendenprojekt in Vorbereitung" statt ins Leere zu führen.
- `AMOUNT_PARAM` — Query-Parameter für den vorausgewählten Betrag.
  **Noch nicht verifiziert, ob betterplace das unterstützt.** Wenn nicht:
  auf `null` setzen, dann wird kein Betrag übergeben.

## Netlify

Zweite Site auf dasselbe GitHub-Repo, Base directory `spenden`. Publish
directory und Build-Command kommen aus dieser `netlify.toml`.

## Texte ändern

Zweisprachig über `data-en` / `data-de` am jeweiligen Element. Beide Sprachen
stehen im Markup; das Skript tauscht nur `textContent` aus. Neuer Text heißt
also: beide Attribute setzen, fertig.
