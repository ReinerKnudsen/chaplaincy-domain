# Anlegen von Profilen

## ToDo Liste
- [ ] Anlegen einer Collection in Firebase
- [ ] Anlegen eines Bucket in Storage
- [ ] Anlegen eines Interface
- [ ] Erstellen einer Admin Route (Seite)
- [ ] Erstellen eines Create Formulars (mit Preview?)
- [ ] Erstellen eines Edit Formulars
- [ ] Bauen einer Speicher-Routine (Admin)
- [ ] Bauen eine Lade-Routine (Admin)
- [ ] Anpassen der Who-Is-Who-Seite
  - [ ] Laden aller aktiven Profile
  - [ ] Sortieren in der richtigen Reihenfolge
  - [ ] Anzeigen

## Zu beachten
- Jede Karte muss wissen, an welcher Stelle der Reihenfolge sie steht
  - Es wäre vielleicht gut, eine visuelle Anzeige der Reihenfolge zu haben mit Pfeilen zum Anpassen
  - "Chaplain" wäre immer ganz oben; der sollte ein eigenes Flag haben; diese Position darf nicht überschrieben werden
  - Es muss möglich sein, Profile zu deaktivieren
    - Ein deaktiviertes Profil 
      - muss als solches gekennzeichnet werden
      - muss sauber aus der Reihenfolge entfernt werden

## Interface

profile: {
	name: string;
	role: string;
	descritpion: string;
	phone: string;
	mobile: string;
	email: string;
	photo: imageReference;

}
