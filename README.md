# Bir Varmış Bir Yokmuş

A personal, mobile-first engagement invitation. Guests open a closed fairy-tale book, turn illustrated parchment pages, and read the details in Turkish. It is one invitation, not a website builder.

The look follows the opening storybook of the 2001 film *Shrek*: a thick leather cover, candlelit darkness, and illuminated pages. The illustrations, borders, and lettering are original. The film’s soundtrack and artwork are not included.

## Edit the invitation

All guest-facing copy lives in [`src/config/invitation.ts`](src/config/invitation.ts).

Replace the square-bracket placeholders before you share the link:

- `[Ad]` — both names
- `[Tarih]` — either display text, or an ISO date such as `2026-10-03` (shown in Turkish, for example “3 Ekim 2026”)
- `[Gün]` — leave the placeholder, or clear it, when the date is ISO; the weekday is then filled in automatically
- `[Saat]` — `19:30` is shown as `19.30`
- `[Mekan adı]` and `[Açık adres]`

Leave an optional string empty to hide it. The guest page (note, directions, parking, map link) appears only when at least one of those fields is filled. Map links must be `http` or `https`.

## Run locally

```bash
npm install
npm run dev
```

The dev server in this project is usually started at [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm test
npm run lint
npm run build
```

## Audio

No soundtrack is shipped. Playback starts only after a guest opens the book, keeps playing across page turns, and can be muted. If a file is missing, the invitation still works and the music control stays hidden.

| File | Role | Format | Suggested length |
| --- | --- | --- | --- |
| `public/audio/storybook-theme.mp3` | Looping theme, starts when the book opens | MP3, stereo | 1–3 minutes, loopable |
| `public/audio/book-open.mp3` | Cover opening | MP3 | under 2 seconds |
| `public/audio/page-turn.mp3` | Page turn | MP3 | under 1 second |

Paths are set in `invitation.audio`. Use music you have the rights to play. Do not drop in the film score unless you hold that license.

## Asset inventory

### Created in this project

| Path | Role |
| --- | --- |
| `public/textures/paper.svg` | Parchment fiber |
| `public/textures/leather.svg` | Cover grain |
| `assets/fonts/EBGaramond-*.ttf` | Open Graph text (OFL) |
| `assets/fonts/CormorantGaramond-*.ttf` | Open Graph display text (OFL) |
| `assets/fonts/*-OFL.txt` | Font licenses |
| Storybook borders, medallion, and plates | Drawn in the React components |

Screen text uses [EB Garamond](https://fonts.google.com/specimen/EB+Garamond) and [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), both OFL, self-hosted by Next.js at build time. They include Turkish characters.

### You still need to add

Only the audio files above, and your real names, date, and venue in `src/config/invitation.ts`.

The link preview is generated at `/opengraph-image` from the same configuration. It is a static picture of the cover, which is what chat apps can show.

## Deploy on Vercel

The app is a standard Next.js App Router project. No environment variables are required.

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project** and import that repository.
3. Framework preset: **Next.js**. Leave the build command as `next build` and the output as the default.
4. Deploy. The site is served from `/`, so refreshing the invitation URL stays on the page.

Search engines are asked not to index the page (`robots: noindex`). Guests with the link can still open it.
