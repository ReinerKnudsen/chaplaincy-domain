# Git hooks

Git looks for hooks in `.git/hooks/`, which is never committed — so a hook
placed there exists only on the machine that created it and is lost on a
fresh clone. The hooks live here instead, under version control, and git is
pointed at this folder via the `core.hooksPath` setting.

## Setup

Run once per clone:

```sh
npm run setup:hooks
```

This runs `git config core.hooksPath .githooks`. Nothing else is needed —
the hooks in this folder then apply automatically.

To check whether it is active:

```sh
git config core.hooksPath     # should print .githooks
```

To turn the hooks off again:

```sh
git config --unset core.hooksPath
```

## Hooks in this folder

### `pre-commit`

Blocks a commit unless `changelog.md` is staged, which keeps the release
pipeline's version bump working — it derives the next version from the
changelog entries.

If the VS Code CLI (`code`) is on PATH, the hook opens `changelog.md` for
editing; otherwise it just prints what to do. Committing from a terminal
without VS Code therefore still works.

To bypass the hook for a single commit — a merge or a revert, say, where
there is nothing to log:

```sh
git commit --no-verify
```
