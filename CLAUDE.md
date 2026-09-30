# CLAUDE.md

Website of the Anglican Chaplaincy Bonn/Cologne with a small built-in CMS ("admin") for news, events,
notices, locations, weekly sheets, prayers and users.

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # production build (Netlify runs: npm ci && npm run build)
npm test             # Vitest — src/**/*.{test,spec}.ts
npm run test:e2e     # Playwright — tests/
npm run lint         # ESLint
npm run format       # Prettier
cd functions && npm run deploy   # Firebase Cloud Functions (separate package, CommonJS, Node 20)
```

## Stack

- SvelteKit 2 + Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`). Global state still uses
  classic `writable` stores in `src/lib/stores/`.
- Tailwind 4 via `@tailwindcss/vite` (not PostCSS — breaks the Vite 8 build). shadcn-svelte / bits-ui
  components in `src/lib/components/ui/`.
- Firebase client SDK only (Auth, Firestore, Storage, Functions) — `src/lib/firebase/firebaseConfig.ts`
  holds all collection and storage refs. No Admin SDK inside SvelteKit.
- Netlify with `adapter-netlify`.

## Layout

- `src/routes/(pages)/` — public pages; many load data client-side from Firestore in `+page.js`.
- `src/routes/(admin)/admin/` — CMS. The layout guard is client-side only (`role` claim must be
  `admin` or `editor`); real protection lives in `firestore.rules` / `storage.rules`.
- `src/routes/api/` — server endpoints (`generate-alt-text` via Claude, `subscribe` via Brevo).
- `src/lib/stores/ObjectStore.ts` — domain types (`DomainEvent`, `News`, `WeeklySheet`, `Notice`),
  item state logic and all load functions.
- `src/lib/services/` — form services (timestamps, uploads), `fileService.ts`, `authService.ts`.
- `functions/index.js` — callable functions for user and role management.

## Conventions

- **Roles** are Firebase custom claims: `user` / `editor` / `admin` (`token.role`).
- **Item state** is derived on load via `setItemState()`: draft → scheduled → public → unpublished
  (unpublished only for events).
- **Dates/times**: forms store date/time strings plus Firestore Timestamps (`publishDateTime`,
  `unpublishDateTime`). Build them with `buildTimeStamp()` from `validateForm.ts`, which interprets
  input as local time. Never append `Z`, never derive dates with `toISOString()`. `makeTimestamp()` in
  `dateUtils.ts` is UTC-based and not used by the forms.
- **Images**: `UploadImage.svelte` hands back a `File` via `onNewFileSelected` or an existing image via
  `onExistingFileSelected`; the form owns the state; `uploadEventImage` / `uploadNewsImage` upload it.
  Alt text is required. Max size `MAX_IMAGE_SIZE` (1.2 MB) in `src/lib/utils/constants.ts`. Store
  storage `fullPath` strings in Firestore, not `StorageReference` objects.
- **Toasts**: `notificationStore.addToast(type, message)`; the component must render a
  `<ToastContainer>`. User-facing strings go in `src/lib/utils/messages.ts`.
- `validateEventData()` returns `true` when validation **failed**.
- **Env vars**: `VITE_*` is public (bundled for the client), `PRIVATE_*` is server-only via
  `$env/static/private`. New secrets must be `PRIVATE_*`.
- Svelte/TS patterns used in this project are documented in `docs/patterns.md`; add new ones there.

## Git and release workflow

- Branch from `origin/dev`, push right away with its own upstream (`git push -u origin <branch>`).
  PRs go feature → `dev` → `main`. Never commit or push directly to `dev` or `main`.
- The pre-commit hook rejects any commit that doesn't stage `changelog.md`. Add a bullet under
  `## [Unreleased]` with a tag prefix: `Add:`/`Feature:`/`New:` → minor, `Breaking:`/`Remove:` →
  major, anything else → patch.
- Don't bump the version by hand. After a PR merges into `dev`, the `changelog-automation` GitHub
  Action bumps `package.json`, commits `chore: release version X.Y.Z`, tags it and creates a release.
- `main` auto-deploys to Netlify. The version is shown in the footer via `__APP_VERSION__`.
