# swimming-amwaj

swimming app — the Mawj Swim Academy training schedule, built with Next.js (App Router), React and TypeScript.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000/schedule.

## Scripts

- `npm run dev` — development server (adds a 0.9s fake delay so the loading skeleton is visible)
- `npm run build` / `npm start` — production build and server
- `npm test` — unit tests (Vitest)
- `npm run lint` / `npm run typecheck`

## Structure

- `src/app/` — routes; `schedule/page.tsx` is the schedule page
- `src/features/schedule/` — schedule types, data access (`api.ts`), availability rules, URL state and its components
- `src/components/ui/` — shared building blocks (buttons, cards, toggles, icons, skeleton)
- `src/components/layout/` — header, mobile menu and footer

## Known gaps

- Schedule data is a sample fixture in `src/features/schedule/api.ts`; the page shows an "Illustrative schedule" notice until it is replaced.
- `/programs` and `/enroll` are linked but not built yet.
