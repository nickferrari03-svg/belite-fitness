# B Elite Fitness — app (v3)

Implementazione React del design `B Elite App v3.dc.html` (Claude Design), doppia modalità:
- **Cliente** (scuro/premium): Home, Prenota, Percorso (Piano + Progressi), Profilo, Notifiche.
- **Staff/Trainer** (chiaro/funzionale): Oggi, Agenda, Clienti (scheda + editor piano), Studio.

```bash
npm install
npm run dev      # sviluppo
npm run build    # build statica in dist/
```

Su desktop l'app è mostrata nella cornice iPhone del design; sotto i 500px di larghezza è a schermo intero.

Switch demo via URL (i "Tweaks" del prototipo): `?role=trainer`, `?credits=0`, `?offline=1`, `?race=0`.

## Stato
- Dati e stato sono **locali e di esempio** (Giulia, clienti, Sara/Marta, orari, esercizi, regole). Nessun backend: si azzera al refresh.
- Font self-hosted (Fontsource), nessuna chiamata a Google Fonts.
- Logo a bassa risoluzione: serve il vettoriale (SVG/PDF/AI).

## Struttura
- `src/data.js` — costanti e dati di esempio
- `src/logic.js` — stato e regole (prenotazioni, lista d'attesa, rinnovi, agenda, piani)
- `src/screens/` — schermate cliente, trainer, bottom sheet
- `src/components/ds.jsx` — Button, Icon (Lucide), ServicePill, BrandRule dal design system
