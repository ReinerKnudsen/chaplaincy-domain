# E2E tests (Playwright)

```bash
npm run test:e2e                          # everything
npx playwright test --project=public      # public pages only, no login needed
npm run test:e2e:ui                       # interactive
```

The tests run against the **dev Firebase project** configured by the `VITE_*` values in `.env`.

## Projects

| Project         | What it covers                                                              | Needs login |
| --------------- | --------------------------------------------------------------------------- | ----------- |
| `public`        | every page renders without errors, nav links, news/event detail pages       | no          |
| `public-mobile` | navigation through the mobile menu                                          | no          |
| `auth`          | login/logout, wrong password, disabled button, admin guard                  | partly      |
| `setup`         | logs in once and stores the session (incl. IndexedDB) for `admin`           | yes         |
| `admin`         | create/publish/draft/schedule/delete news and events, unsaved-changes guard | yes         |

## Test account

Add to `.env` (never commit credentials — the repository is public):

```
E2E_EMAIL=...
E2E_PASSWORD=...
```

The account needs the `editor` or `admin` claim in the dev project. Without these values the
tests that need a login are skipped.

## Test data

Everything the admin tests create is titled `[E2E] … <timestamp>` and deleted again by the test.
If a test aborts halfway, `global-teardown.ts` deletes all news and events whose title starts
with `[E2E]` after the run.

## Known bugs pinned by tests

- `content.spec.ts › unknown id answers with 404` is marked `test.fail()`: the news/event detail
  loaders turn their own 404 into a 500. Once fixed, Playwright reports the test as
  "expected to fail but passed" — then remove `test.fail()`.
