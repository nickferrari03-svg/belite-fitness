# B Elite Fitness — Design System

**B Elite Fitness** is a boutique personal-training studio in Calino / Cazzago San Martino (BS), Italy. Tagline in the logo: *Precisione · Personalizzazione · Performance*. Bio: "Allenamento individuale. Su misura per te." — Personal Training | Pilates (Reformer & Matwork) | Yoga, plus Fisioterapia, Osteopatia, Nutrizione.

- Phone / bookings: 339 870 1308 (Andrea)
- Address: Via Aymo Maggi 3, Cazzago San Martino 25046
- Web: www.belitefitness.it · info@belitefitness.it

## Sources
Only three uploads were provided (no codebase, no Figma, no website source):
- `uploads/511549916_…_n.jpg` — logo on black (462×462)
- `uploads/Screenshot 2026-09-26 002601.png`, `…002618.png` — Instagram grid screenshots (posts, reels, flyers, schedule, review)

The **only product surface** observed is the Instagram feed (@belitefitness). The website is referenced but not supplied, so no web UI kit was built.

## CONTENT FUNDAMENTALS
- **Language:** Italian. Speak to the client as **"tu"** (singular, informal): "pensata solo per te", "Su misura per te". The studio speaks as **"noi"**: "I nostri servizi", "il nostro personal training".
- **Tone:** confident, warm, premium-but-approachable. Short declarative lines, often a negation then a promise: *"Non il solito allenamento. Una nuova esperienza, pensata solo per te."*
- **Headlines:** questions or hooks in ALL CAPS — "COS'È IL PERSONAL TRAINING DI B ELITE FITNESS?", "COME FUNZIONA IL NOSTRO PERSONAL TRAINING?", "COSA CAMBIA DOPO LE PRIME LEZIONI".
- **Triads:** the brand loves groups of three — "Precisione Personalizzazione Performance", "Equilibrio · Forza · Benessere", "Più attenzione, più precisione, più risultati."
- **Exclusivity cues:** "Corsi a numero chiuso", "Solo 2 partecipanti."
- **Practical footers:** "Per info e prenotazioni: 339 870 1308 – Andrea".
- **Emoji:** sparing, only in captions/reel titles (🧘, 💙, ✨). Never in designed graphics' headlines.
- Service names are Title Case: "Pilates Reformer", "Allenamento individuale". Days are uppercase with accent: LUNEDÌ, MARTEDÌ.

## VISUAL FOUNDATIONS
- **Color:** black (#000) is the dominant ground; brand blue **#2486AB** (sampled from the B mark) is the accent; white type. Light variant flyers use white → pale blue (#EEF7FB). Schedule class codes: reformer light blue #A9D2E8, matwork #3F9CC4, yoga lilac #E7B6F0. Reel captions use a brighter sky blue #1E9BE0 with white stroke.
- **Type:** tall condensed caps for headlines (Bebas Neue substitute), a condensed high-contrast serif for "FITNESS", "I NOSTRI SERVIZI" and italic "Review" (Instrument Serif substitute), geometric sans for body and labels (Montserrat substitute). Labels use wide tracking (.08–.18em).
- **Motifs:** a giant blue circular arc bleeding off one edge (the "Cos'è" post); the logo's line-with-end-dots rule; the B mark used large and faded as a background watermark (review post, studio wall).
- **Imagery:** real photos of the studio — bright, white walls, grey floors, natural daylight, black Technogym-style equipment, wooden reformers, warm salt lamp accents. Neutral-cool, no heavy filters, no grain. Real trainers and clients on camera (reels).
- **Backgrounds:** solid black, solid blue, or full-bleed photo. No gradients except a soft white→pale-blue wash on the light flyer.
- **Corners:** pills (999px) for service chips/CTAs; 20px for floating cards (review card); 8px for day tabs/cards; schedule grid is square hairlines.
- **Cards:** review = black, 20px radius, deep shadow on blue ground. Day cards = white, 8px radius, soft blue shadow, blue tab header inset.
- **Borders:** white 1px hairlines in schedule grids; otherwise borderless.
- **Shadows:** mostly flat; `--shadow-card` on floating cards, `--shadow-soft` on light flyers.
- **Transparency/blur:** translucent blue pills (28% blue on black); photo half-faded behind text on the services post. No blur.
- **Animation (interactive surfaces):** short fades (240ms, ease-out); hover = slight brighten; press = scale .97. Nothing bouncy.
- **Layout:** square 1080×1080 posts and 1080×1350 reels/photos; generous 60–90px margins; logo centered at bottom or top; contact bar pinned to bottom of flyers.

## ICONOGRAPHY
The source graphics use few icons: a right arrow (carousel cue), phone & map-pin in blue discs (flyer footer), star rating, Google "G", and small line pictograms of reformer/mat on the flyer. No icon font or SVG set was supplied. **Substitution:** Lucide (via CDN `lucide-static@0.456.0`), consumed through the `Icon` component with CSS masks so it can take any color. The Google logo is represented by a plain "G" — supply the official asset if needed. Emoji only in captions.

## Assets
- `assets/logo.png` full logo w/ rule + tagline (transparent, extracted from the JPG — use on dark only)
- `assets/logo-lockup.png` B + ELITE FITNESS · `assets/logo-mark.png` B only · `assets/logo-original.jpg`
- `assets/photos/*.png` — cropped from the Instagram screenshots (low-res, ~350px wide; replace with originals)

## Fonts
No font files were supplied. Google Fonts substitutes loaded in `tokens/fonts.css`: **Bebas Neue**, **Instrument Serif**, **Montserrat**.

## Index
- `styles.css` → `tokens/` (fonts, colors, typography, spacing, effects)
- `guidelines/` — foundation cards (Colors, Type, Spacing, Brand)
- `components/` — React primitives
- `ui_kits/instagram/` — Instagram feed recreation (index.html, Posts.jsx, Feed.jsx)
- `SKILL.md`, `thumbnail.html`

## Components
- core: **Button**, **Icon**
- brand: **Logo**, **BrandRule**
- social: **ServicePill**, **CaptionTag**, **ReviewCard**, **ContactBar**
- schedule: **DayCard**, **ScheduleGrid**

### Intentional additions
- **Button** — no CTA button exists in the IG source; added for booking/web surfaces.
- **Icon** — wrapper for the Lucide substitute set.
